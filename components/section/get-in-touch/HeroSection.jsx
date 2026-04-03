import clsx from 'clsx';
import getInTouchData from './json/getInTouchData.json';
import Image from 'next/image';

export default function HeroSection() {
    const { title } = getInTouchData;

    return (
        <div
            className={clsx(
                'flex flex-col gap-4 h-75 pt-26 px-[30px]',
                'md:px-[10%]',
                'lg:px-0 lg:pt-20 lg:flex-row lg:gap-16 lg:items-center lg:h-70'
            )}
        >
            <h1
                className={clsx(
                    'text-[33px] capitalize font-bold tracking-tight max-w-[330px]',
                    // lg row: image is min 398px + gap — at ~1024–1200px the text column is narrow; fluid size + flex shrink avoids crowding the graphic
                    'md:text! md:min-w-0 md:flex-1 md:max-w-none',
                    'md:text-[clamp(2rem,2.5vw+1.5rem,4.375rem)] md:leading-[1.08]',
                    'lg:min-w-0 lg:flex-1 lg:max-w-none',
                    'lg:text-[clamp(2rem,2.5vw+1.5rem,4.375rem)] lg:leading-[1.08]',
                    'text-balance'
                )}
                dangerouslySetInnerHTML={{ __html: title }}
            />
            <div className="w-fit max-w-full min-w-[398px] hidden lg:block">
                <Image
                    src="/images/desktop/3-h.png"
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
