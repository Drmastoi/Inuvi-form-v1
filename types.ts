
export type YesNo = 'Yes' | 'No' | '';

export interface FamilyMember {
  relation: string;
  age: string;
  diagnosis: string;
  ageAtDeath?: string;
}

export interface FormData {
  // Pre-Screening
  covidDiagnosed: YesNo;
  covidDiagnosedDetails?: string;
  covidSymptoms: YesNo;
  covidSymptomsDetails?: string;
  covidSelfIsolate: YesNo;
  covidSelfIsolateDetails?: string;

  // Medical History
  underMedicalCare: YesNo;
  underMedicalCareDetails?: string;
  seenGPIn2Years: YesNo;
  seenGPIn2YearsDetails?: string;
  referredConsultant: YesNo;
  referredConsultantDetails?: string;
  hadSpecialScans: YesNo;
  hadSpecialScansDetails?: string;
  takenNonPrescribedDrugs: YesNo;
  takenNonPrescribedDrugsDetails?: string;
  inPatientOutPatient: YesNo;
  inPatientOutPatientDetails?: string;
  currentlyTakingMedication: YesNo;
  medicationDetails?: {
    name: string;
    dosage: string;
    purpose: string;
    duration: string;
  }[];
  livedOutsideUK: YesNo;
  livedOutsideUKDetails?: string;
  timeOffWork: YesNo;
  timeOffWorkDetails?: string;

  // Systemic Review
  heartDisease: YesNo;
  respiratoryDisease: YesNo;
  digestiveDisease: YesNo;
  mentalDisorder: YesNo;
  nervousDisorder: YesNo;
  glandularDisorder: YesNo;
  skinDisorder: YesNo;
  musclesJointsDisorder: YesNo;
  genitoUrinaryDisorder: YesNo;
  bloodDisorder: YesNo;
  cancerHistory: YesNo;
  physicalInjury: YesNo;
  otherIllness: YesNo;
  systemicDetails: Record<string, string>;

  // Lifestyle
  hivRisk: YesNo;
  hivRiskDetails?: string;
  stdPositive: YesNo;
  stdPositiveDetails?: string;
  hepatitisPositive: YesNo;
  hepatitisPositiveDetails?: string;
  smoker: YesNo;
  smokeDailyAmount?: string;
  pastSmoker: YesNo;
  pastSmokerDetails?: string;
  stoppedSmokingDate?: string;
  stoppedOnMedicalAdvice: YesNo;
  stoppedOnMedicalAdviceDetails?: string;
  nicotineProducts: YesNo;
  nicotineProductsDetails?: string;
  drinksAlcohol: YesNo;
  alcoholUnitsPerWeek?: string;
  abstainerDuration?: string;
  alcoholAdvisedToReduce: YesNo;
  alcoholAdvisedToReduceDetails?: string;
  weightChanged12Months: YesNo;
  weightChangeDetails?: string;
  exerciseRegularly: YesNo;
  exerciseDetails?: string;

  // Family History
  familyHistory: FamilyMember[];

  // Examiner Observations
  examinerKnowledge: YesNo;
  examinerKnowledgeDetails?: string;
  appearanceConsistent: YesNo;
  appearanceConsistentDetails?: string;
  appearanceAbnormal: YesNo;
  appearanceAbnormalDetails?: string;
  misuseSigns: YesNo;
  misuseSignsDetails?: string;
  nicotineStaining: YesNo;
  nicotineStainingDetails?: string;
  clubbingNails: YesNo;
  clubbingNailsDetails?: string;

  // Physical Exams
  height: string;
  weight: string;
  abdominalGirth: string;
  hips: string;
  heartSoundsAbnormal: YesNo;
  heartSoundsAbnormalDetails?: string;
  heartMurmurs: YesNo;
  heartMurmurDetails?: string;
  heartEnlarged: YesNo;
  heartEnlargedDetails?: string;
  varicoseVeins: YesNo;
  varicoseVeinsDetails?: string;
  pulsesWeak: YesNo;
  pulsesWeakDetails?: string;
  bpReading1: string;
  bpReading2: string;
  bpReading3: string;
  pulseCharacter: 'Strong' | 'Weak' | 'Regular' | 'Irregular' | '';
  pulseCharacterDetails?: string;
  chestAbnormality: YesNo;
  chestAbnormalityDetails?: string;
  lungAbnormality: YesNo;
  lungAbnormalityDetails?: string;
  peakFlow: string;
  tongueAbnormality: YesNo;
  tongueAbnormalityDetails?: string;
  abdomenAbnormality: YesNo;
  abdomenAbnormalityDetails?: string;
  scars: YesNo;
  scarsDetails?: string;
  endocrineAbnormality: YesNo;
  endocrineAbnormalityDetails?: string;
  musculoSkeletalProblem: YesNo;
  musculoSkeletalProblemDetails?: string;
  upperLimbsAbnormality: YesNo;
  upperLimbsAbnormalityDetails?: string;
  lowerLimbsAbnormality: YesNo;
  lowerLimbsAbnormalityDetails?: string;
  centralNervousSystemAbnormality: YesNo;
  centralNervousSystemAbnormalityDetails?: string;
  psychiatricTendency: YesNo;
  psychiatricTendencyDetails?: string;
  tremors: YesNo;
  tremorsDetails?: string;
  pupilsAbnormal: YesNo;
  pupilsAbnormalDetails?: string;
  cranialNervesAbnormal: YesNo;
  cranialNervesAbnormalDetails?: string;
  reflexesAbnormal: YesNo;
  reflexesAbnormalDetails?: string;
  eyesAbnormal: YesNo;
  eyesAbnormalDetails?: string;
  earsAbnormal: YesNo;
  earsAbnormalDetails?: string;

  // Urinalysis
  protein: 'NAD' | 'Trace' | '+' | '++' | '+++' | '';
  proteinDetails?: string;
  blood: 'NAD' | 'Trace' | '+' | '++' | '+++' | '';
  bloodDetails?: string;
  sugar: 'NAD' | 'Trace' | '+' | '++' | '+++' | '';
  sugarDetails?: string;
  suspectSample: YesNo;
  suspectSampleDetails?: string;
  sentToLab: YesNo;
  sentToLabDetails?: string;
  noSampleReason?: string;
  cotinineTest: 'Positive' | 'Negative' | '';
  cotinineTestDetails?: string;

  // Final Checklist
  examinerComments: string;
  checklistFullyAnswered: boolean;
  checklistSigned: boolean;
  checklistBloodTaken: boolean;
  bloodSampleComments: string;
}

export enum FormStep {
  COVID = 0,
  HISTORY = 1,
  SYSTEMIC = 2,
  LIFESTYLE = 3,
  FAMILY = 4,
  EXAMINER = 5,
  PHYSICAL = 6,
  LABS = 7,
  REVIEW = 8
}
