"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { buttonVariants } from "@/components/ui/button";

// --- Data ---

const platformItems = [
  { title: "Dashboard",   href: "/dashboard",  description: "Track XP, Reputation, Skill Coins, and your learning progress." },
  { title: "AI Mentor",   href: "/ai-mentor",  description: "Receive personalized guidance, reviews, and coaching." },
  { title: "Marketplace", href: "/marketplace",description: "Discover projects, bounties, and freelance opportunities." },
  { title: "Economy",     href: "/economy",    description: "Learn how XP, Reputation, and Skill Coins interact." },
];

const mentorItems = [
  { title: "Find Mentors",     href: "/mentors" },
  { title: "Career Coaching",  href: "/career-coaching" },
  { title: "Office Hours",     href: "/office-hours" },
  { title: "Become a Mentor",  href: "/become-mentor" },
];

const featuredCourses = [
  {
    title: "Python Foundation",
    description: "Learn programming fundamentals with beginner-friendly projects.",
    href: "/courses/python",
    iconColor: "from-blue-400 to-indigo-500",
  },
  {
    title: "AI Assisted Coding",
    description: "Use AI tools to write code faster and with less effort.",
    href: "/courses/ai-coding",
    iconColor: "from-purple-500 to-pink-500",
  },
  {
    title: "React Architecture",
    description: "Build scalable React apps with modern patterns.",
    href: "/courses/react",
    iconColor: "from-cyan-400 to-blue-500",
  },
];

const courseCategories = [
  {
    title: "Data Science",
    href: "/courses?cat=data-science",
    items: [
      { title: "Python",              href: "/courses/python" },
      { title: "Intermediate Python", href: "/courses/python-intermediate", badge: "PRO" },
      { title: "NumPy & Pandas",      href: "/courses/data-analysis" },
      { title: "Machine Learning",    href: "/courses/ml", badge: "PRO" },
      { title: "Data Visualisation",  href: "/courses/data-viz" },
      { title: "Statistics for DS",   href: "/courses/statistics" },
    ],
  },
  {
    title: "Web Development",
    href: "/courses?cat=web-dev",
    items: [
      { title: "HTML & CSS",          href: "/courses/html-css" },
      { title: "JavaScript",          href: "/courses/js" },
      { title: "TypeScript",          href: "/courses/typescript" },
      { title: "React Architecture",  href: "/courses/react", badge: "PRO" },
      { title: "Node.js Backend",     href: "/courses/node" },
      { title: "Full-Stack Next.js",  href: "/courses/nextjs", badge: "PRO" },
    ],
  },
  {
    title: "Computer Science",
    href: "/courses?cat=cs",
    items: [
      { title: "C++ Fundamentals",    href: "/courses/cpp" },
      { title: "Java Masterclass",    href: "/courses/java" },
      { title: "Data Structures",     href: "/courses/dsa", badge: "PRO" },
      { title: "System Design",       href: "/courses/system-design" },
      { title: "Algorithms",          href: "/courses/algorithms", badge: "PRO" },
      { title: "Operating Systems",   href: "/courses/os" },
    ],
  },
  {
    title: "AI & Machine Learning",
    href: "/courses?cat=ai-ml",
    items: [
      { title: "AI Assisted Coding",  href: "/courses/ai-coding" },
      { title: "Prompt Engineering",  href: "/courses/prompting" },
      { title: "LLM Fine-Tuning",     href: "/courses/llm-finetuning", badge: "PRO" },
      { title: "Deep Learning",       href: "/courses/deep-learning", badge: "PRO" },
      { title: "Computer Vision",     href: "/courses/cv" },
      { title: "NLP Fundamentals",    href: "/courses/nlp" },
    ],
  },
  {
    title: "Mobile Development",
    href: "/courses?cat=mobile",
    items: [
      { title: "React Native",        href: "/courses/react-native" },
      { title: "iOS with Swift",      href: "/courses/swift", badge: "PRO" },
      { title: "Android (Kotlin)",    href: "/courses/kotlin" },
      { title: "Flutter & Dart",      href: "/courses/flutter" },
      { title: "Mobile UI Design",    href: "/courses/mobile-ui" },
      { title: "App Store Strategy",  href: "/courses/app-store" },
    ],
  },
  {
    title: "DevOps & Cloud",
    href: "/courses?cat=devops",
    items: [
      { title: "Docker & Containers", href: "/courses/docker" },
      { title: "Kubernetes",          href: "/courses/k8s", badge: "PRO" },
      { title: "AWS Essentials",      href: "/courses/aws" },
      { title: "CI/CD Pipelines",     href: "/courses/cicd" },
      { title: "Linux for Devs",      href: "/courses/linux" },
      { title: "Terraform & IaC",     href: "/courses/terraform", badge: "PRO" },
    ],
  },
];

// --- ListItem ---

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; isLight?: boolean }
>(({ className, title, children, href, isLight, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        href={href || "/"}
        ref={ref}
        className={cn(
          "group block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-all duration-300 ease-out",
          isLight
            ? "hover:bg-black/[0.04] focus:bg-black/[0.04]"
            : "hover:bg-white/[0.04] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] focus:bg-white/[0.04]",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className={cn(
            "text-sm font-medium transition-all duration-300 group-hover:translate-x-0.5",
            isLight ? "text-gray-700 group-hover:text-gray-900" : "text-white/90 group-hover:text-white"
          )}>
            {title}
          </div>
          <svg
            className={cn(
              "h-3 w-3 transition-all duration-300 -translate-x-2 group-hover:translate-x-0",
              isLight ? "text-black/0 group-hover:text-black/30" : "text-white/0 group-hover:text-white/50"
            )}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        {children && (
          <p className={cn(
            "line-clamp-2 text-sm leading-relaxed transition-all duration-300 group-hover:translate-x-0.5",
            isLight ? "text-gray-500 group-hover:text-gray-700" : "text-white/50 group-hover:text-white/70"
          )}>
            {children}
          </p>
        )}
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";

// --- Navbar ---

export function AscendraNavbar() {
  const [isLight, setIsLight] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const heroEl = document.querySelector('[data-section="hero"]');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setIsLight(rect.bottom < 80);
      } else {
        setIsLight(window.scrollY > 80);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const triggerBase = cn(
    "transition-all duration-500",
    isLight
      ? "bg-transparent text-gray-600 hover:bg-black/[0.04] hover:text-gray-900 data-[state=open]:bg-black/[0.04] data-[state=open]:text-gray-900"
      : "bg-transparent text-white/70 hover:bg-white/[0.05] hover:text-white data-[state=open]:bg-white/[0.05] data-[state=open]:text-white"
  );

  const plainLinkBase = cn(
    navigationMenuTriggerStyle(),
    "transition-all duration-500",
    isLight
      ? "bg-transparent text-gray-600 hover:bg-black/[0.04] hover:text-gray-900"
      : "bg-transparent text-white/70 hover:bg-white/[0.05] hover:text-white"
  );

  const viewportClassName = isLight
    ? "border-black/[0.08] bg-white/95 text-gray-900 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_16px_40px_-8px_rgba(0,0,0,0.12)]"
    : undefined;

  // Fixed wrapper: positions the dropdown relative to the header, not the NavigationMenu root
  // top-20 = 80px = top-4 (16px) + h-16 (64px); mt-3.5 on the viewport adds the 14px gap
  const viewportWrapperClassName = "fixed top-20 left-4 right-4 flex justify-center z-[200]";

  return (
    <header className="fixed top-4 left-0 right-0 z-[200] px-4">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-6",
          "transition-[background-color,border-color,box-shadow] duration-500",
          isLight
            ? "border border-black/[0.07] bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_0_rgba(0,0,0,0.07)]"
            : "border border-white/[0.08] bg-black/40 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
        )}
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
          <div className={cn(
            "relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border shadow-inner transition-[background-color,border-color] duration-500",
            isLight ? "border-black/10 bg-black/5" : "border-white/10 bg-white/5"
          )}>
            <Image src="/AscendraLogo.svg" alt="Ascendra" width={20} height={20}
              style={{ height: 'auto' }}
              className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>
          <span className={cn(
            "text-lg font-semibold tracking-tight bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500",
            isLight ? "from-[#15161A] via-[#3A3D45] to-[#6B6F7A]" : "from-[#FCE8C0] via-[#C19562] to-[#A67C52]"
          )}>
            Ascendra
          </span>
        </Link>

        {/* Center Navigation */}
        <NavigationMenu viewportClassName={viewportClassName} viewportWrapperClassName={viewportWrapperClassName}>
          <NavigationMenuList className="gap-1.5">

            {/* Platform */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerBase}>Platform</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[650px] p-4">
                  <div className="grid grid-cols-[260px_1fr] gap-4">
                    <div className={cn(
                      "relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-2xl",
                      isLight ? "border-gray-200 bg-gray-50" : "border-white/[0.08] bg-[#0E0E0E]"
                    )}>
                      <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-[#C19562] opacity-10 blur-[40px]" />
                      <div className="relative z-10">
                        <Image src="/AscendraLogo.svg" alt="" width={32} height={32} style={{ height: 'auto' }} className="opacity-90" />
                        <h3 className={cn("mt-5 text-lg font-semibold", isLight ? "text-gray-800" : "text-white/90")}>
                          Ascendra Ecosystem
                        </h3>
                        <p className={cn("mt-2 text-sm leading-relaxed", isLight ? "text-gray-500" : "text-white/50")}>
                          Learn → Build → Contribute → Earn.
                        </p>
                      </div>
                      <div className={cn("relative z-10 mt-6 space-y-2.5 text-sm font-medium", isLight ? "text-gray-600" : "text-white/60")}>
                        {["Skill-based progression", "AI-assisted learning", "Mentor ecosystem", "Real opportunities"].map(f => (
                          <div key={f} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#C19562]/50" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ul className="grid gap-1 py-1 pr-1">
                      {platformItems.map(item => (
                        <ListItem key={item.title} title={item.title} href={item.href} isLight={isLight}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={plainLinkBase}>
                <Link href="/how-it-works">How It Works</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Courses — full-width mega-menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerBase}>Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* Width fills the fixed wrapper (left-4 right-4 = 100vw - 32px), capped at 1400px */}
                <div className="w-[calc(100vw-2rem)] max-w-[1400px] flex overflow-hidden">

                  {/* Left: Featured */}
                  <div className={cn(
                    "relative w-72 shrink-0 border-r p-6 flex flex-col",
                    isLight ? "border-gray-200 bg-gray-50" : "border-white/[0.08] bg-[#0E0E0E]/80"
                  )}>
                    <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#C19562] opacity-[0.07] blur-[50px]" />

                    <h4 className={cn("relative z-10 mb-4 text-[10px] font-bold tracking-[0.2em] uppercase", isLight ? "text-gray-400" : "text-white/40")}>
                      Featured
                    </h4>

                    <div className="relative z-10 flex flex-col gap-3 flex-1">
                      {featuredCourses.map(course => (
                        <Link
                          key={course.title}
                          href={course.href}
                          className={cn(
                            "group flex gap-3 rounded-xl border border-transparent p-3 transition-all duration-300",
                            isLight ? "hover:bg-black/[0.03] hover:border-black/[0.06]" : "hover:bg-white/[0.03] hover:border-white/[0.05]"
                          )}
                        >
                          <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-inner", course.iconColor)}>
                            <div className="h-3.5 w-3.5 bg-white/20 rounded-sm backdrop-blur-sm" />
                          </div>
                          <div>
                            <div className={cn("text-sm font-semibold transition-colors", isLight ? "text-gray-800 group-hover:text-gray-900" : "text-white/90 group-hover:text-white")}>
                              {course.title}
                            </div>
                            <p className={cn("mt-1 line-clamp-2 text-xs leading-relaxed transition-colors", isLight ? "text-gray-500 group-hover:text-gray-700" : "text-white/50 group-hover:text-white/70")}>
                              {course.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="relative z-10 mt-4">
                      <Link
                        href="/courses"
                        className={cn(
                          "group flex w-full items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all duration-300",
                          isLight
                            ? "border-[#C19562]/30 bg-gradient-to-r from-[#FCE8C0]/20 via-[#C19562]/15 to-[#A67C52]/15 text-[#A67C52] hover:border-[#C19562]/50"
                            : "border-[#C19562]/20 bg-gradient-to-r from-[#FCE8C0]/10 via-[#C19562]/10 to-[#A67C52]/10 text-[#FCE8C0] hover:border-[#C19562]/40 hover:shadow-[0_0_20px_-5px_rgba(193,149,98,0.3)]"
                        )}
                      >
                        Browse all courses
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Right: All categories */}
                  <div className="flex-1 p-6 overflow-y-auto max-h-[520px]">
                    <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                      {courseCategories.map(category => (
                        <div key={category.title}>
                          <Link
                            href={category.href}
                            className={cn(
                              "mb-3 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors hover:text-[#C19562]",
                              isLight ? "text-gray-400" : "text-white/40"
                            )}
                          >
                            {category.title}
                            <svg className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                          <ul className="flex flex-col gap-2">
                            {category.items.map(item => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={item.href}
                                    className={cn(
                                      "group flex w-max items-center gap-1.5 text-sm transition-all hover:translate-x-0.5",
                                      isLight ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"
                                    )}
                                  >
                                    {item.title}
                                    {item.badge && (
                                      <span className={cn(
                                        "rounded-full border px-1.5 py-[1px] text-[9px] font-bold tracking-widest",
                                        isLight
                                          ? "border-amber-300 bg-amber-50 text-amber-700"
                                          : "border-[#C19562]/30 bg-[#C19562]/10 text-[#FCE8C0]"
                                      )}>
                                        {item.badge}
                                      </span>
                                    )}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Mentors */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerBase}>Mentors</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[320px] gap-1 p-3">
                  {mentorItems.map(item => (
                    <ListItem key={item.title} href={item.href} title={item.title} isLight={isLight}>
                      Connect with industry experts.
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {["Pricing", "Community"].map(label => (
              <NavigationMenuItem key={label}>
                <NavigationMenuLink asChild className={plainLinkBase}>
                  <Link href={`/${label.toLowerCase()}`}>{label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          <div className="hidden xl:flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <span className={cn("text-xs font-medium transition-colors duration-500", isLight ? "text-gray-500" : "text-white/50")}>
              12,000+ Online
            </span>
          </div>

          <div className={cn("hidden h-4 w-px md:block transition-colors duration-500", isLight ? "bg-black/10" : "bg-white/10")} />

          <Link
            href="/login"
            className={cn(
              "text-sm font-medium transition-colors duration-500",
              isLight ? "text-gray-700 hover:text-gray-900" : "text-white/70 hover:text-white"
            )}
          >
            Login
          </Link>

          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "sm" }),
              "group relative overflow-hidden rounded-xl border-0 font-semibold text-black shadow-lg transition-all duration-300",
              "bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52]",
              "hover:scale-[1.02] hover:shadow-[#C19562]/40 active:scale-[0.98]"
            )}
          >
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="relative z-10 flex items-center gap-1">
              Get Started
              <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
