# Todo Web App - Full Stack Implementation

This is a full-stack todo application built with Next.js and FastAPI, following spec-driven development principles.

## Project Structure

```
todo-web-app/
├── backend/                 # FastAPI backend application
│   ├── api/                 # API routes
│   │   └── v1/              # API version 1
│   ├── models/              # SQLModel database models
│   ├── services/            # Business logic
│   ├── auth/                # Authentication utilities
│   ├── utils/               # Utility functions
│   ├── db/                  # Database utilities
│   ├── core/                # Core configuration
│   ├── middleware/          # Middleware components
│   ├── tests/               # Test files
│   ├── main.py              # Main application entry point
│   ├── requirements.txt     # Python dependencies
│   └── ...
├── frontend/                # Next.js frontend application
│   ├── app/                 # App Router pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Shared utilities and API client
│   ├── types/               # TypeScript type definitions
│   ├── public/              # Static assets
│   └── ...
├── specs/                   # All specifications
│   ├── features/            # Feature specifications
│   ├── api/                 # API specifications
│   ├── database/            # Database specifications
│   ├── ui/                  # UI specifications
│   ├── cloud/               # Cloud deployment specifications
│   ├── agent-skills/        # Agent skill specifications
│   └── ...
├── history/                 # Prompt History Records
│   └── prompts/             # PHR files
└── ...
```

## Backend (FastAPI)

The backend is built with FastAPI and includes:

- JWT-based authentication
- SQLModel for database models
- Async PostgreSQL database operations
- Task CRUD operations with user isolation
- Comprehensive error handling
- API documentation with Swagger/OpenAPI

### Key Features:

- **Authentication**: JWT tokens for user authentication
- **User Isolation**: Users can only access their own tasks
- **Validation**: Input validation and error handling
- **Security**: Protection against common vulnerabilities
- **API Documentation**: Automatic OpenAPI/Swagger docs

### Running the Backend:

1. Install dependencies:
```bash
pip install -r backend/requirements.txt
```

2. Set environment variables:
```bash
# Create .env file in backend directory
DATABASE_URL=postgresql+asyncpg://user:password@localhost/dbname
SECRET_KEY=your-secret-key
BETTER_AUTH_SECRET=your-better-auth-secret
```

3. Run the application:
```bash
cd backend
uvicorn main:app --reload
```

## Frontend (Next.js)

The frontend is built with Next.js 14 using the App Router and includes:

- Task management interface
- Responsive design with Tailwind CSS
- JWT token handling
- API client with error handling
- Component-based architecture

### Key Features:

- **Task Management**: Create, read, update, delete tasks
- **Filtering**: Filter tasks by status (pending/completed)
- **Pagination**: Handle large task lists
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: Proper error states and messages

### Running the Frontend:

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Set environment variables:
```bash
# Create .env.local in frontend directory
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

3. Run the development server:
```bash
npm run dev
```

## Specifications

This project follows a spec-driven development approach with comprehensive specifications in the `specs/` directory:

- **Feature Specs**: Detailed user stories and acceptance criteria
- **API Specs**: REST API contracts and endpoints
- **Database Specs**: Schema definitions and relationships
- **UI Specs**: Component and page specifications
- **Cloud Specs**: Deployment and infrastructure specifications
- **Agent Skills**: Reusable AI agent skills for development tasks

## Architecture

The application follows cloud-native principles:

- **Platform Agnostic**: Deployable on any cloud platform
- **Environment Driven**: Configuration externalized to environment variables
- **Zero Secrets**: No secrets stored in the repository
- **Reusable Components**: Agent skills for common operations

## Testing

The application includes comprehensive tests:

- **Unit Tests**: For individual components and functions
- **Integration Tests**: For API endpoints and database operations
- **End-to-End Tests**: For full user workflows (to be implemented)

## Deployment

The application is designed for cloud deployment with:

- **Database**: Neon PostgreSQL
- **Backend**: Deployable on Railway/Fly.io
- **Frontend**: Deployable on Vercel
- **Authentication**: Better Auth for JWT management

## Security

- JWT-based authentication with proper token validation
- User data isolation to prevent cross-user access
- Input validation and sanitization
- HTTPS enforcement
- Secure token storage and transmission