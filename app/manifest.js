import { siteDescription, siteName } from '../lib/site';

/** Web app manifest for install prompts and mobile browser chrome. */
export default function manifest() {
    return {
        name: siteName,
        short_name: siteName,
        description: siteDescription,
        start_url: '/',
        display: 'standalone',
        icons: [
            {
                src: '/favicon.png',
                sizes: '48x48',
                type: 'image/png',
                purpose: 'any'
            }
        ]
    };
}
