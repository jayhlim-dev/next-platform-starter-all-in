import '../styles/globals.css';
import { AppChrome } from '../components/app-chrome';
import { Poppins } from 'next/font/google';

export const metadata = {
    title: {
        template: '%s | Netlify',
        default: 'Netlify Starter'
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
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className={`${poppins.className} relative antialiased text-white bg-[#0c1f47]`}>
                <AppChrome>{children}</AppChrome>
            </body>
        </html>
    );
}
