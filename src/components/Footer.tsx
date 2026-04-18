import Image from "next/image";
import Link from "next/link";
import React from "react";
const SOCIAL = [
  {
    label: "GitHub",
    svg: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    label: "LinkedIn",
    svg: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" fill="none" /></>,
  },
  {
    label: "Twitter",
    svg: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    label: "Facebook",
    svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1F5F8D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          {/* Left: Logo + Nav */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-semibold text-base">
              <Image alt="Logo" className="h-9 w-9 object-contain p-[2px]" src="/assets/brandlogo.png" width={100} height={100}/>
              CivicDataSpace
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-white/80">
              {["ABOUT US", "SITEMAP", "CONTACT US"].map((l) => (
                <Link key={l} href="#" className="hover:text-white transition-colors tracking-wide">
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Follow Us + Made By */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2">
            <div className="flex flex-col items-start sm:items-end gap-1.5">
              <span className="text-xs text-amber-400 font-semibold">Follow Us</span>
              <div className="flex gap-2">
                {SOCIAL.map(({ svg, label }) => (
                  <Link
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-8 h-8 rounded-full bg-[#84DCCF] flex items-center justify-center hover:bg-[#3a8abd] transition-colors text-black cursor-pointer"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24">{svg}</svg>
                  </Link>
                ))}
              </div>
            </div>
            <span className="text-xs text-white/60 flex items-center gap-1">
              made by
              <Image alt="Logo" className="h-7 w-7 object-contain p-[2px]" src="/assets/cdl.svg" width={100} height={100}/>
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
