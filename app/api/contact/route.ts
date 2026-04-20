import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { createSessionClient } from "@/lib/supabase/session";
import {
  sendEmail,
  generateUserConfirmationEmail,
  generateAdminNotificationEmail,
} from "@/lib/email/resend";
import { contactFormSchema } from "@/lib/validations/contact";
import { verifyRecaptcha } from "@/lib/recaptcha/verify";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { recaptchaToken, ...formData } = body;

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);

      if (!recaptchaResult.success) {
        return NextResponse.json(
          {
            error:
              recaptchaResult.error ||
              "reCAPTCHA verification failed. Please try again.",
          },
          { status: 400 }
        );
      }

      // Log score for monitoring (optional)
      if (recaptchaResult.score !== undefined) {
        console.log(`reCAPTCHA score: ${recaptchaResult.score}`);
      }
    }

    const validatedData = contactFormSchema.parse(formData);

    // Create server-side Supabase client
    const supabase = createServerClient();

    // Insert contact into database
    const { data: contact, error: dbError } = await supabase
      .from("contacts")
      .insert({
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        message: validatedData.message,
        status: "new",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save contact information" },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    try {
      await sendEmail({
        to: validatedData.email,
        subject: "We received your message",
        html: generateUserConfirmationEmail(validatedData.firstName),
      });
    } catch (emailError) {
      console.error("Failed to send user confirmation email:", emailError);
      // Don't fail the request if email fails
    }

    // Send notification email to admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: "New Contact Submission",
          html: generateAdminNotificationEmail({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            phone: validatedData.phone,
            service: validatedData.service,
            message: validatedData.message,
          }),
        });
      }
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        contactId: contact.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid form data", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
