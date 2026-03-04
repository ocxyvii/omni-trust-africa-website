'use client';

import { SidebarNav } from '@/components/navigation/sidebar-nav';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        <div className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-12">Privacy Policy</h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  OmniTrust Africa ("Company," "we," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                    <p>We collect information you provide directly, such as name, email address, phone number, and company information.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
                    <p>We automatically collect information about your interactions with our website, including IP address, browser type, and pages visited.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Cookies</h3>
                    <p>We use cookies and similar technologies to enhance your experience and understand how you use our services.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Communicate with you about updates and offers</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>Detect and prevent fraudulent activity</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:privacy@omnitrust.africa" className="text-primary hover:underline">
                    privacy@omnitrust.africa
                  </a>
                </p>
              </section>

              <section className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Last updated: March 2024
                </p>
              </section>
            </div>
          </div>
        </div>

        <footer className="border-t border-border py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
            <p>&copy; 2024 OmniTrust Africa. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
