"use client";

export function NewsletterForm() {
  return (
    <form
      className="relative flex w-full items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="email"
        required
        className="w-full rounded-full bg-[#4B1A1A] py-4 pl-6 pr-16 text-[15px] font-medium text-[#F2EFE9] placeholder:text-[#F2EFE9]/40 focus:outline-none focus:ring-2 focus:ring-[#DF3B3B] focus:ring-offset-2 focus:ring-offset-[#F2EFE9]"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      />
      <button
        type="submit"
        className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full text-[#F2EFE9] transition-colors hover:bg-[#DF3B3B]"
        aria-label="Subscribe"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </form>
  );
}
