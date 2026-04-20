interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "noreply@yourdomain.com",
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return response.json();
}

export function generateUserConfirmationEmail(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>We received your message</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                <tr>
                  <td style="padding: 48px 40px;">
                    <h1 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 600; color: #111827; line-height: 1.3;">
                      Thanks for reaching out, ${firstName}!
                    </h1>
                    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
                      We've received your message and our team will review it shortly.
                    </p>
                    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
                      We typically respond within 24-48 hours during business days. If your inquiry is urgent, feel free to reach out to us directly.
                    </p>
                    <div style="margin: 32px 0; padding: 24px; background-color: #f9fafb; border-radius: 12px; border-left: 4px solid #3b82f6;">
                      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #6b7280;">
                        <strong style="color: #111827;">What happens next?</strong><br>
                        Our team will carefully review your inquiry and get back to you with the information you need or next steps for your project.
                      </p>
                    </div>
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">
                      Best regards,<br>
                      <strong style="color: #111827;">The Team</strong>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px;">
                    <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
                      This is an automated confirmation email. Please do not reply to this message.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export function generateAdminNotificationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                <tr>
                  <td style="padding: 48px 40px;">
                    <div style="display: inline-block; padding: 8px 16px; background-color: #dbeafe; border-radius: 8px; margin-bottom: 24px;">
                      <span style="font-size: 12px; font-weight: 600; color: #1e40af; text-transform: uppercase; letter-spacing: 0.05em;">New Contact</span>
                    </div>
                    <h1 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 600; color: #111827; line-height: 1.3;">
                      New Contact Form Submission
                    </h1>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Full Name</p>
                          <p style="margin: 0; font-size: 16px; color: #111827;">${data.firstName} ${data.lastName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Email</p>
                          <p style="margin: 0; font-size: 16px; color: #111827;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a></p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Phone</p>
                          <p style="margin: 0; font-size: 16px; color: #111827;"><a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">${data.phone}</a></p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Service</p>
                          <p style="margin: 0; font-size: 16px; color: #111827;">${data.service}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px 0;">
                          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                          <div style="padding: 16px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #3b82f6;">
                            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${data.message}</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <div style="margin-top: 32px; padding: 20px; background-color: #f0fdf4; border-radius: 12px; border: 1px solid #86efac;">
                      <p style="margin: 0; font-size: 14px; color: #166534;">
                        <strong>Action Required:</strong> Review this submission in your dashboard and respond to the client.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px;">
                    <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
                      This is an automated notification from your contact form system.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
