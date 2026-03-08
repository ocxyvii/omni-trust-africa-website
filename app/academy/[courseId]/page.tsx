'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { SidebarNav } from '@/components/navigation/sidebar-nav';
import { notFound } from 'next/navigation';
import {
  BookOpen, Clock, Award, CheckCircle2, ArrowLeft,
  ArrowRight, Lock, Play, Star, Users, Shield,
  ChevronDown, ChevronUp, Zap, X, Wallet,
  ExternalLink, AlertCircle, CheckCircle, Loader2,
  RefreshCw
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

// ─── Course Data ──────────────────────────────────────────────────────────────
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

// ─── Chainlink ETH/USD Price Feed (Sepolia testnet) ───────────────────────────
// Contract: 0x694AA1769357215DE4FAC081bf1f309aDC325306
// We fetch the price via public RPC — no wallet needed to read price
const SEPOLIA_RPC = 'https://ethereum-sepolia-rpc.publicnode.com';
const PRICE_FEED_ADDRESS = '0x694AA1769357215DE4FAC081bf1f309aDC325306';
// latestRoundData() selector
const LATEST_ROUND_DATA_SELECTOR = '0xfeaf968c';

async function fetchETHUSDPrice(): Promise<number> {
  try {
    const response = await fetch(SEPOLIA_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [{ to: PRICE_FEED_ADDRESS, data: LATEST_ROUND_DATA_SELECTOR }, 'latest'],
        id: 1,
      }),
    });
    const data = await response.json();
    if (data.result && data.result !== '0x') {
      // Result: roundId(uint80), answer(int256), startedAt(uint256), updatedAt(uint256), answeredInRound(uint80)
      // Each field is 32 bytes. answer is at bytes 32-64
      const hex = data.result.slice(2); // remove 0x
      const answerHex = hex.slice(64, 128); // second 32-byte slot
      const answer = parseInt(answerHex, 16);
      return answer / 1e8; // Chainlink uses 8 decimals
    }
  } catch (e) {
    console.error('Price feed error:', e);
  }
  // Fallback price if RPC fails
  return 3200;
}

// ─── Payment Modal ────────────────────────────────────────────────────────────
type PayStep = 'connect' | 'review' | 'paying' | 'success' | 'error';

function PaymentModal({
  course,
  courseId,
  onClose,
  onSuccess,
}: {
  course: any;
  courseId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<PayStep>('connect');
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState('');

  const ethAmount = ethPrice ? (course.price / ethPrice) : null;

  const loadPrice = useCallback(async () => {
    setLoadingPrice(true);
    const price = await fetchETHUSDPrice();
    setEthPrice(price);
    setLoadingPrice(false);
  }, []);

  useEffect(() => { loadPrice(); }, [loadPrice]);

  // Check if MetaMask is available
  const hasMetaMask = typeof window !== 'undefined' && !!(window as any).ethereum;

  const connectWallet = async () => {
    if (!hasMetaMask) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setStep('review');
    } catch (e: any) {
      setError(e.message || 'Failed to connect wallet');
    }
  };

  const switchToSepolia = async () => {
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Sepolia
      });
    } catch (e: any) {
      // Chain not added, add it
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
      // Switch to Sepolia
      await switchToSepolia();

      // Convert ETH amount to wei (hex)
      const weiAmount = BigInt(Math.floor(ethAmount * 1e18));
      const weiHex = '0x' + weiAmount.toString(16);

      // Send transaction to your wallet address (replace with your contract address later)
      const RECIPIENT = '0x742d35Cc6634C0532925a3b8D4C9C6c00BCB2a4F'; // TODO: replace with your contract

      const txHash = await (window as any).ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: RECIPIENT,
          value: weiHex,
          gas: '0x5208', // 21000
        }],
      });

      setTxHash(txHash);

      // Notify backend to record enrollment
      await fetch('/api/enrol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, txHash, walletAddress }),
      });

      setStep('success');
      setTimeout(() => onSuccess(), 3000);

    } catch (e: any) {
      setError(e.message || 'Transaction failed. Please try again.');
      setStep('error');
    }
  };

  return (
    <div className="pm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        className="pm-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
      >
        {/* Header */}
        <div className="pm-header">
          <div className="pm-header-left">
            <div className="pm-chainlink-badge">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                <path d="M16 3L6 8.5V19.5L16 25L26 19.5V8.5L16 3Z" fill="#375BD2" />
                <path d="M16 7L9 11V19L16 23L23 19V11L16 7Z" fill="#fff" fillOpacity=".15" />
                <text x="16" y="20" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CL</text>
              </svg>
              Chainlink Payment
            </div>
            <h2 className="pm-title">Unlock {course.title}</h2>
          </div>
          <button className="pm-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Price summary */}
        <div className="pm-price-row">
          <div className="pm-price-usd">
            <span className="pm-price-label">Course Price</span>
            <span className="pm-price-val">${course.price} USD</span>
          </div>
          <div className="pm-price-divider" />
          <div className="pm-price-eth">
            <span className="pm-price-label">
              ETH Amount
              <span className="pm-powered">via Chainlink Price Feed</span>
            </span>
            {loadingPrice ? (
              <span className="pm-price-loading"><Loader2 size={14} className="pm-spin" /> Fetching live price…</span>
            ) : (
              <span className="pm-price-val pm-eth-val">
                {ethAmount?.toFixed(6)} ETH
                <span className="pm-eth-rate">1 ETH = ${ethPrice?.toLocaleString()}</span>
              </span>
            )}
          </div>
          <button className="pm-refresh" onClick={loadPrice} title="Refresh price">
            <RefreshCw size={13} />
          </button>
        </div>

        {/* Steps */}
        <div className="pm-steps">
          {(['connect', 'review', 'paying', 'success'] as PayStep[]).map((s, i) => (
            <div key={s} className={`pm-step ${step === s ? 'active' : ''} ${
              ['connect','review','paying','success'].indexOf(step) > i ? 'done' : ''
            }`}>
              <div className="pm-step-dot">{['connect','review','paying','success'].indexOf(step) > i ? '✓' : i + 1}</div>
              <span>{['Connect', 'Review', 'Pay', 'Done'][i]}</span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">

          {step === 'connect' && (
            <motion.div key="connect" className="pm-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="pm-connect-icon">
                <Wallet size={28} color="#22d3ee" />
              </div>
              <p className="pm-connect-desc">Connect your Ethereum wallet to pay with ETH on Sepolia testnet. The amount is calculated live using Chainlink's ETH/USD Price Feed.</p>

              <div className="pm-info-cards">
                <div className="pm-info-card">
                  <Shield size={14} color="#34d399" />
                  <span>Secured by Chainlink oracle network</span>
                </div>
                <div className="pm-info-card">
                  <Zap size={14} color="#f59e0b" />
                  <span>Instant enrollment on payment confirmation</span>
                </div>
              </div>

              <button className="pm-connect-btn" onClick={connectWallet}>
                <Wallet size={16} />
                {hasMetaMask ? 'Connect MetaMask' : 'Install MetaMask'}
              </button>

              <p className="pm-testnet-note">
                ⚠️ Currently on <strong>Sepolia testnet</strong>. Get free test ETH at{' '}
                <a href="https://sepoliafaucet.com" target="_blank" rel="noopener noreferrer">
                  sepoliafaucet.com <ExternalLink size={10} />
                </a>
              </p>
            </motion.div>
          )}

          {step === 'review' && (
            <motion.div key="review" className="pm-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="pm-wallet-connected">
                <div className="pm-wallet-dot" />
                <span className="pm-wallet-addr">
                  {walletAddress?.slice(0, 6)}…{walletAddress?.slice(-4)}
                </span>
                <span className="pm-wallet-label">Connected · Sepolia</span>
              </div>

              <div className="pm-review-card">
                <div className="pm-review-row">
                  <span>Course</span>
                  <strong>{course.title}</strong>
                </div>
                <div className="pm-review-row">
                  <span>Access</span>
                  <strong>Lifetime</strong>
                </div>
                <div className="pm-review-row">
                  <span>Certificate</span>
                  <strong>Included ✓</strong>
                </div>
                <div className="pm-review-divider" />
                <div className="pm-review-row pm-review-total">
                  <span>Total (USD)</span>
                  <strong>${course.price}</strong>
                </div>
                <div className="pm-review-row pm-review-total">
                  <span>Total (ETH)</span>
                  <strong>{ethAmount?.toFixed(6)} ETH</strong>
                </div>
              </div>

              <button className="pm-pay-btn" onClick={handlePay} disabled={loadingPrice || !ethAmount}>
                {loadingPrice ? <Loader2 size={16} className="pm-spin" /> : <Zap size={16} />}
                Pay {ethAmount?.toFixed(6)} ETH
              </button>

              <p className="pm-disclaimer">By paying you agree to our Terms of Service. Payments are non-refundable.</p>
            </motion.div>
          )}

          {step === 'paying' && (
            <motion.div key="paying" className="pm-content pm-content-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="pm-paying-anim">
                <div className="pm-paying-ring" />
                <Wallet size={24} color="#22d3ee" />
              </div>
              <h3 className="pm-paying-title">Confirm in MetaMask</h3>
              <p className="pm-paying-desc">Check your MetaMask popup and confirm the transaction. Do not close this window.</p>
              <div className="pm-paying-details">
                <span>Sending {ethAmount?.toFixed(6)} ETH</span>
                <span>≈ ${course.price} USD</span>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div key="success" className="pm-content pm-content-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="pm-success-icon">
                <CheckCircle size={36} color="#34d399" />
              </div>
              <h3 className="pm-success-title">Payment Confirmed!</h3>
              <p className="pm-success-desc">You're now enrolled in {course.title}. Redirecting to your course…</p>
              {txHash && (
                <a
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pm-tx-link"
                >
                  View on Etherscan <ExternalLink size={12} />
                </a>
              )}
            </motion.div>
          )}

          {step === 'error' && (
            <motion.div key="error" className="pm-content pm-content-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="pm-error-icon">
                <AlertCircle size={36} color="#f87171" />
              </div>
              <h3 className="pm-error-title">Transaction Failed</h3>
              <p className="pm-error-desc">{error || 'Something went wrong. Please try again.'}</p>
              <button className="pm-retry-btn" onClick={() => setStep('review')}>
                Try Again
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = courses[params.courseId];
  const { data: session } = useSession();
  const user = session?.user ?? null;
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [showPayment, setShowPayment] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  if (!course) notFound();

  const handleEnrolClick = () => {
    if (!user) return; // button won't show for non-logged in users
    setShowPayment(true);
  };

  const EnrolButton = ({ large = false }: { large?: boolean }) => {
    if (enrolled) {
      return (
        <Link
          href={`/academy/${params.courseId}/learn`}
          className={`cd-enrol-btn cd-enrolled-btn ${large ? 'large' : ''}`}
        >
          <Play size={15} /> Start Learning
        </Link>
      );
    }
    if (user) {
      return (
        <button
          className={`cd-enrol-btn cd-pay-btn ${large ? 'large' : ''}`}
          onClick={handleEnrolClick}
          style={{ background: `linear-gradient(135deg, ${course.accent}, ${course.accent}bb)` }}
        >
          <Zap size={15} /> Pay Now — ${course.price}
        </button>
      );
    }
    return (
      <div className="cd-auth-required">
        <Link href={`/login?callbackUrl=/academy/${params.courseId}`} className="cd-enrol-btn">
          <Lock size={14} /> Sign in to Enrol
        </Link>
        <p className="cd-no-account">
          No account? <Link href={`/signup?callbackUrl=/academy/${params.courseId}`}>Create one free</Link>
        </p>
      </div>
    );
  };

  return (
    <div className="cd-root">
      <style>{CSS}</style>
      <SidebarNav />

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <PaymentModal
            course={course}
            courseId={params.courseId}
            onClose={() => setShowPayment(false)}
            onSuccess={() => {
              setShowPayment(false);
              setEnrolled(true);
            }}
          />
        )}
      </AnimatePresence>

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
                  <div className="cd-meta-item"><Star size={14} fill="#f59e0b" color="#f59e0b" /><strong>{course.rating}</strong><span>({course.reviews} reviews)</span></div>
                  <div className="cd-meta-sep" />
                  <div className="cd-meta-item"><Users size={14} /><span>{course.students.toLocaleString()} students</span></div>
                  <div className="cd-meta-sep" />
                  <div className="cd-meta-item"><Clock size={14} /><span>{course.duration}</span></div>
                  <div className="cd-meta-sep" />
                  <div className="cd-meta-item"><BookOpen size={14} /><span>{course.lessons} lessons</span></div>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5} className="cd-instructor-row">
                  {course.instructors.map((inst: any) => (
                    <div key={inst.name} className="cd-instructor-mini">
                      <div className="cd-inst-avatar" style={{ background: course.accent + '20', borderColor: course.accent + '40', color: course.accent }}>{inst.initials}</div>
                      <div>
                        <p className="cd-inst-name">{inst.name}</p>
                        <p className="cd-inst-role">{inst.role}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6} className="cd-tags">
                  {course.tags.map((t: string) => <span key={t} className="cd-tag">{t}</span>)}
                </motion.div>
              </div>

              {/* Sticky Enrol Card */}
              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="cd-enrol-card">
                <div className="cd-enrol-price">
                  <span className="cd-price-val">${course.price}</span>
                  <span className="cd-price-note">one-time · lifetime access</span>
                </div>

                <EnrolButton />

                <Link href="#preview" className="cd-preview-btn">
                  <Play size={13} /> Preview Course
                </Link>

                {/* Chainlink badge */}
                <div className="cd-chainlink-note">
                  <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                    <path d="M16 3L6 8.5V19.5L16 25L26 19.5V8.5L16 3Z" fill="#375BD2"/>
                  </svg>
                  Powered by Chainlink Price Feeds
                </div>

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
                          <div className="cd-module-num" style={{ background: course.accent + '15', color: course.accent, borderColor: course.accent + '30' }}>{mod.module}</div>
                          <div>
                            <p className="cd-module-title">{mod.title}</p>
                            <p className="cd-module-meta">{mod.lessons} lessons · {mod.duration}</p>
                          </div>
                        </div>
                        {openModule === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openModule === i && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="cd-module-body">
                          {Array.from({ length: mod.lessons }).map((_, j) => (
                            <div key={j} className="cd-lesson-row">
                              <Play size={12} />
                              <span>Lesson {j + 1} — {mod.title} Part {j + 1}</span>
                              {!enrolled && !user && j > 0 && <Lock size={11} className="cd-lesson-lock" />}
                              {!enrolled && user && j > 0 && <Lock size={11} className="cd-lesson-lock" />}
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
                    <li key={i}><div className="cd-req-dot" />{r}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
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
              <EnrolButton large />
            </motion.div>
          </div>
        </section>

        <footer className="cd-footer">
          <div className="cd-container"><p>&copy; 2025 OmniTrust Africa. All rights reserved.</p></div>
        </footer>
      </main>
    </div>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.cd-root{min-height:100vh;background:#050810;color:#e2e8f0;font-family:'DM Sans',sans-serif;}
.cd-main{margin-left:0;}
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
.cd-enrol-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;border-radius:12px;background:linear-gradient(135deg,#22d3ee,#3b82f6);color:#fff;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;text-decoration:none;transition:all 0.2s;box-shadow:0 4px 20px rgba(34,211,238,0.2);border:none;cursor:pointer;}
.cd-enrol-btn:hover{transform:translateY(-1px);box-shadow:0 6px 28px rgba(34,211,238,0.35);}
.cd-enrol-btn.large{padding:16px 40px;font-size:16px;width:auto;}
.cd-pay-btn{border:none;cursor:pointer;}
.cd-enrolled-btn{background:linear-gradient(135deg,#34d399,#10b981) !important;}
.cd-auth-required{display:flex;flex-direction:column;gap:8px;}
.cd-no-account{font-size:12px;color:rgba(255,255,255,0.25);text-align:center;}
.cd-no-account a{color:rgba(255,255,255,0.5);text-decoration:underline;}
.cd-no-account a:hover{color:#22d3ee;}
.cd-preview-btn{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;padding:11px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:13px;font-weight:500;font-family:'DM Sans',sans-serif;text-decoration:none;transition:all 0.2s;}
.cd-preview-btn:hover{border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.8);}
.cd-chainlink-note{display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(255,255,255,0.25);justify-content:center;}
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

/* CTA */
.cd-cta-section{padding:0 0 80px;}
.cd-cta-card{position:relative;padding:56px;border-radius:24px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);text-align:center;overflow:hidden;display:flex;flex-direction:column;align-items:center;gap:16px;}
.cd-cta-glow{position:absolute;inset:0;pointer-events:none;}
.cd-cta-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(24px,3vw,36px);font-weight:800;color:#f1f5f9;letter-spacing:-0.02em;}
.cd-cta-sub{font-size:15px;color:rgba(255,255,255,0.35);max-width:400px;line-height:1.6;}
.cd-cta-auth{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;}
.cd-create-acc{display:inline-flex;align-items:center;gap:6px;font-size:14px;color:rgba(255,255,255,0.4);text-decoration:none;transition:color 0.2s;}
.cd-create-acc:hover{color:#22d3ee;}

/* Footer */
.cd-footer{padding:28px 24px;border-top:1px solid rgba(255,255,255,0.05);}
.cd-footer .cd-container{text-align:center;font-size:13px;color:rgba(255,255,255,0.2);}

/* ── Payment Modal ── */
.pm-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;}
.pm-modal{width:100%;max-width:480px;background:#0d1117;border:1px solid rgba(255,255,255,0.1);border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.6);}

.pm-header{display:flex;align-items:flex-start;justify-content:space-between;padding:24px 24px 0;}
.pm-header-left{display:flex;flex-direction:column;gap:8px;}
.pm-chainlink-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:100px;background:rgba(55,91,210,0.15);border:1px solid rgba(55,91,210,0.3);color:#7b9ef0;font-size:11px;font-weight:600;}
.pm-title{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:700;color:#f1f5f9;line-height:1.3;max-width:320px;}
.pm-close{background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.3);padding:4px;transition:color 0.2s;flex-shrink:0;}
.pm-close:hover{color:rgba(255,255,255,0.7);}

.pm-price-row{display:flex;align-items:center;gap:0;margin:20px 24px 0;padding:16px;background:rgba(255,255,255,0.03);border-radius:14px;border:1px solid rgba(255,255,255,0.06);position:relative;}
.pm-price-usd,.pm-price-eth{display:flex;flex-direction:column;gap:4px;flex:1;}
.pm-price-divider{width:1px;height:40px;background:rgba(255,255,255,0.08);margin:0 16px;}
.pm-price-label{font-size:11px;color:rgba(255,255,255,0.3);font-weight:500;display:flex;flex-direction:column;gap:2px;}
.pm-powered{font-size:10px;color:#375BD2;}
.pm-price-val{font-size:18px;font-weight:700;color:#f1f5f9;font-family:'Bricolage Grotesque',sans-serif;}
.pm-eth-val{display:flex;flex-direction:column;gap:2px;}
.pm-eth-rate{font-size:10px;color:rgba(255,255,255,0.25);font-weight:400;font-family:'DM Sans',sans-serif;}
.pm-price-loading{display:flex;align-items:center;gap:6px;font-size:13px;color:rgba(255,255,255,0.3);}
.pm-refresh{position:absolute;top:10px;right:10px;background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.2);padding:4px;transition:color 0.2s;}
.pm-refresh:hover{color:rgba(255,255,255,0.6);}

.pm-steps{display:flex;align-items:center;gap:0;margin:20px 24px 0;}
.pm-step{display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(255,255,255,0.25);flex:1;}
.pm-step.active{color:#22d3ee;}
.pm-step.done{color:#34d399;}
.pm-step:not(:last-child)::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.08);margin:0 6px;}
.pm-step-dot{width:20px;height:20px;border-radius:50%;border:1px solid currentColor;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;flex-shrink:0;}
.pm-step.active .pm-step-dot{background:rgba(34,211,238,0.15);}
.pm-step.done .pm-step-dot{background:rgba(52,211,153,0.15);}

.pm-content{padding:24px;}
.pm-content-center{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;}

/* Connect step */
.pm-connect-icon{width:56px;height:56px;border-radius:16px;background:rgba(34,211,238,0.08);border:1px solid rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;}
.pm-connect-desc{font-size:13.5px;color:rgba(255,255,255,0.45);line-height:1.6;text-align:center;margin-bottom:16px;}
.pm-info-cards{display:flex;flex-direction:column;gap:8px;margin-bottom:20px;}
.pm-info-card{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);font-size:12.5px;color:rgba(255,255,255,0.4);}
.pm-connect-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;border-radius:12px;border:none;background:linear-gradient(135deg,#22d3ee,#3b82f6);color:#fff;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 20px rgba(34,211,238,0.2);margin-bottom:16px;}
.pm-connect-btn:hover{transform:translateY(-1px);}
.pm-testnet-note{font-size:11.5px;color:rgba(255,255,255,0.25);text-align:center;line-height:1.6;}
.pm-testnet-note a{color:#375BD2;text-decoration:none;display:inline-flex;align-items:center;gap:2px;}
.pm-testnet-note a:hover{color:#7b9ef0;}

/* Review step */
.pm-wallet-connected{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;background:rgba(52,211,153,0.06);border:1px solid rgba(52,211,153,0.15);margin-bottom:16px;}
.pm-wallet-dot{width:8px;height:8px;border-radius:50%;background:#34d399;flex-shrink:0;}
.pm-wallet-addr{font-size:13px;font-weight:600;color:#f1f5f9;font-family:monospace;}
.pm-wallet-label{font-size:11px;color:rgba(255,255,255,0.3);margin-left:auto;}
.pm-review-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:10px;margin-bottom:16px;}
.pm-review-row{display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,0.4);}
.pm-review-row strong{color:#f1f5f9;}
.pm-review-divider{height:1px;background:rgba(255,255,255,0.07);}
.pm-review-total{font-size:14px;}
.pm-review-total strong{color:#22d3ee;}
.pm-pay-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;border-radius:12px;border:none;background:linear-gradient(135deg,#375BD2,#22d3ee);color:#fff;font-size:15px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 20px rgba(55,91,210,0.3);margin-bottom:12px;}
.pm-pay-btn:hover:not(:disabled){transform:translateY(-1px);}
.pm-pay-btn:disabled{opacity:0.5;cursor:not-allowed;}
.pm-disclaimer{font-size:11px;color:rgba(255,255,255,0.2);text-align:center;line-height:1.5;}

/* Paying step */
.pm-paying-anim{position:relative;width:64px;height:64px;display:flex;align-items:center;justify-content:center;margin-bottom:8px;}
.pm-paying-ring{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(34,211,238,0.2);border-top-color:#22d3ee;animation:pm-spin 1s linear infinite;}
.pm-paying-title{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:700;color:#f1f5f9;}
.pm-paying-desc{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.6;max-width:280px;}
.pm-paying-details{display:flex;gap:16px;font-size:12px;color:rgba(255,255,255,0.3);padding:10px 16px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid rgba(255,255,255,0.06);}

/* Success step */
.pm-success-icon{width:72px;height:72px;border-radius:50%;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.3);display:flex;align-items:center;justify-content:center;margin-bottom:8px;}
.pm-success-title{font-family:'Bricolage Grotesque',sans-serif;font-size:24px;font-weight:800;color:#f1f5f9;}
.pm-success-desc{font-size:14px;color:rgba(255,255,255,0.4);line-height:1.6;max-width:280px;}
.pm-tx-link{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:#375BD2;text-decoration:none;padding:8px 14px;border-radius:8px;border:1px solid rgba(55,91,210,0.3);background:rgba(55,91,210,0.08);transition:all 0.2s;margin-top:4px;}
.pm-tx-link:hover{background:rgba(55,91,210,0.15);}

/* Error step */
.pm-error-icon{width:72px;height:72px;border-radius:50%;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);display:flex;align-items:center;justify-content:center;margin-bottom:8px;}
.pm-error-title{font-family:'Bricolage Grotesque',sans-serif;font-size:22px;font-weight:700;color:#f1f5f9;}
.pm-error-desc{font-size:13px;color:rgba(255,255,255,0.4);max-width:280px;line-height:1.6;}
.pm-retry-btn{padding:11px 28px;border-radius:10px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.6);font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;margin-top:8px;}
.pm-retry-btn:hover{background:rgba(255,255,255,0.1);color:#f1f5f9;}

@keyframes pm-spin{to{transform:rotate(360deg);}}
.pm-spin{animation:pm-spin 0.7s linear infinite;}

@media(max-width:640px){
  .cd-cta-card{padding:36px 24px;}
  .cd-hero{padding:40px 0 60px;}
  .pm-modal{border-radius:16px;}
  .pm-price-row{flex-direction:column;gap:12px;}
  .pm-price-divider{width:100%;height:1px;margin:0;}
}
`;