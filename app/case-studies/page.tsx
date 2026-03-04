'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { ArrowRight } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    title: 'E-Commerce Platform Security Overhaul',
    company: 'TechRetail Solutions',
    industry: 'E-commerce',
    challenge: 'High-risk vulnerabilities in customer payment systems',
    solution: 'Comprehensive penetration test and security audit',
    results: 'Identified and remediated 47 vulnerabilities, achieved PCI DSS compliance',
    excerpt: 'How we helped a growing e-commerce platform secure its payment infrastructure and protect customer data.',
  },
  {
    id: 2,
    title: 'Banking System Incident Response',
    company: 'FirstBank Kenya',
    industry: 'Financial Services',
    challenge: 'Active ransomware attack threatening operations',
    solution: '24/7 incident response and forensic investigation',
    results: 'Contained breach in 4 hours, recovered all data without paying ransom',
    excerpt: 'How rapid incident response saved a major bank from catastrophic data loss and expensive ransom.',
  },
  {
    id: 3,
    title: 'Healthcare Provider Compliance',
    company: 'EastAfrica Medical Group',
    industry: 'Healthcare',
    challenge: 'Non-compliance with healthcare data protection regulations',
    solution: 'Full compliance audit and implementation of controls',
    results: 'Achieved HIPAA and local compliance certifications',
    excerpt: 'How we helped a healthcare provider meet strict data protection requirements and build patient trust.',
  },
  {
    id: 4,
    title: 'Manufacturing Network Security',
    company: 'Industrial Solutions Ltd',
    industry: 'Manufacturing',
    challenge: 'Vulnerable IoT devices and industrial control systems',
    solution: 'Network segmentation and device security hardening',
    results: 'Reduced attack surface by 85%, zero incidents in 18 months',
    excerpt: 'How network segmentation protected critical manufacturing infrastructure from cyber attacks.',
  },
  {
    id: 5,
    title: 'Government Agency Security Assessment',
    company: 'National IT Authority',
    industry: 'Government',
    challenge: 'Ensuring security across multiple agencies and systems',
    solution: 'Multi-agency security assessment and recommendations',
    results: 'Standardized security practices across 12 agencies',
    excerpt: 'How comprehensive assessment improved security posture across government entities.',
  },
  {
    id: 6,
    title: 'SaaS Provider Security Implementation',
    company: 'CloudTech Africa',
    industry: 'Cloud Services',
    challenge: 'Meeting customer security and compliance requirements',
    solution: 'Security architecture design and penetration testing',
    results: 'Achieved SOC 2 certification and doubled customer base',
    excerpt: 'How security improvements became a competitive advantage for a SaaS provider.',
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Real results from helping organizations secure their digital assets
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {caseStudies.map((study) => (
                <Card key={study.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{study.title}</CardTitle>
                    <CardDescription>{study.company} • {study.industry}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col space-y-4">
                    <p className="text-muted-foreground">{study.excerpt}</p>

                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-foreground">Challenge</p>
                        <p className="text-muted-foreground">{study.challenge}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Results</p>
                        <p className="text-muted-foreground text-green-400">{study.results}</p>
                      </div>
                    </div>

                    <Link
                      href={`/case-studies/${study.id}`}
                      className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-4"
                    >
                      Read Full Case Study
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mb-16 py-12 border-t border-border">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">200+</p>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-muted-foreground">Vulnerabilities Fixed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">$50M+</p>
                <p className="text-muted-foreground">Risk Prevented</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">98%</p>
                <p className="text-muted-foreground">Client Retention</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 md:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Be Our Next Success Story?</h2>
            <p className="text-lg mb-8 opacity-90">
              Let's discuss how we can help secure your organization
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
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
