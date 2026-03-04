'use client';

import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const team = [
  {
    name: 'Dr. James Kipchoge',
    title: 'Founder & CEO',
    bio: 'Cybersecurity expert with 15+ years of experience',
  },
  {
    name: 'Sarah Omondi',
    title: 'Chief Security Officer',
    bio: 'Former CISO at major Kenyan financial institution',
  },
  {
    name: 'Victor Mutua',
    title: 'Lead Penetration Tester',
    bio: 'Certified Ethical Hacker with extensive enterprise experience',
  },
  {
    name: 'Grace Kariuki',
    title: 'Compliance Specialist',
    bio: 'Expert in GDPR, ISO 27001, and African regulations',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">About OmniTrust Africa</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Building Africa's most trusted cybersecurity partner
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  OmniTrust Africa was founded with a vision to bring world-class cybersecurity to organizations across Africa. We recognized that cyber threats don't respect borders, but solutions often didn't account for the unique needs of African businesses.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, we're proud to serve hundreds of organizations, from startups to Fortune 500 companies operating in Africa, protecting them from evolving cyber threats and helping them build resilient security postures.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg h-96 flex items-center justify-center">
                <p className="text-muted-foreground text-center">Building Trust Through Security</p>
              </div>
            </div>

            {/* Mission & Values */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <Card>
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To provide world-class cybersecurity solutions that protect African organizations and enable their digital transformation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To be Africa's most trusted and innovative cybersecurity partner, recognized for excellence and impact.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Integrity in all dealings</li>
                    <li>• Excellence in service</li>
                    <li>• Innovation in solutions</li>
                    <li>• Commitment to clients</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 md:px-8 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Leadership Team</h2>
              <p className="text-lg text-muted-foreground">
                Experienced professionals dedicated to your security
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <Card key={member.name}>
                  <CardHeader>
                    <div className="bg-primary/10 h-32 rounded-lg mb-4" />
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-sm mb-2">{member.title}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-muted-foreground">Organizations Protected</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">1,000+</p>
                <p className="text-muted-foreground">Vulnerabilities Found</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">99.9%</p>
                <p className="text-muted-foreground">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">24/7</p>
                <p className="text-muted-foreground">Support Available</p>
              </div>
            </div>
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
