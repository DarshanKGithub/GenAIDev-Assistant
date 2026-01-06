import fetch from "node-fetch";

export async function processRequest(prompt) {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.1:8b",
      messages: [
        { role: "system", content: "You are a senior software engineer." },
        { role: "user", content: prompt }
      ],
      stream: false
    })
  });

  const raw = await response.text();

  if (!response.ok) {
    console.error("OLLAMA ERROR:", raw);
    throw new Error("LLaMA request failed");
  }

  const data = JSON.parse(raw);

  return {
    answer: data.message?.content || data.response
  };
}
