/**
 * to-do-list - Day 5 of 10
 * Milestone: Due dates, countdown timers, and urgency sorting algorithm
 */

class DueDateManager {
  constructor(config = {}) {
    this.config = config;
  }

  /**
   * Validate and normalize a date input into a valid Date object
   * @param {string|number|Date} dateInput
   * @returns {Date|null}
   */
  validateDate(dateInput) {
    if (!dateInput) return null;
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? null : date;
  }

  /**
   * Assign a due date to a task
   * @param {Object} task
   * @param {string|Date} dueDate
   * @returns {Object} updated task
   */
  setDueDate(task, dueDate) {
    if (!task || typeof task !== 'object') {
      throw new Error('Task object is required');
    }
    const validDate = this.validateDate(dueDate);
    if (!validDate && dueDate !== null && dueDate !== undefined) {
      throw new Error(`Invalid due date format: ${dueDate}`);
    }

    return {
      ...task,
      dueDate: validDate ? validDate.toISOString() : null,
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Calculate precise countdown metrics and human-readable remaining time
   * @param {string|Date} dueDate
   * @param {Date} [referenceDate=new Date()]
   * @returns {Object} countdown metrics
   */
  getCountdown(dueDate, referenceDate = new Date()) {
    const target = this.validateDate(dueDate);
    if (!target) {
      return {
        hasDueDate: false,
        isOverdue: false,
        days: 0,
        hours: 0,
        minutes: 0,
        humanized: 'No due date set'
      };
    }

    const diffMs = target.getTime() - referenceDate.getTime();
    const isOverdue = diffMs < 0;
    const absDiffMs = Math.abs(diffMs);

    const totalSeconds = Math.floor(absDiffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;

    let humanized = '';
    if (isOverdue) {
      if (days > 0) humanized = `Overdue by ${days} day${days > 1 ? 's' : ''}`;
      else if (hours > 0) humanized = `Overdue by ${hours} hour${hours > 1 ? 's' : ''}`;
      else humanized = `Overdue by ${Math.max(1, minutes)} minute${minutes > 1 ? 's' : ''}`;
    } else {
      if (days > 0) humanized = `${days} day${days > 1 ? 's' : ''} ${hours}h remaining`;
      else if (hours > 0) humanized = `${hours} hour${hours > 1 ? 's' : ''} remaining`;
      else if (minutes > 0) humanized = `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
      else humanized = 'Due now';
    }

    return {
      hasDueDate: true,
      isOverdue,
      days,
      hours,
      minutes,
      totalHoursRemaining: isOverdue ? -totalHours : totalHours,
      humanized,
      dueDateIso: target.toISOString()
    };
  }

  /**
   * Calculate an urgency score based on priority weight and proximity to due date
   * @param {Object} task
   * @param {Date} [referenceDate=new Date()]
   * @returns {number} urgency score (higher = more urgent)
   */
  calculateUrgencyScore(task = {}, referenceDate = new Date()) {
    if (task.completed || task.status === 'completed') {
      return 0; // Completed tasks require no immediate action
    }

    // Base priority weighting
    const priorityMap = {
      high: 300,
      medium: 200,
      low: 100
    };
    const priority = (task.priority || 'medium').toLowerCase();
    let score = priorityMap[priority] || 150;

    // No due date: baseline score by priority
    if (!task.dueDate) {
      return score;
    }

    const target = this.validateDate(task.dueDate);
    if (!target) return score;

    const diffHours = (target.getTime() - referenceDate.getTime()) / (1000 * 60 * 60);

    if (diffHours < 0) {
      // Overdue: critical urgency boost + penalty for each hour overdue
      const overdueHours = Math.abs(diffHours);
      score += 1000 + Math.min(500, Math.floor(overdueHours * 5));
    } else if (diffHours <= 24) {
      // Due within 24 hours (Today)
      score += 600 + Math.floor((24 - diffHours) * 15);
    } else if (diffHours <= 72) {
      // Due within 3 days
      score += 350 + Math.floor((72 - diffHours) * 3);
    } else if (diffHours <= 168) {
      // Due within 1 week
      score += 150;
    } else {
      // More than 1 week away
      score += 50;
    }

    return score;
  }

  /**
   * Sort an array of tasks by descending urgency score
   * @param {Array<Object>} tasks
   * @param {Date} [referenceDate=new Date()]
   * @returns {Array<Object>} sorted copy of tasks with calculated urgency
   */
  sortByUrgency(tasks = [], referenceDate = new Date()) {
    if (!Array.isArray(tasks)) return [];

    return [...tasks]
      .map(task => ({
        ...task,
        urgencyScore: this.calculateUrgencyScore(task, referenceDate),
        countdown: this.getCountdown(task.dueDate, referenceDate)
      }))
      .sort((a, b) => b.urgencyScore - a.urgencyScore);
  }

  /**
   * Retrieve uncompleted tasks that have passed their due date
   * @param {Array<Object>} tasks
   * @param {Date} [referenceDate=new Date()]
   * @returns {Array<Object>}
   */
  getOverdueTasks(tasks = [], referenceDate = new Date()) {
    if (!Array.isArray(tasks)) return [];
    return tasks.filter(task => {
      if (task.completed || task.status === 'completed' || !task.dueDate) return false;
      const target = this.validateDate(task.dueDate);
      return target && target.getTime() < referenceDate.getTime();
    });
  }

  /**
   * Retrieve tasks due within the specified window of days
   * @param {Array<Object>} tasks
   * @param {number} [days=7]
   * @param {Date} [referenceDate=new Date()]
   * @returns {Array<Object>}
   */
  getUpcomingTasks(tasks = [], days = 7, referenceDate = new Date()) {
    if (!Array.isArray(tasks)) return [];
    const maxDate = new Date(referenceDate.getTime() + days * 24 * 60 * 60 * 1000);

    return tasks.filter(task => {
      if (task.completed || task.status === 'completed' || !task.dueDate) return false;
      const target = this.validateDate(task.dueDate);
      return target && target.getTime() >= referenceDate.getTime() && target.getTime() <= maxDate.getTime();
    });
  }
}

/**
 * Compatibility wrapper for automated runner and test harnesses
 */
class TaskDueDatesAndSorting {
  constructor(config = {}) {
    this.manager = new DueDateManager(config);
    this.createdAt = new Date();
    this.status = 'ready';
  }

  async execute(payload = {}) {
    const tasks = payload.tasks || [];
    const sorted = this.manager.sortByUrgency(tasks);
    const overdue = this.manager.getOverdueTasks(tasks);

    return {
      success: true,
      day: 5,
      milestone: 'Due dates, countdown timers, and urgency sorting algorithm',
      timestamp: new Date().toISOString(),
      stats: {
        total: tasks.length,
        overdue: overdue.length,
        upcoming: this.manager.getUpcomingTasks(tasks).length
      },
      sortedTasks: sorted
    };
  }
}

module.exports = {
  DueDateManager,
  TaskDueDatesAndSorting
};
