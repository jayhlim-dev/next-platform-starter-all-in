'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { animationClass } from '../lib/animations';

/**
 * Full-screen overlay for mobile navigation. Backdrop is black with opacity;
 * nav links are stacked in a column and navigate via Next.js Link.
 */
export function MobileNavOverlay({ open, onClose, navItems }) {
    const pathname = usePathname();

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    const isActive = (href) => pathname === href;

    return (
        <div
            className={clsx('fixed inset-0 z-9999 md:hidden', animationClass('fadeIn'))}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            id="mobile-nav-dialog"
        >
            {/* Full-screen hit target so taps on dimmed area close the menu */}
            <button
                type="button"
                className="absolute inset-0 z-0 cursor-default border-0 bg-black/75 p-0"
                aria-label="Close menu"
                onClick={onClose}
            />
            <div
                className={clsx(
                    'relative z-10 flex h-full min-h-0 flex-col pointer-events-none',
                    animationClass('fadeInUp', 'fast')
                )}
            >
                <div className="pointer-events-auto flex justify-end px-5 pt-14 pb-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-11 w-11 items-center justify-center rounded-full text-2xl leading-none text-white/90 transition hover:bg-white/10"
                        aria-label="Close menu"
                    >
                        ×
                    </button>
                </div>
                <nav
                    className="pointer-events-none flex flex-1 flex-col items-center justify-center gap-10 px-8 pb-16"
                    aria-label="Main"
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={clsx(
                                'pointer-events-auto text-center text-xl text-white no-underline transition-opacity hover:opacity-90',
                                isActive(item.href) ? 'font-bold' : 'font-medium'
                            )}
                        >
                            {item.linkText}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
