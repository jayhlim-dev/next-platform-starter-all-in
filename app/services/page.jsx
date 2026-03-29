import HeroSection from 'components/section/services/HeroSection';
import BoardSection from 'components/section/home/BoardSection';
import DecisionSupportSection from 'components/section/home/DecisionSupportSection';
import ProcessWorkflowSection from 'components/section/services/ProcessWorkflowSection';
import HowWeSupportSection from 'components/section/services/HowWeSupport';

export default function Page() {
    return (
        <div className="min-h-screen w-full px-[162px] py-16 flex flex-col gap-16 " aria-label="Home">
            <HeroSection />
            <ProcessWorkflowSection />
            <HowWeSupportSection />
        </div>
    );
}
