'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { SidebarNav } from '@/components/navigation/sidebar-nav';

const servicesDetails = [
  {
    id: 'vulnerability-assessment',
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
    price: 'Custom',
    timeline: '2-4 weeks',
  },
  {
    id: 'penetration-testing',
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
    price: 'Custom',
    timeline: '3-6 weeks',
  },
  {
    id: 'security-audit',
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
    price: 'Custom',
    timeline: '3-4 weeks',
  },
  {
    id: 'compliance-risk',
    title: 'Compliance & Risk Management',
    description: 'Ensure compliance with GDPR, ISO 27001, and other standards',
    fullDescription: 'Navigate the complex world of regulatory compliance with our expert guidance. We help you achieve and maintain compliance with relevant standards and regulations.',
    deliverables: [
      'Compliance gap analysis',
      'Framework implementation',
      'Documentation & policies',
      'Staff training programs',
      'Audit support',
      'Ongoing compliance monitoring',
    ],
    price: 'Custom',
    timeline: 'Ongoing',
  },
  {
    id: 'incident-response',
    title: 'Incident Response & Recovery',
    description: 'Rapid response and recovery from security incidents',
    fullDescription: 'When security incidents occur, time is critical. Our incident response team provides 24/7 support to contain threats, investigate breaches, and restore normal operations.',
    deliverables: [
      '24/7 hotline support',
      'Immediate incident containment',
      'Forensic investigation',
      'Root cause analysis',
      'Recovery assistance',
      'Post-incident review',
    ],
    price: 'Custom',
    timeline: '24-48 hours',
  },
  {
    id: 'security-awareness',
    title: 'Security Awareness Training',
    description: 'Training programs to build a security-conscious culture',
    fullDescription: 'Your employees are your first line of defense. We provide tailored training to help your team understand security threats and best practices.',
    deliverables: [
      'Customized training modules',
      'Phishing simulation campaigns',
      'Policy documentation',
      'E-learning platform access',
      'Regular awareness updates',
      'Staff certification',
    ],
    price: 'Custom',
    timeline: 'Flexible',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive cybersecurity solutions designed to protect your organization from evolving threats
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {servicesDetails.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-foreground">{service.fullDescription}</p>

                    <div>
                      <h4 className="font-semibold mb-3">Key Deliverables:</h4>
                      <ul className="space-y-2">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                      <p className="font-semibold">{service.timeline}</p>
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/services/${service.id}`}>
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Not Sure Which Service You Need?</h2>
            <p className="text-lg mb-8 opacity-90">
              Our experts can assess your needs and recommend the perfect solution
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
