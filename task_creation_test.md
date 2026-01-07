# Task Creation Endpoint Test

## Curl Command for Testing

Once you have a valid JWT access token, you can test the task creation endpoint using curl:

```bash
curl -X POST https://<BACKEND_URL>/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{"title":"Test Task","description":"Test description","due_date":"2026-01-09T10:00:00Z"}'
```

## Example with actual values:

```bash
curl -X POST https://your-railway-app.up.railway.app/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" \
  -d '{"title":"Sample Task","description":"This is a sample task description","due_date":"2026-01-09T10:00:00Z"}'
```

## Expected Responses

### Success (201 Created)
```json
{
  "id": "uuid-string",
  "title": "Sample Task",
  "description": "This is a sample task description",
  "status": "pending",
  "due_date": "2026-01-09T10:00:00Z",
  "user_id": "user-id",
  "created_at": "2026-01-08T10:00:00Z",
  "updated_at": "2026-01-08T10:00:00Z"
}
```

### Error Responses

#### 401 Unauthorized (Invalid/Missing Token)
```json
{
  "detail": "User ID not found in request"
}
```

#### 400 Bad Request (Validation Error)
```json
{
  "detail": "Title must be between 1 and 100 characters"
}
```

#### 500 Internal Server Error (Unexpected Error)
```json
{
  "detail": "Failed to create task: error message"
}
```

## Frontend Error Display

The frontend now displays the full backend error message instead of a generic "Failed to create task" message, allowing users to see the exact issue from the backend.

## Logging

The backend logs detailed information about each request to help with debugging:

- Request details (title, user ID)
- Validation errors
- Database operations
- Error messages

All changes have been implemented to ensure proper error handling, validation, and logging for the task creation endpoint.