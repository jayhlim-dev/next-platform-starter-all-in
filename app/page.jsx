import HeroSection from 'components/section/home/HeroSection';
import BoardSection from 'components/section/home/BoardSection';
import DecisionSupportSection from 'components/section/home/DecisionSupportSection';

export default function Page() {
    return (
        <div className="min-h-screen w-full px-[162px] py-16 flex flex-col gap-16" aria-label="Home">
            <HeroSection />
            <BoardSection />
            <DecisionSupportSection />
        </div>
    );
}
