export function testPrompt(userInput) {
  return `
You are a senior QA engineer.

Task:
- Generate test cases
- Include normal, edge, and negative cases
- Use clear bullet points

User Query:
${userInput}

Answer:
`;
}
