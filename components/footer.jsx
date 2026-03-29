'use client';

import Image from 'next/image';
import Link from 'next/link';
import mainLogo from 'public/images/logo/main-scalebio-logo.png';
import linkedinIcon from 'public/images/icon/linkedin.svg';
import { Glass } from './glass';
import clsx from 'clsx';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Services', href: '/services' },
    { linkText: 'Get In Touch', href: '/get-in-touch' }
];

const FOOTER_EMAIL = 'info@scalebiopartners.com';
const LINKEDIN_URL = 'https://www.linkedin.com/company/scalebio-partners';

export function Footer() {
    return (
        <footer className="w-full px-[162px] flex flex-col gap-16 pb-16">
            <Glass
                useHoverAnimation={false}
                className={clsx('z-50 flex w-full flex-col gap-5 rounded-3xl  backdrop-blur-[28px] px-12 py-10')}
            >
                {/* Top row: brand | nav | CTA */}
                <div className="flex flex-col gap-2 lg:flex-row items-center justify-between ">
                    <Link href="/" aria-label="ScaleBio Partners home" className="shrink-0">
                        <Image src={mainLogo} alt="ScaleBio Partners" className="h-auto w-[252px] " priority />
                    </Link>

                    <nav className="flex flex-wrap items-center justify-center gap-8" aria-label="Footer">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-base font-bold text-white no-underline transition hover:opacity-85"
                            >
                                {item.linkText}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex gap-4 min-w-[352px] items-center">
                        <div className="flex flex-col mr-2">
                            <p className=" text-base font-bold leading-snug text-white whitespace-nowrap">
                                Ready to move your
                            </p>
                            <p className=" text-base font-bold leading-snug text-white whitespace-nowrap">
                                innovation forward?
                            </p>
                        </div>
                        <Link
                            href="/get-in-touch"
                            className="inline-flex items-center justify-center rounded-[10px] border border-white bg-transparent px-6 text-base font-bold tracking-wide text-white no-underline transition hover:bg-white/10 min-w-[150px] min-h-[40px]"
                        >
                            Let&apos;s Talk
                        </Link>
                    </div>
                </div>

                <div className="h-0.5 w-full bg-white/15" aria-hidden />

                {/* Bottom row: tagline | copyright | contact */}
                <div className="flex gap-8 text-sm text-white/90 justify-between items-center">
                    <p className="m-0 max-w-[301px] ">
                        A biotech consulting firm transforming science to scalable ventures
                    </p>
                    <p className="m-0 text-center text-white/80 ">
                        © {new Date().getFullYear()} ScaleBio Partners. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        <Link
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex shrink-0 items-center justify-center opacity-90 transition hover:opacity-100"
                            aria-label="ScaleBio Partners on LinkedIn"
                        >
                            <Image src={linkedinIcon} alt="" width={22} height={22} className="opacity-95" />
                        </Link>
                        <a
                            href={`mailto:${FOOTER_EMAIL}`}
                            className="text-sm text-white no-underline transition hover:opacity-85"
                        >
                            {FOOTER_EMAIL}
                        </a>
                    </div>
                </div>
            </Glass>
        </footer>
    );
}
