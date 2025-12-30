# Deployment Planner Agent Skill Specification

## Purpose
The Deployment Planner agent skill is designed to analyze application specifications and generate deployment blueprints for cloud-native applications. It creates platform-agnostic deployment strategies based on application requirements, technology stack, and environment constraints.

## Scope
This skill plans and validates deployment architectures for full-stack applications, focusing on:
- Infrastructure requirements analysis
- Platform selection recommendations
- Resource allocation planning
- Security configuration planning
- Scalability considerations

## Inputs

### Required Inputs
```
application_spec: Object
  - name: string (application name)
  - version: string (version identifier)
  - description: string (brief description)
  - technology_stack: Object
    - frontend: string (e.g., "Next.js", "React", "Vue")
    - backend: string (e.g., "FastAPI", "Express", "Spring Boot")
    - database: string (e.g., "PostgreSQL", "MongoDB", "MySQL")
    - authentication: string (e.g., "Better Auth", "Auth0", "Custom")
    - additional_services: Array<string> (e.g., ["Redis", "Elasticsearch"])

environment_requirements: Object
  - environment_type: "development" | "staging" | "production"
  - scalability_requirements: Object
    - expected_users: number
    - traffic_patterns: "low" | "moderate" | "high" | "variable"
    - availability_requirements: "basic" | "high" | "mission_critical"
  - security_requirements: "basic" | "standard" | "high" | "compliance"
  - budget_constraints: "minimal" | "standard" | "generous" | "unlimited"
```

### Optional Inputs
```
infrastructure_constraints: Object
  - preferred_cloud: "aws" | "azure" | "gcp" | "multi_cloud" | "agnostic"
  - compliance_requirements: Array<string> (e.g., ["GDPR", "HIPAA", "SOX"])
  - existing_services: Array<Object> (services that must be integrated)
    - name: string
    - type: string
    - integration_requirements: string
  - deployment_frequency: "daily" | "weekly" | "monthly" | "quarterly"

custom_requirements: Object
  - special_performance_needs: string
  - specific_integration_needs: string
  - custom_security_requirements: string
  - regional_restrictions: Array<string>
```

## Outputs

### Primary Output
```
deployment_blueprint: Object
  - architecture_diagram: string (text-based diagram)
  - component_specifications: Array<Object>
    - name: string
    - type: string
    - platform_recommendations: Array<Object>
      - platform: string
      - pros: Array<string>
      - cons: Array<string>
      - cost_estimate: string
    - resource_requirements: Object
      - cpu: string
      - memory: string
      - storage: string
      - network: string
    - configuration_template: Object
      - environment_variables: Object
      - scaling_config: Object
      - security_config: Object
  - deployment_strategy: Object
    - approach: "blue_green" | "rolling" | "canary" | "other"
    - rollback_procedure: string
    - monitoring_requirements: Array<string>
  - cost_analysis: Object
    - estimated_monthly_cost: string
    - cost_optimization_tips: Array<string>
    - scaling_cost_implications: string
```

### Secondary Outputs
```
platform_recommendations: Array<Object>
  - platform: string
  - suitability_score: number (0-100)
  - reasons: Array<string>
  - setup_complexity: "low" | "medium" | "high"
  - maintenance_overhead: "low" | "medium" | "high"

security_recommendations: Array<Object>
  - category: string (e.g., "network", "database", "application")
  - recommendation: string
  - priority: "high" | "medium" | "low"
  - implementation_notes: string

migration_path: Object
  - from_current: string (current state if applicable)
  - to_target: string (target architecture)
  - steps: Array<Object>
    - step_number: number
    - description: string
    - estimated_time: string
    - risks: Array<string>
    - dependencies: Array<string>
```

## Reusability Scope

### Target Applications
- Full-stack web applications
- Microservices architectures
- API-first applications
- Applications with database requirements
- Applications requiring authentication

### Target Platforms
- AWS, Azure, GCP
- Platform-as-a-Service providers
- Container orchestration platforms
- Serverless platforms
- Hybrid cloud environments

### Integration Capabilities
- CI/CD pipeline integration
- Infrastructure as code generation
- Configuration management systems
- Monitoring and alerting systems
- Security scanning tools

## Algorithm

### Step 1: Technology Stack Analysis
1. Parse the technology stack requirements
2. Identify hosting requirements for each component
3. Determine resource requirements based on technology choices
4. Identify integration points between components

### Step 2: Environment Requirements Assessment
1. Analyze scalability requirements
2. Determine security requirements
3. Assess budget constraints
4. Identify availability requirements

### Step 3: Platform Matching
1. Match technology requirements to platform capabilities
2. Evaluate platform suitability based on requirements
3. Generate platform recommendations with scores
4. Consider multi-cloud or hybrid options if needed

### Step 4: Resource Planning
1. Calculate resource requirements based on expected load
2. Plan for scalability based on traffic patterns
3. Determine redundancy requirements for availability
4. Plan security configurations

### Step 5: Deployment Strategy
1. Select appropriate deployment approach
2. Plan rollback procedures
3. Define monitoring requirements
4. Generate cost estimates

## Validation Criteria

### Architecture Validation
- All technology stack components have deployment options
- Resource requirements are realistic for chosen platforms
- Security requirements are met
- Scalability requirements are addressed

### Cost Validation
- Estimated costs align with budget constraints
- Cost optimization recommendations provided
- Scaling cost implications considered

### Security Validation
- Security requirements are addressed
- Compliance requirements are considered
- Best practices are followed

## Error Handling
- Invalid technology stack specifications return descriptive errors
- Unsupported platform requirements suggest alternatives
- Conflicting requirements provide resolution recommendations
- Missing required inputs return specific error messages

## Success Metrics
- Platform recommendation accuracy (based on requirements)
- Cost estimate accuracy (compared to actual deployment)
- Security requirement satisfaction rate
- User satisfaction with recommendations