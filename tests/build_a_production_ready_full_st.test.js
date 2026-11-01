const assert = require('assert');
const { BuildAProductionReadyFullSt } = require('../src/features/build_a_production_ready_full_st');

// Test suite for Day 3 (Build a production-ready Full Stack To-Do List application using React.js, Spring Boot, MongoDB Atlas, and JWT Authentication. By the end of Day 7, the project will be fully functional, deployed, documented, and portfolio-ready.)
async function runTests() {
  const instance = new BuildAProductionReadyFullSt();
  assert.strictEqual(instance.status, 'active', 'Service should be active');
  
  const res = await instance.execute({ test: true });
  assert.strictEqual(res.success, true, 'Execution should succeed');
  assert.strictEqual(res.day, 3, 'Day should match 3');
  console.log('✅ [PASSED] Day 3 test suite for BuildAProductionReadyFullSt');
}

if (require.main === module) {
  runTests().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runTests };
