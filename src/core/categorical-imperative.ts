// src/core/categorical-imperative.ts

/**
 * Categorical Imperative Module for the Critique of Artificial Reason (CAR)
 * 
 * This module implements Kant's moral philosophy based on the categorical imperative,
 * which serves as the foundation for ethical reasoning in the CAR framework.
 * 
 * In Kant's philosophy, the categorical imperative is a formal, universal moral principle
 * that does not depend on any particular ends or consequences. Kant formulated it in
 * several ways, the most famous being:
 * 
 * 1. Universal Law Formulation: "Act only according to that maxim whereby you can,
 *    at the same time, will that it should become a universal law."
 * 
 * 2. Humanity as End Formulation: "Act in such a way that you treat humanity, whether
 *    in your own person or in the person of any other, never merely as a means to an
 *    end, but always at the same time as an end."
 * 
 * 3. Kingdom of Ends Formulation: "Act according to maxims that can at the same time
 *    have as their object themselves as universal laws of nature."
 * 
 * In CAR, the Categorical Imperative Module evaluates actions against these formulations
 * to determine their moral permissibility, generates ethical insights, and suggests
 * alternatives to morally problematic actions.
 */

/**
 * Type representing an action to be evaluated
 */
export interface Action {
  /** Description of the action */
  description: string;
  
  /** Actor performing the action */
  actor?: string;
  
  /** Recipients of the action */
  recipients?: string[];
  
  /** Intent behind the action */
  intent?: string;
  
  /** Expected consequences of the action */
  consequences?: string[];
  
  /** Domain of the action (e.g., healthcare, education) */
  domain?: string;
  
  /** Additional context for the action */
  context?: Record<string, any>;
}

/**
 * Result of evaluating an action against the universal law formulation
 */
export interface UniversalLawResult {
  /** Whether the action passes the universal law test */
  passes: boolean;
  
  /** Explanation of the evaluation */
  reasoning: string;
  
  /** The reconstructed maxim of the action */
  maxim?: string;
  
  /** Contradiction type if the action fails (contradiction in conception or in will) */
  contradictionType?: 'conception' | 'will' | null;
  
  /** Description of the contradiction if the action fails */
  contradiction?: string;
  
  /** Confidence in this evaluation (0-1) */
  confidence: number;
}

/**
 * Result of evaluating an action against the humanity as end formulation
 */
export interface HumanityAsEndResult {
  /** Whether the action passes the humanity as end test */
  passes: boolean;
  
  /** Explanation of the evaluation */
  reasoning: string;
  
  /** How the action treats affected persons */
  treatment?: 'end' | 'means' | 'both' | 'unclear';
  
  /** Specific ways the action respects or violates autonomy */
  autonomyAnalysis?: string;
  
  /** Confidence in this evaluation (0-1) */
  confidence: number;
}

/**
 * Result of evaluating an action against the kingdom of ends formulation
 */
export interface KingdomOfEndsResult {
  /** Whether the action passes the kingdom of ends test */
  passes: boolean;
  
  /** Explanation of the evaluation */
  reasoning: string;
  
  /** How the action aligns with an ideal moral community */
  communityAlignment?: string;
  
  /** Specific stakeholders and their perspectives */
  stakeholderAnalysis?: string[];
  
  /** Confidence in this evaluation (0-1) */
  confidence: number;
}

/**
 * Combined result of evaluating an action against all formulations of the categorical imperative
 */
export interface CategoricalImperativeResult {
  /** Whether the action passes all formulations */
  passes: boolean;
  
  /** Overall explanation of the ethical evaluation */
  explanation: string;
  
  /** Result of the universal law formulation test */
  universalLaw: UniversalLawResult;
  
  /** Result of the humanity as end formulation test */
  humanityAsEnd: HumanityAsEndResult;
  
  /** Result of the kingdom of ends formulation test */
  kingdomOfEnds: KingdomOfEndsResult;
  
  /** Optional: Alternative action that would pass the categorical imperative */
  alternativeAction?: string;
  
  /** Optional: Specific duties relevant to this action */
  duties?: {
    perfect?: string[];   // Duties that must always be fulfilled
    imperfect?: string[]; // Duties that should be fulfilled when possible
  };
  
  /** Overall confidence in the evaluation (0-1) */
  confidence: number;
}

/**
 * Configuration options for the Categorical Imperative Module
 */
export interface CategoricalImperativeOptions {
  /** Whether to prioritize the humanity formulation in cases of conflict */
  prioritizeHumanityFormulation?: boolean;
  
  /** Whether to analyze perfect and imperfect duties */
  analyzeDuties?: boolean;
  
  /** Whether to generate alternative actions */
  generateAlternatives?: boolean;
  
  /** Domain-specific ethical considerations */
  domainConsiderations?: Record<string, any>;
  
  /** Confidence threshold for passing (0-1) */
  confidenceThreshold?: number;
  
  /** Whether to use a strict or lenient interpretation */
  interpretationMode?: 'strict' | 'moderate' | 'lenient';
}

/**
 * Categorical Imperative Module - implements Kant's moral philosophy
 */
export class CategoricalImperative {
  private options: CategoricalImperativeOptions;
  
  /**
   * Initialize the Categorical Imperative Module with options
   */
  constructor(options?: CategoricalImperativeOptions) {
    this.options = {
      prioritizeHumanityFormulation: options?.prioritizeHumanityFormulation ?? true,
      analyzeDuties: options?.analyzeDuties ?? true,
      generateAlternatives: options?.generateAlternatives ?? true,
      domainConsiderations: options?.domainConsiderations ?? {},
      confidenceThreshold: options?.confidenceThreshold ?? 0.7,
      interpretationMode: options?.interpretationMode ?? 'moderate'
    };
  }
  
  /**
   * Evaluate an action against the categorical imperative
   * 
   * @param action The action to evaluate
   * @returns Ethical evaluation based on the categorical imperative
   */
  public evaluate(action: Action): CategoricalImperativeResult {
    // Evaluate against each formulation of the categorical imperative
    const universalLaw = this.evaluateUniversalLaw(action);
    const humanityAsEnd = this.evaluateHumanityAsEnd(action);
    const kingdomOfEnds = this.evaluateKingdomOfEnds(action);
    
    // Determine if the action passes the categorical imperative
    let passes = universalLaw.passes && humanityAsEnd.passes && kingdomOfEnds.passes;
    
    // In case of conflict between formulations
    if (this.options.prioritizeHumanityFormulation && !humanityAsEnd.passes) {
      passes = false;
    }
    
    // Generate explanation of the overall evaluation
    const explanation = this.generateExplanation(
      action, universalLaw, humanityAsEnd, kingdomOfEnds, passes
    );
    
    // Generate alternative action if needed and enabled
    let alternativeAction: string | undefined = undefined;
    if (!passes && this.options.generateAlternatives) {
      alternativeAction = this.generateAlternativeAction(
        action, universalLaw, humanityAsEnd, kingdomOfEnds
      );
    }
    
    // Analyze duties if enabled
    let duties: { perfect?: string[]; imperfect?: string[] } | undefined = undefined;
    if (this.options.analyzeDuties) {
      duties = this.analyzeDuties(action, universalLaw, humanityAsEnd, kingdomOfEnds);
    }
    
    // Calculate overall confidence
    const confidence = this.calculateOverallConfidence(universalLaw, humanityAsEnd, kingdomOfEnds);
    
    // Return the complete evaluation
    return {
      passes,
      explanation,
      universalLaw,
      humanityAsEnd,
      kingdomOfEnds,
      alternativeAction,
      duties,
      confidence
    };
  }
  
  /**
   * Evaluate an action against the universal law formulation
   * "Act only according to that maxim whereby you can, at the same time,
   * will that it should become a universal law."
   */
  private evaluateUniversalLaw(action: Action): UniversalLawResult {
    // Formulate the maxim of the action
    const maxim = this.formulateMaxim(action);
    
    // Check for contradiction in conception
    // (Whether the maxim can even be conceived as a universal law without contradiction)
    const conceptionResult = this.checkContradictionInConception(maxim, action);
    
    // If there's a contradiction in conception, return the result
    if (conceptionResult.hasContradiction) {
      return {
        passes: false,
        reasoning: `The action fails the universal law test due to a contradiction in conception: ${conceptionResult.contradiction}`,
        maxim,
        contradictionType: 'conception',
        contradiction: conceptionResult.contradiction,
        confidence: conceptionResult.confidence
      };
    }
    
    // Check for contradiction in will
    // (Whether the maxim can be willed as a universal law without contradiction)
    const willResult = this.checkContradictionInWill(maxim, action);
    
    // If there's a contradiction in will, return the result
    if (willResult.hasContradiction) {
      return {
        passes: false,
        reasoning: `The action fails the universal law test due to a contradiction in will: ${willResult.contradiction}`,
        maxim,
        contradictionType: 'will',
        contradiction: willResult.contradiction,
        confidence: willResult.confidence
      };
    }
    
    // If no contradictions, the action passes the universal law formulation
    const confidence = Math.min(conceptionResult.confidence, willResult.confidence);
    
    return {
      passes: true,
      reasoning: "The action passes the universal law test as its maxim can be consistently universalized",
      maxim,
      contradictionType: null,
      confidence
    };
  }
  
  /**
   * Evaluate an action against the humanity as end formulation
   * "Act in such a way that you treat humanity, whether in your own person or
   * in the person of any other, never merely as a means to an end, but always
   * at the same time as an end."
   */
  private evaluateHumanityAsEnd(action: Action): HumanityAsEndResult {
    // Analyze how the action treats affected persons
    const treatmentAnalysis = this.analyzePersonTreatment(action);
    
    // Analyze impact on autonomy
    const autonomyAnalysis = this.analyzeAutonomy(action);
    
    // If the action treats persons merely as means, it fails
    if (treatmentAnalysis.treatment === 'means') {
      return {
        passes: false,
        reasoning: `The action fails the humanity test as it treats persons merely as means: ${treatmentAnalysis.reasoning}`,
        treatment: 'means',
        autonomyAnalysis,
        confidence: treatmentAnalysis.confidence
      };
    }
    
    // If the treatment is unclear but autonomy analysis shows problems
    if (treatmentAnalysis.treatment === 'unclear' && autonomyAnalysis.includes('violates autonomy')) {
      return {
        passes: false,
        reasoning: `The action fails the humanity test due to autonomy concerns: ${autonomyAnalysis}`,
        treatment: 'unclear',
        autonomyAnalysis,
        confidence: treatmentAnalysis.confidence * 0.9 // Lower confidence due to unclear treatment
      };
    }
    
    // If action treats persons as ends or both (means and ends)
    let passes = treatmentAnalysis.treatment === 'end';
    let confidence = treatmentAnalysis.confidence;
    
    // In moderate interpretation, "both" can pass if end is sufficiently respected
    if (treatmentAnalysis.treatment === 'both' && this.options.interpretationMode !== 'strict') {
      passes = true;
      confidence *= 0.85; // Reduce confidence slightly for "both" case
    }
    
    return {
      passes,
      reasoning: passes 
        ? `The action passes the humanity test as it treats persons as ends in themselves: ${treatmentAnalysis.reasoning}`
        : `The action fails the humanity test: ${treatmentAnalysis.reasoning}`,
      treatment: treatmentAnalysis.treatment,
      autonomyAnalysis,
      confidence
    };
  }
  
  /**
   * Evaluate an action against the kingdom of ends formulation
   * "Act according to maxims that can at the same time have as their
   * object themselves as universal laws of nature."
   */
  private evaluateKingdomOfEnds(action: Action): KingdomOfEndsResult {
    // Analyze alignment with ideal moral community
    const communityResult = this.analyzeKingdomAlignment(action);
    
    // Analyze stakeholder perspectives
    const stakeholderAnalysis = this.analyzeStakeholders(action);
    
    // Determine if the action passes based on alignment score
    const passes = communityResult.alignmentScore >= 0.7;
    
    return {
      passes,
      reasoning: passes
        ? `The action passes the kingdom of ends test as it aligns with an ideal moral community: ${communityResult.reasoning}`
        : `The action fails the kingdom of ends test: ${communityResult.reasoning}`,
      communityAlignment: communityResult.reasoning,
      stakeholderAnalysis,
      confidence: communityResult.confidence
    };
  }
  
  /**
   * Formulate the maxim of an action
   * A maxim is the subjective principle of an action,
   * expressing the intention and purpose behind it
   */
  private formulateMaxim(action: Action): string {
    let maxim = "";
    
    // Extract actor
    const actor = action.actor || "I";
    
    // Extract action verb and context
    const actionVerb = this.extractActionVerb(action.description);
    
    // Extract purpose/intent
    const intent = action.intent || this.inferIntent(action.description, action.consequences);
    
    // Construct the maxim
    maxim = `${actor} will ${actionVerb} ${this.extractActionObject(action.description)} in order to ${intent}`;
    
    return maxim;
  }
  
  /**
   * Check if universalizing a maxim leads to a contradiction in conception
   * (The maxim cannot even be conceived as a universal law)
   */
  private checkContradictionInConception(
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    // Extract key components from the maxim
    const actionType = this.extractActionType(maxim);
    const intent = this.extractIntent(maxim);
    
    // Initial assumption: no contradiction
    let hasContradiction = false;
    let contradiction = "";
    let confidence = 0.8;
    
    // Check for classic examples of contradictions in conception
    
    // 1. False promising
    if (this.isRelatedToFalsePromising(actionType, intent)) {
      hasContradiction = true;
      contradiction = "If everyone made false promises, the institution of promising would collapse, making the maxim self-defeating";
      confidence = 0.9;
    }
    
    // 2. Deception
    else if (this.isRelatedToDeception(actionType, intent)) {
      hasContradiction = true;
      contradiction = "If everyone engaged in deception whenever convenient, trust would become impossible, undermining the very possibility of deception";
      confidence = 0.85;
    }
    
    // 3. Free-riding
    else if (this.isRelatedToFreeRiding(actionType, intent)) {
      hasContradiction = true;
      contradiction = "If everyone opted out of contributing while still receiving benefits, the system would collapse, making the benefits impossible";
      confidence = 0.85;
    }
    
    // Domain-specific analyses
    if (!hasContradiction && action.domain) {
      const domainResult = this.checkDomainSpecificContradictions(action.domain, maxim, action);
      if (domainResult.hasContradiction) {
        hasContradiction = true;
        contradiction = domainResult.contradiction!;
        confidence = domainResult.confidence;
      }
    }
    
    // General logical analysis for other cases
    if (!hasContradiction) {
      // Check if universalizing would undermine the very conditions needed for the action
      const universalizedMaxim = `Everyone will ${this.extractActionVerb(maxim)} ${this.extractActionObject(maxim)} in order to ${this.extractIntent(maxim)}`;
      
      const conditions = this.identifyNecessaryConditions(maxim);
      const wouldUndermineConditions = this.wouldUniversalizationUndermine(universalizedMaxim, conditions);
      
      if (wouldUndermineConditions.wouldUndermine) {
        hasContradiction = true;
        contradiction = wouldUndermineConditions.explanation;
        confidence = wouldUndermineConditions.confidence;
      }
    }
    
    // Adjust confidence based on interpretation mode
    if (this.options.interpretationMode === 'strict' && hasContradiction) {
      confidence = Math.min(confidence + 0.1, 0.95); // Stricter interpretation increases confidence in contradictions
    } else if (this.options.interpretationMode === 'lenient' && hasContradiction) {
      confidence = Math.max(confidence - 0.15, 0.5); // Lenient interpretation reduces confidence in contradictions
    }
    
    return { hasContradiction, contradiction, confidence };
  }
  
  /**
   * Check if universalizing a maxim leads to a contradiction in will
   * (The maxim can be conceived but not rationally willed as a universal law)
   */
  private checkContradictionInWill(
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    // Extract key components from the maxim
    const actionType = this.extractActionType(maxim);
    const intent = this.extractIntent(maxim);
    
    // Initial assumption: no contradiction
    let hasContradiction = false;
    let contradiction = "";
    let confidence = 0.75;
    
    // Check for classic examples of contradictions in will
    
    // 1. Refusal to help others in need
    if (this.isRelatedToRefusingHelp(actionType, intent)) {
      hasContradiction = true;
      contradiction = "If no one helped others in need, this would conflict with our own rational will as we would want help when in need ourselves";
      confidence = 0.85;
    }
    
    // 2. Neglect of talents and abilities
    else if (this.isRelatedToNeglectingTalents(actionType, intent)) {
      hasContradiction = true;
      contradiction = "As rational beings, we necessarily will the development of our capacities, so we cannot consistently will a world where everyone neglects their talents";
      confidence = 0.8;
    }
    
    // 3. Indifference to others' well-being
    else if (this.isRelatedToIndifference(actionType, intent)) {
      hasContradiction = true;
      contradiction = "We cannot rationally will a world of universal indifference to well-being, as this would conflict with our own rational will to have others care about our well-being";
      confidence = 0.75;
    }
    
    // Domain-specific analyses
    if (!hasContradiction && action.domain) {
      const domainResult = this.checkDomainSpecificWillContradictions(action.domain, maxim, action);
      if (domainResult.hasContradiction) {
        hasContradiction = true;
        contradiction = domainResult.contradiction!;
        confidence = domainResult.confidence;
      }
    }
    
    // Check if universalizing would create a world rational beings could not will
    if (!hasContradiction) {
      const universalizedMaxim = `Everyone will ${this.extractActionVerb(maxim)} ${this.extractActionObject(maxim)} in order to ${this.extractIntent(maxim)}`;
      
      const rationalWillAnalysis = this.analyzeRationalWill(universalizedMaxim, action);
      
      if (!rationalWillAnalysis.canBeRationallyWilled) {
        hasContradiction = true;
        contradiction = rationalWillAnalysis.explanation;
        confidence = rationalWillAnalysis.confidence;
      }
    }
    
    // Adjust confidence based on interpretation mode
    if (this.options.interpretationMode === 'strict' && hasContradiction) {
      confidence = Math.min(confidence + 0.1, 0.95); // Stricter interpretation increases confidence in contradictions
    } else if (this.options.interpretationMode === 'lenient' && hasContradiction) {
      confidence = Math.max(confidence - 0.15, 0.5); // Lenient interpretation reduces confidence in contradictions
    }
    
    return { hasContradiction, contradiction, confidence };
  }
  
  /**
   * Analyze how an action treats affected persons
   * (as means, as ends, both, or unclear)
   */
  private analyzePersonTreatment(action: Action): {
    treatment: 'end' | 'means' | 'both' | 'unclear';
    reasoning: string;
    confidence: number;
  } {
    // Default values
    let treatment: 'end' | 'means' | 'both' | 'unclear' = 'unclear';
    let reasoning = "";
    let confidence = 0.7;
    
    // Extract key aspects of the action
    const actionDescription = action.description.toLowerCase();
    const intent = (action.intent || "").toLowerCase();
    const consequences = action.consequences || [];
    
    // Check for indicators of treating persons merely as means
    const meansIndicators = [
      { pattern: /manipulat|exploit|use.*people|use.*person|us.*as tools?/i, weight: 0.9 },
      { pattern: /deceiv|mislead|trick|fool/i, weight: 0.8 },
      { pattern: /coerce|force|compel|without consent|without permission/i, weight: 0.85 },
      { pattern: /disregard.*autonomy|ignore.*choice|overrule.*decision/i, weight: 0.85 },
      { pattern: /objectif|commodif/i, weight: 0.8 }
    ];
    
    let meansEvidenceStrength = 0;
    const meansEvidence: string[] = [];
    
    meansIndicators.forEach(indicator => {
      if (indicator.pattern.test(actionDescription) || indicator.pattern.test(intent)) {
        meansEvidenceStrength += indicator.weight;
        meansEvidence.push(`Contains language suggesting instrumentalization: "${indicator.pattern.source}"`);
      }
    });
    
    // Check consequences for treatment as means
    if (consequences.some(c => 
      /autonomy.*reduc|choice.*limit|freedom.*restrict/i.test(c) ||
      /manipulat|exploit|deceiv|mislead/i.test(c)
    )) {
      meansEvidenceStrength += 0.7;
      meansEvidence.push("Consequences include reduction of autonomy or manipulation");
    }
    
    // Check for indicators of treating persons as ends
    const endsIndicators = [
      { pattern: /respect.*autonomy|respect.*dignity|respect.*person/i, weight: 0.9 },
      { pattern: /consent|permission|agreement|voluntar/i, weight: 0.8 },
      { pattern: /inform.*choice|full disclosure|transparent/i, weight: 0.75 },
      { pattern: /empower|enable|support autonomy|enhance freedom/i, weight: 0.8 },
      { pattern: /benefit|well-being|welfare|flourish|good of/i, weight: 0.7 }
    ];
    
    let endsEvidenceStrength = 0;
    const endsEvidence: string[] = [];
    
    endsIndicators.forEach(indicator => {
      if (indicator.pattern.test(actionDescription) || indicator.pattern.test(intent)) {
        endsEvidenceStrength += indicator.weight;
        endsEvidence.push(`Contains language respecting persons as ends: "${indicator.pattern.source}"`);
      }
    });
    
    // Check consequences for treatment as ends
    if (consequences.some(c => 
      /autonomy.*enhanc|choice.*expand|freedom.*increas/i.test(c) ||
      /empower|respect|dignit|wellbeing|flourish/i.test(c)
    )) {
      endsEvidenceStrength += 0.7;
      endsEvidence.push("Consequences include enhancement of autonomy or well-being");
    }
    
    // Additional contextual analysis
    if (action.recipients && action.recipients.length > 0) {
      // Check if consent is mentioned for recipients
      if (actionDescription.includes('consent') || intent.includes('consent')) {
        endsEvidenceStrength += 0.5;
        endsEvidence.push("Explicit mention of consent from affected persons");
      } else {
        // Check action context for consent information
        if (action.context && 'consent' in action.context) {
          if (action.context.consent === true) {
            endsEvidenceStrength += 0.5;
            endsEvidence.push("Context indicates consent was obtained");
          } else if (action.context.consent === false) {
            meansEvidenceStrength += 0.6;
            meansEvidence.push("Context indicates absence of consent");
          }
        }
      }
    }
    
    // Determine treatment based on evidence strengths
    if (meansEvidenceStrength >= 1.0 && endsEvidenceStrength < 0.5) {
      treatment = 'means';
      reasoning = `Treats persons merely as means because: ${meansEvidence.join('; ')}`;
      confidence = Math.min(0.5 + (meansEvidenceStrength * 0.1), 0.95);
    } else if (endsEvidenceStrength >= 1.0 && meansEvidenceStrength < 0.5) {
      treatment = 'end';
      reasoning = `Treats persons as ends because: ${endsEvidence.join('; ')}`;
      confidence = Math.min(0.5 + (endsEvidenceStrength * 0.1), 0.95);
    } else if (meansEvidenceStrength >= 0.5 && endsEvidenceStrength >= 0.5) {
      treatment = 'both';
      reasoning = `Treats persons both as means and ends because: ${meansEvidence.join('; ')}; but also ${endsEvidence.join('; ')}`;
      confidence = 0.7;
    } else {
      treatment = 'unclear';
      reasoning = "Insufficient evidence to determine how the action treats persons";
      confidence = 0.5;
    }
    
    // Adjust confidence based on interpretation mode
    if (this.options.interpretationMode === 'strict' && treatment !== 'end') {
      confidence = Math.min(confidence + 0.1, 0.95); // Stricter interpretation increases confidence in non-end classifications
    } else if (this.options.interpretationMode === 'lenient' && treatment !== 'means') {
      confidence = Math.min(confidence + 0.1, 0.95); // Lenient interpretation increases confidence in non-means classifications
    }
    
    return { treatment, reasoning, confidence };
  }
  
  /**
   * Analyze how an action affects autonomy
   */
  private analyzeAutonomy(action: Action): string {
    const actionDescription = action.description.toLowerCase();
    const intent = (action.intent || "").toLowerCase();
    const consequences = action.consequences || [];
    
    // Check for autonomy-enhancing features
    const enhancesAutonomy = 
      /informed consent|full disclosure|transparency|clear information|options|alternatives|choice|freedom/i.test(actionDescription) ||
      /respect.*autonomy|enhance.*autonomy|support.*choice|enable.*decision/i.test(actionDescription) ||
      /empower/i.test(actionDescription) ||
      intent.includes('autonomy') || intent.includes('choice') || intent.includes('freedom') ||
      consequences.some(c => /autonomy|choice|freedom|empowerment/i.test(c));
    
    // Check for autonomy-violating features
    const violatesAutonomy = 
      /manipulat|deceiv|mislead|coerce|force|compel|pressure/i.test(actionDescription) ||
      /without consent|without permission|without knowledge|against.*will/i.test(actionDescription) ||
      /limit.*choice|restrict.*freedom|reduce.*autonomy/i.test(actionDescription) ||
      intent.includes('control') || intent.includes('manipulate') ||
      consequences.some(c => /manipulation|coercion|deception|reduced autonomy/i.test(c));
    
    // Generate autonomy analysis
    if (enhancesAutonomy && !violatesAutonomy) {
      return "respects and enhances autonomy by providing information, options, and respecting choice";
    } else if (!enhancesAutonomy && violatesAutonomy) {
      return "violates autonomy through manipulation, coercion, or limiting informed choice";
    } else if (enhancesAutonomy && violatesAutonomy) {
      return "has mixed effects on autonomy, both supporting and potentially undermining aspects of self-determination";
    } else {
      return "has unclear implications for autonomy";
    }
  }
  
  /**
   * Analyze alignment with the kingdom of ends
   */
  private analyzeKingdomAlignment(action: Action): {
    alignmentScore: number;
    reasoning: string;
    confidence: number;
  } {
    // Starting point for alignment score
    let alignmentScore = 0.5;
    let alignmentReasoning: string[] = [];
    let confidence = 0.7;
    
    // Extract relevant information
    const actionDescription = action.description.toLowerCase();
    const intent = (action.intent || "").toLowerCase();
    const consequences = action.consequences || [];
    
    // Check for features supporting kingdom of ends alignment
    const harmonyIndicators = [
      { pattern: /mutual respect|reciprocity|cooperation|community/i, weight: 0.15 },
      { pattern: /equality|fairness|justice|impartiality/i, weight: 0.15 },
      { pattern: /dignity|rights|personhood|humanity/i, weight: 0.2 },
      { pattern: /common good|public interest|greater good/i, weight: 0.1 },
      { pattern: /universal|benefit all|benefit everyone/i, weight: 0.15 }
    ];
    
    harmonyIndicators.forEach(indicator => {
      if (indicator.pattern.test(actionDescription) || indicator.pattern.test(intent) || 
          consequences.some(c => indicator.pattern.test(c))) {
        alignmentScore += indicator.weight;
        alignmentReasoning.push(`Supports harmonious moral community through: ${indicator.pattern.source}`);
      }
    });
    
    // Check for features undermining kingdom of ends
    const disharmonyIndicators = [
      { pattern: /conflict|division|discord|tension/i, weight: 0.15 },
      { pattern: /inequality|unfair|unjust|discriminatory/i, weight: 0.15 },
      { pattern: /disrespect|disregard|dismiss/i, weight: 0.15 },
      { pattern: /special treatment|privilege|favoritism/i, weight: 0.1 },
      { pattern: /exclude|marginalize|ignore needs/i, weight: 0.15 }
    ];
    
    disharmonyIndicators.forEach(indicator => {
      if (indicator.pattern.test(actionDescription) || indicator.pattern.test(intent) || 
          consequences.some(c => indicator.pattern.test(c))) {
        alignmentScore -= indicator.weight;
        alignmentReasoning.push(`Undermines harmonious moral community through: ${indicator.pattern.source}`);
      }
    });
    
    // Check for universalizability implications
    if (action.context && action.context.universalLawResult) {
      const universalLawResult = action.context.universalLawResult;
      if (universalLawResult.passes) {
        alignmentScore += 0.15;
        alignmentReasoning.push("Supports kingdom of ends through universalizability");
      } else {
        alignmentScore -= 0.15;
        alignmentReasoning.push("Undermines kingdom of ends through lack of universalizability");
      }
    }
    
    // Check for humanity implications
    if (action.context && action.context.humanityResult) {
      const humanityResult = action.context.humanityResult;
      if (humanityResult.treatment === 'end') {
        alignmentScore += 0.2;
        alignmentReasoning.push("Supports kingdom of ends by treating persons as ends in themselves");
      } else if (humanityResult.treatment === 'means') {
        alignmentScore -= 0.3;
        alignmentReasoning.push("Significantly undermines kingdom of ends by treating persons merely as means");
      }
    }
    
    // Domain-specific analysis
    if (action.domain) {
      const domainResult = this.analyzeKingdomAlignmentByDomain(action.domain, action);
      alignmentScore += domainResult.scoreAdjustment;
      alignmentReasoning.push(domainResult.reasoning);
      confidence = Math.max(confidence, domainResult.confidence);
    }
    
    // Generate final reasoning
    let reasoning;
    if (alignmentScore >= 0.7) {
      reasoning = `Aligns with a kingdom of ends because it: ${alignmentReasoning.filter(r => !r.includes('Undermine')).join('; ')}`;
    } else if (alignmentScore <= 0.3) {
      reasoning = `Conflicts with a kingdom of ends because it: ${alignmentReasoning.filter(r => r.includes('Undermine')).join('; ')}`;
    } else {
      reasoning = `Has mixed alignment with a kingdom of ends: ${alignmentReasoning.join('; ')}`;
    }
    
    // Ensure alignment score is within bounds
    alignmentScore = Math.max(0, Math.min(1, alignmentScore));
    
    // Adjust confidence based on evidence strength
    confidence = Math.min(0.6 + (Math.abs(alignmentScore - 0.5) * 0.5), 0.9);
    
    // Adjust confidence based on interpretation mode
    if (this.options.interpretationMode === 'strict') {
      alignmentScore -= 0.1; // Stricter interpretation lowers alignment score
    } else if (this.options.interpretationMode === 'lenient') {
      alignmentScore += 0.1; // Lenient interpretation raises alignment score
    }
    
    // Final bounds check after adjustments
    alignmentScore = Math.max(0, Math.min(1, alignmentScore));
    
    return { alignmentScore, reasoning, confidence };
  }
  
  /**
   * Analyze stakeholder perspectives for kingdom of ends assessment
   */
  private analyzeStakeholders(action: Action): string[] {
    const stakeholderAnalysis: string[] = [];
    
    // Identify relevant stakeholders
    let stakeholders = this.identifyStakeholders(action);
    
    // Add explicit recipients if provided
    if (action.recipients && action.recipients.length > 0) {
      stakeholders = [...new Set([...stakeholders, ...action.recipients])];
    }
    
    // Generate stakeholder-specific analyses
    stakeholders.forEach(stakeholder => {
      const stakeholderPerspective = this.analyzeStakeholderPerspective(stakeholder, action);
      stakeholderAnalysis.push(`${stakeholder}: ${stakeholderPerspective}`);
    });
    
    return stakeholderAnalysis;
  }
  
  /**
   * Identify stakeholders affected by an action
   */
  private identifyStakeholders(action: Action): string[] {
    const stakeholders: string[] = [];
    const actionDescription = action.description.toLowerCase();
    
    // Add generic stakeholders
    stakeholders.push("All rational beings");
    
    // Add actor if specified
    if (action.actor) {
      stakeholders.push(action.actor);
    }
    
    // Add domain-specific stakeholders
    if (action.domain) {
      switch (action.domain.toLowerCase()) {
        case 'healthcare':
          stakeholders.push("Patients", "Healthcare providers", "Healthcare system");
          break;
          
        case 'education':
          stakeholders.push("Students", "Educators", "Educational institutions");
          break;
          
        case 'business':
        case 'finance':
          stakeholders.push("Customers", "Employees", "Shareholders", "Community");
          break;
          
        case 'governance':
        case 'policy':
          stakeholders.push("Citizens", "Public officials", "Future generations");
          break;
      }
    }
    
    // Identify additional stakeholders from action description
    const stakeholderTerms = [
      { term: 'patient', stakeholder: 'Patients' },
      { term: 'student', stakeholder: 'Students' },
      { term: 'customer', stakeholder: 'Customers' },
      { term: 'client', stakeholder: 'Clients' },
      { term: 'employee', stakeholder: 'Employees' },
      { term: 'citizen', stakeholder: 'Citizens' },
      { term: 'community', stakeholder: 'Community members' },
      { term: 'user', stakeholder: 'Users' },
      { term: 'child', stakeholder: 'Children' },
      { term: 'family', stakeholder: 'Families' }
    ];
    
    stakeholderTerms.forEach(({ term, stakeholder }) => {
      if (actionDescription.includes(term)) {
        stakeholders.push(stakeholder);
      }
    });
    
    // Return unique stakeholders
    return [...new Set(stakeholders)];
  }
  
  /**
   * Analyze a stakeholder's perspective on an action
   */
  private analyzeStakeholderPerspective(stakeholder: string, action: Action): string {
    const actionDescription = action.description.toLowerCase();
    const stakeholderLower = stakeholder.toLowerCase();
    
    // Check if the stakeholder is directly affected
    let isDirectlyAffected = action.recipients ? 
                             action.recipients.some(r => r.toLowerCase() === stakeholderLower) : 
                             false;
    
    if (!isDirectlyAffected) {
      isDirectlyAffected = actionDescription.includes(stakeholderLower);
    }
    
    // Generate perspective based on stakeholder type
    switch (stakeholderLower) {
      case 'patients':
        return this.analyzeHealthcareStakeholder(action, isDirectlyAffected);
        
      case 'students':
        return this.analyzeEducationStakeholder(action, isDirectlyAffected);
        
      case 'customers':
      case 'clients':
      case 'employees':
      case 'shareholders':
        return this.analyzeBusinessStakeholder(action, isDirectlyAffected);
        
      case 'citizens':
      case 'public officials':
      case 'future generations':
        return this.analyzeGovernanceStakeholder(action, isDirectlyAffected);
        
      case 'all rational beings':
        return "Would evaluate based on universalizability and respect for autonomy";
        
      default:
        return "Would expect to be treated as an end, not merely as a means";
    }
  }
  
  /**
   * Analyze healthcare stakeholder perspective
   */
  private analyzeHealthcareStakeholder(
    action: Action, 
    isDirectlyAffected: boolean
  ): string {
    const actionDescription = action.description.toLowerCase();
    
    if (isDirectlyAffected) {
      // Patient perspective
      if (actionDescription.includes('without consent') || 
          actionDescription.includes('without informing') || 
          actionDescription.includes('against wishes')) {
        return "Would reject this action as it violates patient autonomy";
      }
      
      if (actionDescription.includes('benefit') || 
          actionDescription.includes('improve') || 
          actionDescription.includes('treat') || 
          actionDescription.includes('heal')) {
        return "Would accept this action as it promotes patient well-being while respecting autonomy";
      }
      
      return "Would want their autonomy and well-being to be considered equally";
    } else {
      // Healthcare provider or system perspective
      if (actionDescription.includes('cost') || actionDescription.includes('efficiency')) {
        return "Would consider system-wide implications for resource allocation and efficiency";
      }
      
      return "Would evaluate based on medical ethics principles of beneficence, non-maleficence, autonomy, and justice";
    }
  }
  
  /**
   * Analyze education stakeholder perspective
   */
  private analyzeEducationStakeholder(
    action: Action, 
    isDirectlyAffected: boolean
  ): string {
    const actionDescription = action.description.toLowerCase();
    
    if (isDirectlyAffected) {
      // Student perspective
      if (actionDescription.includes('without input') || 
          actionDescription.includes('mandatory') || 
          actionDescription.includes('require')) {
        return "Would question whether their educational autonomy is being respected";
      }
      
      if (actionDescription.includes('support') || 
          actionDescription.includes('help') || 
          actionDescription.includes('enable')) {
        return "Would accept this action as it supports educational development";
      }
      
      return "Would want their educational growth and autonomy to be supported";
    } else {
      // Educator or institution perspective
      if (actionDescription.includes('standard') || 
          actionDescription.includes('quality') || 
          actionDescription.includes('assessment')) {
        return "Would consider implications for educational standards and quality";
      }
      
      return "Would evaluate based on educational principles of growth, autonomy, fairness, and development";
    }
  }
  
  /**
   * Analyze business stakeholder perspective
   */
  private analyzeBusinessStakeholder(
    action: Action, 
    isDirectlyAffected: boolean
  ): string {
    const actionDescription = action.description.toLowerCase();
    
    if (isDirectlyAffected) {
      // Customer/client perspective
      if (actionDescription.includes('without disclosure') || 
          actionDescription.includes('hidden fee') || 
          actionDescription.includes('mislead')) {
        return "Would reject this action as it violates consumer trust";
      }
      
      if (actionDescription.includes('value') || 
          actionDescription.includes('quality') || 
          actionDescription.includes('benefit')) {
        return "Would accept this action as it provides fair value";
      }
      
      return "Would expect fair treatment, transparency, and value";
    } else {
      // Business perspective
      if (actionDescription.includes('profit') || 
          actionDescription.includes('cost') || 
          actionDescription.includes('competitive')) {
        return "Would consider implications for sustainable business practices and long-term viability";
      }
      
      return "Would evaluate based on business ethics principles of fairness, sustainability, and stakeholder value";
    }
  }
  
  /**
   * Analyze governance stakeholder perspective
   */
  private analyzeGovernanceStakeholder(
    action: Action, 
    isDirectlyAffected: boolean
  ): string {
    const actionDescription = action.description.toLowerCase();
    
    if (isDirectlyAffected) {
      // Citizen perspective
      if (actionDescription.includes('without consultation') || 
          actionDescription.includes('unilateral') || 
          actionDescription.includes('imposed')) {
        return "Would question whether their democratic voice is being respected";
      }
      
      if (actionDescription.includes('public good') || 
          actionDescription.includes('benefit') || 
          actionDescription.includes('improve')) {
        return "Would evaluate based on whether it truly serves the public interest";
      }
      
      return "Would expect transparency, accountability, and consideration of public welfare";
    } else {
      // Governance perspective
      if (actionDescription.includes('policy') || 
          actionDescription.includes('regulation') || 
          actionDescription.includes('law')) {
        return "Would consider implications for governance principles and long-term societal impacts";
      }
      
      return "Would evaluate based on principles of justice, democratic accountability, and public service";
    }
  }
  
  /**
   * Analyze domain-specific kingdom of ends alignment
   */
  private analyzeKingdomAlignmentByDomain(
    domain: string, 
    action: Action
  ): { scoreAdjustment: number; reasoning: string; confidence: number } {
    switch (domain.toLowerCase()) {
      case 'healthcare':
        return this.analyzeHealthcareKingdomAlignment(action);
        
      case 'education':
        return this.analyzeEducationKingdomAlignment(action);
        
      case 'business':
      case 'finance':
        return this.analyzeBusinessKingdomAlignment(action);
        
      case 'governance':
      case 'policy':
        return this.analyzeGovernanceKingdomAlignment(action);
        
      default:
        return { scoreAdjustment: 0, reasoning: "No domain-specific analysis available", confidence: 0.5 };
    }
  }
  
  /**
   * Analyze healthcare-specific kingdom of ends alignment
   */
  private analyzeHealthcareKingdomAlignment(
    action: Action
  ): { scoreAdjustment: number; reasoning: string; confidence: number } {
    const actionDescription = action.description.toLowerCase();
    
    // Positive indicators in healthcare
    if (actionDescription.includes('informed consent') || 
        actionDescription.includes('patient autonomy') || 
        actionDescription.includes('shared decision')) {
      return {
        scoreAdjustment: 0.2,
        reasoning: "Strongly supports healthcare community through respect for patient autonomy",
        confidence: 0.85
      };
    }
    
    // Negative indicators in healthcare
    if (actionDescription.includes('paternalistic') || 
        actionDescription.includes('without consent') || 
        actionDescription.includes('experimental treatment') && !actionDescription.includes('informed')) {
      return {
        scoreAdjustment: -0.2,
        reasoning: "Undermines healthcare community through paternalism or disregard for consent",
        confidence: 0.85
      };
    }
    
    return {
      scoreAdjustment: 0,
      reasoning: "Has neutral implications for healthcare community",
      confidence: 0.7
    };
  }
  
  /**
   * Analyze education-specific kingdom of ends alignment
   */
  private analyzeEducationKingdomAlignment(
    action: Action
  ): { scoreAdjustment: number; reasoning: string; confidence: number } {
    const actionDescription = action.description.toLowerCase();
    
    // Positive indicators in education
    if (actionDescription.includes('critical thinking') || 
        actionDescription.includes('student autonomy') || 
        actionDescription.includes('inclusive education')) {
      return {
        scoreAdjustment: 0.2,
        reasoning: "Strongly supports educational community through empowerment and inclusion",
        confidence: 0.85
      };
    }
    
    // Negative indicators in education
    if (actionDescription.includes('standardize') && actionDescription.includes('test') || 
        actionDescription.includes('exclude') || 
        actionDescription.includes('discriminate')) {
      return {
        scoreAdjustment: -0.15,
        reasoning: "Potentially undermines educational community through excessive standardization or exclusion",
        confidence: 0.75
      };
    }
    
    return {
      scoreAdjustment: 0,
      reasoning: "Has neutral implications for educational community",
      confidence: 0.7
    };
  }
  
  /**
   * Analyze business-specific kingdom of ends alignment
   */
  private analyzeBusinessKingdomAlignment(
    action: Action
  ): { scoreAdjustment: number; reasoning: string; confidence: number } {
    const actionDescription = action.description.toLowerCase();
    
    // Positive indicators in business
    if (actionDescription.includes('fair trade') || 
        actionDescription.includes('sustainable') || 
        actionDescription.includes('ethical business')) {
      return {
        scoreAdjustment: 0.2,
        reasoning: "Strongly supports business community through ethical and sustainable practices",
        confidence: 0.85
      };
    }
    
    // Negative indicators in business
    if (actionDescription.includes('exploit') || 
        actionDescription.includes('manipulate market') || 
        actionDescription.includes('deceptive marketing')) {
      return {
        scoreAdjustment: -0.2,
        reasoning: "Undermines business community through exploitation or deception",
        confidence: 0.85
      };
    }
    
    return {
      scoreAdjustment: 0,
      reasoning: "Has neutral implications for business community",
      confidence: 0.7
    };
  }
  
  /**
   * Analyze governance-specific kingdom of ends alignment
   */
  private analyzeGovernanceKingdomAlignment(
    action: Action
  ): { scoreAdjustment: number; reasoning: string; confidence: number } {
    const actionDescription = action.description.toLowerCase();
    
    // Positive indicators in governance
    if (actionDescription.includes('democratic') || 
        actionDescription.includes('transparent') || 
        actionDescription.includes('public consultation')) {
      return {
        scoreAdjustment: 0.2,
        reasoning: "Strongly supports governance community through democratic principles",
        confidence: 0.85
      };
    }
    
    // Negative indicators in governance
    if (actionDescription.includes('authoritarian') || 
        actionDescription.includes('secretive') || 
        actionDescription.includes('exclude public')) {
      return {
        scoreAdjustment: -0.2,
        reasoning: "Undermines governance community through authoritarian or non-transparent approaches",
        confidence: 0.85
      };
    }
    
    return {
      scoreAdjustment: 0,
      reasoning: "Has neutral implications for governance community",
      confidence: 0.7
    };
  }
  
  /**
   * Generate an explanation of the overall ethical evaluation
   */
  private generateExplanation(
    action: Action,
    universalLaw: UniversalLawResult,
    humanityAsEnd: HumanityAsEndResult,
    kingdomOfEnds: KingdomOfEndsResult,
    passes: boolean
  ): string {
    if (passes) {
      return `This action is morally permissible according to the categorical imperative. It can be universalized without contradiction, treats humanity as an end rather than merely as a means, and aligns with an ideal moral community.`;
    }
    
    // If the action fails, identify which formulations it fails
    const failingFormulations = [];
    let primaryReason = "";
    
    if (!universalLaw.passes) {
      failingFormulations.push("universal law");
      primaryReason = universalLaw.reasoning;
    }
    
    if (!humanityAsEnd.passes) {
      failingFormulations.push("humanity as end");
      // Prioritize humanity formulation for explanation if it fails
      if (this.options.prioritizeHumanityFormulation || !primaryReason) {
        primaryReason = humanityAsEnd.reasoning;
      }
    }
    
    if (!kingdomOfEnds.passes) {
      failingFormulations.push("kingdom of ends");
      // Use kingdom of ends explanation if others not available
      if (!primaryReason) {
        primaryReason = kingdomOfEnds.reasoning;
      }
    }
    
    return `This action is not morally permissible according to the categorical imperative. It fails the ${failingFormulations.join(" and ")} formulation(s). ${primaryReason}`;
  }
  
  /**
   * Generate an alternative action that would pass the categorical imperative
   */
  private generateAlternativeAction(
    action: Action,
    universalLaw: UniversalLawResult,
    humanityAsEnd: HumanityAsEndResult,
    kingdomOfEnds: KingdomOfEndsResult
  ): string {
    let alternativeAction = action.description;
    let modifications: string[] = [];
    
    // Address universal law issues
    if (!universalLaw.passes) {
      if (universalLaw.contradictionType === 'conception') {
        const conceptFix = this.generateConceptionFix(action, universalLaw);
        alternativeAction = this.incorporateModification(alternativeAction, conceptFix.modification);
        modifications.push(conceptFix.explanation);
      } else if (universalLaw.contradictionType === 'will') {
        const willFix = this.generateWillFix(action, universalLaw);
        alternativeAction = this.incorporateModification(alternativeAction, willFix.modification);
        modifications.push(willFix.explanation);
      }
    }
    
    // Address humanity as end issues
    if (!humanityAsEnd.passes) {
      const humanityFix = this.generateHumanityFix(action, humanityAsEnd);
      alternativeAction = this.incorporateModification(alternativeAction, humanityFix.modification);
      modifications.push(humanityFix.explanation);
    }
    
    // Address kingdom of ends issues
    if (!kingdomOfEnds.passes) {
      const kingdomFix = this.generateKingdomFix(action, kingdomOfEnds);
      alternativeAction = this.incorporateModification(alternativeAction, kingdomFix.modification);
      modifications.push(kingdomFix.explanation);
    }
    
    // Add explanation if there were modifications
    if (modifications.length > 0) {
      return `${alternativeAction} (Modified to: ${modifications.join("; ")})`;
    }
    
    // If no specific fixes were generated, provide a generic ethical alternative
    return this.generateGenericEthicalAlternative(action);
  }
  
  /**
   * Analyze perfect and imperfect duties related to an action
   */
  private analyzeDuties(
    action: Action,
    universalLaw: UniversalLawResult,
    humanityAsEnd: HumanityAsEndResult,
    kingdomOfEnds: KingdomOfEndsResult
  ): { perfect?: string[]; imperfect?: string[] } {
    const perfectDuties: string[] = [];
    const imperfectDuties: string[] = [];
    
    // Derive duties from universal law
    if (!universalLaw.passes) {
      if (universalLaw.contradictionType === 'conception') {
        // Perfect duties arise from contradictions in conception
        perfectDuties.push(this.derivePerfectDutyFromContradiction(universalLaw));
      } else if (universalLaw.contradictionType === 'will') {
        // Imperfect duties arise from contradictions in will
        imperfectDuties.push(this.deriveImperfectDutyFromContradiction(universalLaw));
      }
    }
    
    // Derive duties from humanity formulation
    if (!humanityAsEnd.passes) {
      perfectDuties.push(this.deriveDutyFromHumanityFormulation(humanityAsEnd));
    }
    
    // Consider domain-specific duties
    if (action.domain) {
      const domainDuties = this.deriveDomainSpecificDuties(action.domain, action);
      
      if (domainDuties.perfect && domainDuties.perfect.length > 0) {
        perfectDuties.push(...domainDuties.perfect);
      }
      
      if (domainDuties.imperfect && domainDuties.imperfect.length > 0) {
        imperfectDuties.push(...domainDuties.imperfect);
      }
    }
    
    // Add generic perfect duties if none specific were found
    if (perfectDuties.length === 0) {
      perfectDuties.push(
        "Do not lie",
        "Do not make false promises",
        "Do not commit suicide",
        "Respect others' autonomy"
      );
    }
    
    // Add generic imperfect duties if none specific were found
    if (imperfectDuties.length === 0) {
      imperfectDuties.push(
        "Help others in need",
        "Develop one's talents",
        "Contribute to others' happiness"
      );
    }
    
    return { perfect: perfectDuties, imperfect: imperfectDuties };
  }
  
  /**
   * Calculate overall confidence in the ethical evaluation
   */
  private calculateOverallConfidence(
    universalLaw: UniversalLawResult,
    humanityAsEnd: HumanityAsEndResult,
    kingdomOfEnds: KingdomOfEndsResult
  ): number {
    // Initial confidence based on weighted average of formulation confidences
    // Humanity formulation weighted slightly higher if prioritized
    const humanityWeight = this.options.prioritizeHumanityFormulation ? 0.4 : 0.33;
    const otherWeight = this.options.prioritizeHumanityFormulation ? 0.3 : 0.33;
    
    const weightedConfidence = 
      (universalLaw.confidence * otherWeight) +
      (humanityAsEnd.confidence * humanityWeight) +
      (kingdomOfEnds.confidence * otherWeight);
    
    // Adjust based on consistency among formulations
    const allAgree = (universalLaw.passes === humanityAsEnd.passes) && 
                    (humanityAsEnd.passes === kingdomOfEnds.passes);
    
    // Increase confidence if all formulations agree
    if (allAgree) {
      return Math.min(weightedConfidence + 0.1, 0.95);
    }
    
    // Decrease confidence if there are disagreements
    return Math.max(weightedConfidence - 0.15, 0.5);
  }
  
  /**
   * Generate fixes for contradictions in conception
   */
  private generateConceptionFix(
    action: Action, 
    universalLaw: UniversalLawResult
  ): { modification: string; explanation: string } {
    if (!universalLaw.contradiction) {
      return { modification: action.description, explanation: "No contradiction to fix" };
    }
    
    // Extract key components
    const actionDescription = action.description.toLowerCase();
    
    // Common conception contradictions and their fixes
    
    // 1. False promising
    if (universalLaw.contradiction.includes('promise') || actionDescription.includes('promise')) {
      return {
        modification: action.description.replace(
          /promise.*while.*(not intending|no intention)/i,
          "make promises only when genuinely intending to fulfill them"
        ),
        explanation: "Make only sincere promises"
      };
    }
    
    // 2. Deception
    if (universalLaw.contradiction.includes('deception') || 
        universalLaw.contradiction.includes('truth') || 
        actionDescription.includes('deceive') || 
        actionDescription.includes('lie')) {
      return {
        modification: action.description.replace(
          /deceive|mislead|lie|trick/i,
          "communicate honestly"
        ),
        explanation: "Communicate truthfully"
      };
    }
    
    // 3. Free-riding
    if (universalLaw.contradiction.includes('free-riding') || 
        actionDescription.includes('without contributing') || 
        actionDescription.includes('without paying')) {
      return {
        modification: action.description.replace(
          /without (contributing|paying|supporting)/i,
          "while fairly contributing"
        ),
        explanation: "Contribute fairly to systems from which one benefits"
      };
    }
    
    // Generic fix
    return {
      modification: action.description,
      explanation: "Ensure the action could be universalized without contradiction"
    };
  }
  
  /**
   * Generate fixes for contradictions in will
   */
  private generateWillFix(
    action: Action, 
    universalLaw: UniversalLawResult
  ): { modification: string; explanation: string } {
    if (!universalLaw.contradiction) {
      return { modification: action.description, explanation: "No contradiction to fix" };
    }
    
    // Extract key components
    const actionDescription = action.description.toLowerCase();
    
    // Common will contradictions and their fixes
    
    // 1. Refusing help
    if (universalLaw.contradiction.includes('help') || 
        actionDescription.includes('refuse to help') || 
        actionDescription.includes('ignore those in need')) {
      return {
        modification: action.description.replace(
          /refuse to help|ignore those in need|deny assistance/i,
          "offer reasonable assistance to those in need"
        ),
        explanation: "Provide help to others when reasonably able"
      };
    }
    
    // 2. Neglecting talents
    if (universalLaw.contradiction.includes('talents') || 
        actionDescription.includes('neglect') || 
        actionDescription.includes('talents')) {
      return {
        modification: action.description.replace(
          /neglect.*talents|waste.*abilities|avoid developing/i,
          "develop my talents and abilities"
        ),
        explanation: "Cultivate and develop one's capacities"
      };
    }
    
    // 3. Indifference to well-being
    if (universalLaw.contradiction.includes('well-being') || 
        actionDescription.includes('indifferent') || 
        actionDescription.includes('disregard')) {
      return {
        modification: action.description.replace(
          /indifferent to|disregard|ignore.*wellbeing/i,
          "consider and support others' well-being"
        ),
        explanation: "Show concern for others' welfare"
      };
    }
    
    // Generic fix
    return {
      modification: action.description,
      explanation: "Ensure the action could be rationally willed as universal"
    };
  }
  
  /**
   * Generate fixes for treating humanity merely as means
   */
  private generateHumanityFix(
    action: Action,
    humanityAsEnd: HumanityAsEndResult
  ): { modification: string; explanation: string } {
    // Extract key components
    const actionDescription = action.description;
    const treatment = humanityAsEnd.treatment;
    
    // Fix based on the type of treatment issue
    if (treatment === 'means') {
      // Common issues with treating humanity merely as means
      
      // 1. Manipulation/deception
      if (actionDescription.toLowerCase().includes('manipulat') || 
          actionDescription.toLowerCase().includes('deceive') || 
          actionDescription.toLowerCase().includes('trick')) {
        return {
          modification: actionDescription.replace(
            /manipulate|deceive|trick|mislead/i,
            "engage honestly with"
          ),
          explanation: "Treat others with honesty rather than manipulation"
        };
      }
      
      // 2. Coercion
      if (actionDescription.toLowerCase().includes('force') || 
          actionDescription.toLowerCase().includes('coerce') || 
          actionDescription.toLowerCase().includes('compel')) {
        return {
          modification: actionDescription.replace(
            /force|coerce|compel/i,
            "respectfully request"
          ),
          explanation: "Respect others' autonomy rather than coercing them"
        };
      }
      
      // 3. Lack of consent
      if (actionDescription.toLowerCase().includes('without consent') || 
          actionDescription.toLowerCase().includes('without permission') || 
          actionDescription.toLowerCase().includes('without informing')) {
        return {
          modification: actionDescription.replace(
            /without (consent|permission|informing)/i,
            "with informed consent"
          ),
          explanation: "Obtain informed consent from affected persons"
        };
      }
      
      // Generic fix for treating as means
      return {
        modification: actionDescription + " while respecting the autonomy and dignity of all persons involved",
        explanation: "Respect others as ends in themselves"
      };
    } else if (treatment === 'both') {
      // When treating both as means and ends, strengthen the ends aspect
      return {
        modification: actionDescription + " while ensuring the autonomy and dignity of all persons is the primary consideration",
        explanation: "Prioritize respect for persons over instrumental considerations"
      };
    }
    
    // Default modification if treatment is unclear
    return {
      modification: actionDescription + " with explicit respect for the autonomy and dignity of all persons involved",
      explanation: "Explicitly respect others as ends in themselves"
    };
  }
  
  /**
   * Generate fixes for kingdom of ends issues
   */
  private generateKingdomFix(
    action: Action,
    kingdomOfEnds: KingdomOfEndsResult
  ): { modification: string; explanation: string } {
    // Extract key components
    const actionDescription = action.description;
    
    // Common issues with kingdom of ends alignment
    
    // 1. Special treatment or privilege
    if (actionDescription.toLowerCase().includes('special') || 
        actionDescription.toLowerCase().includes('privilege') || 
        actionDescription.toLowerCase().includes('exception')) {
      return {
        modification: actionDescription.replace(
          /special treatment|privilege|exception/i,
          "equitable treatment"
        ),
        explanation: "Ensure fairness and impartiality"
      };
    }
    
    // 2. Exclusion
    if (actionDescription.toLowerCase().includes('exclude') || 
        actionDescription.toLowerCase().includes('select') || 
        actionDescription.toLowerCase().includes('only for')) {
      return {
        modification: actionDescription.replace(
          /exclude|only for/i,
          "include"
        ),
        explanation: "Practice inclusion rather than exclusion"
      };
    }
    
    // 3. Undermining community
    if (actionDescription.toLowerCase().includes('undermine') || 
        actionDescription.toLowerCase().includes('disrupt') || 
        actionDescription.toLowerCase().includes('against community')) {
      return {
        modification: actionDescription.replace(
          /undermine|disrupt|against community/i,
          "strengthen community through"
        ),
        explanation: "Support rather than undermine community"
      };
    }
    
    // Generic fix
    return {
      modification: actionDescription + " in a way that contributes to a harmonious moral community",
      explanation: "Align action with an ideal moral community"
    };
  }
  
  /**
   * Generate a generic ethical alternative
   */
  private generateGenericEthicalAlternative(action: Action): string {
    const actionDescription = action.description;
    
    // Extract key components
    const verb = this.extractActionVerb(actionDescription);
    const object = this.extractActionObject(actionDescription);
    
    // Create an ethically improved version
    return `${verb} ${object} in a way that respects all persons as ends in themselves, could be universalized without contradiction, and contributes to a harmonious moral community`;
  }
  
  /**
   * Derive a perfect duty from a contradiction in conception
   */
  private derivePerfectDutyFromContradiction(universalLaw: UniversalLawResult): string {
    if (!universalLaw.contradiction) {
      return "Adhere to perfect duties";
    }
    
    // Common perfect duties based on contradictions
    if (universalLaw.contradiction.includes('promise')) {
      return "Do not make false promises";
    }
    
    if (universalLaw.contradiction.includes('deception') || universalLaw.contradiction.includes('truth')) {
      return "Do not deceive others";
    }
    
    if (universalLaw.contradiction.includes('free-riding')) {
      return "Do not take advantage of systems without contributing to them";
    }
    
    // Generic perfect duty based on the contradiction
    return `Do not ${this.extractActionVerb(universalLaw.maxim || "")}`;
  }
  
  /**
   * Derive an imperfect duty from a contradiction in will
   */
  private deriveImperfectDutyFromContradiction(universalLaw: UniversalLawResult): string {
    if (!universalLaw.contradiction) {
      return "Adhere to imperfect duties";
    }
    
    // Common imperfect duties based on contradictions
    if (universalLaw.contradiction.includes('help') || universalLaw.contradiction.includes('need')) {
      return "Help others in need";
    }
    
    if (universalLaw.contradiction.includes('talents') || universalLaw.contradiction.includes('capacities')) {
      return "Develop one's talents and capacities";
    }
    
    if (universalLaw.contradiction.includes('well-being') || universalLaw.contradiction.includes('welfare')) {
      return "Contribute to others' well-being";
    }
    
    // Generic imperfect duty
    return "Strive to perfect oneself and promote the happiness of others";
  }
  
  /**
   * Derive a duty from the humanity formulation
   */
  private deriveDutyFromHumanityFormulation(humanityAsEnd: HumanityAsEndResult): string {
    if (humanityAsEnd.treatment === 'means') {
      // If treating merely as means, derive a corresponding duty
      if (humanityAsEnd.reasoning.includes('manipulat') || humanityAsEnd.reasoning.includes('deceiv')) {
        return "Respect others' rational agency by being truthful";
      }
      
      if (humanityAsEnd.reasoning.includes('consent') || humanityAsEnd.reasoning.includes('autonomy')) {
        return "Respect others' autonomy by seeking informed consent";
      }
      
      if (humanityAsEnd.reasoning.includes('coerce') || humanityAsEnd.reasoning.includes('force')) {
        return "Respect others' freedom by avoiding coercion";
      }
      
      // Generic duty based on humanity formulation
      return "Treat humanity always as an end, never merely as a means";
    }
    
    return "Respect the dignity and autonomy of all persons";
  }
  
  /**
   * Derive domain-specific duties
   */
  private deriveDomainSpecificDuties(
    domain: string, 
    action: Action
  ): { perfect?: string[]; imperfect?: string[] } {
    switch (domain.toLowerCase()) {
      case 'healthcare':
        return {
          perfect: [
            "Maintain patient confidentiality",
            "Obtain informed consent",
            "Do no harm to patients"
          ],
          imperfect: [
            "Promote patient well-being",
            "Develop medical knowledge and skills",
            "Provide care to those in need"
          ]
        };
      
      case 'education':
        return {
          perfect: [
            "Avoid academic dishonesty",
            "Respect student autonomy",
            "Provide fair evaluation"
          ],
          imperfect: [
            "Foster student development",
            "Improve educational methods",
            "Support struggling learners"
          ]
        };
      
      case 'business':
      case 'finance':
        return {
          perfect: [
            "Honor contracts and agreements",
            "Provide truthful information",
            "Respect property rights"
          ],
          imperfect: [
            "Contribute to sustainable practices",
            "Develop business capabilities",
            "Support employee well-being"
          ]
        };
      
      case 'governance':
      case 'policy':
        return {
          perfect: [
            "Avoid corruption and bribery",
            "Apply laws impartially",
            "Honor public commitments"
          ],
          imperfect: [
            "Promote the public good",
            "Develop effective governance",
            "Address societal needs"
          ]
        };
      
      default:
        return {
          perfect: ["Respect others' rights and autonomy"],
          imperfect: ["Promote well-being and development"]
        };
    }
  }
  
  /**
   * Check for domain-specific contradictions
   */
  private checkDomainSpecificContradictions(
    domain: string, 
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    // Default: no contradiction
    let result = { hasContradiction: false, confidence: 0.7 };
    
    switch (domain.toLowerCase()) {
      case 'healthcare':
        return this.checkHealthcareContradictions(maxim, action);
        
      case 'education':
        return this.checkEducationContradictions(maxim, action);
        
      case 'business':
      case 'finance':
        return this.checkBusinessContradictions(maxim, action);
        
      case 'governance':
      case 'policy':
        return this.checkGovernanceContradictions(maxim, action);
        
      default:
        return result;
    }
  }
  
  /**
   * Check for healthcare-specific contradictions
   */
  private checkHealthcareContradictions(
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    const maximLower = maxim.toLowerCase();
    
    // Check for contradictions specific to healthcare context
    
    // 1. Violating confidentiality
    if (maximLower.includes('confidential') && 
        (maximLower.includes('reveal') || maximLower.includes('share') || maximLower.includes('disclose'))) {
      return {
        hasContradiction: true,
        contradiction: "If all healthcare providers revealed confidential information, the practice of confidentiality would collapse, undermining the trust necessary for effective healthcare",
        confidence: 0.9
      };
    }
    
    // 2. Providing experimental treatment without proper protocols
    if ((maximLower.includes('experimental') || maximLower.includes('untested')) && 
        (maximLower.includes('treatment') || maximLower.includes('medication') || maximLower.includes('procedure'))) {
      return {
        hasContradiction: true,
        contradiction: "If all healthcare providers administered experimental treatments without established protocols, the ability to determine treatment efficacy and safety would collapse",
        confidence: 0.85
      };
    }
    
    // 3. Placebo treatment deception
    if (maximLower.includes('placebo') && 
        (maximLower.includes('deceive') || maximLower.includes('mislead') || maximLower.includes('without informing'))) {
      return {
        hasContradiction: true,
        contradiction: "If all healthcare providers routinely deceived patients about placebos, informed consent would become impossible, undermining the practice of medicine",
        confidence: 0.85
      };
    }
    
    // No healthcare-specific contradiction found
    return { hasContradiction: false, confidence: 0.7 };
  }
  
  /**
   * Check for education-specific contradictions
   */
  private checkEducationContradictions(
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    const maximLower = maxim.toLowerCase();
    
    // Check for contradictions specific to education context
    
    // 1. Academic dishonesty or plagiarism
    if ((maximLower.includes('plagiarize') || maximLower.includes('cheat') || maximLower.includes('academic dishonesty')) ||
        (maximLower.includes('take credit') && maximLower.includes('work'))) {
      return {
        hasContradiction: true,
        contradiction: "If all students or educators engaged in academic dishonesty, the educational system's ability to verify learning and credentialing would collapse",
        confidence: 0.9
      };
    }
    
    // 2. False credentials or qualifications
    if ((maximLower.includes('false') || maximLower.includes('fake')) && 
        (maximLower.includes('credential') || maximLower.includes('qualification') || maximLower.includes('degree'))) {
      return {
        hasContradiction: true,
        contradiction: "If everyone claimed false credentials, the credentialing system would lose all meaning and function",
        confidence: 0.9
      };
    }
    
    // 3. Refusing to teach certain students
    if ((maximLower.includes('refuse') || maximLower.includes('deny') || maximLower.includes('exclude')) && 
        (maximLower.includes('teach') || maximLower.includes('education') || maximLower.includes('instruct'))) {
      return {
        hasContradiction: true,
        contradiction: "If all educators refused to teach certain students, the educational system would fail in its essential purpose",
        confidence: 0.85
      };
    }
    
    // No education-specific contradiction found
    return { hasContradiction: false, confidence: 0.7 };
  }
  
  /**
   * Check for business/finance-specific contradictions
   */
  private checkBusinessContradictions(
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    const maximLower = maxim.toLowerCase();
    
    // Check for contradictions specific to business/finance context
    
    // 1. False advertising
    if ((maximLower.includes('false') || maximLower.includes('mislead') || maximLower.includes('deceptive')) && 
        (maximLower.includes('advertis') || maximLower.includes('market') || maximLower.includes('promot'))) {
      return {
        hasContradiction: true,
        contradiction: "If all businesses engaged in false advertising, consumer trust would collapse, making advertising itself ineffective",
        confidence: 0.9
      };
    }
    
    // 2. Breaking contracts
    if ((maximLower.includes('break') || maximLower.includes('violate') || maximLower.includes('ignore')) && 
        (maximLower.includes('contract') || maximLower.includes('agreement') || maximLower.includes('commitment'))) {
      return {
        hasContradiction: true,
        contradiction: "If everyone broke contracts at will, the institution of contracts would collapse, making business transactions impossible",
        confidence: 0.9
      };
    }
    
    // 3. Insider trading
    if (maximLower.includes('insider') && 
        (maximLower.includes('trading') || maximLower.includes('information') || maximLower.includes('advantage'))) {
      return {
        hasContradiction: true,
        contradiction: "If everyone engaged in insider trading, markets would lose their function of price discovery and efficient capital allocation",
        confidence: 0.85
      };
    }
    
    // No business-specific contradiction found
    return { hasContradiction: false, confidence: 0.7 };
  }
  
  /**
   * Check for governance/policy-specific contradictions
   */
  private checkGovernanceContradictions(
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    const maximLower = maxim.toLowerCase();
    
    // Check for contradictions specific to governance/policy context
    
    // 1. Corruption or bribery
    if ((maximLower.includes('bribe') || maximLower.includes('corrupt') || maximLower.includes('kickback')) ||
        (maximLower.includes('payment') && maximLower.includes('favor'))) {
      return {
        hasContradiction: true,
        contradiction: "If all public officials accepted bribes, governance based on rule of law would collapse",
        confidence: 0.9
      };
    }
    
    // 2. Selective law enforcement
    if ((maximLower.includes('selective') || maximLower.includes('arbitrary')) && 
        (maximLower.includes('enforce') || maximLower.includes('apply') || maximLower.includes('law'))) {
      return {
        hasContradiction: true,
        contradiction: "If all laws were enforced selectively or arbitrarily, the concept of rule of law would collapse",
        confidence: 0.85
      };
    }
    
    // 3. Making unfulfillable promises to constituents
    if ((maximLower.includes('promise') || maximLower.includes('pledge')) && 
        (maximLower.includes('cannot fulfill') || maximLower.includes('cannot deliver') || maximLower.includes('impossible'))) {
      return {
        hasContradiction: true,
        contradiction: "If all public officials made unfulfillable promises, democratic accountability would collapse",
        confidence: 0.85
      };
    }
    
    // No governance-specific contradiction found
    return { hasContradiction: false, confidence: 0.7 };
  }
  
  /**
   * Check for domain-specific contradictions in will
   */
  private checkDomainSpecificWillContradictions(
    domain: string, 
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    // Default: no contradiction
    let result = { hasContradiction: false, confidence: 0.7 };
    
    switch (domain.toLowerCase()) {
      case 'healthcare':
        return this.checkHealthcareWillContradictions(maxim, action);
        
      case 'education':
        return this.checkEducationWillContradictions(maxim, action);
        
      case 'business':
      case 'finance':
        return this.checkBusinessWillContradictions(maxim, action);
        
      case 'governance':
      case 'policy':
        return this.checkGovernanceWillContradictions(maxim, action);
        
      default:
        return result;
    }
  }
  
  /**
   * Check for healthcare-specific contradictions in will
   */
  private checkHealthcareWillContradictions(
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    const maximLower = maxim.toLowerCase();
    
    // 1. Refusing care to difficult patients
    if ((maximLower.includes('refuse') || maximLower.includes('avoid') || maximLower.includes('decline')) && 
        (maximLower.includes('difficult patient') || maximLower.includes('challenging patient'))) {
      return {
        hasContradiction: true,
        contradiction: "As rational beings who may ourselves become 'difficult patients,' we cannot consistently will a world where healthcare providers refuse care to such individuals",
        confidence: 0.85
      };
    }
    
    // 2. Minimal effort in patient care
    if ((maximLower.includes('minimal') || maximLower.includes('least')) && 
        (maximLower.includes('effort') || maximLower.includes('work') || maximLower.includes('care'))) {
      return {
        hasContradiction: true,
        contradiction: "As rational beings who may ourselves need medical care, we cannot consistently will a world where healthcare providers exert minimal effort",
        confidence: 0.8
      };
    }
    
    // No healthcare-specific contradiction in will found
    return { hasContradiction: false, confidence: 0.7 };
  }
  
  /**
   * Check for education-specific contradictions in will
   */
  private checkEducationWillContradictions(
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    const maximLower = maxim.toLowerCase();
    
    // 1. Minimal effort in teaching
    if ((maximLower.includes('minimal') || maximLower.includes('least')) && 
        (maximLower.includes('effort') || maximLower.includes('work') || maximLower.includes('preparation'))) {
      return {
        hasContradiction: true,
        contradiction: "As rational beings who value education, we cannot consistently will a world where educators exert minimal effort",
        confidence: 0.85
      };
    }
    
    // 2. Focusing only on high-performing students
    if ((maximLower.includes('only') || maximLower.includes('exclusively')) && 
        (maximLower.includes('high-performing') || maximLower.includes('gifted') || maximLower.includes('advanced'))) {
      return {
        hasContradiction: true,
        contradiction: "As rational beings who recognize diverse talents and learning paces, we cannot consistently will an educational system that focuses only on high-performing students",
        confidence: 0.8
      };
    }
    
    // No education-specific contradiction in will found
    return { hasContradiction: false, confidence: 0.7 };
  }
  
  /**
   * Check for business/finance-specific contradictions in will
   */
  private checkBusinessWillContradictions(
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    const maximLower = maxim.toLowerCase();
    
    // 1. Maximizing profit regardless of externalities
    if ((maximLower.includes('maximize') || maximLower.includes('profit')) && 
        (maximLower.includes('regardless') || maximLower.includes('despite') || maximLower.includes('ignoring'))) {
      return {
        hasContradiction: true,
        contradiction: "As rational beings who live in a shared environment, we cannot consistently will a business approach that ignores externalities, as we would suffer from others' negative externalities",
        confidence: 0.85
      };
    }
    
    // 2. Exploitative labor practices
    if ((maximLower.includes('exploit') || maximLower.includes('underpay')) && 
        (maximLower.includes('worker') || maximLower.includes('labor') || maximLower.includes('employee'))) {
      return {
        hasContradiction: true,
        contradiction: "As rational beings who may ourselves be workers, we cannot consistently will exploitative labor practices",
        confidence: 0.85
      };
    }
    
    // No business-specific contradiction in will found
    return { hasContradiction: false, confidence: 0.7 };
  }
  
  /**
   * Check for governance/policy-specific contradictions in will
   */
  private checkGovernanceWillContradictions(
    maxim: string, 
    action: Action
  ): { hasContradiction: boolean; contradiction?: string; confidence: number } {
    const maximLower = maxim.toLowerCase();
    
    // 1. Policies that benefit only a small group
    if ((maximLower.includes('only') || maximLower.includes('exclusively')) && 
        (maximLower.includes('benefit') || maximLower.includes('advantage') || maximLower.includes('favor'))) {
      return {
        hasContradiction: true,
        contradiction: "As rational beings in a society, we cannot consistently will policies that benefit only a small group at the expense of others",
        confidence: 0.85
      };
    }
    
    // 2. Ignoring constituents' needs
    if ((maximLower.includes('ignore') || maximLower.includes('disregard')) && 
        (maximLower.includes('constituent') || maximLower.includes('citizen') || maximLower.includes('public'))) {
      return {
        hasContradiction: true,
        contradiction: "As rational beings who are also citizens, we cannot consistently will a system where public officials ignore constituents' needs",
        confidence: 0.85
      };
    }
    
    // No governance-specific contradiction in will found
    return { hasContradiction: false, confidence: 0.7 };
  }
  
  /**
   * Identify necessary conditions for an action
   */
  private identifyNecessaryConditions(maxim: string): string[] {
    const conditions: string[] = [];
    const actionType = this.extractActionType(maxim);
    
    // Add conditions based on action type
    switch (actionType) {
      case 'promising':
        conditions.push('existence of the institution of promising', 'general trust in promises');
        break;
        
      case 'deceiving':
        conditions.push('general trust in truth-telling', 'ability to distinguish truth from falsehood');
        break;
        
      case 'helping':
        conditions.push('social practice of mutual aid', 'recognition of needs');
        break;
        
      case 'respecting':
        conditions.push('recognition of dignity', 'social practice of respect');
        break;
        
      case 'informing':
        conditions.push('value of accurate information', 'trust in information sharing');
        break;
        
      case 'withholding':
        conditions.push('expectation of disclosure', 'value of transparency');
        break;
        
      default:
        // Add generic conditions for any action
        conditions.push('social cooperation', 'mutual respect');
        break;
    }
    
    return conditions;
  }
  
  /**
   * Check if universalization would undermine necessary conditions
   */
  private wouldUniversalizationUndermine(
    universalizedMaxim: string, 
    conditions: string[]
  ): { wouldUndermine: boolean; explanation: string; confidence: number } {
    const maximLower = universalizedMaxim.toLowerCase();
    
    // Check each condition for potential undermining
    for (const condition of conditions) {
      const conditionLower = condition.toLowerCase();
      
      // Check for direct contradictions
      if ((maximLower.includes('deceive') || maximLower.includes('lie') || maximLower.includes('mislead')) && 
          (conditionLower.includes('trust') || conditionLower.includes('truth'))) {
        return {
          wouldUndermine: true,
          explanation: `Universal deception would undermine ${condition}, which is necessary for the action itself`,
          confidence: 0.9
        };
      }
      
      if ((maximLower.includes('break') || maximLower.includes('violate')) && 
          (conditionLower.includes('promise') || conditionLower.includes('commitment'))) {
        return {
          wouldUndermine: true,
          explanation: `Universal promise-breaking would undermine ${condition}, which is necessary for the action itself`,
          confidence: 0.9
        };
      }
      
      if ((maximLower.includes('free ride') || maximLower.includes('without contributing')) && 
          (conditionLower.includes('cooperation') || conditionLower.includes('mutual'))) {
        return {
          wouldUndermine: true,
          explanation: `Universal free-riding would undermine ${condition}, which is necessary for the action itself`,
          confidence: 0.85
        };
      }
    }
    
    return { wouldUndermine: false, explanation: "", confidence: 0.7 };
  }
  
  /**
   * Analyze whether a universalized maxim can be rationally willed
   */
  private analyzeRationalWill(
    universalizedMaxim: string, 
    action: Action
  ): { canBeRationallyWilled: boolean; explanation: string; confidence: number } {
    const maximLower = universalizedMaxim.toLowerCase();
    
    // Check if the universalized maxim conflicts with necessary ends of rational beings
    
    // 1. Happiness/well-being
    if ((maximLower.includes('ignore') || maximLower.includes('disregard')) && 
        (maximLower.includes('happiness') || maximLower.includes('well-being') || maximLower.includes('welfare'))) {
      return {
        canBeRationallyWilled: false,
        explanation: "As rational beings who necessarily will our own happiness, we cannot consistently will universal disregard for well-being",
        confidence: 0.85
      };
    }
    
    // 2. Development of capacities
    if ((maximLower.includes('neglect') || maximLower.includes('ignore')) && 
        (maximLower.includes('talent') || maximLower.includes('capacity') || maximLower.includes('ability'))) {
      return {
        canBeRationallyWilled: false,
        explanation: "As rational beings who necessarily will the development of our capacities, we cannot consistently will universal neglect of talents",
        confidence: 0.85
      };
    }
    
    // 3. Assistance in need
    if ((maximLower.includes('refuse') || maximLower.includes('deny')) && 
        (maximLower.includes('help') || maximLower.includes('assist') || maximLower.includes('aid'))) {
      return {
        canBeRationallyWilled: false,
        explanation: "As rational beings who may ourselves need assistance, we cannot consistently will a world where no one helps others in need",
        confidence: 0.85
      };
    }
    
    // 4. Disrespect for autonomy
    if ((maximLower.includes('disrespect') || maximLower.includes('violate')) && 
        (maximLower.includes('autonomy') || maximLower.includes('freedom') || maximLower.includes('choice'))) {
      return {
        canBeRationallyWilled: false,
        explanation: "As rational beings who value our own autonomy, we cannot consistently will universal disrespect for autonomy",
        confidence: 0.9
      };
    }
    
    // If no conflict is found, the maxim can be rationally willed
    return {
      canBeRationallyWilled: true,
      explanation: "This maxim does not conflict with the necessary ends of rational beings",
      confidence: 0.75
    };
  }
  
  /**
   * Extract the action verb from an action description
   */
  private extractActionVerb(description: string): string {
    // Try to find the main verb in the description
    const verbMatches = description.match(/\b(to\s+)?(create|make|develop|implement|establish|provide|offer|give|take|use|perform|conduct|analyze|assess|evaluate|do|act|treat|help|support|assist|enhance|improve|increase|decrease|reduce|minimize|maximize|optimize|promote|advocate|prevent|avoid|restrict|limit|prohibit|allow|enable|facilitate|encourage|discourage|maintain|sustain|protect|preserve|safeguard|ensure|guarantee|secure|achieve|attain|reach|pursue|seek|obtain|acquire|gain|earn|win|accomplish|fulfill|satisfy|meet|address|resolve|solve|handle|manage|administer|organize|arrange|coordinate|regulate|control|monitor|track|measure|record|document|report|communicate|inform|notify|alert|warn|advise|recommend|suggest|propose)\b/i);
    
    if (verbMatches && verbMatches[2]) {
      return verbMatches[2].toLowerCase();
    }
    
    // If no specific verb found, look for any verb-like pattern
    const generalVerbMatch = description.match(/\b(to\s+)?([a-z]+)(ing|ed|s)?\b/i);
    
    if (generalVerbMatch && generalVerbMatch[2]) {
      return generalVerbMatch[2].toLowerCase();
    }
    
    // Default if no verb identified
    return "perform the action of";
  }
  
  /**
   * Extract the object of an action from its description
   */
  private extractActionObject(description: string): string {
    // Remove any leading verbs to focus on the object
    const withoutVerb = description.replace(/\b(to\s+)?(create|make|develop|implement|establish|provide|offer|give|take|use|perform|conduct|analyze|assess|evaluate|do|act)\b\s+/i, "");
    
    // Extract a reasonable object phrase (up to 5 words following the verb)
    const objectMatch = withoutVerb.match(/^([a-z\s]{2,50}?)(\s+in order to|\s+for|\s+to|\s+so that|\.|$)/i);
    
    if (objectMatch && objectMatch[1]) {
      return objectMatch[1].trim();
    }
    
    // If no specific object pattern found, take the first part of the description
    const words = withoutVerb.split(/\s+/);
    if (words.length > 0) {
      return words.slice(0, Math.min(5, words.length)).join(" ");
    }
    
    // Default if no object identified
    return "this";
  }
  
  /**
   * Extract the action type for analysis
   */
  private extractActionType(maxim: string): string {
    const verbPatterns = {
      promising: /promis|commit|pledge|vow|agree/i,
      deceiving: /deceiv|mislead|lie|trick|manipulat|false/i,
      helping: /help|assist|aid|support|benefit/i,
      harming: /harm|hurt|injure|damage|destroy/i,
      respecting: /respect|honor|dignify|value/i,
      treating: /treat|handle|interact|deal with/i,
      developing: /develop|improve|enhance|grow/i,
      neglecting: /neglect|ignore|disregard|overlook/i,
      utilizing: /utiliz|use|employ|leverage/i,
      coercing: /coerc|force|compel|pressure/i,
      informing: /inform|tell|notify|share|disclose/i,
      withholding: /withhold|hide|conceal|keep/i
    };
    
    for (const [type, pattern] of Object.entries(verbPatterns)) {
      if (pattern.test(maxim)) {
        return type;
      }
    }
    
    return "general";
  }
  
  /**
   * Extract the intent from a maxim
   */
  private extractIntent(maxim: string): string {
    // Look for intent indicators
    const intentMatch = maxim.match(/in order to\s+(.+?)(\.|$)/) || 
                        maxim.match(/so that\s+(.+?)(\.|$)/) ||
                        maxim.match(/for the purpose of\s+(.+?)(\.|$)/);
    
    if (intentMatch && intentMatch[1]) {
      return intentMatch[1].trim();
    }
    
    return "";
  }
  
  /**
   * Infer the intent from action description and consequences
   */
  private inferIntent(description: string, consequences?: string[]): string {
    // Look for explicit intent indicators in the description
    const intentMatch = description.match(/in order to\s+(.+?)(\.|$)/) || 
                       description.match(/so that\s+(.+?)(\.|$)/) ||
                       description.match(/for the purpose of\s+(.+?)(\.|$)/) ||
                       description.match(/to\s+([a-z]+\s(?:[a-z]+\s){0,3}[a-z]+)(\.|$)/i);
    
    if (intentMatch && intentMatch[1]) {
      return intentMatch[1].trim();
    }
    
    // Infer intent from consequences if available
    if (consequences && consequences.length > 0) {
      // Use the first consequence as potential intent
      return `achieve ${consequences[0]}`;
    }
    
    // If no clear intent, derive from action itself
    const actionVerb = this.extractActionVerb(description);
    const actionObject = this.extractActionObject(description);
    
    return `${actionVerb} ${actionObject}`;
  }
  
  /**
   * Check if an action is related to false promising
   */
  private isRelatedToFalsePromising(actionType: string, intent: string): boolean {
    // Direct connection to promising
    if (actionType === 'promising' && 
        (intent.includes('no intention') || 
         intent.includes('without intending') || 
         intent.includes('knowing I cannot'))) {
      return true;
    }
    
    // Check for false promising patterns
    const falsePromisingPatterns = [
      /promise.*not.*intend/i,
      /promise.*without.*plan/i,
      /promise.*no.*intention/i,
      /commit.*cannot.*fulfill/i,
      /pledge.*knowing.*false/i,
      /agree.*no.*intention/i
    ];
    
    // Check for false promising patterns in action type and intent
    for (const pattern of falsePromisingPatterns) {
      if (pattern.test(`${actionType} ${intent}`)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Check if an action is related to deception
   */
  private isRelatedToDeception(actionType: string, intent: string): boolean {
    // Direct connection to deception
    if (actionType === 'deceiving') {
      return true;
    }
    
    // Check for deception patterns
    const deceptionPatterns = [
      /deceiv|lie|trick|mislead|manipulat/i,
      /false.*information/i,
      /conceal.*truth/i,
      /hide.*fact/i,
      /pretend.*to be/i,
      /misrepresent/i
    ];
    
    // Check for deception patterns in action type and intent
    for (const pattern of deceptionPatterns) {
      if (pattern.test(`${actionType} ${intent}`)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Check if an action is related to free-riding
   */
  private isRelatedToFreeRiding(actionType: string, intent: string): boolean {
    // Check for free-riding patterns
    const freeRidingPatterns = [
      /without.*contribut/i,
      /benefit.*without.*pay/i,
      /use.*without.*support/i,
      /take.*without.*give/i,
      /receive.*without.*reciprocat/i,
      /exploit.*system/i,
      /avoid.*payment/i,
      /avoid.*contribution/i,
      /avoid.*responsibility/i,
      /evade.*duty/i
    ];
    
    // Check for free-riding patterns in action type and intent
    for (const pattern of freeRidingPatterns) {
      if (pattern.test(`${actionType} ${intent}`)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Check if an action is related to refusing help
   */
  private isRelatedToRefusingHelp(actionType: string, intent: string): boolean {
    // Check for refusing help patterns
    const refusingHelpPatterns = [
      /refuse.*help/i,
      /deny.*assistance/i,
      /ignore.*need/i,
      /disregard.*suffering/i,
      /avoid.*helping/i,
      /withhold.*aid/i,
      /reject.*plea/i,
      /dismiss.*request.*help/i,
      /unwilling.*support/i,
      /neglect.*those in need/i
    ];
    
    // Check for refusing help patterns in action type and intent
    for (const pattern of refusingHelpPatterns) {
      if (pattern.test(`${actionType} ${intent}`)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Check if an action is related to neglecting talents
   */
  private isRelatedToNeglectingTalents(actionType: string, intent: string): boolean {
    // Check for neglecting talents patterns
    const neglectingTalentsPatterns = [
      /neglect.*talent/i,
      /waste.*abilit/i,
      /fail.*develop/i,
      /ignore.*potential/i,
      /avoid.*improv/i,
      /reject.*growth/i,
      /disregard.*skill/i,
      /abandon.*education/i,
      /forsake.*learning/i,
      /idle.*capacit/i
    ];
    
    // Check for neglecting talents patterns in action type and intent
    for (const pattern of neglectingTalentsPatterns) {
      if (pattern.test(`${actionType} ${intent}`)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Check if an action is related to indifference to well-being
   */
  private isRelatedToIndifference(actionType: string, intent: string): boolean {
    // Check for indifference patterns
    const indifferencePatterns = [
      /indifferent.*wellbeing/i,
      /disregard.*welfare/i,
      /ignore.*happiness/i,
      /unconcerned.*suffering/i,
      /apathy.*toward/i,
      /care.*not.*about/i,
      /disinterest.*in.*others/i,
      /neglect.*wellbeing/i,
      /dismiss.*concern/i,
      /overlook.*need/i
    ];
    
    // Check for indifference patterns in action type and intent
    for (const pattern of indifferencePatterns) {
      if (pattern.test(`${actionType} ${intent}`)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Incorporate a modification into action description
   */
  private incorporateModification(original: string, modification: string): string {
    // If modification is very similar to original, return it directly
    if (this.calculateStringSimilarity(original, modification) > 0.8) {
      return modification;
    }
    
    // If modification appears to be a complete replacement, use it
    if (modification.length > original.length * 0.8) {
      return modification;
    }
    
    // Otherwise, try to find the best way to incorporate the modification
    const words = original.split(' ');
    const modWords = modification.split(' ');
    
    // Look for partial matches to replace
    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j <= words.length; j++) {
        const phrase = words.slice(i, j).join(' ');
        if (this.calculateStringSimilarity(phrase, modification) > 0.5) {
          // Replace the similar phrase with the modification
          const before = words.slice(0, i).join(' ');
          const after = words.slice(j).join(' ');
          return `${before} ${modification} ${after}`.trim();
        }
      }
    }
    
    // If no good match found, append the modification
    return `${original} ${modification}`;
  }
  
  /**
   * Calculate similarity between two strings (simple implementation)
   */
  private calculateStringSimilarity(a: string, b: string): number {
    // Normalize strings
    const strA = a.toLowerCase();
    const strB = b.toLowerCase();
    
    // Calculate simple Jaccard similarity using words
    const wordsA = new Set(strA.split(/\s+/));
    const wordsB = new Set(strB.split(/\s+/));
    
    // Find intersection
    const intersection = new Set([...wordsA].filter(x => wordsB.has(x)));
    
    // Calculate union
    const union = new Set([...wordsA, ...wordsB]);
    
    // Return similarity ratio
    return intersection.size / union.size;
  }
}

/**
 * Export the Categorical Imperative module
 */
export {
  CategoricalImperative,
  Action,
  UniversalLawResult,
  HumanityAsEndResult,
  KingdomOfEndsResult,
  CategoricalImperativeResult,
  CategoricalImperativeOptions
};: false, confidence: 0.7 };
  }
