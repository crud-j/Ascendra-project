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
      <div className="relative flex w-full items-end justify-center overflow-hidden h-[10vw] min-h-[60px]">
        <span className="absolute bottom-0 translate-y-[20%] text-[15vw] font-extrabold leading-none tracking-tighter text-white/[1] select-none">
          Ascendra
        </span>
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
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5">
                  <Image src="/AscendraLogo.svg" alt="Ascendra" width={18} height={18} style={{ width: 18, height: 18 }} />
                </div>
                <span
                  className="bg-gradient-to-r from-[#C19562] via-[#A67C52] to-[#8B6340] bg-clip-text text-base font-semibold text-transparent"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  Ascendra
                </span>
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