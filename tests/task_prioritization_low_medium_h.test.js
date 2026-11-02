const assert = require('assert');
const { TaskPrioritizationLowMediumH } = require('../src/features/task_prioritization_low_medium_h');

// Automated Unit Test Suite for Day 4 (Task prioritization (Low, Medium, High) and category tagging system)
async function runTests() {
  const instance = new TaskPrioritizationLowMediumH();
  assert.strictEqual(instance.status, 'ready', 'Instance should be in ready state');
  const result = await instance.execute({ testRun: true });
  assert.strictEqual(result.success, true, 'Execution should return success: true');
  assert.strictEqual(result.day, 4, 'Result day should match 4');
  console.log('✅ [PASS] All tests passed for Day 4: Task prioritization (Low, Medium, High) and category tagging system');
}

if (require.main === module) {
  runTests().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runTests };
