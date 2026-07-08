"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/features/auth/hooks/use-auth";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/ui/site-nav";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { email, password },
      {
        onError: (err: unknown) => {
          const msg =
            (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
            "Invalid email or password.";
          toast.error(msg);
        },
      }
    );
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-4 font-sans selection:bg-white/20">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="spotlight-orb absolute left-0 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[120px]" />
      </div>
      <style jsx>{`
        @keyframes spotlight-pan {
          0%   { transform: translate(-40%, -40%) scale(1);   opacity: 0.8; }
          50%  { transform: translate(-20%, -30%) scale(1.1); opacity: 1;   }
          100% { transform: translate(-40%, -40%) scale(1);   opacity: 0.8; }
        }
        .spotlight-orb { animation: spotlight-pan 15s ease-in-out infinite alternate; }
      `}</style>

      {/* ── Top-left nav bar ── */}
      <div className="fixed left-5 top-5 z-50 flex items-center gap-3">
        {/* Icon logo */}
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

        {/* Thin divider */}
        <div className="h-5 w-px bg-white/10" />

        {/* Dropdown nav */}
        <SiteNav />
      </div>

      {/* ── Main card ── */}
      <div className="z-10 -mt-20 flex w-full max-w-[440px] flex-col items-center animate-in fade-in duration-500">

        {/* Wordmark logo */}
        <div className="mb-10 flex items-center justify-center">
          <Image
            src="/AscendraIconLogo.svg"
            alt="Ascendra"
            width={160}
            height={45}
            style={{ height: 40, width: "auto", filter: "brightness(0) invert(1)" }}
            priority
            loading="eager"
          />
        </div>

        {/* Title */}
        <h1 className="mb-8 text-center text-[26px] font-bold tracking-tight text-white">
          Sign in to your account
        </h1>

        {/* Auth methods */}
        <div className="w-full">
          {!showEmailForm ? (
            <div className="flex w-full flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  className="h-[46px] flex-1 rounded-xl bg-[#18181b] text-[13px] font-normal text-[#a1a1aa] transition-colors hover:bg-[#27272a] hover:text-white"
                  onClick={() => toast.info("GitHub login coming soon")}
                >
                  <GithubIcon className="mr-2.5 h-4 w-4" />
                  GitHub
                </Button>
                <Button
                  variant="ghost"
                  className="h-[46px] flex-1 rounded-xl bg-[#18181b] text-[13px] font-normal text-[#a1a1aa] transition-colors hover:bg-[#27272a] hover:text-white"
                  onClick={() => toast.info("Google login coming soon")}
                >
                  <GoogleIcon className="mr-2.5 h-4 w-4" />
                  Google
                </Button>
              </div>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#27272a]" />
                <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">or</span>
                <div className="h-px flex-1 bg-[#27272a]" />
              </div>

              <Button
                onClick={() => setShowEmailForm(true)}
                className="h-[46px] w-full rounded-xl bg-white text-[14px] font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Continue with Email
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-4 animate-in fade-in slide-in-from-right-8 duration-300"
            >
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
                  className="h-[46px] rounded-xl border-zinc-800 bg-[#18181b] px-4 text-white placeholder:text-zinc-600 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-600"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="ml-1 flex items-center justify-between">
                  <Label htmlFor="password" className="text-[13px] font-medium text-zinc-400">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-[12px] text-zinc-500 transition-colors hover:text-white">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="h-[46px] rounded-xl border-zinc-800 bg-[#18181b] px-4 text-white placeholder:text-zinc-600 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-600"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="mt-2 flex flex-col gap-3">
                <Button
                  type="submit"
                  className="h-[46px] w-full rounded-xl bg-white text-[14px] font-medium text-black transition-colors hover:bg-zinc-200"
                  disabled={login.isPending}
                >
                  {login.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-600" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-[46px] w-full rounded-xl text-[13px] text-zinc-400 transition-colors hover:bg-[#18181b] hover:text-white"
                  onClick={() => setShowEmailForm(false)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to options
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-[12px] text-zinc-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
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
