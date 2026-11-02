/**
 * to-do-list - Controller Handler for Day 5
 * Milestone: Due dates, countdown timers, and urgency sorting algorithm
 */

const { DueDateManager, TaskDueDatesAndSorting } = require('../features/task_due_dates_and_sorting');

class DueDateController {
  constructor(config = {}) {
    this.manager = new DueDateManager(config);
    this.feature = new TaskDueDatesAndSorting(config);
  }

  /**
   * Handle incoming request with standardized HTTP status responses
   * @param {Object} req
   * @param {string} req.action - 'setDueDate' | 'getCountdown' | 'sortByUrgency' | 'getOverdue' | 'getUpcoming' | 'execute'
   * @param {Object} req.payload
   * @returns {Object} response with statusCode and body/error
   */
  async handleRequest(req = {}) {
    try {
      const action = req.action || 'execute';
      const payload = req.payload || req.body || req;

      switch (action) {
        case 'setDueDate': {
          const { task, dueDate } = payload;
          if (!task) {
            return { statusCode: 400, error: 'Task object is required' };
          }
          const updated = this.manager.setDueDate(task, dueDate);
          return { statusCode: 200, body: updated };
        }

        case 'getCountdown': {
          const { dueDate, referenceDate } = payload;
          const countdown = this.manager.getCountdown(dueDate, referenceDate ? new Date(referenceDate) : undefined);
          return { statusCode: 200, body: countdown };
        }

        case 'sortByUrgency': {
          const { tasks, referenceDate } = payload;
          const sorted = this.manager.sortByUrgency(tasks || [], referenceDate ? new Date(referenceDate) : undefined);
          return { statusCode: 200, body: { total: sorted.length, tasks: sorted } };
        }

        case 'getOverdue': {
          const { tasks, referenceDate } = payload;
          const overdue = this.manager.getOverdueTasks(tasks || [], referenceDate ? new Date(referenceDate) : undefined);
          return { statusCode: 200, body: { count: overdue.length, overdueTasks: overdue } };
        }

        case 'getUpcoming': {
          const { tasks, days, referenceDate } = payload;
          const upcoming = this.manager.getUpcomingTasks(
            tasks || [],
            days || 7,
            referenceDate ? new Date(referenceDate) : undefined
          );
          return { statusCode: 200, body: { count: upcoming.length, upcomingTasks: upcoming } };
        }

        case 'execute':
        default: {
          const result = await this.feature.execute(payload);
          return { statusCode: 200, body: result };
        }
      }
    } catch (err) {
      return {
        statusCode: 500,
        error: err.message || 'Internal controller error'
      };
    }
  }
}

module.exports = {
  DueDateController,
  TaskDueDatesAndSortingController: DueDateController
};
