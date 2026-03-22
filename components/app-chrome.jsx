'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './footer';
import { Header } from './header';

export function AppChrome({ children }) {
    const pathname = usePathname();
    const fullBleed = pathname === '/home' || pathname === '/home1';

    if (fullBleed) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
            <div className="flex flex-col w-full max-w-5xl mx-auto grow">
                <Header />
                <main className="grow">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
