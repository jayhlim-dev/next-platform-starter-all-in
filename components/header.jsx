'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import mainLogo from 'public/images/logo/main-scalebio-logo.png';
import burgerMenuIcon from 'public/images/icon/burger.svg';
import { Glass } from './glass';
import clsx from 'clsx';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Services', href: '/services' },
    { linkText: 'Get In Touch', href: '/get-in-touch' }
];

export function Header() {
    const currActivePage = usePathname();
    const isActivePage = (href) => currActivePage === href;

    return (
        <header className="flex w-full items-center justify-center sticky top-8 z-50">
            <Glass
                className={clsx(
                    'z-50 mx-auto flex w-full items-center justify-between gap-6',
                    'max-w-[85%] px-5 py-4 rounded-full',
                    'md:px-10 md:rounded-3xl md:py-6'
                )}
            >
                <Link href="/" aria-label="ScaleBio Partners home">
                    <Image
                        src={mainLogo}
                        alt="ScaleBio Partners"
                        className={clsx('h-auto', 'w-[133px]', 'md:w-[190px]')}
                        priority
                    />
                </Link>

                <div className="items-center gap-8 hidden md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'text-sm no-underline text-white flex flex-col items-center gap-1.5',
                                isActivePage(item.href) ? 'font-bold' : ''
                            )}
                        >
                            {item.linkText}

                            <span
                                className={clsx(
                                    'block h-px w-full rounded-full bg-white',
                                    isActivePage(item.href) ? 'opacity-100' : 'opacity-0'
                                )}
                            />
                        </Link>
                    ))}
                </div>

                <div className="md:hidden">
                    <Image src={burgerMenuIcon} alt="Menu" className="h-auto w-[23px]" priority />
                </div>
            </Glass>
        </header>
    );
}
