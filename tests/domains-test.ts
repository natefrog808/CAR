expect(misconceptionAnalysis).to.have.property('identifiedMisconceptions');
      expect(misconceptionAnalysis).to.have.property('evidencePatterns');
      expect(misconceptionAnalysis).to.have.property('confidenceLevel');
      expect(misconceptionAnalysis).to.have.property('remediationApproaches');
      
      expect(misconceptionAnalysis.identifiedMisconceptions).to.be.an('array');
      expect(misconceptionAnalysis.evidencePatterns).to.be.an('object');
      expect(misconceptionAnalysis.remediationApproaches).to.be.an('array');
      
      // Should identify sign error misconception from the pattern
      expect(misconceptionAnalysis.identifiedMisconceptions.some(m => 
        m.name.toLowerCase().includes('sign') || 
        m.description.toLowerCase().includes('sign'))).to.be.true;
      
      // Should provide evidence from specific questions
      expect(Object.keys(misconceptionAnalysis.evidencePatterns)).to.include.members(['question4', 'question5']);
      
      // Should provide targeted remediation approaches
      expect(misconceptionAnalysis.remediationApproaches.some(r => 
        r.misconception && (r.misconception.toLowerCase().includes('sign') || 
                            r.approach.toLowerCase().includes('sign')))).to.be.true;
    });
    
    it('should analyze learning progress over time', async () => {
      // Create a series of assessment points over time
      const assessmentSeries = [
        {
          ...mockAssessmentData,
          overallScore: 0.60,
          timestamp: '2023-01-10'
        },
        {
          ...mockAssessmentData,
          overallScore: 0.65,
          timestamp: '2023-02-15'
        },
        {
          ...mockAssessmentData,
          overallScore: 0.72,
          timestamp: '2023-03-20'
        }
      ];
      
      const progressAnalysis = await educationCAR.analyzeLearningProgress(
        mockLearnerProfile,
        assessmentSeries,
        {
          targetObjective: 'algebraic_reasoning',
          expectedGrowthRate: 0.05,  // per month
          timeScale: 'monthly'
        }
      );
      
      expect(progressAnalysis).to.have.property('growthRate');
      expect(progressAnalysis).to.have.property('trendAnalysis');
      expect(progressAnalysis).to.have.property('comparisonToExpected');
      expect(progressAnalysis).to.have.property('factorsAffectingProgress');
      expect(progressAnalysis).to.have.property('recommendations');
      
      expect(progressAnalysis.trendAnalysis).to.be.an('object');
      expect(progressAnalysis.factorsAffectingProgress).to.be.an('array');
      expect(progressAnalysis.recommendations).to.be.an('array');
      
      // Should calculate growth rate from assessment series
      expect(progressAnalysis.growthRate).to.be.a('number');
      
      // Should compare to expected growth rate
      expect(progressAnalysis.comparisonToExpected).to.have.property('rate');
      expect(progressAnalysis.comparisonToExpected).to.have.property('assessment');
      
      // Should consider learner profile factors
      expect(progressAnalysis.factorsAffectingProgress.some(f => 
        f.factor && f.factor.toLowerCase().includes('anxiety'))).to.be.true;
    });
    
    it('should respect epistemic limits in educational assessment', async () => {
      // Create a learner profile with limited data
      const limitedProfile: LearnerProfile = {
        demographics: {
          ageGroup: 'adolescent',
          educationLevel: 'secondary',
          languageProficiency: 'unknown'
        },
        learningPreferences: {
          modalityPreference: [],
          pacePreference: 'unknown',
          collaborationPreference: 'unknown'
        },
        knowledgeState: {
          domainKnowledge: {},
          prerequisiteCompletion: 0,
          misconceptions: []
        },
        learningHistory: {
          previousPerformance: [],
          learningChallenges: [],
          strengthAreas: []
        },
        goals: {
          shortTerm: '',
          longTerm: '',
          motivations: []
        }
      };
      
      const feedbackResult = await educationCAR.provideFeedback(mockAssessmentData, limitedProfile);
      
      expect(feedbackResult).to.have.property('epistemicLimitations');
      expect(feedbackResult.epistemicLimitations).to.be.an('array');
      expect(feedbackResult.epistemicLimitations.length).to.be.greaterThan(0);
      
      // Should acknowledge limitations in the feedback
      expect(feedbackResult.recommendations.some(r => 
        r.recommendationType === 'data_needed')).to.be.true;
      
      // Confidence should be lower due to limited learner data
      expect(feedbackResult.confidenceLevel).to.be.lessThan(0.7);
    });
  });
  
  /**
   * Governance Domain Tests
   */
  describe('Governance Domain Implementation', () => {
    let governanceCAR: CARGovernance;
    let mockPolicyContext: PolicyContext;
    
    beforeEach(() => {
      governanceCAR = new CARGovernance();
      
      // Setup mock policy context
      mockPolicyContext = {
        title: "Urban Transportation Policy Reform",
        description: "Developing a comprehensive transportation policy for a growing mid-sized city facing congestion, accessibility, and sustainability challenges.",
        geographicalContext: {
          area: "Urban and surrounding metropolitan region",
          population: "650,000 residents",
          jurisdictions: [
            "City government",
            "Metropolitan planning organization",
            "State/provincial transportation department",
            "Adjacent municipalities"
          ],
          keyFeatures: [
            "Dense urban core with historic districts",
            "Expanding suburban areas",
            "Major river bisecting the city",
            "Mixed industrial, commercial, and residential zones",
            "University campus and medical district"
          ]
        },
        currentContext: {
          existingPolicy: "Fragmented approach with focus on road infrastructure",
          challenges: [
            "Growing traffic congestion during peak hours",
            "Limited public transit options",
            "Poor accessibility for disabled residents",
            "High carbon emissions from transportation sector",
            "Aging infrastructure requiring investment"
          ],
          recentDevelopments: [
            "15% population growth over past decade",
            "Rising housing costs in urban core",
            "Increased public concern about climate impacts",
            "New technologies including ridesharing and e-mobility",
            "Change in political leadership with sustainability mandate"
          ]
        },
        stakeholders: [
          {
            group: "Residents",
            interests: [
              "Affordable and convenient transportation",
              "Reduced commute times",
              "Safe streets and transportation systems",
              "Neighborhood quality of life"
            ],
            subgroups: [
              "Urban core residents favoring walkability",
              "Suburban commuters reliant on personal vehicles",
              "Economically disadvantaged transit-dependent residents",
              "Elderly and disabled residents with accessibility needs"
            ],
            power: "Medium - Voting influence but varied organization"
          },
          {
            group: "Business Community",
            interests: [
              "Customer and employee access",
              "Freight and delivery efficiency",
              "Development opportunities",
              "Parking availability"
            ],
            subgroups: [
              "Downtown businesses concerned about access",
              "Industrial businesses requiring freight movement",
              "Small local businesses with limited resources",
              "Technology companies advocating innovation"
            ],
            power: "High - Economic influence and organized advocacy"
          },
          {
            group: "Government Agencies",
            interests: [
              "Policy implementation feasibility",
              "Budgetary constraints",
              "Cross-jurisdictional coordination",
              "Regulatory compliance"
            ],
            subgroups: [
              "Transportation department",
              "Planning department",
              "Environmental agencies",
              "Public health authorities"
            ],
            power: "Very High - Direct decision authority"
          },
          {
            group: "Advocacy Organizations",
            interests: [
              "Environmental sustainability",
              "Social equity",
              "Public health",
              "Alternative transportation modes"
            ],
            subgroups: [
              "Environmental groups focused on emissions reduction",
              "Social justice organizations focused on accessibility",
              "Public health advocates promoting active transportation",
              "Neighborhood associations with varied concerns"
            ],
            power: "Medium - Influence through advocacy and expertise"
          }
        ],
        policyConstraints: {
          budgetary: "Limited municipal budget with competing priorities",
          political: "Diverse stakeholder interests requiring balanced approach",
          temporal: "Need to address immediate issues while planning long-term",
          jurisdictional: "Coordination required across multiple authorities",
          legal: "Compliance with accessibility, environmental, and planning regulations"
        },
        policyValues: [
          {
            value: "Sustainability",
            description: "Reducing environmental impact and ensuring long-term viability",
            stakeholderSupport: {
              "Environmental Groups": "very high",
              "Progressive Residents": "high",
              "Traditional Businesses": "low to medium"
            }
          },
          {
            value: "Efficiency",
            description: "Optimizing transportation system to reduce congestion and travel times",
            stakeholderSupport: {
              "Commuters": "very high",
              "Businesses": "high",
              "Government Agencies": "high"
            }
          },
          {
            value: "Equity",
            description: "Ensuring fair access to transportation regardless of income, ability, or location",
            stakeholderSupport: {
              "Social Justice Groups": "very high",
              "Transit-Dependent Residents": "very high",
              "Suburban Residents": "low to medium"
            }
          },
          {
            value: "Economic Vitality",
            description: "Supporting business activity and economic development",
            stakeholderSupport: {
              "Business Community": "very high",
              "Development Interests": "high",
              "Government Agencies": "high"
            }
          },
          {
            value: "Public Health",
            description: "Promoting physical activity and reducing pollution-related health impacts",
            stakeholderSupport: {
              "Health Organizations": "very high",
              "Environmental Groups": "high",
              "Vehicle-Dependent Residents": "low"
            }
          }
        ]
      };
    });
    
    it('should initialize with governance-specific options', () => {
      expect(governanceCAR).to.be.an.instanceOf(CARGovernance);
      expect(governanceCAR).to.have.property('domain', 'governance');
      expect(governanceCAR).to.have.property('policyAnalysis');
      expect(governanceCAR).to.have.property('stakeholderEngagement');
      expect(governanceCAR).to.have.property('institutionalDesign');
    });
    
    it('should analyze policy options through categorical imperative', async () => {
      const policyOptions = [
        {
          name: "Auto-Centric Expansion",
          description: "Prioritize road capacity expansion and parking infrastructure",
          components: [
            "Road widening on major arterials",
            "New parking structures in congested areas",
            "Intelligent traffic management systems",
            "Improved road maintenance"
          ],
          impacts: {
            environmental: "Negative - increased emissions and land use for roads",
            economic: "Mixed - reduced congestion costs but high infrastructure expense",
            social: "Mixed - benefits drivers but may disadvantage non-drivers",
            health: "Negative - maintains sedentary transportation and pollution"
          },
          stakeholderSupport: {
            "Suburban Commuters": "high",
            "Traditional Businesses": "high",
            "Environmental Groups": "very low",
            "Transit-Dependent Residents": "low"
          },
          implementationFactors: {
            cost: "Very High",
            timeframe: "Medium to Long-term",
            technicalComplexity: "Medium",
            politicalFeasibility: "Medium"
          },
          underlyingMaxims: [
            "Transportation systems should prioritize personal vehicle mobility",
            "Individual transportation choice should be maximized even with societal costs",
            "Road capacity should be expanded to meet increasing demand",
            "Public investment should follow dominant mode preferences"
          ]
        },
        {
          name: "Public Transit Investment",
          description: "Develop comprehensive public transportation network",
          components: [
            "Bus rapid transit on major corridors",
            "Dedicated transit lanes",
            "Improved transit frequency and coverage",
            "Transit-first intersection design"
          ],
          impacts: {
            environmental: "Positive - reduced per capita emissions and land use",
            economic: "Mixed - increased mobility but significant public investment",
            social: "Positive - improved mobility for transit-dependent populations",
            health: "Positive - increased physical activity and reduced pollution"
          },
          stakeholderSupport: {
            "Urban Residents": "high",
            "Environmental Groups": "high",
            "Transit-Dependent Residents": "very high",
            "Suburban Commuters": "low to medium"
          },
          implementationFactors: {
            cost: "High",
            timeframe: "Medium to Long-term",
            technicalComplexity: "Medium",
            politicalFeasibility: "Medium"
          },
          underlyingMaxims: [
            "Transportation is a public service requiring comprehensive provision",
            "Shared mobility should be prioritized over individual vehicle use",
            "Public investment should focus on space-efficient and sustainable modes",
            "Transportation policy should address equity and accessibility"
          ]
        }
      ];
      
      const categoricalAnalysis = await governanceCAR.applyCategoricalImperative(policyOptions);
      
      expect(categoricalAnalysis).to.have.property('universalLaw');
      expect(categoricalAnalysis).to.have.property('humanityAsEnd');
      expect(categoricalAnalysis).to.have.property('kingdomOfEnds');
      
      expect(categoricalAnalysis.universalLaw).to.be.an('array');
      expect(categoricalAnalysis.humanityAsEnd).to.be.an('array');
      expect(categoricalAnalysis.kingdomOfEnds).to.be.an('array');
      
      // Auto-centric approach should struggle with universal law
      const autoCentricUniversalLaw = categoricalAnalysis.universalLaw.find(a => 
        a.option.includes('Auto-Centric'));
      
      expect(autoCentricUniversalLaw).to.exist;
      expect(autoCentricUniversalLaw.verdict).to.include('fail');
      
      // Public transit should do better on humanity as end test
      const transitHumanityAsEnd = categoricalAnalysis.humanityAsEnd.find(a => 
        a.option.includes('Public Transit'));
      
      expect(transitHumanityAsEnd).to.exist;
      expect(transitHumanityAsEnd.verdict).to.include('satisfies');
    });
    
    it('should design appropriate deliberative process', async () => {
      const deliberationDesign = await governanceCAR.designDeliberativeProcess(mockPolicyContext);
      
      expect(deliberationDesign).to.have.property('overview');
      expect(deliberationDesign).to.have.property('principles');
      expect(deliberationDesign).to.have.property('phases');
      expect(deliberationDesign).to.have.property('inclusionMechanisms');
      expect(deliberationDesign).to.have.property('knowledgeIntegration');
      
      expect(deliberationDesign.principles).to.be.an('array');
      expect(deliberationDesign.phases).to.be.an('array');
      expect(deliberationDesign.inclusionMechanisms).to.be.an('array');
      
      // Should have appropriate phases
      expect(deliberationDesign.phases.length).to.be.at.least(3);
      expect(deliberationDesign.phases.some(p => 
        p.name.toLowerCase().includes('problem') || p.name.toLowerCase().includes('framing'))).to.be.true;
      expect(deliberationDesign.phases.some(p => 
        p.name.toLowerCase().includes('option') || p.name.toLowerCase().includes('development'))).to.be.true;
      expect(deliberationDesign.phases.some(p => 
        p.name.toLowerCase().includes('decision') || p.name.toLowerCase().includes('recommendation'))).to.be.true;
      
      // Should include mechanisms for disadvantaged stakeholders
      expect(deliberationDesign.inclusionMechanisms.some(m => 
        m.group.toLowerCase().includes('disadvantaged') || 
        m.group.toLowerCase().includes('transit-dependent'))).to.be.true;
    });
    
    it('should perform comprehensive stakeholder analysis', async () => {
      const stakeholderAnalysis = await governanceCAR.analyzeStakeholders(mockPolicyContext);
      
      expect(stakeholderAnalysis).to.have.property('stakeholderMap');
      expect(stakeholderAnalysis).to.have.property('powerAnalysis');
      expect(stakeholderAnalysis).to.have.property('valueAlignments');
      expect(stakeholderAnalysis).to.have.property('potentialConflicts');
      expect(stakeholderAnalysis).to.have.property('engagementStrategies');
      
      expect(stakeholderAnalysis.stakeholderMap).to.be.an('object');
      expect(stakeholderAnalysis.powerAnalysis).to.be.an('object');
      expect(stakeholderAnalysis.potentialConflicts).to.be.an('array');
      expect(stakeholderAnalysis.engagementStrategies).to.be.an('array');
      
      // Should identify power imbalances
      expect(stakeholderAnalysis.powerAnalysis).to.have.property('imbalances');
      expect(stakeholderAnalysis.powerAnalysis.imbalances).to.be.an('array');
      
      // Should identify value conflicts between stakeholders
      expect(stakeholderAnalysis.potentialConflicts.length).to.be.greaterThan(0);
      
      // Should have specific engagement strategies for different stakeholder types
      expect(stakeholderAnalysis.engagementStrategies.some(s => 
        s.stakeholderType && s.approach && s.rationale)).to.be.true;
    });
    
    it('should design institutional structure for policy implementation', async () => {
      const implementationContext = {
        policyContext: mockPolicyContext,
        selectedApproach: {
          name: "Integrated Multi-Modal Transportation Strategy",
          components: [
            "Enhanced public transit network",
            "Complete streets redesign for key corridors",
            "Bicycle infrastructure expansion",
            "Transportation demand management programs",
            "Transit-oriented development incentives"
          ],
          timeframe: "10-year implementation horizon",
          resources: "Municipal budget with state/federal grants"
        },
        governanceChallenges: [
          "Coordination across multiple departments and jurisdictions",
          "Sustained implementation across political cycles",
          "Technical expertise requirements",
          "Public accountability mechanisms",
          "Adaptive management needs"
        ]
      };
      
      const institutionalDesign = await governanceCAR.designInstitutionalStructure(implementationContext);
      
      expect(institutionalDesign).to.have.property('governanceStructure');
      expect(institutionalDesign).to.have.property('decisionProcesses');
      expect(institutionalDesign).to.have.property('accountabilityMechanisms');
      expect(institutionalDesign).to.have.property('coordinationFrameworks');
      expect(institutionalDesign).to.have.property('adaptiveElements');
      
      expect(institutionalDesign.governanceStructure).to.be.an('object');
      expect(institutionalDesign.decisionProcesses).to.be.an('array');
      expect(institutionalDesign.accountabilityMechanisms).to.be.an('array');
      
      // Should have an appropriate governance body
      expect(institutionalDesign.governanceStructure).to.have.property('primaryBody');
      expect(institutionalDesign.governanceStructure).to.have.property('components');
      expect(institutionalDesign.governanceStructure.components).to.be.an('array');
      
      // Should include stakeholder representation
      expect(institutionalDesign.governanceStructure.components.some(c => 
        c.name.toLowerCase().includes('stakeholder') || 
        c.function.toLowerCase().includes('stakeholder'))).to.be.true;
      
      // Should include adaptive management elements
      expect(institutionalDesign.adaptiveElements).to.be.an('array');
      expect(institutionalDesign.adaptiveElements.length).to.be.greaterThan(0);
    });
    
    it('should evaluate policy impacts across multiple dimensions', async () => {
      const policyProposal = {
        name: "Comprehensive Transit Investment",
        description: "Major expansion of public transportation with supporting policies",
        components: [
          "Bus rapid transit network on major corridors",
          "Transit priority lanes and signal systems",
          "Expanded service hours and frequency",
          "Integrated fare system with affordability programs",
          "Transit-oriented development incentives",
          "First/last mile connection improvements"
        ],
        implementationTimeframe: "5-10 years",
        budget: "High initial investment, ongoing operational costs",
        expectedOutcomes: {
          transitRidership: "50% increase over 10 years",
          modeShift: "10% reduction in single-occupancy vehicle trips",
          emissions: "15% reduction in transportation emissions",
          accessibility: "Improved transit access for 75% of population"
        }
      };
      
      const impactAnalysis = await governanceCAR.evaluatePolicyImpacts(
        policyProposal,
        mockPolicyContext
      );
      
      expect(impactAnalysis).to.have.property('environmentalImpacts');
      expect(impactAnalysis).to.have.property('socialImpacts');
      expect(impactAnalysis).to.have.property('economicImpacts');
      expect(impactAnalysis).to.have.property('distributionalAnalysis');
      expect(impactAnalysis).to.have.property('uncertaintyAssessment');
      expect(impactAnalysis).to.have.property('tradeoffs');
      
      expect(impactAnalysis.environmentalImpacts).to.be.an('object');
      expect(impactAnalysis.socialImpacts).to.be.an('object');
      expect(impactAnalysis.economicImpacts).to.be.an('object');
      expect(impactAnalysis.distributionalAnalysis).to.be.an('object');
      expect(impactAnalysis.tradeoffs).to.be.an('array');
      
      // Should include quantitative and qualitative impacts
      expect(impactAnalysis.environmentalImpacts).to.have.property('quantitative');
      expect(impactAnalysis.environmentalImpacts).to.have.property('qualitative');
      
      // Should analyze distribution of impacts across stakeholders
      expect(impactAnalysis.distributionalAnalysis).to.have.property('benefitDistribution');
      expect(impactAnalysis.distributionalAnalysis).to.have.property('costDistribution');
      expect(impactAnalysis.distributionalAnalysis).to.have.property('equityAssessment');
      
      // Should identify key uncertainties
      expect(impactAnalysis.uncertaintyAssessment).to.have.property('keyUncertainties');
      expect(impactAnalysis.uncertaintyAssessment.keyUncertainties).to.be.an('array');
    });
    
    it('should resolve policy antinomies through dialectical reasoning', async () => {
      const policyAntinomy = {
        title: "Efficiency vs. Equity in Transportation Planning",
        thesis: {
          statement: "Transportation planning should prioritize system efficiency and travel time reduction",
          arguments: [
            "Congestion creates significant economic costs through lost productivity",
            "Efficient movement of people and goods is essential for economic vitality",
            "Time savings benefit all transportation system users",
            "Inefficient transportation wastes resources and increases emissions"
          ],
          stakeholders: ["Commuters", "Businesses", "Freight operators", "Regional planners"]
        },
        antithesis: {
          statement: "Transportation planning should prioritize equitable access and distribution of benefits",
          arguments: [
            "Focus on efficiency typically benefits already advantaged populations",
            "Transportation is essential for accessing opportunities and services",
            "Historical infrastructure investments have created spatial inequities",
            "Market-driven approaches inadequately serve vulnerable populations"
          ],
          stakeholders: ["Transit-dependent residents", "Lower-income communities", "People with disabilities", "Social justice advocates"]
        }
      };
      
      const resolutionAnalysis = await governanceCAR.resolveGovernanceAntinomy(policyAntinomy, mockPolicyContext);
      
      expect(resolutionAnalysis).to.have.property('dialecticalSynthesis');
      expect(resolutionAnalysis).to.have.property('philosophicalGrounding');
      expect(resolutionAnalysis).to.have.property('practicalImplementation');
      expect(resolutionAnalysis).to.have.property('stakeholderConsiderations');
      
      expect(resolutionAnalysis.dialecticalSynthesis).to.be.an('object');
      expect(resolutionAnalysis.practicalImplementation).to.be.an('object');
      
      // Should provide a synthetic resolution
      expect(resolutionAnalysis.dialecticalSynthesis).to.have.property('statement');
      expect(resolutionAnalysis.dialecticalSynthesis).to.have.property('synthesizingPrinciples');
      
      // Should ground in Kantian philosophy
      expect(resolutionAnalysis.philosophicalGrounding).to.have.property('kantianPrinciples');
      expect(resolutionAnalysis.philosophicalGrounding.kantianPrinciples).to.be.an('array');
      
      // Should provide practical implementation steps
      expect(resolutionAnalysis.practicalImplementation).to.have.property('approaches');
      expect(resolutionAnalysis.practicalImplementation.approaches).to.be.an('array');
      
      // Should address impacts on various stakeholders
      expect(resolutionAnalysis.stakeholderConsiderations).to.be.an('object');
      expect(Object.keys(resolutionAnalysis.stakeholderConsiderations).length).to.be.greaterThan(1);
    });
    
    it('should generate policy recommendations with ethical justification', async () => {
      // First perform categorical imperative analysis
      const policyOptions = [
        {
          name: "Auto-Centric Expansion",
          description: "Prioritize road capacity expansion and parking infrastructure",
          underlyingMaxims: [
            "Transportation systems should prioritize personal vehicle mobility",
            "Individual transportation choice should be maximized even with societal costs"
          ]
        },
        {
          name: "Public Transit Investment",
          description: "Develop comprehensive public transportation network",
          underlyingMaxims: [
            "Transportation is a public service requiring comprehensive provision",
            "Shared mobility should be prioritized over individual vehicle use"
          ]
        },
        {
          name: "Multi-Modal Integration",
          description: "Balanced approach integrating multiple transportation modes",
          underlyingMaxims: [
            "Transportation systems should provide diverse options for diverse needs",
            "Public investment should balance efficiency, equity, and environmental impacts"
          ]
        }
      ];
      
      const categoricalAnalysis = await governanceCAR.applyCategoricalImperative(policyOptions);
      
      // Then generate policy recommendation
      const policyRecommendation = await governanceCAR.generatePolicyRecommendation(
        mockPolicyContext,
        policyOptions,
        categoricalAnalysis
      );
      
      expect(policyRecommendation).to.have.property('title');
      expect(policyRecommendation).to.have.property('summary');
      expect(policyRecommendation).to.have.property('components');
      expect(policyRecommendation).to.have.property('valueAlignment');
      expect(policyRecommendation).to.have.property('implementation');
      expect(policyRecommendation).to.have.property('ethicalJustification');
      
      expect(policyRecommendation.components).to.be.an('array');
      expect(policyRecommendation.valueAlignment).to.be.an('object');
      expect(policyRecommendation.implementation).to.be.an('array');
      
      // Should include ethical justification based on categorical imperative
      expect(policyRecommendation.ethicalJustification).to.include.oneOf([
        'categorical imperative',
        'universalizable',
        'humanity as end',
        'kingdom of ends'
      ]);
      
      // Should address all key stakeholders
      mockPolicyContext.stakeholders.forEach(stakeholder => {
        expect(policyRecommendation.summary + policyRecommendation.ethicalJustification)
          .to.include.oneOf([stakeholder.group.toLowerCase(), ...stakeholder.interests.map(i => i.toLowerCase())]);
      });
    });
    
    it('should address deep uncertainty in policy analysis', async () => {
      // Add climate change uncertainty to the policy context
      const uncertainContext = { ...mockPolicyContext };
      uncertainContext.uncertaintyFactors = [
        {
          factor: "Climate Change Impacts",
          description: "Uncertainty about severity and timing of climate impacts on infrastructure",
          range: "From moderate impact manageable with current approaches to severe impacts requiring transformation",
          timeframe: "Increasing uncertainty over multi-decade planning horizon"
        },
        {
          factor: "Technological Change",
          description: "Uncertainty about emerging transportation technologies and adoption rates",
          range: "From incremental improvement of current modes to disruptive transformation",
          timeframe: "High uncertainty beyond 5-10 year horizon"
        },
        {
          factor: "Demographic Shifts",
          description: "Uncertainty about population growth, aging, and settlement patterns",
          range: "From continued suburban growth to urban reconcentration",
          timeframe: "Moderate uncertainty with increasing range over time"
        }
      ];
      
      const uncertaintyAnalysis = await governanceCAR.addressDeepUncertainty(uncertainContext);
      
      expect(uncertaintyAnalysis).to.have.property('uncertaintyTypes');
      expect(uncertaintyAnalysis).to.have.property('robustStrategies');
      expect(uncertaintyAnalysis).to.have.property('adaptiveApproaches');
      expect(uncertaintyAnalysis).to.have.property('governanceImplications');
      
      expect(uncertaintyAnalysis.uncertaintyTypes).to.be.an('array');
      expect(uncertaintyAnalysis.robustStrategies).to.be.an('array');
      expect(uncertaintyAnalysis.adaptiveApproaches).to.be.an('array');
      
      // Should differentiate types of uncertainty
      expect(uncertaintyAnalysis.uncertaintyTypes.some(t => t.type && t.characteristics)).to.be.true;
      
      // Should provide robust strategies for deep uncertainty
      expect(uncertaintyAnalysis.robustStrategies.length).to.be.greaterThan(0);
      
      // Should include adaptive governance approaches
      expect(uncertaintyAnalysis.governanceImplications).to.have.property('monitoringNeeds');
      expect(uncertaintyAnalysis.governanceImplications).to.have.property('decisionStructures');
      expect(uncertaintyAnalysis.governanceImplications).to.have.property('institutionalDesign');
    });
    
    it('should integrate multiple knowledge types in governance recommendations', async () => {
      // Define knowledge integration context
      const knowledgeContext = {
        policyContext: mockPolicyContext,
        knowledgeTypes: [
          {
            type: "Scientific-Technical Knowledge",
            sources: [
              "Transportation modeling studies",
              "Environmental impact assessments",
              "Public health research on transportation",
              "Economic analyses of transportation investments"
            ],
            characteristics: [
              "Quantitative data on travel patterns and impacts",
              "Peer-reviewed research findings",
              "Technical standards and specifications",
              "Modeling projections with explicit uncertainty"
            ]
          },
          {
            type: "Experiential-Practical Knowledge",
            sources: [
              "Transportation professionals",
              "Urban planners and engineers",
              "Transit operators",
              "Municipal administrators"
            ],
            characteristics: [
              "Implementation experience",
              "Context-specific insights",
              "Operational constraints awareness",
              "Practical feasibility understanding"
            ]
          },
          {
            type: "Local-Situated Knowledge",
            sources: [
              "Residents using transportation system",
              "Neighborhood associations",
              "Local businesses",
              "Community organizations"
            ],
            characteristics: [
              "Lived experience with transportation challenges",
              "Cultural and social context awareness",
              "Historical memory of community",
              "Tacit knowledge of local conditions"
            ]
          },
          {
            type: "Value-Normative Knowledge",
            sources: [
              "Community dialogues on priorities",
              "Cultural traditions and practices",
              "Ethical frameworks for transportation",
              "Social justice perspectives"
            ],
            characteristics: [
              "Articulation of community values",
              "Ethical principles and frameworks",
              "Justice and fairness considerations",
              "Cultural meanings of mobility and access"
            ]
          }
        ],
        integrationChallenges: [
          "Power imbalances between knowledge holders",
          "Different epistemological assumptions",
          "Institutional barriers to knowledge sharing",
          "Tensions between specialized expertise and democratic deliberation"
        ]
      };
      
      const knowledgeIntegration = await governanceCAR.integrateKnowledgeTypes(knowledgeContext);
      
      expect(knowledgeIntegration).to.have.property('integrationFramework');
      expect(knowledgeIntegration).to.have.property('processes');
      expect(knowledgeIntegration).to.have.property('institutionalDesign');
      expect(knowledgeIntegration).to.have.property('epistemicJustice');
      
      expect(knowledgeIntegration.integrationFramework).to.be.an('object');
      expect(knowledgeIntegration.processes).to.be.an('array');
      expect(knowledgeIntegration.epistemicJustice).to.be.an('object');
      
      // Should address all knowledge types
      knowledgeContext.knowledgeTypes.forEach(type => {
        expect(knowledgeIntegration.integrationFramework.knowledgeTypes).to.include(type.type);
      });
      
      // Should provide specific integration processes
      expect(knowledgeIntegration.processes.length).to.be.greaterThan(0);
      expect(knowledgeIntegration.processes[0]).to.have.property('process');
      expect(knowledgeIntegration.processes[0]).to.have.property('purpose');
      
      // Should address power imbalances and epistemological differences
      expect(knowledgeIntegration.epistemicJustice).to.have.property('powerBalancing');
      expect(knowledgeIntegration.epistemicJustice.powerBalancing).to.be.an('array');
    });
    
    it('should respect epistemic boundaries in governance recommendations', async () => {
      // Create policy context with long-term projections beyond reasonable certainty
      const longTermContext = { ...mockPolicyContext };
      longTermContext.timeframe = {
        planningHorizon: "50-year transportation vision",
        implementationPhases: [
          "Near-term (0-5 years)",
          "Medium-term (5-15 years)",
          "Long-term (15-50 years)"
        ],
        projectionNeeds: [
          "Climate change impacts on infrastructure",
          "Technological transformation of mobility",
          "Demographic shifts and settlement patterns",
          "Economic structural changes"
        ]
      };
      
      const policyRecommendation = await governanceCAR.generatePolicyRecommendation(
        longTermContext,
        [
          {
            name: "Multi-Modal Integration",
            description: "Balanced approach integrating multiple transportation modes"
          }
        ],
        { universalLaw: [], humanityAsEnd: [], kingdomOfEnds: [] } // Empty analysis for test simplicity
      );
      
      expect(policyRecommendation).to.have.property('epistemicLimitations');
      expect(policyRecommendation.epistemicLimitations).to.be.an('array');
      expect(policyRecommendation.epistemicLimitations.length).to.be.greaterThan(0);
      
      // Should acknowledge limits of long-term prediction
      expect(policyRecommendation.epistemicLimitations.some(l => 
        l.toLowerCase().includes('projection') || 
        l.toLowerCase().includes('predict') || 
        l.toLowerCase().includes('future'))).to.be.true;
      
      // Implementation approach should reflect uncertainty
      expect(policyRecommendation.implementation.some(i => 
        i.approach.toLowerCase().includes('adaptive') || 
        i.approach.toLowerCase().includes('flexible') || 
        i.approach.toLowerCase().includes('robust'))).to.be.true;
    });
  });
  
  /**
   * Cross-Domain Integration Tests
   */
  describe('Cross-Domain Integration', () => {
    let healthcareCAR: CARHealthcare;
    let educationCAR: CAREducation;
    let governanceCAR: CARGovernance;
    
    beforeEach(() => {
      healthcareCAR = new CARHealthcare();
      educationCAR = new CAREducation();
      governanceCAR = new CARGovernance();
    });
    
    it('should share categorical imperative analysis across domains', async () => {
      // Create test scenario that spans domains
      const crossDomainScenario = {
        name: "Public Health Education Policy",
        domains: ['healthcare', 'education', 'governance'],
        description: "Policy for health education in public schools",
        components: [
          {
            domain: 'education',
            element: 'Curriculum design for health education',
            maxim: 'Educational institutions may prioritize standardized outcomes over personalized learning'
          },
          {
            domain: 'healthcare',
            element: 'Health information guidelines',
            maxim: 'Healthcare information provided to minors may be limited based on parental preferences'
          },
          {
            domain: 'governance',
            element: 'School health policy',
            maxim: 'Local educational authorities may determine health curriculum content without student input'
          }
        ]
      };
      
      // Analyze with each domain system
      const educationAnalysis = await educationCAR.applyCategoricalImperative({
        maxim: crossDomainScenario.components[0].maxim,
        context: 'educational'
      });
      
      const healthcareAnalysis = await healthcareCAR.applyCategoricalImperative({
        maxim: crossDomainScenario.components[1].maxim,
        context: 'healthcare'
      });
      
      const governanceAnalysis = await governanceCAR.applyCategoricalImperative({
        maxim: crossDomainScenario.components[2].maxim,
        context: 'governance'
      });
      
      // All three should have consistent categorical imperative structure
      [educationAnalysis, healthcareAnalysis, governanceAnalysis].forEach(analysis => {
        expect(analysis).to.have.property('universalLaw');
        expect(analysis).to.have.property('humanityAsEnd');
        expect(analysis).to.have.property('kingdomOfEnds');
      });
      
      // Healthcare analysis should especially emphasize autonomy concerns
      expect(healthcareAnalysis.humanityAsEnd).to.include.oneOf(['autonomy', 'consent', 'choice']);
      
      // Education analysis should address developmental considerations
      expect(educationAnalysis.humanityAsEnd).to.include.oneOf(['development', 'growth', 'learner']);
      
      // Governance analysis should address participation and representation
      expect(governanceAnalysis.kingdomOfEnds).to.include.oneOf(['participation', 'representation', 'voice']);
    });
    
    it('should maintain consistent epistemic boundary handling across domains', async () => {
      // Create ambiguous cross-domain query
      const ambiguousQuery = {
        query: "What interventions will most effectively address the mental health crisis among adolescents?",
        context: "Developing policy recommendations",
        domains: ['healthcare', 'education', 'governance']
      };
      
      // Process with each domain system
      const healthcareResult = await healthcareCAR.process(ambiguousQuery);
      const educationResult = await educationCAR.process(ambiguousQuery);
      const governanceResult = await governanceCAR.process(ambiguousQuery);
      
      // All three should acknowledge epistemic limitations
      [healthcareResult, educationResult, governanceResult].forEach(result => {
        expect(result).to.have.property('epistemicLimitations');
        expect(result.epistemicLimitations).to.be.an('array');
        expect(result.epistemicLimitations.length).to.be.greaterThan(0);
      });
      
      // Each should have domain-specific limitations
      expect(healthcareResult.epistemicLimitations.some(l => 
        l.toLowerCase().includes('diagnosis') || 
        l.toLowerCase().includes('treatment'))).to.be.true;
      
      expect(educationResult.epistemicLimitations.some(l => 
        l.toLowerCase().includes('learning') || 
        l.toLowerCase().includes('educational'))).to.be.true;
      
      expect(governanceResult.epistemicLimitations.some(l => 
        l.toLowerCase().includes('policy') || 
        l.toLowerCase().includes('implementation'))).to.be.true;
    });
    
    it('should handle cases requiring multi-domain integration', async () => {
      // Create a multi-domain case study
      const pandemicCaseStudy = {
        title: "Pandemic Response in Educational Settings",
        description: "Developing an integrated approach to pandemic management in schools",
        domains: ['healthcare', 'education', 'governance'],
        components: {
          healthcare: {
            considerations: [
              "Public health guidance for infection control",
              "Student and staff health monitoring",
              "Mental health support during disruption"
            ]
          },
          education: {
            considerations: [
              "Learning continuity during disruptions",
              "Digital equity and access",
              "Assessment integrity and fairness"
            ]
          },
          governance: {
            considerations: [
              "Decision authority and coordination",
              "Resource allocation processes",
              "Policy communication and implementation"
            ]
          }
        },
        stakeholders: [
          "Students", "Educators", "Parents",
          "School administrators", "Public health officials",
          "Local government", "Vulnerable populations"
        ],
        ethicalTensions: [
          "Public health protection vs. educational quality",
          "Individual choice vs. collective safety",
          "Equal treatment vs. equity for disadvantaged groups"
        ]
      };
      
      // Analyze with combined domains
      const combinedAnalysis = {
        healthcare: await healthcareCAR.process(pandemicCaseStudy),
        education: await educationCAR.process(pandemicCaseStudy),
        governance: await governanceCAR.process(pandemicCaseStudy)
      };
      
      // Check for complementary insights
      expect(combinedAnalysis.healthcare.reasoning).to.include.oneOf([
        'health', 'medical', 'wellbeing', 'safety'
      ]);
      
      expect(combinedAnalysis.education.reasoning).to.include.oneOf([
        'learning', 'educational', 'development', 'pedagogy'
      ]);
      
      expect(combinedAnalysis.governance.reasoning).to.include.oneOf([
        'policy', 'coordination', 'decision-making', 'authority'
      ]);
      
      // Check that each domain considers others' concerns
      expect(combinedAnalysis.healthcare.reasoning).to.include.oneOf([
        'education', 'learning', 'school'
      ]);
      
      expect(combinedAnalysis.education.reasoning).to.include.oneOf([
        'health', 'safety', 'wellbeing'
      ]);
      
      expect(combinedAnalysis.governance.reasoning).to.include.oneOf([
        'health', 'education', 'learning', 'school'
      ]);
    });
  });
});
/**
 * Test Suite for Critique of Artificial Reason (CAR) Domain-Specific Implementations
 * 
 * This comprehensive test suite validates the domain-specific implementations of the CAR framework,
 * including healthcare, education, and governance domains. It tests the specialized functionality
 * of each domain while ensuring they correctly leverage the core CAR architecture.
 */

import { expect } from 'chai';
import sinon from 'sinon';

// Import core components
import { CAR, CAROptions } from '../../src/core/car-core';

// Import domain-specific implementations
import { 
  CARHealthcare, 
  PatientData, 
  MedicalKnowledge, 
  DiagnosisResult,
  TreatmentRecommendation,
  HealthcareEthics
} from '../../src/domains/healthcare/car-healthcare';

import {
  CAREducation,
  LearningObjective,
  AssessmentData,
  LearnerProfile,
  FeedbackResult,
  EducationalStrategy
} from '../../src/domains/education/car-tutor';

import {
  CARGovernance,
  PolicyContext,
  StakeholderAnalysis,
  PolicyOption,
  PolicyImpact,
  DeliberationProcess
} from '../../src/domains/governance/car-advisor';

describe('CAR Domain-Specific Implementations', () => {
  // Test fixtures
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
  });
  
  afterEach(() => {
    // Clean up
    sinon.restore();
  });
  
  /**
   * Healthcare Domain Tests
   */
  describe('Healthcare Domain Implementation', () => {
    let healthcareCAR: CARHealthcare;
    let mockPatientData: PatientData;
    
    beforeEach(() => {
      healthcareCAR = new CARHealthcare();
      
      // Setup mock patient data
      mockPatientData = {
        demographics: {
          age: 45,
          sex: 'female',
          weight: 70,
          height: 165
        },
        symptoms: ['fever', 'cough', 'fatigue'],
        vitalSigns: {
          temperature: 38.5,
          heartRate: 95,
          bloodPressure: '130/85',
          respiratoryRate: 20,
          oxygenSaturation: 94
        },
        medicalHistory: ['asthma'],
        currentMedications: ['albuterol'],
        allergies: ['penicillin'],
        labResults: [
          { test: 'WBC', value: 12.5, unit: 'K/uL', referenceRange: '4.5-11.0' },
          { test: 'CRP', value: 15, unit: 'mg/L', referenceRange: '<10' }
        ]
      };
    });
    
    it('should initialize with healthcare-specific options', () => {
      expect(healthcareCAR).to.be.an.instanceOf(CARHealthcare);
      expect(healthcareCAR).to.have.property('domain', 'healthcare');
      expect(healthcareCAR).to.have.property('medicalKnowledge');
      expect(healthcareCAR).to.have.property('healthcareEthics');
    });
    
    it('should properly diagnose based on patient data', async () => {
      const diagnosisResult = await healthcareCAR.diagnose(mockPatientData);
      
      expect(diagnosisResult).to.have.property('possibleConditions');
      expect(diagnosisResult).to.have.property('confidence');
      expect(diagnosisResult).to.have.property('recommendedTests');
      expect(diagnosisResult).to.have.property('reasoning');
      expect(diagnosisResult).to.have.property('epistemicLimitations');
      
      expect(diagnosisResult.possibleConditions).to.be.an('array');
      expect(diagnosisResult.possibleConditions.length).to.be.greaterThan(0);
      expect(diagnosisResult.possibleConditions[0]).to.have.property('condition');
      expect(diagnosisResult.possibleConditions[0]).to.have.property('likelihood');
    });
    
    it('should respect epistemic boundaries in healthcare context', async () => {
      // Add a symptom that would require in-person examination
      mockPatientData.symptoms.push('unusual rash with specific pattern');
      
      const diagnosisResult = await healthcareCAR.diagnose(mockPatientData);
      
      expect(diagnosisResult).to.have.property('epistemicLimitations');
      expect(diagnosisResult.epistemicLimitations).to.be.an('array');
      expect(diagnosisResult.epistemicLimitations.length).to.be.greaterThan(0);
      expect(diagnosisResult.epistemicLimitations[0]).to.include('physical examination');
      
      // Confidence should be lower due to epistemic limitations
      expect(diagnosisResult.confidence).to.be.lessThan(0.7);
    });
    
    it('should recommend appropriate treatments with ethical considerations', async () => {
      // First diagnose to get conditions
      const diagnosisResult = await healthcareCAR.diagnose(mockPatientData);
      
      // Then get treatment recommendations
      const treatmentResult = await healthcareCAR.recommendTreatment(
        mockPatientData, 
        diagnosisResult.possibleConditions[0].condition
      );
      
      expect(treatmentResult).to.have.property('recommendedTreatments');
      expect(treatmentResult).to.have.property('ethicalConsiderations');
      expect(treatmentResult).to.have.property('patientFactors');
      expect(treatmentResult).to.have.property('alternatives');
      expect(treatmentResult).to.have.property('rationale');
      
      expect(treatmentResult.recommendedTreatments).to.be.an('array');
      expect(treatmentResult.ethicalConsiderations).to.be.an('array');
      
      // Should consider patient's asthma history in recommendations
      expect(treatmentResult.patientFactors).to.include('asthma');
      
      // Should include ethical considerations
      expect(treatmentResult.ethicalConsiderations.some(c => 
        c.principle && c.application)).to.be.true;
    });
    
    it('should analyze treatment options through categorical imperative', async () => {
      const treatmentOptions = [
        {
          name: 'Standard treatment with full disclosure',
          description: 'Provide standard treatment with complete information to patient',
          effectiveness: 0.75,
          risks: ['minor side effects'],
          costs: 'moderate',
          patientAutonomy: 'fully respected'
        },
        {
          name: 'Experimental treatment with partial disclosure',
          description: 'Provide experimental treatment while withholding some risk information',
          effectiveness: 0.85,
          risks: ['major side effects possible but rare'],
          costs: 'high',
          patientAutonomy: 'compromised'
        }
      ];
      
      const ethicalAnalysis = await healthcareCAR.evaluateTreatmentEthics(treatmentOptions, mockPatientData);
      
      expect(ethicalAnalysis).to.have.property('categoricalImperative');
      expect(ethicalAnalysis.categoricalImperative).to.have.property('universalLaw');
      expect(ethicalAnalysis.categoricalImperative).to.have.property('humanityAsEnd');
      expect(ethicalAnalysis.categoricalImperative).to.have.property('kingdomOfEnds');
      
      // The experimental treatment with partial disclosure should fail humanity as end test
      const experimentalTreatmentAnalysis = ethicalAnalysis.options.find(o => 
        o.name === 'Experimental treatment with partial disclosure');
      
      expect(experimentalTreatmentAnalysis).to.exist;
      expect(experimentalTreatmentAnalysis.categoricalImperative.humanityAsEnd.result).to.be.false;
      
      // The standard treatment with full disclosure should pass all tests
      const standardTreatmentAnalysis = ethicalAnalysis.options.find(o => 
        o.name === 'Standard treatment with full disclosure');
      
      expect(standardTreatmentAnalysis).to.exist;
      expect(standardTreatmentAnalysis.categoricalImperative.humanityAsEnd.result).to.be.true;
    });
    
    it('should provide appropriate monitoring advice', async () => {
      // First diagnose to get conditions
      const diagnosisResult = await healthcareCAR.diagnose(mockPatientData);
      
      // Then get treatment recommendations
      const treatmentResult = await healthcareCAR.recommendTreatment(
        mockPatientData, 
        diagnosisResult.possibleConditions[0].condition
      );
      
      // Then get monitoring advice
      const monitoringAdvice = await healthcareCAR.provideMonitoringAdvice(
        mockPatientData,
        diagnosisResult.possibleConditions[0].condition,
        treatmentResult.recommendedTreatments[0]
      );
      
      expect(monitoringAdvice).to.have.property('parameters');
      expect(monitoringAdvice).to.have.property('frequency');
      expect(monitoringAdvice).to.have.property('warningSignals');
      expect(monitoringAdvice).to.have.property('followUpRecommendations');
      
      expect(monitoringAdvice.parameters).to.be.an('array');
      expect(monitoringAdvice.warningSignals).to.be.an('array');
      
      // Should include condition-specific monitoring parameters
      expect(monitoringAdvice.parameters.some(p => 
        p.parameter && p.normalRange && p.action)).to.be.true;
    });
    
    it('should manage uncertainty appropriately in diagnostic process', async () => {
      // Create patient data with ambiguous symptoms
      const ambiguousPatientData = { ...mockPatientData };
      ambiguousPatientData.symptoms = ['fatigue', 'headache', 'mild joint pain'];
      
      const diagnosisResult = await healthcareCAR.diagnose(ambiguousPatientData);
      
      // Should provide differential diagnosis with multiple possibilities
      expect(diagnosisResult.possibleConditions.length).to.be.greaterThan(1);
      
      // Should recommend additional tests to resolve uncertainty
      expect(diagnosisResult.recommendedTests).to.be.an('array');
      expect(diagnosisResult.recommendedTests.length).to.be.greaterThan(0);
      
      // Should explicitly acknowledge diagnostic uncertainty
      expect(diagnosisResult.reasoning).to.include('uncertainty');
      
      // Confidence should reflect diagnostic uncertainty
      expect(diagnosisResult.confidence).to.be.lessThan(0.7);
    });
    
    it('should properly apply healthcare ethics framework', () => {
      const ethicalScenario = {
        scenario: 'Considering whether to prescribe opioid pain medication',
        patientFactors: {
          painLevel: 'severe',
          riskFactors: ['history of substance abuse'],
          requestedTreatment: 'opioid analgesics',
          decisionCapacity: 'full'
        },
        contextFactors: {
          settingType: 'outpatient',
          followUpAvailability: 'limited',
          alternativesAvailable: true,
          timeConstraints: 'routine visit'
        }
      };
      
      const ethicalAnalysis = healthcareCAR.healthcareEthics.analyzeCase(ethicalScenario);
      
      expect(ethicalAnalysis).to.have.property('principles');
      expect(ethicalAnalysis).to.have.property('tensions');
      expect(ethicalAnalysis).to.have.property('recommendations');
      expect(ethicalAnalysis).to.have.property('reasoning');
      
      expect(ethicalAnalysis.principles).to.be.an('array');
      expect(ethicalAnalysis.tensions).to.be.an('array');
      expect(ethicalAnalysis.recommendations).to.be.an('array');
      
      // Should identify autonomy vs. non-maleficence tension
      expect(ethicalAnalysis.tensions.some(t => 
        t.includes('autonomy') && t.includes('non-maleficence'))).to.be.true;
    });
    
    it('should integrate medical knowledge with ethical reasoning', async () => {
      // Create a case with potential medical knowledge and ethical conflict
      mockPatientData.demographics.age = 85;
      mockPatientData.medicalHistory.push('advanced dementia');
      mockPatientData.demographics.weight = 52; // underweight
      
      // Add an advance directive
      mockPatientData.advanceDirectives = [
        { directive: 'Do not resuscitate', verified: true, date: '2022-01-15' }
      ];
      
      // Complex pneumonia requiring aggressive treatment
      mockPatientData.symptoms = ['severe cough', 'high fever', 'difficulty breathing'];
      mockPatientData.vitalSigns.temperature = 39.2;
      mockPatientData.vitalSigns.oxygenSaturation = 88;
      
      const diagnosisResult = await healthcareCAR.diagnose(mockPatientData);
      const treatmentResult = await healthcareCAR.recommendTreatment(
        mockPatientData, 
        diagnosisResult.possibleConditions[0].condition
      );
      
      // Should acknowledge medical need while respecting advance directives
      expect(treatmentResult.ethicalConsiderations.some(c => 
        c.consideration.includes('advance directive'))).to.be.true;
      
      // Should address palliative considerations
      expect(treatmentResult.recommendedTreatments.some(t => 
        t.category === 'palliative' || t.goal.includes('comfort'))).to.be.true;
      
      // Should explicitly address tension between life-prolonging treatment and patient wishes
      expect(treatmentResult.rationale).to.include('advance directive');
    });
    
    it('should personalize patient communication based on context', async () => {
      const communicationContext = {
        patientData: mockPatientData,
        informationType: 'diagnosis explanation',
        healthLiteracy: 'moderate',
        emotionalState: 'anxious',
        preferredCommunicationStyle: 'direct',
        timeAvailable: 'limited'
      };
      
      const communicationPlan = await healthcareCAR.createPatientCommunication(
        communicationContext,
        'You have been diagnosed with a respiratory infection'
      );
      
      expect(communicationPlan).to.have.property('content');
      expect(communicationPlan).to.have.property('structure');
      expect(communicationPlan).to.have.property('adaptations');
      expect(communicationPlan).to.have.property('checkpoints');
      
      // Should adapt to patient's health literacy
      expect(communicationPlan.adaptations).to.include.keys('healthLiteracy');
      
      // Should address emotional state
      expect(communicationPlan.adaptations).to.include.keys('emotionalState');
      
      // Should include understanding checkpoints
      expect(communicationPlan.checkpoints).to.be.an('array');
      expect(communicationPlan.checkpoints.length).to.be.greaterThan(0);
    });
  });
  
  /**
   * Education Domain Tests
   */
  describe('Education Domain Implementation', () => {
    let educationCAR: CAREducation;
    let mockLearnerProfile: LearnerProfile;
    let mockAssessmentData: AssessmentData;
    
    beforeEach(() => {
      educationCAR = new CAREducation();
      
      // Setup mock learner profile
      mockLearnerProfile = {
        demographics: {
          ageGroup: 'adolescent',
          educationLevel: 'secondary',
          languageProficiency: 'intermediate'
        },
        learningPreferences: {
          modalityPreference: ['visual', 'interactive'],
          pacePreference: 'self-paced',
          collaborationPreference: 'mixed'
        },
        knowledgeState: {
          domainKnowledge: {
            mathematics: { algebraic_reasoning: 0.7, geometry: 0.4 },
            science: { scientific_method: 0.8, biology_concepts: 0.6 }
          },
          prerequisiteCompletion: 0.85,
          misconceptions: ['confuses correlation with causation']
        },
        learningHistory: {
          previousPerformance: [
            { topic: 'basic algebra', score: 0.82, timestamp: '2023-01-15' },
            { topic: 'scientific method', score: 0.91, timestamp: '2023-02-20' }
          ],
          learningChallenges: ['sustaining attention', 'mathematical anxiety'],
          strengthAreas: ['visual pattern recognition', 'critical questioning']
        },
        goals: {
          shortTerm: 'improve algebraic problem-solving',
          longTerm: 'prepare for advanced science courses',
          motivations: ['career interest in engineering', 'academic achievement']
        }
      };
      
      // Setup mock assessment data
      mockAssessmentData = {
        assessmentType: 'formative',
        subject: 'mathematics',
        topic: 'algebraic_reasoning',
        questions: [
          {
            id: 'question1',
            type: 'multiple_choice',
            difficultyLevel: 'medium',
            skill: 'equation_solving',
            correctAnswer: 'b',
            learnerAnswer: 'b',
            timeSpent: 45
          },
          {
            id: 'question2',
            type: 'multiple_choice',
            difficultyLevel: 'medium',
            skill: 'equation_solving',
            correctAnswer: 'a',
            learnerAnswer: 'c',
            timeSpent: 60
          },
          {
            id: 'question3',
            type: 'constructed_response',
            difficultyLevel: 'high',
            skill: 'problem_formulation',
            rubricScore: 2,
            maxScore: 4,
            timeSpent: 180
          }
        ],
        overallScore: 0.65,
        timestamp: '2023-03-10'
      };
    });
    
    it('should initialize with education-specific options', () => {
      expect(educationCAR).to.be.an.instanceOf(CAREducation);
      expect(educationCAR).to.have.property('domain', 'education');
      expect(educationCAR).to.have.property('pedagogicalKnowledge');
      expect(educationCAR).to.have.property('learningModels');
    });
    
    it('should provide personalized learning feedback based on assessment', async () => {
      const feedbackResult = await educationCAR.provideFeedback(mockAssessmentData, mockLearnerProfile);
      
      expect(feedbackResult).to.have.property('strengths');
      expect(feedbackResult).to.have.property('challenges');
      expect(feedbackResult).to.have.property('misunderstandings');
      expect(feedbackResult).to.have.property('recommendations');
      expect(feedbackResult).to.have.property('nextSteps');
      expect(feedbackResult).to.have.property('confidenceLevel');
      
      expect(feedbackResult.strengths).to.be.an('array');
      expect(feedbackResult.challenges).to.be.an('array');
      expect(feedbackResult.recommendations).to.be.an('array');
      expect(feedbackResult.confidenceLevel).to.be.a('number');
      
      // Feedback should reference specific assessment questions
      expect(feedbackResult.strengths.some(s => s.question) || 
             feedbackResult.challenges.some(c => c.question)).to.be.true;
             
      // Should consider learner's mathematical anxiety from profile
      expect(feedbackResult.recommendations.some(r => 
        r.recommendation.toLowerCase().includes('anxiety'))).to.be.true;
    });
    
    it('should develop appropriate learning path based on learner profile', async () => {
      const learningObjectives = [
        {
          id: 'obj1',
          description: 'Apply algebraic reasoning to solve real-world problems',
          subject: 'mathematics',
          level: 'intermediate',
          prerequisites: ['basic algebra', 'problem formulation']
        },
        {
          id: 'obj2',
          description: 'Demonstrate understanding of scientific method steps',
          subject: 'science',
          level: 'intermediate',
          prerequisites: ['basic scientific concepts']
        }
      ];
      
      const learningPath = await educationCAR.developLearningPath(mockLearnerProfile, learningObjectives);
      
      expect(learningPath).to.have.property('modules');
      expect(learningPath).to.have.property('sequencing');
      expect(learningPath).to.have.property('adaptiveElements');
      expect(learningPath).to.have.property('assessmentStrategy');
      expect(learningPath).to.have.property('personalizations');
      
      expect(learningPath.modules).to.be.an('array');
      expect(learningPath.sequencing).to.be.an('object');
      expect(learningPath.adaptiveElements).to.be.an('array');
      
      // Path should align with learner's modality preferences
      expect(learningPath.personalizations.modalityAdaptations).to.include.keys('visual');
      
      // Path should address mathematical anxiety
      expect(learningPath.personalizations.challengeAccommodations).to.include.keys('mathematical anxiety');
      
      // Path should include appropriate prerequisite reinforcement
      expect(learningPath.modules.some(m => 
        m.purpose && m.purpose.includes('prerequisite'))).to.be.true;
    });
    
    it('should adapt instructional strategy based on performance data', async () => {
      // Add more detailed performance data
      mockLearnerProfile.learningHistory.previousPerformance.push(
        { topic: 'equation_solving', score: 0.65, timestamp: '2023-03-01' },
        { topic: 'equation_solving', score: 0.68, timestamp: '2023-03-05' }
      );
      
      const instructionalStrategy = await educationCAR.adaptInstructionalStrategy(
        'equation_solving',
        mockLearnerProfile,
        [mockAssessmentData]
      );
      
      expect(instructionalStrategy).to.have.property('recommendedApproaches');
      expect(instructionalStrategy).to.have.property('materials');
      expect(instructionalStrategy).to.have.property('scaffolding');
      expect(instructionalStrategy).to.have.property('pacing');
      expect(instructionalStrategy).to.have.property('remediationFocus');
      
      expect(instructionalStrategy.recommendedApproaches).to.be.an('array');
      expect(instructionalStrategy.materials).to.be.an('array');
      expect(instructionalStrategy.scaffolding).to.be.an('object');
      
      // Should recommend visual approaches based on learner preferences
      expect(instructionalStrategy.recommendedApproaches.some(a => 
        a.approach.toLowerCase().includes('visual'))).to.be.true;
      
      // Should recommend appropriate pacing based on performance trend
      expect(instructionalStrategy.pacing).to.have.property('recommendation');
      
      // Should focus remediation on identified misconceptions
      expect(instructionalStrategy.remediationFocus).to.be.an('array');
    });
    
    it('should design appropriate assessment aligned with learning objectives', async () => {
      const learningObjectives = [
        {
          id: 'obj1',
          description: 'Apply algebraic reasoning to solve real-world problems',
          subject: 'mathematics',
          level: 'intermediate',
          cognitiveLevel: 'application',
          keywords: ['algebra', 'real-world', 'problem-solving']
        }
      ];
      
      const assessmentDesign = await educationCAR.designAssessment(learningObjectives, mockLearnerProfile);
      
      expect(assessmentDesign).to.have.property('assessmentType');
      expect(assessmentDesign).to.have.property('questions');
      expect(assessmentDesign).to.have.property('rubrics');
      expect(assessmentDesign).to.have.property('adaptiveFeatures');
      expect(assessmentDesign).to.have.property('alignmentMap');
      
      expect(assessmentDesign.questions).to.be.an('array');
      expect(assessmentDesign.rubrics).to.be.an('object');
      expect(assessmentDesign.alignmentMap).to.be.an('object');
      
      // Questions should align with the learning objectives
      assessmentDesign.questions.forEach(question => {
        expect(question).to.have.property('objectiveId');
        expect(learningObjectives.some(obj => obj.id === question.objectiveId)).to.be.true;
      });
      
      // Should include application-level questions
      expect(assessmentDesign.questions.some(q => 
        q.cognitiveLevel === 'application')).to.be.true;
      
      // Should accommodate learner's anxiety
      expect(assessmentDesign.adaptiveFeatures.some(f => 
        f.purpose.toLowerCase().includes('anxiety'))).to.be.true;
    });
    
    it('should evaluate learning interventions through ethical framework', async () => {
      const interventions = [
        {
          name: 'Personalized adaptive practice',
          description: 'Algorithmically adapts problem difficulty based on performance',
          dataUsage: ['performance history', 'error patterns', 'time metrics'],
          transparency: 'partial disclosure of adaptation logic',
          autonomyImpact: 'medium restriction through path determination',
          evidenceBase: 'strong empirical support'
        },
        {
          name: 'Peer comparison dashboards',
          description: 'Shows student performance relative to anonymized peers',
          dataUsage: ['comparative performance', 'ranking'],
          transparency: 'full disclosure of comparison metrics',
          autonomyImpact: 'potential negative motivation effects',
          evidenceBase: 'mixed empirical support'
        }
      ];
      
      const ethicalAnalysis = await educationCAR.evaluateInterventionEthics(interventions, mockLearnerProfile);
      
      expect(ethicalAnalysis).to.have.property('categoricalImperative');
      expect(ethicalAnalysis).to.have.property('educationalValues');
      expect(ethicalAnalysis).to.have.property('stakeholderImpacts');
      expect(ethicalAnalysis).to.have.property('recommendations');
      
      expect(ethicalAnalysis.categoricalImperative).to.be.an('object');
      expect(ethicalAnalysis.recommendations).to.be.an('array');
      
      // Should identify ethical concerns with peer comparison for anxious learners
      const peerComparisonAnalysis = ethicalAnalysis.interventionAnalyses.find(i => 
        i.intervention.name === 'Peer comparison dashboards');
      
      expect(peerComparisonAnalysis).to.exist;
      expect(peerComparisonAnalysis.concerns).to.be.an('array');
      expect(peerComparisonAnalysis.concerns.some(c => 
        c.toLowerCase().includes('anxiety'))).to.be.true;
    });
    
    it('should design metacognitive scaffolding appropriate to learner', async () => {
      const learningContext = {
        subject: 'mathematics',
        topic: 'algebraic_reasoning',
        learningObjectives: [
          {
            id: 'obj1',
            description: 'Apply algebraic reasoning to solve real-world problems',
            cognitiveLevel: 'application'
          }
        ],
        instructionalPhase: 'practice',
        learnerProfile: mockLearnerProfile
      };
      
      const metacognitiveScaffolding = await educationCAR.designMetacognitiveScaffolding(learningContext);
      
      expect(metacognitiveScaffolding).to.have.property('prompts');
      expect(metacognitiveScaffolding).to.have.property('strategies');
      expect(metacognitiveScaffolding).to.have.property('reflectionPoints');
      expect(metacognitiveScaffolding).to.have.property('selfAssessmentTools');
      
      expect(metacognitiveScaffolding.prompts).to.be.an('array');
      expect(metacognitiveScaffolding.strategies).to.be.an('array');
      expect(metacognitiveScaffolding.reflectionPoints).to.be.an('array');
      
      // Should include strategies appropriate for adolescents
      expect(metacognitiveScaffolding.strategies.some(s => 
        s.ageAppropriate && s.ageAppropriate.includes('adolescent'))).to.be.true;
      
      // Should include self-assessment tools aligned with learning objectives
      expect(metacognitiveScaffolding.selfAssessmentTools.some(t => 
        t.alignedObjectives && t.alignedObjectives.includes('obj1'))).to.be.true;
    });
    
    it('should diagnose misconceptions from assessment patterns', async () => {
      // Setup assessment data with specific error patterns
      const assessmentWithPatterns = { ...mockAssessmentData };
      
      // Add more questions with specific error patterns
      assessmentWithPatterns.questions = [
        ...assessmentWithPatterns.questions,
        {
          id: 'question4',
          type: 'multiple_choice',
          skill: 'equation_solving',
          correctAnswer: 'b',
          learnerAnswer: 'd',
          distractor: 'sign error',
          timeSpent: 40
        },
        {
          id: 'question5',
          type: 'multiple_choice',
          skill: 'equation_solving',
          correctAnswer: 'a',
          learnerAnswer: 'c',
          distractor: 'sign error',
          timeSpent: 35
        }
      ];
      
      const misconceptionAnalysis = await educationCAR.diagnoseMisconceptions(
        assessmentWithPatterns,
        mockLearnerProfile
      );
      
      expect(misconceptionAnalysis).to.have.property('identifiedMisconceptions');
      expect(misconceptionAnalysis).to.have.property('evidencePatterns');
      expect(misconceptionAnalysis).to.have.property('confidenceLevel');
      expect(misconceptionAnalysis).to.have.property('remediationApproaches');
      
      expect(misconceptionAnalysis.identifiedMisconceptions).to.be.
