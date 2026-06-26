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

// --- Data Structures ---

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

const recommendedCourses = [
  {
    title: "Python Foundation",
    description: "Learn the basics of programming with beginner-friendly exercises.",
    href: "/courses/python",
    iconColor: "from-blue-400 to-indigo-500",
  },
  {
    title: "AI Assisted Coding",
    description: "Learn how to use AI tools to write code faster and with less effort.",
    href: "/courses/ai-coding",
    iconColor: "from-purple-500 to-pink-500",
  },
];

const courseCategories = [
  {
    title: "Data Science",
    items: [
      { title: "Python",              href: "/courses/python" },
      { title: "Intermediate Python", href: "/courses/python-intermediate", badge: "PRO" },
      { title: "NumPy & Pandas",      href: "/courses/data-analysis" },
      { title: "Machine Learning",    href: "/courses/ml", badge: "PRO" },
    ],
  },
  {
    title: "Web Development",
    items: [
      { title: "HTML & CSS",         href: "/courses/html-css" },
      { title: "JavaScript",         href: "/courses/js" },
      { title: "React Architecture", href: "/courses/react", badge: "PRO" },
      { title: "Node.js Backend",    href: "/courses/node" },
    ],
  },
  {
    title: "Computer Science",
    items: [
      { title: "C++ Fundamentals", href: "/courses/cpp" },
      { title: "Java Masterclass",  href: "/courses/java" },
      { title: "Data Structures",   href: "/courses/dsa", badge: "PRO" },
      { title: "System Design",     href: "/courses/system-design" },
    ],
  },
];

// --- ListItem component ---

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
          "hover:bg-white/[0.04] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
          "focus:bg-white/[0.04]",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-white/90 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5">
            {title}
          </div>
          <svg
            className="h-3 w-3 text-white/0 transition-all duration-300 -translate-x-2 group-hover:text-white/50 group-hover:translate-x-0"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        {children && (
          <p className="line-clamp-2 text-sm leading-relaxed text-white/50 transition-all duration-300 group-hover:text-white/70 group-hover:translate-x-0.5">
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
  const prevLight = React.useRef(false);

  React.useEffect(() => {
    const onScroll = () => {
      const journeyEl = document.querySelector('[data-section="journey"]');
      if (!journeyEl) return;
      const rect = journeyEl.getBoundingClientRect();
      const vh   = window.innerHeight;
      const p    = Math.max(0, Math.min(1, (vh - rect.top) / vh));

      // Hysteresis: switch to light at 0.38, back to dark at 0.28
      const next = prevLight.current ? p > 0.28 : p > 0.38;
      if (next !== prevLight.current) {
        prevLight.current = next;
        setIsLight(next);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger classes
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

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
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
            <Image
              src="/AscendraLogo.svg"
              alt="Ascendra"
              width={20}
              height={20}
              className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>
          <span
            className={cn(
              "text-lg font-semibold tracking-tight bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500",
              isLight
                ? "from-[#15161A] via-[#3A3D45] to-[#6B6F7A]"
                : "from-[#FCE8C0] via-[#C19562] to-[#A67C52]"
            )}
          >
            Ascendra
          </span>
        </Link>

        {/* Center Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="gap-1.5">

            {/* Platform Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerBase}>Platform</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[650px] p-4">
                  <div className="grid grid-cols-[260px_1fr] gap-4">
                    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E0E0E] p-6 shadow-2xl">
                      <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-[#C19562] opacity-10 blur-[40px]" />
                      <div className="relative z-10">
                        <Image src="/AscendraLogo.svg" alt="" width={32} height={32} className="opacity-90" />
                        <h3 className="mt-5 text-lg font-semibold text-white/90">Ascendra Ecosystem</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/50">Learn → Build → Contribute → Earn.</p>
                      </div>
                      <div className="relative z-10 mt-6 space-y-2.5 text-sm font-medium text-white/60">
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
                        <ListItem key={item.title} title={item.title} href={item.href}>{item.description}</ListItem>
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

            {/* Courses Mega-Menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerBase}>Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex w-[850px] overflow-hidden">
                  <div className="relative w-[340px] shrink-0 border-r border-white/[0.08] bg-[#0E0E0E]/80 p-6">
                    <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#C19562] opacity-[0.07] blur-[50px]" />
                    <h4 className="relative z-10 mb-4 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Recommended</h4>
                    <div className="relative z-10 flex flex-col gap-4">
                      {recommendedCourses.map(course => (
                        <Link
                          key={course.title}
                          href={course.href}
                          className="group flex gap-4 rounded-xl border border-transparent p-3 transition-all duration-300 hover:bg-white/[0.03] hover:border-white/[0.05]"
                        >
                          <div className={cn("mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-inner", course.iconColor)}>
                            <div className="h-4 w-4 bg-white/20 rounded-sm backdrop-blur-sm" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white/90 transition-colors group-hover:text-white">{course.title}</div>
                            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/50 transition-colors group-hover:text-white/70">{course.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="relative z-10 mt-8">
                      <Link
                        href="/courses"
                        className={cn(
                          "group flex w-full items-center justify-center gap-2 rounded-xl border border-[#C19562]/20 bg-gradient-to-r from-[#FCE8C0]/10 via-[#C19562]/10 to-[#A67C52]/10 p-3 text-sm font-medium text-[#FCE8C0] transition-all duration-300",
                          "hover:border-[#C19562]/40 hover:bg-[#C19562]/20 hover:shadow-[0_0_20px_-5px_rgba(193,149,98,0.3)]"
                        )}
                      >
                        All Courses
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  <div className="grid flex-1 grid-cols-3 gap-8 p-8">
                    {courseCategories.map(category => (
                      <div key={category.title}>
                        <h4 className="mb-4 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">{category.title}</h4>
                        <ul className="flex flex-col gap-3">
                          {category.items.map(item => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href}
                                  className="group flex w-max items-center text-sm text-white/60 transition-all hover:text-white hover:translate-x-0.5"
                                >
                                  {item.title}
                                  {item.badge && (
                                    <span className="ml-2 rounded-full border border-[#C19562]/30 bg-[#C19562]/10 px-1.5 py-[1px] text-[9px] font-bold tracking-widest text-[#FCE8C0]">
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
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Mentors Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerBase}>Mentors</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[320px] gap-1 p-3">
                  {mentorItems.map(item => (
                    <ListItem key={item.title} href={item.href} title={item.title}>
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

        {/* Right Side Actions */}
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
