## Datetime Timezone Attribute Fix

### Issue Identified:
The error `{"detail":"Failed to create task: type object 'datetime.datetime' has no attribute 'timezone'"}` occurred because the code was using `datetime.timezone.utc` instead of properly accessing the timezone module.

### Root Cause:
In Python, `timezone` is a class within the `datetime` module, so you need to either:
- Import it separately: `from datetime import timezone` and use `timezone.utc`
- Or use: `datetime.timezone.utc` (but this requires the correct import structure)

### Changes Made:
Fixed the incorrect usage in `backend/services/task_service.py`:
- Changed `datetime.timezone.utc` to `timezone.utc` after importing `timezone` from `datetime`

### Affected Methods:
1. `TaskService.create_task()` - Line with due_date timezone conversion
2. `TaskService.update_task()` - Line with due_date timezone conversion

### Result:
✅ No more "datetime.datetime has no attribute 'timezone'" error
✅ Proper timezone handling maintained
✅ Task creation should now work without 500 errors
✅ Timezone-aware to naive datetime conversion works correctly

The fix ensures that the timezone module is accessed correctly after being imported, resolving the AttributeError that was causing the 500 server error.