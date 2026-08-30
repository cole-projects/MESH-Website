import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
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
