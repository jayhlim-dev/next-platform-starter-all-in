import Link from 'next/link';

export default function HeroSection() {
    return (
        <div className="flex flex-col gap-4 h-90">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">ScaleBio Partners</h1>
            <p className="text-lg text-gray-500">
                ScaleBio Partners is a venture capital firm that invests in early-stage companies.
            </p>
            <button className="bg-white px-7 py-2 rounded-md text-blue-900 font-bold w-fit text-sm">
                <Link href="/contact" className="text-blue-900 no-underline">
                    LET'S TALK
                </Link>
            </button>
        </div>
    );
}
