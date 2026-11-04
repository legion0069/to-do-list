/**
 * to-do-list - Controller Handler for Day 7
 * Capability: Multi-query filtering engine (search, tags, priority, date range)
 */
const { MultiQueryFilteringEngineSea } = require('../features/multi_query_filtering_engine_sea');

class MultiQueryFilteringEngineSeaController {
  constructor() {
    this.feature = new MultiQueryFilteringEngineSea();
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

module.exports = { MultiQueryFilteringEngineSeaController };
