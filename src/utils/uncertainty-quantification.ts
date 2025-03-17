case 'discrete':
        return points.map(x => this.discreteCDF(
          x,
          distribution.parameters.values ?? [],
          distribution.parameters.probabilities ?? []
        ));
        
      case 'custom':
        // For custom distributions, we need to use numerical integration
        // of the PDF to compute the CDF
        if (distribution.parameters.distributionFunction) {
          return points.map(x => {
            // Use simple numerical integration (trapezoidal rule)
            const lowerBound = -10; // Arbitrary lower bound
            const steps = 1000;
            const stepSize = (x - lowerBound) / steps;
            let sum = 0;
            
            for (let i = 0; i < steps; i++) {
              const x1 = lowerBound + i * stepSize;
              const x2 = x1 + stepSize;
              const y1 = distribution.parameters.distributionFunction!(x1);
              const y2 = distribution.parameters.distributionFunction!(x2);
              
              sum += (y1 + y2) * stepSize / 2;
            }
            
            return Math.max(0, Math.min(1, sum));
          });
        } else {
          throw new Error("Custom distribution requires a distributionFunction");
        }
        
      default:
        throw new Error(`Unsupported distribution type: ${distribution.type}`);
    }
  }
  
  /**
   * Generate verbal expression of probability
   * 
   * @param probability Probability value (0-1)
   * @param style Style of expression ('precise' | 'conversational' | 'technical')
   * @returns Verbal expression of the probability
   */
  public verbalProbability(
    probability: number,
    style: 'precise' | 'conversational' | 'technical' = 'conversational'
  ): string {
    // Ensure probability is in valid range
    probability = Math.max(0, Math.min(1, probability));
    
    switch (style) {
      case 'precise':
        // Return percentage with appropriate precision
        if (probability > 0.999) return "greater than 99.9%";
        if (probability < 0.001) return "less than 0.1%";
        
        // Adjust decimal places based on probability magnitude
        if (probability > 0.1) {
          return `${(probability * 100).toFixed(1)}%`;
        } else {
          return `${(probability * 100).toFixed(2)}%`;
        }
        
      case 'technical':
        // Technical style includes both percentage and description
        const qualitative = this.translateConfidenceToQualitative(probability);
        return `${(probability * 100).toFixed(1)}% (${qualitative})`;
        
      case 'conversational':
      default:
        // Map to qualitative expressions
        if (probability >= 0.99) return "virtually certain";
        if (probability >= 0.95) return "extremely likely";
        if (probability >= 0.9) return "very likely";
        if (probability >= 0.8) return "likely";
        if (probability >= 0.7) return "more likely than not";
        if (probability >= 0.6) return "somewhat likely";
        if (probability >= 0.4) return "about as likely as not";
        if (probability >= 0.3) return "somewhat unlikely";
        if (probability >= 0.2) return "unlikely";
        if (probability >= 0.1) return "very unlikely";
        if (probability >= 0.05) return "extremely unlikely";
        return "virtually impossible";
    }
  }
  
  /**
   * Generate key uncertainty statistics for a distribution
   * 
   * @param distribution Probability distribution
   * @returns Object containing key statistics
   */
  public calculateDistributionStatistics(
    distribution: UncertaintyDistribution
  ): {
    mean: number;
    median: number;
    mode: number | number[];
    variance: number;
    standardDeviation: number;
    skewness?: number;
    kurtosis?: number;
    confidenceInterval: ConfidenceInterval;
  } {
    let mean: number;
    let median: number;
    let mode: number | number[];
    let variance: number;
    let standardDeviation: number;
    let skewness: number | undefined;
    let kurtosis: number | undefined;
    
    switch (distribution.type) {
      case 'normal': {
        const params = distribution.parameters;
        mean = params.mean ?? 0;
        median = mean;
        mode = mean;
        variance = (params.stdDev ?? 1) ** 2;
        standardDeviation = params.stdDev ?? 1;
        skewness = 0;
        kurtosis = 3;
        break;
      }
      
      case 'uniform': {
        const params = distribution.parameters;
        const a = params.min ?? 0;
        const b = params.max ?? 1;
        mean = (a + b) / 2;
        median = mean;
        mode = []; // Technically all values are equally likely
        variance = (b - a) ** 2 / 12;
        standardDeviation = Math.sqrt(variance);
        skewness = 0;
        kurtosis = 9/5;
        break;
      }
      
      case 'triangular': {
        const params = distribution.parameters;
        const a = params.min ?? 0;
        const c = params.mode ?? 0.5;
        const b = params.max ?? 1;
        mean = (a + b + c) / 3;
        // Median calculation for triangular distribution
        if (c >= (a + b) / 2) {
          median = a + Math.sqrt((b - a) * (c - a) / 2);
        } else {
          median = b - Math.sqrt((b - a) * (b - c) / 2);
        }
        mode = c;
        variance = (a**2 + b**2 + c**2 - a*b - a*c - b*c) / 18;
        standardDeviation = Math.sqrt(variance);
        skewness = Math.sqrt(2) * (a + b - 2*c) * (2*a - b - c) * (a - 2*b + c) / 
                   (5 * (a**2 + b**2 + c**2 - a*b - a*c - b*c)**(3/2));
        break;
      }
      
      case 'beta': {
        const params = distribution.parameters;
        const alpha = params.alpha ?? 1;
        const beta = params.beta ?? 1;
        mean = alpha / (alpha + beta);
        // Mode calculation for beta distribution
        if (alpha > 1 && beta > 1) {
          mode = (alpha - 1) / (alpha + beta - 2);
        } else if (alpha === 1 && beta === 1) {
          mode = []; // Uniform distribution
        } else if (alpha < 1 && beta < 1) {
          mode = [0, 1]; // U-shaped with modes at extremes
        } else if (alpha === 1 && beta < 1) {
          mode = 0;
        } else if (alpha < 1 && beta === 1) {
          mode = 1;
        } else if (alpha < 1 && beta > 1) {
          mode = 0;
        } else {
          mode = 1;
        }
        
        // Median calculation for beta - approximation
        median = this.calculateBetaQuantile(0.5, alpha, beta);
        
        variance = (alpha * beta) / ((alpha + beta)**2 * (alpha + beta + 1));
        standardDeviation = Math.sqrt(variance);
        skewness = 2 * (beta - alpha) * Math.sqrt(alpha + beta + 1) / 
                  ((alpha + beta + 2) * Math.sqrt(alpha * beta));
        break;
      }
      
      case 'discrete': {
        const params = distribution.parameters;
        const values = params.values ?? [];
        const probabilities = params.probabilities ?? [];
        
        if (values.length !== probabilities.length || values.length === 0) {
          throw new Error('Discrete distribution requires equal-length values and probabilities arrays');
        }
        
        // Calculate mean
        mean = values.reduce((sum, value, i) => sum + value * probabilities[i], 0);
        
        // Calculate mode (value with highest probability)
        let maxProb = -1;
        let modeIndex = -1;
        let modeValues: number[] = [];
        
        for (let i = 0; i < probabilities.length; i++) {
          if (probabilities[i] > maxProb) {
            maxProb = probabilities[i];
            modeIndex = i;
            modeValues = [values[i]];
          } else if (probabilities[i] === maxProb) {
            modeValues.push(values[i]);
          }
        }
        
        mode = modeValues.length === 1 ? modeValues[0] : modeValues;
        
        // Calculate median
        // Sort values and corresponding probabilities
        const pairs = values.map((value, i) => ({value, probability: probabilities[i]}));
        pairs.sort((a, b) => a.value - b.value);
        
        // Calculate cumulative probabilities
        let cumulativeProbability = 0;
        const cumulativeProbabilities = pairs.map(pair => {
          cumulativeProbability += pair.probability;
          return {value: pair.value, cumulativeProbability};
        });
        
        // Find median
        median = this.findDiscreteQuantile(cumulativeProbabilities, 0.5);
        
        // Calculate variance
        variance = values.reduce((sum, value, i) => 
          sum + (value - mean)**2 * probabilities[i], 0);
        
        standardDeviation = Math.sqrt(variance);
        
        // Calculate skewness
        skewness = values.reduce((sum, value, i) => 
          sum + ((value - mean) / standardDeviation)**3 * probabilities[i], 0);
        
        // Calculate kurtosis
        kurtosis = values.reduce((sum, value, i) => 
          sum + ((value - mean) / standardDeviation)**4 * probabilities[i], 0);
        
        break;
      }
      
      case 'custom': {
        // For custom distributions, use numerical methods
        if (!distribution.parameters.distributionFunction) {
          throw new Error('Custom distribution requires a distributionFunction');
        }
        
        // Generate samples for numerical calculations
        const samples = this.generateCustomDistributionSamples(
          distribution.parameters.distributionFunction,
          this.config.monteCarloSamples
        );
        
        // Calculate statistics from samples
        mean = samples.reduce((sum, x) => sum + x, 0) / samples.length;
        
        // Calculate median
        samples.sort((a, b) => a - b);
        const midpoint = Math.floor(samples.length / 2);
        median = samples.length % 2 === 0 
          ? (samples[midpoint - 1] + samples[midpoint]) / 2
          : samples[midpoint];
        
        // For mode, use kernel density estimation (simplified)
        mode = this.estimateModeFromSamples(samples);
        
        // Calculate variance
        variance = samples.reduce((sum, x) => sum + (x - mean)**2, 0) / samples.length;
        standardDeviation = Math.sqrt(variance);
        
        // Calculate skewness
        skewness = samples.reduce((sum, x) => 
          sum + ((x - mean) / standardDeviation)**3, 0) / samples.length;
        
        // Calculate kurtosis
        kurtosis = samples.reduce((sum, x) => 
          sum + ((x - mean) / standardDeviation)**4, 0) / samples.length;
        
        break;
      }
      
      default:
        throw new Error(`Unsupported distribution type: ${distribution.type}`);
    }
    
    // Calculate 95% confidence interval
    const confidenceInterval = this.calculateConfidenceInterval(distribution, 0.95);
    
    return {
      mean,
      median,
      mode,
      variance,
      standardDeviation,
      skewness,
      kurtosis,
      confidenceInterval
    };
  }
  
  /**
   * Validate distribution parameters
   * 
   * @param type Distribution type
   * @param parameters Distribution parameters
   */
  private validateDistributionParameters(
    type: UncertaintyDistribution['type'],
    parameters: UncertaintyDistribution['parameters']
  ): void {
    switch (type) {
      case 'normal':
        if (parameters.stdDev !== undefined && parameters.stdDev <= 0) {
          throw new Error('Standard deviation must be positive');
        }
        break;
        
      case 'uniform':
        if (parameters.min === undefined || parameters.max === undefined) {
          throw new Error('Uniform distribution requires min and max parameters');
        }
        if (parameters.min >= parameters.max) {
          throw new Error('Min must be less than max for uniform distribution');
        }
        break;
        
      case 'triangular':
        if (parameters.min === undefined || parameters.max === undefined || parameters.mode === undefined) {
          throw new Error('Triangular distribution requires min, mode, and max parameters');
        }
        if (parameters.min > parameters.mode || parameters.mode > parameters.max) {
          throw new Error('Parameters must satisfy min ≤ mode ≤ max for triangular distribution');
        }
        break;
        
      case 'beta':
        if (parameters.alpha === undefined || parameters.beta === undefined) {
          throw new Error('Beta distribution requires alpha and beta parameters');
        }
        if (parameters.alpha <= 0 || parameters.beta <= 0) {
          throw new Error('Alpha and beta must be positive for beta distribution');
        }
        break;
        
      case 'discrete':
        if (!parameters.values || !parameters.probabilities) {
          throw new Error('Discrete distribution requires values and probabilities arrays');
        }
        if (parameters.values.length !== parameters.probabilities.length) {
          throw new Error('Values and probabilities arrays must have the same length');
        }
        if (parameters.values.length === 0) {
          throw new Error('Values array must not be empty');
        }
        if (parameters.probabilities.some(p => p < 0)) {
          throw new Error('Probabilities must be non-negative');
        }
        const probabilitySum = parameters.probabilities.reduce((sum, p) => sum + p, 0);
        if (Math.abs(probabilitySum - 1) > 1e-10) {
          throw new Error('Probabilities must sum to 1');
        }
        break;
        
      case 'custom':
        if (!parameters.distributionFunction) {
          throw new Error('Custom distribution requires a distributionFunction');
        }
        break;
    }
  }
  
  /**
   * Normalize source contributions to sum to 1
   * 
   * @param sources Uncertainty sources to normalize
   * @returns Normalized uncertainty sources
   */
  private normalizeSourceContributions(
    sources: UncertaintySource[]
  ): UncertaintySource[] {
    if (sources.length === 0) {
      return [];
    }
    
    const totalContribution = sources.reduce((sum, source) => sum + source.contribution, 0);
    
    // If total is already close to 1, no normalization needed
    if (Math.abs(totalContribution - 1) < 0.001) {
      return sources;
    }
    
    // Normalize contributions
    return sources.map(source => ({
      ...source,
      contribution: source.contribution / totalContribution
    }));
  }
  
  /**
   * Generate uncertainty explanation
   * 
   * @param confidence Overall confidence value
   * @param sources Sources of uncertainty
   * @param distribution Optional probability distribution
   * @param confidenceInterval Optional confidence interval
   * @param detail Level of detail for the explanation
   * @returns Natural language explanation of uncertainty
   */
  private generateUncertaintyExplanation(
    confidence: number,
    sources: UncertaintySource[],
    distribution?: UncertaintyDistribution,
    confidenceInterval?: ConfidenceInterval,
    detail: 'brief' | 'standard' | 'detailed' = 'standard'
  ): string {
    let explanation = '';
    
    // Sort sources by contribution
    const sortedSources = [...sources].sort((a, b) => b.contribution - a.contribution);
    
    // Generate explanation based on detail level
    switch (detail) {
      case 'brief':
        explanation = `Confidence level: ${this.verbalProbability(confidence, 'technical')}. `;
        
        if (sortedSources.length > 0) {
          explanation += `Main source of uncertainty: ${sortedSources[0].description}.`;
        }
        break;
        
      case 'detailed':
        explanation = `Overall confidence is ${this.verbalProbability(confidence, 'technical')}. `;
        
        if (confidenceInterval) {
          const units = confidenceInterval.units ? ` ${confidenceInterval.units}` : '';
          explanation += `The ${(confidenceInterval.confidenceLevel * 100).toFixed(0)}% confidence interval ranges from ${confidenceInterval.lower.toFixed(2)} to ${confidenceInterval.upper.toFixed(2)}${units}. `;
        }
        
        if (distribution) {
          // Add distribution statistics
          const stats = this.calculateDistributionStatistics(distribution);
          explanation += `Distribution characteristics: mean = ${stats.mean.toFixed(2)}, median = ${stats.median.toFixed(2)}, standard deviation = ${stats.standardDeviation.toFixed(2)}. `;
        }
        
        // Explain sources of uncertainty in detail
        if (sortedSources.length > 0) {
          explanation += `Sources of uncertainty include: `;
          
          sortedSources.forEach((source, index) => {
            const contributionPercent = (source.contribution * 100).toFixed(1);
            explanation += `${source.description} (${contributionPercent}% contribution, ${source.reducible ? 'potentially reducible' : 'irreducible'})`;
            
            // Add reduction approaches if available
            if (source.reducible && source.reductionApproaches && source.reductionApproaches.length > 0) {
              explanation += ` - could be reduced by ${source.reductionApproaches.join(', ')}`;
            }
            
            if (index < sortedSources.length - 1) {
              explanation += `; `;
            } else {
              explanation += `. `;
            }
          });
        }
        break;
        
      case 'standard':
      default:
        explanation = `Confidence level: ${this.verbalProbability(confidence, 'technical')}. `;
        
        if (confidenceInterval) {
          const units = confidenceInterval.units ? ` ${confidenceInterval.units}` : '';
          explanation += `The ${(confidenceInterval.confidenceLevel * 100).toFixed(0)}% confidence interval is ${confidenceInterval.lower.toFixed(2)} to ${confidenceInterval.upper.toFixed(2)}${units}. `;
        }
        
        // Include top sources
        const numSources = Math.min(this.config.minSourcesInExplanation, sortedSources.length);
        if (numSources > 0) {
          explanation += `Key sources of uncertainty: `;
          
          for (let i = 0; i < numSources; i++) {
            const source = sortedSources[i];
            const contributionPercent = (source.contribution * 100).toFixed(0);
            explanation += `${source.description} (${contributionPercent}%)`;
            
            if (i < numSources - 1) {
              explanation += `, `;
            } else {
              explanation += `. `;
            }
          }
        }
    }
    
    return explanation;
  }
  
  /**
   * Calculate Z-score for a confidence level
   * 
   * @param confidenceLevel Confidence level (0-1)
   * @returns Z-score
   */
  private calculateZScore(confidenceLevel: number): number {
    // Implementation of inverse error function
    // Used to calculate z-score from confidence level
    
    const p = 1 - (1 - confidenceLevel) / 2; // Convert to one-sided probability
    
    // Approximation of inverse error function
    const a = 0.147;
    const y = Math.sqrt(-Math.log(4 * p * (1 - p)));
    const z = y + a * y**3;
    
    // Convert to z-score
    return z * Math.SQRT2;
  }
  
  /**
   * Calculate triangular distribution quantile
   * 
   * @param p Probability (0-1)
   * @param min Minimum value
   * @param mode Mode (most likely value)
   * @param max Maximum value
   * @returns Quantile of the triangular distribution
   */
  private calculateTriangularQuantile(
    p: number,
    min: number,
    mode: number,
    max: number
  ): number {
    // Calculate F(mode), probability at the mode
    const F_mode = (mode - min) / (max - min);
    
    if (p <= F_mode) {
      // Left side of the triangle
      return min + Math.sqrt(p * (max - min) * (mode - min));
    } else {
      // Right side of the triangle
      return max - Math.sqrt((1 - p) * (max - min) * (max - mode));
    }
  }
  
  /**
   * Find quantile in discrete distribution
   * 
   * @param cumulativeProbabilities Array of cumulative probabilities
   * @param p Probability (0-1)
   * @returns Quantile of the discrete distribution
   */
  private findDiscreteQuantile(
    cumulativeProbabilities: {value: number, cumulativeProbability: number}[],
    p: number
  ): number {
    // Find the first value where cumulative probability exceeds p
    for (let i = 0; i < cumulativeProbabilities.length; i++) {
      if (cumulativeProbabilities[i].cumulativeProbability >= p) {
        return cumulativeProbabilities[i].value;
      }
    }
    
    // If not found, return the last value
    return cumulativeProbabilities[cumulativeProbabilities.length - 1].value;
  }
  
  /**
   * Calculate beta distribution quantile
   * 
   * @param p Probability (0-1)
   * @param alpha Alpha parameter
   * @param beta Beta parameter
   * @returns Quantile of the beta distribution
   */
  private calculateBetaQuantile(
    p: number,
    alpha: number,
    beta: number
  ): number {
    // Use numerical approximation for beta quantile
    // Newton's method to find x where betaCDF(x) = p
    
    // Initial guess
    let x = p;
    
    // Iterate to convergence
    for (let i = 0; i < 20; i++) {
      const cdf = this.betaCDF(x, alpha, beta);
      const pdf = this.betaPDF(x, alpha, beta);
      
      // Update estimate
      const dx = (cdf - p) / pdf;
      x = x - dx;
      
      // Ensure x remains in [0, 1]
      x = Math.max(0.0001, Math.min(0.9999, x));
      
      // Check for convergence
      if (Math.abs(dx) < 1e-6) {
        break;
      }
    }
    
    return x;
  }
  
  /**
   * Find highest density interval for beta distribution
   * 
   * @param alpha Alpha parameter
   * @param beta Beta parameter
   * @param probability Desired probability mass (0-1)
   * @returns Highest density interval
   */
  private findHDIForBeta(
    alpha: number,
    beta: number,
    probability: number
  ): {lower: number, upper: number} {
    // Implementation of algorithm to find HDI for beta distribution
    // Based on searching for narrowest interval containing the desired probability mass
    
    // Calculate mode (starting point for search)
    const mode = (alpha - 1) / (alpha + beta - 2);
    
    // Function to evaluate interval width for a given density
    const evaluateWidth = (density: number): {width: number, lower: number, upper: number} => {
      // Find points where PDF equals density
      const findPoints = (): number[] => {
        const points: number[] = [];
        
        // Create grid of points for initial search
        const grid = Array.from({length: 100}, (_, i) => i / 99);
        
        for (let i = 0; i < grid.length - 1; i++) {
          const x1 = grid[i];
          const x2 = grid[i + 1];
          const y1 = this.betaPDF(x1, alpha, beta);
          const y2 = this.betaPDF(x2, alpha, beta);
          
          // If density level crossed, find crossing point
          if ((y1 - density) * (y2 - density) <= 0) {
            // Use linear interpolation to find crossing
            const x = x1 + (x2 - x1) * Math.abs(y1 - density) / Math.abs(y1 - y2);
            points.push(x);
          }
        }
        
        return points;
      };
      
      const points = findPoints();
      
      // If fewer than 2 points found, try different density
      if (points.length < 2) {
        return {width: Infinity, lower: 0, upper: 1};
      }
      
      // Calculate probability mass between each pair of points
      let bestWidth = Infinity;
      let bestLower = 0;
      let bestUpper = 1;
      
      for (let i = 0; i < points.length - 1; i++) {
        const lower = points[i];
        const upper = points[i + 1];
        const mass = this.betaCDF(upper, alpha, beta) - this.betaCDF(lower, alpha, beta);
        
        // If this interval contains required mass and is narrower, update
        if (mass >= probability && upper - lower < bestWidth) {
          bestWidth = upper - lower;
          bestLower = lower;
          bestUpper = upper;
        }
      }
      
      return {width: bestWidth, lower: bestLower, upper: bestUpper};
    };
    
    // Binary search for optimal density level
    let lowerDensity = 0;
    let upperDensity = this.betaPDF(mode, alpha, beta);
    let bestResult = {width: Infinity, lower: 0, upper: 1};
    
    for (let i = 0; i < 20; i++) {
      const midDensity = (lowerDensity + upperDensity) / 2;
      const result = evaluateWidth(midDensity);
      
      // Update best result if this is better
      if (result.width < bestResult.width) {
        bestResult = result;
      }
      
      // Calculate mass for slightly higher/lower density
      const higherResult = evaluateWidth(midDensity * 1.01);
      const lowerResult = evaluateWidth(midDensity * 0.99);
      
      // Adjust search range based on which direction improves
      if (higherResult.width < lowerResult.width) {
        lowerDensity = midDensity;
      } else {
        upperDensity = midDensity;
      }
    }
    
    return {lower: bestResult.lower, upper: bestResult.upper};
  }
  
  /**
   * Generate samples from a custom distribution
   * 
   * @param distributionFunction Custom distribution function
   * @param numSamples Number of samples to generate
   * @returns Array of samples
   */
  private generateCustomDistributionSamples(
    distributionFunction: (x: number) => number,
    numSamples: number
  ): number[] {
    // Implementation using rejection sampling
    // First, find approximate range of the distribution
    
    // Search for reasonable bounds
    let lowerBound = -10;
    let upperBound = 10;
    const stepSize = 0.1;
    let maxDensity = 0;
    
    // Scan for reasonable bounds and maximum density
    for (let x = lowerBound; x <= upperBound; x += stepSize) {
      const density = distributionFunction(x);
      maxDensity = Math.max(maxDensity, density);
      
      // Expand bounds if significant density at boundaries
      if (x === lowerBound && density > 0.01 * maxDensity) {
        lowerBound -= 10;
        x = lowerBound - stepSize;
      }
      
      if (x === upperBound && density > 0.01 * maxDensity) {
        upperBound += 10;
      }
    }
    
    // Add safety margin to max density
    maxDensity *= 1.1;
    
    // Generate samples using rejection sampling
    const samples: number[] = [];
    
    while (samples.length < numSamples) {
      // Generate random x within bounds
      const x = lowerBound + Math.random() * (upperBound - lowerBound);
      
      // Generate random y up to max density
      const y = Math.random() * maxDensity;
      
      // Accept if y is below density at x
      if (y <= distributionFunction(x)) {
        samples.push(x);
      }
    }
    
    return samples;
  }
  
  /**
   * Estimate mode from samples using kernel density estimation
   * 
   * @param samples Array of samples
   * @returns Estimated mode(s)
   */
  private estimateModeFromSamples(samples: number[]): number | number[] {
    // Simple implementation of kernel density estimation for mode finding
    // Use histogram approach for simplicity
    
    // Determine range
    const min = Math.min(...samples);
    const max = Math.max(...samples);
    const range = max - min;
    
    // Create histogram bins
    const numBins = Math.min(100, Math.ceil(Math.sqrt(samples.length)));
    const binWidth = range / numBins;
    const bins = Array(numBins).fill(0);
    
    // Fill histogram
    for (const sample of samples) {
      const binIndex = Math.min(numBins - 1, Math.floor((sample - min) / binWidth));
      bins[binIndex]++;
    }
    
    // Find bin(s) with maximum count
    const maxCount = Math.max(...bins);
    const maxBins: number[] = [];
    
    for (let i = 0; i < bins.length; i++) {
      if (bins[i] === maxCount) {
        maxBins.push(i);
      }
    }
    
    // Convert bin indices to values
    const modes = maxBins.map(bin => min + (bin + 0.5) * binWidth);
    
    return modes.length === 1 ? modes[0] : modes;
  }
  
  /**
   * Normal distribution PDF
   */
  private normalPDF(x: number, mean: number, stdDev: number): number {
    const z = (x - mean) / stdDev;
    return Math.exp(-0.5 * z * z) / (stdDev * Math.sqrt(2 * Math.PI));
  }
  
  /**
   * Normal distribution CDF
   */
  private normalCDF(x: number, mean: number, stdDev: number): number {
    // Implementation of error function approximation
    const z = (x - mean) / (stdDev * Math.SQRT2);
    return 0.5 * (1 + this.erf(z));
  }
  
  /**
   * Error function approximation
   */
  private erf(x: number): number {
    // Abramowitz and Stegun approximation
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    
    // Constants
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    
    // Formula
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
    return sign * y;
  }
  
  /**
   * Uniform distribution PDF
   */
  private uniformPDF(x: number, min: number, max: number): number {
    if (x < min || x > max) {
      return 0;
    }
    return 1 / (max - min);
  }
  
  /**
   * Uniform distribution CDF
   */
  private uniformCDF(x: number, min: number, max: number): number {
    if (x < min) {
      return 0;
    }
    if (x > max) {
      return 1;
    }
    return (x - min) / (max - min);
  }
  
  /**
   * Triangular distribution PDF
   */
  private triangularPDF(x: number, min: number, mode: number, max: number): number {
    if (x < min || x > max) {
      return 0;
    }
    
    if (x <= mode) {
      return 2 * (x - min) / ((max - min) * (mode - min));
    } else {
      return 2 * (max - x) / ((max - min) * (max - mode));
    }
  }
  
  /**
   * Triangular distribution CDF
   */
  private triangularCDF(x: number, min: number, mode: number, max: number): number {
    if (x <= min) {
      return 0;
    }
    if (x >= max) {
      return 1;
    }
    
    if (x <= mode) {
      return ((x - min) ** 2) / ((max - min) * (mode - min));
    } else {
      return 1 - ((max - x) ** 2) / ((max - min) * (max - mode));
    }
  }
  
  /**
   * Beta distribution PDF
   */
  private betaPDF(x: number, alpha: number, beta: number): number {
    if (x <= 0 || x >= 1) {
      return 0;
    }
    
    // Calculate log of beta PDF to avoid numerical issues
    const logPDF = (alpha - 1) * Math.log(x) + 
                   (beta - 1) * Math.log(1 - x) - 
                   this.logBeta(alpha, beta);
    
    return Math.exp(logPDF);
  }
  
  /**
   * Beta distribution CDF
   */
  private betaCDF(x: number, alpha: number, beta: number): number {
    if (x <= 0) {
      return 0;
    }
    if (x >= 1) {
      return 1;
    }
    
    // Use incomplete beta function
    return this.incompleteBeta(x, alpha, beta);
  }
  
  /**
   * Logarithm of the beta function
   */
  private logBeta(alpha: number, beta: number): number {
    return this.logGamma(alpha) + this.logGamma(beta) - this.logGamma(alpha + beta);
  }
  
  /**
   * Logarithm of the gamma function
   */
  private logGamma(x: number): number {
    // Lanczos approximation coefficients
    const p = [
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.13857109526572012,
      9.9843695780195716e-6,
      1.5056327351493116e-7
    ];
    
    // Reflection formula for x < 0.5
    if (x < 0.5) {
      return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * x)) - this.logGamma(1 - x);
    }
    
    // Shift x down by 1 for formula
    x -= 1;
    
    let a = 0.99999999999980993;
    for (let i = 0; i < p.length; i++) {
      a += p[i] / (x + i + 1);
    }
    
    const t = x + p.length - 0.5;
    return Math.log(Math.sqrt(2 * Math.PI)) + Math.log(a) - t + (x + 0.5) * Math.log(t);
  }
  
  /**
   * Incomplete beta function (regularized)
   */
  private incompleteBeta(x: number, a: number, b: number): number {
    // Use continued fraction representation for numerical stability
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    
    // Use series expansion for small x and large a
    if (x < (a + 1) / (a + b + 2)) {
      return this.incompleteBetaSeries(x, a, b);
    } else {
      // Use symmetry relation for large x
      return 1 - this.incompleteBetaSeries(1 - x, b, a);
    }
  }
  
  /**
   * Incomplete beta function using series expansion
   */
  private incompleteBetaSeries(x: number, a: number, b: number): number {
    // Power series expansion of incomplete beta
    const max_iterations = 1000;
    const epsilon = 1e-10;
    
    const bt = Math.exp(
      this.logGamma(a + b) - this.logGamma(a) - this.logGamma(b) +
      a * Math.log(x) + b * Math.log(1 - x)
    );
    
    if (x === 0) {
      return 0;
    }
    
    let c = 1;
    let d = 1 - (a + b) * x / (a + 1);
    if (Math.abs(d) < epsilon) {
      d = epsilon;
    }
    d = 1 / d;
    let h = d;
    
    for (let m = 1; m <= max_iterations; m++) {
      const m2 = 2 * m;
      
      // Calculate next term in continued fraction
      let aa = m * (b - m) * x / ((a + m2 - 1) * (a + m2));
      d = 1 + aa * d;
      if (Math.abs(d) < epsilon) {
        d = epsilon;
      }
      d = 1 / d;
      
      c = 1 + aa / c;
      if (Math.abs(c) < epsilon) {
        c = epsilon;
      }
      
      const del = d * c;
      h *= del;
      
      aa = -(a + m) * (a + b + m) * x / ((a + m2) * (a + m2 + 1));
      d = 1 + aa * d;
      if (Math.abs(d) < epsilon) {
        d = epsilon;
      }
      d = 1 / d;
      
      c = 1 + aa / c;
      if (Math.abs(c) < epsilon) {
        c = epsilon;
      }
      
      const del2 = d * c;
      h *= del2;
      
      // Check for convergence
      if (Math.abs(del - 1) < epsilon && Math.abs(del2 - 1) < epsilon) {
        break;
      }
    }
    
    return bt * h / a;
  }
  
  /**
   * Discrete distribution PDF
   */
  private discretePDF(x: number, values: number[], probabilities: number[]): number {
    // For discrete distributions, PDF at exact values
    for (let i = 0; i < values.length; i++) {
      if (Math.abs(x - values[i]) < 1e-10) {
        return probabilities[i];
      }
    }
    return 0;
  }
  
  /**
   * Discrete distribution CDF
   */
  private discreteCDF(x: number, values: number[], probabilities: number[]): number {
    // CDF for discrete distributions
    let cumulativeProbability = 0;
    
    for (let i = 0; i < values.length; i++) {
      if (values[i] <= x) {
        cumulativeProbability += probabilities[i];
      }
    }
    
    return cumulativeProbability;
  }
}

/**
 * Factory functions for creating uncertainty artifacts
 */

/**
 * Create an uncertainty source
 * 
 * @param type Type of uncertainty
 * @param description Description of the uncertainty source
 * @param contribution Contribution to overall uncertainty (0-1)
 * @param reducible Whether this source can be reduced with more information
 * @param reductionApproaches Ways this uncertainty could be reduced (if reducible)
 * @returns Uncertainty source object
 */
export function createUncertaintySource(
  type: UncertaintyType,
  description: string,
  contribution: number,
  reducible: boolean,
  reductionApproaches?: string[]
): UncertaintySource {
  // Validate contribution is between 0 and 1
  contribution = Math.max(0, Math.min(1, contribution));
  
  return {
    type,
    description,
    contribution,
    reducible,
    reductionApproaches: reducible ? reductionApproaches : undefined
  };
}

/**
 * Create a normal distribution
 * 
 * @param mean Mean of the distribution
 * @param stdDev Standard deviation of the distribution
 * @param metadata Additional metadata
 * @returns Normal distribution
 */
export function createNormalDistribution(
  mean: number,
  stdDev: number,
  metadata?: UncertaintyDistribution['metadata']
): UncertaintyDistribution {
  return {
    type: 'normal',
    parameters: { mean, stdDev },
    metadata
  };
}

/**
 * Create a uniform distribution
 * 
 * @param min Minimum value
 * @param max Maximum value
 * @param metadata Additional metadata
 * @returns Uniform distribution
 */
export function createUniformDistribution(
  min: number,
  max: number,
  metadata?: UncertaintyDistribution['metadata']
): UncertaintyDistribution {
  return {
    type: 'uniform',
    parameters: { min, max },
    metadata
  };
}

/**
 * Create a triangular distribution
 * 
 * @param min Minimum value
 * @param mode Most likely value
 * @param max Maximum value
 * @param metadata Additional metadata
 * @returns Triangular distribution
 */
export function createTriangularDistribution(
  min: number,
  mode: number,
  max: number,
  metadata?: UncertaintyDistribution['metadata']
): UncertaintyDistribution {
  return {
    type: 'triangular',
    parameters: { min, mode, max },
    metadata
  };
}

/**
 * Create a beta distribution
 * 
 * @param alpha Alpha parameter
 * @param beta Beta parameter
 * @param metadata Additional metadata
 * @returns Beta distribution
 */
export function createBetaDistribution(
  alpha: number,
  beta: number,
  metadata?: UncertaintyDistribution['metadata']
): UncertaintyDistribution {
  return {
    type: 'beta',
    parameters: { alpha, beta },
    metadata
  };
}

/**
 * Create a discrete distribution
 * 
 * @param values Possible values
 * @param probabilities Probability of each value
 * @param metadata Additional metadata
 * @returns Discrete distribution
 */
export function createDiscreteDistribution(
  values: number[],
  probabilities: number[],
  metadata?: UncertaintyDistribution['metadata']
): UncertaintyDistribution {
  return {
    type: 'discrete',
    parameters: { values, probabilities },
    metadata
  };
}

/**
 * Convert confidence interval to credible interval
 * 
 * @param interval Confidence interval
 * @param type Type of credible interval
 * @returns Credible interval
 */
export function confidenceToCredibleInterval(
  interval: ConfidenceInterval,
  type: 'equal-tailed' | 'highest-density' = 'equal-tailed'
): CredibleInterval {
  return {
    lower: interval.lower,
    upper: interval.upper,
    probability: interval.confidenceLevel,
    type,
    units: interval.units,
    description: interval.description
  };
}

/**
 * Translate numerical confidence to qualitative label
 * 
 * @param confidence Confidence value (0-1)
 * @returns Qualitative confidence label
 */
export function translateConfidenceToQualitative(confidence: number): QualitativeConfidence {
  // Ensure confidence is in valid range
  confidence = Math.max(0, Math.min(1, confidence));
  
  if (confidence >= 0.99) {
    return 'virtually certain';
  } else if (confidence >= 0.9) {
    return 'very likely';
  } else if (confidence >= 0.66) {
    return 'likely';
  } else if (confidence >= 0.33) {
    return 'as likely as not';
  } else if (confidence >= 0.1) {
    return 'unlikely';
  } else if (confidence >= 0.01) {
    return 'very unlikely';
  } else {
    return 'exceptionally unlikely';
  }
}

/**
 * Translate qualitative confidence to numerical range
 * 
 * @param qualitative Qualitative confidence label
 * @returns Range of corresponding numerical confidence
 */
export function translateQualitativeToConfidence(
  qualitative: QualitativeConfidence
): {min: number; max: number; midpoint: number} {
  switch (qualitative) {
    case 'virtually certain':
      return {min: 0.99, max: 1.0, midpoint: 0.995};
    case 'very likely':
      return {min: 0.9, max: 0.99, midpoint: 0.945};
    case 'likely':
      return {min: 0.66, max: 0.9, midpoint: 0.78};
    case 'as likely as not':
      return {min: 0.33, max: 0.66, midpoint: 0.495};
    case 'unlikely':
      return {min: 0.1, max: 0.33, midpoint: 0.215};
    case 'very unlikely':
      return {min: 0.01, max: 0.1, midpoint: 0.055};
    case 'exceptionally unlikely':
      return {min: 0, max: 0.01, midpoint: 0.005};
  }
}

/**
 * Generate verbal expression of probability
 * 
 * @param probability Probability value (0-1)
 * @param style Style of expression ('precise' | 'conversational' | 'technical')
 * @returns Verbal expression of the probability
 */
export function verbalProbability(
  probability: number,
  style: 'precise' | 'conversational' | 'technical' = 'conversational'
): string {
  // Ensure probability is in valid range
  probability = Math.max(0, Math.min(1, probability));
  
  switch (style) {
    case 'precise':
      // Return percentage with appropriate precision
      if (probability > 0.999) return "greater than 99.9%";
      if (probability < 0.001) return "less than 0.1%";
      
      // Adjust decimal places based on probability magnitude
      if (probability > 0.1) {
        return `${(probability * 100).toFixed(1)}%`;
      } else {
        return `${(probability * 100).toFixed(2)}%`;
      }
      
    case 'technical':
      // Technical style includes both percentage and description
      const qualitative = translateConfidenceToQualitative(probability);
      return `${(probability * 100).toFixed(1)}% (${qualitative})`;
      
    case 'conversational':
    default:
      // Map to qualitative expressions
      if (probability >= 0.99) return "virtually certain";
      if (probability >= 0.95) return "extremely likely";
      if (probability >= 0.9) return "very likely";
      if (probability >= 0.8) return "likely";
      if (probability >= 0.7) return "more likely than not";
      if (probability >= 0.6) return "somewhat likely";
      if (probability >= 0.4) return "about as likely as not";
      if (probability >= 0.3) return "somewhat unlikely";
      if (probability >= 0.2) return "unlikely";
      if (probability >= 0.1) return "very unlikely";
      if (probability >= 0.05) return "extremely unlikely";
      return "virtually impossible";
  }
}

/**
 * Combine multiple uncertainty assessments
 * 
 * @param assessments Array of uncertainty assessments with optional weights
 * @returns Combined uncertainty assessment
 */
export function combineUncertaintyAssessments(
  assessments: {
    assessment: UncertaintyAssessment,
    weight?: number
  }[]
): UncertaintyAssessment {
  // Default to equal weights if not provided
  const weights = assessments.map(a => a.weight ?? 1);
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const normalizedWeights = weights.map(weight => weight / totalWeight);
  
  // Combine confidences using weighted geometric mean of confidences
  let confidenceProduct = 1;
  
  for (let i = 0; i < assessments.length; i++) {
    const confidence = assessments[i].assessment.confidence;
    const weight = normalizedWeights[i];
    
    confidenceProduct *= Math.pow(confidence, weight);
  }
  
  const combinedConfidence = confidenceProduct;
  
  // Combine sources
  const allSources: UncertaintySource[] = [];
  
  for (let i = 0; i < assessments.length; i++) {
    const sources = assessments[i].assessment.sources;
    const weight = normalizedWeights[i];
    
    for (const source of sources) {
      allSources.push({
        ...source,
        contribution: source.contribution * weight
      });
    }
  }
  
  // Merge similar sources
  const mergedSources: UncertaintySource[] = [];
  const sourceMap = new Map<string, UncertaintySource>();
  
  for (const source of allSources) {
    const key = `${source.type}:${source.description}`;
    
    if (sourceMap.has(key)) {
      const existing = sourceMap.get(key)!;
      
      // Update contribution
      existing.contribution += source.contribution;
      
      // Merge reduction approaches if both reducible
      if (existing.reducible && source.reducible && source.reductionApproaches) {
        const approaches = new Set([
          ...(existing.reductionApproaches || []),
          ...source.reductionApproaches
        ]);
        
        existing.reductionApproaches = Array.from(approaches);
      }
    } else {
      sourceMap.set(key, {...source});
    }
  }
  
  // Convert map to array
  for (const source of sourceMap.values()) {
    mergedSources.push(source);
  }
  
  // Normalize source contributions
  const totalContribution = mergedSources.reduce((sum, source) => sum + source.contribution, 0);
  
  const normalizedSources = mergedSources.map(source => ({
    ...source,
    contribution: source.contribution / totalContribution
  }));
  
  // Get qualitative confidence
  const qualitativeConfidence = translateConfidenceToQualitative(combinedConfidence);
  
  // Generate combined explanation
  const explanation = `Combined assessment from ${assessments.length} sources. Overall confidence: ${verbalProbability(combinedConfidence, 'technical')}.`;
  
  return {
    confidence: combinedConfidence,
    qualitativeConfidence,
    sources: normalizedSources,
    formallyQuantified: false,
    explanation
  };
}

export default {
  UncertaintyQuantification,
  UncertaintyType,
  createUncertaintySource,
  createNormalDistribution,
  createUniformDistribution,
  createTriangularDistribution,
  createBetaDistribution,
  createDiscreteDistribution,
  confidenceToCredibleInterval,
  translateConfidenceToQualitative,
  translateQualitativeToConfidence,
  verbalProbability,
  combineUncertaintyAssessments
};
/**
 * Uncertainty Quantification Utilities for the Critique of Artificial Reason (CAR)
 * 
 * This module provides tools for representing, quantifying, manipulating, and
 * communicating uncertainty in AI responses, aligning with Kant's distinction
 * between constitutive knowledge (what is) and regulative principles (how we
 * should proceed given uncertainty).
 * 
 * The utilities enable CAR systems to maintain appropriate epistemic humility
 * while still providing useful responses that accurately represent confidence
 * levels and sources of uncertainty.
 */

/**
 * Types of uncertainty
 */
export enum UncertaintyType {
  /** Uncertainty due to statistical variability */
  ALEATORY = 'aleatory',
  
  /** Uncertainty due to limited knowledge */
  EPISTEMIC = 'epistemic',
  
  /** Uncertainty due to linguistic ambiguity */
  LINGUISTIC = 'linguistic',
  
  /** Uncertainty due to model limitations */
  MODEL = 'model',
  
  /** Uncertainty due to incomplete or ambiguous information */
  INFORMATION = 'information',
  
  /** Uncertainty about subjective judgments or values */
  NORMATIVE = 'normative',
  
  /** Uncertainty due to multiple possible interpretations */
  AMBIGUITY = 'ambiguity',
  
  /** Uncertainty across different frameworks or paradigms */
  FRAMEWORK = 'framework',
  
  /** Uncertainty from human disagreement or social factors */
  SOCIAL = 'social',
  
  /** Uncertainty regarding future events */
  TEMPORAL = 'temporal'
}

/**
 * Representation of a probability distribution
 */
export interface UncertaintyDistribution {
  /** Type of distribution */
  type: 'normal' | 'uniform' | 'triangular' | 'discrete' | 'beta' | 'custom';
  
  /** Parameters defining the distribution */
  parameters: {
    /** Mean or central value */
    mean?: number;
    
    /** Standard deviation */
    stdDev?: number;
    
    /** Minimum value */
    min?: number;
    
    /** Maximum value */
    max?: number;
    
    /** Mode (most likely value) */
    mode?: number;
    
    /** Alpha parameter (for beta distribution) */
    alpha?: number;
    
    /** Beta parameter (for beta distribution) */
    beta?: number;
    
    /** Values for discrete distribution */
    values?: number[];
    
    /** Probabilities for discrete distribution */
    probabilities?: number[];
    
    /** Custom distribution function */
    distributionFunction?: (x: number) => number;
  };
  
  /** Additional information about the distribution */
  metadata?: {
    /** Description of what the distribution represents */
    description?: string;
    
    /** Units of the distribution */
    units?: string;
    
    /** Source of the distribution */
    source?: string;
  };
}

/**
 * Representation of a confidence interval
 */
export interface ConfidenceInterval {
  /** Lower bound of the interval */
  lower: number;
  
  /** Upper bound of the interval */
  upper: number;
  
  /** Confidence level (0-1) */
  confidenceLevel: number;
  
  /** Units of the interval */
  units?: string;
  
  /** Description of what the interval represents */
  description?: string;
}

/**
 * Representation of a credible interval (Bayesian confidence interval)
 */
export interface CredibleInterval {
  /** Lower bound of the interval */
  lower: number;
  
  /** Upper bound of the interval */
  upper: number;
  
  /** Probability mass within the interval (0-1) */
  probability: number;
  
  /** Type of credible interval */
  type: 'equal-tailed' | 'highest-density';
  
  /** Units of the interval */
  units?: string;
  
  /** Description of what the interval represents */
  description?: string;
}

/**
 * Representation of the source of uncertainty
 */
export interface UncertaintySource {
  /** Type of uncertainty */
  type: UncertaintyType;
  
  /** Description of the uncertainty source */
  description: string;
  
  /** Contribution to overall uncertainty (0-1) */
  contribution: number;
  
  /** Whether this source can be reduced with more information */
  reducible: boolean;
  
  /** Ways this uncertainty could be reduced (if reducible) */
  reductionApproaches?: string[];
}

/**
 * Representation of a qualitative confidence level
 */
export type QualitativeConfidence = 
  'virtually certain' | 
  'very likely' | 
  'likely' | 
  'as likely as not' | 
  'unlikely' | 
  'very unlikely' | 
  'exceptionally unlikely';

/**
 * Representation of a comprehensive uncertainty assessment
 */
export interface UncertaintyAssessment {
  /** Overall confidence (0-1) */
  confidence: number;
  
  /** Qualitative confidence level */
  qualitativeConfidence: QualitativeConfidence;
  
  /** Probability distribution (if available) */
  distribution?: UncertaintyDistribution;
  
  /** Confidence interval (if available) */
  confidenceInterval?: ConfidenceInterval;
  
  /** Sources of uncertainty */
  sources: UncertaintySource[];
  
  /** Whether uncertainty was formally quantified */
  formallyQuantified: boolean;
  
  /** Methods used to quantify uncertainty */
  quantificationMethods?: string[];
  
  /** Recommendations given uncertainty */
  recommendations?: string[];
  
  /** Explanation of uncertainty in natural language */
  explanation: string;
}

/**
 * Configuration for the uncertainty calculator
 */
export interface UncertaintyCalculatorConfig {
  /** Default confidence interval level */
  defaultConfidenceLevel: number;
  
  /** Threshold between "likely" and "very likely" */
  likelyThreshold: number;
  
  /** Threshold between "very likely" and "virtually certain" */
  veryLikelyThreshold: number;
  
  /** Whether to use more verbose explanations */
  verboseExplanations: boolean;
  
  /** Default number of samples for Monte Carlo simulations */
  monteCarloSamples: number;
  
  /** Minimum number of sources to include in explanations */
  minSourcesInExplanation: number;
}

/**
 * Main class for quantifying and managing uncertainty
 */
export class UncertaintyQuantification {
  /** Configuration for the calculator */
  private config: UncertaintyCalculatorConfig;
  
  /**
   * Initialize the uncertainty quantification utility
   * 
   * @param config Configuration settings
   */
  constructor(config?: Partial<UncertaintyCalculatorConfig>) {
    // Set default configuration values
    this.config = {
      defaultConfidenceLevel: config?.defaultConfidenceLevel || 0.95,
      likelyThreshold: config?.likelyThreshold || 0.66,
      veryLikelyThreshold: config?.veryLikelyThreshold || 0.9,
      verboseExplanations: config?.verboseExplanations !== undefined ? 
                          config.verboseExplanations : true,
      monteCarloSamples: config?.monteCarloSamples || 10000,
      minSourcesInExplanation: config?.minSourcesInExplanation || 2
    };
  }
  
  /**
   * Generate a comprehensive uncertainty assessment
   * 
   * @param confidence Overall confidence value (0-1)
   * @param sources Sources of uncertainty
   * @param distribution Optional probability distribution
   * @param options Additional options
   * @returns Complete uncertainty assessment
   */
  public assessUncertainty(
    confidence: number,
    sources: UncertaintySource[],
    distribution?: UncertaintyDistribution,
    options: {
      formallyQuantified?: boolean;
      quantificationMethods?: string[];
      recommendations?: string[];
      explanationDetail?: 'brief' | 'standard' | 'detailed';
    } = {}
  ): UncertaintyAssessment {
    // Validate inputs
    confidence = Math.max(0, Math.min(1, confidence));
    
    // Generate qualitative confidence
    const qualitativeConfidence = this.translateConfidenceToQualitative(confidence);
    
    // Derive confidence interval if distribution provided
    let confidenceInterval: ConfidenceInterval | undefined;
    if (distribution) {
      confidenceInterval = this.calculateConfidenceInterval(
        distribution,
        this.config.defaultConfidenceLevel
      );
    }
    
    // Normalize source contributions to sum to 1
    const normalizedSources = this.normalizeSourceContributions([...sources]);
    
    // Generate explanation
    const explanationDetail = options.explanationDetail || 'standard';
    const explanation = this.generateUncertaintyExplanation(
      confidence,
      normalizedSources,
      distribution,
      confidenceInterval,
      explanationDetail
    );
    
    return {
      confidence,
      qualitativeConfidence,
      distribution,
      confidenceInterval,
      sources: normalizedSources,
      formallyQuantified: options.formallyQuantified || false,
      quantificationMethods: options.quantificationMethods,
      recommendations: options.recommendations,
      explanation
    };
  }
  
  /**
   * Translate numerical confidence to qualitative label
   * 
   * @param confidence Confidence value (0-1)
   * @returns Qualitative confidence label
   */
  public translateConfidenceToQualitative(confidence: number): QualitativeConfidence {
    if (confidence >= 0.99) {
      return 'virtually certain';
    } else if (confidence >= this.config.veryLikelyThreshold) {
      return 'very likely';
    } else if (confidence >= this.config.likelyThreshold) {
      return 'likely';
    } else if (confidence >= 0.33) {
      return 'as likely as not';
    } else if (confidence >= 0.1) {
      return 'unlikely';
    } else if (confidence >= 0.01) {
      return 'very unlikely';
    } else {
      return 'exceptionally unlikely';
    }
  }
  
  /**
   * Translate qualitative confidence to numerical range
   * 
   * @param qualitative Qualitative confidence label
   * @returns Range of corresponding numerical confidence
   */
  public translateQualitativeToConfidence(
    qualitative: QualitativeConfidence
  ): {min: number; max: number; midpoint: number} {
    switch (qualitative) {
      case 'virtually certain':
        return {min: 0.99, max: 1.0, midpoint: 0.995};
      case 'very likely':
        return {min: this.config.veryLikelyThreshold, max: 0.99, midpoint: (this.config.veryLikelyThreshold + 0.99) / 2};
      case 'likely':
        return {min: this.config.likelyThreshold, max: this.config.veryLikelyThreshold, midpoint: (this.config.likelyThreshold + this.config.veryLikelyThreshold) / 2};
      case 'as likely as not':
        return {min: 0.33, max: this.config.likelyThreshold, midpoint: (0.33 + this.config.likelyThreshold) / 2};
      case 'unlikely':
        return {min: 0.1, max: 0.33, midpoint: 0.215};
      case 'very unlikely':
        return {min: 0.01, max: 0.1, midpoint: 0.055};
      case 'exceptionally unlikely':
        return {min: 0, max: 0.01, midpoint: 0.005};
    }
  }
  
  /**
   * Calculate confidence interval from a distribution
   * 
   * @param distribution Probability distribution
   * @param confidenceLevel Desired confidence level (0-1)
   * @returns Confidence interval
   */
  public calculateConfidenceInterval(
    distribution: UncertaintyDistribution,
    confidenceLevel: number = this.config.defaultConfidenceLevel
  ): ConfidenceInterval {
    // Validate inputs
    confidenceLevel = Math.max(0, Math.min(1, confidenceLevel));
    
    let lower: number;
    let upper: number;
    
    const alpha = 1 - confidenceLevel;
    const lowerQuantile = alpha / 2;
    const upperQuantile = 1 - (alpha / 2);
    
    switch (distribution.type) {
      case 'normal': {
        // For normal distribution, use analytical formula
        const mean = distribution.parameters.mean ?? 0;
        const stdDev = distribution.parameters.stdDev ?? 1;
        
        // Z-score for the confidence level
        const z = this.calculateZScore(confidenceLevel);
        
        lower = mean - z * stdDev;
        upper = mean + z * stdDev;
        break;
      }
      
      case 'uniform': {
        // For uniform distribution, calculate quantiles
        const min = distribution.parameters.min ?? 0;
        const max = distribution.parameters.max ?? 1;
        
        lower = min + (max - min) * lowerQuantile;
        upper = min + (max - min) * upperQuantile;
        break;
      }
      
      case 'triangular': {
        // For triangular distribution, calculate quantiles numerically
        const min = distribution.parameters.min ?? 0;
        const max = distribution.parameters.max ?? 1;
        const mode = distribution.parameters.mode ?? ((min + max) / 2);
        
        lower = this.calculateTriangularQuantile(lowerQuantile, min, mode, max);
        upper = this.calculateTriangularQuantile(upperQuantile, min, mode, max);
        break;
      }
      
      case 'discrete': {
        // For discrete distribution, calculate empirical quantiles
        const values = distribution.parameters.values ?? [];
        const probabilities = distribution.parameters.probabilities ?? [];
        
        if (values.length !== probabilities.length || values.length === 0) {
          throw new Error('Discrete distribution requires equal-length values and probabilities arrays');
        }
        
        // Sort values and corresponding probabilities
        const pairs = values.map((value, i) => ({value, probability: probabilities[i]}));
        pairs.sort((a, b) => a.value - b.value);
        
        // Calculate cumulative probabilities
        let cumulativeProbability = 0;
        const cumulativeProbabilities = pairs.map(pair => {
          cumulativeProbability += pair.probability;
          return {value: pair.value, cumulativeProbability};
        });
        
        // Find quantiles
        lower = this.findDiscreteQuantile(cumulativeProbabilities, lowerQuantile);
        upper = this.findDiscreteQuantile(cumulativeProbabilities, upperQuantile);
        break;
      }
      
      case 'beta': {
        // For beta distribution, use numerical method
        const alpha = distribution.parameters.alpha ?? 1;
        const beta = distribution.parameters.beta ?? 1;
        
        lower = this.calculateBetaQuantile(lowerQuantile, alpha, beta);
        upper = this.calculateBetaQuantile(upperQuantile, alpha, beta);
        break;
      }
      
      case 'custom': {
        // For custom distribution, use Monte Carlo simulation
        if (!distribution.parameters.distributionFunction) {
          throw new Error('Custom distribution requires a distributionFunction');
        }
        
        // Create a large number of samples
        const samples = this.generateCustomDistributionSamples(
          distribution.parameters.distributionFunction,
          this.config.monteCarloSamples
        );
        
        // Calculate empirical quantiles
        samples.sort((a, b) => a - b);
        const lowerIndex = Math.floor(lowerQuantile * samples.length);
        const upperIndex = Math.floor(upperQuantile * samples.length);
        
        lower = samples[lowerIndex];
        upper = samples[upperIndex];
        break;
      }
      
      default:
        throw new Error(`Unsupported distribution type: ${distribution.type}`);
    }
    
    // Create confidence interval object
    const interval: ConfidenceInterval = {
      lower,
      upper,
      confidenceLevel,
      units: distribution.metadata?.units,
      description: distribution.metadata?.description
    };
    
    return interval;
  }
  
  /**
   * Calculate credible interval (Bayesian confidence interval)
   * 
   * @param distribution Probability distribution
   * @param probability Desired probability mass within the interval (0-1)
   * @param type Type of credible interval
   * @returns Credible interval
   */
  public calculateCredibleInterval(
    distribution: UncertaintyDistribution,
    probability: number = 0.95,
    type: 'equal-tailed' | 'highest-density' = 'equal-tailed'
  ): CredibleInterval {
    // For equal-tailed interval, this is equivalent to confidence interval
    if (type === 'equal-tailed') {
      const confidenceInterval = this.calculateConfidenceInterval(distribution, probability);
      
      return {
        lower: confidenceInterval.lower,
        upper: confidenceInterval.upper,
        probability,
        type: 'equal-tailed',
        units: confidenceInterval.units,
        description: confidenceInterval.description
      };
    }
    
    // For highest density interval, need to find the narrowest interval
    // containing the specified probability mass
    // This is more complex and depends on the distribution shape
    
    // For normal distribution, HDI is symmetric and same as equal-tailed
    if (distribution.type === 'normal') {
      const confidenceInterval = this.calculateConfidenceInterval(distribution, probability);
      
      return {
        lower: confidenceInterval.lower,
        upper: confidenceInterval.upper,
        probability,
        type: 'highest-density',
        units: confidenceInterval.units,
        description: confidenceInterval.description
      };
    }
    
    // For non-normal distributions, use numerical methods to find HDI
    // This is a simplified approach for common cases
    
    let lower: number;
    let upper: number;
    
    switch (distribution.type) {
      case 'beta': {
        // For beta distribution, find mode and work outward
        const alpha = distribution.parameters.alpha ?? 1;
        const beta = distribution.parameters.beta ?? 1;
        
        // Calculate mode
        const mode = (alpha - 1) / (alpha + beta - 2);
        
        // Use numerical search to find HDI
        const {lower: hdiLower, upper: hdiUpper} = this.findHDIForBeta(alpha, beta, probability);
        lower = hdiLower;
        upper = hdiUpper;
        break;
      }
      
      default:
        // For other distributions, fall back to equal-tailed interval
        // with a warning
        console.warn(`Highest density interval calculation not implemented for ${distribution.type} distribution. Using equal-tailed interval instead.`);
        
        const confidenceInterval = this.calculateConfidenceInterval(distribution, probability);
        lower = confidenceInterval.lower;
        upper = confidenceInterval.upper;
    }
    
    return {
      lower,
      upper,
      probability,
      type: 'highest-density',
      units: distribution.metadata?.units,
      description: distribution.metadata?.description
    };
  }
  
  /**
   * Combine multiple uncertainty sources
   * 
   * @param sources Array of uncertainty sources
   * @returns Combined uncertainty assessment
   */
  public combineUncertaintySources(
    sources: {
      source: UncertaintySource;
      weight?: number;
    }[]
  ): {
    combinedConfidence: number;
    normalizedSources: UncertaintySource[];
  } {
    // Default to equal weights if not provided
    const weights = sources.map(s => s.weight ?? 1);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const normalizedWeights = weights.map(weight => weight / totalWeight);
    
    // Calculate contribution of each source to overall uncertainty
    // Using a weighted average of (1 - contribution) to represent confidence
    let confidenceProduct = 1;
    
    for (let i = 0; i < sources.length; i++) {
      const sourceContribution = sources[i].source.contribution;
      const weight = normalizedWeights[i];
      
      // Using weighted geometric mean for combining confidences
      confidenceProduct *= Math.pow(1 - sourceContribution, weight);
    }
    
    const combinedConfidence = 1 - confidenceProduct;
    
    // Normalize source contributions based on their impact on combined confidence
    const normalizedSources = sources.map((s, i) => {
      const relativeLoss = Math.pow(1 - s.source.contribution, normalizedWeights[i]);
      const contributionToTotal = (1 - relativeLoss) / (1 - confidenceProduct);
      
      return {
        ...s.source,
        contribution: contributionToTotal
      };
    });
    
    return {
      combinedConfidence,
      normalizedSources
    };
  }
  
  /**
   * Create an uncertainty distribution from parameters
   * 
   * @param type Type of distribution to create
   * @param parameters Parameters for the distribution
   * @param metadata Additional metadata
   * @returns Uncertainty distribution
   */
  public createDistribution(
    type: UncertaintyDistribution['type'],
    parameters: UncertaintyDistribution['parameters'],
    metadata?: UncertaintyDistribution['metadata']
  ): UncertaintyDistribution {
    // Validate parameters based on distribution type
    this.validateDistributionParameters(type, parameters);
    
    return {
      type,
      parameters,
      metadata
    };
  }
  
  /**
   * Create a normal distribution
   * 
   * @param mean Mean of the distribution
   * @param stdDev Standard deviation of the distribution
   * @param metadata Additional metadata
   * @returns Normal distribution
   */
  public createNormalDistribution(
    mean: number,
    stdDev: number,
    metadata?: UncertaintyDistribution['metadata']
  ): UncertaintyDistribution {
    return this.createDistribution(
      'normal',
      { mean, stdDev },
      metadata
    );
  }
  
  /**
   * Create a uniform distribution
   * 
   * @param min Minimum value
   * @param max Maximum value
   * @param metadata Additional metadata
   * @returns Uniform distribution
   */
  public createUniformDistribution(
    min: number,
    max: number,
    metadata?: UncertaintyDistribution['metadata']
  ): UncertaintyDistribution {
    return this.createDistribution(
      'uniform',
      { min, max },
      metadata
    );
  }
  
  /**
   * Create a triangular distribution
   * 
   * @param min Minimum value
   * @param mode Most likely value
   * @param max Maximum value
   * @param metadata Additional metadata
   * @returns Triangular distribution
   */
  public createTriangularDistribution(
    min: number,
    mode: number,
    max: number,
    metadata?: UncertaintyDistribution['metadata']
  ): UncertaintyDistribution {
    return this.createDistribution(
      'triangular',
      { min, mode, max },
      metadata
    );
  }
  
  /**
   * Create a beta distribution
   * 
   * @param alpha Alpha parameter
   * @param beta Beta parameter
   * @param metadata Additional metadata
   * @returns Beta distribution
   */
  public createBetaDistribution(
    alpha: number,
    beta: number,
    metadata?: UncertaintyDistribution['metadata']
  ): UncertaintyDistribution {
    return this.createDistribution(
      'beta',
      { alpha, beta },
      metadata
    );
  }
  
  /**
   * Create a discrete distribution
   * 
   * @param values Possible values
   * @param probabilities Probability of each value
   * @param metadata Additional metadata
   * @returns Discrete distribution
   */
  public createDiscreteDistribution(
    values: number[],
    probabilities: number[],
    metadata?: UncertaintyDistribution['metadata']
  ): UncertaintyDistribution {
    return this.createDistribution(
      'discrete',
      { values, probabilities },
      metadata
    );
  }
  
  /**
   * Generate uncertainty source object
   * 
   * @param type Type of uncertainty
   * @param description Description of the uncertainty source
   * @param contribution Contribution to overall uncertainty (0-1)
   * @param reducible Whether this source can be reduced with more information
   * @param reductionApproaches Ways this uncertainty could be reduced (if reducible)
   * @returns Uncertainty source object
   */
  public createUncertaintySource(
    type: UncertaintyType,
    description: string,
    contribution: number,
    reducible: boolean,
    reductionApproaches?: string[]
  ): UncertaintySource {
    // Validate contribution is between 0 and 1
    contribution = Math.max(0, Math.min(1, contribution));
    
    return {
      type,
      description,
      contribution,
      reducible,
      reductionApproaches: reducible ? reductionApproaches : undefined
    };
  }
  
  /**
   * Generate natural language description of uncertainty
   * 
   * @param assessment Uncertainty assessment to describe
   * @param includeRecommendations Whether to include recommendations in the description
   * @returns Natural language description
   */
  public describeUncertainty(
    assessment: UncertaintyAssessment,
    includeRecommendations: boolean = true
  ): string {
    let description = `Overall confidence: ${(assessment.confidence * 100).toFixed(0)}% (${assessment.qualitativeConfidence}). `;
    
    // Describe confidence interval if available
    if (assessment.confidenceInterval) {
      const interval = assessment.confidenceInterval;
      const units = interval.units ? ` ${interval.units}` : '';
      
      description += `The ${(interval.confidenceLevel * 100).toFixed(0)}% confidence interval is ${interval.lower.toFixed(2)} to ${interval.upper.toFixed(2)}${units}. `;
    }
    
    // Describe main sources of uncertainty
    const sortedSources = [...assessment.sources].sort((a, b) => b.contribution - a.contribution);
    const topSources = sortedSources.slice(0, 3);
    
    if (topSources.length > 0) {
      description += `Key sources of uncertainty include: `;
      
      topSources.forEach((source, index) => {
        const contributionPercent = (source.contribution * 100).toFixed(0);
        description += `${source.description} (${contributionPercent}% contribution)`;
        
        if (index < topSources.length - 1) {
          description += `, `;
        } else {
          description += `. `;
        }
      });
    }
    
    // Include recommendations if requested
    if (includeRecommendations && assessment.recommendations && assessment.recommendations.length > 0) {
      description += `Given this uncertainty, recommended approaches include: ${assessment.recommendations.join('; ')}. `;
    }
    
    // Add reducibility information
    const reducibleSources = sortedSources.filter(s => s.reducible);
    const irreducibleSources = sortedSources.filter(s => !s.reducible);
    
    if (reducibleSources.length > 0 && irreducibleSources.length > 0) {
      const reducibleContribution = reducibleSources.reduce((sum, s) => sum + s.contribution, 0);
      const reduciblePercent = (reducibleContribution * 100).toFixed(0);
      
      description += `Approximately ${reduciblePercent}% of the uncertainty could potentially be reduced with additional information or analysis. `;
    }
    
    return description;
  }
  
  /**
   * Calculate probability density function (PDF) values for a distribution
   * 
   * @param distribution Probability distribution
   * @param points Points at which to calculate PDF values
   * @returns PDF values for the specified points
   */
  public calculatePDF(
    distribution: UncertaintyDistribution,
    points: number[]
  ): number[] {
    // Calculate PDF values based on distribution type
    switch (distribution.type) {
      case 'normal':
        return points.map(x => this.normalPDF(
          x,
          distribution.parameters.mean ?? 0,
          distribution.parameters.stdDev ?? 1
        ));
        
      case 'uniform':
        return points.map(x => this.uniformPDF(
          x,
          distribution.parameters.min ?? 0,
          distribution.parameters.max ?? 1
        ));
        
      case 'triangular':
        return points.map(x => this.triangularPDF(
          x,
          distribution.parameters.min ?? 0,
          distribution.parameters.mode ?? 0.5,
          distribution.parameters.max ?? 1
        ));
        
      case 'beta':
        return points.map(x => this.betaPDF(
          x,
          distribution.parameters.alpha ?? 1,
          distribution.parameters.beta ?? 1
        ));
        
      case 'discrete':
        return points.map(x => this.discretePDF(
          x,
          distribution.parameters.values ?? [],
          distribution.parameters.probabilities ?? []
        ));
        
      case 'custom':
        if (distribution.parameters.distributionFunction) {
          return points.map(x => distribution.parameters.distributionFunction!(x));
        } else {
          throw new Error("Custom distribution requires a distributionFunction");
        }
        
      default:
        throw new Error(`Unsupported distribution type: ${distribution.type}`);
    }
  }
  
  /**
   * Calculate cumulative distribution function (CDF) values for a distribution
   * 
   * @param distribution Probability distribution
   * @param points Points at which to calculate CDF values
   * @returns CDF values for the specified points
   */
  public calculateCDF(
    distribution: UncertaintyDistribution,
    points: number[]
  ): number[] {
    // Calculate CDF values based on distribution type
    switch (distribution.type) {
      case 'normal':
        return points.map(x => this.normalCDF(
          x,
          distribution.parameters.mean ?? 0,
          distribution.parameters.stdDev ?? 1
        ));
        
      case 'uniform':
        return points.map(x => this.uniformCDF(
          x,
          distribution.parameters.min ?? 0,
          distribution.parameters.max ?? 1
        ));
        
      case 'triangular':
        return points.map(x => this.triangularCDF(
          x,
          distribution.parameters.min ?? 0,
          distribution.parameters.mode ?? 0.5,
          distribution.parameters.max ?? 1
        ));
        
      case 'beta':
        return points.map(x => this.betaCDF(
          x,
          distribution.parameters.alpha ?? 1,
          distribution.parameters.beta ?? 1
        ));
        
      case 'discrete':
        return points.map(x => this.discreteCDF(
          x,
          distribution.parameters.values ?? [],
          distribution.parameters.probabilities ?? []
        ));
        
      case
