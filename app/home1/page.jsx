import { FloatAtoms } from 'components/float-atoms';
import { Glass } from 'components/glass';

export const metadata = {
    title: 'Home'
};

/** Figma node 194:2 — frame “home”: linear gradient only (no child layers). */
const HOME_GRADIENT =
    'linear-gradient(to top right, rgb(15, 76, 129) 0%, rgb(30, 127, 191) 49.57%, rgb(43, 191, 165) 100%)';

export default function HomePage() {
    return (
        <main className="min-h-screen w-full px-6 py-16" style={{ backgroundImage: HOME_GRADIENT }} aria-label="Home">
            <Glass className="mx-auto w-full max-w-[254px] min-h-[437px] overflow-hidden p-3">
                <FloatAtoms className="w-full" />
            </Glass>
        </main>
    );
}
