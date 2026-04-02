import ServicesHeroSection from './json/ServicesHeroSection.json';
import clsx from 'clsx';
import Image from 'next/image';

export default function HeroSection() {
    const { title, subTitle } = ServicesHeroSection;
    return (
        <div className="relative">
            <div className={clsx('flex flex-col gap-4 h-70 pt-26 px-[30px]', 'lg:px-0 lg:pt-22')}>
                <h1
                    className={clsx('text-4xl font-bold tracking-tight max-w-[200px]', 'lg:text-[70px] lg:max-w-none!')}
                >
                    {title}
                </h1>
                <p className={clsx('text-sm text-[#E6F5FC] max-w-lg', 'lg:text-[22px] lg:max-w-[680px]!')}>
                    {subTitle}
                </p>
            </div>
            <div className="absolute top-2 right-5 w-fit max-w-full min-w-[420px]">
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
