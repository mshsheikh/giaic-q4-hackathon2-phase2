# Todo Web App - REST API Specification

## API Overview
- Base URL: `/api/v1`
- Authentication: Bearer JWT tokens in Authorization header
- Content-Type: `application/json`
- Response Format: JSON
- Version: v1

## Authentication Requirements
- Most endpoints require valid JWT token in Authorization header
- Public endpoints (registration, login) do not require authentication
- Token format: `Authorization: Bearer <jwt_token>`
- Invalid/expired tokens return 401 Unauthorized

## Common Error Responses
All endpoints may return these common error responses:
- `401 Unauthorized`: Missing or invalid authentication token
- `422 Unprocessable Entity`: Validation errors in request body
- `500 Internal Server Error`: Server-side processing errors

## Endpoints

### Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 8 characters)",
  "name": "string (optional, max 100 characters)"
}
```

**Success Response (201 Created):**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "created_at": "ISO 8601 datetime"
  },
  "token": "JWT token string"
}
```

**Error Responses:**
- `422`: Validation errors (email format, password strength, etc.)

#### POST /auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "string (required, valid email)",
  "password": "string (required)"
}
```

**Success Response (200 OK):**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "created_at": "ISO 8601 datetime"
  },
  "token": "JWT token string"
}
```

**Error Responses:**
- `401`: Invalid email or password
- `422`: Validation errors

#### POST /auth/logout
Terminate user session.

**Headers:**
- `Authorization: Bearer <jwt_token>`

**Success Response (200 OK):**
```json
{
  "message": "Successfully logged out"
}
```

**Error Responses:**
- `401`: Invalid or expired token

### Task Management Endpoints

#### GET /tasks
Retrieve user's tasks with optional filtering and pagination.

**Headers:**
- `Authorization: Bearer <jwt_token>`

**Query Parameters:**
- `status`: Filter by task status ("pending", "completed", "all") - default: "all"
- `page`: Page number for pagination - default: 1
- `limit`: Items per page - default: 10, max: 100
- `sort_by`: Sort field ("created_at", "due_date", "title") - default: "created_at"
- `order`: Sort order ("asc", "desc") - default: "desc"

**Success Response (200 OK):**
```json
{
  "tasks": [
    {
      "id": "string",
      "title": "string",
      "description": "string (nullable)",
      "status": "string (pending|completed)",
      "due_date": "ISO 8601 datetime (nullable)",
      "created_at": "ISO 8601 datetime",
      "updated_at": "ISO 8601 datetime",
      "user_id": "string"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### POST /tasks
Create a new task for the authenticated user.

**Headers:**
- `Authorization: Bearer <jwt_token>`

**Request Body:**
```json
{
  "title": "string (required, 1-100 characters)",
  "description": "string (optional, max 1000 characters)",
  "due_date": "ISO 8601 datetime (optional)"
}
```

**Success Response (201 Created):**
```json
{
  "id": "string",
  "title": "string",
  "description": "string (nullable)",
  "status": "pending",
  "due_date": "ISO 8601 datetime (nullable)",
  "created_at": "ISO 8601 datetime",
  "updated_at": "ISO 8601 datetime",
  "user_id": "string"
}
```

**Error Responses:**
- `422`: Validation errors (title length, date format, etc.)

#### GET /tasks/{task_id}
Retrieve a specific task for the authenticated user.

**Headers:**
- `Authorization: Bearer <jwt_token>`

**Path Parameters:**
- `task_id`: Task ID (string)

**Success Response (200 OK):**
```json
{
  "id": "string",
  "title": "string",
  "description": "string (nullable)",
  "status": "string (pending|completed)",
  "due_date": "ISO 8601 datetime (nullable)",
  "created_at": "ISO 8601 datetime",
  "updated_at": "ISO 8601 datetime",
  "user_id": "string"
}
```

**Error Responses:**
- `404`: Task not found (or belongs to another user)
- `422`: Invalid task ID format

#### PUT /tasks/{task_id}
Update a specific task for the authenticated user.

**Headers:**
- `Authorization: Bearer <jwt_token>`

**Path Parameters:**
- `task_id`: Task ID (string)

**Request Body:**
```json
{
  "title": "string (optional, 1-100 characters)",
  "description": "string (optional, max 1000 characters)",
  "status": "string (optional, pending|completed)",
  "due_date": "ISO 8601 datetime (optional)"
}
```

**Success Response (200 OK):**
```json
{
  "id": "string",
  "title": "string",
  "description": "string (nullable)",
  "status": "string (pending|completed)",
  "due_date": "ISO 8601 datetime (nullable)",
  "created_at": "ISO 8601 datetime",
  "updated_at": "ISO 8601 datetime",
  "user_id": "string"
}
```

**Error Responses:**
- `404`: Task not found (or belongs to another user)
- `422`: Validation errors

#### PATCH /tasks/{task_id}/status
Update only the status of a specific task.

**Headers:**
- `Authorization: Bearer <jwt_token>`

**Path Parameters:**
- `task_id`: Task ID (string)

**Request Body:**
```json
{
  "status": "string (required, pending|completed)"
}
```

**Success Response (200 OK):**
```json
{
  "id": "string",
  "title": "string",
  "description": "string (nullable)",
  "status": "string (pending|completed)",
  "due_date": "ISO 8601 datetime (nullable)",
  "created_at": "ISO 8601 datetime",
  "updated_at": "ISO 8601 datetime",
  "user_id": "string"
}
```

**Error Responses:**
- `404`: Task not found (or belongs to another user)
- `422`: Invalid status value or task ID format

#### DELETE /tasks/{task_id}
Delete a specific task for the authenticated user.

**Headers:**
- `Authorization: Bearer <jwt_token>`

**Path Parameters:**
- `task_id`: Task ID (string)

**Success Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses:**
- `404`: Task not found (or belongs to another user)
- `422`: Invalid task ID format

## Security Implementation
- All user data endpoints require JWT authentication
- User ID from JWT token is used to filter data access
- Users cannot access tasks belonging to other users
- Non-existent tasks for other users return 404 (not 403) to prevent user enumeration
- All input is validated before processing
- SQL injection is prevented through ORM usage