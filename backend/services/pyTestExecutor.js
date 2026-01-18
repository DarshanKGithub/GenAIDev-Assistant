import { exec } from "child_process";
import fs from "fs";
import path from "path";

export function runPyTests(testCode) {
  const testDir = path.join(process.cwd(), "pytests");
  const testFile = path.join(testDir, "test_ai_generated.py");

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }

  fs.writeFileSync(testFile, testCode);

  return new Promise((resolve) => {
    exec("pytest pytests -q", (error, stdout, stderr) => {
      resolve(error ? stderr || stdout : stdout);
    });
  });
}
