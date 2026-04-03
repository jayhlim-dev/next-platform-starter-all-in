import Link from 'next/link';
import { Glass } from 'components/glass';
import ServicesHeroSection from './json/ServicesHeroSection.json';
import clsx from 'clsx';

export default function HowWeSupportSection() {
    const { content } = ServicesHeroSection;
    const { how_we_work } = content;
    const { title, description, work_steps } = how_we_work;
    return (
        <div className={clsx('flex flex-col gap-6 text-white', 'lg:py-[50px]')}>
            <div className={clsx('flex flex-col gap-2 px-[30px]', 'lg:px-0!')}>
                <h2 className={clsx('text-xl font-bold', 'lg:text-3xl lg:text-[34px]')}>{title}</h2>
                <p className={clsx('text-xs max-w-2xl', 'md:text-sm')}>{description}</p>
            </div>
            <div
                className={clsx(
                    'flex flex-row  overflow-x-auto no-scrollbar px-8 gap-6',
                    'lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-x-hidden lg:px-0'
                )}
            >
                {work_steps.map((step, index) => (
                    <Glass
                        key={step.title}
                        type="light"
                        className={clsx(
                            'py-5 px-5 rounded-2xl items-start flex flex-col gap-6 min-h-[306px] border-white/20! max-w-[280px] min-w-[280px]',
                            'lg:min-w-[min(28rem,50%)]'
                        )}
                        useHoverAnimation={true}
                    >
                        <p className="text-2xl font-extralight w-full text-white">0{String(index + 1)}</p>
                        <div className={clsx('flex flex-col gap-2 justify-between h-full', 'lg:gap-[min(28rem,20px)]')}>
                            <h3 className="min-h-[72px] tex-lg text-[22px]! font-bold">{step.title}</h3>
                            <div className="flex gap-3 flex-col">
                                <p className={clsx('text-sm text-white min-h-[84px]', 'lg:min-h-[min(28rem,150px)]')}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    </Glass>
                ))}
            </div>
        </div>
    );
}
