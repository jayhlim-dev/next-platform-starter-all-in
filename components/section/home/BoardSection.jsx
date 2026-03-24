import Image from 'next/image';
import boardData from './json/boardData.json';
import { Glass } from 'components/glass';

export default function BoardSection() {
    const { title, subTitle, boardSector } = boardData;
    return (
        <div className="flex flex-col gap-6 text-white">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm max-w-2xl">{subTitle}</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {boardSector.map((sector) => (
                    <Glass key={sector.title} type="light" className="py-3 px-5 flex gap-6 rounded-2xl items-center">
                        {/* <div className="w-20 h-20 bg-[#233587]/40 rounded-full"> */}
                        <Image src={sector.image} alt={'section'} width={80} height={80} />
                        {/* </div> */}
                        <p className="w-full max-w-60 text-base font-medium ">{sector.title}</p>
                    </Glass>
                ))}
            </div>
        </div>
    );
}
