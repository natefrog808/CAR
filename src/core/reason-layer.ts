// Extract healthcare-specific information
        domainInfo.symptoms = this.extractFeatureValues(features, 'symptoms');
        domainInfo.condition = this.extractFeatureValue(features, 'condition');
        domainInfo.treatment = this.extractFeatureValue(features, 'treatment');
      }
      
      // Check for education indicators
      const educationTerms = ['student', 'learn', 'teach', 'education', 'school', 'curriculum', 'academic'];
      const hasEducationTerms = features.some((f: any) => 
        educationTerms.some(term => 
          (f.items && f.items.some((item: string) => item.toLowerCase().includes(term))) ||
          (f.name && f.name.toLowerCase().includes(term))
        )
      );
      
      if (hasEducationTerms) {
        domainInfo.domain = 'education';
        
        // Extract education-specific information
        domainInfo.scores = this.extractFeatureValues(features, 'scores');
        domainInfo.curriculum = this.extractFeatureValue(features, 'curriculum');
        domainInfo.performance = this.extractFeatureValue(features, 'performance');
      }
      
      // Check for finance indicators
      const financeTerms = ['finance', 'invest', 'money', 'market', 'economic', 'fiscal', 'budget'];
      const hasFinanceTerms = features.some((f: any) => 
        financeTerms.some(term => 
          (f.items && f.items.some((item: string) => item.toLowerCase().includes(term))) ||
          (f.name && f.name.toLowerCase().includes(term))
        )
      );
      
      if (hasFinanceTerms) {
        domainInfo.domain = 'finance';
        
        // Extract finance-specific information
        domainInfo.risk = this.extractFeatureValue(features, 'risk');
        domainInfo.returns = this.extractFeatureValues(features, 'returns');
        domainInfo.performance = this.extractFeatureValue(features, 'performance');
      }
      
      // Check for governance indicators
      const governanceTerms = ['governance', 'policy', 'regulation', 'compliance', 'government', 'public'];
      const hasGovernanceTerms = features.some((f: any) => 
        governanceTerms.some(term => 
          (f.items && f.items.some((item: string) => item.toLowerCase().includes(term))) ||
          (f.name && f.name.toLowerCase().includes(term))
        )
      );
      
      if (hasGovernanceTerms) {
        domainInfo.domain = 'governance';
        
        // Extract governance-specific information
        domainInfo.policies = this.extractFeatureValues(features, 'policies');
        domainInfo.compliance = this.extractFeatureValue(features, 'compliance');
        domainInfo.regulations = this.extractFeatureValues(features, 'regulations');
      }
    }
    
    return domainInfo;
  }
  
  /**
   * Extract a feature value from features array
   */
  private extractFeatureValue(features: any[], name: string): string | null {
    const feature = features.find((f: any) => 
      f.name && f.name.toLowerCase() === name.toLowerCase()
    );
    
    if (feature && feature.value) {
      return feature.value;
    }
    
    return null;
  }
  
  /**
   * Extract feature values (array) from features array
   */
  private extractFeatureValues(features: any[], name: string): string[] {
    const feature = features.find((f: any) => 
      f.name && f.name.toLowerCase() === name.toLowerCase()
    );
    
    if (feature && feature.items && Array.isArray(feature.items)) {
      return feature.items;
    }
    
    if (feature && feature.values && Array.isArray(feature.values)) {
      return feature.values;
    }
    
    return [];
  }
  
  /**
   * Find common properties across features
   */
  private findCommonProperties(features: any[]): Record<string, number> {
    const propertyFrequency: Record<string, number> = {};
    const totalFeatures = features.length;
    
    // Count property occurrences
    features.forEach(feature => {
      if (feature.name) {
        propertyFrequency[feature.name] = (propertyFrequency[feature.name] || 0) + 1;
      }
      
      if (feature.type) {
        propertyFrequency[`type:${feature.type}`] = (propertyFrequency[`type:${feature.type}`] || 0) + 1;
      }
    });
    
    // Convert counts to frequencies
    Object.keys(propertyFrequency).forEach(key => {
      propertyFrequency[key] = propertyFrequency[key] / totalFeatures;
    });
    
    // Filter for properties that appear in at least 50% of features
    return Object.fromEntries(
      Object.entries(propertyFrequency).filter(([_, frequency]) => frequency >= 0.5)
    );
  }
  
  /**
   * Infer the most likely explanation for an unexplained entity
   */
  private inferMostLikelyExplanation(entity: any, categorizedData: CategorizedData): {
    explanation: string;
    confidence: number;
    evidence: string[];
    counterevidence: string[];
  } | null {
    // Check if we have causal information that might explain the entity
    if (categorizedData.causality && categorizedData.causality.causalRelationships) {
      const relatedCauses = categorizedData.causality.causalRelationships.filter(rel => 
        rel.effect.includes(entity.name) || entity.name.includes(rel.effect)
      );
      
      if (relatedCauses.length > 0) {
        // Sort by confidence and strength
        const mostLikelyCause = relatedCauses.sort((a, b) => 
          (b.confidence * b.strength) - (a.confidence * a.strength)
        )[0];
        
        return {
          explanation: mostLikelyCause.cause,
          confidence: mostLikelyCause.confidence * 0.9, // Slightly lower for abduction
          evidence: [`Causal relationship with strength ${mostLikelyCause.strength}`],
          counterevidence: ['Causal relationship does not guarantee explanation']
        };
      }
    }
    
    // Check for necessity relationships
    if (categorizedData.necessity && categorizedData.necessity.necessityDetails) {
      const relatedNecessities = categorizedData.necessity.necessityDetails.filter(nec => 
        nec.implications.some(imp => imp.includes(entity.name) || entity.name.includes(imp))
      );
      
      if (relatedNecessities.length > 0) {
        const mostLikelyNecessity = relatedNecessities.sort((a, b) => 
          b.confidence - a.confidence
        )[0];
        
        return {
          explanation: mostLikelyNecessity.condition,
          confidence: mostLikelyNecessity.confidence * 0.8, // Lower for necessity-based explanation
          evidence: mostLikelyNecessity.implications,
          counterevidence: ['Necessary conditions are not always explanatory']
        };
      }
    }
    
    // Check for domain-specific explanations
    const domainInfo = this.extractDomainInformation(categorizedData, null);
    
    if (domainInfo.domain === 'healthcare' && entity.name.toLowerCase().includes('symptom')) {
      return {
        explanation: 'Medical condition consistent with the symptom profile',
        confidence: 0.6,
        evidence: ['Symptom pattern recognition'],
        counterevidence: ['Multiple conditions can cause similar symptoms']
      };
    }
    
    // If no specific explanation found
    return null;
  }
  
  /**
   * Extract an outcome statement from an inference
   */
  private extractOutcomeFromInference(inference: string): string {
    // Look for outcomes in predictive statements
    const futureMatch = inference.match(/will\s+(.+)/i) ||
                      inference.match(/likely\s+to\s+(.+)/i) ||
                      inference.match(/expect.*\s+(.+)/i) ||
                      inference.match(/future\s+(.+)/i);
    
    if (futureMatch) {
      return futureMatch[1].trim();
    }
    
    // For state descriptions, use the full inference
    return inference;
  }
  
  /**
   * Extract a conclusion from a deductive inference
   */
  private extractConclusionFromInference(inference: string): string {
    // Look for "therefore" or "it follows that" patterns
    const conclusionMatch = inference.match(/therefore\s+(.+)/i) ||
                          inference.match(/it follows that\s+(.+)/i) ||
                          inference.match(/must\s+(.+)/i) ||
                          inference.match(/necessarily\s+(.+)/i);
    
    if (conclusionMatch) {
      return conclusionMatch[1].trim();
    }
    
    // For other patterns, try to find the conclusion after certain phrases
    const patternMatch = inference.match(/given.+,\s+(.+)/i) ||
                        inference.match(/if.+,\s+then\s+(.+)/i);
    
    if (patternMatch) {
      return patternMatch[1].trim();
    }
    
    // Default to the full inference
    return inference;
  }
  
  /**
   * Extract a pattern from an inductive inference
   */
  private extractPatternFromInference(inference: string): string {
    // Look for percentage or frequency patterns
    const percentMatch = inference.match(/(\d+)%\s+of\s+(.+)/i);
    
    if (percentMatch) {
      return `${percentMatch[1]}% of cases show ${percentMatch[2].trim()}`;
    }
    
    // Look for "typically" or "tend to" patterns
    const tendencyMatch = inference.match(/typically\s+(.+)/i) ||
                         inference.match(/tend\s+to\s+(.+)/i) ||
                         inference.match(/usually\s+(.+)/i) ||
                         inference.match(/commonly\s+(.+)/i);
    
    if (tendencyMatch) {
      return tendencyMatch[1].trim();
    }
    
    // Default to the full inference
    return inference;
  }
  
  /**
   * Extract an explanation from an abductive inference
   */
  private extractExplanationFromInference(inference: string): string {
    // Look for "best explained by" or similar patterns
    const explanationMatch = inference.match(/best explained by\s+(.+)/i) ||
                           inference.match(/most likely explanation\s+(.+)/i) ||
                           inference.match(/most likely cause\s+(.+)/i) ||
                           inference.match(/probable reason\s+(.+)/i);
    
    if (explanationMatch) {
      return explanationMatch[1].trim();
    }
    
    // For other patterns, look for explanation after a colon
    const colonMatch = inference.match(/explanation:\s+(.+)/i) ||
                      inference.match(/cause:\s+(.+)/i);
    
    if (colonMatch) {
      return colonMatch[1].trim();
    }
    
    // Default to the full inference
    return inference;
  }
  
  /**
   * Find a different inference type than the one provided
   */
  private findDifferentInferenceType(currentType: InferenceType): InferenceType {
    const types: InferenceType[] = [
      'causal', 'structural', 'predictive', 'deductive', 'domain-specific'
    ];
    
    const availableTypes = types.filter(type => type !== currentType);
    
    // Return a random alternative type
    return availableTypes[Math.floor(Math.random() * availableTypes.length)];
  }
  
  /**
   * Check if two actions are equivalent (to avoid duplicate alternatives)
   */
  private areActionsEquivalent(action1: string, action2: string): boolean {
    // Normalize both actions (remove punctuation, lowercase, etc.)
    const normalize = (action: string): string => {
      return action.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };
    
    const normalizedAction1 = normalize(action1);
    const normalizedAction2 = normalize(action2);
    
    // Check for exact match
    if (normalizedAction1 === normalizedAction2) {
      return true;
    }
    
    // Check if one is a subset of the other
    if (normalizedAction1.includes(normalizedAction2) || normalizedAction2.includes(normalizedAction1)) {
      return true;
    }
    
    // Consider actions equivalent if they share more than 80% of their words
    const words1 = normalizedAction1.split(" ");
    const words2 = normalizedAction2.split(" ");
    
    const commonWords = words1.filter(word => words2.includes(word));
    const similarity = commonWords.length / Math.max(words1.length, words2.length);
    
    return similarity > 0.8;
  }
  
  /**
   * Capitalize the first letter of a string
   */
  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}    // Count occurrences of each inference type
    const typeCounts: Record<InferenceType, number> = {
      'causal': 0,
      'structural': 0,
      'predictive': 0,
      'analogical': 0,
      'deductive': 0,
      'inductive': 0,
      'abductive': 0,
      'ethical': 0,
      'practical': 0,
      'domain-specific': 0,
      'general': 0
    };
    
    inferences.forEach(inference => {
      typeCounts[inference.type] = (typeCounts[inference.type] || 0) + 1;
    });
    
    // Determine primary and secondary types
    let primaryType: InferenceType = 'general';
    let primaryCount = 0;
    let secondaryType: InferenceType | null = null;
    let secondaryCount = 0;
    
    Object.entries(typeCounts).forEach(([type, count]) => {
      if (count > primaryCount) {
        secondaryType = primaryType;
        secondaryCount = primaryCount;
        primaryType = type as InferenceType;
        primaryCount = count;
      } else if (count > secondaryCount) {
        secondaryType = type as InferenceType;
        secondaryCount = count;
      }
    });
    
    // If no secondary type found, set to null
    if (secondaryCount === 0) {
      secondaryType = null;
    }
    
    return {
      primaryType,
      secondaryType,
      typeDistribution: typeCounts
    };
  }
  
  /**
   * Identify ethical concerns that should influence the decision
   */
  private identifyEthicalConcerns(ethicalAnalysis: EthicalAnalysis): {
    hasConcerns: boolean;
    concerns: string[];
    severity: 'high' | 'medium' | 'low';
  } {
    const concerns: string[] = [];
    
    // Check autonomy implications
    if (ethicalAnalysis.autonomyImplications.includes('concern') ||
        ethicalAnalysis.autonomyImplications.includes('limit') ||
        ethicalAnalysis.autonomyImplications.includes('restrict')) {
      concerns.push(`Autonomy: ${ethicalAnalysis.autonomyImplications}`);
    }
    
    // Check non-maleficence risks
    if (ethicalAnalysis.nonMaleficenceRisks.length > 0) {
      ethicalAnalysis.nonMaleficenceRisks.forEach(risk => {
        concerns.push(`Harm risk: ${risk}`);
      });
    }
    
    // Check justice considerations
    if (ethicalAnalysis.justiceConsiderations.includes('concern') ||
        ethicalAnalysis.justiceConsiderations.includes('unfair') ||
        ethicalAnalysis.justiceConsiderations.includes('inequit') ||
        ethicalAnalysis.justiceConsiderations.includes('disparit')) {
      concerns.push(`Justice: ${ethicalAnalysis.justiceConsiderations}`);
    }
    
    // Check additional ethical frameworks
    if (ethicalAnalysis.additionalConsiderations) {
      Object.entries(ethicalAnalysis.additionalConsiderations).forEach(([framework, assessment]) => {
        if (assessment.includes('concern') ||
            assessment.includes('negative') ||
            assessment.includes('violation')) {
          concerns.push(`${framework}: ${assessment}`);
        }
      });
    }
    
    // Determine severity based on number and content of concerns
    let severity: 'high' | 'medium' | 'low' = 'low';
    
    if (concerns.length > 3) {
      severity = 'high';
    } else if (concerns.length > 1) {
      severity = 'medium';
    }
    
    // Upgrade severity if particularly serious concerns are present
    if (concerns.some(concern => 
      concern.includes('serious') || 
      concern.includes('severe') || 
      concern.includes('significant') ||
      concern.includes('high risk'))) {
      severity = 'high';
    }
    
    return {
      hasConcerns: concerns.length > 0,
      concerns,
      severity
    };
  }
  
  /**
   * Formulate the primary decision based on inferences and ethical considerations
   */
  private formulatePrimaryDecision(
    inferences: Inference[],
    inferenceTypes: { primaryType: InferenceType; secondaryType: InferenceType | null; typeDistribution: Record<InferenceType, number> },
    ethicalConcerns: { hasConcerns: boolean; concerns: string[]; severity: 'high' | 'medium' | 'low' },
    categorizedData: CategorizedData
  ): {
    action: string;
    reasoning: string;
    confidence: number;
  } {
    // Start with a default decision and confidence
    let action = "Further analysis recommended";
    let reasoning = "Based on available data, a definitive decision cannot be made.";
    let confidence = 0.5;
    
    // Get the strongest inference (highest confidence)
    const strongestInference = inferences.sort((a, b) => b.confidence - a.confidence)[0];
    
    // Base decision on inference types and ethical concerns
    switch (inferenceTypes.primaryType) {
      case 'causal':
        action = this.formulateCausalDecision(inferences, strongestInference);
        reasoning = `Causal analysis indicates that ${action}`;
        confidence = strongestInference.confidence * 0.9; // Slightly reduce confidence for decision
        break;
        
      case 'predictive':
        action = this.formulatePredictiveDecision(inferences, strongestInference);
        reasoning = `Predictive analysis suggests that ${action}`;
        confidence = strongestInference.confidence * 0.8; // Reduce confidence further for predictions
        break;
        
      case 'structural':
        action = this.formulateStructuralDecision(inferences, strongestInference, categorizedData);
        reasoning = `Structural analysis indicates that ${action}`;
        confidence = strongestInference.confidence * 0.85;
        break;
        
      case 'domain-specific':
        action = this.formulateDomainSpecificDecision(inferences, strongestInference, categorizedData);
        reasoning = `Domain-specific analysis suggests that ${action}`;
        confidence = strongestInference.confidence * 0.9;
        break;
        
      case 'deductive':
      case 'inductive':
      case 'abductive':
        action = this.formulateLogicalDecision(inferences, strongestInference, inferenceTypes.primaryType);
        reasoning = `${this.capitalizeFirstLetter(inferenceTypes.primaryType)} reasoning leads to the conclusion that ${action}`;
        confidence = strongestInference.confidence * 0.85;
        break;
        
      case 'analogical':
        action = this.formulateAnalogicalDecision(inferences, strongestInference);
        reasoning = `Based on analogical reasoning, ${action}`;
        confidence = strongestInference.confidence * 0.7; // Lower confidence for analogical reasoning
        break;
        
      default:
        // Keep default action and reasoning
        break;
    }
    
    // If we have a secondary inference type, incorporate it
    if (inferenceTypes.secondaryType) {
      reasoning += ` with supporting ${inferenceTypes.secondaryType} considerations`;
    }
    
    // Incorporate ethical concerns into the decision
    if (ethicalConcerns.hasConcerns) {
      // Modify the action based on ethical concerns
      action = this.modifyActionForEthicalConcerns(action, ethicalConcerns);
      
      // Add ethical reasoning to the explanation
      reasoning += `. Ethical considerations include: ${ethicalConcerns.concerns[0]}`;
      if (ethicalConcerns.concerns.length > 1) {
        reasoning += ` and ${ethicalConcerns.concerns.length - 1} other concern(s)`;
      }
      
      // Adjust confidence based on ethical concerns severity
      switch (ethicalConcerns.severity) {
        case 'high':
          confidence *= 0.7; // Significant reduction for serious ethical concerns
          break;
        case 'medium':
          confidence *= 0.85; // Moderate reduction
          break;
        case 'low':
          confidence *= 0.95; // Minor reduction
          break;
      }
    }
    
    // Ensure confidence stays within bounds
    confidence = Math.max(0.3, Math.min(confidence, 0.95));
    
    return {
      action,
      reasoning,
      confidence
    };
  }
  
  /**
   * Generate alternative decisions
   */
  private generateAlternativeDecisions(
    inferences: Inference[],
    inferenceTypes: { primaryType: InferenceType; secondaryType: InferenceType | null; typeDistribution: Record<InferenceType, number> },
    ethicalConcerns: { hasConcerns: boolean; concerns: string[]; severity: 'high' | 'medium' | 'low' },
    primaryAction: string,
    categorizedData: CategorizedData
  ): string[] {
    const alternatives: string[] = [];
    
    // Generate one alternative that prioritizes caution
    alternatives.push(`Proceed with caution: gather more information before fully committing to action`);
    
    // Generate an alternative based on a different inference type
    const secondaryType = inferenceTypes.secondaryType || this.findDifferentInferenceType(inferenceTypes.primaryType);
    
    if (secondaryType) {
      // Get inferences of the secondary type
      const secondaryInferences = inferences.filter(inf => inf.type === secondaryType);
      
      if (secondaryInferences.length > 0) {
        // Use the strongest secondary inference
        const strongestSecondaryInference = secondaryInferences.sort((a, b) => b.confidence - a.confidence)[0];
        
        let secondaryAction = "";
        
        switch (secondaryType) {
          case 'causal':
            secondaryAction = this.formulateCausalDecision(secondaryInferences, strongestSecondaryInference);
            break;
            
          case 'predictive':
            secondaryAction = this.formulatePredictiveDecision(secondaryInferences, strongestSecondaryInference);
            break;
            
          case 'structural':
            secondaryAction = this.formulateStructuralDecision(secondaryInferences, strongestSecondaryInference, categorizedData);
            break;
            
          case 'domain-specific':
            secondaryAction = this.formulateDomainSpecificDecision(secondaryInferences, strongestSecondaryInference, categorizedData);
            break;
            
          default:
            secondaryAction = strongestSecondaryInference.inference;
            break;
        }
        
        alternatives.push(`Alternative approach based on ${secondaryType} reasoning: ${secondaryAction}`);
      }
    }
    
    // If there are ethical concerns, generate an alternative that prioritizes ethics
    if (ethicalConcerns.hasConcerns) {
      alternatives.push(`Ethical priority approach: address ${ethicalConcerns.concerns[0]} before proceeding`);
    }
    
    // Ensure we don't duplicate the primary action
    return alternatives.filter(alt => !this.areActionsEquivalent(alt, primaryAction));
  }
  
  /**
   * Generate expected outcomes for a decision
   */
  private generateExpectedOutcomes(
    action: string,
    inferences: Inference[],
    ethicalConcerns: { hasConcerns: boolean; concerns: string[]; severity: 'high' | 'medium' | 'low' }
  ): { outcome: string; likelihood: number; timeframe: string }[] {
    const outcomes = [];
    
    // Use predictive inferences to forecast outcomes
    const predictiveInferences = inferences.filter(inf => inf.type === 'predictive');
    
    if (predictiveInferences.length > 0) {
      // Sort by confidence
      const sortedPredictions = predictiveInferences.sort((a, b) => b.confidence - a.confidence);
      
      // Take the top prediction as a likely outcome
      const topPrediction = sortedPredictions[0];
      
      outcomes.push({
        outcome: this.extractOutcomeFromInference(topPrediction.inference),
        likelihood: topPrediction.confidence,
        timeframe: 'medium-term'
      });
      
      // If we have more predictions, add a secondary outcome
      if (sortedPredictions.length > 1) {
        const secondaryPrediction = sortedPredictions[1];
        
        outcomes.push({
          outcome: this.extractOutcomeFromInference(secondaryPrediction.inference),
          likelihood: secondaryPrediction.confidence,
          timeframe: 'medium-term'
        });
      }
    } else {
      // If no predictive inferences, generate a generic positive outcome
      outcomes.push({
        outcome: `Action will likely achieve its intended purpose`,
        likelihood: 0.7,
        timeframe: 'medium-term'
      });
    }
    
    // Add an outcome related to ethical concerns if present
    if (ethicalConcerns.hasConcerns) {
      outcomes.push({
        outcome: `Ethical concerns regarding ${ethicalConcerns.concerns[0]} may require additional attention`,
        likelihood: ethicalConcerns.severity === 'high' ? 0.9 : 
                   ethicalConcerns.severity === 'medium' ? 0.7 : 0.5,
        timeframe: 'short-term'
      });
    }
    
    // Add a long-term outcome
    outcomes.push({
      outcome: "Long-term implications will depend on implementation and contextual factors",
      likelihood: 0.8,
      timeframe: 'long-term'
    });
    
    return outcomes;
  }
  
  /**
   * Formulate a decision based on causal inferences
   */
  private formulateCausalDecision(inferences: Inference[], strongestInference: Inference): string {
    const causalInferences = inferences.filter(inf => inf.type === 'causal');
    
    // If we have multiple causal inferences, check for intervention points
    if (causalInferences.length > 1) {
      // Look for causes that appear multiple times (key leverage points)
      const causes = new Set<string>();
      const effects = new Set<string>();
      
      causalInferences.forEach(inf => {
        const causalMatch = inf.inference.match(/(.+)\s+causes\s+(.+)/i) || 
                            inf.inference.match(/(.+)\s+leads to\s+(.+)/i) ||
                            inf.inference.match(/(.+)\s+results in\s+(.+)/i);
        
        if (causalMatch) {
          causes.add(causalMatch[1].trim());
          effects.add(causalMatch[2].trim());
        }
      });
      
      // Check if any causes appear in effects (causal chains)
      const intermediatePoints = Array.from(causes).filter(cause => 
        Array.from(effects).some(effect => effect.includes(cause))
      );
      
      if (intermediatePoints.length > 0) {
        return `intervention at ${intermediatePoints[0]} would influence multiple outcomes in the causal chain`;
      }
    }
    
    // Default to the strongest causal inference
    const causalMatch = strongestInference.inference.match(/(.+)\s+causes\s+(.+)/i) || 
                      strongestInference.inference.match(/(.+)\s+leads to\s+(.+)/i) ||
                      strongestInference.inference.match(/(.+)\s+results in\s+(.+)/i);
    
    if (causalMatch) {
      return `modifying ${causalMatch[1].trim()} would affect ${causalMatch[2].trim()}`;
    }
    
    // Fallback
    return `interventions should focus on key causal factors identified`;
  }
  
  /**
   * Formulate a decision based on predictive inferences
   */
  private formulatePredictiveDecision(inferences: Inference[], strongestInference: Inference): string {
    // Check if the strongest inference contains an explicit prediction
    if (strongestInference.inference.toLowerCase().includes('will') || 
        strongestInference.inference.toLowerCase().includes('future') ||
        strongestInference.inference.toLowerCase().includes('likely to')) {
      return `preparation for ${this.extractOutcomeFromInference(strongestInference.inference)} is advisable`;
    }
    
    // Look for conditional predictions
    const conditionalPredictions = inferences.filter(inf => 
      inf.type === 'predictive' && 
      (inf.inference.toLowerCase().includes('if') || inf.inference.toLowerCase().includes('when'))
    );
    
    if (conditionalPredictions.length > 0) {
      const conditionalMatch = conditionalPredictions[0].inference.match(/if\s+(.+),\s+then\s+(.+)/i) ||
                              conditionalPredictions[0].inference.match(/when\s+(.+),\s+(.+)\s+will/i);
      
      if (conditionalMatch) {
        return `actions should account for the condition that ${conditionalMatch[1].trim()} leads to ${conditionalMatch[2].trim()}`;
      }
    }
    
    // Default based on general predictive pattern
    return `preparation should account for likely future developments based on current trajectories`;
  }
  
  /**
   * Formulate a decision based on structural inferences
   */
  private formulateStructuralDecision(inferences: Inference[], strongestInference: Inference, categorizedData: CategorizedData): string {
    // Check for network or hierarchical structures
    const networkInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('network') ||
      inf.inference.toLowerCase().includes('connection') ||
      inf.inference.toLowerCase().includes('relationship')
    );
    
    if (networkInferences.length > 0) {
      return `approach should acknowledge the interconnected nature of the system's components`;
    }
    
    const hierarchicalInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('hierarch') ||
      inf.inference.toLowerCase().includes('level') ||
      inf.inference.toLowerCase().includes('layer')
    );
    
    if (hierarchicalInferences.length > 0) {
      return `strategy should respect the hierarchical structure with interventions at appropriate levels`;
    }
    
    // Check for completeness or gaps
    if (categorizedData.totality && categorizedData.totality.missingElements && 
        categorizedData.totality.missingElements.length > 0) {
      return `addressing identified gaps would improve structural integrity of the system`;
    }
    
    // Default based on general structural pattern
    return `approach should work with the identified structural patterns rather than against them`;
  }
  
  /**
   * Formulate a decision based on domain-specific inferences
   */
  private formulateDomainSpecificDecision(inferences: Inference[], strongestInference: Inference, categorizedData: CategorizedData): string {
    // Extract the domain from inferences or categorized data
    const domainInfo = this.extractDomainInformation(categorizedData, null);
    
    if (domainInfo.domain) {
      switch (domainInfo.domain) {
        case 'healthcare':
          return this.formulateHealthcareDecision(inferences, strongestInference, domainInfo);
          
        case 'education':
          return this.formulateEducationDecision(inferences, strongestInference, domainInfo);
          
        case 'finance':
          return this.formulateFinanceDecision(inferences, strongestInference, domainInfo);
          
        case 'governance':
          return this.formulateGovernanceDecision(inferences, strongestInference, domainInfo);
      }
    }
    
    // Default if no specific domain is identified
    return `following domain best practices is recommended based on identified patterns`;
  }
  
  /**
   * Formulate a healthcare-specific decision
   */
  private formulateHealthcareDecision(inferences: Inference[], strongestInference: Inference, domainInfo: any): string {
    // Check for diagnostic inferences
    const diagnosticInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('symptom') ||
      inf.inference.toLowerCase().includes('diagnos') ||
      inf.inference.toLowerCase().includes('condition') ||
      inf.inference.toLowerCase().includes('disease')
    );
    
    if (diagnosticInferences.length > 0) {
      // Look for specific conditions
      const conditionMatch = diagnosticInferences[0].inference.match(/suggest.*\s+(possible|potential)\s+(.+)/i) ||
                            diagnosticInferences[0].inference.match(/consistent with\s+(.+)/i) ||
                            diagnosticInferences[0].inference.match(/indicates\s+(.+)/i);
      
      if (conditionMatch) {
        const condition = conditionMatch[conditionMatch.length - 1].trim();
        return `further evaluation for ${condition} is recommended`;
      }
      
      return `clinical evaluation is indicated based on symptom presentation`;
    }
    
    // Check for treatment inferences
    const treatmentInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('treatment') ||
      inf.inference.toLowerCase().includes('therapy') ||
      inf.inference.toLowerCase().includes('intervention') ||
      inf.inference.toLowerCase().includes('management')
    );
    
    if (treatmentInferences.length > 0) {
      // Look for specific treatments
      const treatmentMatch = treatmentInferences[0].inference.match(/treatment.*\s+(.+)/i) ||
                            treatmentInferences[0].inference.match(/therapy.*\s+(.+)/i) ||
                            treatmentInferences[0].inference.match(/recommend.*\s+(.+)/i);
      
      if (treatmentMatch) {
        return `${treatmentMatch[1].trim()} should be considered`;
      }
      
      return `treatment plan should be implemented according to clinical guidelines`;
    }
    
    // Default healthcare decision
    return `healthcare decisions should follow evidence-based clinical guidelines`;
  }
  
  /**
   * Formulate an education-specific decision
   */
  private formulateEducationDecision(inferences: Inference[], strongestInference: Inference, domainInfo: any): string {
    // Check for learning-related inferences
    const learningInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('learning') ||
      inf.inference.toLowerCase().includes('student') ||
      inf.inference.toLowerCase().includes('education') ||
      inf.inference.toLowerCase().includes('performance')
    );
    
    if (learningInferences.length > 0) {
      return `educational approach should be tailored to identified learning patterns and needs`;
    }
    
    // Check for curriculum-related inferences
    const curriculumInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('curriculum') ||
      inf.inference.toLowerCase().includes('content') ||
      inf.inference.toLowerCase().includes('material') ||
      inf.inference.toLowerCase().includes('instruction')
    );
    
    if (curriculumInferences.length > 0) {
      return `curriculum adjustments should align with learning objectives and student needs`;
    }
    
    // Default education decision
    return `educational strategies should incorporate evidence-based pedagogical approaches`;
  }
  
  /**
   * Formulate a finance-specific decision
   */
  private formulateFinanceDecision(inferences: Inference[], strongestInference: Inference, domainInfo: any): string {
    // Check for risk-related inferences
    const riskInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('risk') ||
      inf.inference.toLowerCase().includes('volatility') ||
      inf.inference.toLowerCase().includes('uncertainty') ||
      inf.inference.toLowerCase().includes('exposure')
    );
    
    if (riskInferences.length > 0) {
      return `financial strategy should balance risk and return based on risk tolerance profile`;
    }
    
    // Check for performance-related inferences
    const performanceInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('performance') ||
      inf.inference.toLowerCase().includes('return') ||
      inf.inference.toLowerCase().includes('profit') ||
      inf.inference.toLowerCase().includes('growth')
    );
    
    if (performanceInferences.length > 0) {
      return `investment approach should be aligned with performance metrics and objectives`;
    }
    
    // Default finance decision
    return `financial decisions should follow sound fiscal management principles`;
  }
  
  /**
   * Formulate a governance-specific decision
   */
  private formulateGovernanceDecision(inferences: Inference[], strongestInference: Inference, domainInfo: any): string {
    // Check for policy-related inferences
    const policyInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('policy') ||
      inf.inference.toLowerCase().includes('regulation') ||
      inf.inference.toLowerCase().includes('compliance') ||
      inf.inference.toLowerCase().includes('governance')
    );
    
    if (policyInferences.length > 0) {
      return `policy framework should be adjusted to address identified governance needs`;
    }
    
    // Check for stakeholder-related inferences
    const stakeholderInferences = inferences.filter(inf => 
      inf.inference.toLowerCase().includes('stakeholder') ||
      inf.inference.toLowerCase().includes('constituent') ||
      inf.inference.toLowerCase().includes('community') ||
      inf.inference.toLowerCase().includes('citizen')
    );
    
    if (stakeholderInferences.length > 0) {
      return `governance approach should incorporate stakeholder perspectives and needs`;
    }
    
    // Default governance decision
    return `governance decisions should follow principles of transparency, accountability, and effectiveness`;
  }
  
  /**
   * Formulate a decision based on logical reasoning (deductive, inductive, abductive)
   */
  private formulateLogicalDecision(inferences: Inference[], strongestInference: Inference, inferenceType: InferenceType): string {
    switch (inferenceType) {
      case 'deductive':
        // For deductive reasoning, focus on the necessary conclusion
        return `actions should acknowledge the logical necessity that ${this.extractConclusionFromInference(strongestInference.inference)}`;
        
      case 'inductive':
        // For inductive reasoning, emphasize the general pattern
        return `approach should be informed by the general pattern that ${this.extractPatternFromInference(strongestInference.inference)}`;
        
      case 'abductive':
        // For abductive reasoning, focus on the best explanation
        return `strategy should account for the most likely explanation: ${this.extractExplanationFromInference(strongestInference.inference)}`;
        
      default:
        return `logical analysis suggests following a structured approach based on identified principles`;
    }
  }
  
  /**
   * Formulate a decision based on analogical reasoning
   */
  private formulateAnalogicalDecision(inferences: Inference[], strongestInference: Inference): string {
    // Look for specific analogies
    const analogyMatch = strongestInference.inference.match(/similar to\s+(.+)/i) ||
                        strongestInference.inference.match(/resembles\s+(.+)/i) ||
                        strongestInference.inference.match(/analogous to\s+(.+)/i);
    
    if (analogyMatch) {
      return `strategies that have proven effective in ${analogyMatch[1].trim()} may be applicable`;
    }
    
    // Default analogical decision
    return `approaches from analogous situations should be considered with appropriate adaptations`;
  }
  
  /**
   * Modify an action to address ethical concerns
   */
  private modifyActionForEthicalConcerns(action: string, ethicalConcerns: { hasConcerns: boolean; concerns: string[]; severity: 'high' | 'medium' | 'low' }): string {
    // For high severity concerns, significantly modify the action
    if (ethicalConcerns.severity === 'high') {
      if (action.toLowerCase().includes('recommend') || 
          action.toLowerCase().includes('implement') ||
          action.toLowerCase().includes('proceed')) {
        // Replace recommendation with a more cautious approach
        return `carefully evaluate ethical implications before proceeding: ${action}`;
      } else {
        // Add ethical safeguards
        return `${action}, with robust ethical safeguards to address identified concerns`;
      }
    }
    
    // For medium severity, add ethical considerations
    if (ethicalConcerns.severity === 'medium') {
      return `${action}, while monitoring ethical considerations`;
    }
    
    // For low severity, acknowledge concerns
    return `${action}, with awareness of potential ethical implications`;
  }
  
  //=============================================================================
  // HELPER METHODS
  //=============================================================================
  
  /**
   * Extract domain information from categorized data
   */
  private extractDomainInformation(categorizedData: CategorizedData, previousData: any): any {
    const domainInfo: any = {
      domain: null,
      subtype: null
    };
    
    // Check for domain-specific entities in existence analysis
    if (categorizedData.existence && categorizedData.existence.existingEntities) {
      const domainEntities = categorizedData.existence.existingEntities.filter(entity => 
        entity.entityType && 
        ['healthcare', 'education', 'finance', 'governance'].includes(entity.entityType.toLowerCase())
      );
      
      if (domainEntities.length > 0) {
        domainInfo.domain = domainEntities[0].entityType.toLowerCase();
      }
    }
    
    // Check for domain terminology in raw features
    if (!domainInfo.domain && previousData && previousData.rawFeatures) {
      const features = previousData.rawFeatures;
      
      // Check for healthcare indicators
      const healthcareTerms = ['patient', 'symptom', 'diagnosis', 'treatment', 'medical', 'clinical', 'health'];
      const hasHealthcareTerms = features.some((f: any) => 
        healthcareTerms.some(term => 
          (f.items && f.items.some((item: string) => item.toLowerCase().includes(term))) ||
          (f.name && f.name.toLowerCase().includes(term))
        )
      );
      
      if (hasHealthcareTerms) {
        domainInfo.domain = 'healthcare';
        
        // Check for healthcare subtypes
        if (features.some((f: any) => 
          (f.items && f.items.some((item: string) => 
            item.toLowerCase().includes('symptom') || 
            item.toLowerCase().includes('diagnos')
          )) ||
          (f.name && (
            f.name.toLowerCase().includes('symptom') || 
            f.name.toLowerCase().includes('diagnos')
          ))
        )) {
          domainInfo.subtype = 'diagnosis';
        } else if (features.some((f: any) => 
          (f.items && f.items.some((item: string) => 
            item.toLowerCase().includes('treatment') || 
            item.toLowerCase().includes('therapy')
          )) ||
          (f.name && (
            f.name.toLowerCase().includes('treatment') || 
            f.name.toLowerCase().includes('therapy')
          ))
        )) {
          domainInfo.subtype = 'treatment';
        }
        
        // Extract healthcare-specific information
        domainInfo.symptoms = this.extractFeatureValues(features, 'symptoms');
        domainInfo.condition = this.extractFeatureValue(features, 'condition');
        domainInfo.treatment = this.extractFeatureValue(features  /**
   * Generate abductive inferences (inference to best explanation)
   * Finding the most likely explanation for observations
   */
  private generateAbductiveInferences(categorizedData: CategorizedData): Inference[] {
    const inferences: Inference[] = [];
    
    // Check if we have evidence of causality
    if (categorizedData.causality && categorizedData.causality.causalRelationships) {
      // Look for effects without clear causes and infer the most likely cause
      const causalRelationships = categorizedData.causality.causalRelationships;
      
      // Group by effects to find those that appear multiple times
      const effectGroups: Record<string, any[]> = {};
      causalRelationships.forEach(rel => {
        if (!effectGroups[rel.effect]) {
          effectGroups[rel.effect] = [];
        }
        effectGroups[rel.effect].push(rel);
      });
      
      // For effects with multiple potential causes, find the most likely
      Object.entries(effectGroups).forEach(([effect, relationships]) => {
        if (relationships.length > 1) {
          // Sort by confidence and strength
          const sortedCauses = relationships.sort((a, b) => 
            (b.confidence * b.strength) - (a.confidence * a.strength)
          );
          
          const bestCause = sortedCauses[0];
          
          inferences.push({
            type: 'abductive',
            inference: `The most likely explanation for ${effect} is ${bestCause.cause}`,
            confidence: bestCause.confidence * 0.9, // Slightly lower confidence for abduction
            evidence: [`Strongest causal relationship (strength: ${bestCause.strength})`],
            counterevidence: relationships.length > 1 ? 
              [`Alternative explanations exist (${relationships.length - 1} others)`] : []
          });
        }
      });
    }
    
    // If we have unexplained observations, generate potential explanations
    if (categorizedData.existence && categorizedData.existence.existingEntities) {
      const unexplainedEntities = categorizedData.existence.existingEntities.filter(entity => 
        entity.confidence > 0.7 && !entity.explanation
      );
      
      if (unexplainedEntities.length > 0) {
        // For each unexplained entity, try to find the most likely explanation
        unexplainedEntities.forEach(entity => {
          const possibleExplanation = this.inferMostLikelyExplanation(entity, categorizedData);
          
          if (possibleExplanation) {
            inferences.push({
              type: 'abductive',
              inference: `${entity.name} is best explained by ${possibleExplanation.explanation}`,
              confidence: possibleExplanation.confidence,
              evidence: possibleExplanation.evidence,
              counterevidence: possibleExplanation.counterevidence
            });
          }
        });
      }
    }
    
    // Check for unusual patterns or anomalies that need explanation
    if (categorizedData.limitation) {
      const limitations = categorizedData.limitation.limitations;
      
      if (limitations && limitations.length > 0) {
        limitations.forEach(limitation => {
          if (limitation.type === 'bounded-ranges' || limitation.type === 'constrained-options') {
            inferences.push({
              type: 'abductive',
              inference: `The observed limitations likely result from underlying structural constraints`,
              confidence: 0.6,
              evidence: [`${limitation.count} identified limitations of type ${limitation.type}`],
              counterevidence: ['Limitations may be artifacts of data collection']
            });
          }
        });
      }
    }
    
    return inferences;
  }
  
  /**
   * Generate domain-specific inferences
   * Applying specialized knowledge to particular domains
   */
  private generateDomainSpecificInferences(categorizedData: CategorizedData, previousData: any): Inference[] {
    const inferences: Inference[] = [];
    
    // Extract domain information
    const domainInfo = this.extractDomainInformation(categorizedData, previousData);
    
    if (domainInfo.domain) {
      // Generate inferences based on domain
      switch (domainInfo.domain) {
        case 'healthcare':
          inferences.push(...this.generateHealthcareInferences(categorizedData, domainInfo));
          break;
          
        case 'education':
          inferences.push(...this.generateEducationInferences(categorizedData, domainInfo));
          break;
          
        case 'finance':
          inferences.push(...this.generateFinanceInferences(categorizedData, domainInfo));
          break;
          
        case 'governance':
          inferences.push(...this.generateGovernanceInferences(categorizedData, domainInfo));
          break;
      }
    }
    
    return inferences;
  }
  
  /**
   * Generate healthcare-specific inferences
   */
  private generateHealthcareInferences(categorizedData: CategorizedData, domainInfo: any): Inference[] {
    const inferences: Inference[] = [];
    
    // Generate diagnostic inferences
    if (domainInfo.symptoms && domainInfo.symptoms.length > 0) {
      // Check for symptom patterns indicative of common conditions
      const feverAndCough = domainInfo.symptoms.includes('fever') && 
                            domainInfo.symptoms.includes('cough');
      
      const headacheAndNausea = domainInfo.symptoms.includes('headache') && 
                               domainInfo.symptoms.includes('nausea');
      
      const respiratorySymptoms = domainInfo.symptoms.includes('shortness of breath') || 
                                 domainInfo.symptoms.includes('difficulty breathing');
      
      if (feverAndCough) {
        inferences.push({
          type: 'domain-specific',
          inference: 'Symptoms suggest possible respiratory infection',
          confidence: 0.75,
          evidence: ['Presence of fever and cough'],
          counterevidence: ['Multiple conditions can cause these symptoms']
        });
        
        if (respiratorySymptoms) {
          inferences.push({
            type: 'domain-specific',
            inference: 'Symptom cluster indicates potential pneumonia or bronchitis',
            confidence: 0.8,
            evidence: ['Fever, cough, and respiratory difficulty combination'],
            counterevidence: ['Differential diagnosis required']
          });
        }
      }
      
      if (headacheAndNausea) {
        inferences.push({
          type: 'domain-specific',
          inference: 'Symptoms consistent with migraine or viral illness',
          confidence: 0.7,
          evidence: ['Presence of headache and nausea'],
          counterevidence: ['Further assessment needed for definitive diagnosis']
        });
      }
    }
    
    // Generate treatment-related inferences
    if (domainInfo.condition) {
      inferences.push({
        type: 'domain-specific',
        inference: `Standard treatment protocols for ${domainInfo.condition} should be considered`,
        confidence: 0.8,
        evidence: [`Identified condition: ${domainInfo.condition}`],
        counterevidence: ['Individual factors may require treatment modifications']
      });
    }
    
    return inferences;
  }
  
  /**
   * Generate education-specific inferences
   */
  private generateEducationInferences(categorizedData: CategorizedData, domainInfo: any): Inference[] {
    const inferences: Inference[] = [];
    
    // Learning patterns inference
    if (domainInfo.scores || domainInfo.performance) {
      inferences.push({
        type: 'domain-specific',
        inference: 'Performance patterns suggest specific learning needs',
        confidence: 0.7,
        evidence: ['Performance data analysis'],
        counterevidence: ['Multiple factors influence learning outcomes']
      });
    }
    
    // Curriculum effectiveness inference
    if (domainInfo.curriculum && domainInfo.outcomes) {
      inferences.push({
        type: 'domain-specific',
        inference: 'Curriculum design appears to support learning objectives',
        confidence: 0.75,
        evidence: ['Alignment between curriculum and outcomes'],
        counterevidence: ['Other variables may influence observed outcomes']
      });
    }
    
    // Educational intervention inference
    if (domainInfo.challenges || domainInfo.gaps) {
      inferences.push({
        type: 'domain-specific',
        inference: 'Targeted interventions would address identified learning gaps',
        confidence: 0.8,
        evidence: ['Specific learning challenges identified'],
        counterevidence: ['Intervention effectiveness varies by implementation']
      });
    }
    
    return inferences;
  }
  
  /**
   * Generate finance-specific inferences
   */
  private generateFinanceInferences(categorizedData: CategorizedData, domainInfo: any): Inference[] {
    const inferences: Inference[] = [];
    
    // Risk assessment inference
    if (domainInfo.volatility || domainInfo.risk) {
      inferences.push({
        type: 'domain-specific',
        inference: 'Financial data indicates moderate risk profile',
        confidence: 0.7,
        evidence: ['Volatility and risk metrics analysis'],
        counterevidence: ['Market conditions can change rapidly']
      });
    }
    
    // Investment strategy inference
    if (domainInfo.returns || domainInfo.performance) {
      inferences.push({
        type: 'domain-specific',
        inference: 'Historical performance suggests suitable investment strategy',
        confidence: 0.65,
        evidence: ['Performance trend analysis'],
        counterevidence: ['Past performance doesn\'t guarantee future results']
      });
    }
    
    // Financial health inference
    if (domainInfo.ratios || domainInfo.metrics) {
      inferences.push({
        type: 'domain-specific',
        inference: 'Financial ratios indicate sound fiscal management',
        confidence: 0.8,
        evidence: ['Key financial indicators within healthy ranges'],
        counterevidence: ['Some metrics may require contextual interpretation']
      });
    }
    
    return inferences;
  }
  
  /**
   * Generate governance-specific inferences
   */
  private generateGovernanceInferences(categorizedData: CategorizedData, domainInfo: any): Inference[] {
    const inferences: Inference[] = [];
    
    // Policy effectiveness inference
    if (domainInfo.policies || domainInfo.regulations) {
      inferences.push({
        type: 'domain-specific',
        inference: 'Policy framework appears to address intended objectives',
        confidence: 0.7,
        evidence: ['Policy coverage analysis'],
        counterevidence: ['Implementation factors affect policy outcomes']
      });
    }
    
    // Compliance inference
    if (domainInfo.compliance || domainInfo.adherence) {
      inferences.push({
        type: 'domain-specific',
        inference: 'Compliance levels indicate effective governance structures',
        confidence: 0.75,
        evidence: ['Compliance metrics analysis'],
        counterevidence: ['Formal compliance may not capture practical implementation']
      });
    }
    
    // Governance improvement inference
    if (domainInfo.gaps || domainInfo.challenges) {
      inferences.push({
        type: 'domain-specific',
        inference: 'Targeted governance improvements would address identified gaps',
        confidence: 0.8,
        evidence: ['Gap analysis in governance framework'],
        counterevidence: ['Multiple approaches could address identified gaps']
      });
    }
    
    return inferences;
  }
  
  //=============================================================================
  // ETHICAL REASONING METHODS
  //=============================================================================
  
  /**
   * Assess implications for autonomy
   * This represents Kant's emphasis on respecting rational agency
   */
  private assessAutonomyImplications(inferences: Inference[], categorizedData: CategorizedData): string {
    // Look for inferences that might impact autonomy
    const autonomyRelevantInferences = inferences.filter(inference => 
      inference.inference.toLowerCase().includes('choice') ||
      inference.inference.toLowerCase().includes('decision') ||
      inference.inference.toLowerCase().includes('autonom') ||
      inference.inference.toLowerCase().includes('consent') ||
      inference.inference.toLowerCase().includes('force') ||
      inference.inference.toLowerCase().includes('coerce') ||
      inference.inference.toLowerCase().includes('manipulat') ||
      inference.inference.toLowerCase().includes('option')
    );
    
    // Check for explicit autonomy-related content
    if (autonomyRelevantInferences.length > 0) {
      // Look for potential autonomy concerns
      const autonomyConcerns = autonomyRelevantInferences.filter(inference => 
        inference.inference.toLowerCase().includes('limit') ||
        inference.inference.toLowerCase().includes('restrict') ||
        inference.inference.toLowerCase().includes('force') ||
        inference.inference.toLowerCase().includes('coerce') ||
        inference.inference.toLowerCase().includes('manipulat') ||
        inference.inference.toLowerCase().includes('without consent')
      );
      
      if (autonomyConcerns.length > 0) {
        return "Potential concerns for autonomy: may limit individual choice or agency";
      }
      
      // Look for autonomy-enhancing aspects
      const autonomyEnhancing = autonomyRelevantInferences.filter(inference => 
        inference.inference.toLowerCase().includes('enhance') ||
        inference.inference.toLowerCase().includes('support') ||
        inference.inference.toLowerCase().includes('enable') ||
        inference.inference.toLowerCase().includes('empower') ||
        inference.inference.toLowerCase().includes('choice') ||
        inference.inference.toLowerCase().includes('option')
      );
      
      if (autonomyEnhancing.length > 0) {
        return "Appears to preserve or enhance autonomy by supporting informed choice";
      }
      
      // Default if relevant but unclear
      return "Mixed or unclear implications for autonomy";
    }
    
    // Check based on necessity and causality
    if (categorizedData.necessity && categorizedData.necessity.necessaryConditions > 0) {
      return "Identifies necessary conditions but implications for autonomy are unclear";
    }
    
    if (categorizedData.causality && categorizedData.causality.causalRelationships) {
      const causalRelationships = categorizedData.causality.causalRelationships;
      
      // Check if any causal relationships might impact agency
      const agencyImpactingRelationships = causalRelationships.filter(rel => 
        rel.cause.toLowerCase().includes('choice') || 
        rel.effect.toLowerCase().includes('choice') ||
        rel.cause.toLowerCase().includes('decision') || 
        rel.effect.toLowerCase().includes('decision')
      );
      
      if (agencyImpactingRelationships.length > 0) {
        return "Causal relationships identified may have implications for individual agency";
      }
    }
    
    // If domain is healthcare, check for healthcare-specific autonomy considerations
    const domainInfo = this.extractDomainInformation(categorizedData, null);
    if (domainInfo.domain === 'healthcare') {
      return "Healthcare context requires careful consideration of patient autonomy and informed consent";
    }
    
    // Default response if no clear autonomy implications
    return "No clear implications for autonomy identified";
  }
  
  /**
   * Assess potential benefits (beneficence)
   */
  private assessBeneficence(inferences: Inference[], categorizedData: CategorizedData): string {
    // Look for inferences that suggest benefits
    const benefitInferences = inferences.filter(inference => 
      inference.inference.toLowerCase().includes('benefit') ||
      inference.inference.toLowerCase().includes('improve') ||
      inference.inference.toLowerCase().includes('enhance') ||
      inference.inference.toLowerCase().includes('positive') ||
      inference.inference.toLowerCase().includes('helpful') ||
      inference.inference.toLowerCase().includes('effective')
    );
    
    // If explicit benefits are mentioned
    if (benefitInferences.length > 0) {
      // Check confidence levels of benefit inferences
      const highConfidenceBenefits = benefitInferences.filter(inf => inf.confidence > 0.7);
      const lowConfidenceBenefits = benefitInferences.filter(inf => inf.confidence <= 0.7);
      
      if (highConfidenceBenefits.length > 0) {
        return `Strong evidence of potential benefits: ${highConfidenceBenefits[0].inference}`;
      } else if (lowConfidenceBenefits.length > 0) {
        return `Potential benefits identified with limited confidence: ${lowConfidenceBenefits[0].inference}`;
      }
    }
    
    // Check for domain-specific benefits
    const domainInfo = this.extractDomainInformation(categorizedData, null);
    
    if (domainInfo.domain) {
      switch (domainInfo.domain) {
        case 'healthcare':
          if (domainInfo.treatment || domainInfo.intervention) {
            return "Healthcare intervention with potential therapeutic benefit";
          }
          break;
          
        case 'education':
          if (domainInfo.curriculum || domainInfo.teaching) {
            return "Educational approach with potential learning benefits";
          }
          break;
          
        case 'finance':
          if (domainInfo.strategy || domainInfo.investment) {
            return "Financial strategy with potential economic benefits";
          }
          break;
      }
    }
    
    // Check causal relationships for positive effects
    if (categorizedData.causality && categorizedData.causality.causalRelationships) {
      const positiveEffects = categorizedData.causality.causalRelationships.filter(rel => 
        rel.effect.toLowerCase().includes('improve') ||
        rel.effect.toLowerCase().includes('enhance') ||
        rel.effect.toLowerCase().includes('benefit') ||
        rel.effect.toLowerCase().includes('positive')
      );
      
      if (positiveEffects.length > 0) {
        return `Causal analysis indicates potential positive outcomes: ${positiveEffects[0].effect}`;
      }
    }
    
    // Check possibility analysis for positive possibilities
    if (categorizedData.possibility && categorizedData.possibility.possibilityDetails) {
      const positivePossibilities = categorizedData.possibility.possibilityDetails.filter(pos => 
        pos.state.toLowerCase().includes('benefit') ||
        pos.state.toLowerCase().includes('improve') ||
        pos.state.toLowerCase().includes('enhance') ||
        pos.state.toLowerCase().includes('positive')
      );
      
      if (positivePossibilities.length > 0) {
        return `Potential benefits identified as possible outcomes: ${positivePossibilities[0].state}`;
      }
    }
    
    // Default if no clear benefits identified
    return "No specific benefits clearly identified";
  }
  
  /**
   * Assess potential harms (non-maleficence)
   */
  private assessNonMaleficence(inferences: Inference[], categorizedData: CategorizedData): string[] {
    const risks: string[] = [];
    
    // Look for inferences that suggest harms
    const harmInferences = inferences.filter(inference => 
      inference.inference.toLowerCase().includes('harm') ||
      inference.inference.toLowerCase().includes('risk') ||
      inference.inference.toLowerCase().includes('danger') ||
      inference.inference.toLowerCase().includes('negative') ||
      inference.inference.toLowerCase().includes('adverse') ||
      inference.inference.toLowerCase().includes('side effect')
    );
    
    // If explicit harms are mentioned
    if (harmInferences.length > 0) {
      harmInferences.forEach(inference => {
        risks.push(`${inference.inference} (confidence: ${Math.round(inference.confidence * 100)}%)`);
      });
    }
    
    // Check for domain-specific risks
    const domainInfo = this.extractDomainInformation(categorizedData, null);
    
    if (domainInfo.domain) {
      switch (domainInfo.domain) {
        case 'healthcare':
          if (domainInfo.treatment || domainInfo.intervention) {
            risks.push("Healthcare interventions typically carry some risk of adverse effects");
          }
          break;
          
        case 'finance':
          if (domainInfo.investment || domainInfo.strategy) {
            risks.push("Financial strategies always entail some degree of risk");
          }
          break;
      }
    }
    
    // Check causal relationships for negative effects
    if (categorizedData.causality && categorizedData.causality.causalRelationships) {
      const negativeEffects = categorizedData.causality.causalRelationships.filter(rel => 
        rel.effect.toLowerCase().includes('harm') ||
        rel.effect.toLowerCase().includes('damage') ||
        rel.effect.toLowerCase().includes('negative') ||
        rel.effect.toLowerCase().includes('adverse') ||
        rel.effect.toLowerCase().includes('reduce') ||
        rel.effect.toLowerCase().includes('decrease')
      );
      
      if (negativeEffects.length > 0) {
        negativeEffects.forEach(effect => {
          risks.push(`Potential negative outcome: ${effect.effect} (causal strength: ${effect.strength})`);
        });
      }
    }
    
    // Check possibility analysis for negative possibilities
    if (categorizedData.possibility && categorizedData.possibility.possibilityDetails) {
      const negativePossibilities = categorizedData.possibility.possibilityDetails.filter(pos => 
        pos.state.toLowerCase().includes('harm') ||
        pos.state.toLowerCase().includes('risk') ||
        pos.state.toLowerCase().includes('danger') ||
        pos.state.toLowerCase().includes('negative') ||
        pos.state.toLowerCase().includes('adverse')
      );
      
      if (negativePossibilities.length > 0) {
        negativePossibilities.forEach(possibility => {
          risks.push(`Possible risk: ${possibility.state} (likelihood: ${Math.round(possibility.likelihood * 100)}%)`);
        });
      }
    }
    
    // If no risks identified explicitly but there are limitations
    if (risks.length === 0 && categorizedData.limitation) {
      risks.push("Limitations in the data may mask potential risks");
    }
    
    // If still no risks identified, note the uncertainty
    if (risks.length === 0) {
      risks.push("No specific risks clearly identified, but absence of evidence is not evidence of absence");
    }
    
    return risks;
  }
  
  /**
   * Assess justice and fairness implications
   */
  private assessJustice(inferences: Inference[], categorizedData: CategorizedData): string {
    // Look for inferences related to justice or fairness
    const justiceInferences = inferences.filter(inference => 
      inference.inference.toLowerCase().includes('fair') ||
      inference.inference.toLowerCase().includes('justice') ||
      inference.inference.toLowerCase().includes('equit') ||
      inference.inference.toLowerCase().includes('equal') ||
      inference.inference.toLowerCase().includes('distribut') ||
      inference.inference.toLowerCase().includes('allocat') ||
      inference.inference.toLowerCase().includes('disparit') ||
      inference.inference.toLowerCase().includes('discriminat')
    );
    
    // If explicit justice considerations are mentioned
    if (justiceInferences.length > 0) {
      // Check if there are justice concerns
      const justiceConcerns = justiceInferences.filter(inf => 
        inf.inference.toLowerCase().includes('unfair') ||
        inf.inference.toLowerCase().includes('inequit') ||
        inf.inference.toLowerCase().includes('disparit') ||
        inf.inference.toLowerCase().includes('discriminat') ||
        inf.inference.toLowerCase().includes('bias')
      );
      
      if (justiceConcerns.length > 0) {
        return `Potential justice concerns identified: ${justiceConcerns[0].inference}`;
      }
      
      // Check if justice is positively addressed
      const justicePositive = justiceInferences.filter(inf => 
        inf.inference.toLowerCase().includes('fair') ||
        inf.inference.toLowerCase().includes('equit') ||
        inf.inference.toLowerCase().includes('equal')
      );
      
      if (justicePositive.length > 0) {
        return `Appears to promote fairness: ${justicePositive[0].inference}`;
      }
      
      // If justice mentioned but unclear implications
      return "Justice considerations present but implications unclear";
    }
    
    // Check for domain-specific justice concerns
    const domainInfo = this.extractDomainInformation(categorizedData, null);
    
    if (domainInfo.domain) {
      switch (domainInfo.domain) {
        case 'healthcare':
          return "Healthcare contexts require considering equitable access and resource allocation";
          
        case 'education':
          return "Educational contexts involve considerations of equal opportunity and fair assessment";
          
        case 'governance':
          return "Governance and policy contexts centrally involve justice and fairness considerations";
      }
    }
    
    // Check distribution patterns in the data
    if (categorizedData.plurality && categorizedData.plurality.distinctElements > 3) {
      return "Multiple stakeholders involved; justice requires considering impacts on all parties";
    }
    
    // Default if no clear justice implications
    return "No specific justice concerns identified in the available data";
  }
  
  /**
   * Assess additional ethical frameworks
   */
  private assessAdditionalEthicalFramework(framework: string, inferences: Inference[], categorizedData: CategorizedData): string | null {
    switch (framework.toLowerCase()) {
      case 'virtue':
        return this.assessVirtueEthics(inferences, categorizedData);
        
      case 'utilitarian':
      case 'consequentialist':
        return this.assessUtilitarianEthics(inferences, categorizedData);
        
      case 'care':
        return this.assessCareEthics(inferences, categorizedData);
        
      case 'rights':
        return this.assessRightsBasedEthics(inferences, categorizedData);
        
      default:
        return null;
    }
  }
  
  /**
   * Assess virtue ethics considerations
   */
  private assessVirtueEthics(inferences: Inference[], categorizedData: CategorizedData): string {
    // Look for virtue-related terms in inferences
    const virtueTerms = ['wisdom', 'courage', 'temperance', 'justice', 'integrity', 
                          'honest', 'compassion', 'care', 'excellence', 'virtue'];
    
    const virtueInferences = inferences.filter(inference => 
      virtueTerms.some(term => inference.inference.toLowerCase().includes(term))
    );
    
    if (virtueInferences.length > 0) {
      return `Actions align with virtues of ${virtueTerms.filter(term => 
        virtueInferences.some(inf => inf.inference.toLowerCase().includes(term))
      ).join(', ')}`;
    }
    
    return "Virtue ethics perspective: Consider what character traits would be exemplified by this action";
  }
  
  /**
   * Assess utilitarian ethics considerations
   */
  private assessUtilitarianEthics(inferences: Inference[], categorizedData: CategorizedData): string {
    // Check for inferences about outcomes and consequences
    const outcomeInferences = inferences.filter(inference => 
      inference.type === 'predictive' || 
      inference.inference.toLowerCase().includes('outcome') ||
      inference.inference.toLowerCase().includes('result') ||
      inference.inference.toLowerCase().includes('consequence') ||
      inference.inference.toLowerCase().includes('effect')
    );
    
    if (outcomeInferences.length > 0) {
      // Assess if outcomes are generally positive
      const positiveOutcomes = outcomeInferences.filter(inf => 
        inf.inference.toLowerCase().includes('benefit') ||
        inf.inference.toLowerCase().includes('positive') ||
        inf.inference.toLowerCase().includes('improve') ||
        inf.inference.toLowerCase().includes('enhance')
      );
      
      const negativeOutcomes = outcomeInferences.filter(inf => 
        inf.inference.toLowerCase().includes('harm') ||
        inf.inference.toLowerCase().includes('negative') ||
        inf.inference.toLowerCase().includes('adverse') ||
        inf.inference.toLowerCase().includes('worsen')
      );
      
      if (positiveOutcomes.length > negativeOutcomes.length) {
        return "From a utilitarian perspective, net outcomes appear positive";
      } else if (negativeOutcomes.length > positiveOutcomes.length) {
        return "From a utilitarian perspective, potential negative outcomes are concerning";
      } else {
        return "Utilitarian analysis shows mixed or unclear net outcomes";
      }
    }
    
    return "Utilitarian perspective: Consider the total benefit and harm that would result from this action";
  }
  
  /**
   * Assess care ethics considerations
   */
  private assessCareEthics(inferences: Inference[], categorizedData: CategorizedData): string {
    // Check for references to relationships, care, or needs
    const careInferences = inferences.filter(inference => 
      inference.inference.toLowerCase().includes('care') ||
      inference.inference.toLowerCase().includes('relationship') ||
      inference.inference.toLowerCase().includes('need') ||
      inference.inference.toLowerCase().includes('vulnerable') ||
      inference.inference.toLowerCase().includes('support') ||
      inference.inference.toLowerCase().includes('nurture')
    );
    
    if (careInferences.length > 0) {
      return "Care ethics considerations present: Maintains and supports important relationships";
    }
    
    // Check for community/reciprocity analysis which often relates to relationships
    if (categorizedData.community && categorizedData.community.interactions) {
      return "Care ethics perspective: Consider impacts on relationships and caring connections";
    }
    
    return "Care ethics perspective: Consider how this action affects relationships and meets needs of vulnerable parties";
  }
  
  /**
   * Assess rights-based ethics considerations
   */
  private assessRightsBasedEthics(inferences: Inference[], categorizedData: CategorizedData): string {
    // Check for references to rights, entitlements, or violations
    const rightsInferences = inferences.filter(inference => 
      inference.inference.toLowerCase().includes('right') ||
      inference.inference.toLowerCase().includes('entitle') ||
      inference.inference.toLowerCase().includes('violat') ||
      inference.inference.toLowerCase().includes('freedom') ||
      inference.inference.toLowerCase().includes('liberty') ||
      inference.inference.toLowerCase().includes('privacy')
    );
    
    if (rightsInferences.length > 0) {
      // Check if rights are being respected or violated
      const rightsViolations = rightsInferences.filter(inf => 
        inf.inference.toLowerCase().includes('violat') ||
        inf.inference.toLowerCase().includes('infringe') ||
        inf.inference.toLowerCase().includes('deny')
      );
      
      if (rightsViolations.length > 0) {
        return "Rights-based concerns identified: Potential infringement of rights";
      } else {
        return "Rights-based analysis: Appears to respect fundamental rights";
      }
    }
    
    return "Rights-based perspective: Consider whether this action respects the fundamental rights of all parties";
  }
  
  //=============================================================================
  // DECISION GENERATION METHODS
  //=============================================================================
  
  /**
   * Summarize inference types to guide decision-making
   */
  private summarizeInferenceTypes(inferences: Inference[]): {
    primaryType: InferenceType;
    secondaryType: InferenceType | null;
    typeDistribution: Record<InferenceType, number>;
  } {
    // Count occurrences of each inference type
    const typeCounts: Record<InferenceType, number> = {
      'causal': 0,
      'structural': 0,
      'predictive': 0,
      'analogical': 0,
      'deductive': 0,
      'inductive': 0,
      'abductive': 0,
      'ethical': 0,
      'practical': 0,
      'domain-specific': 0,
      'general': 0
    };
    
    inferences.// src/core/reason-layer.ts

/**
 * Reason Layer for the Critique of Artificial Reason (CAR)
 * 
 * This module implements Kant's "Transcendental Dialectic" - the theory of reason
 * and its principles of inference, judgment, and the systematic organization of knowledge.
 * 
 * In Kant's philosophy, reason is our faculty for making inferences and deriving concepts 
 * not given directly in experience. It has both a legitimate function of organizing 
 * understanding's concepts into systematic unity, and an illegitimate function when it
 * attempts to know objects beyond all possible experience (which leads to antinomies).
 * 
 * Reason also has a regulative role in guiding inquiry and a practical role in ethics,
 * providing the foundation for the categorical imperative.
 * 
 * In CAR, the Reason Layer builds on the categories of understanding to generate inferences,
 * create systematic unity of knowledge, perform ethical reasoning, and make decisions.
 */

import {
  ProcessedData,
  Inference,
  InferenceType,
  EthicalAnalysis,
  Decision,
  CategorizedData
} from './interfaces';

/**
 * Configuration options for the Reason Layer
 */
export interface ReasonLayerOptions {
  /** Inference generation settings */
  inference?: {
    /** Enable causal reasoning */
    enableCausalReasoning?: boolean;
    
    /** Enable structural reasoning */
    enableStructuralReasoning?: boolean;
    
    /** Enable predictive reasoning */
    enablePredictiveReasoning?: boolean;
    
    /** Enable analogical reasoning */
    enableAnalogicalReasoning?: boolean;
    
    /** Enable deductive reasoning */
    enableDeductiveReasoning?: boolean;
    
    /** Enable inductive reasoning */
    enableInductiveReasoning?: boolean;
    
    /** Enable abductive reasoning (inference to best explanation) */
    enableAbductiveReasoning?: boolean;
    
    /** Maximum number of inferences to generate */
    maxInferences?: number;
  };
  
  /** Ethical reasoning settings */
  ethics?: {
    /** Enable autonomy assessment */
    enableAutonomyAssessment?: boolean;
    
    /** Enable beneficence assessment */
    enableBeneficenceAssessment?: boolean;
    
    /** Enable non-maleficence assessment */
    enableNonMaleficenceAssessment?: boolean;
    
    /** Enable justice assessment */
    enableJusticeAssessment?: boolean;
    
    /** Additional ethical frameworks to consider */
    additionalFrameworks?: string[];
  };
  
  /** Decision generation settings */
  decision?: {
    /** Confidence threshold for including an inference in decision (0-1) */
    inferenceConfidenceThreshold?: number;
    
    /** Weight of ethical considerations in decision making (0-1) */
    ethicalWeight?: number;
    
    /** Generate alternative decisions */
    generateAlternatives?: boolean;
    
    /** Maximum number of alternative decisions to generate */
    maxAlternatives?: number;
  };
  
  /** Thresholds and weights */
  thresholds?: {
    /** Minimum confidence for an inference to be considered strong (0-1) */
    strongInferenceThreshold: number;
    
    /** Threshold for ethical concerns to influence decisions (0-1) */
    ethicalConcernThreshold: number;
  };
}

/**
 * Reason Layer class - implements Kant's faculty of reason
 */
export class ReasonLayer {
  private options: ReasonLayerOptions;
  
  /**
   * Initialize the Reason Layer with optional configuration
   */
  constructor(options?: ReasonLayerOptions) {
    this.options = {
      inference: {
        enableCausalReasoning: options?.inference?.enableCausalReasoning ?? true,
        enableStructuralReasoning: options?.inference?.enableStructuralReasoning ?? true,
        enablePredictiveReasoning: options?.inference?.enablePredictiveReasoning ?? true,
        enableAnalogicalReasoning: options?.inference?.enableAnalogicalReasoning ?? true,
        enableDeductiveReasoning: options?.inference?.enableDeductiveReasoning ?? true,
        enableInductiveReasoning: options?.inference?.enableInductiveReasoning ?? true,
        enableAbductiveReasoning: options?.inference?.enableAbductiveReasoning ?? true,
        maxInferences: options?.inference?.maxInferences ?? 10
      },
      ethics: {
        enableAutonomyAssessment: options?.ethics?.enableAutonomyAssessment ?? true,
        enableBeneficenceAssessment: options?.ethics?.enableBeneficenceAssessment ?? true,
        enableNonMaleficenceAssessment: options?.ethics?.enableNonMaleficenceAssessment ?? true,
        enableJusticeAssessment: options?.ethics?.enableJusticeAssessment ?? true,
        additionalFrameworks: options?.ethics?.additionalFrameworks ?? []
      },
      decision: {
        inferenceConfidenceThreshold: options?.decision?.inferenceConfidenceThreshold ?? 0.6,
        ethicalWeight: options?.decision?.ethicalWeight ?? 0.5,
        generateAlternatives: options?.decision?.generateAlternatives ?? true,
        maxAlternatives: options?.decision?.maxAlternatives ?? 3
      },
      thresholds: {
        strongInferenceThreshold: options?.thresholds?.strongInferenceThreshold ?? 0.75,
        ethicalConcernThreshold: options?.thresholds?.ethicalConcernThreshold ?? 0.6
      }
    };
  }
  
  /**
   * Process data through the Reason Layer (Kant's faculty of reason)
   * 
   * @param data Processed data from the Understanding Layer
   * @returns Reasoning results including inferences, ethical analysis, and decisions
   */
  public process(data: ProcessedData): {
    inferences: Inference[];
    ethicalAnalysis: EthicalAnalysis;
    proposedAction: string;
    reasoning: string;
  } {
    // Extract categorized data from the understanding layer
    const categorizedData = data.raw.categorizedData as CategorizedData;
    const previousData = data.raw.previousData;
    
    // Generate inferences from the categorized data
    const inferences = this.generateInferences(categorizedData, previousData);
    
    // Perform ethical analysis based on inferences and categorized data
    const ethicalAnalysis = this.ethicalReasoning(inferences, categorizedData);
    
    // Generate decision based on inferences and ethical analysis
    const decision = this.generateDecision(inferences, ethicalAnalysis, categorizedData);
    
    return {
      inferences,
      ethicalAnalysis,
      proposedAction: decision.action,
      reasoning: decision.reasoning
    };
  }
  
  /**
   * Generate inferences from categorized data
   * This represents Kant's faculty of reason organizing concepts into systematic unity
   * 
   * @param categorizedData Data processed through the Understanding Layer's categories
   * @param previousData Data from previous processing layers
   * @returns Array of inferences drawn from the data
   */
  private generateInferences(categorizedData: CategorizedData, previousData: any): Inference[] {
    const inferences: Inference[] = [];
    
    // Apply different types of reasoning based on configuration
    
    // Causal reasoning - inferring causes and effects
    if (this.options.inference!.enableCausalReasoning) {
      const causalInferences = this.generateCausalInferences(categorizedData);
      inferences.push(...causalInferences);
    }
    
    // Structural reasoning - inferring patterns and relationships
    if (this.options.inference!.enableStructuralReasoning) {
      const structuralInferences = this.generateStructuralInferences(categorizedData);
      inferences.push(...structuralInferences);
    }
    
    // Predictive reasoning - inferring future states or outcomes
    if (this.options.inference!.enablePredictiveReasoning) {
      const predictiveInferences = this.generatePredictiveInferences(categorizedData);
      inferences.push(...predictiveInferences);
    }
    
    // Analogical reasoning - inferring similarities between domains
    if (this.options.inference!.enableAnalogicalReasoning) {
      const analogicalInferences = this.generateAnalogicalInferences(categorizedData, previousData);
      inferences.push(...analogicalInferences);
    }
    
    // Deductive reasoning - inferring specifics from general principles
    if (this.options.inference!.enableDeductiveReasoning) {
      const deductiveInferences = this.generateDeductiveInferences(categorizedData);
      inferences.push(...deductiveInferences);
    }
    
    // Inductive reasoning - inferring general principles from specifics
    if (this.options.inference!.enableInductiveReasoning) {
      const inductiveInferences = this.generateInductiveInferences(categorizedData, previousData);
      inferences.push(...inductiveInferences);
    }
    
    // Abductive reasoning - inference to the best explanation
    if (this.options.inference!.enableAbductiveReasoning) {
      const abductiveInferences = this.generateAbductiveInferences(categorizedData);
      inferences.push(...abductiveInferences);
    }
    
    // Add domain-specific inferences
    const domainInferences = this.generateDomainSpecificInferences(categorizedData, previousData);
    inferences.push(...domainInferences);
    
    // Sort inferences by confidence (highest first)
    const sortedInferences = inferences.sort((a, b) => b.confidence - a.confidence);
    
    // Limit the number of inferences
    return sortedInferences.slice(0, this.options.inference!.maxInferences);
  }
  
  /**
   * Perform ethical reasoning based on inferences and categorized data
   * This represents Kant's practical reason and its moral principles
   * 
   * @param inferences Inferences generated from the data
   * @param categorizedData Data processed through the Understanding Layer's categories
   * @returns Ethical analysis of the inferences and data
   */
  private ethicalReasoning(inferences: Inference[], categorizedData: CategorizedData): EthicalAnalysis {
    // Initialize ethical analysis with default values
    const ethicalAnalysis: EthicalAnalysis = {
      autonomyImplications: "No clear implications for autonomy",
      beneficenceAssessment: "No clear benefits identified",
      nonMaleficenceRisks: [],
      justiceConsiderations: "No justice concerns identified",
      additionalConsiderations: {}
    };
    
    // Assess autonomy implications
    if (this.options.ethics!.enableAutonomyAssessment) {
      ethicalAnalysis.autonomyImplications = this.assessAutonomyImplications(inferences, categorizedData);
    }
    
    // Assess beneficence (potential benefits)
    if (this.options.ethics!.enableBeneficenceAssessment) {
      ethicalAnalysis.beneficenceAssessment = this.assessBeneficence(inferences, categorizedData);
    }
    
    // Assess non-maleficence (potential harms)
    if (this.options.ethics!.enableNonMaleficenceAssessment) {
      ethicalAnalysis.nonMaleficenceRisks = this.assessNonMaleficence(inferences, categorizedData);
    }
    
    // Assess justice (fairness and equity)
    if (this.options.ethics!.enableJusticeAssessment) {
      ethicalAnalysis.justiceConsiderations = this.assessJustice(inferences, categorizedData);
    }
    
    // Assess additional ethical frameworks if configured
    if (this.options.ethics!.additionalFrameworks) {
      this.options.ethics!.additionalFrameworks.forEach(framework => {
        const assessment = this.assessAdditionalEthicalFramework(framework, inferences, categorizedData);
        if (assessment) {
          ethicalAnalysis.additionalConsiderations![framework] = assessment;
        }
      });
    }
    
    return ethicalAnalysis;
  }
  
  /**
   * Generate decision based on inferences and ethical analysis
   * This represents Kant's reason in its practical application
   * 
   * @param inferences Inferences generated from the data
   * @param ethicalAnalysis Ethical assessment of inferences and data
   * @param categorizedData Data processed through the Understanding Layer's categories
   * @returns Decision with action, reasoning, and alternatives
   */
  private generateDecision(
    inferences: Inference[], 
    ethicalAnalysis: EthicalAnalysis, 
    categorizedData: CategorizedData
  ): Decision {
    // Filter inferences based on confidence threshold
    const validInferences = inferences.filter(
      inference => inference.confidence >= this.options.decision!.inferenceConfidenceThreshold!
    );
    
    // If no valid inferences, generate a cautious decision
    if (validInferences.length === 0) {
      return {
        action: "Gather more information",
        reasoning: "Insufficient confidence in available inferences to make a decision",
        confidence: 0.5,
        alternatives: ["Proceed with caution", "Seek expert guidance"],
        expectedOutcomes: [
          {
            outcome: "More information leads to clearer decision path",
            likelihood: 0.8,
            timeframe: "short-term"
          }
        ]
      };
    }
    
    // Identify the strongest inference types to guide the decision
    const inferenceTypes = this.summarizeInferenceTypes(validInferences);
    
    // Check for ethical concerns that should influence the decision
    const ethicalConcerns = this.identifyEthicalConcerns(ethicalAnalysis);
    
    // Generate primary decision
    const primaryDecision = this.formulatePrimaryDecision(
      validInferences, 
      inferenceTypes, 
      ethicalConcerns,
      categorizedData
    );
    
    // Generate alternative decisions if enabled
    let alternatives: string[] | undefined;
    
    if (this.options.decision!.generateAlternatives) {
      alternatives = this.generateAlternativeDecisions(
        validInferences, 
        inferenceTypes, 
        ethicalConcerns, 
        primaryDecision.action,
        categorizedData
      );
    }
    
    // Generate expected outcomes
    const expectedOutcomes = this.generateExpectedOutcomes(
      primaryDecision.action, 
      validInferences, 
      ethicalConcerns
    );
    
    return {
      action: primaryDecision.action,
      reasoning: primaryDecision.reasoning,
      confidence: primaryDecision.confidence,
      alternatives,
      expectedOutcomes
    };
  }
  
  //=============================================================================
  // INFERENCE GENERATION METHODS
  //=============================================================================
  
  /**
   * Generate causal inferences
   * Looking for cause-effect relationships in the data
   */
  private generateCausalInferences(categorizedData: CategorizedData): Inference[] {
    const inferences: Inference[] = [];
    
    // Use causality analysis from categorized data if available
    if (categorizedData.causality) {
      const causalityData = categorizedData.causality;
      
      // Check for explicit causal relationships
      if (causalityData.causalRelationships && causalityData.causalRelationships.length > 0) {
        causalityData.causalRelationships.forEach(relationship => {
          const inference: Inference = {
            type: 'causal',
            inference: `${relationship.cause} causes ${relationship.effect}`,
            confidence: relationship.confidence,
            evidence: [`Causal strength: ${relationship.strength}`],
            counterevidence: []
          };
          
          // Check for potential uncertainty or counterevidence
          if (relationship.confidence < 0.7) {
            inference.counterevidence = ['Correlation may not imply causation'];
          }
          
          inferences.push(inference);
        });
      }
      
      // If no specific relationships but causality analysis exists, create general inference
      if (causalityData.causalChains > 0 && inferences.length === 0) {
        inferences.push({
          type: 'causal',
          inference: `Data suggests presence of ${causalityData.causalChains} causal chains`,
          confidence: 0.6,
          evidence: ['Causal structures detected in analysis'],
          counterevidence: ['Specific cause-effect relationships unclear']
        });
      }
    }
    
    // Look for temporal patterns that might suggest causality
    if (categorizedData.necessity && categorizedData.necessity.necessaryConditions > 0) {
      const necessityDetails = categorizedData.necessity.necessityDetails;
      
      if (necessityDetails) {
        necessityDetails.forEach(detail => {
          // Necessary conditions often imply causal relationships
          inferences.push({
            type: 'causal',
            inference: `${detail.condition} is necessary for ${detail.implications.join(', ')}`,
            confidence: detail.confidence,
            evidence: detail.implications,
            counterevidence: []
          });
        });
      }
    }
    
    return inferences;
  }
  
  /**
   * Generate structural inferences
   * Looking for patterns, structures, and relationships
   */
  private generateStructuralInferences(categorizedData: CategorizedData): Inference[] {
    const inferences: Inference[] = [];
    
    // Check for unity analysis (coherent wholes)
    if (categorizedData.unity) {
      const unityData = categorizedData.unity;
      
      if (unityData.unifiedEntities > 0) {
        // Create inference about structural unity
        inferences.push({
          type: 'structural',
          inference: `Data represents a coherent structure with ${unityData.unifiedEntities} unified entities`,
          confidence: 0.8,
          evidence: [unityData.unityAnalysis],
          counterevidence: []
        });
        
        // Check for specific unified properties
        if (unityData.unifiedProperties && unityData.unifiedProperties.length > 0) {
          unityData.unifiedProperties.forEach(property => {
            if (property.confidence > 0.7) {
              inferences.push({
                type: 'structural',
                inference: `Identified ${property.type} structure with high confidence`,
                confidence: property.confidence,
                evidence: [`${property.components || property.elements || 1} components identified`],
                counterevidence: []
              });
            }
          });
        }
      }
    }
    
    // Check for plurality analysis (relationships between elements)
    if (categorizedData.plurality) {
      const pluralityData = categorizedData.plurality;
      
      if (pluralityData.distinctElements > 3 && pluralityData.relationships) {
        // Create inference about complex relationships
        inferences.push({
          type: 'structural',
          inference: `Data contains a network of ${pluralityData.relationships.length} relationships among ${pluralityData.distinctElements} elements`,
          confidence: 0.75,
          evidence: [pluralityData.pluralityAnalysis],
          counterevidence: []
        });
        
        // Identify common relationship types
        const relationshipTypes = new Set(pluralityData.relationships.map(r => r.relationType));
        if (relationshipTypes.size > 0) {
          inferences.push({
            type: 'structural',
            inference: `System exhibits ${Array.from(relationshipTypes).join(', ')} relationships`,
            confidence: 0.7,
            evidence: [`${pluralityData.relationships.length} relationships identified`],
            counterevidence: []
          });
        }
      }
    }
    
    // Check for community/reciprocity analysis
    if (categorizedData.community) {
      const communityData = categorizedData.community;
      
      if (communityData.interactions && communityData.interactions.length > 0) {
        // Create inference about interactive system
        inferences.push({
          type: 'structural',
          inference: `Data represents an interactive system with ${communityData.reciprocalInteractions} reciprocal relationships`,
          confidence: 0.75,
          evidence: [communityData.communityAnalysis],
          counterevidence: []
        });
      }
    }
    
    // Check for totality analysis (complete systems)
    if (categorizedData.totality) {
      const totalityData = categorizedData.totality;
      
      if (totalityData.completeness > 0.7) {
        // Create inference about comprehensive system
        inferences.push({
          type: 'structural',
          inference: `Data represents a comprehensive system with ${totalityData.completeAspects}/${totalityData.totalAspects} aspects present`,
          confidence: totalityData.completeness,
          evidence: [totalityData.totalityAnalysis],
          counterevidence: []
        });
      }
    }
    
    return inferences;
  }
  
  /**
   * Generate predictive inferences
   * Forecasting future states or outcomes
   */
  private generatePredictiveInferences(categorizedData: CategorizedData): Inference[] {
    const inferences: Inference[] = [];
    
    // Check for possibility analysis to identify potential future states
    if (categorizedData.possibility) {
      const possibilityData = categorizedData.possibility;
      
      if (possibilityData.possibilityDetails && possibilityData.possibilityDetails.length > 0) {
        // Create predictive inferences from possibilities
        possibilityData.possibilityDetails.forEach(detail => {
          const confidenceFromLikelihood = detail.likelihood || 0.5;
          
          inferences.push({
            type: 'predictive',
            inference: `Future state: ${detail.state}`,
            confidence: confidenceFromLikelihood,
            evidence: detail.conditions,
            counterevidence: []
          });
        });
      }
    }
    
    // Use causal relationships to make predictions
    if (categorizedData.causality && categorizedData.causality.causalRelationships) {
      const causalRelationships = categorizedData.causality.causalRelationships;
      
      causalRelationships.forEach(relationship => {
        if (relationship.confidence > 0.6) {
          inferences.push({
            type: 'predictive',
            inference: `If ${relationship.cause} occurs, then ${relationship.effect} will likely follow`,
            confidence: relationship.confidence * 0.9, // Slightly lower confidence for prediction
            evidence: [`Causal relation with strength ${relationship.strength}`],
            counterevidence: ['Future states always contain uncertainty']
          });
        }
      });
    }
    
    // Check for trends that can be extrapolated
    if (categorizedData.totality && categorizedData.totality.totalityAnalysis.includes('trend')) {
      inferences.push({
        type: 'predictive',
        inference: 'The observed trend is likely to continue in the near future',
        confidence: 0.65,
        evidence: ['Consistent trend pattern detected'],
        counterevidence: ['External factors may disrupt trends']
      });
    }
    
    return inferences;
  }
  
  /**
   * Generate analogical inferences
   * Drawing parallels between different domains or situations
   */
  private generateAnalogicalInferences(categorizedData: CategorizedData, previousData: any): Inference[] {
    const inferences: Inference[] = [];
    
    // Check if there's domain-specific information that could support analogies
    const domainInfo = this.extractDomainInformation(categorizedData, previousData);
    
    if (domainInfo.domain) {
      // Generate domain-specific analogies
      switch (domainInfo.domain) {
        case 'healthcare':
          if (domainInfo.subtype === 'diagnosis') {
            inferences.push({
              type: 'analogical',
              inference: 'This case shows patterns similar to previously documented medical conditions',
              confidence: 0.7,
              evidence: ['Symptom patterns match known diagnostic categories'],
              counterevidence: ['Individual variations may exist']
            });
          }
          break;
        
        case 'education':
          inferences.push({
            type: 'analogical',
            inference: 'Learning patterns observed here resemble established educational models',
            confidence: 0.65,
            evidence: ['Similarities to documented learning progressions'],
            counterevidence: ['Educational contexts vary significantly']
          });
          break;
        
        case 'finance':
          inferences.push({
            type: 'analogical',
            inference: 'This financial pattern is analogous to historical market behaviors',
            confidence: 0.6,
            evidence: ['Similar patterns in market history'],
            counterevidence: ['Past performance does not guarantee future results']
          });
          break;
      }
    }
    
    // Look for structural patterns that might support analogies
    if (categorizedData.unity && categorizedData.unity.unifiedProperties) {
      const structures = categorizedData.unity.unifiedProperties;
      
      // Generate analogies based on structural patterns
      structures.forEach(structure => {
        if (structure.type === 'hierarchy') {
          inferences.push({
            type: 'analogical',
            inference: 'This hierarchical structure functions similarly to organizational systems',
            confidence: 0.6,
            evidence: ['Clear hierarchical organization detected'],
            counterevidence: ['Functional differences may exist despite structural similarities']
          });
        } else if (structure.type === 'network') {
          inferences.push({
            type: 'analogical',
            inference: 'This network structure resembles social or neural networks',
            confidence: 0.65,
            evidence: ['Network connectivity patterns identified'],
            counterevidence: ['Topological similarities may not imply functional similarities']
          });
        }
      });
    }
    
    // If we have causal relationships, we can draw analogies to similar causal systems
    if (categorizedData.causality && categorizedData.causality.causalRelationships) {
      inferences.push({
        type: 'analogical',
        inference: 'The causal relationships here parallel those in similar systems',
        confidence: 0.55,
        evidence: ['Causal pattern recognition'],
        counterevidence: ['Causal mechanisms may differ despite similar patterns']
      });
    }
    
    return inferences;
  }
  
  /**
   * Generate deductive inferences
   * Applying general principles to specific cases
   */
  private generateDeductiveInferences(categorizedData: CategorizedData): Inference[] {
    const inferences: Inference[] = [];
    
    // Check for necessity analysis, which provides universal rules
    if (categorizedData.necessity && categorizedData.necessity.necessaryConditions > 0) {
      const necessityDetails = categorizedData.necessity.necessityDetails;
      
      if (necessityDetails) {
        necessityDetails.forEach(detail => {
          if (detail.confidence > 0.7) {
            // Create deductive inference from necessary condition
            inferences.push({
              type: 'deductive',
              inference: `Given that ${detail.condition} is necessary, it follows that ${detail.implications.join('; ')}`,
              confidence: detail.confidence,
              evidence: [`Necessary condition: ${detail.condition}`],
              counterevidence: []
            });
          }
        });
      }
    }
    
    // Use existence analysis to make deductions about what must exist
    if (categorizedData.existence && categorizedData.existence.existingEntities) {
      const existingEntities = categorizedData.existence.existingEntities;
      
      // Look for entities with high confidence
      existingEntities.filter(entity => entity.confidence > 0.8).forEach(entity => {
        inferences.push({
          type: 'deductive',
          inference: `Since ${entity.name} exists, it must have the essential properties of a ${entity.entityType}`,
          confidence: entity.confidence,
          evidence: [`Confirmed existence of ${entity.name}`],
          counterevidence: []
        });
      });
    }
    
    // Check for clear categorical relationships
    if (categorizedData.plurality && categorizedData.plurality.relationships) {
      const relationships = categorizedData.plurality.relationships;
      
      // Find "isA" or categorical relationships for deductive reasoning
      const categoricalRelationships = relationships.filter(rel => 
        rel.relationType === 'isA' || rel.relationType === 'category'
      );
      
      categoricalRelationships.forEach(rel => {
        inferences.push({
          type: 'deductive',
          inference: `${rel.from} is a type of ${rel.to}, therefore it must have all the essential properties of ${rel.to}`,
          confidence: 0.85,
          evidence: [`Categorical relationship established`],
          counterevidence: []
        });
      });
    }
    
    return inferences;
  }
  
  /**
   * Generate inductive inferences
   * Deriving general principles from specific cases
   */
  private generateInductiveInferences(categorizedData: CategorizedData, previousData: any): Inference[] {
    const inferences: Inference[] = [];
    
    // Check for patterns across multiple instances
    if (previousData.rawFeatures && Array.isArray(previousData.rawFeatures)) {
      const features = previousData.rawFeatures;
      
      // Look for common properties across features
      const commonProperties = this.findCommonProperties(features);
      
      if (Object.keys(commonProperties).length > 0) {
        // Generate inductive inferences about common properties
        Object.entries(commonProperties).forEach(([property, frequency]) => {
          const confidence = Math.min(frequency, 0.9); // Cap confidence at 0.9
          
          inferences.push({
            type: 'inductive',
            inference: `${Math.round(frequency * 100)}% of observed instances have the property: ${property}`,
            confidence,
            evidence: [`Observed in ${Math.round(frequency * 100)}% of cases`],
            counterevidence: frequency < 1 ? [`Not universal (${Math.round((1-frequency) * 100)}% exceptions)`] : []
          });
        });
      }
    }
    
    // Use plurality analysis to generalize about relationships
    if (categorizedData.plurality && categorizedData.plurality.distinctElements > 3) {
      inferences.push({
        type: 'inductive',
        inference: `Systems with ${categorizedData.plurality.distinctElements} distinct elements typically exhibit complex interactions`,
        confidence: 0.6,
        evidence: ['Multiple distinct elements identified'],
        counterevidence: ['Number of elements alone doesn\'t guarantee complexity']
      });
    }
    
    // Use totality analysis to generalize about completeness
    if (categorizedData.totality && categorizedData.totality.completeness > 0.8) {
      inferences.push({
        type: 'inductive',
        inference: 'Systems with this level of completeness tend to be stable and well-established',
        confidence: 0.7,
        evidence: [`${categorizedData.totality.completeAspects}/${categorizedData.totality.totalAspects} aspects present`],
        counterevidence: ['Completeness alone doesn\'t guarantee stability']
      });
    }
    
    return inferences;
  }
  
  /**
   * Generate abductive inferences (inference to best explanation)
   * Finding the most likely explanation for observations
   */
  private generateAbductiveInferences(categorizedData: CategorizedData): Inference[] {
    const inferences: Inference[] = [];
    
    // Check if we have evidence of causality
    if (categorizedData.causality && categorizedData.causality.causalRelationships) {
      // Look for effects without clear
