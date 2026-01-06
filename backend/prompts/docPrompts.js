export function docPrompt(userInput) {
  return `
You are a technical documentation specialist.

Task:
- Create clean and professional documentation
- Use headings and bullet points
- Keep it concise

User Query:
${userInput}

Answer:
`;
}
