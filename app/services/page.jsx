import HeroSection from 'components/section/services/HeroSection';
import ProcessWorkflowSection from 'components/section/services/ProcessWorkflowSection';
import HowWeSupportSection from 'components/section/services/HowWeSupport';
import clsx from 'clsx';
import { InView } from 'components/in-view';
import { animationClass } from 'lib/animations';

const scrollReveal = clsx('w-full', animationClass('fadeInUp', 'slow'));

/** Delay between each section’s entrance animation (ms). */
const SECTION_STAGGER_MS = 200;

const sections = [
    { id: 'hero', Component: HeroSection },
    { id: 'process', Component: ProcessWorkflowSection },
    { id: 'how-we-support', Component: HowWeSupportSection }
];

export default function Page() {
    return (
        <div className={clsx('min-h-screen w-full py-16 flex flex-col gap-16 ', 'lg:px-[162px]')} aria-label="Services">
            {sections.map(({ id, Component }, index) => (
                <InView
                    key={id}
                    once
                    threshold={0.2}
                    className="w-full"
                    outOfViewClassName="opacity-0"
                    inViewClassName={scrollReveal}
                    style={{ animationDelay: `${index * SECTION_STAGGER_MS}ms` }}
                >
                    <Component />
                </InView>
            ))}
        </div>
    );
}
