/**
 * to-do-list - Controller Handler for Day 8
 * Capability: Interactive web frontend UI (task dashboard, card grid, status toggles)
 */
const { InteractiveWebFrontendUiTask } = require('../features/interactive_web_frontend_ui_task');

class InteractiveWebFrontendUiTaskController {
  constructor() {
    this.feature = new InteractiveWebFrontendUiTask();
  }

  async handleRequest(req = {}) {
    try {
      const result = await this.feature.execute(req);
      return { statusCode: 200, body: result };
    } catch (err) {
      return { statusCode: 500, error: err.message };
    }
  }
}

module.exports = { InteractiveWebFrontendUiTaskController };
