'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Footer } from './footer';
import { Header } from './header';
import BaseLayout from './wrapper/BaseLayout';

/** Fixed pill: Tailwind bp + `innerWidth × innerHeight` (matches CSS media queries). Dev only. */
function BreakpointDebug() {
    const [dims, setDims] = useState({ w: 0, h: 0 });

    useEffect(() => {
        function read() {
            setDims({ w: window.innerWidth, h: window.innerHeight });
        }
        read();
        window.addEventListener('resize', read);
        return () => window.removeEventListener('resize', read);
    }, []);

    return (
        <div
            className="pointer-events-none fixed bottom-3 right-3 z-9999 flex min-w-30 flex-col items-center justify-center gap-0.5 rounded-md border border-black/15 px-2.5 py-1.5 font-mono text-black/90 shadow-md bg-rose-400 sm:bg-amber-400 md:bg-lime-400 lg:bg-emerald-400 xl:bg-sky-400"
            aria-hidden
        >
            <div className="text-[11px] font-bold leading-none">
                <span className="sm:hidden">&lt;sm</span>
                <span className="hidden sm:inline md:hidden">sm</span>
                <span className="hidden md:inline lg:hidden">md</span>
                <span className="hidden lg:inline xl:hidden">lg</span>
                <span className="hidden xl:inline">xl</span>
            </div>
            <div className="text-[10px] font-medium leading-none tabular-nums opacity-90">
                {dims.w > 0 ? `${dims.w} × ${dims.h}` : '— × —'}
            </div>
        </div>
    );
}

function shouldShowBreakpointDebug(searchParams) {
    const raw = searchParams.get('showViewport');
    if (raw === null) return false;
    const off = ['false', '0', 'no'].includes(raw.toLowerCase());
    return !off;
}

function BreakpointDebugGate() {
    const searchParams = useSearchParams();
    if (!shouldShowBreakpointDebug(searchParams)) return null;
    return <BreakpointDebug />;
}

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
            <Suspense fallback={null}>
                <BreakpointDebugGate />
            </Suspense>
            <Header />
            <main className="grow">{children}</main>
            <Footer />
        </BaseLayout>
    );
}
