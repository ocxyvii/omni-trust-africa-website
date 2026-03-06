'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import {
  BookOpen, Clock, Users, Shield, Zap, Award,
  ArrowRight, Star, Lock, Play, ChevronRight, GraduationCap
} from 'lucide-react';

const courses = [
  {
    id: 'web-security-101',
    title: 'Web Security Fundamentals',
    description: 'Master the core principles of web application security — from OWASP Top 10 to hands-on exploitation and defense.',
    level: 'Beginner',
    levelColor: '#34d399',
    duration: '4 weeks',
    lessons: 12,
    price: 199,
    students: 1240,
    rating: 4.8,
    tags: ['OWASP', 'XSS', 'SQLi', 'Auth'],
    accent: '#34d399',
  },
  {
    id: 'network-security',
    title: 'Network Security Essentials',
    description: 'Deep-dive into firewalls, IDS/IPS, VPNs, and network forensics with real-world lab simulations.',
    level: 'Intermediate',
    levelColor: '#22d3ee',
    duration: '6 weeks',
    lessons: 18,
    price: 299,
    students: 890,
    rating: 4.9,
    tags: ['Firewalls', 'VPN', 'IDS/IPS', 'Wireshark'],
    accent: '#22d3ee',
  },
  {
    id: 'penetration-testing-101',
    title: 'Introduction to Penetration Testing',
    description: 'Begin your ethical hacking journey. Learn reconnaissance, exploitation, and professional reporting.',
    level: 'Intermediate',
    levelColor: '#22d3ee',
    duration: '8 weeks',
    lessons: 24,
    price: 399,
    students: 2100,
    rating: 4.9,
    tags: ['Kali Linux', 'Metasploit', 'Recon', 'Reporting'],
    accent: '#f59e0b',
    featured: true,
  },
  {
    id: 'incident-response',
    title: 'Incident Response Mastery',
    description: 'Lead your organization through a breach. Containment, forensics, recovery, and post-mortem analysis.',
    level: 'Advanced',
    levelColor: '#f87171',
    duration: '6 weeks',
    lessons: 20,
    price: 499,
    students: 560,
    rating: 4.7,
    tags: ['DFIR', 'Forensics', 'SIEM', 'Playbooks'],
    accent: '#a78bfa',
  },
];

const benefits = [
  { icon: Shield, title: 'Expert Instructors', desc: 'Learn from practitioners with real-world incident response experience at Fortune 500s.' },
  { icon: Zap, title: 'Hands-On Labs', desc: 'Every course includes live lab environments — no theory without practice.' },
  { icon: Award, title: 'Industry Certificates', desc: 'Earn credentials recognized by employers across Africa and globally.' },
  { icon: Users, title: 'Peer Community', desc: 'Join a network of 5,000+ security professionals across 30 African countries.' },
];

const stats = [
  { value: '5,000+', label: 'Active Learners' },
  { value: '30+', label: 'Countries' },
  { value: '94%', label: 'Completion Rate' },
  { value: '4.8★', label: 'Avg. Rating' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }),
};

export default function AcademyPage() {
  const { data: session } = useSession();
  const user = session?.user ?? null;

  return (
    <div className="ac-root">
      <style>{CSS}</style>
      <SidebarNav />

      <main className="ac-main">

        {/* ── Hero ── */}
        <section className="ac-hero">
          <div className="ac-hero-bg">
            <div className="ac-hero-blob b1" />
            <div className="ac-hero-blob b2" />
            <div className="ac-grid" />
          </div>
          <div className="ac-hero-inner">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="ac-hero-badge">
              <GraduationCap size={14} />
              <span>OmniTrust Academy</span>
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="ac-hero-title">
              Build skills that<br /><em>defenders need.</em>
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="ac-hero-sub">
              World-class cybersecurity training designed for African professionals. Learn from practitioners, earn credentials, and advance your career.
            </motion.p>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="ac-hero-actions">
              <Link href="#courses" className="ac-btn-primary">
                Browse Courses <ArrowRight size={16} />
              </Link>
              {!user && (
                <Link href="/login" className="ac-btn-ghost">
                  Sign in to enrol <ChevronRight size={16} />
                </Link>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="ac-stats">
              {stats.map(s => (
                <div key={s.label} className="ac-stat">
                  <span className="ac-stat-value">{s.value}</span>
                  <span className="ac-stat-label">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Courses ── */}
        <section className="ac-section" id="courses">
          <div className="ac-container">
            <div className="ac-section-header">
              <p className="ac-eyebrow">Curriculum</p>
              <h2 className="ac-section-title">Featured Courses</h2>
              <p className="ac-section-sub">Carefully crafted for professionals at every stage of their security career.</p>
            </div>

            <div className="ac-courses-grid">
              {courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  custom={i % 2}
                  className={`ac-course-card ${course.featured ? 'featured' : ''}`}
                  style={{ '--accent': course.accent } as React.CSSProperties}
                >
                  {course.featured && (
                    <div className="ac-featured-badge">
                      <Star size={11} fill="currentColor" /> Most Popular
                    </div>
                  )}

                  <div className="ac-course-top">
                    <span className="ac-level-badge" style={{ color: course.levelColor, background: course.levelColor + '15', borderColor: course.levelColor + '30' }}>
                      {course.level}
                    </span>
                    <div className="ac-rating">
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span>{course.rating}</span>
                      <span className="ac-rating-count">({course.students.toLocaleString()})</span>
                    </div>
                  </div>

                  <h3 className="ac-course-title">{course.title}</h3>
                  <p className="ac-course-desc">{course.description}</p>

                  <div className="ac-tags">
                    {course.tags.map(tag => (
                      <span key={tag} className="ac-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="ac-course-meta">
                    <div className="ac-meta-item">
                      <Clock size={13} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="ac-meta-item">
                      <BookOpen size={13} />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="ac-meta-item">
                      <Users size={13} />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                  </div>

                  <div className="ac-course-footer">
                    <div className="ac-price">
                      <span className="ac-price-value">${course.price}</span>
                      <span className="ac-price-note">one-time</span>
                    </div>
                    <div className="ac-course-actions">
                      <Link href={`/academy/${course.id}`} className="ac-btn-outline">
                        <Play size={13} /> Preview
                      </Link>
                      {user ? (
                        <Link href={`/academy/${course.id}/enrol`} className="ac-btn-enrol" style={{ background: `linear-gradient(135deg, ${course.accent}, ${course.accent}99)` }}>
                          Enrol Now <ArrowRight size={14} />
                        </Link>
                      ) : (
                        <Link href={`/login?callbackUrl=/academy/${course.id}/enrol`} className="ac-btn-enrol">
                          <Lock size={13} /> Sign in to Enrol
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Auth CTA (shown only when logged out) ── */}
        {!user && (
          <section className="ac-auth-banner">
            <div className="ac-container">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0}
                className="ac-auth-card"
              >
                <div className="ac-auth-icon">
                  <Lock size={24} color="#22d3ee" />
                </div>
                <div className="ac-auth-text">
                  <h3>Ready to start learning?</h3>
                  <p>Create a free account or sign in to enrol in courses, track your progress, and earn certificates.</p>
                </div>
                <div className="ac-auth-btns">
                  <Link href="/signup" className="ac-btn-primary">
                    Create Account <ArrowRight size={15} />
                  </Link>
                  <Link href="/login" className="ac-btn-ghost">
                    Sign In
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── Benefits ── */}
        <section className="ac-section ac-benefits-section">
          <div className="ac-container">
            <div className="ac-section-header">
              <p className="ac-eyebrow">Why OmniTrust</p>
              <h2 className="ac-section-title">Learning built for the real world.</h2>
            </div>
            <div className="ac-benefits-grid">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i * 0.5}
                    className="ac-benefit-card"
                  >
                    <div className="ac-benefit-icon">
                      <Icon size={20} color="#22d3ee" />
                    </div>
                    <h4 className="ac-benefit-title">{b.title}</h4>
                    <p className="ac-benefit-desc">{b.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="ac-section">
          <div className="ac-container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="ac-cta-card"
            >
              <div className="ac-cta-glow" />
              <p className="ac-eyebrow" style={{ color: '#22d3ee' }}>Corporate Training</p>
              <h2 className="ac-cta-title">Training for your entire team?</h2>
              <p className="ac-cta-sub">We offer custom cohorts, on-site workshops, and enterprise licensing for organizations across Africa.</p>
              <div className="ac-cta-btns">
                <Link href="/contact" className="ac-btn-primary">
                  Talk to Us <ArrowRight size={15} />
                </Link>
                <Link href="/start" className="ac-btn-ghost">
                  Get a custom quote
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="ac-footer">
          <div className="ac-container">
            <p>&copy; 2024 OmniTrust Africa. All rights reserved.</p>
          </div>
        </footer>

      </main>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ac-root {
  min-height: 100vh;
  background: #050810;
  color: #e2e8f0;
  font-family: 'DM Sans', sans-serif;
}

.ac-main { margin-left: 0; }

.ac-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

/* Hero */
.ac-hero {
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: center;
  padding: 80px 24px;
  overflow: hidden;
}
.ac-hero-bg { position: absolute; inset: 0; pointer-events: none; }
.ac-hero-blob { position: absolute; border-radius: 50%; filter: blur(120px); }
.b1 { width: 700px; height: 700px; top: -200px; left: -200px; background: radial-gradient(circle, rgba(34,211,238,0.07), transparent 65%); }
.b2 { width: 500px; height: 500px; bottom: -100px; right: -100px; background: radial-gradient(circle, rgba(167,139,250,0.06), transparent 65%); }
.ac-grid { position: absolute; inset: 0; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0); background-size: 44px 44px; }

.ac-hero-inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; text-align: center; }
.ac-hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: 100px;
  background: rgba(34,211,238,0.08); border: 1px solid rgba(34,211,238,0.2);
  font-size: 12px; font-weight: 600; letter-spacing: 0.05em; color: #22d3ee;
  margin-bottom: 28px;
}
.ac-hero-title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 800;
  color: #f8fafc;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}
.ac-hero-title em { font-style: normal; color: #22d3ee; }
.ac-hero-sub { font-size: clamp(15px, 2vw, 18px); color: rgba(255,255,255,0.45); line-height: 1.7; max-width: 540px; margin: 0 auto 36px; }

.ac-hero-actions { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 56px; }

.ac-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 100px;
  background: linear-gradient(135deg, #22d3ee, #3b82f6);
  color: #fff; font-size: 14px; font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  text-decoration: none;
  box-shadow: 0 4px 24px rgba(34,211,238,0.25);
  transition: all 0.2s;
}
.ac-btn-primary:hover { box-shadow: 0 6px 32px rgba(34,211,238,0.4); transform: translateY(-1px); }

.ac-btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 13px 24px; border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5); font-size: 14px; font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  text-decoration: none;
  transition: all 0.2s;
}
.ac-btn-ghost:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); }

.ac-stats { display: flex; align-items: center; justify-content: center; gap: 0; }
.ac-stat {
  display: flex; flex-direction: column; align-items: center;
  padding: 0 28px;
  border-right: 1px solid rgba(255,255,255,0.07);
}
.ac-stat:last-child { border-right: none; }
.ac-stat-value { font-family: 'Bricolage Grotesque', sans-serif; font-size: 24px; font-weight: 700; color: #f1f5f9; }
.ac-stat-label { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 2px; letter-spacing: 0.04em; }

/* Sections */
.ac-section { padding: 100px 0; }
.ac-section-header { text-align: center; margin-bottom: 64px; }
.ac-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #22d3ee; margin-bottom: 12px; }
.ac-section-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: #f1f5f9; letter-spacing: -0.02em; margin-bottom: 12px; }
.ac-section-sub { font-size: 15px; color: rgba(255,255,255,0.35); max-width: 480px; margin: 0 auto; line-height: 1.6; }

/* Courses Grid */
.ac-courses-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
@media(max-width: 768px) { .ac-courses-grid { grid-template-columns: 1fr; } }

.ac-course-card {
  position: relative;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  display: flex; flex-direction: column; gap: 16px;
  transition: all 0.3s;
  overflow: hidden;
}
.ac-course-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent, #22d3ee), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.ac-course-card:hover { border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.035); transform: translateY(-2px); }
.ac-course-card:hover::before { opacity: 1; }
.ac-course-card.featured { border-color: rgba(245,158,11,0.2); background: rgba(245,158,11,0.03); }

.ac-featured-badge {
  position: absolute; top: 20px; right: 20px;
  display: flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: 100px;
  background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.3);
  font-size: 11px; font-weight: 600; color: #f59e0b;
}

.ac-course-top { display: flex; align-items: center; justify-content: space-between; }
.ac-level-badge { padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; border: 1px solid; }
.ac-rating { display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 600; color: #f1f5f9; }
.ac-rating-count { font-weight: 400; color: rgba(255,255,255,0.3); font-size: 12px; }

.ac-course-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: 19px; font-weight: 700; color: #f1f5f9; line-height: 1.3; letter-spacing: -0.01em; }
.ac-course-desc { font-size: 13.5px; color: rgba(255,255,255,0.4); line-height: 1.65; }

.ac-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.ac-tag { padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); font-size: 11px; color: rgba(255,255,255,0.35); font-weight: 500; }

.ac-course-meta { display: flex; gap: 16px; padding: 14px 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
.ac-meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: rgba(255,255,255,0.35); }

.ac-course-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: auto; flex-wrap: wrap; }
.ac-price { display: flex; align-items: baseline; gap: 6px; }
.ac-price-value { font-family: 'Bricolage Grotesque', sans-serif; font-size: 26px; font-weight: 700; color: #f1f5f9; }
.ac-price-note { font-size: 11px; color: rgba(255,255,255,0.25); }

.ac-course-actions { display: flex; align-items: center; gap: 8px; }
.ac-btn-outline {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 16px; border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  text-decoration: none; transition: all 0.2s; white-space: nowrap;
}
.ac-btn-outline:hover { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); }

.ac-btn-enrol {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 18px; border-radius: 100px;
  background: linear-gradient(135deg, #22d3ee, #3b82f6);
  color: #fff; font-size: 13px; font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  text-decoration: none; transition: all 0.2s; white-space: nowrap;
  box-shadow: 0 2px 12px rgba(34,211,238,0.2);
}
.ac-btn-enrol:hover { box-shadow: 0 4px 20px rgba(34,211,238,0.35); transform: translateY(-1px); }

/* Auth Banner */
.ac-auth-banner { padding: 0 0 80px; }
.ac-auth-card {
  position: relative;
  display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
  padding: 32px 36px;
  border-radius: 20px;
  background: rgba(34,211,238,0.04);
  border: 1px solid rgba(34,211,238,0.15);
  overflow: hidden;
}
.ac-auth-icon {
  width: 52px; height: 52px; flex-shrink: 0;
  border-radius: 14px;
  background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.2);
  display: flex; align-items: center; justify-content: center;
}
.ac-auth-text { flex: 1; min-width: 200px; }
.ac-auth-text h3 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 20px; font-weight: 700; color: #f1f5f9; margin-bottom: 6px; }
.ac-auth-text p { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; }
.ac-auth-btns { display: flex; align-items: center; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }

/* Benefits */
.ac-benefits-section { background: rgba(255,255,255,0.01); border-top: 1px solid rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.04); }
.ac-benefits-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
@media(max-width: 900px) { .ac-benefits-grid { grid-template-columns: repeat(2, 1fr); } }
@media(max-width: 500px) { .ac-benefits-grid { grid-template-columns: 1fr; } }

.ac-benefit-card {
  padding: 28px 24px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  transition: all 0.2s;
}
.ac-benefit-card:hover { border-color: rgba(34,211,238,0.2); background: rgba(34,211,238,0.03); }
.ac-benefit-icon {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: rgba(34,211,238,0.08); border: 1px solid rgba(34,211,238,0.15);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
}
.ac-benefit-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: 16px; font-weight: 700; color: #f1f5f9; margin-bottom: 8px; }
.ac-benefit-desc { font-size: 13px; color: rgba(255,255,255,0.35); line-height: 1.65; }

/* Final CTA */
.ac-cta-card {
  position: relative;
  padding: 64px 56px;
  border-radius: 24px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.07);
  text-align: center;
  overflow: hidden;
}
.ac-cta-glow {
  position: absolute;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.ac-cta-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: #f1f5f9; margin: 12px 0; letter-spacing: -0.02em; }
.ac-cta-sub { font-size: 15px; color: rgba(255,255,255,0.35); max-width: 460px; margin: 0 auto 36px; line-height: 1.7; }
.ac-cta-btns { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }

/* Footer */
.ac-footer { padding: 32px 24px; border-top: 1px solid rgba(255,255,255,0.05); }
.ac-footer .ac-container { text-align: center; font-size: 13px; color: rgba(255,255,255,0.2); }

@media(max-width: 640px) {
  .ac-hero { padding: 60px 20px; min-height: auto; }
  .ac-stats { flex-wrap: wrap; gap: 16px; }
  .ac-stat { border-right: none; padding: 0 16px; }
  .ac-auth-card { flex-direction: column; padding: 24px; }
  .ac-cta-card { padding: 40px 24px; }
  .ac-section { padding: 64px 0; }
}
`;