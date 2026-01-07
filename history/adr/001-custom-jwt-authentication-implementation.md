# ADR 001: Custom JWT Authentication Implementation

## Status
Accepted

## Context
The Todo Web App requires secure user authentication with JWT tokens for API authorization and user data isolation. While Better Auth SDK was available as an option, the project needed a solution that:
- Integrates seamlessly with FastAPI backend
- Provides full control over JWT token structure and validation
- Maintains consistency with SQLModel database approach
- Supports the required user stories for registration, login, logout, and data isolation

## Decision
We chose to implement a custom JWT authentication system instead of using Better Auth SDK, while still leveraging the BETTER_AUTH_URL environment variable for potential future integration.

## Approach
1. **Backend JWT Implementation**:
   - Custom JWT token generation using python-jose
   - FastAPI middleware for token validation
   - User ID extraction and request state management
   - Integration with existing SQLModel database models

2. **Frontend Authentication**:
   - Custom auth helper functions (login, register, logout)
   - JWT token storage in localStorage
   - Automatic token attachment to API requests
   - Authentication state management

3. **Security Measures**:
   - Proper token expiration handling
   - Secure token storage and transmission
   - User data isolation at service layer
   - Input validation and error handling

## Consequences

### Positive
- Full control over JWT token structure and claims
- Tight integration with existing FastAPI/SQLModel architecture
- Consistent error handling and validation patterns
- Complete ownership of authentication flow
- Easier debugging and customization

### Negative
- More code to maintain compared to using a ready SDK
- Responsibility for security updates and best practices
- Potential for implementation errors vs. battle-tested SDK
- Slightly more complex setup than using a pre-built solution

## Alternatives Considered

1. **Better Auth SDK Integration**:
   - Pros: Battle-tested, security updates handled, standard implementation
   - Cons: Less control over token structure, potential architecture conflicts, additional dependency

2. **OAuth Integration**:
   - Pros: Standard authentication flow, external identity providers
   - Cons: Overengineering for simple todo app, additional complexity

3. **Session-based Authentication**:
   - Pros: Simpler server-side session management
   - Cons: Less scalable, doesn't align with API-first approach

## Validation
The custom JWT implementation has been validated through:
- Successful registration/login/logout flows
- Proper user data isolation (users only see their own tasks)
- JWT token validation and expiration handling
- Frontend-backend integration testing
- Error handling and security validation