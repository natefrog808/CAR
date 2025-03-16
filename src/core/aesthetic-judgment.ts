aspect: element.toString(),
            objectA: `${qualityA > 0.7 ? "strong" : qualityA > 0.4 ? "moderate" : "weak"} ${element}`,
            objectB: `${qualityB > 0.7 ? "strong" : qualityB > 0.4 ? "moderate" : "weak"} ${element}`
          });
        }
      }
    }
    
    // Find elements unique to A
    for (const [element, qualityA] of mapA.entries()) {
      if (!mapB.has(element) && qualityA > 0.5) {
        differences.push({
          aspect: element.toString(),
          objectA: `${qualityA > 0.7 ? "strong" : "moderate"} ${element}`,
          objectB: `minimal ${element}`
        });
      }
    }
    
    // Find elements unique to B
    for (const [element, qualityB] of mapB.entries()) {
      if (!mapA.has(element) && qualityB > 0.5) {
        differences.push({
          aspect: element.toString(),
          objectA: `minimal ${element}`,
          objectB: `${qualityB > 0.7 ? "strong" : "moderate"} ${element}`
        });
      }
    }
    
    return { commonalities, differences };
  }
  
  /**
   * Compare principle evaluations between two judgments
   */
  private comparePrincipleEvaluations(
    principlesA: { principle: AestheticPrinciple; relevance: number }[],
    principlesB: { principle: AestheticPrinciple; relevance: number }[]
  ): {
    commonalities: { aspect: string; description: string }[];
    differences: { aspect: string; objectA: string; objectB: string }[];
  } {
    const commonalities: { aspect: string; description: string }[] = [];
    const differences: { aspect: string; objectA: string; objectB: string }[] = [];
    
    // Create maps for easier comparison
    const mapA = new Map(principlesA.map(item => [item.principle, item.relevance]));
    const mapB = new Map(principlesB.map(item => [item.principle, item.relevance]));
    
    // Find common principles
    for (const [principle, relevanceA] of mapA.entries()) {
      if (mapB.has(principle)) {
        const relevanceB = mapB.get(principle)!;
        const relevanceDiff = Math.abs(relevanceA - relevanceB);
        
        if (relevanceDiff < 0.2) {
          // Similar relevance - commonality
          commonalities.push({
            aspect: principle.toString(),
            description: `Both exhibit ${relevanceA > 0.7 ? "strong" : "moderate"} ${principle}`
          });
        } else {
          // Different relevance - difference
          differences.push({
            aspect: principle.toString(),
            objectA: `${relevanceA > 0.7 ? "strong" : relevanceA > 0.4 ? "moderate" : "weak"} ${principle}`,
            objectB: `${relevanceB > 0.7 ? "strong" : relevanceB > 0.4 ? "moderate" : "weak"} ${principle}`
          });
        }
      }
    }
    
    // Find principles unique to A
    for (const [principle, relevanceA] of mapA.entries()) {
      if (!mapB.has(principle) && relevanceA > 0.5) {
        differences.push({
          aspect: principle.toString(),
          objectA: `${relevanceA > 0.7 ? "strong" : "moderate"} ${principle}`,
          objectB: `minimal ${principle}`
        });
      }
    }
    
    // Find principles unique to B
    for (const [principle, relevanceB] of mapB.entries()) {
      if (!mapA.has(principle) && relevanceB > 0.5) {
        differences.push({
          aspect: principle.toString(),
          objectA: `minimal ${principle}`,
          objectB: `${relevanceB > 0.7 ? "strong" : "moderate"} ${principle}`
        });
      }
    }
    
    return { commonalities, differences };
  }
  
  /**
   * Evaluate mathematical sublime
   */
  private evaluateMathematicalSublime(object: AestheticObject): {
    magnitude: number;
    explanation: string;
  } {
    // This would implement specialized analysis of mathematical sublime
    // (overwhelming magnitude or quantity)
    
    // For now, use placeholder metrics based on domain
    let magnitude = 0.5; // Default
    
    // Adjust based on domain
    switch (object.domain) {
      case AestheticDomain.MATHEMATICAL:
      case AestheticDomain.SCIENTIFIC:
        magnitude += 0.2;
        break;
      case AestheticDomain.VISUAL:
        // Check for vastness in visual domain
        if (object.metadata?.scale === 'vast' || object.metadata?.infinite === true) {
          magnitude += 0.3;
        }
        break;
      case AestheticDomain.CONCEPTUAL:
        // Check for complexity in conceptual domain
        if (object.metadata?.complexity === 'high' || object.metadata?.scope === 'universal') {
          magnitude += 0.25;
        }
        break;
    }
    
    // Explanation based on magnitude
    let explanation;
    if (magnitude > 0.75) {
      explanation = "This object evokes the mathematical sublime through its suggestion of infinity or vastness, which initially overwhelms the imagination but ultimately allows reason to grasp what sensibility cannot.";
    } else if (magnitude > 0.6) {
      explanation = "This object contains elements of the mathematical sublime through its scale or extent, challenging but not overwhelming the imagination.";
    } else {
      explanation = "This object does not strongly evoke the mathematical sublime, as it lacks the overwhelming magnitude that would challenge the imagination's capacity for comprehension.";
    }
    
    return { magnitude, explanation };
  }
  
  /**
   * Evaluate dynamical sublime
   */
  private evaluateDynamicalSublime(object: AestheticObject): {
    magnitude: number;
    explanation: string;
  } {
    // This would implement specialized analysis of dynamical sublime
    // (overwhelming power or force)
    
    // For now, use placeholder metrics based on domain
    let magnitude = 0.5; // Default
    
    // Adjust based on domain
    switch (object.domain) {
      case AestheticDomain.VISUAL:
        // Check for power in visual domain
        if (object.metadata?.power === 'overwhelming' || object.metadata?.force === 'intense') {
          magnitude += 0.3;
        }
        break;
      case AestheticDomain.AUDITORY:
        // Check for intensity in auditory domain
        if (object.metadata?.intensity === 'high' || object.metadata?.dynamicRange === 'extreme') {
          magnitude += 0.25;
        }
        break;
      case AestheticDomain.ETHICAL:
        // Check for moral force in ethical domain
        if (object.metadata?.moralIntensity === 'high' || object.metadata?.imperativeForce === 'strong') {
          magnitude += 0.3;
        }
        break;
    }
    
    // Explanation based on magnitude
    let explanation;
    if (magnitude > 0.75) {
      explanation = "This object evokes the dynamical sublime through its suggestion of overwhelming power or force, which threatens our physical sense but affirms our moral and rational nature.";
    } else if (magnitude > 0.6) {
      explanation = "This object contains elements of the dynamical sublime through its expression of power or force, creating a sense of respectful awe.";
    } else {
      explanation = "This object does not strongly evoke the dynamical sublime, as it lacks the sense of overwhelming power that would challenge our physical sense while elevating our rational nature.";
    }
    
    return { magnitude, explanation };
  }
  
  /**
   * Determine whether a judgment claims universality
   */
  private determineUniversalityClaim(
    judgmentType: AestheticJudgmentType,
    principleEvaluation: { principle: AestheticPrinciple; relevance: number }[]
  ): boolean {
    // Beautiful and sublime judgments claim universality
    if (judgmentType === AestheticJudgmentType.BEAUTIFUL || 
        judgmentType === AestheticJudgmentType.SUBLIME) {
      return true;
    }
    
    // Check if universality principle is highly relevant
    const universalityPrinciple = principleEvaluation.find(
      p => p.principle === AestheticPrinciple.UNIVERSALITY
    );
    
    if (universalityPrinciple && universalityPrinciple.relevance > 0.7) {
      return true;
    }
    
    // Elegant and good judgments often claim some universality
    if ((judgmentType === AestheticJudgmentType.ELEGANT || 
         judgmentType === AestheticJudgmentType.GOOD) && 
        Math.random() > 0.3) { // Some randomness to simulate varied cases
      return true;
    }
    
    return false;
  }
  
  /**
   * Reflect on a judgment to improve generation parameters
   */
  private reflectAndImproveParameters(
    parameters: GenerationParameters,
    judgment: AestheticJudgmentResult
  ): GenerationParameters {
    // Create a copy of the parameters to modify
    const newParameters: GenerationParameters = { ...parameters };
    
    // If a target judgment was specified, adjust based on the gap
    if (parameters.target && parameters.target !== judgment.judgmentType) {
      // Adjust formal elements based on target
      newParameters.formalElements = this.adjustFormalElementsForTarget(
        parameters.target,
        judgment.judgmentType,
        judgment.formalAnalysis || []
      );
      
      // Adjust principles based on target
      const targetPrinciples = this.getPrinciplesForJudgmentType(parameters.target);
      newParameters.principles = targetPrinciples;
    } else {
      // If no target or already matched, enhance the strongest aspects
      const topElements = judgment.formalAnalysis?.slice(0, 3).map(e => e.element) || [];
      const topPrinciples = judgment.principles.slice(0, 3).map(p => p.principle);
      
      newParameters.formalElements = topElements;
      newParameters.principles = topPrinciples;
    }
    
    // Adjust generation mode based on the judgment
    newParameters.mode = this.selectGenerationMode(judgment);
    
    // If confidence is low, add more specific constraints
    if (judgment.confidence < 0.6) {
      newParameters.constraints = {
        ...(parameters.constraints || {}),
        enhanceClarity: true,
        strengthenTheme: true
      };
    }
    
    return newParameters;
  }
  
  /**
   * Adjust formal elements to better match a target judgment type
   */
  private adjustFormalElementsForTarget(
    target: AestheticJudgmentType,
    current: AestheticJudgmentType,
    formalAnalysis: { element: FormalElement; quality: number }[]
  ): FormalElement[] {
    const elements: FormalElement[] = [];
    
    // Add elements based on target judgment type
    switch (target) {
      case AestheticJudgmentType.BEAUTIFUL:
        elements.push(FormalElement.UNITY, FormalElement.HARMONY, FormalElement.PROPORTION);
        break;
      case AestheticJudgmentType.SUBLIME:
        elements.push(FormalElement.SCALE, FormalElement.TENSION, FormalElement.CONTRAST);
        break;
      case AestheticJudgmentType.ELEGANT:
        elements.push(FormalElement.PROPORTION, FormalElement.BALANCE, FormalElement.SIMPLICITY);
        break;
      case AestheticJudgmentType.INTERESTING:
        elements.push(FormalElement.VARIETY, FormalElement.CONTRAST, FormalElement.RHYTHM);
        break;
      case AestheticJudgmentType.UNIFIED:
        elements.push(FormalElement.UNITY, FormalElement.HIERARCHY, FormalElement.BALANCE);
        break;
      case AestheticJudgmentType.EXPRESSIVE:
        elements.push(FormalElement.CONTRAST, FormalElement.MOVEMENT, FormalElement.TENSION);
        break;
      default:
        // Keep some of the current elements that had high quality
        elements.push(...formalAnalysis
          .filter(e => e.quality > 0.7)
          .slice(0, 2)
          .map(e => e.element));
        break;
    }
    
    // Ensure we have at least some elements
    if (elements.length === 0) {
      elements.push(FormalElement.UNITY, FormalElement.VARIETY, FormalElement.BALANCE);
    }
    
    return elements;
  }
  
  /**
   * Get principles appropriate for a judgment type
   */
  private getPrinciplesForJudgmentType(type: AestheticJudgmentType): AestheticPrinciple[] {
    switch (type) {
      case AestheticJudgmentType.BEAUTIFUL:
        return [
          AestheticPrinciple.PURPOSIVENESS,
          AestheticPrinciple.UNIVERSALITY,
          AestheticPrinciple.FREE_PLAY
        ];
      case AestheticJudgmentType.SUBLIME:
        return [
          AestheticPrinciple.NECESSITY,
          AestheticPrinciple.COMPLEXITY,
          AestheticPrinciple.EXPRESSIVENESS
        ];
      case AestheticJudgmentType.ELEGANT:
        return [
          AestheticPrinciple.SIMPLICITY,
          AestheticPrinciple.COHERENCE,
          AestheticPrinciple.PURPOSIVENESS
        ];
      case AestheticJudgmentType.INTERESTING:
        return [
          AestheticPrinciple.COMPLEXITY,
          AestheticPrinciple.ORIGINALITY,
          AestheticPrinciple.FREE_PLAY
        ];
      case AestheticJudgmentType.UNIFIED:
        return [
          AestheticPrinciple.COHERENCE,
          AestheticPrinciple.PURPOSIVENESS,
          AestheticPrinciple.SIMPLICITY
        ];
      case AestheticJudgmentType.EXPRESSIVE:
        return [
          AestheticPrinciple.EXPRESSIVENESS,
          AestheticPrinciple.ORIGINALITY,
          AestheticPrinciple.AUTONOMY
        ];
      default:
        return [
          AestheticPrinciple.FREE_PLAY,
          AestheticPrinciple.ORIGINALITY,
          AestheticPrinciple.COHERENCE
        ];
    }
  }
  
  /**
   * Select an appropriate generation mode based on judgment
   */
  private selectGenerationMode(judgment: AestheticJudgmentResult): GenerationMode {
    // Get the top faculty
    const topFaculty = judgment.faculties[0]?.faculty;
    
    // Select mode based on judgment type and faculty
    switch (judgment.judgmentType) {
      case AestheticJudgmentType.BEAUTIFUL:
        return GenerationMode.FREE_PLAY;
      case AestheticJudgmentType.SUBLIME:
        return GenerationMode.SUBLIME;
      case AestheticJudgmentType.ELEGANT:
        return GenerationMode.FORMAL;
      case AestheticJudgmentType.INTERESTING:
        return topFaculty === Faculty.IMAGINATION
          ? GenerationMode.FREE_PLAY
          : GenerationMode.DIALECTICAL;
      case AestheticJudgmentType.NOVEL:
        return GenerationMode.DIALECTICAL;
      case AestheticJudgmentType.UNIFIED:
        return GenerationMode.SCHEMATIC;
      case AestheticJudgmentType.EXPRESSIVE:
        return GenerationMode.EXEMPLAR_BASED;
      default:
        return GenerationMode.REFLECTIVE;
    }
  }
  
  /**
   * Identify formal elements appropriate for generation
   */
  private identifyFormalElementsForGeneration(parameters: GenerationParameters): FormalElement[] {
    // Base elements on generation mode
    const elements: FormalElement[] = [];
    
    switch (parameters.mode) {
      case GenerationMode.FREE_PLAY:
        elements.push(FormalElement.VARIETY, FormalElement.CONTRAST, FormalElement.MOVEMENT);
        break;
      case GenerationMode.FORMAL:
        elements.push(FormalElement.UNITY, FormalElement.PROPORTION, FormalElement.SYMMETRY);
        break;
      case GenerationMode.SCHEMATIC:
        elements.push(FormalElement.PATTERN, FormalElement.HIERARCHY, FormalElement.RHYTHM);
        break;
      case GenerationMode.SUBLIME:
        elements.push(FormalElement.SCALE, FormalElement.TENSION, FormalElement.CONTRAST);
        break;
      case GenerationMode.DIALECTICAL:
        elements.push(FormalElement.TENSION, FormalElement.RESOLUTION, FormalElement.CONTRAST);
        break;
      default:
        elements.push(FormalElement.BALANCE, FormalElement.VARIETY, FormalElement.UNITY);
        break;
    }
    
    return elements;
  }
  
  /**
   * Generate a visual composition (placeholder implementation)
   */
  private generateVisualElements(parameters: GenerationParameters): any {
    // This would implement visual generation techniques
    // For now, return a placeholder structure
    return {
      shapes: ["circle", "rectangle", "triangle"],
      colors: ["blue", "red", "yellow"],
      textures: ["smooth", "rough"],
      arrangement: "grid"
    };
  }
  
  /**
   * Generate a composition (placeholder implementation)
   */
  private generateComposition(parameters: GenerationParameters): any {
    // This would implement composition generation techniques
    // For now, return a placeholder structure
    return {
      type: "balanced",
      focusPoint: { x: 0.5, y: 0.5 },
      direction: "radial"
    };
  }
  
  /**
   * Generate a style (placeholder implementation)
   */
  private generateStyle(parameters: GenerationParameters): any {
    // This would implement style generation techniques
    // For now, return a placeholder structure
    return {
      mode: "minimalist",
      contrast: "high",
      palette: "complementary"
    };
  }
  
  /**
   * Generate text (placeholder implementation)
   */
  private generateText(parameters: GenerationParameters): string {
    // This would implement text generation techniques
    // For now, return a placeholder text
    return "This is generated text that would embody the aesthetic principles specified in the parameters.";
  }
  
  /**
   * Generate text structure (placeholder implementation)
   */
  private generateTextStructure(parameters: GenerationParameters): any {
    // This would implement text structure generation techniques
    // For now, return a placeholder structure
    return {
      format: "prose",
      sections: 3,
      rhythm: "flowing"
    };
  }
  
  /**
   * Generate text style (placeholder implementation)
   */
  private generateTextStyle(parameters: GenerationParameters): any {
    // This would implement text style generation techniques
    // For now, return a placeholder structure
    return {
      voice: "reflective",
      imagery: "abstract",
      tense: "present"
    };
  }
  
  /**
   * Generate an algorithm (placeholder implementation)
   */
  private generateAlgorithm(parameters: GenerationParameters): any {
    // This would implement algorithm generation techniques
    // For now, return a placeholder structure
    return {
      type: "recursive",
      complexity: "O(n log n)",
      approach: "divide and conquer"
    };
  }
  
  /**
   * Generate code structure (placeholder implementation)
   */
  private generateCodeStructure(parameters: GenerationParameters): any {
    // This would implement code structure generation techniques
    // For now, return a placeholder structure
    return {
      modularity: "high",
      patternUsage: ["observer", "factory"],
      errorHandling: "robust"
    };
  }
  
  /**
   * Generate code style (placeholder implementation)
   */
  private generateCodeStyle(parameters: GenerationParameters): any {
    // This would implement code style generation techniques
    // For now, return a placeholder structure
    return {
      naming: "descriptive",
      formatting: "consistent",
      documentation: "thorough"
    };
  }
  
  /**
   * Generate generic structure (placeholder implementation)
   */
  private generateGenericStructure(parameters: GenerationParameters): any {
    // This would implement generic structure generation techniques
    // For now, return a placeholder structure
    return {
      complexity: "moderate",
      organization: "hierarchical",
      coherence: "high"
    };
  }
  
  /**
   * Generate generic elements (placeholder implementation)
   */
  private generateGenericElements(parameters: GenerationParameters): any[] {
    // This would implement generic elements generation techniques
    // For now, return placeholder elements
    return [
      { type: "core", importance: "high" },
      { type: "supporting", importance: "medium" },
      { type: "detail", importance: "low" }
    ];
  }
  
  /**
   * Generate generic style (placeholder implementation)
   */
  private generateGenericStyle(parameters: GenerationParameters): any {
    // This would implement generic style generation techniques
    // For now, return a placeholder structure
    return {
      approach: "balanced",
      emphasis: "clarity",
      tone: "neutral"
    };
  }
  
  /**
   * Evaluate universality of an aesthetic object
   */
  private evaluateUniversality(
    object: AestheticObject,
    judgment: AestheticJudgmentResult
  ): number {
    // Base universality on judgment type
    let universality = 0.5; // Default
    
    // Beautiful and sublime judgments claim high universality
    if (judgment.judgmentType === AestheticJudgmentType.BEAUTIFUL ||
        judgment.judgmentType === AestheticJudgmentType.SUBLIME) {
      universality += 0.3;
    } else if (judgment.judgmentType === AestheticJudgmentType.AGREEABLE) {
      // Agreeable judgments claim low universality
      universality -= 0.2;
    }
    
    // Adjust based on principles
    const universalityPrinciple = judgment.principles.find(
      p => p.principle === AestheticPrinciple.UNIVERSALITY
    );
    
    if (universalityPrinciple) {
      universality += universalityPrinciple.relevance * 0.2;
    }
    
    // Adjust based on faculty engagement
    const reasonFaculty = judgment.faculties.find(
      f => f.faculty === Faculty.REASON
    );
    
    if (reasonFaculty) {
      universality += reasonFaculty.engagement * 0.1;
    }
    
    // Ensure result is in 0-1 range
    return Math.min(1, Math.max(0, universality));
  }
  
  /**
   * Evaluate accessibility of an aesthetic object
   */
  private evaluateAccessibility(
    object: AestheticObject,
    judgment: AestheticJudgmentResult
  ): number {
    // Base accessibility on judgment type
    let accessibility = 0.5; // Default
    
    // Agreeable and elegant judgments tend to be more accessible
    if (judgment.judgmentType === AestheticJudgmentType.AGREEABLE ||
        judgment.judgmentType === AestheticJudgmentType.ELEGANT) {
      accessibility += 0.2;
    } else if (judgment.judgmentType === AestheticJudgmentType.SUBLIME) {
      // Sublime judgments tend to be less accessible
      accessibility -= 0.1;
    }
    
    // Adjust based on formal elements
    const unityElement = judgment.formalAnalysis?.find(
      e => e.element === FormalElement.UNITY
    );
    
    if (unityElement) {
      accessibility += unityElement.quality * 0.1;
    }
    
    const complexityPrinciple = judgment.principles.find(
      p => p.principle === AestheticPrinciple.COMPLEXITY
    );
    
    if (complexityPrinciple) {
      accessibility -= complexityPrinciple.relevance * 0.1;
    }
    
    // Adjust based on domain
    switch (object.domain) {
      case AestheticDomain.VISUAL:
      case AestheticDomain.AUDITORY:
        accessibility += 0.1; // Usually more accessible
        break;
      case AestheticDomain.MATHEMATICAL:
      case AestheticDomain.SCIENTIFIC:
        accessibility -= 0.1; // Usually less accessible
        break;
    }
    
    // Ensure result is in 0-1 range
    return Math.min(1, Math.max(0, accessibility));
  }
  
  /**
   * Evaluate emotional impact of an aesthetic object
   */
  private evaluateEmotionalImpact(
    object: AestheticObject,
    judgment: AestheticJudgmentResult
  ): number {
    // Base emotional impact on judgment type
    let impact = 0.5; // Default
    
    // Sublime and expressive judgments tend to have higher emotional impact
    if (judgment.judgmentType === AestheticJudgmentType.SUBLIME ||
        judgment.judgmentType === AestheticJudgmentType.EXPRESSIVE) {
      impact += 0.3;
    }
    
    // Adjust based on principles
    const expressivenessPrinciple = judgment.principles.find(
      p => p.principle === AestheticPrinciple.EXPRESSIVENESS
    );
    
    if (expressivenessPrinciple) {
      impact += expressivenessPrinciple.relevance * 0.3;
    }
    
    // Adjust based on formal elements
    const contrastElement = judgment.formalAnalysis?.find(
      e => e.element === FormalElement.CONTRAST
    );
    
    if (contrastElement) {
      impact += contrastElement.quality * 0.1;
    }
    
    const tensionElement = judgment.formalAnalysis?.find(
      e => e.element === FormalElement.TENSION
    );
    
    if (tensionElement) {
      impact += tensionElement.quality * 0.1;
    }
    
    // Ensure result is in 0-1 range
    return Math.min(1, Math.max(0, impact));
  }
  
  /**
   * Evaluate intellectual engagement of an aesthetic object
   */
  private evaluateIntellectualEngagement(
    object: AestheticObject,
    judgment: AestheticJudgmentResult
  ): number {
    // Base intellectual engagement on judgment type
    let engagement = 0.5; // Default
    
    // Certain judgment types tend to involve more intellectual engagement
    if (judgment.judgmentType === AestheticJudgmentType.ELEGANT ||
        judgment.judgmentType === AestheticJudgmentType.INTERESTING) {
      engagement += 0.2;
    }
    
    // Adjust based on faculty engagement
    const understandingFaculty = judgment.faculties.find(
      f => f.faculty === Faculty.UNDERSTANDING
    );
    
    if (understandingFaculty) {
      engagement += understandingFaculty.engagement * 0.2;
    }
    
    const reasonFaculty = judgment.faculties.find(
      f => f.faculty === Faculty.REASON
    );
    
    if (reasonFaculty) {
      engagement += reasonFaculty.engagement * 0.2;
    }
    
    // Adjust based on domain
    switch (object.domain) {
      case AestheticDomain.MATHEMATICAL:
      case AestheticDomain.SCIENTIFIC:
      case AestheticDomain.COMPUTATIONAL:
        engagement += 0.2;
        break;
      case AestheticDomain.CONCEPTUAL:
        engagement += 0.15;
        break;
    }
    
    // Ensure result is in 0-1 range
    return Math.min(1, Math.max(0, engagement));
  }
  
  /**
   * Evaluate sensory appeal of an aesthetic object
   */
  private evaluateSensoryAppeal(
    object: AestheticObject,
    judgment: AestheticJudgmentResult
  ): number {
    // Base sensory appeal on judgment type
    let appeal = 0.5; // Default
    
    // Agreeable and beautiful judgments tend to have higher sensory appeal
    if (judgment.judgmentType === AestheticJudgmentType.AGREEABLE ||
        judgment.judgmentType === AestheticJudgmentType.BEAUTIFUL) {
      appeal += 0.2;
    }
    
    // Adjust based on faculty engagement
    const sensibilityFaculty = judgment.faculties.find(
      f => f.faculty === Faculty.SENSIBILITY
    );
    
    if (sensibilityFaculty) {
      appeal += sensibilityFaculty.engagement * 0.3;
    }
    
    // Adjust based on domain
    switch (object.domain) {
      case AestheticDomain.VISUAL:
      case AestheticDomain.AUDITORY:
        appeal += 0.2;
        break;
      case AestheticDomain.MATHEMATICAL:
      case AestheticDomain.CONCEPTUAL:
        appeal -= 0.1;
        break;
    }
    
    // Ensure result is in 0-1 range
    return Math.min(1, Math.max(0, appeal));
  }
  
  /**
   * Evaluate temporal relevance of an aesthetic object
   */
  private evaluateTemporalRelevance(
    object: AestheticObject,
    judgment: AestheticJudgmentResult
  ): number {
    // Base temporal relevance on principles
    let relevance = 0.5; // Default
    
    // Adjust based on principles
    const originalityPrinciple = judgment.principles.find(
      p => p.principle === AestheticPrinciple.ORIGINALITY
    );
    
    if (originalityPrinciple) {
      relevance += originalityPrinciple.relevance * 0.2;
    }
    
    const universalityPrinciple = judgment.principles.find(
      p => p.principle === AestheticPrinciple.UNIVERSALITY
    );
    
    if (universalityPrinciple) {
      relevance += universalityPrinciple.relevance * 0.2;
    }
    
    // Adjust based on judgment type
    if (judgment.judgmentType === AestheticJudgmentType.NOVEL ||
        judgment.judgmentType === AestheticJudgmentType.INTERESTING) {
      relevance += 0.15;
    } else if (judgment.judgmentType === AestheticJudgmentType.BEAUTIFUL ||
              judgment.judgmentType === AestheticJudgmentType.SUBLIME) {
      // Traditional aesthetic categories often have enduring relevance
      relevance += 0.1;
    }
    
    // Ensure result is in 0-1 range
    return Math.min(1, Math.max(0, relevance));
  }
  
  /**
   * Generate an explanation of human resonance
   */
  private generateResonanceExplanation(
    resonanceScore: number,
    universality: number,
    accessibility: number,
    emotionalImpact: number,
    intellectualEngagement: number,
    sensoryAppeal: number,
    temporalRelevance: number,
    object: AestheticObject
  ): string {
    // Create explanation based on resonance score
    let explanation = `This ${object.domain} object has ${
      resonanceScore > 0.8 ? "strong" : 
      resonanceScore > 0.6 ? "moderate" : 
      "limited"
    } potential to resonate with human sensibilities, with an overall resonance score of ${Math.round(resonanceScore * 100)}%.`;
    
    // Add details about universality
    explanation += `\n\nUniversality: ${Math.round(universality * 100)}% - This object ${
      universality > 0.7 ? "makes a strong claim to universal validity, suggesting it could be appreciated across different contexts and cultures." : 
      universality > 0.5 ? "has moderate cross-contextual appeal, with some aspects that may resonate widely." : 
      "is primarily contextual in its appeal, with limited universal qualities."
    }`;
    
    // Add details about accessibility
    explanation += `\n\nAccessibility: ${Math.round(accessibility * 100)}% - This object is ${
      accessibility > 0.7 ? "highly accessible, requiring minimal specialized knowledge or training to appreciate." : 
      accessibility > 0.5 ? "moderately accessible, with some aspects that may require specific background or knowledge." : 
      "relatively challenging to access, demanding significant background knowledge or training."
    }`;
    
    // Add details about emotional impact
    explanation += `\n\nEmotional Impact: ${Math.round(emotionalImpact * 100)}% - This object ${
      emotionalImpact > 0.7 ? "has strong emotional resonance, evoking powerful affective responses." : 
      emotionalImpact > 0.5 ? "generates moderate emotional engagement, with some affective qualities." : 
      "has limited emotional impact, appealing more to other aspects of experience."
    }`;
    
    // Add details about intellectual engagement
    explanation += `\n\nIntellectual Engagement: ${Math.round(intellectualEngagement * 100)}% - This object ${
      intellectualEngagement > 0.7 ? "stimulates significant intellectual engagement, inviting reflection and analysis." : 
      intellectualEngagement > 0.5 ? "offers moderate intellectual interest, with some conceptual depth." : 
      "provides limited intellectual challenge, focusing more on other aspects of experience."
    }`;
    
    // Add details about sensory appeal
    explanation += `\n\nSensory Appeal: ${Math.round(sensoryAppeal * 100)}% - This object ${
      sensoryAppeal > 0.7 ? "has strong sensory appeal, offering rich perceptual experience." : 
      sensoryAppeal > 0.5 ? "provides moderate sensory engagement, with some appealing perceptual qualities." : 
      "has limited sensory richness, focusing more on conceptual or other dimensions."
    }`;
    
    // Add details about temporal relevance
    explanation += `\n\nTemporal Relevance: ${Math.round(temporalRelevance * 100)}% - This object ${
      temporalRelevance > 0.7 ? "has significant contemporary relevance while suggesting enduring value." : 
      temporalRelevance > 0.5 ? "balances timely and timeless qualities, with moderate lasting potential." : 
      "may have limited lasting appeal, being more tied to specific temporal contexts."
    }`;
    
    // Add domain-specific insight
    explanation += this.getResonanceDomainInsight(object.domain, resonanceScore);
    
    // Add overall assessment
    explanation += `\n\nOverall, this object's human resonance stems primarily from its ${this.identifyTopResonanceFactors(
      universality,
      accessibility,
      emotionalImpact,
      intellectualEngagement,
      sensoryAppeal,
      temporalRelevance
    )}.`;
    
    return explanation;
  }
  
  /**
   * Get domain-specific insight for resonance analysis
   */
  private getResonanceDomainInsight(domain: AestheticDomain, score: number): string {
    switch (domain) {
      case AestheticDomain.VISUAL:
        return `\n\nIn the visual domain, human resonance often emerges from the interplay of perceptual immediacy and symbolic depth, with this object ${
          score > 0.7 ? "successfully balancing both dimensions" : "emphasizing one dimension over the other"
        }.`;
        
      case AestheticDomain.AUDITORY:
        return `\n\nIn the auditory domain, human resonance frequently arises from the integration of pattern recognition and emotional expression, with this object ${
          score > 0.7 ? "achieving a compelling synthesis of these aspects" : "showing strength in one area more than the other"
        }.`;
        
      case AestheticDomain.LINGUISTIC:
        return `\n\nIn the linguistic domain, human resonance emerges from the intersection of cognitive understanding and affective response, with this object ${
          score > 0.7 ? "effectively engaging both dimensions" : "leaning more toward one dimension than the other"
        }.`;
        
      case AestheticDomain.MATHEMATICAL:
        return `\n\nIn the mathematical domain, human resonance stems from the experience of discovering profound simplicity within apparent complexity, with this object ${
          score > 0.7 ? "powerfully evoking this sense of discovery" : "partially capturing this quality"
        }.`;
        
      case AestheticDomain.COMPUTATIONAL:
        return `\n\nIn the computational domain, human resonance often comes from the elegant reconciliation of abstraction and functionality, with this object ${
          score > 0.7 ? "exemplifying this balance" : "showing strengths in certain aspects of this tension"
        }.`;
        
      default:
        return "";
    }
  }
  
  /**
   * Identify the top factors contributing to resonance
   */
  private identifyTopResonanceFactors(
    universality: number,
    accessibility: number,
    emotionalImpact: number,
    intellectualEngagement: number,
    sensoryAppeal: number,
    temporalRelevance: number
  ): string {
    // Create an array of factors with their scores
    const factors = [
      { name: "universality", score: universality },
      { name: "accessibility", score: accessibility },
      { name: "emotional impact", score: emotionalImpact },
      { name: "intellectual engagement", score: intellectualEngagement },
      { name: "sensory appeal", score: sensoryAppeal },
      { name: "temporal relevance", score: temporalRelevance }
    ];
    
    // Sort by score in descending order
    factors.sort((a, b) => b.score - a.score);
    
    // Take top 2 or 3 factors
    const topFactors = factors.slice(0, factors[0].score > 0.8 ? 2 : 3);
    
    // Format the result
    if (topFactors.length === 1) {
      return topFactors[0].name;
    } else if (topFactors.length === 2) {
      return `${topFactors[0].name} and ${topFactors[1].name}`;
    } else {
      return `${topFactors[0].name}, ${topFactors[1].name}, and ${topFactors[2].name}`;
    }
  }
}

/**
 * Export the Aesthetic Judgment module
 */
export {
  AestheticJudgment,
  AestheticJudgmentType,
  Faculty,
  AestheticDomain,
  FormalElement,
  AestheticPrinciple,
  GenerationMode,
  AestheticObject,
  AestheticJudgmentResult,
  GenerationParameters,
  AestheticJudgmentOptions
};    return detectors;
  }
  
  /**
   * Initialize principle evaluators
   */
  private initializePrincipleEvaluators(): Map<AestheticPrinciple, (obj: any, domain: AestheticDomain) => number> {
    const evaluators = new Map<AestheticPrinciple, (obj: any, domain: AestheticDomain) => number>();
    
    // Purposiveness without purpose evaluator
    evaluators.set(AestheticPrinciple.PURPOSIVENESS, (obj: any, domain: AestheticDomain) => {
      // This would implement purposiveness detection techniques
      // For now, return a placeholder value
      return 0.8;
    });
    
    // Disinterestedness evaluator
    evaluators.set(AestheticPrinciple.DISINTERESTEDNESS, (obj: any, domain: AestheticDomain) => {
      // This would implement disinterestedness detection techniques
      // For now, return a placeholder value
      return 0.75;
    });
    
    // Free play evaluator
    evaluators.set(AestheticPrinciple.FREE_PLAY, (obj: any, domain: AestheticDomain) => {
      // This would implement free play detection techniques
      // For now, return a placeholder value
      return 0.85;
    });
    
    // Add placeholder evaluators for other principles
    // In a full implementation, these would be more sophisticated
    for (const principle of Object.values(AestheticPrinciple)) {
      if (!evaluators.has(principle as AestheticPrinciple)) {
        evaluators.set(principle as AestheticPrinciple, () => {
          // Random value between 0.6 and 0.9 for variety
          return 0.6 + Math.random() * 0.3;
        });
      }
    }
    
    return evaluators;
  }
  
  /**
   * Analyze formal elements in an aesthetic object
   */
  private analyzeFormalElements(object: AestheticObject): FormalElement[] {
    // Get the domain analyzer
    const domainAnalyzer = this.domainAnalyzers.get(object.domain);
    if (!domainAnalyzer) {
      // If no specific analyzer, return common elements
      return [
        FormalElement.UNITY,
        FormalElement.VARIETY,
        FormalElement.BALANCE,
        FormalElement.PROPORTION,
        FormalElement.RHYTHM
      ];
    }
    
    // Analyze the object
    const analysis = domainAnalyzer(object.content);
    
    // Map analysis results to formal elements
    const elements: FormalElement[] = [];
    
    // Add elements based on analysis values
    if (analysis.composition && analysis.composition > 0.7) elements.push(FormalElement.UNITY);
    if (analysis.contrast && analysis.contrast > 0.7) elements.push(FormalElement.CONTRAST);
    if (analysis.rhythm && analysis.rhythm > 0.7) elements.push(FormalElement.RHYTHM);
    if (analysis.harmony && analysis.harmony > 0.7) elements.push(FormalElement.HARMONY);
    if (analysis.structure && analysis.structure > 0.7) elements.push(FormalElement.PROPORTION);
    
    // Ensure we have at least some elements
    if (elements.length < 3) {
      elements.push(FormalElement.BALANCE, FormalElement.UNITY, FormalElement.VARIETY);
    }
    
    return [...new Set(elements)]; // Remove duplicates
  }
  
  /**
   * Perform formal analysis of an aesthetic object
   */
  private performFormalAnalysis(
    object: AestheticObject,
    formalElements: FormalElement[]
  ): { element: FormalElement; quality: number }[] {
    const analysis: { element: FormalElement; quality: number }[] = [];
    
    // Analyze each formal element
    for (const element of formalElements) {
      const detector = this.formalElementDetectors.get(element);
      const quality = detector ? detector(object.content, object.domain) : 0.5;
      
      analysis.push({ element, quality });
    }
    
    // Sort by quality in descending order
    return analysis.sort((a, b) => b.quality - a.quality);
  }
  
  /**
   * Evaluate aesthetic principles in an object
   */
  private evaluatePrinciples(
    object: AestheticObject,
    context: Record<string, any>
  ): { principle: AestheticPrinciple; relevance: number }[] {
    const evaluation: { principle: AestheticPrinciple; relevance: number }[] = [];
    
    // Evaluate each principle
    for (const principle of Object.values(AestheticPrinciple)) {
      const evaluator = this.principleEvaluators.get(principle as AestheticPrinciple);
      let relevance = evaluator ? evaluator(object.content, object.domain) : 0.5;
      
      // Apply weight from options if available
      if (this.options.principleWeights && this.options.principleWeights[principle as AestheticPrinciple]) {
        relevance *= this.options.principleWeights[principle as AestheticPrinciple];
      }
      
      evaluation.push({ principle: principle as AestheticPrinciple, relevance });
    }
    
    // Sort by relevance in descending order
    return evaluation.sort((a, b) => b.relevance - a.relevance);
  }
  
  /**
   * Determine faculty engagement in aesthetic judgment
   */
  private determineFacultyEngagement(
    object: AestheticObject,
    formalAnalysis: { element: FormalElement; quality: number }[],
    principleEvaluation: { principle: AestheticPrinciple; relevance: number }[]
  ): { faculty: Faculty; engagement: number }[] {
    const engagement: { faculty: Faculty; engagement: number }[] = [];
    
    // Initialize base engagement levels
    let imaginationEngagement = 0.5;
    let understandingEngagement = 0.5;
    let reasonEngagement = 0.5;
    let judgmentEngagement = 0.5;
    let sensibilityEngagement = 0.5;
    
    // Adjust based on formal analysis
    for (const { element, quality } of formalAnalysis) {
      switch (element) {
        case FormalElement.UNITY:
        case FormalElement.BALANCE:
        case FormalElement.PROPORTION:
          understandingEngagement += quality * 0.1;
          break;
        case FormalElement.VARIETY:
        case FormalElement.CONTRAST:
        case FormalElement.ASYMMETRY:
          imaginationEngagement += quality * 0.1;
          break;
        case FormalElement.RHYTHM:
        case FormalElement.MOVEMENT:
        case FormalElement.PATTERN:
          sensibilityEngagement += quality * 0.1;
          break;
        case FormalElement.HIERARCHY:
        case FormalElement.TENSION:
        case FormalElement.RESOLUTION:
          reasonEngagement += quality * 0.1;
          break;
      }
    }
    
    // Adjust based on principle evaluation
    for (const { principle, relevance } of principleEvaluation) {
      switch (principle) {
        case AestheticPrinciple.PURPOSIVENESS:
        case AestheticPrinciple.FREE_PLAY:
          judgmentEngagement += relevance * 0.1;
          break;
        case AestheticPrinciple.UNIVERSALITY:
        case AestheticPrinciple.NECESSITY:
          reasonEngagement += relevance * 0.1;
          break;
        case AestheticPrinciple.EXPRESSIVENESS:
        case AestheticPrinciple.ORIGINALITY:
          imaginationEngagement += relevance * 0.1;
          break;
        case AestheticPrinciple.COHERENCE:
        case AestheticPrinciple.SIMPLICITY:
          understandingEngagement += relevance * 0.1;
          break;
      }
    }
    
    // Adjust for domain specificities
    switch (object.domain) {
      case AestheticDomain.MATHEMATICAL:
      case AestheticDomain.SCIENTIFIC:
        understandingEngagement += 0.1;
        reasonEngagement += 0.1;
        break;
      case AestheticDomain.VISUAL:
      case AestheticDomain.AUDITORY:
        sensibilityEngagement += 0.1;
        imaginationEngagement += 0.1;
        break;
      case AestheticDomain.ETHICAL:
      case AestheticDomain.CONCEPTUAL:
        reasonEngagement += 0.1;
        judgmentEngagement += 0.1;
        break;
    }
    
    // Normalize engagement levels (cap at 1.0)
    imaginationEngagement = Math.min(1.0, imaginationEngagement);
    understandingEngagement = Math.min(1.0, understandingEngagement);
    reasonEngagement = Math.min(1.0, reasonEngagement);
    judgmentEngagement = Math.min(1.0, judgmentEngagement);
    sensibilityEngagement = Math.min(1.0, sensibilityEngagement);
    
    // Add all faculties to the result
    engagement.push({ faculty: Faculty.IMAGINATION, engagement: imaginationEngagement });
    engagement.push({ faculty: Faculty.UNDERSTANDING, engagement: understandingEngagement });
    engagement.push({ faculty: Faculty.REASON, engagement: reasonEngagement });
    engagement.push({ faculty: Faculty.JUDGMENT, engagement: judgmentEngagement });
    engagement.push({ faculty: Faculty.SENSIBILITY, engagement: sensibilityEngagement });
    
    // Sort by engagement in descending order
    return engagement.sort((a, b) => b.engagement - a.engagement);
  }
  
  /**
   * Perform comparative judgments against exemplars
   */
  private performComparativeJudgments(
    object: AestheticObject
  ): { exemplar: string; similarity: number; judgment: AestheticJudgmentType }[] {
    const comparisons: { exemplar: string; similarity: number; judgment: AestheticJudgmentType }[] = [];
    
    // Get exemplars for each judgment type
    for (const [judgmentType, exemplars] of this.exemplars.entries()) {
      if (!exemplars || exemplars.length === 0) continue;
      
      // Select one exemplar for this judgment type (simplification)
      const exemplar = exemplars[0];
      
      // Compare object to the exemplar
      const similarity = this.compareToExemplar(object, exemplar, judgmentType);
      
      // Add to comparisons if similarity is significant
      if (similarity > 0.5) {
        comparisons.push({
          exemplar: `Exemplar of ${judgmentType}`,
          similarity,
          judgment: judgmentType
        });
      }
    }
    
    // Sort by similarity in descending order
    return comparisons.sort((a, b) => b.similarity - a.similarity);
  }
  
  /**
   * Compare an object to an exemplar
   */
  private compareToExemplar(
    object: AestheticObject,
    exemplar: any,
    judgmentType: AestheticJudgmentType
  ): number {
    // This would implement sophisticated comparison between the object and exemplar
    // For now, return a placeholder similarity score
    
    // Different scores based on judgment type for variety
    switch (judgmentType) {
      case AestheticJudgmentType.BEAUTIFUL:
        return 0.7 + Math.random() * 0.2;
      case AestheticJudgmentType.SUBLIME:
        return 0.6 + Math.random() * 0.2;
      case AestheticJudgmentType.ELEGANT:
        return 0.65 + Math.random() * 0.2;
      default:
        return 0.5 + Math.random() * 0.3;
    }
  }
  
  /**
   * Determine the primary judgment type
   */
  private determinePrimaryJudgment(
    object: AestheticObject,
    formalAnalysis: { element: FormalElement; quality: number }[],
    principleEvaluation: { principle: AestheticPrinciple; relevance: number }[],
    facultyEngagement: { faculty: Faculty; engagement: number }[],
    comparisons?: { exemplar: string; similarity: number; judgment: AestheticJudgmentType }[]
  ): { judgmentType: AestheticJudgmentType; score: number; confidence: number } {
    // Check for the sublime first
    const sublimeEvaluation = this.evaluateSublime(object);
    if (sublimeEvaluation.isSublime) {
      return {
        judgmentType: AestheticJudgmentType.SUBLIME,
        score: sublimeEvaluation.magnitude,
        confidence: 0.8
      };
    }
    
    // Calculate scores for different judgment types
    const scores = new Map<AestheticJudgmentType, number>();
    
    // Initialize with zero scores
    for (const type of Object.values(AestheticJudgmentType)) {
      scores.set(type as AestheticJudgmentType, 0);
    }
    
    // 1. Consider formal analysis
    for (const { element, quality } of formalAnalysis) {
      // Unity and harmony contribute to beauty
      if (element === FormalElement.UNITY || element === FormalElement.HARMONY) {
        scores.set(AestheticJudgmentType.BEAUTIFUL, 
                  (scores.get(AestheticJudgmentType.BEAUTIFUL) || 0) + quality * 0.2);
      }
      
      // Balance and proportion contribute to elegance
      if (element === FormalElement.BALANCE || element === FormalElement.PROPORTION) {
        scores.set(AestheticJudgmentType.ELEGANT, 
                  (scores.get(AestheticJudgmentType.ELEGANT) || 0) + quality * 0.2);
      }
      
      // Variety and contrast contribute to interestingness
      if (element === FormalElement.VARIETY || element === FormalElement.CONTRAST) {
        scores.set(AestheticJudgmentType.INTERESTING, 
                  (scores.get(AestheticJudgmentType.INTERESTING) || 0) + quality * 0.2);
      }
      
      // Pattern and rhythm contribute to being agreeable
      if (element === FormalElement.PATTERN || element === FormalElement.RHYTHM) {
        scores.set(AestheticJudgmentType.AGREEABLE, 
                  (scores.get(AestheticJudgmentType.AGREEABLE) || 0) + quality * 0.2);
      }
    }
    
    // 2. Consider principle evaluation
    for (const { principle, relevance } of principleEvaluation) {
      // Purposiveness and universality contribute to beauty
      if (principle === AestheticPrinciple.PURPOSIVENESS || principle === AestheticPrinciple.UNIVERSALITY) {
        scores.set(AestheticJudgmentType.BEAUTIFUL, 
                  (scores.get(AestheticJudgmentType.BEAUTIFUL) || 0) + relevance * 0.2);
      }
      
      // Simplicity and coherence contribute to elegance
      if (principle === AestheticPrinciple.SIMPLICITY || principle === AestheticPrinciple.COHERENCE) {
        scores.set(AestheticJudgmentType.ELEGANT, 
                  (scores.get(AestheticJudgmentType.ELEGANT) || 0) + relevance * 0.2);
      }
      
      // Originality and complexity contribute to interestingness
      if (principle === AestheticPrinciple.ORIGINALITY || principle === AestheticPrinciple.COMPLEXITY) {
        scores.set(AestheticJudgmentType.INTERESTING, 
                  (scores.get(AestheticJudgmentType.INTERESTING) || 0) + relevance * 0.2);
      }
      
      // Expressiveness contributes to being good
      if (principle === AestheticPrinciple.EXPRESSIVENESS) {
        scores.set(AestheticJudgmentType.GOOD, 
                  (scores.get(AestheticJudgmentType.GOOD) || 0) + relevance * 0.2);
      }
    }
    
    // 3. Consider faculty engagement
    for (const { faculty, engagement } of facultyEngagement) {
      // Free play between imagination and understanding contributes to beauty
      if (faculty === Faculty.IMAGINATION || faculty === Faculty.UNDERSTANDING) {
        const bothEngaged = facultyEngagement.some(f => f.faculty === Faculty.IMAGINATION && f.engagement > 0.7) &&
                          facultyEngagement.some(f => f.faculty === Faculty.UNDERSTANDING && f.engagement > 0.7);
        
        if (bothEngaged) {
          scores.set(AestheticJudgmentType.BEAUTIFUL, 
                    (scores.get(AestheticJudgmentType.BEAUTIFUL) || 0) + engagement * 0.1);
        }
      }
      
      // Reason engagement contributes to the good
      if (faculty === Faculty.REASON) {
        scores.set(AestheticJudgmentType.GOOD, 
                  (scores.get(AestheticJudgmentType.GOOD) || 0) + engagement * 0.2);
      }
      
      // Sensibility engagement contributes to the agreeable
      if (faculty === Faculty.SENSIBILITY) {
        scores.set(AestheticJudgmentType.AGREEABLE, 
                  (scores.get(AestheticJudgmentType.AGREEABLE) || 0) + engagement * 0.2);
      }
    }
    
    // 4. Consider comparative judgments if available
    if (comparisons) {
      for (const { similarity, judgment } of comparisons) {
        scores.set(judgment, 
                  (scores.get(judgment) || 0) + similarity * 0.2);
      }
    }
    
    // 5. Consider domain-specific tendencies
    switch (object.domain) {
      case AestheticDomain.MATHEMATICAL:
      case AestheticDomain.COMPUTATIONAL:
        scores.set(AestheticJudgmentType.ELEGANT, 
                  (scores.get(AestheticJudgmentType.ELEGANT) || 0) + 0.1);
        break;
      case AestheticDomain.ETHICAL:
        scores.set(AestheticJudgmentType.GOOD, 
                  (scores.get(AestheticJudgmentType.GOOD) || 0) + 0.1);
        break;
    }
    
    // Normalize scores (ensure they're in 0-1 range)
    for (const [type, score] of scores.entries()) {
      scores.set(type, Math.min(1, score));
    }
    
    // Find the judgment type with the highest score
    let highestType = AestheticJudgmentType.INTERESTING; // Default
    let highestScore = 0;
    
    for (const [type, score] of scores.entries()) {
      if (score > highestScore) {
        highestScore = score;
        highestType = type;
      }
    }
    
    // Special case: if beautiful score is above threshold, prioritize it
    const beautyScore = scores.get(AestheticJudgmentType.BEAUTIFUL) || 0;
    if (beautyScore >= this.options.beautyThreshold! && 
        beautyScore >= highestScore * 0.9) { // Within 90% of the highest score
      highestType = AestheticJudgmentType.BEAUTIFUL;
      highestScore = beautyScore;
    }
    
    // Calculate confidence based on the difference between the highest and second-highest scores
    const sortedScores = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1]);
    
    const confidence = sortedScores.length > 1
      ? Math.min(1, 0.5 + (sortedScores[0][1] - sortedScores[1][1]) * 2)
      : 0.5;
    
    return {
      judgmentType: highestType,
      score: highestScore,
      confidence
    };
  }
  
  /**
   * Generate an explanation for an aesthetic judgment
   */
  private generateJudgmentExplanation(
    judgmentType: AestheticJudgmentType,
    score: number,
    formalAnalysis: { element: FormalElement; quality: number }[],
    principleEvaluation: { principle: AestheticPrinciple; relevance: number }[],
    facultyEngagement: { faculty: Faculty; engagement: number }[],
    object: AestheticObject
  ): string {
    // Start with a judgment-specific introduction
    let explanation = this.getJudgmentTypeExplanation(judgmentType, score);
    
    // Add information about key formal elements
    if (formalAnalysis.length > 0) {
      explanation += "\n\nFormal analysis: ";
      const topElements = formalAnalysis.slice(0, 3); // Top 3 elements
      explanation += topElements
        .map(e => `${e.element} (${Math.round(e.quality * 100)}%)`)
        .join(", ");
    }
    
    // Add information about key principles
    if (principleEvaluation.length > 0) {
      explanation += "\n\nKey aesthetic principles: ";
      const topPrinciples = principleEvaluation.slice(0, 3); // Top 3 principles
      explanation += topPrinciples
        .map(p => `${p.principle} (${Math.round(p.relevance * 100)}%)`)
        .join(", ");
    }
    
    // Add information about faculty engagement
    if (facultyEngagement.length > 0) {
      explanation += "\n\nMental faculties engaged: ";
      const topFaculties = facultyEngagement.slice(0, 3); // Top 3 faculties
      explanation += topFaculties
        .map(f => `${f.faculty} (${Math.round(f.engagement * 100)}%)`)
        .join(", ");
    }
    
    // Add domain-specific insights
    explanation += this.getDomainSpecificInsight(object.domain, judgmentType, score);
    
    // Add a concluding statement
    explanation += `\n\nOverall, this ${object.domain} object exhibits ${judgmentType} qualities with a ${Math.round(score * 100)}% degree of expression.`;
    
    return explanation;
  }
  
  /**
   * Get an explanation specific to a judgment type
   */
  private getJudgmentTypeExplanation(judgmentType: AestheticJudgmentType, score: number): string {
    const scoreText = score > 0.8 ? "strong" : score > 0.6 ? "moderate" : "mild";
    
    switch (judgmentType) {
      case AestheticJudgmentType.BEAUTIFUL:
        return `This object exhibits ${scoreText} beauty, characterized by a harmonious free play between imagination and understanding. The form displays purposiveness without a specific purpose, inviting contemplation for its own sake.`;
      
      case AestheticJudgmentType.SUBLIME:
        return `This object evokes the ${scoreText} sublime, temporarily overwhelming our faculties but ultimately affirming reason's superiority over sensibility. It inspires awe through its suggestion of the infinite or immeasurable.`;
      
      case AestheticJudgmentType.ELEGANT:
        return `This object displays ${scoreText} elegance, achieving its purpose with remarkable economy of means. There is a clarity and simplicity to its form that makes its function appear effortless.`;
      
      case AestheticJudgmentType.INTERESTING:
        return `This object provokes ${scoreText} interest, engaging the faculties through novelty or complexity. It stimulates thought and contemplation through unexpected aspects or relations.`;
      
      case AestheticJudgmentType.AGREEABLE:
        return `This object provides ${scoreText} agreeable sensations, appealing directly to sensibility. While this pleasure is genuine, it lacks the universal validity claim of true beauty, as it's tied to subjective enjoyment.`;
      
      case AestheticJudgmentType.GOOD:
        return `This object embodies the ${scoreText} good, fulfilling its purpose in a way that aligns with moral principles. Its form realizes values beyond mere appearance or sensory pleasure.`;
      
      case AestheticJudgmentType.NOVEL:
        return `This object exhibits ${scoreText} novelty, presenting original aspects that break from convention. It offers fresh perspectives or approaches within its domain.`;
      
      case AestheticJudgmentType.UNIFIED:
        return `This object achieves ${scoreText} unity, integrating its elements into a coherent whole. The parts relate to each other and the whole in a harmonious manner.`;
      
      case AestheticJudgmentType.VARIED:
        return `This object presents ${scoreText} variety, containing diverse elements that maintain interest. The multiplicity provides richness without sacrificing coherence.`;
      
      case AestheticJudgmentType.EXPRESSIVE:
        return `This object is ${scoreText}ly expressive, effectively communicating emotion or ideas. Its form embodies meaning in a way that resonates with the viewer.`;
      
      case AestheticJudgmentType.BALANCED:
        return `This object maintains ${scoreText} balance, distributing elements in a way that creates visual or conceptual equilibrium. The arrangement feels stable yet dynamic.`;
      
      default:
        return `This object exhibits ${scoreText} aesthetic qualities worth contemplation. Its form engages the faculties in a manner that transcends mere utility.`;
    }
  }
  
  /**
   * Get domain-specific insights for a judgment
   */
  private getDomainSpecificInsight(
    domain: AestheticDomain,
    judgmentType: AestheticJudgmentType,
    score: number
  ): string {
    switch (domain) {
      case AestheticDomain.VISUAL:
        return `\n\nIn the visual domain, this ${judgmentType} quality emerges from the spatial arrangement, color relationships, and compositional balance of elements.`;
      
      case AestheticDomain.AUDITORY:
        return `\n\nIn the auditory domain, this ${judgmentType} quality emerges from the temporal patterns, harmonic relationships, and dynamic contrasts.`;
      
      case AestheticDomain.LINGUISTIC:
        return `\n\nIn the linguistic domain, this ${judgmentType} quality emerges from the rhythmic flow, imagery, and structural relationships between linguistic elements.`;
      
      case AestheticDomain.MATHEMATICAL:
        return `\n\nIn the mathematical domain, this ${judgmentType} quality emerges from the simplicity, generality, and surprising connections revealed by the formal structure.`;
      
      case AestheticDomain.COMPUTATIONAL:
        return `\n\nIn the computational domain, this ${judgmentType} quality emerges from the algorithm's elegance, efficiency, and conceptual clarity.`;
      
      case AestheticDomain.SCIENTIFIC:
        return `\n\nIn the scientific domain, this ${judgmentType} quality emerges from the theory's explanatory power, simplicity, and ability to unify diverse phenomena.`;
      
      default:
        return "";
    }
  }
  
  /**
   * Generate an explanation for a comparison
   */
  private generateComparisonExplanation(
    preferredObject: 'A' | 'B' | 'equal',
    confidence: number,
    judgmentA: AestheticJudgmentResult,
    judgmentB: AestheticJudgmentResult,
    commonalities: { aspect: string; description: string }[],
    differences: { aspect: string; objectA: string; objectB: string }[]
  ): string {
    let explanation = "";
    
    // Introduction based on preference
    if (preferredObject === 'equal') {
      explanation += "These objects are judged to be aesthetically equal, though for different reasons.";
    } else if (preferredObject === 'A') {
      explanation += `Object A is aesthetically preferred over Object B ${confidence > 0.8 ? "strongly" : "slightly"}.`;
    } else {
      explanation += `Object B is aesthetically preferred over Object A ${confidence > 0.8 ? "strongly" : "slightly"}.`;
    }
    
    // Add judgment type information
    explanation += `\n\nObject A exhibits qualities of the ${judgmentA.judgmentType} (${Math.round(judgmentA.score * 100)}%), while Object B exhibits qualities of the ${judgmentB.judgmentType} (${Math.round(judgmentB.score * 100)}%).`;
    
    // Add commonalities
    if (commonalities.length > 0) {
      explanation += "\n\nCommonalities:";
      commonalities.slice(0, 3).forEach(common => {
        explanation += `\n- ${common.aspect}: ${common.description}`;
      });
    }
    
    // Add differences
    if (differences.length > 0) {
      explanation += "\n\nKey differences:";
      differences.slice(0, 3).forEach(diff => {
        explanation += `\n- ${diff.aspect}: Object A exhibits ${diff.objectA}, while Object B exhibits ${diff.objectB}`;
      });
    }
    
    // Add conclusion
    if (preferredObject === 'equal') {
      explanation += "\n\nBoth objects have distinct aesthetic merit, with neither clearly superior to the other. Their value depends on the specific qualities one prioritizes.";
    } else if (preferredObject === 'A') {
      explanation += `\n\nObject A is preferred primarily due to its stronger ${judgmentA.principles[0].principle} and more effective ${judgmentA.formalAnalysis?.[0].element || "formal elements"}.`;
    } else {
      explanation += `\n\nObject B is preferred primarily due to its stronger ${judgmentB.principles[0].principle} and more effective ${judgmentB.formalAnalysis?.[0].element || "formal elements"}.`;
    }
    
    return explanation;
  }
  
  /**
   * Compare formal analyses between two judgments
   */
  private compareFormalAnalyses(
    analysisA: { element: FormalElement; quality: number }[],
    analysisB: { element: FormalElement; quality: number }[]
  ): {
    commonalities: { aspect: string; description: string }[];
    differences: { aspect: string; objectA: string; objectB: string }[];
  } {
    const commonalities: { aspect: string; description: string }[] = [];
    const differences: { aspect: string; objectA: string; objectB: string }[] = [];
    
    // Create maps for easier comparison
    const mapA = new Map(analysisA.map(item => [item.element, item.quality]));
    const mapB = new Map(analysisB.map(item => [item.element, item.quality]));
    
    // Find common elements
    for (const [element, qualityA] of mapA.entries()) {
      if (mapB.has(element)) {
        const qualityB = mapB.get(element)!;
        const qualityDiff = Math.abs(qualityA - qualityB);
        
        if (qualityDiff < 0.2) {
          // Similar quality - commonality
          commonalities.push({
            aspect: element.toString(),
            description: `Both exhibit ${qualityA > 0.7 ? "strong" : "moderate"} ${element}`
          });
        } else {
          // Different quality - difference
          differences.push({
            aspect: element.toString(),
            objectA: `${qualityA > 0.7 ? "// src/core/aesthetic-judgment.ts

/**
 * Aesthetic Judgment Module for the Critique of Artificial Reason (CAR)
 * 
 * In Kant's "Critique of Judgment," aesthetic judgments represent a distinct form of 
 * judgment that bridges the theoretical and practical domains. Unlike determinate judgments
 * (which apply concepts to objects), aesthetic judgments are reflective—they seek universal
 * principles for particular cases without subsuming them under determinate concepts.
 * 
 * Kant identifies key features of aesthetic judgments:
 * 1. Disinterested - Based on contemplation rather than practical interest
 * 2. Universal - Claims intersubjective validity without conceptual determination
 * 3. Purposive without purpose - Exhibits formal purposiveness without definite end
 * 4. Necessary - Commands agreement through a "common sense" (sensus communis)
 * 
 * The sublime differs from the beautiful: while beauty involves harmony between 
 * imagination and understanding, the sublime arises from the discord and subsequent
 * harmony between imagination and reason.
 * 
 * This module implements Kantian aesthetic judgment for AI, enabling:
 * - Generation of creative content with formal purposiveness
 * - Evaluation of aesthetics beyond simplistic metrics
 * - Making judgments in domains lacking determinate concepts 
 * - Balancing rule-following with creative freedom
 */

/**
 * Types of aesthetic judgments
 */
export enum AestheticJudgmentType {
  BEAUTIFUL = 'beautiful',       // Harmony of form eliciting disinterested pleasure
  SUBLIME = 'sublime',           // Overwhelming magnitude or power, initially fearful but ultimately elevating
  AGREEABLE = 'agreeable',       // Merely pleasant, tied to individual preference
  GOOD = 'good',                 // Moral approval or practical utility
  INTERESTING = 'interesting',   // Stimulating but not fully aesthetic
  ELEGANT = 'elegant',           // Beauty with simplicity and effectiveness
  NOVEL = 'novel',               // Originality and innovation
  UNIFIED = 'unified',           // Coherence and harmony of parts
  VARIED = 'varied',             // Diversity within unity
  EXPRESSIVE = 'expressive',     // Communicating emotion or idea
  BALANCED = 'balanced'          // Equilibrium of elements
}

/**
 * Faculties involved in aesthetic judgment
 */
export enum Faculty {
  IMAGINATION = 'imagination',   // Faculty of intuition and synthesis
  UNDERSTANDING = 'understanding', // Faculty of concepts
  REASON = 'reason',             // Faculty of ideas and principles
  JUDGMENT = 'judgment',         // Faculty of subsumption and reflection
  SENSIBILITY = 'sensibility'    // Faculty of sensation
}

/**
 * Domains for aesthetic judgment
 */
export enum AestheticDomain {
  VISUAL = 'visual',             // Visual arts, design
  AUDITORY = 'auditory',         // Music, sound
  LINGUISTIC = 'linguistic',     // Literature, poetry
  MATHEMATICAL = 'mathematical', // Mathematical elegance
  SCIENTIFIC = 'scientific',     // Scientific theories
  COMPUTATIONAL = 'computational', // Code, algorithms
  INTERACTIVE = 'interactive',   // User interfaces, experiences
  CONCEPTUAL = 'conceptual',     // Ideas, frameworks
  SOCIAL = 'social',             // Social structures, institutions
  ENVIRONMENTAL = 'environmental', // Natural or built environments
  ETHICAL = 'ethical'            // Moral beauty
}

/**
 * Types of formal elements in aesthetic objects
 */
export enum FormalElement {
  UNITY = 'unity',               // Coherence of whole
  VARIETY = 'variety',           // Diversity of parts
  SYMMETRY = 'symmetry',         // Balance around axis
  ASYMMETRY = 'asymmetry',       // Deliberate imbalance
  RHYTHM = 'rhythm',             // Pattern of emphasis
  PROPORTION = 'proportion',     // Relation of parts
  HARMONY = 'harmony',           // Pleasing combination
  CONTRAST = 'contrast',         // Juxtaposition of difference
  BALANCE = 'balance',           // Distribution of elements
  SCALE = 'scale',               // Size relationships
  MOVEMENT = 'movement',         // Suggestion of motion
  PATTERN = 'pattern',           // Repetition with variation
  HIERARCHY = 'hierarchy',       // Organization by importance
  TENSION = 'tension',           // Controlled opposition
  RESOLUTION = 'resolution'      // Release of tension
}

/**
 * Aesthetic principles derived from Kant and extended
 */
export enum AestheticPrinciple {
  DISINTERESTEDNESS = 'disinterestedness', // Independence from practical interest
  UNIVERSALITY = 'universality',        // Claim to general validity
  PURPOSIVENESS = 'purposiveness',      // Appearance of design without specific purpose
  NECESSITY = 'necessity',              // Claim to necessary agreement
  FREE_PLAY = 'free_play',              // Harmony of faculties without determination
  EXEMPLARITY = 'exemplarity',          // Serving as a model without being a rule
  AUTONOMY = 'autonomy',                // Independence from external constraints
  ORIGINALITY = 'originality',          // Novelty and innovation
  SIMPLICITY = 'simplicity',            // Economy of means
  COMPLEXITY = 'complexity',            // Richness of relations
  COHERENCE = 'coherence',              // Internal consistency
  EXPRESSIVENESS = 'expressiveness'     // Communication of emotion or idea
}

/**
 * Modes of aesthetic generation
 */
export enum GenerationMode {
  FREE_PLAY = 'free_play',              // Minimally constrained generation
  SCHEMATIC = 'schematic',              // Template-guided generation
  EXEMPLAR_BASED = 'exemplar_based',    // Example-guided generation
  PRINCIPLE_GUIDED = 'principle_guided', // Rule-guided generation
  DIALECTICAL = 'dialectical',          // Thesis-antithesis-synthesis
  REFLECTIVE = 'reflective',            // Feedback-guided iteration
  SUBLIME = 'sublime',                  // Overwhelming or challenging generation
  ORGANIC = 'organic',                  // Growth from seed idea
  CONCEPTUAL = 'conceptual',            // Concept-driven generation
  FORMAL = 'formal'                     // Form-driven generation
}

/**
 * Object being aesthetically judged
 */
export interface AestheticObject {
  /** Content, structure, or representation of the object */
  content: any;
  
  /** Domain of the object */
  domain: AestheticDomain;
  
  /** Formal elements present in the object */
  formalElements?: FormalElement[];
  
  /** Medium or format of the object */
  medium?: string;
  
  /** Context or background information */
  context?: Record<string, any>;
  
  /** Metadata about the object */
  metadata?: Record<string, any>;
}

/**
 * Result of an aesthetic judgment
 */
export interface AestheticJudgmentResult {
  /** Primary type of judgment */
  judgmentType: AestheticJudgmentType;
  
  /** Score representing degree of the judgment (0-1) */
  score: number;
  
  /** Confidence in the judgment (0-1) */
  confidence: number;
  
  /** Explanation of the judgment */
  explanation: string;
  
  /** Principles relevant to the judgment */
  principles: { principle: AestheticPrinciple; relevance: number }[];
  
  /** Faculties engaged in the judgment */
  faculties: { faculty: Faculty; engagement: number }[];
  
  /** Formal analysis of elements */
  formalAnalysis?: { element: FormalElement; quality: number }[];
  
  /** Comparative judgments relative to exemplars */
  comparisons?: { exemplar: string; similarity: number; judgment: AestheticJudgmentType }[];
  
  /** Whether the judgment claims universal validity */
  claimsUniversality: boolean;
}

/**
 * Parameters for generating an aesthetic object
 */
export interface GenerationParameters {
  /** Target domain for generation */
  domain: AestheticDomain;
  
  /** Mode of generation */
  mode: GenerationMode;
  
  /** Target aesthetic judgment type */
  target?: AestheticJudgmentType;
  
  /** Formal elements to emphasize */
  formalElements?: FormalElement[];
  
  /** Principles to follow */
  principles?: AestheticPrinciple[];
  
  /** Faculties to engage */
  faculties?: Faculty[];
  
  /** Specific constraints or requirements */
  constraints?: Record<string, any>;
  
  /** Exemplars to draw inspiration from */
  exemplars?: any[];
  
  /** Medium or format for the output */
  medium?: string;
  
  /** Additional parameters for generation */
  additionalParams?: Record<string, any>;
}

/**
 * Configuration options for the Aesthetic Judgment Module
 */
export interface AestheticJudgmentOptions {
  /** Default judgment threshold for considering something beautiful */
  beautyThreshold?: number;
  
  /** Default judgment threshold for considering something sublime */
  sublimeThreshold?: number;
  
  /** Whether to prioritize formal analysis */
  prioritizeFormalAnalysis?: boolean;
  
  /** Whether to include comparative judgments */
  includeComparativeJudgments?: boolean;
  
  /** Domain-specific judgment parameters */
  domainParameters?: Record<AestheticDomain, any>;
  
  /** Exemplars for various judgment types */
  exemplars?: Record<AestheticJudgmentType, any[]>;
  
  /** Weights for different principles in judgment */
  principleWeights?: Record<AestheticPrinciple, number>;
  
  /** Cultural or contextual biases to account for */
  culturalContexts?: Record<string, any>;
}

/**
 * The Aesthetic Judgment Module for CAR
 */
export class AestheticJudgment {
  private options: AestheticJudgmentOptions;
  private exemplars: Map<AestheticJudgmentType, any[]>;
  private domainAnalyzers: Map<AestheticDomain, (obj: any) => Record<string, number>>;
  private generators: Map<AestheticDomain, (params: GenerationParameters) => any>;
  private formalElementDetectors: Map<FormalElement, (obj: any, domain: AestheticDomain) => number>;
  private principleEvaluators: Map<AestheticPrinciple, (obj: any, domain: AestheticDomain) => number>;
  
  /**
   * Initialize the Aesthetic Judgment Module
   */
  constructor(options?: AestheticJudgmentOptions) {
    this.options = {
      beautyThreshold: options?.beautyThreshold ?? 0.7,
      sublimeThreshold: options?.sublimeThreshold ?? 0.75,
      prioritizeFormalAnalysis: options?.prioritizeFormalAnalysis ?? true,
      includeComparativeJudgments: options?.includeComparativeJudgments ?? true,
      domainParameters: options?.domainParameters ?? {},
      exemplars: options?.exemplars ?? {},
      principleWeights: options?.principleWeights ?? this.getDefaultPrincipleWeights(),
      culturalContexts: options?.culturalContexts ?? {}
    };
    
    // Initialize exemplars
    this.exemplars = new Map();
    Object.entries(this.options.exemplars || {}).forEach(([type, examples]) => {
      this.exemplars.set(type as AestheticJudgmentType, examples);
    });
    
    // Initialize domain analyzers
    this.domainAnalyzers = this.initializeDomainAnalyzers();
    
    // Initialize generators
    this.generators = this.initializeGenerators();
    
    // Initialize formal element detectors
    this.formalElementDetectors = this.initializeFormalElementDetectors();
    
    // Initialize principle evaluators
    this.principleEvaluators = this.initializePrincipleEvaluators();
  }
  
  /**
   * Judge the aesthetic qualities of an object
   * 
   * @param object The object to judge
   * @param context Optional context for the judgment
   * @returns Aesthetic judgment result
   */
  public judge(
    object: AestheticObject,
    context?: Record<string, any>
  ): AestheticJudgmentResult {
    // Combine object context with provided context
    const fullContext = { ...(object.context || {}), ...(context || {}) };
    
    // Analyze formal elements if not provided
    const formalElements = object.formalElements || this.analyzeFormalElements(object);
    
    // Perform formal analysis
    const formalAnalysis = this.performFormalAnalysis(object, formalElements);
    
    // Evaluate aesthetic principles
    const principleEvaluation = this.evaluatePrinciples(object, fullContext);
    
    // Determine which faculties are engaged
    const facultyEngagement = this.determineFacultyEngagement(object, formalAnalysis, principleEvaluation);
    
    // Perform comparative judgments if enabled
    const comparisons = this.options.includeComparativeJudgments 
      ? this.performComparativeJudgments(object) 
      : undefined;
    
    // Determine the primary judgment type
    const primaryJudgment = this.determinePrimaryJudgment(
      object,
      formalAnalysis,
      principleEvaluation,
      facultyEngagement,
      comparisons
    );
    
    // Generate explanation for the judgment
    const explanation = this.generateJudgmentExplanation(
      primaryJudgment.judgmentType,
      primaryJudgment.score,
      formalAnalysis,
      principleEvaluation,
      facultyEngagement,
      object
    );
    
    // Determine if the judgment claims universality
    const claimsUniversality = this.determineUniversalityClaim(
      primaryJudgment.judgmentType,
      principleEvaluation
    );
    
    // Assemble the judgment result
    return {
      judgmentType: primaryJudgment.judgmentType,
      score: primaryJudgment.score,
      confidence: primaryJudgment.confidence,
      explanation,
      principles: principleEvaluation,
      faculties: facultyEngagement,
      formalAnalysis,
      comparisons,
      claimsUniversality
    };
  }
  
  /**
   * Generate an aesthetic object based on parameters
   * 
   * @param parameters Parameters for generation
   * @returns Generated aesthetic object
   */
  public generate(parameters: GenerationParameters): AestheticObject {
    // Get the appropriate generator for the domain
    const generator = this.generators.get(parameters.domain);
    if (!generator) {
      throw new Error(`No generator available for domain: ${parameters.domain}`);
    }
    
    // Generate content based on parameters
    const content = generator(parameters);
    
    // Identify formal elements
    const formalElements = parameters.formalElements || 
      this.identifyFormalElementsForGeneration(parameters);
    
    // Create the aesthetic object
    const aestheticObject: AestheticObject = {
      content,
      domain: parameters.domain,
      formalElements,
      medium: parameters.medium,
      context: {
        generationMode: parameters.mode,
        targetJudgmentType: parameters.target,
        generationParameters: parameters
      },
      metadata: {
        generated: true,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }
    };
    
    return aestheticObject;
  }
  
  /**
   * Generate aesthetically through reflective iteration
   * 
   * @param initialParameters Initial generation parameters
   * @param iterations Number of generations to attempt
   * @param targetScore Target aesthetic score to achieve
   * @returns Best generated object and its judgment
   */
  public generateReflectively(
    initialParameters: GenerationParameters,
    iterations: number = 5,
    targetScore: number = 0.8
  ): { object: AestheticObject; judgment: AestheticJudgmentResult } {
    let bestObject: AestheticObject | null = null;
    let bestJudgment: AestheticJudgmentResult | null = null;
    let parameters = { ...initialParameters };
    
    // Perform iterative generation with reflection
    for (let i = 0; i < iterations; i++) {
      // Generate an object with current parameters
      const generatedObject = this.generate(parameters);
      
      // Judge the generated object
      const judgment = this.judge(generatedObject);
      
      // Keep track of the best result
      if (!bestObject || judgment.score > (bestJudgment?.score || 0)) {
        bestObject = generatedObject;
        bestJudgment = judgment;
        
        // If we've reached the target score, we can stop early
        if (judgment.score >= targetScore) {
          break;
        }
      }
      
      // Reflect on the judgment to improve parameters
      parameters = this.reflectAndImproveParameters(parameters, judgment);
    }
    
    // Return the best result
    if (bestObject && bestJudgment) {
      return { object: bestObject, judgment: bestJudgment };
    }
    
    // This should never happen if iterations > 0
    throw new Error("Failed to generate any aesthetic objects");
  }
  
  /**
   * Evaluate the sublime in an aesthetic object
   * 
   * @param object The object to evaluate
   * @returns Evaluation of the sublime qualities
   */
  public evaluateSublime(object: AestheticObject): {
    isSublime: boolean;
    type: 'mathematical' | 'dynamical' | 'none';
    magnitude: number;
    explanation: string;
  } {
    // Check for mathematical sublime (overwhelming magnitude)
    const mathematicalSublime = this.evaluateMathematicalSublime(object);
    
    // Check for dynamical sublime (overwhelming power)
    const dynamicalSublime = this.evaluateDynamicalSublime(object);
    
    // Determine which type of sublime is more present
    if (mathematicalSublime.magnitude > dynamicalSublime.magnitude && 
        mathematicalSublime.magnitude >= this.options.sublimeThreshold!) {
      return {
        isSublime: true,
        type: 'mathematical',
        magnitude: mathematicalSublime.magnitude,
        explanation: mathematicalSublime.explanation
      };
    } else if (dynamicalSublime.magnitude >= this.options.sublimeThreshold!) {
      return {
        isSublime: true,
        type: 'dynamical',
        magnitude: dynamicalSublime.magnitude,
        explanation: dynamicalSublime.explanation
      };
    } else {
      return {
        isSublime: false,
        type: 'none',
        magnitude: Math.max(mathematicalSublime.magnitude, dynamicalSublime.magnitude),
        explanation: "This object does not evoke the sublime, as it neither overwhelms through magnitude nor power."
      };
    }
  }
  
  /**
   * Compare two aesthetic objects
   * 
   * @param objectA First object
   * @param objectB Second object
   * @returns Comparative judgment
   */
  public compare(
    objectA: AestheticObject,
    objectB: AestheticObject
  ): {
    preferredObject: 'A' | 'B' | 'equal';
    confidenceInPreference: number;
    commonalities: { aspect: string; description: string }[];
    differences: { aspect: string; objectA: string; objectB: string }[];
    explanation: string;
  } {
    // Judge both objects
    const judgmentA = this.judge(objectA);
    const judgmentB = this.judge(objectB);
    
    // Compare formal analyses
    const formalComparison = this.compareFormalAnalyses(
      judgmentA.formalAnalysis || [],
      judgmentB.formalAnalysis || []
    );
    
    // Compare principle evaluations
    const principleComparison = this.comparePrincipleEvaluations(
      judgmentA.principles,
      judgmentB.principles
    );
    
    // Determine which is aesthetically preferred
    let preferredObject: 'A' | 'B' | 'equal';
    let preferenceConfidence: number;
    
    if (Math.abs(judgmentA.score - judgmentB.score) < 0.1) {
      preferredObject = 'equal';
      preferenceConfidence = 1 - Math.abs(judgmentA.score - judgmentB.score) * 10;
    } else if (judgmentA.score > judgmentB.score) {
      preferredObject = 'A';
      preferenceConfidence = Math.min(1, (judgmentA.score - judgmentB.score) * 5);
    } else {
      preferredObject = 'B';
      preferenceConfidence = Math.min(1, (judgmentB.score - judgmentA.score) * 5);
    }
    
    // Identify commonalities
    const commonalities = [
      ...formalComparison.commonalities,
      ...principleComparison.commonalities
    ];
    
    // Identify differences
    const differences = [
      ...formalComparison.differences,
      ...principleComparison.differences
    ];
    
    // Generate explanation
    const explanation = this.generateComparisonExplanation(
      preferredObject,
      preferenceConfidence,
      judgmentA,
      judgmentB,
      commonalities,
      differences
    );
    
    return {
      preferredObject,
      confidenceInPreference: preferenceConfidence,
      commonalities,
      differences,
      explanation
    };
  }
  
  /**
   * Analyze how an aesthetic object resonates with human sensibilities
   * 
   * @param object The aesthetic object
   * @returns Analysis of human resonance
   */
  public analyzeHumanResonance(
    object: AestheticObject
  ): {
    resonanceScore: number;
    universality: number;
    accessibility: number;
    emotionalImpact: number;
    intellectualEngagement: number;
    sensoryAppeal: number;
    temporalRelevance: number;
    explanation: string;
  } {
    // Judge the object
    const judgment = this.judge(object);
    
    // Analyze universal appeal
    const universality = this.evaluateUniversality(object, judgment);
    
    // Analyze accessibility
    const accessibility = this.evaluateAccessibility(object, judgment);
    
    // Analyze emotional impact
    const emotionalImpact = this.evaluateEmotionalImpact(object, judgment);
    
    // Analyze intellectual engagement
    const intellectualEngagement = this.evaluateIntellectualEngagement(object, judgment);
    
    // Analyze sensory appeal
    const sensoryAppeal = this.evaluateSensoryAppeal(object, judgment);
    
    // Analyze temporal relevance
    const temporalRelevance = this.evaluateTemporalRelevance(object, judgment);
    
    // Calculate overall resonance score
    const resonanceScore = (
      universality * 0.2 +
      accessibility * 0.15 +
      emotionalImpact * 0.25 +
      intellectualEngagement * 0.15 +
      sensoryAppeal * 0.15 +
      temporalRelevance * 0.1
    );
    
    // Generate explanation
    const explanation = this.generateResonanceExplanation(
      resonanceScore,
      universality,
      accessibility,
      emotionalImpact,
      intellectualEngagement,
      sensoryAppeal,
      temporalRelevance,
      object
    );
    
    return {
      resonanceScore,
      universality,
      accessibility,
      emotionalImpact,
      intellectualEngagement,
      sensoryAppeal,
      temporalRelevance,
      explanation
    };
  }
  
  /**
   * Get default principle weights
   */
  private getDefaultPrincipleWeights(): Record<AestheticPrinciple, number> {
    return {
      [AestheticPrinciple.DISINTERESTEDNESS]: 0.8,
      [AestheticPrinciple.UNIVERSALITY]: 0.9,
      [AestheticPrinciple.PURPOSIVENESS]: 1.0,
      [AestheticPrinciple.NECESSITY]: 0.7,
      [AestheticPrinciple.FREE_PLAY]: 0.9,
      [AestheticPrinciple.EXEMPLARITY]: 0.6,
      [AestheticPrinciple.AUTONOMY]: 0.7,
      [AestheticPrinciple.ORIGINALITY]: 0.8,
      [AestheticPrinciple.SIMPLICITY]: 0.6,
      [AestheticPrinciple.COMPLEXITY]: 0.6,
      [AestheticPrinciple.COHERENCE]: 0.8,
      [AestheticPrinciple.EXPRESSIVENESS]: 0.7
    };
  }
  
  /**
   * Initialize domain analyzers for different aesthetic domains
   */
  private initializeDomainAnalyzers(): Map<AestheticDomain, (obj: any) => Record<string, number>> {
    const analyzers = new Map<AestheticDomain, (obj: any) => Record<string, number>>();
    
    // Visual domain analyzer
    analyzers.set(AestheticDomain.VISUAL, (obj: any) => {
      // This would implement visual analysis techniques
      // For now, return placeholder metrics
      return {
        composition: 0.75,
        colorHarmony: 0.8,
        contrast: 0.7,
        depth: 0.65,
        texture: 0.6
      };
    });
    
    // Auditory domain analyzer
    analyzers.set(AestheticDomain.AUDITORY, (obj: any) => {
      // This would implement audio analysis techniques
      // For now, return placeholder metrics
      return {
        harmony: 0.7,
        rhythm: 0.8,
        melody: 0.75,
        timbre: 0.65,
        dynamics: 0.7
      };
    });
    
    // Linguistic domain analyzer
    analyzers.set(AestheticDomain.LINGUISTIC, (obj: any) => {
      // This would implement text analysis techniques
      // For now, return placeholder metrics
      return {
        rhythm: 0.7,
        imagery: 0.8,
        metaphor: 0.85,
        structure: 0.75,
        voice: 0.8
      };
    });
    
    // Mathematical domain analyzer
    analyzers.set(AestheticDomain.MATHEMATICAL, (obj: any) => {
      // This would implement mathematical beauty analysis
      // For now, return placeholder metrics
      return {
        elegance: 0.85,
        simplicity: 0.8,
        generality: 0.75,
        surprise: 0.7,
        insight: 0.8
      };
    });
    
    // Computational domain analyzer
    analyzers.set(AestheticDomain.COMPUTATIONAL, (obj: any) => {
      // This would implement code/algorithm beauty analysis
      // For now, return placeholder metrics
      return {
        elegance: 0.8,
        efficiency: 0.75,
        readability: 0.7,
        modularity: 0.85,
        robustness: 0.7
      };
    });
    
    // Add placeholder analyzers for other domains
    // In a full implementation, these would be more sophisticated
    for (const domain of Object.values(AestheticDomain)) {
      if (!analyzers.has(domain as AestheticDomain)) {
        analyzers.set(domain as AestheticDomain, () => ({
          coherence: 0.7,
          expressiveness: 0.75,
          originality: 0.7,
          craftsmanship: 0.8,
          impact: 0.75
        }));
      }
    }
    
    return analyzers;
  }
  
  /**
   * Initialize generators for different aesthetic domains
   */
  private initializeGenerators(): Map<AestheticDomain, (params: GenerationParameters) => any> {
    const generators = new Map<AestheticDomain, (params: GenerationParameters) => any>();
    
    // Visual domain generator
    generators.set(AestheticDomain.VISUAL, (params: GenerationParameters) => {
      // This would implement visual generation techniques
      // For now, return a placeholder structure
      return {
        type: 'visual_composition',
        elements: this.generateVisualElements(params),
        composition: this.generateComposition(params),
        style: this.generateStyle(params)
      };
    });
    
    // Linguistic domain generator
    generators.set(AestheticDomain.LINGUISTIC, (params: GenerationParameters) => {
      // This would implement text generation techniques
      // For now, return a placeholder structure
      return {
        type: 'text',
        content: this.generateText(params),
        structure: this.generateTextStructure(params),
        style: this.generateTextStyle(params)
      };
    });
    
    // Computational domain generator
    generators.set(AestheticDomain.COMPUTATIONAL, (params: GenerationParameters) => {
      // This would implement code generation techniques
      // For now, return a placeholder structure
      return {
        type: 'code',
        algorithm: this.generateAlgorithm(params),
        structure: this.generateCodeStructure(params),
        style: this.generateCodeStyle(params)
      };
    });
    
    // Add placeholder generators for other domains
    // In a full implementation, these would be more sophisticated
    for (const domain of Object.values(AestheticDomain)) {
      if (!generators.has(domain as AestheticDomain)) {
        generators.set(domain as AestheticDomain, (params: GenerationParameters) => ({
          type: domain,
          structure: this.generateGenericStructure(params),
          elements: this.generateGenericElements(params),
          style: this.generateGenericStyle(params)
        }));
      }
    }
    
    return generators;
  }
  
  /**
   * Initialize formal element detectors
   */
  private initializeFormalElementDetectors(): Map<FormalElement, (obj: any, domain: AestheticDomain) => number> {
    const detectors = new Map<FormalElement, (obj: any, domain: AestheticDomain) => number>();
    
    // Unity detector
    detectors.set(FormalElement.UNITY, (obj: any, domain: AestheticDomain) => {
      // This would implement unity detection techniques
      // For now, return a placeholder value
      return 0.75;
    });
    
    // Variety detector
    detectors.set(FormalElement.VARIETY, (obj: any, domain: AestheticDomain) => {
      // This would implement variety detection techniques
      // For now, return a placeholder value
      return 0.7;
    });
    
    // Balance detector
    detectors.set(FormalElement.BALANCE, (obj: any, domain: AestheticDomain) => {
      // This would implement balance detection techniques
      // For now, return a placeholder value
      return 0.8;
    });
    
    // Add placeholder detectors for other formal elements
    // In a full implementation, these would be more sophisticated
    for (const element of Object.values(FormalElement)) {
      if (!detectors.has(element as FormalElement)) {
        detectors.set(element as FormalElement, () => {
          // Random value between 0.6 and 0.9 for variety
          return 0.6 + Math.random() * 0.3;
        });
      }
    }
    
    return detectors;
