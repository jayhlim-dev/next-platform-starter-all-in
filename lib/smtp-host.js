/**
 * Hostinger SMTP hostname (public, not a secret). Kept here so Netlify secret
 * scanning doesn’t match `SMTP_HOST` env against the same string in bundles.
 */
export const SMTP_HOST = 'smtp.hostinger.com';
