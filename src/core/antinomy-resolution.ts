thesis: "one perspective",
        antithesis: "another perspective"
      }
    };
    
    // Use default perspectives for this antinomy type
    const perspectives = defaultPerspectives[antinomy.type];
    
    // Refine based on antinomy content
    // (In a full implementation, this would be more sophisticated)
    
    return perspectives;
  }
  
  /**
   * Identify different contexts for thesis and antithesis
   * 
   * @param antinomy The antinomy to analyze
   * @returns Different contexts for thesis and antithesis
   */
  private identifyContexts(antinomy: Antinomy): { thesis: string; antithesis: string } {
    // Default contexts based on antinomy type
    const defaultContexts: Record<AntinomyType, { thesis: string; antithesis: string }> = {
      [AntinomyType.FINITE_VS_INFINITE]: {
        thesis: "contexts requiring boundaries",
        antithesis: "contexts requiring unbounded potential"
      },
      [AntinomyType.ATOMIC_VS_CONTINUOUS]: {
        thesis: "contexts requiring precise units",
        antithesis: "contexts requiring smooth transitions"
      },
      [AntinomyType.DETERMINISTIC_VS_RANDOM]: {
        thesis: "predictable systems",
        antithesis: "stochastic processes"
      },
      [AntinomyType.FREEDOM_VS_CAUSALITY]: {
        thesis: "moral deliberation",
        antithesis: "scientific explanation"
      },
      [AntinomyType.NECESSITY_VS_CONTINGENCY]: {
        thesis: "logical reasoning",
        antithesis: "empirical investigation"
      },
      [AntinomyType.TELEOLOGY_VS_MECHANISM]: {
        thesis: "functional analysis",
        antithesis: "physical analysis"
      },
      [AntinomyType.UTILITY_VS_RIGHTS]: {
        thesis: "emergency situations",
        antithesis: "ordinary circumstances"
      },
      [AntinomyType.INDIVIDUAL_VS_COLLECTIVE]: {
        thesis: "personal rights contexts",
        antithesis: "public good contexts"
      },
      [AntinomyType.AUTONOMY_VS_WELFARE]: {
        thesis: "competent adult decisions",
        antithesis: "vulnerable population protection"
      },
      [AntinomyType.TRANSPARENCY_VS_PERFORMANCE]: {
        thesis: "high-stakes decisions",
        antithesis: "routine operations"
      },
      [AntinomyType.GENERALITY_VS_SPECIALIZATION]: {
        thesis: "novel situations",
        antithesis: "familiar problems"
      },
      [AntinomyType.ROBUSTNESS_VS_ADAPTABILITY]: {
        thesis: "stable environments",
        antithesis: "changing environments"
      },
      [AntinomyType.UNCLASSIFIED]: {
        thesis: "one context",
        antithesis: "another context"
      }
    };
    
    // Use default contexts for this antinomy type
    const contexts = defaultContexts[antinomy.type];
    
    // Check for specific contextual flags in the antinomy's context
    if (antinomy.context) {
      // Use contextual information if available
      // (In a full implementation, this would be more sophisticated)
    }
    
    return contexts;
  }
  
  /**
   * Generate a synthesis of thesis and antithesis
   * 
   * @param antinomy The antinomy to synthesize
   * @returns Synthetic proposition
   */
  private generateSynthesis(antinomy: Antinomy): string {
    // Default syntheses based on antinomy type
    const defaultSyntheses: Record<AntinomyType, string> = {
      [AntinomyType.FINITE_VS_INFINITE]: 
        "Reality has both finite and infinite aspects, with bounded phenomena arising within an unbounded framework.",
      
      [AntinomyType.ATOMIC_VS_CONTINUOUS]: 
        "Systems can exhibit both discrete and continuous properties, with different models appropriate at different scales.",
      
      [AntinomyType.DETERMINISTIC_VS_RANDOM]: 
        "Complex systems can exhibit both deterministic patterns and random variations, with deterministic laws giving rise to probabilistic outcomes.",
      
      [AntinomyType.FREEDOM_VS_CAUSALITY]: 
        "Human action is simultaneously free from a practical perspective and causally determined from a theoretical perspective.",
      
      [AntinomyType.NECESSITY_VS_CONTINGENCY]: 
        "The world exhibits both necessary structures and contingent particulars, with contingent facts arising within necessary frameworks.",
      
      [AntinomyType.TELEOLOGY_VS_MECHANISM]: 
        "Natural systems can be understood both in terms of their mechanical processes and their functional organization.",
      
      [AntinomyType.UTILITY_VS_RIGHTS]: 
        "Ethical action requires respecting rights within a framework that promotes overall welfare.",
      
      [AntinomyType.INDIVIDUAL_VS_COLLECTIVE]: 
        "A flourishing society requires both strong individual rights and robust community structures.",
      
      [AntinomyType.AUTONOMY_VS_WELFARE]: 
        "True care respects autonomy while providing support, recognizing that autonomy itself requires certain welfare conditions.",
      
      [AntinomyType.TRANSPARENCY_VS_PERFORMANCE]: 
        "Systems can be designed with appropriate transparency for their context and purpose, with critical functions receiving greater scrutiny.",
      
      [AntinomyType.GENERALITY_VS_SPECIALIZATION]: 
        "Effective systems combine general capabilities with specialized components, using general frameworks to integrate specialized functions.",
      
      [AntinomyType.ROBUSTNESS_VS_ADAPTABILITY]: 
        "Sustainable systems maintain a stable core while allowing for adaptation at appropriate points and scales.",
      
      [AntinomyType.UNCLASSIFIED]: 
        "A balanced approach incorporates elements of both perspectives in a coherent framework."
    };
    
    // Use default synthesis for this antinomy type
    let synthesis = defaultSyntheses[antinomy.type];
    
    // Extract key terms from thesis and antithesis
    const thesisTerms = this.extractKeyTerms(antinomy.thesis.statement);
    const antithesisTerms = this.extractKeyTerms(antinomy.antithesis.statement);
    
    // Try to create a more specific synthesis using the actual terms
    if (thesisTerms.length > 0 && antithesisTerms.length > 0) {
      // (In a full implementation, this would create more sophisticated syntheses)
    }
    
    return synthesis;
  }
  
  /**
   * Generate a dialectical narrative of thesis, antithesis, and synthesis
   * 
   * @param antinomy The antinomy to analyze
   * @returns Dialectical narrative
   */
  private generateDialecticalNarrative(antinomy: Antinomy): {
    thesis: string;
    antithesis: string;
    synthesis: string;
  } {
    // Format thesis and antithesis for the narrative
    const thesisNarrative = `Initially, we accept that "${antinomy.thesis.statement}"`;
    const antithesisNarrative = `This position generates its own contradiction: "${antinomy.antithesis.statement}"`;
    
    // Generate synthesis using the synthesis method
    const synthesisNarrative = `This contradiction leads to a higher understanding: ${this.generateSynthesis(antinomy)}`;
    
    return {
      thesis: thesisNarrative,
      antithesis: antithesisNarrative,
      synthesis: synthesisNarrative
    };
  }
  
  /**
   * Generate regulative principles from thesis and antithesis
   * 
   * @param antinomy The antinomy to analyze
   * @returns Regulative principles
   */
  private generateRegulativePrinciples(antinomy: Antinomy): {
    thesis: string;
    antithesis: string;
    guidance: string;
  } {
    // Convert thesis and antithesis to regulative principles
    const thesisPrinciple = this.statementToRegulativePrinciple(antinomy.thesis.statement);
    const antithesisPrinciple = this.statementToRegulativePrinciple(antinomy.antithesis.statement);
    
    // Generate guidance on how to use these principles
    const guidance = `Use ${thesisPrinciple} to guide inquiry into possibilities, and ${antithesisPrinciple} to maintain critical perspective.`;
    
    return {
      thesis: thesisPrinciple,
      antithesis: antithesisPrinciple,
      guidance
    };
  }
  
  /**
   * Convert a statement to a regulative principle
   * 
   * @param statement The statement to convert
   * @returns Regulative principle
   */
  private statementToRegulativePrinciple(statement: string): string {
    // Remove absolutist language
    let principle = statement
      .replace(/always/gi, "generally")
      .replace(/never/gi, "rarely")
      .replace(/must/gi, "should consider")
      .replace(/cannot/gi, "might not");
    
    // Add regulative framing
    if (!principle.toLowerCase().includes("as if") && 
        !principle.toLowerCase().includes("guide")) {
      principle = `Act as if ${principle.toLowerCase()}`;
    }
    
    return principle;
  }
  
  /**
   * Generate a practical solution to an antinomy
   * 
   * @param antinomy The antinomy to find a practical solution for
   * @returns Practical solution details
   */
  private generatePracticalSolution(antinomy: Antinomy): {
    solution: string;
    approach: string;
    guidance: string;
  } {
    // Default solutions based on antinomy type
    const defaultSolutions: Record<AntinomyType, {
      solution: string;
      approach: string;
      guidance: string;
    }> = {
      [AntinomyType.TRANSPARENCY_VS_PERFORMANCE]: {
        solution: "Implement tiered transparency with full explanations for critical decisions and simplified explanations for routine operations",
        approach: "balancing transparency needs with performance requirements based on risk and impact",
        guidance: "Classify decisions by impact level and provide appropriate transparency for each level. Document performance tradeoffs explicitly."
      },
      
      [AntinomyType.GENERALITY_VS_SPECIALIZATION]: {
        solution: "Adopt a modular architecture with a general framework integrating specialized components",
        approach: "combining general capabilities with domain-specific optimizations",
        guidance: "Build a general framework that can integrate specialized modules. Document interfaces clearly to enable both general use and specialized extensions."
      },
      
      [AntinomyType.ROBUSTNESS_VS_ADAPTABILITY]: {
        solution: "Implement core stability with controlled adaptation at well-defined extension points",
        approach: "separating stable core functions from adaptable components",
        guidance: "Identify and protect core functionality while allowing for adaptation in non-critical components. Use version control and testing to manage adaptation risks."
      },
      
      [AntinomyType.UTILITY_VS_RIGHTS]: {
        solution: "Establish rights as constraints on utility maximization",
        approach: "treating rights as side constraints that utility calculations cannot violate",
        guidance: "First check if any rights would be violated by an action. If not, then proceed to maximize utility within those constraints."
      },
      
      [AntinomyType.INDIVIDUAL_VS_COLLECTIVE]: {
        solution: "Implement nested decision processes with individual autonomy for personal matters and collective processes for shared impacts",
        approach: "matching decision authority to the scope of impact",
        guidance: "For decisions affecting primarily the individual, prioritize individual choice. For decisions with significant collective impact, use collective decision processes."
      },
      
      [AntinomyType.UNCLASSIFIED]: {
        solution: "Implement a balanced approach with explicit tradeoffs",
        approach: "making tradeoffs explicit and revisable",
        guidance: "Document the tradeoffs you're making and review them regularly. Be willing to adjust as you learn from experience."
      }
    };
    
    // Use default solution for this antinomy type or fall back to unclassified
    const solution = defaultSolutions[antinomy.type] || defaultSolutions[AntinomyType.UNCLASSIFIED];
    
    return solution;
  }
  
  /**
   * Identify different levels of analysis for thesis and antithesis
   * 
   * @param antinomy The antinomy to analyze
   * @returns Different levels of analysis
   */
  private identifyLevelsOfAnalysis(antinomy: Antinomy): { thesis: string; antithesis: string } {
    // Default levels based on antinomy type
    const defaultLevels: Record<AntinomyType, { thesis: string; antithesis: string }> = {
      [AntinomyType.ATOMIC_VS_CONTINUOUS]: {
        thesis: "discrete units",
        antithesis: "continuous fields"
      },
      [AntinomyType.DETERMINISTIC_VS_RANDOM]: {
        thesis: "individual events",
        antithesis: "statistical aggregates"
      },
      [AntinomyType.FREEDOM_VS_CAUSALITY]: {
        thesis: "personal agency",
        antithesis: "physical processes"
      },
      [AntinomyType.TELEOLOGY_VS_MECHANISM]: {
        thesis: "functional organization",
        antithesis: "component interactions"
      },
      [AntinomyType.INDIVIDUAL_VS_COLLECTIVE]: {
        thesis: "individual actors",
        antithesis: "social systems"
      },
      [AntinomyType.UNCLASSIFIED]: {
        thesis: "one level of analysis",
        antithesis: "another level of analysis"
      }
    };
    
    // Use default levels for this antinomy type or fall back to unclassified
    return defaultLevels[antinomy.type] || defaultLevels[AntinomyType.UNCLASSIFIED];
  }
  
  /**
   * Generate a list of contextual factors to consider
   * 
   * @param antinomy The antinomy to analyze
   * @returns Contextual factors
   */
  private getContextualFactors(antinomy: Antinomy): string {
    // Default factors based on antinomy type
    const defaultFactors: Record<AntinomyType, string> = {
      [AntinomyType.UTILITY_VS_RIGHTS]: 
        "severity of rights violations, number of people affected, magnitude of utility gains",
      
      [AntinomyType.INDIVIDUAL_VS_COLLECTIVE]: 
        "scope of impact, reversibility of decisions, presence of externalities",
      
      [AntinomyType.AUTONOMY_VS_WELFARE]: 
        "capacity for informed consent, risk of harm, reversibility of outcomes",
      
      [AntinomyType.TRANSPARENCY_VS_PERFORMANCE]: 
        "stakes of decision, technical complexity, end-user needs",
      
      [AntinomyType.GENERALITY_VS_SPECIALIZATION]: 
        "problem novelty, available expertise, time constraints",
      
      [AntinomyType.ROBUSTNESS_VS_ADAPTABILITY]: 
        "environment stability, failure costs, learning opportunities",
      
      [AntinomyType.UNCLASSIFIED]: 
        "specific goals, available resources, stakeholder priorities"
    };
    
    // Use default factors for this antinomy type or fall back to unclassified
    return defaultFactors[antinomy.type] || defaultFactors[AntinomyType.UNCLASSIFIED];
  }
  
  /**
   * Create resolved propositions based on antinomy resolutions
   * 
   * @param originalPropositions Original propositions
   * @param resolutions Resolutions for antinomies
   * @returns Modified propositions that incorporate resolutions
   */
  private createResolvedPropositions(
    originalPropositions: Proposition[],
    resolutions: AntinomyResolution[]
  ): Proposition[] {
    // Create a copy of the original propositions
    const resolvedPropositions: Proposition[] = [...originalPropositions];
    
    // Add a new proposition for each resolution
    resolutions.forEach(resolution => {
      // Create a new proposition representing the resolution
      const resolvedProposition: Proposition = {
        statement: resolution.resolution,
        confidence: resolution.confidence,
        source: "antinomy_resolution",
        domain: resolution.antinomy.domain,
        metadata: {
          strategy: resolution.strategy,
          originalThesis: resolution.antinomy.thesis.statement,
          originalAntithesis: resolution.antinomy.antithesis.statement
        }
      };
      
      // Add the resolved proposition
      resolvedPropositions.push(resolvedProposition);
    });
    
    return resolvedPropositions;
  }
  
  /**
   * Generate an explanation of contradiction resolution
   * 
   * @param antinomies The antinomies that were detected
   * @param resolutions The resolutions that were applied
   * @returns Explanation of the resolution process
   */
  private generateContradictionResolutionExplanation(
    antinomies: Antinomy[],
    resolutions: AntinomyResolution[]
  ): string {
    // Format the explanation
    let explanation = `Detected ${antinomies.length} contradiction${antinomies.length !== 1 ? 's' : ''} among the propositions.\n\n`;
    
    // Add details for each antinomy and its resolution
    resolutions.forEach((resolution, index) => {
      const antinomy = resolution.antinomy;
      
      explanation += `Contradiction ${index + 1}: ${antinomy.type}\n`;
      explanation += `- Thesis: "${antinomy.thesis.statement}"\n`;
      explanation += `- Antithesis: "${antinomy.antithesis.statement}"\n`;
      explanation += `- Resolution Strategy: ${resolution.strategy}\n`;
      explanation += `- Resolution: ${resolution.resolution}\n\n`;
    });
    
    // Add overall guidance
    explanation += "Integration of these resolutions yields a more coherent understanding that respects the valid insights of each proposition while avoiding contradictions.";
    
    return explanation;
  }
  
  /**
   * Generate an action recommendation based on antinomy resolutions
   * 
   * @param action The action to evaluate
   * @param resolutions Resolutions for antinomies
   * @returns Recommendation for the action
   */
  private generateActionRecommendation(
    action: Action,
    resolutions: AntinomyResolution[]
  ): string {
    // Start with a general assessment
    let recommendation = `The proposed action "${action.description}" involves tensions between different values or principles.\n\n`;
    
    // Add insights from each resolution
    resolutions.forEach((resolution, index) => {
      recommendation += `Regarding the tension between ${resolution.antinomy.thesis.source} and ${resolution.antinomy.antithesis.source}:\n`;
      recommendation += `${resolution.actionGuidance}\n\n`;
    });
    
    // Provide an overall assessment
    const overallPositive = resolutions.every(r => r.confidence > 0.6);
    if (overallPositive) {
      recommendation += "Overall, the action appears justified when implemented with the suggested qualifications and constraints.";
    } else {
      recommendation += "The action requires significant modification to address the identified tensions and contradictions.";
    }
    
    return recommendation;
  }
  
  /**
   * Calculate balanced priorities for design goals
   * 
   * @param thesisGoal Name of the thesis goal
   * @param antithesisGoal Name of the antithesis goal
   * @param thesisPriority Original priority of the thesis goal
   * @param antithesisPriority Original priority of the antithesis goal
   * @param strategy Resolution strategy used
   * @returns Adjusted priorities
   */
  private calculateBalancedPriorities(
    thesisGoal: string,
    antithesisGoal: string,
    thesisPriority: number,
    antithesisPriority: number,
    strategy: ResolutionStrategy
  ): { thesis: number; antithesis: number } {
    // Default to original priorities
    let adjustedThesis = thesisPriority;
    let adjustedAntithesis = antithesisPriority;
    
    // Adjust based on strategy
    switch (strategy) {
      case ResolutionStrategy.SYNTHESIS:
        // Balance priorities more evenly for synthesis
        const average = (thesisPriority + antithesisPriority) / 2;
        adjustedThesis = average * 0.9;
        adjustedAntithesis = average * 0.9;
        break;
        
      case ResolutionStrategy.DOMAIN_DISTINCTION:
        // Keep both priorities high but slightly reduced
        adjustedThesis = thesisPriority * 0.9;
        adjustedAntithesis = antithesisPriority * 0.9;
        break;
        
      case ResolutionStrategy.CONTEXTUAL_PRIORITIZATION:
        // Moderate reduction in both to reflect contextual application
        adjustedThesis = thesisPriority * 0.85;
        adjustedAntithesis = antithesisPriority * 0.85;
        break;
        
      case ResolutionStrategy.PRACTICAL_RESOLUTION:
        // Practical solutions often involve compromise
        const practicalAverage = (thesisPriority + antithesisPriority) / 2;
        adjustedThesis = (thesisPriority + practicalAverage) / 2;
        adjustedAntithesis = (antithesisPriority + practicalAverage) / 2;
        break;
        
      default:
        // Other strategies may keep original priorities
        break;
    }
    
    return { thesis: adjustedThesis, antithesis: adjustedAntithesis };
  }
  
  /**
   * Normalize a statement for comparison
   * 
   * @param statement The statement to normalize
   * @returns Normalized statement
   */
  private normalizeStatement(statement: string): string {
    return statement
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[.,;:!?]/g, '')
      .trim();
  }
  
  /**
   * Negate a statement
   * 
   * @param statement The statement to negate
   * @returns Negated statement
   */
  private negateStatement(statement: string): string {
    // This is a simplified negation function
    return statement
      .replace(/\bare\b/i, 'are not')
      .replace(/\bis\b/i, 'is not')
      .replace(/\bcan\b/i, 'cannot')
      .replace(/\bshould\b/i, 'should not')
      .replace(/\bmust\b/i, 'must not')
      .replace(/\bwill\b/i, 'will not')
      .replace(/\ball\b/i, 'no')
      .replace(/\bnone\b/i, 'some')
      .replace(/\bno\b/i, 'some')
      .replace(/\bsome\b/i, 'no')
      .replace(/\balways\b/i, 'never')
      .replace(/\bnever\b/i, 'always')
      .replace(/\are not\b/i, 'are')
      .replace(/\is not\b/i, 'is')
      .replace(/\cannot\b/i, 'can')
      .replace(/\should not\b/i, 'should')
      .replace(/\must not\b/i, 'must')
      .replace(/\will not\b/i, 'will');
  }
  
  /**
   * Get patterns of common antonyms
   * 
   * @returns Patterns of common antonyms
   */
  private getAntonymPatterns(): [string, string][] {
    return [
      ['good', 'bad'],
      ['right', 'wrong'],
      ['true', 'false'],
      ['necessary', 'contingent'],
      ['always', 'never'],
      ['all', 'none'],
      ['finite', 'infinite'],
      ['discrete', 'continuous'],
      ['deterministic', 'random'],
      ['freedom', 'necessity'],
      ['individual', 'collective'],
      ['rights', 'utility'],
      ['objective', 'subjective'],
      ['universal', 'particular'],
      ['absolute', 'relative'],
      ['transparent', 'opaque'],
      ['general', 'specific'],
      ['robust', 'fragile'],
      ['stable', 'adaptive']
    ];
  }
  
  /**
   * Extract the core proposition from a statement
   * 
   * @param statement The statement to analyze
   * @returns Core proposition
   */
  private extractCoreProposition(statement: string): string {
    // Remove modal operators and qualifiers
    return statement
      .replace(/necessarily|possibly|must|may|might|could|can|should|always|never|sometimes/gi, '')
      .replace(/it is (the case that|true that|false that)/gi, '')
      .trim();
  }
  
  /**
   * Extract the subject from a statement
   * 
   * @param statement The statement to analyze
   * @returns Subject of the statement
   */
  private extractSubject(statement: string): string {
    // This is a simplified subject extraction function
    // In a full implementation, this would use more sophisticated NLP
    
    // Look for common patterns
    const patterns = [
      /^(All|Every|Some|No|Any|Each|Most)\s+([a-zA-Z\s]+?)\s+(is|are|can|should|must|will)/i,
      /^(The|A|An)\s+([a-zA-Z\s]+?)\s+(is|are|can|should|must|will)/i,
      /^([A-Z][a-z]+(?:\s+[a-z]+)*)\s+(is|are|can|should|must|will)/i
    ];
    
    for (const pattern of patterns) {
      const match = statement.match(pattern);
      if (match && match[2]) {
        return match[2].trim();
      }
    }
    
    // If no pattern matches, take the first few words
    const words = statement.split(/\s+/);
    if (words.length >= 3) {
      return words.slice(0, 3).join(' ');
    } else if (words.length > 0) {
      return words[0];
    }
    
    return '';
  }
  
  /**
   * Extract the predicate from a statement
   * 
   * @param statement The statement to analyze
   * @returns Predicate of the statement
   */
  private extractPredicate(statement: string): string {
    // This is a simplified predicate extraction function
    // In a full implementation, this would use more sophisticated NLP
    
    // Look for common patterns
    const patterns = [
      /^(?:All|Every|Some|No|Any|Each|Most)\s+[a-zA-Z\s]+?\s+(is|are|can|should|must|will)\s+(.+)$/i,
      /^(?:The|A|An)\s+[a-zA-Z\s]+?\s+(is|are|can|should|must|will)\s+(.+)$/i,
      /^[A-Z][a-z]+(?:\s+[a-z]+)*\s+(is|are|can|should|must|will)\s+(.+)$/i
    ];
    
    for (const pattern of patterns) {
      const match = statement.match(pattern);
      if (match && match[2]) {
        return match[1] + ' ' + match[2].trim();
      }
    }
    
    // If no pattern matches, take everything after the first few words
    const words = statement.split(/\s+/);
    if (words.length >= 3) {
      return words.slice(3).join(' ');
    } else if (words.length > 1) {
      return words.slice(1).join(' ');
    }
    
    return '';
  }
  
  /**
   * Extract key terms from a statement
   * 
   * @param statement The statement to analyze
   * @returns Key terms
   */
  private extractKeyTerms(statement: string): string[] {
    // This is a simplified key term extraction function
    // In a full implementation, this would use more sophisticated NLP
    
    // Normalize the statement
    const normalized = this.normalizeStatement(statement);
    
    // Split into words
    const words = normalized.split(/\s+/);
    
    // Filter out common stop words
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'can', 'could', 'that', 'which', 'who', 'whom', 'this', 'these', 'those', 'it', 'they', 'he', 'she', 'we', 'you', 'i', 'me', 'my', 'mine', 'your', 'yours', 'his', 'her', 'hers', 'its', 'our', 'ours', 'their', 'theirs'];
    
    const keyTerms = words.filter(word => 
      word.length > 3 && !stopWords.includes(word)
    );
    
    return [...new Set(keyTerms)]; // Remove duplicates
  }
  
  /**
   * Calculate similarity between two strings
   * 
   * @param a First string
   * @param b Second string
   * @returns Similarity score (0-1)
   */
  private calculateStringSimilarity(a: string, b: string): number {
    // This is a simplified similarity function using Jaccard similarity
    // In a full implementation, this could use more sophisticated algorithms
    
    if (!a || !b) return 0;
    if (a === b) return 1;
    
    // Tokenize strings into words
    const wordsA = new Set(a.toLowerCase().split(/\s+/));
    const wordsB = new Set(b.toLowerCase().split(/\s+/));
    
    // Calculate intersection
    const intersection = new Set([...wordsA].filter(x => wordsB.has(x)));
    
    // Calculate union
    const union = new Set([...wordsA, ...wordsB]);
    
    // Return Jaccard similarity
    return intersection.size / union.size;
  }
}

/**
 * Export the Antinomy Resolution module
 */
export {
  AntinomyResolution,
  AntinomyType,
  AntinomyDomain,
  ResolutionStrategy,
  Proposition,
  Antinomy,
  AntinomyResolution,
  AntinomyResolutionOptions
};    // If the subjects are the same or similar
    if (this.calculateStringSimilarity(subjectA, subjectB) > 0.7) {
      // Extract predicate from both statements
      const predicateA = this.extractPredicate(statementA);
      const predicateB = this.extractPredicate(statementB);
      
      // If the predicates are the same or similar
      if (this.calculateStringSimilarity(predicateA, predicateB) > 0.7) {
        // Check for quantifier contradictions
        for (const pattern of quantifierPatterns) {
          if ((pattern.pattern1.test(statementA) && pattern.pattern2.test(statementB)) ||
              (pattern.pattern1.test(statementB) && pattern.pattern2.test(statementA))) {
            return {
              isContradiction: true,
              strength: 0.9,
              description: pattern.description,
              type: pattern.type
            };
          }
        }
      }
    }
    
    // No quantifier contradiction found
    return {
      isContradiction: false,
      strength: 0,
      description: "No quantifier contradiction detected",
      type: undefined
    };
  }
  
  /**
   * Determine the domain of an antinomy
   * 
   * @param propositionA First proposition
   * @param propositionB Second proposition
   * @returns Domain of the antinomy
   */
  private determineDomain(
    propositionA: Proposition,
    propositionB: Proposition
  ): AntinomyDomain {
    // If both propositions have the same domain, use that
    if (propositionA.domain && propositionB.domain && propositionA.domain === propositionB.domain) {
      return propositionA.domain;
    }
    
    // If one proposition has a domain, use that
    if (propositionA.domain) {
      return propositionA.domain;
    }
    
    if (propositionB.domain) {
      return propositionB.domain;
    }
    
    // Otherwise, infer domain from content
    return this.inferDomain(propositionA.statement, propositionB.statement);
  }
  
  /**
   * Infer the domain of an antinomy from proposition content
   * 
   * @param statementA First statement
   * @param statementB Second statement
   * @returns Inferred domain
   */
  private inferDomain(statementA: string, statementB: string): AntinomyDomain {
    // Combined text for analysis
    const combinedText = `${statementA} ${statementB}`.toLowerCase();
    
    // Keywords for each domain
    const domainKeywords: Record<AntinomyDomain, string[]> = {
      [AntinomyDomain.EPISTEMOLOGY]: [
        'know', 'knowledge', 'belief', 'truth', 'certainty', 'doubt', 'justification',
        'evidence', 'reason', 'perception', 'experience', 'understanding'
      ],
      [AntinomyDomain.ETHICS]: [
        'good', 'bad', 'right', 'wrong', 'moral', 'immoral', 'ethics', 'virtue', 'vice',
        'duty', 'obligation', 'permission', 'forbidden', 'allowed', 'should', 'ought'
      ],
      [AntinomyDomain.METAPHYSICS]: [
        'reality', 'existence', 'being', 'causality', 'cause', 'effect', 'necessity',
        'possibility', 'contingency', 'freedom', 'determinism', 'nature', 'substance'
      ],
      [AntinomyDomain.AESTHETICS]: [
        'beauty', 'art', 'taste', 'aesthetic', 'sublime', 'ugly', 'elegant', 'artistic',
        'harmony', 'balance', 'proportion', 'creativity', 'expression'
      ],
      [AntinomyDomain.SYSTEM]: [
        'system', 'design', 'architecture', 'performance', 'efficiency', 'transparency',
        'explainability', 'robustness', 'flexibility', 'generalization', 'specificity'
      ]
    };
    
    // Count keyword matches for each domain
    const domainCounts: Record<AntinomyDomain, number> = Object.fromEntries(
      Object.entries(domainKeywords).map(([domain, keywords]) => [
        domain,
        keywords.filter(keyword => combinedText.includes(keyword)).length
      ])
    ) as Record<AntinomyDomain, number>;
    
    // Find the domain with the most keyword matches
    let maxCount = 0;
    let inferredDomain = AntinomyDomain.EPISTEMOLOGY; // Default
    
    for (const [domain, count] of Object.entries(domainCounts)) {
      if (count > maxCount) {
        maxCount = count;
        inferredDomain = domain as AntinomyDomain;
      }
    }
    
    return inferredDomain;
  }
  
  /**
   * Identify the type of antinomy based on the content of the propositions
   * 
   * @param statementA First statement or keyword
   * @param statementB Second statement or keyword
   * @returns Type of antinomy
   */
  private identifyAntinomyType(statementA: string, statementB: string): AntinomyType {
    // Combined text for analysis
    const combinedText = `${statementA} ${statementB}`.toLowerCase();
    
    // Keywords for each antinomy type
    const typeKeywords: Record<AntinomyType, string[]> = {
      [AntinomyType.FINITE_VS_INFINITE]: [
        'finite', 'infinite', 'bounded', 'unbounded', 'limited', 'unlimited', 'end', 'endless'
      ],
      [AntinomyType.ATOMIC_VS_CONTINUOUS]: [
        'atomic', 'discrete', 'continuous', 'indivisible', 'divisible', 'quantum', 'analog'
      ],
      [AntinomyType.DETERMINISTIC_VS_RANDOM]: [
        'deterministic', 'random', 'determined', 'chance', 'probability', 'certainty', 'uncertainty'
      ],
      [AntinomyType.FREEDOM_VS_CAUSALITY]: [
        'freedom', 'causality', 'free will', 'determined', 'choice', 'cause', 'effect', 'agency'
      ],
      [AntinomyType.NECESSITY_VS_CONTINGENCY]: [
        'necessary', 'contingent', 'must', 'might', 'possible', 'required', 'optional'
      ],
      [AntinomyType.TELEOLOGY_VS_MECHANISM]: [
        'purpose', 'mechanism', 'goal', 'function', 'intention', 'design', 'blind', 'function'
      ],
      [AntinomyType.UTILITY_VS_RIGHTS]: [
        'utility', 'rights', 'consequence', 'principle', 'outcome', 'duty', 'benefit', 'dignity'
      ],
      [AntinomyType.INDIVIDUAL_VS_COLLECTIVE]: [
        'individual', 'collective', 'person', 'community', 'self', 'society', 'private', 'public'
      ],
      [AntinomyType.AUTONOMY_VS_WELFARE]: [
        'autonomy', 'welfare', 'choice', 'benefit', 'freedom', 'protection', 'independence', 'care'
      ],
      [AntinomyType.TRANSPARENCY_VS_PERFORMANCE]: [
        'transparency', 'performance', 'explainable', 'efficient', 'interpretable', 'optimized'
      ],
      [AntinomyType.GENERALITY_VS_SPECIALIZATION]: [
        'general', 'specialized', 'broad', 'narrow', 'universal', 'specific', 'domain'
      ],
      [AntinomyType.ROBUSTNESS_VS_ADAPTABILITY]: [
        'robust', 'adaptable', 'stable', 'flexible', 'resilient', 'learning', 'fixed', 'changing'
      ],
      [AntinomyType.UNCLASSIFIED]: []
    };
    
    // Check for direct antinomy patterns
    const antinomyPatterns: [RegExp, AntinomyType][] = [
      [/(finite|bounded|limited).*(infinite|unbounded|unlimited)/i, AntinomyType.FINITE_VS_INFINITE],
      [/(atomic|discrete).*(continuous|divisible)/i, AntinomyType.ATOMIC_VS_CONTINUOUS],
      [/(deterministic|determined).*(random|chance|probabilistic)/i, AntinomyType.DETERMINISTIC_VS_RANDOM],
      [/(freedom|free will|choice).*(causality|determined|cause)/i, AntinomyType.FREEDOM_VS_CAUSALITY],
      [/(necessary|must|required).*(contingent|might|optional)/i, AntinomyType.NECESSITY_VS_CONTINGENCY],
      [/(purpose|goal|intention).*(mechanism|function|process)/i, AntinomyType.TELEOLOGY_VS_MECHANISM],
      [/(utility|consequence|outcome).*(rights|principle|duty)/i, AntinomyType.UTILITY_VS_RIGHTS],
      [/(individual|person|self).*(collective|community|society)/i, AntinomyType.INDIVIDUAL_VS_COLLECTIVE],
      [/(autonomy|choice|freedom).*(welfare|benefit|protection)/i, AntinomyType.AUTONOMY_VS_WELFARE],
      [/(transparency|explainable|interpretable).*(performance|efficient|optimized)/i, AntinomyType.TRANSPARENCY_VS_PERFORMANCE],
      [/(general|broad|universal).*(specialized|narrow|specific)/i, AntinomyType.GENERALITY_VS_SPECIALIZATION],
      [/(robust|stable|resilient).*(adaptable|flexible|learning)/i, AntinomyType.ROBUSTNESS_VS_ADAPTABILITY]
    ];
    
    // Check for direct pattern matches
    for (const [pattern, type] of antinomyPatterns) {
      if (pattern.test(combinedText)) {
        return type;
      }
    }
    
    // Count keyword matches for each type
    const typeCounts: Record<AntinomyType, number> = Object.fromEntries(
      Object.entries(typeKeywords).map(([type, keywords]) => [
        type,
        keywords.filter(keyword => combinedText.includes(keyword)).length
      ])
    ) as Record<AntinomyType, number>;
    
    // Find the type with the most keyword matches
    let maxCount = 0;
    let inferredType = AntinomyType.UNCLASSIFIED;
    
    for (const [type, count] of Object.entries(typeCounts)) {
      if (count > maxCount) {
        maxCount = count;
        inferredType = type as AntinomyType;
      }
    }
    
    return inferredType;
  }
  
  /**
   * Apply a resolution strategy to an antinomy
   * 
   * @param antinomy The antinomy to resolve
   * @param strategy The resolution strategy to apply
   * @returns Resolution of the antinomy
   */
  private applyResolutionStrategy(
    antinomy: Antinomy,
    strategy: ResolutionStrategy
  ): AntinomyResolution {
    switch (strategy) {
      case ResolutionStrategy.DOMAIN_DISTINCTION:
        return this.applyDomainDistinctionStrategy(antinomy);
      
      case ResolutionStrategy.PERSPECTIVE_SHIFT:
        return this.applyPerspectiveShiftStrategy(antinomy);
      
      case ResolutionStrategy.CONTEXTUAL_PRIORITIZATION:
        return this.applyContextualPrioritizationStrategy(antinomy);
      
      case ResolutionStrategy.SYNTHESIS:
        return this.applySynthesisStrategy(antinomy);
      
      case ResolutionStrategy.DIALECTICAL_PROGRESSION:
        return this.applyDialecticalProgressionStrategy(antinomy);
      
      case ResolutionStrategy.REGULATIVE_PRINCIPLE:
        return this.applyRegulativePrincipleStrategy(antinomy);
      
      case ResolutionStrategy.PRACTICAL_RESOLUTION:
        return this.applyPracticalResolutionStrategy(antinomy);
      
      case ResolutionStrategy.MULTI_LEVEL_ANALYSIS:
        return this.applyMultiLevelAnalysisStrategy(antinomy);
      
      case ResolutionStrategy.UNRESOLVABLE:
      default:
        return this.acknowledgeUnresolvableAntinomy(antinomy);
    }
  }
  
  /**
   * Apply the domain distinction resolution strategy
   * (Each proposition applies to a different domain)
   * 
   * @param antinomy The antinomy to resolve
   * @returns Resolution using domain distinction
   */
  private applyDomainDistinctionStrategy(antinomy: Antinomy): AntinomyResolution {
    // Determine different domains for thesis and antithesis
    const domains = this.identifyDistinctDomains(antinomy);
    
    // Generate resolution text
    const resolution = `Both propositions can be true when properly understood: 
    "${antinomy.thesis.statement}" applies to ${domains.thesis}, while 
    "${antinomy.antithesis.statement}" applies to ${domains.antithesis}.`;
    
    // Generate explanation
    const explanation = `This apparent contradiction arises from conflating different domains. 
    When we recognize that the thesis applies to ${domains.thesis} and the antithesis to ${domains.antithesis}, 
    the contradiction dissolves. This is similar to Kant's resolution of the first antinomy, 
    where both finite and infinite views can be accommodated by distinguishing between the 
    phenomenal and noumenal realms.`;
    
    // Determine confidence based on domain clarity
    const confidence = 0.8;
    
    return {
      antinomy,
      strategy: ResolutionStrategy.DOMAIN_DISTINCTION,
      explanation,
      resolution,
      confidence,
      domainMapping: domains,
      actionGuidance: `Consider the domain context when applying these principles. Use the thesis for ${domains.thesis} contexts and the antithesis for ${domains.antithesis} contexts.`
    };
  }
  
  /**
   * Apply the perspective shift resolution strategy
   * (Each proposition is true from a different perspective)
   * 
   * @param antinomy The antinomy to resolve
   * @returns Resolution using perspective shift
   */
  private applyPerspectiveShiftStrategy(antinomy: Antinomy): AntinomyResolution {
    // Identify different perspectives
    const perspectives = this.identifyPerspectives(antinomy);
    
    // Generate resolution text
    const resolution = `Both propositions can be accepted when viewed from different perspectives: 
    "${antinomy.thesis.statement}" appears true from the perspective of ${perspectives.thesis}, while 
    "${antinomy.antithesis.statement}" appears true from the perspective of ${perspectives.antithesis}.`;
    
    // Generate explanation
    const explanation = `This apparent contradiction stems from different frames of reference. 
    When viewed from ${perspectives.thesis}, the thesis appears correct. When viewed from ${perspectives.antithesis}, 
    the antithesis appears correct. Neither perspective is absolutely privileged, and both provide valuable insights.`;
    
    // Determine confidence
    const confidence = 0.75;
    
    return {
      antinomy,
      strategy: ResolutionStrategy.PERSPECTIVE_SHIFT,
      explanation,
      resolution,
      confidence,
      conditionalApplicability: {
        thesis: `When adopting the perspective of ${perspectives.thesis}`,
        antithesis: `When adopting the perspective of ${perspectives.antithesis}`
      },
      actionGuidance: `Be explicit about which perspective you're adopting when making claims in this area. Recognize the value of multiple perspectives for a complete understanding.`
    };
  }
  
  /**
   * Apply the contextual prioritization resolution strategy
   * (Each proposition takes priority in different contexts)
   * 
   * @param antinomy The antinomy to resolve
   * @returns Resolution using contextual prioritization
   */
  private applyContextualPrioritizationStrategy(antinomy: Antinomy): AntinomyResolution {
    // Identify contexts where each proposition takes priority
    const contexts = this.identifyContexts(antinomy);
    
    // Generate resolution text
    const resolution = `Both propositions are valid principles, but their priority depends on context: 
    "${antinomy.thesis.statement}" should take precedence in ${contexts.thesis}, while 
    "${antinomy.antithesis.statement}" should take precedence in ${contexts.antithesis}.`;
    
    // Generate explanation
    const explanation = `This antinomy reflects a genuine tension between competing values or principles. 
    Neither principle can be abandoned entirely, but their priority can be determined based on context. 
    In ${contexts.thesis}, the thesis should guide action, while in ${contexts.antithesis}, 
    the antithesis should be prioritized.`;
    
    // Determine confidence
    const confidence = 0.7;
    
    return {
      antinomy,
      strategy: ResolutionStrategy.CONTEXTUAL_PRIORITIZATION,
      explanation,
      resolution,
      confidence,
      conditionalApplicability: {
        thesis: `Prioritize in ${contexts.thesis}`,
        antithesis: `Prioritize in ${contexts.antithesis}`
      },
      actionGuidance: `Carefully evaluate the context before deciding which principle to prioritize. Consider factors like ${this.getContextualFactors(antinomy)}.`
    };
  }
  
  /**
   * Apply the synthesis resolution strategy
   * (Combine elements of both propositions into a higher truth)
   * 
   * @param antinomy The antinomy to resolve
   * @returns Resolution using synthesis
   */
  private applySynthesisStrategy(antinomy: Antinomy): AntinomyResolution {
    // Generate a synthetic proposition
    const synthesis = this.generateSynthesis(antinomy);
    
    // Generate resolution text
    const resolution = `A synthesis of both positions reveals a deeper truth: ${synthesis}`;
    
    // Generate explanation
    const explanation = `This antinomy can be resolved through synthesis. The thesis "${antinomy.thesis.statement}" 
    captures an important aspect of the truth, as does the antithesis "${antinomy.antithesis.statement}". 
    However, each is partial on its own. By synthesizing them, we arrive at a more comprehensive understanding 
    that preserves the insights of both while transcending their limitations.`;
    
    // Determine confidence
    const confidence = 0.65;
    
    return {
      antinomy,
      strategy: ResolutionStrategy.SYNTHESIS,
      explanation,
      resolution,
      confidence,
      actionGuidance: `Apply the synthetic principle: ${synthesis}`
    };
  }
  
  /**
   * Apply the dialectical progression resolution strategy
   * (Historical or logical development from thesis to antithesis to synthesis)
   * 
   * @param antinomy The antinomy to resolve
   * @returns Resolution using dialectical progression
   */
  private applyDialecticalProgressionStrategy(antinomy: Antinomy): AntinomyResolution {
    // Generate a dialectical narrative
    const dialectic = this.generateDialecticalNarrative(antinomy);
    
    // Generate resolution text
    const resolution = `The contradiction can be understood as part of a dialectical progression: 
    ${dialectic.thesis} → ${dialectic.antithesis} → ${dialectic.synthesis}`;
    
    // Generate explanation
    const explanation = `This antinomy reflects a dialectical tension that drives intellectual progress. 
    The thesis represents a starting position, which generates its own contradiction in the antithesis. 
    This tension can be resolved in a synthesis that preserves and transforms elements of both. 
    This dialectical understanding shows how apparent contradictions can be productive forces 
    in the development of knowledge or systems.`;
    
    // Determine confidence
    const confidence = 0.6;
    
    return {
      antinomy,
      strategy: ResolutionStrategy.DIALECTICAL_PROGRESSION,
      explanation,
      resolution,
      confidence,
      actionGuidance: `Recognize this as a developmental process. The synthesis suggests a path forward: ${dialectic.synthesis}`
    };
  }
  
  /**
   * Apply the regulative principle resolution strategy
   * (Treat propositions as guiding principles rather than constitutive truths)
   * 
   * @param antinomy The antinomy to resolve
   * @returns Resolution using regulative principle
   */
  private applyRegulativePrincipleStrategy(antinomy: Antinomy): AntinomyResolution {
    // Generate regulative principles
    const principles = this.generateRegulativePrinciples(antinomy);
    
    // Generate resolution text
    const resolution = `Rather than treating these propositions as absolute truths, 
    we can view them as regulative principles that guide inquiry or action: 
    "${principles.thesis}" and "${principles.antithesis}"`;
    
    // Generate explanation
    const explanation = `Following Kant's notion of regulative ideas, this antinomy can be resolved 
    by treating both propositions not as constitutive claims about reality, but as regulative principles 
    that guide our thinking or action. We need not claim that either is absolutely true, but rather 
    that thinking as if they were true serves valuable purposes in different contexts.`;
    
    // Determine confidence
    const confidence = 0.7;
    
    return {
      antinomy,
      strategy: ResolutionStrategy.REGULATIVE_PRINCIPLE,
      explanation,
      resolution,
      confidence,
      actionGuidance: `Use these principles as guides rather than absolute truths. ${principles.guidance}`
    };
  }
  
  /**
   * Apply the practical resolution strategy
   * (Focus on practical solutions rather than theoretical resolution)
   * 
   * @param antinomy The antinomy to resolve
   * @returns Resolution using practical approach
   */
  private applyPracticalResolutionStrategy(antinomy: Antinomy): AntinomyResolution {
    // Generate practical solution
    const practicalSolution = this.generatePracticalSolution(antinomy);
    
    // Generate resolution text
    const resolution = `While the theoretical tension may remain unresolved, 
    in practice we can adopt this approach: ${practicalSolution.solution}`;
    
    // Generate explanation
    const explanation = `Some antinomies may resist complete theoretical resolution, 
    but practical solutions are still possible. In this case, although the tension between 
    "${antinomy.thesis.statement}" and "${antinomy.antithesis.statement}" persists at a theoretical level, 
    we can achieve workable solutions by ${practicalSolution.approach}.`;
    
    // Determine confidence
    const confidence = 0.75;
    
    return {
      antinomy,
      strategy: ResolutionStrategy.PRACTICAL_RESOLUTION,
      explanation,
      resolution,
      confidence,
      actionGuidance: practicalSolution.guidance
    };
  }
  
  /**
   * Apply the multi-level analysis resolution strategy
   * (Different propositions apply at different levels of analysis)
   * 
   * @param antinomy The antinomy to resolve
   * @returns Resolution using multi-level analysis
   */
  private applyMultiLevelAnalysisStrategy(antinomy: Antinomy): AntinomyResolution {
    // Identify relevant levels of analysis
    const levels = this.identifyLevelsOfAnalysis(antinomy);
    
    // Generate resolution text
    const resolution = `The propositions apply at different levels of analysis: 
    "${antinomy.thesis.statement}" holds at the level of ${levels.thesis}, while 
    "${antinomy.antithesis.statement}" holds at the level of ${levels.antithesis}.`;
    
    // Generate explanation
    const explanation = `This antinomy arises from confusing different levels of analysis. 
    At the level of ${levels.thesis}, the thesis accurately describes the phenomena. 
    At the level of ${levels.antithesis}, the antithesis is more appropriate. 
    Recognizing these different levels dissolves the apparent contradiction.`;
    
    // Determine confidence
    const confidence = 0.8;
    
    return {
      antinomy,
      strategy: ResolutionStrategy.MULTI_LEVEL_ANALYSIS,
      explanation,
      resolution,
      confidence,
      domainMapping: {
        thesis: levels.thesis,
        antithesis: levels.antithesis
      },
      actionGuidance: `Be explicit about the level of analysis you're operating at. Switch between levels as appropriate for different purposes.`
    };
  }
  
  /**
   * Acknowledge an unresolvable antinomy
   * 
   * @param antinomy The unresolvable antinomy
   * @returns Limited "resolution" acknowledging the limitation
   */
  private acknowledgeUnresolvableAntinomy(antinomy: Antinomy): AntinomyResolution {
    // Generate resolution text acknowledging limitation
    const resolution = `This antinomy may represent a genuine limitation of our understanding. 
    Both "${antinomy.thesis.statement}" and "${antinomy.antithesis.statement}" have compelling arguments, 
    yet they appear irreconcilable.`;
    
    // Generate explanation
    const explanation = `Some contradictions may reflect fundamental limits to our knowledge or conceptual frameworks. 
    In this case, the tension between the thesis and antithesis appears unresolvable within our current understanding. 
    Following Kant's insight that reason has inherent limits, we can acknowledge this antinomy as marking a boundary 
    of our conceptual framework rather than attempting to force a resolution.`;
    
    // Determine confidence
    const confidence = 0.5;
    
    return {
      antinomy,
      strategy: ResolutionStrategy.UNRESOLVABLE,
      explanation,
      resolution,
      confidence,
      actionGuidance: `Acknowledge the limitations of our understanding in this area. Remain open to new conceptual frameworks that might eventually resolve the tension.`
    };
  }
  
  /**
   * Identify distinct domains for thesis and antithesis
   * 
   * @param antinomy The antinomy to analyze
   * @returns Distinct domains for thesis and antithesis
   */
  private identifyDistinctDomains(antinomy: Antinomy): { thesis: string; antithesis: string } {
    // Default domain distinction based on antinomy type
    const defaultDomains: Record<AntinomyType, { thesis: string; antithesis: string }> = {
      [AntinomyType.FINITE_VS_INFINITE]: {
        thesis: "the noumenal realm (things-in-themselves)",
        antithesis: "the phenomenal realm (appearances)"
      },
      [AntinomyType.ATOMIC_VS_CONTINUOUS]: {
        thesis: "the macro level",
        antithesis: "the micro level"
      },
      [AntinomyType.DETERMINISTIC_VS_RANDOM]: {
        thesis: "deterministic processes",
        antithesis: "probabilistic phenomena"
      },
      [AntinomyType.FREEDOM_VS_CAUSALITY]: {
        thesis: "rational agency",
        antithesis: "natural causality"
      },
      [AntinomyType.NECESSITY_VS_CONTINGENCY]: {
        thesis: "logical necessity",
        antithesis: "empirical contingency"
      },
      [AntinomyType.TELEOLOGY_VS_MECHANISM]: {
        thesis: "purposive explanation",
        antithesis: "mechanistic explanation"
      },
      [AntinomyType.UTILITY_VS_RIGHTS]: {
        thesis: "consequentialist ethics",
        antithesis: "deontological ethics"
      },
      [AntinomyType.INDIVIDUAL_VS_COLLECTIVE]: {
        thesis: "individual rights",
        antithesis: "collective welfare"
      },
      [AntinomyType.AUTONOMY_VS_WELFARE]: {
        thesis: "personal freedom",
        antithesis: "social protection"
      },
      [AntinomyType.TRANSPARENCY_VS_PERFORMANCE]: {
        thesis: "explainable systems",
        antithesis: "high-performance systems"
      },
      [AntinomyType.GENERALITY_VS_SPECIALIZATION]: {
        thesis: "general capabilities",
        antithesis: "specialized functions"
      },
      [AntinomyType.ROBUSTNESS_VS_ADAPTABILITY]: {
        thesis: "stable systems",
        antithesis: "learning systems"
      },
      [AntinomyType.UNCLASSIFIED]: {
        thesis: "one domain",
        antithesis: "another domain"
      }
    };
    
    // Use default domains for this antinomy type
    const domains = defaultDomains[antinomy.type];
    
    // Refine based on antinomy content
    // (In a full implementation, this would be more sophisticated)
    
    return domains;
  }
  
  /**
   * Identify different perspectives for thesis and antithesis
   * 
   * @param antinomy The antinomy to analyze
   * @returns Different perspectives for thesis and antithesis
   */
  private identifyPerspectives(antinomy: Antinomy): { thesis: string; antithesis: string } {
    // Default perspectives based on antinomy type
    const defaultPerspectives: Record<AntinomyType, { thesis: string; antithesis: string }> = {
      [AntinomyType.FINITE_VS_INFINITE]: {
        thesis: "a bounded understanding",
        antithesis: "an unbounded imagination"
      },
      [AntinomyType.ATOMIC_VS_CONTINUOUS]: {
        thesis: "discrete analysis",
        antithesis: "continuous analysis"
      },
      [AntinomyType.DETERMINISTIC_VS_RANDOM]: {
        thesis: "causal perspective",
        antithesis: "statistical perspective"
      },
      [AntinomyType.FREEDOM_VS_CAUSALITY]: {
        thesis: "first-person agency",
        antithesis: "third-person observation"
      },
      [AntinomyType.NECESSITY_VS_CONTINGENCY]: {
        thesis: "logical perspective",
        antithesis: "empirical perspective"
      },
      [AntinomyType.TELEOLOGY_VS_MECHANISM]: {
        thesis: "functional perspective",
        antithesis: "mechanical perspective"
      },
      [AntinomyType.UTILITY_VS_RIGHTS]: {
        thesis: "outcome-focused perspective",
        antithesis: "principle-focused perspective"
      },
      [AntinomyType.INDIVIDUAL_VS_COLLECTIVE]: {
        thesis: "individual perspective",
        antithesis: "collective perspective"
      },
      [AntinomyType.AUTONOMY_VS_WELFARE]: {
        thesis: "liberty-focused perspective",
        antithesis: "care-focused perspective"
      },
      [AntinomyType.TRANSPARENCY_VS_PERFORMANCE]: {
        thesis: "user-centered perspective",
        antithesis: "engineering perspective"
      },
      [AntinomyType.GENERALITY_VS_SPECIALIZATION]: {
        thesis: "broad applicability perspective",
        antithesis: "domain-specific perspective"
      },
      [AntinomyType.ROBUSTNESS_VS_ADAPTABILITY]: {
        thesis: "stability-focused perspective",
        antithesis: "adaptability-focused perspective"
      },
      [AntinomyType.UNCLASSIFIED]: {
        thesis: "one perspective",
        antithesis: "another perspective"// src/core/antinomy-resolution.ts

/**
 * Antinomy Resolution Module for the Critique of Artificial Reason (CAR)
 * 
 * In Kant's philosophy, antinomies are pairs of contradictory statements that both appear
 * to be proven true by reason. Kant identified four main antinomies in the "Critique of
 * Pure Reason" regarding cosmological questions that arise when reason attempts to grasp
 * the unconditioned totality of conditions.
 * 
 * Kant resolved these antinomies by showing they arise from misapplying concepts beyond
 * their proper domain (the phenomenal world) to what lies beyond experience (the noumenal).
 * He recognized both theses and antitheses contain truths when properly understood:
 * the thesis applies to the noumenal realm and the antithesis to the phenomenal.
 * 
 * In the CAR framework, the Antinomy Resolution Module manages contradictions that arise
 * in AI systems, particularly when different reasoning modules or value frameworks yield
 * conflicting conclusions. It classifies antinomies, diagnoses their sources, and provides
 * resolution strategies based on Kant's insights.
 */

import { Action } from './categorical-imperative';

/**
 * Types of antinomies that can arise in AI systems
 */
export enum AntinomyType {
  // Mathematical antinomies (quantitative)
  FINITE_VS_INFINITE = 'finite_vs_infinite',           // Bounded vs unbounded
  ATOMIC_VS_CONTINUOUS = 'atomic_vs_continuous',       // Discrete vs continuous
  DETERMINISTIC_VS_RANDOM = 'deterministic_vs_random', // Determined vs probabilistic
  
  // Dynamical antinomies (qualitative)
  FREEDOM_VS_CAUSALITY = 'freedom_vs_causality',       // Autonomy vs determinism
  NECESSITY_VS_CONTINGENCY = 'necessity_vs_contingency', // Required vs optional
  TELEOLOGY_VS_MECHANISM = 'teleology_vs_mechanism',   // Purpose vs process
  
  // Practical antinomies (ethical)
  UTILITY_VS_RIGHTS = 'utility_vs_rights',             // Consequentialism vs deontology
  INDIVIDUAL_VS_COLLECTIVE = 'individual_vs_collective', // Personal vs communal
  AUTONOMY_VS_WELFARE = 'autonomy_vs_welfare',         // Freedom vs paternalism
  
  // Architectural antinomies (system design)
  TRANSPARENCY_VS_PERFORMANCE = 'transparency_vs_performance', // Explainability vs efficiency
  GENERALITY_VS_SPECIALIZATION = 'generality_vs_specialization', // Broad vs narrow
  ROBUSTNESS_VS_ADAPTABILITY = 'robustness_vs_adaptability', // Stability vs flexibility
  
  // Other
  UNCLASSIFIED = 'unclassified'
}

/**
 * Domains where antinomies can occur
 */
export enum AntinomyDomain {
  EPISTEMOLOGY = 'epistemology', // Knowledge and belief
  ETHICS = 'ethics',             // Moral reasoning
  METAPHYSICS = 'metaphysics',   // Nature of reality
  AESTHETICS = 'aesthetics',     // Beauty and art
  SYSTEM = 'system'              // AI architecture
}

/**
 * Resolution strategies for antinomies
 */
export enum ResolutionStrategy {
  DOMAIN_DISTINCTION = 'domain_distinction',     // Different domains of applicability
  PERSPECTIVE_SHIFT = 'perspective_shift',       // Different viewpoints or frames
  CONTEXTUAL_PRIORITIZATION = 'contextual_prioritization', // Context-dependent priority
  SYNTHESIS = 'synthesis',                       // Combining aspects of both positions
  DIALECTICAL_PROGRESSION = 'dialectical_progression', // Thesis-antithesis-synthesis
  REGULATIVE_PRINCIPLE = 'regulative_principle', // Guiding principle without final resolution
  PRACTICAL_RESOLUTION = 'practical_resolution', // Solution for practical purposes
  MULTI_LEVEL_ANALYSIS = 'multi_level_analysis', // Different levels of description
  
  // For cases that cannot be resolved
  UNRESOLVABLE = 'unresolvable'                  // Acknowledge the limitation
}

/**
 * A proposition or statement that can participate in an antinomy
 */
export interface Proposition {
  /** Content of the proposition */
  statement: string;
  
  /** Strength or confidence in the proposition (0-1) */
  confidence: number;
  
  /** Source of the proposition */
  source: string;
  
  /** Domain of the proposition */
  domain?: AntinomyDomain;
  
  /** Metadata about the proposition */
  metadata?: Record<string, any>;
}

/**
 * An antinomy consisting of thesis and antithesis
 */
export interface Antinomy {
  /** Type of the antinomy */
  type: AntinomyType;
  
  /** The thesis (first conflicting proposition) */
  thesis: Proposition;
  
  /** The antithesis (second conflicting proposition) */
  antithesis: Proposition;
  
  /** Domain of the antinomy */
  domain: AntinomyDomain;
  
  /** Description of the contradiction */
  contradiction: string;
  
  /** Strength of the contradiction (0-1) */
  strength: number;
  
  /** Context in which the antinomy arose */
  context?: Record<string, any>;
}

/**
 * Resolution of an antinomy
 */
export interface AntinomyResolution {
  /** The original antinomy */
  antinomy: Antinomy;
  
  /** Strategy used for resolution */
  strategy: ResolutionStrategy;
  
  /** Explanation of the resolution */
  explanation: string;
  
  /** Resolved proposition or principle */
  resolution: string;
  
  /** Confidence in the resolution (0-1) */
  confidence: number;
  
  /** Domains of applicability for thesis and antithesis */
  domainMapping?: {
    thesis: string;
    antithesis: string;
  };
  
  /** Conditions under which each proposition applies */
  conditionalApplicability?: {
    thesis: string;
    antithesis: string;
  };
  
  /** Practical guidance for action */
  actionGuidance?: string;
}

/**
 * Configuration options for the Antinomy Resolution Module
 */
export interface AntinomyResolutionOptions {
  /** Default strategy if no specific strategy is chosen */
  defaultStrategy?: ResolutionStrategy;
  
  /** Whether to attempt automatic resolution */
  autoResolve?: boolean;
  
  /** Threshold for classifying conflicts as antinomies (0-1) */
  antinomyThreshold?: number;
  
  /** Domain-specific resolution preferences */
  domainPreferences?: Record<AntinomyDomain, ResolutionStrategy>;
  
  /** Prioritize thesis or antithesis in certain contexts */
  contextualPriorities?: Record<string, 'thesis' | 'antithesis'>;
  
  /** Interpretation mode for propositions */
  interpretationMode?: 'strict' | 'moderate' | 'charitable';
}

/**
 * The Antinomy Resolution Module for resolving contradictions
 */
export class AntinomyResolution {
  private options: AntinomyResolutionOptions;
  private resolutionPatterns: Map<AntinomyType, ResolutionStrategy>;
  private domainPatterns: Map<AntinomyDomain, AntinomyType[]>;
  
  /**
   * Initialize the Antinomy Resolution Module
   */
  constructor(options?: AntinomyResolutionOptions) {
    this.options = {
      defaultStrategy: options?.defaultStrategy ?? ResolutionStrategy.DOMAIN_DISTINCTION,
      autoResolve: options?.autoResolve ?? true,
      antinomyThreshold: options?.antinomyThreshold ?? 0.7,
      domainPreferences: options?.domainPreferences ?? {},
      contextualPriorities: options?.contextualPriorities ?? {},
      interpretationMode: options?.interpretationMode ?? 'moderate'
    };
    
    // Initialize resolution patterns
    this.resolutionPatterns = this.initializeResolutionPatterns();
    
    // Initialize domain patterns
    this.domainPatterns = this.initializeDomainPatterns();
  }
  
  /**
   * Detect antinomies between conflicting propositions
   * 
   * @param propositions Array of propositions to check for antinomies
   * @returns Detected antinomies
   */
  public detectAntinomies(propositions: Proposition[]): Antinomy[] {
    const antinomies: Antinomy[] = [];
    
    // Check each pair of propositions for contradictions
    for (let i = 0; i < propositions.length; i++) {
      for (let j = i + 1; j < propositions.length; j++) {
        const propositionA = propositions[i];
        const propositionB = propositions[j];
        
        // Check if these propositions contradict each other
        const contradiction = this.checkContradiction(propositionA, propositionB);
        
        if (contradiction.isContradiction && 
            contradiction.strength >= (this.options.antinomyThreshold || 0.7)) {
          // Create an antinomy
          const antinomy: Antinomy = {
            type: contradiction.type || AntinomyType.UNCLASSIFIED,
            thesis: propositionA,
            antithesis: propositionB,
            domain: this.determineDomain(propositionA, propositionB),
            contradiction: contradiction.description,
            strength: contradiction.strength
          };
          
          antinomies.push(antinomy);
        }
      }
    }
    
    return antinomies;
  }
  
  /**
   * Resolve an antinomy
   * 
   * @param antinomy The antinomy to resolve
   * @param preferredStrategy Optional preferred resolution strategy
   * @returns Resolution of the antinomy
   */
  public resolveAntinomy(
    antinomy: Antinomy,
    preferredStrategy?: ResolutionStrategy
  ): AntinomyResolution {
    // Determine the best resolution strategy
    const strategy = preferredStrategy || 
                   this.options.domainPreferences?.[antinomy.domain] ||
                   this.resolutionPatterns.get(antinomy.type) ||
                   this.options.defaultStrategy ||
                   ResolutionStrategy.DOMAIN_DISTINCTION;
    
    // Apply the selected strategy
    const resolution = this.applyResolutionStrategy(antinomy, strategy);
    
    return resolution;
  }
  
  /**
   * Resolve multiple antinomies
   * 
   * @param antinomies Array of antinomies to resolve
   * @returns Resolutions for each antinomy
   */
  public resolveAntinomies(antinomies: Antinomy[]): AntinomyResolution[] {
    return antinomies.map(antinomy => this.resolveAntinomy(antinomy));
  }
  
  /**
   * Resolve contradictions in an AI system's reasoning
   * 
   * @param propositions Array of propositions from different reasoning modules
   * @returns Resolved propositions and explanations
   */
  public resolveContradictions(propositions: Proposition[]): {
    resolvedPropositions: Proposition[];
    resolutions: AntinomyResolution[];
    explanation: string;
  } {
    // Detect antinomies among the propositions
    const antinomies = this.detectAntinomies(propositions);
    
    if (antinomies.length === 0) {
      // No contradictions to resolve
      return {
        resolvedPropositions: propositions,
        resolutions: [],
        explanation: "No contradictions detected among the propositions."
      };
    }
    
    // Resolve each antinomy
    const resolutions = this.resolveAntinomies(antinomies);
    
    // Create modified propositions based on resolutions
    const resolvedPropositions = this.createResolvedPropositions(propositions, resolutions);
    
    // Generate overall explanation
    const explanation = this.generateContradictionResolutionExplanation(antinomies, resolutions);
    
    return {
      resolvedPropositions,
      resolutions,
      explanation
    };
  }
  
  /**
   * Manage architectural antinomies in AI system design
   * 
   * @param designGoals Design goals that may conflict
   * @returns Balanced design principles
   */
  public manageArchitecturalAntinomies(
    designGoals: Record<string, number>
  ): {
    balancedPrinciples: Record<string, number>;
    tradeoffs: string[];
  } {
    // Extract design goals as propositions
    const propositions: Proposition[] = Object.entries(designGoals).map(
      ([goal, priority]) => ({
        statement: `Maximize ${goal}`,
        confidence: priority,
        source: 'design_goals'
      })
    );
    
    // Detect and resolve antinomies
    const antinomies = this.detectAntinomies(propositions);
    const resolutions = this.resolveAntinomies(antinomies);
    
    // Create balanced design principles
    const balancedPrinciples: Record<string, number> = { ...designGoals };
    const tradeoffs: string[] = [];
    
    resolutions.forEach(resolution => {
      // Extract goal names from thesis and antithesis
      const thesisGoal = resolution.antinomy.thesis.statement.replace('Maximize ', '');
      const antithesisGoal = resolution.antinomy.antithesis.statement.replace('Maximize ', '');
      
      // Adjust priorities based on resolution
      const adjustedPriorities = this.calculateBalancedPriorities(
        thesisGoal,
        antithesisGoal,
        designGoals[thesisGoal],
        designGoals[antithesisGoal],
        resolution.strategy
      );
      
      balancedPrinciples[thesisGoal] = adjustedPriorities.thesis;
      balancedPrinciples[antithesisGoal] = adjustedPriorities.antithesis;
      
      // Record the tradeoff
      tradeoffs.push(resolution.explanation);
    });
    
    return {
      balancedPrinciples,
      tradeoffs
    };
  }
  
  /**
   * Evaluate action against potential antinomies
   * 
   * @param action Action to evaluate
   * @param valueSystems Different value systems to consider
   * @returns Analysis of the action regarding antinomies
   */
  public evaluateActionAntinomies(
    action: Action,
    valueSystems: Record<string, (action: Action) => Proposition>
  ): {
    antinomies: Antinomy[];
    resolutions: AntinomyResolution[];
    recommendation: string;
    confidence: number;
  } {
    // Generate propositions about the action from different value systems
    const propositions: Proposition[] = Object.entries(valueSystems).map(
      ([system, evaluator]) => {
        const proposition = evaluator(action);
        proposition.source = system;
        return proposition;
      }
    );
    
    // Detect antinomies
    const antinomies = this.detectAntinomies(propositions);
    
    // If no antinomies, the action is unproblematic
    if (antinomies.length === 0) {
      return {
        antinomies: [],
        resolutions: [],
        recommendation: "The action is consistent across value systems.",
        confidence: 1.0
      };
    }
    
    // Resolve antinomies
    const resolutions = this.resolveAntinomies(antinomies);
    
    // Generate recommendation based on resolutions
    const recommendation = this.generateActionRecommendation(action, resolutions);
    
    // Calculate confidence based on resolution quality
    const confidence = resolutions.reduce((sum, res) => sum + res.confidence, 0) / resolutions.length;
    
    return {
      antinomies,
      resolutions,
      recommendation,
      confidence
    };
  }
  
  /**
   * Initialize common resolution patterns for different antinomy types
   */
  private initializeResolutionPatterns(): Map<AntinomyType, ResolutionStrategy> {
    const patterns = new Map<AntinomyType, ResolutionStrategy>();
    
    // Mathematical antinomies
    patterns.set(AntinomyType.FINITE_VS_INFINITE, ResolutionStrategy.DOMAIN_DISTINCTION);
    patterns.set(AntinomyType.ATOMIC_VS_CONTINUOUS, ResolutionStrategy.MULTI_LEVEL_ANALYSIS);
    patterns.set(AntinomyType.DETERMINISTIC_VS_RANDOM, ResolutionStrategy.DOMAIN_DISTINCTION);
    
    // Dynamical antinomies
    patterns.set(AntinomyType.FREEDOM_VS_CAUSALITY, ResolutionStrategy.DOMAIN_DISTINCTION);
    patterns.set(AntinomyType.NECESSITY_VS_CONTINGENCY, ResolutionStrategy.PERSPECTIVE_SHIFT);
    patterns.set(AntinomyType.TELEOLOGY_VS_MECHANISM, ResolutionStrategy.MULTI_LEVEL_ANALYSIS);
    
    // Practical antinomies
    patterns.set(AntinomyType.UTILITY_VS_RIGHTS, ResolutionStrategy.CONTEXTUAL_PRIORITIZATION);
    patterns.set(AntinomyType.INDIVIDUAL_VS_COLLECTIVE, ResolutionStrategy.SYNTHESIS);
    patterns.set(AntinomyType.AUTONOMY_VS_WELFARE, ResolutionStrategy.CONTEXTUAL_PRIORITIZATION);
    
    // Architectural antinomies
    patterns.set(AntinomyType.TRANSPARENCY_VS_PERFORMANCE, ResolutionStrategy.PRACTICAL_RESOLUTION);
    patterns.set(AntinomyType.GENERALITY_VS_SPECIALIZATION, ResolutionStrategy.CONTEXTUAL_PRIORITIZATION);
    patterns.set(AntinomyType.ROBUSTNESS_VS_ADAPTABILITY, ResolutionStrategy.SYNTHESIS);
    
    return patterns;
  }
  
  /**
   * Initialize patterns of antinomy types common to each domain
   */
  private initializeDomainPatterns(): Map<AntinomyDomain, AntinomyType[]> {
    const patterns = new Map<AntinomyDomain, AntinomyType[]>();
    
    patterns.set(AntinomyDomain.EPISTEMOLOGY, [
      AntinomyType.FINITE_VS_INFINITE,
      AntinomyType.DETERMINISTIC_VS_RANDOM,
      AntinomyType.ATOMIC_VS_CONTINUOUS
    ]);
    
    patterns.set(AntinomyDomain.ETHICS, [
      AntinomyType.UTILITY_VS_RIGHTS,
      AntinomyType.INDIVIDUAL_VS_COLLECTIVE,
      AntinomyType.AUTONOMY_VS_WELFARE,
      AntinomyType.FREEDOM_VS_CAUSALITY
    ]);
    
    patterns.set(AntinomyDomain.METAPHYSICS, [
      AntinomyType.FREEDOM_VS_CAUSALITY,
      AntinomyType.NECESSITY_VS_CONTINGENCY,
      AntinomyType.TELEOLOGY_VS_MECHANISM,
      AntinomyType.FINITE_VS_INFINITE
    ]);
    
    patterns.set(AntinomyDomain.AESTHETICS, [
      AntinomyType.INDIVIDUAL_VS_COLLECTIVE,
      AntinomyType.NECESSITY_VS_CONTINGENCY,
      AntinomyType.TELEOLOGY_VS_MECHANISM
    ]);
    
    patterns.set(AntinomyDomain.SYSTEM, [
      AntinomyType.TRANSPARENCY_VS_PERFORMANCE,
      AntinomyType.GENERALITY_VS_SPECIALIZATION,
      AntinomyType.ROBUSTNESS_VS_ADAPTABILITY
    ]);
    
    return patterns;
  }
  
  /**
   * Check if two propositions contradict each other
   * 
   * @param propositionA First proposition
   * @param propositionB Second proposition
   * @returns Whether the propositions contradict and details
   */
  private checkContradiction(
    propositionA: Proposition,
    propositionB: Proposition
  ): {
    isContradiction: boolean;
    strength: number;
    description: string;
    type?: AntinomyType;
  } {
    // Calculate contradiction strength based on linguistic analysis
    const contradictionDetails = this.analyzeLinguisticContradiction(
      propositionA.statement,
      propositionB.statement
    );
    
    // If the propositions don't contradict linguistically, check for value conflicts
    if (!contradictionDetails.isContradiction) {
      const valueContradiction = this.analyzeValueContradiction(propositionA, propositionB);
      if (valueContradiction.isContradiction) {
        return valueContradiction;
      }
    }
    
    // Return the linguistic contradiction details
    return contradictionDetails;
  }
  
  /**
   * Analyze linguistic contradiction between two statements
   * 
   * @param statementA First statement
   * @param statementB Second statement
   * @returns Whether the statements contradict and details
   */
  private analyzeLinguisticContradiction(
    statementA: string,
    statementB: string
  ): {
    isContradiction: boolean;
    strength: number;
    description: string;
    type?: AntinomyType;
  } {
    // Normalize statements for comparison
    const normalizedA = this.normalizeStatement(statementA);
    const normalizedB = this.normalizeStatement(statementB);
    
    // Check for direct negation
    if (normalizedB === this.negateStatement(normalizedA)) {
      return {
        isContradiction: true,
        strength: 1.0,
        description: `Direct contradiction: "${statementA}" vs "${statementB}"`,
        type: this.identifyAntinomyType(statementA, statementB)
      };
    }
    
    // Check for antonyms and opposing concepts
    const antonymPatterns = this.getAntonymPatterns();
    
    for (const [pattern1, pattern2] of antonymPatterns) {
      if ((normalizedA.includes(pattern1) && normalizedB.includes(pattern2)) ||
          (normalizedA.includes(pattern2) && normalizedB.includes(pattern1))) {
        return {
          isContradiction: true,
          strength: 0.85,
          description: `Opposing concepts: "${pattern1}" vs "${pattern2}" in statements`,
          type: this.identifyAntinomyType(pattern1, pattern2)
        };
      }
    }
    
    // Check for modal contradictions (necessary vs impossible, etc.)
    const modalContradiction = this.checkModalContradiction(normalizedA, normalizedB);
    if (modalContradiction.isContradiction) {
      return modalContradiction;
    }
    
    // Check for quantifier contradictions (all vs some not, etc.)
    const quantifierContradiction = this.checkQuantifierContradiction(normalizedA, normalizedB);
    if (quantifierContradiction.isContradiction) {
      return quantifierContradiction;
    }
    
    // No contradiction found
    return {
      isContradiction: false,
      strength: 0,
      description: "No linguistic contradiction detected",
      type: undefined
    };
  }
  
  /**
   * Analyze value contradiction between two propositions
   * 
   * @param propositionA First proposition
   * @param propositionB Second proposition
   * @returns Whether the propositions contradict in values and details
   */
  private analyzeValueContradiction(
    propositionA: Proposition,
    propositionB: Proposition
  ): {
    isContradiction: boolean;
    strength: number;
    description: string;
    type?: AntinomyType;
  } {
    // Check if the propositions come from different sources
    if (propositionA.source === propositionB.source) {
      return {
        isContradiction: false,
        strength: 0,
        description: "Same source, unlikely to be a value contradiction",
        type: undefined
      };
    }
    
    // Check for known value system conflicts
    const valueConflicts = [
      // Rights vs Utility value conflict
      {
        pattern1: /(rights|dignity|autonomy|freedom|consent|permission)/i,
        pattern2: /(utility|welfare|happiness|benefit|outcome|consequence|result)/i,
        type: AntinomyType.UTILITY_VS_RIGHTS,
        description: "Conflict between rights-based and utility-based values"
      },
      // Individual vs Collective value conflict
      {
        pattern1: /(individual|personal|private|self-interest|autonomy)/i,
        pattern2: /(collective|community|public|common good|society)/i,
        type: AntinomyType.INDIVIDUAL_VS_COLLECTIVE,
        description: "Conflict between individual and collective values"
      },
      // Freedom vs Protection value conflict
      {
        pattern1: /(freedom|choice|liberty|autonomy|agency)/i,
        pattern2: /(protection|safety|security|welfare|paternalism)/i,
        type: AntinomyType.AUTONOMY_VS_WELFARE,
        description: "Conflict between freedom and protection values"
      }
    ];
    
    for (const conflict of valueConflicts) {
      if ((conflict.pattern1.test(propositionA.statement) && conflict.pattern2.test(propositionB.statement)) ||
          (conflict.pattern1.test(propositionB.statement) && conflict.pattern2.test(propositionA.statement))) {
        return {
          isContradiction: true,
          strength: 0.8,
          description: conflict.description,
          type: conflict.type
        };
      }
    }
    
    // Check for goal-oriented contradictions
    if (/should|must|ought|need|require/i.test(propositionA.statement) && 
        /should|must|ought|need|require/i.test(propositionB.statement)) {
      // Different imperatives might indicate value conflict
      return {
        isContradiction: true,
        strength: 0.7,
        description: "Conflicting imperatives suggest value contradiction",
        type: AntinomyType.UNCLASSIFIED
      };
    }
    
    // No value contradiction found
    return {
      isContradiction: false,
      strength: 0,
      description: "No value contradiction detected",
      type: undefined
    };
  }
  
  /**
   * Check for modal contradictions between statements
   * 
   * @param statementA First statement
   * @param statementB Second statement
   * @returns Whether the statements have modal contradictions and details
   */
  private checkModalContradiction(
    statementA: string,
    statementB: string
  ): {
    isContradiction: boolean;
    strength: number;
    description: string;
    type?: AntinomyType;
  } {
    // Modal patterns to check
    const modalPatterns = [
      // Necessity vs impossibility
      {
        pattern1: /(necessarily|must|always|without exception)/i,
        pattern2: /(impossible|cannot|never|no.*can)/i,
        type: AntinomyType.NECESSITY_VS_CONTINGENCY,
        description: "Contradiction between necessity and impossibility"
      },
      // Possibility vs impossibility
      {
        pattern1: /(possible|can|may|might|could)/i,
        pattern2: /(impossible|cannot|never|no.*can)/i,
        type: AntinomyType.NECESSITY_VS_CONTINGENCY,
        description: "Contradiction between possibility and impossibility"
      },
      // Contingency vs necessity
      {
        pattern1: /(contingently|sometimes|in some cases)/i,
        pattern2: /(necessarily|must|always|without exception)/i,
        type: AntinomyType.NECESSITY_VS_CONTINGENCY,
        description: "Contradiction between contingency and necessity"
      }
    ];
    
    // Extract core proposition from both statements
    const coreA = this.extractCoreProposition(statementA);
    const coreB = this.extractCoreProposition(statementB);
    
    // If the core propositions are the same or similar
    if (this.calculateStringSimilarity(coreA, coreB) > 0.7) {
      // Check for modal contradictions
      for (const pattern of modalPatterns) {
        if ((pattern.pattern1.test(statementA) && pattern.pattern2.test(statementB)) ||
            (pattern.pattern1.test(statementB) && pattern.pattern2.test(statementA))) {
          return {
            isContradiction: true,
            strength: 0.9,
            description: pattern.description,
            type: pattern.type
          };
        }
      }
    }
    
    // No modal contradiction found
    return {
      isContradiction: false,
      strength: 0,
      description: "No modal contradiction detected",
      type: undefined
    };
  }
  
  /**
   * Check for quantifier contradictions between statements
   * 
   * @param statementA First statement
   * @param statementB Second statement
   * @returns Whether the statements have quantifier contradictions and details
   */
  private checkQuantifierContradiction(
    statementA: string,
    statementB: string
  ): {
    isContradiction: boolean;
    strength: number;
    description: string;
    type?: AntinomyType;
  } {
    // Quantifier patterns to check
    const quantifierPatterns = [
      // Universal vs particular negation
      {
        pattern1: /(all|every|any|each)/i,
        pattern2: /(some.*not|not all|not every)/i,
        type: AntinomyType.FINITE_VS_INFINITE,
        description: "Contradiction between universal and particular negation"
      },
      // Universal affirmation vs universal negation
      {
        pattern1: /(all|every).*are/i,
        pattern2: /(no|none).*are/i,
        type: AntinomyType.FINITE_VS_INFINITE,
        description: "Contradiction between universal affirmation and universal negation"
      },
      // Particular affirmation vs universal negation
      {
        pattern1: /(some).*are/i,
        pattern2: /(no|none).*are/i,
        type: AntinomyType.FINITE_VS_INFINITE,
        description: "Contradiction between particular affirmation and universal negation"
      }
    ];
    
    // Extract subject from both statements
    const subjectA = this.extractSubject(statementA);
    const subjectB = this.extractSubject(statementB);
    
    // If the subjects are the same or similar
    if (this.calculateStringSimilarity(subjectA, subjectB)
