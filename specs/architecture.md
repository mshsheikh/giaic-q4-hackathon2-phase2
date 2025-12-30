# Todo Web App - Architecture Specification

## Overview
This document defines the architectural structure of the Todo Web App, including the monorepo organization, component interactions, and responsibility boundaries between frontend and backend systems.

## Monorepo Structure
```
todo-web-app/
├── frontend/                 # Next.js application
│   ├── app/                  # App Router pages
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Shared utilities and API clients
│   └── public/               # Static assets
├── backend/                  # FastAPI application
│   ├── api/                  # API routes and endpoints
│   ├── models/               # SQLModel database models
│   ├── auth/                 # Better Auth integration
│   ├── services/             # Business logic
│   └── utils/                # Shared utilities
├── specs/                    # All specifications
├── .specify/                 # SpecKit Plus configuration
└── shared/                   # Shared types and constants (optional)
```

## Frontend ↔ Backend Interaction
- Frontend communicates with backend via REST API calls
- All API requests include JWT tokens in Authorization header
- Backend serves static assets for frontend (or frontend is deployed separately)
- API responses use JSON format with consistent error handling
- Frontend handles loading states, error states, and optimistic updates

## Authentication Token Flow (JWT)
1. User authenticates via Better Auth (login/register)
2. Better Auth generates JWT token with user claims
3. Frontend stores JWT securely (httpOnly cookie or secure localStorage)
4. All API requests include Authorization: Bearer <token>
5. Backend validates JWT and extracts user ID from claims
6. Backend enforces user ownership on data operations
7. Token refresh happens automatically via Better Auth

## Component Responsibilities

### Frontend Responsibilities
- User interface rendering and interactions
- Form validation and user experience
- API request handling and response processing
- State management for UI components
- Authentication UI and token management
- Error handling and user feedback

### Backend Responsibilities
- Business logic implementation
- Database operations and transactions
- Authentication and authorization
- API endpoint validation and error handling
- Data validation and sanitization
- Security enforcement and user isolation
- API documentation and schema validation

### Database Responsibilities
- Data persistence and retrieval
- Data integrity through constraints
- Indexing for performance
- Relationship management between entities
- Backup and recovery mechanisms

## Security Boundaries
- Authentication enforced at API gateway level
- User data access restricted to authenticated owner
- Input validation at both frontend and backend
- SQL injection prevention via SQLModel ORM
- XSS prevention through proper output encoding
- CSRF protection via token validation

## Deployment Architecture
- Single monorepo with separate deployment artifacts
- Backend API deployed as service with database connection
- Frontend deployed as static site with API endpoint configuration
- Database hosted on Neon PostgreSQL
- SSL/TLS termination at edge
- CDN for static assets (optional)

## Scalability Considerations
- Stateless API design for horizontal scaling
- Database connection pooling
- Caching strategies for read-heavy operations
- Asynchronous processing for background tasks
- Load balancing for multiple backend instances