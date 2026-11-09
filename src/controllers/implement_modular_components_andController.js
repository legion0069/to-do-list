/**
 * to-do-list - Controller Handler for Day 13
 * Capability: Implement modular components and test suites for Day 13
 */
const { ImplementModularComponentsAnd } = require('../features/implement_modular_components_and');

class ImplementModularComponentsAndController {
  constructor() {
    this.feature = new ImplementModularComponentsAnd();
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

module.exports = { ImplementModularComponentsAndController };
