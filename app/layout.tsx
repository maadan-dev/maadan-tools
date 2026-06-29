import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tools.maadan.dev'),
  title: {
    default: 'Maadan Dev · Business Automation Tools',
    template: '%s | Maadan Dev Tools',
  },
  description:
    'Auto-generate customized Deed of Assignment, Farm Management Agreement, and legal business templates for Nigerian operations.',
  keywords: [
    'Document Automation',
    'Nigerian Business Templates',
    'Deed of Assignment Generator',
    'Farm Management Agreement',
    'Legal Document Generator Nigeria',
    'Maadan Dev',
  ],
  authors: [{ name: 'Abdulyekeen Maadan', url: 'https://www.maadan.dev' }],
  creator: 'Abdulyekeen Maadan',
  robots: 'index, follow',
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    url: 'https://tools.maadan.dev/',
    siteName: 'Maadan Dev',
    title: 'Maadan Dev · Business Automation Tools',
    description:
      'Auto-generate customized Deed of Assignment, Farm Management Agreement, and legal business templates for Nigerian operations.',
    images: [
      {
        url: '/logo_horizontal.png',
        width: 800,
        height: 200,
        alt: 'Maadan Dev Tools',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@maadan_dev',
    creator: '@maadan_dev',
    title: 'Maadan Dev · Business Automation Tools',
    description:
      'Auto-generate customized legal business templates for Nigerian operations.',
    images: ['/logo_horizontal.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
