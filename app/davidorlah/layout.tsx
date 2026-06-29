import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Davidorlah Farms Document Generator',
  description:
    'Instantly generate custom Deed of Assignment and Farm Management Agreements with legal coordinates for Davidorlah Nigeria Limited farm plots.',
  alternates: {
    canonical: '/davidorlah',
  },
  openGraph: {
    title: 'Davidorlah Farms Document Generator | Maadan Dev Tools',
    description:
      'Instantly generate custom Deed of Assignment and Farm Management Agreements with legal coordinates for Davidorlah Nigeria Limited farm plots.',
    url: 'https://tools.maadan.dev/davidorlah',
    siteName: 'Maadan Dev',
    images: [
      {
        url: '/images/davidorlah_logo.png',
        width: 800,
        height: 800,
        alt: 'Davidorlah Farms Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Davidorlah Farms Document Generator | Maadan Dev Tools',
    description:
      'Generate custom Deed of Assignment and Farm Management Agreements for Davidorlah farm plots.',
    images: ['/images/davidorlah_logo.png'],
  },
};

export default function DavidorlahLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
