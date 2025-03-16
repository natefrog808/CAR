/**
   * Check if clinical data is present in the categorized data
   */
  private checkForClinicalData(categorizedData: any): boolean {
    if (!categorizedData) return false;
    
    // Check for healthcare-specific data
    if (categorizedData.existence && categorizedData.existence.existingEntities) {
      const healthcareEntities = categorizedData.existence.existingEntities.filter((entity: any) => 
        entity.entityType === 'healthcare' || 
        entity.name?.toLowerCase().includes('patient') ||
        entity.name?.toLowerCase().includes('clinical') ||
        entity.name?.toLowerCase().includes('medical')
      );
      
      if (healthcareEntities.length > 0) {
        return true;
      }
    }
    
    // Check for symptom data
    if (categorizedData.plurality && categorizedData.plurality.relationships) {
      const symptomRelationships = categorizedData.plurality.relationships.filter((rel: any) => 
        rel.from?.toLowerCase().includes('symptom') || 
        rel.to?.toLowerCase().includes('symptom')
      );
      
      if (symptomRelationships.length > 0) {
        return true;
      }
    }
    
    // Check for medical tests or measurements
    if (categorizedData.causality && categorizedData.causality.causalRelationships) {
      const medicalCauses = categorizedData.causality.causalRelationships.filter((rel: any) => 
        rel.cause?.toLowerCase().includes('test') || 
        rel.cause?.toLowerCase().includes('lab') ||
        rel.cause?.toLowerCase().includes('measure') ||
        rel.effect?.toLowerCase().includes('diagnosis')
      );
      
      if (medicalCauses.length > 0) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Check if temporal information is present in the data
   */
  private hasTemporalInformation(categorizedData: any): boolean {
    if (!categorizedData) return false;
    
    // Check for temporal categories
    if (categorizedData.causality && categorizedData.causality.causalChains > 0) {
      return true; // Causality implies temporality
    }
    
    // Check for necessity with temporal implications
    if (categorizedData.necessity && categorizedData.necessity.necessaryConditions > 0) {
      return true; // Necessity often implies temporal sequence
    }
    
    // Check for temporal terms in existence entities
    if (categorizedData.existence && categorizedData.existence.existingEntities) {
      const temporalEntities = categorizedData.existence.existingEntities.filter((entity: any) => 
        entity.name?.toLowerCase().includes('time') || 
        entity.name?.toLowerCase().includes('date') ||
        entity.name?.toLowerCase().includes('period') ||
        entity.name?.toLowerCase().includes('duration') ||
        entity.entityType?.toLowerCase().includes('temporal')
      );
      
      if (temporalEntities.length > 0) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Detect contradictions between inferences
   */
  private detectContradictions(inferences: Inference[]): {inference1: Inference; inference2: Inference}[] {
    const contradictions: {inference1: Inference; inference2: Inference}[] = [];
    
    // Compare each pair of inferences
    for (let i = 0; i < inferences.length; i++) {
      for (let j = i + 1; j < inferences.length; j++) {
        if (this.areContradictory(inferences[i], inferences[j])) {
          contradictions.push({
            inference1: inferences[i],
            inference2: inferences[j]
          });
        }
      }
    }
    
    return contradictions;
  }
  
  /**
   * Check if two inferences contradict each other
   */
  private areContradictory(inference1: Inference, inference2: Inference): boolean {
    const text1 = inference1.inference.toLowerCase();
    const text2 = inference2.inference.toLowerCase();
    
    // Check for direct negation
    if (
      (text1.includes('is') && text2.includes('is not') && this.shareKeyTerms(text1, text2)) ||
      (text1.includes('is not') && text2.includes('is') && this.shareKeyTerms(text1, text2)) ||
      (text1.includes('will') && text2.includes('will not') && this.shareKeyTerms(text1, text2)) ||
      (text1.includes('will not') && text2.includes('will') && this.shareKeyTerms(text1, text2)) ||
      (text1.includes('can') && text2.includes('cannot') && this.shareKeyTerms(text1, text2)) ||
      (text1.includes('cannot') && text2.includes('can') && this.shareKeyTerms(text1, text2))
    ) {
      return true;
    }
    
    // Check for opposing causal relationships
    if (inference1.type === 'causal' && inference2.type === 'causal') {
      const causalMatch1 = text1.match(/(.+)\s+causes\s+(.+)/i) || 
                         text1.match(/(.+)\s+leads to\s+(.+)/i);
      
      const causalMatch2 = text2.match(/(.+)\s+causes\s+(.+)/i) || 
                         text2.match(/(.+)\s+leads to\s+(.+)/i);
      
      if (causalMatch1 && causalMatch2) {
        const [_, cause1, effect1] = causalMatch1;
        const [__, cause2, effect2] = causalMatch2;
        
        // Check for same cause but contradictory effects
        if (this.areSimilarTerms(cause1, cause2) && this.areOppositeTerms(effect1, effect2)) {
          return true;
        }
        
        // Check for opposite causes leading to same effect
        if (this.areOppositeTerms(cause1, cause2) && this.areSimilarTerms(effect1, effect2)) {
          return true;
        }
      }
    }
    
    // Check for opposite assessments
    const positiveTerms = ['beneficial', 'positive', 'advantageous', 'effective', 'recommended'];
    const negativeTerms = ['harmful', 'negative', 'disadvantageous', 'ineffective', 'not recommended'];
    
    const text1HasPositive = positiveTerms.some(term => text1.includes(term));
    const text1HasNegative = negativeTerms.some(term => text1.includes(term));
    const text2HasPositive = positiveTerms.some(term => text2.includes(term));
    const text2HasNegative = negativeTerms.some(term => text2.includes(term));
    
    if ((text1HasPositive && text2HasNegative || text1HasNegative && text2HasPositive) && 
        this.shareKeyTerms(text1, text2)) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Check if two texts share key terms (indicating they're about the same subject)
   */
  private shareKeyTerms(text1: string, text2: string): boolean {
    // Extract substantive terms (nouns, verbs, adjectives)
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    // Filter out common stop words
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'as', 'of'];
    const filteredWords1 = words1.filter(word => !stopWords.includes(word) && word.length > 2);
    const filteredWords2 = words2.filter(word => !stopWords.includes(word) && word.length > 2);
    
    // Count shared words
    const sharedWords = filteredWords1.filter(word => filteredWords2.includes(word));
    
    // Consider texts related if they share enough substantive terms
    return sharedWords.length >= 2;
  }
  
  /**
   * Check if two terms have opposite meanings
   */
  private areOppositeTerms(term1: string, term2: string): boolean {
    const term1Lower = term1.toLowerCase().trim();
    const term2Lower = term2.toLowerCase().trim();
    
    // Direct opposites
    const oppositePairs = [
      ['increase', 'decrease'],
      ['high', 'low'],
      ['positive', 'negative'],
      ['good', 'bad'],
      ['benefit', 'harm'],
      ['advantage', 'disadvantage'],
      ['effective', 'ineffective'],
      ['success', 'failure'],
      ['approve', 'disapprove'],
      ['presence', 'absence']
    ];
    
    for (const [a, b] of oppositePairs) {
      if ((term1Lower.includes(a) && term2Lower.includes(b)) || 
          (term1Lower.includes(b) && term2Lower.includes(a))) {
        return true;
      }
    }
    
    // Check for negation
    if ((term1Lower.includes('not') && term2Lower === term1Lower.replace('not', '').trim()) ||
        (term2Lower.includes('not') && term1Lower === term2Lower.replace('not', '').trim())) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Check if two terms have similar meanings
   */
  private areSimilarTerms(term1: string, term2: string): boolean {
    const term1Lower = term1.toLowerCase().trim();
    const term2Lower = term2.toLowerCase().trim();
    
    // Direct similarity
    return term1Lower === term2Lower || 
           term1Lower.includes(term2Lower) || 
           term2Lower.includes(term1Lower);
  }
  
  /**
   * Assess the complexity of reasoning
   */
  private assessReasoningComplexity(reasoning: string): 'high' | 'medium' | 'low' {
    if (!reasoning) return 'low';
    
    // Count sentences
    const sentences = reasoning.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Count logical connectors
    const logicalConnectors = [
      'therefore', 'thus', 'because', 'since', 
      'if', 'then', 'however', 'although',
      'consequently', 'nevertheless', 'despite',
      'whereas', 'while', 'unless', 'additionally',
      'moreover', 'furthermore', 'in contrast'
    ];
    
    const connectorCount = logicalConnectors.reduce((count, connector) => {
      return count + (reasoning.toLowerCase().match(new RegExp(`\\b${connector}\\b`, 'g')) || []).length;
    }, 0);
    
    // Count causal terms
    const causalTerms = [
      'cause', 'effect', 'lead to', 'result in', 
      'due to', 'because of', 'impact', 'influence',
      'consequence', 'outcome'
    ];
    
    const causalCount = causalTerms.reduce((count, term) => {
      return count + (reasoning.toLowerCase().match(new RegExp(term, 'g')) || []).length;
    }, 0);
    
    // Calculate complexity score
    const complexityScore = sentences.length * 0.2 + connectorCount * 0.5 + causalCount * 0.3;
    
    // Map score to complexity level
    if (complexityScore > 10) {
      return 'high';
    } else if (complexityScore > 5) {
      return 'medium';
    } else {
      return 'low';
    }
  }
  
  /**
   * Assess the complexity of an action
   */
  private assessActionComplexity(action: string): 'high' | 'medium' | 'low' {
    if (!action) return 'low';
    
    // Count components of the action
    const components = action.split(/\s+and\s+|\s*,\s*|\s*;\s*/).filter(c => c.trim().length > 0);
    
    // Count conditional clauses
    const conditionalClauses = (action.match(/\bif\b|\bunless\b|\bwhen\b|\bin case\b/g) || []).length;
    
    // Count specific action verbs
    const actionVerbs = [
      'implement', 'develop', 'create', 'establish', 'conduct',
      'analyze', 'evaluate', 'assess', 'monitor', 'coordinate',
      'integrate', 'formulate', 'synthesize', 'restructure'
    ];
    
    const verbCount = actionVerbs.reduce((count, verb) => {
      return count + (action.toLowerCase().match(new RegExp(`\\b${verb}\\b`, 'g')) || []).length;
    }, 0);
    
    // Calculate complexity score
    const complexityScore = components.length * 0.4 + conditionalClauses * 0.6 + verbCount * 0.3;
    
    // Map score to complexity level
    if (complexityScore > 5) {
      return 'high';
    } else if (complexityScore > 2) {
      return 'medium';
    } else {
      return 'low';
    }
  }
  
  /**
   * Extract the general direction of an action
   */
  private extractActionDirection(action: string): string {
    if (!action) return '';
    
    // Extract the main verb and object
    const firstVerb = action.match(/\b(implement|develop|create|establish|conduct|analyze|evaluate|assess|monitor|coordinate|integrate|formulate|synthesize|restructure|increase|decrease|modify|adjust|change|maintain|preserve|protect|enhance|reduce|improve|optimize)\b/i);
    
    if (firstVerb) {
      // Find the first noun phrase after the verb
      const verbIndex = action.toLowerCase().indexOf(firstVerb[0].toLowerCase());
      const afterVerb = action.slice(verbIndex + firstVerb[0].length);
      
      // Simple noun phrase extraction (will catch the first substantive term)
      const nounPhrase = afterVerb.match(/\s+(?:the|a|an)?\s*([a-z]+(?:\s+[a-z]+){0,2})/i);
      
      if (nounPhrase) {
        return `${firstVerb[0]} ${nounPhrase[1]}`;
      }
      
      return firstVerb[0];
    }
    
    return action.split(' ').slice(0, 3).join(' '); // First three words as fallback
  }
  
  /**
   * Check if an inference supports an action
   */
  private inferenceSupportsAction(
    inference: Inference, 
    actionTerms: string[], 
    actionDirection: string
  ): boolean {
    const inferenceText = inference.inference.toLowerCase();
    
    // Check if inference contains key terms from the action
    const containsActionTerms = actionTerms.filter(term => 
      term.length > 3 && inferenceText.includes(term)
    ).length >= 2;
    
    if (containsActionTerms) {
      return true;
    }
    
    // Check if inference directly supports action direction
    if (actionDirection && inferenceText.includes(actionDirection.toLowerCase())) {
      return true;
    }
    
    // For causal inferences, check if effect relates to action
    if (inference.type === 'causal') {
      const causalMatch = inferenceText.match(/(.+)\s+causes\s+(.+)/i) || 
                        inferenceText.match(/(.+)\s+leads to\s+(.+)/i) ||
                        inferenceText.match(/(.+)\s+results in\s+(.+)/i);
      
      if (causalMatch) {
        const effect = causalMatch[2].toLowerCase();
        return actionTerms.filter(term => 
          term.length > 3 && effect.includes(term)
        ).length >= 1;
      }
    }
    
    return false;
  }
  
  /**
   * Assess the feasibility of an action given the inferences
   */
  private assessActionFeasibility(action: string, inferences: Inference[]): string | null {
    // Extract core action components
    const actionLower = action.toLowerCase();
    
    // Check for actions requiring resources or capabilities
    const resourceTerms = ['resources', 'funding', 'budget', 'staff', 'expertise', 'technology', 'infrastructure'];
    const requiresResources = resourceTerms.some(term => actionLower.includes(term));
    
    if (requiresResources) {
      // Check if inferences address resource availability
      const resourceInferences = inferences.filter(inf => 
        resourceTerms.some(term => inf.inference.toLowerCase().includes(term))
      );
      
      if (resourceInferences.length === 0) {
        return "Action requires resources but resource availability is unaddressed in analysis";
      }
    }
    
    // Check for actions requiring coordination
    if (actionLower.includes('collaborat') || 
        actionLower.includes('coordinat') || 
        actionLower.includes('partner') ||
        actionLower.includes('multiple') && actionLower.includes('stakeholder')) {
      
      // Check if inferences address coordination feasibility
      const coordinationInferences = inferences.filter(inf => 
        inf.inference.toLowerCase().includes('collaborat') ||
        inf.inference.toLowerCase().includes('coordinat') ||
        inf.inference.toLowerCase().includes('partner')
      );
      
      if (coordinationInferences.length === 0) {
        return "Action requires coordination but feasibility of coordination is unaddressed in analysis";
      }
    }
    
    // Check for actions with ambitious timeframes
    if (actionLower.includes('immediate') || 
        actionLower.includes('quickly') || 
        actionLower.includes('rapid') ||
        actionLower.includes('fast')) {
      
      // Check if inferences address timeline feasibility
      const timelineInferences = inferences.filter(inf => 
        inf.inference.toLowerCase().includes('time') ||
        inf.inference.toLowerCase().includes('duration') ||
        inf.inference.toLowerCase().includes('period') ||
        inf.inference.toLowerCase().includes('schedule')
      );
      
      if (timelineInferences.length === 0) {
        return "Action suggests ambitious timeline but feasibility of timeline is unaddressed in analysis";
      }
    }
    
    return null; // No feasibility issues detected
  }
}      // Combine uncertainties
      uncertaintyAnalysis.value = this.combineUncertainties([
        uncertaintyAnalysis.value, 
        oodUncertainty.value
      ]);
      
      uncertaintyAnalysis.factors.push(...oodUncertainty.factors);
      
      // Add distribution information
      uncertaintyAnalysis.distribution = {
        ...uncertaintyAnalysis.distribution,
        outOfDistribution: oodUncertainty.value
      };
    }
    
    // Consider epistemic limitations as uncertainty factors
    if (epistemicLimits.length > 0) {
      // Add the most significant limitations as uncertainty factors
      const significantLimits = epistemicLimits.slice(0, 3); // Take the top 3
      
      significantLimits.forEach(limitation => {
        if (!uncertaintyAnalysis.factors.includes(limitation)) {
          uncertaintyAnalysis.factors.push(limitation);
        }
      });
      
      // Increase uncertainty based on number of limitations
      const limitationUncertainty = Math.min(0.1 * epistemicLimits.length, 0.5);
      uncertaintyAnalysis.value = this.combineUncertainties([
        uncertaintyAnalysis.value, 
        limitationUncertainty
      ]);
      
      // Add distribution information
      uncertaintyAnalysis.distribution = {
        ...uncertaintyAnalysis.distribution,
        epistemicLimitations: limitationUncertainty
      };
    }
    
    // Assess uncertainty in the proposed action
    const actionUncertainty = this.calculateActionUncertainty(proposedAction, inferences);
    
    // Combine with overall uncertainty
    uncertaintyAnalysis.value = this.combineUncertainties([
      uncertaintyAnalysis.value,
      actionUncertainty.value
    ]);
    
    // Add action-specific uncertainty factors
    actionUncertainty.factors.forEach(factor => {
      if (!uncertaintyAnalysis.factors.includes(factor)) {
        uncertaintyAnalysis.factors.push(factor);
      }
    });
    
    // Add distribution information
    uncertaintyAnalysis.distribution = {
      ...uncertaintyAnalysis.distribution,
      action: actionUncertainty.value
    };
    
    // Ensure uncertainty is within 0-1 range
    uncertaintyAnalysis.value = Math.max(0, Math.min(1, uncertaintyAnalysis.value));
    
    // If no specific factors were identified, add a generic one
    if (uncertaintyAnalysis.factors.length === 0) {
      uncertaintyAnalysis.factors.push("General uncertainty inherent in all reasoning");
    }
    
    return uncertaintyAnalysis;
  }
  
  /**
   * Perform metacognitive reflection on the reasoning process
   * This represents Kant's reflection on the conditions of knowledge
   * 
   * @param inferences Inferences generated by the Reason Layer
   * @param proposedAction The decision generated by the Reason Layer
   * @param reasoning The reasoning supporting the decision
   * @param ethicalAnalysis Ethical assessment from the Reason Layer
   * @param epistemicLimits Identified epistemic limitations
   * @param uncertainty Analysis of uncertainty factors
   * @returns Metacognitive reflection including confidence assessment
   */
  private metacognitiveReflection(
    inferences: Inference[],
    proposedAction: string,
    reasoning: string,
    ethicalAnalysis: any,
    epistemicLimits: string[],
    uncertainty: UncertaintyAnalysis
  ): MetacognitiveReflection {
    // Initialize metacognitive reflection
    let reflectionText = "";
    
    // Assess confidence based on uncertainty
    const confidenceValue = 1 - uncertainty.value;
    let confidenceLevel: ConfidenceLevel = this.mapConfidenceToLevel(confidenceValue);
    
    // Begin with assessment of the reasoning process
    if (this.options.metacognitiveReflection!.enableReasoningReflection) {
      reflectionText += this.reflectOnReasoningProcess(inferences, reasoning, epistemicLimits);
    }
    
    // Assess inference quality
    if (this.options.metacognitiveReflection!.enableInferenceQuality) {
      reflectionText += " " + this.reflectOnInferenceQuality(inferences);
    }
    
    // Calibrate confidence assessment
    if (this.options.metacognitiveReflection!.enableConfidenceCalibration) {
      const calibratedConfidence = this.calibrateConfidence(
        confidenceValue, 
        inferences, 
        epistemicLimits,
        uncertainty
      );
      
      // Update confidence if using calibrated value
      if (this.options.confidence!.useCalibratedConfidence) {
        confidenceLevel = this.mapConfidenceToLevel(calibratedConfidence.value);
        reflectionText += " " + calibratedConfidence.reflection;
      }
    }
    
    // Detect and reflect on potential biases
    if (this.options.metacognitiveReflection!.enableBiasDetection) {
      const biasReflection = this.detectBiases(inferences, proposedAction, ethicalAnalysis);
      
      if (biasReflection) {
        reflectionText += " " + biasReflection;
      }
    }
    
    // Add reflection on limitations and their implications
    if (epistemicLimits.length > 0) {
      reflectionText += ` Acknowledging ${epistemicLimits.length} limitations in this analysis.`;
    }
    
    // Add reflection on the confidence level
    reflectionText += ` Overall ${confidenceLevel} confidence in this analysis.`;
    
    // Finalize reflection
    return {
      confidence: confidenceLevel,
      reflections: reflectionText.trim()
    };
  }
  
  //=============================================================================
  // UNCERTAINTY QUANTIFICATION METHODS
  //=============================================================================
  
  /**
   * Calculate statistical uncertainty from inference confidences
   */
  private calculateStatisticalUncertainty(inferences: Inference[]): {
    value: number;
    factors: string[];
  } {
    if (inferences.length === 0) {
      return {
        value: 0.8, // High uncertainty when no inferences available
        factors: ["No inferences available for analysis"]
      };
    }
    
    // Extract confidences from inferences
    const confidences = inferences.map(inf => inf.confidence);
    
    // Calculate average confidence and convert to uncertainty
    const avgConfidence = confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length;
    const avgUncertainty = 1 - avgConfidence;
    
    // Calculate variance in confidences
    const variance = confidences.reduce((sum, conf) => sum + Math.pow(conf - avgConfidence, 2), 0) / confidences.length;
    
    // Higher variance indicates more uncertainty
    const varianceUncertainty = Math.min(variance * 3, 0.5); // Scale and cap variance contribution
    
    // Combine average uncertainty and variance contribution
    const combinedUncertainty = this.combineUncertainties([avgUncertainty, varianceUncertainty]);
    
    // Determine factors contributing to uncertainty
    const factors: string[] = [];
    
    if (avgUncertainty > 0.3) {
      factors.push(`Average inference confidence is ${(avgConfidence * 100).toFixed(1)}%`);
    }
    
    if (variance > 0.05) {
      factors.push(`High variance in inference confidences (${variance.toFixed(2)})`);
    }
    
    // Check for low confidence inferences
    const lowConfidenceCount = confidences.filter(conf => conf < 0.6).length;
    if (lowConfidenceCount > 0) {
      factors.push(`${lowConfidenceCount} inferences have confidence below 60%`);
    }
    
    return {
      value: combinedUncertainty,
      factors
    };
  }
  
  /**
   * Calculate model uncertainty related to the reasoning approach
   */
  private calculateModelUncertainty(inferences: Inference[], reasoning: string): {
    value: number;
    factors: string[];
  } {
    const factors: string[] = [];
    let modelUncertainty = 0.2; // Base model uncertainty
    
    // Check for diversity of inference types
    const inferenceTypes = new Set(inferences.map(inf => inf.type));
    
    if (inferenceTypes.size < 2 && inferences.length > 1) {
      modelUncertainty += 0.1;
      factors.push("Limited reasoning diversity: relying on single type of inference");
    }
    
    // Check for presence of different reasoning approaches
    const hasDeductive = inferences.some(inf => inf.type === 'deductive');
    const hasInductive = inferences.some(inf => inf.type === 'inductive');
    const hasAbductive = inferences.some(inf => inf.type === 'abductive');
    
    if (!(hasDeductive || hasInductive || hasAbductive)) {
      modelUncertainty += 0.1;
      factors.push("Missing fundamental reasoning approaches (deductive, inductive, or abductive)");
    }
    
    // Check for overreliance on one inference with much higher confidence
    if (inferences.length > 1) {
      const sortedConfidences = inferences.map(inf => inf.confidence).sort((a, b) => b - a);
      if (sortedConfidences[0] > sortedConfidences[1] * 1.5) {
        modelUncertainty += 0.15;
        factors.push("Overreliance on a single high-confidence inference");
      }
    }
    
    // Check for complexity in reasoning
    const reasoningComplexity = this.assessReasoningComplexity(reasoning);
    if (reasoningComplexity === 'high') {
      modelUncertainty += 0.1;
      factors.push("Complex reasoning increases model uncertainty");
    } else if (reasoningComplexity === 'low') {
      modelUncertainty += 0.1;
      factors.push("Overly simplified reasoning may miss important factors");
    }
    
    // Check for conflicting inferences
    const contradictions = this.detectContradictions(inferences);
    if (contradictions.length > 0) {
      modelUncertainty += 0.2;
      factors.push(`${contradictions.length} contradictory inferences detected`);
    }
    
    return {
      value: Math.min(modelUncertainty, 0.9), // Cap at 0.9
      factors
    };
  }
  
  /**
   * Calculate distributional uncertainty related to the data distribution
   */
  private calculateDistributionalUncertainty(inferences: Inference[]): {
    value: number;
    factors: string[];
  } {
    const factors: string[] = [];
    let distributionalUncertainty = 0.15; // Base distributional uncertainty
    
    // Check for evidence of data sparsity or bias
    const evidenceStrings = inferences.flatMap(inf => inf.evidence || []);
    const counterEvidenceStrings = inferences.flatMap(inf => inf.counterevidence || []);
    
    // Combine evidence and counterevidence for text analysis
    const allEvidence = [...evidenceStrings, ...counterEvidenceStrings];
    
    // Look for mentions of data limitations
    const dataLimitationIndicators = [
      'small sample', 'limited data', 'biased sample', 'selection bias',
      'sampling error', 'not representative', 'single source', 'convenience sample'
    ];
    
    const hasDataLimitations = allEvidence.some(evidence => 
      dataLimitationIndicators.some(indicator => 
        evidence.toLowerCase().includes(indicator)
      )
    );
    
    if (hasDataLimitations) {
      distributionalUncertainty += 0.2;
      factors.push("Evidence suggests data distribution limitations or bias");
    }
    
    // Check for narrow inference base (few unique pieces of evidence)
    const uniqueEvidence = new Set(evidenceStrings.map(e => e.toLowerCase()));
    if (uniqueEvidence.size < Math.max(3, inferences.length / 2)) {
      distributionalUncertainty += 0.15;
      factors.push("Limited diversity in supporting evidence");
    }
    
    // Check for evidence of domain shift or temporal change
    const domainShiftIndicators = [
      'changed', 'evolved', 'shifting', 'dynamic', 'emerging',
      'new', 'recent', 'trend', 'outdated', 'historical'
    ];
    
    const hasDomainShift = allEvidence.some(evidence => 
      domainShiftIndicators.some(indicator => 
        evidence.toLowerCase().includes(indicator)
      )
    );
    
    if (hasDomainShift) {
      distributionalUncertainty += 0.15;
      factors.push("Evidence suggests potential domain shift or temporal changes");
    }
    
    return {
      value: Math.min(distributionalUncertainty, 0.9), // Cap at 0.9
      factors
    };
  }
  
  /**
   * Calculate out-of-distribution uncertainty
   */
  private calculateOutOfDistributionUncertainty(inferences: Inference[], epistemicLimits: string[]): {
    value: number;
    factors: string[];
  } {
    const factors: string[] = [];
    let oodUncertainty = 0.1; // Base OOD uncertainty
    
    // Check epistemic limits for OOD indicators
    const oodLimitIndicators = [
      'outside', 'beyond', 'exceed', 'novel', 'unknown',
      'unseen', 'unusual', 'rare', 'boundary', 'limit'
    ];
    
    const oodLimits = epistemicLimits.filter(limit => 
      oodLimitIndicators.some(indicator => 
        limit.toLowerCase().includes(indicator)
      )
    );
    
    if (oodLimits.length > 0) {
      oodUncertainty += 0.05 * oodLimits.length;
      factors.push(`${oodLimits.length} limitations suggest out-of-distribution issues`);
    }
    
    // Check inferences for unusual confidence patterns
    const confidences = inferences.map(inf => inf.confidence);
    
    if (confidences.length > 0) {
      // Very low average confidence can indicate OOD
      const avgConfidence = confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length;
      
      if (avgConfidence < 0.4) {
        oodUncertainty += 0.2;
        factors.push("Unusually low average confidence may indicate out-of-distribution data");
      }
      
      // High variance in confidence can indicate OOD
      const variance = confidences.reduce((sum, conf) => sum + Math.pow(conf - avgConfidence, 2), 0) / confidences.length;
      
      if (variance > 0.1) {
        oodUncertainty += 0.15;
        factors.push("High variance in confidence suggests distributional inconsistencies");
      }
    }
    
    // Check for explicit OOD mentions in inferences or evidence
    const inferenceTexts = inferences.map(inf => inf.inference);
    const evidenceTexts = inferences.flatMap(inf => inf.evidence || []);
    
    const oodMentions = [...inferenceTexts, ...evidenceTexts].filter(text => 
      oodLimitIndicators.some(indicator => 
        text.toLowerCase().includes(indicator)
      )
    );
    
    if (oodMentions.length > 0) {
      oodUncertainty += 0.1;
      factors.push("Explicit mentions of distributional anomalies in inferences or evidence");
    }
    
    return {
      value: Math.min(oodUncertainty, 0.9), // Cap at 0.9
      factors
    };
  }
  
  /**
   * Calculate uncertainty specific to the proposed action
   */
  private calculateActionUncertainty(proposedAction: string, inferences: Inference[]): {
    value: number;
    factors: string[];
  } {
    const factors: string[] = [];
    let actionUncertainty = 0.1; // Base action uncertainty
    
    // Check if action is directly supported by strong inferences
    const strongInferences = inferences.filter(inf => inf.confidence > 0.7);
    
    const actionTerms = proposedAction.toLowerCase().split(/\s+/);
    const actionDirection = this.extractActionDirection(proposedAction);
    
    // Check if any strong inference directly supports the action
    const directSupportCount = strongInferences.filter(inf => 
      this.inferenceSupportsAction(inf, actionTerms, actionDirection)
    ).length;
    
    if (directSupportCount === 0 && strongInferences.length > 0) {
      actionUncertainty += 0.15;
      factors.push("Action lacks direct support from high-confidence inferences");
    } else if (directSupportCount === 0 && strongInferences.length === 0) {
      actionUncertainty += 0.25;
      factors.push("No high-confidence inferences to support action");
    }
    
    // Check for action complexity
    const actionComplexity = this.assessActionComplexity(proposedAction);
    
    if (actionComplexity === 'high') {
      actionUncertainty += 0.15;
      factors.push("Complex action increases uncertainty in execution and outcomes");
    }
    
    // Check for conditional or hedged language in the action
    if (
      proposedAction.toLowerCase().includes('if ') ||
      proposedAction.toLowerCase().includes('may ') ||
      proposedAction.toLowerCase().includes('might ') ||
      proposedAction.toLowerCase().includes('could ') ||
      proposedAction.toLowerCase().includes('perhaps') ||
      proposedAction.toLowerCase().includes('possibly')
    ) {
      actionUncertainty += 0.1;
      factors.push("Action contains conditional or hedged language");
    }
    
    // Check if action is feasible given the inferences
    const feasibilityIssues = this.assessActionFeasibility(proposedAction, inferences);
    
    if (feasibilityIssues) {
      actionUncertainty += 0.2;
      factors.push(feasibilityIssues);
    }
    
    return {
      value: Math.min(actionUncertainty, 0.9), // Cap at 0.9
      factors
    };
  }
  
  /**
   * Combine multiple uncertainty values into a single value
   * Using a non-linear combination that avoids double-counting
   */
  private combineUncertainties(uncertainties: number[]): number {
    if (uncertainties.length === 0) return 0;
    if (uncertainties.length === 1) return uncertainties[0];
    
    // Sort uncertainties in descending order
    const sortedUncertainties = [...uncertainties].sort((a, b) => b - a);
    
    // Start with the highest uncertainty
    let combinedUncertainty = sortedUncertainties[0];
    
    // Add diminishing contributions from other uncertainties
    // This avoids double-counting while still incorporating additional sources
    for (let i = 1; i < sortedUncertainties.length; i++) {
      // Each subsequent uncertainty contributes less to the total
      const contributionFactor = 0.7 / Math.pow(2, i);
      const remainingUncertaintySpace = 1 - combinedUncertainty;
      const contribution = sortedUncertainties[i] * contributionFactor * remainingUncertaintySpace;
      
      combinedUncertainty += contribution;
    }
    
    return Math.min(combinedUncertainty, 1);
  }
  
  //=============================================================================
  // METACOGNITIVE REFLECTION METHODS
  //=============================================================================
  
  /**
   * Reflect on the reasoning process used to reach conclusions
   */
  private reflectOnReasoningProcess(inferences: Inference[], reasoning: string, epistemicLimits: string[]): string {
    if (inferences.length === 0) {
      return "Unable to assess reasoning process due to lack of inferences.";
    }
    
    // Analyze inference types
    const inferenceTypes = inferences.map(inf => inf.type);
    const typeCounts: Record<string, number> = {};
    
    inferenceTypes.forEach(type => {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    // Sort types by frequency
    const sortedTypes = Object.entries(typeCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([type]) => type);
    
    // Generate reflection on reasoning approach
    let reflection = `Analysis primarily employs ${sortedTypes[0]} reasoning`;
    
    if (sortedTypes.length > 1) {
      reflection += ` supported by ${sortedTypes.slice(1).join(', ')} insights`;
    }
    
    // Assess evidence usage
    const evidenceCount = inferences.reduce((sum, inf) => sum + (inf.evidence?.length || 0), 0);
    const avgEvidencePerInference = evidenceCount / inferences.length;
    
    if (avgEvidencePerInference < 1) {
      reflection += ". Limited evidence supports these inferences.";
    } else if (avgEvidencePerInference >= 2) {
      reflection += ". Multiple evidential supports strengthen the analysis.";
    } else {
      reflection += ". Evidence is present but could be more comprehensive.";
    }
    
    // Consider epistemic limits in reflection
    if (epistemicLimits.length > 0) {
      reflection += ` Reasoning acknowledges ${epistemicLimits.length} limitations.`;
    }
    
    return reflection;
  }
  
  /**
   * Reflect on the quality of inferences
   */
  private reflectOnInferenceQuality(inferences: Inference[]): string {
    if (inferences.length === 0) {
      return "No inferences available to assess quality.";
    }
    
    // Calculate average confidence
    const avgConfidence = inferences.reduce((sum, inf) => sum + inf.confidence, 0) / inferences.length;
    
    // Count inferences with good evidential support
    const wellSupportedCount = inferences.filter(inf => 
      inf.evidence && inf.evidence.length >= 2
    ).length;
    
    const wellSupportedPct = Math.round((wellSupportedCount / inferences.length) * 100);
    
    // Count inferences with counterevidence
    const withCounterevidenceCount = inferences.filter(inf => 
      inf.counterevidence && inf.counterevidence.length > 0
    ).length;
    
    // Generate quality reflection
    let reflection = `Inference quality is `;
    
    if (avgConfidence > 0.75 && wellSupportedPct > 70) {
      reflection += "strong";
    } else if (avgConfidence > 0.6 && wellSupportedPct > 50) {
      reflection += "moderate";
    } else {
      reflection += "limited";
    }
    
    reflection += ` with ${wellSupportedPct}% of inferences having good evidential support`;
    
    if (withCounterevidenceCount > 0) {
      reflection += ` and ${withCounterevidenceCount} inferences acknowledging counterevidence`;
    }
    
    reflection += ".";
    
    return reflection;
  }
  
  /**
   * Calibrate confidence based on various factors
   */
  private calibrateConfidence(
    originalConfidence: number,
    inferences: Inference[],
    epistemicLimits: string[],
    uncertainty: UncertaintyAnalysis
  ): {
    value: number;
    reflection: string;
  } {
    let calibratedConfidence = originalConfidence;
    let calibrationReflection = "Confidence has been";
    let adjustments = 0;
    
    // Adjust for presence of epistemic limits
    if (epistemicLimits.length > 2) {
      const limitsAdjustment = Math.min(0.05 * epistemicLimits.length, 0.3);
      calibratedConfidence -= limitsAdjustment;
      adjustments++;
    }
    
    // Adjust for diversity of inference types
    const inferenceTypes = new Set(inferences.map(inf => inf.type));
    if (inferenceTypes.size < 3 && inferences.length > 3) {
      calibratedConfidence -= 0.1;
      adjustments++;
    } else if (inferenceTypes.size >= 4) {
      calibratedConfidence += 0.05;
      adjustments++;
    }
    
    // Adjust for evidence quality
    const avgEvidenceCount = inferences.reduce((sum, inf) => sum + (inf.evidence?.length || 0), 0) / 
                          Math.max(1, inferences.length);
    
    if (avgEvidenceCount < 1) {
      calibratedConfidence -= 0.15;
      adjustments++;
    } else if (avgEvidenceCount > 2) {
      calibratedConfidence += 0.1;
      adjustments++;
    }
    
    // Adjust for presence of counterevidence
    const counterevidenceCount = inferences.filter(inf => 
      inf.counterevidence && inf.counterevidence.length > 0
    ).length;
    
    if (counterevidenceCount > inferences.length / 3) {
      calibratedConfidence -= 0.1;
      adjustments++;
    }
    
    // Ensure confidence stays within bounds
    calibratedConfidence = Math.max(0.05, Math.min(0.95, calibratedConfidence));
    
    // Generate reflection on calibration
    if (Math.abs(calibratedConfidence - originalConfidence) < 0.05) {
      calibrationReflection = "Confidence assessment appears well-calibrated.";
    } else if (calibratedConfidence < originalConfidence) {
      calibrationReflection = `Confidence has been adjusted downward based on ${adjustments} factors including limitations and evidence quality.`;
    } else {
      calibrationReflection = `Confidence has been adjusted upward based on ${adjustments} factors including diverse reasoning and strong evidence.`;
    }
    
    return {
      value: calibratedConfidence,
      reflection: calibrationReflection
    };
  }
  
  /**
   * Detect potential biases in the reasoning
   */
  private detectBiases(inferences: Inference[], proposedAction: string, ethicalAnalysis: any): string | null {
    const potentialBiases: string[] = [];
    
    // Check for confirmation bias (overemphasis on supporting evidence)
    const evidenceCount = inferences.reduce((sum, inf) => sum + (inf.evidence?.length || 0), 0);
    const counterevidenceCount = inferences.reduce((sum, inf) => sum + (inf.counterevidence?.length || 0), 0);
    
    if (evidenceCount > 3 * counterevidenceCount && counterevidenceCount > 0) {
      potentialBiases.push("confirmation bias (disproportionate focus on supporting evidence)");
    }
    
    // Check for anchoring bias (overreliance on initial information)
    if (inferences.length > 1) {
      const confidences = inferences.map(inf => inf.confidence);
      if (confidences[0] > confidences.slice(1).reduce((sum, conf) => sum + conf, 0) / (confidences.length - 1) * 1.5) {
        potentialBiases.push("anchoring bias (overreliance on initial analysis)");
      }
    }
    
    // Check for availability bias (focus on easily recalled examples)
    const availabilityTerms = ['recent', 'common', 'familiar', 'well-known', 'popular'];
    const availabilityBias = inferences.some(inf => 
      inf.inference && availabilityTerms.some(term => inf.inference.toLowerCase().includes(term)) &&
      inf.confidence > 0.7
    );
    
    if (availabilityBias) {
      potentialBiases.push("availability bias (focus on easily recalled examples)");
    }
    
    // Check for overconfidence bias
    const highConfidenceCount = inferences.filter(inf => inf.confidence > 0.85).length;
    if (highConfidenceCount > inferences.length / 2 && inferences.length > 2) {
      potentialBiases.push("potential overconfidence in assessments");
    }
    
    // Check for action-oriented bias
    if (proposedAction && !proposedAction.toLowerCase().includes('gather more') && 
        !proposedAction.toLowerCase().includes('additional') && 
        !proposedAction.toLowerCase().includes('further') &&
        inferences.length < 3) {
      potentialBiases.push("action bias (premature recommendation despite limited analysis)");
    }
    
    // Generate bias reflection
    if (potentialBiases.length > 0) {
      return `Analysis may exhibit ${potentialBiases.join(', ')}.`;
    }
    
    return null;
  }
  
  /**
   * Map a numerical confidence value to a confidence level
   */
  private mapConfidenceToLevel(confidence: number): ConfidenceLevel {
    const thresholds = this.options.confidence!.thresholds!;
    
    if (confidence >= thresholds.veryHigh!) {
      return "very high";
    } else if (confidence >= thresholds.high!) {
      return "high";
    } else if (confidence >= thresholds.medium!) {
      return "medium";
    } else if (confidence >= thresholds.low!) {
      return "low";
    } else {
      return "very low";
    }
  }
  
  //=============================================================================
  // HELPER METHODS
  //=============================================================================
  
  /**
   * Identify domains present in the inferences
   */
  private identifyDomains(inferences: Inference[]): string[] {
    const domains = new Set<string>();
    
    // Domain indicator terms
    const domainIndicators: Record<string, string[]> = {
      'healthcare': ['patient', 'medical', 'clinical', 'health', 'symptom', 'diagnosis', 'treatment', 'disease'],
      'education': ['student', 'learning', 'teaching', 'education', 'school', 'academic', 'curriculum'],
      'finance': ['financial', 'investment', 'market', 'economic', 'fiscal', 'monetary', 'budget'],
      'governance': ['policy', 'government', 'regulation', 'law', 'compliance', 'public', 'governance'],
      'science': ['scientific', 'experiment', 'hypothesis', 'research', 'data', 'analysis']
    };
    
    // Check each inference for domain indicators
    inferences.forEach(inference => {
      const inferenceText = inference.inference.toLowerCase();
      
      Object.entries(domainIndicators).forEach(([domain, indicators]) => {
        if (indicators.some(indicator => inferenceText.includes(indicator))) {
          domains.add(domain);
        }
      });
    });
    
    return Array.from(domains);
  }
  
  /**
   * Check if clinical data is present in the categorized data
   */
  private checkForClinicalData(categorizedData: any): boolean// src/core/critique-layer.ts

/**
 * Critique Layer for the Critique of Artificial Reason (CAR)
 * 
 * This module implements Kant's "Transcendental Dialectic" in its critical aspect - 
 * examining the limits of reason and knowledge, identifying when reason attempts to
 * extend beyond the boundaries of possible experience, and ensuring epistemic humility.
 * 
 * In Kant's philosophy, critique is the examination of reason by itself, determining
 * its sources, scope, and limits. The critique of pure reason aims to establish what
 * can be known, what we should do, and what we may hope for.
 * 
 * In CAR, the Critique Layer evaluates the outputs of the Reason Layer, assessing confidence,
 * uncertainty, limitations, and engaging in metacognitive reflection on the system's
 * own reasoning processes. This ensures the system maintains epistemic humility and
 * avoids making claims beyond what can be justified.
 */

import {
  ProcessedData,
  EpistemicAnalysis,
  UncertaintyAnalysis,
  MetacognitiveReflection,
  ConfidenceLevel,
  Inference
} from './interfaces';

/**
 * Configuration options for the Critique Layer
 */
export interface CritiqueLayerOptions {
  /** Epistemic analysis settings */
  epistemicAnalysis?: {
    /** Enable detection of knowledge boundaries */
    enableBoundaryDetection?: boolean;
    
    /** Enable detection of domain-specific limitations */
    enableDomainLimitations?: boolean;
    
    /** Enable detection of structural limitations */
    enableStructuralLimitations?: boolean;
    
    /** Enable detection of temporal limitations */
    enableTemporalLimitations?: boolean;
  };
  
  /** Uncertainty quantification settings */
  uncertaintyQuantification?: {
    /** Enable statistical uncertainty assessment */
    enableStatisticalUncertainty?: boolean;
    
    /** Enable model uncertainty assessment */
    enableModelUncertainty?: boolean;
    
    /** Enable distributional uncertainty assessment */
    enableDistributionalUncertainty?: boolean;
    
    /** Enable out-of-distribution detection */
    enableOutOfDistributionDetection?: boolean;
  };
  
  /** Metacognitive reflection settings */
  metacognitiveReflection?: {
    /** Enable reasoning process reflection */
    enableReasoningReflection?: boolean;
    
    /** Enable inference quality assessment */
    enableInferenceQuality?: boolean;
    
    /** Enable confidence calibration */
    enableConfidenceCalibration?: boolean;
    
    /** Enable bias detection */
    enableBiasDetection?: boolean;
  };
  
  /** Confidence calibration settings */
  confidence?: {
    /** Thresholds for confidence levels */
    thresholds?: {
      /** Threshold for very high confidence (default: 0.9) */
      veryHigh?: number;
      
      /** Threshold for high confidence (default: 0.75) */
      high?: number;
      
      /** Threshold for medium confidence (default: 0.5) */
      medium?: number;
      
      /** Threshold for low confidence (default: 0.25) */
      low?: number;
    };
    
    /** Whether to use calibrated confidence */
    useCalibratedConfidence?: boolean;
  };
}

/**
 * Critique Layer class - implements Kant's critical philosophy
 */
export class CritiqueLayer {
  private options: CritiqueLayerOptions;
  
  /**
   * Initialize the Critique Layer with optional configuration
   */
  constructor(options?: CritiqueLayerOptions) {
    this.options = {
      epistemicAnalysis: {
        enableBoundaryDetection: options?.epistemicAnalysis?.enableBoundaryDetection ?? true,
        enableDomainLimitations: options?.epistemicAnalysis?.enableDomainLimitations ?? true,
        enableStructuralLimitations: options?.epistemicAnalysis?.enableStructuralLimitations ?? true,
        enableTemporalLimitations: options?.epistemicAnalysis?.enableTemporalLimitations ?? true
      },
      uncertaintyQuantification: {
        enableStatisticalUncertainty: options?.uncertaintyQuantification?.enableStatisticalUncertainty ?? true,
        enableModelUncertainty: options?.uncertaintyQuantification?.enableModelUncertainty ?? true,
        enableDistributionalUncertainty: options?.uncertaintyQuantification?.enableDistributionalUncertainty ?? true,
        enableOutOfDistributionDetection: options?.uncertaintyQuantification?.enableOutOfDistributionDetection ?? true
      },
      metacognitiveReflection: {
        enableReasoningReflection: options?.metacognitiveReflection?.enableReasoningReflection ?? true,
        enableInferenceQuality: options?.metacognitiveReflection?.enableInferenceQuality ?? true,
        enableConfidenceCalibration: options?.metacognitiveReflection?.enableConfidenceCalibration ?? true,
        enableBiasDetection: options?.metacognitiveReflection?.enableBiasDetection ?? true
      },
      confidence: {
        thresholds: {
          veryHigh: options?.confidence?.thresholds?.veryHigh ?? 0.9,
          high: options?.confidence?.thresholds?.high ?? 0.75,
          medium: options?.confidence?.thresholds?.medium ?? 0.5,
          low: options?.confidence?.thresholds?.low ?? 0.25
        },
        useCalibratedConfidence: options?.confidence?.useCalibratedConfidence ?? true
      }
    };
  }
  
  /**
   * Process data through the Critique Layer (Kant's critical philosophy)
   * 
   * @param data Processed data from the Reason Layer
   * @returns Critique analysis including epistemic limitations, uncertainty, and metacognition
   */
  public process(data: ProcessedData): EpistemicAnalysis {
    // Extract the reasoning results from the Reason Layer
    const reasoningResults = data.raw;
    const inferences = reasoningResults.inferences || [];
    const ethicalAnalysis = reasoningResults.ethicalAnalysis;
    const proposedAction = reasoningResults.proposedAction;
    const reasoning = reasoningResults.reasoning;
    
    // Get the previous data from the Understanding Layer
    const categorizedData = data.raw.previousData?.categorizedData;
    
    // Perform epistemic analysis to identify limitations and boundaries
    const epistemicLimits = this.detectEpistemicLimits(
      inferences, 
      categorizedData, 
      data.metadata
    );
    
    // Quantify uncertainty in the inferences and decision
    const uncertainty = this.quantifyUncertainty(
      inferences, 
      proposedAction, 
      reasoning, 
      epistemicLimits
    );
    
    // Perform metacognitive reflection on the reasoning process
    const metacognition = this.metacognitiveReflection(
      inferences, 
      proposedAction, 
      reasoning, 
      ethicalAnalysis, 
      epistemicLimits, 
      uncertainty
    );
    
    // Return the complete epistemic analysis
    return {
      limitations: epistemicLimits,
      confidence: metacognition.confidence,
      uncertaintyFactors: uncertainty.factors,
      metacognitiveReflection: metacognition.reflections
    };
  }
  
  /**
   * Detect epistemic limits in the reasoning
   * This represents Kant's critique of the limits of knowledge
   * 
   * @param inferences Inferences generated by the Reason Layer
   * @param categorizedData Data processed through the Understanding Layer
   * @param metadata Metadata about the processing history
   * @returns Array of identified epistemic limitations
   */
  private detectEpistemicLimits(
    inferences: Inference[],
    categorizedData: any,
    metadata: any
  ): string[] {
    const limitations: string[] = [];
    
    // Boundary detection - identifying when reasoning attempts to extend beyond experience
    if (this.options.epistemicAnalysis!.enableBoundaryDetection) {
      const boundaryLimitations = this.detectBoundaries(inferences, categorizedData);
      limitations.push(...boundaryLimitations);
    }
    
    // Domain-specific limitations
    if (this.options.epistemicAnalysis!.enableDomainLimitations) {
      const domainLimitations = this.detectDomainLimitations(inferences, categorizedData);
      limitations.push(...domainLimitations);
    }
    
    // Structural limitations in the data or reasoning
    if (this.options.epistemicAnalysis!.enableStructuralLimitations) {
      const structuralLimitations = this.detectStructuralLimitations(inferences, categorizedData);
      limitations.push(...structuralLimitations);
    }
    
    // Temporal limitations - limitations related to time or sequence
    if (this.options.epistemicAnalysis!.enableTemporalLimitations) {
      const temporalLimitations = this.detectTemporalLimitations(inferences, categorizedData);
      limitations.push(...temporalLimitations);
    }
    
    // Processing limitations - limits based on the processing history
    const processingLimitations = this.detectProcessingLimitations(metadata);
    limitations.push(...processingLimitations);
    
    // Inference quality limitations - limitations based on the quality of inferences
    const inferenceQualityLimitations = this.detectInferenceQualityLimitations(inferences);
    limitations.push(...inferenceQualityLimitations);
    
    // If no limitations were detected, add a cautionary note
    if (limitations.length === 0) {
      limitations.push("No specific limitations detected, but all reasoning inherently has limits");
    }
    
    // Remove any duplicates
    return [...new Set(limitations)];
  }
  
  /**
   * Detect when reasoning attempts to extend beyond the boundaries of experience
   * This corresponds to Kant's concept of transcendental illusion
   */
  private detectBoundaries(inferences: Inference[], categorizedData: any): string[] {
    const boundaries: string[] = [];
    
    // Check for inferences about metaphysical concepts
    const metaphysicalConcepts = [
      'consciousness', 'free will', 'soul', 'God', 'infinite',
      'absolute', 'unconditioned', 'thing-in-itself', 'noumena'
    ];
    
    inferences.forEach(inference => {
      const inferenceText = inference.inference.toLowerCase();
      
      metaphysicalConcepts.forEach(concept => {
        if (inferenceText.includes(concept.toLowerCase())) {
          boundaries.push(`Inference about '${concept}' exceeds boundaries of possible experience`);
        }
      });
    });
    
    // Check for totalizing claims or universal assertions
    inferences.forEach(inference => {
      const inferenceText = inference.inference.toLowerCase();
      
      if (
        inferenceText.includes('always') ||
        inferenceText.includes('never') ||
        inferenceText.includes('all cases') ||
        inferenceText.includes('without exception') ||
        inferenceText.includes('absolutely') ||
        inferenceText.includes('universally')
      ) {
        boundaries.push("Universal assertions may extend beyond available evidence");
      }
    });
    
    // Check for necessary existence claims
    inferences.forEach(inference => {
      const inferenceText = inference.inference.toLowerCase();
      
      if (
        inferenceText.includes('must exist') ||
        inferenceText.includes('necessarily exists') ||
        inferenceText.includes('must be') && inferenceText.includes('exist')
      ) {
        boundaries.push("Claims about necessary existence exceed empirical knowledge");
      }
    });
    
    // Check for claims about ultimate causes or first principles
    inferences.forEach(inference => {
      const inferenceText = inference.inference.toLowerCase();
      
      if (
        inferenceText.includes('ultimate cause') ||
        inferenceText.includes('first cause') ||
        inferenceText.includes('final cause') ||
        inferenceText.includes('fundamental principle')
      ) {
        boundaries.push("Reasoning about ultimate causes extends beyond possible experience");
      }
    });
    
    return boundaries;
  }
  
  /**
   * Detect domain-specific limitations in the reasoning
   */
  private detectDomainLimitations(inferences: Inference[], categorizedData: any): string[] {
    const limitations: string[] = [];
    
    // Detect the domain(s) present in the inferences
    const domains = this.identifyDomains(inferences);
    
    // Add domain-specific limitations
    domains.forEach(domain => {
      switch (domain) {
        case 'healthcare':
          limitations.push(...this.detectHealthcareLimitations(inferences, categorizedData));
          break;
        
        case 'education':
          limitations.push(...this.detectEducationLimitations(inferences, categorizedData));
          break;
        
        case 'finance':
          limitations.push(...this.detectFinanceLimitations(inferences, categorizedData));
          break;
        
        case 'governance':
          limitations.push(...this.detectGovernanceLimitations(inferences, categorizedData));
          break;
          
        case 'science':
          limitations.push(...this.detectScienceLimitations(inferences, categorizedData));
          break;
      }
    });
    
    return limitations;
  }
  
  /**
   * Detect healthcare-specific limitations
   */
  private detectHealthcareLimitations(inferences: Inference[], categorizedData: any): string[] {
    const limitations: string[] = [];
    
    // Check for diagnostic inferences without comprehensive data
    const diagnosticInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('diagnos') ||
      inf.inference.toLowerCase().includes('condition') ||
      inf.inference.toLowerCase().includes('disease') ||
      inf.inference.toLowerCase().includes('patient')
    );
    
    if (diagnosticInferences.length > 0) {
      // Check if we have sufficient clinical data
      const hasSufficientClinicalData = this.checkForClinicalData(categorizedData);
      
      if (!hasSufficientClinicalData) {
        limitations.push("Limited clinical data for comprehensive diagnosis");
      }
      
      // Check if laboratory confirmation would be needed
      const mentionsLabTests = diagnosticInferences.some(inf => 
        inf.inference.toLowerCase().includes('lab') ||
        inf.inference.toLowerCase().includes('test')
      );
      
      if (!mentionsLabTests) {
        limitations.push("Diagnostic inference without laboratory confirmation");
      }
      
      // Check for patient-specific factors
      limitations.push("Individual patient factors may influence diagnosis and treatment");
    }
    
    // Check for treatment recommendations without full medical history
    const treatmentInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('treat') ||
      inf.inference.toLowerCase().includes('therap') ||
      inf.inference.toLowerCase().includes('medicat') ||
      inf.inference.toLowerCase().includes('intervention')
    );
    
    if (treatmentInferences.length > 0) {
      limitations.push("Treatment recommendations require complete medical history and individual assessment");
      limitations.push("Treatment efficacy varies based on individual patient factors");
    }
    
    return limitations;
  }
  
  /**
   * Detect education-specific limitations
   */
  private detectEducationLimitations(inferences: Inference[], categorizedData: any): string[] {
    const limitations: string[] = [];
    
    // Check for learning outcome inferences without comprehensive educational data
    const learningInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('learn') ||
      inf.inference.toLowerCase().includes('student') ||
      inf.inference.toLowerCase().includes('academic') ||
      inf.inference.toLowerCase().includes('education')
    );
    
    if (learningInferences.length > 0) {
      limitations.push("Educational outcomes are influenced by numerous factors beyond measured variables");
      limitations.push("Individual learning styles and needs affect educational effectiveness");
    }
    
    // Check for curriculum or pedagogical recommendations
    const curriculumInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('curricul') ||
      inf.inference.toLowerCase().includes('teach') ||
      inf.inference.toLowerCase().includes('pedagog') ||
      inf.inference.toLowerCase().includes('instruction')
    );
    
    if (curriculumInferences.length > 0) {
      limitations.push("Educational approaches must be adapted to specific contexts and populations");
      limitations.push("Pedagogical effectiveness depends on implementation quality and educator skill");
    }
    
    return limitations;
  }
  
  /**
   * Detect finance-specific limitations
   */
  private detectFinanceLimitations(inferences: Inference[], categorizedData: any): string[] {
    const limitations: string[] = [];
    
    // Check for predictive financial inferences
    const financialPredictions = inferences.filter(inf => 
      (inf.inference.toLowerCase().includes('market') ||
       inf.inference.toLowerCase().includes('financ') ||
       inf.inference.toLowerCase().includes('invest') ||
       inf.inference.toLowerCase().includes('econom')) &&
      (inf.inference.toLowerCase().includes('will') ||
       inf.inference.toLowerCase().includes('predict') ||
       inf.inference.toLowerCase().includes('forecast') ||
       inf.inference.toLowerCase().includes('future'))
    );
    
    if (financialPredictions.length > 0) {
      limitations.push("Financial markets are influenced by unpredictable factors and emergent behaviors");
      limitations.push("Past financial performance does not guarantee future results");
    }
    
    // Check for investment or risk assessment inferences
    const investmentInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('invest') ||
      inf.inference.toLowerCase().includes('risk') ||
      inf.inference.toLowerCase().includes('return') ||
      inf.inference.toLowerCase().includes('portfolio')
    );
    
    if (investmentInferences.length > 0) {
      limitations.push("Investment recommendations must be tailored to individual risk tolerance and goals");
      limitations.push("Financial analysis limited by available data and market uncertainty");
    }
    
    return limitations;
  }
  
  /**
   * Detect governance-specific limitations
   */
  private detectGovernanceLimitations(inferences: Inference[], categorizedData: any): string[] {
    const limitations: string[] = [];
    
    // Check for policy or governance inferences
    const policyInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('policy') ||
      inf.inference.toLowerCase().includes('govern') ||
      inf.inference.toLowerCase().includes('regulat') ||
      inf.inference.toLowerCase().includes('public') &&
      inf.inference.toLowerCase().includes('administration')
    );
    
    if (policyInferences.length > 0) {
      limitations.push("Policy effectiveness depends on implementation and contextual factors");
      limitations.push("Governance approaches must account for diverse stakeholder perspectives");
      limitations.push("Policy recommendations limited by available data on complex social systems");
    }
    
    // Check for ethical or normative governance claims
    const normativeInferences = inferences.filter(inf => 
      (inf.inference.toLowerCase().includes('should') ||
       inf.inference.toLowerCase().includes('ought') ||
       inf.inference.toLowerCase().includes('must') ||
       inf.inference.toLowerCase().includes('ideal')) &&
      (inf.inference.toLowerCase().includes('policy') ||
       inf.inference.toLowerCase().includes('govern') ||
       inf.inference.toLowerCase().includes('public'))
    );
    
    if (normativeInferences.length > 0) {
      limitations.push("Normative governance recommendations involve value judgments beyond empirical analysis");
      limitations.push("Ethical dimensions of policy require democratic deliberation");
    }
    
    return limitations;
  }
  
  /**
   * Detect science-specific limitations
   */
  private detectScienceLimitations(inferences: Inference[], categorizedData: any): string[] {
    const limitations: string[] = [];
    
    // Check for scientific claims
    const scientificInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('scientif') ||
      inf.inference.toLowerCase().includes('experiment') ||
      inf.inference.toLowerCase().includes('hypothesis') ||
      inf.inference.toLowerCase().includes('theory') ||
      inf.inference.toLowerCase().includes('data analysis')
    );
    
    if (scientificInferences.length > 0) {
      limitations.push("Scientific conclusions require empirical validation and peer review");
      limitations.push("Scientific understanding evolves with new evidence and methodologies");
    }
    
    // Check for causal scientific claims
    const causalScientificInferences = inferences.filter(inf => 
      inf.type === 'causal' &&
      (inf.inference.toLowerCase().includes('scientif') ||
       inf.inference.toLowerCase().includes('experiment') ||
       inf.inference.toLowerCase().includes('research'))
    );
    
    if (causalScientificInferences.length > 0) {
      limitations.push("Causal scientific claims require controlled experiments or robust causal inference methods");
      limitations.push("Correlation alone does not establish scientific causation");
    }
    
    return limitations;
  }
  
  /**
   * Detect structural limitations in the data or reasoning
   */
  private detectStructuralLimitations(inferences: Inference[], categorizedData: any): string[] {
    const limitations: string[] = [];
    
    // Check for missing data or incomplete information
    if (categorizedData && categorizedData.totality) {
      if (categorizedData.totality.completeness < 0.8) {
        limitations.push(`Incomplete data: only ${Math.round(categorizedData.totality.completeness * 100)}% of expected aspects present`);
      }
      
      if (categorizedData.totality.missingElements && categorizedData.totality.missingElements.length > 0) {
        if (categorizedData.totality.missingElements.length <= 3) {
          limitations.push(`Missing data elements: ${categorizedData.totality.missingElements.join(', ')}`);
        } else {
          limitations.push(`Multiple missing data elements (${categorizedData.totality.missingElements.length} total)`);
        }
      }
    }
    
    // Check inference confidence distribution
    const confidences = inferences.map(inf => inf.confidence);
    if (confidences.length > 0) {
      const avgConfidence = confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length;
      
      if (avgConfidence < 0.6) {
        limitations.push(`Limited confidence in inferences (average: ${avgConfidence.toFixed(2)})`);
      }
      
      // Check for wide variance in confidence
      if (confidences.length > 1) {
        const minConf = Math.min(...confidences);
        const maxConf = Math.max(...confidences);
        
        if (maxConf - minConf > 0.4) {
          limitations.push("High variance in inference confidence suggests structural uncertainty");
        }
      }
    }
    
    // Check for adequate justification (evidence)
    const weaklyJustifiedInferences = inferences.filter(inf => 
      !inf.evidence || inf.evidence.length === 0 || 
      (inf.confidence > 0.7 && inf.evidence.length < 2)
    );
    
    if (weaklyJustifiedInferences.length > 0) {
      limitations.push(`${weaklyJustifiedInferences.length} inferences have limited evidential support`);
    }
    
    // Check for contradictions between inferences
    const contradictions = this.detectContradictions(inferences);
    if (contradictions.length > 0) {
      limitations.push(`Detected ${contradictions.length} potential contradictions between inferences`);
    }
    
    return limitations;
  }
  
  /**
   * Detect temporal limitations related to time or sequence
   */
  private detectTemporalLimitations(inferences: Inference[], categorizedData: any): string[] {
    const limitations: string[] = [];
    
    // Check for temporal currency of information
    const hasTemporal = this.hasTemporalInformation(categorizedData);
    if (!hasTemporal) {
      limitations.push("Temporal context of data is unclear or missing");
    }
    
    // Check for predictive inferences
    const predictiveInferences = inferences.filter(inf => inf.type === 'predictive');
    if (predictiveInferences.length > 0) {
      limitations.push("Predictive inferences become less reliable with longer time horizons");
      
      // Check if predictions include factors that may change
      const dynamicFactorPresent = predictiveInferences.some(inf => 
        inf.inference.toLowerCase().includes('market') ||
        inf.inference.toLowerCase().includes('economy') ||
        inf.inference.toLowerCase().includes('politics') ||
        inf.inference.toLowerCase().includes('behav') ||
        inf.inference.toLowerCase().includes('evolve') ||
        inf.inference.toLowerCase().includes('change')
      );
      
      if (dynamicFactorPresent) {
        limitations.push("Predictions involve dynamic factors that may change in unpredictable ways");
      }
    }
    
    // Check for historical inferences without adequate temporal context
    const historicalInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('histor') ||
      inf.inference.toLowerCase().includes('past') ||
      inf.inference.toLowerCase().includes('previous') ||
      inf.inference.toLowerCase().includes('trend')
    );
    
    if (historicalInferences.length > 0 && !hasTemporal) {
      limitations.push("Historical inferences made without clear temporal context");
    }
    
    // Check for claims about ongoing processes
    const ongoingProcessInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('ongoing') ||
      inf.inference.toLowerCase().includes('continue') ||
      inf.inference.toLowerCase().includes('persist') ||
      inf.inference.toLowerCase().includes('trend')
    );
    
    if (ongoingProcessInferences.length > 0) {
      limitations.push("Ongoing processes may change direction or intensity over time");
    }
    
    return limitations;
  }
  
  /**
   * Detect limitations related to the processing history
   */
  private detectProcessingLimitations(metadata: any): string[] {
    const limitations: string[] = [];
    
    // Check if all expected processing layers were present
    if (metadata && metadata.processingHistory) {
      const expectedLayers = ['sensibilityLayer', 'understandingLayer', 'reasonLayer'];
      
      expectedLayers.forEach(layer => {
        if (!metadata.processingHistory.includes(layer)) {
          limitations.push(`Processing limitation: ${layer} was skipped or incomplete`);
        }
      });
    }
    
    return limitations;
  }
  
  /**
   * Detect limitations related to the quality of inferences
   */
  private detectInferenceQualityLimitations(inferences: Inference[]): string[] {
    const limitations: string[] = [];
    
    if (inferences.length === 0) {
      limitations.push("No inferences were generated, severely limiting conclusions");
      return limitations;
    }
    
    // Check for diversity of inference types
    const inferenceTypes = new Set(inferences.map(inf => inf.type));
    if (inferenceTypes.size < 3 && inferences.length > 2) {
      limitations.push(`Limited diversity of reasoning: only ${inferenceTypes.size} inference types present`);
    }
    
    // Check for strong counterevidence
    const inferencesWithCounterEvidence = inferences.filter(inf => 
      inf.counterevidence && inf.counterevidence.length > 0
    );
    
    if (inferencesWithCounterEvidence.length > 0) {
      limitations.push(`${inferencesWithCounterEvidence.length} inferences have notable counterevidence`);
    }
    
    // Check for speculative inferences
    const speculativeInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('may ') ||
      inf.inference.toLowerCase().includes('might ') ||
      inf.inference.toLowerCase().includes('could ') ||
      inf.inference.toLowerCase().includes('possibly') ||
      inf.inference.toLowerCase().includes('perhaps')
    );
    
    if (speculativeInferences.length > inferences.length / 2) {
      limitations.push("Reasoning contains a high proportion of speculative inferences");
    }
    
    return limitations;
  }
  
  /**
   * Quantify uncertainty in the inferences and decision
   * This represents Kant's recognition that knowledge is limited and uncertain
   * 
   * @param inferences Inferences generated by the Reason Layer
   * @param proposedAction The decision generated by the Reason Layer
   * @param reasoning The reasoning supporting the decision
   * @param epistemicLimits Identified epistemic limitations
   * @returns Analysis of uncertainty including factors contributing to uncertainty
   */
  private quantifyUncertainty(
    inferences: Inference[],
    proposedAction: string,
    reasoning: string,
    epistemicLimits: string[]
  ): UncertaintyAnalysis {
    // Initialize uncertainty analysis
    const uncertaintyAnalysis: UncertaintyAnalysis = {
      value: 0.5, // Default to moderate uncertainty
      factors: [],
      distribution: {}
    };
    
    // Calculate statistical uncertainty from inference confidences
    if (this.options.uncertaintyQuantification!.enableStatisticalUncertainty) {
      const statisticalUncertainty = this.calculateStatisticalUncertainty(inferences);
      uncertaintyAnalysis.value = statisticalUncertainty.value;
      uncertaintyAnalysis.factors.push(...statisticalUncertainty.factors);
      
      // Add distribution information
      uncertaintyAnalysis.distribution = {
        ...uncertaintyAnalysis.distribution,
        statistical: statisticalUncertainty.value
      };
    }
    
    // Assess model uncertainty
    if (this.options.uncertaintyQuantification!.enableModelUncertainty) {
      const modelUncertainty = this.calculateModelUncertainty(inferences, reasoning);
      
      // Combine uncertainties (using a reasonable combination rule)
      uncertaintyAnalysis.value = this.combineUncertainties([
        uncertaintyAnalysis.value, 
        modelUncertainty.value
      ]);
      
      uncertaintyAnalysis.factors.push(...modelUncertainty.factors);
      
      // Add distribution information
      uncertaintyAnalysis.distribution = {
        ...uncertaintyAnalysis.distribution,
        model: modelUncertainty.value
      };
    }
    
    // Assess distributional uncertainty
    if (this.options.uncertaintyQuantification!.enableDistributionalUncertainty) {
      const distributionalUncertainty = this.calculateDistributionalUncertainty(inferences);
      
      // Combine uncertainties
      uncertaintyAnalysis.value = this.combineUncertainties([
        uncertaintyAnalysis.value, 
        distributionalUncertainty.value
      ]);
      
      uncertaintyAnalysis.factors.push(...distributionalUncertainty.factors);
      
      // Add distribution information
      uncertaintyAnalysis.distribution = {
        ...uncertaintyAnalysis.distribution,
        distributional: distributionalUncertainty.value
      };
    }
    
    // Assess out-of-distribution uncertainty
    if (this.options.uncertaintyQuantification!.enableOutOfDistributionDetection) {
      const oodUncertainty = this.calculateOutOfDistributionUncertainty(inferences, epistemicLimits);
      
      // Combine uncertainties
      uncertaintyAnalysis.value = this.combineUncertainties([
        uncertainty
