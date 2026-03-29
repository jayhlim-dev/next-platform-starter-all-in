import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { buildContactEmailHtml, buildContactEmailText } from '../../../lib/contact-email-template.js';

const REQUIRED = ['name', 'work_email', 'company_organization', 'project_overview'];

function getTransporter() {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_APP_PASSWORD;
    if (!user || !pass) {
        throw new Error('Missing SMTP_USER or SMTP_APP_PASSWORD in environment');
    }
    return nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
    });
}

function trim(value) {
    return value == null ? '' : String(value).trim();
}

export async function POST(request) {
    try {
        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
        }

        const data = {
            name: trim(body.name),
            role_title: trim(body.role_title),
            company_organization: trim(body.company_organization),
            work_email: trim(body.work_email),
            area_of_interest: trim(body.area_of_interest),
            project_overview: trim(body.project_overview),
        };

        for (const key of REQUIRED) {
            if (!data[key]) {
                return NextResponse.json({ error: `Missing required field: ${key}` }, { status: 400 });
            }
        }

        const to = process.env.CONTACT_EMAIL?.trim() || process.env.CONTACT_EMAIL_TO?.trim();
        if (!to) {
            return NextResponse.json(
                { error: 'Set CONTACT_EMAIL (or CONTACT_EMAIL_TO) in environment' },
                { status: 503 }
            );
        }

        const transporter = getTransporter();
        const from = process.env.SMTP_FROM?.trim() || process.env.SMTP_USER;
        const brandName = process.env.EMAIL_BRAND_NAME?.trim() || 'ScaleBio Partners';
        const subjectLine =
            process.env.CONTACT_EMAIL_SUBJECT?.trim() ||
            `${brandName} — New inquiry from ${data.name} (${data.company_organization})`;

        const html = buildContactEmailHtml(data, brandName);
        const text = buildContactEmailText(data, brandName);

        await transporter.sendMail({
            from,
            to,
            replyTo: data.work_email,
            subject: subjectLine,
            text,
            html,
        });

        return NextResponse.json({ ok: true, success: true });
    } catch (err) {
        console.error('Contact API error:', err);
        const msg = err.message || 'Failed to send message';
        const status = msg.includes('Missing SMTP') || msg.includes('CONTACT_EMAIL') ? 503 : 500;
        return NextResponse.json({ error: msg }, { status });
    }
}
