# Environment Validator Agent Skill Specification

## Purpose
The Environment Validator agent skill validates environment configurations against application specifications and security requirements. It ensures that deployment environments meet all necessary requirements before application deployment, preventing configuration-related failures and security vulnerabilities.

## Scope
This skill validates:
- Environment variable configurations
- Security settings and compliance
- Resource availability and constraints
- Network connectivity and access
- Secret management and access controls

## Inputs

### Required Inputs
```
environment_config: Object
  - environment_type: "development" | "staging" | "production"
  - environment_variables: Object
    - key: value pairs of all environment variables
  - platform: string (e.g., "aws", "azure", "gcp", "vercel", "railway")
  - region: string (deployment region)
  - resource_limits: Object
    - memory: string (e.g., "1GB", "2GB")
    - cpu: string (e.g., "1", "2")
    - storage: string (e.g., "10GB", "50GB")

application_requirements: Object
  - name: string (application identifier)
  - version: string (version requirement)
  - required_env_vars: Array<Object>
    - name: string (variable name)
    - type: "string" | "number" | "boolean" | "url" | "secret"
    - required: boolean
    - description: string
    - validation_pattern: string (regex pattern if applicable)
  - security_requirements: Object
    - encryption_required: boolean
    - compliance_standards: Array<string> (e.g., ["GDPR", "HIPAA"])
    - security_scan_required: boolean
    - access_logging_required: boolean
  - resource_requirements: Object
    - min_memory: string
    - min_cpu: string
    - min_storage: string
    - network_bandwidth: string
```

### Optional Inputs
```
validation_profile: Object
  - strict_mode: boolean (default: false)
  - skip_optional_checks: boolean (default: false)
  - custom_rules: Array<Object>
    - rule_name: string
    - condition: string (logic condition)
    - severity: "error" | "warning" | "info"
    - message: string

infrastructure_config: Object
  - vpc_config: Object (if applicable)
    - vpc_id: string
    - subnets: Array<string>
    - security_groups: Array<string>
  - network_config: Object
    - allowed_ips: Array<string>
    - port_configurations: Array<Object>
      - port: number
      - protocol: string
      - allowed_sources: Array<string>
  - monitoring_config: Object
    - logging_enabled: boolean
    - metrics_collection: boolean
    - alerting_configured: boolean
```

## Outputs

### Primary Output
```
validation_report: Object
  - status: "pass" | "warning" | "fail"
  - summary: Object
    - total_checks: number
    - passed_checks: number
    - warning_checks: number
    - failed_checks: number
    - compliance_status: "compliant" | "partially_compliant" | "non_compliant"
  - detailed_results: Array<Object>
    - check_id: string
    - check_name: string
    - status: "pass" | "warning" | "fail"
    - severity: "error" | "warning" | "info"
    - message: string
    - suggested_fix: string (if applicable)
    - documentation_link: string (if applicable)
  - environment_readiness: "ready" | "needs_attention" | "not_ready"
```

### Secondary Outputs
```
recommendations: Array<Object>
  - category: "security" | "performance" | "reliability" | "cost"
  - recommendation: string
  - priority: "high" | "medium" | "low"
  - implementation_effort: "low" | "medium" | "high"
  - impact: "high" | "medium" | "low"

compliance_report: Object
  - standards_checked: Array<string>
  - compliant_standards: Array<string>
  - non_compliant_standards: Array<string>
  - compliance_percentage: number
  - compliance_issues: Array<Object>
    - standard: string
    - issue: string
    - severity: string
    - resolution_steps: Array<string>

resource_analysis: Object
  - resource_utilization_prediction: Object
    - memory_usage: string
    - cpu_usage: string
    - storage_usage: string
    - network_usage: string
  - resource_optimization_recommendations: Array<Object>
    - resource_type: string
    - current_value: string
    - recommended_value: string
    - justification: string
```

## Reusability Scope

### Target Environments
- Cloud platforms (AWS, Azure, GCP)
- Platform-as-a-Service (Vercel, Railway, Heroku)
- Container orchestration (Kubernetes, ECS)
- Serverless platforms (Lambda, Functions)
- Hybrid environments

### Application Types
- Web applications (frontend/backend)
- API services
- Database services
- Authentication services
- Third-party integrations

### Integration Capabilities
- CI/CD pipeline integration
- Infrastructure as code validation
- Pre-deployment validation gates
- Configuration management systems
- Security scanning tools

## Algorithm

### Step 1: Environment Variable Validation
1. Parse all environment variables
2. Validate required variables are present
3. Check variable types and formats
4. Validate security-sensitive variables
5. Verify no secrets in plain text

### Step 2: Security Configuration Validation
1. Check encryption settings
2. Validate compliance requirements
3. Verify access controls
4. Check security scanning configurations
5. Validate logging and monitoring settings

### Step 3: Resource Validation
1. Compare available resources to requirements
2. Check resource limits and quotas
3. Validate network configurations
4. Verify storage and bandwidth availability
5. Check performance constraints

### Step 4: Compliance Checking
1. Verify compliance standard requirements
2. Check regulatory requirements
3. Validate security controls
4. Review audit and logging requirements
5. Check data protection requirements

### Step 5: Risk Assessment
1. Identify potential configuration risks
2. Assess security vulnerabilities
3. Evaluate performance bottlenecks
4. Check cost optimization opportunities
5. Review backup and recovery configurations

## Validation Criteria

### Environment Variable Validation
- All required variables present and correctly formatted
- No sensitive information in plain text variables
- Variable values match expected types and patterns
- Environment-specific variables are appropriate

### Security Validation
- Encryption settings meet security requirements
- Access controls are properly configured
- Security scanning is enabled where required
- Compliance standards are satisfied

### Resource Validation
- Available resources meet minimum requirements
- Resource limits are sufficient for expected load
- Network configurations allow required connectivity
- Performance constraints are acceptable

## Error Handling
- Invalid environment configurations return detailed error messages
- Missing required variables are clearly identified
- Security violations are flagged with remediation steps
- Resource constraints are reported with recommendations

## Success Metrics
- Validation accuracy rate (correct identification of issues)
- False positive rate (incorrectly flagged issues)
- Time to complete validation
- User satisfaction with validation results
- Security vulnerability detection rate
- Compliance verification accuracy