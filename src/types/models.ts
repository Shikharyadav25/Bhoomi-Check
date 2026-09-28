export type UserMode = 'BUYER' | 'SELLER';
export type Language = 'en' | 'hi';

export type ScreenName =
  | 'Landing'
  | 'LocationSelect'
  | 'MapAndProblems'
  | 'TitleSearchInput'
  | 'TitleReport'
  | 'EcAnalysis'
  | 'BuyerEligibility'
  | 'SurveyTracker'
  | 'BayanaDraft'
  | 'LandRecordsPlaceholder'
  | 'Section80Placeholder'
  | 'ExecuteSaleDeedPlaceholder';

export interface SessionState {
  mode: UserMode;
  state: string;
  district: string;
  tehsil: string;
  language: Language;
}

export interface TitleEvent {
  year: string;
  date: string;
  type: string;
  grantor: string;
  grantee: string;
  areaSqm: string;
  docNumber: string;
  mutationRecorded: boolean;
  statusText: string;
  isRisk: boolean;
}

export interface TitleFinding {
  title: string;
  description: string;
  isRisk: boolean;
}

export interface TitleReport {
  score: number;
  khasraNo: string;
  districtJurisdiction: string;
  legalHeirStatus: string;
  courtCaveatStatus: string;
  mortgageStatus: string;
  band: 'green' | 'amber' | 'red';
  hasDiscrepancies: boolean;
  discrepancyCount: number;
  timeline: TitleEvent[];
  findings: TitleFinding[];
  summary: string;
}

export interface EncumbranceEntry {
  year: string;
  lender: string;
  amountRupees: number;
  deedType: string;
  registrationDate: string;
  isDischarged: boolean;
}

export interface EncumbranceReport {
  khasraNo: string;
  hasActiveEncumbrances: boolean;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  entries: EncumbranceEntry[];
  actionRequired: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  currentAcres: number;
  proposedAcres: number;
  totalAcres: number;
  maxCeilingAcres: number;
  statusTitle: string;
  explanation: string;
  statutoryReference: string;
}

export interface SurveyData {
  khasraNo: string;
  deedAreaHa: number;
  groundAreaHa: number;
  discrepancyHa: number;
  discrepancyDirection: string;
  roadBufferMeters: number;
  recommendation: string;
}

export interface BayanaAgreement {
  sellerName: string;
  buyerName: string;
  district: string;
  tehsil: string;
  village: string;
  khasraNo: string;
  totalConsiderationRupees: number;
  advanceEarnestRupees: number;
  balanceDueRupees: number;
  timelineMonths: number;
  agreementDate: string;
}
