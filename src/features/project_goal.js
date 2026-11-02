/**
 * Project Goal module for managing high-level objectives in the to-do list.
 */
class ProjectGoalManager {
  constructor() {
    this.goals = [];
  }

  addGoal(title, description) {
    if (!title || typeof title !== 'string') {
      throw new Error('Goal title is required and must be a string.');
    }
    const newGoal = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.goals.push(newGoal);
    return newGoal;
  }

  getGoals() {
    return this.goals;
  }

  completeGoal(id) {
    const goal = this.goals.find(g => g.id === id);
    if (!goal) {
      throw new Error('Goal not found.');
    }
    goal.completed = true;
    goal.completedAt = new Date().toISOString();
    return goal;
  }
}

class ProjectGoal {
  constructor(config = {}) {
    this.config = config;
    this.status = 'active';
  }

  async execute(input = {}) {
    return {
      success: true,
      day: 2,
      milestone: 'Project goal & schema definitions',
      data: input
    };
  }
}

module.exports = ProjectGoalManager;
module.exports.ProjectGoal = ProjectGoal;
module.exports.ProjectGoalManager = ProjectGoalManager;
