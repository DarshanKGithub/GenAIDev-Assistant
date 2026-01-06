import readline from "readline";
import { processRequest } from "../backend/processRequest.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
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
