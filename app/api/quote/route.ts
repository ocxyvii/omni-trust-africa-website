import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const quoteSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string(),
  serviceType: z.string().min(1, 'Service type is required'),
  companySize: z.string().min(1, 'Company size is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = quoteSchema.parse(body);

    // TODO: Integrate with CRM and email service
    // const response = await resend.emails.send({
    //   from: 'quotes@omnitrust.africa',
    //   to: 'sales@omnitrust.africa',
    //   subject: `New Quote Request: ${validatedData.companyName}`,
    //   html: `
    //     <h2>New Quote Request</h2>
    //     <p><strong>Company:</strong> ${validatedData.companyName}</p>
    //     <p><strong>Contact:</strong> ${validatedData.email}</p>
    //     <p><strong>Phone:</strong> ${validatedData.phone}</p>
    //     <p><strong>Service:</strong> ${validatedData.serviceType}</p>
    //     <p><strong>Company Size:</strong> ${validatedData.companySize}</p>
    //     <p><strong>Description:</strong></p>
    //     <p>${validatedData.description}</p>
    //   `,
    // });

    console.log('Quote request:', validatedData);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your quote request! We will contact you within 24 hours.',
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
