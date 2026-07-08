"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteNav } from "@/components/ui/site-nav";
import { useForgotPassword } from "@/features/auth/hooks/use-auth";
import { toast } from "sonner";
import { Loader2, ArrowLeft, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const forgotPassword = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword.mutate(
      { email },
      {
        onSuccess: () => setSent(true),
        onError: (err: unknown) => {
          const msg =
            (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
            "Something went wrong. Please try again.";
          toast.error(msg);
        },
      }
    );
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-4 font-sans selection:bg-white/20">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="spotlight-orb absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[120px]" />
      </div>
      <style jsx>{`
        @keyframes spotlight-pan {
          0%   { transform: translate(-50%, -45%) scale(1);   opacity: 0.7; }
          50%  { transform: translate(-50%, -38%) scale(1.08); opacity: 1;  }
          100% { transform: translate(-50%, -45%) scale(1);   opacity: 0.7; }
        }
        .spotlight-orb { animation: spotlight-pan 12s ease-in-out infinite alternate; }
      `}</style>

      {/* Top-left nav bar */}
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

      {/* Main card */}
      <div className="z-10 -mt-16 flex w-full max-w-[420px] flex-col items-center animate-in fade-in duration-500">

        {/* Wordmark */}
        <div className="mb-10 flex items-center justify-center">
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

        {/* Content — swaps between form and success */}
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col items-center"
            >
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <svg className="h-7 w-7 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>

              <h1 className="mb-2 text-center text-[26px] font-bold tracking-tight text-white">
                Forgot your password?
              </h1>
              <p className="mb-8 text-center text-[13px] leading-relaxed text-zinc-500">
                Enter the email tied to your account and we&apos;ll send a reset link. It expires in 15 minutes.
              </p>

              <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="ml-1 text-[13px] font-medium text-zinc-400">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="h-[46px] rounded-xl border-zinc-800 bg-[#18181b] px-4 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-600"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="h-[46px] w-full rounded-xl bg-white text-[14px] font-medium text-black transition-colors hover:bg-zinc-200"
                  disabled={forgotPassword.isPending}
                >
                  {forgotPassword.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-600" />
                  ) : (
                    "Send reset link"
                  )}
                </Button>

                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-xl py-2 text-[13px] text-zinc-500 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to sign in
                </Link>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col items-center text-center"
            >
              {/* Animated check icon */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1,   opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10"
              >
                <MailCheck className="h-8 w-8 text-emerald-400" />
              </motion.div>

              <h1 className="mb-2 text-[26px] font-bold tracking-tight text-white">
                Check your inbox
              </h1>
              <p className="mb-2 text-[13px] leading-relaxed text-zinc-500">
                We sent a reset link to
              </p>
              <p className="mb-6 rounded-lg border border-white/[0.07] bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/80">
                {email}
              </p>
              <p className="mb-8 text-[12px] leading-relaxed text-zinc-600">
                The link expires in 15 minutes. If you don&apos;t see it, check your spam folder.
              </p>

              <div className="flex w-full flex-col gap-3">
                <Button
                  variant="ghost"
                  className="h-[46px] w-full rounded-xl bg-[#18181b] text-[13px] text-zinc-400 transition-colors hover:bg-[#27272a] hover:text-white"
                  onClick={() => { setSent(false); setEmail(""); }}
                >
                  Try a different email
                </Button>
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-xl py-2 text-[13px] text-zinc-500 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to sign in
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        {!sent && (
          <p className="mt-8 text-center text-[12px] text-zinc-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline">
              Sign up free
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
