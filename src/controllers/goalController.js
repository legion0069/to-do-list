const ProjectGoalManager = require('../features/project_goal');
const goalManager = new ProjectGoalManager();

const getGoalsHandler = (req, res) => {
  try {
    const goals = goalManager.getGoals();
    res.status(200).json({ success: true, data: goals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createGoalHandler = (req, res) => {
  try {
    const { title, description } = req.body;
    const newGoal = goalManager.addGoal(title, description);
    res.status(201).json({ success: true, data: newGoal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const completeGoalHandler = (req, res) => {
  try {
    const { id } = req.params;
    const updatedGoal = goalManager.completeGoal(id);
    res.status(200).json({ success: true, data: updatedGoal });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = {
  getGoalsHandler,
  createGoalHandler,
  completeGoalHandler
};
