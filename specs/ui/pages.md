# Todo Web App - UI Pages Specification

## Overview
This document defines all the pages for the Todo Web App, including their purpose, content, layout, and authentication requirements. All pages are designed using Next.js App Router.

## Page Structure
All pages follow the Next.js App Router structure:
```
app/
├── (auth)/          # Authentication pages (using grouped routes)
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── layout.tsx   # Shared auth layout
├── dashboard/
│   └── page.tsx
├── tasks/
│   ├── page.tsx     # Task list
│   ├── [id]/
│   │   └── page.tsx # Task detail/edit
│   └── new/
│       └── page.tsx # Create new task
├── profile/
│   └── page.tsx
├── layout.tsx       # Main application layout
├── page.tsx         # Home page
└── error.tsx        # Global error boundary
```

## Public Pages

### Home Page - `/`
**Purpose**: Landing page for unauthenticated users
**Authentication**: Not required
**Layout**: AuthLayout

**Content:**
- Hero section with app description
- Features overview
- Call-to-action buttons (Sign Up, Learn More)
- Footer with links

**Components Used:**
- AuthLayout
- Button (for CTA)
- Feature cards

### Login Page - `/login`
**Purpose**: User authentication
**Authentication**: Not required
**Layout**: AuthLayout

**Content:**
- Login form with email and password fields
- Link to registration page
- Forgot password link (optional)
- Social login buttons (future)

**Components Used:**
- AuthLayout
- LoginForm
- InputField
- Button

### Register Page - `/register`
**Purpose**: New user registration
**Authentication**: Not required
**Layout**: AuthLayout

**Content:**
- Registration form with name, email, and password
- Terms and conditions agreement
- Link to login page
- Social registration options (future)

**Components Used:**
- AuthLayout
- RegisterForm
- InputField
- Button

## Authenticated Pages

### Dashboard Page - `/dashboard`
**Purpose**: User dashboard with task overview
**Authentication**: Required
**Layout**: MainLayout

**Content:**
- Welcome message with user name
- Task summary statistics (total, pending, completed)
- Recent tasks list
- Quick task creation form
- Upcoming due tasks

**Components Used:**
- MainLayout
- TaskList
- TaskCard
- TaskForm (simplified)
- Badge
- DataTable (for summary)

### Tasks List Page - `/tasks`
**Purpose**: Full task management interface
**Authentication**: Required
**Layout**: MainLayout

**Content:**
- Page title and description
- Task creation button
- Task filter and sort controls
- Task list with pagination
- Empty state when no tasks
- Bulk action controls (select, delete)

**Components Used:**
- MainLayout
- TaskFilterBar
- TaskList
- TaskCard
- Button
- Modal (for confirmations)

### Task Detail/Edit Page - `/tasks/[id]`
**Purpose**: View and edit individual task details
**Authentication**: Required
**Layout**: MainLayout

**Content:**
- Task detail view (or edit form)
- Back to tasks link
- Task status toggle
- Due date display
- Delete task button
- Edit/Save controls

**Components Used:**
- MainLayout
- TaskForm
- TaskCard
- Button
- Modal (for delete confirmation)

### Create Task Page - `/tasks/new`
**Purpose**: Create new task
**Authentication**: Required
**Layout**: MainLayout

**Content:**
- Task creation form
- Cancel link back to tasks
- Form validation feedback
- Success message on creation

**Components Used:**
- MainLayout
- TaskForm
- Button

### Profile Page - `/profile`
**Purpose**: User profile management
**Authentication**: Required
**Layout**: MainLayout

**Content:**
- User information display
- Profile picture upload (future)
- Account settings
- Security settings (change password)
- Account deletion option

**Components Used:**
- MainLayout
- InputField
- Button
- Modal (for confirmations)

## Layout Pages

### Main Application Layout - `/layout.tsx`
**Purpose**: Main application wrapper
**Authentication**: Required for child routes

**Content:**
- Navigation sidebar
- Top navigation bar
- Main content area
- Global notifications
- Footer (optional)

**Components Used:**
- MainLayout
- SidebarNav
- TopNavBar

### Authentication Layout - `/app/(auth)/layout.tsx`
**Purpose**: Wrapper for auth pages
**Authentication**: Not required

**Content:**
- Centered content container
- Branding elements
- Background decoration
- Link to other auth pages

**Components Used:**
- AuthLayout

## Protected Route Handling
- Unauthenticated users are redirected to `/login`
- Authentication state is checked on initial load
- API calls return 401 which triggers logout flow
- Loading states during auth verification

## Page-Specific Features

### Dashboard Page Features
- Real-time task statistics
- Quick-add functionality
- Upcoming tasks calendar view
- Productivity insights (future)

### Tasks List Page Features
- Advanced filtering (by date range, priority)
- Bulk operations
- Export functionality (future)
- Custom views (grid/list)

### Responsive Design Requirements
- All pages must be fully responsive
- Mobile navigation patterns implemented
- Touch-friendly controls
- Appropriate font sizing for all devices
- Optimized for common screen sizes (mobile, tablet, desktop)

## Error Handling
- 404 pages for non-existent routes
- Error boundaries for client-side errors
- Network error handling for API calls
- Graceful degradation for unavailable services

## SEO and Metadata
- Each page has appropriate title and meta description
- Open Graph tags for social sharing
- Canonical URLs
- Structured data where appropriate

## Accessibility Requirements
- All pages meet WCAG 2.1 AA standards
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader compatibility
- Focus management for dynamic content
- Alternative text for images