'use client';

import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const blogPosts: Record<string, any> = {
  'zero-trust-security': {
    title: 'Zero Trust Security: The Future of Cybersecurity',
    author: 'Sarah Omondi',
    date: '2024-03-15',
    readTime: '8 min read',
    category: 'Security Strategy',
    content: `
      <h2>Understanding Zero Trust</h2>
      <p>Zero Trust is a security approach based on the principle of never trusting, always verifying. It assumes that traditional network boundaries are no longer sufficient in today's cloud-first, mobile-first world.</p>

      <h2>Core Principles</h2>
      <p>The zero trust model is built on several fundamental principles:</p>
      <ul>
        <li>Verify explicitly using all available data points</li>
        <li>Secure every device as if it's on an open network</li>
        <li>Assume breach and minimize blast radius</li>
      </ul>

      <h2>Implementation Challenges</h2>
      <p>While zero trust offers significant security benefits, implementing it presents several challenges. Organizations must evaluate their current infrastructure and develop a phased migration plan.</p>

      <h2>Conclusion</h2>
      <p>Zero trust represents a fundamental shift in how we approach security. By adopting these principles, organizations can build more resilient and secure infrastructure.</p>
    `,
  },
  'ransomware-prevention': {
    title: '5 Effective Strategies to Prevent Ransomware Attacks',
    author: 'Victor Mutua',
    date: '2024-03-10',
    readTime: '6 min read',
    category: 'Threat Prevention',
    content: `
      <h2>Introduction</h2>
      <p>Ransomware attacks have become increasingly sophisticated and costly. In this article, we explore five proven strategies to prevent ransomware attacks in your organization.</p>

      <h2>1. Regular Backups</h2>
      <p>Maintain regular backups of critical data. Store backups offline and test restoration procedures regularly to ensure you can recover without paying ransoms.</p>

      <h2>2. Email Security</h2>
      <p>Implement robust email filtering and user training. Many ransomware attacks begin with phishing emails containing malicious attachments or links.</p>

      <h2>3. Access Controls</h2>
      <p>Implement the principle of least privilege and use multi-factor authentication to limit unauthorized access to critical systems.</p>

      <h2>4. Patch Management</h2>
      <p>Keep all systems and software updated with the latest security patches. Unpatched vulnerabilities are a common entry point for ransomware.</p>

      <h2>5. Incident Response Plan</h2>
      <p>Develop and test an incident response plan so your organization can react quickly if a ransomware attack occurs.</p>

      <h2>Conclusion</h2>
      <p>By implementing these five strategies, you can significantly reduce your organization's ransomware risk.</p>
    `,
  },
  'ai-cybersecurity': {
    title: 'How AI is Transforming Cybersecurity',
    author: 'Dr. James Kipchoge',
    date: '2024-03-05',
    readTime: '10 min read',
    category: 'Emerging Technologies',
    content: `
      <h2>The Rise of AI in Security</h2>
      <p>Artificial intelligence and machine learning are revolutionizing how organizations detect and respond to threats. These technologies enable security teams to process vast amounts of data and identify patterns that humans might miss.</p>

      <h2>Threat Detection</h2>
      <p>AI-powered systems can analyze network traffic and user behavior to identify anomalies that might indicate a security breach. This enables faster detection and response times.</p>

      <h2>Automated Response</h2>
      <p>Machine learning algorithms can automate responses to known threats, freeing security teams to focus on more complex investigations.</p>

      <h2>Challenges and Considerations</h2>
      <p>While AI offers significant benefits, organizations must address challenges like model bias, interpretability, and the need for quality training data.</p>

      <h2>Future Outlook</h2>
      <p>As AI and machine learning technologies continue to mature, we can expect even more sophisticated security applications and capabilities.</p>

      <h2>Conclusion</h2>
      <p>AI is transforming cybersecurity by enabling faster detection, automated response, and more intelligent threat analysis. Organizations that embrace these technologies will be better positioned to defend against evolving threats.</p>
    `,
  },
};

export default function BlogPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = blogPosts[params.postId];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-12 px-4 md:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="text-primary hover:underline text-sm mb-4 inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">
                  {post.category}
                </span>
              </div>

              <h1 className="text-5xl font-bold leading-tight">{post.title}</h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-4 md:px-8">
          <article className="max-w-4xl mx-auto prose prose-invert max-w-none">
            <div
              className="space-y-6 text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </section>

        {/* Author Card */}
        <section className="py-12 px-4 md:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="flex items-center gap-6 pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{post.author}</h3>
                  <p className="text-muted-foreground text-sm">
                    Security expert and author at OmniTrust Africa with years of experience in cybersecurity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">More from OmniTrust Blog</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(blogPosts)
                .slice(0, 2)
                .filter(([key]) => key !== params.postId)
                .map(([key, relatedPost]) => (
                  <Card key={key} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">
                        {relatedPost.category}
                      </span>
                      <Link href={`/blog/${key}`} className="block">
                        <h3 className="text-lg font-bold mt-3 hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
                        <span>{relatedPost.author}</span>
                        <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-4 md:px-8 mt-12">
          <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
            <p>&copy; 2024 OmniTrust Africa. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
