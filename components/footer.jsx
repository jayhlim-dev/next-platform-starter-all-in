'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import mainLogo from 'public/images/logo/main-scalebio-logo.png';
import { Glass } from './glass';
import clsx from 'clsx';

const navItems = [
    {
        linkText: 'Home',
        href: '/',
        children: [
            { linkText: 'Biotech is broad', href: '#biotech-is-broad' },
            { linkText: 'Built for Complex Biotech Decisions', href: '#built-for-complex-biotech-decisions' }
        ]
    },
    {
        linkText: 'Services',
        href: '/services',
        children: [
            { linkText: 'Our Process Workflow', href: '#our-process-workflow' },
            { linkText: 'How We Support Your Business', href: '#how-we-support-your-business' }
        ]
    },
    {
        linkText: 'Get In Touch',
        href: '/contact',
        children: [{ linkText: `Have a question or a challenge you're working through?`, href: '#have-a-question' }],
        button: {
            text: 'Start the Conversation',
            href: '/contact'
        }
    }
];

export function Footer() {
    return (
        <footer className="w-full px-[162px] flex gap-16 pb-16">
            <Glass
                className={clsx('z-50 mx-auto flex w-full items-center justify-between gap-6 rounded-4xl py-10 px-14')}
            >
                <div className="flex gap-4 flex-col">
                    <Link href="/" aria-label="ScaleBio Partners home">
                        <Image src={mainLogo} alt="ScaleBio Partners" className="h-auto w-[243px]" priority />
                    </Link>
                    <p className="text-sm text-white max-w-[320px] capitalize">
                        A biotech consulting firm transforming science to scalable ventures.
                    </p>
                    <p className="text-sm text-white">© 2026 ScaleBio. All rights reserved.</p>
                </div>

                <div className="flex gap-8">
                    {navItems.map((item) => (
                        <div className="flex flex-col gap-2 max-w-[206px]" key={item.href}>
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx('text-md no-underline text-white flex flex-col gap-1.5 font-bold')}
                            >
                                {item.linkText}
                            </Link>

                            {item.children.map((child) => (
                                <div key={child.href}>
                                    <Link
                                        key={child.href}
                                        href={child.href}
                                        className={clsx(
                                            'text-sm no-underline text-white',
                                            item.linkText.toLocaleLowerCase() === 'get in touch' ? 'text-xs!' : ''
                                        )}
                                    >
                                        {child.linkText}
                                    </Link>
                                </div>
                            ))}
                            {item.button && (
                                <Glass className="py-3 px-5 flex rounded-lg items-center justify-center">
                                    <Link
                                        href={item.button.href}
                                        className="text-xs no-underline text-white font-medium"
                                    >
                                        {item.button.text}
                                    </Link>
                                </Glass>
                            )}
                        </div>
                    ))}
                </div>
            </Glass>
        </footer>
    );
}
