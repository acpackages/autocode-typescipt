const fs = require('fs');

const path = 'f:/Packages/AutoCode/Github/autocode-typescript/packages/node/ac-web/src/lib/core/ac-web.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/this\.logger\.log\((['`][^'`]+['`])\);/g, 'this.logger.log({ message: $1 });');
content = content.replace(/this\.logger\.log\((`[^`]+`)\);/g, 'this.logger.log({ message: $1 });');
content = content.replace(/request\.requestData/g, 'request.body');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed log statements and requestData in ac-web.ts');
