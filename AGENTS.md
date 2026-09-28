Master prompt (paste first, and save it as AGENTS.md in the repo root)
You are building "BhoomiCheck", an AI-powered land acquisition assistant for Uttar Pradesh, India, as a native Android app in Kotlin. The screen designs are in /design (PNG screenshots + Stitch HTML). Treat them as the visual source of truth and recreate them in Jetpack Compose. Do not embed WebViews or convert the HTML mechanically.

TECH STACK
- Kotlin, Jetpack Compose, Material 3 as a base but fully re-themed (no default Material look), min SDK 26, target latest stable SDK
- Architecture: single-activity, MVVM + unidirectional state (StateFlow, sealed UiState/UiEvent), clean layers: ui / domain / data
- DI: Hilt. Navigation: Navigation Compose (type-safe routes). Networking: Retrofit + kotlinx.serialization + OkHttp. Async: coroutines/Flow
- Map: MapLibre Native Android with bundled district GeoJSON for Uttar Pradesh (assets/geo/up_districts.geojson); selected district filled #005EA2
- Local: Room for cached reports. Tests: JUnit5, Turbine, Compose UI tests
- Backend (later phase): Ktor (Kotlin) + PostgreSQL. No API keys in the app, ever.

PRODUCT RULES
- ONE app, two modes (Buyer, Seller). Mode is chosen on the landing screen and stored in a session object. Shared screens are reused; only the problem list differs by mode.
- Flow: Landing (choose role) -> State/District select -> Map + problem list (bottom sheet) -> feature screens.
- Buyer problems: Title search, Encumbrance Certificate (EC), Buyer eligibility, Physical survey.
- Seller problems: Verify land records, Check EC, Confirm land classification (Section 80), Physical survey, Draft Agreement to Sell (Bayana), Execute sale deed.
- Every feature sits behind a domain interface with a Fake implementation now and a Remote implementation later, switched by a build config flag USE_FAKES:
  TitleAnalyzer, EncumbranceAnalyzer, EligibilityChecker, ClassificationChecker, SurveyCoordinator, AgreementGenerator.
- AI is NOT decided yet. Fakes must return realistic placeholder data (clean vs unsafe). Never call any LLM from the app.
- Every result screen shows the disclaimer "AI-assisted analysis. Not legal advice. Verify with a licensed advocate."

DESIGN SYSTEM (implement in ui/theme)
- Colors: navy #162E51, action blue #005EA2 (pressed #1A4480), gold #FFBE2E, background #F5F6F7, surface #FFFFFF, border #DFE1E2, text #1B1B1B, secondary #565C65, success #00A91C/#ECF3EC, warning #FA9441/#FEF0E4, danger #D54309/#F4E3DB, info #00BDE3/#E7F6F8. Seller header variant #0B4151.
- Font: Public Sans (bundle in res/font). Sizes: 28/34 bold, 20/28 semibold, 16/24, 13/18.
- Flat, official style like USWDS: 4dp radius on buttons/inputs, 8dp on cards, 1dp borders, no shadows, no blur, no gradients.
- Shared components in ui/components: OfficialBanner, AppTopBar, PrimaryButton (48dp), SecondaryButton (outlined 2dp), LabeledTextField, DropdownField, SelectableCard, StepIndicator, StatusBanner (icon + text + color, never color-only), TimelineNode, ScoreGauge, DisclaimerText.
- Accessibility: 48dp touch targets, contentDescription on all icons, WCAG AA contrast, support font scaling, English and Hindi string resources (values/ and values-hi/).

WORKING RULES
- Work in small phases. At the end of each phase: the project must build (./gradlew assembleDebug), unit tests must pass, and you must give me a short summary plus how to run it. Do not start the next phase until I say so.
- Ask before adding any dependency not listed above.
- No hardcoded strings or colors in composables. Add @Preview for every screen and component.
- Keep files small and named clearly. Write brief KDoc on domain interfaces.

Phase 1: project, theme, navigation, all screens on fake data
Phase 1. Create the Android project and implement the design system and every screen from /design using Fake implementations only.

1. Scaffold the project with the package com.bhoomicheck, Gradle version catalog, Hilt, Navigation Compose.
2. Implement ui/theme (Color.kt, Type.kt, Shape.kt, Theme.kt) and all shared components from AGENTS.md.
3. Implement screens matching the designs: Landing, LocationSelect (State + District), MapAndProblems (map + bottom sheet), TitleSearchInput, TitleReport, EcAnalysis, BuyerEligibility, SurveyTracker, BayanaDraft, plus placeholder screens for Land Records (seller), Section 80 and Execute Sale Deed.
4. Implement session state (mode, state, district) shared across the flow via a Hilt-scoped SessionRepository.
5. Map screen: MapLibre with the bundled UP districts GeoJSON, highlight the selected district, zoom controls, "Change district" link. If the GeoJSON is missing, generate a small placeholder file with 5 districts and tell me where to drop the real DataMeet file.
6. Fakes: FakeTitleAnalyzer returns a clean report (82) for Khasra numbers ending in an even digit and a risky report (38) for odd digits, so I can demo both states. Other fakes return the green/amber/red variants shown in the designs.
7. Add compose previews and 3 UI tests: role selection enables Continue, district selection navigates to the map, and the title search shows the timeline.

Definition of done: I can run the app on an emulator and click through the full buyer flow and seller flow with fake data, and it visually matches /design.

Phase 2: backend, database, title-search engine
Phase 2. Add a Ktor backend module (/backend) and make Title Search real using deterministic logic. No LLM.

1. PostgreSQL schema (Flyway migrations): plots(id, district, tehsil, village, khasra_no, khatauni_no, area_sqm), ownership_events(id, plot_id, event_date, type, grantor, grantee, area_sqm, source_doc, mutation_recorded boolean, litigation_flag boolean), documents(id, plot_id, type, storage_url).
2. A synthetic data generator (Kotlin CLI or Gradle task) that seeds ~300 plots with realistic ownership chains and injects labeled defects: broken chain, sale without mutation, area sold exceeds parent, missing legal heir, pending litigation. Store the injected defect labels in a separate table for evaluation.
3. Implement TitleRulesEngine as pure Kotlin (no I/O) with these checks and severity weights: broken chain 35, sale without mutation 20, area exceeds parent 30, inheritance missing heirs 25, fuzzy name mismatch 10, unexplained time gap 8, litigation 40. Score = 100 * product(1 - w/100) for each triggered check. Bands: >=80 green, 50-79 amber, <50 red.
4. Name matching: Jaro-Winkler on normalized names (strip honorifics like Shri/Smt/Sri, lowercase, transliteration-ready). >=0.9 same, 0.75-0.9 "needs confirmation", below = mismatch.
5. Endpoint GET /v1/plots/{khasra}/title-report?district=&village= returning JSON: score, band, timeline[], findings[], summary. Summary is generated from findings by a SummaryGenerator interface (template-based stub now, LLM later).
6. Unit tests for every rule and an evaluation test that runs the engine over the seeded data and prints precision/recall per injected defect type.
7. Add docker-compose.yml with Postgres.

Definition of done: docker compose up, run the seed, curl the endpoint, and see correct scores. Tests pass.

Phase 3: connect the app to the backend
Phase 3. Add RemoteTitleAnalyzer using Retrofit against the Ktor backend and switch it on with USE_FAKES=false. Map the JSON to the existing TitleReport domain model. Handle loading, empty, error and offline states with proper UI (retry button, plain-language error text). Use 10.0.2.2 for the emulator base URL via BuildConfig. Cache the last report per plot in Room. Add tests using MockWebServer. Keep the fakes for previews and tests.

Phase 4: EC, eligibility, Section 80 (rules-based with AI stubs)
Phase 4. Implement these behind their existing interfaces, on the backend.

1. EC: endpoint accepting an uploaded EC (PDF/image) and returning structured rows. Create an ExtractionService interface with a StubExtractionService returning canned rows now (LLM/OCR plugs in later). Implement the deterministic matcher that pairs each mortgage with a release by parties, amount and property; unmatched mortgage = active encumbrance. Return { activeEncumbrances[], risk, summary }.
2. Eligibility: a data-driven rules table (JSON in resources, each rule has id, condition, outcome, sectionReference, text). Inputs: buyer profile (agriculturist, category, existing holdings) and land attributes. Output: ELIGIBLE / PERMISSION_REQUIRED / NOT_ELIGIBLE plus the cited rule. Seed 6 example rules marked "PLACEHOLDER - lawyer must verify".
3. Section 80: accept plot id and a conversion order upload, extract order number and date via the stub extraction service, check consistency, return VALID / MISSING / MISMATCH.
4. Add file upload in the app (Photo picker + document picker) with a confirm-extracted-fields screen before submitting.

Add tests for the matcher and the rules engine.

Phase 5: survey agent and Bayana PDF
Phase 5.

1. Survey: model as a durable state machine in the backend: REQUESTED, SURVEYOR_SHORTLISTED, USER_APPROVES, CONTACTED, SCHEDULED, SURVEY_DONE, REPORT_UPLOADED, REPORT_VERIFIED, CLOSED. Persist survey_case and survey_events in Postgres. Human approval gate before CONTACTED. A MockSurveyorGateway simulates replies and scheduling. SurveyAgent is an interface (rule-based now, LLM tool-calling later). The app polls (or uses SSE) to update the tracker screen and shows the activity log.
2. Bayana: AgreementGenerator fills a clause template (Mustache/Freemarker) with parties, plot, price, advance and timeline, then renders HTML to PDF. Use a Noto Sans Devanagari-capable pipeline (headless Chromium or WeasyPrint via a container). Return the PDF to the app and open it with the system viewer. Mark the template "DRAFT - not legal advice".
