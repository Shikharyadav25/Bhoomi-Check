# BhoomiCheck (भूमि-चेक)

> **Civil & Statutory Land Due Diligence Portal**  
> *A prototype and proof-of-concept (PoC) designed for government revenue departments and citizens to automate land verification, cadastral due diligence, and legal documentation using AI.*

---

## Executive Overview

Land acquisition and agricultural parcel purchases in India—particularly in Uttar Pradesh—are historically fraught with opacity, fragmented records, and prolonged manual desk-checking. Key land records are scattered across disconnected government silos:
- **UP Bhulekh:** RoR (Record of Rights / Khatauni) ledger and ownership entries
- **Sub-Registrar (IGRSUP):** Registered sale deeds, mortgages, and encumbrances
- **BhuNaksha:** Cadastral parcel maps and demarcation surveys
- **RCMS (Revenue Court Management System):** Pending litigation, stay orders, and partition suits

**BhoomiCheck** bridges these silos into a single, unified civic platform. Built as a prototype for modern digital governance, it enables citizens, buyers, and sellers to conduct comprehensive statutory due diligence in minutes while automating physical inspection tasks and document drafting through deterministic rules and AI assistance.

---

## Key Problems Addressed

1. **Broken Chain of Title:** Undetected gaps in ownership, unrecorded transfers, or missing legal heir entries that lead to post-purchase eviction or lawsuits.
2. **Hidden Encumbrances & Liens:** Undeclared agricultural loans or registered bank mortgages that run with the land.
3. **Statutory Ceiling Violations:** Section 89 of the UP Revenue Code, 2006 imposes a strict 12.50-acre (5.058-hectare) ceiling on agricultural land acquisitions by individuals.
4. **Cadastral & Ground Discrepancies:** Paper deeds stating one area while physical site boundaries or road widening buffer zones reduce actual usable area.
5. **Contract Disputes:** Non-standard informal agreements to sell (Bayana / इकरारनामा) lacking statutory safeguards, forfeiture clauses, or clear timelines.

---

## Dual-Mode Architecture

BhoomiCheck operates as a single application with role-tailored workflows selected at entry:

```
                      ┌────────────────────────┐
                      │     Landing Screen     │
                      │  (Select User Role)    │
                      └───────────┬────────────┘
                                  │
                      ┌───────────▼────────────┐
                      │    Location Select     │
                      │  (UP District/Tehsil)  │
                      └───────────┬────────────┘
                                  │
                      ┌───────────▼────────────┐
                      │ Map & Problem Selector │
                      │ (UP Vector Map + Sheet)│
                      └─────┬────────────┬─────┘
                            │            │
            ┌───────────────▼─┐        ┌─▼───────────────┐
            │   BUYER MODE    │        │   SELLER MODE   │
            ├─────────────────┤        ├─────────────────┤
            │ • Title Search  │        │ • Land Records  │
            │ • EC Analysis   │        │ • Check EC      │
            │ • Eligibility   │        │ • Section 80    │
            │ • Survey Check  │        │ • Physical Surv │
            │                 │        │ • Bayana Draft  │
            │                 │        │ • Sale Deed Prep│
            └─────────────────┘        └─────────────────┘
```

---

## Features Implemented in Prototype

### 1. 30-Year Title Search & Continuity Audit
- **Deterministic Rules Engine:** Audits historical deed chains from 1994 consolidation (चकबंदी) to present-day transfers.
- **ScoreGauge (0–100):** Visual health indicator categorized into statutory risk bands:
  - **Green (80–100):** Clean marketable title, zero mutation disputes.
  - **Amber (50–79):** Moderate risk, pending NOC or probate confirmation required.
  - **Red (<50):** Critical title defect, rejected mutation, or active injunction.
- **Demo Verification Rule:** Even-numbered Khasras (e.g. `248/2`) yield a clean report (Score 82); odd-numbered Khasras (e.g. `248/1`) reveal high-risk litigation flags (Score 38).

### 2. Encumbrance Certificate (EC) Matching
- Analyzes 20-year registered charge histories from Sub-Registrar databases.
- Automatically pairs bank mortgages with registered discharge/release deeds.
- Generates a **Certificate of Nil Encumbrance (Form 16)** readout.

### 3. Statutory Buyer Eligibility Calculator (Section 89)
- Enforces UP Revenue Code Section 89 ceiling limitations (12.50 Acres).
- Calculates combined holding (existing holding + proposed acquisition).
- Factors in registered agriculturist status and social category compliance.

### 4. Cadastral Boundary Alignment & Deficit Finder
- Visualizes official BhuNaksha digital revenue parcel maps (1:2000) overlaid against high-resolution satellite imagery.
- Automatically flags road buffer encroachments (e.g. PWD highways, high-tension lines).
- Generates draft **Section 24 Physical Demarcation Notices** for the Tehsildar.

### 5. Automated Agreement to Sell (Bayana / इकरारनामा) Drafter
- Formulates legally compliant bilingual contract templates.
- Automatically calculates earnest money advance, remaining balance, and statutory execution timelines.
- Formats draft with standard UP Transfer of Property clauses.

### 6. Interactive UP District Vector Map
- Built natively using `react-native-svg` without external mapping API dependencies or tracking keys.
- Renders regional district boundaries with real-time selection and contextual routing.

### 7. Bilingual Accessibility (English & हिन्दी)
- Instant one-tap switching between English and Hindi across all screens, banners, forms, and legal terminology.

---

## Planned & Expandable Features

The architecture is designed to support direct government API integration and advanced AI tooling in upcoming phases:

| Feature | Description | Status / Target |
| :--- | :--- | :--- |
| **Section 80 OCR Validator** | AI vision extraction of SDM non-agricultural conversion court orders (धारा 80 / 143) to prevent illegal plotting on agricultural land. | Planned (Phase 4) |
| **RCMS Court Scanner** | Direct webhook/API querying of Revenue Court Management System to catch stay orders filed within the last 24 hours. | Planned (Phase 2) |
| **Circle Rate & Stamp Duty Engine** | Dynamic computation of applicable circle rates by road width, commercial frontage, and registration charges for LDA/ADA/GDA zones. | Planned (Phase 4) |
| **AI Surveyor Dispatch Agent** | Durable state machine coordinating verified licensed land surveyors for on-site DGPS boundary demarcation. | Planned (Phase 5) |
| **Voice-First Vernacular Queries** | Speech-to-text integration in regional dialects (Bhojpuri, Awadhi, Hindi) to serve rural farmers without digital literacy barriers. | Planned (Future) |
| **Offline RoR Vault** | Encrypted local storage (AsyncStorage / SQLite) preserving certified RoR khatauni copies for offline field access. | Planned (Phase 3) |

---

## Design System

BhoomiCheck follows a strict, flat civic design system inspired by official USWDS principles:
- **Palette:** Navy (`#162E51`), Action Blue (`#005EA2`), Gold (`#FFBE2E`), Canvas (`#F5F6F7`), Surface (`#FFFFFF`).
- **Typography:** Strict Public Sans scale tokens (28/34 bold, 20/28 semibold, 16/24 regular, 13/18 caption).
- **Geometry:** 4px radius on buttons and inputs, 8px on cards, 1px borders, zero box-shadows, zero blur, zero gradient glows.
- **Accessibility:** 48px touch targets, full contrast ratios meeting WCAG AA standards, and descriptive accessibility labels.

---

## Project Structure

```
BhoomiCheck/
├── App.tsx                     # Main application entry & stack navigator
├── AGENTS.md                   # Product specification & architectural rules
├── app.json                    # Expo project configuration
├── package.json                # Dependencies, scripts, and test definitions
├── tsconfig.json               # TypeScript configuration
├── assets/                     # App icons, splash screens, and vector assets
└── src/
    ├── components/             # 12 Shared USWDS design system components
    │   ├── AppTopBar.tsx
    │   ├── DisclaimerText.tsx
    │   ├── DropdownField.tsx
    │   ├── LabeledTextField.tsx
    │   ├── OfficialBanner.tsx
    │   ├── PrimaryButton.tsx
    │   ├── ScoreGauge.tsx
    │   ├── SecondaryButton.tsx
    │   ├── SelectableCard.tsx
    │   ├── StatusBanner.tsx
    │   ├── StepIndicator.tsx
    │   └── TimelineNode.tsx
    ├── context/
    │   └── SessionContext.tsx  # Unidirectional session state, mode, language & router
    ├── i18n/
    │   └── strings.ts          # Bilingual English/Hindi dictionary
    ├── screens/                # User interface screens
    │   ├── BayanaDraftScreen.tsx
    │   ├── BuyerEligibilityScreen.tsx
    │   ├── EcAnalysisScreen.tsx
    │   ├── LandingScreen.tsx
    │   ├── LocationSelectScreen.tsx
    │   ├── MapAndProblemsScreen.tsx
    │   ├── PlaceholderScreen.tsx
    │   ├── SurveyTrackerScreen.tsx
    │   ├── TitleReportScreen.tsx
    │   └── TitleSearchInputScreen.tsx
    ├── services/
    │   └── fake/               # Fake domain implementations for demo & testing
    │       ├── __tests__/      # Automated unit tests
    │       ├── fakeAgreementGenerator.ts
    │       ├── fakeEligibilityChecker.ts
    │       ├── fakeEncumbranceAnalyzer.ts
    │       ├── fakeSurveyCoordinator.ts
    │       └── fakeTitleAnalyzer.ts
    ├── theme/
    │   ├── colors.ts           # Civic color tokens
    │   └── typography.ts       # Public Sans typographic scale
    └── types/
        └── models.ts           # Central TypeScript interfaces & domain models
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Expo Go](https://expo.dev/go) app installed on your physical mobile device (Android or iOS)

### Installation
```bash
# Clone the repository
git clone https://github.com/Shikharyadav25/Bhoomi-Check.git
cd Bhoomi-Check

# Install dependencies
npm install
```

### Running the App
```bash
# Start the Expo development server
npm start
```
- A QR code will display in your terminal.
- Open **Expo Go** on your Android or iOS device and scan the QR code to run the application immediately.

### Verification & Testing
```bash
# Verify TypeScript type correctness (zero errors)
npx tsc --noEmit

# Run unit tests
npm test
```

---

## Statutory Disclaimer

> *AI-assisted analysis. Not legal advice. Verify with a licensed advocate.*  
> BhoomiCheck is a technology proof-of-concept developed to demonstrate the feasibility of automated civic land intelligence. Land transactions must comply with all provisions of the Uttar Pradesh Revenue Code, 2006 and the Registration Act, 1908.
