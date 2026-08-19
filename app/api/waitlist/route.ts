import { NextResponse } from "next/server";

const WAITLIST_TO = process.env.WAITLIST_EMAIL || "tanya@meshcoaching.com";

type WaitlistBody = {
  name?: string;
  email?: string;
  phone?: string;
};

export async function POST(request: Request) {
  let body: WaitlistBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  try {
    // FormSubmit delivers a formatted email to Tanya — no API key required.
    // First use: Tanya must confirm via a one-time email from FormSubmit.
    const res = await fetch(`https://formsubmit.co/ajax/${WAITLIST_TO}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Phone: phone || "Not provided",
        _subject: `New BEcomingYOU waitlist signup — ${name}`,
        _template: "table",
        _replyto: email,
        _captcha: "false",
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Waitlist email failed:", res.status, text);
      return NextResponse.json(
        {
          error:
            "Could not send your signup. Please email tanya@meshcoaching.com directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist email error:", err);
    return NextResponse.json(
      {
        error:
          "Could not send your signup. Please email tanya@meshcoaching.com directly.",
      },
      { status: 502 }
    );
  }
}
