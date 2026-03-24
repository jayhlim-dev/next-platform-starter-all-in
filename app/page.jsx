import HeroSection from 'components/section/home/HeroSection';
import BoardSection from 'components/section/home/BoardSection';
export default function Page() {
    return (
        <div className="min-h-screen w-full px-38 py-16 flex flex-col gap-16" aria-label="Home">
            <HeroSection />
            <BoardSection />
        </div>
    );
}
