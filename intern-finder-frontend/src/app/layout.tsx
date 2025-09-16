import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";


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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.png" type="image/x-icon" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
