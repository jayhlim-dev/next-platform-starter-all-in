import Link from 'next/link';
import { Glass } from 'components/glass';
import ServicesHeroSection from './json/ServicesHeroSection.json';

export default function HowWeSupportSection() {
    const { content } = ServicesHeroSection;
    const { how_we_work } = content;
    const { title, description, work_steps } = how_we_work;
    return (
        <div className="flex flex-col gap-6 text-white py-[110px]">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl text-[34px] font-bold">{title}</h2>
                <p className="text-sm max-w-2xl">{description}</p>
            </div>
            <div className="grid grid-cols-4 gap-6">
                {work_steps.map((step, index) => (
                    <Glass
                        key={step.title}
                        type="light"
                        className="py-5 px-5 rounded-2xl items-start flex flex-col gap-6 min-h-[306px] border-white/20!"
                        useHoverAnimation={true}
                    >
                        <p className="text-2xl font-extralight w-full text-white">0{String(index + 1)}</p>
                        <div className="flex flex-col gap-2 justify-between h-full">
                            <h3 className="min-h-[72px] tex-lg text-[22px]! font-bold">{step.title}</h3>
                            <div className="flex gap-3 flex-col">
                                <p className="text-sm text-white min-h-[84px]">{step.description}</p>
                            </div>
                        </div>
                    </Glass>
                ))}
            </div>
        </div>
    );
}
