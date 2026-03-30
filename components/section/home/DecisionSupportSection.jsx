import Link from 'next/link';
import supportData from './json/supportData.json';
import { Glass } from 'components/glass';
import clsx from 'clsx';

export default function DecisionSupportSection() {
    const { title, subTitle, supportSector } = supportData;
    return (
        <Glass
            type="light"
            useHoverAnimation={false}
            className={clsx('px-0! flex flex-col gap-8 text-white', 'md:gap-6 md:p-10 py-8 md:rounded-2xl')}
        >
            <div className={clsx('px-8 flex flex-col gap-2')}>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className={clsx('text-xs max-w-xs', 'md:max-w-2xl md:text-sm')}>{subTitle}</p>
            </div>
            <div
                className={clsx(
                    'flex flex-row  overflow-x-auto no-scrollbar px-8 gap-6',
                    'md:grid md:grid-cols-4 md:overflow-x-hidden '
                )}
            >
                {supportSector.map((sector, index) => (
                    <Glass
                        key={sector.title}
                        type="light"
                        className={clsx(
                            'py-6 px-7 rounded-3xl items-center justify-between flex flex-col gap-2 min-w-[235px]! h-[350px]',
                            'md:min-w-0 md:h-100! md:rounded-2xl md:px-6'
                        )}
                        useHoverAnimation={true}
                        useBorderOnHoverOnly={true}
                    >
                        <h3 className={clsx('text-base font-bold ', 'md:text-2xl md:leading-9')}>{sector.title}</h3>
                        <div className="flex gap-3 flex-col">
                            <div className="w-12 h-0.5 bg-white rounded-full" />
                            <p className={clsx('text-xs md:text-sm text-white min-h-[48px]', 'md:min-h-0')}>
                                {sector.description}
                            </p>
                            <p
                                className={clsx(
                                    'text-6xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] mt-5',
                                    'md:mt-2',
                                    'md:text-5x'
                                )}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </p>
                        </div>
                    </Glass>
                ))}
            </div>
        </Glass>
    );
}
