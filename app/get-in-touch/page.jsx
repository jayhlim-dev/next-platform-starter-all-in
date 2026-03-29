import ContactFormSection from 'components/section/get-in-touch/ContactFormSection';
import HeroSection from 'components/section/get-in-touch/HeroSection';
import OwnerDetailsSection from 'components/section/get-in-touch/OwnerDetailsSection';

export default function Page() {
    return (
        <div className="min-h-screen w-full px-[162px] py-16 flex flex-col gap-16 " aria-label="Home">
            <HeroSection />
            <OwnerDetailsSection />
            <ContactFormSection />
        </div>
    );
}
