'use client';

import { useState, useEffect } from 'react';
import { submitBrief } from '@/app/actions/brief';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, Shield, Brain, Code2, Building2,
  CheckCircle2, ChevronDown, Sparkles, Globe,
  Mail, Phone, User, Briefcase, Loader2
} from 'lucide-react';

type Step = 0 | 1 | 2 | 3 | 4;

interface FormData {
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  companySize: string;
  country: string;
  website: string;
  solutionType: string;
  specificServices: string[];
  projectDescription: string;
  urgency: string;
  budget: string;
  hasExistingVendor: string;
  heardAboutUs: string;
}

const SOLUTIONS = [
  {
    id: 'cybersecurity', icon: Shield, label: 'Cybersecurity', tagline: 'Protect, detect & respond',
    color: '#22d3ee', glow: 'rgba(34,211,238,0.15)',
    services: ['Penetration Testing','Vulnerability Assessment','Security Audit','Incident Response','Cloud Security','Network Security','Compliance (ISO 27001 / GDPR)','Security Awareness Training','Threat Intelligence','SOC-as-a-Service'],
  },
  {
    id: 'ai', icon: Brain, label: 'AI & Data Intelligence', tagline: 'Transform data into decisions',
    color: '#a78bfa', glow: 'rgba(167,139,250,0.15)',
    services: ['Predictive Analytics','NLP & Chatbots','Computer Vision','Process Automation (RPA)','Fraud Detection','Recommendation Engines','Custom ML Models','Data Strategy & Governance','Business Intelligence','AI Integration'],
  },
  {
    id: 'software', icon: Code2, label: 'Custom Software', tagline: 'Built for your exact needs',
    color: '#34d399', glow: 'rgba(52,211,153,0.15)',
    services: ['Web Application','Mobile App (iOS / Android)','Enterprise Systems','API Development & Integration','SaaS Platform','E-commerce','ERP / CRM Systems','Cloud Infrastructure','DevOps & CI/CD','UI/UX Design'],
  },
];

const INDUSTRIES = ['Banking & Financial Services','Healthcare & Life Sciences','Government & Public Sector','Retail & E-commerce','Telecommunications','Education & EdTech','Energy & Utilities','Manufacturing & Logistics','Insurance','Media & Entertainment','NGO / Non-profit','Other'];
const COMPANY_SIZES = ['1–10','11–50','51–200','201–1,000','1,000+'];
const AFRICAN_COUNTRIES = ['Kenya','Nigeria','South Africa','Ghana','Ethiopia','Tanzania','Uganda','Rwanda','Egypt','Morocco','Senegal',"Côte d'Ivoire",'Cameroon','Zimbabwe','Zambia','Other'];
const BUDGETS = ['Under $5,000','$5,000–$25,000','$25,000–$100,000','$100,000–$500,000','$500,000+',"Let's discuss"];
const URGENCY = ['This week','Within a month','1–3 months','3–6 months','Planning ahead'];
const HEARD_FROM = ['Google Search','LinkedIn','Referral','Conference / Event','Social Media','Other'];
const STEPS = [
  { label: 'You', icon: User },
  { label: 'Business', icon: Building2 },
  { label: 'Solution', icon: Sparkles },
  { label: 'Project', icon: Briefcase },
  { label: 'Review', icon: CheckCircle2 },
];

export default function StartPage() {
  const [step, setStep] = useState<Step>(0);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [refCode, setRefCode] = useState('');
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState<FormData>({
    contactName: '', jobTitle: '', email: '', phone: '',
    businessName: '', industry: '', companySize: '', country: '', website: '',
    solutionType: '', specificServices: [],
    projectDescription: '', urgency: '', budget: '', hasExistingVendor: '', heardAboutUs: '',
  });

  useEffect(() => setMounted(true), []);

  const set = (field: keyof FormData, value: string | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const toggleService = (s: string) =>
    set('specificServices', form.specificServices.includes(s)
      ? form.specificServices.filter(x => x !== s)
      : [...form.specificServices, s]);

  const canNext = (): boolean => {
    if (step === 0) return !!(form.contactName && form.email && form.jobTitle);
    if (step === 1) return !!(form.businessName && form.industry && form.companySize && form.country);
    if (step === 2) return !!form.solutionType;
    if (step === 3) return !!(form.projectDescription && form.budget && form.urgency);
    return true;
  };

  const next = () => { if (canNext()) { setDir(1); setStep(s => (s + 1) as Step); } };
  const prev = () => { setDir(-1); setStep(s => (s - 1) as Step); };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const result = await submitBrief(form);
      if (result.success) {
        setRefCode(`OTA-${result.id?.slice(-6).toUpperCase() ?? Math.random().toString(36).slice(2, 8).toUpperCase()}`);
        setSubmitted(true);
      } else {
        setSubmitError(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const activeSolution = SOLUTIONS.find(s => s.id === form.solutionType);
  if (!mounted) return null;

  if (submitted) {
    return (
      <div className="ot-root">
        <style>{CSS}</style>
        <Bg />
        <motion.div className="ot-success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <motion.div className="ot-success-icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}>
            <CheckCircle2 size={36} color="#22d3ee" />
          </motion.div>
          <h2 className="ot-success-title">Brief received.</h2>
          <p className="ot-success-sub">
            Thank you, <strong>{form.contactName.split(' ')[0]}</strong>. Our senior team will review your requirements and contact you at <strong>{form.email}</strong> within 24 hours.
          </p>
          <div className="ot-success-ref">Reference: <span>{refCode}</span></div>
          <Link href="/" className="ot-back-link"><ArrowLeft size={14} /> Return to homepage</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="ot-root">
      <style>{CSS}</style>
      <Bg />

      <header className="ot-header">
        <Link href="/" className="ot-logo">
          <div className="ot-logo-icon"><Shield size={16} color="#22d3ee" /></div>
          <span>OmniTrust<em>Africa</em></span>
        </Link>
        <nav className="ot-steps-nav">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <div key={s.label} className="ot-step-item">
                <div className={`ot-step-dot ${done ? 'done' : active ? 'active' : ''}`}>
                  {done ? <CheckCircle2 size={11} /> : <Icon size={11} />}
                </div>
                <span className={`ot-step-label ${active ? 'active' : ''}`}>{s.label}</span>
                {i < STEPS.length - 1 && <div className={`ot-step-line ${done ? 'done' : ''}`} />}
              </div>
            );
          })}
        </nav>
        <div className="ot-header-right">
          <span className="ot-step-count">{step + 1} / {STEPS.length}</span>
        </div>
      </header>

      <div className="ot-progress-bar">
        <motion.div className="ot-progress-fill" animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} transition={{ duration: 0.5, ease: 'easeInOut' }} />
      </div>

      <main className="ot-main">
        <div className="ot-card">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} initial={{ opacity: 0, x: dir * 48 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -48 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}>

              {step === 0 && (
                <div className="ot-step-content">
                  <StepHeader eyebrow="Let's get acquainted" title="Who should we reach out to?" sub="We'll keep this between us — no spam, ever." />
                  <div className="ot-fields">
                    <div className="ot-row">
                      <Field icon={<User size={14} />} label="Full Name *" value={form.contactName} onChange={v => set('contactName', v)} placeholder="Jane Mwangi" />
                      <Field icon={<Briefcase size={14} />} label="Job Title *" value={form.jobTitle} onChange={v => set('jobTitle', v)} placeholder="CTO, IT Manager…" />
                    </div>
                    <div className="ot-row">
                      <Field icon={<Mail size={14} />} label="Work Email *" value={form.email} onChange={v => set('email', v)} placeholder="jane@company.com" type="email" />
                      <Field icon={<Phone size={14} />} label="Phone Number" value={form.phone} onChange={v => set('phone', v)} placeholder="+254 700 000 000" />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="ot-step-content">
                  <StepHeader eyebrow="Your organisation" title="Tell us about your business." sub="This helps us assign the right specialists to your brief." />
                  <div className="ot-fields">
                    <div className="ot-row">
                      <Field icon={<Building2 size={14} />} label="Business Name *" value={form.businessName} onChange={v => set('businessName', v)} placeholder="Acme Corp" />
                      <Field icon={<Globe size={14} />} label="Website" value={form.website} onChange={v => set('website', v)} placeholder="https://acme.com" />
                    </div>
                    <div className="ot-row">
                      <Select label="Industry *" value={form.industry} onChange={v => set('industry', v)} options={INDUSTRIES} placeholder="Select industry" />
                      <Select label="Country *" value={form.country} onChange={v => set('country', v)} options={AFRICAN_COUNTRIES} placeholder="Select country" />
                    </div>
                    <div>
                      <label className="ot-label">Company Size *</label>
                      <div className="ot-chip-row">
                        {COMPANY_SIZES.map(s => <Chip key={s} label={`${s} employees`} active={form.companySize === s} onClick={() => set('companySize', s)} />)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="ot-step-content">
                  <StepHeader eyebrow="What we can do for you" title="What kind of solution do you need?" sub="Pick one to start — we can always expand scope later." />
                  <div className="ot-solution-cards">
                    {SOLUTIONS.map(sol => {
                      const Icon = sol.icon;
                      const active = form.solutionType === sol.id;
                      return (
                        <motion.button key={sol.id} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
                          onClick={() => { set('solutionType', sol.id); set('specificServices', []); }}
                          className={`ot-sol-card ${active ? 'active' : ''}`}
                          style={active ? { '--sol-color': sol.color, '--sol-glow': sol.glow } as React.CSSProperties : {}}>
                          <div className="ot-sol-icon" style={{ background: sol.glow, border: `1px solid ${sol.color}30` }}>
                            <Icon size={22} color={sol.color} />
                          </div>
                          <div className="ot-sol-text">
                            <strong>{sol.label}</strong>
                            <span>{sol.tagline}</span>
                          </div>
                          {active && <div className="ot-sol-check"><CheckCircle2 size={16} color={sol.color} /></div>}
                        </motion.button>
                      );
                    })}
                  </div>
                  <AnimatePresence>
                    {activeSolution && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="ot-services-section">
                        <label className="ot-label">Specific areas of interest <span className="ot-optional">(select all that apply)</span></label>
                        <div className="ot-chip-row">
                          {activeSolution.services.map(s => (
                            <Chip key={s} label={s} active={form.specificServices.includes(s)} onClick={() => toggleService(s)} color={activeSolution.color} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {step === 3 && (
                <div className="ot-step-content">
                  <StepHeader eyebrow="Project details" title="Paint us the full picture." sub="The more context, the better we can prepare for your first call." />
                  <div className="ot-fields">
                    <div>
                      <label className="ot-label">Project Description *</label>
                      <textarea className="ot-textarea" rows={5} value={form.projectDescription} onChange={e => set('projectDescription', e.target.value)} placeholder="Describe your current challenges, what you're trying to achieve, any constraints or compliance requirements, and what success looks like for your organisation…" />
                    </div>
                    <div className="ot-row">
                      <div>
                        <label className="ot-label">How soon do you need this? *</label>
                        <div className="ot-chip-col">
                          {URGENCY.map(u => <Chip key={u} label={u} active={form.urgency === u} onClick={() => set('urgency', u)} />)}
                        </div>
                      </div>
                      <div>
                        <label className="ot-label">Estimated Budget *</label>
                        <div className="ot-chip-col">
                          {BUDGETS.map(b => <Chip key={b} label={b} active={form.budget === b} onClick={() => set('budget', b)} />)}
                        </div>
                      </div>
                    </div>
                    <div className="ot-row">
                      <div>
                        <label className="ot-label">Do you have an existing vendor / system?</label>
                        <div className="ot-chip-row">
                          {['Yes','No','Partially'].map(o => <Chip key={o} label={o} active={form.hasExistingVendor === o} onClick={() => set('hasExistingVendor', o)} />)}
                        </div>
                      </div>
                      <div>
                        <label className="ot-label">How did you hear about us?</label>
                        <div className="ot-chip-row ot-wrap">
                          {HEARD_FROM.map(h => <Chip key={h} label={h} active={form.heardAboutUs === h} onClick={() => set('heardAboutUs', h)} />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="ot-step-content">
                  <StepHeader eyebrow="Almost there" title="Review your brief." sub="Confirm everything looks correct before we send this to our team." />
                  <div className="ot-review-grid">
                    <ReviewSection title="Contact">
                      <ReviewRow label="Name" value={form.contactName} />
                      <ReviewRow label="Title" value={form.jobTitle} />
                      <ReviewRow label="Email" value={form.email} />
                      {form.phone && <ReviewRow label="Phone" value={form.phone} />}
                    </ReviewSection>
                    <ReviewSection title="Business">
                      <ReviewRow label="Company" value={form.businessName} />
                      <ReviewRow label="Industry" value={form.industry} />
                      <ReviewRow label="Size" value={form.companySize + ' employees'} />
                      <ReviewRow label="Country" value={form.country} />
                      {form.website && <ReviewRow label="Website" value={form.website} />}
                    </ReviewSection>
                    <ReviewSection title="Solution" full>
                      <ReviewRow label="Type" value={SOLUTIONS.find(s => s.id === form.solutionType)?.label || ''} />
                      {form.specificServices.length > 0 && <ReviewRow label="Services" value={form.specificServices.join(' · ')} />}
                    </ReviewSection>
                    <ReviewSection title="Project" full>
                      <ReviewRow label="Budget" value={form.budget} />
                      <ReviewRow label="Timeline" value={form.urgency} />
                      {form.hasExistingVendor && <ReviewRow label="Existing vendor" value={form.hasExistingVendor} />}
                      <div className="ot-review-desc">
                        <span className="ot-review-key">Description</span>
                        <p>{form.projectDescription}</p>
                      </div>
                    </ReviewSection>
                  </div>
                  {submitError && <div className="ot-error">⚠ {submitError}</div>}
                  <p className="ot-consent">
                    By submitting you agree to our <Link href="/privacy">Privacy Policy</Link>. We will never share your information with third parties.
                  </p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          <div className="ot-nav">
            <button className="ot-btn-back" onClick={step === 0 ? undefined : prev}>
              {step === 0
                ? <Link href="/" className="ot-cancel"><ArrowLeft size={14} /> Cancel</Link>
                : <><ArrowLeft size={14} /> Back</>}
            </button>
            <motion.button
              className={`ot-btn-next ${(!canNext() || submitting) ? 'disabled' : ''}`}
              onClick={step < 4 ? next : handleSubmit}
              disabled={!canNext() || submitting}
              whileHover={canNext() && !submitting ? { scale: 1.02 } : {}}
              whileTap={canNext() && !submitting ? { scale: 0.97 } : {}}
            >
              {submitting ? <><Loader2 size={15} className="ot-spinner" /> Saving…</> : step < 4 ? <>Continue <ArrowRight size={15} /></> : <>Submit Brief <ArrowRight size={15} /></>}
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Bg() {
  return (
    <div className="ot-bg" aria-hidden>
      <div className="ot-bg-blob b1" /><div className="ot-bg-blob b2" /><div className="ot-bg-blob b3" />
      <div className="ot-bg-grid" />
    </div>
  );
}

function StepHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="ot-step-header">
      <p className="ot-eyebrow">{eyebrow}</p>
      <h1 className="ot-title">{title}</h1>
      <p className="ot-sub">{sub}</p>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', icon }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; icon?: React.ReactNode; }) {
  return (
    <div className="ot-field">
      <label className="ot-label">{label}</label>
      <div className="ot-input-wrap">
        {icon && <span className="ot-input-icon">{icon}</span>}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`ot-input ${icon ? 'has-icon' : ''}`} />
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string; }) {
  return (
    <div className="ot-field">
      <label className="ot-label">{label}</label>
      <div className="ot-select-wrap">
        <select className="ot-select" value={value} onChange={e => onChange(e.target.value)}>
          <option value="" disabled>{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="ot-select-arrow" />
      </div>
    </div>
  );
}

function Chip({ label, active, onClick, color }: { label: string; active: boolean; onClick: () => void; color?: string; }) {
  return (
    <button onClick={onClick} className={`ot-chip ${active ? 'active' : ''}`} style={active && color ? { borderColor: color, color, background: color + '12' } : {}}>
      {active && <CheckCircle2 size={11} />}{label}
    </button>
  );
}

function ReviewSection({ title, children, full }: { title: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={`ot-review-section ${full ? 'full' : ''}`}>
      <h4 className="ot-review-title">{title}</h4>
      <div className="ot-review-body">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ot-review-row">
      <span className="ot-review-key">{label}</span>
      <span className="ot-review-val">{value}</span>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.ot-root{min-height:100vh;background:#04060f;color:#e2e8f0;font-family:'Outfit',sans-serif;position:relative;overflow-x:hidden;}
.ot-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
.ot-bg-blob{position:absolute;border-radius:50%;filter:blur(100px);opacity:0.5;}
.b1{width:600px;height:600px;top:-200px;left:-100px;background:radial-gradient(circle,rgba(34,211,238,0.08),transparent 70%);}
.b2{width:500px;height:500px;bottom:-100px;right:-100px;background:radial-gradient(circle,rgba(167,139,250,0.07),transparent 70%);}
.b3{width:300px;height:300px;top:40%;left:60%;background:radial-gradient(circle,rgba(52,211,153,0.05),transparent 70%);}
.ot-bg-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,0.025) 1px,transparent 0);background-size:40px 40px;}
.ot-progress-bar{position:fixed;top:0;left:0;right:0;height:2px;background:rgba(255,255,255,0.05);z-index:100;}
.ot-progress-fill{height:100%;background:linear-gradient(90deg,#22d3ee,#a78bfa);border-radius:0 2px 2px 0;}
.ot-header{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:16px 32px;background:rgba(4,6,15,0.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.05);}
.ot-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:#e2e8f0;font-size:14px;font-weight:600;}
.ot-logo em{color:#22d3ee;font-style:normal;}
.ot-logo-icon{width:32px;height:32px;border-radius:8px;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center;}
.ot-steps-nav{display:flex;align-items:center;}
.ot-step-item{display:flex;align-items:center;gap:6px;}
.ot-step-dot{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.25);transition:all 0.3s;}
.ot-step-dot.active{background:rgba(34,211,238,0.1);border-color:rgba(34,211,238,0.5);color:#22d3ee;}
.ot-step-dot.done{background:#22d3ee;border-color:#22d3ee;color:#04060f;}
.ot-step-label{font-size:11px;color:rgba(255,255,255,0.25);font-weight:500;transition:color 0.3s;}
.ot-step-label.active{color:#22d3ee;}
.ot-step-line{width:24px;height:1px;background:rgba(255,255,255,0.08);margin:0 4px;transition:background 0.3s;}
.ot-step-line.done{background:rgba(34,211,238,0.4);}
.ot-header-right{display:flex;align-items:center;}
.ot-step-count{font-size:12px;color:rgba(255,255,255,0.25);font-weight:500;}
.ot-main{position:relative;z-index:10;min-height:calc(100vh - 65px);display:flex;align-items:flex-start;justify-content:center;padding:48px 16px 80px;}
.ot-card{width:100%;max-width:720px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:24px;padding:48px;backdrop-filter:blur(10px);}
.ot-step-content{min-height:420px;}
.ot-step-header{margin-bottom:40px;}
.ot-eyebrow{font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#22d3ee;margin-bottom:12px;}
.ot-title{font-family:'Instrument Serif',serif;font-size:clamp(28px,4vw,40px);font-weight:400;color:#f1f5f9;line-height:1.15;margin-bottom:10px;letter-spacing:-0.02em;}
.ot-sub{font-size:14px;color:rgba(255,255,255,0.35);line-height:1.6;}
.ot-fields{display:flex;flex-direction:column;gap:20px;}
.ot-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.ot-field{display:flex;flex-direction:column;gap:8px;}
.ot-label{font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.4);}
.ot-optional{text-transform:none;letter-spacing:0;font-weight:400;color:rgba(255,255,255,0.2);}
.ot-input-wrap{position:relative;}
.ot-input-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.25);pointer-events:none;display:flex;}
.ot-input{width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:#f1f5f9;font-size:14px;font-family:'Outfit',sans-serif;transition:border-color 0.2s,background 0.2s;outline:none;}
.ot-input.has-icon{padding-left:40px;}
.ot-input:focus{border-color:rgba(34,211,238,0.4);background:rgba(34,211,238,0.02);}
.ot-input::placeholder{color:rgba(255,255,255,0.15);}
.ot-select-wrap{position:relative;}
.ot-select{width:100%;padding:12px 40px 12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:#f1f5f9;font-size:14px;font-family:'Outfit',sans-serif;appearance:none;cursor:pointer;outline:none;transition:border-color 0.2s;}
.ot-select:focus{border-color:rgba(34,211,238,0.4);}
.ot-select option{background:#0d1117;color:#f1f5f9;}
.ot-select-arrow{position:absolute;right:14px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.25);pointer-events:none;}
.ot-textarea{width:100%;padding:14px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:#f1f5f9;font-size:14px;font-family:'Outfit',sans-serif;resize:vertical;outline:none;line-height:1.6;transition:border-color 0.2s;}
.ot-textarea:focus{border-color:rgba(34,211,238,0.4);}
.ot-textarea::placeholder{color:rgba(255,255,255,0.15);}
.ot-chip-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;}
.ot-chip-col{display:flex;flex-direction:column;gap:6px;margin-top:4px;}
.ot-wrap{flex-wrap:wrap;}
.ot-chip{display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:100px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.4);font-size:12.5px;font-family:'Outfit',sans-serif;font-weight:500;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
.ot-chip:hover{border-color:rgba(255,255,255,0.18);color:rgba(255,255,255,0.7);}
.ot-chip.active{border-color:rgba(34,211,238,0.5);background:rgba(34,211,238,0.08);color:#22d3ee;}
.ot-solution-cards{display:flex;flex-direction:column;gap:12px;margin-bottom:8px;}
.ot-sol-card{width:100%;display:flex;align-items:center;gap:16px;padding:18px 20px;border-radius:16px;border:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.02);cursor:pointer;text-align:left;transition:all 0.25s;position:relative;}
.ot-sol-card:hover{border-color:rgba(255,255,255,0.14);background:rgba(255,255,255,0.04);}
.ot-sol-card.active{border-color:var(--sol-color,rgba(34,211,238,0.5));background:var(--sol-glow,rgba(34,211,238,0.05));box-shadow:0 0 0 1px var(--sol-color,rgba(34,211,238,0.15)) inset;}
.ot-sol-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ot-sol-text{flex:1;}
.ot-sol-text strong{display:block;font-size:15px;font-weight:600;color:#f1f5f9;margin-bottom:3px;}
.ot-sol-text span{font-size:13px;color:rgba(255,255,255,0.35);}
.ot-sol-check{flex-shrink:0;}
.ot-services-section{margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);}
.ot-review-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
.ot-review-section{padding:18px 20px;border-radius:14px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);}
.ot-review-section.full{grid-column:1/-1;}
.ot-review-title{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:12px;}
.ot-review-body{display:flex;flex-direction:column;gap:8px;}
.ot-review-row{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;}
.ot-review-key{font-size:12px;color:rgba(255,255,255,0.3);flex-shrink:0;}
.ot-review-val{font-size:13px;color:rgba(255,255,255,0.75);text-align:right;line-height:1.4;}
.ot-review-desc{margin-top:4px;}
.ot-review-desc p{font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;margin-top:4px;}
.ot-error{margin-bottom:16px;padding:12px 16px;border-radius:10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);color:#fca5a5;font-size:13px;}
.ot-consent{font-size:12px;color:rgba(255,255,255,0.2);line-height:1.6;}
.ot-consent a{color:rgba(255,255,255,0.4);text-decoration:underline;}
.ot-nav{display:flex;align-items:center;justify-content:space-between;margin-top:40px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05);}
.ot-btn-back{display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.3);background:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;transition:color 0.2s;}
.ot-btn-back:hover{color:rgba(255,255,255,0.6);}
.ot-cancel{display:flex;align-items:center;gap:6px;color:rgba(255,255,255,0.3);text-decoration:none;font-size:13px;transition:color 0.2s;}
.ot-cancel:hover{color:rgba(255,255,255,0.6);}
.ot-btn-next{display:flex;align-items:center;gap:8px;padding:12px 28px;border-radius:100px;border:none;background:linear-gradient(135deg,#22d3ee,#3b82f6);color:#fff;font-size:14px;font-weight:600;font-family:'Outfit',sans-serif;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 24px rgba(34,211,238,0.25);}
.ot-btn-next:hover{box-shadow:0 6px 32px rgba(34,211,238,0.35);}
.ot-btn-next.disabled{background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.2);cursor:not-allowed;box-shadow:none;}
@keyframes spin{to{transform:rotate(360deg);}}
.ot-spinner{animation:spin 0.8s linear infinite;}
.ot-success{position:relative;z-index:10;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:48px 24px;max-width:500px;margin:0 auto;}
.ot-success-icon{width:72px;height:72px;border-radius:50%;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.25);display:flex;align-items:center;justify-content:center;margin-bottom:28px;}
.ot-success-title{font-family:'Instrument Serif',serif;font-size:48px;font-weight:400;color:#f1f5f9;margin-bottom:16px;letter-spacing:-0.02em;}
.ot-success-sub{font-size:15px;color:rgba(255,255,255,0.45);line-height:1.7;margin-bottom:24px;}
.ot-success-sub strong{color:rgba(255,255,255,0.7);font-weight:500;}
.ot-success-ref{font-size:12px;color:rgba(255,255,255,0.2);margin-bottom:32px;font-family:monospace;letter-spacing:0.05em;}
.ot-success-ref span{color:#22d3ee;}
.ot-back-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.3);text-decoration:none;transition:color 0.2s;}
.ot-back-link:hover{color:rgba(255,255,255,0.6);}
@media(max-width:640px){.ot-card{padding:28px 20px;border-radius:16px;}.ot-row{grid-template-columns:1fr;}.ot-review-grid{grid-template-columns:1fr;}.ot-review-section.full{grid-column:1;}.ot-steps-nav{display:none;}.ot-header{padding:14px 20px;}}
input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 30px #0a0f1a inset !important;-webkit-text-fill-color:#f1f5f9 !important;caret-color:#f1f5f9;}
`;