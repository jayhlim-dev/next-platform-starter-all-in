import getInTouchData from './json/getInTouchData.json';

export default function HeroSection() {
    const { title } = getInTouchData;

    return (
        <div className="flex flex-col gap-4 h-90 pt-20">
            <h1
                className="text-6xl font-bold -tracking-normal capitalize"
                dangerouslySetInnerHTML={{ __html: title }}
            />
        </div>
    );
}
