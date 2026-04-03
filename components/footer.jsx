'use client';

import Image from 'next/image';
import Link from 'next/link';
import mainLogo from 'public/images/logo/main-scalebio-logo.png';
import linkedinIcon from 'public/images/icon/linkedin.svg';
import { Glass } from './glass';
import clsx from 'clsx';
import { SITE_MAILBOX } from 'lib/site-mailbox';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Services', href: '/services' },
    { linkText: 'Get in Touch', href: '/get-in-touch' }
];

const LINKEDIN_URL = 'https://www.linkedin.com/company/scalebio-partners';

export function Footer() {
    return (
        <footer
            className={clsx(
                'w-full flex flex-col gap-16',
                'xl:px-[162px] lg:pb-13 z-0',
                'lg:px-[8%]',
                'min-[1500px]:px-[10%]! min-[1700px]:px-[16%]!'
            )}
        >
            <Glass
                type="light-dark"
                useHoverAnimation={false}
                className={clsx(
                    'z-50 flex w-full flex-col gap-10 rounded-t-4xl backdrop-blur-[28px] px-8 py-10',
                    'lg:gap-5 lg:px-8 lg:rounded-3xl',
                    'xl:px-12'
                )}
            >
                {/* Top row: brand | nav | CTA */}
                <div className={clsx('flex flex-col gap-10 items-center justify-between', 'lg:gap-2 lg:flex-row')}>
                    <Link href="/" aria-label="ScaleBio Partners home" className="shrink-0">
                        <Image
                            src={mainLogo}
                            alt="ScaleBio Partners"
                            className={clsx(
                                'h-auto max-w-[324px]',
                                'lg:max-w-[150px]',
                                'xl:w-[252px] xl:max-w-[min(26.25rem,200px)]'
                            )}
                            priority
                        />
                    </Link>

                    <nav
                        className={clsx('flex items-center justify-center gap-8', 'md:gap-5', 'xl:gap-6')}
                        aria-label="Footer"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    'text-base font-bold text-white no-underline transition hover:opacity-85 whitespace-nowrap',
                                    'md:text-sm',
                                    'xl:text-base'
                                )}
                            >
                                {item.linkText}
                            </Link>
                        ))}
                    </nav>

                    <div
                        className={clsx(
                            'flex gap-0 min-w-[352px] items-center justify-center',
                            // 'md:max-w-[120px]',
                            'lg:gap-4 lg:justify-start lg:items-center lg:max-w-none'
                        )}
                    >
                        <div className={clsx('flex flex-col mr-2 max-w-[160px]', 'lg:max-w-none')}>
                            <p
                                className={clsx(
                                    'text-base font-bold text-white whitespace-nowrap',
                                    'lg:leading-snug',
                                    'md:text-sm'
                                )}
                            >
                                Ready to turn your
                            </p>
                            <p
                                className={clsx(
                                    'text-base font-bold text-white',
                                    'lg:leading-snug lg:whitespace-nowrap',
                                    'md:text-sm'
                                )}
                            >
                                breakthrough into business?
                            </p>
                        </div>
                        <Link
                            href="/get-in-touch"
                            className="inline-flex items-center justify-center rounded-[10px] border border-white px-6 text-base font-bold tracking-wide text-white no-underline transition hover:bg-white/10 min-w-[150px] md:min-w-[180px] min-h-[40px] bg-black/10"
                        >
                            Let&apos;s Talk
                        </Link>
                    </div>
                </div>

                <div className="h-0.5 w-full bg-white/15" aria-hidden />

                {/* Bottom row: tagline | copyright | contact */}
                <div
                    className={clsx(
                        'flex flex-col text-sm text-white/90 justify-center items-center gap-8',
                        'lg:flex-row lg:justify-between lg:gap-0'
                    )}
                >
                    <p className={clsx('m-0 max-w-[301px] text-center', 'lg:text-left')}>
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
                            href={`mailto:${SITE_MAILBOX}`}
                            className="text-sm text-white no-underline transition hover:opacity-85 font-bold"
                        >
                            {SITE_MAILBOX}
                        </a>
                    </div>
                </div>
            </Glass>
        </footer>
    );
}
