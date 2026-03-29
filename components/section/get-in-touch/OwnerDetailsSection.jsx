import { Glass } from 'components/glass';
import getInTouchData from './json/getInTouchData.json';
import Image from 'next/image';
import Link from 'next/link';

export default function OwnerDetailsSection() {
    const { content } = getInTouchData;
    const { owner_details } = content;
    const { name, title, education, description, social_media } = owner_details;

    return (
        <div className="flex gap-16 text-white justify-center items-center py-13">
            <div className="flex flex-col gap-2">
                <Image src="/images/content/owner.png" alt="Owner Details" width={460} height={460} />
            </div>

            <Glass className="flex flex-col gap-5 px-14 py-10 max-w-[580px] rounded-2xl" type="light">
                <div className="flex flex-col gap-1">
                    <h2 className="text-4xl font-bold">{name}</h2>
                    <p className="text-lg h-fit font-semibold mt-1 leading-4">{title}</p>
                    <p className="text-base h-fit">{education}</p>
                </div>

                <div className="h-0.5 bg-white/20 w-full max-w-[50%]" />

                <p className="text-sm max-w-2xl" dangerouslySetInnerHTML={{ __html: description }} />

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
