import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Github } from "lucide-react";
import Link from "next/link";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Quotes By Cracked PPL",
  description: "A collection of quotes from Cracked ppl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://cdn.seline.so/seline.js"
          data-token="234d5e415da92b3"
        ></script>
      </head>
      <body className={`${manrope.className} antialiased`}>
        <div className="absolute top-2 mr-2 mt-2 right-2">
          <Link
            href="https://github.com/Shrit1401/CrackedQuotes"
            target="_blank"
            passHref
          >
            <button className="p-2 bg-gray-500 rounded-full hover:bg-black transition duration-300">
              <Github color="white" />
            </button>
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
