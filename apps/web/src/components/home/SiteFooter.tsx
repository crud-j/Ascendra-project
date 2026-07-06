import Link from "next/link";
import Image from "next/image";

const footerCols = [
  { title: "Product", links: ["Dashboard", "Marketplace", "Economy", "AI Mentor"] },
  { title: "Learn", links: ["Courses", "Learning Paths", "Mentors", "Community"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#18181C]">
      {/* Watermark */}
      <div className="relative flex w-full items-end justify-center overflow-hidden h-[20vw] min-h-[60px]">
        <Image
          src="/AscendraIconLogo.svg"
          alt=""
          width={1200}
          height={338}
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            width: "80vw",
            height: "auto",
            transform: "translateY(30%)",
            filter: "brightness(0) invert(1)",
            opacity: 10,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

          {/* ─── Ambient Decorative Void ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* The Outer Glowing "U" Track (Mesh Style) */}
        <div className="absolute inset-x-4 top-12 bottom-4 rounded-[32px] border border-white/[0.08] [mask-image:linear-gradient(to_bottom,transparent_10%,black_80%)]">
          <div className="absolute left-0 top-1/4 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#FAFAFA]/40 to-[#FAFAFA] blur-[2px]" />
          <div className="absolute right-0 top-1/4 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#FAFAFA]/40 to-[#FAFAFA] blur-[2px]" />
        </div>
      
        {/* Corner Accent Flares */}
        <div className="absolute bottom-4 left-4 h-24 w-24 rounded-bl-[32px] border-b border-l border-white/20 blur-[1px]" />
        <div className="absolute bottom-4 right-4 h-24 w-24 rounded-br-[32px] border-b border-r border-white/20 blur-[1px]" />
      </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 border-t border-white/10 bg-[#18181C]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-12">

            {/* 3 Link Columns */}
            {footerCols.map((col) => (
              <div key={col.title}>
                <h4
                  className="mb-6 text-[15px] font-semibold text-white/80"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-[14px] text-white/40 transition-colors duration-200 hover:text-white/80"
                        style={{ fontFamily: "var(--font-plus-jakarta)" }}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-6">
                <Image
                  src="/AscendraIconLogo.svg"
                  alt="Ascendra"
                  width={100}
                  height={28}
                  style={{ height: 28, width: "auto", filter: "brightness(0) invert(1)" }}
                />
              </div>

              <p
                className="mb-8 text-[14px] leading-[1.6] text-white/40"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                The learning ecosystem that transforms learners into builders and builders into earners.
              </p>

              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <span
                  className="text-[12px] font-medium text-white/40"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  12,000+ learners online now
                </span>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
            <p
              className="text-[13px] text-white/30"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              © 2026 Ascendra. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {["Terms of Service", "Privacy Policy", "Security Policy"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-[13px] text-white/30 transition-colors duration-200 hover:text-white/70"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}