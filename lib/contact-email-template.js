/**
 * HTML + plain-text bodies for the website contact form (nodemailer).
 * Styles are inline for Gmail / Outlook compatibility.
 */

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function htmlFieldRow(label, value, { isEmail = false } = {}) {
    const display = value && String(value).trim() !== '' ? String(value) : '—';
    const inner = isEmail
        ? `<a href="mailto:${encodeURIComponent(display)}" style="color:#1a73e8;text-decoration:none;">${escapeHtml(display)}</a>`
        : escapeHtml(display).replace(/\n/g, '<br>');
    return `
<tr>
  <td style="padding:12px 16px 12px 0;border-bottom:1px solid #eef0f4;vertical-align:top;width:38%;">
    <span style="font-size:12px;font-weight:500;color:#5f6368;line-height:20px;letter-spacing:0.2px;">${escapeHtml(label)}</span>
  </td>
  <td style="padding:12px 0;border-bottom:1px solid #eef0f4;vertical-align:top;">
    <span style="font-size:14px;color:#202124;line-height:22px;">${inner}</span>
  </td>
</tr>`;
}

/**
 * @param {object} data - trimmed form fields (name, role_title, company_organization, work_email, area_of_interest, project_overview)
 * @param {string} brandName
 */
export function buildContactEmailHtml(data, brandName) {
    const rows = [
        htmlFieldRow('Full name', data.name),
        htmlFieldRow('Role / title', data.role_title || '—'),
        htmlFieldRow('Company / organization', data.company_organization),
        htmlFieldRow('Work email', data.work_email, { isEmail: true }),
        htmlFieldRow('Area of interest', data.area_of_interest || '—'),
        htmlFieldRow('Project overview', data.project_overview),
    ].join('');

    const year = new Date().getFullYear();

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Contact inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f8fc;-webkit-text-size-adjust:100%;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f6f8fc;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;border-collapse:separate;background-color:#ffffff;border:1px solid #dadce0;border-radius:8px;overflow:hidden;box-shadow:0 1px 2px rgba(60,64,67,0.08);">
        <tr>
          <td style="padding:0;background-color:#1a73e8;">
            <div style="padding:20px 24px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:500;color:rgba(255,255,255,0.9);letter-spacing:0.8px;text-transform:uppercase;">${escapeHtml(brandName)}</p>
              <h1 style="margin:0;font-size:20px;font-weight:500;color:#ffffff;line-height:28px;font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;">New contact form inquiry</h1>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 24px 4px;font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;">
            <p style="margin:16px 0 8px;font-size:14px;color:#3c4043;line-height:22px;">The following details were submitted via your website contact form. You can reply directly to this message to reach the sender.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 24px 8px;font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
              ${rows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px 20px;border-top:1px solid #eef0f4;background-color:#f8f9fa;font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;">
            <p style="margin:0;font-size:12px;color:#5f6368;line-height:18px;">This is an automated notification. Please do not share sensitive credentials by email.</p>
          </td>
        </tr>
      </table>
      <p style="margin:24px 0 0;font-size:11px;color:#80868b;font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;max-width:560px;">© ${year} ${escapeHtml(brandName)}</p>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/**
 * @param {object} data
 * @param {string} brandName
 */
export function buildContactEmailText(data, brandName) {
    const lines = [
        `${brandName} — Contact form submission`,
        '',
        'You received a new inquiry through the website contact form.',
        'Reply to this email to respond directly to the sender.',
        '',
        '────────────────────────',
        `Full name:              ${data.name}`,
        `Role / title:           ${data.role_title || '—'}`,
        `Company / organization: ${data.company_organization}`,
        `Work email:             ${data.work_email}`,
        `Area of interest:       ${data.area_of_interest || '—'}`,
        '────────────────────────',
        'Project overview:',
        data.project_overview,
        '',
        `— ${brandName} (automated message)`,
    ];
    return lines.join('\n');
}
