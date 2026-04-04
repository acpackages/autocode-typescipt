import { testSchemaManager, testSqliteSchemaManager } from './sql/test-schema-manager';
import { testAcWebOnExpress } from './ac-web/ac-web-on-express.test';
import { testAcWebInterceptorFlow } from './ac-web/ac-web-interceptor.test';
import { testAcWebJwtInterceptor } from './ac-web/ac-web-jwt-interceptor.test';

async function runTests(): Promise<void> {
  // console.log('--- Running SQLite Tests ---');
  // try {
  //   await testSqliteSchemaManager();
  // } catch (err) {
  //   console.error('SQLite Test failed:', err);
  // }

  // console.log('--- Running MySQL Tests ---');
  // try {
  //   await testSchemaManager();
  // } catch (err) {
  //   console.error('MySQL Test failed:', err);
  // }

  console.log('--- Running Web Tests ---');
  try {
    await testAcWebOnExpress();
    await testAcWebInterceptorFlow();
    await testAcWebJwtInterceptor();
  } catch (err) {
    console.error('Web Test failed:', err);
  }
}

runTests();
