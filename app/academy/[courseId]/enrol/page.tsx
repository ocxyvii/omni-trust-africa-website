'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, ArrowLeft, Wallet, Zap, CheckCircle,
  AlertCircle, Loader2, ExternalLink, RefreshCw,
  Lock, BookOpen, Clock, Award, Users, Check
} from 'lucide-react';

// ─── Course Data ──────────────────────────────────────────────────────────────
const courses: Record<string, any> = {
  'web-security-101': {
    title: 'Web Security Fundamentals',
    price: 199,
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 12,
    accent: '#34d399',
    description: 'Master the core principles of web application security.',
  },
  'network-security': {
    title: 'Network Security Essentials',
    price: 299,
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: 18,
    accent: '#22d3ee',
    description: 'Deep-dive into firewalls, IDS/IPS, VPNs, and network forensics.',
  },
  'penetration-testing-101': {
    title: 'Introduction to Penetration Testing',
    price: 399,
    level: 'Intermediate',
    duration: '8 weeks',
    lessons: 24,
    accent: '#f59e0b',
    description: 'Begin your ethical hacking journey.',
  },
  'incident-response': {
    title: 'Incident Response Mastery',
    price: 499,
    level: 'Advanced',
    duration: '6 weeks',
    lessons: 20,
    accent: '#a78bfa',
    description: 'Lead your organization through a breach.',
  },
};

// ─── Chainlink Price Feed ─────────────────────────────────────────────────────
const SEPOLIA_RPC = 'https://ethereum-sepolia-rpc.publicnode.com';
const PRICE_FEED_ADDRESS = '0x694AA1769357215DE4FAC081bf1f309aDC325306';

async function fetchETHUSDPrice(): Promise<number> {
  try {
    const response = await fetch(SEPOLIA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [{ to: PRICE_FEED_ADDRESS, data: '0xfeaf968c' }, 'latest'],
        id: 1,
      }),
    });
    const data = await response.json();
    if (data.result && data.result !== '0x') {
      const hex = data.result.slice(2);
      const answerHex = hex.slice(64, 128);
      const answer = parseInt(answerHex, 16);
      return answer / 1e8;
    }
  } catch (e) {
    console.error('Chainlink price feed error:', e);
  }
  return 3200; // fallback
}

type PayStep = 'idle' | 'connecting' | 'review' | 'paying' | 'success' | 'error';

export default function EnrolPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [courseId, setCourseId] = useState<string>('');
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [step, setStep] = useState<PayStep>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    params.then(p => setCourseId(p.courseId));
  }, [params]);

  const course = courses[courseId];
  const ethAmount = ethPrice && course ? (course.price / ethPrice) : null;
  const hasMetaMask = typeof window !== 'undefined' && !!(window as any).ethereum;

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated' && courseId) {
      router.push(`/login?callbackUrl=/academy/${courseId}/enrol`);
    }
  }, [status, courseId, router]);

  const loadPrice = useCallback(async () => {
    setLoadingPrice(true);
    const price = await fetchETHUSDPrice();
    setEthPrice(price);
    setLoadingPrice(false);
  }, []);

  useEffect(() => { loadPrice(); }, [loadPrice]);

  if (!course) {
    return (
      <div style={{ minHeight: '100vh', background: '#050810', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        Course not found. <Link href="/academy" style={{ color: '#22d3ee', marginLeft: 8 }}>Back to Academy</Link>
      </div>
    );
  }

  if (status === 'loading' || !courseId) {
    return <div className="ep-loading"><Loader2 size={24} className="ep-spin" /></div>;
  }

  const connectWallet = async () => {
    if (!hasMetaMask) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    setStep('connecting');
    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setStep('review');
    } catch (e: any) {
      setError(e.message || 'Failed to connect wallet');
      setStep('error');
    }
  };

  const switchToSepolia = async () => {
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      });
    } catch (e: any) {
      if (e.code === 4902) {
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0xaa36a7',
            chainName: 'Sepolia Testnet',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: ['https://rpc.sepolia.org'],
            blockExplorerUrls: ['https://sepolia.etherscan.io'],
          }],
        });
      }
    }
  };

  const handlePay = async () => {
    if (!walletAddress || !ethAmount) return;
    setStep('paying');
    setError('');

    try {
      await switchToSepolia();

      const weiAmount = BigInt(Math.floor(ethAmount * 1e18));
      const weiHex = '0x' + weiAmount.toString(16);

      // TODO: Replace with your deployed contract address
      const RECIPIENT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x742d35Cc6634C0532925a3b8D4C9C6c00BCB2a4F';

      const hash = await (window as any).ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: RECIPIENT,
          value: weiHex,
          gas: '0x5208',
        }],
      });

      setTxHash(hash);

      // Record enrollment in database
      await fetch('/api/enrol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: courseId,
          txHash: hash,
          walletAddress,
        }),
      });

      setStep('success');
    } catch (e: any) {
      setError(e.message || 'Transaction failed. Please try again.');
      setStep('error');
    }
  };

  return (
    <div className="ep-root">
      <style>{CSS}</style>

      {/* Background */}
      <div className="ep-bg" aria-hidden>
        <div className="ep-blob b1" style={{ background: `radial-gradient(circle, ${course.accent}10, transparent 65%)` }} />
        <div className="ep-blob b2" />
        <div className="ep-grid" />
      </div>

      <div className="ep-container">

        {/* Back link */}
        <Link href={`/academy/${courseId}`} className="ep-back">
          <ArrowLeft size={14} /> Back to course
        </Link>

        <div className="ep-layout">

          {/* ── Left: Course summary ── */}
          <motion.div
            className="ep-course-card"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="ep-course-accent" style={{ background: course.accent }} />
            <div className="ep-course-body">
              <div className="ep-course-badge" style={{ color: course.accent, background: course.accent + '15', borderColor: course.accent + '30' }}>
                {course.level}
              </div>
              <h2 className="ep-course-title">{course.title}</h2>
              <p className="ep-course-desc">{course.description}</p>

              <div className="ep-course-meta">
                {[
                  { icon: Clock, label: course.duration },
                  { icon: BookOpen, label: `${course.lessons} lessons` },
                  { icon: Award, label: 'Certificate included' },
                  { icon: Users, label: 'Lifetime access' },
                ].map(item => (
                  <div key={item.label} className="ep-course-meta-item">
                    <item.icon size={14} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="ep-includes">
                <p className="ep-includes-title">What's included:</p>
                {[
                  'Full course access forever',
                  'Downloadable resources & labs',
                  'Community access',
                  'Completion certificate',
                  'Future course updates',
                ].map(item => (
                  <div key={item} className="ep-include-item">
                    <div className="ep-include-check" style={{ background: course.accent + '20', borderColor: course.accent + '30' }}>
                      <Check size={10} color={course.accent} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ep-course-price-row">
              <span className="ep-course-price">${course.price}</span>
              <span className="ep-course-price-note">one-time payment</span>
            </div>
          </motion.div>

          {/* ── Right: Payment ── */}
          <motion.div
            className="ep-payment-card"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Header */}
            <div className="ep-payment-header">
              <div className="ep-chainlink-badge">
                <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                  <path d="M16 3L6 8.5V19.5L16 25L26 19.5V8.5L16 3Z" fill="#375BD2" />
                </svg>
                Secured by Chainlink
              </div>
              <h1 className="ep-payment-title">Complete Payment</h1>
              <p className="ep-payment-sub">Pay with ETH · Price calculated live via Chainlink Price Feed</p>
            </div>

            {/* Live price display */}
            <div className="ep-price-display">
              <div className="ep-price-col">
                <span className="ep-price-label">Course Price</span>
                <span className="ep-price-usd">${course.price} <small>USD</small></span>
              </div>
              <div className="ep-price-equals">=</div>
              <div className="ep-price-col">
                <span className="ep-price-label">
                  ETH Amount
                  <button className="ep-refresh" onClick={loadPrice} title="Refresh"><RefreshCw size={11} /></button>
                </span>
                {loadingPrice ? (
                  <span className="ep-price-loading"><Loader2 size={14} className="ep-spin" /> Loading…</span>
                ) : (
                  <span className="ep-price-eth">
                    {ethAmount?.toFixed(6)} <small>ETH</small>
                    <span className="ep-price-rate">1 ETH = ${ethPrice?.toLocaleString()}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="ep-chainlink-note">
              <svg width="12" height="12" viewBox="0 0 32 32" fill="none"><path d="M16 3L6 8.5V19.5L16 25L26 19.5V8.5L16 3Z" fill="#375BD2"/></svg>
              Live price from Chainlink ETH/USD Data Feed on Sepolia
            </div>

            {/* Steps */}
            <div className="ep-steps">
              {['Connect Wallet', 'Review', 'Pay'].map((label, i) => {
                const stepIndex = { idle: 0, connecting: 0, review: 1, paying: 2, success: 3, error: 0 }[step];
                return (
                  <div key={label} className={`ep-step ${stepIndex === i ? 'active' : ''} ${stepIndex > i ? 'done' : ''}`}>
                    <div className="ep-step-num">{stepIndex > i ? '✓' : i + 1}</div>
                    <span>{label}</span>
                    {i < 2 && <div className="ep-step-line" />}
                  </div>
                );
              })}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">

              {(step === 'idle' || step === 'connecting') && (
                <motion.div key="idle" className="ep-step-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="ep-wallet-icon">
                    {step === 'connecting' ? <Loader2 size={28} color="#22d3ee" className="ep-spin" /> : <Wallet size={28} color="#22d3ee" />}
                  </div>
                  <p className="ep-wallet-desc">
                    Connect your MetaMask wallet to pay {ethAmount ? `${ethAmount.toFixed(6)} ETH` : `$${course.price}`} for this course.
                  </p>
                  <div className="ep-security-badges">
                    <div className="ep-security-badge"><Shield size={12} color="#34d399" /> Chainlink verified price</div>
                    <div className="ep-security-badge"><Zap size={12} color="#f59e0b" /> Instant enrollment</div>
                    <div className="ep-security-badge"><Lock size={12} color="#a78bfa" /> Secure transaction</div>
                  </div>
                  <button
                    className="ep-connect-btn"
                    onClick={connectWallet}
                    disabled={step === 'connecting'}
                  >
                    {step === 'connecting'
                      ? <><Loader2 size={16} className="ep-spin" /> Connecting…</>
                      : <><Wallet size={16} /> {hasMetaMask ? 'Connect MetaMask' : 'Install MetaMask'}</>
                    }
                  </button>
                  <p className="ep-testnet-note">
                    ⚠️ Using <strong>Sepolia testnet</strong>. Get free test ETH at{' '}
                    <a href="https://faucet.quicknode.com/ethereum/sepolia" target="_blank" rel="noopener noreferrer">
                      QuickNode Faucet <ExternalLink size={10} />
                    </a>
                  </p>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div key="review" className="ep-step-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="ep-wallet-connected">
                    <div className="ep-connected-dot" />
                    <div>
                      <p className="ep-connected-addr">{walletAddress?.slice(0, 6)}…{walletAddress?.slice(-4)}</p>
                      <p className="ep-connected-label">MetaMask · Sepolia Testnet</p>
                    </div>
                  </div>

                  <div className="ep-order-summary">
                    <p className="ep-order-title">Order Summary</p>
                    <div className="ep-order-row">
                      <span>{course.title}</span>
                      <strong>${course.price}</strong>
                    </div>
                    <div className="ep-order-row">
                      <span>Lifetime access</span>
                      <strong style={{ color: '#34d399' }}>✓ Included</strong>
                    </div>
                    <div className="ep-order-row">
                      <span>Certificate</span>
                      <strong style={{ color: '#34d399' }}>✓ Included</strong>
                    </div>
                    <div className="ep-order-divider" />
                    <div className="ep-order-row ep-order-total">
                      <span>Total (USD)</span>
                      <strong>${course.price}</strong>
                    </div>
                    <div className="ep-order-row ep-order-total">
                      <span>Total (ETH)</span>
                      <strong style={{ color: '#22d3ee' }}>{ethAmount?.toFixed(6)} ETH</strong>
                    </div>
                  </div>

                  <button className="ep-pay-btn" onClick={handlePay} disabled={loadingPrice || !ethAmount}>
                    <Zap size={16} />
                    Pay {ethAmount?.toFixed(6)} ETH
                  </button>
                  <p className="ep-pay-disclaimer">By paying you agree to our Terms of Service. All sales are final.</p>
                </motion.div>
              )}

              {step === 'paying' && (
                <motion.div key="paying" className="ep-step-content ep-centered" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="ep-paying-anim">
                    <div className="ep-paying-ring" />
                    <Wallet size={24} color="#22d3ee" />
                  </div>
                  <h3 className="ep-paying-title">Confirm in MetaMask</h3>
                  <p className="ep-paying-desc">Check your MetaMask popup and confirm the transaction. Do not close this window.</p>
                  <div className="ep-paying-amount">
                    <span>{ethAmount?.toFixed(6)} ETH</span>
                    <span>≈ ${course.price} USD</span>
                  </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div key="success" className="ep-step-content ep-centered" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <div className="ep-success-icon">
                    <CheckCircle size={40} color="#34d399" />
                  </div>
                  <h3 className="ep-success-title">You're enrolled! 🎉</h3>
                  <p className="ep-success-desc">Payment confirmed. You now have full access to <strong>{course.title}</strong>.</p>
                  {txHash && (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ep-tx-link"
                    >
                      View transaction on Etherscan <ExternalLink size={12} />
                    </a>
                  )}
                  <Link href={`/academy/${courseId}`} className="ep-start-btn">
                    Start Learning <Zap size={15} />
                  </Link>
                </motion.div>
              )}

              {step === 'error' && (
                <motion.div key="error" className="ep-step-content ep-centered" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="ep-error-icon">
                    <AlertCircle size={40} color="#f87171" />
                  </div>
                  <h3 className="ep-error-title">Transaction Failed</h3>
                  <p className="ep-error-desc">{error || 'Something went wrong. Please try again.'}</p>
                  <button className="ep-retry-btn" onClick={() => { setStep('review'); setError(''); }}>
                    Try Again
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.ep-root{min-height:100vh;background:#050810;color:#e2e8f0;font-family:'DM Sans',sans-serif;position:relative;}
.ep-loading{min-height:100vh;background:#050810;display:flex;align-items:center;justify-content:center;}

.ep-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
.ep-blob{position:absolute;border-radius:50%;filter:blur(120px);}
.b1{width:700px;height:700px;top:-200px;left:-200px;}
.b2{width:500px;height:500px;bottom:-100px;right:-100px;background:radial-gradient(circle,rgba(55,91,210,0.06),transparent 65%);}
.ep-grid{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,0.02) 1px,transparent 0);background-size:44px 44px;}

.ep-container{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:40px 24px 80px;}

.ep-back{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.35);text-decoration:none;margin-bottom:40px;transition:color 0.2s;}
.ep-back:hover{color:rgba(255,255,255,0.7);}

.ep-layout{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:start;}
@media(max-width:900px){.ep-layout{grid-template-columns:1fr;}}

/* Course card */
.ep-course-card{border-radius:20px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);overflow:hidden;position:sticky;top:24px;}
@media(max-width:900px){.ep-course-card{position:static;}}
.ep-course-accent{height:4px;}
.ep-course-body{padding:28px;display:flex;flex-direction:column;gap:16px;}
.ep-course-badge{display:inline-flex;align-self:flex-start;padding:4px 12px;border-radius:100px;font-size:11px;font-weight:600;border:1px solid;}
.ep-course-title{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:800;color:#f8fafc;line-height:1.2;letter-spacing:-0.01em;}
.ep-course-desc{font-size:13.5px;color:rgba(255,255,255,0.35);line-height:1.6;}
.ep-course-meta{display:flex;flex-direction:column;gap:8px;}
.ep-course-meta-item{display:flex;align-items:center;gap:8px;font-size:13px;color:rgba(255,255,255,0.4);}
.ep-includes{display:flex;flex-direction:column;gap:8px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);}
.ep-includes-title{font-size:12px;font-weight:600;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;}
.ep-include-item{display:flex;align-items:center;gap:10px;font-size:13px;color:rgba(255,255,255,0.5);}
.ep-include-check{width:20px;height:20px;border-radius:6px;border:1px solid;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ep-course-price-row{display:flex;align-items:baseline;gap:10px;padding:20px 28px;border-top:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.01);}
.ep-course-price{font-family:'Bricolage Grotesque',sans-serif;font-size:32px;font-weight:800;color:#f1f5f9;}
.ep-course-price-note{font-size:12px;color:rgba(255,255,255,0.25);}

/* Payment card */
.ep-payment-card{border-radius:20px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);overflow:hidden;}
.ep-payment-header{padding:28px 28px 0;display:flex;flex-direction:column;gap:8px;}
.ep-chainlink-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:100px;background:rgba(55,91,210,0.12);border:1px solid rgba(55,91,210,0.25);color:#7b9ef0;font-size:11px;font-weight:600;align-self:flex-start;}
.ep-payment-title{font-family:'Bricolage Grotesque',sans-serif;font-size:24px;font-weight:800;color:#f8fafc;letter-spacing:-0.01em;}
.ep-payment-sub{font-size:13px;color:rgba(255,255,255,0.3);line-height:1.5;}

/* Price display */
.ep-price-display{display:flex;align-items:center;gap:16px;margin:20px 28px 0;padding:16px;background:rgba(255,255,255,0.03);border-radius:14px;border:1px solid rgba(255,255,255,0.07);}
.ep-price-col{display:flex;flex-direction:column;gap:4px;flex:1;}
.ep-price-equals{font-size:20px;color:rgba(255,255,255,0.2);font-weight:300;}
.ep-price-label{font-size:11px;color:rgba(255,255,255,0.3);display:flex;align-items:center;gap:6px;}
.ep-price-usd{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:700;color:#f1f5f9;}
.ep-price-usd small{font-size:13px;color:rgba(255,255,255,0.3);font-weight:400;}
.ep-price-eth{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:700;color:#22d3ee;display:flex;flex-direction:column;gap:2px;}
.ep-price-eth small{font-size:13px;color:rgba(255,255,255,0.3);font-weight:400;}
.ep-price-rate{font-size:11px;color:rgba(255,255,255,0.25);font-weight:400;font-family:'DM Sans',sans-serif;}
.ep-price-loading{display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.3);}
.ep-refresh{background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.2);padding:2px;transition:color 0.2s;display:inline-flex;}
.ep-refresh:hover{color:rgba(255,255,255,0.6);}

.ep-chainlink-note{display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(55,91,210,0.7);margin:8px 28px 0;padding:8px 12px;background:rgba(55,91,210,0.06);border-radius:8px;border:1px solid rgba(55,91,210,0.15);}

/* Steps */
.ep-steps{display:flex;align-items:center;margin:20px 28px 0;gap:0;}
.ep-step{display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.25);flex-shrink:0;}
.ep-step.active{color:#22d3ee;}
.ep-step.done{color:#34d399;}
.ep-step-num{width:22px;height:22px;border-radius:50%;border:1px solid currentColor;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;flex-shrink:0;}
.ep-step.active .ep-step-num{background:rgba(34,211,238,0.1);}
.ep-step.done .ep-step-num{background:rgba(52,211,153,0.1);}
.ep-step-line{flex:1;height:1px;background:rgba(255,255,255,0.08);margin:0 8px;min-width:20px;}

/* Step content */
.ep-step-content{padding:24px 28px 28px;display:flex;flex-direction:column;gap:16px;}
.ep-centered{align-items:center;text-align:center;}

/* Idle/Connect */
.ep-wallet-icon{width:60px;height:60px;border-radius:16px;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center;margin:0 auto;}
.ep-wallet-desc{font-size:14px;color:rgba(255,255,255,0.4);line-height:1.6;text-align:center;}
.ep-security-badges{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}
.ep-security-badge{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:100px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);font-size:12px;color:rgba(255,255,255,0.4);}
.ep-connect-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:15px;border-radius:12px;border:none;background:linear-gradient(135deg,#22d3ee,#3b82f6);color:#fff;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 24px rgba(34,211,238,0.2);}
.ep-connect-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 32px rgba(34,211,238,0.35);}
.ep-connect-btn:disabled{opacity:0.6;cursor:not-allowed;}
.ep-testnet-note{font-size:12px;color:rgba(255,255,255,0.2);text-align:center;line-height:1.6;}
.ep-testnet-note a{color:#375BD2;text-decoration:none;display:inline-flex;align-items:center;gap:2px;}
.ep-testnet-note a:hover{color:#7b9ef0;}

/* Review */
.ep-wallet-connected{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;background:rgba(52,211,153,0.06);border:1px solid rgba(52,211,153,0.15);}
.ep-connected-dot{width:10px;height:10px;border-radius:50%;background:#34d399;flex-shrink:0;box-shadow:0 0 8px rgba(52,211,153,0.5);}
.ep-connected-addr{font-size:14px;font-weight:600;color:#f1f5f9;font-family:monospace;}
.ep-connected-label{font-size:11px;color:rgba(255,255,255,0.3);}
.ep-order-summary{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px;}
.ep-order-title{font-size:11px;font-weight:600;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.07em;}
.ep-order-row{display:flex;justify-content:space-between;font-size:13.5px;color:rgba(255,255,255,0.45);}
.ep-order-row strong{color:#f1f5f9;}
.ep-order-divider{height:1px;background:rgba(255,255,255,0.07);}
.ep-order-total{font-size:15px;}
.ep-order-total strong{font-size:15px;}
.ep-pay-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:15px;border-radius:12px;border:none;background:linear-gradient(135deg,#375BD2,#22d3ee);color:#fff;font-size:16px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 24px rgba(55,91,210,0.3);}
.ep-pay-btn:hover:not(:disabled){transform:translateY(-1px);}
.ep-pay-btn:disabled{opacity:0.5;cursor:not-allowed;}
.ep-pay-disclaimer{font-size:11px;color:rgba(255,255,255,0.2);text-align:center;}

/* Paying */
.ep-paying-anim{position:relative;width:64px;height:64px;display:flex;align-items:center;justify-content:center;}
.ep-paying-ring{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(34,211,238,0.2);border-top-color:#22d3ee;animation:ep-spin 1s linear infinite;}
.ep-paying-title{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:700;color:#f1f5f9;}
.ep-paying-desc{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.6;max-width:280px;}
.ep-paying-amount{display:flex;gap:16px;font-size:13px;color:rgba(255,255,255,0.3);padding:10px 20px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.06);}

/* Success */
.ep-success-icon{width:80px;height:80px;border-radius:50%;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.3);display:flex;align-items:center;justify-content:center;}
.ep-success-title{font-family:'Bricolage Grotesque',sans-serif;font-size:26px;font-weight:800;color:#f1f5f9;}
.ep-success-desc{font-size:14px;color:rgba(255,255,255,0.4);line-height:1.6;max-width:300px;}
.ep-success-desc strong{color:#f1f5f9;}
.ep-tx-link{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:#375BD2;text-decoration:none;padding:8px 16px;border-radius:8px;border:1px solid rgba(55,91,210,0.3);background:rgba(55,91,210,0.08);transition:all 0.2s;}
.ep-tx-link:hover{background:rgba(55,91,210,0.15);}
.ep-start-btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 32px;border-radius:12px;background:linear-gradient(135deg,#34d399,#10b981);color:#fff;font-size:15px;font-weight:700;text-decoration:none;transition:all 0.2s;box-shadow:0 4px 20px rgba(52,211,153,0.2);}
.ep-start-btn:hover{transform:translateY(-1px);}

/* Error */
.ep-error-icon{width:72px;height:72px;border-radius:50%;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);display:flex;align-items:center;justify-content:center;}
.ep-error-title{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:700;color:#f1f5f9;}
.ep-error-desc{font-size:13px;color:rgba(255,255,255,0.4);max-width:280px;line-height:1.6;}
.ep-retry-btn{padding:12px 28px;border-radius:10px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.6);font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;}
.ep-retry-btn:hover{background:rgba(255,255,255,0.1);color:#f1f5f9;}

@keyframes ep-spin{to{transform:rotate(360deg);}}
.ep-spin{animation:ep-spin 0.8s linear infinite;}

@media(max-width:640px){
  .ep-container{padding:24px 16px 60px;}
  .ep-price-display{flex-direction:column;gap:12px;}
  .ep-price-equals{display:none;}
}
`;