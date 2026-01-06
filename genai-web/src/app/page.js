"use client";

import { useEffect, useRef, useState } from "react";

// /* =======================
//    MODES
// ======================= */
// const MODES = [
//   { id: "explain", label: "Explain", hint: "Explain code or concept" },
//   { id: "debug", label: "Debug", hint: "Find bugs & issues" },
//   { id: "refactor", label: "Refactor", hint: "Improve code quality" }
// ];

/* =======================
   CODE BLOCK COMPONENT
======================= */
function CodeBlock({ code }) {
  function copy() {
    navigator.clipboard.writeText(code);
  }

  return (
    <div className="relative bg-black/80 rounded-xl overflow-hidden text-sm">
      <button
        onClick={copy}
        className="absolute top-2 right-2 text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20"
      >
        Copy
      </button>

      <pre className="p-4 overflow-x-auto text-green-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* =======================
   RESPONSE RENDERER
======================= */
function RenderMessage({ content }) {
  const parts = content.split(/```/);

  return (
    <div className="space-y-4">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <CodeBlock key={i} code={part} />
        ) : (
          <p key={i} className="whitespace-pre-wrap leading-relaxed">
            {part}
          </p>
        )
      )}
    </div>
  );
}

/* =======================
   MAIN PAGE
======================= */
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("explain");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit() {
    if (!prompt.trim() || loading) return;

    const fullPrompt = `[MODE: ${mode.toUpperCase()}]\n${prompt}`;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt }
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt })
      });

      const data = await res.json();
      typeWriter(data.answer);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." }
      ]);
      setLoading(false);
    }
  }

  function typeWriter(text) {
    let index = 0;
    const msg = { role: "assistant", content: "" };

    setMessages((prev) => [...prev, msg]);

    const interval = setInterval(() => {
      msg.content = text.slice(0, index++);
      setMessages((prev) => [...prev.slice(0, -1), msg]);

      if (index > text.length) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 10);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <main className="h-screen bg-[#0f0f0f] text-white flex">
    {/* Sidebar */}
<aside className="w-64 border-r border-white/10 p-5 hidden md:flex flex-col">
  {/* Title */}
  <h2 className="text-lg font-semibold mb-6">
    AI Dev Assistant
  </h2>

  {/* About */}
  <div className="space-y-3 mb-6">
    <h3 className="text-sm font-medium uppercase tracking-wide opacity-70">
      About
    </h3>
    <p className="text-sm leading-relaxed opacity-60">
      An AI-powered developer productivity tool that explains code,
      performs dry-runs, generates test cases, and automates verification —
      all running locally.
    </p>
  </div>

  {/* Tech Stack */}
  <div className="space-y-3 mb-6">
    <h3 className="text-sm font-medium uppercase tracking-wide opacity-70">
      Tech Stack
    </h3>
    <ul className="text-sm space-y-1 opacity-60">
      <li>• Next.js (UI)</li>
      <li>• Node.js (Backend)</li>
      <li>• Ollama (Local LLM)</li>
      <li>• REST API Architecture</li>
      <li>• CLI + Web Interface</li>
    </ul>
  </div>

  {/* Model Info */}
  <div className="space-y-3 mb-6">
    <h3 className="text-sm font-medium uppercase tracking-wide opacity-70">
      Model
    </h3>
    <p className="text-sm opacity-60">
      LLaMA 3.1 (8B)<br />
      Running locally via Ollama
    </p>
  </div>

  {/* Footer */}
  <div className="mt-auto text-xs opacity-40 leading-relaxed">
    Private • Offline • No API Keys<br />
    Designed for learning & interviews
  </div>
</aside>


      {/* Main */}
      <section className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 border-b border-white/10">
          <div className="text-sm opacity-70">
            Mode: <span className="font-medium">{mode}</span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
          {messages.length === 0 && (
            <div className="opacity-40 max-w-xl">
              <p className="mb-2">Try asking:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Explain this React hook</li>
                <li>Debug this API error</li>
                <li>Refactor this function</li>
              </ul>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-3xl ${
                m.role === "user"
                  ? "ml-auto text-right"
                  : "mr-auto"
              }`}
            >
              <div
                className={`px-4 py-4 rounded-xl text-sm leading-relaxed
                  ${
                    m.role === "user"
                      ? "bg-white text-black"
                      : "bg-white/10"
                  }`}
              >
                <RenderMessage content={m.content} />
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-sm opacity-50">
              AI is thinking…
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <footer className="border-t border-white/10 p-4">
          <div className="relative max-w-4xl mx-auto">
            <textarea
              rows={2}
              placeholder={`/${mode} Ask something…`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKey}
              className="w-full bg-white/10 rounded-xl p-4 pr-24 resize-none focus:outline-none focus:ring-1 focus:ring-white/20"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="absolute right-3 bottom-3 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-40"
            >
              Run
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
