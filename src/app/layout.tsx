import type { Metadata, Viewport } from "next";
import { Kantumruy_Pro, Mona_Sans } from "next/font/google";
import Reveal from "@/components/Reveal";
import "./globals.css";

const mona = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

const khmer = Kantumruy_Pro({
  subsets: ["khmer"],
  variable: "--font-khmer",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Horizxon",
  description:
    "A small software startup in Cambodia. We build CheckSen, Samleng and open-source tools for payments, Khmer and the Mac.",
  authors: [{ name: "Horizxon" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECE8E1" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1016" },
  ],
};

// Runs before paint so the saved theme never flashes.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='night'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.dataset.theme='night'}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mona.variable} ${khmer.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
