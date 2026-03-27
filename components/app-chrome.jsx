'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './footer';
import { Header } from './header';
import { HomeOverlay } from './home-overlay';
import BaseLayout from './wrapper/BaseLayout';

export function AppChrome({ children }) {
    const pathname = usePathname();
    const fullBleed = pathname === '/home' || pathname === '/home1';

    if (fullBleed) {
        return <>{children}</>;
    }

    // base layout is the wrapper for the entire app
    // change the root padding on baseLayout to change the padding for the entire app
    return (
        <BaseLayout>
            <Header />
            <main className="grow">{children}</main>
            <Footer />
        </BaseLayout>
    );
}
