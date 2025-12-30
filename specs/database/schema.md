# Todo Web App - Database Schema Specification

## Overview
This document defines the database schema for the Todo Web App using SQLModel. The schema includes tables for tasks, with user authentication handled by Better Auth which manages the users table externally.

## Database System
- **Type**: PostgreSQL (hosted on Neon)
- **ORM**: SQLModel (SQLAlchemy + Pydantic integration)
- **Naming Convention**: snake_case for tables and columns
- **Primary Keys**: UUID-based for all entities

## Table Definitions

### tasks table
Stores user tasks with ownership and metadata.

```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    user_id VARCHAR(255) NOT NULL  -- Reference to Better Auth user ID
);
```

**Columns:**
- `id`: Primary key, UUID, auto-generated
- `title`: Task title, VARCHAR(100), not null
- `description`: Optional task description, TEXT
- `status`: Task status, VARCHAR(20), default 'pending', constrained to 'pending'|'completed'
- `due_date`: Optional due date, TIMESTAMP WITH TIME ZONE
- `created_at`: Record creation timestamp, defaults to NOW()
- `updated_at`: Record update timestamp, defaults to NOW(), updated on changes
- `user_id`: Foreign key reference to Better Auth user ID, VARCHAR(255), not null

**Indexes:**
```sql
-- Index for user-based queries (critical for multi-user isolation)
CREATE INDEX idx_tasks_user_id ON tasks(user_id);

-- Index for status-based queries
CREATE INDEX idx_tasks_status ON tasks(status);

-- Index for due date queries (for sorting/filtering)
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

-- Index for creation date (for chronological ordering)
CREATE INDEX idx_tasks_created_at ON tasks(created_at);

-- Composite index for common query patterns (user + status)
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
```

**Constraints:**
- `CHECK` constraint on status column to ensure valid values
- `NOT NULL` constraints on essential fields
- Proper foreign key relationship assumed with Better Auth users table

## SQLModel Class Definition
```python
from sqlmodel import SQLModel, Field, create_engine
from typing import Optional
import uuid
from datetime import datetime

class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(default=None, max_length=1000)
    status: str = Field(default="pending", regex="^(pending|completed)$")
    due_date: Optional[datetime] = Field(default=None)

class Task(TaskBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: str = Field(index=True)  # Reference to Better Auth user ID

    # Trigger to update updated_at on changes would be implemented at DB level
```

## Data Relationships
- **External Relationship**: tasks.user_id → Better Auth users table (external to our schema)
- **Self-contained**: All task data is contained within the tasks table
- **Ownership**: Each task is owned by a single user via user_id foreign key

## Multi-User Data Isolation
- All queries must filter by user_id to ensure data isolation
- Indexes are optimized for user-based filtering
- No direct access to tasks without user_id qualification
- API layer enforces user_id inclusion from JWT token

## Security Considerations
- All user-sensitive data is protected by user_id foreign key
- No direct access to other users' tasks without proper authorization
- Indexes support efficient authorization checks
- Database-level constraints enforce data integrity

## Performance Optimizations
- Proper indexing for common query patterns
- Efficient data types for storage
- Optimized for typical task management queries (by user, status, date)
- Partitioning considerations for large-scale deployments (future)

## Migration Strategy
- Initial schema creation follows the definition above
- Future schema changes use Alembic for version control
- Zero-downtime migrations supported through proper migration planning
- Backward compatibility maintained for API consumers

## Backup and Recovery
- Regular automated backups configured on Neon
- Point-in-time recovery capability
- Data retention policies aligned with business requirements
- Disaster recovery procedures documented