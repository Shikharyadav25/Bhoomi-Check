Master prompt (paste first, and save it as AGENTS.md in the repo root)
You are building "BhoomiCheck", an AI-powered land acquisition assistant for Uttar Pradesh, India, as a cross-platform mobile app in React Native using Expo Go (TypeScript). The screen designs are in /design (PNG screenshots + Stitch HTML). Treat them as the visual source of truth and recreate them with pixel-perfect fidelity. Do not embed WebViews or convert the HTML mechanically.

TECH STACK
- TypeScript, React Native, Expo Go (SDK 57+), React 19
- Architecture: Unidirectional state & session context (SessionContext), clean modular layers: screens / components / services / context / theme / types / i18n
- Navigation: Stack navigation within root router (App.tsx)
- Styling: StyleSheet with strict design system tokens (colors, typography, spacing, radius)
- Icons: @expo/vector-icons (MaterialIcons)
- Map: Vector district map with bundled Uttar Pradesh boundaries (react-native-svg); selected district filled #005EA2
- Storage: AsyncStorage for cached reports. Tests: Node test runner with tsx / Jest
- Backend (later phase): Ktor (Kotlin) or Node.js + PostgreSQL. No API keys in the app, ever.

PRODUCT RULES
- ONE app, two modes (Buyer, Seller). Mode is chosen on the landing screen and stored in a session object. Shared screens are reused; only the problem list differs by mode.
- Flow: Landing (choose role) -> State/District select -> Map + problem list (bottom sheet) -> feature screens.
- Buyer problems: Title search, Encumbrance Certificate (EC), Buyer eligibility, Physical survey.
- Seller problems: Verify land records, Check EC, Confirm land classification (Section 80), Physical survey, Draft Agreement to Sell (Bayana), Execute sale deed.
- Every feature sits behind a service interface with a Fake implementation now and a Remote API implementation later, switched by a config flag USE_FAKES:
  TitleAnalyzer, EncumbranceAnalyzer, EligibilityChecker, ClassificationChecker, SurveyCoordinator, AgreementGenerator.
- AI is NOT decided yet. Fakes must return realistic placeholder data (clean vs unsafe). Never call any LLM from the app.
- Every result screen shows the disclaimer "AI-assisted analysis. Not legal advice. Verify with a licensed advocate."

DESIGN SYSTEM (implement in src/theme)
- Colors: navy #162E51, action blue #005EA2 (pressed #1A4480), gold #FFBE2E, background #F5F6F7, surface #FFFFFF, border subtle #DFE1E2, border strong #71767A, text #1B1B1B, secondary #565C65, success #00A91C/#ECF3EC, warning #FA9441/#FEF0E4, danger #D54309/#F4E3DB, info #00BDE3/#E7F6F8. Seller header variant #0B4151.
- Font: Public Sans scale. Sizes: 28/34 bold, 20/28 semibold, 16/24, 13/18.
- Flat, official style like USWDS: 4px radius on buttons/inputs, 8px on cards, 1px borders, no shadows, no blur, no gradients.
- Shared components in src/components: OfficialBanner, AppTopBar, PrimaryButton (48px), SecondaryButton (outlined 2px), LabeledTextField, DropdownField, SelectableCard, StepIndicator, StatusBanner (icon + text + color, never color-only), TimelineNode, ScoreGauge, DisclaimerText.
- Accessibility: 48px touch targets, accessibilityLabel on all interactive elements, WCAG AA contrast, English and Hindi bilingual dictionary (src/i18n/strings.ts).

WORKING RULES
- Work in small phases. At the end of each phase: the project must typecheck (npx tsc --noEmit), unit tests must pass (npm test), and you must give a short summary plus how to run it. Do not start the next phase until told to do so.
- Ask before adding any dependency not listed above.
- No hardcoded strings or raw colors in screen files; use theme constants and i18n dictionary.
- Keep files small (< 150-200 lines) and named clearly.

Phase 1: project, theme, navigation, all screens on fake data (Completed)
Create the Expo Go project and implement the design system and every screen from /design using Fake implementations.

1. Scaffold the project with TypeScript, Expo SDK 57, vector icons, svg, and safe-area context.
2. Implement src/theme (colors.ts, typography.ts) and all 12 shared components.
3. Implement screens matching the designs: Landing, LocationSelect (State + District), MapAndProblems (UP vector map + problem list), TitleSearchInput, TitleReport, EcAnalysis, BuyerEligibility, SurveyTracker, BayanaDraft, plus placeholder screens for Land Records (seller), Section 80, and Execute Sale Deed.
4. Implement session state (mode, state, district, tehsil, language) shared across the flow via SessionContext.
5. Map screen: react-native-svg with UP district boundaries, highlight selected district in #005EA2, zoom controls, "Change district" link.
6. Fakes: FakeTitleAnalyzer returns a clean report (82) for Khasra numbers ending in an even digit and a risky report (38) for odd digits, so both states can be demoed. Other fakes return realistic data shown in the designs.
7. Unit tests: FakeTitleAnalyzer (even/odd rule), FakeEligibilityChecker (Section 89 12.50-acre ceiling), FakeAgreementGenerator.

Definition of done: Run on Expo Go (npm start), click through the full buyer flow and seller flow with fake data, visually matching /design, and npm test passes.

Phase 2: backend, database, title-search engine
Add a backend module (/backend) and make Title Search real using deterministic logic. No LLM.

1. PostgreSQL schema (Flyway / SQL migrations): plots(id, district, tehsil, village, khasra_no, khatauni_no, area_sqm), ownership_events(id, plot_id, event_date, type, grantor, grantee, area_sqm, source_doc, mutation_recorded boolean, litigation_flag boolean), documents(id, plot_id, type, storage_url).
2. A synthetic data generator that seeds ~300 plots with realistic ownership chains and injects labeled defects: broken chain, sale without mutation, area sold exceeds parent, missing legal heir, pending litigation. Store the injected defect labels in a separate table for evaluation.
3. Implement TitleRulesEngine with these checks and severity weights: broken chain 35, sale without mutation 20, area exceeds parent 30, inheritance missing heirs 25, fuzzy name mismatch 10, unexplained time gap 8, litigation 40. Score = 100 * product(1 - w/100) for each triggered check. Bands: >=80 green, 50-79 amber, <50 red.
4. Name matching: Jaro-Winkler on normalized names (strip honorifics like Shri/Smt/Sri, lowercase, transliteration-ready). >=0.9 same, 0.75-0.9 "needs confirmation", below = mismatch.
5. Endpoint GET /v1/plots/{khasra}/title-report?district=&village= returning JSON: score, band, timeline[], findings[], summary. Summary is generated from findings by a SummaryGenerator interface (template-based stub now, LLM later).
6. Unit tests for every rule and an evaluation test that runs the engine over the seeded data and prints precision/recall per injected defect type.
7. Add docker-compose.yml with Postgres.

Definition of done: docker compose up, run the seed, curl the endpoint, and see correct scores. Tests pass.

Phase 3: connect the app to the backend
Add RemoteTitleAnalyzer making HTTP requests against the backend and switch it on with USE_FAKES=false. Map the JSON to the existing TitleReport domain model. Handle loading, empty, error and offline states with proper UI (retry button, plain-language error text). Cache the last report per plot with AsyncStorage. Add mock tests. Keep the fakes for demo and tests.

Phase 4: EC, eligibility, Section 80 (rules-based with AI stubs)
Implement these behind their existing interfaces, on the backend.

1. EC: endpoint accepting an uploaded EC (PDF/image) and returning structured rows. Create an ExtractionService interface with a StubExtractionService returning canned rows now (LLM/OCR plugs in later). Implement the deterministic matcher that pairs each mortgage with a release by parties, amount and property; unmatched mortgage = active encumbrance. Return { activeEncumbrances[], risk, summary }.
2. Eligibility: a data-driven rules table (JSON in resources, each rule has id, condition, outcome, sectionReference, text). Inputs: buyer profile (agriculturist, category, existing holdings) and land attributes. Output: ELIGIBLE / PERMISSION_REQUIRED / NOT_ELIGIBLE plus the cited rule. Seed 6 example rules marked "PLACEHOLDER - lawyer must verify".
3. Section 80: accept plot id and a conversion order upload, extract order number and date via the stub extraction service, check consistency, return VALID / MISSING / MISMATCH.
4. Add file upload in the app (photo picker + document picker) with a confirm-extracted-fields screen before submitting.

Add tests for the matcher and the rules engine.

Phase 5: survey agent and Bayana PDF
1. Survey: model as a durable state machine in the backend: REQUESTED, SURVEYOR_SHORTLISTED, USER_APPROVES, CONTACTED, SCHEDULED, SURVEY_DONE, REPORT_UPLOADED, REPORT_VERIFIED, CLOSED. Persist survey_case and survey_events in Postgres. Human approval gate before CONTACTED. A MockSurveyorGateway simulates replies and scheduling. SurveyAgent is an interface (rule-based now, LLM tool-calling later). The app polls to update the tracker screen and shows the activity log.
2. Bayana: AgreementGenerator fills a clause template (Mustache/Freemarker) with parties, plot, price, advance and timeline, then renders HTML to PDF. Use a Noto Sans Devanagari-capable pipeline. Return the PDF to the app and open it with the system viewer. Mark the template "DRAFT - not legal advice".
