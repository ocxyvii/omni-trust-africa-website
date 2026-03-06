'use server';

import { prisma } from '@/lib/prisma';

export async function submitBrief(data: {
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  companySize: string;
  country: string;
  website: string;
  solutionType: string;
  specificServices: string[];
  projectDescription: string;
  urgency: string;
  budget: string;
  hasExistingVendor: string;
  heardAboutUs: string;
}) {
  try {
    const brief = await prisma.clientBrief.create({
      data: {
        ...data,
        specificServices: JSON.stringify(data.specificServices),
      },
    });
    return { success: true, id: brief.id };
  } catch (error) {
    console.error('Failed to save brief:', error);
    return { success: false, error: 'Failed to save brief' };
  }
}