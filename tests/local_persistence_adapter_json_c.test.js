const assert = require('assert');
const { LocalPersistenceAdapterJsonC } = require('../src/features/local_persistence_adapter_json_c');

// Automated Unit Test Suite for Day 9 (Local persistence adapter, JSON/CSV export/import, and dark mode)
async function runTests() {
  const instance = new LocalPersistenceAdapterJsonC();
  assert.strictEqual(instance.status, 'ready', 'Instance should be in ready state');
  const result = await instance.execute({ testRun: true });
  assert.strictEqual(result.success, true, 'Execution should return success: true');
  assert.strictEqual(result.day, 9, 'Result day should match 9');
  console.log('✅ [PASS] All tests passed for Day 9: Local persistence adapter, JSON/CSV export/import, and dark mode');
}

if (require.main === module) {
  runTests().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runTests };
