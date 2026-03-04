'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Startup',
    description: 'Perfect for emerging businesses',
    price: 'Custom',
    features: [
      'Annual security audit',
      'Quarterly vulnerability assessment',
      'Email support',
      'Basic compliance review',
      'Up to 2 security consultations',
    ],
  },
  {
    name: 'Professional',
    description: 'For growing organizations',
    price: 'Custom',
    highlighted: true,
    features: [
      'Bi-annual penetration testing',
      'Monthly vulnerability scans',
      'Priority email & phone support',
      'Comprehensive compliance review',
      'Monthly security consultations',
      'Incident response retainer',
      'Security awareness training',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large enterprises',
    price: 'Custom',
    features: [
      'Quarterly penetration testing',
      'Weekly vulnerability scans',
      ' 24/7 dedicated support',
      'Full compliance management',
      'Weekly security consultations',
      'Priority incident response',
      'Custom security training',
      'Managed security services',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your organization's security needs
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`flex flex-col ${
                    plan.highlighted ? 'md:scale-105 border-primary shadow-lg' : ''
                  }`}
                >
                  {plan.highlighted && (
                    <div className="bg-primary text-primary-foreground px-4 py-2 text-center text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <p className="text-muted-foreground text-sm mt-2">Contact us for custom quote</p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      variant={plan.highlighted ? 'default' : 'outline'}
                      className="w-full"
                    >
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-semibold text-lg mb-2">Can I customize a plan?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! All our plans are highly customizable. Contact our sales team to discuss your specific needs.
                  </p>
                </div>

                <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-semibold text-lg mb-2">Do you offer discounts for longer commitments?</h3>
                  <p className="text-muted-foreground">
                    Yes, we offer volume discounts for multi-year contracts. Speak with our team for details.
                  </p>
                </div>

                <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-semibold text-lg mb-2">What's included in support?</h3>
                  <p className="text-muted-foreground">
                    Support includes consultations, report reviews, and recommendations. Enterprise plans include 24/7 incident response.
                  </p>
                </div>

                <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                  <h3 className="font-semibold text-lg mb-2">Is there a setup fee?</h3>
                  <p className="text-muted-foreground">
                    We may charge a one-time setup fee depending on the scope of services. This will be discussed during the consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Protect Your Business?</h2>
            <p className="text-lg mb-8 opacity-90">
              Let's discuss which plan is right for your organization
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
            <p>&copy; 2024 OmniTrust Africa. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
