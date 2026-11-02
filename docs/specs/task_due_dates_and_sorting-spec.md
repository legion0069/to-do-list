# 📐 Architecture Specification: Day 5
## Capability: Due Dates, Countdown Timers & Urgency Sorting Algorithm

- **Project**: To-Do List Application
- **Milestone**: Day 5 of 10 (Halfway Milestone: 5 Days Completed, 5 Days Remaining)
- **Status**: Completed & Verified
- **Verification Suite**: `tests/task_due_dates_and_sorting.test.js`

---

## 1. Domain Overview
Day 5 introduces deadline awareness and dynamic task ranking. Rather than viewing tasks in arbitrary creation order, users can set ISO-compliant due dates, monitor real-time countdown metrics, and automatically prioritize tasks based on deadline proximity and priority weighting.

---

## 2. Component Architecture

### 2.1 `DueDateManager` (`src/features/task_due_dates_and_sorting.js`)
- `validateDate(dateInput)`: Validates ISO 8601 strings and Date objects.
- `setDueDate(task, dueDate)`: Assigns validated deadlines with updated timestamps.
- `getCountdown(dueDate, referenceDate)`: Returns days, hours, minutes remaining, overdue flag, and humanized text.
- `calculateUrgencyScore(task, referenceDate)`:
  - Base priority: High (300), Medium (200), Low (100).
  - Overdue bonus: +1000 + (hours * 5).
  - Due today (<= 24h): +600 + (24 - hours) * 15.
  - Due in 3 days: +350 + (72 - hours) * 3.
  - Completed items: 0 (filtered out of active urgency ranking).
- `sortByUrgency(tasks, referenceDate)`: Sorts tasks descending by urgency score.
- `getOverdueTasks(tasks, referenceDate)`: Filters active overdue items.
- `getUpcomingTasks(tasks, days, referenceDate)`: Filters items due in the upcoming N days window.

### 2.2 `DueDateController` (`src/controllers/dueDateController.js`)
- Exposes structured HTTP request routing for API integration:
  - `setDueDate`: Validates payload and updates task deadline.
  - `getCountdown`: Computes remaining time metrics.
  - `sortByUrgency`: Ranks provided task list.
  - `getOverdue`: Returns overdue subset and counts.
  - `getUpcoming`: Returns upcoming deadline subset.

---

## 3. Test Coverage
- Verified via Node.js test harness `tests/task_due_dates_and_sorting.test.js`.
- All boundary cases verified: null dates, invalid formats, exact millisecond countdowns, overdue prioritization, and controller status code standards.
