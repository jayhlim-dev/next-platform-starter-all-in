'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useInView } from 'lib/use-in-view';

/**
 * Scroll reveal: wrapped content fades in after entering the viewport, with optional stagger.
 * Note: opacity on this wrapper can affect `backdrop-filter` on descendant glass panels.
 */
export function RevealSection({
    children,
    className,
    staggerMs = 0,
    once = true,
    threshold = 0.2,
    rootMargin = '0px',
    root = null
}) {
    const { ref, isInView } = useInView({ once, threshold, rootMargin, root });
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        if (!isInView) return undefined;
        setRevealed(true);
        const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const delay = reduced ? 0 : staggerMs;
        const id = window.setTimeout(() => setRevealed(true), delay);
        return () => window.clearTimeout(id);
    }, [isInView, staggerMs]);

    const show = isInView && revealed;

    return (
        <div
            ref={ref}
            className={clsx('relative transition-all ease-in ', className)}
            style={{
                opacity: show ? 1 : 0,
                pointerEvents: show ? 'auto' : 'none'
            }}
            aria-hidden={!show}
        >
            {children}
        </div>
    );
}
