import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { buildContactEmailHtml, buildContactEmailText } from '../../../lib/contact-email-template.js';
import { SITE_MAILBOX } from '../../../lib/site-mailbox.js';
import { SMTP_HOST } from '../../../lib/smtp-host.js';

const BRAND_NAME = 'ScaleBio Partners';

const REQUIRED = ['name', 'work_email', 'company_organization', 'project_overview'];

function getTransporter() {
    const pass = process.env.SMTP_APP_PASSWORD || process.env.SMTP_PASSWORD;
    /** Default 587 (STARTTLS). Use 465 + SSL only if you change code / Hostinger docs. */
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const secure = Number.isFinite(port) && port === 465;

    if (!pass) {
        throw new Error('Missing SMTP_PASSWORD (or SMTP_APP_PASSWORD) in environment');
    }

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number.isFinite(port) ? port : 587,
        secure,
        auth: { user: SITE_MAILBOX, pass },
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

        const transporter = getTransporter();
        const subjectLine = `${BRAND_NAME} — New inquiry from ${data.name} (${data.company_organization})`;

        const html = buildContactEmailHtml(data, BRAND_NAME);
        const text = buildContactEmailText(data, BRAND_NAME);

        await transporter.sendMail({
            from: SITE_MAILBOX,
            to: SITE_MAILBOX,
            replyTo: data.work_email,
            subject: subjectLine,
            text,
            html,
        });

        return NextResponse.json({ ok: true, success: true });
    } catch (err) {
        console.error('Contact API error:', err);
        const msg = err.message || 'Failed to send message';
        const status = msg.includes('Missing SMTP') ? 503 : 500;
        return NextResponse.json({ error: msg }, { status });
    }
}
