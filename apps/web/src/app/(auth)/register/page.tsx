"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteNav } from "@/components/ui/site-nav";
import { useRegister } from "@/features/auth/hooks/use-auth";
import { toast } from "sonner";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type View = "oauth" | "step1" | "step2";

// ─── Step dots (only shown during email steps) ────────────────────────────────

function StepDots({ view }: { view: View }) {
  if (view === "oauth") return null;
  return (
    <div className="mb-7 flex items-center justify-center gap-2">
      {(["step1", "step2"] as View[]).map((v) => (
        <motion.div
          key={v}
          animate={{ width: view === v ? 20 : 6, opacity: view === v ? 1 : 0.25 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-1.5 rounded-full bg-white"
        />
      ))}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#E3E3E3" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#E3E3E3" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#E3E3E3" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#E3E3E3" />
    </svg>
  );
}

// ─── Shared slide variants ────────────────────────────────────────────────────

const slideIn  = { opacity: 0, x: 24 };
const slideOut = { opacity: 0, x: -24 };
const visible  = { opacity: 1, x: 0 };
const transition = { duration: 0.25, ease: [0.16, 1, 0.3, 1] as number[] };

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const [view, setView]   = useState<View>("oauth");
  const [form, setForm]   = useState({ display_name: "", username: "", email: "", password: "" });
  const [agreed, setAgreed] = useState(false);

  const register = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { toast.error("Please accept the Terms of Service to continue."); return; }
    register.mutate(form, {
      onError: (err: unknown) => {
        const msg =
          (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
          "Registration failed. Please try again.";
        toast.error(msg);
      },
    });
  };

  const heading = {
    oauth: "Create your account",
    step1: "Set up your identity",
    step2: "Secure your account",
  }[view];

  const subheading = {
    oauth: "Start free. Earn your standing through contribution.",
    step1: "Choose how the community sees you.",
    step2: "Your password is hashed. Your email is never sold.",
  }[view];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-4 font-sans selection:bg-white/20">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="spotlight-orb absolute right-0 top-1/3 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[120px]" />
      </div>
      <style jsx>{`
        @keyframes spotlight-pan {
          0%   { transform: translate(40%,-40%) scale(1);    opacity:.8; }
          50%  { transform: translate(20%,-28%) scale(1.1);  opacity:1;  }
          100% { transform: translate(40%,-40%) scale(1);    opacity:.8; }
        }
        .spotlight-orb { animation: spotlight-pan 15s ease-in-out infinite alternate; }
      `}</style>

      {/* Top-left nav */}
      <div className="fixed left-5 top-5 z-50 flex items-center gap-3">
        <Link href="/" className="group flex items-center justify-center">
          <Image
            src="/MainSoloIcon.svg"
            alt="Ascendra"
            width={28}
            height={40}
            style={{ height: 34, width: "auto", filter: "brightness(0) invert(1)" }}
            className="opacity-80 transition-opacity duration-200 group-hover:opacity-100"
          />
        </Link>
        <div className="h-5 w-px bg-white/10" />
        <SiteNav />
      </div>

      {/* Card */}
      <div className="z-10 flex w-full max-w-[440px] flex-col items-center py-24 animate-in fade-in duration-500">

        {/* Wordmark */}
        <div className="mb-7 flex justify-center">
          <Image
            src="/AscendraIconLogo.svg"
            alt="Ascendra"
            width={160}
            height={45}
            style={{ height: 36, width: "auto", filter: "brightness(0) invert(1)" }}
            priority
            loading="eager"
          />
        </div>

        {/* Free badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-medium tracking-wide text-white/50">
            Free forever · No credit card required
          </span>
        </div>

        {/* Heading — animates on view change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heading}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -6 }}
            transition={transition}
            className="mb-7 flex flex-col items-center gap-1.5 text-center"
          >
            <h1 className="text-[26px] font-bold tracking-tight text-white">{heading}</h1>
            <p className="text-[13px] text-zinc-500">{subheading}</p>
          </motion.div>
        </AnimatePresence>

        {/* Step dots */}
        <StepDots view={view} />

        {/* Form area */}
        <div className="w-full">
          <AnimatePresence mode="wait">

            {/* ── OAuth view ── */}
            {view === "oauth" && (
              <motion.div
                key="oauth"
                initial={slideOut}
                animate={visible}
                exit={slideOut}
                transition={transition}
                className="flex flex-col gap-3"
              >
                {/* OAuth row */}
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    className="h-[46px] flex-1 rounded-xl bg-[#18181b] text-[13px] font-normal text-[#a1a1aa] transition-colors hover:bg-[#27272a] hover:text-white"
                    onClick={() => toast.info("GitHub sign-up coming soon")}
                  >
                    <GithubIcon className="mr-2.5 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-[46px] flex-1 rounded-xl bg-[#18181b] text-[13px] font-normal text-[#a1a1aa] transition-colors hover:bg-[#27272a] hover:text-white"
                    onClick={() => toast.info("Google sign-up coming soon")}
                  >
                    <GoogleIcon className="mr-2.5 h-4 w-4" />
                    Google
                  </Button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-[#27272a]" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">or</span>
                  <div className="h-px flex-1 bg-[#27272a]" />
                </div>

                {/* Email CTA */}
                <Button
                  onClick={() => setView("step1")}
                  className="h-[46px] w-full rounded-xl bg-white text-[14px] font-medium text-black transition-colors hover:bg-zinc-200"
                >
                  Continue with Email
                </Button>

                {/* Economy hint */}
                <div className="mt-1 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-slate-800/60 text-[9px] font-bold tracking-wide text-slate-300">
                    L1
                  </div>
                  <p className="text-[11.5px] leading-relaxed text-zinc-500">
                    Everyone starts as a <span className="font-medium text-zinc-300">Learner</span>. Climb to Contributor, Mentor, Expert, and Master through validated contributions — never by paying.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── Step 1: Identity ── */}
            {view === "step1" && (
              <motion.form
                key="step1"
                initial={slideIn}
                animate={visible}
                exit={slideOut}
                transition={transition}
                onSubmit={(e) => { e.preventDefault(); setView("step2"); }}
                className="flex flex-col gap-4"
              >
                {/* Display name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="display_name" className="ml-1 text-[13px] font-medium text-zinc-400">
                    Display name
                  </Label>
                  <Input
                    id="display_name"
                    name="display_name"
                    value={form.display_name}
                    onChange={handleChange}
                    className="h-[46px] rounded-xl border-zinc-800 bg-[#18181b] px-4 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-600"
                    placeholder="How you'll appear to others"
                    required
                  />
                </div>

                {/* Username */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="username" className="ml-1 text-[13px] font-medium text-zinc-400">
                    Username
                  </Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 select-none text-[13px] text-zinc-600">
                      @
                    </span>
                    <Input
                      id="username"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      className="h-[46px] rounded-xl border-zinc-800 bg-[#18181b] pl-8 pr-4 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-600"
                      placeholder="your_handle"
                      pattern="^[a-zA-Z0-9_-]+$"
                      minLength={3}
                      maxLength={50}
                      required
                    />
                  </div>
                  <p className="ml-1 text-[11px] text-zinc-600">3–50 chars · letters, numbers, - and _ only</p>
                </div>

                <div className="mt-1 flex flex-col gap-2.5">
                  <Button
                    type="submit"
                    className="h-[46px] w-full rounded-xl bg-white text-[14px] font-medium text-black transition-colors hover:bg-zinc-200"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setView("oauth")}
                    className="h-[46px] w-full rounded-xl text-[13px] text-zinc-400 transition-colors hover:bg-[#18181b] hover:text-white"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to options
                  </Button>
                </div>
              </motion.form>
            )}

            {/* ── Step 2: Credentials ── */}
            {view === "step2" && (
              <motion.form
                key="step2"
                initial={slideIn}
                animate={visible}
                exit={slideOut}
                transition={transition}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="ml-1 text-[13px] font-medium text-zinc-400">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="h-[46px] rounded-xl border-zinc-800 bg-[#18181b] px-4 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-600"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password" className="ml-1 text-[13px] font-medium text-zinc-400">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="h-[46px] rounded-xl border-zinc-800 bg-[#18181b] px-4 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-600"
                    placeholder="Min. 8 characters"
                    minLength={8}
                    required
                  />
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.1]">
                  <div className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-zinc-700 bg-[#18181b] checked:border-white checked:bg-white"
                    />
                    <svg
                      className="pointer-events-none absolute h-2.5 w-2.5 text-black opacity-0 peer-checked:opacity-100"
                      fill="none" viewBox="0 0 12 10" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M1 5l3.5 3.5L11 1" />
                    </svg>
                  </div>
                  <span className="text-[12px] leading-relaxed text-zinc-500">
                    I agree to the{" "}
                    <Link href="/terms" onClick={(e) => e.stopPropagation()} className="text-zinc-300 underline-offset-4 hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" onClick={(e) => e.stopPropagation()} className="text-zinc-300 underline-offset-4 hover:underline">Privacy Policy</Link>
                    . Standing is earned through contribution — never purchased.
                  </span>
                </label>

                <div className="mt-1 flex flex-col gap-2.5">
                  <Button
                    type="submit"
                    className="h-[46px] w-full rounded-xl bg-white text-[14px] font-medium text-black transition-colors hover:bg-zinc-200"
                    disabled={register.isPending}
                  >
                    {register.isPending
                      ? <Loader2 className="h-4 w-4 animate-spin text-zinc-600" />
                      : "Create account"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setView("step1")}
                    className="h-[46px] w-full rounded-xl text-[13px] text-zinc-400 transition-colors hover:bg-[#18181b] hover:text-white"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </div>
              </motion.form>
            )}

          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-[12px] text-zinc-600">
          Already have an account?{" "}
          <Link href="/login" className="text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
