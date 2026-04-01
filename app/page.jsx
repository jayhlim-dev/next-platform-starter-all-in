import HeroSection from 'components/section/home/HeroSection';
import BoardSection from 'components/section/home/BoardSection';
import DecisionSupportSection from 'components/section/home/DecisionSupportSection';
import clsx from 'clsx';
import { InView } from 'components/in-view';
import { animationClass } from 'lib/animations';

const scrollReveal = clsx('w-full', animationClass('fadeInUp', 'slow'));

/** Delay between each section’s entrance animation (ms). */
const SECTION_STAGGER_MS = 200;

const revealedSections = [
    { id: 'board', Component: BoardSection },
    { id: 'decision', Component: DecisionSupportSection }
];

export default function Page() {
    return (
        <div
            className={clsx(
                'min-h-screen w-full flex flex-col gap-16 py-16',
                'lg:px-[10%]'
            )}
            aria-label="Home"
        >
            <HeroSection />
            {revealedSections.map(({ id, Component }, index) => (
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
