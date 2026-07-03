import Link from "next/link";
import Image from "next/image";

const footerCols = [
  { title: "Platform", links: ["Dashboard", "Marketplace", "Economy", "AI Mentor"] },
  { title: "Learn", links: ["Courses", "Learning Paths", "Mentors", "Community"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-[#060608] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5">
                <Image src="/AscendraLogo.svg" alt="Ascendra" width={18} height={18} />
              </div>
              <span
                className="bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] bg-clip-text text-base font-semibold text-transparent"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Ascendra
              </span>
            </div>
            <p className="max-w-[18rem] text-sm leading-[1.78] text-white/35" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              The learning ecosystem that transforms learners into builders and builders into earners.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[11px] text-white/28" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                12,000+ learners online now
              </span>
            </div>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/22" style={{ fontFamily: "var(--font-sora)" }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[13px] text-white/38 transition-colors duration-200 hover:text-white/70" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-[12px] text-white/22" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            © 2025 Ascendra. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link key={item} href="#" className="text-[12px] text-white/22 transition-colors duration-200 hover:text-white/50" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
