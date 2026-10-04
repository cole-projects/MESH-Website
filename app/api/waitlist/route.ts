import { NextResponse } from "next/server";
import { Resend } from "resend";

const WAITLIST_TO = "sasshuub@gmail.com";
const SHEETS_WEBHOOK = process.env.WAITLIST_WEBHOOK_URL;

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

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

  const payload = {
    timestamp: new Date().toISOString(),
    name,
    email,
    phone,
    source: "mesh-website",
  };

  const saveError = () =>
    NextResponse.json(
      {
        error:
          "Could not save your signup. Please email tanya@meshcoaching.com directly.",
      },
      { status: 502 }
    );

  try {
    let sheetSaved = false;

    if (SHEETS_WEBHOOK) {
      const sheetRes = await fetch(SHEETS_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      const text = await sheetRes.text().catch(() => "");
      let scriptOk = false;
      try {
        scriptOk = JSON.parse(text).ok === true;
      } catch {
        scriptOk = false;
      }

      if (!sheetRes.ok || !scriptOk) {
        console.error("Waitlist sheet webhook failed:", sheetRes.status, text);
        return saveError();
      }
      sheetSaved = true;
    } else {
      console.warn("WAITLIST_WEBHOOK_URL is not set — skipping Google Sheet write");
    }

    const resend = getResend();
    if (resend) {
      const { error } = await resend.emails.send({
        from: "MESH Waitlist <onboarding@resend.dev>",
        to: WAITLIST_TO,
        replyTo: email,
        subject: `New BEcomingYOU waitlist signup — ${name}`,
        html: `
        <table>
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || "Not provided")}</td></tr>
        </table>
      `,
      });

      if (error) {
        console.error("Waitlist email failed:", error);
        if (!sheetSaved) return saveError();
      }
    } else if (!sheetSaved) {
      console.error("Waitlist has no sheet webhook and no Resend API key");
      return saveError();
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      {
        error:
          "Could not save your signup. Please email tanya@meshcoaching.com directly.",
      },
      { status: 502 }
    );
  }
}
