import clsx from 'clsx';
import { InView } from 'components/in-view';
import { animationClass } from 'lib/animations';
import ContactFormSection from 'components/section/get-in-touch/ContactFormSection';
import HeroSection from 'components/section/get-in-touch/HeroSection';
import OwnerDetailsSection from 'components/section/get-in-touch/OwnerDetailsSection';

const sections = [
    { id: 'hero', Component: HeroSection },
    { id: 'owner-details', Component: OwnerDetailsSection },
    { id: 'contact-form', Component: ContactFormSection }
];

const scrollReveal = clsx('w-full', animationClass('fadeInUp', 'slow'));

/** Delay between each section’s entrance animation (ms). */
const SECTION_STAGGER_MS = 200;

export default function Page() {
    return (
        <div
            className={clsx('min-h-screen w-full py-16 flex flex-col gap-4 ', 'lg:px-[162px] lg:gap-16')}
            aria-label="Get In Touch"
        >
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
