import '../styles/globals.css';
import { AppChrome } from '../components/app-chrome';
import { Poppins } from 'next/font/google';
import { siteDescription, siteName, siteUrl } from '../lib/site';

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'dark'
};

export const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        template: '%s | ScaleBio Partners',
        default: 'ScaleBio Partners | Biotech Consulting Firm'
    },
    description: siteDescription,
    applicationName: siteName,
    referrer: 'origin-when-cross-origin',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true
        }
    },
    alternates: {
        canonical: siteUrl
    },
    icons: {
        icon: [{ url: '/favicon.png', type: 'image/png', sizes: '48x48' }],
        apple: [{ url: '/favicon.png', sizes: '48x48' }]
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName,
        title: 'ScaleBio Partners | Biotech Consulting Firm',
        description: siteDescription,
        images: [
            {
                url: '/favicon.png',
                width: 48,
                height: 48,
                alt: 'ScaleBio Partners'
            }
        ]
    },
    twitter: {
        card: 'summary',
        title: 'ScaleBio Partners | Biotech Consulting Firm',
        description: siteDescription,
        images: ['/favicon.png']
    },
    verification: {
        google: 'lfTdHtjpuPZgyU8xjBN2-j-ikQXAAFP6fPhIyKfUQa0'
    }
};

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap'
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.className} relative antialiased text-white bg-[#0c1f47] `}>
                <AppChrome>{children}</AppChrome>
            </body>
        </html>
    );
}
