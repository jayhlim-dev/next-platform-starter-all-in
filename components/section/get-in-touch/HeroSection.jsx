import clsx from 'clsx';
import getInTouchData from './json/getInTouchData.json';
import Image from 'next/image';

export default function HeroSection() {
    const { title } = getInTouchData;

    return (
        <div
            className={clsx(
                'flex flex-col gap-4 h-75 pt-26 px-[30px]',
                'lg:px-0 lg:pt-20 lg:flex-row lg:gap-16 lg:items-center lg:h-70'
            )}
        >
            <h1
                className={clsx(
                    'text-[33px] capitalize font-bold tracking-tight max-w-[330px]',
                    'lg:text-[70px] lg:max-w-none!'
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
