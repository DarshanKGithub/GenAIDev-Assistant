import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve backend/.env explicitly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../backend/.env")
});

import readline from "readline";
import { processRequest } from "../backend/processRequest.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("AI Developer Productivity Assistant (CLI)");

function ask() {
  rl.question("You > ", async (input) => {
    if (input === "exit") return rl.close();

    const result = await processRequest(input);

    console.log("\nAI TASK:", result.task.toUpperCase());
    console.log(result.aiResponse);
    console.log("\n---------------------\n");

    ask();
  });
}

ask();
