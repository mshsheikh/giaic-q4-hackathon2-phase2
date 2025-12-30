# Todo Web App Constitution

## Core Principles

### I. Full-Stack Web Application Development
Focus on building complete web applications with both frontend and backend components; Ensure seamless integration between client and server; Prioritize user experience and developer experience equally.

### II. Spec-Driven Development
All features must be defined in detailed specifications before implementation; No manual coding without corresponding spec; Specifications serve as source of truth for development and testing.

### III. JWT-Based Authentication (NON-NEGOTIABLE)
Implement Better Auth for secure JWT-based authentication; All API endpoints require proper authentication unless explicitly public; Enforce multi-user data isolation through auth tokens.

### IV. Multi-User Data Isolation
Each user's data must be strictly isolated from other users; Implement proper ownership checks on all data operations; Ensure no cross-user data access is possible.

### V. Test-First Approach
TDD mandatory: Specifications written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced; All features require comprehensive test coverage.

### VI. Observability and Security
Implement structured logging for all operations; All API endpoints must be secured; Follow security best practices for web applications; Monitor for unauthorized access attempts.

### VII. Platform-Agnostic Deployment
Design for deployment across multiple cloud platforms; Avoid vendor-specific features unless absolutely necessary; Ensure applications can run in different environments with minimal changes.

### VIII. Environment-Driven Configuration
All environment-specific values must be externalized as environment variables; No hardcoded configuration in source code; Applications must adapt to environment without code changes.

### IX. Zero Secrets in Repository
No secrets, credentials, or sensitive information in source code; All secrets managed through secure environment variables or secret management systems; Regular secret rotation protocols implemented.

### X. Reusable Agent Skills Over Hard-Coded Logic
Develop reusable agent skills for common operations; Avoid hard-coded business logic that limits reusability; Create modular, composable components for future projects.

## Technology Stack Requirements
- Frontend: Next.js 14+ with App Router
- Backend: FastAPI with Python 3.11+
- Database: SQLModel with Neon PostgreSQL
- Authentication: Better Auth
- Architecture: Monorepo structure
- API: REST with JSON responses
- Security: JWT tokens, HTTPS, input validation
- Deployment: Cloud-native with platform-agnostic approach

## Development Workflow
- Create detailed specifications before any implementation
- Follow feature branch workflow
- All code changes require specification alignment
- Code reviews must verify spec compliance
- Automated testing required for all features
- Environment-specific configuration externalized
- Agent skills developed for reusable operations

## Governance
Constitution supersedes all other practices; Amendments require documentation, approval, migration plan

All PRs/reviews must verify compliance; Complexity must be justified; Use specifications for development guidance

**Version**: 1.1.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2025-12-30
