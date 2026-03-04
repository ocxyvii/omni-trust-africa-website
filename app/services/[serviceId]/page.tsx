'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';

const services: Record<string, any> = {
  'vulnerability-assessment': {
    title: 'Vulnerability Assessment',
    description: 'Identify and prioritize security weaknesses before attackers do',
    fullDescription: 'Our comprehensive vulnerability assessment service scans your entire infrastructure to identify potential security gaps. We use industry-leading tools combined with manual testing to ensure no stone is left unturned.',
    deliverables: [
      'Network vulnerability scan',
      'Web application assessment',
      'Detailed findings report',
      'Risk prioritization matrix',
      'Remediation recommendations',
    ],
    timeline: '2-4 weeks',
    price: 'Custom',
  },
  'penetration-testing': {
    title: 'Penetration Testing',
    description: 'Simulate real-world attacks to test your security defenses',
    fullDescription: 'Our ethical hackers attempt to breach your systems using the same techniques real attackers use. This hands-on testing reveals how your defenses hold up under realistic attack scenarios.',
    deliverables: [
      'External penetration test',
      'Internal penetration test',
      'Web application testing',
      'Executive summary report',
      'Technical findings documentation',
      'Post-test remediation support',
    ],
    timeline: '3-6 weeks',
    price: 'Custom',
  },
  'security-audit': {
    title: 'Security Audit',
    description: 'Comprehensive review of your security policies and controls',
    fullDescription: 'We conduct a detailed audit of your security posture, examining policies, configurations, access controls, and compliance measures to identify improvement areas.',
    deliverables: [
      'Security policy review',
      'Control effectiveness assessment',
      'Compliance audit',
      'Configuration review',
      'Access control audit',
      'Improvement roadmap',
    ],
    timeline: '3-4 weeks',
    price: 'Custom',
  },
};

export default function ServiceDetailPage({
  params,
}: {
  params: { serviceId: string };
}) {
  const service = services[params.serviceId];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <Link href="/services" className="text-primary hover:underline text-sm mb-4 inline-block">
              &larr; Back to Services
            </Link>
            <h1 className="text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {service.description}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Content */}
              <div className="md:col-span-2">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-2xl">Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground leading-relaxed">
                      {service.fullDescription}
                    </p>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">Key Deliverables</h3>
                      <ul className="space-y-2">
                        {service.deliverables.map((item: string) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Process Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Our Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { step: 1, title: 'Discovery', description: 'We gather information about your systems and environment' },
                        { step: 2, title: 'Scoping', description: 'Define the exact scope and objectives of the engagement' },
                        { step: 3, title: 'Execution', description: 'Conduct the assessment using industry-best practices' },
                        { step: 4, title: 'Reporting', description: 'Deliver comprehensive findings and recommendations' },
                        { step: 5, title: 'Support', description: 'Assist with remediation and follow-up testing' },
                      ].map((phase) => (
                        <div key={phase.step} className="flex gap-4 pb-4 border-b border-border last:border-0">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                              {phase.step}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{phase.title}</h4>
                            <p className="text-sm text-muted-foreground">{phase.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div>
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Quick Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                      <p className="font-semibold">{service.timeline}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Investment</p>
                      <p className="font-semibold text-lg text-primary">{service.price}</p>
                    </div>

                    <Button asChild className="w-full">
                      <Link href="/contact">
                        Request Quote
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">Schedule Consultation</Link>
                    </Button>

                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Have questions? Contact our team at{' '}
                        <a href="mailto:info@omnitrust.africa" className="text-primary hover:underline">
                          info@omnitrust.africa
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 md:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Let's discuss how we can help protect your organization
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us Today</Link>
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
