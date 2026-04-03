import HeroSection from 'components/section/home/HeroSection';
import BoardSection from 'components/section/home/BoardSection';
import DecisionSupportSection from 'components/section/home/DecisionSupportSection';
import clsx from 'clsx';
import { InView } from 'components/in-view';
import { animationClass } from 'lib/animations';
import Image from 'next/image';

/** Delay between each section’s entrance animation (ms). */
const SECTION_STAGGER_MS = 200;

/**
 * Do not put opacity/transform keyframe animations on an InView wrapper that
 * contains Glass: backdrop-filter on descendants samples incorrectly (looks
 * like plain transparency). Use a plain `w-full` in-view class and rely on
 * `outOfViewClassName="opacity-0"` for a snap-in reveal, or animate inner
 * non-glass nodes only.
 */
const revealedSections = [
    {
        id: 'hero',
        Component: HeroSection,
        inViewClassName: clsx('w-full', animationClass('fadeInUp', 'slow'))
    },
    { id: 'board', Component: BoardSection, inViewClassName: 'w-full' },
    { id: 'decision', Component: DecisionSupportSection, inViewClassName: 'w-full' }
];

export default function Page() {
    return (
        <div
            className={clsx('min-h-screen w-full flex flex-col gap-16 py-16', 'lg:px-[10%] min-[1700px]:px-[16%]!')}
            aria-label="Home"
        >
            <div className="absolute top-0 left-0 w-full -z-3 hidden lg:block">
                <Image
                    src="/images/desktop/1-a.png"
                    alt="Noise"
                    width={1000}
                    height={1000}
                    priority
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="absolute top-0 left-0 w-full -z-2 block lg:hidden">
                <Image
                    src="/images/mobile/1-h.png"
                    alt="Noise"
                    width={1000}
                    height={1000}
                    priority
                    className="w-full h-full object-cover"
                />
            </div>
            {revealedSections.map(({ id, Component, inViewClassName }, index) => (
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

            <div
                className={clsx(
                    'pointer-events-none absolute -bottom-2 left-0 w-full overflow-hidden -z-3 hidden lg:block',
                    // Smooth pull from 1700px → ~2600px (was many steps); caps at -67.5rem (~bottom-270)
                    'min-[1700px]:bottom-[clamp(-67.5rem,calc(-20rem-(100vw-1700px)*0.844),-20rem)]!'
                )}
            >
                <Image
                    src="/images/desktop/1-b-n1.png"
                    alt=""
                    width={1000}
                    height={1000}
                    priority
                    className="h-full w-full object-cover object-bottom"
                />
            </div>
            <div
                className={clsx(
                    'pointer-events-none absolute -bottom-2 left-0 w-full overflow-hidden -z-3 block lg:hidden',
                    'xl:hidden',
                    'min-[455]:bottom-[clamp(-67.5rem,calc(-20rem-(100vw-455)*0.844),-20rem)]!'
                )}
            >
                <Image
                    src="/images/mobile/1-a2.png"
                    alt=""
                    width={1000}
                    height={1000}
                    priority
                    className="h-full w-full object-cover object-bottom"
                />
            </div>
        </div>
    );
}
