"use client";

import { useState, useRef, useEffect } from "react";

/* =======================
   CODE BLOCK
======================= */
function CodeBlock({ code }) {
  function copy() {
    navigator.clipboard.writeText(code);
  }

  return (
    <div className="relative bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-lg">
      <button
        onClick={copy}
        className="absolute top-2 right-2 text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition"
      >
        Copy
      </button>

      <pre className="p-4 overflow-x-auto text-green-300 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* =======================
   MESSAGE RENDERER
======================= */
function RenderMessage({ content }) {
  const parts = content.split(/```/);

  return (
    <div className="space-y-4">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <CodeBlock key={i} code={part} />
        ) : (
          <p
            key={i}
            className="whitespace-pre-wrap leading-relaxed text-[15px] text-black"
          >
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
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit() {
    if (!prompt.trim() || loading) return;

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
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      typeWriter(data.aiResponse || "No response.");
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
    }, 14);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <main className="h-screen text-white flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] animate-gradient" />
      <div className="absolute inset-0 -z-10 bg-black/60 backdrop-blur-3xl" />

      {/* Header */}
      <header className="px-6 py-4 border-b border-white/10 text-sm font-medium tracking-wide">
        AI Developer Assistant
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-10 space-y-10">
        {messages.length === 0 && (
          <div className="max-w-xl text-white/60">
            <h2 className="text-xl font-semibold mb-3 text-white">
              Welcome 👋
            </h2>
            <p className="mb-4">
              Ask anything related to development, debugging, or system design.
            </p>
            <ul className="list-disc ml-4 space-y-2 text-sm">
              <li>Explain closures in JavaScript</li>
              <li>Generate unit tests for this function</li>
              <li>Refactor this React component</li>
            </ul>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-3xl px-6 py-5 rounded-2xl text-sm leading-relaxed shadow-xl transition-all
                ${
                  m.role === "user"
                    ? "bg-white text-black rounded-br-md"
                    : "bg-white backdrop-blur-xl border border-white/10 rounded-bl-md"
                }`}
            >
              <RenderMessage content={m.content} />
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm opacity-50 animate-pulse">
            AI is thinking…
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <footer className="border-t border-white/10 p-5">
        <div className="relative max-w-4xl mx-auto">
          <textarea
            rows={2}
            placeholder="Ask something… (Enter to send, Shift+Enter for new line)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKey}
            className="w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 pr-28 resize-none focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="absolute right-3 bottom-3 bg-white text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 active:scale-95 disabled:opacity-40 transition"
          >
            Send →
          </button>
        </div>
      </footer>

      {/* Gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 20s ease infinite;
        }
      `}</style>
    </main>
  );
}
