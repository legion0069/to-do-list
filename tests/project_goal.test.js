const assert = require('assert');
const { ProjectGoal } = require('../src/features/project_goal');

// Test suite for Day 2 (## Project Goal)
async function runTests() {
  const instance = new ProjectGoal();
  assert.strictEqual(instance.status, 'active', 'Service should be active');
  
  const res = await instance.execute({ test: true });
  assert.strictEqual(res.success, true, 'Execution should succeed');
  assert.strictEqual(res.day, 2, 'Day should match 2');
  console.log('✅ [PASSED] Day 2 test suite for ProjectGoal');
}

if (require.main === module) {
  runTests().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runTests };
