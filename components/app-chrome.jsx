'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './footer';
import { Header } from './header';
import { HomeOverlay } from './home-overlay';

export function AppChrome({ children }) {
    const pathname = usePathname();
    const fullBleed = pathname === '/home' || pathname === '/home1';

    if (fullBleed) {
        return <>{children}</>;
    }

    return (
        <div className="relative pb-6">
            {/* <HomeOverlay /> */}
            <div className="z-10 mx-auto flex w-full max-w-330 grow flex-col">
                {/* <Header /> */}
                <main className="grow">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
