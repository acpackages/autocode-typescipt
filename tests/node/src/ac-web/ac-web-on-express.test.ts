import { AcWebOnExpress } from '@autocode-ts/ac-web-on-express';
import { AcWebRequestHandlerArgs, AcWebResponse } from '@autocode-ts/ac-web';
import axios from 'axios';

export async function testAcWebOnExpress(): Promise<void> {
  console.log("Testing AcWebOnExpress...");

  const acWeb = new AcWebOnExpress();
  acWeb.port = 3001; // Use a different port than 3000 just in case

  // Register a test route
  acWeb.get({
    url: '/test',
    handler: async (args: AcWebRequestHandlerArgs) => {
      return AcWebResponse.json({ data: { message: 'Hello from AcWebOnExpress!' } });
    }
  });

  // Start the server
  const startResult = await acWeb.start();
  if (startResult.isSuccess()) {
    console.log("Server started successfully on port 3001.");
    
    try {
      // Perform a request using axios
      const response = await axios.get('http://localhost:3001/test');
      console.log('Response from server:');
      console.log(JSON.stringify(response.data, null, 2));

      if (response.data && response.data.message === 'Hello from AcWebOnExpress!') {
        console.log('Test Passed!');
      } else {
        console.error('Test Failed: Unexpected response content.');
        console.log('Received:', response.data);
      }
    } catch (error: any) {
      console.error('Test Failed: Error during axios request.');
      console.error(error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    } finally {
      // Stop the server
      await acWeb.stop();
      console.log("Server stopped.");
    }
  } else {
    console.error("Failed to start server:");
    console.error(startResult.message);
  }
}
