'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      alert(data.message || 'Thank you for your message. We will be in touch soon!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      alert('Error submitting form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />

      <main className="md:ml-64">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Have questions? Our team is ready to help you secure your digital assets
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Contact Info Cards */}
              <Card>
                <CardHeader>
                  <Mail className="w-8 h-8 text-primary mb-4" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <a href="mailto:info@omnitrust.africa" className="hover:text-foreground">
                      info@omnitrust.africa
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    We respond within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="w-8 h-8 text-primary mb-4" />
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <a href="tel:+254711111111" className="hover:text-foreground">
                      +254 (0) 711 111 111
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Monday - Friday, 9am - 5pm EAT
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="w-8 h-8 text-primary mb-4" />
                  <CardTitle>Office</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nairobi, Kenya<br />
                    Africa
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Available for on-site consultations
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="mt-2"
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 md:px-8 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Find quick answers to common questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-6 bg-background rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-2">How long does a penetration test take?</h3>
                <p className="text-muted-foreground text-sm">
                  Typically 3-6 weeks depending on the scope and complexity of your infrastructure
                </p>
              </div>

              <div className="p-6 bg-background rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-2">What happens after you find vulnerabilities?</h3>
                <p className="text-muted-foreground text-sm">
                  We provide detailed reports with remediation recommendations and support your team in addressing findings
                </p>
              </div>

              <div className="p-6 bg-background rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-2">Are you available for emergency response?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer 24/7 incident response support for security emergencies
                </p>
              </div>

              <div className="p-6 bg-background rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-2">How much does a security assessment cost?</h3>
                <p className="text-muted-foreground text-sm">
                  Pricing depends on scope. Contact us for a custom quote based on your needs
                </p>
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
