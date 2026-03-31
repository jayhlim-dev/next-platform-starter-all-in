import Image from 'next/image';
import boardData from './json/boardData.json';
import { Glass } from 'components/glass';
import clsx from 'clsx';

export default function BoardSection() {
    const { title, subTitle, boardSector } = boardData;
    return (
        <div className="flex flex-col gap-6 text-white px-[25px] md:px-0">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className={clsx('text-xs max-w-xs', 'md:max-w-2xl md:text-sm')}>{subTitle}</p>
            </div>

            <div className={clsx('grid grid-cols-3 gap-[10px]', 'md:gap-6')}>
                {boardSector.map((sector) => (
                    <Glass
                        key={sector.title}
                        type="light"
                        className={clsx(
                            'py-5 px-3 flex rounded-xl items-center justify-between border-white/10! gap-4! flex-col',
                            'md:rounded-2xl md:flex-row md:px-5 md:border-white/20!'
                        )}
                    >
                        {/* <div className="w-20 h-20 bg-[#233587]/40 rounded-full"> */}
                        <Image src={sector.image} alt={'section'} width={89} height={89} />
                        {/* </div> */}
                        <p
                            className={clsx(
                                'w-full max-w-56 text-xs text-center min-h-[45px]',
                                'md:text-base md:font-semibold md:text-left md:min-h-0',
                                sector.title.toLocaleLowerCase().includes('cosmeceuticals') ? 'text-[11px] ' : '',
                                sector.title.toLocaleLowerCase().includes('biomanufacturing') ? 'text-[10px] ' : ''
                            )}
                        >
                            {sector.title}
                        </p>
                    </Glass>
                ))}
            </div>
        </div>
    );
}
