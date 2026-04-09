import '../styles/globals.css';
import { AppChrome } from '../components/app-chrome';
import { Poppins } from 'next/font/google';
import { siteName, siteUrl } from '../lib/site';

const description = 'Providing personalized support to transform biotech innovations from breakthrough to business';

export const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        template: '%s | ScaleBio Partners',
        default: 'ScaleBio Partners | Biotech Consulting Firm'
    },
    description,
    alternates: {
        canonical: siteUrl
    },
    icons: {
        icon: [{ url: '/favicon.png', type: 'image/png' }]
    },
    openGraph: {
        type: 'website',
        url: siteUrl,
        siteName,
        title: 'ScaleBio Partners | Biotech Consulting Firm',
        description,
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
        description,
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
