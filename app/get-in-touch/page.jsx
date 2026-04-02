import clsx from 'clsx';
import { InView } from 'components/in-view';
import { animationClass } from 'lib/animations';
import ContactFormSection from 'components/section/get-in-touch/ContactFormSection';
import HeroSection from 'components/section/get-in-touch/HeroSection';
import OwnerDetailsSection from 'components/section/get-in-touch/OwnerDetailsSection';
import Image from 'next/image';

const sections = [
    { id: 'hero', Component: HeroSection, inViewClassName: clsx('w-full', animationClass('fadeInUp', 'slow')) },
    { id: 'owner-details', Component: OwnerDetailsSection },
    { id: 'contact-form', Component: ContactFormSection }
];

/** Delay between each section’s entrance animation (ms). */
const SECTION_STAGGER_MS = 200;

export default function Page() {
    return (
        <div
            className={clsx('min-h-screen w-full py-16 flex flex-col gap-4 ', 'lg:px-[162px]')}
            aria-label="Get In Touch"
        >
            <div className="absolute top-0 left-0 w-full -z-2 hidden lg:block">
                <Image
                    src="/images/desktop/3-a.png"
                    alt="Noise"
                    width={1000}
                    height={1000}
                    priority
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute top-0 left-0 w-full -z-2 block lg:hidden">
                <Image
                    src="/images/mobile/3-h.png"
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
                    src="/images/desktop/3-b.png"
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
                    src="/images/mobile/3-a.png"
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
