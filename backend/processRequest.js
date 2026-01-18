import { detectTask } from "./services/detectTask.js";
import { callLLM } from "./services/callLlm.js";

export async function processRequest(prompt) {
  const task = detectTask(prompt);
  const aiResponse = await callLLM(prompt);

  return {
    task,
    aiResponse
  };
}
