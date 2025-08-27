import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intern Finder",
  description:
    "Intern Finder is the ultimate career development hub. Employers, post internship opportunities and efficiently recruit from a pool of talented students and graduates. Aspiring interns, search and apply for paid and unpaid internships in tech, business, marketing, and more. Build your future now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/images/favicon.png"
          type="image/x-icon"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
