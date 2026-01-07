# Todo Web App

A full-stack web application for managing tasks with authentication, built using Next.js, FastAPI, and SQLModel.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/mshsheikh-hackathon2-phase2/releases)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.0-005571?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-336791?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

This is a full-stack todo application built with Next.js and FastAPI, following spec-driven development principles.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend (FastAPI)](#backend-fastapi)
- [Frontend (Next.js)](#frontend-nextjs)
- [Specifications](#specifications)
- [Architecture](#architecture)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🔐 **Authentication**: JWT-based authentication with secure login and registration
- 📝 **Task Management**: Create, read, update, and delete tasks
- 🏷️ **Task Filtering**: Filter tasks by status (pending/completed)
- 📱 **Responsive UI**: Modern UI with Tailwind CSS and responsive design
- 🔒 **User Isolation**: Each user can only access their own tasks
- ⚡ **Performance**: Optimistic UI updates and smooth transitions
- 🔄 **Real-time Updates**: Instant UI feedback with loading states
- 📊 **Pagination**: Handle large task lists with pagination
- 🛡️ **Security**: JWT-based authentication with proper validation
- 🚀 **Deployment Ready**: Configured for Railway and Vercel deployment
- ✨ **Modern UI/UX**: Beautiful glass-morphism design with smooth animations
- 🧪 **Testable Architecture**: Clean separation of concerns for easy testing

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

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mshsheikh-hackathon2-phase2/todo-web-app.git
cd todo-web-app
```

2. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables as described above

5. Start the applications:
```bash
# Backend
cd ../backend
uvicorn main:app --reload

# Frontend (in a new terminal)
cd ../frontend
npm run dev
```

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

### Deployment Commands:

**Frontend (Vercel):**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

**Backend (Railway):**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy to Railway
railway up
```

## Security

- JWT-based authentication with proper token validation
- User data isolation to prevent cross-user access
- Input validation and sanitization
- HTTPS enforcement
- Secure token storage and transmission

## Usage

1. Register a new account or log in with existing credentials
2. Create new tasks with titles, descriptions, and due dates
3. Filter tasks by status (all, pending, completed)
4. Update task status by clicking the checkbox
5. Edit or delete existing tasks
6. Navigate through paginated task lists

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token
- `POST /auth/logout` - Logout and invalidate token

### Tasks
- `GET /tasks` - Get all user's tasks with pagination
- `POST /tasks` - Create a new task
- `GET /tasks/{task_id}` - Get a specific task
- `PUT /tasks/{task_id}` - Update a task
- `DELETE /tasks/{task_id}` - Delete a task
- `PATCH /tasks/{task_id}/status` - Update task status

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

## License

Distributed under the MIT License. See `LICENSE` for more information.