/**
 * to-do-list - Controller Handler for Day 9
 * Capability: Local persistence adapter, JSON/CSV export/import, and dark mode
 */
const { LocalPersistenceAdapterJsonC } = require('../features/local_persistence_adapter_json_c');

class LocalPersistenceAdapterJsonCController {
  constructor() {
    this.feature = new LocalPersistenceAdapterJsonC();
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

module.exports = { LocalPersistenceAdapterJsonCController };
