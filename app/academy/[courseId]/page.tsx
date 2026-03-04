'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { notFound } from 'next/navigation';
import { BookOpen, Clock, Users, Award, CheckCircle2 } from 'lucide-react';

const courses: Record<string, any> = {
  'web-security-101': {
    title: 'Web Security Fundamentals',
    description: 'Learn the basics of web application security',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 12,
    price: '$199',
    instructors: ['Dr. James Kipchoge'],
    image: 'Web security basics including OWASP top 10, authentication, and secure coding practices',
    learningOutcomes: [
      'Understand common web application vulnerabilities',
      'Learn about OWASP Top 10 and how to prevent them',
      'Master secure authentication and session management',
      'Implement security best practices in your code',
      'Perform basic security testing',
    ],
    curriculum: [
      { module: 1, title: 'Web Security Basics', lessons: 3 },
      { module: 2, title: 'OWASP Top 10', lessons: 3 },
      { module: 3, title: 'Authentication & Session Management', lessons: 2 },
      { module: 4, title: 'Secure Coding Practices', lessons: 2 },
      { module: 5, title: 'Security Testing', lessons: 2 },
    ],
  },
  'network-security': {
    title: 'Network Security Essentials',
    description: 'Master network security concepts and tools',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: 18,
    price: '$299',
    instructors: ['Sarah Omondi'],
    image: 'Network security covering firewalls, intrusion detection, and network hardening',
    learningOutcomes: [
      'Understand network architecture and protocols',
      'Learn firewall configuration and management',
      'Master intrusion detection and prevention systems',
      'Implement network segmentation',
      'Analyze network traffic for security threats',
    ],
    curriculum: [
      { module: 1, title: 'Network Fundamentals', lessons: 3 },
      { module: 2, title: 'Firewalls & Access Control', lessons: 3 },
      { module: 3, title: 'Intrusion Detection Systems', lessons: 3 },
      { module: 4, title: 'VPN & Encryption', lessons: 3 },
      { module: 5, title: 'Network Monitoring', lessons: 3 },
      { module: 6, title: 'Incident Response', lessons: 3 },
    ],
  },
  'penetration-testing-101': {
    title: 'Introduction to Penetration Testing',
    description: 'Start your ethical hacking journey',
    level: 'Intermediate',
    duration: '8 weeks',
    lessons: 24,
    price: '$399',
    instructors: ['Victor Mutua'],
    image: 'Penetration testing fundamentals including reconnaissance, scanning, and exploitation',
    learningOutcomes: [
      'Understand the penetration testing methodology',
      'Perform reconnaissance and information gathering',
      'Execute scanning and enumeration attacks',
      'Develop exploit code and payloads',
      'Generate professional penetration test reports',
    ],
    curriculum: [
      { module: 1, title: 'Ethical Hacking Basics', lessons: 2 },
      { module: 2, title: 'Reconnaissance', lessons: 3 },
      { module: 3, title: 'Scanning & Enumeration', lessons: 4 },
      { module: 4, title: 'Exploitation Techniques', lessons: 5 },
      { module: 5, title: 'Post-Exploitation', lessons: 4 },
      { module: 6, title: 'Reporting & Documentation', lessons: 3 },
      { module: 7, title: 'Capstone Project', lessons: 3 },
    ],
  },
};

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = courses[params.courseId];

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <Link href="/academy" className="text-primary hover:underline text-sm mb-4 inline-block">
              &larr; Back to Academy
            </Link>
            <h1 className="text-5xl font-bold mb-6">{course.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {course.description}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Content */}
              <div className="md:col-span-2">
                {/* Overview Card */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-2xl">Course Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-4">What You'll Learn</h3>
                      <ul className="space-y-2">
                        {course.learningOutcomes.map((outcome: string) => (
                          <li key={outcome} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Curriculum */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Course Curriculum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.curriculum.map((module: any) => (
                        <div key={module.module} className="p-4 border border-border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">Module {module.module}: {module.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{module.lessons} lessons</p>
                            </div>
                            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">
                              Lesson {module.lessons}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div>
                <Card className="sticky top-8 mb-8">
                  <CardHeader>
                    <CardTitle className="text-2xl">{course.price}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-semibold">{course.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-muted-foreground">Lessons</p>
                          <p className="font-semibold">{course.lessons} lessons</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-muted-foreground">Level</p>
                          <p className="font-semibold">{course.level}</p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Enroll Now
                    </Button>

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-semibold mb-2">Instructors</h4>
                      {course.instructors.map((instructor: string) => (
                        <p key={instructor} className="text-sm text-muted-foreground">{instructor}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li>Basic computer knowledge</li>
                      <li>Linux familiarity (for advanced courses)</li>
                      <li>Programming basics (for some courses)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 md:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg mb-8 opacity-90">
              Invest in your cybersecurity career today
            </p>
            <Button size="lg" variant="secondary">
              Enroll Now
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
