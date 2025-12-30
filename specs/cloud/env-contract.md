# Todo Web App - Environment Contract Specification

## Overview
This document defines the required environment variables and configuration values for the Todo Web App across different deployment environments. All configurations follow the principle of environment-driven configuration with zero secrets in the repository.

## Environment Categories

### Development Environment
- **Purpose**: Local development and testing
- **Variables**: May include default/fallback values
- **Security**: Lower security requirements than production
- **Access**: Developer access only

### Staging Environment
- **Purpose**: Pre-production testing and validation
- **Variables**: Production-like configuration
- **Security**: Production-level security
- **Access**: Limited to development team

### Production Environment
- **Purpose**: Live user-facing application
- **Variables**: Full production configuration
- **Security**: Maximum security requirements
- **Access**: Limited to operations team

## Frontend Environment Variables

### Required Variables (All Environments)
```
NEXT_PUBLIC_API_BASE_URL - Base URL for backend API
NEXT_PUBLIC_APP_NAME - Application display name
NEXT_PUBLIC_ENVIRONMENT - Environment identifier (dev/staging/prod)
```

### Optional Variables (All Environments)
```
NEXT_PUBLIC_ANALYTICS_ID - Analytics tracking ID (optional)
NEXT_PUBLIC_SENTRY_DSN - Error tracking DSN (optional)
NEXT_PUBLIC_MAINTENANCE_MODE - Maintenance mode flag (boolean, default: false)
```

### Development-Specific Variables
```
NEXT_PUBLIC_API_MOCK_DELAY - Mock API delay in ms (for testing, default: 0)
NEXT_PUBLIC_DEBUG_MODE - Enable debug features (boolean, default: false)
```

## Backend Environment Variables

### Required Variables (All Environments)
```
DATABASE_URL - PostgreSQL connection string with credentials
PORT - Server port (default: 8000)
SECRET_KEY - JWT signing secret
ALGORITHM - JWT algorithm (default: HS256)
ACCESS_TOKEN_EXPIRE_MINUTES - Token expiration in minutes (default: 30)
REFRESH_TOKEN_EXPIRE_DAYS - Refresh token expiration in days (default: 7)
```

### Authentication Variables
```
BETTER_AUTH_SECRET - Better Auth secret key
BETTER_AUTH_URL - Better Auth instance URL
BETTER_AUTH_TRUST_HOST - Trust host header (boolean, default: true)
```

### Optional Variables (All Environments)
```
LOG_LEVEL - Logging level (default: INFO)
MAX_WORKERS - Number of worker processes (default: 1)
WORKER_TIMEOUT - Worker timeout in seconds (default: 120)
```

### Database Connection Variables
```
DB_POOL_SIZE - Database connection pool size (default: 20)
DB_POOL_MAX_OVERFLOW - Max pool overflow (default: 10)
DB_STATEMENT_TIMEOUT - Statement timeout in ms (default: 30000)
```

### Development-Specific Variables
```
DEBUG - Enable debug mode (boolean, default: false)
RELOAD - Enable auto-reload (boolean, default: false)
TESTING - Enable test mode (boolean, default: false)
```

## Database Environment Variables

### Neon PostgreSQL Configuration
```
NEON_PROJECT_ID - Neon project identifier
NEON_DATABASE_NAME - Database name
NEON_CONNECTION_STRING - Full connection string
NEON_POOLER_CONNECTION_STRING - Connection string for pooled connections (if using)
```

### Connection Pooling (if applicable)
```
PGSSLMODE - SSL mode (default: require)
PGCONNECT_TIMEOUT - Connection timeout in seconds (default: 10)
```

## Authentication Environment Variables

### Better Auth Configuration
```
BETTER_AUTH_SECRET - Secret key for signing JWTs
BETTER_AUTH_URL - Public URL of the auth service
DATABASE_URL - Database URL for Better Auth user storage
EMAIL_FROM - From email address for auth emails
SMTP_HOST - SMTP server host
SMTP_PORT - SMTP server port
SMTP_USER - SMTP username
SMTP_PASSWORD - SMTP password (secret)
```

### Social Login (Optional)
```
GITHUB_ID - GitHub OAuth client ID
GITHUB_SECRET - GitHub OAuth client secret (secret)
GOOGLE_ID - Google OAuth client ID
GOOGLE_SECRET - Google OAuth client secret (secret)
```

## Environment-Specific Differences

### Development vs Production
| Aspect | Development | Production |
|--------|-------------|------------|
| Logging | Verbose, detailed | Optimized, structured |
| Error Handling | Detailed error messages | Generic error responses |
| Caching | Minimal or disabled | Aggressive caching |
| Rate Limiting | Relaxed | Strict limits |
| Database | Local or shared dev DB | Production database |
| Authentication | May include test accounts | Full security measures |

### Staging vs Production
| Aspect | Staging | Production |
|--------|---------|------------|
| Data | Production-like, sanitized | Real user data |
| Scale | Reduced scale | Full production scale |
| Monitoring | Test monitoring | Full production monitoring |
| Access | Dev team only | All users |
| Backup | Periodic | Continuous |

## Secret Handling Rules

### DO NOT Store in Repository
- Database passwords
- API keys and secrets
- JWT signing keys
- SMTP credentials
- OAuth client secrets
- Any personally identifiable information (PII)

### Secure Storage Requirements
- Use cloud provider secret management (AWS Secrets Manager, Azure Key Vault, GCP Secret Manager)
- Environment variable injection at deployment time
- No hardcoded values in source code
- Regular rotation of secrets
- Access logging for secret retrieval

### Secret Classification
```
HIGH SEVERITY:
- DATABASE_URL (includes password)
- SECRET_KEY
- BETTER_AUTH_SECRET
- SMTP_PASSWORD
- OAuth client secrets

MEDIUM SEVERITY:
- API keys for third-party services
- Analytics IDs
- Non-critical service credentials

LOW SEVERITY:
- Public URLs
- Configuration flags
- Non-sensitive settings
```

## Validation Requirements

### Environment Variable Validation
- All required variables must be present at startup
- Invalid configurations should cause application failure
- Default values should be provided for optional variables
- Type validation for numeric and boolean values

### Startup Validation Checklist
```
1. Database connectivity test
2. Authentication service availability
3. Required environment variables present
4. URL format validation
5. Port availability check
6. Secret format validation
```

## Configuration Management Best Practices

### Naming Conventions
- Use uppercase with underscores: `DATABASE_URL`
- Prefix related variables: `NEXT_PUBLIC_` for frontend vars
- Use descriptive names: `ACCESS_TOKEN_EXPIRE_MINUTES` not `TOK_EXP`

### Documentation Requirements
- Each variable must be documented with purpose
- Default values clearly specified
- Security classification indicated
- Validation rules defined

### Change Management
- Configuration changes require code review
- Environment-specific values managed separately
- Rollback procedures for configuration changes
- Testing procedures for configuration updates