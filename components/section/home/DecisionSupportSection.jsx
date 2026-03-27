import Link from 'next/link';
import supportData from './json/supportData.json';
import { Glass } from 'components/glass';

export default function DecisionSupportSection() {
    const { title, subTitle, supportSector } = supportData;
    return (
        <Glass type="light" useHoverAnimation={false} className="p-10 py-8! flex rounded-2xl flex-col gap-6 text-white">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm max-w-2xl">{subTitle}</p>
            </div>
            <div className="grid grid-cols-4 gap-6">
                {supportSector.map((sector, index) => (
                    <Glass
                        key={sector.title}
                        type="light"
                        className="py-6 px-7 rounded-2xl items-center justify-between h-100 flex flex-col gap-2"
                    >
                        <h3 className="text-2xl font-bold leading-9">{sector.title}</h3>
                        <div className="flex gap-3 flex-col">
                            <div className="w-12 h-0.5 bg-white rounded-full" />
                            <p className="text-sm text-white">{sector.description}</p>
                            <p className="text-5xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] mt-2">
                                {String(index + 1).padStart(2, '0')}
                            </p>
                        </div>
                    </Glass>
                ))}
            </div>
        </Glass>
    );
}
