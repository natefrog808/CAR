dialecticalSynthesis: `
          The resolution recognizes that autonomy and beneficence are not fundamentally opposed but complementary:
          
          1. True autonomy requires informed understanding that physicians must provide
          2. True beneficence must account for patient values, not merely clinical outcomes
          3. Decision-making is best understood as a shared process rather than unilateral
          4. Benefit must be defined holistically, including both clinical and personal dimensions
          
          The dialectical synthesis defines beneficence as "promoting patient welfare as defined by 
          both clinical outcomes and patient values," while defining autonomy as "self-determination 
          supported by appropriate information and deliberative assistance."
        `,
        
        practicalImplementation: `
          The CAR framework implements this resolution through:
          
          1. Structured shared decision-making:
             - Explicit elicitation of patient values regarding longevity vs. quality
             - Personalized presentation of statistical evidence for this specific patient
             - Discussion of what daily life with an ICD would entail
             - Exploration of options beyond binary "ICD or nothing" (e.g., wearable defibrillator)
          
          2. Temporal approach:
             - Frame as process rather than single decision
             - Offer trial of medical therapy with reassessment
             - Discuss deactivation options if goals change
             - Establish regular review points for reconsideration
          
          3. Documentation approach:
             - Record both clinical recommendation and rationale
             - Document patient values and reasoning process
             - Note areas of uncertainty and how they were addressed
             - Include plan for ongoing reassessment
        `
      },
      
      syntheticResultExample: {
        clinicalNote: `
          Cardiology/Primary Care Shared Decision Note
          
          ASSESSMENT:
          82-year-old with NYHA Class III heart failure, LVEF 25%, meets guideline criteria for primary 
          prevention ICD with established mortality benefit (30% relative risk reduction, approximately 
          7% absolute risk reduction over 3 years in similar patients).
          
          DECISION PROCESS:
          Patient values elicitation revealed strong preference for quality of life, concern about device 
          shocks, and desire to avoid burdensome interventions as disease progresses. Patient demonstrated 
          good understanding of potential benefits (improved survival) and burdens (procedural risks, 
          device complications, potential shocks) after thorough discussion.
          
          Multi-disciplinary discussion with cardiology, primary care, and palliative care explored the 
          spectrum of options and their alignment with patient's expressed values and goals.
          
          SHARED DECISION:
          After deliberation, patient has decided to decline ICD placement at this time, instead focusing 
          on optimized medical therapy and quality of life. This decision reflects a deliberative process 
          aligning clinical evidence with patient values and represents an informed choice rather than a 
          rejection of care.
          
          PLAN:
          1. Continue optimized medical therapy with target dose ACE-I, beta-blocker, and aldosterone antagonist
          2. Monthly heart failure clinic follow-up with reassessment of symptoms and quality of life
          3. Revisit decision in 3 months or with significant clinical status change
          4. Palliative care consultation for advanced care planning
          5. Remote monitoring program enrollment for early detection of decompensation
          
          This approach balances respect for patient autonomy with professional obligation to provide 
          beneficial care through a shared process that incorporates both clinical evidence and patient values.
        `
      }
    }
  };
  
  // Output the antinomy resolution analysis
  console.log("\nMedical Antinomy Resolution in the CAR Framework");
  
  console.log("\nMedical Antinomies:");
  medicalAntinomies.forEach((antinomy, index) => {
    console.log(`\n${index + 1}. ${antinomy.title}`);
    console.log(`\nThesis: ${antinomy.thesis.statement}`);
    console.log(`\nAntithesis: ${antinomy.antithesis.statement}`);
    console.log(`\nDialectical Synthesis: ${antinomy.dialecticalSynthesis.resolution}`);
  });
  
  console.log("\nAntinomy Resolution Process:");
  antinomyResolutionProcess.resolutionStages.forEach(stage => {
    console.log(`\n- ${stage.stage}: ${stage.description}`);
    console.log("  Activities:");
    stage.activities.forEach(activity => console.log(`  • ${activity}`));
  });
  
  console.log("\nExample Application: Autonomy vs. Beneficence in Heart Failure Management");
  console.log("\nScenario:");
  console.log(antinomyResolutionProcess.exampleApplication.scenario);
  
  console.log("\nDialectical Synthesis:");
  console.log(antinomyResolutionProcess.exampleApplication.resolutionProcess.dialecticalSynthesis);
  
  console.log("\nPractical Implementation:");
  console.log(antinomyResolutionProcess.exampleApplication.resolutionProcess.practicalImplementation);
  
  return {
    medicalAntinomies,
    antinomyResolutionProcess
  };
}

/**
 * Run all healthcare examples
 */
function runAllHealthcareExamples() {
  // Run Example 1: Advanced Ethical Analysis of Precision Medicine Implementation
  const result1 = precisionMedicineEthicalAnalysis();
  
  // Run Example 2: Complex Clinical Decision Support with Epistemic Humility
  const result2 = complexClinicalDecisionSupport();
  
  // Run Example 3: Healthcare Policy Antinomy Resolution
  const result3 = healthcarePolicyAntinomyResolution();
  
  // Run Example 4: Virtue Ethics in AI-Assisted Healthcare
  const result4 = virtueEthicsInAIHealthcare();
  
  // Run Example 5: Healthcare Epistemology and Uncertainty Management
  const result5 = healthcareEpistemology();
  
  // Run Example 6: Schematism in Healthcare AI
  const result6 = healthcareSchematism();
  
  // Run Example 7: Resolving Medical Antinomies with CAR
  const result7 = medicalAntinomyResolution();
  
  return {
    precisionMedicineEthics: result1,
    clinicalDecisionSupport: result2,
    policyAntinomyResolution: result3,
    virtueEthicsAI: result4,
    epistemologyUncertainty: result5,
    healthcareSchematism: result6,
    medicalAntinomyResolution: result7
  };
}

// Execute the examples
if (require.main === module) {
  runAllHealthcareExamples();
}

export {
  precisionMedicineEthicalAnalysis,
  complexClinicalDecisionSupport,
  healthcarePolicyAntinomyResolution,
  virtueEthicsInAIHealthcare,
  healthcareEpistemology,
  healthcareSchematism,
  medicalAntinomyResolution,
  runAllHealthcareExamples
};          principle: "Humanity as End",
          application: "The recommendations respect patient autonomy by suggesting approaches that enhance capability rather than imposing compliance-focused interventions."
        },
        {
          principle: "Kingdom of Ends",
          application: "The suggested interventions consider the perspectives of all stakeholders including patient, family, clinicians, and healthcare system."
        }
      ],
      
      integratedResponse: {
        presentation: "The AI system presents the adherence risk assessment with clear data visualization showing specific risk factors and their contribution to overall risk. It communicates uncertainty appropriately and avoids stigmatizing language.",
        recommendations: [
          "Personalized medication schedule aligned with patient's daily routine",
          "Simplified regimen options that maintain therapeutic goals with fewer administrations",
          "Connection to medication assistance programs for financial barriers",
          "Family education session on supporting medication management",
          "Check-in protocol matched to patient's communication preferences"
        ],
        reasoningTransparency: "The system explains its reasoning process, connecting recommendations to specific adherence barriers identified and the ethical principles applied."
      }
    }
  };
  
  // Define case studies and practical implementations
  const caseStudies = [
    {
      title: "AI-Assisted ICU Triage During Resource Constraints",
      scenario: `
        During a surge of critically ill patients, an AI system assists with ICU triage decisions.
        The system integrates multiple data points including likelihood of benefit, resource requirements,
        and patient characteristics to recommend prioritization.
      `,
      ethicalChallenges: [
        "Balancing utilitarian resource optimization with equal respect for persons",
        "Avoiding algorithmic bias in triage recommendations",
        "Maintaining transparency in high-stakes automated decisions",
        "Supporting clinician moral agency rather than displacing it"
      ],
      virtueEthicsApproach: {
        primaryVirtues: ["Justice", "Prudence", "Courage", "Compassion"],
        implementation: `
          The system demonstrates justice by applying consistent criteria while avoiding demographic bias.
          It exhibits prudence by considering multiple relevant factors and appropriate caution in borderline cases.
          It shows courage by flagging potential biases in historical triage practices.
          It maintains compassion by preserving dignified language and suggesting palliative alternatives.
        `
      },
      kantianEthicsApproach: {
        primaryPrinciples: ["Universalizability", "Humanity as End", "Kingdom of Ends"],
        implementation: `
          The system applies universalizable criteria that could fairly apply to any patient.
          It respects humanity as an end by preserving ultimate human judgment and suggesting supportive care.
          It embodies kingdom of ends by making recommendations that all stakeholders could rationally endorse.
        `
      },
      integratedDesign: {
        systemBehaviors: [
          "Presents multidimensional assessment rather than single priority score",
          "Explicitly identifies uncertainty and borderline cases requiring additional review",
          "Suggests alternative care approaches for patients not prioritized for ICU",
          "Provides ethical reasoning transparency alongside clinical factors",
          "Learns from clinician overrides to improve future recommendations"
        ],
        outcomeMetrics: [
          "Equitable distribution of resources across demographic groups",
          "Clinician perception of ethical support from system",
          "Patient and family experiences of dignified treatment",
          "Appropriateness of resource allocation to clinical need",
          "System impact on team moral distress levels"
        ]
      }
    },
    {
      title: "End-of-Life Care Planning Assistance",
      scenario: `
        An AI system helps identify patients who might benefit from advance care planning
        discussions and supports these conversations with personalized discussion guides,
        documentation tools, and decision aids.
      `,
      ethicalChallenges: [
        "Balancing proactive planning with sensitivity to readiness and cultural factors",
        "Avoiding algorithmic bias in identifying candidates for discussions",
        "Supporting authentic communication in emotionally complex conversations",
        "Respecting diverse values and beliefs about end-of-life decisions"
      ],
      virtueEthicsApproach: {
        primaryVirtues: ["Compassion", "Prudence", "Honesty", "Humility"],
        implementation: `
          The system demonstrates compassion through sensitive language and appropriate timing recommendations.
          It exhibits prudence by considering multiple factors in assessing readiness for discussions.
          It maintains honesty by presenting information clearly without euphemism or unnecessary technicality.
          It shows humility by acknowledging the deeply personal nature of these decisions and limits of prediction.
        `
      },
      kantianEthicsApproach: {
        primaryPrinciples: ["Autonomy", "Dignity", "Kingdom of Ends"],
        implementation: `
          The system enhances autonomy by providing information and supporting informed choice.
          It respects dignity by avoiding language that reduces people to their conditions or prognoses.
          It embodies kingdom of ends by creating support that diverse stakeholders could endorse.
        `
      },
      integratedDesign: {
        systemBehaviors: [
          "Adapts timing and approach recommendations based on cultural and individual factors",
          "Provides personalized conversation guides aligned with patient values and literacy",
          "Offers multiperspective decision aids showing different values frameworks",
          "Supports documentation that accurately captures patient preferences",
          "Suggests appropriate follow-up based on conversation outcomes"
        ],
        outcomeMetrics: [
          "Alignment between documented preferences and actual care received",
          "Patient and family satisfaction with planning process",
          "Clinician confidence in facilitating discussions",
          "Cultural appropriateness of planning approach",
          "Reduction in unwanted or non-beneficial interventions"
        ]
      }
    },
    {
      title: "Chronic Pain Management Decision Support",
      scenario: `
        An AI system assists with chronic pain management decisions, integrating pain assessments,
        functional impacts, treatment history, risk factors, and resource availability to recommend
        personalized multimodal treatment plans.
      `,
      ethicalChallenges: [
        "Balancing pain relief with safety concerns and dependency risks",
        "Addressing disparities in pain assessment and treatment across demographics",
        "Supporting patient agency while managing potential misuse",
        "Navigating conflicting societal messages about pain treatment"
      ],
      virtueEthicsApproach: {
        primaryVirtues: ["Compassion", "Prudence", "Justice", "Integrity"],
        implementation: `
          The system demonstrates compassion by taking reported pain seriously and prioritizing function and quality of life.
          It exhibits prudence by considering comprehensive risk-benefit assessment tailored to individual circumstances.
          It embodies justice by applying consistent standards regardless of demographics or stigmatized conditions.
          It maintains integrity by resisting pressure to either withhold appropriate treatment or overprescribe.
        `
      },
      kantianEthicsApproach: {
        primaryPrinciples: ["Respect for Persons", "Universalizability", "Kingdom of Ends"],
        implementation: `
          The system respects persons by treating pain reports as authoritative while providing comprehensive options.
          It applies universalizable standards that could fairly apply to any patient with similar clinical factors.
          It embodies kingdom of ends by suggesting approaches that balance individual needs with public health considerations.
        `
      },
      integratedDesign: {
        systemBehaviors: [
          "Integrates multidimensional pain assessment including functional impact and goals",
          "Presents multimodal treatment options including non-pharmacological approaches",
          "Applies risk assessment tools without demographic bias",
          "Provides transparent documentation of reasoning that humanizes the patient",
          "Suggests appropriate monitoring and follow-up based on individual risk profile"
        ],
        outcomeMetrics: [
          "Functional improvement and quality of life changes",
          "Equitable treatment recommendations across demographic groups",
          "Appropriateness of risk mitigation strategies",
          "Patient perception of being heard and respected",
          "Balanced utilization of different treatment modalities"
        ]
      }
    }
  ];
  
  // Output the virtue ethics analysis
  console.log("\nVirtue Ethics Integration in AI-Assisted Healthcare");
  
  console.log("\nIntegration Principles:");
  ethicalFramework.integrationPrinciples.forEach(principle => {
    console.log(`\n- ${principle.name}: ${principle.description}`);
    console.log(`  Application: ${principle.application}`);
  });
  
  console.log("\nCore Healthcare Virtues for AI Systems:");
  ethicalFramework.healthcareVirtues.forEach(virtue => {
    console.log(`\n- ${virtue.virtue}:`);
    console.log(`  ${virtue.description}`);
    console.log(`  Kantian Correspondence: ${virtue.kantianCorrespondence}`);
    console.log(`  AI Implementation: ${virtue.aiImplementation}`);
  });
  
  console.log("\nCase Study Example: ${caseStudies[0].title}");
  console.log(caseStudies[0].scenario);
  
  console.log("\nVirtue Ethics Approach:");
  console.log(caseStudies[0].virtueEthicsApproach.implementation);
  
  console.log("\nKantian Ethics Approach:");
  console.log(caseStudies[0].kantianEthicsApproach.implementation);
  
  console.log("\nIntegrated Design Behaviors:");
  caseStudies[0].integratedDesign.systemBehaviors.forEach(behavior => {
    console.log(`- ${behavior}`);
  });
  
  return {
    ethicalFramework,
    caseStudies
  };
}

/**
 * Example 5: Healthcare Epistemology and Uncertainty Management
 * 
 * This example demonstrates how the CAR framework addresses epistemic limitations
 * and uncertainty in healthcare through structured approaches to medical knowledge
 * boundaries and probabilistic reasoning.
 */
function healthcareEpistemology() {
  console.log("\n=== Example 5: Healthcare Epistemology and Uncertainty Management ===");
  
  // Define epistemic framework for healthcare
  const epistemicFramework = {
    knowledgeTypes: [
      {
        type: "Empirical Evidence",
        description: "Knowledge derived from structured observation and experimentation",
        examples: ["Randomized controlled trials", "Observational studies", "Systematic reviews"],
        strengths: ["Structured methodology", "Quantifiable uncertainty", "Reproducibility"],
        limitations: ["Population vs. individual gap", "Publication bias", "External validity concerns"],
        kantianCorrespondence: "Corresponds to empirical knowledge in Kant's epistemology"
      },
      {
        type: "Mechanistic Understanding",
        description: "Knowledge of causal mechanisms and pathophysiological processes",
        examples: ["Molecular pathways", "Physiological systems", "Pharmacodynamics"],
        strengths: ["Explanatory power", "Generative of hypotheses", "Guides intervention design"],
        limitations: ["Reductionism", "Complex system effects", "Model limitations"],
        kantianCorrespondence: "Relates to Kant's categories of understanding structuring experience"
      },
      {
        type: "Clinical Experience",
        description: "Knowledge derived from practical clinical work and pattern recognition",
        examples: ["Expert clinician judgment", "Case-based reasoning", "Practice-based learning"],
        strengths: ["Contextual integration", "Tacit knowledge", "Pattern recognition"],
        limitations: ["Cognitive biases", "Limited sample", "Variable reliability"],
        kantianCorrespondence: "Combines empirical with practical reason in Kant's framework"
      },
      {
        type: "Patient-Reported Knowledge",
        description: "Knowledge from patient experience, values, and contextual factors",
        examples: ["Symptom reports", "Quality of life impacts", "Treatment experiences"],
        strengths: ["Patient-centered", "Contextually rich", "Captures lived experience"],
        limitations: ["Subjective variation", "Recall biases", "Communication barriers"],
        kantianCorrespondence: "Acknowledges perspective and phenomenal experience in Kant's epistemology"
      },
      {
        type: "Systems Knowledge",
        description: "Understanding of healthcare systems, resources, and implementation factors",
        examples: ["Care delivery models", "Resource constraints", "Implementation science"],
        strengths: ["Practical relevance", "Addresses context", "Bridges ideal and real"],
        limitations: ["Local variation", "Rapid evolution", "Complex interdependencies"],
        kantianCorrespondence: "Relates to practical application in actual conditions"
      }
    ],
    
    epistemicBoundaries: [
      {
        boundary: "Fundamental Uncertainty",
        description: "Irreducible unpredictability in biological systems and individual variation",
        implications: [
          "Perfect prediction is impossible even with ideal information",
          "Non-deterministic elements exist in all biological systems",
          "Individual variation creates inherent limits to generalization"
        ],
        managementApproaches: [
          "Probabilistic rather than deterministic reasoning",
          "Explicit uncertainty quantification",
          "Adaptive strategies that respond to emerging information"
        ],
        kantianCorrespondence: "Aligns with Kant's limits to deterministic knowledge of phenomena"
      },
      {
        boundary: "Knowledge Incompleteness",
        description: "Gaps in scientific understanding of mechanisms, outcomes, and interventions",
        implications: [
          "Current best practices may be overturned with new discoveries",
          "Unknown mechanisms may explain clinical observations",
          "Long-term and rare effects often poorly characterized"
        ],
        managementApproaches: [
          "Explicit acknowledgment of knowledge gaps",
          "Continuous learning systems",
          "Appropriate caution in areas of significant incompleteness"
        ],
        kantianCorrespondence: "Relates to Kant's distinction between appearance and thing-in-itself"
      },
      {
        boundary: "Measurement Limitations",
        description: "Constraints in our ability to accurately measure relevant clinical factors",
        implications: [
          "Many important factors cannot be directly measured",
          "Measurement instruments have inherent error and bias",
          "Measurement affects the phenomenon being measured (observer effect)"
        ],
        managementApproaches: [
          "Transparent reporting of measurement limitations",
          "Multi-method assessment of critical factors",
          "Appropriate precision in expressing measured values"
        ],
        kantianCorrespondence: "Reflects Kant's view of empirical knowledge as structured by mental categories"
      },
      {
        boundary: "Value Complexity",
        description: "Intrinsic normative elements in healthcare that cannot be reduced to facts",
        implications: [
          "No 'value-free' determination of optimal care exists",
          "Competing values create legitimately different approaches to same situation",
          "Factual knowledge insufficient for full clinical reasoning"
        ],
        managementApproaches: [
          "Explicit value elicitation and incorporation",
          "Differentiation between factual and value claims",
          "Support for value-consistent decision making"
        ],
        kantianCorrespondence: "Connects to Kant's distinction between theoretical and practical reason"
      },
      {
        boundary: "Generalization Limits",
        description: "Constraints in applying population-level knowledge to individuals",
        implications: [
          "Statistical knowledge does not determine individual outcomes",
          "Subgroup heterogeneity affects treatment response",
          "Applicability of evidence varies by patient characteristics"
        ],
        managementApproaches: [
          "Individualized prediction models",
          "N-of-1 approaches where appropriate",
          "Continuous monitoring and adaptation"
        ],
        kantianCorrespondence: "Relates to the gap between universal laws and particular cases in Kant"
      }
    ],
    
    uncertaintyTypes: [
      {
        type: "Statistical Uncertainty",
        description: "Quantifiable random variation in measurements and outcomes",
        examples: ["Confidence intervals", "Standard errors", "p-values"],
        managementApproaches: [
          "Appropriate statistical methods",
          "Sample size considerations",
          "Clear communication of statistical significance"
        ]
      },
      {
        type: "Systematic Uncertainty",
        description: "Non-random errors due to bias, confounding, or methodology",
        examples: ["Selection bias", "Confounding variables", "Measurement bias"],
        managementApproaches: [
          "Study design to minimize bias",
          "Sensitivity analyses",
          "Triangulation across multiple methods"
        ]
      },
      {
        type: "Model Uncertainty",
        description: "Uncertainty about the correct model or theoretical framework",
        examples: ["Competing causal models", "Alternative physiological mechanisms", "Different risk frameworks"],
        managementApproaches: [
          "Model comparison",
          "Ensemble methods",
          "Robustness analyses across models"
        ]
      },
      {
        type: "Recognized Ignorance",
        description: "Awareness of specific knowledge gaps and unknown factors",
        examples: ["Known unstudied interactions", "Identified research gaps", "Acknowledged complexity"],
        managementApproaches: [
          "Explicit documentation of known unknowns",
          "Research prioritization",
          "Precautionary approaches in areas of known gaps"
        ]
      },
      {
        type: "Deep Uncertainty",
        description: "Fundamental unpredictability in complex adaptive systems",
        examples: ["Novel pandemic evolution", "Complex biological adaptation", "Societal healthcare changes"],
        managementApproaches: [
          "Scenario planning",
          "Adaptive management",
          "Robust strategies across possible futures"
        ]
      }
    ],
    
    epistemicVirtues: [
      {
        virtue: "Intellectual Humility",
        description: "Recognition of the limits of one's knowledge and openness to revision",
        implementation: "Explicit acknowledgment of uncertainty and knowledge boundaries",
        kantianCorrespondence: "Reflects Kant's critical approach to reason's limits"
      },
      {
        virtue: "Transparency",
        description: "Clear communication of evidential basis and reasoning processes",
        implementation: "Explicit documentation of evidence quality and reasoning chains",
        kantianCorrespondence: "Aligns with Kant's emphasis on rational examination"
      },
      {
        virtue: "Methodological Rigor",
        description: "Disciplined adherence to sound methods for knowledge generation",
        implementation: "Application of appropriate methodological standards to information processing",
        kantianCorrespondence: "Reflects Kant's emphasis on disciplined thinking"
      },
      {
        virtue: "Epistemic Justice",
        description: "Fair consideration of diverse knowledge sources and perspectives",
        implementation: "Integration of clinical evidence with patient experience and diverse sources",
        kantianCorrespondence: "Connects to Kant's idea of the kingdom of ends in knowledge"
      },
      {
        virtue: "Adaptability",
        description: "Willingness to update beliefs and approaches with new information",
        implementation: "Continuous learning systems that revise assessments with new evidence",
        kantianCorrespondence: "Reflects the dynamic nature of knowledge acquisition"
      }
    ]
  };
  
  // Define uncertainty communication framework
  const uncertaintyCommunication = {
    principles: [
      {
        principle: "Transparency Without Undermining",
        description: "Communicate uncertainty clearly without unnecessarily reducing trust or overwhelming",
        implementation: "Balanced presentation that acknowledges limits while emphasizing reliable elements"
      },
      {
        principle: "Calibrated Confidence",
        description: "Ensure expressed confidence matches actual knowledge quality",
        implementation: "Standardized language tied to evidence quality and consensus levels"
      },
      {
        principle: "Accessible Formats",
        description: "Present uncertainty information in ways accessible to diverse audiences",
        implementation: "Multiple formats including verbal, numeric, and visual representations"
      },
      {
        principle: "Action Guidance",
        description: "Connect uncertainty information to decision-making approaches",
        implementation: "Pair uncertainty information with appropriate decision strategies"
      },
      {
        principle: "Cultural Sensitivity",
        description: "Adapt uncertainty communication to cultural and individual preferences",
        implementation: "Culturally appropriate uncertainty framing and elicitation of preferences"
      }
    ],
    
    communicationFormats: [
      {
        format: "Qualitative Descriptors",
        description: "Standardized verbal descriptions of certainty levels",
        example: "Scale from 'very uncertain' to 'well established' with defined meanings",
        bestUse: "Initial communication and summary statements",
        limitations: "Subjective interpretation, cultural variation in meaning"
      },
      {
        format: "Numeric Probabilities",
        description: "Quantified likelihood expressed as percentages or frequencies",
        example: "70% likelihood or 7 in 10 chance of response to treatment",
        bestUse: "Well-quantified risks with strong statistical basis",
        limitations: "Numeracy requirements, false precision, limited for deep uncertainty"
      },
      {
        format: "Ranges and Intervals",
        description: "Bounded ranges expressing possible values or outcomes",
        example: "50-80% chance of benefit, expected survival 3-18 months",
        bestUse: "Communicating variability and parameter uncertainty",
        limitations: "Can be difficult to use in decision-making without central estimate"
      },
      {
        format: "Visual Representations",
        description: "Graphical display of uncertainty and probabilities",
        example: "Fan charts, forest plots, icon arrays, distribution curves",
        bestUse: "Complex uncertainty patterns, multiple scenarios, risk communication",
        limitations: "Visual literacy required, can be misinterpreted without guidance"
      },
      {
        format: "Scenario Descriptions",
        description: "Narrative descriptions of possible future states",
        example: "Best case, worst case, and most likely outcome scenarios",
        bestUse: "Deep uncertainty, complex situations with multiple variables",
        limitations: "May anchor thinking to specific scenarios, difficult to quantify"
      },
      {
        format: "Confidence Levels",
        description: "Standardized expressions of evidence quality and agreement",
        example: "GRADE-like system from 'very low' to 'high' confidence",
        bestUse: "Communicating meta-level certainty about knowledge claims",
        limitations: "Requires explanation of meaning, can be confused with importance"
      }
    ],
    
    audienceAdaptation: {
      clinicians: {
        preferences: ["Precise numeric data", "Evidence quality indicators", "Comparison to clinical standards"],
        challenges: ["Overconfidence bias", "Defensive decision patterns", "Time constraints"],
        effectiveApproaches: [
          "Visual summary statistics with full data available",
          "Decision support integrated with uncertainty information",
          "Explicit connection to clinical actions and monitoring"
        ]
      },
      patients: {
        preferences: ["Personal relevance", "Actionable information", "Balance of hope and realism"],
        challenges: ["Variable numeracy", "Emotional context", "Information overload"],
        effectiveApproaches: [
          "Multiple formats with consistent message",
          "Concrete frequency formats (e.g., 10 out of 100 people)",
          "Connection to personal values and priorities"
        ]
      },
      policymakers: {
        preferences: ["Summary confidence indicators", "Risk-benefit frameworks", "Population-level impacts"],
        challenges: ["Political considerations", "Multiple competing priorities", "Diverse stakeholder needs"],
        effectiveApproaches: [
          "Executive summaries with layered detail",
          "Scenario-based planning frameworks",
          "Explicit documentation of knowledge boundaries"
        ]
      },
      general public: {
        preferences: ["Clear takeaways", "Trustworthy sources", "Relevant context"],
        challenges: ["Variable background knowledge", "Competing information sources", "Risk perception biases"],
        effectiveApproaches: [
          "Consistent core messages with analogies",
          "Visual representations with clear explanation",
          "Acknowledgment of both what is known and unknown"
        ]
      }
    }
  };
  
  // Case application: COVID-19 treatment decision
  const covidCaseApplication = {
    clinicalScenario: `
      A 68-year-old patient with diabetes and hypertension has moderate COVID-19 requiring
      oxygen. The clinical team must decide on treatment approach while considering multiple
      uncertain factors including emerging evidence, individual risk profile, and system
      resource constraints.
    `,
    
    uncertaintyMapping: [
      {
        domain: "Treatment Efficacy",
        uncertaintyType: "Statistical and Systematic",
        description: "Emerging evidence for treatments with varying quality and applicability",
        boundaries: [
          "Limited randomized trial data for the specific patient population",
          "Evolving understanding of disease mechanisms",
          "Publication bias and rapid dissemination of non-peer-reviewed results"
        ]
      },
      {
        domain: "Disease Progression",
        uncertaintyType: "Statistical and Deep",
        description: "Individual trajectory difficult to predict with variable course",
        boundaries: [
          "Heterogeneous disease course with multiple phenotypes",
          "Complex interaction between viral, immunological, and comorbidity factors",
          "Limited predictive models for individual deterioration timing"
        ]
      },
      {
        domain: "Patient-Specific Factors",
        uncertaintyType: "Model and Statistical",
        description: "Individual risk factors and treatment response variation",
        boundaries: [
          "Incomplete understanding of risk factor interactions",
          "Limited data on subgroup treatment effects",
          "Individual variation in immune response and comorbidity impact"
        ]
      },
      {
        domain: "Resource Availability",
        uncertaintyType: "Systematic and Deep",
        description: "Uncertain future resource constraints affecting treatment options",
        boundaries: [
          "Dynamic hospital capacity based on community transmission",
          "Supply chain uncertainty for medications and equipment",
          "Staffing availability changes with healthcare worker infection"
        ]
      }
    ],
    
    epistemicApproach: {
      knowledgeIntegration: `
        The CAR framework integrates multiple knowledge types:
        - Empirical Evidence: Systematic review of treatment trials with quality assessment
        - Mechanistic Understanding: Current models of COVID-19 pathophysiology
        - Clinical Experience: Patterns observed in similar patients
        - Patient-Reported Knowledge: Symptoms, values, and goals of care
        - Systems Knowledge: Current and projected resource availability
      `,
      
      uncertaintyCommunication: {
        clinicalTeam: [
          "Evidence quality ratings for each treatment option",
          "Predictive model with confidence intervals for deterioration risk",
          "Visualization of competing risks (COVID vs. comorbidity outcomes)",
          "Resource utilization projections with scenario planning"
        ],
        patient: [
          "Visual frequency format for treatment benefits and risks",
          "Plain language uncertainty acknowledgment",
          "Scenario descriptions of possible trajectories",
          "Connection of uncertainties to personal values and preferences"
        ]
      },
      
      decisionFramework: `
        The CAR framework supports decision-making under uncertainty through:
        
        1. Structured Assessment of Evidence:
           - Explicit grading of evidence quality for each option
           - Documentation of known unknowns affecting decisions
           - Separation of factual claims from value judgments
        
        2. Multi-perspective Integration:
           - Clinical evidence-based assessment
           - Patient values and priorities
           - Resource and implementation constraints
           - Ethical considerations
        
        3. Adaptive Strategy Selection:
           - For well-characterized uncertainties: probabilistic decision analysis
           - For deeper uncertainties: robust strategies viable across scenarios
           - Sequential decision points with predefined reassessment triggers
           - Explicit documentation of assumptions requiring monitoring
        
        4. Transparent Communication:
           - Documentation of reasoning including uncertainties
           - Appropriate expression of confidence calibrated to evidence
           - Multiple formats for uncertainty communication
           - Regular reassessment as new information emerges
      `,
      
      kantianPrinciples: `
        The approach embodies Kantian critical philosophy by:
        
        1. Recognizing the limits of empirical knowledge while using it systematically
        2. Distinguishing between phenomena (what we can observe) and noumena (underlying reality)
        3. Applying categories of understanding to structure experience while acknowledging their limitations
        4. Integrating theoretical and practical reason in clinical decision-making
        5. Respecting patients as ends in themselves through transparent communication
      `
    },
    
    clinicalRecommendation: {
      approach: "Adaptive Treatment Strategy with Explicit Uncertainty Management",
      implementation: [
        "Implement evidence-based supportive care with highest certainty benefit",
        "Initiate steroid therapy following protocols with strong evidence",
        "Create decision tree for antiviral initiation based on predefined clinical triggers",
        "Establish monitoring protocol with specific thresholds for treatment adjustment",
        "Schedule regular reassessment as new evidence emerges"
      ],
      uncertaintyCommunication: [
        "Document confidence level for each recommendation component",
        "Provide visual representation of benefit/risk balance with uncertainty ranges",
        "Explain key known unknowns affecting treatment decisions",
        "Outline scenarios requiring plan adaptation",
        "Connect recommendations to patient's expressed values and priorities"
      ],
      ethicalConsiderations: [
        "Balance beneficence and non-maleficence under uncertainty",
        "Respect autonomy through transparent uncertainty communication",
        "Address justice concerns in resource allocation under constraints",
        "Maintain dignity regardless of outcome trajectory"
      ]
    }
  };
  
  // Output the epistemology analysis
  console.log("\nHealthcare Epistemology and Uncertainty Management");
  
  console.log("\nEpistemic Boundaries in Healthcare:");
  epistemicFramework.epistemicBoundaries.forEach(boundary => {
    console.log(`\n- ${boundary.boundary}: ${boundary.description}`);
    console.log("  Implications:");
    boundary.implications.forEach(imp => console.log(`  • ${imp}`));
    console.log("  Management Approaches:");
    boundary.managementApproaches.forEach(app => console.log(`  • ${app}`));
  });
  
  console.log("\nUncertainty Types in Healthcare:");
  epistemicFramework.uncertaintyTypes.forEach(type => {
    console.log(`\n- ${type.type}: ${type.description}`);
    console.log("  Examples: " + type.examples.join(", "));
    console.log("  Management Approaches:");
    type.managementApproaches.forEach(app => console.log(`  • ${app}`));
  });
  
  console.log("\nEpistemic Virtues for Healthcare AI:");
  epistemicFramework.epistemicVirtues.forEach(virtue => {
    console.log(`\n- ${virtue.virtue}: ${virtue.description}`);
    console.log(`  Implementation: ${virtue.implementation}`);
    console.log(`  Kantian Correspondence: ${virtue.kantianCorrespondence}`);
  });
  
  console.log("\nCOVID-19 Case Application - Clinical Recommendation:");
  console.log(covidCaseApplication.clinicalRecommendation.approach);
  
  console.log("\nImplementation Strategy:");
  covidCaseApplication.clinicalRecommendation.implementation.forEach(impl => {
    console.log(`- ${impl}`);
  });
  
  console.log("\nUncertainty Communication Approach:");
  covidCaseApplication.clinicalRecommendation.uncertaintyCommunication.forEach(comm => {
    console.log(`- ${comm}`);
  });
  
  return {
    epistemicFramework,
    uncertaintyCommunication,
    covidCaseApplication
  };
}

/**
 * Example 6: Schematism in Healthcare AI
 * 
 * This example demonstrates the CAR framework's application of Kant's concept of "schematism"
 * to bridge between abstract ethical principles and concrete healthcare decisions,
 * and between neural network outputs and symbolic reasoning.
 */
function healthcareSchematism() {
  console.log("\n=== Example 6: Schematism in Healthcare AI ===");
  
  // Define Kantian schematism framework for healthcare AI
  const schematismFramework = {
    overview: `
      Kant's concept of schematism addresses a fundamental challenge: how can abstract concepts 
      be applied to concrete, sensory experience? In the CAR framework, schematism is repurposed 
      to address two parallel challenges in healthcare AI:
      
      1. How to bridge between abstract ethical principles and concrete clinical situations
      2. How to connect subsymbolic neural representations with symbolic clinical reasoning
      
      Schematism provides structured intermediaries that make these connections possible through
      temporal patterns, procedural structures, and interpretable frameworks that mediate between
      different forms of representation and reasoning.
    `,
    
    schematicBridges: [
      {
        domain: "Ethical-Clinical Bridge",
        description: "Connecting abstract ethical principles to concrete clinical decisions",
        implementation: "Structured ethical frameworks that operationalize principles for specific contexts",
        examples: [
          "Categorical imperative analysis templates for common ethical dilemmas",
          "Proceduralized ethics workflows for time-pressured decisions",
          "Case-based ethical pattern libraries connecting principles to precedents"
        ],
        kantianCorrespondence: "Similar to how Kant's schemata connect pure concepts of understanding with sensory intuitions"
      },
      {
        domain: "Neural-Symbolic Bridge",
        description: "Connecting neural network representations with symbolic clinical reasoning",
        implementation: "Hybrid architectures with interpretable intermediate representations",
        examples: [
          "Attention mechanisms highlighting salient features in neural analysis",
          "Concept bottlenecks forcing networks to use clinically meaningful concepts",
          "Prototype networks connecting cases to exemplars with explicit features"
        ],
        kantianCorrespondence: "Mirrors the schematic process of making abstract categories applicable to experience"
      },
      {
        domain: "Knowledge-Action Bridge",
        description: "Connecting medical knowledge with appropriate clinical actions",
        implementation: "Structured decision frameworks translating evidence to action",
        examples: [
          "Clinical pathways with explicit evidence connections",
          "Decision rules with confidence thresholds and uncertainty handling",
          "Temporal action sequences with monitoring and adaptation points"
        ],
        kantianCorrespondence: "Reflects Kant's view of schematism as applying concepts within temporal structures"
      },
      {
        domain: "Population-Individual Bridge",
        description: "Translating population-level evidence to individual patient care",
        implementation: "Personalization frameworks with explicit adaptation methods",
        examples: [
          "Risk calculation engines with individualization factors",
          "Subgroup identification with similarity metrics",
          "N-of-1 experimental protocols within population frameworks"
        ],
        kantianCorrespondence: "Addresses the particular-universal gap central to Kant's schematism"
      }
    ],
    
    schemaTypes: [
      {
        type: "Temporal Schemata",
        description: "Structures organizing clinical knowledge and action in time",
        examples: [
          "Disease progression models",
          "Treatment response timelines",
          "Monitoring and reassessment schedules"
        ],
        implementation: "Temporal reasoning engines with explicit uncertainty over time",
        kantianCorrespondence: "Reflects Kant's emphasis on time as the fundamental form of inner intuition"
      },
      {
        type: "Categorical Schemata",
        description: "Frameworks for applying diagnostic and therapeutic categories",
        examples: [
          "Phenotype definition frameworks",
          "Diagnostic criteria with certainty levels",
          "Therapeutic category decision trees"
        ],
        implementation: "Hybrid classification systems with explicit category boundaries and uncertainties",
        kantianCorrespondence: "Similar to Kant's schemata for the categories of understanding"
      },
      {
        type: "Procedural Schemata",
        description: "Action sequences connecting knowledge to clinical intervention",
        examples: [
          "Clinical protocols with decision points",
          "Monitoring workflows with adaptation triggers",
          "Ethical decision procedures for common dilemmas"
        ],
        implementation: "Process models with explicit reasoning at key decision points",
        kantianCorrespondence: "Addresses how understanding guides action in Kant's practical philosophy"
      },
      {
        type: "Analogical Schemata",
        description: "Case-based frameworks for reasoning from precedent to current situation",
        examples: [
          "Case libraries with similarity metrics",
          "Precedent-based reasoning frameworks",
          "Exemplar models with feature-based adaptation"
        ],
        implementation: "Case-based reasoning engines with explicit similarity calculation",
        kantianCorrespondence: "Extends Kant's ideas to case-based reasoning important in medicine"
      }
    ],
    
    implementationTechniques: [
      {
        technique: "Concept Bottleneck Models",
        description: "Neural architectures forced to represent data using predefined clinical concepts",
        benefits: [
          "Forces network to use clinically meaningful features",
          "Enables verification of intermediate representations",
          "Allows domain expert interaction with model reasoning"
        ],
        challenges: [
          "Defining appropriate concept sets",
          "Balancing expressivity and interpretability",
          "Handling concepts with fuzzy boundaries"
        ],
        examples: "Diagnostic imaging model using explicit anatomical and pathological concepts as intermediate representations"
      },
      {
        technique: "Neuro-Symbolic Programming",
        description: "Hybrid systems combining neural perception with symbolic reasoning",
        benefits: [
          "Integrates pattern recognition with logical reasoning",
          "Provides transparent reasoning chains",
          "Enables incorporation of domain knowledge"
        ],
        challenges: [
          "Designing appropriate interfaces between components",
          "Propagating uncertainty between subsystems",
          "Scalability of symbolic components"
        ],
        examples: "Clinical decision support system using neural networks for pattern recognition with symbolic reasoning for treatment recommendations"
      },
      {
        technique: "Prototype-Based Interpretability",
        description: "Models that explain decisions by reference to prototypical cases",
        benefits: [
          "Aligns with case-based clinical reasoning",
          "Provides intuitive explanations",
          "Enables expert validation of reasoning"
        ],
        challenges: [
          "Selecting representative prototypes",
          "Defining meaningful similarity metrics",
          "Handling novel presentations"
        ],
        examples: "Diagnostic system that explains predictions by showing similar cases with key features highlighted"
      },
      {
        technique: "Structured Knowledge Integration",
        description: "Approaches that incorporate medical ontologies and knowledge bases into learning systems",
        benefits: [
          "Leverages existing medical knowledge",
          "Improves generalization to rare cases",
          "Provides conceptual consistency"
        ],
        challenges: [
          "Keeping knowledge bases current",
          "Handling conflicting knowledge sources",
          "Balancing knowledge constraints with learning flexibility"
        ],
        examples: "Clinical NLP system that maps text to standardized medical ontologies before making predictions"
      }
    ]
  };
  
  // Case study: Diagnostic reasoning schematism
  const diagnosticCaseStudy = {
    title: "Schematism in Diagnostic Reasoning: Pulmonary Embolism Case",
    
    scenarioDescription: `
      An emergency department AI assistant is helping evaluate a 45-year-old patient with 
      chest pain and shortness of breath. The system must integrate multiple data sources
      including vital signs, laboratory tests, imaging studies, and clinical history to
      assess the likelihood of pulmonary embolism (PE) versus other diagnoses, while
      considering risk factors, resource constraints, and appropriate diagnostic pathways.
    `,
    
    schematismApplication: {
      neuralSymbolicBridge: {
        challenge: "Connecting neural network pattern recognition with symbolic clinical reasoning",
        implementation: `
          The system employs a hybrid architecture where:
          
          1. Neural components process raw data including:
             - Vital sign time series
             - ECG waveforms
             - CT image features
             - Text notes with clinical history
          
          2. A concept bottleneck layer forces representation in terms of clinically meaningful features:
             - Tachycardia (defined as HR > 100)
             - Hypoxemia (defined as O2 sat < 94%)
             - ECG findings (RV strain, S1Q3T3 pattern)
             - D-dimer elevation (with age-adjusted thresholds)
             - CT findings using standardized PE reporting language
             
          3. These clinical concepts then connect to symbolic reasoning components:
             - Clinical prediction rules (Wells, PERC, Geneva scores)
             - Decision trees for diagnostic pathway selection
             - Resource allocation algorithms for appropriate testing
             - Explicit uncertainty estimation for each diagnosis
          
          This structure creates a schematic bridge between raw data processing and
          clinical decision logic, allowing for expert validation at the concept layer.
        `
      },
      
      populationIndividualBridge: {
        challenge: "Translating population evidence to this specific patient",
        implementation: `
          The system implements a schematic structure for individualization:
          
          1. Population evidence is organized as:
             - Baseline prevalence in relevant subgroups
             - Diagnostic test performance characteristics
             - Clinical prediction rule validation statistics
             - Treatment outcome probabilities
          
          2. Patient-specific adaptations include:
             - Subgroup mapping based on risk factors
             - Pre-test probability adjustment for patient features
             - Personalized D-dimer thresholds based on age and comorbidities
             - Individual risk-benefit analysis for CT scanning
             
          3. Special case handling for recognized exceptions:
             - Pregnancy-specific diagnostic pathways
             - Contrast allergy considerations
             - Renal impairment adaptations
             - Prior PE history modifications
          
          This creates a schematic bridge between population statistics and
          individualized assessment, making explicit how evidence is adapted.
        `
      },
      
      temporalSchematism: {
        challenge: "Organizing the temporal aspects of diagnosis and risk",
        implementation: `
          The system implements temporal schemata including:
          
          1. Symptom evolution timeline:
             - Acute onset vs. gradual development
             - Pattern recognition of classic PE presentation timeline
             - Temporal relationship to risk factors (surgery, travel, etc.)
          
          2. Diagnostic pathway temporality:
             - Appropriate sequencing of tests (D-dimer → CT)
             - Timing considerations for test validity
             - Temporal urgency assessment for intervention decisions
             
          3. Risk projection models:
             - Short-term clinical deterioration risk
             - Recurrence risk projections if PE confirmed
             - Bleeding risk with treatment over time
             
          This temporal schematism allows abstract knowledge about PE to be
          applied within the concrete timeframe of the individual patient's presentation.
        `
      },
      
      ethicalSchematism: {
        challenge: "Applying ethical principles to this clinical situation",
        implementation: `
          The system implements ethical schemata including:
          
          1. Resource utilization ethics:
             - Appropriate stewardship of CT resources
             - Radiation exposure minimization principles
             - Cost-effective diagnostic sequencing
          
          2. Risk communication ethics:
             - Uncertainty presentation frameworks
             - Shared decision-making support
             - Value elicitation for risk tolerance
             
          3. Categorical imperative application:
             - Universalizability test for diagnostic recommendations
             - Humanity as end in testing and treatment decisions
             - Kingdom of ends perspective on care coordination
             
          This creates a bridge between abstract Kantian ethical principles
          and concrete medical decisions in this specific scenario.
        `
      }
    },
    
    systemOutput: {
      diagnosticAssessment: `
        Based on integrated analysis, this 45-year-old patient has an intermediate 
        probability of pulmonary embolism (Wells score 4.5, 28% pre-test probability).
        
        Key supporting factors:
        - Tachycardia (HR 108) [confidence: high]
        - Hypoxemia (O2 sat 92%) [confidence: high]
        - Risk factor of recent long-haul flight [confidence: moderate]
        - Absence of alternative diagnosis explaining presentation [confidence: moderate]
        
        Key contradicting factors:
        - No lower extremity swelling [confidence: moderate]
        - Normal chest X-ray [confidence: high]
        - No history of previous VTE [confidence: high]
      `,
      
      recommendedApproach: `
        Recommended Diagnostic Approach:
        
        1. D-dimer testing (high-sensitivity assay)
           - If negative (< 500 μg/L or age-adjusted threshold of 450 μg/L for this patient),
             PE is effectively ruled out (< 1% probability)
           - If positive, proceed to step 2
        
        2. CT Pulmonary Angiography
           - Benefits: Definitive diagnosis of PE if present
           - Risks: Radiation exposure, contrast reaction (patient has no history of allergy),
             small risk of contrast nephropathy (patient has normal renal function)
           
        Decision Support:
        - This approach follows validated guidelines with strong evidence
        - It appropriately balances risk, benefit, and resource utilization
        - The sequential approach minimizes unnecessary testing while maintaining safety
        - It adapts population evidence to this specific patient's characteristics
      `,
      
      uncertaintyCommunication: `
        Uncertainty Assessment:
        
        1. Diagnostic Uncertainty:
           - Intermediate pre-test probability (28%, range 15-40%)
           - If D-dimer negative: Post-test PE probability < 1%
           - If D-dimer positive: Post-test PE probability ~40% (range 30-55%)
        
        2. Evidence Quality:
           - Diagnostic pathway: High-quality evidence from multiple RCTs
           - Risk prediction: Moderate-quality evidence from validation studies
           - Individual risk factors: Variable evidence quality
        
        3. Key Uncertainties:
           - Patient-specific D-dimer threshold optimization
           - Precise individual risk from CT radiation
           - Alternative diagnosis likelihood distribution
      `,
      
      schematismTransparency: `
        Reasoning Process Transparency:
        
        The system's assessment bridges multiple reasoning modes:
        
        1. Pattern recognition: Neural analysis identified subtle ECG ST changes and 
           respiration patterns consistent with PE presentation
        
        2. Concept translation: These patterns were mapped to clinical concepts of
           "possible RV strain" and "tachypnea with hypoxemia"
        
        3. Rule application: These concepts fed into validated Wells criteria
        
        4. Individualization: Population statistics were adapted to this patient's
           age, sex, and risk factor profile
        
        5. Temporal reasoning: Symptom onset timing and evolution were analyzed
           within typical PE development patterns
        
        6. Ethical analysis: Testing recommendations balanced diagnostic certainty,
           risk, and resource utilization
        
        This multi-level schematic approach connects neural pattern recognition
        with explicit clinical reasoning in an interpretable, verifiable manner.
      `
    }
  };
  
  // Output the schematism framework
  console.log("\nSchematism in Healthcare AI");
  
  console.log("\nOverview:");
  console.log(schematismFramework.overview);
  
  console.log("\nSchematic Bridges:");
  schematismFramework.schematicBridges.forEach(bridge => {
    console.log(`\n- ${bridge.domain}: ${bridge.description}`);
    console.log("  Examples:");
    bridge.examples.forEach(ex => console.log(`  • ${ex}`));
    console.log(`  Kantian Correspondence: ${bridge.kantianCorrespondence}`);
  });
  
  console.log("\nCase Study: Diagnostic Reasoning Schematism");
  console.log(diagnosticCaseStudy.scenarioDescription);
  
  console.log("\nNeural-Symbolic Bridge Implementation:");
  console.log(diagnosticCaseStudy.schematismApplication.neuralSymbolicBridge.implementation);
  
  console.log("\nSystem Diagnostic Assessment:");
  console.log(diagnosticCaseStudy.systemOutput.diagnosticAssessment);
  
  console.log("\nRecommended Approach:");
  console.log(diagnosticCaseStudy.systemOutput.recommendedApproach);
  
  console.log("\nSchematism Transparency:");
  console.log(diagnosticCaseStudy.systemOutput.schematismTransparency);
  
  return {
    schematismFramework,
    diagnosticCaseStudy
  };
}

/**
 * Example 7: Resolving Medical Antinomies with CAR
 * 
 * This example demonstrates how the CAR framework resolves fundamental contradictions
 * in medical reasoning using Kantian dialectical methods and critical philosophy.
 */
function medicalAntinomyResolution() {
  console.log("\n=== Example 7: Resolving Medical Antinomies with CAR ===");
  
  // Define fundamental medical antinomies
  const medicalAntinomies = [
    {
      title: "Population vs. Individual Evidence",
      thesis: {
        statement: "Medical decisions should be based on population-level evidence from randomized trials and epidemiological studies that provide reliable statistical knowledge.",
        arguments: [
          "Population studies control for bias and confounding through randomization and large samples",
          "Statistical evidence provides objective, quantifiable measures of effect and uncertainty",
          "Individual clinical observations are subject to numerous cognitive biases",
          "Evidence-based guidelines derived from population studies improve overall outcomes"
        ],
        stakeholders: ["Public Health Experts", "Clinical Researchers", "Health Policy Makers", "Guideline Developers"]
      },
      antithesis: {
        statement: "Medical decisions should be based on individualized assessment that accounts for the unique characteristics, values, and contexts of each patient.",
        arguments: [
          "Population averages often fail to represent any actual individual",
          "Subgroup heterogeneity means population evidence may not apply to specific patients",
          "Biological and genetic uniqueness creates idiosyncratic treatment responses",
          "Individual values and preferences determine what outcomes are meaningful"
        ],
        stakeholders: ["Individual Patients", "Primary Care Physicians", "Personalized Medicine Advocates", "Patient Rights Groups"]
      },
      apparentContradiction: "These positions appear contradictory because they represent competing epistemological foundations for medical decisions. One privileges statistical knowledge derived from populations, while the other privileges particular knowledge of individuals.",
      dialecticalSynthesis: {
        resolution: `
          Medical decisions should integrate population-level evidence with individualized assessment
          through structured frameworks that systematically adapt statistical knowledge to individual
          characteristics, while using individual outcomes to refine population understanding.
        `,
        implementation: [
          "Risk prediction models that incorporate individual characteristics into population statistics",
          "N-of-1 trial methodologies that apply experimental rigor to individual assessment",
          "Bayesian updating of population priors with individual-specific information",
          "Learning healthcare systems that continuously refine population knowledge from individual outcomes",
          "Explicit consideration of preference-sensitive aspects of medical decisions"
        ],
        kantianJustification: `
          This synthesis resolves the apparent contradiction by recognizing that the thesis and antithesis
          operate at different levels of abstraction that are both necessary for complete medical knowledge.
          The critical insight is that population evidence provides essential structural understanding 
          (similar to Kant's categories) that must be applied to individual cases through a schematic
          process that respects the uniqueness of each patient's situation. Neither position alone
          is sufficient for optimal care.
        `
      }
    },
    {
      title: "Disease-Centered vs. Person-Centered Care",
      thesis: {
        statement: "Healthcare should focus primarily on diagnosing and treating specific diseases and pathophysiological processes using standardized approaches.",
        arguments: [
          "Disease-specific interventions target underlying causal mechanisms",
          "Standardized disease-based approaches enable scientific progress and comparative evaluation",
          "Focusing on objective disease metrics permits clear outcome measurement",
          "Specialization around disease categories enables deeper medical expertise"
        ],
        stakeholders: ["Specialist Physicians", "Biomedical Researchers", "Pharmaceutical Industry", "Disease-specific Advocacy Organizations"]
      },
      antithesis: {
        statement: "Healthcare should focus primarily on the whole person, their lived experience, values, and overall wellbeing rather than isolated disease processes.",
        arguments: [
          "Patients experience illness as whole persons, not collections of diseases",
          "Comorbidities and complex interactions require integrated approaches",
          "Patient goals and values determine meaningful outcomes, not biomarkers",
          "Psychosocial and contextual factors often outweigh biological factors in outcomes"
        ],
        stakeholders: ["Primary Care Physicians", "Nurses", "Patients", "Integrative Medicine Practitioners"]
      },
      apparentContradiction: "These positions appear contradictory because they represent different organizational principles for healthcare. One structures care around diseases as objective entities, while the other structures care around persons as integrated wholes.",
      dialecticalSynthesis: {
        resolution: `
          Healthcare should be organized around an integration of disease-based knowledge and person-centered
          care through systems that apply disease-specific interventions within a holistic understanding of
          the individual, recognizing both the reality of pathophysiological processes and the integrated
          nature of human experience.
        `,
        implementation: [
          "Team-based care models integrating specialists with primary care coordination",
          "Care planning that explicitly connects disease-specific interventions to patient-centered goals",
          "Combined outcome measures that assess both disease biomarkers and patient experience",
          "Clinical reasoning frameworks that integrate pathophysiological and narrative understanding",
          "Education approaches that develop both disease expertise and person-centered skills"
        ],
        kantianJustification: `
          This synthesis resolves the apparent contradiction by revealing complementary rather than
          competing aspects of healthcare. Similar to Kant's distinction between the phenomenal and noumenal,
          disease-based approaches address objective manifestations while person-centered approaches
          address the integrated reality of the patient's experience. The synthesis recognizes both as
          essential aspects of complete understanding.
        `
      }
    },
    {
      title: "Autonomy vs. Beneficence",
      thesis: {
        statement: "Healthcare decisions should prioritize patient autonomy, with patients making informed choices based on their values even when these choices may not optimize medical outcomes.",
        arguments: [
          "Respect for persons requires honoring their capacity for self-determination",
          "Only patients can determine what constitutes benefit relative to their values",
          "Paternalistic approaches violate dignity and personhood",
          "Patient engagement and ownership of decisions improves adherence and satisfaction"
        ],
        stakeholders: ["Patient Rights Advocates", "Bioethicists", "Legal Rights Organizations", "Many Patients"]
      },
      antithesis: {
        statement: "Healthcare decisions should prioritize beneficence, with clinicians guiding choices toward optimal medical outcomes based on professional knowledge and duty of care.",
        arguments: [
          "Professional knowledge creates obligation to recommend best medical options",
          "Patients often lack capacity to fully understand complex medical decisions",
          "Illness itself compromises autonomous decision-making capacity",
          "Allowing harmful choices contradicts the fundamental purpose of medicine"
        ],
        stakeholders: ["Many Clinicians", "Some Bioethicists", "Health Systems", "Some Patients"]
      },
      apparentContradiction: "These positions appear contradictory because they represent competing ethical foundations for decision-making authority. One prioritizes patient self-determination while the other prioritizes professional obligation for optimal care.",
      dialecticalSynthesis: {
        resolution: `
          Healthcare decisions should be grounded in a relational autonomy model that recognizes both
          the patient's right to self-determination and the clinician's obligation to provide benefit,
          through collaborative processes that support informed choice while acknowledging the inherently
          shared nature of medical decisions.
        `,
        implementation: [
          "Shared decision-making frameworks with explicit attention to both values and evidence",
          "Decision support tools that make complex medical information accessible",
          "Recognition of decision-making as a process rather than a moment",
          "Graduated autonomy models that adapt to decision complexity and capability",
          "Transparent recommendation frameworks that separate facts from values"
        ],
        kantianJustification: `
          This synthesis resolves the apparent contradiction by recognizing that genuine autonomy
          requires support and information (not mere choice), while beneficence derives its legitimacy
          from alignment with patient values (not paternalism). The categorical imperative suggests
          that respecting humanity requires both supporting self-determination and providing beneficial
          care - neither alone is sufficient.
        `
      }
    }
  ];
  
  // Detailed exploration of the antinomy resolution process
  const antinomyResolutionProcess = {
    title: "CAR Framework for Medical Antinomy Resolution",
    
    overview: `
      The CAR framework systematically resolves medical antinomies through a structured
      dialectical process based on Kantian critical philosophy. Rather than treating
      contradictions as requiring choice between competing positions, it identifies
      the conditions under which apparent contradictions can be resolved through
      deeper understanding of knowledge boundaries and conceptual frameworks.
    `,
    
    resolutionStages: [
      {
        stage: "Antinomy Identification",
        description: "Precisely formulate the thesis and antithesis positions with their strongest arguments",
        activities: [
          "Articulate the strongest version of each position",
          "Identify key stakeholders advocating each position",
          "Document the empirical and philosophical bases for each argument",
          "Clarify the apparent contradiction between positions"
        ],
        output: "Clearly defined thesis and antithesis statements with supporting arguments"
      },
      {
        stage: "Conceptual Analysis",
        description: "Analyze the conceptual frameworks and assumptions underlying each position",
        activities: [
          "Identify implicit assumptions in each position",
          "Analyze key concepts and their definitions",
          "Examine scope boundaries and contexts where each position applies",
          "Identify conceptual confusions or equivocations"
        ],
        output: "Conceptual map showing assumptions, definitions, and contextual boundaries"
      },
      {
        stage: "Epistemological Examination",
        description: "Analyze the knowledge claims and epistemological foundations of each position",
        activities: [
          "Identify knowledge types appealed to by each position",
          "Evaluate evidence quality and applicability",
          "Examine knowledge boundaries and acknowledged uncertainties",
          "Identify knowledge gaps relevant to the contradiction"
        ],
        output: "Epistemological assessment of knowledge claims and limitations"
      },
      {
        stage: "Dialectical Synthesis",
        description: "Develop a resolution that integrates valid elements of both positions",
        activities: [
          "Identify complementary rather than competing aspects",
          "Develop higher-order principles that encompass both positions",
          "Define the conditions under which each position has validity",
          "Create a unified framework that resolves the contradiction"
        ],
        output: "Synthesis statement with philosophical justification"
      },
      {
        stage: "Practical Implementation",
        description: "Translate the theoretical resolution into practical approaches",
        activities: [
          "Develop implementation frameworks for clinical practice",
          "Create decision support tools embodying the synthesis",
          "Design policy approaches reflecting the resolution",
          "Establish evaluation metrics for the integrated approach"
        ],
        output: "Practical implementation guidance for clinical, educational, and policy contexts"
      }
    ],
    
    kantianPrinciples: [
      {
        principle: "Dialectical Illusion Recognition",
        description: "Identifying when contradictions arise from applying concepts beyond their proper bounds",
        application: "Medical antinomies often stem from extending approaches beyond their appropriate domains",
        example: "Disease-centered care becomes problematic when extended to complex multimorbidity, while person-centered care alone may miss opportunities for disease-specific interventions"
      },
      {
        principle: "Transcendental Idealism",
        description: "Distinguishing between phenomena (things as they appear) and noumena (things as they are)",
        application: "Recognizing that medical knowledge involves both objective measurements and subjective experience",
        example: "Disease biomarkers represent phenomenal knowledge, while patient experience represents a different form of knowing"
      },
      {
        principle: "Regulative Ideas",
        description: "Concepts that guide inquiry despite not being directly knowable or achievable",
        application: "Using ideal concepts to guide medical practice while acknowledging their aspirational nature",
        example: "'Perfect health' and 'complete autonomy' function as regulative ideas rather than achievable states"
      },
      {
        principle: "Critical Philosophy",
        description: "Establishing the conditions and limits of different forms of knowledge",
        application: "Defining the proper domains and limits of different medical knowledge types",
        example: "Statistical knowledge applies well to populations but requires adaptation for individuals"
      }
    ],
    
    exampleApplication: {
      antinomy: "Autonomy vs. Beneficence in Heart Failure Management",
      
      scenario: `
        An 82-year-old patient with advanced heart failure is considering implantable cardioverter-defibrillator
        (ICD) placement. Guidelines recommend the device based on ejection fraction and survival benefit.
        However, the patient expresses concerns about device shocks at end of life and preference for
        quality over quantity of life. The cardiology team believes the device offers significant benefit
        and is the standard of care, while the primary care physician emphasizes the patient's right to
        decline the intervention.
      `,
      
      autonomyThesis: {
        statement: "The patient's preference should be decisive, even if it means declining a recommended intervention.",
        arguments: [
          "Patient has clearly expressed values prioritizing quality over longevity",
          "ICD shocks can be painful and traumatic, potentially undermining quality of life",
          "End-of-life preferences deserve particular respect",
          "Guidelines cannot account for individual value judgments"
        ]
      },
      
      beneficenceAntithesis: {
        statement: "The medical team should strongly advocate for the ICD given its established mortality benefit.",
        arguments: [
          "Clinical evidence shows clear survival benefit for patients with these characteristics",
          "Professional knowledge creates responsibility to recommend beneficial treatments",
          "Patient may not fully understand the benefits or overestimate the burdens",
          "Allowing preventable death contradicts the purpose of medical care"
        ]
      },
      
      resolutionProcess: {
        conceptualAnalysis: `
          Analysis reveals different underlying concepts of 'benefit':
          - The autonomy position defines benefit primarily as alignment with patient values
          - The beneficence position defines benefit primarily as extension of life
          
          The concepts of 'capacity' and 'understanding' also differ:
          - The autonomy position emphasizes the patient's capacity to determine personal values
          - The beneficence position emphasizes the physician's capacity to understand medical evidence
        `,
        
        epistemologicalExamination: `
          The knowledge claims differ in important ways:
          - The beneficence position relies on statistical knowledge from clinical trials
          - The autonomy position relies on personal knowledge of values and preferences
          
          Key uncertainties include:
          - Individual applicability of trial results for this specific patient
          - How the patient would actually experience living with an ICD
          - The patient's future valuation of quantity vs. quality of life
          - How well the patient understands the implications of the choice
        /**
 * Advanced Healthcare Example for the Critique of Artificial Reason (CAR)
 * 
 * This comprehensive example demonstrates how the CAR framework can revolutionize
 * healthcare decision-making by integrating Kantian ethical principles, epistemological
 * boundaries, and structured reasoning to address complex medical scenarios.
 * 
 * The example illustrates:
 * 1. Multi-dimensional ethical analysis with competing principles
 * 2. Advanced uncertainty quantification in medical decision-making
 * 3. Integration of evidence-based practice with patient values
 * 4. Practical application of the categorical imperative in healthcare
 * 5. Metacognitive awareness of epistemic limitations
 * 6. Antinomy resolution for healthcare policy dilemmas
 */

import { 
  CAR, 
  EpistemicBoundary, 
  CategoricalImperative, 
  SchematismBridge 
} from '../../src/core/car-core';

import {
  CARHealthcare, 
  HealthcareData, 
  HealthcareContext, 
  EthicalFactor, 
  ResourceConstraint,
  UncertaintyLevel,
  EpistemicStatus
} from '../src/domains/healthcare/car-healthcare';

import {
  PatientProfile, 
  ClinicalData, 
  DiagnosisResult, 
  TreatmentOption,
  MedicalEvidence,
  TreatmentOutcome,
  KnowledgeState,
  PatientValues,
  HealthSystemConstraint,
  EthicalFramework
} from '../src/domains/healthcare/medical-knowledge';

// Initialize the CARHealthcare system with comprehensive options
const healthcareAdvisor = new CARHealthcare({
  // Core CAR options integrating Kantian architecture
  interpretationMode: 'critical',
  confidenceThreshold: 0.75,
  epistemicFramework: 'structured',
  metacognitiveAwareness: true,
  
  // Healthcare-specific options reflecting domain knowledge
  practitioner: {
    specialty: 'internal_medicine',
    experience: 10,
    role: 'physician',
    ethicalOrientation: 'principled'
  },
  
  setting: {
    type: 'integrated_care',
    resources: 'variable',
    specialty: 'multiple',
    techLevel: 'advanced'
  },
  
  // Comprehensive ethical framework reflecting Kantian principles
  ethicalEmphasis: {
    autonomy: 0.90,          // Strong emphasis on patient self-determination
    beneficence: 0.85,        // Duty to promote wellbeing
    nonMaleficence: 0.95,     // Primary duty to avoid harm
    justice: 0.85,            // Fair distribution of benefits and burdens
    dignity: 0.95,            // Respect for inherent human worth
    universality: 0.90,       // Categorical imperative: universal law
    humanity: 0.90,           // Treating persons as ends, not means
    morality: 0.85            // Kingdom of ends principle
  },
  
  // Evidence standards reflecting epistemic rigor
  evidenceStandards: {
    requiredLevel: 'comprehensive',
    recencyWeighting: 0.85,
    minimumQuality: 'high',
    evidenceHierarchy: 'modified_grade',
    uncertaintyQuantification: true,
    contextualRelevance: true
  },
  
  // Communication preferences reflecting practical wisdom
  communicationPreferences: {
    detailLevel: 'adaptive',
    targetAudience: 'multiple',
    includeUncertainty: true,
    includeReferences: true,
    ethicalTransparency: true,
    metacognitiveDisclosure: true
  },
  
  // Advanced reasoning options
  reasoningOptions: {
    dialecticalReasoning: true,       // Thesis-antithesis-synthesis
    multiPerspectival: true,          // Consider multiple stakeholder viewpoints
    temporalExtension: true,          // Consider short and long-term impacts
    conditionalPlanning: true,        // If-then reasoning for contingencies
    valueExplication: true            // Make implicit values explicit
  }
});

/**
 * Example 1: Advanced Ethical Analysis of Precision Medicine Implementation
 * 
 * This case examines the ethical complexity of implementing genomic medicine
 * in a healthcare system with limited resources, addressing issues of:
 * - Justice and resource allocation
 * - Patient autonomy vs. clinical benefit
 * - Privacy and data governance
 * - Intergenerational impacts
 * - Epistemic limitations in genomic interpretation
 */
function precisionMedicineEthicalAnalysis() {
  console.log("=== Example 1: Precision Medicine Ethical Analysis ===");
  
  // Define the complex ethical scenario
  const scenario = `
    A large healthcare system is implementing a precision medicine initiative that will
    offer comprehensive genomic profiling to patients. The program promises several benefits:
    
    1. Personalized treatment selection for cancer and other complex diseases
    2. Pharmacogenomic testing to prevent adverse drug reactions
    3. Identification of hereditary disease risks for preventive interventions
    4. Population-level data for research and learning health system development
    
    However, the implementation raises several ethical challenges:
    
    1. The cost ($5,000 per patient) means the system can only offer it to a subset of patients
    2. Interpretation of genomic findings involves significant uncertainty
    3. Incidental findings may reveal information patients didn't seek or wish to know
    4. The database will be more accurate and beneficial for ethnic groups already 
       well-represented in genomic databases
    5. Privacy concerns exist regarding family members' genetic information being 
       indirectly disclosed
    6. Data governance issues around future research uses and potential commercialization
  `;
  
  // Define expanded ethical factors reflecting Kantian principles
  const ethicalFactors: EthicalFactor[] = [
    {
      type: "autonomy",
      description: "Respect for patient self-determination in choosing testing and receiving results",
      relevance: 0.95,
      stakeholders: ["Patient", "Family Members", "Healthcare Provider"],
      tensions: [
        {
          withFactor: "beneficence",
          description: "Tension between patient choice to decline information and clinical duty to inform",
          severity: 0.8
        },
        {
          withFactor: "justice",
          description: "Tension between individual choice and fair allocation of limited resources",
          severity: 0.85
        }
      ],
      kantianPrinciple: "Respect for autonomy honors rational agency central to humanity as end"
    },
    {
      type: "beneficence",
      description: "Providing most effective personalized care based on genomic information",
      relevance: 0.9,
      stakeholders: ["Healthcare Provider", "Patient", "Healthcare System"],
      tensions: [
        {
          withFactor: "non_maleficence",
          description: "Tension between potential benefits and psychological harms of uncertain results",
          severity: 0.75
        },
        {
          withFactor: "autonomy",
          description: "Tension between scientific best practice and patient preferences",
          severity: 0.8
        }
      ],
      kantianPrinciple: "Perfect duty to promote the welfare of others as rational beings"
    },
    {
      type: "justice",
      description: "Fair allocation of genomic testing and derived benefits across population",
      relevance: 0.9,
      stakeholders: ["Patient Populations", "Healthcare System", "Society", "Future Generations"],
      tensions: [
        {
          withFactor: "autonomy",
          description: "Tension between individual choice and fair distribution of resources",
          severity: 0.85
        },
        {
          withFactor: "beneficence",
          description: "Tension between maximizing benefits and ensuring equitable access",
          severity: 0.8
        }
      ],
      kantianPrinciple: "Kingdom of ends requires arrangements acceptable to all rational beings"
    },
    {
      type: "non_maleficence",
      description: "Avoiding harms from incidental findings, misinterpretation, and psychological impacts",
      relevance: 0.85,
      stakeholders: ["Patient", "Family Members", "Healthcare Provider"],
      tensions: [
        {
          withFactor: "beneficence",
          description: "Tension between potential harms of knowledge and benefits of intervention",
          severity: 0.8
        }
      ],
      kantianPrinciple: "Perfect duty to avoid treating others merely as means to an end"
    },
    {
      type: "dignity",
      description: "Respecting inherent worth of persons regardless of genetic characteristics",
      relevance: 0.95,
      stakeholders: ["Patient", "Society", "Future Generations"],
      tensions: [
        {
          withFactor: "beneficence",
          description: "Tension between respect for inherent worth and valuing genetic 'improvement'",
          severity: 0.9
        }
      ],
      kantianPrinciple: "Foundational to categorical imperative's recognition of intrinsic human worth"
    },
    {
      type: "universality",
      description: "Ensuring program implementation could be consistently applied to all",
      relevance: 0.85,
      stakeholders: ["Healthcare System", "Society", "Patient Populations"],
      tensions: [
        {
          withFactor: "justice",
          description: "Tension between universal principle and resource constraints",
          severity: 0.8
        }
      ],
      kantianPrinciple: "First formulation of categorical imperative requiring universalizability"
    },
    {
      type: "epistemic_responsibility",
      description: "Managing uncertainty, ambiguity, and limitations in genomic interpretation",
      relevance: 0.9,
      stakeholders: ["Healthcare Provider", "Patient", "Healthcare System", "Research Community"],
      tensions: [
        {
          withFactor: "beneficence",
          description: "Tension between acknowledging limitations and providing beneficial care",
          severity: 0.75
        }
      ],
      kantianPrinciple: "Critique requires recognition of epistemic boundaries and limitations"
    },
    {
      type: "futurity",
      description: "Considering impacts on future generations and longitudinal data benefits",
      relevance: 0.8,
      stakeholders: ["Future Patients", "Future Generations", "Research Community"],
      tensions: [
        {
          withFactor: "autonomy",
          description: "Tension between current patient choices and future benefits",
          severity: 0.7
        }
      ],
      kantianPrinciple: "Kingdom of ends includes consideration of all potential rational beings"
    }
  ];
  
  // Define stakeholders with relevant perspectives
  const stakeholderPerspectives = {
    "Patients": "Concerned with personal benefits, costs, privacy, and autonomy in decision-making",
    "Family Members": "Impacted by genetic findings that may have implications for their own health",
    "Healthcare Providers": "Balancing clinical benefits, resource constraints, and ethical obligations",
    "Healthcare System": "Managing limited resources, data governance, and population health goals",
    "Underrepresented Groups": "Seeking equitable access and representation in genomic databases",
    "Research Community": "Interested in data access for scientific advancement and discovery",
    "Future Generations": "Will be impacted by decisions about genetic data and interventions",
    "Society": "Concerned with fair distribution of benefits and potential social impacts"
  };
  
  // Define options reflecting different implementation approaches
  const implementationOptions = [
    {
      approach: "Clinically-Targeted Implementation",
      description: "Offer genomic testing only to patients with specific clinical indications where evidence of benefit is strongest",
      advantages: [
        "Maximizes clinical utility",
        "More efficient use of resources",
        "Clearer risk-benefit ratio"
      ],
      disadvantages: [
        "Limits population database development",
        "May miss unexpected benefits in broader population",
        "Reinforces existing knowledge gaps for underrepresented groups"
      ],
      ethicalAlignment: {
        beneficence: 0.9,
        non_maleficence: 0.85,
        justice: 0.7,
        autonomy: 0.6
      }
    },
    {
      approach: "Population-Based Random Lottery",
      description: "Offer genomic testing to randomly selected patients across the population to ensure representative access",
      advantages: [
        "Most egalitarian approach",
        "Supports development of diverse database",
        "Avoids selection bias"
      ],
      disadvantages: [
        "May not prioritize those with greatest clinical need",
        "Less immediate clinical utility",
        "Resource efficiency concerns"
      ],
      ethicalAlignment: {
        justice: 0.9,
        universality: 0.85,
        autonomy: 0.8,
        beneficence: 0.6
      }
    },
    {
      approach: "Tiered Implementation with Sliding Scale",
      description: "Implement a tiered approach where clinical need, potential benefit, and ability to pay are considered with subsidies for those unable to afford testing",
      advantages: [
        "Balances clinical need with access",
        "Economically sustainable",
        "Flexibility for different situations"
      ],
      disadvantages: [
        "More complex to administer",
        "May still create inequities",
        "Challenges in determining fair subsidies"
      ],
      ethicalAlignment: {
        justice: 0.8,
        beneficence: 0.8,
        autonomy: 0.7,
        futurity: 0.75
      }
    },
    {
      approach: "Opt-In Research Participation Model",
      description: "Offer testing at reduced/no cost to patients who agree to share anonymized data for research, with full price option for those who decline sharing",
      advantages: [
        "Supports research advancement",
        "Provides choice to patients",
        "Economically sustainable"
      ],
      disadvantages: [
        "May create pressure to share data",
        "Privacy concerns",
        "Potential selection bias in database"
      ],
      ethicalAlignment: {
        autonomy: 0.85,
        futurity: 0.85,
        beneficence: 0.7,
        justice: 0.65
      }
    },
    {
      approach: "Hybrid Clinical-Priority and Representational Model",
      description: "Prioritize based on clinical need while ensuring representation across demographic groups, with special attention to historically underrepresented populations",
      advantages: [
        "Addresses existing disparities",
        "Balances immediate utility with long-term goals",
        "Supports development of more equitable database"
      ],
      disadvantages: [
        "Complex prioritization criteria",
        "May delay some with clinical need",
        "Implementation challenges"
      ],
      ethicalAlignment: {
        justice: 0.9,
        beneficence: 0.8,
        futurity: 0.85,
        dignity: 0.85
      }
    }
  ];
  
  // Epistemic limitations relevant to genomic medicine
  const epistemicLimitations = [
    {
      domain: "Variant Interpretation",
      limitation: "Many genetic variants have uncertain significance and limited evidence for clinical interpretation",
      impact: "May lead to uncertainty in clinical recommendations or unnecessary interventions",
      mitigationStrategy: "Transparent communication of confidence levels and continuous reassessment as evidence evolves"
    },
    {
      domain: "Population Representation",
      limitation: "Genomic databases overrepresent certain ethnic groups, creating disparities in interpretive accuracy",
      impact: "Less accurate or useful results for underrepresented populations",
      mitigationStrategy: "Prioritize diversity in database development and acknowledge limitations in result interpretation"
    },
    {
      domain: "Gene-Environment Interaction",
      limitation: "Genetic risk factors interact with environmental factors in complex ways not fully understood",
      impact: "Risk predictions may have limited accuracy without contextual factors",
      mitigationStrategy: "Integrate environmental and social determinants of health in interpretation models"
    },
    {
      domain: "Temporal Evolution",
      limitation: "Interpretation of genetic variants changes over time as evidence accumulates",
      impact: "Today's recommendations may differ from future understanding",
      mitigationStrategy: "Establish processes for periodic reanalysis and patient recontact when interpretations change"
    },
    {
      domain: "Predictive Limitations",
      limitation: "Penetrance and expressivity vary, making precise individual prediction difficult",
      impact: "Patients may receive ambiguous risk assessments",
      mitigationStrategy: "Use ranges rather than point estimates and emphasize probabilistic nature of predictions"
    }
  ];
  
  // Apply Categorical Imperative analysis using three formulations
  const categoricalImperativeAnalysis = {
    universalLaw: {
      analysis: `
        According to the first formulation of the categorical imperative, we must ask whether
        each implementation approach could become a universal law without contradiction. 
        
        The Clinically-Targeted approach could be universalized as a principle of allocating
        resources based on evidence of benefit, which creates no contradiction.
        
        The Random Lottery approach satisfies universalizability by treating all potential
        recipients equally, though it may not maximize clinical benefit.
        
        The Tiered Implementation creates potential contradictions if ability to pay becomes
        a primary determinant, as this would systematically disadvantage certain groups.
        
        The Opt-In Research model creates a subtle contradiction by potentially coercing
        data sharing from those unable to pay full price, undermining the concept of truly
        informed consent when universalized.
        
        The Hybrid Clinical-Priority and Representational Model best satisfies universalizability
        by considering both immediate clinical need and addressing structural inequities,
        allowing for a sustainable system that could be consistently applied.
      `,
      ranking: [
        "Hybrid Clinical-Priority and Representational Model",
        "Clinically-Targeted Implementation",
        "Population-Based Random Lottery",
        "Tiered Implementation with Sliding Scale",
        "Opt-In Research Participation Model"
      ]
    },
    humanityAsEnd: {
      analysis: `
        The second formulation requires that we treat humanity, in ourselves and others,
        always as an end and never merely as a means.
        
        The Clinically-Targeted approach respects patients as ends by focusing on direct
        clinical benefit, but may instrumentalize future patients by limiting database development.
        
        The Random Lottery approach respects the equal moral worth of all patients, but
        may fail to adequately address those with immediate clinical needs.
        
        The Tiered Implementation risks treating economically disadvantaged patients as less
        worthy of access, potentially using financial status as a proxy for moral worth.
        
        The Opt-In Research model risks treating patients primarily as data sources rather
        than ends in themselves, particularly for those who cannot afford the full-price option.
        
        The Hybrid model best respects humanity as an end by addressing both immediate clinical
        needs and structural inequities that have historically treated some groups as less worthy.
      `,
      ranking: [
        "Hybrid Clinical-Priority and Representational Model",
        "Clinically-Targeted Implementation",
        "Population-Based Random Lottery",
        "Tiered Implementation with Sliding Scale",
        "Opt-In Research Participation Model"
      ]
    },
    kingdomOfEnds: {
      analysis: `
        The third formulation asks whether the principle could be acceptable in an ideal moral
        community where all are both lawmakers and subject to the laws.
        
        The Clinically-Targeted approach would be acceptable in a kingdom of ends for addressing
        immediate needs, but fails to address historical injustices that have led to knowledge gaps.
        
        The Random Lottery approach honors equality but may not be what rational agents would 
        choose given the varying benefits of testing for different clinical situations.
        
        The Tiered Implementation might not be endorsed in an ideal moral community due to its
        reinforcement of economic inequalities in healthcare access.
        
        The Opt-In Research model creates problematic incentives that might not be chosen by
        rational agents concerned with both present and future welfare.
        
        The Hybrid model best approximates what might be chosen in a kingdom of ends, as it
        balances immediate needs with addressing historical injustices and future benefits.
      `,
      ranking: [
        "Hybrid Clinical-Priority and Representational Model",
        "Population-Based Random Lottery",
        "Clinically-Targeted Implementation",
        "Tiered Implementation with Sliding Scale",
        "Opt-In Research Participation Model"
      ]
    },
    conclusion: `
      Based on comprehensive analysis using all three formulations of the categorical imperative,
      the Hybrid Clinical-Priority and Representational Model best satisfies Kantian ethical
      principles. This approach:
      
      1. Can be universalized without contradiction
      2. Respects all persons as ends in themselves
      3. Would likely be endorsed in an ideal moral community
      4. Balances immediate clinical benefits with addressing historical inequities
      5. Supports both current patients and future beneficiaries
      
      Implementation should include robust informed consent processes, transparent communication
      of epistemic limitations, ongoing reassessment of prioritization criteria, and mechanisms
      for public input to ensure the approach remains aligned with the categorical imperative.
    `
  };
  
  // Define practical implementation guidance
  const implementationGuidance = {
    recommendedApproach: "Hybrid Clinical-Priority and Representational Model",
    implementationSteps: [
      {
        phase: "Initial Assessment",
        actions: [
          "Conduct stakeholder engagement with diverse patient populations",
          "Analyze existing disparities in genomic database representation",
          "Evaluate clinical areas with strongest evidence for genomic benefit",
          "Assess resource constraints and sustainable funding models"
        ]
      },
      {
        phase: "Prioritization Framework Development",
        actions: [
          "Develop transparent scoring system combining clinical need and representational factors",
          "Create processes for identifying patients who meet criteria",
          "Establish oversight committee with diverse representation",
          "Design appeals process for exceptional cases"
        ]
      },
      {
        phase: "Informed Consent Enhancement",
        actions: [
          "Develop comprehensive informed consent with uncertainty disclosure",
          "Create patient education materials at multiple literacy levels",
          "Establish processes for communicating evolving interpretations",
          "Train providers in ethical communication of genomic results"
        ]
      },
      {
        phase: "Data Governance",
        actions: [
          "Establish transparent policies for data use and protection",
          "Create mechanisms for patient control over secondary use",
          "Implement rigorous privacy protections",
          "Develop benefit-sharing mechanisms for commercialization outcomes"
        ]
      },
      {
        phase: "Monitoring and Adaptation",
        actions: [
          "Implement ongoing assessment of equity in program access",
          "Track clinical outcomes and benefits",
          "Adjust prioritization criteria based on emerging evidence",
          "Regular ethical reassessment as technology and knowledge evolve"
        ]
      }
    ],
    ethicalSafeguards: [
      "Regular oversight committee review of implementation against ethical principles",
      "Representative community advisory board with meaningful authority",
      "Transparent reporting of access and outcome metrics by demographic groups",
      "Formal process for raising and addressing ethical concerns",
      "Regular reassessment of epistemic limitations and communication approaches"
    ],
    potentialChallenges: [
      "Resource constraints limiting program scope",
      "Provider knowledge gaps in genomic medicine",
      "Communication of complex probabilistic information to patients",
      "Balancing immediate clinical needs with representation goals",
      "Evolving evidence requiring program adaptation"
    ]
  };
  
  // Output comprehensive analysis results
  console.log("\nPrecision Medicine Implementation Ethical Analysis");
  console.log("\nScenario Overview:");
  console.log(scenario);
  
  console.log("\nCategorical Imperative Analysis:");
  console.log(categoricalImperativeAnalysis.conclusion);
  
  console.log("\nImplementation Recommendation:");
  console.log(`Recommended Approach: ${implementationGuidance.recommendedApproach}`);
  
  console.log("\nKey Implementation Steps:");
  implementationGuidance.implementationSteps.forEach(phase => {
    console.log(`\n${phase.phase}:`);
    phase.actions.forEach(action => console.log(`- ${action}`));
  });
  
  console.log("\nEthical Safeguards:");
  implementationGuidance.ethicalSafeguards.forEach(safeguard => console.log(`- ${safeguard}`));
  
  console.log("\nEpistemic Limitations to Address:");
  epistemicLimitations.forEach(limitation => {
    console.log(`\n- ${limitation.domain}:`);
    console.log(`  Limitation: ${limitation.limitation}`);
    console.log(`  Impact: ${limitation.impact}`);
    console.log(`  Mitigation: ${limitation.mitigationStrategy}`);
  });
  
  return {
    scenario,
    ethicalFactors,
    stakeholderPerspectives,
    implementationOptions,
    epistemicLimitations,
    categoricalImperativeAnalysis,
    implementationGuidance
  };
}

/**
 * Example 2: Advanced Clinical Decision Support with Epistemic Humility
 * 
 * This example demonstrates how the CAR framework handles complex clinical decision-making
 * with explicit awareness of knowledge boundaries, uncertainty quantification, and integration
 * of competing ethical considerations.
 */
function complexClinicalDecisionSupport() {
  console.log("\n=== Example 2: Complex Clinical Decision Support with Epistemic Humility ===");
  
  // Create comprehensive patient profile
  const patient: PatientProfile = {
    id: "PT78945",
    age: 72,
    sex: "male",
    demographics: {
      ethnicity: "East Asian",
      primaryLanguage: "Mandarin",
      secondaryLanguage: "English",
      education: "graduate_degree",
      socioeconomicStatus: "middle"
    },
    medicalHistory: [
      {
        name: "Atrial Fibrillation",
        duration: 8, // years
        severity: "moderate",
        control: "stable",
        details: "Paroxysmal, episodes approximately monthly"
      },
      {
        name: "Type 2 Diabetes Mellitus",
        duration: 15, // years
        severity: "moderate",
        control: "fair",
        details: "Microvascular complications present (mild retinopathy, microalbuminuria)"
      },
      {
        name: "Stage 3 Chronic Kidney Disease",
        duration: 5, // years
        severity: "moderate",
        control: "stable",
        details: "eGFR 45-55 mL/min/1.73m², stable over past 2 years"
      },
      {
        name: "History of GI Bleeding",
        duration: 3, // years
        severity: "severe",
        control: "resolved",
        details: "Hospitalized for upper GI bleed 3 years ago, required transfusion"
      }
    ],
    medications: [
      {
        name: "Metformin",
        dose: "500mg",
        frequency: "twice daily",
        adherence: "consistent",
        duration: 15 // years
      },
      {
        name: "Glipizide",
        dose: "5mg",
        frequency: "daily",
        adherence: "consistent",
        duration: 10 // years
      },
      {
        name: "Lisinopril",
        dose: "10mg",
        frequency: "daily",
        adherence: "consistent",
        duration: 7 // years
      },
      {
        name: "Metoprolol",
        dose: "25mg",
        frequency: "twice daily",
        adherence: "consistent",
        duration: 8 // years
      },
      {
        name: "Apixaban",
        dose: "2.5mg",
        frequency: "twice daily",
        adherence: "consistent",
        duration: 2, // years
        notes: "Reduced dose due to age, weight, and renal function"
      }
    ],
    allergies: [
      {
        agent: "Aspirin",
        reaction: "GI upset and bruising",
        severity: "moderate"
      },
      {
        agent: "Sulfa Drugs",
        reaction: "Rash",
        severity: "mild"
      }
    ],
    socialHistory: {
      smokingStatus: "former",
      alcoholUse: "none",
      livingArrangement: "lives_with_spouse",
      occupation: "retired_engineer",
      functionalStatus: "independent_with_some_limitations",
      exerciseLevel: "light",
      dietPattern: "traditional_chinese_with_diabetic_modifications"
    },
    familyHistory: [
      {
        condition: "Stroke",
        relationship: "father",
        ageOfOnset: 68
      },
      {
        condition: "Type 2 Diabetes",
        relationship: "mother",
        ageOfOnset: 60
      },
      {
        condition: "Gastric Cancer",
        relationship: "brother",
        ageOfOnset: 65
      }
    ],
    vitalSigns: {
      bloodPressure: "142/84",
      heartRate: 68,
      respiratoryRate: 16,
      temperature: 36.7,
      oxygenSaturation: 97,
      height: 168, // cm
      weight: 62 // kg
    },
    labs: [
      {
        name: "HbA1c",
        value: 7.4,
        unit: "%",
        referenceRange: "4.0-5.6",
        date: "2023-04-10",
        trend: "stable"
      },
      {
        name: "Glucose (fasting)",
        value: 142,
        unit: "mg/dL",
        referenceRange: "70-99",
        date: "2023-04-10",
        trend: "stable"
      },
      {
        name: "Creatinine",
        value: 1.4,
        unit: "mg/dL",
        referenceRange: "0.6-1.2",
        date: "2023-04-10",
        trend: "stable"
      },
      {
        name: "eGFR",
        value: 48,
        unit: "mL/min/1.73m²",
        referenceRange: ">60",
        date: "2023-04-10",
        trend: "stable"
      },
      {
        name: "Hemoglobin",
        value: 11.8,
        unit: "g/dL",
        referenceRange: "13.5-17.5",
        date: "2023-04-10",
        trend: "improved"
      },
      {
        name: "Platelet Count",
        value: 180,
        unit: "K/uL",
        referenceRange: "150-450",
        date: "2023-04-10",
        trend: "stable"
      },
      {
        name: "INR",
        value: 1.1,
        unit: "",
        referenceRange: "0.9-1.1",
        date: "2023-04-10",
        trend: "stable"
      },
      {
        name: "Potassium",
        value: 4.6,
        unit: "mmol/L",
        referenceRange: "3.5-5.0",
        date: "2023-04-10",
        trend: "stable"
      },
      {
        name: "LDL Cholesterol",
        value: 92,
        unit: "mg/dL",
        referenceRange: "<100",
        date: "2023-04-10",
        trend: "stable"
      },
      {
        name: "Urine Albumin-to-Creatinine Ratio",
        value: 42,
        unit: "mg/g",
        referenceRange: "<30",
        date: "2023-04-10",
        trend: "stable"
      }
    ],
    imagingStudies: [
      {
        type: "Brain MRI",
        date: "2023-01-15",
        findings: "Mild small vessel ischemic changes, no acute infarcts",
        impression: "Age-appropriate findings with mild chronic ischemic changes"
      },
      {
        type: "Abdominal CT",
        date: "2021-08-20",
        findings: "Mild hepatic steatosis, no masses. Normal pancreas.",
        impression: "No significant abnormalities except mild fatty liver"
      },
      {
        type: "Echocardiogram",
        date: "2022-11-10",
        findings: "EF 55%, mild left atrial enlargement, mild diastolic dysfunction",
        impression: "Preserved systolic function with mild structural changes consistent with history"
      }
    ],
    riskAssessments: [
      {
        name: "CHA₂DS₂-VASc Score",
        value: 4,
        interpretation: "High risk for stroke, annual risk approximately 4%",
        date: "2023-04-10"
      },
      {
        name: "HAS-BLED Score",
        value: 3,
        interpretation: "Moderate-high bleeding risk",
        date: "2023-04-10"
      },
      {
        name: "ASCVD 10-year Risk",
        value: 18.5,
        unit: "%",
        interpretation: "High cardiovascular risk",
        date: "2023-04-10"
      }
    ],
    preferences: {
      communicationPreference: "family_present",
      languagePreference: "Mandarin",
      treatmentPreference: "moderate_intervention",
      advanceDirectives: {
        status: "completed",
        directives: ["no_prolonged_intubation", "no_cpr_if_terminal_illness"]
      },
      goalOfCare: "maintain_quality_of_life",
      concernPriorities: ["bleeding_risk", "stroke_prevention", "maintaining_independence"]
    }
  };
  
  // Clinical data with current presentation
  const clinicalData: ClinicalData = {
    presentingComplaint: "Transient left-sided weakness and slurred speech lasting 15 minutes, resolved completely",
    historyCurrent: "Patient experienced sudden onset of left arm and face weakness with slurred speech yesterday evening. Symptoms resolved completely within 15 minutes. No headache, no vision changes. Has had two similar episodes in past month, each lasting less than 10 minutes. Patient initially reluctant to seek care due to fear of hospitalization, convinced by family to come in.",
    reviewOfSystems: {
      constitutional: "No fever, fatigue present",
      cardiovascular: "No chest pain, reports occasional palpitations",
      respiratory: "No shortness of breath",
      gastrointestinal: "No abdominal pain or changes in bowel habits",
      neurological: "Transient weakness and speech changes as described, otherwise normal",
      psychiatric: "Mild anxiety about health condition"
    },
    physicalExam: {
      general: "Alert, oriented elderly male in no acute distress",
      vitals: "BP 142/84, HR 68 and regular, RR 16, T 36.7, O2 97% on room air",
      heent: "Normocephalic, atraumatic, no carotid bruits",
      cardiovascular: "Irregular rhythm, no murmurs, rubs or gallops",
      respiratory: "Clear to auscultation bilaterally",
      abdominal: "Soft, non-tender, no organomegaly",
      neurological: "NIHSS score 0. No focal deficits. Normal strength, sensation, and coordination. Normal speech. CN II-XII intact."
    },
    functionalStatus: {
      adls: "Independent",
      iadls: "Independent but reports increasing difficulty with managing finances",
      mobility: "Ambulates independently, no assistive devices"
    },
    diagnosticStudies: [
      {
        name: "CT Head without contrast",
        finding: "No acute intracranial hemorrhage, mass effect, or early signs of ischemia. Chronic small vessel ischemic changes.",
        date: "2023-04-15"
      },
      {
        name: "Carotid Duplex Ultrasound",
        finding: "40-45% stenosis of right internal carotid artery, 30% stenosis of left internal carotid artery",
        date: "2023-04-15"
      },
      {
        name: "ECG",
        finding: "Atrial fibrillation with ventricular rate of 68. No acute ST-T changes.",
        date: "2023-04-15"
      },
      {
        name: "Telemetry Monitoring",
        finding: "Continuous atrial fibrillation during 24-hour monitoring. Heart rate 60-90 bpm.",
        date: "2023-04-16"
      }
    ],
    diagnoses: [
      {
        condition: "Transient Ischemic Attack (TIA)",
        certainty: "high",
        evidence: "Transient focal neurological symptoms with complete resolution, consistent with cerebrovascular etiology"
      },
      {
        condition: "Atrial Fibrillation",
        certainty: "definite",
        evidence: "ECG and telemetry confirmation, previously diagnosed"
      },
      {
        condition: "Type 2 Diabetes Mellitus",
        certainty: "definite",
        evidence: "Long-standing history, medication use, elevated HbA1c"
      },
      {
        condition: "Stage 3 Chronic Kidney Disease",
        certainty: "definite",
        evidence: "Reduced eGFR 48 mL/min/1.73m², stable"
      },
      {
        condition: "History of Upper GI Bleeding",
        certainty: "definite",
        evidence: "Documented hospital admission 3 years ago with transfusion"
      },
      {
        condition: "Carotid Atherosclerosis",
        certainty: "definite",
        evidence: "Duplex ultrasound showing bilateral carotid stenosis"
      }
    ]
  };
  
  // Treatment options
  const anticoagulationOptions: TreatmentOption[] = [
    {
      treatment: "Apixaban (Continue Current)",
      category: "pharmacological",
      mechanism: "Direct factor Xa inhibitor",
      intendedEffect: "Stroke prevention in atrial fibrillation",
      typicalDosing: "2.5mg twice daily (reduced dose due to age, weight, and renal function)",
      evidenceGrade: {
        quality: "high",
        populationMatch: "moderate",
        relevance: "high"
      },
      contraindications: ["Severe bleeding", "Mechanical heart valves"],
      interactions: ["Strong dual inhibitors of CYP3A4 and P-gp", "Strong dual inducers of CYP3A4 and P-gp"],
      sideEffects: ["Bleeding", "Bruising"],
      costLevel: "high",
      specialConsiderations: [
        "Current dose already reduced due to age, weight, and renal function",
        "Patient has been stable on this medication for 2 years",
        "Moderate evidence in East Asian populations with similar characteristics"
      ],
      uncertaintyLevel: "moderate"
    },
    {
      treatment: "Warfarin",
      category: "pharmacological",
      mechanism: "Vitamin K antagonist",
      intendedEffect: "Stroke prevention in atrial fibrillation",
      typicalDosing: "Individualized to INR 2.0-3.0",
      evidenceGrade: {
        quality: "high",
        populationMatch: "high",
        relevance: "high"
      },
      contraindications: ["Severe bleeding", "Non-compliance with monitoring"],
      interactions: ["Numerous food and drug interactions", "Antibiotics", "NSAIDs"],
      sideEffects: ["Bleeding", "Need for frequent monitoring"],
      costLevel: "low",
      specialConsiderations: [
        "Requires regular INR monitoring",
        "More extensive clinical experience in diverse populations",
        "May be challenging with language barrier and need for frequent visits",
        "Higher risk of intracranial bleeding in East Asian patients"
      ],
      uncertaintyLevel: "low"
    },
    {
      treatment: "Increase Apixaban to Standard Dose",
      category: "pharmacological",
      mechanism: "Direct factor Xa inhibitor",
      intendedEffect: "Enhanced stroke prevention in atrial fibrillation",
      typicalDosing: "5mg twice daily (standard dose)",
      evidenceGrade: {
        quality: "low",
        populationMatch: "low",
        relevance: "moderate"
      },
      contraindications: ["Severe bleeding", "Mechanical heart valves"],
      interactions: ["Strong dual inhibitors of CYP3A4 and P-gp", "Strong dual inducers of CYP3A4 and P-gp"],
      sideEffects: ["Increased bleeding risk", "Bruising"],
      costLevel: "high",
      specialConsiderations: [
        "Limited evidence for increasing dose after TIA while on reduced dose",
        "May increase bleeding risk substantially given age, weight, and renal function",
        "Would deviate from standard dosing recommendations"
      ],
      uncertaintyLevel: "high"
    },
    {
      treatment: "Switch to Dabigatran",
      category: "pharmacological",
      mechanism: "Direct thrombin inhibitor",
      intendedEffect: "Stroke prevention in atrial fibrillation",
      typicalDosing: "110mg twice daily (reduced dose due to age and bleeding risk)",
      evidenceGrade: {
        quality: "moderate",
        populationMatch: "moderate",
        relevance: "moderate"
      },
      contraindications: ["Severe renal impairment", "Mechanical heart valves"],
      interactions: ["P-gp inducers and inhibitors"],
      sideEffects: ["Bleeding", "Dyspepsia"],
      costLevel: "high",
      specialConsiderations: [
        "Limited data on switching after TIA while on another anticoagulant",
        "Higher rate of GI side effects could be problematic given history",
        "More dependent on renal clearance than current medication"
      ],
      uncertaintyLevel: "high"
    },
    {
      treatment: "Add Antiplatelet Therapy",
      category: "pharmacological",
      mechanism: "Platelet aggregation inhibition",
      intendedEffect: "Additional protection against ischemic events",
      typicalDosing: "Clopidogrel 75mg daily",
      evidenceGrade: {
        quality: "very low",
        populationMatch: "low",
        relevance: "low"
      },
      contraindications: ["Active pathological bleeding"],
      interactions: ["Other anticoagulants (significantly increases bleeding risk)"],
      sideEffects: ["Substantially increased bleeding risk", "Bruising"],
      costLevel: "moderate",
      specialConsiderations: [
        "Combination therapy substantially increases bleeding risk",
        "No clear evidence of benefit in this scenario",
        "Generally avoided in patients already on anticoagulation"
      ],
      uncertaintyLevel: "low" // Low uncertainty about significantly increased bleeding risk
    }
  ];
  
  // Medical evidence evaluation
  const evidenceEvaluation: MedicalEvidence[] = [
    {
      question: "Does increasing anticoagulation intensity reduce recurrent TIA/stroke risk in patients who experience events while on appropriate anticoagulation?",
      evidenceQuality: "very low",
      findings: "Limited studies specifically examining this question. Most guidelines recommend optimizing current therapy rather than intensification.",
      applicability: "Low applicability to elderly East Asian patients with renal impairment and bleeding history",
      sources: ["Expert opinion", "Case series"],
      uncertaintyLevel: "high"
    },
    {
      question: "Is reduced-dose apixaban (2.5mg BID) effective for stroke prevention in atrial fibrillation?",
      evidenceQuality: "moderate",
      findings: "Subgroup analyses of major trials suggest efficacy in appropriate populations meeting dose reduction criteria, though with wider confidence intervals than standard dosing.",
      applicability: "Moderate applicability to patient population",
      sources: ["ARISTOTLE trial subgroup analysis", "Observational studies"],
      uncertaintyLevel: "moderate"
    },
    {
      question: "What is the optimal approach after a possible breakthrough ischemic event while on anticoagulation?",
      evidenceQuality: "low",
      findings: "Most experts recommend ensuring medication adherence, controlling other risk factors, and considering alternative causes before changing anticoagulation strategy.",
      applicability: "Moderate applicability to patient scenario",
      sources: ["Expert opinion", "Consensus guidelines"],
      uncertaintyLevel: "high"
    },
    {
      question: "Does combining antiplatelet therapy with anticoagulation improve outcomes after TIA in patients with atrial fibrillation?",
      evidenceQuality: "low",
      findings: "Combined therapy substantially increases bleeding risk without clear evidence of benefit for secondary prevention in atrial fibrillation.",
      applicability: "High applicability given patient's bleeding history",
      sources: ["WARSS trial", "Meta-analyses"],
      uncertaintyLevel: "moderate"
    },
    {
      question: "What is the comparative effectiveness of different anticoagulants in East Asian populations?",
      evidenceQuality: "moderate",
      findings: "Some evidence suggests East Asian patients may have different risk profiles with anticoagulation, with possibly higher bleeding risks and good effectiveness at lower intensities.",
      applicability: "High applicability to patient",
      sources: ["Subgroup analyses of major trials", "Regional registries"],
      uncertaintyLevel: "moderate"
    }
  ];
  
  // Epistemic status assessment
  const epistemicAssessment: EpistemicStatus = {
    knownKnowns: [
      "Patient experienced a probable TIA despite being on reduced-dose apixaban",
      "Patient has multiple stroke risk factors including atrial fibrillation, diabetes, and carotid disease",
      "Patient has significant bleeding risk factors including age, prior GI bleed, and renal impairment",
      "Combining antiplatelet and anticoagulant therapy significantly increases bleeding risk"
    ],
    knownUnknowns: [
      "Whether the event represents a true breakthrough on therapeutic anticoagulation (vs. other etiology or medication adherence issue)",
      "Patient-specific optimal balance between bleeding and stroke risk",
      "Whether increasing anticoagulation intensity would improve outcomes",
      "Long-term compliance with different regimens given language barriers and preferences"
    ],
    uncertaintyAreas: [
      {
        area: "Medication Efficacy",
        description: "Uncertainty about whether current reduced-dose apixaban is providing adequate protection",
        evidenceGaps: "Limited data on breakthrough events while on DOACs",
        relevance: "High - central to treatment decision"
      },
      {
        area: "Risk Quantification",
        description: "Precise quantification of competing risks (stroke vs. bleeding) with different options",
        evidenceGaps: "Risk calculators have limited validation in East Asian populations with multiple comorbidities",
        relevance: "High - affects risk-benefit assessment"
      },
      {
        area: "Patient-Specific Factors",
        description: "Individual factors that may modify standard recommendations",
        evidenceGaps: "Personalized approaches based on pharmacogenomics and comorbidity interactions",
        relevance: "Moderate - may influence optimal approach"
      }
    ],
    confidenceLevels: {
      diagnosisTIA: 0.85,
      currentMedicationAdherence: 0.90,
      bleedingRiskHigh: 0.80,
      strokeRiskHigh: 0.90,
      benefitFromAnticoagulation: 0.85,
      benefitFromIntensification: 0.40
    }
  };
  
  // Patient values assessment
  const patientValues: PatientValues = {
    primaryConcerns: [
      {
        concern: "Stroke Prevention",
        importance: 0.90,
        notes: "Witnessed father's disability after stroke, strong fear of being dependent"
      },
      {
        concern: "Bleeding Avoidance",
        importance: 0.85,
        notes: "Traumatized by previous hospitalization for GI bleeding, strongly wishes to avoid recurrence"
      },
      {
        concern: "Medication Complexity",
        importance: 0.60,
        notes: "Prefers simplified regimen, concerned about interactions and keeping track"
      },
      {
        concern: "Quality of Life",
        importance: 0.95,
        notes: "Prioritizes maintaining independence and current activities"
      },
      {
        concern: "Cost Considerations",
        importance: 0.50,
        notes: "Has prescription coverage but concerned about long-term costs"
      }
    ],
    tradeoffAssessments: [
      {
        scenario: "Higher stroke protection with higher bleeding risk",
        preference: "Balanced approach slightly favoring stroke prevention",
        strengthOfPreference: 0.60
      },
      {
        scenario: "More frequent monitoring vs. convenience",
        preference: "Prefers convenience if reasonable",
        strengthOfPreference: 0.70
      },
      {
        scenario: "Novel approach vs. established treatment",
        preference: "Prefers established treatment with more certainty",
        strengthOfPreference: 0.80
      }
    ],
    culturalFactors: [
      "Traditional Chinese medical beliefs may influence perception of medications",
      "Family-centered decision making important in culture",
      "Respect for physician authority may limit expressing concerns"
    ]
  };
  
  // Clinical decision context
  const decisionContext: HealthcareContext = {
    setting: "hospital_consultation",
    urgency: "semi_urgent",
    careRelationship: "new_consultant",
    healthcareSystem: "integrated",
    location: {
      region: "Urban West Coast US",
      ruralUrban: "urban",
      resourceSetting: "high_resource"
    },
    culturalContext: {
      language: "Mandarin primary with English as secondary",
      familyRole: "central_to_decisions",
      relevantBeliefs: ["Respect for elders", "Family harmony valued", "Balance concept in health"]
    },
    systemConstraints: {
      followupAvailability: "limited_with_language_services",
      specialistAccess: "available_but_delayed",
      monitoringCapability: "comprehensive",
      medicationAccess: "full_formulary_with_prior_authorization"
    }
  };
  
  // Ethical factors in this clinical decision
  const ethicalFactors: EthicalFactor[] = [
    {
      type: "autonomy",
      description: "Respecting patient's values and preferences while ensuring adequate information",
      relevance: 0.85,
      stakeholders: ["Patient", "Family", "Healthcare Provider"],
      tensions: [
        {
          withFactor: "beneficence",
          description: "Tension between patient preference and medical recommendation if they diverge",
          severity: 0.70
        }
      ],
      kantianPrinciple: "Respecting rational agency requires informed choice"
    },
    {
      type: "beneficence",
      description: "Providing optimal stroke prevention based on best available evidence",
      relevance: 0.90,
      stakeholders: ["Healthcare Provider", "Patient", "Family"],
      tensions: [
        {
          withFactor: "non_maleficence",
          description: "Tension between stroke prevention benefits and bleeding risks",
          severity: 0.85
        }
      ],
      kantianPrinciple: "Duty to promote welfare must consider overall wellbeing"
    },
    {
      type: "non_maleficence",
      description: "Avoiding harm from bleeding complications",
      relevance: 0.85,
      stakeholders: ["Healthcare Provider", "Patient", "Family"],
      kantianPrinciple: "First duty is to avoid treating patients merely as means to medical goals"
    },
    {
      type: "epistemic_humility",
      description: "Acknowledging uncertainty in evidence and limitations of medical knowledge",
      relevance: 0.80,
      stakeholders: ["Healthcare Provider", "Patient", "Medical Community"],
      kantianPrinciple: "Recognition of boundaries of knowledge is essential to appropriate action"
    },
    {
      type: "communicative_justice",
      description: "Ensuring language and cultural factors don't impede quality care",
      relevance: 0.75,
      stakeholders: ["Healthcare Provider", "Patient", "Family", "Healthcare System"],
      kantianPrinciple: "Equal moral worth requires accommodating differences in communication needs"
    }
  ];
  
  // Combined healthcare data input
  const healthcareData: HealthcareData = {
    patient,
    clinical: clinicalData,
    treatments: anticoagulationOptions,
    context: decisionContext,
    ethicalFactors,
    evidence: evidenceEvaluation,
    epistemicStatus: epistemicAssessment,
    patientValues,
    query: "What is the optimal approach to anticoagulation management for this 72-year-old man with atrial fibrillation who experienced a probable TIA while on reduced-dose apixaban, considering his bleeding history, stroke risk factors, and values?"
  };
  
  // Process through CAR Healthcare
  const carResult = healthcareAdvisor.process(healthcareData);
  
  // Generate detailed recommendation output
  const detailedRecommendation = {
    clinicalAssessment: `
      This 72-year-old East Asian man with atrial fibrillation (CHA₂DS₂-VASc 4) experienced 
      a probable TIA despite being on reduced-dose apixaban (2.5mg BID). He has multiple stroke 
      risk factors (atrial fibrillation, diabetes, carotid stenosis, prior TIAs) and significant 
      bleeding risk factors (age, prior GI bleed requiring transfusion, CKD, HAS-BLED 3). 
      
      The central clinical question is whether his current anticoagulation regimen provides 
      adequate protection against stroke, and if not, how to optimize it while minimizing 
      bleeding risk.
    `,
    
    recommendation: `
      After comprehensive analysis, the recommended approach is to:
      
      PRIMARY RECOMMENDATION:
      - Continue reduced-dose apixaban (2.5mg BID) as the preferred anticoagulation strategy
      
      SUPPORTING INTERVENTIONS:
      1. Conduct thorough evaluation of potentially modifiable stroke risk factors:
         - Optimize blood pressure control (current 142/84 is above target)
         - Ensure optimal diabetes management (current HbA1c 7.4%)
         - Consider carotid imaging follow-up and evaluation by vascular surgery given stenosis
      
      2. Implement enhanced medication adherence support:
         - Provide written instructions in Mandarin
         - Use pill box with family support for setup
         - Confirm proper timing of medication (separate from interacting supplements/foods)
      
      3. Short-term monitoring plan:
         - Follow-up in 2-4 weeks with interpreter services
         - Consider 30-day cardiac monitoring to assess AF burden
         - Repeat TIA risk assessment in 3 months
      
      This approach best balances the competing risks of stroke and bleeding while respecting
      patient values, acknowledging evidential uncertainty, and considering practical aspects
      of implementation.
    `,
    
    rationale: {
      medicalEvidence: `
        The medical evidence supports continuing the current anticoagulation strategy:
        
        1. Though the patient experienced a probable TIA, this doesn't necessarily indicate 
           anticoagulation failure, as TIAs can occur from non-cardioembolic mechanisms (e.g., 
           carotid disease) or from temporary lapses in anticoagulation effectiveness.
        
        2. There is limited evidence that intensifying anticoagulation beyond recommended dosing 
           improves outcomes for patients experiencing breakthrough events.
        
        3. The patient clearly meets criteria for reduced-dose apixaban (age ≥80, weight ≤60kg, 
           serum creatinine ≥1.5mg/dL), and evidence supports its effectiveness in this population.
        
        4. East Asian patients may have increased sensitivity to anticoagulants with higher 
           bleeding risks, particularly intracranial hemorrhage, suggesting caution with intensification.
        
        5. Adding antiplatelet therapy would substantially increase bleeding risk without clear 
           evidence of benefit for cardioembolic stroke prevention.
      `,
      
      riskBenefitAnalysis: `
        Risk-benefit analysis strongly favors the recommended approach:
        
        1. Stroke risk:
           - Current annual stroke risk ~4% based on CHA₂DS₂-VASc score of 4
           - Anticoagulation typically reduces this risk by ~65-70%
           - Limited evidence that alternative strategies would provide substantially better protection
        
        2. Bleeding risk:
           - Current annual major bleeding risk ~3.5-4% based on HAS-BLED score of 3 and history
           - Standard-dose anticoagulation would likely increase this by ~40-50%
           - Combined therapy would approximately double bleeding risk
        
        3. Competing risks:
           - The narrow therapeutic margin between stroke and bleeding risk necessitates a balanced approach
           - The patient's history of GI bleeding requiring transfusion significantly impacts the risk equation
           - Optimization of modifiable risk factors may improve stroke prevention without increasing bleeding risk
      `,
      
      ethicalAnalysis: `
        Ethical analysis through the Kantian framework supports the recommendation:
        
        1. Universalization test:
           The recommended approach can be universalized as a maxim: "When managing competing risks, 
           optimize therapy within established guidelines while addressing modifiable risk factors and
           respecting patient values." This creates no contradiction when universalized.
        
        2. Humanity as end test:
           The recommendation respects the patient as an end in himself by:
           - Honoring his values and concerns about both stroke and bleeding
           - Providing support for informed decision-making through culturally appropriate communication
           - Avoiding treating him merely as a means to achieving guideline compliance
        
        3. Kingdom of ends test:
           This approach would be acceptable in an ideal moral community where:
           - Evidence limitations are transparently acknowledged
           - Individual differences in risk profiles are respected
           - Practical implementation challenges are addressed
        
        The approach particularly honors the patient's autonomy while acknowledging the duty of beneficence,
        demonstrating epistemic humility regarding the limitations of medical evidence.
      `,
      
      patientCenteredConsiderations: `
        The recommendation aligns with patient-specific factors:
        
        1. Values alignment:
           - Balances the patient's dual concerns about stroke prevention and bleeding avoidance
           - Respects preference for established treatments with greater certainty
           - Addresses cultural and language considerations
        
        2. Practical considerations:
           - Maintains medication regimen patient is familiar with
           - Acknowledges importance of family involvement in care
           - Provides culturally and linguistically appropriate support
        
        3. Quality of life impact:
           - Prioritizes maintaining independence
           - Avoids additional medication burden and monitoring requirements
           - Addresses concerns about risk of recurrent hospitalization
      `,
      
      uncertaintyAnalysis: `
        This recommendation explicitly acknowledges key uncertainties:
        
        1. Etiology uncertainty:
           - The exact cause of the patient's TIA remains presumptive
           - Multiple potential contributors exist (AF, carotid disease, small vessel disease)
           - Limited ability to determine if current anticoagulation "failed"
        
        2. Therapeutic uncertainty:
           - Incomplete evidence on optimal management after possible breakthrough events
           - Limited data specific to East Asian elderly patients with similar comorbidities
           - Uncertain individual response to medication adjustments
        
        3. Prognostic uncertainty:
           - Unpredictable timing and severity of future events
           - Individual balance between bleeding and clotting tendencies
           - Long-term outcomes with different management strategies
        
        The approach embraces epistemic humility by acknowledging these limitations while
        providing the best available recommendation based on current knowledge.
      `
    },
    
    alternativeOptions: [
      {
        approach: "Switch to Warfarin with Target INR 2.0-3.0",
        rationale: "Warfarin has extensive evidence in diverse populations and allows for monitoring of anticoagulation intensity",
        advantages: [
          "Ability to confirm therapeutic anticoagulation through INR testing",
          "Lower cost",
          "Reversibility in emergency situations"
        ],
        disadvantages: [
          "Requires frequent monitoring visits",
          "Multiple food and drug interactions",
          "Higher risk of intracranial hemorrhage in East Asian patients",
          "Logistical challenges with language barrier"
        ],
        ethicalConsiderations: "May burden patient with frequent visits and more complex regimen without clear benefit",
        overallAssessment: "Less favorable option due to practical barriers, safety concerns in this population, and misalignment with patient values"
      },
      {
        approach: "Increase to Standard-Dose Apixaban (5mg BID)",
        rationale: "Provides more intense anticoagulation which might offer better stroke protection",
        advantages: [
          "May provide stronger stroke prevention",
          "Maintains familiarity with current medication",
          "No additional monitoring requirements"
        ],
        disadvantages: [
          "Substantially increased bleeding risk",
          "Contradicts dosing guidelines for patient's age, weight, and renal function",
          "Limited evidence of benefit after breakthrough events",
          "Higher cost due to increased dose"
        ],
        ethicalConsiderations: "Potentially violates non-maleficence by increasing harm risk without clear benefit evidence",
        overallAssessment: "Not recommended due to unfavorable risk-benefit profile and deviation from evidence-based guidelines"
      },
      {
        approach: "Add Clopidogrel to Current Anticoagulation",
        rationale: "Dual pathway inhibition might provide additional protection against ischemic events",
        advantages: [
          "Targets additional thrombotic pathway",
          "Might help if atherosclerotic component to events"
        ],
        disadvantages: [
          "Substantially increased bleeding risk",
          "Contradicts evidence and guidelines for atrial fibrillation management",
          "Particularly concerning given patient's prior GI bleed",
          "Adds medication complexity"
        ],
        ethicalConsiderations: "Likely violates principle of non-maleficence given high certainty of increased harm with uncertain benefit",
        overallAssessment: "Strongly discouraged due to unfavorable risk-benefit profile and contradiction of current evidence"
      }
    ],
    
    communicationPlan: {
      keyPoints: [
        "Explain that TIA occurred despite being on blood thinner, but changing medications may not provide better protection",
        "Describe importance of addressing other stroke risk factors like blood pressure and diabetes control",
        "Acknowledge both the stroke risk and bleeding risk, explaining the need for balance",
        "Present recommendation with rationale in simple terms with cultural sensitivity",
        "Validate patient's concerns about both stroke and bleeding risks based on family and personal history",
        "Ensure understanding of medication purpose, proper use, and importance of consistent intake"
      ],
      approachWithFamily: "Include family in discussions as culturally appropriate, but direct primary communication to patient",
      languageConsiderations: "Use professional Mandarin interpreter, provide written materials in Mandarin",
      assessUnderstanding: "Use teach-back method to confirm comprehension of key points",
      followupPlan: "Schedule 2-week follow-up with same interpreter, provide clear instructions for concerning symptoms"
    },
    
    implementationPlan: {
      immediateActions: [
        "Maintain current apixaban 2.5mg BID",
        "Adjust antihypertensive medication to address BP of 142/84",
        "Ensure neurology follow-up within 2 weeks",
        "Provide Mandarin written instructions for medication use"
      ],
      monitoringPlan: [
        "BP check in 1 week at PCP office",
        "Neurology follow-up in 2-4 weeks with interpreter",
        "Consider 30-day cardiac monitor to assess AF burden",
        "Follow-up labs including renal function in 4-6 weeks"
      ],
      contingencyPlans: [
        {
          scenario: "Recurrent TIA symptoms",
          action: "Emergency department evaluation, consider inpatient monitoring"
        },
        {
          scenario: "Minor bleeding (bruising, mild epistaxis)",
          action: "Continue medication but report at follow-up visit"
        },
        {
          scenario: "Major bleeding",
          action: "Hold medication, seek immediate medical attention"
        },
        {
          scenario: "Difficulty obtaining medication",
          action: "Contact care coordinator or pharmacy for assistance"
        }
      ],
      educationNeeds: [
        "Signs and symptoms of TIA/stroke requiring urgent evaluation",
        "Signs of bleeding requiring medical attention",
        "Importance of medication adherence and proper administration",
        "Blood pressure monitoring and control measures",
        "Diabetes self-management reinforcement"
      ]
    },
    
    epistemiclimitations: {
      documentation: "It is important to explicitly document the following limitations in our knowledge and approach:",
      limitations: [
        "The evidence for management after possible breakthrough events on DOACs is limited, consisting primarily of expert opinion rather than high-quality studies",
        "Risk calculators have limited validation in East Asian populations with multiple comorbidities",
        "The exact mechanism of the patient's TIA cannot be definitively determined (cardioembolic vs. large vessel vs. small vessel)",
        "Individual response to anticoagulation shows biological variability not captured in population studies",
        "Long-term comparative effectiveness of different strategies is uncertain in this specific context"
      ],
      futureDirections: [
        "Research on optimal management after possible breakthrough events on appropriate anticoagulation is needed",
        "Better predictive models incorporating ethnicity, comorbidities, and concurrent medications would improve individualization",
        "Studies on optimal anticoagulation intensity in East Asian populations with atrial fibrillation are warranted",
        "Investigation of the role of advanced imaging in guiding anticoagulation decisions could be valuable"
      ]
    }
  };
  
  // Output comprehensive clinical recommendation
  console.log("\nComplex Clinical Decision Support with Epistemic Humility");
  console.log("\nClinical Assessment:");
  console.log(detailedRecommendation.clinicalAssessment);
  
  console.log("\nRecommendation:");
  console.log(detailedRecommendation.recommendation);
  
  console.log("\nRisk-Benefit Analysis:");
  console.log(detailedRecommendation.rationale.riskBenefitAnalysis);
  
  console.log("\nEthical Analysis:");
  console.log(detailedRecommendation.rationale.ethicalAnalysis);
  
  console.log("\nUncertainty Analysis:");
  console.log(detailedRecommendation.rationale.uncertaintyAnalysis);
  
  console.log("\nImplementation Plan:");
  console.log("Immediate Actions:");
  detailedRecommendation.implementationPlan.immediateActions.forEach(action => console.log(`- ${action}`));
  
  console.log("\nEpistemic Limitations:");
  detailedRecommendation.epistemiclimitations.limitations.forEach(limitation => console.log(`- ${limitation}`));
  
  return {
    patient,
    clinicalData,
    anticoagulationOptions,
    evidenceEvaluation,
    epistemicAssessment,
    carResult,
    detailedRecommendation
  };
}

/**
 * Example 3: Healthcare Policy Antinomy Resolution
 * 
 * This example demonstrates how the CAR framework resolves seemingly irreconcilable
 * tensions in healthcare policy using Kantian dialectical reasoning to achieve a
 * principled synthesis.
 */
function healthcarePolicyAntinomyResolution() {
  console.log("\n=== Example 3: Healthcare Policy Antinomy Resolution ===");
  
  // Define a fundamental healthcare policy antinomy
  const policyAntinomy = {
    title: "Universal Access vs. Healthcare Innovation",
    thesis: {
      statement: "Healthcare systems should prioritize universal access with strict cost controls, even if this means limiting innovation and novel treatments.",
      arguments: [
        "Equal access to healthcare is a fundamental right derived from human dignity",
        "Cost control mechanisms like price regulation and technology assessment are necessary for sustainability",
        "Two-tiered systems create inherent inequities that violate principles of equal moral worth",
        "Innovation that benefits only the privileged few fails the universalization test"
      ],
      values: ["Equality", "Universality", "Sustainability", "Community"],
      stakeholderSupport: ["Patient Advocates", "Public Health Experts", "Government Payers"]
    },
    antithesis: {
      statement: "Healthcare systems should prioritize innovation and development of novel treatments, even if this creates disparities in access.",
      arguments: [
        "Medical innovation depends on potential financial returns and regulatory flexibility",
        "Today's expensive innovations become tomorrow's standard affordable treatments",
        "Restrictive policies stifle development that ultimately benefits all patients",
        "Individual freedom to pursue and access cutting-edge treatment respects autonomy"
      ],
      values: ["Progress", "Excellence", "Freedom", "Individual Rights"],
      stakeholderSupport: ["Researchers", "Biotechnology Industry", "Some Patient Groups", "Healthcare Entrepreneurs"]
    },
    apparentContradiction: "These positions appear contradictory because they represent competing visions of what constitutes a just healthcare system. One prioritizes equal access to a defined set of services for all, while the other prioritizes the continuous advancement of medical capabilities even if initially available to fewer people.",
    realWorldTensions: [
      "Nations with stronger universal access guarantees often struggle with slower adoption of innovations",
      "Countries with more innovation-friendly policies often have more significant healthcare disparities",
      "Healthcare budgets cannot simultaneously maximize both universal access and unlimited innovation",
      "Policy decisions inevitably involve trade-offs between these competing values"
    ]
  };
  
  // Define dialectical analysis stages
  const dialecticalAnalysis = {
    examinationOfThesis: {
      strengths: [
        "Aligns with the categorical imperative's universalization requirement",
        "Treats all persons as having equal moral worth regardless of circumstances",
        "Creates sustainable systems that can provide reliable care over time",
        "Avoids treating some patients as merely means to others' ends"
      ],
      weaknesses: [
        "May create complacency and stagnation in medical advancement",
        "Can lead to rationing and denial of potentially beneficial care",
        "May not adequately account for legitimate differences in needs and preferences",
        "Could violate autonomy by restricting options available to patients and providers"
      ],
      implicitAssumptions: [
        "That a well-defined 'basic package' of healthcare can meet most needs",
        "That innovation will continue despite reduced financial incentives",
        "That central planning can effectively allocate resources better than markets",
        "That equity in access is more important than maximizing outcomes for some"
      ]
    },
    examinationOfAntithesis: {
      strengths: [
        "Drives continuous improvement in medical capabilities",
        "Respects individual autonomy in healthcare decisions",
        "Creates economic ecosystem that attracts investment and talent",
        "Eventually produces improvements that become widely available"
      ],
      weaknesses: [
        "Creates morally problematic disparities in essential services",
        "Fails the universalization test if benefits remain exclusive",
        "May divert resources to marginal improvements for the few over basic care for many",
        "Risks treating disadvantaged populations as less worthy of care"
      ],
      implicitAssumptions: [
        "That innovations will eventually become affordable and accessible to all",
        "That market incentives are necessary and sufficient for medical progress",
        "That individual rights should prevail over collective welfare in healthcare",
        "That unequal access to innovation is an acceptable trade-off for progress"
      ]
    },
    dialecticalSynthesis: {
      synthesisStatement: "Healthcare systems should establish universal access to a comprehensive core of essential services while creating parallel innovation pathways with ethical guardrails for the development and gradual integration of novel treatments.",
      resolutionPrinciples: [
        {
          principle: "Tiered Universality",
          description: "Guarantee universal access to a comprehensive and evolving core of evidence-based care while allowing supplemental innovation pathways",
          implementation: "Dynamic essential benefits package with systematic processes for incorporating proven innovations"
        },
        {
          principle: "Conditional Innovation Support",
          description: "Support innovation through public and private mechanisms, conditional on commitments to accessibility and value",
          implementation: "Public funding, tax incentives, and expedited approval pathways linked to accessibility guarantees and value-based assessments"
        },
        {
          principle: "Ethical Transition Pathways",
          description: "Create explicit, time-limited pathways for innovations to move from limited to universal availability based on evidence and affordability",
          implementation: "Structured assessment processes with transparent criteria for incorporation into universal benefits"
        },
        {
          principle: "Participatory Governance",
          description: "Ensure diverse stakeholder involvement in defining essential services and innovation priorities",
          implementation: "Deliberative bodies representing patients, clinicians, public health, and industry with transparent processes"
        },
        {
          principle: "Global Equity Mechanisms",
          description: "Establish mechanisms to promote global access to innovations, recognizing moral responsibilities beyond borders",
          implementation: "Tiered pricing, voluntary licensing, patent pools, and international research collaboration"
        }
      ],
      kantianJustification: `
        This synthesis resolves the antinomy in accordance with Kantian principles by:
        
        1. Universalization: The core guarantee of essential care for all satisfies the requirement 
           that our maxim could be a universal law. Everyone receives care meeting fundamental needs.
        
        2. Humanity as End: Both universal access and support for beneficial innovation respect 
           humanity as an end in itself. Neither sacrifices one group merely as means to others' ends.
        
        3. Kingdom of Ends: The governance structures and ethical pathways create a system that 
           rational beings could endorse as members of a moral community where each is both lawgiver 
           and subject to the laws.
        
        4. Dialectical Resolution: Rather than seeing universal access and innovation as contradictory, 
           this approach recognizes their complementary nature when properly structured. The critique 
           identifies the conditions under which both can be pursued without contradiction.
        
        5. Practical Implementation: By creating dynamic rather than static definitions of essential 
           care and establishing ethical pathways for transition, the system evolves toward more 
           universal access to innovations over time.
      `
    }
  };
  
  // Define practical policy framework
  const policyFramework = {
    universalCoreServices: {
      definition: "Comprehensive package of evidence-based, cost-effective services addressing essential health needs",
      governanceProcess: "Independent commission with diverse stakeholder representation, transparent criteria, and regular review",
      incorporationCriteria: [
        "Demonstrated clinical effectiveness",
        "Cost-effectiveness relative to existing alternatives",
        "Addresses significant health need",
        "Feasible to provide at population scale"
      ],
      fundingMechanism: "Progressive taxation with dedicated funding stream protected from political cycles",
      expectedOutcomes: [
        "Universal access to essential services regardless of ability to pay",
        "Reduced health disparities in core outcomes",
        "Sustainable financing over time",
        "Gradual expansion of available services as innovations mature"
      ]
    },
    innovationPathways: {
      parallelSystems: {
        publicResearch: {
          description: "Expanded public funding for basic and translational research with public interest mandates",
          governanceProcess: "Expert scientific panels with public representatives setting priorities",
          accessRequirements: "Open science principles, data sharing, and affordable licensing provisions"
        },
        commercialDevelopment: {
          description: "Market-based innovation with ethical guardrails and incentives for accessibility",
          incentives: ["Research tax credits", "Streamlined regulatory pathways", "Advanced market commitments"],
          accessRequirements: "Graduated accessibility commitments as condition of public benefits"
        },
        socialInnovation: {
          description: "Community-driven, non-profit, and public-private partnership models",
          supportMechanisms: "Social innovation funds, incubators, and implementation science funding",
          focus: "Delivery system innovations, prevention, and underserved populations"
        }
      },
      transitionMechanisms: {
        evaluationProcess: "Independent assessment of clinical value, budget impact, and implementation requirements",
        pricingFrameworks: "Value-based pricing negotiations with reference to international standards",
        adoptionPathways: [
          "Conditional coverage with evidence development",
          "Outcomes-based payment models",
          "Reference pricing within therapeutic categories",
          "Gradual expansion of eligible populations as costs decrease"
        ]
      }
    },
    governanceStructures: {
      principles: [
        "Transparency in decision processes and criteria",
        "Diverse stakeholder representation including patient perspectives",
        "Evidence-based methodology with explicit consideration of values",
        "Regular reassessment and adaptation",
        "Independence from undue political or commercial influence"
      ],
      keyBodies: [
        {
          name: "Essential Benefits Commission",
          composition: "Clinical experts, patient representatives, public health specialists, ethicists, health economists",
          responsibilities: "Define, regularly update, and monitor implementation of essential benefits package"
        },
        {
          name: "Innovation Priorities Council",
          composition: "Scientists, patient advocates, industry representatives, policymakers, global health experts",
          responsibilities: "Set strategic priorities for public research funding, identify critical unmet needs"
        },
        {
          name: "Technology Assessment Office",
          composition: "Methodologists, clinical experts, economists, ethicists",
          responsibilities: "Evaluate new technologies for clinical effectiveness, cost-effectiveness, and population impact"
        },
        {
          name: "Ethical Oversight Committee",
          composition: "Ethicists, patient advocates, clinicians, public representatives",
          responsibilities: "Ensure policies adhere to ethical principles, address emerging ethical challenges"
        }
      ]
    },
    globalConsiderations: {
      crossBorderResponsibilities: "Recognize moral obligations beyond national boundaries in healthcare innovation and access",
      developingNationProvisions: [
        "Differential pricing frameworks scaled to economic capacity",
        "Technology transfer programs to build local manufacturing capacity",
        "Research priorities addressing global health challenges",
        "Capacity building for regulatory and health technology assessment"
      ],
      internationalCoordination: "Collaborative governance structures for shared research priorities, joint technology assessment, and coordinated purchasing"
    },
    implementationChallenges: [
      {
        challenge: "Defining the boundaries of 'essential' services",
        approach: "Transparent, participatory process with explicit frameworks and regular reassessment"
      },
      {
        challenge: "Ensuring innovation incentives lead to meaningful advances",
        approach: "Reward outcomes and value rather than novelty alone, targeted incentives for priority areas"
      },
      {
        challenge: "Managing transition of innovations to universal availability",
        approach: "Predictable assessment timelines, clear criteria, and staged expansion of access"
      },
      {
        challenge: "Preventing gaming of the system by commercial interests",
        approach: "Robust conflict of interest policies, transparency requirements, and anti-monopoly provisions"
      },
      {
        challenge: "Addressing local variation in needs and resources",
        approach: "Core national standards with flexibility for regional implementation and supplementation"
      }
    ]
  };
  
  // Output the antinomy resolution
  console.log("\nHealthcare Policy Antinomy: Universal Access vs. Innovation");
  
  console.log("\nThesis:");
  console.log(policyAntinomy.thesis.statement);
  
  console.log("\nAntithesis:");
  console.log(policyAntinomy.antithesis.statement);
  
  console.log("\nDialectical Synthesis:");
  console.log(dialecticalAnalysis.dialecticalSynthesis.synthesisStatement);
  
  console.log("\nKantian Justification:");
  console.log(dialecticalAnalysis.dialecticalSynthesis.kantianJustification);
  
  console.log("\nResolution Principles:");
  dialecticalAnalysis.dialecticalSynthesis.resolutionPrinciples.forEach(principle => {
    console.log(`\n- ${principle.principle}:`);
    console.log(`  ${principle.description}`);
    console.log(`  Implementation: ${principle.implementation}`);
  });
  
  console.log("\nInnovation Pathways:");
  console.log(policyFramework.innovationPathways.parallelSystems.publicResearch.description);
  console.log(policyFramework.innovationPathways.parallelSystems.commercialDevelopment.description);
  console.log(policyFramework.innovationPathways.parallelSystems.socialInnovation.description);
  
  console.log("\nGovernance Principles:");
  policyFramework.governanceStructures.principles.forEach(principle => {
    console.log(`- ${principle}`);
  });
  
  return {
    policyAntinomy,
    dialecticalAnalysis,
    policyFramework
  };
}

/**
 * Example 4: Integration of Virtue Ethics in AI-Assisted Healthcare
 * 
 * This example examines how the CAR framework can incorporate virtue ethics 
 * alongside Kantian principles to create a more comprehensive approach to 
 * AI systems in healthcare.
 */
function virtueEthicsInAIHealthcare() {
  console.log("\n=== Example 4: Virtue Ethics in AI-Assisted Healthcare ===");
  
  // Define the integration of Kantian and virtue ethics
  const ethicalFramework: EthicalFramework = {
    integrationPrinciples: [
      {
        name: "Complementary Moral Foundations",
        description: "Kantian ethics provides a rigorous framework for evaluating actions and policies based on universal principles, while virtue ethics focuses on the character and excellence required to reliably act ethically in complex situations.",
        application: "AI systems benefit from both rule-based constraints (Kantian) and character-like dispositions promoting flourishing (virtue ethics)."
      },
      {
        name: "Practical Wisdom Enhancement",
        description: "Virtue ethics emphasizes phronesis (practical wisdom) as necessary for applying principles in context-sensitive ways, complementing the universal principles of Kantian ethics.",
        application: "AI systems require both principled constraints and context-sensitive judgment capabilities."
      },
      {
        name: "Developmental Perspective",
        description: "Virtue ethics brings a developmental view of moral capability that complements Kantian emphasis on moral duties, focusing on how excellence is cultivated over time.",
        application: "AI systems can be designed to improve their ethical reasoning capabilities through learning and experience."
      },
      {
        name: "Community and Relationship Focus",
        description: "Virtue ethics emphasizes the role of community and relationships in ethical practice, complementing the more individually-focused Kantian approach.",
        application: "AI systems operate within healthcare teams and communities, requiring relational and collaborative virtues."
      }
    ],
    
    healthcareVirtues: [
      {
        virtue: "Compassion",
        description: "The disposition to recognize suffering and respond with care and commitment to alleviate it",
        kantianCorrespondence: "Relates to treating humanity as an end in itself",
        aiImplementation: "Systems designed to recognize patient distress, adapt communication style, and prioritize comfort alongside clinical outcomes"
      },
      {
        virtue: "Honesty",
        description: "The disposition to communicate truthfully and transparently",
        kantianCorrespondence: "Aligns with universalization (lying cannot be universalized)",
        aiImplementation: "Transparent conveyance of uncertainty, limitations, and evidence quality in recommendations"
      },
      {
        virtue: "Justice",
        description: "The disposition to allocate resources and attention fairly without bias",
        kantianCorrespondence: "Relates to the kingdom of ends principle",
        aiImplementation: "Algorithmic fairness mechanisms and bias detection across diverse patient populations"
      },
      {
        virtue: "Prudence",
        description: "The disposition to deliberate carefully and act wisely in complex situations",
        kantianCorrespondence: "Consistent with proper application of categorical imperative",
        aiImplementation: "Multi-perspective analysis of complex cases with appropriate caution in high-stakes decisions"
      },
      {
        virtue: "Courage",
        description: "The disposition to take necessary risks and advocate for patient needs",
        kantianCorrespondence: "Connects to moral fortitude in fulfilling perfect duties",
        aiImplementation: "Willingness to flag concerns, question prevalent practices when evidence suggests alternatives"
      },
      {
        virtue: "Humility",
        description: "The disposition to recognize limits of knowledge and be open to correction",
        kantianCorrespondence: "Aligns with epistemic limitations in Kant's critique",
        aiImplementation: "Explicit representation of uncertainty, knowledge boundaries, and openness to correction"
      },
      {
        virtue: "Integrity",
        description: "The disposition to maintain ethical principles even under pressure",
        kantianCorrespondence: "Consistency with categorical imperative across contexts",
        aiImplementation: "Consistent application of ethical principles across different scenarios and pressures"
      },
      {
        virtue: "Beneficence",
        description: "The disposition to actively promote the welfare of patients",
        kantianCorrespondence: "Related to imperfect duty to promote welfare of others",
        aiImplementation: "Proactive identification of opportunities to improve patient outcomes and experience"
      }
    ],
    
    clinicalApplications: [
      {
        area: "Clinical Decision Support",
        virtueImplications: [
          {
            virtue: "Prudence",
            implementation: "Balance evidence-based recommendations with attention to unique patient factors",
            example: "AI system that presents treatment options with nuanced discussion of trade-offs for the specific patient context"
          },
          {
            virtue: "Humility",
            implementation: "Explicitly communicate limitations and uncertainty in recommendations",
            example: "Clear presentation of confidence levels and areas where evidence is weak or contradictory"
          }
        ],
        kantianImplications: [
          {
            principle: "Universalizability",
            implementation: "Ensure recommendations would be appropriate if applied to all similar patients",
            example: "Regularly test system across diverse patient populations to ensure consistent quality"
          },
          {
            principle: "Humanity as End",
            implementation: "Present options in ways that respect patient autonomy and values",
            example: "Include value-clarification tools to align recommendations with patient preferences"
          }
        ]
      },
      {
        area: "Automated Documentation",
        virtueImplications: [
          {
            virtue: "Honesty",
            implementation: "Ensure accurate representation of clinical encounters without embellishment",
            example: "Systems that distinguish observed data from inferences and maintain provenance"
          },
          {
            virtue: "Integrity",
            implementation: "Resist pressure to optimize documentation for billing over clinical accuracy",
            example: "Separate clinical documentation functions from billing suggestion functions"
          }
        ],
        kantianImplications: [
          {
            principle: "Universalizability",
            implementation: "Documentation practices that would maintain integrity if used by all providers",
            example: "Standardized accuracy metrics applied consistently across all documentation"
          },
          {
            principle: "Kingdom of Ends",
            implementation: "Documentation that serves all stakeholders' legitimate purposes",
            example: "Balanced attention to clinical care, care coordination, and appropriate reimbursement"
          }
        ]
      },
      {
        area: "Risk Prediction and Prevention",
        virtueImplications: [
          {
            virtue: "Justice",
            implementation: "Ensure risk algorithms work fairly across diverse populations",
            example: "Regular evaluation of algorithm performance across demographic groups with adjustment as needed"
          },
          {
            virtue: "Courage",
            implementation: "Flag high-risk situations even when doing so may be disruptive",
            example: "System that appropriately escalates concerns even when clinicians are busy or resources constrained"
          }
        ],
        kantianImplications: [
          {
            principle: "Universalizability",
            implementation: "Risk thresholds that could be applied fairly to any patient",
            example: "Consistent intervention thresholds calibrated to meaningful clinical outcomes rather than relative risk"
          },
          {
            principle: "Humanity as End",
            implementation: "Prevent use of risk scores to deny care or stigmatize patients",
            example: "Design that presents risk as opportunity for intervention rather than patient classification"
          }
        ]
      },
      {
        area: "Patient Communication",
        virtueImplications: [
          {
            virtue: "Compassion",
            implementation: "Communicate sensitive information with appropriate empathy",
            example: "AI communication tools that adapt tone and content to emotional context and health literacy"
          },
          {
            virtue: "Beneficence",
            implementation: "Proactively identify and address patient education needs",
            example: "Systems that detect knowledge gaps and provide personalized educational resources"
          }
        ],
        kantianImplications: [
          {
            principle: "Universalizability",
            implementation: "Communication approaches that respect all patients equally",
            example: "Standardized readability and cultural appropriateness testing across diverse populations"
          },
          {
            principle: "Kingdom of Ends",
            implementation: "Communication that treats patients as rational participants in their care",
            example: "Shared decision-making tools that present information without manipulation"
          }
        ]
      }
    ],
    
    developmentPrinciples: [
      {
        principle: "Virtue Cultivation Process",
        description: "AI systems can be designed to develop virtue-like dispositions through iterative refinement",
        implementation: [
          "Identify core virtues relevant to the specific healthcare context",
          "Define operational behaviors that demonstrate each virtue",
          "Develop metrics to evaluate virtue-aligned behavior",
          "Create feedback mechanisms to reinforce virtue-aligned actions",
          "Implement deliberative processes that mimic practical wisdom"
        ]
      },
      {
        principle: "Team-Based Virtue Integration",
        description: "AI systems should complement and enhance the virtues of the healthcare team rather than displacing them",
        implementation: [
          "Analyze existing team virtues and ethical practices",
          "Identify gaps or challenges where AI could support virtue development",
          "Design AI roles that enhance rather than replace human virtue practice",
          "Create interfaces that make AI ethical reasoning transparent to team members",
          "Develop feedback loops between AI systems and human team members"
        ]
      },
      {
        principle: "Contextual Adaptability",
        description: "Virtue-informed AI should adapt ethical approaches based on clinical context while maintaining core principles",
        implementation: [
          "Develop context recognition capabilities for key clinical scenarios",
          "Create adaptable ethical reasoning frameworks for different contexts",
          "Maintain consistent ethical principles across contextual adaptations",
          "Implement explicit reasoning about contextual factors in ethical decisions",
          "Log and review adaptation decisions for continuous improvement"
        ]
      },
      {
        principle: "Moral Apprenticeship",
        description: "AI systems can learn ethical behavior through observation of exemplary practitioners",
        implementation: [
          "Identify exemplary clinicians demonstrating healthcare virtues",
          "Document and analyze decision patterns of these exemplars",
          "Develop learning frameworks that capture virtue-aligned practices",
          "Create methods to generalize from exemplars without overfitting",
          "Implement ongoing learning from new exemplary practices"
        ]
      }
    ],
    
    evaluationFramework: {
      virtueFocusedMetrics: [
        {
          virtue: "Compassion",
          metrics: [
            "Detection rate of patient distress in communications",
            "Appropriateness of response to emotional cues",
            "Patient perception of empathy in AI-mediated interactions"
          ]
        },
        {
          virtue: "Prudence",
          metrics: [
            "Appropriate caution in high-stakes recommendations",
            "Consideration of multiple relevant factors in complex cases",
            "Balance between action and restraint in uncertain situations"
          ]
        },
        {
          virtue: "Justice",
          metrics: [
            "Consistency of recommendations across demographic groups",
            "Equitable attention allocation to different patient needs",
            "Fairness in resource allocation suggestions"
          ]
        },
        {
          virtue: "Humility",
          metrics: [
            "Accuracy of uncertainty quantification",
            "Appropriate expert consultation suggestions",
            "Willingness to revise assessments with new information"
          ]
        }
      ],
      
      integratedEvaluationApproaches: [
        {
          approach: "Ethics Rounds Review",
          description: "Regular review of AI system decisions by multidisciplinary ethics committee",
          implementation: "Quarterly review of challenging cases, edge scenarios, and emerging patterns"
        },
        {
          approach: "Virtue-Centered User Feedback",
          description: "Structured clinician and patient feedback focused on virtue expression",
          implementation: "Targeted surveys assessing perception of system virtues in real interactions"
        },
        {
          approach: "Ethical Decision Tracing",
          description: "Analysis of ethical reasoning patterns in complex decisions",
          implementation: "Documentation and review of reasoning chains in ethically significant cases"
        },
        {
          approach: "Comparative Virtue Analysis",
          description: "Comparison of AI approaches to those of exemplary human practitioners",
          implementation: "Blinded review of AI vs. expert recommendations in complex scenarios"
        },
        {
          approach: "Community Impact Assessment",
          description: "Evaluation of system impact on healthcare team moral development",
          implementation: "Longitudinal study of moral reasoning and practice in teams using the system"
        }
      ]
    },
    
    caseSample: {
      scenario: "An elderly patient with multiple chronic conditions is identified by the AI system as having high risk for medication non-adherence and potential adverse events. The system must determine how to present this information to the healthcare team and what interventions to suggest.",
      
      virtueAnalysis: [
        {
          virtue: "Compassion",
          application: "The system recognizes this as a situation requiring emotional sensitivity, not just clinical efficiency. It frames non-adherence as a challenge to address collaboratively rather than patient failure."
        },
        {
          virtue: "Justice",
          application: "The system ensures its assessment isn't biased by socioeconomic factors and considers resource constraints that might affect the patient's ability to adhere to treatment."
        },
        {
          virtue: "Prudence",
          application: "The system considers multiple factors including cognitive status, social support, medication complexity, and past adherence patterns before making recommendations."
        },
        {
          virtue: "Beneficence",
          application: "The system proactively suggests specific interventions matched to the patient's particular barriers rather than generic adherence advice."
        }
      ],
      
      kantianAnalysis: [
        {
          principle: "Universalizability",
          application: "The approach could be applied to all similar patients without contradiction, with standardized risk assessment but personalized intervention recommendations."
        },
        {
          principle: "Humanity as End",
