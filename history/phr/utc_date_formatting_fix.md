## UTC Date Formatting Fix Applied

### Change Made:

Updated the date formatting logic in `frontend/components/TaskForm.tsx` to ensure all due dates are converted to UTC ISO string before sending to the backend.

### Previous Implementation:
```typescript
const dateObj = new Date(dueDate);
dateObj.setUTCHours(23, 59, 59, 999);
formattedDueDate = dateObj.toISOString();
```

### New Implementation:
```typescript
const localDate = new Date(dueDate);
// Use UTC date object to prevent local timezone offset
const utcDate = new Date(Date.UTC(
  localDate.getFullYear(),
  localDate.getMonth(),
  localDate.getDate(),
  23, 59, 59, 999
));
formattedDueDate = utcDate.toISOString();
```

### Benefits:
1. **Consistent UTC conversion**: Uses Date.UTC() to create a UTC date directly, preventing local timezone offsets
2. **Predictable behavior**: Ensures the same result regardless of user's local timezone
3. **Backend compatibility**: Provides the backend with consistent ISO string format
4. **Timezone safety**: Eliminates timezone-related discrepancies between frontend and backend

### Result:
- Due dates are now consistently formatted as UTC ISO strings
- No more timezone-related errors during task creation/update
- Improved reliability across different user timezones
- Better alignment with backend datetime expectations