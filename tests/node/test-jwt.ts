import * as crypto from 'crypto';

function generateValidToken(secret: string, payload: any): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${header}.${body}`);
  const signature = hmac.digest('base64url');
  return `${header}.${body}.${signature}`;
}

function _base64UrlEncode(buffer: Buffer): string {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function _base64UrlDecode(input: string): Buffer {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padContent = base64.length % 4;
  if (padContent > 0) {
    base64 = base64.padEnd(base64.length + (4 - padContent), '=');
  }
  return Buffer.from(base64, 'base64');
}

function _verifyHs256(token: string, secret: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return console.log("length != 3");
    
    const signingInput = `${parts[0]}.${parts[1]}`;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(signingInput);
    const expectedSignature = _base64UrlEncode(hmac.digest());
    
    if (expectedSignature !== parts[2]) {
       console.log("sig mismatch!", { expected: expectedSignature, actual: parts[2] });
       return null;
    }
    
    const payloadJson = Buffer.from(_base64UrlDecode(parts[1])).toString('utf8');
    console.log("Decoding payload:", payloadJson);
    const claims = JSON.parse(payloadJson);
    return claims;
  } catch (e: any) {
    console.log("error", e.message);
    return null;
  }
}

const secret = 'super-secret-test-key';
const token = generateValidToken(secret, { userId: 123, role: 'admin' });
console.log("Token:", token);
const verified = _verifyHs256(token, secret);
console.log("Verified:", verified);
