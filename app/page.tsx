'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import {
  ArrowRight, Shield, Users, Zap, TrendingUp, Lock,
  AlertCircle, ChevronRight, Globe, Award, Eye,
  Activity, Server, Fingerprint
} from 'lucide-react';

const services = [
  { icon: AlertCircle, title: 'Vulnerability Assessment', desc: 'Identify and prioritize security weaknesses before attackers do.', color: '#f59e0b' },
  { icon: Fingerprint, title: 'Penetration Testing', desc: 'Simulate real-world attacks to stress-test your defenses.', color: '#22d3ee' },
  { icon: Shield, title: 'Security Audit', desc: 'Comprehensive review of your security policies and controls.', color: '#34d399' },
  { icon: TrendingUp, title: 'Compliance & Risk', desc: 'Stay compliant with GDPR, ISO 27001, and local regulations.', color: '#a78bfa' },
  { icon: Activity, title: 'Incident Response', desc: 'Rapid containment and recovery when breaches happen.', color: '#f87171' },
  { icon: Users, title: 'Security Awareness', desc: 'Build a security-first culture through targeted training.', color: '#22d3ee' },
];

const stats = [
  { value: '300+', label: 'Clients Protected' },
  { value: '15+', label: 'African Countries' },
  { value: '99.7%', label: 'Threat Detection' },
  { value: '< 2hr', label: 'Response Time' },
];

const trustedBy = ['Kenya Revenue Authority', 'Equity Bank', 'Safaricom', 'MTN Group', 'Stanbic Bank', 'KCAA'];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="hp-root">
      <style>{CSS}</style>
      <SidebarNav />

      <main className="hp-main">

        {/* ── HERO ── */}
        <section className="hp-hero" ref={heroRef}>
          <div className="hp-hero-bg">
            <div className="hp-blob b1" />
            <div className="hp-blob b2" />
            <div className="hp-blob b3" />
            <div className="hp-grid" />
            {/* Animated scan line */}
            <div className="hp-scanline" />
          </div>

          <motion.div className="hp-hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeUp} className="hp-hero-badge">
                <span className="hp-badge-dot" />
                <span>Trusted by 300+ organizations across Africa</span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1} className="hp-hero-title">
                Africa's most trusted<br />
                <span className="hp-title-accent">cyber defence</span><br />
                partner.
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} className="hp-hero-sub">
                OmniTrust Africa detects threats, prevents breaches, and builds
                resilient security postures for businesses across the continent —
                from Nairobi to Lagos, Cairo to Cape Town.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="hp-hero-actions">
                <Link href="/start" className="hp-btn-primary">
                  Get Protected <ArrowRight size={16} />
                </Link>
                <Link href="/academy" className="hp-btn-ghost">
                  Explore Academy <ChevronRight size={15} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Floating threat card */}
            <motion.div
              className="hp-threat-card"
              initial={{ opacity: 0, x: 40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hp-threat-header">
                <div className="hp-threat-dot" />
                <span>Live Threat Monitor</span>
                <span className="hp-threat-live">LIVE</span>
              </div>
              {[
                { type: 'SQL Injection', origin: 'Lagos, NG', severity: 'HIGH', time: '2s ago' },
                { type: 'Brute Force', origin: 'Cairo, EG', severity: 'MED', time: '14s ago' },
                { type: 'Port Scan', origin: 'Accra, GH', severity: 'LOW', time: '31s ago' },
              ].map((t, i) => (
                <div key={i} className="hp-threat-row">
                  <div>
                    <p className="hp-threat-type">{t.type}</p>
                    <p className="hp-threat-origin">{t.origin}</p>
                  </div>
                  <div className="hp-threat-right">
                    <span className={`hp-sev hp-sev-${t.severity.toLowerCase()}`}>{t.severity}</span>
                    <span className="hp-threat-time">{t.time}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            className="hp-stats-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {stats.map((s, i) => (
              <div key={s.label} className="hp-stat">
                <span className="hp-stat-val">{s.value}</span>
                <span className="hp-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── TRUSTED BY ── */}
        <section className="hp-trusted">
          <div className="hp-container">
            <p className="hp-trusted-label">Trusted by leading African organisations</p>
            <div className="hp-trusted-logos">
              {trustedBy.map(name => (
                <div key={name} className="hp-trusted-logo">{name}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="hp-section" id="services">
          <div className="hp-container">
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="hp-section-head"
            >
              <motion.p variants={fadeUp} className="hp-eyebrow">What We Do</motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="hp-section-title">
                End-to-end security,<br />built for Africa.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="hp-section-sub">
                From compliance to breach response — we cover every layer of your security posture.
              </motion.p>
            </motion.div>

            <motion.div
              className="hp-services-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
            >
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <motion.div key={svc.title} variants={fadeUp} custom={i * 0.5} className="hp-svc-card"
                    style={{ '--svc-color': svc.color } as React.CSSProperties}>
                    <div className="hp-svc-icon" style={{ background: svc.color + '12', border: `1px solid ${svc.color}25` }}>
                      <Icon size={20} color={svc.color} />
                    </div>
                    <h3 className="hp-svc-title">{svc.title}</h3>
                    <p className="hp-svc-desc">{svc.desc}</p>
                    <Link href="/services" className="hp-svc-link">
                      Learn more <ArrowRight size={12} />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} className="hp-services-cta"
            >
              <Link href="/services" className="hp-btn-ghost">
                View All Services <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── WHY OMNITRUST ── */}
        <section className="hp-why">
          <div className="hp-container">
            <div className="hp-why-layout">
              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true }} variants={stagger}
                className="hp-why-left"
              >
                <motion.p variants={fadeUp} className="hp-eyebrow">Why OmniTrust</motion.p>
                <motion.h2 variants={fadeUp} custom={1} className="hp-section-title">
                  Security built for<br />the African context.
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="hp-why-sub">
                  Cyber threats in Africa are unique. Regulatory landscapes differ, infrastructure varies, and threat actors are increasingly sophisticated. We've spent years building expertise that's specifically relevant to the African market.
                </motion.p>
                <motion.div variants={fadeUp} custom={3}>
                  <Link href="/about" className="hp-btn-primary">
                    Our Story <ArrowRight size={15} />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true }} variants={stagger}
                className="hp-why-right"
              >
                {[
                  { icon: Globe, title: 'Africa-First Expertise', desc: 'Deep knowledge of African regulatory environments, from Kenya\'s DPA to Nigeria\'s NDPR.' },
                  { icon: Eye, title: '24/7 SOC Monitoring', desc: 'Our Security Operations Centre watches your environment around the clock, every day of the year.' },
                  { icon: Award, title: 'Certified Professionals', desc: 'CISSP, CISM, OSCP, and CEH-certified engineers on every engagement.' },
                  { icon: Server, title: 'Local Infrastructure', desc: 'Data stays on-shore where regulations require it. We operate data centres across key African markets.' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} variants={fadeUp} custom={i * 0.5} className="hp-why-card">
                      <div className="hp-why-icon">
                        <Icon size={18} color="#22d3ee" />
                      </div>
                      <div>
                        <h4 className="hp-why-title">{item.title}</h4>
                        <p className="hp-why-desc">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── ACADEMY PROMO ── */}
        <section className="hp-section">
          <div className="hp-container">
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true }} variants={fadeUp}
              className="hp-academy-card"
            >
              <div className="hp-academy-glow" />
              <div className="hp-academy-left">
                <p className="hp-eyebrow" style={{ color: '#a78bfa' }}>OmniTrust Academy</p>
                <h2 className="hp-academy-title">Train your team.<br />Defend your future.</h2>
                <p className="hp-academy-sub">
                  From web security fundamentals to advanced penetration testing — world-class cybersecurity education built for African professionals.
                </p>
                <div className="hp-academy-actions">
                  <Link href="/academy" className="hp-btn-primary" style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)' }}>
                    Browse Courses <ArrowRight size={15} />
                  </Link>
                  <Link href="/signup" className="hp-btn-ghost">
                    Create Free Account
                  </Link>
                </div>
              </div>
              <div className="hp-academy-right">
                {['Web Security Fundamentals', 'Penetration Testing 101', 'Network Security Essentials', 'Incident Response Mastery'].map((c, i) => (
                  <div key={c} className="hp-course-pill">
                    <div className="hp-course-num">{String(i + 1).padStart(2, '0')}</div>
                    <span>{c}</span>
                    <ChevronRight size={14} color="rgba(255,255,255,0.2)" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="hp-section">
          <div className="hp-container">
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true }} variants={fadeUp}
              className="hp-cta-card"
            >
              <div className="hp-cta-bg" />
              <p className="hp-eyebrow">Get Started Today</p>
              <h2 className="hp-cta-title">Ready to secure your<br />digital future?</h2>
              <p className="hp-cta-sub">
                Tell us about your organisation and we'll have a senior consultant reach out within 24 hours.
              </p>
              <div className="hp-cta-actions">
                <Link href="/start" className="hp-btn-primary hp-btn-lg">
                  Start Your Brief <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="hp-btn-ghost">
                  Talk to Us First
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="hp-footer">
          <div className="hp-container">
            <div className="hp-footer-grid">
              <div className="hp-footer-brand">
                <div className="hp-footer-logo">
                  <Shield size={18} color="#22d3ee" />
                  <span>OmniTrust<em>Africa</em></span>
                </div>
                <p className="hp-footer-tagline">World-class cybersecurity solutions for the African continent.</p>
              </div>
              <div>
                <h4 className="hp-footer-heading">Product</h4>
                <ul className="hp-footer-links">
                  <li><Link href="/services">Services</Link></li>
                  <li><Link href="/academy">Academy</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/start">Get a Quote</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="hp-footer-heading">Company</h4>
                <ul className="hp-footer-links">
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/careers">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="hp-footer-heading">Legal</h4>
                <ul className="hp-footer-links">
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="hp-footer-bottom">
              <p>&copy; 2024 OmniTrust Africa Ltd. All rights reserved.</p>
              <p>Nairobi · Lagos · Johannesburg · Accra</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.hp-root{min-height:100vh;background:#04060f;color:#e2e8f0;font-family:'DM Sans',sans-serif;}
.hp-main{margin-left:0;}
.hp-container{max-width:1140px;margin:0 auto;padding:0 28px;}

/* ── Hero ── */
.hp-hero{
  position:relative;min-height:100vh;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:100px 28px 0;overflow:hidden;
}
.hp-hero-bg{position:absolute;inset:0;pointer-events:none;}
.hp-blob{position:absolute;border-radius:50%;filter:blur(130px);}
.b1{width:800px;height:800px;top:-300px;left:-200px;background:radial-gradient(circle,rgba(34,211,238,0.06),transparent 65%);}
.b2{width:600px;height:600px;bottom:-200px;right:-100px;background:radial-gradient(circle,rgba(167,139,250,0.06),transparent 65%);}
.b3{width:400px;height:400px;top:40%;left:50%;background:radial-gradient(circle,rgba(52,211,153,0.04),transparent 65%);}
.hp-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,0.025) 1px,transparent 0);background-size:44px 44px;}

@keyframes scan{0%{transform:translateY(-100%);}100%{transform:translateY(100vh);}}
.hp-scanline{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(34,211,238,0.15),transparent);animation:scan 8s linear infinite;pointer-events:none;}

.hp-hero-inner{position:relative;z-index:1;max-width:1100px;width:100%;display:flex;align-items:center;gap:60px;padding-bottom:80px;}
@media(max-width:900px){.hp-hero-inner{flex-direction:column;text-align:center;gap:40px;}}

.hp-hero-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 16px;border-radius:100px;background:rgba(34,211,238,0.07);border:1px solid rgba(34,211,238,0.18);font-size:12px;font-weight:500;color:rgba(255,255,255,0.5);margin-bottom:24px;}
.hp-badge-dot{width:6px;height:6px;border-radius:50%;background:#22d3ee;box-shadow:0 0 8px #22d3ee;}

.hp-hero-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(38px,5.5vw,72px);font-weight:800;color:#f8fafc;line-height:1.05;letter-spacing:-0.03em;margin-bottom:20px;}
.hp-title-accent{color:#22d3ee;position:relative;}
.hp-title-accent::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:2px;background:linear-gradient(90deg,#22d3ee,transparent);border-radius:2px;}

.hp-hero-sub{font-size:clamp(15px,1.5vw,17px);color:rgba(255,255,255,0.4);line-height:1.75;max-width:480px;margin-bottom:36px;}
@media(max-width:900px){.hp-hero-sub{margin:0 auto 36px;}}

.hp-hero-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
@media(max-width:900px){.hp-hero-actions{justify-content:center;}}

.hp-btn-primary{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:100px;background:linear-gradient(135deg,#22d3ee,#3b82f6);color:#fff;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;text-decoration:none;box-shadow:0 4px 24px rgba(34,211,238,0.25);transition:all 0.2s;}
.hp-btn-primary:hover{box-shadow:0 6px 32px rgba(34,211,238,0.4);transform:translateY(-1px);}
.hp-btn-primary.hp-btn-lg{padding:15px 36px;font-size:15px;}

.hp-btn-ghost{display:inline-flex;align-items:center;gap:6px;padding:13px 24px;border-radius:100px;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:14px;font-weight:500;font-family:'DM Sans',sans-serif;text-decoration:none;transition:all 0.2s;}
.hp-btn-ghost:hover{border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.8);}

/* Threat card */
.hp-threat-card{flex-shrink:0;width:300px;padding:20px;border-radius:18px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(20px);}
@media(max-width:900px){.hp-threat-card{width:100%;max-width:400px;}}
.hp-threat-header{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:rgba(255,255,255,0.35);margin-bottom:16px;letter-spacing:0.05em;}
.hp-threat-dot{width:8px;height:8px;border-radius:50%;background:#34d399;box-shadow:0 0 6px #34d399;animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
.hp-threat-live{margin-left:auto;font-size:9px;font-weight:700;color:#34d399;letter-spacing:0.1em;padding:2px 6px;border-radius:4px;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.2);}
.hp-threat-row{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);margin-bottom:6px;}
.hp-threat-type{font-size:12px;font-weight:600;color:#f1f5f9;margin-bottom:2px;}
.hp-threat-origin{font-size:11px;color:rgba(255,255,255,0.25);}
.hp-threat-right{display:flex;flex-direction:column;align-items:flex-end;gap:4px;}
.hp-sev{font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;letter-spacing:0.05em;}
.hp-sev-high{color:#f87171;background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.2);}
.hp-sev-med{color:#f59e0b;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.2);}
.hp-sev-low{color:#34d399;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.2);}
.hp-threat-time{font-size:10px;color:rgba(255,255,255,0.2);}

/* Stats bar */
.hp-stats-bar{position:relative;z-index:1;width:100%;max-width:1140px;display:flex;align-items:center;justify-content:center;gap:0;padding:24px 28px;border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);}
.hp-stat{display:flex;flex-direction:column;align-items:center;padding:0 40px;border-right:1px solid rgba(255,255,255,0.06);}
.hp-stat:last-child{border-right:none;}
.hp-stat-val{font-family:'Bricolage Grotesque',sans-serif;font-size:28px;font-weight:800;color:#f1f5f9;letter-spacing:-0.02em;}
.hp-stat-label{font-size:11px;color:rgba(255,255,255,0.3);margin-top:3px;letter-spacing:0.04em;}
@media(max-width:640px){.hp-stats-bar{flex-wrap:wrap;gap:16px;}.hp-stat{border-right:none;padding:0 20px;}}

/* Trusted */
.hp-trusted{padding:48px 0;border-bottom:1px solid rgba(255,255,255,0.04);}
.hp-trusted-label{text-align:center;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:24px;}
.hp-trusted-logos{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px 32px;}
.hp-trusted-logo{font-size:13px;font-weight:600;color:rgba(255,255,255,0.15);letter-spacing:0.02em;transition:color 0.2s;}
.hp-trusted-logo:hover{color:rgba(255,255,255,0.4);}

/* Sections */
.hp-section{padding:100px 0;}
.hp-section-head{text-align:center;margin-bottom:64px;}
.hp-eyebrow{font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#22d3ee;margin-bottom:12px;}
.hp-section-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(28px,4vw,48px);font-weight:800;color:#f8fafc;line-height:1.1;letter-spacing:-0.025em;margin-bottom:16px;}
.hp-section-sub{font-size:16px;color:rgba(255,255,255,0.35);max-width:480px;margin:0 auto;line-height:1.7;}

/* Services */
.hp-services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
@media(max-width:900px){.hp-services-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.hp-services-grid{grid-template-columns:1fr;}}

.hp-svc-card{padding:28px;border-radius:18px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);transition:all 0.3s;position:relative;overflow:hidden;}
.hp-svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--svc-color,#22d3ee),transparent);opacity:0;transition:opacity 0.3s;}
.hp-svc-card:hover{border-color:rgba(255,255,255,0.1);background:rgba(255,255,255,0.035);transform:translateY(-3px);}
.hp-svc-card:hover::before{opacity:1;}
.hp-svc-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.hp-svc-title{font-family:'Bricolage Grotesque',sans-serif;font-size:17px;font-weight:700;color:#f1f5f9;margin-bottom:8px;}
.hp-svc-desc{font-size:13.5px;color:rgba(255,255,255,0.35);line-height:1.65;margin-bottom:16px;}
.hp-svc-link{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;color:rgba(255,255,255,0.25);text-decoration:none;transition:color 0.2s;letter-spacing:0.02em;}
.hp-svc-link:hover{color:var(--svc-color,#22d3ee);}
.hp-services-cta{text-align:center;margin-top:40px;}

/* Why */
.hp-why{padding:100px 0;background:rgba(255,255,255,0.01);border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);}
.hp-why-layout{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
@media(max-width:900px){.hp-why-layout{grid-template-columns:1fr;gap:48px;}}
.hp-why-sub{font-size:15px;color:rgba(255,255,255,0.35);line-height:1.8;margin:20px 0 32px;max-width:440px;}
.hp-why-right{display:flex;flex-direction:column;gap:16px;}
.hp-why-card{display:flex;align-items:flex-start;gap:16px;padding:20px;border-radius:14px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);transition:all 0.2s;}
.hp-why-card:hover{border-color:rgba(34,211,238,0.15);background:rgba(34,211,238,0.03);}
.hp-why-icon{width:38px;height:38px;border-radius:10px;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.hp-why-title{font-size:14px;font-weight:700;color:#f1f5f9;margin-bottom:4px;}
.hp-why-desc{font-size:13px;color:rgba(255,255,255,0.35);line-height:1.6;}

/* Academy card */
.hp-academy-card{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;padding:60px;border-radius:24px;background:rgba(167,139,250,0.03);border:1px solid rgba(167,139,250,0.12);overflow:hidden;}
@media(max-width:900px){.hp-academy-card{grid-template-columns:1fr;padding:36px 28px;gap:36px;}}
.hp-academy-glow{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,0.05),transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
.hp-academy-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(28px,3.5vw,44px);font-weight:800;color:#f8fafc;line-height:1.1;letter-spacing:-0.02em;margin:12px 0;}
.hp-academy-sub{font-size:15px;color:rgba(255,255,255,0.35);line-height:1.7;margin-bottom:28px;max-width:420px;}
.hp-academy-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
.hp-academy-right{display:flex;flex-direction:column;gap:10px;position:relative;z-index:1;}
.hp-course-pill{display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);transition:all 0.2s;}
.hp-course-pill:hover{border-color:rgba(167,139,250,0.2);background:rgba(167,139,250,0.05);}
.hp-course-num{font-size:11px;font-weight:700;color:rgba(167,139,250,0.6);font-family:'Bricolage Grotesque',sans-serif;min-width:24px;}
.hp-course-pill span{flex:1;font-size:13px;font-weight:500;color:rgba(255,255,255,0.5);}

/* CTA */
.hp-cta-card{position:relative;padding:72px;border-radius:24px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);text-align:center;overflow:hidden;}
.hp-cta-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(34,211,238,0.05),transparent 60%);pointer-events:none;}
.hp-cta-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(32px,4vw,52px);font-weight:800;color:#f8fafc;line-height:1.1;letter-spacing:-0.025em;margin:12px 0;}
.hp-cta-sub{font-size:16px;color:rgba(255,255,255,0.35);max-width:440px;margin:0 auto 36px;line-height:1.7;}
.hp-cta-actions{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;}
@media(max-width:640px){.hp-cta-card{padding:40px 24px;}}

/* Footer */
.hp-footer{padding:64px 0 32px;border-top:1px solid rgba(255,255,255,0.05);}
.hp-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px;}
@media(max-width:768px){.hp-footer-grid{grid-template-columns:1fr 1fr;}}
@media(max-width:480px){.hp-footer-grid{grid-template-columns:1fr;}}
.hp-footer-logo{display:flex;align-items:center;gap:10px;font-size:16px;font-weight:700;color:#f1f5f9;margin-bottom:12px;}
.hp-footer-logo em{color:#22d3ee;font-style:normal;}
.hp-footer-tagline{font-size:13px;color:rgba(255,255,255,0.25);line-height:1.6;max-width:240px;}
.hp-footer-heading{font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:16px;}
.hp-footer-links{list-style:none;display:flex;flex-direction:column;gap:10px;}
.hp-footer-links a{font-size:13px;color:rgba(255,255,255,0.35);text-decoration:none;transition:color 0.2s;}
.hp-footer-links a:hover{color:rgba(255,255,255,0.7);}
.hp-footer-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05);font-size:12px;color:rgba(255,255,255,0.18);}
@media(max-width:640px){.hp-footer-bottom{flex-direction:column;gap:8px;text-align:center;}}
`;