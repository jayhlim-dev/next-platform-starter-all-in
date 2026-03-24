'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import mainLogo from 'public/images/logo/main-scalebio-logo.png';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Services', href: '/services' },
    { linkText: 'Get In Touch', href: '/contact' }
];

export function Header() {
    const currActivePage = usePathname();
    const isActivePage = (href) => currActivePage === href;

    return (
        <header className="sticky top-4 z-50 mx-auto mb-16 flex w-full max-w-330 items-center justify-between gap-6 rounded-3xl border border-white/10 bg-[#091642]/26 px-5 py-3 backdrop-blur-[28px] sm:px-6">
            <Link href="/" aria-label="ScaleBio Partners home" className="inline-flex items-center no-underline">
                <Image src={mainLogo} alt="ScaleBio Partners" className="h-auto w-[190px] sm:w-[243px]" priority />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`relative text-[0.95rem] no-underline ${isActivePage(item.href) ? 'font-bold text-white after:absolute after:left-0 after:right-0 after:-bottom-[0.55rem] after:h-0.5 after:rounded-full after:bg-white after:content-[""]' : 'text-[#F7FBFF]'}`}
                    >
                        {item.linkText}
                    </Link>
                ))}
            </nav>

            <details className="relative md:hidden">
                <summary
                    className="flex h-12 w-12 cursor-pointer list-none flex-col justify-center gap-1.5 rounded-[0.9rem] border border-white/12 bg-white/6 p-3 [&::-webkit-details-marker]:hidden"
                    aria-label="Open navigation menu"
                >
                    <span className="block h-0.5 w-full rounded-full bg-white" />
                    <span className="block h-0.5 w-full rounded-full bg-white" />
                    <span className="block h-0.5 w-full rounded-full bg-white" />
                </summary>
                <div className="absolute right-0 top-[calc(100%+0.75rem)] grid min-w-52 gap-1.5 rounded-2xl border border-white/12 bg-[rgba(8,19,57,0.92)] p-3 backdrop-blur-2xl">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-xl px-4 py-3 text-[0.95rem] text-[#F7FBFF] no-underline transition hover:bg-white/8"
                        >
                            {item.linkText}
                        </Link>
                    ))}
                </div>
            </details>
        </header>
    );
}
