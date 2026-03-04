'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 'zero-trust-security',
    title: 'Zero Trust Security: The Future of Cybersecurity',
    excerpt: 'Discover why zero trust architecture is becoming essential for modern organizations',
    author: 'Sarah Omondi',
    date: '2024-03-15',
    category: 'Security Strategy',
    readTime: '8 min read',
  },
  {
    id: 'ransomware-prevention',
    title: '5 Effective Strategies to Prevent Ransomware Attacks',
    excerpt: 'Learn proven techniques to protect your organization from ransomware threats',
    author: 'Victor Mutua',
    date: '2024-03-10',
    category: 'Threat Prevention',
    readTime: '6 min read',
  },
  {
    id: 'ai-cybersecurity',
    title: 'How AI is Transforming Cybersecurity',
    excerpt: 'Explore the role of artificial intelligence in modern threat detection and response',
    author: 'Dr. James Kipchoge',
    date: '2024-03-05',
    category: 'Emerging Technologies',
    readTime: '10 min read',
  },
  {
    id: 'gdpr-compliance',
    title: 'GDPR Compliance for African Businesses',
    excerpt: 'A comprehensive guide to achieving and maintaining GDPR compliance',
    author: 'Grace Kariuki',
    date: '2024-02-28',
    category: 'Compliance',
    readTime: '12 min read',
  },
  {
    id: 'incident-response-101',
    title: 'Incident Response 101: Preparing for the Unexpected',
    excerpt: 'Build a strong incident response plan before disaster strikes',
    author: 'Sarah Omondi',
    date: '2024-02-20',
    category: 'Best Practices',
    readTime: '9 min read',
  },
  {
    id: 'cloud-security',
    title: 'Securing Your Cloud Infrastructure',
    excerpt: 'Essential security measures for cloud deployments in AWS, Azure, and GCP',
    author: 'Victor Mutua',
    date: '2024-02-15',
    category: 'Cloud Security',
    readTime: '11 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">OmniTrust Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Latest insights, trends, and best practices in cybersecurity
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {blogPosts.slice(0, 4).map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-primary font-semibold flex items-center gap-2 mt-4 hover:gap-3 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* More Posts */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {blogPosts.slice(4).map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded w-fit mb-3">
                      {post.category}
                    </span>
                    <CardTitle className="text-base hover:text-primary transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span>{post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-primary text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-4 md:px-8 bg-secondary/50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest cybersecurity insights delivered to your inbox
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
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
