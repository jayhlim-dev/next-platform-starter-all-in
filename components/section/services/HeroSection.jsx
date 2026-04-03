import ServicesHeroSection from './json/ServicesHeroSection.json';
import clsx from 'clsx';
import Image from 'next/image';

/**
 * Cap copy beside the absolute image. `calc(100%-28rem)` alone collapses on narrow `lg` rows
 * (~700px); subtract `min(28rem,45%)` so the reserved band scales down and text keeps ~55% min.
 */
const heroTextLgMax = 'lg:max-w-[min(42.5rem,calc(100%-min(28rem,50%)))]';

export default function HeroSection() {
    const { title, subTitle } = ServicesHeroSection;
    return (
        <div className="relative w-full min-w-0">
            <div
                className={clsx('flex w-full min-w-0 flex-col gap-4 h-70 pt-26 px-[30px]', 'lg:px-0 lg:pt-22 md:h-fit')}
            >
                <h1
                    className={clsx(
                        'text-4xl font-bold tracking-tight max-w-full',
                        'md:max-w-2xl',
                        'lg:text-[70px]',
                        heroTextLgMax
                    )}
                >
                    {title}
                </h1>
                <p
                    className={clsx(
                        'text-sm text-[#E6F5FC] max-w-lg',
                        'md:max-w-[500px]',
                        'lg:text-[22px]',
                        heroTextLgMax
                    )}
                >
                    {subTitle}
                </p>
            </div>
            <div
                className={clsx(
                    'absolute top-2 w-fit max-w-full hidden lg:block',
                    // Narrower lg: tuck closer to the viewport edge; wider breakpoints: step `right` up
                    'lg:right-0 xl:right-3 2xl:right-6',
                    'min-w-[min(26.25rem,55vw)]'
                )}
            >
                <Image
                    src="/images/desktop/2-h.png"
                    alt="Noise"
                    width={1000}
                    height={1000}
                    priority
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
