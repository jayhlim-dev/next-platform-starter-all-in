import Image from 'next/image';
import Link from 'next/link';

import secondaryLogo from 'public/images/logo/secondary-logo.png';

export default function HeroSection() {
    return (
        <section
            className="flex w-full min-h-[min(38vh,420px)] flex-col justify-center gap-8 py-14 pb-0!"
            aria-label="Hero"
        >
            <div className="flex w-full flex-col items-start gap-6">
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
                    className="inline-flex w-fit items-center justify-center rounded-xl bg-white px-12 py-3 text-base font-bold uppercase tracking-wide text-[#1B4887] no-underline transition hover:bg-white/90 min-h-[52px]"
                >
                    Let&apos;s talk
                </Link>
            </div>
        </section>
    );
}
