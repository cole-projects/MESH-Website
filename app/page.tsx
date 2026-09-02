"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.12.18 2.12.18v2.33h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.91h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const PHONE = "1-562-714-9917";
const PHONE_TEL = "+15627149917";
const EMAIL = "tanya@meshcoaching.com";
const CALL_LINK = `tel:${PHONE_TEL}`;
const TEL_LINK = CALL_LINK;
const TANYATALK_URL = "https://www.tanya-talk.com";
const DISPLAY_PHONE = "562-714-9917";

/** Phones / touch devices (Instagram bio traffic) vs desktop. */
function useIsPhoneDevice() {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 768px), (hover: none) and (pointer: coarse)"
    );
    const sync = () => setIsPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isPhone;
}

/** Mobile: tap-to-call. Desktop: click reveals the number. */
function PhoneCta({
  label,
  className,
  revealedClassName,
  icon = false,
}: {
  label: string;
  className: string;
  revealedClassName: string;
  icon?: boolean;
}) {
  const isPhone = useIsPhoneDevice();
  const [revealed, setRevealed] = useState(false);

  if (isPhone) {
    return (
      <a href={CALL_LINK} className={className}>
        {icon && <Phone className="h-4 w-4 shrink-0" />}
        {label}
      </a>
    );
  }

  if (revealed) {
    return (
      <div className={revealedClassName}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-mesh-soft sm:text-xs">
          Call or text Tanya
        </p>
        <p className="font-display text-base font-semibold leading-tight tracking-wide sm:text-xl">
          {DISPLAY_PHONE}
        </p>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setRevealed(true)} className={className}>
      {icon && <Phone className="h-4 w-4 shrink-0" />}
      {label}
    </button>
  );
}

const navLinks = [
  { label: "Home", id: "hero", href: null },
  { label: "Inner Circle", id: "becomingyou", href: null },
  { label: "Meet Tanya", id: "meet-tanya", href: null },
  { label: "Packages", id: "packages", href: null },
  { label: "TanyaTalk", id: null, href: "/tanyatalk" },
  { label: "I'm Interested", id: "waitlist", href: null },
];

const pillars = [
  {
    label: "Mental Health",
    quote: "Learning to use it, so that you are not used by it.",
  },
  {
    label: "Emotional Health",
    quote: "Energy in motion — learn to source the energy you want to bring to your life.",
  },
  {
    label: "Spiritual Health",
    quote: "The only way out, is in — tap into your inner guidance beyond conceptual thinking.",
  },
];

const tanyaTags = [
  "Neuroscience",
  "Identity Transformation",
  "Spiritual Growth",
  "Perspective Shifts",
  "Emotional Regulation",
];

const tanyaBadges = [
  "Coaches beside you, not above you",
  "Holds space while moving you forward",
];

const packages = [
  {
    name: "TanyaTalk",
    duration: "On-demand coaching",
    description:
      "Master-level coaching in your pocket — available 24/7 on iMessage when life gets loud and you need a clear next step.",
    includes: [
      "Unlimited text access to TanyaTalk",
      "Real-time guidance between sessions",
      "Remembers your story and patterns",
    ],
    cta: "Check out TanyaTalk",
    href: TANYATALK_URL,
    external: true,
    revealPhone: false,
    featured: false,
  },
  {
    name: "BEcomingYOU Self-Paced",
    duration: "Online course + TanyaTalk",
    description:
      "Work through the BEcomingYOU modules on your own timeline, with TanyaTalk support so you never integrate alone.",
    includes: [
      "Full BEcomingYOU online course modules",
      "Self-paced access — go at your rhythm",
      "TanyaTalk included for ongoing support",
    ],
    cta: "I'm Interested",
    href: "#waitlist",
    external: false,
    revealPhone: false,
    featured: false,
  },
  {
    name: "Inner Circle",
    duration: "16 weeks · All-encompassing",
    description:
      "Everything in Self-Paced, plus live partnership — the full container for lasting change with Tanya beside you.",
    includes: [
      "Everything in BEcomingYOU Self-Paced",
      "Monthly private 1:1 coaching sessions",
      "Weekly live group coaching calls",
      "TanyaTalk included throughout",
    ],
    cta: "I'm Interested",
    href: "#waitlist",
    external: false,
    revealPhone: false,
    featured: true,
  },
];

const testimonials = [
  {
    id: "shivali",
    name: "Shivali",
    city: "",
    text: "Tanya I think you may just have saved my marriage lol. Something has definitely shifted in my brain.",
  },
  {
    id: "marggie",
    name: "Marggie",
    city: "",
    text: "Just wanted to come in here and share that I just had my first 1:1 coaching call today. My coach is Tanya and I can't really articulate how amazing that call was. I'd venture to say that call alone was worth $6,000.00. Thank you from the bottom of my heart, Tanya!!!",
  },
  {
    id: "anon1",
    name: "Anonymous",
    city: "Long Beach, CA",
    text: "Tanya is a complete package, so genuine, experienced and able to read the room and know what to do with it.",
  },
  {
    id: "anon2",
    name: "Anonymous",
    city: "",
    text: "One of the most valuable hours of my life each week. So much appreciation Tanya.",
  },
  {
    id: "anon3",
    name: "Anonymous",
    city: "Fort Wayne, IN",
    text: "Tanya's warmth and non-judgmental presence make it easy to open up. Her intuitive questions helped me see myself in a completely new way.",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function wrapOffset(value: number, count: number) {
  const half = count / 2;
  let offset = value;
  while (offset > half) offset -= count;
  while (offset <= -half) offset += count;
  return offset;
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-mesh-dark/95 py-3 shadow-lg backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToId("hero")}
            className="flex items-center gap-3 shrink-0"
            aria-label="Mesh Coaching home"
          >
            <img
              src="/spiral.png"
              alt="Mesh Coaching spiral"
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-xl font-semibold text-white tracking-wide leading-none">
              Mesh Coaching
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) =>
              link.href ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm font-medium text-white/80 hover:text-mesh-soft transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.id}
                  onClick={() => scrollToId(link.id!)}
                  className="font-sans text-sm font-medium text-white/80 hover:text-mesh-soft transition-colors tracking-wide"
                >
                  {link.label}
                </button>
              )
            )}
            <PhoneCta
              label="Call or text Tanya directly"
              icon
              className="flex items-center gap-2 rounded-full border border-white/50 bg-mesh/20 px-5 py-2.5 text-sm font-semibold text-white shadow-md backdrop-blur-sm transition hover:bg-mesh/40 hover:border-white/70"
              revealedClassName="rounded-full border border-white/50 bg-mesh/20 px-5 py-2 text-center text-white shadow-md backdrop-blur-sm"
            />
          </div>

          {/* Mobile hamburger */}
          <button
            className="p-2 text-white lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-[68px] bg-mesh-ink transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-6">
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 pb-4 text-left font-display text-2xl font-light text-white"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.id}
                onClick={() => { scrollToId(link.id!); setOpen(false); }}
                className="border-b border-white/10 pb-4 text-left font-display text-2xl font-light text-white"
              >
                {link.label}
              </button>
            )
          )}
          <PhoneCta
            label="Call or text Tanya directly"
            className="mt-2 rounded-full border border-white/50 bg-mesh/30 py-4 text-center text-base font-semibold text-white"
            revealedClassName="mt-2 rounded-full border border-white/50 bg-mesh/30 px-6 py-4 text-center text-white"
          />
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-beach.png')" }}
      />
      <div className="absolute inset-0 z-10 bg-mesh-ink/55" />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl text-white md:max-w-4xl xl:max-w-5xl"
        >
          <p className="mb-3 font-display text-2xl font-semibold tracking-wide text-white sm:text-3xl md:text-4xl xl:text-5xl">
            Mesh Coaching
          </p>
          <h1 className="font-display text-4xl font-light leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Looking for the 16-week
            <br />
            <span className="italic text-mesh-soft">BEcomingYOU program?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl md:max-w-3xl xl:text-2xl">
            No commitment. Drop your info and Tanya will reach out personally when BEcomingYOU opens.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => scrollToId("waitlist")}
              className="inline-flex items-center justify-center rounded-full bg-mesh px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:bg-mesh-deep sm:text-lg xl:px-10 xl:py-5 xl:text-xl"
            >
              I&apos;m Interested
            </button>
            <button
              type="button"
              onClick={() => scrollToId("becomingyou")}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/20 sm:text-lg xl:px-10 xl:py-5 xl:text-xl"
            >
              Want to learn more?
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-8 w-8 text-white/50" />
      </motion.div>
    </section>
  );
}

/* ── Mental / Emotional / Spiritual ── */
function MESSection() {
  return (
    <section className="bg-ivory overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center">
          {/* Spiral */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex shrink-0 items-center justify-center lg:w-2/5"
          >
            <img
              src="/spiral.png"
              alt="Mesh Coaching spiral"
              className="w-full max-w-[320px] md:max-w-[420px]"
            />
          </motion.div>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-3/5"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-mesh">
              The Mesh Approach
            </p>
            <h2 className="font-display text-4xl font-light leading-tight text-stone md:text-5xl">
              Here to empower you
              <br />
              <span className="italic text-mesh-deep">to live simply happy.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone/65 md:text-lg">
              Guided by truth, rooted in your knowing, consciously connected,
              inspired and ignited by your inner purpose.
            </p>

            <div className="mt-10 space-y-6">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-5 rounded-2xl border border-mesh-light bg-white p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mesh-pale ring-1 ring-mesh-light">
                    <span className="text-sm font-bold text-mesh">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-stone">
                      {p.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed italic text-stone/65">
                      &ldquo;{p.quote}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Who Is Tanya ── */
function WhoIsTanya() {
  return (
    <section id="meet-tanya" className="bg-white overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mesh">
            Meet Your Coach
          </p>
          <h2 className="mt-3 font-display text-4xl font-light text-stone md:text-5xl">
            Who is Tanya?
          </h2>
        </div>

        <div className="flex flex-col items-start gap-16 lg:flex-row">
          {/* Left: photo + certs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:w-2/5"
          >
            <div className="relative w-full max-w-sm">
              <img
                src="/tanya-who.png"
                alt="Tanya smiling, seated on red brick steps"
                className="w-full rounded-2xl object-cover shadow-xl ring-1 ring-mesh-light"
              />
            </div>
            {/* Cert badges */}
            <div className="mt-7 w-full max-w-sm rounded-2xl bg-mesh-pale px-6 py-5 ring-1 ring-mesh-light">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-mesh-deep">
                Tanya&apos;s Professional Certifications
              </p>
              <div className="flex items-center justify-center gap-6">
                <img src="/icf-badge.png" alt="ICF International Coaching Federation" className="h-20 w-auto" />
                <img src="/pcc-cert.webp" alt="ICF PCC Professional Certified Coach" className="h-20 w-auto" />
              </div>
            </div>
          </motion.div>

          {/* Right: bio content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-3/5"
          >
            <p className="text-base leading-relaxed text-stone/85 md:text-lg">
              Tanya Wannemacher began as an elementary school teacher before
              pursuing an ICF accredited Professional Coaching Degree. Today, as
              a professional level coach, she helps you see the world through a
              completely different lens, so you show up empowered in every area
              of your life. When who you want to become and the identity you hold
              don&apos;t fully match yet, Tanya helps you close that gap.
            </p>

            {/* Tags */}
            <div className="mt-7 flex flex-wrap gap-2">
              {tanyaTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-mesh-pale px-4 py-1.5 text-sm font-medium text-mesh-dark ring-1 ring-mesh-light"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-mesh-pale px-4 py-6 text-center ring-1 ring-mesh-light">
                <span className="font-display text-3xl font-semibold text-mesh-deep">~10 yrs</span>
                <span className="text-sm text-stone/65">years of experience</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-mesh-pale px-4 py-6 text-center ring-1 ring-mesh-light">
                <span className="font-display text-3xl font-semibold text-mesh-deep">2,000+</span>
                <span className="text-sm text-stone/65">hours of coaching</span>
              </div>
            </div>

            {/* Core belief */}
            <div className="mt-6 rounded-2xl bg-mesh-pale px-6 py-5 ring-1 ring-mesh-light">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-mesh">
                Her Core Belief
              </p>
              <p className="text-base leading-relaxed text-stone md:text-lg">
                Your alignment begins the moment you stop outsourcing your peace,
                worth, and happiness to the outside world.
              </p>
            </div>

            {/* Style badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tanyaBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-mesh-light/60 px-4 py-1.5 text-sm font-medium text-mesh-dark ring-1 ring-mesh-light"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Closing line */}
            <p className="mt-8 text-center text-base font-semibold leading-relaxed text-stone md:text-left md:text-lg">
              Tanya&apos;s methodologies help you listen to that little whisper in
              your soul telling you that you were meant for something more&hellip;{" "}
              let&apos;s go get it!!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Packages ── */
function Packages() {
  const isPhone = useIsPhoneDevice();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  return (
    <section id="packages" className="bg-ivory overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mesh">
            Work With Tanya
          </p>
          <h2 className="mt-3 font-display text-4xl font-light text-stone md:text-5xl">
            Coaching Packages
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone/65 md:text-lg">
            It&apos;s time to take that step&hellip; together.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => {
            const showPhone = pkg.revealPhone && !isPhone && revealed[pkg.name];
            const buttonClass = `mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
              pkg.featured
                ? "bg-mesh text-white hover:bg-mesh-deep"
                : "border border-mesh text-mesh hover:bg-mesh-pale"
            }`;
            const revealedBoxClass = `mt-8 rounded-full px-6 py-3 text-center ${
              pkg.featured
                ? "bg-white/10 ring-1 ring-white/25 text-white"
                : "bg-mesh-pale ring-1 ring-mesh-light text-stone"
            }`;

            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl p-8 shadow-sm transition hover:-translate-y-1 ${
                  pkg.featured
                    ? "bg-mesh-dark text-white ring-2 ring-mesh"
                    : "bg-white ring-1 ring-mesh-light"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mesh px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
                    Most Complete
                  </span>
                )}
                <p className={`mb-1 text-xs font-bold uppercase tracking-widest ${pkg.featured ? "text-mesh-soft" : "text-mesh"}`}>
                  {pkg.duration}
                </p>
                <h3 className={`font-display text-2xl font-semibold ${pkg.featured ? "text-white" : "text-stone"}`}>
                  {pkg.name}
                </h3>
                <p className={`mt-4 text-sm leading-relaxed ${pkg.featured ? "text-white/75" : "text-stone/65"}`}>
                  {pkg.description}
                </p>
                <ul className={`mt-5 flex-1 space-y-2.5 ${pkg.featured ? "text-white/80" : "text-stone/70"}`}>
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-snug">
                      <CheckCircle className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.featured ? "text-mesh-soft" : "text-mesh"}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {pkg.href?.startsWith("#") ? (
                  <button
                    type="button"
                    onClick={() => scrollToId(pkg.href!.slice(1))}
                    className={buttonClass}
                  >
                    {pkg.cta}
                  </button>
                ) : pkg.href ? (
                  <a
                    href={pkg.href}
                    {...(pkg.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={buttonClass}
                  >
                    {pkg.cta}
                  </a>
                ) : pkg.revealPhone && isPhone ? (
                  <a href={CALL_LINK} className={buttonClass}>
                    {pkg.cta}
                  </a>
                ) : showPhone ? (
                  <div className={revealedBoxClass}>
                    <p className={`text-xs font-medium uppercase tracking-wider ${pkg.featured ? "text-mesh-soft" : "text-mesh"}`}>
                      Call or text Tanya
                    </p>
                    <p className={`mt-1 font-display text-xl font-semibold tracking-wide ${pkg.featured ? "text-white" : "text-stone"}`}>
                      {DISPLAY_PHONE}
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRevealed((prev) => ({ ...prev, [pkg.name]: true }))}
                    className={buttonClass}
                  >
                    {pkg.cta}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Beach Photo CTA ── */
function BeachCTA() {
  const isPhone = useIsPhoneDevice();
  const [revealed, setRevealed] = useState(false);

  const content = (
    <div className="relative">
      <img
        src="/tanya-beach.png"
        alt="Tanya on the beach at sunset, arms open toward the ocean"
        className="h-[60vh] w-full object-cover object-[center_35%] transition duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-mesh-ink/30 transition group-hover:bg-mesh-ink/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-3xl font-light italic text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            &ldquo;The only way out, is in.&rdquo;
          </p>
          <p className="mt-3 text-sm font-medium tracking-widest text-white/70 uppercase drop-shadow">
            — Gunot Diaz
          </p>
          {revealed && !isPhone ? (
            <div className="mt-8 inline-flex flex-col items-center rounded-full border border-white/60 bg-white/15 px-7 py-3 text-white backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-mesh-soft">
                Call or text Tanya
              </p>
              <p className="font-display text-xl font-semibold tracking-wide">{DISPLAY_PHONE}</p>
            </div>
          ) : (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/15 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition group-hover:bg-white/25">
              <Phone className="h-4 w-4" />
              Call or text Tanya directly
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden">
      {isPhone ? (
        <a href={CALL_LINK} aria-label="Call or text Tanya directly" className="group block">
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          aria-label="Reveal Tanya's phone number"
          className="group block w-full cursor-pointer text-left"
        >
          {content}
        </button>
      )}
    </section>
  );
}

/* ── Inner Circle / BecomingYOU ── */
const innerCircleAccess = [
  {
    title: "Full BEcomingYOU online course modules",
    detail:
      "Work through the complete curriculum on identity, nervous system patterns, emotional healing, and how you experience life — at a pace that supports real integration.",
  },
  {
    title: "Unlimited private text access",
    detail:
      "Real-time support during decision points, emotional spirals, identity wobbles, and expansion edges — you don't wait for your next session to recalibrate.",
  },
  {
    title: "Bi-weekly private 1:1 coaching",
    detail:
      "Twice-monthly deep recalibration sessions focused on identity, regulation, clarity, strategy, and practical execution.",
  },
  {
    title: "One live group call each week",
    detail:
      "A high-level teaching and coaching room with structure, shared insight, and a values-aligned community.",
  },
  {
    title: "Full access to recorded group calls",
    detail:
      "A living vault of teachings, recalibration tools, embodiment work, and pattern-disruption support.",
  },
];

function BecomingYOU() {
  return (
    <section id="becomingyou" className="bg-ivory overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mesh">
            BEcomingYOU · The Inner Circle
          </p>
          <h2 className="mt-3 font-display text-4xl font-light leading-tight text-stone md:text-5xl">
            A 16-week Strategic SOULution™
            <br />
            <span className="italic text-mesh-deep">concierge partnership</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone/70 md:text-lg">
            High-touch partnership — not a program you passively consume. Strategic SOULution™ work
            applied directly to your relationships, decisions, money, body, boundaries, and purpose.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          {innerCircleAccess.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-l-2 border-mesh pl-5"
            >
              <h3 className="font-display text-xl font-semibold text-stone">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone/65 md:text-base">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-14 max-w-3xl text-center"
        >
          <p className="text-base leading-relaxed text-stone/75 md:text-lg">
            Limited to <span className="font-semibold text-stone">10 clients</span>.{" "}
            <span className="font-semibold text-stone">TanyaTalk is included</span> — coaching in your
            pocket between every group call, 24/7 on iMessage.{" "}
            <Link
              href="/tanyatalk"
              className="text-mesh underline decoration-mesh/40 underline-offset-2 transition hover:text-mesh-deep"
            >
              Learn more about TanyaTalk →
            </Link>
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToId("waitlist")}
              className="inline-flex items-center justify-center rounded-full bg-mesh px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-mesh-deep"
            >
              I'm Interested
            </button>
            <span className="text-sm font-medium text-stone/45">or</span>
            <div className="inline-flex flex-col items-center rounded-full bg-mesh-pale px-6 py-3 text-stone ring-1 ring-mesh-light">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-mesh sm:text-xs">
                Call or text Tanya
              </p>
              <p className="font-display text-base font-semibold leading-tight tracking-wide sm:text-xl">
                {DISPLAY_PHONE}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── FAQ Teaser ── */
function FAQTeaser() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-mesh-light bg-mesh-pale px-8 py-8 text-center sm:flex-row sm:text-left"
        >
          <div>
            <p className="font-display text-xl font-medium text-stone sm:text-2xl">
              Have questions before you start?
            </p>
            <p className="mt-1 text-sm text-stone/60">
              We&apos;ve answered the most common ones in one place.
            </p>
          </div>
          <Link
            href="/faq"
            className="shrink-0 rounded-full border border-mesh bg-white px-6 py-3 text-sm font-semibold text-mesh shadow-sm transition hover:bg-mesh hover:text-white"
          >
            View FAQ →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Testimonials Carousel (adapted from Ben Fry) ── */
function TestimonialsCarousel() {
  const count = testimonials.length;
  const [active, setActive] = useState(0);
  const [drift, setDrift] = useState(0);
  const [compact, setCompact] = useState(false);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(0);
  const driftRef = useRef(0);

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { driftRef.current = drift; }, [drift]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  function clearResumeTimer() {
    if (resumeTimerRef.current) { clearTimeout(resumeTimerRef.current); resumeTimerRef.current = null; }
  }

  function pauseForInteraction() {
    pausedRef.current = true;
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => { pausedRef.current = false; resumeTimerRef.current = null; }, 3000);
  }

  function goTo(nextIndex: number) {
    const normalized = ((nextIndex % count) + count) % count;
    setActive(normalized); setDrift(0);
    activeRef.current = normalized; driftRef.current = 0;
    pauseForInteraction();
  }

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const driftPerSecond = 1 / 7;

    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!pausedRef.current) {
        let nextDrift = driftRef.current + driftPerSecond * delta;
        let nextActive = activeRef.current;
        while (nextDrift >= 1) { nextDrift -= 1; nextActive = (nextActive + 1) % count; }
        if (nextActive !== activeRef.current) { activeRef.current = nextActive; setActive(nextActive); }
        driftRef.current = nextDrift; setDrift(nextDrift);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); clearResumeTimer(); };
  }, [count]);

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mesh">
            Client Stories
          </p>
          <h2 className="mt-3 font-display text-4xl font-light text-stone md:text-5xl">
            What people are saying
          </h2>
        </div>

        <div
          className="relative flex items-center gap-2 sm:gap-4"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <button
            type="button"
            onClick={() => goTo(activeRef.current - 1)}
            aria-label="Previous testimonial"
            className="z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mesh-light bg-white text-mesh shadow-md transition hover:bg-mesh hover:text-white sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            className="relative h-[340px] w-full overflow-visible md:h-[320px]"
            style={{ perspective: "1200px" }}
            onMouseEnter={() => { pausedRef.current = true; clearResumeTimer(); }}
            onMouseLeave={() => pauseForInteraction()}
          >
            {testimonials.map((t, i) => {
              const offset = wrapOffset(i - active - drift, count);
              const abs = Math.abs(offset);
              const isFront = abs < 0.45;
              const x = offset * (compact ? 40 : 56);
              const scale = 1 - Math.min(abs, 1) * 0.18;
              const opacity = abs < 0.45 ? 1 : Math.max(0.2, 1 - abs * 0.58);
              const rotateY = offset * -26;
              const z = 20 - abs * 10;

              return (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Testimonial from ${t.name}`}
                  aria-current={isFront}
                  onClick={() => { if (!isFront) goTo(i); else pauseForInteraction(); }}
                  className="absolute top-1/2 left-1/2 w-[min(92%,300px)] rounded-2xl border border-mesh-light bg-white p-6 text-left shadow-xl will-change-transform sm:w-[340px] md:w-[380px] md:p-8"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${x}%) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex: Math.round(z),
                    filter: isFront ? "none" : "blur(0.35px)",
                    pointerEvents: abs < 1.25 ? "auto" : "none",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className={`flex h-full min-h-[220px] flex-col transition-opacity duration-300 ${isFront ? "opacity-100" : "opacity-35"}`}>
                    {/* Large opening quote */}
                    <span className="pointer-events-none absolute -top-3 left-4 select-none font-serif text-[5rem] leading-none text-mesh-light">
                      &ldquo;
                    </span>
                    <p className="relative flex-1 pt-4 font-sans text-sm leading-relaxed text-stone/80 md:text-base">
                      {t.text}
                    </p>
                    <div className="mt-5 border-t border-mesh-light pt-4">
                      <p className="font-display text-base font-semibold text-stone md:text-lg">
                        — {t.name}
                      </p>
                      {t.city && (
                        <p className="mt-0.5 text-xs text-stone/50 md:text-sm">{t.city}</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeRef.current + 1)}
            aria-label="Next testimonial"
            className="z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mesh-light bg-white text-mesh shadow-md transition hover:bg-mesh hover:text-white sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-mesh" : "w-2 bg-mesh-light"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Waitlist ── */
function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload.error || "Something went wrong.");
      }
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email tanya@meshcoaching.com directly."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="waitlist" className="overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-mesh-dark p-10 text-white md:p-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mesh-soft">
            BEcomingYOU · Inner Circle
          </p>
          <h2 className="mt-4 mb-6 font-display text-4xl font-light text-white md:text-5xl">
            I'm interested
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-white/70">
            No commitment. If the 16-week BEcomingYOU program feels like the
            right fit when it opens, Tanya will reach out personally. Just drop
            your info and she'll take it from there.
          </p>
          <div className="space-y-8">
            <PhoneCta
              label="Call or text Tanya"
              icon
              className="flex items-center gap-3 text-left font-display text-lg text-white transition hover:text-mesh-soft"
              revealedClassName="rounded-xl bg-white/10 px-5 py-4 text-white"
            />
            <a href={`mailto:${EMAIL}`} className="flex items-start gap-5 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Mail className="h-5 w-5 text-mesh-soft" />
              </div>
              <div>
                <p className="font-display text-lg text-white">Email</p>
                <p className="mt-0.5 text-white/60 transition-colors group-hover:text-mesh-soft">{EMAIL}</p>
              </div>
            </a>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <a href="https://www.linkedin.com/in/tanya-wannamaker-0889b6ba/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-mesh">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/meshcoaching" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-mesh">
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/mesh_coaching/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-mesh">
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <form className="space-y-5 bg-white p-10 md:p-16" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <CheckCircle className="mb-4 h-12 w-12 text-mesh" />
              <h3 className="font-display text-2xl font-semibold text-stone">You&apos;re on the list</h3>
              <p className="mt-2 max-w-sm text-stone/65">
                Thank you. Tanya will be in touch when a BEcomingYOU founding spot opens.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone/75">Full Name</label>
                <input required name="name" type="text" autoComplete="name" className="w-full rounded-xl border border-mesh-light bg-mesh-pale px-4 py-3 outline-none transition focus:border-mesh focus:ring-2 focus:ring-mesh/20" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone/75">Email</label>
                <input required name="email" type="email" autoComplete="email" className="w-full rounded-xl border border-mesh-light bg-mesh-pale px-4 py-3 outline-none transition focus:border-mesh focus:ring-2 focus:ring-mesh/20" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-stone/75">Phone (optional)</label>
                <input name="phone" type="tel" placeholder="440-333-3333" autoComplete="tel" className="w-full rounded-xl border border-mesh-light bg-mesh-pale px-4 py-3 outline-none transition focus:border-mesh focus:ring-2 focus:ring-mesh/20" />
              </div>
              {error && <p className="text-sm font-medium text-red-500">{error}</p>}
              <button type="submit" disabled={sending} className="flex w-full items-center justify-center gap-2 rounded-full bg-mesh px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-mesh-deep disabled:opacity-70">
                {sending ? "Sending..." : "I'm Interested"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-mesh-ink pt-16 pb-8 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src="/spiral.png" alt="Mesh Coaching" className="h-10 w-10 object-contain" />
              <span className="font-display text-xl font-semibold text-white">Mesh Coaching</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Coaching the Human Spirit™<br />
              Tanya Wannemacher, CLC, PCC
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/50">Navigate</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <Link href={link.href} className="text-sm text-white/55 transition hover:text-mesh-soft">
                      {link.label}
                    </Link>
                  ) : (
                    <button onClick={() => scrollToId(link.id!)} className="text-sm text-white/55 transition hover:text-mesh-soft">
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/50">Contact</h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <a href={TEL_LINK} className="transition hover:text-mesh-soft">{PHONE}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="transition hover:text-mesh-soft">{EMAIL}</a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="https://www.linkedin.com/in/tanya-wannamaker-0889b6ba/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-mesh hover:text-white">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com/meshcoaching" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-mesh hover:text-white">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/mesh_coaching/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-mesh hover:text-white">
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Mesh Coaching. All Rights Reserved. — Coaching the Human Spirit™
        </div>
      </div>
    </footer>
  );
}

/* ── Main Page ── */
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <BecomingYOU />
      <MESSection />
      <WhoIsTanya />
      <Packages />
      <BeachCTA />
      <FAQTeaser />
      <TestimonialsCarousel />
      <Waitlist />
      <Footer />
    </div>
  );
}
