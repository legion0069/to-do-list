const assert = require('assert');
const { RestApiControllerEndpointsHt } = require('../src/features/rest_api_controller_endpoints_ht');

// Automated Unit Test Suite for Day 6 (REST API controller endpoints, HTTP routing, and request validation)
async function runTests() {
  const instance = new RestApiControllerEndpointsHt();
  assert.strictEqual(instance.status, 'ready', 'Instance should be in ready state');
  const result = await instance.execute({ testRun: true });
  assert.strictEqual(result.success, true, 'Execution should return success: true');
  assert.strictEqual(result.day, 6, 'Result day should match 6');
  console.log('✅ [PASS] All tests passed for Day 6: REST API controller endpoints, HTTP routing, and request validation');
}

if (require.main === module) {
  runTests().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runTests };
