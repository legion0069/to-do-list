/**
 * Automated Unit Tests for Day 5: Due Dates, Countdown Timers, and Urgency Sorting
 */

const assert = require('assert');
const { DueDateManager, TaskDueDatesAndSorting } = require('../src/features/task_due_dates_and_sorting');
const { DueDateController } = require('../src/controllers/dueDateController');

console.log('🧪 Running Day 5 Test Suite: Task Due Dates, Countdowns & Urgency Sorting...');

const manager = new DueDateManager();
const controller = new DueDateController();
const refNow = new Date('2026-11-02T16:00:00Z');

// Test 1: Date Validation
{
  assert.strictEqual(manager.validateDate(null), null, 'Null should return null');
  assert.strictEqual(manager.validateDate('not-a-date'), null, 'Invalid string should return null');
  const valid = manager.validateDate('2026-11-05T12:00:00Z');
  assert.ok(valid instanceof Date, 'Should return Date instance');
  assert.strictEqual(valid.toISOString(), '2026-11-05T12:00:00.000Z');
  console.log('  ✅ Test 1 passed: Date validation logic');
}

// Test 2: Set Due Date on Task
{
  const task = { id: 't1', title: 'Complete streak', priority: 'high' };
  const updated = manager.setDueDate(task, '2026-11-03T16:00:00Z');
  assert.strictEqual(updated.dueDate, '2026-11-03T16:00:00.000Z');
  assert.ok(updated.updatedAt, 'Updated timestamp must be present');

  // Verify throws on invalid date string
  assert.throws(() => {
    manager.setDueDate(task, 'invalid-date-format');
  }, /Invalid due date format/);
  console.log('  ✅ Test 2 passed: Set due date on task');
}

// Test 3: Countdown Calculations (Future & Overdue)
{
  // Future: 2 days away
  const futureDue = '2026-11-04T16:00:00Z';
  const futureCountdown = manager.getCountdown(futureDue, refNow);
  assert.strictEqual(futureCountdown.hasDueDate, true);
  assert.strictEqual(futureCountdown.isOverdue, false);
  assert.strictEqual(futureCountdown.days, 2);
  assert.strictEqual(futureCountdown.hours, 0);
  assert.ok(futureCountdown.humanized.includes('2 days'), 'Humanized should mention 2 days');

  // Overdue: 5 hours ago
  const overdueDue = '2026-11-02T11:00:00Z';
  const overdueCountdown = manager.getCountdown(overdueDue, refNow);
  assert.strictEqual(overdueCountdown.isOverdue, true);
  assert.strictEqual(overdueCountdown.hours, 5);
  assert.ok(overdueCountdown.humanized.includes('Overdue by 5 hours'));

  // No due date
  const noDue = manager.getCountdown(null, refNow);
  assert.strictEqual(noDue.hasDueDate, false);
  assert.strictEqual(noDue.humanized, 'No due date set');
  console.log('  ✅ Test 3 passed: Countdown calculations');
}

// Test 4: Urgency Score Calculations
{
  const completedTask = { id: 'c1', dueDate: '2026-11-01T10:00:00Z', completed: true, priority: 'high' };
  assert.strictEqual(manager.calculateUrgencyScore(completedTask, refNow), 0, 'Completed tasks must have score 0');

  const overdueTask = { id: 'o1', dueDate: '2026-11-01T10:00:00Z', priority: 'high' };
  const dueTodayTask = { id: 'd1', dueDate: '2026-11-02T20:00:00Z', priority: 'high' }; // 4h away
  const dueNextWeekTask = { id: 'w1', dueDate: '2026-11-10T16:00:00Z', priority: 'high' };
  const lowPriorityNoDate = { id: 'l1', priority: 'low' };

  const overdueScore = manager.calculateUrgencyScore(overdueTask, refNow);
  const dueTodayScore = manager.calculateUrgencyScore(dueTodayTask, refNow);
  const nextWeekScore = manager.calculateUrgencyScore(dueNextWeekTask, refNow);
  const noDateScore = manager.calculateUrgencyScore(lowPriorityNoDate, refNow);

  assert.ok(overdueScore > dueTodayScore, `Overdue (${overdueScore}) must score higher than Due Today (${dueTodayScore})`);
  assert.ok(dueTodayScore > nextWeekScore, `Due Today (${dueTodayScore}) must score higher than Next Week (${nextWeekScore})`);
  assert.ok(nextWeekScore > noDateScore, `Next Week with high priority (${nextWeekScore}) must score higher than no-date low (${noDateScore})`);
  console.log('  ✅ Test 4 passed: Urgency score calculations');
}

// Test 5: Sorting Tasks by Urgency
{
  const tasks = [
    { id: '1', title: 'Due next week', dueDate: '2026-11-10T16:00:00Z', priority: 'low' },
    { id: '2', title: 'Overdue task', dueDate: '2026-11-01T10:00:00Z', priority: 'high' },
    { id: '3', title: 'Finished task', dueDate: '2026-11-01T08:00:00Z', completed: true },
    { id: '4', title: 'Due in 2 hours', dueDate: '2026-11-02T18:00:00Z', priority: 'medium' }
  ];

  const sorted = manager.sortByUrgency(tasks, refNow);
  assert.strictEqual(sorted[0].id, '2', 'Top item must be the overdue task');
  assert.strictEqual(sorted[1].id, '4', 'Second item must be the task due in 2 hours');
  assert.strictEqual(sorted[3].id, '3', 'Bottom item must be the completed task');
  console.log('  ✅ Test 5 passed: Sorting tasks by urgency');
}

// Test 6: Controller Requests
(async () => {
  // Test setDueDate action
  const resSet = await controller.handleRequest({
    action: 'setDueDate',
    payload: {
      task: { id: 'task-101', title: 'Review PR' },
      dueDate: '2026-11-05T10:00:00Z'
    }
  });
  assert.strictEqual(resSet.statusCode, 200);
  assert.strictEqual(resSet.body.dueDate, '2026-11-05T10:00:00.000Z');

  // Test sortByUrgency action
  const resSort = await controller.handleRequest({
    action: 'sortByUrgency',
    payload: {
      tasks: [
        { id: 'a', dueDate: '2026-11-01T00:00:00Z', priority: 'high' },
        { id: 'b', dueDate: '2026-11-05T00:00:00Z', priority: 'low' }
      ],
      referenceDate: refNow.toISOString()
    }
  });
  assert.strictEqual(resSort.statusCode, 200);
  assert.strictEqual(resSort.body.tasks[0].id, 'a');

  // Test getOverdue action
  const resOverdue = await controller.handleRequest({
    action: 'getOverdue',
    payload: {
      tasks: [
        { id: 'a', dueDate: '2026-11-01T00:00:00Z' },
        { id: 'b', dueDate: '2026-11-05T00:00:00Z' }
      ],
      referenceDate: refNow.toISOString()
    }
  });
  assert.strictEqual(resOverdue.statusCode, 200);
  assert.strictEqual(resOverdue.body.count, 1);
  assert.strictEqual(resOverdue.body.overdueTasks[0].id, 'a');

  // Test Compatibility feature execute
  const feature = new TaskDueDatesAndSorting();
  const execRes = await feature.execute({
    tasks: [{ id: 'x', title: 'Task X', dueDate: '2026-11-03T16:00:00Z' }]
  });
  assert.strictEqual(execRes.success, true);
  assert.strictEqual(execRes.day, 5);

  console.log('  ✅ Test 6 passed: DueDateController integration');
  console.log('🎉 All Day 5 tests passed successfully!');
})();
