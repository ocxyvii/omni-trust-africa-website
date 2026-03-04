'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { MapPin, Briefcase, DollarSign } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Penetration Tester',
    department: 'Security',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    salary: 'Competitive',
    description: 'We are looking for an experienced penetration tester to join our growing team.',
  },
  {
    id: 2,
    title: 'Security Analyst',
    department: 'Security Operations',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    salary: 'Competitive',
    description: 'Help us monitor, analyze, and respond to security threats across our client infrastructure.',
  },
  {
    id: 3,
    title: 'Cloud Security Engineer',
    department: 'Infrastructure',
    location: 'Remote (Africa)',
    type: 'Full-time',
    salary: 'Competitive',
    description: 'Secure cloud infrastructure and help our clients build secure cloud architectures.',
  },
  {
    id: 4,
    title: 'Business Development Manager',
    department: 'Sales',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    salary: 'Competitive',
    description: 'Grow our client base and partnerships across East Africa.',
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Help us secure Africa. Build a meaningful career in cybersecurity.
            </p>
          </div>
        </section>

        {/* Why Join */}
        <section className="py-20 px-4 md:px-8 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Join OmniTrust?</h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="p-6 bg-background rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-2">Innovative Work</h3>
                <p className="text-muted-foreground text-sm">
                  Work on cutting-edge cybersecurity challenges that protect African organizations.
                </p>
              </div>

              <div className="p-6 bg-background rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
                <p className="text-muted-foreground text-sm">
                  Access training, certifications, and mentorship from industry experts.
                </p>
              </div>

              <div className="p-6 bg-background rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-2">Competitive Benefits</h3>
                <p className="text-muted-foreground text-sm">
                  Competitive salary, health insurance, and professional development support.
                </p>
              </div>

              <div className="p-6 bg-background rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-2">Inclusive Culture</h3>
                <p className="text-muted-foreground text-sm">
                  Join a diverse team committed to excellence and mutual respect.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Open Positions</h2>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription>{job.department}</CardDescription>
                      </div>
                      <span className="text-sm font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {job.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground">{job.description}</p>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{job.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{job.salary}</span>
                      </div>
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/careers/${job.id}`}>View & Apply</Link>
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
            <h2 className="text-4xl font-bold mb-4">Don't See a Fitting Role?</h2>
            <p className="text-lg mb-8 opacity-90">
              Send us your CV and let's explore opportunities together
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get in Touch</Link>
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
