import { testSchemaManager } from './sql/test-schema-manager';
import { testAcWebOnExpress } from './ac-web/ac-web-on-express.test';

async function runTests(): Promise<void> {
  await testSchemaManager();
  await testAcWebOnExpress();
}

runTests();
