'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Observe whether a DOM node is inside the viewport (or a custom root) using IntersectionObserver.
 *
 * @param {object} [options]
 * @param {Element|null} [options.root] - Viewport root; default is the browser viewport
 * @param {string} [options.rootMargin='0px']
 * @param {number|number[]} [options.threshold=0] - 0–1 or array of ratios
 * @param {boolean} [options.once=false] - After the first time the element intersects, `isInView` stays true and the observer disconnects
 * @param {boolean} [options.initial=false] - Initial `isInView` before the first callback (SSR / first paint)
 * @returns {{ ref: React.RefObject<HTMLElement|null>, isInView: boolean, entry: IntersectionObserverEntry|null }}
 */
export function useInView({
    root = null,
    rootMargin = '0px',
    threshold = 0,
    once = false,
    initial = false
} = {}) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(initial);
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([observed]) => {
                setEntry(observed);
                const intersecting = observed.isIntersecting;

                if (once) {
                    if (intersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                } else {
                    setIsInView(intersecting);
                }
            },
            { root, rootMargin, threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [root, rootMargin, threshold, once]);

    return { ref, isInView, entry };
}
