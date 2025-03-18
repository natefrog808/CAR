/**
 * Test Suite for Critique of Artificial Reason (CAR) Core Architecture
 * 
 * This comprehensive test suite validates the core functionality of the CAR framework,
 * including all layers (Sensibility, Understanding, Reason, Critique), the categorical
 * imperative implementation, epistemic boundary handling, and the schematism bridge.
 */

import { expect } from 'chai';
import sinon from 'sinon';

// Import core components
import {
  CAR,
  CAROptions,
  SensibilityLayer,
  UnderstandingLayer,
  ReasonLayer,
  CritiqueLayer,
  CategoricalImperative,
  SchematismBridge,
  EpistemicBoundary,
  CARResult
} from '../src/core/car-core';

// Import interfaces and types
import {
  InputData,
  CategoryMap,
  Inference,
  Judgment,
  ConfidenceLevel,
  EpistemicLimitation,
  MaximEvaluation
} from '../src/core/interfaces';

describe('CAR Core Architecture', () => {
  // Test fixtures and setup
  let carSystem: CAR;
  let defaultOptions: CAROptions;

  beforeEach(() => {
    // Default configuration for testing
    defaultOptions = {
      domain: 'test-domain',
      epistemicBoundaries: ['test-boundary-1', 'test-boundary-2'],
      confidenceThresholds: {
        high: 0.8,
        medium: 0.5,
        low: 0.3
      },
      categoricalImperative: {
        universalLaw: true,
        humanityAsEnd: true,
        kingdomOfEnds: true
      },
      schematism: {
        bridgeNeuralSymbolic: true,
        contextualAdaptation: true
      }
    };
    
    carSystem = new CAR(defaultOptions);
  });

  afterEach(() => {
    // Clean up
    sinon.restore();
  });

  describe('CAR Initialization', () => {
    it('should initialize with valid options', () => {
      expect(carSystem).to.be.an.instanceOf(CAR);
      expect(carSystem).to.have.property('domain', 'test-domain');
    });

    it('should throw error with invalid confidence thresholds', () => {
      const invalidOptions = {
        ...defaultOptions,
        confidenceThresholds: {
          high: 0.3, // Invalid because high < medium
          medium: 0.5,
          low: 0.1
        }
      };

      expect(() => new CAR(invalidOptions)).to.throw(Error);
    });

    it('should initialize all four layers correctly', () => {
      expect(carSystem).to.have.property('sensibilityLayer');
      expect(carSystem).to.have.property('understandingLayer');
      expect(carSystem).to.have.property('reasonLayer');
      expect(carSystem).to.have.property('critiqueLayer');
      
      expect(carSystem.sensibilityLayer).to.be.an.instanceOf(SensibilityLayer);
      expect(carSystem.understandingLayer).to.be.an.instanceOf(UnderstandingLayer);
      expect(carSystem.reasonLayer).to.be.an.instanceOf(ReasonLayer);
      expect(carSystem.critiqueLayer).to.be.an.instanceOf(CritiqueLayer);
    });

    it('should initialize categorical imperative with specified formulations', () => {
      const customOptions = {
        ...defaultOptions,
        categoricalImperative: {
          universalLaw: true,
          humanityAsEnd: false,
          kingdomOfEnds: true
        }
      };
      
      const customSystem = new CAR(customOptions);
      expect(customSystem.categoricalImperative).to.have.property('universalLaw', true);
      expect(customSystem.categoricalImperative).to.have.property('humanityAsEnd', false);
      expect(customSystem.categoricalImperative).to.have.property('kingdomOfEnds', true);
    });
  });

  describe('Sensibility Layer', () => {
    it('should process raw input data into perceptions', () => {
      const rawInput = {
        values: [1, 2, 3, 4, 5],
        text: 'This is a test input',
        metadata: {
          source: 'test'
        }
      };
      
      const result = carSystem.sensibilityLayer.process(rawInput);
      
      expect(result).to.have.property('perceptions');
      expect(result.perceptions).to.have.property('numericValues');
      expect(result.perceptions).to.have.property('textContent');
      expect(result.perceptions).to.have.property('metadata');
      expect(result.perceptions.numericValues).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should detect and flag anomalous inputs', () => {
      const anomalousInput = {
        values: [1, 2, 1000000, 4, 5], // Anomalous value
        text: 'This is a test input',
        metadata: {
          source: 'test'
        }
      };
      
      const result = carSystem.sensibilityLayer.process(anomalousInput);
      
      expect(result).to.have.property('anomalies');
      expect(result.anomalies.length).to.be.greaterThan(0);
      expect(result.anomalies[0]).to.have.property('field', 'values');
      expect(result.anomalies[0]).to.have.property('description').that.includes('anomalous');
    });

    it('should normalize input data according to domain specifications', () => {
      const rawInput = {
        values: [10, 20, 30, 40, 50],
        text: 'This is a test input',
        metadata: {
          source: 'test'
        }
      };
      
      // Configure normalization in the layer for testing
      carSystem.sensibilityLayer.setNormalizationParameters({
        values: {
          method: 'minmax',
          range: [0, 1]
        }
      });
      
      const result = carSystem.sensibilityLayer.process(rawInput);
      
      expect(result.perceptions.normalizedValues[0]).to.equal(0);
      expect(result.perceptions.normalizedValues[4]).to.equal(1);
    });

    it('should handle missing or null input gracefully', () => {
      const incompleteInput = {
        values: null,
        text: '',
        metadata: {
          source: 'test'
        }
      };
      
      expect(() => carSystem.sensibilityLayer.process(incompleteInput)).to.not.throw();
      const result = carSystem.sensibilityLayer.process(incompleteInput);
      
      expect(result).to.have.property('perceptions');
      expect(result).to.have.property('anomalies');
      expect(result.anomalies).to.have.length.greaterThan(0);
    });
  });

  describe('Understanding Layer', () => {
    let mockPerceptions;
    
    beforeEach(() => {
      // Setup mock perceptions from sensibility layer
      mockPerceptions = {
        numericValues: [0.1, 0.5, 0.9],
        textContent: 'This is test content that describes a scenario',
        metadata: {
          domain: 'test-domain',
          context: 'ethical-evaluation'
        },
        normalizedValues: [0, 0.5, 1]
      };
    });

    it('should categorize perceptions using domain-specific categories', () => {
      const categories = carSystem.understandingLayer.categorize(mockPerceptions);
      
      expect(categories).to.be.an('object');
      expect(categories).to.have.property('textCategory');
      expect(categories).to.have.property('valueCategory');
      expect(categories).to.have.property('contextCategory');
    });

    it('should apply appropriate schema to perceptions', () => {
      // Configure schema for testing
      carSystem.understandingLayer.setSchemas({
        'test-domain': {
          valueRanges: {
            low: [0, 0.3],
            medium: [0.3, 0.7],
            high: [0.7, 1]
          },
          textPatterns: {
            ethical: ['ethical', 'moral', 'value', 'good', 'bad'],
            technical: ['technical', 'system', 'process', 'function'],
            scenario: ['scenario', 'situation', 'case', 'example']
          }
        }
      });
      
      const categories = carSystem.understandingLayer.categorize(mockPerceptions);
      
      expect(categories.valueCategory).to.include({
        first: 'low',
        second: 'medium',
        third: 'high'
      });
      
      expect(categories.textCategory).to.include('scenario');
    });

    it('should identify relationships between categorized elements', () => {
      // First categorize the perceptions
      const categories = carSystem.understandingLayer.categorize(mockPerceptions);
      
      // Then identify relationships
      const relationships = carSystem.understandingLayer.identifyRelationships(categories);
      
      expect(relationships).to.be.an('array');
      expect(relationships.length).to.be.greaterThan(0);
      expect(relationships[0]).to.have.property('type');
      expect(relationships[0]).to.have.property('elements');
      expect(relationships[0]).to.have.property('strength');
    });

    it('should produce a structured representation from categories and relationships', () => {
      const representation = carSystem.understandingLayer.process(mockPerceptions);
      
      expect(representation).to.have.property('categories');
      expect(representation).to.have.property('relationships');
      expect(representation).to.have.property('structure');
      expect(representation.structure).to.be.an('object');
    });
  });

  describe('Reason Layer', () => {
    let mockStructuredRepresentation;
    
    beforeEach(() => {
      // Setup mock structured representation from understanding layer
      mockStructuredRepresentation = {
        categories: {
          valueCategory: {
            first: 'low',
            second: 'medium',
            third: 'high'
          },
          textCategory: ['scenario', 'ethical'],
          contextCategory: 'ethical-evaluation'
        },
        relationships: [
          {
            type: 'correlation',
            elements: ['valueCategory.third', 'textCategory[0]'],
            strength: 0.7
          }
        ],
        structure: {
          primary: 'contextCategory',
          relationships: ['correlation'],
          framework: 'ethical-evaluation'
        }
      };
    });

    it('should generate inferences from structured representation', () => {
      const inferences = carSystem.reasonLayer.generateInferences(mockStructuredRepresentation);
      
      expect(inferences).to.be.an('array');
      expect(inferences.length).to.be.greaterThan(0);
      expect(inferences[0]).to.have.property('premise');
      expect(inferences[0]).to.have.property('conclusion');
      expect(inferences[0]).to.have.property('confidence');
      expect(inferences[0]).to.have.property('method');
    });

    it('should check inference validity against logical rules', () => {
      // First generate inferences
      const inferences = carSystem.reasonLayer.generateInferences(mockStructuredRepresentation);
      
      // Then check validity
      const validatedInferences = carSystem.reasonLayer.validateInferences(inferences);
      
      expect(validatedInferences).to.be.an('array');
      expect(validatedInferences[0]).to.have.property('valid');
      expect(validatedInferences[0]).to.have.property('validationMethod');
      expect(validatedInferences[0]).to.have.property('validationNotes');
    });

    it('should apply the categorical imperative to ethical judgments', () => {
      // Set up a mock ethical scenario
      const ethicalScenario = {
        action: 'Share user data with third parties without explicit consent',
        maxim: 'Data collectors may use collected data for any purpose they deem valuable',
        context: 'Digital privacy policy decision',
        stakeholders: [
          { party: 'Company', interests: ['revenue generation', 'service improvement'] },
          { party: 'Users', interests: ['privacy', 'service quality', 'autonomy'] }
        ]
      };
      
      const ciEvaluation = carSystem.reasonLayer.applyCategoricalImperative(ethicalScenario);
      
      expect(ciEvaluation).to.have.property('universalLaw');
      expect(ciEvaluation).to.have.property('humanityAsEnd');
      expect(ciEvaluation).to.have.property('kingdomOfEnds');
      
      expect(ciEvaluation.universalLaw).to.have.property('result');
      expect(ciEvaluation.universalLaw).to.have.property('reasoning');
      expect(ciEvaluation.universalLaw.result).to.be.a('boolean');
    });

    it('should make judgments with confidence levels', () => {
      // First generate inferences
      const inferences = carSystem.reasonLayer.generateInferences(mockStructuredRepresentation);
      
      // Then validate
      const validatedInferences = carSystem.reasonLayer.validateInferences(inferences);
      
      // Then make judgments
      const judgments = carSystem.reasonLayer.makeJudgments(validatedInferences, mockStructuredRepresentation);
      
      expect(judgments).to.be.an('array');
      expect(judgments.length).to.be.greaterThan(0);
      expect(judgments[0]).to.have.property('statement');
      expect(judgments[0]).to.have.property('confidence');
      expect(judgments[0]).to.have.property('evidenceBase');
      expect(judgments[0]).to.have.property('category');
    });

    it('should process structured representation to create reasoned conclusions', () => {
      const reasoningResult = carSystem.reasonLayer.process(mockStructuredRepresentation);
      
      expect(reasoningResult).to.have.property('inferences');
      expect(reasoningResult).to.have.property('judgments');
      expect(reasoningResult).to.have.property('confidence');
      expect(reasoningResult).to.have.property('reasoning');
    });
  });

  describe('Critique Layer', () => {
    let mockReasoningResult;
    
    beforeEach(() => {
      // Setup mock reasoning result from reason layer
      mockReasoningResult = {
        inferences: [
          {
            premise: 'The scenario involves high values in an ethical context',
            conclusion: 'This case requires careful ethical evaluation',
            confidence: 0.85,
            method: 'rule-based',
            valid: true,
            validationMethod: 'logical-consistency',
            validationNotes: 'Inference follows from established domain rules'
          }
        ],
        judgments: [
          {
            statement: 'The proposed action raises significant ethical concerns',
            confidence: 0.75,
            evidenceBase: ['inference_0', 'domain_principles'],
            category: 'ethical-evaluation'
          }
        ],
        confidence: 0.75,
        reasoning: 'The system identified a scenario with ethical implications and high-value components, suggesting careful evaluation is needed.'
      };
    });

    it('should check for epistemic boundary crossings', () => {
      const boundaryCheck = carSystem.critiqueLayer.checkEpistemicBoundaries(mockReasoningResult);
      
      expect(boundaryCheck).to.have.property('beyondBoundaries');
      expect(boundaryCheck).to.have.property('boundaries');
      expect(boundaryCheck.beyondBoundaries).to.be.a('boolean');
      
      if (boundaryCheck.beyondBoundaries) {
        expect(boundaryCheck.boundaries).to.be.an('array');
        expect(boundaryCheck.boundaries[0]).to.have.property('boundary');
        expect(boundaryCheck.boundaries[0]).to.have.property('reason');
      }
    });

    it('should assess confidence appropriately based on thresholds', () => {
      const confidenceAssessment = carSystem.critiqueLayer.assessConfidence(mockReasoningResult);
      
      expect(confidenceAssessment).to.have.property('level');
      expect(confidenceAssessment).to.have.property('numerical');
      expect(confidenceAssessment).to.have.property('assessment');
      
      // 0.75 is between medium (0.5) and high (0.8) thresholds
      expect(confidenceAssessment.level).to.equal('medium');
      expect(confidenceAssessment.numerical).to.equal(0.75);
    });

    it('should identify potential biases in reasoning', () => {
      const biasAnalysis = carSystem.critiqueLayer.analyzeBias(mockReasoningResult);
      
      expect(biasAnalysis).to.have.property('biasesIdentified');
      expect(biasAnalysis).to.have.property('biases');
      
      if (biasAnalysis.biasesIdentified) {
        expect(biasAnalysis.biases).to.be.an('array');
        expect(biasAnalysis.biases[0]).to.have.property('type');
        expect(biasAnalysis.biases[0]).to.have.property('description');
        expect(biasAnalysis.biases[0]).to.have.property('confidence');
      }
    });

    it('should evaluate alternative perspectives', () => {
      const alternativePerspectives = carSystem.critiqueLayer.evaluateAlternativePerspectives(mockReasoningResult);
      
      expect(alternativePerspectives).to.be.an('array');
      expect(alternativePerspectives.length).to.be.greaterThan(0);
      expect(alternativePerspectives[0]).to.have.property('perspective');
      expect(alternativePerspectives[0]).to.have.property('judgment');
      expect(alternativePerspectives[0]).to.have.property('confidence');
      expect(alternativePerspectives[0]).to.have.property('rationale');
    });

    it('should generate meta-cognitive commentary on reasoning', () => {
      const metacognition = carSystem.critiqueLayer.generateMetacognition(mockReasoningResult);
      
      expect(metacognition).to.have.property('strengths');
      expect(metacognition).to.have.property('limitations');
      expect(metacognition).to.have.property('confidenceAssessment');
      expect(metacognition).to.have.property('alternativeViewpoints');
      
      expect(metacognition.strengths).to.be.an('array');
      expect(metacognition.limitations).to.be.an('array');
    });

    it('should process reasoning results to create critique and limitations', () => {
      const critiqueResult = carSystem.critiqueLayer.process(mockReasoningResult);
      
      expect(critiqueResult).to.have.property('confidenceAssessment');
      expect(critiqueResult).to.have.property('epistemicLimitations');
      expect(critiqueResult).to.have.property('biasAssessment');
      expect(critiqueResult).to.have.property('alternativePerspectives');
      expect(critiqueResult).to.have.property('metacognition');
    });
  });

  describe('Categorical Imperative', () => {
    it('should evaluate maxims against the universal law formulation', () => {
      const categoricalImperative = new CategoricalImperative({
        universalLaw: true,
        humanityAsEnd: true,
        kingdomOfEnds: true
      });
      
      const maxim = 'Entities may collect and use personal data without informed consent when it benefits their interests';
      
      const universalLawEvaluation = categoricalImperative.evaluateUniversalLaw(maxim);
      
      expect(universalLawEvaluation).to.have.property('result');
      expect(universalLawEvaluation).to.have.property('reasoning');
      expect(universalLawEvaluation.result).to.be.a('boolean');
      expect(universalLawEvaluation.reasoning).to.be.a('string');
      
      // This maxim should fail the universal law test
      expect(universalLawEvaluation.result).to.be.false;
    });

    it('should evaluate actions against the humanity as end formulation', () => {
      const categoricalImperative = new CategoricalImperative({
        universalLaw: true,
        humanityAsEnd: true,
        kingdomOfEnds: true
      });
      
      const action = {
        description: 'Using people\'s data to manipulate their behavior without their knowledge',
        stakeholders: [
          { party: 'Company', interests: ['profit maximization', 'market advantage'] },
          { party: 'Users', interests: ['autonomy', 'informed choice', 'privacy'] }
        ],
        context: 'Digital platform design'
      };
      
      const humanityAsEndEvaluation = categoricalImperative.evaluateHumanityAsEnd(action);
      
      expect(humanityAsEndEvaluation).to.have.property('result');
      expect(humanityAsEndEvaluation).to.have.property('reasoning');
      expect(humanityAsEndEvaluation.result).to.be.a('boolean');
      expect(humanityAsEndEvaluation.reasoning).to.be.a('string');
      
      // This action should fail the humanity as end test
      expect(humanityAsEndEvaluation.result).to.be.false;
    });

    it('should evaluate governance structures against the kingdom of ends formulation', () => {
      const categoricalImperative = new CategoricalImperative({
        universalLaw: true,
        humanityAsEnd: true,
        kingdomOfEnds: true
      });
      
      const governance = {
        description: 'A democratic system where all affected stakeholders have meaningful voice in decisions',
        powerDistribution: 'distributed',
        participationMechanisms: ['deliberative forums', 'voting rights', 'appeal mechanisms'],
        accountability: 'transparent processes with feedback loops'
      };
      
      const kingdomOfEndsEvaluation = categoricalImperative.evaluateKingdomOfEnds(governance);
      
      expect(kingdomOfEndsEvaluation).to.have.property('result');
      expect(kingdomOfEndsEvaluation).to.have.property('reasoning');
      expect(kingdomOfEndsEvaluation.result).to.be.a('boolean');
      expect(kingdomOfEndsEvaluation.reasoning).to.be.a('string');
      
      // This governance structure should pass the kingdom of ends test
      expect(kingdomOfEndsEvaluation.result).to.be.true;
    });

    it('should perform comprehensive ethics evaluation with all enabled formulations', () => {
      const categoricalImperative = new CategoricalImperative({
        universalLaw: true,
        humanityAsEnd: true,
        kingdomOfEnds: true
      });
      
      const ethicalScenario = {
        maxim: 'Companies may prioritize profit over user wellbeing when designing products',
        action: {
          description: 'Designing products to maximize engagement without regard for mental health impacts',
          stakeholders: [
            { party: 'Company', interests: ['profit', 'growth', 'competitive advantage'] },
            { party: 'Users', interests: ['wellbeing', 'autonomy', 'informed choice'] }
          ],
          context: 'Digital product design'
        },
        governance: {
          description: 'Closed decision-making by executives without user representation',
          powerDistribution: 'centralized',
          participationMechanisms: ['market choice only'],
          accountability: 'limited to financial performance'
        }
      };
      
      const comprehensiveEvaluation = categoricalImperative.evaluate(ethicalScenario);
      
      expect(comprehensiveEvaluation).to.have.property('universalLaw');
      expect(comprehensiveEvaluation).to.have.property('humanityAsEnd');
      expect(comprehensiveEvaluation).to.have.property('kingdomOfEnds');
      expect(comprehensiveEvaluation).to.have.property('overall');
      
      expect(comprehensiveEvaluation.overall).to.have.property('pass');
      expect(comprehensiveEvaluation.overall).to.have.property('reasoning');
      
      // This scenario should fail the overall evaluation
      expect(comprehensiveEvaluation.overall.pass).to.be.false;
    });
    
    it('should only evaluate specified formulations', () => {
      const limitedCategoricalImperative = new CategoricalImperative({
        universalLaw: true,
        humanityAsEnd: false, // Disabled
        kingdomOfEnds: true
      });
      
      const ethicalScenario = {
        maxim: 'Test maxim for limited evaluation',
        action: {
          description: 'Test action description',
          stakeholders: [
            { party: 'Party A', interests: ['interest 1', 'interest 2'] },
            { party: 'Party B', interests: ['interest 3', 'interest 4'] }
          ]
        },
        governance: {
          description: 'Test governance description',
          powerDistribution: 'distributed'
        }
      };
      
      const limitedEvaluation = limitedCategoricalImperative.evaluate(ethicalScenario);
      
      expect(limitedEvaluation).to.have.property('universalLaw');
      expect(limitedEvaluation).to.not.have.property('humanityAsEnd');
      expect(limitedEvaluation).to.have.property('kingdomOfEnds');
    });
  });

  describe('Epistemic Boundary Handling', () => {
    it('should correctly identify when processing crosses epistemic boundaries', () => {
      const epistemicBoundary = new EpistemicBoundary('test-domain', [
        'future prediction beyond 5 years',
        'subjective experience of consciousness',
        'expert medical diagnosis'
      ]);
      
      const inputCrossingBoundary = {
        query: 'Predict the stock market in 2035',
        context: 'Economic forecasting',
        timeframe: '10 years'
      };
      
      const boundaryCheck = epistemicBoundary.check(inputCrossingBoundary);
      
      expect(boundaryCheck).to.have.property('beyondBoundaries');
      expect(boundaryCheck.beyondBoundaries).to.be.true;
      expect(boundaryCheck).to.have.property('boundaries');
      expect(boundaryCheck.boundaries[0]).to.include('future prediction beyond 5 years');
    });

    it('should provide confidence adjustments based on proximity to boundaries', () => {
      const epistemicBoundary = new EpistemicBoundary('test-domain', [
        'future prediction beyond 5 years',
        'subjective experience of consciousness',
        'expert medical diagnosis'
      ]);
      
      const inputNearBoundary = {
        query: 'Predict the stock market in 2028',
        context: 'Economic forecasting',
        timeframe: '4 years'
      };
      
      const confidenceAdjustment = epistemicBoundary.getConfidenceAdjustment(inputNearBoundary);
      
      expect(confidenceAdjustment).to.have.property('factor');
      expect(confidenceAdjustment).to.have.property('reason');
      expect(confidenceAdjustment.factor).to.be.a('number');
      expect(confidenceAdjustment.factor).to.be.lessThan(1); // Should reduce confidence
    });

    it('should generate appropriate explanations for boundary limitations', () => {
      const epistemicBoundary = new EpistemicBoundary('test-domain', [
        'future prediction beyond 5 years',
        'subjective experience of consciousness',
        'expert medical diagnosis'
      ]);
      
      const inputCrossingBoundary = {
        query: 'Diagnose these medical symptoms',
        context: 'Healthcare',
        domain: 'medical'
      };
      
      const boundaryCheck = epistemicBoundary.check(inputCrossingBoundary);
      const explanation = epistemicBoundary.generateExplanation(boundaryCheck);
      
      expect(explanation).to.be.a('string');
      expect(explanation).to.include('expert medical diagnosis');
      expect(explanation).to.include('limitation');
    });

    it('should integrate with the critique layer for system-wide boundary awareness', () => {
      // Configure system with specific boundaries
      const boundaryOptions = {
        ...defaultOptions,
        epistemicBoundaries: [
          'future prediction beyond 5 years',
          'subjective experience of consciousness',
          'expert medical diagnosis'
        ]
      };
      
      const boundaryAwareSystem = new CAR(boundaryOptions);
      
      // Create a mock reasoning result that crosses boundaries
      const mockCrossingResult = {
        inferences: [
          {
            premise: 'User has described symptoms X, Y, and Z',
            conclusion: 'User likely has medical condition A',
            confidence: 0.6,
            method: 'pattern-matching',
            valid: true,
            domain: 'medical'
          }
        ],
        judgments: [
          {
            statement: 'Based on the symptoms, this appears to be condition A',
            confidence: 0.6,
            category: 'medical-diagnosis'
          }
        ]
      };
      
      const critiqueResult = boundaryAwareSystem.critiqueLayer.process(mockCrossingResult);
      
      expect(critiqueResult.epistemicLimitations).to.be.an('array');
      expect(critiqueResult.epistemicLimitations.length).to.be.greaterThan(0);
      expect(critiqueResult.epistemicLimitations[0]).to.include('expert medical diagnosis');
    });
  });

  describe('Schematism Bridge', () => {
    it('should connect abstract concepts with concrete instances', () => {
      const schematism = new SchematismBridge({
        bridgeNeuralSymbolic: true,
        contextualAdaptation: true
      });
      
      const abstractConcept = {
        name: 'Autonomy',
        definition: 'Capacity for self-determination according to self-given principles',
        category: 'ethical-principle'
      };
      
      const concreteInstance = {
        description: 'A user deciding whether to share personal data with a service',
        context: 'Digital privacy choice',
        domain: 'data-ethics'
      };
      
      const bridge = schematism.bridgeConcepts(abstractConcept, concreteInstance);
      
      expect(bridge).to.have.property('mappings');
      expect(bridge).to.have.property('applicationRules');
      expect(bridge).to.have.property('confidenceLevel');
      
      expect(bridge.mappings).to.be.an('array');
      expect(bridge.mappings[0]).to.have.property('abstract');
      expect(bridge.mappings[0]).to.have.property('concrete');
      expect(bridge.mappings[0]).to.have.property('relation');
    });

    it('should generate application rules for principles in specific contexts', () => {
      const schematism = new SchematismBridge({
        bridgeNeuralSymbolic: true,
        contextualAdaptation: true
      });
      
      const principle = {
        name: 'Informed Consent',
        definition: 'Agreement based on full understanding of implications',
        domain: 'ethics'
      };
      
      const context = {
        domain: 'healthcare',
        situation: 'treatment decision',
        stakeholders: ['patient', 'doctor', 'family']
      };
      
      const applicationRules = schematism.generateApplicationRules(principle, context);
      
      expect(applicationRules).to.be.an('array');
      expect(applicationRules.length).to.be.greaterThan(0);
      expect(applicationRules[0]).to.have.property('rule');
      expect(applicationRules[0]).to.have.property('rationale');
      expect(applicationRules[0]).to.have.property('conditions');
    });

    it('should adapt rules based on context-specific factors', () => {
      const schematism = new SchematismBridge({
        bridgeNeuralSymbolic: true,
        contextualAdaptation: true
      });
      
      const baseRule = {
        rule: 'Personal data should only be collected with explicit consent',
        domain: 'data-ethics',
        priority: 'high'
      };
      
      const context1 = {
        situation: 'Normal website usage',
        userType: 'adult',
        dataType: 'preferences'
      };
      
      const context2 = {
        situation: 'Medical emergency',
        userType: 'patient',
        dataType: 'health'
      };
      
      const adaptedRule1 = schematism.adaptRule(baseRule, context1);
      const adaptedRule2 = schematism.adaptRule(baseRule, context2);
      
      expect(adaptedRule1).to.not.deep.equal(adaptedRule2);
      expect(adaptedRule1).to.have.property('rule');
      expect(adaptedRule2).to.have.property('rule');
      expect(adaptedRule1).to.have.property('applicationNotes');
      expect(adaptedRule2).to.have.property('applicationNotes');
      
      // Emergency context should have different application notes
      expect(adaptedRule2.applicationNotes).to.include('emergency');
    });

    it('should connect neural representations with symbolic rules', () => {
      const schematism = new SchematismBridge({
        bridgeNeuralSymbolic: true,
        contextualAdaptation: true
      });
      
      // Mock neural representation (e.g., vector embedding)
      const neuralRepresentation = {
        vector: [0.2, 0.4, -0.1, 0.7, -0.5],
        confidence: 0.85,
        sourceType: 'neural-embedding'
      };
      
      // Symbolic rule structure
      const symbolicRules = [
        {
          id: 'rule_1',
          content: 'Personal data requires explicit consent',
          domain: 'privacy',
          predicates: ['requires(personal_data, explicit_consent)']
        },
        {
          id: 'rule_2',
          content: 'Medical emergencies may override normal consent requirements',
          domain: 'healthcare',
          predicates: ['may_override(medical_emergency, normal_consent)']
        }
      ];
      
      const bridgeResult = schematism.connectNeuralSymbolic(neuralRepresentation, symbolicRules);
      
      expect(bridgeResult).to.have.property('connections');
      expect(bridgeResult).to.have.property('mapping');
      expect(bridgeResult).to.have.property('confidence');
      
      expect(bridgeResult.connections).to.be.an('array');
      expect(bridgeResult.connections[0]).to.have.property('neuralComponent');
      expect(bridgeResult.connections[0]).to.have.property('symbolicComponent');
      expect(bridgeResult.connections[0]).to.have.property('strength');
    });

    it('should integrate with the overall CAR system to bridge layers', () => {
      const inputData = {
        query: 'Is it ethical to use customer data for personalized marketing?',
        context: 'E-commerce business strategy',
        domain: 'business-ethics'
      };
      
      // Process through entire CAR system
      const result = carSystem.process(inputData);
      
      // Check that schematism connections are present
      expect(result).to.have.property('schematism');
      expect(result.schematism).to.have.property('concepts');
      expect(result.schematism).to.have.property('applications');
      expect(result.schematism.concepts).to.be.an('array');
    });
  });

  describe('End-to-End Processing', () => {
    it('should process input through all layers correctly', () => {
      const inputData = {
        query: 'Is it ethical to develop AI systems that could replace human workers?',
        context: 'AI development ethics',
        metadata: {
          source: 'user-query',
          priority: 'high',
          domain: 'ai-ethics'
        }
      };
      
      const result = carSystem.process(inputData);
      
      // Check that result contains outputs from all layers
      expect(result).to.have.property('perceptions');
      expect(result).to.have.property('categories');
      expect(result).to.have.property('judgments');
      expect(result).to.have.property('confidence');
      expect(result).to.have.property('reasoning');
      expect(result).to.have.property('limitations');
      
      // Check that categorical imperative analysis is included
      expect(result).to.have.property('ethicalAnalysis');
      expect(result.ethicalAnalysis).to.have.property('categoricalImperative');
    });

    it('should appropriately handle epistemically challenging inputs', () => {
      const challengingInput = {
        query: 'What will be the exact global temperature in 2075?',
        context: 'Climate prediction',
        requiredPrecision: 'exact',
        timeframe: 'long-term'
      };
      
      const result = carSystem.process(challengingInput);
      
      // Should identify epistemic limitations
      expect(result).to.have.property('limitations');
      expect(result.limitations).to.be.an('array');
      expect(result.limitations.length).to.be.greaterThan(0);
      
      // Should adjust confidence appropriately
      expect(result).to.have.property('confidence');
      expect(result.confidence).to.be.a('number');
      expect(result.confidence).to.be.lessThan(defaultOptions.confidenceThresholds.medium);
    });

    it('should provide appropriate explanations for judgments', () => {
      const inputData = {
        query: 'Should I implement a recommendation algorithm that maximizes user engagement?',
        context: 'Product design ethics',
        domain: 'technology-ethics',
        explainabilityRequired: true
      };
      
      const result = carSystem.process(inputData);
      
      expect(result).to.have.property('explanation');
      expect(result.explanation).to.be.an('object');
      expect(result.explanation).to.have.property('judgment');
      expect(result.explanation).to.have.property('reasoning');
      expect(result.explanation).to.have.property('factors');
      expect(result.explanation).to.have.property('alternatives');
      expect(result.explanation).to.have.property('limitations');
      
      expect(result.explanation.factors).to.be.an('array');
      expect(result.explanation.factors.length).to.be.greaterThan(0);
    });

    it('should apply domain-specific knowledge when available', () => {
      // Set up domain-specific knowledge
      carSystem.setDomainKnowledge('technology-ethics', {
        principles: [
          {
            name: 'User Autonomy',
            description: 'Technology should enhance rather than undermine user agency',
            priority: 'high'
          },
          {
            name: 'Transparency',
            description: 'Users should understand how systems affect their experience',
            priority: 'high'
          }
        ],
        cases: [
          {
            description: 'Engagement-maximizing algorithms that exploit psychological vulnerabilities',
            evaluation: 'ethically problematic',
            reasoning: 'Undermines user autonomy by designing for compulsion rather than conscious choice'
          }
        ]
      });
      
      const inputData = {
        query: 'Is it appropriate to design features that maximize time spent in our app?',
        context: 'Product design decision',
        domain: 'technology-ethics'
      };
      
      const result = carSystem.process(inputData);
      
      // Should reference domain knowledge in reasoning
      expect(result).to.have.property('reasoning');
      expect(result.reasoning).to.include('User Autonomy');
    });

    it('should handle complex ethical scenarios with nuanced judgments', () => {
      const complexScenario = {
        query: 'Is it ethical to implement behavioral nudges that encourage users to make healthier choices?',
        context: 'Health app design',
        details: {
          nudgeType: 'default options and interface design',
          transparency: 'partial disclosure of influence techniques',
          userControl: 'opt-out available but not prominent',
          goal: 'improving user health outcomes',
          beneficiary: 'both user and company'
        }
      };
      
      const result = carSystem.process(complexScenario);
      
      expect(result).to.have.property('judgment');
      expect(result).to.have.property('nuance');
      expect(result.nuance).to.be.an('object');
      expect(result.nuance).to.have.property('conditions');
      expect(result.nuance).to.have.property('tensions');
      expect(result.nuance).to.have.property('recommendations');
      
      expect(result.nuance.conditions).to.be.an('array');
      expect(result.nuance.conditions.length).to.be.greaterThan(0);
      
      // Should present a balanced view rather than binary judgment
      expect(result.judgment).to.not.match(/^(yes|no)$/i);
    });
  });

  describe('Integration Testing', () => {
    it('should update confidence based on critique layer feedback', () => {
      // Create a system with a spy on the critique layer
      const critiqueSpy = sinon.spy(carSystem.critiqueLayer, 'assessConfidence');
      
      const inputData = {
        query: 'Test query for confidence assessment',
        context: 'Test context'
      };
      
      carSystem.process(inputData);
      
      expect(critiqueSpy.called).to.be.true;
      
      // Original confidence from reason layer should be adjusted by critique layer
      const initialConfidence = critiqueSpy.firstCall.args[0].confidence;
      const finalResult = carSystem.process(inputData);
      
      // System should use adjusted confidence
      expect(finalResult.confidence).to.not.equal(initialConfidence);
    });

    it('should propagate epistemic boundaries from configuration to final output', () => {
      // System with specific boundaries
      const boundaryOptions = {
        ...defaultOptions,
        epistemicBoundaries: ['specific-test-boundary-for-propagation']
      };
      
      const boundarySystem = new CAR(boundaryOptions);
      
      // Input that should trigger the boundary
      const boundaryTriggeringInput = {
        query: 'Query related to specific-test-boundary-for-propagation',
        context: 'specifically testing boundary propagation'
      };
      
      // Mock the boundary check to ensure it's triggered
      const boundaryMock = sinon.stub(boundarySystem.critiqueLayer, 'checkEpistemicBoundaries')
        .returns({
          beyondBoundaries: true,
          boundaries: [{
            boundary: 'specific-test-boundary-for-propagation',
            reason: 'Test reason for boundary crossing'
          }]
        });
      
      const result = boundarySystem.process(boundaryTriggeringInput);
      
      expect(boundaryMock.called).to.be.true;
      expect(result.limitations).to.be.an('array');
      expect(result.limitations[0]).to.include('specific-test-boundary-for-propagation');
    });

    it('should correctly handle conflicts between layers', () => {
      // Create system with layer conflicts
      const conflictOptions = { ...defaultOptions };
      const conflictSystem = new CAR(conflictOptions);
      
      // Mock understanding layer to produce one categorical assignment
      sinon.stub(conflictSystem.understandingLayer, 'categorize').returns({
        category: 'category-A',
        confidence: 0.8
      });
      
      // Mock reason layer to produce a conflicting judgment
      sinon.stub(conflictSystem.reasonLayer, 'makeJudgments').returns([
        {
          statement: 'This belongs to category B, not A',
          confidence: 0.7,
          category: 'category-B',
          evidenceBase: ['conflicting-evidence']
        }
      ]);
      
      const result = conflictSystem.process({ query: 'test query for conflict' });
      
      // Critique layer should identify and address the conflict
      expect(result).to.have.property('conflicts');
      expect(result.conflicts).to.be.an('array');
      expect(result.conflicts.length).to.be.greaterThan(0);
      expect(result.conflicts[0]).to.have.property('resolution');
    });

    it('should record the processing sequence for explainability', () => {
      // Create system with tracing enabled
      const tracingOptions = {
        ...defaultOptions,
        tracing: true
      };
      
      const tracingSystem = new CAR(tracingOptions);
      
      const result = tracingSystem.process({ query: 'test query for tracing' });
      
      expect(result).to.have.property('processingTrace');
      expect(result.processingTrace).to.be.an('array');
      expect(result.processingTrace.length).to.be.greaterThan(3); // Should have at least 4 layers
      
      // Check that layers are traced in the correct order
      expect(result.processingTrace[0].layer).to.equal('sensibility');
      expect(result.processingTrace[1].layer).to.equal('understanding');
      expect(result.processingTrace[2].layer).to.equal('reason');
      expect(result.processingTrace[3].layer).to.equal('critique');
    });
  });

  describe('Extensibility and Customization', () => {
    it('should allow custom layer implementations', () => {
      // Create custom implementation of sensibility layer
      class CustomSensibilityLayer extends SensibilityLayer {
        process(data: any): any {
          const result = super.process(data);
          result.customField = 'custom processing';
          return result;
        }
      }
      
      // Create system with custom layer
      const customLayerOptions = { ...defaultOptions };
      const customSystem = new CAR(customLayerOptions);
      
      // Replace standard layer with custom implementation
      customSystem.sensibilityLayer = new CustomSensibilityLayer();
      
      const result = customSystem.process({ query: 'test for custom layer' });
      
      expect(result.perceptions).to.have.property('customField', 'custom processing');
    });

    it('should support domain-specific extensions', () => {
      // Create domain-specific extension
      const healthcareExtension = {
        name: 'healthcare-extension',
        categoriesMap: {
          'patient-data': ['privacy', 'medical-ethics', 'confidentiality'],
          'treatment-decision': ['informed-consent', 'best-interests', 'autonomy']
        },
        inferenceMethods: {
          'medical-guideline': (data: any) => ({
            conclusion: 'Medical guideline-based conclusion',
            confidence: 0.85
          })
        }
      };
      
      // Create system with extension
      const extendedOptions = { ...defaultOptions };
      const extendedSystem = new CAR(extendedOptions);
      
      // Register extension
      extendedSystem.registerDomainExtension('healthcare', healthcareExtension);
      
      const result = extendedSystem.process({
        query: 'Is sharing patient data with researchers ethical?',
        domain: 'healthcare',
        context: 'research protocol'
      });
      
      // Check that extension influenced processing
      expect(result).to.have.property('domainExtension', 'healthcare');
      expect(result.reasoning).to.include('medical-ethics');
    });

    it('should allow configuration of confidence thresholds', () => {
      // Create system with custom confidence thresholds
      const customConfidenceOptions = {
        ...defaultOptions,
        confidenceThresholds: {
          high: 0.9, // Stricter than default
          medium: 0.6, // Stricter than default
          low: 0.3 // Same as default
        }
      };
      
      const strictSystem = new CAR(customConfidenceOptions);
      
      // Process input that would be medium confidence in default system
      // but low confidence in strict system
      const mockReasoningResult = {
        confidence: 0.7, // Would be "medium" in default, but "low" in strict
        judgments: [
          { statement: 'Test judgment', confidence: 0.7 }
        ]
      };
      
      const defaultResult = carSystem.critiqueLayer.assessConfidence(mockReasoningResult);
      const strictResult = strictSystem.critiqueLayer.assessConfidence(mockReasoningResult);
      
      expect(defaultResult.level).to.equal('medium');
      expect(strictResult.level).to.equal('medium');
      expect(strictResult.assessment).to.not.equal(defaultResult.assessment);
    });

    it('should support custom categorical imperative formulations', () => {
      // Create system with custom categorical imperative configuration
      const customCIOptions = {
        ...defaultOptions,
        categoricalImperative: {
          universalLaw: true,
          humanityAsEnd: true,
          kingdomOfEnds: true,
          customFormulation: {
            name: 'Environmental Sustainability',
            description: 'Act in ways that could be sustained indefinitely by natural systems',
            enabled: true
          }
        }
      };
      
      // Extend CAR with custom categorical imperative
      class ExtendedCAR extends CAR {
        constructor(options: any) {
          super(options);
          
          // Replace standard categorical imperative with extended version
          if (options.categoricalImperative.customFormulation) {
            const extendedCI = new ExtendedCategoricalImperative(options.categoricalImperative);
            this.categoricalImperative = extendedCI;
          }
        }
      }
      
      // Extended categorical imperative with custom formulation
      class ExtendedCategoricalImperative extends CategoricalImperative {
        evaluateEnvironmentalSustainability(action: any): any {
          return {
            result: action.environmentalImpact === 'sustainable',
            reasoning: `Evaluated ${action.description} for environmental sustainability`
          };
        }
        
        evaluate(scenario: any): any {
          const standardEvaluation = super.evaluate(scenario);
          
          // Add custom formulation if enabled
          if (this.options.customFormulation && this.options.customFormulation.enabled) {
            standardEvaluation.environmentalSustainability = 
              this.evaluateEnvironmentalSustainability(scenario.action);
              
            // Update overall considering new formulation
            const allResults = [
              standardEvaluation.universalLaw?.result,
              standardEvaluation.humanityAsEnd?.result,
              standardEvaluation.kingdomOfEnds?.result,
              standardEvaluation.environmentalSustainability?.result
            ].filter(r => r !== undefined);
            
            standardEvaluation.overall = {
              pass: allResults.every(Boolean),
              reasoning: 'Updated overall assessment including environmental sustainability'
            };
          }
          
          return standardEvaluation;
        }
      }
      
      // Create extended system
      const extendedSystem = new ExtendedCAR(customCIOptions);
      
      // Test with scenario including environmental aspects
      const environmentalScenario = {
        maxim: 'Companies may prioritize short-term profit over environmental impacts',
        action: {
          description: 'Choosing manufacturing processes that pollute but are cheaper',
          environmentalImpact: 'unsustainable',
          stakeholders: [
            { party: 'Company', interests: ['profit'] },
            { party: 'Community', interests: ['clean environment'] },
            { party: 'Future Generations', interests: ['environmental health'] }
          ]
        }
      };
      
      const evaluation = extendedSystem.reasonLayer.applyCategoricalImperative(environmentalScenario);
      
      expect(evaluation).to.have.property('environmentalSustainability');
      expect(evaluation.environmentalSustainability).to.have.property('result', false);
    });
  });
});
