'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Shield, Users, Zap, TrendingUp, Lock, AlertCircle } from 'lucide-react';
import { SidebarNav } from '@/components/navigation/sidebar-nav';

const services = [
  {
    icon: AlertCircle,
    title: 'Vulnerability Assessment',
    description: 'Identify and prioritize security weaknesses in your systems',
  },
  {
    icon: Lock,
    title: 'Penetration Testing',
    description: 'Simulate real-world attacks to test your security defenses',
  },
  {
    icon: Shield,
    title: 'Security Audit',
    description: 'Comprehensive review of your security policies and controls',
  },
  {
    icon: TrendingUp,
    title: 'Compliance & Risk',
    description: 'Ensure compliance with GDPR, ISO 27001, and other standards',
  },
  {
    icon: Zap,
    title: 'Incident Response',
    description: 'Rapid response and recovery from security incidents',
  },
  {
    icon: Users,
    title: 'Security Awareness',
    description: 'Training programs to build a security-conscious culture',
  },
];

const features = [
  {
    title: 'Expert Team',
    description: 'Certified cybersecurity professionals with years of experience',
  },
  {
    title: 'Proven Track Record',
    description: 'Trusted by leading organizations across Africa',
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock monitoring and incident response',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      {/* Main Content */}
      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Cybersecurity Excellence</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Protect Your Digital Assets in Africa
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              OmniTrust Africa provides world-class cybersecurity solutions tailored for businesses across the continent. Detect threats, prevent breaches, and build a resilient security posture.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact?type=quote">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive cybersecurity solutions designed to protect your organization
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Icon className="w-8 h-8 text-primary mb-4" />
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">
                  View All Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 md:px-8 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose OmniTrust?</h2>
              <p className="text-lg text-muted-foreground">
                We combine expertise, innovation, and commitment to your security
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="p-8 bg-background rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Secure Your Future?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how OmniTrust can help protect your digital assets
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">OmniTrust</h3>
                <p className="text-sm text-muted-foreground">
                  Cybersecurity solutions for Africa
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
                  <li><Link href="/academy" className="hover:text-foreground">Academy</Link></li>
                  <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
                  <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-foreground">Terms</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 OmniTrust Africa. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
