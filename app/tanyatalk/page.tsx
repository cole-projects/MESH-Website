"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone } from "lucide-react";

const IMESSAGE_LINK = "sms:+13177282783&body=hey%20tanya";
const PHONE_TEL = "+15627149917";

const gaps = [
  {
    who: "Therapy",
    strength: "Deep emotional processing",
    problem: "Has a waitlist. No in-between session guidance.",
  },
  {
    who: "Friends & Family",
    strength: "Love and connection",
    problem: "Biased and based on their own fears.",
  },
  {
    who: "Google & Chatbots",
    strength: "Endless information",
    problem: "Broad purpose. Generic memory. Not specialized in transformation.",
  },
  {
    who: "Journaling",
    strength: "Self-reflection and awareness",
    problem: "Doesn't respond.",
  },
  {
    who: "Coaching",
    strength: "Powerful transformation",
    problem: "Not covered by insurance.",
  },
  {
    who: "Social Media",
    strength: "Inspiration",
    problem: "Dopamine hit without direction.",
  },
];

const bubbles = [
  "Available 24/7",
  "No scheduling",
  "Regain trust in yourself",
  "Remembers your story",
  "No diagnosis",
  "Guides your next step",
  "Professional support",
  "Master-level coaching",
  "Show up as you are",
  "Safe space to be honest",
];

function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[260px] sm:max-w-[280px]">
      <p className="mb-3 text-center text-sm font-medium text-stone/60">
        See TanyaTalk in action
      </p>
      {/* Phone frame */}
      <div className="rounded-[2.5rem] bg-gradient-to-b from-[#2a2a2d] to-[#080809] p-2 shadow-2xl ring-1 ring-white/10">
        <div className="overflow-hidden rounded-[2rem] bg-black">
          {/* Dynamic island */}
          <div className="flex justify-center py-2">
            <div className="h-6 w-24 rounded-full bg-black ring-1 ring-white/10" />
          </div>
          <video
            ref={videoRef}
            src="/tanya-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            className="demo-video block aspect-[9/19.5] w-full object-cover object-top"
            aria-label="TanyaTalk demo"
          />
        </div>
      </div>
    </div>
  );
}

export default function TanyaTalkPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Top bar */}
      <div className="border-b border-mesh-light bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 group">
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
            Text Tanya
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-bold uppercase tracking-[0.2em] text-mesh"
        >
          What is TanyaTalk?
        </motion.p>

        {/* Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4"
        >
          <h1 className="font-display text-3xl font-bold leading-tight text-stone sm:text-4xl md:text-5xl">
            You&apos;re spiraling. It&apos;s 2am. Nobody to call.
          </h1>
          <div className="mt-5 space-y-2">
            {[
              "Is this relationship worth saving?",
              "Am I even on the right path?",
              "Why does everyone else look fine?",
            ].map((q) => (
              <p key={q} className="text-lg leading-snug text-stone/55 sm:text-xl">
                {q}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Gaps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <p className="text-base font-semibold text-stone sm:text-lg">
            These options exist, but there are gaps.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {gaps.map(({ who, strength, problem }) => (
              <div
                key={who}
                className="rounded-2xl bg-white px-5 py-4 ring-1 ring-mesh-light shadow-sm"
              >
                <p className="text-sm font-semibold text-stone">{who}</p>
                <p className="mt-0.5 text-xs italic leading-snug text-stone/45">{strength}</p>
                <p className="mt-2 text-sm leading-snug text-stone/70">{problem}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Real stuff */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <p className="text-base font-semibold text-stone sm:text-lg">
            Nobody prepares you for the real stuff:
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3 text-base leading-relaxed text-stone/80 sm:text-lg">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mesh-soft" />
              Figuring out <em className="mx-1">how</em> to get what you want
            </li>
            <li className="flex items-start gap-3 text-base leading-relaxed text-stone/80 sm:text-lg">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mesh-soft" />
              Trusting your decisions
            </li>
            <li className="flex items-start gap-3 text-base font-semibold leading-relaxed text-mesh-deep sm:text-lg">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mesh" />
              Deciding who you&apos;re becoming
            </li>
          </ul>
        </motion.div>

        {/* What it is */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-base leading-relaxed text-stone/80 sm:text-lg"
        >
          TanyaTalk is a personal coaching experience backed by nearly a decade of
          professional-level expertise from Tanya Wannemacher, built on the full depth of
          her heart, available 24/7 right in your iMessage.
        </motion.p>

        {/* Demo video */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12"
        >
          <DemoVideo />
        </motion.div>

        {/* Feature bubbles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-2"
        >
          {bubbles.map((label, i) => (
            <span
              key={label}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone ring-1 ring-mesh-light shadow-sm"
              style={{
                animation: `float 3s ease-in-out ${-(i * 0.3).toFixed(2)}s infinite`,
              }}
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* Closing copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 space-y-6 text-base leading-relaxed text-stone/80 sm:text-lg"
        >
          <p>
            Whether you&apos;re working through something hard, building on something good, or
            simply trying to move through life with more intention, TanyaTalk is built to
            meet you there.
          </p>
          <p className="text-center text-lg font-semibold text-stone sm:text-xl">
            That&apos;s TanyaTalk, right in your pocket!
          </p>
        </motion.div>

        {/* Gold CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <a href={IMESSAGE_LINK} className="gold-cta">
            <span className="gold-cta__label">Start on iMessage</span>
          </a>
        </motion.div>

        {/* Included in BecomingYOU callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl border border-mesh-light bg-mesh-pale px-7 py-6 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-mesh">
            Also included in
          </p>
          <p className="mt-2 font-display text-xl font-semibold text-stone">
            BEcomingYOU — 16-week Inner Circle Program
          </p>
          <p className="mt-2 text-sm leading-relaxed text-stone/65">
            TanyaTalk access is bundled with the BEcomingYOU program so you have
            support between every group call.
          </p>
          <Link
            href="/#becomingyou"
            className="mt-4 inline-block text-sm font-semibold text-mesh hover:text-mesh-deep transition-colors"
          >
            Learn about BEcomingYOU →
          </Link>
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-mesh hover:text-mesh-deep transition-colors"
          >
            ← Back to Mesh Coaching
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
