// extract-direct-dts.js
const fs = require("fs");
const path = require("path");

const NODE_MODULES_DIR = path.resolve("node_modules");
const OUTPUT_FILE = path.resolve("direct-dts.json");

// Read package.json
const pkgJson = require(path.resolve("package.json"));
const dependencies = { ...pkgJson.dependencies, ...pkgJson.peerDependencies };
const depNames = Object.keys(dependencies);

if (depNames.length === 0) {
  console.error("No dependencies or peerDependencies found in package.json");
  process.exit(1);
}

console.log("Direct + peer dependencies:", depNames);

const packages = {};

/**
 * Recursively collect all .d.ts files in a directory
 */
function collectDtsFiles(dir, basePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = {};

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      Object.assign(files, collectDtsFiles(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith(".d.ts")) {
      files[relativePath] = fs.readFileSync(fullPath, "utf8");
      console.log(`Collected: ${relativePath}`);
    }
  }

  return files;
}

// Scan each direct / peer dependency
for (const dep of depNames) {
  let depPath;
  try {
    depPath = path.dirname(require.resolve(`${dep}/package.json`));
  } catch (err) {
    console.warn(`Cannot find module "${dep}" in node_modules`);
    continue;
  }

  packages[dep] = collectDtsFiles(depPath);
}

// Save to JSON
fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ packages }, null, 2), "utf8");
console.log(`All direct and peer dependency .d.ts files saved to: ${OUTPUT_FILE}`);
