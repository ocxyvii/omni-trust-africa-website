import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = newsletterSchema.parse(body);

    // TODO: Integrate with email service or Resend
    // const response = await resend.contacts.create({
    //   email: validatedData.email,
    //   audienceId: 'newsletter-audience-id',
    // });

    console.log('Newsletter subscription:', validatedData);

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! Check your email for confirmation.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again.',
      },
      { status: 500 }
    );
  }
}
