'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { notFound } from 'next/navigation';
import {
  BookOpen, Clock, Award, CheckCircle2, ArrowLeft,
  ArrowRight, Lock, Play, Star, Users, Shield,
  ChevronDown, ChevronUp, User, Zap
} from 'lucide-react';
import { useState } from 'react';

const courses: Record<string, any> = {
  'web-security-101': {
    title: 'Web Security Fundamentals',
    description: 'Master the core principles of web application security — from OWASP Top 10 to hands-on exploitation and defense.',
    level: 'Beginner', levelColor: '#34d399',
    duration: '4 weeks', lessons: 12, price: 199,
    students: 1240, rating: 4.8, reviews: 312,
    accent: '#34d399',
    instructors: [{ name: 'Dr. James Kipchoge', role: 'Senior Security Engineer', initials: 'JK' }],
    tags: ['OWASP', 'XSS', 'SQLi', 'Auth', 'Secure Coding'],
    learningOutcomes: [
      'Understand and exploit common web application vulnerabilities',
      'Apply OWASP Top 10 principles to defend production systems',
      'Implement secure authentication and session management',
      'Write security-first code across major frameworks',
      'Perform basic penetration tests on web applications',
    ],
    curriculum: [
      { module: 1, title: 'Web Security Basics', lessons: 3, duration: '45 min' },
      { module: 2, title: 'OWASP Top 10 Deep Dive', lessons: 3, duration: '1h 20min' },
      { module: 3, title: 'Authentication & Session Management', lessons: 2, duration: '55 min' },
      { module: 4, title: 'Secure Coding Practices', lessons: 2, duration: '50 min' },
      { module: 5, title: 'Security Testing Lab', lessons: 2, duration: '1h 10min' },
    ],
    requirements: ['Basic HTML/CSS/JavaScript knowledge', 'Familiarity with HTTP protocol', 'A laptop with a modern browser'],
  },
  'network-security': {
    title: 'Network Security Essentials',
    description: 'Deep-dive into firewalls, IDS/IPS, VPNs, and network forensics with real-world lab simulations.',
    level: 'Intermediate', levelColor: '#22d3ee',
    duration: '6 weeks', lessons: 18, price: 299,
    students: 890, rating: 4.9, reviews: 198,
    accent: '#22d3ee',
    instructors: [{ name: 'Sarah Omondi', role: 'Network Security Architect', initials: 'SO' }],
    tags: ['Firewalls', 'VPN', 'IDS/IPS', 'Wireshark', 'Segmentation'],
    learningOutcomes: [
      'Design secure network architectures from scratch',
      'Configure and manage enterprise-grade firewalls',
      'Deploy and tune intrusion detection/prevention systems',
      'Implement VPN solutions for remote access',
      'Analyze network traffic to detect active threats',
    ],
    curriculum: [
      { module: 1, title: 'Network Fundamentals', lessons: 3, duration: '1h' },
      { module: 2, title: 'Firewalls & Access Control', lessons: 3, duration: '1h 30min' },
      { module: 3, title: 'Intrusion Detection Systems', lessons: 3, duration: '1h 20min' },
      { module: 4, title: 'VPN & Encryption', lessons: 3, duration: '1h 10min' },
      { module: 5, title: 'Network Monitoring', lessons: 3, duration: '1h' },
      { module: 6, title: 'Incident Response', lessons: 3, duration: '1h 15min' },
    ],
    requirements: ['Networking fundamentals (TCP/IP)', 'Basic Linux command line', 'Understanding of OSI model'],
  },
  'penetration-testing-101': {
    title: 'Introduction to Penetration Testing',
    description: 'Begin your ethical hacking journey. Learn reconnaissance, exploitation, and professional reporting.',
    level: 'Intermediate', levelColor: '#22d3ee',
    duration: '8 weeks', lessons: 24, price: 399,
    students: 2100, rating: 4.9, reviews: 547,
    accent: '#f59e0b',
    featured: true,
    instructors: [{ name: 'Victor Mutua', role: 'Lead Penetration Tester, OSCP', initials: 'VM' }],
    tags: ['Kali Linux', 'Metasploit', 'Recon', 'Exploitation', 'Reporting'],
    learningOutcomes: [
      'Execute a full penetration test from scoping to reporting',
      'Perform passive and active reconnaissance',
      'Use industry-standard tools: Nmap, Burp Suite, Metasploit',
      'Identify and exploit common vulnerabilities ethically',
      'Write professional-grade pentest reports for clients',
    ],
    curriculum: [
      { module: 1, title: 'Ethical Hacking Fundamentals', lessons: 2, duration: '50 min' },
      { module: 2, title: 'Reconnaissance & OSINT', lessons: 3, duration: '1h 20min' },
      { module: 3, title: 'Scanning & Enumeration', lessons: 4, duration: '1h 45min' },
      { module: 4, title: 'Exploitation Techniques', lessons: 5, duration: '2h 30min' },
      { module: 5, title: 'Post-Exploitation', lessons: 4, duration: '1h 50min' },
      { module: 6, title: 'Reporting & Documentation', lessons: 3, duration: '1h' },
      { module: 7, title: 'Capstone Project', lessons: 3, duration: '3h' },
    ],
    requirements: ['Basic Linux/command line skills', 'Networking fundamentals', 'Programming basics (Python preferred)'],
  },
  'incident-response': {
    title: 'Incident Response Mastery',
    description: 'Lead your organization through a breach. Containment, forensics, recovery, and post-mortem analysis.',
    level: 'Advanced', levelColor: '#f87171',
    duration: '6 weeks', lessons: 20, price: 499,
    students: 560, rating: 4.7, reviews: 124,
    accent: '#a78bfa',
    instructors: [{ name: 'Amina Hassan', role: 'CISO & Incident Commander', initials: 'AH' }],
    tags: ['DFIR', 'Forensics', 'SIEM', 'Playbooks', 'Chain of Custody'],
    learningOutcomes: [
      'Build and lead an incident response team',
      'Contain and eradicate threats in live environments',
      'Conduct digital forensics and preserve evidence',
      'Develop and test incident response playbooks',
      'Present post-incident reports to executive stakeholders',
    ],
    curriculum: [
      { module: 1, title: 'IR Frameworks & Methodologies', lessons: 3, duration: '1h 10min' },
      { module: 2, title: 'Detection & Triage', lessons: 3, duration: '1h 20min' },
      { module: 3, title: 'Containment Strategies', lessons: 4, duration: '1h 40min' },
      { module: 4, title: 'Digital Forensics', lessons: 4, duration: '2h' },
      { module: 5, title: 'Recovery & Hardening', lessons: 3, duration: '1h 15min' },
      { module: 6, title: 'Post-Incident Reporting', lessons: 3, duration: '1h' },
    ],
    requirements: ['2+ years in cybersecurity', 'Familiarity with SIEM tools', 'Understanding of network security'],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
};

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = courses[params.courseId];
  const { data: session } = useSession();
  const user = session?.user ?? null;
  const [openModule, setOpenModule] = useState<number | null>(0);

  if (!course) notFound();

  return (
    <div className="cd-root">
      <style>{CSS}</style>
      <SidebarNav />

      <main className="cd-main">

        {/* ── Hero ── */}
        <section className="cd-hero" style={{ '--accent': course.accent } as React.CSSProperties}>
          <div className="cd-hero-bg">
            <div className="cd-hero-glow" style={{ background: `radial-gradient(ellipse, ${course.accent}12, transparent 65%)` }} />
            <div className="cd-grid" />
          </div>
          <div className="cd-container">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <Link href="/academy" className="cd-back">
                <ArrowLeft size={14} /> Back to Academy
              </Link>
            </motion.div>

            <div className="cd-hero-layout">
              <div className="cd-hero-left">
                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="cd-hero-badges">
                  <span className="cd-level-badge" style={{ color: course.levelColor, background: course.levelColor + '15', borderColor: course.levelColor + '30' }}>
                    {course.level}
                  </span>
                  {course.featured && (
                    <span className="cd-popular-badge">
                      <Star size={11} fill="currentColor" /> Most Popular
                    </span>
                  )}
                </motion.div>

                <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={2} className="cd-hero-title">
                  {course.title}
                </motion.h1>

                <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3} className="cd-hero-desc">
                  {course.description}
                </motion.p>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="cd-hero-meta">
                  <div className="cd-meta-item">
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <strong>{course.rating}</strong>
                    <span>({course.reviews} reviews)</span>
                  </div>
                  <div className="cd-meta-sep" />
                  <div className="cd-meta-item">
                    <Users size={14} />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="cd-meta-sep" />
                  <div className="cd-meta-item">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="cd-meta-sep" />
                  <div className="cd-meta-item">
                    <BookOpen size={14} />
                    <span>{course.lessons} lessons</span>
                  </div>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5} className="cd-instructor-row">
                  {course.instructors.map((inst: any) => (
                    <div key={inst.name} className="cd-instructor-mini">
                      <div className="cd-inst-avatar" style={{ background: course.accent + '20', borderColor: course.accent + '40', color: course.accent }}>
                        {inst.initials}
                      </div>
                      <div>
                        <p className="cd-inst-name">{inst.name}</p>
                        <p className="cd-inst-role">{inst.role}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6} className="cd-tags">
                  {course.tags.map((t: string) => (
                    <span key={t} className="cd-tag">{t}</span>
                  ))}
                </motion.div>
              </div>

              {/* Sticky Enrol Card */}
              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="cd-enrol-card" style={{ '--accent': course.accent } as React.CSSProperties}>
                <div className="cd-enrol-price">
                  <span className="cd-price-val">${course.price}</span>
                  <span className="cd-price-note">one-time · lifetime access</span>
                </div>

                {user ? (
                  <Link href={`/academy/${params.courseId}/enrol`} className="cd-enrol-btn" style={{ background: `linear-gradient(135deg, ${course.accent}, ${course.accent}99)` }}>
                    Enrol Now <ArrowRight size={16} />
                  </Link>
                ) : (
                  <div className="cd-auth-required">
                    <Link href={`/login?callbackUrl=/academy/${params.courseId}/enrol`} className="cd-enrol-btn">
                      <Lock size={14} /> Sign in to Enrol
                    </Link>
                    <p className="cd-no-account">
                      No account? <Link href={`/signup?callbackUrl=/academy/${params.courseId}/enrol`}>Create one free</Link>
                    </p>
                  </div>
                )}

                <Link href="#preview" className="cd-preview-btn">
                  <Play size={13} /> Preview Course
                </Link>

                <div className="cd-enrol-details">
                  {[
                    { icon: Clock, label: 'Duration', value: course.duration },
                    { icon: BookOpen, label: 'Lessons', value: `${course.lessons} lessons` },
                    { icon: Award, label: 'Level', value: course.level },
                    { icon: Users, label: 'Students', value: course.students.toLocaleString() },
                    { icon: Zap, label: 'Certificate', value: 'Included' },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="cd-detail-row">
                        <div className="cd-detail-icon"><Icon size={13} /></div>
                        <span className="cd-detail-label">{item.label}</span>
                        <span className="cd-detail-val">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <section className="cd-body">
          <div className="cd-container cd-body-layout">
            <div className="cd-body-left">

              {/* What you'll learn */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="cd-block">
                <h2 className="cd-block-title">What You'll Learn</h2>
                <div className="cd-outcomes-grid">
                  {course.learningOutcomes.map((outcome: string, i: number) => (
                    <div key={i} className="cd-outcome">
                      <CheckCircle2 size={16} color={course.accent} className="cd-outcome-icon" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Curriculum */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="cd-block">
                <h2 className="cd-block-title">Course Curriculum</h2>
                <p className="cd-block-sub">{course.curriculum.length} modules · {course.lessons} lessons</p>
                <div className="cd-curriculum">
                  {course.curriculum.map((mod: any, i: number) => (
                    <div key={mod.module} className={`cd-module ${openModule === i ? 'open' : ''}`}>
                      <button className="cd-module-header" onClick={() => setOpenModule(openModule === i ? null : i)}>
                        <div className="cd-module-left">
                          <div className="cd-module-num" style={{ background: course.accent + '15', color: course.accent, borderColor: course.accent + '30' }}>
                            {mod.module}
                          </div>
                          <div>
                            <p className="cd-module-title">{mod.title}</p>
                            <p className="cd-module-meta">{mod.lessons} lessons · {mod.duration}</p>
                          </div>
                        </div>
                        {openModule === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openModule === i && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="cd-module-body">
                          {Array.from({ length: mod.lessons }).map((_, j) => (
                            <div key={j} className="cd-lesson-row">
                              <Play size={12} />
                              <span>Lesson {j + 1} — {mod.title} Part {j + 1}</span>
                              {!user && j > 0 && <Lock size={11} className="cd-lesson-lock" />}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="cd-block">
                <h2 className="cd-block-title">Requirements</h2>
                <ul className="cd-requirements">
                  {course.requirements.map((r: string, i: number) => (
                    <li key={i}>
                      <div className="cd-req-dot" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>

            {/* Spacer for sticky card on desktop */}
            <div className="cd-body-right-spacer" />
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="cd-cta-section">
          <div className="cd-container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="cd-cta-card" style={{ '--accent': course.accent } as React.CSSProperties}>
              <div className="cd-cta-glow" style={{ background: `radial-gradient(ellipse, ${course.accent}08, transparent 60%)` }} />
              <Shield size={28} color={course.accent} />
              <h2 className="cd-cta-title">Ready to start learning?</h2>
              <p className="cd-cta-sub">Join {course.students.toLocaleString()} students already enrolled in this course.</p>
              {user ? (
                <Link href={`/academy/${params.courseId}/enrol`} className="cd-enrol-btn" style={{ background: `linear-gradient(135deg, ${course.accent}, ${course.accent}99)` }}>
                  Enrol Now — ${course.price} <ArrowRight size={15} />
                </Link>
              ) : (
                <div className="cd-cta-auth">
                  <Link href={`/login?callbackUrl=/academy/${params.courseId}/enrol`} className="cd-enrol-btn">
                    <Lock size={14} /> Sign in to Enrol
                  </Link>
                  <Link href={`/signup?callbackUrl=/academy/${params.courseId}/enrol`} className="cd-create-acc">
                    Create free account <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <footer className="cd-footer">
          <div className="cd-container">
            <p>&copy; 2024 OmniTrust Africa. All rights reserved.</p>
          </div>
        </footer>

      </main>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.cd-root{min-height:100vh;background:#050810;color:#e2e8f0;font-family:'DM Sans',sans-serif;}
.cd-main{margin-left:0;}
@media(min-width:768px){.cd-main{margin-left:0;}}
.cd-container{max-width:1100px;margin:0 auto;padding:0 24px;}

/* Hero */
.cd-hero{position:relative;padding:60px 0 80px;overflow:hidden;border-bottom:1px solid rgba(255,255,255,0.05);}
.cd-hero-bg{position:absolute;inset:0;pointer-events:none;}
.cd-hero-glow{position:absolute;inset:0;width:100%;height:100%;}
.cd-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,0.02) 1px,transparent 0);background-size:44px 44px;}

.cd-back{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.35);text-decoration:none;margin-bottom:32px;transition:color 0.2s;}
.cd-back:hover{color:rgba(255,255,255,0.7);}

.cd-hero-layout{display:grid;grid-template-columns:1fr 340px;gap:48px;align-items:start;}
@media(max-width:900px){.cd-hero-layout{grid-template-columns:1fr;}}

.cd-hero-left{position:relative;z-index:1;}
.cd-hero-badges{display:flex;align-items:center;gap:10px;margin-bottom:20px;}
.cd-level-badge{padding:5px 12px;border-radius:100px;font-size:12px;font-weight:600;border:1px solid;}
.cd-popular-badge{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:100px;font-size:12px;font-weight:600;color:#f59e0b;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);}

.cd-hero-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(28px,4vw,48px);font-weight:800;color:#f8fafc;line-height:1.1;letter-spacing:-0.02em;margin-bottom:16px;}
.cd-hero-desc{font-size:16px;color:rgba(255,255,255,0.45);line-height:1.7;max-width:580px;margin-bottom:24px;}

.cd-hero-meta{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:28px;}
.cd-meta-item{display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.5);}
.cd-meta-item strong{color:#f1f5f9;}
.cd-meta-sep{width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,0.15);}

.cd-instructor-row{display:flex;flex-wrap:wrap;gap:16px;margin-bottom:20px;}
.cd-instructor-mini{display:flex;align-items:center;gap:12px;}
.cd-inst-avatar{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;border:1px solid;}
.cd-inst-name{font-size:13px;font-weight:600;color:#f1f5f9;}
.cd-inst-role{font-size:11px;color:rgba(255,255,255,0.3);}

.cd-tags{display:flex;flex-wrap:wrap;gap:6px;}
.cd-tag{padding:4px 10px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);font-size:11px;color:rgba(255,255,255,0.35);font-weight:500;}

/* Enrol Card */
.cd-enrol-card{position:sticky;top:24px;padding:28px;border-radius:20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;gap:16px;z-index:10;}
@media(max-width:900px){.cd-enrol-card{position:static;}}

.cd-enrol-price{display:flex;align-items:baseline;gap:10px;}
.cd-price-val{font-family:'Bricolage Grotesque',sans-serif;font-size:36px;font-weight:800;color:#f1f5f9;}
.cd-price-note{font-size:12px;color:rgba(255,255,255,0.25);}

.cd-enrol-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;border-radius:12px;background:linear-gradient(135deg,#22d3ee,#3b82f6);color:#fff;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;text-decoration:none;transition:all 0.2s;box-shadow:0 4px 20px rgba(34,211,238,0.2);}
.cd-enrol-btn:hover{transform:translateY(-1px);box-shadow:0 6px 28px rgba(34,211,238,0.35);}

.cd-auth-required{display:flex;flex-direction:column;gap:8px;}
.cd-no-account{font-size:12px;color:rgba(255,255,255,0.25);text-align:center;}
.cd-no-account a{color:rgba(255,255,255,0.5);text-decoration:underline;}
.cd-no-account a:hover{color:#22d3ee;}

.cd-preview-btn{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;padding:11px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:13px;font-weight:500;font-family:'DM Sans',sans-serif;text-decoration:none;transition:all 0.2s;}
.cd-preview-btn:hover{border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.8);}

.cd-enrol-details{display:flex;flex-direction:column;gap:10px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.05);}
.cd-detail-row{display:flex;align-items:center;gap:10px;font-size:13px;}
.cd-detail-icon{width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);flex-shrink:0;}
.cd-detail-label{color:rgba(255,255,255,0.3);flex:1;}
.cd-detail-val{color:#f1f5f9;font-weight:600;}

/* Body */
.cd-body{padding:72px 0;}
.cd-body-layout{display:grid;grid-template-columns:1fr 340px;gap:48px;align-items:start;}
@media(max-width:900px){.cd-body-layout{grid-template-columns:1fr;}}
.cd-body-left{display:flex;flex-direction:column;gap:48px;}
.cd-body-right-spacer{/* placeholder so body grid mirrors hero grid */}

.cd-block{}
.cd-block-title{font-family:'Bricolage Grotesque',sans-serif;font-size:24px;font-weight:700;color:#f1f5f9;margin-bottom:8px;letter-spacing:-0.01em;}
.cd-block-sub{font-size:13px;color:rgba(255,255,255,0.3);margin-bottom:20px;}

.cd-outcomes-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px;}
@media(max-width:600px){.cd-outcomes-grid{grid-template-columns:1fr;}}
.cd-outcome{display:flex;align-items:flex-start;gap:10px;padding:14px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.02);font-size:13.5px;color:rgba(255,255,255,0.6);line-height:1.5;}
.cd-outcome-icon{flex-shrink:0;margin-top:1px;}

.cd-curriculum{display:flex;flex-direction:column;gap:8px;margin-top:20px;}
.cd-module{border-radius:14px;border:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.02);overflow:hidden;transition:border-color 0.2s;}
.cd-module.open{border-color:rgba(255,255,255,0.12);}
.cd-module-header{width:100%;display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.5);transition:color 0.2s;font-family:'DM Sans',sans-serif;}
.cd-module-header:hover{color:rgba(255,255,255,0.8);}
.cd-module-left{display:flex;align-items:center;gap:14px;text-align:left;}
.cd-module-num{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:1px solid;flex-shrink:0;}
.cd-module-title{font-size:14px;font-weight:600;color:#f1f5f9;}
.cd-module-meta{font-size:11px;color:rgba(255,255,255,0.3);margin-top:2px;}
.cd-module-body{padding:0 20px 16px;}
.cd-lesson-row{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;font-size:13px;color:rgba(255,255,255,0.4);transition:background 0.2s;}
.cd-lesson-row:hover{background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.7);}
.cd-lesson-lock{margin-left:auto;color:rgba(255,255,255,0.2);}

.cd-requirements{display:flex;flex-direction:column;gap:10px;margin-top:16px;list-style:none;}
.cd-requirements li{display:flex;align-items:center;gap:12px;font-size:14px;color:rgba(255,255,255,0.5);}
.cd-req-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.2);flex-shrink:0;}

/* CTA section */
.cd-cta-section{padding:0 0 80px;}
.cd-cta-card{position:relative;padding:56px;border-radius:24px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);text-align:center;overflow:hidden;display:flex;flex-direction:column;align-items:center;gap:16px;}
.cd-cta-glow{position:absolute;inset:0;pointer-events:none;}
.cd-cta-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(24px,3vw,36px);font-weight:800;color:#f1f5f9;letter-spacing:-0.02em;}
.cd-cta-sub{font-size:15px;color:rgba(255,255,255,0.35);max-width:400px;line-height:1.6;}
.cd-cta-auth{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;}
.cd-enrol-btn.large{padding:16px 40px;font-size:16px;width:auto;}
.cd-create-acc{display:inline-flex;align-items:center;gap:6px;font-size:14px;color:rgba(255,255,255,0.4);text-decoration:none;transition:color 0.2s;}
.cd-create-acc:hover{color:#22d3ee;}

/* Footer */
.cd-footer{padding:28px 24px;border-top:1px solid rgba(255,255,255,0.05);}
.cd-footer .cd-container{text-align:center;font-size:13px;color:rgba(255,255,255,0.2);}

@media(max-width:640px){
  .cd-cta-card{padding:36px 24px;}
  .cd-hero{padding:40px 0 60px;}
}
`;