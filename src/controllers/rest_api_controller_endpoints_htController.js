/**
 * to-do-list - Controller Handler for Day 6
 * Capability: REST API controller endpoints, HTTP routing, and request validation
 */
const { RestApiControllerEndpointsHt } = require('../features/rest_api_controller_endpoints_ht');

class RestApiControllerEndpointsHtController {
  constructor() {
    this.feature = new RestApiControllerEndpointsHt();
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

module.exports = { RestApiControllerEndpointsHtController };
