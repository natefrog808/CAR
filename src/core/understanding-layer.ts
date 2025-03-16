// src/core/understanding-layer.ts

/**
 * Understanding Layer for the Critique of Artificial Reason (CAR)
 * 
 * This module implements Kant's "Transcendental Analytic" - the theory of understanding
 * and the a priori categories that structure all cognition.
 * 
 * In Kant's philosophy, understanding is our active capacity to apply concepts to intuitions.
 * The categories of understanding are the fundamental concepts that make experience possible
 * by organizing our perceptions into a coherent, unified consciousness.
 * 
 * Kant organized the categories into four groups of three:
 * 1. Quantity: Unity, Plurality, Totality
 * 2. Quality: Reality, Negation, Limitation
 * 3. Relation: Inherence/Subsistence, Causality/Dependence, Community/Reciprocity
 * 4. Modality: Possibility/Impossibility, Existence/Non-existence, Necessity/Contingency
 * 
 * In CAR, the Understanding Layer applies these categories to data processed by the Sensibility
 * Layer, structuring it into conceptual forms that make judgment and reasoning possible.
 */

import {
  ProcessedData,
  CategorizedData,
  UnityAnalysis,
  PluralityAnalysis,
  CausalityAnalysis,
  PossibilityAnalysis,
  NecessityAnalysis
} from './interfaces';

/**
 * Configuration options for the Understanding Layer
 */
export interface UnderstandingLayerOptions {
  /** Categories of Quantity */
  quantity?: {
    /** Enable unity analysis */
    enableUnity?: boolean;
    
    /** Enable plurality analysis */
    enablePlurality?: boolean;
    
    /** Enable totality analysis */
    enableTotality?: boolean;
  };
  
  /** Categories of Quality */
  quality?: {
    /** Enable reality analysis */
    enableReality?: boolean;
    
    /** Enable negation analysis */
    enableNegation?: boolean;
    
    /** Enable limitation analysis */
    enableLimitation?: boolean;
  };
  
  /** Categories of Relation */
  relation?: {
    /** Enable inherence/subsistence analysis (substance) */
    enableSubstance?: boolean;
    
    /** Enable causality/dependence analysis */
    enableCausality?: boolean;
    
    /** Enable community/reciprocity analysis */
    enableCommunity?: boolean;
  };
  
  /** Categories of Modality */
  modality?: {
    /** Enable possibility/impossibility analysis */
    enablePossibility?: boolean;
    
    /** Enable existence/non-existence analysis */
    enableExistence?: boolean;
    
    /** Enable necessity/contingency analysis */
    enableNecessity?: boolean;
  };
  
  /** Thresholds for categorical analysis */
  thresholds?: {
    /** Minimum confidence for causal relationship (0-1) */
    causalConfidence: number;
    
    /** Minimum elements for plurality recognition */
    pluralityMinimum: number;
    
    /** Threshold for necessity determination (0-1) */
    necessityThreshold: number;
  };
}

/**
 * Understanding Layer class - implements Kant's categories of understanding
 */
export class UnderstandingLayer {
  private options: UnderstandingLayerOptions;
  
  /**
   * Initialize the Understanding Layer with optional configuration
   */
  constructor(options?: UnderstandingLayerOptions) {
    this.options = {
      quantity: {
        enableUnity: options?.quantity?.enableUnity ?? true,
        enablePlurality: options?.quantity?.enablePlurality ?? true,
        enableTotality: options?.quantity?.enableTotality ?? true,
      },
      quality: {
        enableReality: options?.quality?.enableReality ?? true,
        enableNegation: options?.quality?.enableNegation ?? true,
        enableLimitation: options?.quality?.enableLimitation ?? true,
      },
      relation: {
        enableSubstance: options?.relation?.enableSubstance ?? true,
        enableCausality: options?.relation?.enableCausality ?? true,
        enableCommunity: options?.relation?.enableCommunity ?? true,
      },
      modality: {
        enablePossibility: options?.modality?.enablePossibility ?? true,
        enableExistence: options?.modality?.enableExistence ?? true,
        enableNecessity: options?.modality?.enableNecessity ?? true,
      },
      thresholds: {
        causalConfidence: options?.thresholds?.causalConfidence ?? 0.7,
        pluralityMinimum: options?.thresholds?.pluralityMinimum ?? 3,
        necessityThreshold: options?.thresholds?.necessityThreshold ?? 0.8,
      }
    };
  }
  
  /**
   * Process data through the Understanding Layer (Kant's categories)
   * 
   * @param data Processed data from the Sensibility Layer
   * @returns Data organized according to the categories of understanding
   */
  public process(data: ProcessedData): ProcessedData {
    // Extract the raw features and patterns from sensibility layer
    const sensibilityData = data.raw;
    
    // Apply the categories of understanding to the sensibility data
    const categories: Partial<CategorizedData> = {};
    
    // Categories of Quantity
    if (this.options.quantity!.enableUnity) {
      categories.unity = this.analyzeUnity(sensibilityData);
    }
    
    if (this.options.quantity!.enablePlurality) {
      categories.plurality = this.analyzePlurality(sensibilityData);
    }
    
    if (this.options.quantity!.enableTotality) {
      categories.totality = this.analyzeTotality(sensibilityData);
    }
    
    // Categories of Quality
    if (this.options.quality!.enableReality) {
      categories.reality = this.analyzeReality(sensibilityData);
    }
    
    if (this.options.quality!.enableNegation) {
      categories.negation = this.analyzeNegation(sensibilityData);
    }
    
    if (this.options.quality!.enableLimitation) {
      categories.limitation = this.analyzeLimitation(sensibilityData);
    }
    
    // Categories of Relation
    if (this.options.relation!.enableSubstance) {
      categories.substance = this.analyzeSubstance(sensibilityData);
    }
    
    if (this.options.relation!.enableCausality) {
      categories.causality = this.analyzeCausality(sensibilityData);
    }
    
    if (this.options.relation!.enableCommunity) {
      categories.community = this.analyzeCommunity(sensibilityData);
    }
    
    // Categories of Modality
    if (this.options.modality!.enablePossibility) {
      categories.possibility = this.analyzePossibility(sensibilityData);
    }
    
    if (this.options.modality!.enableExistence) {
      categories.existence = this.analyzeExistence(sensibilityData);
    }
    
    if (this.options.modality!.enableNecessity) {
      categories.necessity = this.analyzeNecessity(sensibilityData);
    }
    
    // Return the categorized data with updated metadata
    return {
      raw: {
        categorizedData: categories,
        previousData: sensibilityData,
      },
      metadata: {
        ...data.metadata,
        processingHistory: [...data.metadata.processingHistory, 'understandingLayer']
      }
    };
  }
  
  //=============================================================================
  // QUANTITY CATEGORIES
  //=============================================================================
  
  /**
   * Analyze unity in the data
   * Kant's category of Unity: the concept of "one" or wholeness
   */
  private analyzeUnity(sensibilityData: any): UnityAnalysis {
    const unifiedEntities = [];
    let unityAnalysisDescription = "";
    
    // Check for spatial patterns indicating unified structures
    if (sensibilityData.spatialRelations?.patterns) {
      const hierarchyPatterns = sensibilityData.spatialRelations.patterns.filter((p: any) => 
        p.type === 'hierarchy' || p.type === 'cluster'
      );
      
      if (hierarchyPatterns.length > 0) {
        hierarchyPatterns.forEach((pattern: any) => {
          unifiedEntities.push({
            type: 'hierarchy',
            elements: pattern.elements.length,
            confidence: pattern.confidence
          });
        });
        
        unityAnalysisDescription += `Identified ${hierarchyPatterns.length} hierarchical structures. `;
      }
    }
    
    // Check for feature clusters that form unified wholes
    const rawFeatures = sensibilityData.rawFeatures || [];
    const domainFeatures = rawFeatures.filter((f: any) => f.type === 'domain-specific');
    
    if (domainFeatures.length > 0) {
      domainFeatures.forEach((feature: any) => {
        unifiedEntities.push({
          type: 'domain-entity',
          domain: feature.domain,
          entity: feature.entity,
          confidence: 0.9
        });
      });
      
      unityAnalysisDescription += `Recognized ${domainFeatures.length} domain-specific entities. `;
    }
    
    // Check for structural features that indicate unity
    const structuralFeatures = rawFeatures.filter((f: any) => 
      f.type === 'structural' || f.type === 'object-array' || f.type === 'nested-object'
    );
    
    if (structuralFeatures.length > 0) {
      unifiedEntities.push({
        type: 'structural-unity',
        components: structuralFeatures.length,
        confidence: 0.8
      });
      
      unityAnalysisDescription += `Identified structural unity with ${structuralFeatures.length} components. `;
    }
    
    // If no unified entities found, create a default one
    if (unifiedEntities.length === 0) {
      unifiedEntities.push({
        type: 'basic-unity',
        components: 1,
        confidence: 0.6
      });
      
      unityAnalysisDescription = "Basic unity identified in the input data. ";
    }
    
    return {
      unityAnalysis: unityAnalysisDescription,
      unifiedEntities: unifiedEntities.length,
      unifiedProperties: unifiedEntities
    };
  }
  
  /**
   * Analyze plurality in the data
   * Kant's category of Plurality: the concept of "many" or diversity
   */
  private analyzePlurality(sensibilityData: any): PluralityAnalysis {
    const relationships = [];
    let pluralityAnalysisDescription = "";
    
    // Get raw features to analyze distinct elements
    const rawFeatures = sensibilityData.rawFeatures || [];
    
    // Count distinct element types
    const typeCounts: Record<string, number> = {};
    rawFeatures.forEach((feature: any) => {
      typeCounts[feature.type] = (typeCounts[feature.type] || 0) + 1;
    });
    
    const distinctTypes = Object.keys(typeCounts);
    
    // Analyze relationships between elements
    if (sensibilityData.spatialRelations?.patterns) {
      const networkPatterns = sensibilityData.spatialRelations.patterns.filter((p: any) => 
        p.type === 'network' || p.type === 'cluster'
      );
      
      if (networkPatterns.length > 0) {
        networkPatterns.forEach((pattern: any) => {
          pattern.elements.forEach((element: any, i: number) => {
            // Only create relationships for a subset of elements to avoid explosion
            const maxRelationships = 5;
            for (let j = i + 1; j < Math.min(i + maxRelationships, pattern.elements.length); j++) {
              if (pattern.elements[j]) {
                relationships.push({
                  from: this.getElementIdentifier(element),
                  to: this.getElementIdentifier(pattern.elements[j]),
                  relationType: pattern.type === 'network' ? 'connected' : 'clustered'
                });
              }
            }
          });
        });
        
        pluralityAnalysisDescription += `Identified network of relationships among elements. `;
      }
    }
    
    // Check array elements for plurality
    const arrayFeatures = rawFeatures.filter((f: any) => 
      f.type === 'array' || f.type === 'object-array' || 
      (f.type === 'structural' && f.name === 'array')
    );
    
    if (arrayFeatures.length > 0) {
      arrayFeatures.forEach((feature: any) => {
        if (feature.count && feature.count > this.options.thresholds!.pluralityMinimum) {
          relationships.push({
            from: `array:${feature.name || 'unnamed'}`,
            to: `element:multiple`,
            relationType: 'contains'
          });
        }
      });
      
      pluralityAnalysisDescription += `Analyzed plurality in ${arrayFeatures.length} array structures. `;
    }
    
    // Determine final distinct elements count
    const totalDistinctElements = this.calculateDistinctElements(rawFeatures, typeCounts);
    
    if (totalDistinctElements > this.options.thresholds!.pluralityMinimum) {
      pluralityAnalysisDescription += `Identified ${totalDistinctElements} distinct elements across ${distinctTypes.length} types. `;
    } else {
      pluralityAnalysisDescription += `Limited plurality detected (${totalDistinctElements} elements). `;
    }
    
    return {
      pluralityAnalysis: pluralityAnalysisDescription,
      distinctElements: totalDistinctElements,
      relationships: relationships.length > 0 ? relationships : undefined
    };
  }
  
  /**
   * Analyze totality in the data
   * Kant's category of Totality: unity of plurality, completeness
   */
  private analyzeTotality(sensibilityData: any): any {
    let totalityAnalysisDescription = "";
    const completeness = this.assessCompleteness(sensibilityData);
    
    // Analyze if data forms a complete, exhaustive whole
    const isTotalityHigh = completeness.score > 0.7;
    const isTotalityMedium = completeness.score > 0.4 && completeness.score <= 0.7;
    
    if (isTotalityHigh) {
      totalityAnalysisDescription += `High degree of totality: ${completeness.completeParts}/${completeness.totalParts} aspects present. `;
    } else if (isTotalityMedium) {
      totalityAnalysisDescription += `Moderate totality: ${completeness.completeParts}/${completeness.totalParts} aspects present. `;
    } else {
      totalityAnalysisDescription += `Limited totality: ${completeness.completeParts}/${completeness.totalParts} aspects present. `;
    }
    
    // Check for completeness in domain-specific data
    if (completeness.domainCompleteness) {
      totalityAnalysisDescription += `Domain completeness: ${completeness.domainCompleteness}. `;
    }
    
    return {
      totalityAnalysis: totalityAnalysisDescription,
      completeness: completeness.score,
      completeAspects: completeness.completeParts,
      totalAspects: completeness.totalParts,
      missingElements: completeness.missingAspects
    };
  }
  
  //=============================================================================
  // QUALITY CATEGORIES
  //=============================================================================
  
  /**
   * Analyze reality in the data
   * Kant's category of Reality: positive determination, affirmation
   */
  private analyzeReality(sensibilityData: any): any {
    let realityAnalysisDescription = "";
    const positiveContent = [];
    
    // Get raw features to analyze positive content
    const rawFeatures = sensibilityData.rawFeatures || [];
    
    // Look for positive assertions and concrete elements
    const concreteFeatures = rawFeatures.filter((f: any) => 
      typeof f.value === 'number' || 
      (f.type === 'property' && f.value !== null && f.value !== undefined) ||
      (f.type === 'numerical') ||
      (f.type === 'domain-specific')
    );
    
    if (concreteFeatures.length > 0) {
      positiveContent.push({
        type: 'concrete-content',
        elements: concreteFeatures.length,
        confidence: 0.85
      });
      
      realityAnalysisDescription += `Identified ${concreteFeatures.length} concrete elements with positive content. `;
    }
    
    // Check for descriptive content
    const descriptiveFeatures = rawFeatures.filter((f: any) => 
      f.type === 'lexical' || f.type === 'semantic' || f.type === 'property-lexical'
    );
    
    if (descriptiveFeatures.length > 0) {
      positiveContent.push({
        type: 'descriptive-content',
        elements: descriptiveFeatures.length,
        confidence: 0.75
      });
      
      realityAnalysisDescription += `Found ${descriptiveFeatures.length} descriptive elements. `;
    }
    
    // If limited positive content found, note this
    if (positiveContent.length === 0) {
      positiveContent.push({
        type: 'minimal-content',
        elements: 1,
        confidence: 0.5
      });
      
      realityAnalysisDescription = "Limited positive content identified. ";
    }
    
    return {
      realityAnalysis: realityAnalysisDescription,
      positiveElements: concreteFeatures.length + descriptiveFeatures.length,
      positiveContent
    };
  }
  
  /**
   * Analyze negation in the data
   * Kant's category of Negation: negative determination, absence
   */
  private analyzeNegation(sensibilityData: any): any {
    let negationAnalysisDescription = "";
    const negations = [];
    
    // Get raw features to analyze negations
    const rawFeatures = sensibilityData.rawFeatures || [];
    
    // Look for explicit negations in text
    const textFeatures = rawFeatures.filter((f: any) => f.type === 'lexical' || f.type === 'semantic');
    let explicitNegations = 0;
    
    textFeatures.forEach((feature: any) => {
      if (feature.items) {
        const negationTerms = feature.items.filter((item: string) => 
          item.toLowerCase().includes('no ') || 
          item.toLowerCase().includes('not ') || 
          item.toLowerCase().includes(' never ') ||
          item.toLowerCase().includes('n\'t ')
        );
        
        explicitNegations += negationTerms.length;
      }
    });
    
    if (explicitNegations > 0) {
      negations.push({
        type: 'explicit-negation',
        count: explicitNegations,
        confidence: 0.9
      });
      
      negationAnalysisDescription += `Found ${explicitNegations} explicit negations in text. `;
    }
    
    // Look for missing or null values
    const nullFeatures = rawFeatures.filter((f: any) => 
      (f.type === 'property' && (f.value === null || f.value === undefined)) ||
      (f.type === 'structural' && f.missing)
    );
    
    if (nullFeatures.length > 0) {
      negations.push({
        type: 'null-values',
        count: nullFeatures.length,
        confidence: 0.8
      });
      
      negationAnalysisDescription += `Identified ${nullFeatures.length} null or missing values. `;
    }
    
    // Look for zero values or empty collections
    const zeroFeatures = rawFeatures.filter((f: any) => 
      (f.type === 'numerical' && f.value === 0) ||
      (f.type === 'property-numerical' && f.value === 0) ||
      (f.type === 'array' && f.length === 0)
    );
    
    if (zeroFeatures.length > 0) {
      negations.push({
        type: 'zero-values',
        count: zeroFeatures.length,
        confidence: 0.75
      });
      
      negationAnalysisDescription += `Found ${zeroFeatures.length} zero values or empty collections. `;
    }
    
    // If no negations found, note this
    if (negations.length === 0) {
      negationAnalysisDescription = "No significant negations identified. ";
      negations.push({
        type: 'no-negations',
        count: 0,
        confidence: 0.5
      });
    }
    
    return {
      negationAnalysis: negationAnalysisDescription,
      negationElements: explicitNegations + nullFeatures.length + zeroFeatures.length,
      negations
    };
  }
  
  /**
   * Analyze limitation in the data
   * Kant's category of Limitation: reality limited by negation
   */
  private analyzeLimitation(sensibilityData: any): any {
    let limitationAnalysisDescription = "";
    const limitations = [];
    
    // Get raw features to analyze limitations
    const rawFeatures = sensibilityData.rawFeatures || [];
    
    // Look for bounded ranges or constraints
    const boundedFeatures = rawFeatures.filter((f: any) => 
      (f.type === 'numerical' && f.min !== undefined && f.max !== undefined) ||
      (f.type === 'property-numerical' && f.min !== undefined && f.max !== undefined)
    );
    
    if (boundedFeatures.length > 0) {
      limitations.push({
        type: 'bounded-ranges',
        count: boundedFeatures.length,
        confidence: 0.85
      });
      
      limitationAnalysisDescription += `Identified ${boundedFeatures.length} bounded numerical ranges. `;
    }
    
    // Look for constrained options or enumerations
    const constrainedFeatures = rawFeatures.filter((f: any) => 
      (f.type === 'property-lexical' && f.uniqueValues && 
       f.uniqueValues.length < f.values.length)
    );
    
    if (constrainedFeatures.length > 0) {
      limitations.push({
        type: 'constrained-options',
        count: constrainedFeatures.length,
        confidence: 0.8
      });
      
      limitationAnalysisDescription += `Found ${constrainedFeatures.length} constrained option sets. `;
    }
    
    // Look for conditional structures
    const conditionalFeatures = rawFeatures.filter((f: any) => 
      (f.type === 'property' && f.name.toLowerCase().includes('if')) ||
      (f.type === 'property' && f.name.toLowerCase().includes('condition')) ||
      (f.type === 'lexical' && f.items && f.items.some((i: string) => 
        i.toLowerCase().includes('if ') || i.toLowerCase().includes('unless ') || 
        i.toLowerCase().includes('except ') || i.toLowerCase().includes('only if')
      ))
    );
    
    if (conditionalFeatures.length > 0) {
      limitations.push({
        type: 'conditional-structures',
        count: conditionalFeatures.length,
        confidence: 0.85
      });
      
      limitationAnalysisDescription += `Detected ${conditionalFeatures.length} conditional structures. `;
    }
    
    // If no limitations found, note this
    if (limitations.length === 0) {
      limitationAnalysisDescription = "No significant limitations identified. ";
      limitations.push({
        type: 'no-limitations',
        count: 0,
        confidence: 0.5
      });
    }
    
    return {
      limitationAnalysis: limitationAnalysisDescription,
      limitationElements: boundedFeatures.length + constrainedFeatures.length + conditionalFeatures.length,
      limitations
    };
  }
  
  //=============================================================================
  // RELATION CATEGORIES
  //=============================================================================
  
  /**
   * Analyze substance/inherence in the data
   * Kant's category of Substance: persisting entities with properties
   */
  private analyzeSubstance(sensibilityData: any): any {
    let substanceAnalysisDescription = "";
    const substances = [];
    
    // Get raw features to analyze substances (persisting entities with properties)
    const rawFeatures = sensibilityData.rawFeatures || [];
    
    // Look for object structures that could represent substances
    const objectFeatures = rawFeatures.filter((f: any) => 
      f.type === 'object' || 
      f.type === 'nested-object' || 
      f.type === 'object-array'
    );
    
    if (objectFeatures.length > 0) {
      objectFeatures.forEach((feature: any) => {
        substances.push({
          type: 'object-substance',
          name: feature.name || 'unnamed',
          properties: feature.properties || feature.sampleProperties || [],
          confidence: 0.8
        });
      });
      
      substanceAnalysisDescription += `Identified ${objectFeatures.length} object structures as substances. `;
    }
    
    // Look for domain-specific entities that could be substances
    const domainFeatures = rawFeatures.filter((f: any) => f.type === 'domain-specific');
    
    if (domainFeatures.length > 0) {
      domainFeatures.forEach((feature: any) => {
        substances.push({
          type: 'domain-substance',
          domain: feature.domain,
          entity: feature.entity,
          properties: feature.properties || [],
          confidence: 0.9
        });
      });
      
      substanceAnalysisDescription += `Recognized ${domainFeatures.length} domain-specific substances. `;
    }
    
    // Look for persistent identifiers across temporal data
    if (sensibilityData.temporalRelations?.patterns) {
      const persistentEntities = this.identifyPersistentEntities(sensibilityData);
      
      if (persistentEntities.length > 0) {
        persistentEntities.forEach(entity => {
          substances.push({
            type: 'temporal-substance',
            name: entity.name,
            persistence: entity.persistence,
            confidence: entity.confidence
          });
        });
        
        substanceAnalysisDescription += `Found ${persistentEntities.length} persistent entities across time. `;
      }
    }
    
    // If no substances found, look for any structured data
    if (substances.length === 0) {
      const structuredFeatures = rawFeatures.filter((f: any) => f.type === 'structural');
      
      if (structuredFeatures.length > 0) {
        substances.push({
          type: 'structural-substance',
          properties: structuredFeatures.length,
          confidence: 0.6
        });
        
        substanceAnalysisDescription += `Identified basic structural substance with ${structuredFeatures.length} properties. `;
      } else {
        substanceAnalysisDescription = "No clear substances identified. ";
        substances.push({
          type: 'minimal-substance',
          confidence: 0.4
        });
      }
    }
    
    return {
      substanceAnalysis: substanceAnalysisDescription,
      identifiedSubstances: substances.length,
      substances
    };
  }
  
  /**
   * Analyze causality/dependence in the data
   * Kant's category of Causality: cause-effect relationships
   */
  private analyzeCausality(sensibilityData: any): CausalityAnalysis {
    let causalityAnalysisDescription = "";
    const causalRelationships = [];
    
    // Look for temporal patterns that suggest causality
    if (sensibilityData.temporalRelations?.patterns) {
      const sequencePatterns = sensibilityData.temporalRelations.patterns.filter((p: any) => 
        p.type === 'sequence' || p.type === 'trend'
      );
      
      if (sequencePatterns.length > 0) {
        sequencePatterns.forEach((pattern: any) => {
          // For each sequence, identify potential cause-effect pairs
          if (pattern.elements && pattern.elements.length >= 2) {
            for (let i = 0; i < pattern.elements.length - 1; i++) {
              const cause = pattern.elements[i];
              const effect = pattern.elements[i + 1];
              
              // Calculate a confidence based on pattern confidence and temporal proximity
              const proximityFactor = 1 - (i / pattern.elements.length);
              const confidence = pattern.confidence * proximityFactor;
              
              if (confidence >= this.options.thresholds!.causalConfidence) {
                causalRelationships.push({
                  cause: this.getElementIdentifier(cause),
                  effect: this.getElementIdentifier(effect),
                  strength: confidence,
                  confidence
                });
              }
            }
          }
        });
        
        causalityAnalysisDescription += `Identified potential cause-effect relationships from temporal sequences. `;
      }
    }
    
    // Look for explicit causal language in text features
    const rawFeatures = sensibilityData.rawFeatures || [];
    const textFeatures = rawFeatures.filter((f: any) => 
      f.type === 'lexical' || f.type === 'semantic'
    );
    
    let explicitCausalStatements = 0;
    
    textFeatures.forEach((feature: any) => {
      if (feature.items) {
        const causalTerms = feature.items.filter((item: string) => {
          const lowerItem = item.toLowerCase();
          return lowerItem.includes('because') || 
                 lowerItem.includes('causes') || 
                 lowerItem.includes('effect') ||
                 lowerItem.includes('result in') ||
                 lowerItem.includes('leads to') ||
                 lowerItem.includes('due to');
        });
        
        explicitCausalStatements += causalTerms.length;
        
        // For each causal term, try to extract cause and effect
        causalTerms.forEach((term: string) => {
          const simpleCausalExtraction = this.extractCauseEffect(term);
          if (simpleCausalExtraction) {
            causalRelationships.push({
              cause: simpleCausalExtraction.cause,
              effect: simpleCausalExtraction.effect,
              strength: 0.85,
              confidence: 0.85
            });
          }
        });
      }
    });
    
    if (explicitCausalStatements > 0) {
      causalityAnalysisDescription += `Found ${explicitCausalStatements} explicit causal statements. `;
    }
    
    // Look for domain-specific causality
    const domainFeatures = rawFeatures.filter((f: any) => f.type === 'domain-specific');
    let domainCausalRelationships = 0;
    
    domainFeatures.forEach((feature: any) => {
      if (feature.domain === 'healthcare' && feature.symptoms) {
        // In healthcare, symptoms can be caused by conditions
        if (feature.condition) {
          causalRelationships.push({
            cause: feature.condition,
            effect: `symptoms:${feature.symptoms.join(',')}`,
            strength: 0.8,
            confidence: 0.8
          });
          domainCausalRelationships++;
        }
      } else if (feature.domain === 'education' && feature.interventions) {
        // In education, interventions can cause learning outcomes
        if (feature.outcomes) {
          causalRelationships.push({
            cause: `intervention:${feature.interventions}`,
            effect: `outcome:${feature.outcomes}`,
            strength: 0.75,
            confidence: 0.75
          });
          domainCausalRelationships++;
        }
      }
    });
    
    if (domainCausalRelationships > 0) {
      causalityAnalysisDescription += `Identified ${domainCausalRelationships} domain-specific causal relationships. `;
    }
    
    // If no causal relationships found, note this
    if (causalRelationships.length === 0) {
      causalityAnalysisDescription = "No significant causal relationships identified. ";
    }
    
    return {
      causalityAnalysis: causalityAnalysisDescription,
      causalChains: Math.ceil(causalRelationships.length / 2), // Estimate chains from relationships
      causalRelationships: causalRelationships.length > 0 ? causalRelationships : undefined
    };
  }
  
  /**
   * Analyze community/reciprocity in the data
   * Kant's category of Community: reciprocal interaction between substances
   */
  private analyzeCommunity(sensibilityData: any): any {
    let communityAnalysisDescription = "";
    const interactions = [];
    
    // Get patterns that might indicate community/interaction
    const spatialPatterns = sensibilityData.spatialRelations?.patterns || [];
    const networkPatterns = spatialPatterns.filter((p: any) => p.type === 'network');
    
    if (networkPatterns.length > 0) {
      networkPatterns.forEach((pattern: any) => {
        if (pattern.elements && pattern.elements.length >= 2) {
          // Create bidirectional interactions for network elements
          for (let i = 0; i < pattern.elements.length; i++) {
            for (let j = i + 1; j < pattern.elements.length; j++) {
              interactions.push({
                entity1: this.getElementIdentifier(pattern.elements[i]),
                entity2: this.getElementIdentifier(pattern.elements[j]),
                interactionType: 'network',
                bidirectional: true,
                strength: pattern.confidence
              });
            }
          }
        }
      });
      
      communityAnalysisDescription += `Identified network of reciprocal interactions. `;
    }
    
    // Look for domain-specific interaction patterns
    const rawFeatures = sensibilityData.rawFeatures || [];
    const domainFeatures = rawFeatures.filter((f: any) => f.type === 'domain-specific');
    
    domainFeatures.forEach((feature: any) => {
      if (feature.connections || feature.interactions) {
        const connections = feature.connections || feature.interactions || [];
        
        connections.forEach((connection: any) => {
          interactions.push({
            entity1: connection.from || connection.entity1,
            entity2: connection.to || connection.entity2,
            interactionType: connection.type || 'domain-specific',
            bidirectional: connection.bidirectional || false,
            strength: connection.strength || 0.7
          });
        });
      }
    });
    
    if (domainFeatures.length > 0 && interactions.length === 0) {
      // Try to infer interactions from domain entities
      if (domainFeatures.length >= 2) {
        for (let i = 0; i < Math.min(domainFeatures.length, 5); i++) {
          for (let j = i + 1; j < Math.min(domainFeatures.length, 5); j++) {
            interactions.push({
              entity1: this.getElementIdentifier(domainFeatures[i]),
              entity2: this.getElementIdentifier(domainFeatures[j]),
              interactionType: 'inferred',
              bidirectional: true,
              strength: 0.6
            });
          }
        }
        
        communityAnalysisDescription += `Inferred potential interactions between domain entities. `;
      }
    }
    
    // If we found domain interactions, note them
    if (interactions.length > interactions.length) {
      communityAnalysisDescription += `Identified ${interactions.length - interactions.length} domain-specific interactions. `;
    }
    
    // If no interactions found, note this
    if (interactions.length === 0) {
      communityAnalysisDescription = "No significant community interactions identified. ";
    }
    
    return {
      communityAnalysis: communityAnalysisDescription,
      interactionCount: interactions.length,
      reciprocalInteractions: interactions.filter((i: any) => i.bidirectional).length,
      interactions: interactions.length > 0 ? interactions : undefined
    };
  }
  
  //=============================================================================
  // MODALITY CATEGORIES
  //=============================================================================
  
  /**
   * Analyze possibility/impossibility in the data
   * Kant's category of Possibility: what can be, conditions of possibility
   */
  private analyzePossibility(sensibilityData: any): PossibilityAnalysis {
    let possibilityAnalysisDescription = "";
    const possibilityDetails = [];
    
    // Get raw features to analyze possibilities
    const rawFeatures = sensibilityData.rawFeatures || [];
    
    // Look for explicit possibility language
    const textFeatures = rawFeatures.filter((f: any) => 
      f.type === 'lexical' || f.type === 'semantic'
    );
    
    let explicitPossibilityStatements = 0;
    
    textFeatures.forEach((feature: any) => {
      if (feature.items) {
        const possibilityTerms = feature.items.filter((item: string) => {
          const lowerItem = item.toLowerCase();
          return lowerItem.includes('could ') || 
                 lowerItem.includes('might ') || 
                 lowerItem.includes('may ') ||
                 lowerItem.includes('possible') ||
                 lowerItem.includes('potentially') ||
                 lowerItem.includes('option');
        });
        
        explicitPossibilityStatements += possibilityTerms.length;
        
        // Extract specific possibilities from terms
        possibilityTerms.forEach((term: string) => {
          possibilityDetails.push({
            state: term,
            likelihood: 0.5, // Default middle likelihood
            conditions: []
          });
        });
      }
    });
    
    if (explicitPossibilityStatements > 0) {
      possibilityAnalysisDescription += `Found ${explicitPossibilityStatements} explicit possibility statements. `;
    }
    
    // Look for conditional structures that suggest possibilities
    const conditionalFeatures = rawFeatures.filter((f: any) => 
      (f.type === 'property' && f.name.toLowerCase().includes('if')) ||
      (f.type === 'property' && f.name.toLowerCase().includes('condition'))
    );
    
    if (conditionalFeatures.length > 0) {
      conditionalFeatures.forEach((feature: any) => {
        possibilityDetails.push({
          state: `Condition: ${feature.name}`,
          likelihood: 0.7,
          conditions: [feature.value]
        });
      });
      
      possibilityAnalysisDescription += `Identified ${conditionalFeatures.length} conditional structures suggesting possibilities. `;
    }
    
    // Look for branching structures or alternative options
    const branchingFeatures = rawFeatures.filter((f: any) => 
      (f.type === 'property-lexical' && f.uniqueValues && f.uniqueValues.length > 1) ||
      (f.type === 'structural' && f.name === 'options')
    );
    
    if (branchingFeatures.length > 0) {
      branchingFeatures.forEach((feature: any) => {
        const options = feature.uniqueValues || feature.options || [];
        
        options.forEach((option: any) => {
          possibilityDetails.push({
            state: typeof option === 'string' ? option : `Option in ${feature.name}`,
            likelihood: 1.0 / options.length, // Equal distribution of likelihood
            conditions: []
          });
        });
      });
      
      possibilityAnalysisDescription += `Detected ${branchingFeatures.length} branching structures with multiple possibilities. `;
    }
    
    // If no possibilities found, check for domain-specific possibilities
    if (possibilityDetails.length === 0) {
      const domainFeatures = rawFeatures.filter((f: any) => f.type === 'domain-specific');
      
      domainFeatures.forEach((feature: any) => {
        if (feature.domain === 'healthcare' && feature.possibleConditions) {
          feature.possibleConditions.forEach((condition: any) => {
            possibilityDetails.push({
              state: `Possible diagnosis: ${condition}`,
              likelihood: condition.likelihood || 0.5,
              conditions: condition.symptoms || []
            });
          });
        } else if (feature.domain === 'education' && feature.possibleOutcomes) {
          feature.possibleOutcomes.forEach((outcome: any) => {
            possibilityDetails.push({
              state: `Possible outcome: ${outcome}`,
              likelihood: outcome.likelihood || 0.5,
              conditions: outcome.prerequisites || []
            });
          });
        }
      });
      
      if (possibilityDetails.length > 0) {
        possibilityAnalysisDescription += `Identified ${possibilityDetails.length} domain-specific possibilities. `;
      } else {
        possibilityAnalysisDescription = "Limited possibility analysis due to concrete nature of data. ";
        possibilityDetails.push({
          state: "Default state",
          likelihood: 1.0,
          conditions: []
        });
      }
    }
    
    return {
      possibilityAnalysis: possibilityAnalysisDescription,
      possibleStates: possibilityDetails.length,
      possibilityDetails: possibilityDetails.length > 0 ? possibilityDetails : undefined
    };
  }
  
  /**
   * Analyze existence/non-existence in the data
   * Kant's category of Existence: what actually is (vs. what could be)
   */
  private analyzeExistence(sensibilityData: any): any {
    let existenceAnalysisDescription = "";
    const existingEntities = [];
    const nonExistingEntities = [];
    
    // Get raw features to analyze existence
    const rawFeatures = sensibilityData.rawFeatures || [];
    
    // Look for concrete, existing entities with positive values
    const concreteFeatures = rawFeatures.filter((f: any) => 
      (f.type === 'property' && f.value !== null && f.value !== undefined) ||
      (f.type === 'numerical' && f.value !== 0) ||
      (f.type === 'property-numerical' && f.value !== 0) ||
      (f.type === 'domain-specific')
    );
    
    if (concreteFeatures.length > 0) {
      concreteFeatures.forEach((feature: any) => {
        existingEntities.push({
          type: feature.type,
          name: feature.name || 'unnamed',
          entityType: feature.domain || feature.type,
          confidence: 0.9
        });
      });
      
      existenceAnalysisDescription += `Identified ${concreteFeatures.length} concretely existing entities. `;
    }
    
    // Look for null values, zeros, or explicit non-existence
    const nullFeatures = rawFeatures.filter((f: any) => 
      (f.type === 'property' && (f.value === null || f.value === undefined)) ||
      (f.type === 'numerical' && f.value === 0) ||
      (f.type === 'property-numerical' && f.value === 0)
    );
    
    if (nullFeatures.length > 0) {
      nullFeatures.forEach((feature: any) => {
        nonExistingEntities.push({
          type: feature.type,
          name: feature.name || 'unnamed',
          reason: 'null-or-zero-value',
          confidence: 0.8
        });
      });
      
      existenceAnalysisDescription += `Found ${nullFeatures.length} null or zero values indicating non-existence. `;
    }
    
    // Look for explicit existential statements in text
    const textFeatures = rawFeatures.filter((f: any) => 
      f.type === 'lexical' || f.type === 'semantic'
    );
    
    let explicitExistentialStatements = 0;
    
    textFeatures.forEach((feature: any) => {
      if (feature.items) {
        const existentialTerms = feature.items.filter((item: string) => {
          const lowerItem = item.toLowerCase();
          return lowerItem.includes('exist') || 
                 lowerItem.includes('present') || 
                 lowerItem.includes('is') ||
                 lowerItem.includes('are');
        });
        
        explicitExistentialStatements += existentialTerms.length;
      }
    });
    
    if (explicitExistentialStatements > 0) {
      existenceAnalysisDescription += `Detected ${explicitExistentialStatements} explicit existential statements. `;
    }
    
    return {
      existenceAnalysis: existenceAnalysisDescription,
      existingCount: existingEntities.length,
      nonExistingCount: nonExistingEntities.length,
      existingEntities: existingEntities.length > 0 ? existingEntities : undefined,
      nonExistingEntities: nonExistingEntities.length > 0 ? nonExistingEntities : undefined
    };
  }
  
  /**
   * Analyze necessity/contingency in the data
   * Kant's category of Necessity: what must be, cannot be otherwise
   */
  private analyzeNecessity(sensibilityData: any): NecessityAnalysis {
    let necessityAnalysisDescription = "";
    const necessityDetails = [];
    
    // Get raw features to analyze necessity
    const rawFeatures = sensibilityData.rawFeatures || [];
    
    // Look for explicit necessity language
    const textFeatures = rawFeatures.filter((f: any) => 
      f.type === 'lexical' || f.type === 'semantic'
    );
    
    let explicitNecessityStatements = 0;
    
    textFeatures.forEach((feature: any) => {
      if (feature.items) {
        const necessityTerms = feature.items.filter((item: string) => {
          const lowerItem = item.toLowerCase();
          return lowerItem.includes('must ') || 
                 lowerItem.includes('necessary') || 
                 lowerItem.includes('required') ||
                 lowerItem.includes('essential') ||
                 lowerItem.includes('always') ||
                 lowerItem.includes('never');
        });
        
        explicitNecessityStatements += necessityTerms.length;
        
        // Extract specific necessary conditions from terms
        necessityTerms.forEach((term: string) => {
          necessityDetails.push({
            condition: term,
            implications: ['Explicitly stated as necessary'],
            confidence: 0.9
          });
        });
      }
    });
    
    if (explicitNecessityStatements > 0) {
      necessityAnalysisDescription += `Found ${explicitNecessityStatements} explicit necessity statements. `;
    }
    
    // Look for logical implications or dependencies
    if (sensibilityData.spatialRelations?.patterns) {
      const hierarchyPatterns = sensibilityData.spatialRelations.patterns.filter((p: any) => 
        p.type === 'hierarchy'
      );
      
      if (hierarchyPatterns.length > 0) {
        // In hierarchies, parent nodes can represent necessary conditions for children
        hierarchyPatterns.forEach((pattern: any) => {
          if (pattern.elements && pattern.elements.length > 0) {
            // Take the first element as a necessary condition (parent node)
            const parentNode = pattern.elements[0];
            
            necessityDetails.push({
              condition: `Hierarchical dependency: ${this.getElementIdentifier(parentNode)}`,
              implications: ['Necessary for hierarchical structure'],
              confidence: pattern.confidence
            });
          }
        });
        
        necessityAnalysisDescription += `Identified necessary hierarchical dependencies. `;
      }
    }
    
    // Look for required fields or constraints
    const constraintFeatures = rawFeatures.filter((f: any) => 
      (f.type === 'property' && f.required) ||
      (f.type === 'structural' && f.required) ||
      (f.type === 'property' && f.name.toLowerCase().includes('require'))
    );
    
    if (constraintFeatures.length > 0) {
      constraintFeatures.forEach((feature: any) => {
        necessityDetails.push({
          condition: `Required: ${feature.name}`,
          implications: [feature.reason || 'Structural requirement'],
          confidence: 0.85
        });
      });
      
      necessityAnalysisDescription += `Found ${constraintFeatures.length} required fields or constraints. `;
    }
    
    // Look for domain-specific necessary conditions
    const domainFeatures = rawFeatures.filter((f: any) => f.type === 'domain-specific');
    
    domainFeatures.forEach((feature: any) => {
      if (feature.domain === 'healthcare' && feature.requirements) {
        feature.requirements.forEach((req: any) => {
          necessityDetails.push({
            condition: `Medical requirement: ${req.name || req}`,
            implications: req.implications || ['Health-related necessity'],
            confidence: req.confidence || 0.8
          });
        });
      } else if (feature.domain === 'education' && feature.prerequisites) {
        feature.prerequisites.forEach((prereq: any) => {
          necessityDetails.push({
            condition: `Educational prerequisite: ${prereq.name || prereq}`,
            implications: prereq.implications || ['Learning-related necessity'],
            confidence: prereq.confidence || 0.8
          });
        });
      }
    });
    
    if (necessityDetails.length === 0) {
      necessityAnalysisDescription = "No clear necessary conditions identified. ";
      necessityDetails.push({
        condition: "No necessary conditions",
        implications: ["All elements appear contingent"],
        confidence: 0.5
      });
    }
    
    return {
      necessityAnalysis: necessityAnalysisDescription,
      necessaryConditions: necessityDetails.length,
      necessityDetails: necessityDetails.length > 0 ? necessityDetails : undefined
    };
  }
  
  //=============================================================================
  // HELPER METHODS
  //=============================================================================
  
  /**
   * Get an identifier for an element
   */
  private getElementIdentifier(element: any): string {
    if (!element) return 'unknown';
    
    if (typeof element === 'string') return element;
    
    if (element.name) return element.name;
    
    if (element.type && element.id) return `${element.type}:${element.id}`;
    
    if (element.type) return `${element.type}:${Math.random().toString(36).substring(7)}`;
    
    return `element:${Math.random().toString(36).substring(7)}`;
  }
  
  /**
   * Calculate the number of distinct elements in features
   */
  private calculateDistinctElements(features: any[], typeCounts: Record<string, number>): number {
    // Start with the number of features as a base
    let distinctCount = features.length;
    
    // Adjust for arrays which contain multiple elements
    const arrayFeatures = features.filter(f => 
      f.type === 'array' || f.type === 'object-array' || 
      (f.type === 'structural' && f.name === 'array')
    );
    
    arrayFeatures.forEach(feature => {
      // Add the count of elements in the array, but don't count the array itself twice
      distinctCount += (feature.count || feature.length || 0) - 1;
    });
    
    // Adjust for duplicates by looking at properties with unique values
    const propertyFeaturesWithUniqueValues = features.filter(f => 
      f.type === 'property-lexical' && f.uniqueValues && f.values
    );
    
    propertyFeaturesWithUniqueValues.forEach(feature => {
      // Subtract duplicate values (values - uniqueValues)
      distinctCount -= (feature.values.length - feature.uniqueValues.length);
    });
    
    // Ensure we don't go negative
    return Math.max(distinctCount, 1);
  }
  
  /**
   * Assess completeness of data for totality analysis
   */
  private assessCompleteness(sensibilityData: any): {
    score: number;
    completeParts: number;
    totalParts: number;
    missingAspects: string[];
    domainCompleteness?: string;
  } {
    const missingAspects = [];
    let totalParts = 0;
    let completeParts = 0;
    let domainCompleteness = undefined;
    
    // Check for basic data structures
    const rawFeatures = sensibilityData.rawFeatures || [];
    const expectedTypes = ['structural', 'numerical', 'lexical', 'semantic'];
    
    expectedTypes.forEach(type => {
      totalParts++;
      if (rawFeatures.some((f: any) => f.type === type)) {
        completeParts++;
      } else {
        missingAspects.push(`No ${type} features`);
      }
    });
    
    // Check for patterns
    if (sensibilityData.spatialRelations?.patterns || sensibilityData.temporalRelations?.patterns) {
      completeParts++;
    } else {
      missingAspects.push('No identified patterns');
    }
    totalParts++;
    
    // Check for domain-specific completeness
    const domainFeatures = rawFeatures.filter((f: any) => f.type === 'domain-specific');
    
    if (domainFeatures.length > 0) {
      const domain = domainFeatures[0].domain;
      totalParts += 3; // Domain adds more expected parts
      
      if (domain === 'healthcare') {
        const hasSymptoms = domainFeatures.some((f: any) => f.symptoms);
        const hasVitals = domainFeatures.some((f: any) => f.vitalSigns);
        const hasHistory = domainFeatures.some((f: any) => f.medicalHistory);
        
        completeParts += hasSymptoms ? 1 : 0;
        completeParts += hasVitals ? 1 : 0;
        completeParts += hasHistory ? 1 : 0;
        
        if (!hasSymptoms) missingAspects.push('No symptoms data');
        if (!hasVitals) missingAspects.push('No vital signs data');
        if (!hasHistory) missingAspects.push('No medical history data');
        
        domainCompleteness = `Healthcare data is ${Math.round((hasSymptoms + hasVitals + hasHistory) / 3 * 100)}% complete`;
      } else if (domain === 'education') {
        const hasStudents = domainFeatures.some((f: any) => f.students || f.learners);
        const hasScores = domainFeatures.some((f: any) => f.scores || f.assessments);
        const hasCurriculum = domainFeatures.some((f: any) => f.curriculum || f.content);
        
        completeParts += hasStudents ? 1 : 0;
        completeParts += hasScores ? 1 : 0;
        completeParts += hasCurriculum ? 1 : 0;
        
        if (!hasStudents) missingAspects.push('No student data');
        if (!hasScores) missingAspects.push('No assessment data');
        if (!hasCurriculum) missingAspects.push('No curriculum data');
        
        domainCompleteness = `Education data is ${Math.round((hasStudents + hasScores + hasCurriculum) / 3 * 100)}% complete`;
      }
    }
    
    // Calculate overall completeness score
    const score = completeParts / totalParts;
    
    return {
      score,
      completeParts,
      totalParts,
      missingAspects,
      domainCompleteness
    };
  }
  
  /**
   * Extract cause and effect from a causal statement
   */
  private extractCauseEffect(statement: string): { cause: string; effect: string } | null {
    // Simple rule-based extraction of cause and effect
    
    // "X because Y" pattern (effect because cause)
    const becauseMatch = statement.match(/(.+)\s+because\s+(.+)/i);
    if (becauseMatch) {
      return {
        effect: becauseMatch[1].trim(),
        cause: becauseMatch[2].trim()
      };
    }
    
    // "X causes Y" pattern (cause causes effect)
    const causesMatch = statement.match(/(.+)\s+causes?\s+(.+)/i);
    if (causesMatch) {
      return {
        cause: causesMatch[1].trim(),
        effect: causesMatch[2].trim()
      };
    }
    
    // "X leads to Y" pattern (cause leads to effect)
    const leadsToMatch = statement.match(/(.+)\s+leads\s+to\s+(.+)/i);
    if (leadsToMatch) {
      return {
        cause: leadsToMatch[1].trim(),
        effect: leadsToMatch[2].trim()
      };
    }
    
    // "X results in Y" pattern (cause results in effect)
    const resultsInMatch = statement.match(/(.+)\s+results\s+in\s+(.+)/i);
    if (resultsInMatch) {
      return {
        cause: resultsInMatch[1].trim(),
        effect: resultsInMatch[2].trim()
      };
    }
    
    // "Due to X, Y" pattern (due to cause, effect)
    const dueToMatch = statement.match(/due\s+to\s+(.+),\s+(.+)/i);
    if (dueToMatch) {
      return {
        cause: dueToMatch[1].trim(),
        effect: dueToMatch[2].trim()
      };
    }
    
    // If no pattern matches, return null
    return null;
  }
  
  /**
   * Identify entities that persist across time
   */
  private identifyPersistentEntities(sensibilityData: any): { name: string; persistence: number; confidence: number }[] {
    const persistentEntities = [];
    
    // Get temporal patterns to look for persistent entities
    const temporalPatterns = sensibilityData.temporalRelations?.patterns || [];
    
    // Analyze sequence patterns for persistent entities
    const sequencePatterns = temporalPatterns.filter((p: any) => p.type === 'sequence');
    
    sequencePatterns.forEach((pattern: any) => {
      if (pattern.elements && pattern.elements.length > 0) {
        // Identify common entities across sequence steps
        const entityMentions: Record<string, number> = {};
        
        pattern.elements.forEach((element: any) => {
          // Check for entities mentioned in the element
          const entities = this.extractEntitiesFromElement(element);
          
          entities.forEach(entity => {
            entityMentions[entity] = (entityMentions[entity] || 0) + 1;
          });
        });
        
        // Entities mentioned in most steps are persistent
        Object.entries(entityMentions).forEach(([entity, mentions]) => {
          const persistence = mentions / pattern.elements.length;
          
          if (persistence >= 0.5) { // Appear in at least half the steps
            persistentEntities.push({
              name: entity,
              persistence,
              confidence: persistence * pattern.confidence
            });
          }
        });
      }
    });
    
    return persistentEntities;
  }
  
  /**
   * Extract entity mentions from an element
   */
  private extractEntitiesFromElement(element: any): string[] {
    const entities = [];
    
    if (!element) return entities;
    
    // Extract from name
    if (element.name) {
      entities.push(element.name);
    }
    
    // Extract from entity field
    if (element.entity) {
      entities.push(element.entity);
    }
    
    // Extract from domains
    if (element.domain) {
      entities.push(`${element.domain}:${element.entity || 'entity'}`);
    }
    
    // Extract from text content
    if (element.items && Array.isArray(element.items)) {
      // Simple noun phrase extraction - very basic
      element.items.forEach((item: string) => {
        if (typeof item === 'string' && item.length > 0) {
          // This is a very simplified noun extraction
          const nouns = item.match(/\b[A-Z][a-z]*\b|\b[a-z]+(?:s|es)\b/g);
          if (nouns) {
            entities.push(...nouns);
          }
        }
      });
    }
    
    return entities;
  }
}
