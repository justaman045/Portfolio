import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const apiUrl = `${process.env.EMAIL_API_BASE}/subscribe`;

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        api_key: process.env.EMAIL_API_KEY,
        email: email,
      }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return NextResponse.json({ ok: "ok" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || error.toString() }, { status: 500 });
  }
}
