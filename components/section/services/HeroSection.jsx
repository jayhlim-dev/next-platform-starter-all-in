import Link from 'next/link';

import ServicesHeroSection from './json/ServicesHeroSection.json';

export default function HeroSection() {
    const { title, subTitle } = ServicesHeroSection;
    return (
        <div className="flex flex-col gap-4 h-90 pt-20">
            <h1 className="text-6xl font-bold tracking-tight">{title}</h1>
            <p className="text-base text-[#E6F5FC] max-w-lg">{subTitle}</p>
        </div>
    );
}
