'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, EyeOff, Shield, ArrowRight,
  Chrome, Linkedin, Mail, Lock, AlertCircle, CheckCircle
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const registered = searchParams.get('registered') === 'true';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError('Invalid email or password. Please try again.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
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

  return (
    <div className="li-layout">
      {/* Left panel */}
      <motion.div className="li-left" initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <Link href="/" className="li-logo">
          <div className="li-logo-icon"><Shield size={18} color="#22d3ee" /></div>
          <span>OmniTrust<em>Africa</em></span>
        </Link>
        <div className="li-left-body">
          <h2 className="li-left-title">Welcome back to OmniTrust.</h2>
          <p className="li-left-sub">
            Sign in to access your courses, track your progress, and continue your cybersecurity journey.
          </p>
          <div className="li-perks">
            {[
              'Resume where you left off',
              'Access your certificates',
              'View your learning dashboard',
              'Connect with the community',
            ].map(p => (
              <div key={p} className="li-perk">
                <div className="li-perk-dot" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="li-left-footer">
          Don't have an account?{' '}
          <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Create one free</Link>
        </div>
      </motion.div>

      {/* Right panel */}
      <motion.div className="li-right" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <div className="li-card">
          <div className="li-card-header">
            <h1 className="li-card-title">Sign in</h1>
            <p className="li-card-sub">Good to have you back.</p>
          </div>

          {/* Success banner from signup */}
          <AnimatePresence>
            {registered && (
              <motion.div
                className="li-success"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <CheckCircle size={14} />
                Account created successfully! Sign in below.
              </motion.div>
            )}
          </AnimatePresence>

          {/* OAuth */}
          <div className="li-oauth">
            <button className="li-oauth-btn" onClick={() => handleOAuth('google')} disabled={!!oauthLoading || loading}>
              {oauthLoading === 'google' ? <div className="li-spinner" /> : <Chrome size={16} />}
              Continue with Google
            </button>
            <button className="li-oauth-btn" onClick={() => handleOAuth('linkedin')} disabled={!!oauthLoading || loading}>
              {oauthLoading === 'linkedin' ? <div className="li-spinner" /> : <Linkedin size={16} />}
              Continue with LinkedIn
            </button>
          </div>

          <div className="li-divider"><span>or sign in with email</span></div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div className="li-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <AlertCircle size={14} />{error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="li-form">
            <div className="li-field">
              <label className="li-label">Email Address</label>
              <div className="li-input-wrap">
                <span className="li-input-icon"><Mail size={14} /></span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  required
                  className="li-input has-icon"
                />
              </div>
            </div>

            <div className="li-field">
              <div className="li-label-row">
                <label className="li-label">Password</label>
                <Link href="/forgot-password" className="li-forgot">Forgot password?</Link>
              </div>
              <div className="li-input-wrap">
                <span className="li-input-icon"><Lock size={14} /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="li-input has-icon has-suffix"
                />
                <button type="button" className="li-eye" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button type="submit" className="li-submit" disabled={loading || !!oauthLoading}>
              {loading
                ? <><div className="li-spinner" /> Signing in…</>
                : <>Sign In <ArrowRight size={15} /></>
              }
            </button>
          </form>

          <p className="li-signup-link">
            Don't have an account?{' '}
            <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Create one free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Bg() {
  return (
    <div className="li-bg" aria-hidden>
      <div className="li-blob b1" /><div className="li-blob b2" />
      <div className="li-grid" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="li-root">
      <style>{CSS}</style>
      <Bg />
      <Suspense fallback={<div className="li-loading" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.li-root{min-height:100vh;background:#04060f;color:#e2e8f0;font-family:'DM Sans',sans-serif;position:relative;overflow:hidden;}
.li-loading{min-height:100vh;background:#04060f;}

.li-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
.li-blob{position:absolute;border-radius:50%;filter:blur(120px);}
.b1{width:600px;height:600px;top:-150px;right:-150px;background:radial-gradient(circle,rgba(34,211,238,0.07),transparent 65%);}
.b2{width:500px;height:500px;bottom:-100px;left:-100px;background:radial-gradient(circle,rgba(167,139,250,0.06),transparent 65%);}
.li-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,0.02) 1px,transparent 0);background-size:40px 40px;}

.li-layout{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;min-height:100vh;}
@media(max-width:900px){.li-layout{grid-template-columns:1fr;}}

.li-left{display:flex;flex-direction:column;padding:48px;background:rgba(167,139,250,0.02);border-right:1px solid rgba(255,255,255,0.05);}
@media(max-width:900px){.li-left{display:none;}}
.li-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:#e2e8f0;font-size:15px;font-weight:600;margin-bottom:auto;}
.li-logo em{color:#22d3ee;font-style:normal;}
.li-logo-icon{width:34px;height:34px;border-radius:9px;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center;}
.li-left-body{flex:1;display:flex;flex-direction:column;justify-content:center;padding:48px 0;}
.li-left-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(24px,2.5vw,36px);font-weight:800;color:#f8fafc;line-height:1.2;letter-spacing:-0.02em;margin-bottom:16px;}
.li-left-sub{font-size:15px;color:rgba(255,255,255,0.35);line-height:1.7;margin-bottom:36px;max-width:380px;}
.li-perks{display:flex;flex-direction:column;gap:14px;}
.li-perk{display:flex;align-items:center;gap:12px;font-size:14px;color:rgba(255,255,255,0.45);}
.li-perk-dot{width:6px;height:6px;border-radius:50%;background:#22d3ee;flex-shrink:0;}
.li-left-footer{font-size:13px;color:rgba(255,255,255,0.25);}
.li-left-footer a{color:rgba(255,255,255,0.5);text-decoration:none;}
.li-left-footer a:hover{color:#22d3ee;}

.li-right{display:flex;align-items:center;justify-content:center;padding:48px 24px;}
.li-card{width:100%;max-width:400px;}
.li-card-header{margin-bottom:28px;}
.li-card-title{font-family:'Bricolage Grotesque',sans-serif;font-size:32px;font-weight:800;color:#f8fafc;letter-spacing:-0.02em;margin-bottom:6px;}
.li-card-sub{font-size:14px;color:rgba(255,255,255,0.3);}

.li-success{display:flex;align-items:center;gap:8px;padding:12px 14px;border-radius:10px;background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.2);color:#6ee7b7;font-size:13px;margin-bottom:20px;overflow:hidden;}

.li-oauth{display:flex;flex-direction:column;gap:10px;margin-bottom:20px;}
.li-oauth-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.6);font-size:14px;font-weight:500;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;}
.li-oauth-btn:hover:not(:disabled){border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.85);background:rgba(255,255,255,0.05);}
.li-oauth-btn:disabled{opacity:0.5;cursor:not-allowed;}

.li-divider{display:flex;align-items:center;gap:12px;margin:20px 0;color:rgba(255,255,255,0.15);font-size:12px;}
.li-divider::before,.li-divider::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.07);}

.li-error{display:flex;align-items:center;gap:8px;padding:12px 14px;border-radius:10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#fca5a5;font-size:13px;margin-bottom:16px;overflow:hidden;}

.li-form{display:flex;flex-direction:column;gap:16px;}
.li-field{display:flex;flex-direction:column;gap:6px;}
.li-label{font-size:11px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.35);}
.li-label-row{display:flex;align-items:center;justify-content:space-between;}
.li-forgot{font-size:11px;color:rgba(255,255,255,0.3);text-decoration:none;transition:color 0.2s;}
.li-forgot:hover{color:#22d3ee;}

.li-input-wrap{position:relative;display:flex;align-items:center;}
.li-input-icon{position:absolute;left:14px;color:rgba(255,255,255,0.2);pointer-events:none;display:flex;}
.li-eye{position:absolute;right:12px;background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.25);display:flex;padding:2px;transition:color 0.2s;}
.li-eye:hover{color:rgba(255,255,255,0.6);}
.li-input{width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:#f1f5f9;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.2s,background 0.2s;}
.li-input.has-icon{padding-left:40px;}
.li-input.has-suffix{padding-right:40px;}
.li-input:focus{border-color:rgba(34,211,238,0.4);background:rgba(34,211,238,0.02);}
.li-input::placeholder{color:rgba(255,255,255,0.12);}

.li-submit{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;border-radius:12px;border:none;background:linear-gradient(135deg,#22d3ee,#3b82f6);color:#fff;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 24px rgba(34,211,238,0.2);margin-top:4px;}
.li-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 32px rgba(34,211,238,0.35);}
.li-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none;}

.li-signup-link{text-align:center;font-size:13px;color:rgba(255,255,255,0.25);margin-top:20px;}
.li-signup-link a{color:rgba(255,255,255,0.5);text-decoration:none;font-weight:600;}
.li-signup-link a:hover{color:#22d3ee;}

@keyframes spin{to{transform:rotate(360deg);}}
.li-spinner{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,0.2);border-top-color:#fff;animation:spin 0.7s linear infinite;flex-shrink:0;}

input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 30px #0a0f1a inset !important;-webkit-text-fill-color:#f1f5f9 !important;caret-color:#f1f5f9;}
`;