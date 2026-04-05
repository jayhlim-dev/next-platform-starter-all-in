import '../styles/globals.css';
import { AppChrome } from '../components/app-chrome';
import { Poppins } from 'next/font/google';

const siteUrl = 'https://www.scalebiopartners.com/';

const description = 'Providing personalized support to transform biotech innovations from breakthrough to business';

export const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        template: '%s | ScaleBio Partners',
        default: 'ScaleBio Partners | Biotech Consulting Firm'
    },
    description,
    icons: {
        icon: [{ url: '/images/logo/icon-scb.png', type: 'image/png' }]
    },
    openGraph: {
        type: 'website',
        url: siteUrl,
        siteName: 'ScaleBio Partners | Biotech Consulting Firm',
        title: 'ScaleBio Partners | Biotech Consulting Firm',
        description,
        images: ['/images/logo/icon-scb.png']
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ScaleBio Partners | Biotech Consulting Firm',
        description,
        images: ['/images/logo/icon-scb.png']
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
