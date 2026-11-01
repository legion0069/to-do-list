const assert = require('assert');
const { TaskCrudOperationsCreateRead } = require('../src/features/task_crud_operations_create_read');

// Automated Unit Test Suite for Day 3 (Task CRUD operations (Create, Read, Update, Delete) and memory store)
async function runTests() {
  const instance = new TaskCrudOperationsCreateRead();
  assert.strictEqual(instance.status, 'ready', 'Instance should be in ready state');
  const result = await instance.execute({ testRun: true });
  assert.strictEqual(result.success, true, 'Execution should return success: true');
  assert.strictEqual(result.day, 3, 'Result day should match 3');
  console.log('✅ [PASS] All tests passed for Day 3: Task CRUD operations (Create, Read, Update, Delete) and memory store');
}

if (require.main === module) {
  runTests().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runTests };
