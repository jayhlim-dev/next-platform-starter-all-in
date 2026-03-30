import HeroSection from 'components/section/services/HeroSection';
import BoardSection from 'components/section/home/BoardSection';
import DecisionSupportSection from 'components/section/home/DecisionSupportSection';
import ProcessWorkflowSection from 'components/section/services/ProcessWorkflowSection';
import HowWeSupportSection from 'components/section/services/HowWeSupport';
import clsx from 'clsx';

export default function Page() {
    return (
        <div className={clsx('min-h-screen w-full py-16 flex flex-col gap-16 ', 'lg:px-[162px]')} aria-label="Home">
            <HeroSection />
            <ProcessWorkflowSection />
            <HowWeSupportSection />
        </div>
    );
}
