import '../styles/globals.css';
import { AppChrome } from '../components/app-chrome';
import { Poppins } from 'next/font/google';

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        template: '%s | ScaleBio Partners',
        default: 'ScaleBio Partners'
    },
    icons: {
        icon: [{ url: '/images/logo/icon-scb.png', type: 'image/png' }]
    },
    openGraph: {
        title: 'ScaleBio Partners',
        images: ['/images/logo/icon-scb.png']
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
