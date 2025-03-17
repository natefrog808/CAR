exampleResponse: 'I can\'t tell you definitively what happens during quantum measurement or which interpretation is "correct," as this remains one of the great unresolved questions in physics. What I can do is explain the main interpretations and their philosophical implications. The Copenhagen interpretation sees measurement as causing wave function collapse, but doesn\'t explain the mechanism. Many-worlds interpretation avoids collapse by suggesting all possibilities occur in branching universes. Decoherence explains the appearance of collapse through environmental interactions. QBism treats the wave function as representing subjective knowledge rather than objective reality. Each interpretation has philosophical strengths and challenges, but they make equivalent empirical predictions, making the choice underdetermined by evidence.'
        }
      ],
      flexibility: 0.3
    },
    {
      id: 'unified_field_theory',
      name: 'Complete Unified Theory of Physics',
      description: 'The boundary around complete unified theories integrating all physical forces and phenomena',
      type: EpistemicBoundaryType.KNOWLEDGE_LIMITATION,
      domains: ['physics', 'cosmology'],
      recognitionPatterns: [
        /theory of everything/i,
        /unified field theory/i,
        /complete physical theory/i,
        /final theory of physics/i
      ],
      keywords: ['unified theory', 'theory of everything', 'grand unified theory', 'final theory', 'fundamental physics'],
      relatedConcepts: ['string theory', 'quantum gravity', 'standard model', 'unification'],
      exampleQueries: [
        'What is the correct theory of everything?',
        'Has unified field theory been solved?',
        'Explain the final theory of physics',
        'Will we discover the theory that explains all physical phenomena?'
      ],
      rationale: 'A complete unified theory integrating all physical forces and phenomena remains a goal of theoretical physics, not an accomplished fact. Multiple approaches like string theory and loop quantum gravity exist, but none have achieved definitive empirical confirmation or complete theoretical consistency.',
      handlingApproaches: [
        {
          description: 'Explain current status and approaches',
          applicability: 'When informing about the state of theoretical physics',
          exampleResponse: 'I can\'t provide the "correct theory of everything" because no such complete unified theory has been empirically confirmed or achieved consensus in physics. What I can explain is the current state of this quest and the main approaches. The Standard Model successfully unifies electromagnetic, weak, and strong forces, but doesn\'t incorporate gravity or explain dark matter and energy. String theory proposes fundamental strings in higher dimensions to unify all forces, but lacks definitive experimental tests. Loop quantum gravity offers a different approach to quantizing spacetime. Other approaches include causal set theory and asymptotic safety. Each has theoretical strengths but also significant challenges. The search continues, with proposed experiments involving high-energy physics, gravitational waves, and cosmological observations.'
        }
      ],
      flexibility: 0.4
    }
  ],
  'economics': [
    {
      id: 'optimal_economic_system',
      name: 'Objectively Optimal Economic System',
      description: 'The boundary around claims of objectively optimal economic systems independent of values and trade-offs',
      type: EpistemicBoundaryType.VALUE_JUDGMENT,
      domains: ['economics', 'political economy'],
      recognitionPatterns: [
        /best economic system/i,
        /optimal economic arrangement/i,
        /ideal economy/i,
        /economic system that maximizes/i
      ],
      keywords: ['optimal', 'best', 'ideal', 'maximize', 'economic system', 'capitalism', 'socialism'],
      relatedConcepts: ['economic efficiency', 'equity', 'welfare economics', 'social choice theory'],
      exampleQueries: [
        'What is the best economic system?',
        'Is capitalism or socialism better?',
        'What economic arrangement maximizes human welfare?',
        'Tell me the ideal economic system'
      ],
      rationale: 'Economic systems involve fundamental trade-offs between values like efficiency, equality, liberty, security, and sustainability. The "optimal" system depends on normative judgments about the relative importance of these values, which cannot be determined by purely empirical means.',
      handlingApproaches: [
        {
          description: 'Explain value trade-offs and contingencies',
          applicability: 'When clarifying why no objectively best system exists',
          exampleResponse: 'I can\'t identify an objectively "best" economic system independent of value judgments and contextual factors. Economic systems involve fundamental trade-offs between values like efficiency, equality, liberty, stability, and sustainability. For example, market economies generally excel at information processing and innovation but may generate inequality and externalities. More planned approaches may reduce inequality but face knowledge and incentive challenges. Most successful economies are mixed systems with varying combinations of market mechanisms, regulation, and social insurance. The appropriate mix depends on historical context, development stage, institutional capacity, and societal preferences about these value trade-offs. I can discuss the empirical performance of different arrangements on specific metrics, but the overall "best" system is unavoidably a normative judgment.'
        }
      ],
      flexibility: 0.7
    },
    {
      id: 'precise_macroeconomic_prediction',
      name: 'Precise Macroeconomic Predictions',
      description: 'The boundary around precise predictions of macroeconomic variables',
      type: EpistemicBoundaryType.INDETERMINACY,
      domains: ['economics', 'finance'],
      recognitionPatterns: [
        /exactly predict .* GDP/i,
        /precise forecast .* (inflation|unemployment|interest rates)/i,
        /exactly when .* recession/i,
        /tell me exactly what .* economy will do/i
      ],
      keywords: ['forecast', 'predict', 'projection', 'macroeconomic', 'GDP', 'inflation', 'unemployment'],
      relatedConcepts: ['forecasting', 'economic modeling', 'uncertainty', 'business cycles'],
      exampleQueries: [
        'Exactly predict GDP growth for next year',
        'Tell me precisely what inflation will be in 6 months',
        'When exactly will the next recession occur?',
        'What will the unemployment rate be next quarter?'
      ],
      rationale: 'Macroeconomic systems involve complex interactions between millions of actors, policy choices, external shocks, and psychological factors like expectations and confidence. These complex dynamics, combined with data limitations and model uncertainty, make precise point predictions epistemically inaccessible.',
      handlingApproaches: [
        {
          description: 'Provide ranges and scenarios with uncertainty estimates',
          applicability: 'When probabilistic forecasts are possible',
          exampleResponse: 'I can\'t provide a precise forecast of inflation in 6 months, as macroeconomic predictions involve substantial uncertainty. What I can offer is information about current trends, expert forecasts with their ranges, and key factors that could influence outcomes. Most economic forecasters, including central banks, provide ranges or probability distributions rather than point estimates, acknowledging this inherent uncertainty. Current consensus forecasts from economists suggest inflation in the range of X% to Y% in 6 months, with risks to both the upside (factors like supply constraints, fiscal stimulus) and downside (factors like weakening demand, labor market cooling). Alternative scenarios depend on policy decisions, external shocks, and expectation dynamics.'
        }
      ],
      flexibility: 0.6
    }
  ],
  'medicine': [
    {
      id: 'individual_treatment_outcome',
      name: 'Definitive Individual Treatment Outcomes',
      description: 'The boundary around definitive predictions of how specific treatments will affect individual patients',
      type: EpistemicBoundaryType.INDETERMINACY,
      domains: ['medicine', 'healthcare'],
      recognitionPatterns: [
        /will this treatment definitely (work|help|cure)/i,
        /guarantee .* medical outcome/i,
        /exactly how .* respond to treatment/i,
        /certain that .* therapy will/i
      ],
      keywords: ['predict', 'outcome', 'response', 'guarantee', 'definite', 'treatment effect'],
      relatedConcepts: ['clinical prediction', 'personalized medicine', 'treatment heterogeneity', 'n-of-1'],
      exampleQueries: [
        'Will this medication definitely work for me?',
        'Can you guarantee this surgery will cure my condition?',
        'How exactly will I respond to this treatment?',
        'Am I certain to recover if I follow this therapy?'
      ],
      rationale: 'Individual treatment responses depend on numerous factors including genetics, comorbidities, environment, behavior, and random biological variation. Medical evidence typically provides population-level probabilities, not definitive individual predictions.',
      handlingApproaches: [
        {
          description: 'Provide population-level evidence with individual caveats',
          applicability: 'When explaining treatment efficacy while acknowledging uncertainty',
          exampleResponse: 'I can\'t predict with certainty how you specifically will respond to this treatment, as individual treatment responses vary based on genetics, comorbidities, environment, and biological variation that cannot be perfectly predicted. What I can share is population-level evidence: clinical trials show this medication helps about 60-70% of people with your condition, with an average symptom reduction of 40-50%. Some people experience complete remission while others see minimal benefit. Factors associated with better response include earlier treatment, fewer comorbidities, and certain biomarkers (which your doctor might have tested for). This information can inform decisions, but cannot guarantee your individual outcome. Your doctor can help monitor your response and adjust the approach if needed.'
        }
      ],
      flexibility: 0.5
    },
    {
      id: 'complete_disease_causation',
      name: 'Complete Disease Causation Models',
      description: 'The boundary around complete causal models of disease development in individuals',
      type: EpistemicBoundaryType.KNOWLEDGE_LIMITATION,
      domains: ['medicine', 'epidemiology'],
      recognitionPatterns: [
        /exact cause of .* disease/i,
        /precisely why .* developed/i,
        /definitive reason for .* illness/i,
        /complete explanation of .* condition/i
      ],
      keywords: ['cause', 'etiology', 'pathogenesis', 'develop', 'origin', 'exact cause'],
      relatedConcepts: ['multifactorial disease', 'gene-environment interaction', 'epigenetics', 'causal inference'],
      exampleQueries: [
        'What is the exact cause of my autoimmune disease?',
        'Tell me precisely why I developed this condition',
        'What\'s the definitive reason some people get cancer?',
        'Explain exactly why this person has depression'
      ],
      rationale: 'Most diseases involve complex interactions between genetic predispositions, environmental exposures, behaviors, and chance events at molecular and cellular levels. Complete causal models specifying exactly why particular individuals develop particular conditions exceed current medical knowledge.',
      handlingApproaches: [
        {
          description: 'Explain multifactorial nature with known risk factors',
          applicability: 'When discussing disease etiology with appropriate uncertainty',
          exampleResponse: 'I can\'t provide the exact, complete cause of why you specifically developed an autoimmune disease, as these conditions result from complex interactions between multiple factors that cannot be fully tracked in individuals. What I can explain are the major contributing factors identified by research: genetic predispositions (autoimmune conditions often run in families); environmental triggers like infections, stress, or toxin exposures; immune system dysregulation mechanisms; and sometimes random cellular events. Some of these factors are better understood than others. What we do know is that autoimmunity involves the immune system mistakenly attacking the body\'s own tissues, but the precise sequence that triggered this in your individual case cannot be definitively determined with current medical knowledge.'
        }
      ],
      flexibility: 0.5
    }
  ]
};

/**
 * Main class for detecting epistemic boundaries
 */
export class EpistemicBoundaryDetector {
  /** Boundary registry storing all available boundaries */
  private boundaryRegistry: Map<string, EpistemicBoundary>;
  
  /** Domain-specific boundary index */
  private domainIndex: Map<string, string[]>;
  
  /** Configuration for the detector */
  private config: BoundaryDetectorConfig;
  
  /** Uncertainty quantification utility */
  private uncertaintyQuantification: UncertaintyQuantification;
  
  /**
   * Initialize the epistemic boundary detector
   * 
   * @param config Configuration settings
   * @param uncertaintyQuantification Uncertainty quantification utility
   */
  constructor(
    config: Partial<BoundaryDetectorConfig>,
    uncertaintyQuantification?: UncertaintyQuantification
  ) {
    // Set default configuration values
    this.config = {
      includeDomains: config.includeDomains || ['general'],
      customBoundaries: config.customBoundaries || [],
      detectionThreshold: config.detectionThreshold || 0.7,
      defaultStrategy: config.defaultStrategy || 'acknowledge',
      useStochasticDetection: config.useStochasticDetection !== undefined ? 
                             config.useStochasticDetection : true,
      includeExplanation: config.includeExplanation !== undefined ?
                         config.includeExplanation : true
    };
    
    // Set uncertainty quantification
    this.uncertaintyQuantification = uncertaintyQuantification || new UncertaintyQuantification();
    
    // Initialize boundary registry
    this.boundaryRegistry = new Map<string, EpistemicBoundary>();
    
    // Initialize domain index
    this.domainIndex = new Map<string, string[]>();
    
    // Register core epistemic boundaries
    this.registerBoundaries(CORE_EPISTEMIC_BOUNDARIES);
    
    // Register domain-specific boundaries
    for (const domain of this.config.includeDomains) {
      if (domain in DOMAIN_EPISTEMIC_BOUNDARIES) {
        this.registerBoundaries(DOMAIN_EPISTEMIC_BOUNDARIES[domain]);
      }
    }
    
    // Register custom boundaries
    if (this.config.customBoundaries && this.config.customBoundaries.length > 0) {
      this.registerBoundaries(this.config.customBoundaries);
    }
  }
  
  /**
   * Register epistemic boundaries with the detector
   * 
   * @param boundaries Boundaries to register
   */
  public registerBoundaries(boundaries: EpistemicBoundary[]): void {
    for (const boundary of boundaries) {
      // Add to registry
      this.boundaryRegistry.set(boundary.id, boundary);
      
      // Add to domain index
      for (const domain of boundary.domains) {
        if (!this.domainIndex.has(domain)) {
          this.domainIndex.set(domain, []);
        }
        
        const domainBoundaries = this.domainIndex.get(domain)!;
        if (!domainBoundaries.includes(boundary.id)) {
          domainBoundaries.push(boundary.id);
        }
      }
    }
  }
  
  /**
   * Check if a query crosses epistemic boundaries
   * 
   * @param query Query text to check
   * @param domain Domain context of the query
   * @param options Additional options for the check
   * @returns Results of the boundary check
   */
  public checkBoundaries(
    query: string,
    domain: string = 'general',
    options: {
      includeExplanation?: boolean;
      checkAllBoundaries?: boolean;
      confidenceThreshold?: number;
    } = {}
  ): BoundaryCheckResult {
    // Determine relevant boundaries to check
    const relevantBoundaryIds = this.getRelevantBoundaryIds(domain, options.checkAllBoundaries);
    const relevantBoundaries = relevantBoundaryIds.map(id => this.boundaryRegistry.get(id)!);
    
    // Check each boundary
    const boundaryResults = relevantBoundaries.map(boundary => {
      const result = this.checkSingleBoundary(query, boundary);
      return {
        boundary,
        crossed: result.crossed,
        confidence: result.confidence,
        explanation: result.explanation
      };
    });
    
    // Filter to crossed boundaries with sufficient confidence
    const confidenceThreshold = options.confidenceThreshold || this.config.detectionThreshold;
    const crossedBoundaries = boundaryResults
      .filter(result => result.crossed && result.confidence >= confidenceThreshold)
      .map(result => result.boundary);
    
    // Determine if any boundaries are crossed
    const boundariesCrossed = crossedBoundaries.length > 0;
    
    // Generate overall confidence
    const confidence = boundariesCrossed ?
      Math.max(...boundaryResults
        .filter(r => r.crossed && r.confidence >= confidenceThreshold)
        .map(r => r.confidence)) :
      0;
    
    // Generate explanation if requested
    const includeExplanation = options.includeExplanation !== undefined ?
                             options.includeExplanation :
                             this.config.includeExplanation;
    
    let explanation = '';
    if (includeExplanation && boundariesCrossed) {
      explanation = this.generateBoundaryExplanation(crossedBoundaries, query);
    }
    
    // Determine recommended approach
    const recommendedApproach = boundariesCrossed ?
      this.determineRecommendedApproach(crossedBoundaries, query) :
      undefined;
    
    // Determine whether to abstain
    const shouldAbstain = boundariesCrossed && 
                         crossedBoundaries.some(b => b.flexibility < 0.3) &&
                         confidence > 0.8;
    
    return {
      boundariesCrossed,
      crossedBoundaries,
      confidence,
      explanation,
      recommendedApproach,
      shouldAbstain
    };
  }
  
  /**
   * Get relevant boundary IDs for a domain
   * 
   * @param domain Domain to get boundaries for
   * @param checkAllBoundaries Whether to check all boundaries
   * @returns Array of boundary IDs
   */
  private getRelevantBoundaryIds(domain: string, checkAllBoundaries: boolean = false): string[] {
    if (checkAllBoundaries) {
      return Array.from(this.boundaryRegistry.keys());
    }
    
    const relevantDomains = ['general'];
    if (domain !== 'general') {
      relevantDomains.push(domain);
    }
    
    const boundaryIds: string[] = [];
    for (const d of relevantDomains) {
      const ids = this.domainIndex.get(d);
      if (ids) {
        boundaryIds.push(...ids);
      }
    }
    
    // Remove duplicates
    return [...new Set(boundaryIds)];
  }
  
  /**
   * Check if a query crosses a specific epistemic boundary
   * 
   * @param query Query text to check
   * @param boundary Boundary to check against
   * @returns Result of the check
   */
  private checkSingleBoundary(
    query: string,
    boundary: EpistemicBoundary
  ): {
    crossed: boolean;
    confidence: number;
    explanation: string;
  } {
    // Check pattern matches
    const patternMatches = boundary.recognitionPatterns.some(pattern => 
      pattern.test(query)
    );
    
    // Check keyword matches
    const keywordMatches = boundary.keywords.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    );
    
    // Combine evidence for boundary crossing
    let confidence = 0;
    let crossed = false;
    
    if (patternMatches) {
      confidence = 0.8;
      crossed = true;
    } else if (keywordMatches) {
      // Check for more context around keywords
      const keywordInContext = this.evaluateKeywordContext(query, boundary);
      confidence = keywordInContext.confidence;
      crossed = keywordInContext.indicatesBoundary;
    }
    
    // Apply stochastic factor if enabled
    if (this.config.useStochasticDetection) {
      // Add small random variation to confidence
      const variationRange = 0.1; // +/- 10%
      const stochasticFactor = 1 + (Math.random() * variationRange * 2 - variationRange);
      confidence = Math.min(1, Math.max(0, confidence * stochasticFactor));
    }
    
    // Generate explanation
    let explanation = '';
    if (crossed && confidence >= this.config.detectionThreshold) {
      explanation = `Query appears to cross the "${boundary.name}" epistemic boundary because it ${
        patternMatches ? 
        'matches recognition patterns for this boundary' : 
        'contains keywords associated with this boundary in a context that suggests crossing the boundary'
      }.`;
    }
    
    return {
      crossed,
      confidence,
      explanation
    };
  }
  
  /**
   * Evaluate the context around keywords for more nuanced boundary detection
   * 
   * @param query Query text to evaluate
   * @param boundary Boundary to check against
   * @returns Assessment of whether the context indicates boundary crossing
   */
  private evaluateKeywordContext(
    query: string,
    boundary: EpistemicBoundary
  ): {
    indicatesBoundary: boolean;
    confidence: number;
  } {
    // Default result
    const result = {
      indicatesBoundary: false,
      confidence: 0
    };
    
    // Extract matching keywords
    const matchingKeywords = boundary.keywords.filter(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (matchingKeywords.length === 0) {
      return result;
    }
    
    // Check for modifiers that indicate boundary crossing
    const boundaryModifiers = [
      'exactly', 'precisely', 'definitely', 'certainly', 'absolutely',
      'completely', 'perfectly', 'truly', 'real', 'actual', 'ultimate',
      'fundamental', 'final', 'perfect', 'objectively', 'universal'
    ];
    
    let modifierCount = 0;
    for (const modifier of boundaryModifiers) {
      if (query.toLowerCase().includes(modifier.toLowerCase())) {
        modifierCount++;
      }
    }
    
    // Check for question patterns
    const isQuestion = /\?$/.test(query) || /^(what|why|how|when|where|who|is|are|can|could|will|would)/i.test(query);
    
    // Check for hedge words that reduce boundary crossing likelihood
    const hedgeWords = [
      'perhaps', 'maybe', 'possibly', 'likely', 'unlikely', 'might',
      'could', 'may', 'probable', 'improbable', 'suggest', 'indicate',
      'hypothesis', 'theory', 'model', 'perspective', 'view', 'opinion'
    ];
    
    let hedgeCount = 0;
    for (const hedge of hedgeWords) {
      if (query.toLowerCase().includes(hedge.toLowerCase())) {
        hedgeCount++;
      }
    }
    
    // Calculate confidence based on these factors
    let confidence = 0.3; // Base confidence for keyword match
    
    // Adjust for modifiers
    confidence += 0.1 * Math.min(3, modifierCount);
    
    // Adjust for hedges
    confidence -= 0.1 * Math.min(3, hedgeCount);
    
    // Adjust for question pattern
    if (isQuestion) {
      confidence += 0.1;
    }
    
    // Adjust for multiple keyword matches
    confidence += 0.05 * Math.min(3, matchingKeywords.length - 1);
    
    // Determine if boundary is crossed
    const indicatesBoundary = confidence >= 0.5;
    
    return {
      indicatesBoundary,
      confidence
    };
  }
  
  /**
   * Generate explanation for boundary crossing
   * 
   * @param boundaries Boundaries that were crossed
   * @param query Original query text
   * @returns Explanation of boundary crossing
   */
  private generateBoundaryExplanation(
    boundaries: EpistemicBoundary[],
    query: string
  ): string {
    if (boundaries.length === 0) {
      return '';
    }
    
    if (boundaries.length === 1) {
      const boundary = boundaries[0];
      return `The query "${query}" appears to cross the epistemic boundary "${boundary.name}". ${boundary.description}. ${boundary.rationale}`;
    }
    
    // For multiple boundaries, create a composite explanation
    const boundaryNames = boundaries.map(b => `"${b.name}"`).join(', ');
    
    return `The query "${query}" appears to cross multiple epistemic boundaries: ${boundaryNames}. These boundaries represent limits to what can be known with certainty based on theoretical constraints, empirical limitations, or the nature of the subject matter.`;
  }
  
  /**
   * Determine recommended approach for handling boundary-crossing queries
   * 
   * @param boundaries Boundaries that were crossed
   * @param query Original query text
   * @returns Recommended approach for handling the query
   */
  private determineRecommendedApproach(
    boundaries: EpistemicBoundary[],
    query: string
  ): BoundaryCheckResult['recommendedApproach'] {
    if (boundaries.length === 0) {
      return undefined;
    }
    
    // For simplicity, use the approach from the first boundary with the highest confidence
    // A more sophisticated version might blend approaches or select based on context
    
    // Sort boundaries by flexibility (ascending) to prioritize less flexible boundaries
    const sortedBoundaries = [...boundaries].sort((a, b) => a.flexibility - b.flexibility);
    const primaryBoundary = sortedBoundaries[0];
    
    // Select an approach from the boundary
    const approaches = primaryBoundary.handlingApproaches;
    if (approaches.length === 0) {
      // No specific approaches, use default
      return {
        description: `Default approach for handling "${primaryBoundary.name}" boundary crossing`,
        strategy: this.config.defaultStrategy,
        responseTemplate: `I notice your question involves ${primaryBoundary.name}, which represents a limit to what can be known with certainty. ${primaryBoundary.rationale} While I can't provide a definitive answer, I can discuss what is known and unknown about this topic.`
      };
    }
    
    // For now, just select the first approach
    // A more sophisticated version would select based on applicability
    const selectedApproach = approaches[0];
    
    let strategy: 'acknowledge' | 'reframe' | 'partial_response' | 'abstain' | 'meta_discussion';
    
    // Determine strategy based on approach description
    if (selectedApproach.description.includes('reframe')) {
      strategy = 'reframe';
    } else if (selectedApproach.description.includes('meta-discussion') || 
               selectedApproach.description.includes('epistemic boundary')) {
      strategy = 'meta_discussion';
    } else if (selectedApproach.description.includes('abstain') ||
               selectedApproach.description.includes('decline')) {
      strategy = 'abstain';
    } else if (selectedApproach.description.includes('partial') ||
               selectedApproach.description.includes('limited')) {
      strategy = 'partial_response';
    } else {
      strategy = 'acknowledge';
    }
    
    return {
      description: selectedApproach.description,
      strategy,
      responseTemplate: selectedApproach.exampleResponse
    };
  }
}

/**
 * Utility class for handling the epistemic challenge of induction
 */
export class InductionProblemHandler {
  /**
   * Evaluate the inductive strength of a generalization
   * 
   * @param observationCount Number of supporting observations
   * @param diversity Diversity of observations (0-1)
   * @param counterexampleCount Number of counterexamples
   * @param domainComplexity Complexity of the domain (0-1)
   * @returns Inductive strength assessment
   */
  public evaluateInductiveStrength(
    observationCount: number,
    diversity: number,
    counterexampleCount: number,
    domainComplexity: number
  ): {
    strength: number;
    confidence: number;
    limitations: string[];
  } {
    // Calculate base strength from observation count and diversity
    const observationStrength = this.calculateObservationStrength(observationCount, diversity);
    
    // Adjust for counterexamples
    const counterexampleFactor = this.calculateCounterexampleFactor(counterexampleCount, observationCount);
    
    // Adjust for domain complexity
    const complexityFactor = this.calculateComplexityFactor(domainComplexity);
    
    // Calculate overall inductive strength
    const strength = observationStrength * counterexampleFactor * complexityFactor;
    
    // Calculate confidence in the assessment
    const confidence = 0.8 - (0.3 * domainComplexity);
    
    // Generate limitation explanations
    const limitations = this.generateInductiveLimitations(
      observationCount,
      diversity,
      counterexampleCount,
      domainComplexity
    );
    
    return {
      strength,
      confidence,
      limitations
    };
  }
  
  /**
   * Calculate strength contribution from observations
   */
  private calculateObservationStrength(count: number, diversity: number): number {
    // Logarithmic scale for diminishing returns on more observations
    const countFactor = Math.log(count + 1) / Math.log(1000);
    
    // Diversity multiplier (1-2x impact)
    const diversityMultiplier = 1 + diversity;
    
    return Math.min(0.9, countFactor * diversityMultiplier);
  }
  
  /**
   * Calculate impact of counterexamples
   */
  private calculateCounterexampleFactor(counterCount: number, observationCount: number): number {
    if (counterCount === 0) {
      return 1.0;
    }
    
    // Counterexamples have proportionally higher impact as their ratio increases
    const ratio = counterCount / (observationCount + counterCount);
    return Math.max(0.1, 1 - (ratio * 2));
  }
  
  /**
   * Calculate impact of domain complexity
   */
  private calculateComplexityFactor(complexity: number): number {
    // Higher complexity reduces maximum achievable strength
    return 1 - (complexity * 0.5);
  }
  
  /**
   * Generate explanations of inductive limitations
   */
  private generateInductiveLimitations(
    observationCount: number,
    diversity: number,
    counterexampleCount: number,
    domainComplexity: number
  ): string[] {
    const limitations: string[] = [];
    
    // Add observation-related limitations
    if (observationCount < 10) {
      limitations.push("Limited number of observations restricts the strength of generalization");
    }
    
    if (diversity < 0.3) {
      limitations.push("Low diversity of observations may limit generalizability to other contexts");
    }
    
    // Add counterexample limitations
    if (counterexampleCount > 0) {
      limitations.push(`Presence of ${counterexampleCount} counterexamples indicates exceptions to the generalization`);
    }
    
    // Add complexity limitations
    if (domainComplexity > 0.7) {
      limitations.push("High domain complexity makes reliable induction especially challenging");
    }
    
    // Add fundamental limitation of induction
    limitations.push("All inductive generalizations face the philosophical problem of induction: past patterns may not continue in the future");
    
    return limitations;
  }
}

/**
 * Utility class for handling the problem of other minds
 */
export class OtherMindsHandler {
  /**
   * Evaluate confidence in inferences about others' mental states
   * 
   * @param behavioralEvidence Strength of behavioral evidence (0-1)
   * @param contextualKnowledge Extent of contextual knowledge (0-1)
   * @param similarity Similarity to reference experiences (0-1)
   * @param consistency Internal consistency of inferences (0-1)
   * @returns Assessment of inference quality
   */
  public evaluateMentalStateInference(
    behavioralEvidence: number,
    contextualKnowledge: number,
    similarity: number,
    consistency: number
  ): {
    confidence: number;
    reliability: number;
    limitations: string[];
  } {
    // Calculate confidence based on various factors
    const evidenceWeight = 0.4;
    const contextWeight = 0.25;
    const similarityWeight = 0.2;
    const consistencyWeight = 0.15;
    
    const confidence = (
      behavioralEvidence * evidenceWeight +
      contextualKnowledge * contextWeight +
      similarity * similarityWeight +
      consistency * consistencyWeight
    );
    
    // Calculate reliability (how stable the inference is likely to be)
    const reliability = confidence * (0.7 + 0.3 * consistency);
    
    // Generate limitations
    const limitations = this.generateMentalStateLimitations(
      behavioralEvidence,
      contextualKnowledge,
      similarity,
      consistency
    );
    
    return {
      confidence,
      reliability,
      limitations
    };
  }
  
  /**
   * Generate explanations of limitations in mental state inferences
   */
  private generateMentalStateLimitations(
    behavioralEvidence: number,
    contextualKnowledge: number,
    similarity: number,
    consistency: number
  ): string[] {
    const limitations: string[] = [];
    
    // Add evidence-related limitations
    if (behavioralEvidence < 0.4) {
      limitations.push("Limited behavioral evidence creates significant uncertainty in mental state inferences");
    }
    
    // Add context-related limitations
    if (contextualKnowledge < 0.4) {
      limitations.push("Limited contextual knowledge makes interpretation of behavior and language more ambiguous");
    }
    
    // Add similarity-related limitations
    if (similarity < 0.3) {
      limitations.push("Low similarity to familiar experiences makes interpretation through analogy less reliable");
    }
    
    // Add consistency-related limitations
    if (consistency < 0.5) {
      limitations.push("Inconsistencies in available information create uncertainty about the correct interpretation");
    }
    
    // Add fundamental limitation
    limitations.push("All mental state inferences face the philosophical 'problem of other minds': we cannot directly access another's subjective experience");
    
    return limitations;
  }
}

/**
 * Utility class for handling value pluralism
 */
export class ValuePluralismHandler {
  /**
   * Evaluate the extent of value dependence in a claim
   * 
   * @param claim Claim to evaluate
   * @param domainValues Relevant values in the domain
   * @returns Assessment of value dependence
   */
  public evaluateValueDependence(
    claim: string,
    domainValues: {value: string; keywords: string[]}[]
  ): {
    valueDependence: number;
    implicatedValues: string[];
    valueConflicts: {value1: string; value2: string}[];
    limitations: string[];
  } {
    // Identify values implicated in the claim
    const implicatedValues = this.identifyImplicatedValues(claim, domainValues);
    
    // Calculate overall value dependence
    const valueDependence = implicatedValues.length > 0 ? 0.3 + (0.1 * Math.min(7, implicatedValues.length)) : 0.1;
    
    // Identify potential value conflicts
    const valueConflicts = this.identifyValueConflicts(implicatedValues);
    
    // Generate limitations
    const limitations = this.generateValueLimitations(implicatedValues, valueConflicts);
    
    return {
      valueDependence,
      implicatedValues,
      valueConflicts,
      limitations
    };
  }
  
  /**
   * Identify values implicated in a claim
   */
  private identifyImplicatedValues(
    claim: string,
    domainValues: {value: string; keywords: string[]}[]
  ): string[] {
    const implicatedValues: string[] = [];
    const lowerClaim = claim.toLowerCase();
    
    for (const {value, keywords} of domainValues) {
      for (const keyword of keywords) {
        if (lowerClaim.includes(keyword.toLowerCase())) {
          implicatedValues.push(value);
          break;
        }
      }
    }
    
    return [...new Set(implicatedValues)]; // Remove duplicates
  }
  
  /**
   * Identify potential conflicts between values
   */
  private identifyValueConflicts(implicatedValues: string[]): {value1: string; value2: string}[] {
    const valueConflicts: {value1: string; value2: string}[] = [];
    
    // Common value tensions
    const knownTensions: {[key: string]: string[]} = {
      'liberty': ['security', 'equality', 'community'],
      'equality': ['liberty', 'merit', 'efficiency'],
      'justice': ['mercy', 'efficiency', 'tradition'],
      'care': ['autonomy', 'fairness'],
      'efficiency': ['equity', 'democracy', 'care'],
      'tradition': ['progress', 'autonomy', 'innovation']
    };
    
    // Check for known tensions among implicated values
    for (let i = 0; i < implicatedValues.length; i++) {
      const value1 = implicatedValues[i];
      
      if (value1 in knownTensions) {
        const tensions = knownTensions[value1];
        
        for (let j = i + 1; j < implicatedValues.length; j++) {
          const value2 = implicatedValues[j];
          
          if (tensions.includes(value2)) {
            valueConflicts.push({value1, value2});
          }
        }
      }
    }
    
    return valueConflicts;
  }
  
  /**
   * Generate explanations of value-related limitations
   */
  private generateValueLimitations(
    implicatedValues: string[],
    valueConflicts: {value1: string; value2: string}[]
  ): string[] {
    const limitations: string[] = [];
    
    // Add value-presence limitations
    if (implicatedValues.length > 0) {
      limitations.push(`Claim implicates values (${implicatedValues.join(', ')}) that cannot be objectively verified or derived from facts alone`);
    }
    
    // Add value-conflict limitations
    if (valueConflicts.length > 0) {
      const conflictTexts = valueConflicts.map(c => `${c.value1} vs. ${c.value2}`);
      limitations.push(`Potential value tensions exist between ${conflictTexts.join(', ')}, which may require normative trade-offs`);
    }
    
    // Add fundamental limitation
    limitations.push("Normative judgments necessarily involve values that cannot be derived solely from descriptive facts (the is-ought problem)");
    
    return limitations;
  }
}

/**
 * Function to detect epistemic boundaries in content
 * 
 * @param content Content to check for epistemic boundaries
 * @param domain Domain context for the content
 * @param options Additional options for boundary checking
 * @returns Results of the boundary check
 */
export function detectEpistemicBoundaries(
  content: string,
  domain: string = 'general',
  options: {
    confidenceThreshold?: number;
    includeExplanation?: boolean;
    checkAllBoundaries?: boolean;
  } = {}
): BoundaryCheckResult {
  // Create a default detector
  const detector = new EpistemicBoundaryDetector({
    includeDomains: [domain, 'general'],
    detectionThreshold: options.confidenceThreshold || 0.7,
    includeExplanation: options.includeExplanation !== undefined ? 
                       options.includeExplanation : true
  });
  
  // Perform the check
  return detector.checkBoundaries(content, domain, options);
}

/**
 * Generate response for a boundary-crossing query
 * 
 * @param query Original query
 * @param boundaryResult Result from boundary check
 * @param options Additional options for response generation
 * @returns Generated response to the boundary-crossing query
 */
export function generateBoundaryResponse(
  query: string,
  boundaryResult: BoundaryCheckResult,
  options: {
    strategy?: 'acknowledge' | 'reframe' | 'partial_response' | 'abstain' | 'meta_discussion';
    alternativeQuery?: string;
    includeRationale?: boolean;
  } = {}
): string {
  if (!boundaryResult.boundariesCrossed) {
    return "No epistemic boundaries were detected in this query.";
  }
  
  // Determine strategy to use
  const strategy = options.strategy ||
                  (boundaryResult.recommendedApproach?.strategy || 'acknowledge');
  
  // Get the most restrictive boundary (lowest flexibility)
  const sortedBoundaries = [...boundaryResult.crossedBoundaries].sort((a, b) => 
    a.flexibility - b.flexibility
  );
  const primaryBoundary = sortedBoundaries[0];
  
  // Generate response based on strategy
  switch (strategy) {
    case 'abstain':
      return generateAbstainResponse(primaryBoundary, boundaryResult.explanation);
      
    case 'acknowledge':
      return generateAcknowledgeResponse(primaryBoundary, query, boundaryResult.explanation, options.includeRationale);
      
    case 'reframe':
      return generateReframeResponse(primaryBoundary, query, options.alternativeQuery, boundaryResult.explanation);
      
    case 'partial_response':
      return generatePartialResponse(primaryBoundary, query, boundaryResult.explanation);
      
    case 'meta_discussion':
      return generateMetaDiscussionResponse(primaryBoundary, query, boundaryResult.explanation);
      
    default:
      return generateAcknowledgeResponse(primaryBoundary, query, boundaryResult.explanation, options.includeRationale);
  }
}

/**
 * Generate abstain response - declining to answer
 */
function generateAbstainResponse(
  boundary: EpistemicBoundary,
  explanation: string
): string {
  let response = `I cannot provide a definitive answer to this question, as it crosses an epistemic boundary regarding ${boundary.name}. `;
  
  response += `${boundary.rationale} `;
  
  response += `Instead, I'd be happy to discuss what is known and uncertain in this area, or help you explore a related question.`;
  
  return response;
}

/**
 * Generate acknowledge response - acknowledging limitations while responding
 */
function generateAcknowledgeResponse(
  boundary: EpistemicBoundary,
  query: string,
  explanation: string,
  includeRationale: boolean = true
): string {
  let response = `While I can provide some perspective on this question, it's important to acknowledge that it involves ${boundary.name}, which represents a limitation to what can be known with certainty. `;
  
  if (includeRationale) {
    response += `${boundary.rationale} `;
  }
  
  response += `With that limitation in mind, here's what I can offer: `;
  
  // Add placeholder for actual content - this would be filled in by the main system
  response += `[Content addressing the query while respecting the acknowledged limitations]`;
  
  return response;
}

/**
 * Generate reframe response - offering a reframed version of the query
 */
function generateReframeResponse(
  boundary: EpistemicBoundary,
  originalQuery: string,
  alternativeQuery?: string,
  explanation?: string
): string {
  let response = `Your question involves ${boundary.name}, which represents a boundary of what can be known with certainty. `;
  
  response += `Rather than attempting to answer the original question directly, I can address a related question that stays within epistemic boundaries: `;
  
  if (alternativeQuery) {
    response += `"${alternativeQuery}" `;
  } else {
    // Generate a reasonable alternative based on boundary type
    switch (boundary.type) {
      case EpistemicBoundaryType.FUTURE_CONTINGENCY:
        response += `"What factors might influence this outcome, and what are current trends or probabilities?" `;
        break;
        
      case EpistemicBoundaryType.PRIVATE_MENTAL_STATE:
        response += `"What behavioral patterns or contextual factors might help understand this situation?" `;
        break;
        
      case EpistemicBoundaryType.METAPHYSICAL_QUESTION:
        response += `"What are the main philosophical or scientific perspectives on this question?" `;
        break;
        
      case EpistemicBoundaryType.NORMATIVE_CLAIM:
        response += `"What values and ethical frameworks are relevant to this question?" `;
        break;
        
      default:
        response += `"What is currently known and uncertain about this topic?" `;
    }
  }
  
  response += `Would you like me to address this reframed question instead?`;
  
  return response;
}

/**
 * Generate partial response - offering what can be known while acknowledging gaps
 */
function generatePartialResponse(
  boundary: EpistemicBoundary,
  query: string,
  explanation?: string
): string {
  let response = `Your question involves ${boundary.name}, which means a complete or definitive answer isn't possible. `;
  
  response += `However, I can provide partial information about what is known and unknown in this area: `;
  
  // Add placeholder for actual content - this would be filled in by the main system
  response += `[Content providing partial information while clearly marking uncertainties and knowledge boundaries]`;
  
  return response;
}

/**
 * Generate meta-discussion response - discussing the boundary itself
 */
function generateMetaDiscussionResponse(
  boundary: EpistemicBoundary,
  query: string,
  explanation?: string
): string {
  let response = `Your question touches on an interesting epistemic boundary: ${boundary.name}. `;
  
  response += `${boundary.description} ${boundary.rationale} `;
  
  response += `This boundary is significant because it helps us understand the limits of what can be definitively known versus what requires different approaches like probability, multiple perspectives, or acknowledgment of inherent uncertainty. `;
  
  response += `Would you like to explore a different approach to your question that works within these epistemic constraints?`;
  
  return response;
}

export default {
  EpistemicBoundaryDetector,
  InductionProblemHandler,
  OtherMindsHandler,
  ValuePluralismHandler,
  detectEpistemicBoundaries,
  generateBoundaryResponse,
  EpistemicBoundaryType,
  CORE_EPISTEMIC_BOUNDARIES,
  DOMAIN_EPISTEMIC_BOUNDARIES
};
/**
 * Epistemic Boundary Utilities for the Critique of Artificial Reason (CAR)
 * 
 * This module provides utilities for detecting and managing epistemic boundaries,
 * implementing Kant's distinctions between phenomena (what can be known through experience)
 * and noumena (things-in-themselves that lie beyond the boundaries of possible experience).
 * 
 * The utilities help CAR systems recognize when queries or tasks extend beyond
 * epistemically accessible domains, ensuring appropriate humility about the limits
 * of knowledge while still providing useful responses within those limitations.
 */

import { DomainKnowledge, ConceptRelation } from '../core/schematism';
import { UncertaintyQuantification, UncertaintyDistribution, ConfidenceInterval } from './uncertainty-quantification';

/**
 * Types of epistemic boundaries
 */
export enum EpistemicBoundaryType {
  /** Inherent limitations of available knowledge */
  KNOWLEDGE_LIMITATION = 'knowledge_limitation',
  
  /** Limitations due to system's expertise or training */
  EXPERTISE_LIMITATION = 'expertise_limitation',
  
  /** Limitations due to conceptual incoherence in the query */
  CONCEPTUAL_INCOHERENCE = 'conceptual_incoherence',
  
  /** Limitations due to indeterminacy or randomness */
  INDETERMINACY = 'indeterminacy',
  
  /** Limitations due to value judgments beyond empirical facts */
  VALUE_JUDGMENT = 'value_judgment',
  
  /** Limitations due to self-reference or paradox */
  SELF_REFERENCE = 'self_reference',
  
  /** Limitations due to counterfactual reasoning about complex systems */
  COUNTERFACTUAL_COMPLEXITY = 'counterfactual_complexity',
  
  /** Limitations due to future contingencies */
  FUTURE_CONTINGENCY = 'future_contingency',
  
  /** Limitations regarding internal mental states of others */
  PRIVATE_MENTAL_STATE = 'private_mental_state',
  
  /** Limitations regarding normative claims */
  NORMATIVE_CLAIM = 'normative_claim',
  
  /** Limitations regarding metaphysical questions */
  METAPHYSICAL_QUESTION = 'metaphysical_question'
}

/**
 * Definition of an epistemic boundary
 */
export interface EpistemicBoundary {
  /** Unique identifier for the boundary */
  id: string;
  
  /** Human-readable name of the boundary */
  name: string;
  
  /** Detailed description of the boundary */
  description: string;
  
  /** Type of epistemic boundary */
  type: EpistemicBoundaryType;
  
  /** Domains where this boundary applies */
  domains: string[];
  
  /** Recognition patterns for this boundary */
  recognitionPatterns: RegExp[];
  
  /** Keywords associated with this boundary */
  keywords: string[];
  
  /** Concepts related to this boundary */
  relatedConcepts: string[];
  
  /** Examples of queries that cross this boundary */
  exampleQueries: string[];
  
  /** Explanation of why this boundary exists */
  rationale: string;
  
  /** Approaches to handling queries that cross this boundary */
  handlingApproaches: {
    /** Approach description */
    description: string;
    
    /** When to use this approach */
    applicability: string;
    
    /** Example response using this approach */
    exampleResponse: string;
  }[];
  
  /** Degree to which the boundary is flexible (0-1) */
  flexibility: number;
}

/**
 * Result of an epistemic boundary check
 */
export interface BoundaryCheckResult {
  /** Whether the query crosses epistemic boundaries */
  boundariesCrossed: boolean;
  
  /** Boundaries that were crossed */
  crossedBoundaries: EpistemicBoundary[];
  
  /** Confidence in the boundary detection (0-1) */
  confidence: number;
  
  /** Explanation of why boundaries were detected */
  explanation: string;
  
  /** Recommended approach for handling the query */
  recommendedApproach?: {
    /** Approach description */
    description: string;
    
    /** Strategy type */
    strategy: 'acknowledge' | 'reframe' | 'partial_response' | 'abstain' | 'meta_discussion';
    
    /** Response template */
    responseTemplate: string;
  };
  
  /** Whether to abstain from responding to the query */
  shouldAbstain: boolean;
}

/**
 * Configuration for the epistemic boundary detector
 */
export interface BoundaryDetectorConfig {
  /** Domains to include boundaries from */
  includeDomains: string[];
  
  /** Additional custom boundaries */
  customBoundaries?: EpistemicBoundary[];
  
  /** Threshold for boundary detection confidence */
  detectionThreshold: number;
  
  /** Default handling strategy for crossed boundaries */
  defaultStrategy: 'acknowledge' | 'reframe' | 'partial_response' | 'abstain' | 'meta_discussion';
  
  /** Whether to use stochastic detection */
  useStochasticDetection: boolean;
  
  /** Whether to include explanation in results */
  includeExplanation: boolean;
}

/**
 * Core epistemic boundaries based on Kantian transcendental idealism
 */
export const CORE_EPISTEMIC_BOUNDARIES: EpistemicBoundary[] = [
  {
    id: 'noumenal_reality',
    name: 'Things-in-Themselves (Noumena)',
    description: 'The boundary between phenomena (appearances that can be experienced) and noumena (things-in-themselves that transcend possible experience)',
    type: EpistemicBoundaryType.METAPHYSICAL_QUESTION,
    domains: ['metaphysics', 'epistemology', 'general'],
    recognitionPatterns: [
      /what is reality really like/i,
      /true nature of reality/i,
      /things as they really are/i,
      /mind-independent reality/i,
      /behind all appearances/i
    ],
    keywords: ['noumena', 'thing-in-itself', 'ultimate reality', 'transcendent', 'beyond experience', 'intrinsic nature'],
    relatedConcepts: ['transcendental idealism', 'phenomena', 'appearances', 'metaphysics'],
    exampleQueries: [
      'What is reality like independent of human experience?',
      'Can you tell me the true nature of consciousness beyond all appearances?',
      'What is matter really like in itself, beyond our perceptions?'
    ],
    rationale: 'Kant argued that we can only know things as they appear to us through our cognitive faculties, not as they are in themselves. Our knowledge is limited to the phenomenal world structured by the a priori forms of intuition (space and time) and the categories of understanding.',
    handlingApproaches: [
      {
        description: 'Meta-discussion of the epistemic boundary itself',
        applicability: 'When users would benefit from understanding why the query crosses fundamental epistemic limits',
        exampleResponse: 'This question asks about reality as it exists independently of our experience, what Kant called "things-in-themselves" or "noumena." According to Kant\'s transcendental idealism, we can only know things as they appear to us (phenomena), not as they are in themselves. Our knowledge is necessarily structured by our cognitive faculties. I can discuss various philosophical perspectives on this boundary, but can\'t provide knowledge that transcends it.'
      },
      {
        description: 'Reframe as question about appearances or models',
        applicability: 'When the query can be productively reframed in terms of how things appear or are modeled',
        exampleResponse: 'While I can\'t describe matter as it exists "in itself" beyond all experience (what Kant called the noumenal realm), I can discuss how matter appears in our best scientific models and theories, which describe its observable properties and behaviors in great detail.'
      }
    ],
    flexibility: 0.2
  },
  {
    id: 'transcendent_metaphysics',
    name: 'Transcendent Metaphysical Claims',
    description: 'The boundary around metaphysical claims that go beyond all possible experience',
    type: EpistemicBoundaryType.METAPHYSICAL_QUESTION,
    domains: ['metaphysics', 'theology', 'cosmology', 'general'],
    recognitionPatterns: [
      /ultimate origin of the universe/i,
      /before the big bang/i,
      /purpose of existence/i,
      /god's perspective/i,
      /absolute knowledge/i
    ],
    keywords: ['transcendent', 'ultimate', 'absolute', 'unconditioned', 'first cause', 'final purpose'],
    relatedConcepts: ['antinomies of pure reason', 'transcendental dialectic', 'unconditioned', 'metaphysics'],
    exampleQueries: [
      'What existed before the beginning of time?',
      'What is the ultimate purpose of existence?',
      'Does God exist?',
      'Is the universe finite or infinite?'
    ],
    rationale: 'Kant\'s Critique of Pure Reason aimed to show that traditional metaphysics inevitably leads to irresolvable contradictions (antinomies) when it attempts to make claims about unconditioned totality or transcendent objects. Reason naturally seeks the unconditioned, but this leads beyond possible experience.',
    handlingApproaches: [
      {
        description: 'Discuss the antinomies',
        applicability: 'When the query relates to Kant\'s cosmic antinomies',
        exampleResponse: 'This question resembles what Kant called an "antinomy of pure reason" - a seemingly irresolvable contradiction that arises when we try to extend our thinking beyond all possible experience. For questions about the finitude or infinity of the universe, Kant showed that both positions can be logically defended and criticized, suggesting that we\'re approaching the limits of what reason can determine. I can explain various philosophical and scientific perspectives on this question, while acknowledging these fundamental limitations.'
      },
      {
        description: 'Reframe as question about models or theories',
        applicability: 'When the question can be reframed in terms of scientific models or philosophical theories',
        exampleResponse: 'While I can\'t provide definitive answers about what existed "before" the Big Bang (which may be conceptually problematic since time itself is part of the universe), I can discuss various scientific models and theories about the early universe, cosmic inflation, and different speculative approaches like quantum cosmology or string theory multiverse scenarios.'
      }
    ],
    flexibility: 0.3
  },
  {
    id: 'perfect_prediction',
    name: 'Perfect Prediction of Complex Systems',
    description: 'The boundary around perfect prediction of complex, chaotic, or indeterministic systems',
    type: EpistemicBoundaryType.INDETERMINACY,
    domains: ['science', 'forecasting', 'social systems', 'general'],
    recognitionPatterns: [
      /exactly predict/i,
      /perfect forecast/i,
      /precisely determine future/i,
      /complete certainty/i,
      /definitely will happen/i
    ],
    keywords: ['predict', 'forecast', 'certainty', 'deterministic', 'exact', 'precise'],
    relatedConcepts: ['chaos theory', 'complexity', 'emergence', 'uncertainty principle', 'free will'],
    exampleQueries: [
      'Can you perfectly predict the weather 6 months from now?',
      'Tell me exactly what will happen in the stock market next year',
      'Precisely determine the outcome of the next election',
      'Predict with certainty when the next earthquake will occur'
    ],
    rationale: 'Complex systems often exhibit sensitivity to initial conditions, emergent properties, and fundamental indeterminacy that make perfect prediction impossible even in principle. This includes quantum indeterminacy, chaotic dynamics, and complex social systems.',
    handlingApproaches: [
      {
        description: 'Explain prediction limitations',
        applicability: 'When users would benefit from understanding why perfect prediction is impossible',
        exampleResponse: 'I can\'t provide an exact prediction of the stock market next year because markets are complex adaptive systems influenced by countless variables, human decisions, and unexpected events. Even the most sophisticated models can only offer probabilistic forecasts with significant uncertainty. What I can do is discuss historical patterns, current trends, key factors to watch, and the range of scenarios that experts consider plausible.'
      },
      {
        description: 'Provide probabilistic assessment',
        applicability: 'When probabilistic forecasts are possible and valuable',
        exampleResponse: 'While I can\'t predict the exact weather 6 months from now (this exceeds the theoretical limits of weather prediction due to chaotic dynamics), I can provide information about seasonal patterns and climate trends for that period. For example, based on historical data for your region, typical temperatures in that month range from X to Y, with an average precipitation of Z.'
      }
    ],
    flexibility: 0.5
  },
  {
    id: 'private_mental_states',
    name: 'Private Mental States',
    description: 'The boundary around direct access to others\' subjective experiences and mental states',
    type: EpistemicBoundaryType.PRIVATE_MENTAL_STATE,
    domains: ['psychology', 'philosophy of mind', 'general'],
    recognitionPatterns: [
      /what is (?:he|she|they) thinking/i,
      /what (?:does|did) [A-Z][a-z]+ feel/i,
      /know for certain what .* intended/i,
      /true motivations? of/i,
      /really wants/i
    ],
    keywords: ['subjective', 'experience', 'qualia', 'intention', 'motivation', 'feeling', 'consciousness'],
    relatedConcepts: ['other minds', 'qualia', 'intentionality', 'phenomenal consciousness'],
    exampleQueries: [
      'What is my friend really thinking about me?',
      'Does my partner truly love me?',
      'What were Einstein\'s private feelings about quantum mechanics?',
      'Is my cat actually happy when it purrs?'
    ],
    rationale: 'Private mental states are directly accessible only to the individual experiencing them. We can make inferences based on behavior, reports, and context, but cannot directly access another\'s subjective experience.',
    handlingApproaches: [
      {
        description: 'Discuss behavioral and contextual evidence',
        applicability: 'When evidence about behavior or context can inform an inference',
        exampleResponse: 'I can\'t directly access your cat\'s subjective experience, but I can share what research tells us about purring and cat behavior. Cats typically purr during pleasant experiences like being petted or nursing, suggesting contentment. However, cats also sometimes purr when stressed or injured, possibly as a self-soothing mechanism. The context matters - if your cat purrs while kneading and relaxed, behavioral evidence suggests they\'re experiencing something akin to happiness.'
      },
      {
        description: 'Discuss the epistemic boundary itself',
        applicability: 'When the fundamental limitation would be useful for the user to understand',
        exampleResponse: 'I can\'t tell you with certainty what your friend is thinking about you, as I don\'t have direct access to their private thoughts and feelings. This reflects a fundamental epistemic boundary - we never have direct access to others\' subjective experiences. Even in close relationships, we make inferences based on what people say and do, but these are always interpretations. What I can do is help you consider different possibilities based on their behavior, or discuss ways to improve communication if you\'re concerned.'
      }
    ],
    flexibility: 0.4
  },
  {
    id: 'moral_truth',
    name: 'Objective Moral Truth',
    description: 'The boundary around claims of objective moral knowledge independent of normative frameworks',
    type: EpistemicBoundaryType.NORMATIVE_CLAIM,
    domains: ['ethics', 'metaethics', 'general'],
    recognitionPatterns: [
      /objectively (right|wrong|good|bad|moral|immoral)/i,
      /absolute moral truth/i,
      /truly evil/i,
      /universally wrong/i,
      /moral fact/i
    ],
    keywords: ['objective', 'absolute', 'moral fact', 'moral truth', 'moral realism', 'universal ethics'],
    relatedConcepts: ['moral realism', 'moral anti-realism', 'metaethics', 'moral epistemology'],
    exampleQueries: [
      'What is objectively right in this ethical dilemma?',
      'Is abortion objectively wrong?',
      'Tell me the absolute moral truth about capital punishment',
      'Which ethical theory is objectively correct?'
    ],
    rationale: 'Kant distinguished between theoretical reason (knowledge of what is) and practical reason (knowledge of what ought to be). While he believed in objective moral principles, these stem from practical reason and rational consistency, not empirical facts about the world. Claims of objective moral knowledge independent of any normative framework exceed what can be established through pure theoretical reason.',
    handlingApproaches: [
      {
        description: 'Compare different normative frameworks',
        applicability: 'When exploring multiple ethical perspectives would be helpful',
        exampleResponse: 'Rather than claiming access to objective moral truth about capital punishment, I can explain how different ethical frameworks approach this issue. From a consequentialist perspective, the key questions involve its effectiveness as a deterrent and the risk of executing innocent people. Deontological approaches might focus on whether it respects human dignity and the right to life. Virtue ethics might ask what practicing capital punishment does to our character as a society. These frameworks offer structured ways to reason about the issue, though they may lead to different conclusions.'
      },
      {
        description: 'Discuss Kantian approach to normativity',
        applicability: 'When Kantian ethics is particularly relevant',
        exampleResponse: 'While I can\'t access "objective moral truth" independent of any normative framework, I can discuss Kant\'s approach to ethics, which seeks universal moral principles through the test of the categorical imperative. Kant would ask whether the maxim of your action could be willed as a universal law, whether it treats humanity as an end rather than merely a means, and whether it could be a law in a "kingdom of ends." This provides a framework for moral reasoning without claiming empirical knowledge of moral facts.'
      }
    ],
    flexibility: 0.6
  },
  {
    id: 'complete_causal_model',
    name: 'Complete Causal Models of Complex Phenomena',
    description: 'The boundary around complete understanding of all causal factors in complex phenomena',
    type: EpistemicBoundaryType.KNOWLEDGE_LIMITATION,
    domains: ['science', 'economics', 'sociology', 'general'],
    recognitionPatterns: [
      /all factors that cause/i,
      /complete understanding of why/i,
      /exact cause of/i,
      /definitive explanation for/i,
      /precisely why/i
    ],
    keywords: ['causal', 'explanation', 'factor', 'determinant', 'root cause', 'complete understanding'],
    relatedConcepts: ['causal complexity', 'multicausality', 'emergence', 'systems theory'],
    exampleQueries: [
      'What is the exact cause of consciousness?',
      'List all factors that caused the 2008 financial crisis',
      'What is the complete explanation for rising housing costs?',
      'What precisely causes depression?'
    ],
    rationale: 'Complex phenomena typically involve multiple interacting causal factors across different levels of organization, with feedback loops, emergent properties, and context-sensitivity. This makes complete causal models epistemically inaccessible, although partial models remain valuable.',
    handlingApproaches: [
      {
        description: 'Provide multifactorial analysis',
        applicability: 'When a complex causal account is possible and valuable',
        exampleResponse: 'While I can\'t provide a complete account of all factors causing rising housing costs (as this involves countless interactions in complex economic and social systems), I can discuss major contributing factors identified by experts. These include: supply constraints from zoning and building regulations; increasing construction and land costs; demographic shifts toward urban areas; changing household sizes; financialization of housing markets; macroeconomic factors like interest rates; and regional economic growth patterns. These factors interact differently across locations, and their relative importance is debated among experts.'
      },
      {
        description: 'Discuss levels of explanation',
        applicability: 'When different levels of analysis are relevant',
        exampleResponse: 'I can\'t provide a complete causal model of depression, as it involves complex interactions across multiple levels - from molecular and neurobiological to psychological, social, and environmental factors. What I can offer is an overview of major contributing factors at different levels of analysis: biological factors include genetic predispositions, neurotransmitter function, and stress hormone regulation; psychological factors include cognitive patterns, emotional regulation, and personal history; social factors include isolation, relationship quality, and socioeconomic circumstances. Most cases involve interactions between these factors rather than a single "root cause."'
      }
    ],
    flexibility: 0.7
  },
  {
    id: 'historical_contingency',
    name: 'Complete Historical Counterfactuals',
    description: 'The boundary around definitive knowledge of how history would have unfolded under different conditions',
    type: EpistemicBoundaryType.COUNTERFACTUAL_COMPLEXITY,
    domains: ['history', 'politics', 'general'],
    recognitionPatterns: [
      /what would have happened if/i,
      /how would history be different/i,
      /alternate timeline where/i,
      /had .* not occurred/i,
      /counterfactual scenario/i
    ],
    keywords: ['counterfactual', 'alternate history', 'what if', 'historical contingency', 'butterfly effect'],
    relatedConcepts: ['historical determinism', 'chaos theory', 'path dependence', 'contingency'],
    exampleQueries: [
      'What would have happened if Germany won World War II?',
      'How would technology be different if the internet was never invented?',
      'What if Kennedy wasn\'t assassinated?',
      'Would the Industrial Revolution have happened without coal?'
    ],
    rationale: 'Historical counterfactuals involve complex systems with path dependencies, emergent properties, and sensitivity to initial conditions. Minor changes can propagate in unpredictable ways, making definitive knowledge of alternate historical trajectories inaccessible.',
    handlingApproaches: [
      {
        description: 'Explore plausible scenarios with caveats',
        applicability: 'When bounded speculation may be informative and valuable',
        exampleResponse: 'I can\'t provide definitive knowledge about how history would have unfolded if Kennedy wasn\'t assassinated, as historical counterfactuals involve too many complex interactions and contingencies. However, I can explore some plausible scenarios that historians and political scientists have considered, while emphasizing the inherent uncertainty. Some argue Kennedy might have limited U.S. involvement in Vietnam based on certain statements and actions before his death, while others point to countervailing political pressures and Cold War dynamics that might have led to similar outcomes regardless. The civil rights legislation that Johnson passed might have faced different challenges or timelines under Kennedy.'
      },
      {
        description: 'Focus on historical patterns and constraints',
        applicability: 'When structural factors provide useful context',
        exampleResponse: 'Rather than speculating definitively about whether the Industrial Revolution would have happened without coal, I can discuss the broader historical factors and constraints involved. Coal provided crucial energy advantages that enabled certain industrial developments, but historical transformations often find alternative pathways. Other energy sources like water power, wood, and later oil might have supported different patterns of industrialization. The underlying social, economic, and technological conditions that drove industrialization - like agricultural productivity, urbanization, scientific advancement, and commercial networks - would still have exerted pressure for technological change, though likely following different timelines and forms.'
      }
    ],
    flexibility: 0.6
  },
  {
    id: 'future_contingency',
    name: 'Definitive Future Predictions',
    description: 'The boundary around definitive knowledge of future contingent events',
    type: EpistemicBoundaryType.FUTURE_CONTINGENCY,
    domains: ['forecasting', 'planning', 'general'],
    recognitionPatterns: [
      /will (definitely|certainly) happen/i,
      /guaranteed to occur/i,
      /tell me the future/i,
      /will .* win the next/i,
      /predict with certainty/i
    ],
    keywords: ['predict', 'forecast', 'future', 'definite', 'certain', 'guarantee'],
    relatedConcepts: ['contingency', 'free will', 'forecasting', 'uncertainty', 'probability'],
    exampleQueries: [
      'Who will win the next election?',
      'Will the stock market crash next year?',
      'When will the next major earthquake hit California?',
      'Will I get the job I applied for?'
    ],
    rationale: 'Future contingent events involve open possibilities that have not yet been determined. They depend on complex causal processes, human decisions, chance factors, and emergent dynamics that resist definitive prediction.',
    handlingApproaches: [
      {
        description: 'Provide probabilistic assessment',
        applicability: 'When probabilistic forecasts are possible',
        exampleResponse: 'I can\'t predict with certainty who will win the next election, as this depends on many factors that haven\'t yet occurred, including campaign developments, economic changes, world events, and millions of individual decisions. What I can do is discuss current polling data, historical patterns for incumbent parties, identified swing districts, and factors political scientists consider important. Most election forecasters use probabilistic models that assign likelihoods rather than making definitive predictions, precisely because of these inherent uncertainties.'
      },
      {
        description: 'Analyze key factors and scenarios',
        applicability: 'When scenario analysis would be helpful',
        exampleResponse: 'While I can\'t tell you with certainty whether the stock market will crash next year (if I could, I\'d be the world\'s richest investor!), I can discuss factors that experts monitor for market risk assessment: current valuations relative to historical norms, economic indicators like yield curves and unemployment, monetary policy directions, consumer sentiment, and global stability. I can also outline different scenarios that analysts consider plausible and their potential warning signs. This might help you think through the range of possibilities for your financial planning.'
      }
    ],
    flexibility: 0.8
  }
];

/**
 * Domain-specific epistemic boundaries
 */
export const DOMAIN_EPISTEMIC_BOUNDARIES: {[domain: string]: EpistemicBoundary[]} = {
  'psychology': [
    {
      id: 'complete_personality_model',
      name: 'Complete Model of Individual Personality',
      description: 'The boundary around complete models of individual personality encompassing all traits, states, and dynamics',
      type: EpistemicBoundaryType.KNOWLEDGE_LIMITATION,
      domains: ['psychology'],
      recognitionPatterns: [
        /complete personality profile/i,
        /exact personality type/i,
        /definitive analysis of .* character/i,
        /precise psychological profile/i
      ],
      keywords: ['personality', 'profile', 'character', 'psychological assessment', 'complete understanding'],
      relatedConcepts: ['personality theory', 'individual differences', 'psychometrics', 'idiographic'],
      exampleQueries: [
        'Give me a complete personality analysis based on this text',
        'What is my exact personality type?',
        'Create a precise psychological profile of this historical figure',
        'Tell me everything about this person\'s psychology'
      ],
      rationale: 'Personality is multifaceted, contextual, and dynamic, involving countless traits, states, motivations, and cognitive patterns that interact in complex ways. Complete models of individual personality exceed available evidence and theoretical integration.',
      handlingApproaches: [
        {
          description: 'Offer limited trait analysis with caveats',
          applicability: 'When some personality information can be reasonably inferred',
          exampleResponse: 'I can\'t provide a complete personality analysis based on limited text, as personality is complex, contextual, and multi-faceted. What I can do is note some verbal patterns that might suggest certain tendencies. For example, the frequent references to planning and organization might indicate conscientiousness, while the emphasis on connections with others could suggest extroversion or agreeableness. However, these are tentative observations, not a definitive profile. Validated personality assessments administered by professionals would provide more reliable insights.'
        }
      ],
      flexibility: 0.5
    },
    {
      id: 'direct_mental_causation',
      name: 'Direct Mental Causation',
      description: 'The boundary around direct knowledge of exactly how mental states cause other mental states or behaviors',
      type: EpistemicBoundaryType.KNOWLEDGE_LIMITATION,
      domains: ['psychology', 'neuroscience'],
      recognitionPatterns: [
        /exactly how .* thoughts cause/i,
        /precise mechanism by which .* emotions affect/i,
        /direct causal path from .* mental state to/i
      ],
      keywords: ['mental causation', 'mind-body', 'mechanism', 'thought processes', 'emotional causation'],
      relatedConcepts: ['philosophy of mind', 'cognitive neuroscience', 'mechanistic explanation'],
      exampleQueries: [
        'Explain exactly how thoughts cause actions',
        'What is the precise mechanism by which emotions affect decision-making?',
        'Show the direct causal path from beliefs to behaviors'
      ],
      rationale: 'Mental causation involves multiple levels of organization from neural activity to phenomenal experience, with complex bidirectional relationships. Complete mechanistic models of how mental states cause other mental states or behaviors exceed current scientific understanding.',
      handlingApproaches: [
        {
          description: 'Discuss multi-level models and correlations',
          applicability: 'When explaining current scientific understanding would be helpful',
          exampleResponse: 'While I can\'t provide an exact mechanistic account of how emotions affect decision-making (this remains an active research area with significant unknowns), I can explain what current cognitive and affective neuroscience tells us. Emotions appear to influence decisions through multiple pathways: they affect attention allocation to different features of options; they activate somatic markers associated with previous outcomes; they modulate activity in brain regions involved in value computation like the orbitofrontal cortex and amygdala; and they influence risk perception and temporal discounting. These processes operate at multiple levels from neural circuits to conscious experience, with bidirectional interactions rather than simple linear causation.'
        }
      ],
      flexibility: 0.6
    }
  ],
  'physics': [
    {
      id: 'quantum_measurement_problem',
      name: 'Quantum Measurement Problem Resolution',
      description: 'The boundary around definitive resolution of the quantum measurement problem',
      type: EpistemicBoundaryType.KNOWLEDGE_LIMITATION,
      domains: ['physics', 'philosophy of science'],
      recognitionPatterns: [
        /true interpretation of quantum mechanics/i,
        /really happens during quantum measurement/i,
        /solution to the measurement problem/i,
        /correct understanding of wave function collapse/i
      ],
      keywords: ['quantum', 'measurement', 'wave function', 'collapse', 'decoherence', 'interpretation'],
      relatedConcepts: ['quantum mechanics', 'Copenhagen interpretation', 'many-worlds interpretation', 'decoherence'],
      exampleQueries: [
        'What really happens during quantum measurement?',
        'Which interpretation of quantum mechanics is correct?',
        'Is the wave function real or just a mathematical tool?',
        'What truly causes wave function collapse?'
      ],
      rationale: 'The quantum measurement problem involves fundamental questions about the nature of reality, observation, and physical law that go beyond empirical verification. Different interpretations of quantum mechanics make equivalent empirical predictions despite profound conceptual differences.',
      handlingApproaches: [
        {
          description: 'Present multiple interpretations without claiming definitive knowledge',
          applicability: 'When explaining conceptual options without claiming a solution',
          exampleResponse: 'I can\'t tell you definitively what happens during quantum measurement or which interpretation is "correct," as this remains one of the great unresolved questions in physics. What I can do is explain the main interpretations and their philosophical implications. The Copenhagen interpretation sees measurement as causing wave function collapse, but doesn\'t explain the mechanism. Many-worlds interpretation avoids collapse by suggesting all possibilities occur in branching universes. Decoherence explains the appearance of collapse through environmental interactions. QBism treats the wave function
