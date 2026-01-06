// src/app/api/ask/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const backendResponse = await fetch("http://localhost:4000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await backendResponse.json();
  return NextResponse.json(data);
}
