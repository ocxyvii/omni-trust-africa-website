'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { BookOpen, Clock, Users } from 'lucide-react';

const courses = [
  {
    id: 'web-security-101',
    title: 'Web Security Fundamentals',
    description: 'Learn the basics of web application security',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 12,
    price: '$199',
  },
  {
    id: 'network-security',
    title: 'Network Security Essentials',
    description: 'Master network security concepts and tools',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: 18,
    price: '$299',
  },
  {
    id: 'penetration-testing-101',
    title: 'Introduction to Penetration Testing',
    description: 'Start your ethical hacking journey',
    level: 'Intermediate',
    duration: '8 weeks',
    lessons: 24,
    price: '$399',
  },
  {
    id: 'incident-response',
    title: 'Incident Response Mastery',
    description: 'Learn to respond to security incidents',
    level: 'Advanced',
    duration: '6 weeks',
    lessons: 20,
    price: '$499',
  },
];

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">OmniTrust Academy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Learn cybersecurity from industry experts. Develop skills that matter.
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
              <p className="text-lg text-muted-foreground">
                Choose from our carefully curated cybersecurity courses
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <BookOpen className="w-8 h-8 text-primary" />
                      <span className="text-sm font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {course.level}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-semibold">{course.duration}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Lessons</p>
                        <div className="flex items-center gap-2 mt-1">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span className="font-semibold">{course.lessons}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-semibold mt-1">{course.price}</p>
                      </div>
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/academy/${course.id}`}>View Course</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 md:px-8 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose OmniTrust Academy?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-background rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-3">Expert Instructors</h3>
                <p className="text-muted-foreground">
                  Learn from industry veterans with decades of combined experience
                </p>
              </div>
              <div className="p-8 bg-background rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-3">Hands-On Learning</h3>
                <p className="text-muted-foreground">
                  Practice with real-world scenarios and lab environments
                </p>
              </div>
              <div className="p-8 bg-background rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-3">Certification</h3>
                <p className="text-muted-foreground">
                  Earn recognized credentials that boost your career
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-lg p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Start Your Learning Journey</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of security professionals advancing their careers with OmniTrust Academy
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact for Corporate Training</Link>
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
