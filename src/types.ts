export type AppJourneyStage =
  | 'UPLOAD'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'READY'
  | 'REVIEW';

export type BiomarkerStatus =
  | 'NORMAL'
  | 'LOW'
  | 'HIGH'
  | 'CRITICAL_LOW'
  | 'CRITICAL_HIGH';

export interface Biomarker {
  id: string;
  name: string;
  code: string; // LOINC or hospital code
  value: number | string;
  unit: string;
  referenceRange: string;
  status: BiomarkerStatus;
  category: 'Hematology' | 'Renal & Electrolytes' | 'Hepatic & Metabolic' | 'Iron Studies' | 'Coagulation';
  delta?: string; // comparison to prior e.g. "-1.4 vs 14d ago"
  discoveredAtSecond: number; // for staged extraction animation
}

export interface DifferentialDiagnosis {
  condition: string;
  probability: number; // percentage
  status: 'Likely' | 'Possible' | 'Unlikely';
  rationale: string;
}

export interface ReflexTest {
  id: string;
  name: string;
  priority: 'STAT / Urgent' | 'Standard Reflex' | 'Secondary';
  reason: string;
  recommended: boolean;
}

export interface ClinicalCase {
  id: string;
  fileName: string;
  fileSize: string;
  pageCount: number;
  caseTitle: string;
  shortDescription: string;
  hospitalName: string;
  accessionNumber: string;
  patientName: string;
  patientMrn: string;
  patientAge: number;
  patientSex: 'Female' | 'Male';
  collectionTimestamp: string;
  specimenType: string;
  orderingPhysician: string;
  criticalAlert?: string;
  primaryImpression: string;
  clinicalNarrative: string;
  pathophysiologicalCorrelation: string[];
  differentials: DifferentialDiagnosis[];
  reflexTests: ReflexTest[];
  biomarkers: Biomarker[];
}

export interface ProcessingStageConfig {
  id: number;
  title: string;
  shortTitle: string;
  startSecond: number;
  endSecond: number;
  description: string;
  liveSubTasks: string[];
}
