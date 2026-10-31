const ProjectGoalManager = require('../src/features/project_goal');

describe('ProjectGoalManager', () => {
  let manager;

  beforeEach(() => {
    manager = new ProjectGoalManager();
  });

  test('should add a goal successfully', () => {
    const goal = manager.addGoal('Ship MVP', 'Release the first working version');
    expect(manager.getGoals().length).toBe(1);
    expect(goal.title).toBe('Ship MVP');
    expect(goal.completed).toBe(false);
  });

  test('should throw error when adding goal without title', () => {
    expect(() => manager.addGoal('')).toThrow('Goal title is required');
  });

  test('should mark a goal as completed', () => {
    const goal = manager.addGoal('Write Tests', 'Ensure 80% coverage');
    const completed = manager.completeGoal(goal.id);
    expect(completed.completed).toBe(true);
    expect(completed.completedAt).toBeDefined();
  });
});
