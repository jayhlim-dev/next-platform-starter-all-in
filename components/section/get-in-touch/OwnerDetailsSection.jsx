import { Glass } from 'components/glass';
import getInTouchData from './json/getInTouchData.json';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

export default function OwnerDetailsSection() {
    const { content } = getInTouchData;
    const { owner_details } = content;
    const { name, title, education, description, social_media } = owner_details;

    return (
        <div
            className={clsx(
                'flex  text-white justify-center items-center ',
                'flex-col px-[30px] gap-9',
                'lg:flex-row lg:px-0 lg:gap-16 lg:py-13 lg:pt-30'
            )}
        >
            <div className={clsx('flex flex-col gap-2 max-w-[340px]', 'lg:max-w-none')}>
                <Image src="/images/content/owner.png" alt="Owner Details" width={460} height={460} />
            </div>

            <Glass
                className={clsx(
                    'flex flex-col gap-5  max-w-[580px] rounded-2xl border-white/20 border',
                    'px-5 py-5',
                    'lg:px-14 lg:py-10'
                )}
                type="light"
            >
                <div className="flex flex-col gap-1">
                    <h2 className={clsx('text-2xl font-bold', 'lg:text-4xl')}>{name}</h2>
                    <p className={clsx('text-xs h-fit font-semibold mt-1 leading-4', 'lg:text-lg')}>{title}</p>
                    <p className={clsx('text-xs h-fit', 'lg:text-base')}>{education}</p>
                </div>

                <div className="h-0.5 bg-white/20 w-full max-w-[50%]" />

                <p
                    className={clsx('text-[10px] max-w-2xl', 'lg:text-sm!')}
                    dangerouslySetInnerHTML={{ __html: description }}
                />

                <div className="h-0.5 bg-white/20 w-full max-w-[50%]" />

                <div className="flex flex-row gap-2">
                    <Link href={social_media.linkedin}>
                        <Image src="/images/icon/linkedin.svg" alt="LinkedIn" width={24} height={24} />
                    </Link>
                </div>
            </Glass>
        </div>
    );
}
