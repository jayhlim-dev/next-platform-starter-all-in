import HeroSection from 'components/section/services/HeroSection';
import ProcessWorkflowSection from 'components/section/services/ProcessWorkflowSection';
import HowWeSupportSection from 'components/section/services/HowWeSupport';
import clsx from 'clsx';
import { InView } from 'components/in-view';
import { animationClass } from 'lib/animations';
import Image from 'next/image';

/** Delay between each section’s entrance animation (ms). */
const SECTION_STAGGER_MS = 200;

const sections = [
    { id: 'hero', Component: HeroSection, inViewClassName: clsx('w-full', animationClass('fadeInUp', 'slow')) },
    { id: 'process', Component: ProcessWorkflowSection },
    { id: 'how-we-support', Component: HowWeSupportSection }
];

export default function Page() {
    return (
        <div
            className={clsx(
                'min-h-screen w-full py-16 flex flex-col gap-20',
                // 'lg:px-[min(2000rem,110px)]',
                'lg:pb-12 lg:px-[5%]',
                'xl:px-[162px] '
            )}
            aria-label="Services"
        >
            <div className="absolute top-0 left-0 w-full -z-2 block lg:hidden">
                <Image
                    src="/images/mobile/2-h.png"
                    alt="Noise"
                    width={1000}
                    height={1000}
                    priority
                    className="w-full h-full object-cover"
                />
            </div>

            {sections.map(({ id, Component, inViewClassName }, index) => (
                <InView
                    key={id}
                    once
                    threshold={0.2}
                    className="w-full"
                    outOfViewClassName="opacity-0"
                    inViewClassName={inViewClassName}
                    style={{ animationDelay: `${index * SECTION_STAGGER_MS}ms` }}
                >
                    <Component />
                </InView>
            ))}

            <div className="pointer-events-none absolute -bottom-2 left-0 w-full overflow-hidden -z-3 hidden lg:block">
                <Image
                    src="/images/desktop/2-a.png"
                    alt=""
                    width={1000}
                    height={1000}
                    priority
                    className="h-full w-full object-cover "
                    // className="h-full w-full object-cover motion-reduce:animate-none animate-home-bottom-bg-drift"
                />
            </div>
            <div className="pointer-events-none absolute -bottom-2 left-0 w-full overflow-hidden -z-3 block lg:hidden">
                <Image
                    src="/images/mobile/2-a.png"
                    alt=""
                    width={1000}
                    height={1000}
                    priority
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
