"use client";

import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import Link from "next/link";

const PHONE_TEL = "+15627149917";

const faqs = [
  {
    q: "What is Life Coaching?",
    a: "Life coaching supports personal change and empowerment, helping individuals discover their authentic selves beyond roles and achievements. It creates space to awaken to your true self and uncover limiting beliefs while empowering inspired action toward your desired goals.",
  },
  {
    q: "What is a Life Coach?",
    a: "A life coach holds space for self-discovery through powerful questioning and deep listening. They help identify limiting patterns and support clients in navigating transitions while maintaining accountability to goals and values.",
  },
  {
    q: "What is the relationship between a Life Coach and client?",
    a: "The coach resembles a rowboat, creating the space for you to sit safely while you row and navigate. The coach witnesses your process, illuminates your gifts, and remains present through difficult times — without rescuing you from challenges.",
  },
  {
    q: "How is a Life Coach different from a Therapist or Counselor?",
    a: "Therapy addresses past trauma to return to baseline functioning; coaching optimizes performance from baseline toward your aspirations. Coaching focuses on discovering the root power of the present moment rather than past causes.",
  },
  {
    q: "How is a coach different from a friend?",
    a: "Coaches listen without judgment or personal opinions, hold space solely for you, and have no vested interest in specific outcomes — unlike friendships where mutual sharing and personal bias typically occur.",
  },
  {
    q: "Is coaching a fit for me?",
    a: "Coaching suits those experiencing self-judgment, perfectionism, comparison, people-pleasing, all-or-nothing thinking, or those seeking growth beyond baseline functioning. If you feel that whisper that you were meant for something more — coaching is for you.",
  },
  {
    q: "What types of issues can I work through with a Life Coach?",
    a: "Coaching addresses feelings of longing and discontent related to relationships, health, career, family, purpose, personal growth, and self-image — any area of life where you desire real, lasting change.",
  },
  {
    q: "How can I benefit from having Tanya as my coach?",
    a: "Tanya helps you connect with your inner wisdom, build confidence in your decision-making, and achieve your stated goals through deep facilitation and reflection. She coaches beside you, not above you.",
  },
  {
    q: "What are Tanya's credentials?",
    a: "Tanya holds ICF PCC (Professional Certified Coach) certification through the Coach For Life Institute and a Bachelor's degree in Child Development and Psychology from Cortland State University.",
  },
  {
    q: "What happens in a coaching session?",
    a: "Sessions involve powerful questioning, perspective-sharing, pattern recognition, and reflection. You set the agenda and commit to action steps in this fully collaborative process — every session is built around you.",
  },
  {
    q: "Where do sessions take place?",
    a: "Sessions take place via phone, Zoom, or in-person — wherever you feel most comfortable and present. Tanya meets you where you are.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-mesh-light last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-medium text-stone sm:text-xl">
          {q}
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-mesh transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-base leading-relaxed text-stone/70">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Simple top bar */}
      <div className="border-b border-mesh-light bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <img src="/spiral.png" alt="Mesh Coaching" className="h-9 w-9 object-contain" />
            <span className="font-display text-lg font-semibold text-stone group-hover:text-mesh transition-colors">
              Mesh Coaching
            </span>
          </Link>
          <a
            href={`sms:${PHONE_TEL}`}
            className="flex items-center gap-2 rounded-full border border-mesh bg-mesh-pale px-4 py-2 text-sm font-semibold text-mesh transition hover:bg-mesh hover:text-white"
          >
            <Phone className="h-4 w-4" />
            Call Tanya
          </a>
        </div>
      </div>

      {/* Header */}
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-10 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-mesh">
          Questions & Answers
        </p>
        <h1 className="mt-3 font-display text-4xl font-light text-stone sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone/65 sm:text-lg">
          Everything you need to know before taking that first step.
        </p>
      </div>

      {/* Accordion */}
      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mesh-light sm:p-10">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl bg-mesh-dark p-8 text-center text-white sm:p-12">
          <p className="font-display text-2xl font-light sm:text-3xl">
            Still have questions?
          </p>
          <p className="mt-3 text-white/65">
            Tanya is happy to connect directly.
          </p>
          <a
            href={`sms:${PHONE_TEL}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/15 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            <Phone className="h-4 w-4" />
            Call or text Tanya directly
          </a>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-mesh hover:text-mesh-deep transition-colors"
          >
            ← Back to Mesh Coaching
          </Link>
        </div>
      </div>
    </div>
  );
}
