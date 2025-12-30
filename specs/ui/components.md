# Todo Web App - UI Components Specification

## Overview
This document defines the reusable UI components for the Todo Web App. All components are designed to work within the Next.js application using React and follow accessibility best practices.

## Component Categories

### Authentication Components

#### AuthForm
A reusable form component for authentication flows (login/register).

**Props:**
- `type`: 'login' | 'register'
- `onSubmit`: (formData: FormData) => Promise<void>
- `loading`: boolean
- `error`: string | null

**Features:**
- Handles form validation
- Shows loading states
- Displays error messages
- Responsive design
- Accessibility compliant

#### LoginForm
Specific implementation of AuthForm for login functionality.

**Props:**
- Inherits from AuthForm
- `showForgotPassword`: boolean (optional)

#### RegisterForm
Specific implementation of AuthForm for registration functionality.

**Props:**
- Inherits from AuthForm
- `termsRequired`: boolean (optional)

### Task Management Components

#### TaskCard
Displays a single task with title, description, status, and due date.

**Props:**
- `task`: Task object
- `onToggleComplete`: () => void
- `onEdit`: () => void
- `onDelete`: () => void
- `loading`: boolean

**Features:**
- Shows task status with visual indicators
- Formats due date appropriately
- Action buttons for task management
- Responsive design
- Accessibility compliant

#### TaskForm
Form for creating or editing tasks.

**Props:**
- `initialData`: Partial<Task> | null
- `onSubmit`: (taskData: TaskFormData) => Promise<void>
- `onCancel`: () => void
- `loading`: boolean
- `submitText`: string (default: "Save Task")

**Features:**
- Handles task creation and editing
- Form validation
- Date picker for due dates
- Loading states
- Responsive design

#### TaskFilterBar
Toolbar for filtering and sorting tasks.

**Props:**
- `filters`: TaskFilters
- `onFilterChange`: (filters: TaskFilters) => void
- `onSortChange`: (sortBy: string, order: 'asc' | 'desc') => void

**Features:**
- Status filter dropdown
- Sort options
- Search functionality
- Responsive design

#### TaskList
Container component for displaying multiple TaskCards.

**Props:**
- `tasks`: Task[]
- `loading`: boolean
- `emptyMessage`: string (default: "No tasks found")
- `onTaskToggle`: (taskId: string) => void
- `onTaskEdit`: (taskId: string) => void
- `onTaskDelete`: (taskId: string) => void

**Features:**
- Virtual scrolling for performance
- Empty state handling
- Loading skeletons
- Responsive grid layout

### Layout Components

#### MainLayout
Main application layout with navigation.

**Props:**
- `children`: ReactNode
- `user`: User | null
- `sidebarOpen`: boolean
- `onSidebarToggle`: () => void

**Features:**
- Responsive sidebar navigation
- Header with user menu
- Mobile-friendly design
- Accessibility compliant

#### AuthLayout
Layout for authentication pages.

**Props:**
- `children`: ReactNode
- `title`: string

**Features:**
- Centered content area
- Branding elements
- Link to alternative auth page (login/register)
- Mobile-friendly design

### Navigation Components

#### SidebarNav
Navigation sidebar with user menu.

**Props:**
- `user`: User | null
- `currentPage`: string
- `onLogout`: () => void

**Features:**
- Active page highlighting
- User profile dropdown
- Collapsible on mobile
- Accessibility compliant

#### TopNavBar
Top navigation bar with user controls.

**Props:**
- `user`: User | null
- `mobileMenuOpen`: boolean
- `onMobileMenuToggle`: () => void
- `onLogout`: () => void

**Features:**
- Mobile hamburger menu
- User profile dropdown
- Notification badge (future)
- Responsive design

### Utility Components

#### Button
Accessible button component with variants.

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean (optional)
- `icon`: ReactNode (optional)

**Features:**
- Multiple style variants
- Loading states
- Accessible attributes
- Responsive sizing

#### InputField
Controlled input component with validation.

**Props:**
- `label`: string
- `type`: 'text' | 'email' | 'password' | 'date'
- `placeholder`: string
- `value`: string
- `onChange`: (value: string) => void
- `error`: string | null
- `required`: boolean (optional)

**Features:**
- Label association
- Error display
- Accessibility attributes
- Responsive design

#### SelectField
Custom select component with enhanced styling.

**Props:**
- `label`: string
- `options`: Array<{value: string, label: string}>
- `value`: string
- `onChange`: (value: string) => void
- `error`: string | null
- `placeholder`: string (optional)

**Features:**
- Custom styling
- Error display
- Accessibility attributes
- Keyboard navigation

#### Modal
Accessible modal dialog component.

**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `children`: ReactNode

**Features:**
- Proper focus management
- Click/ESC to close
- Accessibility attributes
- Overlay backdrop

#### LoadingSpinner
Visual indicator for loading states.

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `inline`: boolean (optional)

**Features:**
- Multiple size options
- Inline or block display
- Accessibility attributes

#### ErrorMessage
Consistent error message display.

**Props:**
- `message`: string
- `onDismiss`: () => void (optional)

**Features:**
- Visual error indication
- Optional dismiss button
- Accessibility attributes

### Data Display Components

#### DataTable
Table component for displaying tabular data.

**Props:**
- `columns`: Array<DataColumn>
- `data`: Array<any>
- `loading`: boolean
- `emptyMessage`: string (optional)

**Features:**
- Sorting capability
- Responsive design
- Loading states
- Empty state handling

#### Badge
Small status indicator component.

**Props:**
- `variant`: 'success' | 'warning' | 'error' | 'info' | 'default'
- `children`: ReactNode

**Features:**
- Color-coded statuses
- Responsive sizing
- Accessibility attributes

## Component Reusability Guidelines
- All components should accept className for customization
- Use composition over inheritance where possible
- Maintain consistent prop naming conventions
- Follow accessibility best practices (ARIA labels, keyboard navigation)
- Include TypeScript interfaces for all props
- Implement responsive design using utility classes
- Handle loading and error states consistently

## Styling Approach
- Use Tailwind CSS for utility-first styling
- Maintain consistent color palette and typography
- Implement dark mode support
- Use CSS variables for theme customization
- Follow mobile-first responsive design principles

## Accessibility Standards
- All interactive elements must be keyboard accessible
- Proper ARIA attributes for complex components
- Sufficient color contrast ratios
- Semantic HTML structure
- Focus management for modals and dynamic content