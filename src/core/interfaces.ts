// src/core/interfaces.ts

/**
 * Common interfaces and types for the Critique of Artificial Reason (CAR) framework
 * 
 * This file contains all shared type definitions used throughout the framework,
 * organized according to the Kantian architecture layers and components.
 */

// ======================================================================
// Core Framework Types
// ======================================================================

/**
 * Options for configuring a CAR instance
 */
export interface CAROptions {
  /** Domain of application (e.g., 'healthcare', 'education') */
  domain: string;
  
  /** Terms or concepts that exceed the system's epistemic boundaries */
  epistemicBoundaries?: string[];
  
  /** Thresholds for confidence levels */
  confidenceThresholds?: {
    high: number;
    medium: number;
    low: number;
  };
  
  /** Optional modules that can be enabled/disabled */
  enabledModules?: {
    schematism?: boolean;
    aestheticJudgment?: boolean;
    antinomyResolution?: boolean;
  };
  
  /** Domain-specific settings */
  domainSettings?: Record<string, any>;
}

/**
 * The final output of the CAR system
 */
export interface CARResult {
  /** The primary action or recommendation */
  decision: string;
  
  /** Explanation of the reasoning process */
  reasoning: string;
  
  /** Confidence level (numerical or categorical) */
  confidence: number | string;
  
  /** Factors contributing to uncertainty */
  uncertaintyFactors: string[];
  
  /** Recognized limits of knowledge */
  epistemicLimitations: string[];
  
  /** System's reflection on its own reasoning */
  metacognitiveReflection: string;
  
  /** Schematism output (if enabled) */
  schematism?: SchematismOutput;
  
  /** Aesthetic judgment (if enabled) */
  aestheticJudgment?: AestheticJudgmentResult;
  
  /** Antinomy resolution (if enabled) */
  antinomyResolution?: AntinomyResolutionResult;
}

/**
 * Represents data at various stages of processing through the CAR architecture
 */
export interface ProcessedData {
  /** The processed data at this stage */
  raw: any;
  
  /** Metadata about the processing */
  metadata: {
    /** Source of the data */
    source: string;
    
    /** Processing timestamp */
    timestamp: number;
    
    /** Record of layers that have processed the data */
    processingHistory: string[];
  };
}

// ======================================================================
// Sensibility Layer Types
// ======================================================================

/**
 * Spatial analysis results from the Sensibility Layer
 */
export interface SpatialAnalysis {
  /** Description of the spatial structure */
  spatialStructure: string;
  
  /** Count of features analyzed */
  featureCount: number;
  
  /** Complexity of spatial dimensions */
  spatialDimension: "complex" | "medium" | "simple";
  
  /** Optional: Identified spatial patterns */
  patterns?: SpatialPattern[];
}

/**
 * Recognized spatial pattern
 */
export interface SpatialPattern {
  /** Type of pattern (e.g., 'cluster', 'sequence', 'hierarchy') */
  type: string;
  
  /** Confidence in pattern recognition */
  confidence: number;
  
  /** Elements involved in the pattern */
  elements: any[];
}

/**
 * Temporal analysis results from the Sensibility Layer
 */
export interface TemporalAnalysis {
  /** Description of the temporal structure */
  temporalStructure: string;
  
  /** Length of temporal sequence */
  sequenceLength: number;
  
  /** Duration classification */
  temporalDimension: "extended" | "moderate" | "brief";
  
  /** Optional: Identified temporal patterns */
  patterns?: TemporalPattern[];
}

/**
 * Recognized temporal pattern
 */
export interface TemporalPattern {
  /** Type of pattern (e.g., 'sequence', 'cycle', 'trend') */
  type: string;
  
  /** Confidence in pattern recognition */
  confidence: number;
  
  /** Elements involved in the pattern */
  elements: any[];
}

// ======================================================================
// Understanding Layer Types
// ======================================================================

/**
 * Results of applying Kant's categories in the Understanding Layer
 */
export interface CategorizedData {
  /** Unity category (the concept of "one") */
  unity: UnityAnalysis;
  
  /** Plurality category (the concept of "many") */
  plurality: PluralityAnalysis;
  
  /** Causality category (cause and effect) */
  causality: CausalityAnalysis;
  
  /** Possibility category (what could be) */
  possibility: PossibilityAnalysis;
  
  /** Necessity category (what must be) */
  necessity: NecessityAnalysis;
}

/**
 * Analysis of unity (Kant's category)
 */
export interface UnityAnalysis {
  /** Description of unity analysis */
  unityAnalysis: string;
  
  /** Count of unified entities identified */
  unifiedEntities: number;
  
  /** Optional: Properties of each unified entity */
  unifiedProperties?: Record<string, any>[];
}

/**
 * Analysis of plurality (Kant's category)
 */
export interface PluralityAnalysis {
  /** Description of plurality analysis */
  pluralityAnalysis: string;
  
  /** Count of distinct elements identified */
  distinctElements: number;
  
  /** Optional: Relationships between distinct elements */
  relationships?: {
    from: any;
    to: any;
    relationType: string;
  }[];
}

/**
 * Analysis of causality (Kant's category)
 */
export interface CausalityAnalysis {
  /** Description of causality analysis */
  causalityAnalysis: string;
  
  /** Count of causal chains identified */
  causalChains: number;
  
  /** Optional: Identified cause-effect relationships */
  causalRelationships?: {
    cause: any;
    effect: any;
    strength: number;
    confidence: number;
  }[];
}

/**
 * Analysis of possibility (Kant's category)
 */
export interface PossibilityAnalysis {
  /** Description of possibility analysis */
  possibilityAnalysis: string;
  
  /** Count of possible states identified */
  possibleStates: number;
  
  /** Optional: Details of possible states */
  possibilityDetails?: {
    state: any;
    likelihood: number;
    conditions: string[];
  }[];
}

/**
 * Analysis of necessity (Kant's category)
 */
export interface NecessityAnalysis {
  /** Description of necessity analysis */
  necessityAnalysis: string;
  
  /** Count of necessary conditions identified */
  necessaryConditions: number;
  
  /** Optional: Details of necessary conditions */
  necessityDetails?: {
    condition: string;
    implications: string[];
    confidence: number;
  }[];
}

// ======================================================================
// Reason Layer Types
// ======================================================================

/**
 * Types of inferences the system can generate
 */
export type InferenceType = 
  | "causal"      // Cause-effect relationships
  | "structural"  // Pattern-based
  | "predictive"  // Forecasting future states
  | "analogical"  // Based on similarities
  | "deductive"   // From general to specific
  | "inductive"   // From specific to general
  | "abductive"   // Best explanation
  | "ethical"     // Moral reasoning
  | "practical"   // Action-oriented
  | "general";    // Default/unspecified

/**
 * A single inference generated by the Reason Layer
 */
export interface Inference {
  /** Type of inference */
  type: InferenceType;
  
  /** The content of the inference */
  inference: string;
  
  /** Confidence level (0-1) */
  confidence: number;
  
  /** Optional: Supporting evidence */
  evidence?: string[];
  
  /** Optional: Counterevidence */
  counterevidence?: string[];
}

/**
 * Ethical analysis of inferences and data
 */
export interface EthicalAnalysis {
  /** Implications for autonomy */
  autonomyImplications: string;
  
  /** Assessment of potential benefits */
  beneficenceAssessment: string;
  
  /** Risks of harm */
  nonMaleficenceRisks: string[];
  
  /** Fairness considerations */
  justiceConsiderations: string;
  
  /** Optional: Additional ethical dimensions */
  additionalConsiderations?: Record<string, string>;
}

/**
 * Decision generated from inferences and ethical analysis
 */
export interface Decision {
  /** The recommended action */
  action: string;
  
  /** Explanation of reasoning */
  reasoning: string;
  
  /** Confidence in the decision */
  confidence: number;
  
  /** Optional: Alternative actions considered */
  alternatives?: string[];
  
  /** Optional: Expected outcomes */
  expectedOutcomes?: {
    outcome: string;
    likelihood: number;
    timeframe: string;
  }[];
}

// ======================================================================
// Critique Layer Types
// ======================================================================

/**
 * Results of epistemically analyzing the system's own limitations
 */
export interface EpistemicAnalysis {
  /** Identified limitations in knowledge */
  limitations: string[];
  
  /** Confidence level (numerical or categorical) */
  confidence: number | string;
  
  /** Factors contributing to uncertainty */
  uncertaintyFactors: string[];
  
  /** Reflection on the system's cognition */
  metacognitiveReflection: string;
}

/**
 * Results from uncertainty quantification
 */
export interface UncertaintyAnalysis {
  /** Numerical measure of uncertainty (0-1) */
  value: number;
  
  /** Factors contributing to uncertainty */
  factors: string[];
  
  /** Optional: Distribution of uncertainty across components */
  distribution?: Record<string, number>;
}

/**
 * Output from metacognitive reflection
 */
export interface MetacognitiveReflection {
  /** Confidence assessment */
  confidence: number | string;
  
  /** Reflective thoughts on the reasoning process */
  reflections: string;
  
  /** Optional: Specific insights about the reasoning process */
  insights?: {
    component: string;
    strength: string;
    weakness?: string;
  }[];
}

// ======================================================================
// Categorical Imperative Types
// ======================================================================

/**
 * Results of applying Kant's categorical imperative to an action
 */
export interface CategoricalImperativeResult {
  /** Whether the action passes all tests */
  passes: boolean;
  
  /** Explanation of ethical assessment */
  explanation: string;
  
  /** Optional: Alternative ethical action if original fails */
  alternativeAction?: string;
  
  /** Results of individual tests */
  tests: {
    /** Universalizability formulation test */
    universalizability: { passes: boolean; reasoning: string };
    
    /** Humanity as end formulation test */
    humanityAsEnd: { passes: boolean; reasoning: string };
    
    /** Kingdom of ends formulation test */
    kingdomOfEnds: { passes: boolean; reasoning: string };
  };
}

// ======================================================================
// Schematism Types
// ======================================================================

/**
 * Output from the schematism layer that bridges neural and symbolic
 */
export interface SchematismOutput {
  /** Description of how neural patterns connect to symbols */
  symbolicGrounding: string;
  
  /** Core concepts that bridge neural and symbolic domains */
  conceptBottlenecks: string[];
  
  /** Optional: Mappings between concepts and symbolic rules */
  conceptMappings?: Record<string, string>;
}

// ======================================================================
// Aesthetic Judgment Types
// ======================================================================

/**
 * Output from aesthetic judgment module
 */
export interface AestheticJudgmentResult {
  /** Measure of purposiveness without purpose (0-1) */
  purposiveness: number;
  
  /** Output of reflective judgment process */
  reflectiveJudgment: string;
  
  /** Measure of universal subjective validity (0-1) */
  universalSubjectivity: number;
  
  /** Optional: Aesthetic categories identified */
  categories?: {
    beautiful?: number;
    sublime?: number;
    harmonious?: number;
  };
}

// ======================================================================
// Antinomy Resolution Types
// ======================================================================

/**
 * A tension or apparent contradiction between principles
 */
export interface Tension {
  /** Type of tension */
  type: "epistemic" | "ethical" | "inferential" | "practical";
  
  /** The opposing principles or concepts */
  poles: [string, string];
  
  /** Description of the tension */
  description: string;
  
  /** Optional: Severity of the tension (0-1) */
  severity?: number;
}

/**
 * Result of resolving antinomies (tensions between principles)
 */
export interface AntinomyResolutionResult {
  /** Domain classification for resolution context */
  domain: string;
  
  /** Whether any tensions were successfully resolved */
  resolvedTension: boolean;
  
  /** Explanation of the resolution */
  explanation: string;
  
  /** Principles that were balanced or prioritized */
  balancedPrinciples: string[];
  
  /** Optional: Unresolved tensions */
  unresolvedTensions?: Tension[];
}

// ======================================================================
// Domain-Specific Types
// ======================================================================

/**
 * Common structure for domain-specific settings
 */
export interface DomainSettings {
  /** Domain name */
  domainName: string;
  
  /** Domain-specific epistemic boundaries */
  epistemicBoundaries: string[];
  
  /** Domain-specific ethical considerations */
  ethicalConsiderations: string[];
  
  /** Domain-specific features */
  domainFeatures: Record<string, any>;
}

/**
 * Response from epistemic boundary check
 */
export interface EpistemicBoundaryCheck {
  /** Whether the input exceeds epistemic boundaries */
  beyondBoundaries: boolean;
  
  /** Optional: Reason for boundary classification */
  reason?: string;
  
  /** Optional: Confidence in boundary assessment */
  confidence?: number;
}

/**
 * Epistemic boundary check with domain context
 */
export interface DomainEpistemicBoundaryCheck extends EpistemicBoundaryCheck {
  /** The domain of the boundary */
  domain: string;
  
  /** Domain-specific explanation */
  domainSpecificReason?: string;
  
  /** Optional: Recommended domain expert to consult */
  recommendedExpert?: string;
}

// ======================================================================
// Utility Types
// ======================================================================

/**
 * Confidence level categories
 */
export type ConfidenceLevel = "very high" | "high" | "medium" | "low" | "very low";

/**
 * Mapping between numerical confidence and categorical levels
 */
export interface ConfidenceThresholds {
  /** Threshold for high confidence (default: 0.8) */
  high: number;
  
  /** Threshold for medium confidence (default: 0.5) */
  medium: number;
  
  /** Threshold for low confidence (default: 0.3) */
  low: number;
}

/**
 * Priority level for recommendations
 */
export type PriorityLevel = "critical" | "high" | "medium" | "low";

/**
 * Time-related types for temporal reasoning
 */
export type TimeFrame = "immediate" | "short-term" | "medium-term" | "long-term";

/**
 * Type guard to check if a value is a ProcessedData object
 */
export function isProcessedData(value: any): value is ProcessedData {
  return (
    value !== null &&
    typeof value === "object" &&
    "raw" in value &&
    "metadata" in value &&
    typeof value.metadata === "object" &&
    "processingHistory" in value.metadata &&
    Array.isArray(value.metadata.processingHistory)
  );
}

/**
 * Type guard to check if a value is a CARResult object
 */
export function isCARResult(value: any): value is CARResult {
  return (
    value !== null &&
    typeof value === "object" &&
    "decision" in value &&
    "reasoning" in value &&
    "confidence" in value &&
    "uncertaintyFactors" in value &&
    Array.isArray(value.uncertaintyFactors) &&
    "epistemicLimitations" in value &&
    Array.isArray(value.epistemicLimitations)
  );
}
