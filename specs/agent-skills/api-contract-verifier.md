# API Contract Verifier Agent Skill Specification

## Purpose
The API Contract Verifier agent skill validates API implementations against defined contracts and specifications. It ensures that API endpoints match the documented contracts, maintain backward compatibility, and adhere to security and performance standards.

## Scope
This skill verifies:
- API endpoint compliance with OpenAPI/Swagger specifications
- Request/response schema validation
- Authentication and authorization requirements
- Performance and rate limiting compliance
- Security standard adherence

## Inputs

### Required Inputs
```
api_specification: Object
  - spec_format: "openapi_3.0" | "openapi_3.1" | "swagger_2.0" | "custom"
  - spec_content: Object | string (the API specification document)
  - base_url: string (base URL for API endpoints)
  - version: string (API version being verified)

verification_requirements: Object
  - endpoints_to_verify: Array<string> (list of endpoint paths to check)
  - authentication_required: boolean (whether auth is required for verification)
  - security_requirements: Object
    - https_required: boolean
    - cors_policy: Object
      - allowed_origins: Array<string>
      - allowed_methods: Array<string>
      - allowed_headers: Array<string>
    - rate_limiting_required: boolean
    - rate_limit_config: Object
      - requests_per_minute: number
      - burst_limit: number
  - performance_requirements: Object
    - max_response_time_ms: number
    - min_throughput_requests_per_second: number
    - max_payload_size_bytes: number
```

### Optional Inputs
```
authentication_config: Object
  - auth_type: "bearer" | "api_key" | "oauth" | "basic" | "none"
  - auth_token: string (if required for testing)
  - auth_headers: Object (custom auth headers if needed)
  - auth_scopes: Array<string> (required scopes for OAuth)

test_data: Object
  - sample_requests: Array<Object>
    - endpoint: string
    - method: string (HTTP method)
    - headers: Object
    - body: Object (request body for testing)
  - expected_responses: Array<Object>
    - endpoint: string
    - method: string
    - status_code: number
    - response_schema: Object
    - example_response: Object

verification_profile: Object
  - strict_mode: boolean (default: false)
  - skip_optional_endpoints: boolean (default: false)
  - custom_validation_rules: Array<Object>
    - rule_name: string
    - condition: string (logic condition)
    - severity: "error" | "warning" | "info"
    - message: string
```

## Outputs

### Primary Output
```
verification_report: Object
  - status: "pass" | "warning" | "fail"
  - summary: Object
    - total_endpoints: number
    - verified_endpoints: number
    - compliant_endpoints: number
    - non_compliant_endpoints: number
    - compliance_percentage: number
  - detailed_results: Array<Object>
    - endpoint: string
    - method: string
    - status: "pass" | "warning" | "fail"
    - issues: Array<Object>
      - type: "schema_mismatch" | "missing_endpoint" | "wrong_status" | "performance" | "security"
      - severity: "error" | "warning" | "info"
      - description: string
      - expected: any
      - actual: any
      - suggested_fix: string
  - overall_compliance: "fully_compliant" | "partially_compliant" | "non_compliant"
```

### Secondary Outputs
```
performance_analysis: Object
  - average_response_times: Object
    - endpoint: string
    - avg_time_ms: number
    - p95_time_ms: number
    - p99_time_ms: number
  - throughput_analysis: Object
    - requests_per_second: number
    - concurrent_users_supported: number
    - bottleneck_identification: Array<string>
  - performance_recommendations: Array<Object>
    - endpoint: string
    - issue: string
    - recommendation: string
    - priority: "high" | "medium" | "low"

security_analysis: Object
  - security_issues: Array<Object>
    - endpoint: string
    - vulnerability_type: string
    - severity: "high" | "medium" | "low"
    - description: string
    - remediation_steps: Array<string>
  - security_score: number (0-100)
  - security_recommendations: Array<Object>
    - category: string
    - recommendation: string
    - priority: "high" | "medium" | "low"

compatibility_report: Object
  - backward_compatibility: Object
    - breaking_changes: Array<Object>
      - endpoint: string
      - change_type: string
      - impact: "high" | "medium" | "low"
    - compatibility_score: number
  - version_compatibility: Object
    - supported_versions: Array<string>
    - deprecated_endpoints: Array<string>
    - migration_path: Array<string>
```

## Reusability Scope

### API Types
- REST APIs
- GraphQL APIs
- SOAP APIs
- gRPC services
- WebSocket APIs

### Specification Formats
- OpenAPI 3.0/3.1
- Swagger 2.0
- RAML
- API Blueprint
- Custom specification formats

### Integration Capabilities
- CI/CD pipeline integration
- API gateway validation
- Contract testing frameworks
- Documentation generation tools
- Monitoring and alerting systems

## Algorithm

### Step 1: Specification Parsing
1. Parse the API specification document
2. Extract all defined endpoints and schemas
3. Identify authentication and security requirements
4. Extract performance and rate limiting specifications

### Step 2: Endpoint Discovery
1. Discover all available endpoints at the base URL
2. Compare discovered endpoints with specification
3. Identify missing or extra endpoints
4. Validate endpoint methods (GET, POST, PUT, DELETE, etc.)

### Step 3: Schema Validation
1. Validate request schemas match specification
2. Validate response schemas match specification
3. Check data types and constraints
4. Verify required fields and optional fields

### Step 4: Security Verification
1. Check HTTPS enforcement
2. Validate authentication requirements
3. Verify CORS policy compliance
4. Test rate limiting implementation

### Step 5: Performance Testing
1. Measure response times for endpoints
2. Test throughput capabilities
3. Verify payload size limits
4. Check resource utilization

### Step 6: Compatibility Analysis
1. Check for breaking changes
2. Validate version compatibility
3. Identify deprecated functionality
4. Assess migration impact

## Validation Criteria

### Schema Compliance
- Request/response schemas match specification exactly
- Data types and constraints are enforced
- Required fields are properly validated
- Optional fields handle null/undefined values correctly

### Security Compliance
- Authentication requirements are enforced
- HTTPS is properly implemented
- CORS policies are correctly configured
- Rate limiting is functioning as specified

### Performance Compliance
- Response times meet specified requirements
- Throughput capabilities are sufficient
- Payload size limits are enforced
- Resource utilization is optimized

## Error Handling
- Invalid API specifications return descriptive parsing errors
- Unreachable endpoints are clearly identified
- Schema mismatches include detailed comparison
- Performance issues include specific measurements and thresholds

## Success Metrics
- API specification compliance rate
- Schema validation accuracy
- Performance requirement satisfaction rate
- Security vulnerability detection rate
- Backward compatibility assessment accuracy
- User satisfaction with verification results