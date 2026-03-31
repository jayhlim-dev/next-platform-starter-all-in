import ServicesHeroSection from './json/ServicesHeroSection.json';
import clsx from 'clsx';

export default function HeroSection() {
    const { title, subTitle } = ServicesHeroSection;
    return (
        <div className={clsx('flex flex-col gap-4 h-90 pt-26 px-[30px]', 'lg:px-0 lg:pt-20')}>
            <h1 className={clsx('text-4xl font-bold tracking-tight max-w-[200px]', 'lg:text-6xl lg:max-w-none!')}>
                {title}
            </h1>
            <p className={clsx('text-sm text-[#E6F5FC] max-w-lg', 'lg:text-base')}>{subTitle}</p>
        </div>
    );
}
