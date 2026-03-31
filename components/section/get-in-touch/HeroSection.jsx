import clsx from 'clsx';
import getInTouchData from './json/getInTouchData.json';

export default function HeroSection() {
    const { title } = getInTouchData;

    return (
        <div className={clsx('flex flex-col gap-4 h-90 pt-26 px-[30px]', 'lg:px-0 lg:pt-20')}>
            <h1
                className={clsx('text-[33px] capitalize font-bold tracking-tight max-w-[330px]', 'lg:text-6xl lg:max-w-none!')}
                dangerouslySetInnerHTML={{ __html: title }}
            />
        </div>
    );
}
