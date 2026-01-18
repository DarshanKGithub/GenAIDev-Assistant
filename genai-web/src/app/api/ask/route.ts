import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const backendResponse = await fetch(
      "http://localhost:4000/ask",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        cache: "no-store"
      }
    );

    const data = await backendResponse.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
