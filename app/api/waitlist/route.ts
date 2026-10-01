import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const WAITLIST_TO = "sasshuub@gmail.com";
const SHEETS_WEBHOOK = process.env.WAITLIST_WEBHOOK_URL;

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

  try {
    // 1) Append to Google Sheet (if webhook is configured)
    if (SHEETS_WEBHOOK) {
      const sheetRes = await fetch(SHEETS_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      if (!sheetRes.ok) {
        const text = await sheetRes.text().catch(() => "");
        console.error("Waitlist sheet webhook failed:", sheetRes.status, text);
        return NextResponse.json(
          {
            error:
              "Could not save your signup. Please email tanya@meshcoaching.com directly.",
          },
          { status: 502 }
        );
      }
    } else {
      console.warn("WAITLIST_WEBHOOK_URL is not set — skipping Google Sheet write");
    }

    // 2) Also email Tanya/Cole (existing Resend flow)
    const { error } = await resend.emails.send({
      from: "MESH Waitlist <onboarding@resend.dev>",
      to: WAITLIST_TO,
      replyTo: email,
      subject: `New BEcomingYOU waitlist signup — ${name}`,
      html: `
        <table>
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone || "Not provided"}</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error("Waitlist email failed:", error);
      // Sheet may have saved — still surface email failure lightly
      if (!SHEETS_WEBHOOK) {
        return NextResponse.json(
          {
            error:
              "Could not send your signup. Please email tanya@meshcoaching.com directly.",
          },
          { status: 502 }
        );
      }
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
