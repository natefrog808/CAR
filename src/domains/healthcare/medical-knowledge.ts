/**
 * Medical Knowledge for the Critique of Artificial Reason (CAR)
 * 
 * This module provides domain-specific knowledge structures for healthcare applications
 * of the Kantian AI framework. It defines interfaces and types for representing
 * patient data, clinical information, diagnoses, treatments, and other healthcare
 * concepts necessary for clinical reasoning.
 * 
 * The structures defined here are used by the CAR Healthcare implementation to
 * organize and process medical information in a way that respects epistemic
 * boundaries, enables ethical reasoning, and supports clinical decision-making
 * with appropriate humility and transparency.
 */

/**
 * Patient profile information
 */
export interface PatientProfile {
  /** Patient identifier */
  id?: string;
  
  /** Age in years */
  age?: number;
  
  /** Biological sex */
  sex?: 'male' | 'female' | 'other';
  
  /** Gender identity if different from biological sex */
  gender?: string;
  
  /** Patient height (cm) */
  height?: number;
  
  /** Patient weight (kg) */
  weight?: number;
  
  /** Body mass index (calculated) */
  bmi?: number;
  
  /** Race/ethnicity information */
  ethnicity?: string[];
  
  /** Medical history conditions */
  medicalHistory?: MedicalCondition[];
  
  /** Surgical history */
  surgicalHistory?: SurgicalProcedure[];
  
  /** Current medications */
  medications?: Medication[];
  
  /** Allergies and adverse reactions */
  allergies?: Allergy[];
  
  /** Family medical history */
  familyHistory?: FamilyHistory[];
  
  /** Social history */
  socialHistory?: SocialHistory;
  
  /** Health risk factors */
  riskFactors?: RiskFactor[];
  
  /** Immunization history */
  immunizations?: Immunization[];
  
  /** Patient preferences */
  preferences?: string | PatientPreferences;
  
  /** Advance directives */
  advanceDirectives?: AdvanceDirective[];
  
  /** Functional status */
  functionalStatus?: FunctionalStatus;
  
  /** Insurance and payment information */
  insurance?: InsuranceInfo;
}

/**
 * Medical condition in patient history
 */
export interface MedicalCondition {
  /** Condition name */
  name: string;
  
  /** When condition was diagnosed */
  onsetDate?: string | Date;
  
  /** Duration of condition */
  duration?: string;
  
  /** Current status */
  status: 'active' | 'resolved' | 'in_remission' | 'recurrent';
  
  /** Severity of condition */
  severity?: 'mild' | 'moderate' | 'severe';
  
  /** Treatment history for this condition */
  treatments?: string[];
  
  /** Relevant diagnostic tests */
  diagnostics?: string[];
  
  /** Treating providers */
  providers?: string[];
  
  /** Additional notes */
  notes?: string;
}

/**
 * Surgical procedure in patient history
 */
export interface SurgicalProcedure {
  /** Procedure name */
  name: string;
  
  /** Date of procedure */
  date?: string | Date;
  
  /** Reason for procedure */
  indication?: string;
  
  /** Complications, if any */
  complications?: string[];
  
  /** Surgeon/facility */
  provider?: string;
  
  /** Outcome */
  outcome?: string;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Medication information
 */
export interface Medication {
  /** Medication name (generic preferred) */
  name: string;
  
  /** Strength and units */
  strength?: string;
  
  /** Dosage amount */
  dosage?: string;
  
  /** Frequency of administration */
  frequency?: string;
  
  /** Route of administration */
  route?: 'oral' | 'intravenous' | 'subcutaneous' | 'intramuscular' | 'topical' | 'inhaled' | 'other';
  
  /** Start date */
  startDate?: string | Date;
  
  /** End date (if applicable) */
  endDate?: string | Date;
  
  /** Duration of use */
  duration?: string;
  
  /** Indication for medication */
  indication?: string;
  
  /** Prescribing provider */
  prescriber?: string;
  
  /** Patient adherence information */
  adherence?: 'good' | 'moderate' | 'poor' | 'unknown';
  
  /** Effectiveness of medication */
  effectiveness?: 'effective' | 'partially_effective' | 'ineffective' | 'unknown';
  
  /** Side effects experienced */
  sideEffects?: string[];
  
  /** Additional notes */
  notes?: string;
}

/**
 * Allergy information
 */
export interface Allergy {
  /** Allergen/substance */
  substance: string;
  
  /** Reaction description */
  reaction: string;
  
  /** Severity of reaction */
  severity: 'mild' | 'moderate' | 'severe' | 'life_threatening';
  
  /** Certainty of diagnosis */
  certainty?: 'confirmed' | 'suspected' | 'reported';
  
  /** Onset date */
  onsetDate?: string | Date;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Family history information
 */
export interface FamilyHistory {
  /** Condition name */
  condition: string;
  
  /** Affected family members */
  relation: 'mother' | 'father' | 'sister' | 'brother' | 'daughter' | 'son' | 'grandfather' | 'grandmother' | 'aunt' | 'uncle' | 'cousin' | 'other';
  
  /** Age at onset if known */
  ageAtOnset?: number;
  
  /** Current status */
  status?: 'living_with_condition' | 'deceased_from_condition' | 'deceased_unrelated' | 'unknown';
  
  /** Additional information */
  notes?: string;
}

/**
 * Social history information
 */
export interface SocialHistory {
  /** Smoking status */
  smokingStatus?: 'never' | 'former' | 'current' | 'unknown';
  
  /** Smoking details */
  smokingDetails?: {
    type?: 'cigarettes' | 'cigars' | 'pipe' | 'e-cigarettes' | 'other';
    amount?: string;
    duration?: string;
    packYears?: number;
    quitDate?: string | Date;
  };
  
  /** Alcohol use */
  alcoholUse?: 'none' | 'occasional' | 'moderate' | 'heavy' | 'former' | 'unknown';
  
  /** Alcohol details */
  alcoholDetails?: {
    type?: string[];
    frequency?: string;
    amount?: string;
    quitDate?: string | Date;
  };
  
  /** Substance use */
  substanceUse?: {
    substance: string;
    status: 'never' | 'former' | 'current' | 'unknown';
    frequency?: string;
    route?: string;
    duration?: string;
    lastUse?: string | Date;
  }[];
  
  /** Diet information */
  diet?: {
    type?: string;
    restrictions?: string[];
    notes?: string;
  };
  
  /** Exercise habits */
  exercise?: {
    frequency?: string;
    type?: string[];
    duration?: string;
    intensity?: 'light' | 'moderate' | 'vigorous';
  };
  
  /** Occupation information */
  occupation?: {
    current?: string;
    past?: string[];
    exposures?: string[];
    status?: 'employed' | 'unemployed' | 'retired' | 'disabled' | 'student';
  };
  
  /** Living situation */
  livingSituation?: {
    arrangement?: 'alone' | 'with_family' | 'with_others' | 'facility' | 'homeless';
    caregivers?: string[];
    dependents?: string[];
    environment?: string;
    adequacy?: 'adequate' | 'inadequate';
  };
  
  /** Education level */
  education?: string;
  
  /** Religious or spiritual beliefs relevant to healthcare */
  religiousBeliefs?: string;
  
  /** Travel history relevant to health */
  travelHistory?: {
    location: string;
    dates?: string;
    illnesses?: string[];
  }[];
  
  /** Additional social determinants of health */
  socialDeterminants?: {
    economicStability?: string;
    foodSecurity?: 'secure' | 'insecure' | 'unknown';
    transportation?: 'reliable' | 'unreliable' | 'none';
    socialSupport?: 'strong' | 'moderate' | 'minimal' | 'none';
    safetyConcerns?: string[];
  };
}

/**
 * Health risk factor
 */
export interface RiskFactor {
  /** Risk factor name */
  name: string;
  
  /** Risk category */
  category?: 'behavioral' | 'genetic' | 'environmental' | 'occupational' | 'demographic' | 'medical';
  
  /** Risk severity/level */
  level?: 'low' | 'moderate' | 'high' | 'very_high';
  
  /** Modifiability */
  modifiable?: boolean;
  
  /** Intervention strategies */
  interventions?: string[];
  
  /** Additional details */
  details?: string;
}

/**
 * Immunization record
 */
export interface Immunization {
  /** Vaccine name */
  name: string;
  
  /** Date administered */
  date: string | Date;
  
  /** Dose number in series */
  doseNumber?: number;
  
  /** Series completion status */
  seriesComplete?: boolean;
  
  /** Administering provider */
  provider?: string;
  
  /** Adverse reactions */
  reactions?: string[];
}

/**
 * Patient preferences
 */
export interface PatientPreferences {
  /** Treatment preferences */
  treatmentPreferences?: {
    generalApproach?: 'aggressive' | 'moderate' | 'conservative' | 'unknown';
    preferNonPharmacological?: boolean;
    preferMinimalInterventions?: boolean;
    preferComplementaryApproaches?: boolean;
    specificPreferences?: string[];
  };
  
  /** Communication preferences */
  communicationPreferences?: {
    directness?: 'very_direct' | 'balanced' | 'gradual';
    detailLevel?: 'minimal' | 'moderate' | 'comprehensive';
    involveFamilyMembers?: string[];
    languageNeeds?: string;
    preferredMethod?: 'in_person' | 'phone' | 'video' | 'email' | 'text';
  };
  
  /** Decision-making preferences */
  decisionMakingPreferences?: {
    role?: 'active' | 'collaborative' | 'passive';
    informationNeeds?: 'minimal' | 'moderate' | 'comprehensive';
    riskTolerance?: 'risk_averse' | 'balanced' | 'risk_tolerant';
    timeFrame?: 'immediate_focus' | 'balanced' | 'long_term_focus';
  };
  
  /** Quality of life priorities */
  qualityOfLifePriorities?: string[];
  
  /** Other preferences */
  otherPreferences?: string[];
}

/**
 * Advance directive
 */
export interface AdvanceDirective {
  /** Type of directive */
  type: 'living_will' | 'healthcare_power_of_attorney' | 'do_not_resuscitate' | 'POLST' | 'other';
  
  /** Date completed */
  dateCompleted: string | Date;
  
  /** Status of directive */
  status: 'active' | 'revoked' | 'superseded';
  
  /** Key details */
  details?: string;
  
  /** Healthcare agent if applicable */
  agent?: {
    name: string;
    relationship: string;
    contact: string;
  };
  
  /** Storage location */
  location?: string;
}

/**
 * Functional status assessment
 */
export interface FunctionalStatus {
  /** Activities of daily living */
  adl?: {
    bathing?: 'independent' | 'assistance' | 'dependent';
    dressing?: 'independent' | 'assistance' | 'dependent';
    toileting?: 'independent' | 'assistance' | 'dependent';
    transferring?: 'independent' | 'assistance' | 'dependent';
    continence?: 'independent' | 'assistance' | 'dependent';
    feeding?: 'independent' | 'assistance' | 'dependent';
  };
  
  /** Instrumental activities of daily living */
  iadl?: {
    shopping?: 'independent' | 'assistance' | 'dependent';
    foodPreparation?: 'independent' | 'assistance' | 'dependent';
    housekeeping?: 'independent' | 'assistance' | 'dependent';
    laundry?: 'independent' | 'assistance' | 'dependent';
    transportation?: 'independent' | 'assistance' | 'dependent';
    medication?: 'independent' | 'assistance' | 'dependent';
    finances?: 'independent' | 'assistance' | 'dependent';
    communication?: 'independent' | 'assistance' | 'dependent';
  };
  
  /** Mobility status */
  mobility?: {
    ambulation?: 'independent' | 'cane' | 'walker' | 'wheelchair' | 'bedbound';
    distance?: string;
    stability?: 'stable' | 'unstable' | 'fall_risk';
  };
  
  /** Cognitive assessment */
  cognition?: {
    orientation?: 'intact' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment';
    memory?: 'intact' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment';
    executiveFunction?: 'intact' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment';
    formalAssessment?: string;
    score?: number;
  };
  
  /** Standardized assessment scores */
  assessmentScores?: {
    name: string;
    score: number | string;
    date: string | Date;
    interpretation?: string;
  }[];
  
  /** Sensory impairments */
  sensoryImpairments?: {
    visual?: 'none' | 'mild' | 'moderate' | 'severe' | 'blind';
    hearing?: 'none' | 'mild' | 'moderate' | 'severe' | 'deaf';
    other?: string[];
  };
  
  /** Assistive devices */
  assistiveDevices?: string[];
  
  /** Caregiver support */
  caregiverSupport?: 'none' | 'partial' | 'full' | 'unknown';
}

/**
 * Insurance information
 */
export interface InsuranceInfo {
  /** Primary insurance */
  primary?: {
    provider: string;
    policyNumber?: string;
    groupNumber?: string;
    policyHolder?: string;
    relationship?: 'self' | 'spouse' | 'parent' | 'other';
    coverageType?: 'medical' | 'dental' | 'vision' | 'comprehensive';
  };
  
  /** Secondary insurance */
  secondary?: {
    provider: string;
    policyNumber?: string;
    groupNumber?: string;
    policyHolder?: string;
    relationship?: 'self' | 'spouse' | 'parent' | 'other';
    coverageType?: 'medical' | 'dental' | 'vision' | 'comprehensive';
  };
  
  /** Prescription coverage */
  prescriptionCoverage?: boolean;
  
  /** Out-of-network coverage */
  outOfNetworkCoverage?: boolean;
  
  /** Prior authorization requirements */
  priorAuthorizationRequired?: boolean;
  
  /** Referral requirements */
  referralRequired?: boolean;
}

/**
 * Clinical data including symptoms, exams, and tests
 */
export interface ClinicalData {
  /** Chief complaint/presenting problem */
  chiefComplaint?: string;
  
  /** Current symptoms */
  symptoms?: Symptom[];
  
  /** Review of systems */
  reviewOfSystems?: ReviewOfSystems;
  
  /** Physical examination findings */
  physicalExam?: PhysicalFinding[];
  
  /** Vital signs */
  vitalSigns?: VitalSigns;
  
  /** Laboratory test results */
  labResults?: LabResult[];
  
  /** Imaging studies */
  imaging?: ImagingStudy[];
  
  /** Other diagnostic tests */
  diagnosticTests?: DiagnosticTest[];
  
  /** Assessment scores */
  assessmentScores?: AssessmentScore[];
  
  /** Clinical impressions */
  clinicalImpressions?: string[];
}

/**
 * Symptom information
 */
export interface Symptom {
  /** Symptom name */
  name: string;
  
  /** Time since onset */
  duration?: string;
  
  /** Onset characteristics */
  onset?: 'sudden' | 'gradual' | 'unknown';
  
  /** Pattern over time */
  pattern?: 'continuous' | 'intermittent' | 'worsening' | 'improving' | 'stable' | 'fluctuating';
  
  /** Severity rating */
  severity?: 'mild' | 'moderate' | 'severe' | number;
  
  /** Location of symptom */
  location?: string;
  
  /** What makes it better */
  alleviatingFactors?: string[];
  
  /** What makes it worse */
  aggravatingFactors?: string[];
  
  /** Associated symptoms */
  associatedSymptoms?: string[];
  
  /** Context information */
  context?: string;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Review of systems
 */
export interface ReviewOfSystems {
  /** Constitutional symptoms */
  constitutional?: {
    fever?: boolean;
    chills?: boolean;
    fatigue?: boolean;
    weightChange?: string;
    nightSweats?: boolean;
    malaise?: boolean;
    other?: string[];
  };
  
  /** Eyes */
  eyes?: {
    visionChanges?: boolean;
    blindness?: boolean;
    pain?: boolean;
    redness?: boolean;
    discharge?: boolean;
    photophobia?: boolean;
    other?: string[];
  };
  
  /** Ears, Nose, Throat */
  ent?: {
    hearingLoss?: boolean;
    earPain?: boolean;
    tinnitus?: boolean;
    vertigo?: boolean;
    nasalCongestion?: boolean;
    nasalDischarge?: boolean;
    soreThreat?: boolean;
    hoarseness?: boolean;
    other?: string[];
  };
  
  /** Cardiovascular */
  cardiovascular?: {
    chestPain?: boolean;
    palpitations?: boolean;
    orthopnea?: boolean;
    edema?: boolean;
    claudication?: boolean;
    other?: string[];
  };
  
  /** Respiratory */
  respiratory?: {
    cough?: boolean;
    sputum?: boolean;
    hemoptysis?: boolean;
    shortnessOfBreath?: boolean;
    wheezing?: boolean;
    pleuriticPain?: boolean;
    other?: string[];
  };
  
  /** Gastrointestinal */
  gastrointestinal?: {
    appetiteChange?: boolean;
    dysphagia?: boolean;
    nausea?: boolean;
    vomiting?: boolean;
    hematemesis?: boolean;
    abdominalPain?: boolean;
    bowelHabitChange?: boolean;
    diarrhea?: boolean;
    constipation?: boolean;
    melena?: boolean;
    hematochezia?: boolean;
    other?: string[];
  };
  
  /** Genitourinary */
  genitourinary?: {
    frequency?: boolean;
    urgency?: boolean;
    dysuria?: boolean;
    hematuria?: boolean;
    incontinence?: boolean;
    hesitancy?: boolean;
    flankPain?: boolean;
    dischargeMale?: boolean;
    erectileDysfunction?: boolean;
    other?: string[];
  };
  
  /** Gynecological */
  gynecological?: {
    menstrualIrregularity?: boolean;
    menorrhagia?: boolean;
    discharge?: boolean;
    pelvicPain?: boolean;
    lastMenstrualPeriod?: string;
    pregnancyStatus?: 'not_pregnant' | 'pregnant' | 'unknown';
    other?: string[];
  };
  
  /** Musculoskeletal */
  musculoskeletal?: {
    jointPain?: boolean;
    swelling?: boolean;
    stiffness?: boolean;
    rangeOfMotion?: boolean;
    backPain?: boolean;
    muscleWeakness?: boolean;
    other?: string[];
  };
  
  /** Neurological */
  neurological?: {
    headache?: boolean;
    dizziness?: boolean;
    syncope?: boolean;
    seizures?: boolean;
    weakness?: boolean;
    numbness?: boolean;
    sensoryChanges?: boolean;
    coordination?: boolean;
    balanceIssues?: boolean;
    speechChanges?: boolean;
    other?: string[];
  };
  
  /** Psychiatric */
  psychiatric?: {
    depression?: boolean;
    anxiety?: boolean;
    moodChanges?: boolean;
    sleepDisturbance?: boolean;
    suicidalIdeation?: boolean;
    hallucinations?: boolean;
    other?: string[];
  };
  
  /** Endocrine */
  endocrine?: {
    heatColdIntolerance?: boolean;
    polydipsia?: boolean;
    polyphagia?: boolean;
    polyuria?: boolean;
    excessiveSweating?: boolean;
    excessiveThirst?: boolean;
    other?: string[];
  };
  
  /** Hematologic/Lymphatic */
  hematologic?: {
    easyBruising?: boolean;
    bleeding?: boolean;
    lymphadenopathy?: boolean;
    transfusionHistory?: boolean;
    other?: string[];
  };
  
  /** Allergic/Immunologic */
  allergic?: {
    rhinitis?: boolean;
    hay_fever?: boolean;
    asthma?: boolean;
    hives?: boolean;
    eczema?: boolean;
    frequent_infections?: boolean;
    other?: string[];
  };
  
  /** Skin */
  skin?: {
    rash?: boolean;
    itching?: boolean;
    colorChanges?: boolean;
    dryness?: boolean;
    lesions?: boolean;
    other?: string[];
  };
}

/**
 * Physical examination finding
 */
export interface PhysicalFinding {
  /** Finding name */
  name: string;
  
  /** Body system */
  system?: 'general' | 'head' | 'eyes' | 'ears' | 'nose' | 'throat' | 'neck' | 'chest' | 'cardiovascular' | 'respiratory' | 'abdominal' | 'genitourinary' | 'rectal' | 'skin' | 'musculoskeletal' | 'neurological' | 'psychiatric' | 'lymphatic';
  
  /** Body location */
  location?: string;
  
  /** Finding description */
  description?: string;
  
  /** Measured value if applicable */
  value?: string | number;
  
  /** Units of measurement */
  unit?: string;
  
  /** Normal reference range */
  referenceRange?: {
    low?: number;
    high?: number;
    text?: string;
  };
  
  /** Finding quality */
  quality?: string;
  
  /** Severity or grade */
  severity?: 'mild' | 'moderate' | 'severe' | number;
  
  /** Clinical significance */
  significance?: 'normal' | 'abnormal_non_significant' | 'abnormal_significant';
  
  /** Additional notes */
  notes?: string;
}

/**
 * Vital signs
 */
export interface VitalSigns {
  /** Temperature */
  temperature?: {
    value: number;
    unit: 'celsius' | 'fahrenheit';
    site?: 'oral' | 'rectal' | 'tympanic' | 'axillary' | 'temporal' | 'other';
  };
  
  /** Blood pressure */
  bloodPressure?: {
    systolic: number;
    diastolic: number;
    position?: 'sitting' | 'standing' | 'supine';
    location?: 'left_arm' | 'right_arm' | 'left_leg' | 'right_leg' | 'other';
  };
  
  /** Heart rate */
  heartRate?: {
    value: number;
    regularity?: 'regular' | 'irregular';
  };
  
  /** Respiratory rate */
  respiratoryRate?: number;
  
  /** Oxygen saturation */
  oxygenSaturation?: {
    value: number;
    device?: 'room_air' | 'nasal_cannula' | 'mask' | 'ventilator' | 'other';
    flowRate?: number;
    fiO2?: number;
  };
  
  /** Pain score */
  painScore?: {
    value: number;
    scale: 'numeric_0_10' | 'wong_baker' | 'faces' | 'other';
  };
  
  /** Height */
  height?: {
    value: number;
    unit: 'cm' | 'in';
  };
  
  /** Weight */
  weight?: {
    value: number;
    unit: 'kg' | 'lb';
  };
  
  /** BMI (calculated) */
  bmi?: number;
  
  /** Additional measurements */
  other?: {
    name: string;
    value: number | string;
    unit?: string;
  }[];
}

/**
 * Laboratory test result
 */
export interface LabResult {
  /** Test name */
  name: string;
  
  /** Test category */
  category?: 'hematology' | 'chemistry' | 'microbiology' | 'immunology' | 'urinalysis' | 'pathology' | 'toxicology' | 'genetic' | 'other';
  
  /** Specimen type */
  specimenType?: 'blood' | 'urine' | 'csf' | 'sputum' | 'stool' | 'swab' | 'tissue' | 'other';
  
  /** Collection date/time */
  collectionDateTime?: string | Date;
  
  /** Result value */
  value: string | number;
  
  /** Units of measurement */
  unit?: string;
  
  /** Reference range */
  referenceRange?: {
    low?: number;
    high?: number;
    text?: string;
  };
  
  /** Interpretation */
  interpretation?: 'normal' | 'abnormal' | 'critical_high' | 'critical_low' | 'high' | 'low' | 'positive' | 'negative' | 'indeterminate';
  
  /** Clinical significance */
  significance?: string;
  
  /** Testing methodology */
  methodology?: string;
  
  /** Performing lab */
  performingLab?: string;
  
  /** Result status */
  status?: 'preliminary' | 'final' | 'corrected' | 'canceled';
  
  /** Additional notes */
  notes?: string;
}

/**
 * Imaging study
 */
export interface ImagingStudy {
  /** Study name */
  name: string;
  
  /** Modality */
  modality?: 'xray' | 'ct' | 'mri' | 'ultrasound' | 'pet' | 'nuclear' | 'angiography' | 'fluoroscopy' | 'other';
  
  /** Body region */
  bodyRegion?: string;
  
  /** Date performed */
  datePerformed?: string | Date;
  
  /** Reason for study */
  indication?: string;
  
  /** Imaging technique */
  technique?: string;
  
  /** Contrast used */
  contrast?: boolean;
  
  /** Contrast details */
  contrastDetails?: string;
  
  /** Findings text */
  findings?: string;
  
  /** Key abnormalities */
  abnormalities?: string[];
  
  /** Radiologist impression */
  impression?: string;
  
  /** Radiologist recommendations */
  recommendations?: string[];
  
  /** Comparison studies */
  comparison?: string;
  
  /** Image quality */
  quality?: 'optimal' | 'suboptimal' | 'non_diagnostic';
  
  /** Performing facility */
  facility?: string;
  
  /** Interpreting radiologist */
  radiologist?: string;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Diagnostic test
 */
export interface DiagnosticTest {
  /** Test name */
  name: string;
  
  /** Test category */
  category?: 'cardiology' | 'neurology' | 'pulmonary' | 'gastroenterology' | 'ophthalmology' | 'audiology' | 'other';
  
  /** Date performed */
  datePerformed?: string | Date;
  
  /** Reason for test */
  indication?: string;
  
  /** Test technique/protocol */
  technique?: string;
  
  /** Test results */
  results?: string;
  
  /** Key measurements */
  measurements?: {
    name: string;
    value: number | string;
    unit?: string;
    referenceRange?: {
      low?: number;
      high?: number;
      text?: string;
    };
    interpretation?: string;
  }[];
  
  /** Test interpretation */
  interpretation?: string;
  
  /** Clinical implications */
  clinicalImplications?: string;
  
  /** Recommendations */
  recommendations?: string[];
  
  /** Comparison tests */
  comparison?: string;
  
  /** Performing provider */
  provider?: string;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Assessment score
 */
export interface AssessmentScore {
  /** Assessment name */
  name: string;
  
  /** Assessment category */
  category?: 'functional' | 'cognitive' | 'psychiatric' | 'pain' | 'quality_of_life' | 'disease_specific' | 'risk' | 'other';
  
  /** Date performed */
  datePerformed?: string | Date;
  
  /** Score value */
  score: number | string;
  
  /** Score interpretation */
  interpretation?: string;
  
  /** Score components */
  components?: {
    name: string;
    score: number | string;
  }[];
  
  /** Reference range */
  referenceRange?: {
    min?: number;
    max?: number;
    categories?: {
      range: string;
      interpretation: string;
    }[];
  };
  
  /** Clinical significance */
  significance?: string;
  
  /** Administering provider */
  administrator?: string;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Diagnosis result
 */
export interface DiagnosisResult {
  /** Medical condition */
  condition: string;
  
  /** Diagnostic code */
  code?: {
    system: 'icd10' | 'icd11' | 'snomed' | 'dsm5' | 'custom';
    value: string;
  };
  
  /** Diagnostic category */
  category?: 'primary' | 'secondary' | 'complication' | 'comorbidity' | 'differential' | 'working' | 'rule_out';
  
  /** Certainty/confidence in diagnosis */
  certainty?: 'confirmed' | 'probable' | 'possible' | 'unlikely';
  
  /** Quantitative probability (0-1) */
  probability?: number;
  
  /** Clinical evidence supporting diagnosis */
  supportingEvidence?: string[];
  
  /** Evidence against diagnosis */
  contradictingEvidence?: string[];
  
  /** Diagnostic criteria used */
  criteria?: string;
  
  /** Disease stage/grade */
  stage?: string;
  
  /** Onset date/timing */
  onsetDate?: string | Date;
  
  /** Diagnosing provider */
  diagnosingProvider?: string;
  
  /** Additional notes */
  notes?: string;
  
  /** Evidence strength */
  evidenceStrength?: 'strong' | 'moderate' | 'limited' | 'conflicting';
  
  /** Confidence level */
  confidenceLevel?: 'high' | 'moderate' | 'low' | 'very_low';
}/**
 * Medical Knowledge for the Critique of Artificial Reason (CAR)
 * 
 * This module provides domain-specific knowledge structures for healthcare applications
 * of the Kantian AI framework. It defines interfaces and types for representing
 * patient data, clinical information, diagnoses, treatments, and other healthcare
 * concepts necessary for clinical reasoning.
 * 
 * The structures defined here are used by the CAR Healthcare implementation to
 * organize and process medical information in a way that respects epistemic
 * boundaries, enables ethical reasoning, and supports clinical decision-making
 * with appropriate humility and transparency.
 */

/**
 * Patient profile information
 */
export interface PatientProfile {
  /** Patient identifier */
  id?: string;
  
  /** Age in years */
  age?: number;
  
  /** Biological sex */
  sex?: 'male' | 'female' | 'other';
  
  /** Gender identity if different from biological sex */
  gender?: string;
  
  /** Patient height (cm) */
  height?: number;
  
  /** Patient weight (kg) */
  weight?: number;
  
  /** Body mass index (calculated) */
  bmi?: number;
  
  /** Race/ethnicity information */
  ethnicity?: string[];
  
  /** Medical history conditions */
  medicalHistory?: MedicalCondition[];
  
  /** Surgical history */
  surgicalHistory?: SurgicalProcedure[];
  
  /** Current medications */
  medications?: Medication[];
  
  /** Allergies and adverse reactions */
  allergies?: Allergy[];
  
  /** Family medical history */
  familyHistory?: FamilyHistory[];
  
  /** Social history */
  socialHistory?: SocialHistory;
  
  /** Health risk factors */
  riskFactors?: RiskFactor[];
  
  /** Immunization history */
  immunizations?: Immunization[];
  
  /** Patient preferences */
  preferences?: string | PatientPreferences;
  
  /** Advance directives */
  advanceDirectives?: AdvanceDirective[];
  
  /** Functional status */
  functionalStatus?: FunctionalStatus;
  
  /** Insurance and payment information */
  insurance?: InsuranceInfo;
}

/**
 * Medical condition in patient history
 */
export interface MedicalCondition {
  /** Condition name */
  name: string;
  
  /** When condition was diagnosed */
  onsetDate?: string | Date;
  
  /** Duration of condition */
  duration?: string;
  
  /** Current status */
  status: 'active' | 'resolved' | 'in_remission' | 'recurrent';
  
  /** Severity of condition */
  severity?: 'mild' | 'moderate' | 'severe';
  
  /** Treatment history for this condition */
  treatments?: string[];
  
  /** Relevant diagnostic tests */
  diagnostics?: string[];
  
  /** Treating providers */
  providers?: string[];
  
  /** Additional notes */
  notes?: string;
}

/**
 * Surgical procedure in patient history
 */
export interface SurgicalProcedure {
  /** Procedure name */
  name: string;
  
  /** Date of procedure */
  date?: string | Date;
  
  /** Reason for procedure */
  indication?: string;
  
  /** Complications, if any */
  complications?: string[];
  
  /** Surgeon/facility */
  provider?: string;
  
  /** Outcome */
  outcome?: string;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Medication information
 */
export interface Medication {
  /** Medication name (generic preferred) */
  name: string;
  
  /** Strength and units */
  strength?: string;
  
  /** Dosage amount */
  dosage?: string;
  
  /** Frequency of administration */
  frequency?: string;
  
  /** Route of administration */
  route?: 'oral' | 'intravenous' | 'subcutaneous' | 'intramuscular' | 'topical' | 'inhaled' | 'other';
  
  /** Start date */
  startDate?: string | Date;
  
  /** End date (if applicable) */
  endDate?: string | Date;
  
  /** Duration of use */
  duration?: string;
  
  /** Indication for medication */
  indication?: string;
  
  /** Prescribing provider */
  prescriber?: string;
  
  /** Patient adherence information */
  adherence?: 'good' | 'moderate' | 'poor' | 'unknown';
  
  /** Effectiveness of medication */
  effectiveness?: 'effective' | 'partially_effective' | 'ineffective' | 'unknown';
  
  /** Side effects experienced */
  sideEffects?: string[];
  
  /** Additional notes */
  notes?: string;
}

/**
 * Allergy information
 */
export interface Allergy {
  /** Allergen/substance */
  substance: string;
  
  /** Reaction description */
  reaction: string;
  
  /** Severity of reaction */
  severity: 'mild' | 'moderate' | 'severe' | 'life_threatening';
  
  /** Certainty of diagnosis */
  certainty?: 'confirmed' | 'suspected' | 'reported';
  
  /** Onset date */
  onsetDate?: string | Date;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Family history information
 */
export interface FamilyHistory {
  /** Condition name */
  condition: string;
  
  /** Affected family members */
  relation: 'mother' | 'father' | 'sister' | 'brother' | 'daughter' | 'son' | 'grandfather' | 'grandmother' | 'aunt' | 'uncle' | 'cousin' | 'other';
  
  /** Age at onset if known */
  ageAtOnset?: number;
  
  /** Current status */
  status?: 'living_with_condition' | 'deceased_from_condition' | 'deceased_unrelated' | 'unknown';
  
  /** Additional information */
  notes?: string;
}

/**
 * Social history information
 */
export interface SocialHistory {
  /** Smoking status */
  smokingStatus?: 'never' | 'former' | 'current' | 'unknown';
  
  /** Smoking details */
  smokingDetails?: {
    type?: 'cigarettes' | 'cigars' | 'pipe' | 'e-cigarettes' | 'other';
    amount?: string;
    duration?: string;
    packYears?: number;
    quitDate?: string | Date;
  };
  
  /** Alcohol use */
  alcoholUse?: 'none' | 'occasional' | 'moderate' | 'heavy' | 'former' | 'unknown';
  
  /** Alcohol details */
  alcoholDetails?: {
    type?: string[];
    frequency?: string;
    amount?: string;
    quitDate?: string | Date;
  };
  
  /** Substance use */
  substanceUse?: {
    substance: string;
    status: 'never' | 'former' | 'current' | 'unknown';
    frequency?: string;
    route?: string;
    duration?: string;
    lastUse?: string | Date;
  }[];
  
  /** Diet information */
  diet?: {
    type?: string;
    restrictions?: string[];
    notes?: string;
  };
  
  /** Exercise habits */
  exercise?: {
    frequency?: string;
    type?: string[];
    duration?: string;
    intensity?: 'light' | 'moderate' | 'vigorous';
  };
  
  /** Occupation information */
  occupation?: {
    current?: string;
    past?: string[];
    exposures?: string[];
    status?: 'employed' | 'unemployed' | 'retired' | 'disabled' | 'student';
  };
  
  /** Living situation */
  livingSituation?: {
    arrangement?: 'alone' | 'with_family' | 'with_others' | 'facility' | 'homeless';
    caregivers?: string[];
    dependents?: string[];
    environment?: string;
    adequacy?: 'adequate' | 'inadequate';
  };
  
  /** Education level */
  education?: string;
  
  /** Religious or spiritual beliefs relevant to healthcare */
  religiousBeliefs?: string;
  
  /** Travel history relevant to health */
  travelHistory?: {
    location: string;
    dates?: string;
    illnesses?: string[];
  }[];
  
  /** Additional social determinants of health */
  socialDeterminants?: {
    economicStability?: string;
    foodSecurity?: 'secure' | 'insecure' | 'unknown';
    transportation?: 'reliable' | 'unreliable' | 'none';
    socialSupport?: 'strong' | 'moderate' | 'minimal' | 'none';
    safetyConcerns?: string[];
  };
}

/**
 * Health risk factor
 */
export interface RiskFactor {
  /** Risk factor name */
  name: string;
  
  /** Risk category */
  category?: 'behavioral' | 'genetic' | 'environmental' | 'occupational' | 'demographic' | 'medical';
  
  /** Risk severity/level */
  level?: 'low' | 'moderate' | 'high' | 'very_high';
  
  /** Modifiability */
  modifiable?: boolean;
  
  /** Intervention strategies */
  interventions?: string[];
  
  /** Additional details */
  details?: string;
}

/**
 * Immunization record
 */
export interface Immunization {
  /** Vaccine name */
  name: string;
  
  /** Date administered */
  date: string | Date;
  
  /** Dose number in series */
  doseNumber?: number;
  
  /** Series completion status */
  seriesComplete?: boolean;
  
  /** Administering provider */
  provider?: string;
  
  /** Adverse reactions */
  reactions?: string[];
}

/**
 * Patient preferences
 */
export interface PatientPreferences {
  /** Treatment preferences */
  treatmentPreferences?: {
    generalApproach?: 'aggressive' | 'moderate' | 'conservative' | 'unknown';
    preferNonPharmacological?: boolean;
    preferMinimalInterventions?: boolean;
    preferComplementaryApproaches?: boolean;
    specificPreferences?: string[];
  };
  
  /** Communication preferences */
  communicationPreferences?: {
    directness?: 'very_direct' | 'balanced' | 'gradual';
    detailLevel?: 'minimal' | 'moderate' | 'comprehensive';
    involveFamilyMembers?: string[];
    languageNeeds?: string;
    preferredMethod?: 'in_person' | 'phone' | 'video' | 'email' | 'text';
  };
  
  /** Decision-making preferences */
  decisionMakingPreferences?: {
    role?: 'active' | 'collaborative' | 'passive';
    informationNeeds?: 'minimal' | 'moderate' | 'comprehensive';
    riskTolerance?: 'risk_averse' | 'balanced' | 'risk_tolerant';
    timeFrame?: 'immediate_focus' | 'balanced' | 'long_term_focus';
  };
  
  /** Quality of life priorities */
  qualityOfLifePriorities?: string[];
  
  /** Other preferences */
  otherPreferences?: string[];
}

/**
 * Advance directive
 */
export interface AdvanceDirective {
  /** Type of directive */
  type: 'living_will' | 'healthcare_power_of_attorney' | 'do_not_resuscitate' | 'POLST' | 'other';
  
  /** Date completed */
  dateCompleted: string | Date;
  
  /** Status of directive */
  status: 'active' | 'revoked' | 'superseded';
  
  /** Key details */
  details?: string;
  
  /** Healthcare agent if applicable */
  agent?: {
    name: string;
    relationship: string;
    contact: string;
  };
  
  /** Storage location */
  location?: string;
}

/**
 * Functional status assessment
 */
export interface FunctionalStatus {
  /** Activities of daily living */
  adl?: {
    bathing?: 'independent' | 'assistance' | 'dependent';
    dressing?: 'independent' | 'assistance' | 'dependent';
    toileting?: 'independent' | 'assistance' | 'dependent';
    transferring?: 'independent' | 'assistance' | 'dependent';
    continence?: 'independent' | 'assistance' | 'dependent';
    feeding?: 'independent' | 'assistance' | 'dependent';
  };
  
  /** Instrumental activities of daily living */
  iadl?: {
    shopping?: 'independent' | 'assistance' | 'dependent';
    foodPreparation?: 'independent' | 'assistance' | 'dependent';
    housekeeping?: 'independent' | 'assistance' | 'dependent';
    laundry?: 'independent' | 'assistance' | 'dependent';
    transportation?: 'independent' | 'assistance' | 'dependent';
    medication?: 'independent' | 'assistance' | 'dependent';
    finances?: 'independent' | 'assistance' | 'dependent';
    communication?: 'independent' | 'assistance' | 'dependent';
  };
  
  /** Mobility status */
  mobility?: {
    ambulation?: 'independent' | 'cane' | 'walker' | 'wheelchair' | 'bedbound';
    distance?: string;
    stability?: 'stable' | 'unstable' | 'fall_risk';
  };
  
  /** Cognitive assessment */
  cognition?: {
    orientation?: 'intact' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment';
    memory?: 'intact' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment';
    executiveFunction?: 'intact' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment';
    formalAssessment?: string;
    score?: number;
  };
  
  /** Standardized assessment scores */
  assessmentScores?: {
    name: string;
    score: number | string;
    date: string | Date;
    interpretation?: string;
  }[];
  
  /** Sensory impairments */
  sensoryImpairments?: {
    visual?: 'none' | 'mild' | 'moderate' | 'severe' | 'blind';
    hearing?: 'none' | 'mild' | 'moderate' | 'severe' | 'deaf';
    other?: string[];
  };
  
  /** Assistive devices */
  assistiveDevices?: string[];
  
  /** Caregiver support */
  caregiverSupport?: 'none' | 'partial' | 'full' | 'unknown';
}

/**
 * Insurance information
 */
export interface InsuranceInfo {
  /** Primary insurance */
  primary?: {
    provider: string;
    policyNumber?: string;
    groupNumber?: string;
    policyHolder?: string;
    relationship?: 'self' | 'spouse' | 'parent' | 'other';
    coverageType?: 'medical' | 'dental' | 'vision' | 'comprehensive';
  };
  
  /** Secondary insurance */
  secondary?: {
    provider: string;
    policyNumber?: string;
    groupNumber?: string;
    policyHolder?: string;
    relationship?: 'self' | 'spouse' | 'parent' | 'other';
    coverageType?: 'medical' | 'dental' | 'vision' | 'comprehensive';
  };
  
  /** Prescription coverage */
  prescriptionCoverage?: boolean;
  
  /** Out-of-network coverage */
  outOfNetworkCoverage?: boolean;
  
  /** Prior authorization requirements */
  priorAuthorizationRequired?: boolean;
  
  /** Referral requirements */
  referralRequired?: boolean;
}

/**
 * Clinical data including symptoms, exams, and tests
 */
export interface ClinicalData {
  /** Chief complaint/presenting problem */
  chiefComplaint?: string;
  
  /** Current symptoms */
  symptoms?: Symptom[];
  
  /** Review of systems */
  reviewOfSystems?: ReviewOfSystems;
  
  /** Physical examination findings */
  physicalExam?: PhysicalFinding[];
  
  /** Vital signs */
  vitalSigns?: VitalSigns;
  
  /** Laboratory test results */
  labResults?: LabResult[];
  
  /** Imaging studies */
  imaging?: ImagingStudy[];
  
  /** Other diagnostic tests */
  diagnosticTests?: DiagnosticTest[];
  
  /** Assessment scores */
  assessmentScores?: AssessmentScore[];
  
  /** Clinical impressions */
  clinicalImpressions?: string[];
}

/**
 * Symptom information
 */
export interface Symptom {
  /** Symptom name */
  name: string;
  
  /** Time since onset */
  duration?: string;
  
  /** Onset characteristics */
  onset?: 'sudden' | 'gradual' | 'unknown';
  
  /** Pattern over time */
  pattern?: 'continuous' | 'intermittent' | 'worsening' | 'improving' | 'stable' | 'fluctuating';
  
  /** Severity rating */
  severity?: 'mild' | 'moderate' | 'severe' | number;
  
  /** Location of symptom */
  location?: string;
  
  /** What makes it better */
  alleviatingFactors?: string[];
  
  /** What makes it worse */
  aggravatingFactors?: string[];
  
  /** Associated symptoms */
  associatedSymptoms?: string[];
  
  /** Context information */
  context?: string;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Review of systems
 */
export interface ReviewOfSystems {
  /** Constitutional symptoms */
  constitutional?: {
    fever?: boolean;
    chills?: boolean;
    fatigue?: boolean;
    weightChange?: string;
    nightSweats?: boolean;
    malaise?: boolean;
    other?: string[];
  };
  
  /** Eyes */
  eyes?: {
    visionChanges?: boolean;
    blindness?: boolean;
    pain?: boolean;
    redness?: boolean;
    discharge?: boolean;
    photophobia?: boolean;
    other?: string[];
  };
  
  /** Ears, Nose, Throat */
  ent?: {
    hearingLoss?: boolean;
    earPain?: boolean;
    tinnitus?: boolean;
    vertigo?: boolean;
    nasalCongestion?: boolean;
    nasalDischarge?: boolean;
    soreThreat?: boolean;
    hoarseness?: boolean;
    other?: string[];
  };
  
  /** Cardiovascular */
  cardiovascular?: {
    chestPain?: boolean;
    palpitations?: boolean;
    orthopnea?: boolean;
    edema?: boolean;
    claudication?: boolean;
    other?: string[];
  };
  
  /** Respiratory */
  respiratory?: {
    cough?: boolean;
    sputum?: boolean;
    hemoptysis?: boolean;
    shortnessOfBreath?: boolean;
    wheezing?: boolean;
    pleuriticPain?: boolean;
    other?: string[];
  };
  
  /** Gastrointestinal */
  gastrointestinal?: {
    appetiteChange?: boolean;
    dysphagia?: boolean;
    nausea?: boolean;
    vomiting?: boolean;
    hematemesis?: boolean;
    abdominalPain?: boolean;
    bowelHabitChange?: boolean;
    diarrhea?: boolean;
    constipation?: boolean;
    melena?: boolean;
    hematochezia?: boolean;
    other?: string[];
  };
  
  /** Genitourinary */
  genitourinary?: {
    frequency?: boolean;
    urgency?: boolean;
    dysuria?: boolean;
    hematuria?: boolean;
    incontinence?: boolean;
    hesitancy?: boolean;
    flankPain?: boolean;
    dischargeMale?: boolean;
    erectileDysfunction?: boolean;
    other?: string[];
  };
  
  /** Gynecological */
  gynecological?: {
    menstrualIrregularity?: boolean;
    menorrhagia?: boolean;
    discharge?: boolean;
    pelvicPain?: boolean;
    lastMenstrualPeriod?: string;
    pregnancyStatus?: 'not_pregnant' | 'pregnant' | 'unknown';
    other?: string[];
  };
  
  /** Musculoskeletal */
  musculoskeletal?: {
    jointPain?: boolean;
    swelling?: boolean;
    stiffness?: boolean;
    rangeOfMotion?: boolean;
    backPain?: boolean;
    muscleWeakness?: boolean;
    other?: string[];
  };
  
  /** Neurological */
  neurological?: {
    headache?: boolean;
    dizziness?: boolean;
    syncope?: boolean;
    seizures?: boolean;
    weakness?: boolean;
    numbness?: boolean;
    sensoryChanges?: boolean;
    coordination?: boolean;
    balanceIssues?: boolean;
    speechChanges?: boolean;
    other?: string[];
  };
  
  /** Psychiatric */
  psychiatric?: {
    depression?: boolean;
    anxiety?: boolean;
    moodChanges?: boolean;
    sleepDisturbance?: boolean;
    suicidalIdeation?: boolean;
    hallucinations?: boolean;
    other?: string[];
  };
  
  /** Endocrine */
  endocrine?: {
    heatColdIntolerance?: boolean;
    polydipsia?: boolean;
    polyphagia?: boolean;
    polyuria?: boolean;
    excessiveSweating?: boolean;
    excessiveThirst?: boolean;
    other?: string[];
  };
  
  /** Hematologic/Lymphatic */
  hematologic?: {
    easyBruising?: boolean;
    bleeding?: boolean;
    lymphadenopathy?: boolean;
    transfusionHistory?: boolean;
    other?: string[];
  };
  
  /** Allergic/Immunologic */
  allergic?: {
    rhinitis?: boolean;
    hay_fever?: boolean;
    asthma?: boolean;
    hives?: boolean;
    eczema?: boolean;
    frequent_infections?: boolean;
    other?: string[];
  };
  
  /** Skin */
  skin?: {
    rash?: boolean;
    itching?: boolean;
    colorChanges?: boolean;
    dryness?: boolean;
    lesions?: boolean;
    other?: string[];
  };
}

/**
 * Physical examination finding
 */
export interface PhysicalFinding {
  /** Finding name */
  name: string;
  
  /** Body system */
  system?: 'general' | 'head' | 'eyes' | 'ears' | 'nose' | 'throat' | 'neck' | 'chest' | 'cardiovascular' | 'respiratory' | 'abdominal' | 'genitourinary' | 'rectal' | 'skin' | 'musculoskeletal' | 'neurological' | 'psychiatric' | 'lymphatic';
  
  /** Body location */
  location?: string;
  
  /** Finding description */
  description?: string;
  
  /** Measured value if applicable */
  value?: string | number;
  
  /** Units of measurement */
  unit?: string;
  
  /** Normal reference range */
  referenceRange?: {
    low?: number;
    high?: number;
    text?: string;
  };
  
  /** Finding quality */
  quality?: string;
  
  /** Severity or grade */
  severity?: 'mild' | 'moderate' | 'severe' | number;
  
  /** Clinical significance */
  significance?: 'normal' | 'abnormal_non_significant' | 'abnormal_significant';
  
  /** Additional notes */
  notes?: string;
}

/**
 * Vital signs
 */
export interface VitalSigns {
  /** Temperature */
  temperature?: {
    value: number;
    unit: 'celsius' | 'fahrenheit';
    site?: 'oral' | 'rectal' | 'tympanic' | 'axillary' | 'temporal' | 'other';
  };
  
  /** Blood pressure */
  bloodPressure?: {
    systolic: number;
    diastolic: number;
    position?: 'sitting' | 'standing' | 'supine';
    location?: 'left_arm' | 'right_arm' | 'left_leg' | 'right_leg' | 'other';
  };
  
  /** Heart rate */
  heartRate?: {
    value: number;
    regularity?: 'regular' | 'irregular';
  };
  
  /** Respiratory rate */
  respiratoryRate?: number;
  
  /** Oxygen saturation */
  oxygenSaturation?: {
    value: number;
    device?: 'room_air' | 'nasal_cannula' | 'mask' | 'ventilator' | 'other';
    flowRate?: number;
    fiO2?: number;
  };
  
  /** Pain score */
  painScore?: {
    value: number;
    scale: 'numeric_0_10' | 'wong_baker' | 'faces' | 'other';
  };
  
  /** Height */
  height?: {
    value: number;
    unit: 'cm' | 'in';
  };
  
  /** Weight */
  weight?: {
    value: number;
    unit: 'kg' | 'lb';
  };
  
  /** BMI (calculated) */
  bmi?: number;
  
  /** Additional measurements */
  other?: {
    name: string;
    value: number | string;
    unit?: string;
  }[];
}

/**
 * Laboratory test result
 */
export interface LabResult {
  /** Test name */
  name: string;
  
  /** Test category */
  category?: 'hematology' | 'chemistry' | 'microbiology' | 'immunology' | 'urinalysis' | 'pathology' | 'toxicology' | 'genetic' | 'other';
  
  /** Specimen type */
  specimenType?: 'blood' | 'urine' | 'csf' | 'sputum' | 'stool' | 'swab' | 'tissue' | 'other';
  
  /** Collection date/time */
  collectionDateTime?: string | Date;
  
  /** Result value */
  value: string | number;
  
  /** Units of measurement */
  unit?: string;
  
  /** Reference range */
  referenceRange?: {
    low?: number;
    high?: number;
    text?: string;
  };
  
  /** Interpretation */
  interpretation?: 'normal' | 'abnormal' | 'critical_high' | 'critical_low' | 'high' | 'low' | 'positive' | 'negative' | 'indeterminate';
  
  /** Clinical significance */
  significance?: string;
  
  /** Testing methodology */
  methodology?: string;
  
  /** Performing lab */
  performingLab?: string;
  
  /** Result status */
  status?: 'preliminary' | 'final' | 'corrected' | 'canceled';
  
  /** Additional notes */
  notes?: string;
}

/**
 * Imaging study
 */
export interface ImagingStudy {
  /** Study name */
  name: string;
  
  /** Modality */
  modality?: 'xray' | 'ct' | 'mri' | 'ultrasound' | 'pet' | 'nuclear' | 'angiography' | 'fluoroscopy' | 'other';
  
  /** Body region */
  bodyRegion?: string;
  
  /** Date performed */
  datePerformed?: string | Date;
  
  /** Reason for study */
  indication?: string;
  
  /** Imaging technique */
  technique?: string;
  
  /** Contrast used */
  contrast?: boolean;
  
  /** Contrast details */
  contrastDetails?: string;
  
  /** Findings text */
  findings?: string;
  
  /** Key abnormalities */
  abnormalities?: string[];
  
  /** Radiologist impression */
  impression?: string;
  
  /** Radiologist recommendations */
  recommendations?: string[];
  
  /** Comparison studies */
  comparison?: string;
  
  /** Image quality */
  quality?: 'optimal' | 'suboptimal' | 'non_diagnostic';
  
  /** Performing facility */
  facility?: string;
  
  /** Interpreting radiologist */
  radiologist?: string;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Diagnostic test
 */
export interface DiagnosticTest {
  /** Test name */
  name: string;
  
  /** Test category */
  category?: 'cardiology' | 'neurology' | 'pulmonary' | 'gastroenterology' | 'ophthalmology' | 'audiology' | 'other';
  
  /** Date performed */
  datePerformed?: string | Date;
  
  /** Reason for test */
  indication?: string;
  
  /** Test technique/protocol */
  technique?: string;
  
  /** Test results */
  results?: string;
  
  /** Key measurements */
  measurements?: {
    name: string;
    value: number | string;
    unit?: string;
    referenceRange?: {
      low?: number;
      high?: number;
      text?: string;
    };
    interpretation?: string;
  }[];
  
  /** Test interpretation */
  interpretation?: string;
  
  /** Clinical implications */
  clinicalImplications?: string;
  
  /** Recommendations */
  recommendations?: string[];
  
  /** Comparison tests */
  comparison?: string;
  
  /** Performing provider */
  provider?: string;
  
  /** Additional notes */
  notes?: string;
}

/**
 * Assessment score
 */
export interface AssessmentScore {
  /** Assessment name */
  name: string;
  
  /** Assessment category */
  category?: 'functional' | 'cognitive' | 'psychiatric' | 'pain' | 'quality_of_life' | 'disease_specific' | 'risk' | 'other';
  
  /** Date performed */
  datePerformed?: string | Date;
  
  /** Score value */
  score: number | string;
  
  /** Score interpretation */
  interpretation?: string;
  
  /** Score components */
  components?: {
    name: string;
    score: number | string;
  }[];
  
  /** Reference range */
  referenceRange?: {
    min?: number;
    max?: number;
    categories?: {
      range: string;
      interpretation: string;
    }[];
  };
  
  /** Clinical significance */
  significance?: string;
  
  /** Administering provider */
  administrator?: string;
  
  /** Additional notes */
  notes?: string;
}
