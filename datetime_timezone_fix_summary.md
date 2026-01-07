## Datetime Timezone Handling Fixes Applied

### Changes Made:

1. **Added datetime import** to `backend/services/task_service.py`:
   - Added `from datetime import datetime` to handle timezone conversions

2. **Updated TaskService.create_task method**:
   - Added logic to convert timezone-aware due_date to naive UTC
   - Checks if `due_date` has timezone info and converts to UTC if needed
   - Removes timezone info to prevent offset-naive/offset-aware errors

3. **Updated TaskService.update_task method**:
   - Added same timezone conversion logic for due_date updates
   - Ensures consistency when updating existing tasks

4. **Updated TaskService.update_task_status method**:
   - Changed to use `datetime.utcnow()` instead of class method to ensure naive datetime
   - Prevents timezone-related insertion errors

5. **Updated TaskService.update_task method**:
   - Changed to use `datetime.utcnow()` for updated_at timestamp

### Purpose:
These changes prevent "offset-naive and offset-aware datetime" errors that occur when inserting timezone-aware datetimes into PostgreSQL. The solution converts timezone-aware datetimes to naive UTC datetimes before database insertion, which is the standard practice for SQL databases.

### Result:
- No more datetime timezone conflicts during task creation/update
- Proper handling of due_date timezone information
- Consistent timestamp handling across all task operations
- PostgreSQL compatibility maintained