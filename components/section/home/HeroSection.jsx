import clsx from 'clsx';
import { animationClass } from 'lib/animations';
import Image from 'next/image';
import Link from 'next/link';

import secondaryLogo from 'public/images/logo/secondary-logo.png';

export default function HeroSection() {
    return (
        <section
            className={clsx(
                'flex w-full min-h-[min(38vh,420px)] flex-col justify-end gap-4 py-14 pb-10 px-[30px]',
                'lg:px-0 lg:flex-row lg:justify-center lg:py-14!'
            )}
            aria-label="Hero"
        >
            <div
                className={clsx(
                    'flex w-full flex-col items-start gap-6',
                    animationClass('fadeInUp', 'slow'),
                    'md:justify-center'
                )}
            >
                <Image
                    src={secondaryLogo}
                    alt="ScaleBio Partners"
                    width={776}
                    height={242}
                    className="h-auto w-full object-contain max-w-[776px]"
                    sizes="100vw"
                    priority
                />

                <Link
                    href="/get-in-touch"
                    className={clsx(
                        'inline-flex w-fit items-center justify-center bg-white font-bold uppercase tracking-wide text-[#1B4887] no-underline transition hover:bg-white/90 ',
                        'px-8 py-2 text-sm rounded-xl',
                        'md:px-12 md:py-3 md:text-base md:min-h-[52px] md:rounded-xl'
                    )}
                >
                    Let&apos;s talk
                </Link>
            </div>
            <div className="w-fit max-w-full min-w-[370px] hidden lg:block">
                <Image
                    src="/images/desktop/1-H.png"
                    alt="Noise"
                    width={359}
                    height={338}
                    priority
                    className="h-auto w-full object-cover"
                />
            </div>
        </section>
    );
}
