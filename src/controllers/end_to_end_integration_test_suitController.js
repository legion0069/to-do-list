/**
 * to-do-list - Controller Handler for Day 10
 * Capability: End-to-end integration test suite, production packaging, and v1.0.0 release
 */
const { EndToEndIntegrationTestSuit } = require('../features/end_to_end_integration_test_suit');

class EndToEndIntegrationTestSuitController {
  constructor() {
    this.feature = new EndToEndIntegrationTestSuit();
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

module.exports = { EndToEndIntegrationTestSuitController };
