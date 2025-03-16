// src/core/sensibility-layer.ts

/**
 * Sensibility Layer for the Critique of Artificial Reason (CAR)
 * 
 * This module implements Kant's "Transcendental Aesthetic" - the theory of sensibility
 * and the a priori forms of intuition: space and time.
 * 
 * In Kant's philosophy, sensibility is our receptive capacity to be affected by objects.
 * The forms of intuition (space and time) are the a priori structures that organize our
 * sensory experiences. Space organizes our external sensations, while time organizes
 * both external and internal sensations.
 * 
 * In CAR, the Sensibility Layer processes raw input data and organizes it into
 * spatial and temporal structures, preparing it for conceptual understanding.
 */

import {
  ProcessedData,
  SpatialAnalysis,
  SpatialPattern,
  TemporalAnalysis,
  TemporalPattern
} from './interfaces';

/**
 * Configuration options for the Sensibility Layer
 */
export interface SensibilityLayerOptions {
  /** Enable spatial analysis */
  enableSpatial?: boolean;
  
  /** Enable temporal analysis */
  enableTemporal?: boolean;
  
  /** Enable pattern detection in spatial data */
  enableSpatialPatterns?: boolean;
  
  /** Enable pattern detection in temporal data */
  enableTemporalPatterns?: boolean;
  
  /** Custom feature extractors by data type */
  featureExtractors?: {
    [key: string]: (input: any) => any[];
  };
  
  /** Thresholds for pattern detection */
  patternDetectionThresholds?: {
    /** Minimum confidence for pattern recognition (0-1) */
    confidence: number;
    
    /** Minimum elements required to identify a pattern */
    minElements: number;
    
    /** Maximum distinct patterns to identify */
    maxPatterns: number;
  };
}

/**
 * Sensibility Layer class - implements Kant's forms of intuition
 */
export class SensibilityLayer {
  private options: SensibilityLayerOptions;
  
  /**
   * Initialize the Sensibility Layer with optional configuration
   */
  constructor(options?: SensibilityLayerOptions) {
    this.options = {
      enableSpatial: options?.enableSpatial ?? true,
      enableTemporal: options?.enableTemporal ?? true,
      enableSpatialPatterns: options?.enableSpatialPatterns ?? true,
      enableTemporalPatterns: options?.enableTemporalPatterns ?? true,
      featureExtractors: options?.featureExtractors ?? {},
      patternDetectionThresholds: options?.patternDetectionThresholds ?? {
        confidence: 0.6,
        minElements: 3,
        maxPatterns: 5
      }
    };
  }
  
  /**
   * Process input through the Sensibility Layer (Kant's forms of intuition)
   * 
   * @param input Any input data to be processed
   * @returns ProcessedData with spatial and temporal organization
   */
  public process(input: any): ProcessedData {
    // Extract features from the input
    const features = this.extractFeatures(input);
    
    // Apply the form of space (organize features spatially)
    const spatialAnalysis = this.options.enableSpatial 
      ? this.processSpatial(features, input)
      : { spatialStructure: "Spatial analysis disabled", featureCount: features.length, spatialDimension: "simple" };
    
    // Apply the form of time (organize features temporally)
    const temporalAnalysis = this.options.enableTemporal
      ? this.processTemporal(features, input)
      : { temporalStructure: "Temporal analysis disabled", sequenceLength: features.length, temporalDimension: "brief" };
    
    // Combine into organized data structure
    const organizedData = {
      spatialRelations: spatialAnalysis,
      temporalRelations: temporalAnalysis,
      rawFeatures: features,
    };
    
    // Return the processed data with metadata
    return {
      raw: organizedData,
      metadata: {
        source: typeof input === 'object' ? JSON.stringify(Object.keys(input)) : typeof input,
        timestamp: Date.now(),
        processingHistory: ['sensibilityLayer']
      }
    };
  }
  
  /**
   * Extract features from raw input - analogous to receiving sensory manifold
   * 
   * @param input The raw input data
   * @returns Array of extracted features
   */
  private extractFeatures(input: any): any[] {
    // Check for custom extractor based on input type
    const inputType = this.determineInputType(input);
    if (this.options.featureExtractors?.[inputType]) {
      return this.options.featureExtractors[inputType](input);
    }
    
    // Default extractors based on input type
    if (typeof input === 'string') {
      return this.extractFeaturesFromText(input);
    }
    
    if (Array.isArray(input)) {
      return this.extractFeaturesFromArray(input);
    }
    
    if (typeof input === 'object' && input !== null) {
      return this.extractFeaturesFromObject(input);
    }
    
    // Fallback for primitive types
    return [{ type: typeof input, value: input }];
  }
  
  /**
   * Determine the type of input for feature extraction
   */
  private determineInputType(input: any): string {
    if (typeof input === 'string') {
      // Check if it's JSON
      try {
        JSON.parse(input);
        return 'json-string';
      } catch (e) {
        // Check if it's HTML or XML-like
        if (input.trim().startsWith('<') && input.trim().endsWith('>')) {
          return 'markup';
        }
        return 'text';
      }
    }
    
    if (Array.isArray(input)) {
      return input.length > 0 && typeof input[0] === 'object' ? 'record-array' : 'array';
    }
    
    if (typeof input === 'object' && input !== null) {
      // Check for common object types
      if (input.symptoms && input.vitalSigns) return 'healthcare-data';
      if (input.students || input.learners) return 'education-data';
      if (input.policies || input.governance) return 'governance-data';
      
      return 'object';
    }
    
    return typeof input;
  }
  
  /**
   * Extract features from text input
   */
  private extractFeaturesFromText(text: string): any[] {
    const features = [];
    
    // Split into paragraphs
    const paragraphs = text.split(/\n\n+/);
    if (paragraphs.length > 1) {
      features.push({ type: 'structural', name: 'paragraphs', count: paragraphs.length });
    }
    
    // Split into sentences
    const sentences = text.split(/[.!?]+\s+/);
    if (sentences.length > 1) {
      features.push({ type: 'structural', name: 'sentences', count: sentences.length });
    }
    
    // Extract words
    const words = text.split(/\s+/).filter(word => word.length > 0);
    features.push({ type: 'lexical', name: 'words', items: words, count: words.length });
    
    // Extract significant terms (longer words might be more meaningful)
    const significantTerms = words.filter(word => word.length > 5);
    if (significantTerms.length > 0) {
      features.push({ 
        type: 'semantic', 
        name: 'significant-terms', 
        items: significantTerms, 
        count: significantTerms.length 
      });
    }
    
    // Check for numerical data
    const numbers = text.match(/\d+(\.\d+)?/g);
    if (numbers && numbers.length > 0) {
      features.push({ 
        type: 'numerical', 
        name: 'numbers', 
        items: numbers.map(n => parseFloat(n)), 
        count: numbers.length 
      });
    }
    
    return features;
  }
  
  /**
   * Extract features from array input
   */
  private extractFeaturesFromArray(array: any[]): any[] {
    const features = [];
    
    // Basic array properties
    features.push({ type: 'structural', name: 'array', count: array.length });
    
    // Analyze element types
    const typeDistribution: Record<string, number> = {};
    array.forEach(item => {
      const type = typeof item;
      typeDistribution[type] = (typeDistribution[type] || 0) + 1;
    });
    
    features.push({ type: 'typological', name: 'type-distribution', distribution: typeDistribution });
    
    // Handle numerical arrays specially
    if (array.every(item => typeof item === 'number')) {
      features.push({
        type: 'numerical',
        name: 'numeric-array',
        min: Math.min(...array),
        max: Math.max(...array),
        avg: array.reduce((sum, val) => sum + val, 0) / array.length,
        values: array
      });
    }
    
    // Handle string arrays specially
    if (array.every(item => typeof item === 'string')) {
      features.push({
        type: 'lexical',
        name: 'string-array',
        items: array,
        avgLength: array.reduce((sum, str) => sum + str.length, 0) / array.length
      });
    }
    
    // Handle object arrays
    if (array.length > 0 && typeof array[0] === 'object' && array[0] !== null) {
      // Extract common properties
      const sampleProps = Object.keys(array[0]);
      const commonProps = sampleProps.filter(prop => 
        array.every(item => prop in item)
      );
      
      features.push({ type: 'structural', name: 'object-properties', properties: commonProps });
      
      // Extract property values for analysis
      commonProps.forEach(prop => {
        const values = array.map(item => item[prop]);
        
        // Check if property contains numeric values
        if (values.every(val => typeof val === 'number')) {
          features.push({
            type: 'property-numerical',
            name: prop,
            min: Math.min(...values),
            max: Math.max(...values),
            avg: values.reduce((sum, val) => sum + val, 0) / values.length
          });
        }
        
        // Check if property contains string values
        if (values.every(val => typeof val === 'string')) {
          features.push({
            type: 'property-lexical',
            name: prop,
            values: values,
            uniqueValues: [...new Set(values)]
          });
        }
      });
    }
    
    return features;
  }
  
  /**
   * Extract features from object input
   */
  private extractFeaturesFromObject(obj: Record<string, any>): any[] {
    const features = [];
    
    // Get properties
    const properties = Object.keys(obj);
    features.push({ type: 'structural', name: 'object-properties', properties });
    
    // Analyze property types
    properties.forEach(prop => {
      const value = obj[prop];
      const type = typeof value;
      
      features.push({ 
        type: 'property', 
        name: prop, 
        valueType: type,
        value: this.summarizeValue(value)
      });
      
      // Recursively extract features for nested objects (limit depth)
      if (type === 'object' && value !== null && !Array.isArray(value)) {
        features.push({
          type: 'nested-object',
          name: prop,
          properties: Object.keys(value)
        });
      }
      
      // Handle arrays of objects
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
        features.push({
          type: 'object-array',
          name: prop,
          count: value.length,
          sampleProperties: value[0] ? Object.keys(value[0]) : []
        });
      }
    });
    
    // Domain-specific features
    if ('symptoms' in obj) {
      features.push({ 
        type: 'domain-specific', 
        domain: 'healthcare', 
        entity: 'patient',
        symptoms: obj.symptoms
      });
    }
    
    if ('students' in obj || 'learners' in obj) {
      features.push({ 
        type: 'domain-specific', 
        domain: 'education', 
        entity: 'class',
        count: obj.students?.length || obj.learners?.length
      });
    }
    
    return features;
  }
  
  /**
   * Create a summary of a value (for feature extraction)
   */
  private summarizeValue(value: any): any {
    if (value === null || value === undefined) {
      return null;
    }
    
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return {
          type: 'array',
          length: value.length,
          sample: value.length > 0 ? this.summarizeValue(value[0]) : null
        };
      }
      
      return {
        type: 'object',
        properties: Object.keys(value)
      };
    }
    
    // For primitive types, return as is
    return value;
  }
  
  /**
   * Process features through the form of space - organizing data spatially
   * Analogous to Kant's a priori form of space
   * 
   * @param features Extracted features from input
   * @param originalInput The original input (for context)
   * @returns Spatial analysis of the data
   */
  private processSpatial(features: any[], originalInput: any): SpatialAnalysis {
    // Determine spatial complexity based on feature structure
    const spatialDimension = features.length > 8 ? "complex" : 
                            features.length > 3 ? "medium" : "simple";
    
    let spatialStructure = `Identified ${features.length} features organized spatially`;
    
    // Detect spatial patterns if enabled
    let patterns: SpatialPattern[] = [];
    
    if (this.options.enableSpatialPatterns) {
      patterns = this.detectSpatialPatterns(features, originalInput);
      
      if (patterns.length > 0) {
        spatialStructure += ` with ${patterns.length} recognized spatial patterns`;
      }
    }
    
    return {
      spatialStructure,
      featureCount: features.length,
      spatialDimension,
      patterns: patterns.length > 0 ? patterns : undefined
    };
  }
  
  /**
   * Detect spatial patterns in features
   * Spatial patterns represent relationships that exist simultaneously
   */
  private detectSpatialPatterns(features: any[], originalInput: any): SpatialPattern[] {
    const patterns: SpatialPattern[] = [];
    const thresholds = this.options.patternDetectionThresholds!;
    
    // Look for hierarchical patterns (nested structures)
    const hierarchyPattern = this.detectHierarchicalPattern(features);
    if (hierarchyPattern && hierarchyPattern.confidence >= thresholds.confidence) {
      patterns.push(hierarchyPattern);
    }
    
    // Look for clustering patterns (related elements)
    const clusterPatterns = this.detectClusterPatterns(features);
    patterns.push(...clusterPatterns.filter(p => p.confidence >= thresholds.confidence));
    
    // Look for network patterns (interconnected elements)
    const networkPattern = this.detectNetworkPattern(features);
    if (networkPattern && networkPattern.confidence >= thresholds.confidence) {
      patterns.push(networkPattern);
    }
    
    // Add domain-specific patterns based on input type
    const domainPatterns = this.detectDomainSpatialPatterns(features, originalInput);
    patterns.push(...domainPatterns.filter(p => p.confidence >= thresholds.confidence));
    
    // Limit to max patterns
    return patterns.slice(0, thresholds.maxPatterns);
  }
  
  /**
   * Detect hierarchical patterns in features
   */
  private detectHierarchicalPattern(features: any[]): SpatialPattern | null {
    // Look for nested structures indicating hierarchy
    const nestedObjects = features.filter(f => 
      f.type === 'nested-object' || f.type === 'object-array'
    );
    
    if (nestedObjects.length >= this.options.patternDetectionThresholds!.minElements) {
      return {
        type: 'hierarchy',
        confidence: 0.7 + (0.05 * Math.min(nestedObjects.length, 6)), // Increase confidence with more nested objects
        elements: nestedObjects
      };
    }
    
    // Check for structural hierarchies (paragraphs -> sentences -> words)
    const structuralFeatures = features.filter(f => f.type === 'structural');
    if (structuralFeatures.length >= 2) {
      const hasMultiLevelStructure = structuralFeatures.some(f => f.name === 'paragraphs') &&
                                   structuralFeatures.some(f => f.name === 'sentences');
      
      if (hasMultiLevelStructure) {
        return {
          type: 'text-hierarchy',
          confidence: 0.85,
          elements: structuralFeatures
        };
      }
    }
    
    return null;
  }
  
  /**
   * Detect cluster patterns in features
   */
  private detectClusterPatterns(features: any[]): SpatialPattern[] {
    const patterns: SpatialPattern[] = [];
    
    // Look for type-based clusters
    const typeGroups: Record<string, any[]> = {};
    features.forEach(feature => {
      if (!typeGroups[feature.type]) {
        typeGroups[feature.type] = [];
      }
      typeGroups[feature.type].push(feature);
    });
    
    // Create cluster patterns for significant type groups
    Object.entries(typeGroups).forEach(([type, elements]) => {
      if (elements.length >= this.options.patternDetectionThresholds!.minElements) {
        patterns.push({
          type: 'cluster',
          confidence: 0.65 + (0.05 * Math.min(elements.length, 7)),
          elements,
          clusterType: type
        });
      }
    });
    
    return patterns;
  }
  
  /**
   * Detect network patterns in features
   */
  private detectNetworkPattern(features: any[]): SpatialPattern | null {
    // Look for relationship features
    const relationshipFeatures = features.filter(f => 
      (f.type === 'property' && f.name.includes('relation')) ||
      (f.type === 'structural' && f.relationships) ||
      (f.type === 'domain-specific' && f.connections)
    );
    
    if (relationshipFeatures.length >= this.options.patternDetectionThresholds!.minElements) {
      return {
        type: 'network',
        confidence: 0.7,
        elements: relationshipFeatures
      };
    }
    
    return null;
  }
  
  /**
   * Detect domain-specific spatial patterns
   */
  private detectDomainSpatialPatterns(features: any[], originalInput: any): SpatialPattern[] {
    const patterns: SpatialPattern[] = [];
    
    // Healthcare domain patterns
    const healthcareFeatures = features.filter(f => 
      f.domain === 'healthcare' || 
      (f.type === 'property' && ['symptoms', 'diagnosis', 'treatment'].includes(f.name))
    );
    
    if (healthcareFeatures.length >= 2) {
      patterns.push({
        type: 'medical-assessment',
        confidence: 0.8,
        elements: healthcareFeatures
      });
    }
    
    // Education domain patterns
    const educationFeatures = features.filter(f => 
      f.domain === 'education' || 
      (f.type === 'property' && ['students', 'scores', 'curriculum'].includes(f.name))
    );
    
    if (educationFeatures.length >= 2) {
      patterns.push({
        type: 'educational-structure',
        confidence: 0.75,
        elements: educationFeatures
      });
    }
    
    return patterns;
  }
  
  /**
   * Process features through the form of time - organizing data temporally
   * Analogous to Kant's a priori form of time
   * 
   * @param features Extracted features from input
   * @param originalInput The original input (for context)
   * @returns Temporal analysis of the data
   */
  private processTemporal(features: any[], originalInput: any): TemporalAnalysis {
    // Determine temporal complexity based on sequential structure
    const temporalDimension = features.length > 12 ? "extended" : 
                             features.length > 5 ? "moderate" : "brief";
    
    let temporalStructure = `Analyzed ${features.length} features in temporal sequence`;
    
    // Detect temporal patterns if enabled
    let patterns: TemporalPattern[] = [];
    
    if (this.options.enableTemporalPatterns) {
      patterns = this.detectTemporalPatterns(features, originalInput);
      
      if (patterns.length > 0) {
        temporalStructure += ` with ${patterns.length} recognized temporal patterns`;
      }
    }
    
    return {
      temporalStructure,
      sequenceLength: features.length,
      temporalDimension,
      patterns: patterns.length > 0 ? patterns : undefined
    };
  }
  
  /**
   * Detect temporal patterns in features
   * Temporal patterns represent relationships that exist in sequence
   */
  private detectTemporalPatterns(features: any[], originalInput: any): TemporalPattern[] {
    const patterns: TemporalPattern[] = [];
    const thresholds = this.options.patternDetectionThresholds!;
    
    // Look for sequential patterns (ordered steps)
    const sequencePattern = this.detectSequentialPattern(features);
    if (sequencePattern && sequencePattern.confidence >= thresholds.confidence) {
      patterns.push(sequencePattern);
    }
    
    // Look for cyclical patterns (repeating elements)
    const cyclicalPattern = this.detectCyclicalPattern(features);
    if (cyclicalPattern && cyclicalPattern.confidence >= thresholds.confidence) {
      patterns.push(cyclicalPattern);
    }
    
    // Look for trend patterns (increasing/decreasing values)
    const trendPatterns = this.detectTrendPatterns(features);
    patterns.push(...trendPatterns.filter(p => p.confidence >= thresholds.confidence));
    
    // Add domain-specific temporal patterns
    const domainPatterns = this.detectDomainTemporalPatterns(features, originalInput);
    patterns.push(...domainPatterns.filter(p => p.confidence >= thresholds.confidence));
    
    // Limit to max patterns
    return patterns.slice(0, thresholds.maxPatterns);
  }
  
  /**
   * Detect sequential patterns in features
   */
  private detectSequentialPattern(features: any[]): TemporalPattern | null {
    // Check for explicit sequence indicators
    const sequenceIndicators = features.filter(f => 
      (f.type === 'structural' && f.name === 'sentences') ||
      (f.type === 'structural' && f.name === 'paragraphs') ||
      (f.name && (f.name.includes('step') || f.name.includes('sequence')))
    );
    
    if (sequenceIndicators.length > 0) {
      return {
        type: 'sequence',
        confidence: 0.75,
        elements: sequenceIndicators
      };
    }
    
    // Look for ordered numerical properties
    const numericalFeatures = features.filter(f => 
      f.type === 'numerical' || f.type === 'property-numerical'
    );
    
    if (numericalFeatures.length >= this.options.patternDetectionThresholds!.minElements) {
      return {
        type: 'sequence',
        confidence: 0.65,
        elements: numericalFeatures
      };
    }
    
    return null;
  }
  
  /**
   * Detect cyclical patterns in features
   */
  private detectCyclicalPattern(features: any[]): TemporalPattern | null {
    // Look for repeating elements or explicit cycle indicators
    const cycleIndicators = features.filter(f => 
      (f.name && (f.name.includes('cycle') || f.name.includes('period') || f.name.includes('repeat'))) ||
      (f.type === 'property' && f.name.includes('recur'))
    );
    
    if (cycleIndicators.length > 0) {
      return {
        type: 'cycle',
        confidence: 0.7,
        elements: cycleIndicators
      };
    }
    
    // Check for temporal terms that might indicate cycles
    const temporalFeatures = features.filter(f => 
      (f.type === 'property-lexical' && f.values && 
       f.values.some((v: string) => 
         ['daily', 'weekly', 'monthly', 'yearly', 'recurring'].some(term => 
           v.toLowerCase().includes(term)
         )
       ))
    );
    
    if (temporalFeatures.length > 0) {
      return {
        type: 'cycle',
        confidence: 0.8,
        elements: temporalFeatures
      };
    }
    
    return null;
  }
  
  /**
   * Detect trend patterns in features
   */
  private detectTrendPatterns(features: any[]): TemporalPattern[] {
    const patterns: TemporalPattern[] = [];
    
    // Look for numerical features that might show trends
    const numericalFeatures = features.filter(f => 
      f.type === 'numerical' || f.type === 'property-numerical'
    );
    
    numericalFeatures.forEach(feature => {
      if (feature.values || (feature.min !== undefined && feature.max !== undefined)) {
        const values = feature.values || [];
        
        // Check for increasing trend
        const isIncreasing = values.length > 2 && 
          values.slice(1).every((v: number, i: number) => v >= values[i]);
        
        // Check for decreasing trend
        const isDecreasing = values.length > 2 && 
          values.slice(1).every((v: number, i: number) => v <= values[i]);
        
        if (isIncreasing || isDecreasing) {
          patterns.push({
            type: 'trend',
            confidence: 0.75,
            elements: [feature],
            trendDirection: isIncreasing ? 'increasing' : 'decreasing'
          });
        }
      }
    });
    
    return patterns;
  }
  
  /**
   * Detect domain-specific temporal patterns
   */
  private detectDomainTemporalPatterns(features: any[], originalInput: any): TemporalPattern[] {
    const patterns: TemporalPattern[] = [];
    
    // Healthcare domain - illness progression
    const healthcareTemporalFeatures = features.filter(f => 
      (f.domain === 'healthcare' && f.symptoms) ||
      (f.type === 'property' && ['progression', 'history', 'course'].some(term => f.name.includes(term)))
    );
    
    if (healthcareTemporalFeatures.length >= 2) {
      patterns.push({
        type: 'medical-progression',
        confidence: 0.8,
        elements: healthcareTemporalFeatures
      });
    }
    
    // Education domain - learning sequence
    const educationTemporalFeatures = features.filter(f => 
      f.domain === 'education' || 
      (f.type === 'property' && ['curriculum', 'course', 'progress'].some(term => f.name.includes(term)))
    );
    
    if (educationTemporalFeatures.length >= 2) {
      patterns.push({
        type: 'learning-sequence',
        confidence: 0.75,
        elements: educationTemporalFeatures
      });
    }
    
    return patterns;
  }
}
