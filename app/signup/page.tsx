'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, EyeOff, Shield, ArrowRight, Check,
  Chrome, Linkedin, Mail, User, Lock, AlertCircle
} from 'lucide-react';

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ characters', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /\d/.test(password) },
    { label: 'Special character', pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ['#ef4444', '#f59e0b', '#22d3ee', '#34d399'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="su-strength">
      <div className="su-strength-bars">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="su-strength-bar" style={{ background: i < score ? colors[score - 1] : 'rgba(255,255,255,0.08)' }} />
        ))}
      </div>
      <div className="su-strength-label" style={{ color: score > 0 ? colors[score - 1] : 'transparent' }}>
        {score > 0 ? labels[score - 1] : ''}
      </div>
      <div className="su-strength-checks">
        {checks.map(c => (
          <div key={c.label} className={`su-check ${c.pass ? 'pass' : ''}`}>
            <Check size={10} />
            {c.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      // Register user via API route
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        return;
      }

      // Auto sign in after registration
      const signInResult = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError('Account created! Please sign in.');
        router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push(callbackUrl), 1500);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: string) => {
    setOauthLoading(provider);
    await signIn(provider, { callbackUrl });
  };

  if (success) {
    return (
      <div className="su-root">
        <style>{CSS}</style>
        <Bg />
        <motion.div className="su-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="su-success-icon">
            <Check size={32} color="#34d399" />
          </div>
          <h2>Account created!</h2>
          <p>Welcome to OmniTrust Africa. Redirecting you now…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="su-root">
      <style>{CSS}</style>
      <Bg />

      <div className="su-layout">
        {/* Left panel */}
        <motion.div className="su-left" initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link href="/" className="su-logo">
            <div className="su-logo-icon"><Shield size={18} color="#22d3ee" /></div>
            <span>OmniTrust<em>Africa</em></span>
          </Link>
          <div className="su-left-body">
            <h2 className="su-left-title">Join 5,000+ security professionals.</h2>
            <p className="su-left-sub">Get access to world-class cybersecurity courses, certifications, and a community of practitioners across Africa.</p>
            <div className="su-perks">
              {['Access all courses & labs', 'Earn industry certificates', 'Join the Africa security community', 'Track your learning progress'].map(p => (
                <div key={p} className="su-perk">
                  <div className="su-perk-icon"><Check size={12} color="#22d3ee" /></div>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="su-left-footer">
            Already have an account?{' '}
            <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Sign in</Link>
          </div>
        </motion.div>

        {/* Right panel — form */}
        <motion.div className="su-right" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="su-card">
            <div className="su-card-header">
              <h1 className="su-card-title">Create your account</h1>
              <p className="su-card-sub">Free forever. No credit card required.</p>
            </div>

            {/* OAuth buttons */}
            <div className="su-oauth">
              <button className="su-oauth-btn" onClick={() => handleOAuth('google')} disabled={!!oauthLoading || loading}>
                {oauthLoading === 'google' ? <div className="su-spinner" /> : <Chrome size={16} />}
                Continue with Google
              </button>
              <button className="su-oauth-btn" onClick={() => handleOAuth('linkedin')} disabled={!!oauthLoading || loading}>
                {oauthLoading === 'linkedin' ? <div className="su-spinner" /> : <Linkedin size={16} />}
                Continue with LinkedIn
              </button>
            </div>

            <div className="su-divider"><span>or sign up with email</span></div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div className="su-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <AlertCircle size={14} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="su-form">
              <Field
                icon={<User size={14} />}
                label="Full Name"
                type="text"
                value={form.name}
                onChange={v => set('name', v)}
                placeholder="Jane Mwangi"
                required
              />
              <Field
                icon={<Mail size={14} />}
                label="Email Address"
                type="email"
                value={form.email}
                onChange={v => set('email', v)}
                placeholder="jane@company.com"
                required
              />
              <div>
                <Field
                  icon={<Lock size={14} />}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={v => set('password', v)}
                  placeholder="Min. 8 characters"
                  required
                  suffix={
                    <button type="button" className="su-eye" onClick={() => setShowPassword(v => !v)}>
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  }
                />
                <PasswordStrength password={form.password} />
              </div>
              <Field
                icon={<Lock size={14} />}
                label="Confirm Password"
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={v => set('confirmPassword', v)}
                placeholder="Repeat your password"
                required
                suffix={
                  <button type="button" className="su-eye" onClick={() => setShowConfirm(v => !v)}>
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                }
                error={form.confirmPassword && form.password !== form.confirmPassword ? 'Passwords do not match' : ''}
              />

              <p className="su-terms">
                By creating an account you agree to our{' '}
                <Link href="/terms">Terms of Service</Link> and{' '}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>

              <button type="submit" className="su-submit" disabled={loading || !!oauthLoading}>
                {loading ? <><div className="su-spinner" /> Creating account…</> : <>Create Account <ArrowRight size={15} /></>}
              </button>
            </form>

            <p className="su-signin-link">
              Already have an account? <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Bg() {
  return (
    <div className="su-bg" aria-hidden>
      <div className="su-blob b1" /><div className="su-blob b2" />
      <div className="su-grid" />
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder, required, icon, suffix, error }: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; icon?: React.ReactNode;
  suffix?: React.ReactNode; error?: string;
}) {
  return (
    <div className="su-field">
      <label className="su-label">{label}</label>
      <div className={`su-input-wrap ${error ? 'has-error' : ''}`}>
        {icon && <span className="su-input-icon">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`su-input ${icon ? 'has-icon' : ''} ${suffix ? 'has-suffix' : ''}`}
        />
        {suffix && <span className="su-input-suffix">{suffix}</span>}
      </div>
      {error && <p className="su-field-error"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.su-root{min-height:100vh;background:#04060f;color:#e2e8f0;font-family:'DM Sans',sans-serif;position:relative;overflow:hidden;}

.su-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
.su-blob{position:absolute;border-radius:50%;filter:blur(120px);}
.b1{width:600px;height:600px;top:-150px;left:-150px;background:radial-gradient(circle,rgba(34,211,238,0.07),transparent 65%);}
.b2{width:500px;height:500px;bottom:-100px;right:-100px;background:radial-gradient(circle,rgba(52,211,153,0.06),transparent 65%);}
.su-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,0.02) 1px,transparent 0);background-size:40px 40px;}

.su-layout{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;min-height:100vh;}
@media(max-width:900px){.su-layout{grid-template-columns:1fr;}}

/* Left */
.su-left{display:flex;flex-direction:column;padding:48px;background:rgba(34,211,238,0.02);border-right:1px solid rgba(255,255,255,0.05);}
@media(max-width:900px){.su-left{display:none;}}
.su-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:#e2e8f0;font-size:15px;font-weight:600;margin-bottom:auto;}
.su-logo em{color:#22d3ee;font-style:normal;}
.su-logo-icon{width:34px;height:34px;border-radius:9px;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center;}
.su-left-body{flex:1;display:flex;flex-direction:column;justify-content:center;padding:48px 0;}
.su-left-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(24px,2.5vw,36px);font-weight:800;color:#f8fafc;line-height:1.2;letter-spacing:-0.02em;margin-bottom:16px;}
.su-left-sub{font-size:15px;color:rgba(255,255,255,0.35);line-height:1.7;margin-bottom:36px;max-width:380px;}
.su-perks{display:flex;flex-direction:column;gap:12px;}
.su-perk{display:flex;align-items:center;gap:12px;font-size:14px;color:rgba(255,255,255,0.5);}
.su-perk-icon{width:22px;height:22px;border-radius:6px;background:rgba(34,211,238,0.1);border:1px solid rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.su-left-footer{font-size:13px;color:rgba(255,255,255,0.25);}
.su-left-footer a{color:rgba(255,255,255,0.5);text-decoration:none;}
.su-left-footer a:hover{color:#22d3ee;}

/* Right */
.su-right{display:flex;align-items:center;justify-content:center;padding:48px 24px;overflow-y:auto;}
.su-card{width:100%;max-width:420px;}
.su-card-header{margin-bottom:28px;}
.su-card-title{font-family:'Bricolage Grotesque',sans-serif;font-size:28px;font-weight:800;color:#f8fafc;letter-spacing:-0.02em;margin-bottom:6px;}
.su-card-sub{font-size:14px;color:rgba(255,255,255,0.3);}

/* OAuth */
.su-oauth{display:flex;flex-direction:column;gap:10px;margin-bottom:20px;}
.su-oauth-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.6);font-size:14px;font-weight:500;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;}
.su-oauth-btn:hover:not(:disabled){border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.85);background:rgba(255,255,255,0.05);}
.su-oauth-btn:disabled{opacity:0.5;cursor:not-allowed;}

.su-divider{display:flex;align-items:center;gap:12px;margin:20px 0;color:rgba(255,255,255,0.15);font-size:12px;}
.su-divider::before,.su-divider::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.07);}

/* Error */
.su-error{display:flex;align-items:center;gap:8px;padding:12px 14px;border-radius:10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#fca5a5;font-size:13px;margin-bottom:16px;overflow:hidden;}

/* Form */
.su-form{display:flex;flex-direction:column;gap:16px;}
.su-field{display:flex;flex-direction:column;gap:6px;}
.su-label{font-size:11px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.35);}
.su-input-wrap{position:relative;display:flex;align-items:center;}
.su-input-wrap.has-error .su-input{border-color:rgba(239,68,68,0.4);}
.su-input-icon{position:absolute;left:14px;color:rgba(255,255,255,0.2);pointer-events:none;display:flex;}
.su-input-suffix{position:absolute;right:12px;display:flex;}
.su-input{width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:#f1f5f9;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.2s,background 0.2s;}
.su-input.has-icon{padding-left:40px;}
.su-input.has-suffix{padding-right:40px;}
.su-input:focus{border-color:rgba(34,211,238,0.4);background:rgba(34,211,238,0.02);}
.su-input::placeholder{color:rgba(255,255,255,0.12);}
.su-eye{background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.25);display:flex;padding:2px;transition:color 0.2s;}
.su-eye:hover{color:rgba(255,255,255,0.6);}
.su-field-error{display:flex;align-items:center;gap:5px;font-size:11px;color:#f87171;}

/* Password strength */
.su-strength{margin-top:8px;display:flex;flex-direction:column;gap:6px;overflow:hidden;}
.su-strength-bars{display:flex;gap:4px;}
.su-strength-bar{flex:1;height:3px;border-radius:2px;transition:background 0.3s;}
.su-strength-label{font-size:11px;font-weight:600;text-align:right;}
.su-strength-checks{display:flex;flex-wrap:wrap;gap:6px;}
.su-check{display:inline-flex;align-items:center;gap:4px;font-size:11px;color:rgba(255,255,255,0.2);transition:color 0.2s;}
.su-check.pass{color:rgba(52,211,153,0.8);}

.su-terms{font-size:12px;color:rgba(255,255,255,0.2);line-height:1.6;}
.su-terms a{color:rgba(255,255,255,0.4);text-decoration:underline;}
.su-terms a:hover{color:#22d3ee;}

.su-submit{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;border-radius:12px;border:none;background:linear-gradient(135deg,#22d3ee,#3b82f6);color:#fff;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 24px rgba(34,211,238,0.2);margin-top:4px;}
.su-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 32px rgba(34,211,238,0.35);}
.su-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none;}

.su-signin-link{text-align:center;font-size:13px;color:rgba(255,255,255,0.25);margin-top:20px;}
.su-signin-link a{color:rgba(255,255,255,0.5);text-decoration:none;font-weight:600;}
.su-signin-link a:hover{color:#22d3ee;}

/* Spinner */
@keyframes spin{to{transform:rotate(360deg);}}
.su-spinner{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,0.2);border-top-color:#fff;animation:spin 0.7s linear infinite;flex-shrink:0;}

/* Success */
.su-success{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px;padding:24px;}
.su-success-icon{width:72px;height:72px;border-radius:50%;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.3);display:flex;align-items:center;justify-content:center;}
.su-success h2{font-family:'Bricolage Grotesque',sans-serif;font-size:32px;font-weight:800;color:#f1f5f9;}
.su-success p{font-size:15px;color:rgba(255,255,255,0.35);}

/* Autofill */
input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 30px #0a0f1a inset !important;-webkit-text-fill-color:#f1f5f9 !important;caret-color:#f1f5f9;}
`;