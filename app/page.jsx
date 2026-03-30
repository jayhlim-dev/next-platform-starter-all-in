import HeroSection from 'components/section/home/HeroSection';
import BoardSection from 'components/section/home/BoardSection';
import DecisionSupportSection from 'components/section/home/DecisionSupportSection';
import clsx from 'clsx';

export default function Page() {
    return (
        <div className={clsx(
            "min-h-screen w-full py-16 flex flex-col gap-16 ",
            'md:px-[162px] md:py-16'
            )} aria-label="Home">
            <HeroSection />
            <BoardSection />
            <DecisionSupportSection />
        </div>
    );
}
