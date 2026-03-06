'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Shield, Home, Wrench, GraduationCap, Info, BookOpen, Phone, ArrowRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/services', label: 'Services', icon: Wrench },
  { href: '/academy', label: 'Academy', icon: GraduationCap },
  { href: '/about', label: 'About', icon: Info },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop: hover-reveal sidebar ── */}
      <div className="sidebar-hover-zone">
        {/* Thin tab on left edge so users know something is there */}
        <div className="sidebar-tab">
          <Menu size={14} color="rgba(255,255,255,0.4)" />
        </div>

        <aside className="sidebar-panel">
          <div className="sidebar-top">
            <Link href="/" className="sidebar-logo">
              <div className="sidebar-logo-icon">
                <Shield size={16} color="#22d3ee" />
              </div>
              <span>OmniTrust<em>Africa</em></span>
            </Link>

            <nav className="sidebar-nav">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href} className={cn('sidebar-link', active && 'active')}>
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="sidebar-bottom">
            <Link href="/login" className="sidebar-signin">Sign In</Link>
            <Link href="/start" className="sidebar-cta">
              Get Started <ArrowRight size={13} />
            </Link>
          </div>
        </aside>
      </div>

      {/* ── Mobile: hamburger + drawer ── */}
      <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
        <Menu size={18} />
      </button>

      {mobileOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
          <aside className="mobile-panel">
            <div className="sidebar-top">
              <Link href="/" className="sidebar-logo" onClick={() => setMobileOpen(false)}>
                <div className="sidebar-logo-icon">
                  <Shield size={16} color="#22d3ee" />
                </div>
                <span>OmniTrust<em>Africa</em></span>
              </Link>
              <nav className="sidebar-nav">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn('sidebar-link', active && 'active')}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon size={15} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="sidebar-bottom">
              <Link href="/login" className="sidebar-signin" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link href="/start" className="sidebar-cta" onClick={() => setMobileOpen(false)}>
                Get Started <ArrowRight size={13} />
              </Link>
            </div>
          </aside>
        </>
      )}

      <style>{`
        /* Hover zone — covers the left edge, invisible until hover */
        .sidebar-hover-zone {
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          width: 20px; /* just the tab width by default */
          z-index: 50;
          display: none;
        }
        @media (min-width: 768px) {
          .sidebar-hover-zone { display: block; }
        }

        /* Expand the hover zone to cover the full panel when hovered */
        .sidebar-hover-zone:hover {
          width: 256px;
        }

        /* Small visible tab on the left edge */
        .sidebar-tab {
          position: absolute;
          top: 50%; left: 0;
          transform: translateY(-50%);
          width: 20px; height: 64px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-left: none;
          border-radius: 0 10px 10px 0;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.2s;
          cursor: pointer;
        }
        .sidebar-hover-zone:hover .sidebar-tab {
          opacity: 0;
          pointer-events: none;
        }

        /* The panel slides in on hover */
        .sidebar-panel {
          position: absolute;
          top: 0; left: 0;
          height: 100vh; width: 256px;
          background: #07090f;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column; justify-content: space-between;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s;
        }
        .sidebar-hover-zone:hover .sidebar-panel {
          transform: translateX(0);
          box-shadow: 8px 0 48px rgba(0,0,0,0.6);
        }

        /* Shared styles */
        .sidebar-top { padding: 28px 20px 20px; }

        .sidebar-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; margin-bottom: 32px;
          font-size: 15px; font-weight: 700;
          color: #f1f5f9; letter-spacing: -0.01em;
        }
        .sidebar-logo em { color: #22d3ee; font-style: normal; }
        .sidebar-logo-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(34,211,238,0.08);
          border: 1px solid rgba(34,211,238,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .sidebar-nav { display: flex; flex-direction: column; gap: 4px; }
        .sidebar-link {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 10px;
          text-decoration: none; font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.45);
          border: 1px solid transparent;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .sidebar-link:hover {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.8);
        }
        .sidebar-link.active {
          background: rgba(34,211,238,0.08);
          border-color: rgba(34,211,238,0.15);
          color: #22d3ee;
        }

        .sidebar-bottom {
          padding: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column; gap: 10px;
        }
        .sidebar-signin {
          display: flex; align-items: center; justify-content: center;
          padding: 10px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          font-size: 13px; font-weight: 600;
          text-decoration: none; transition: all 0.2s;
          white-space: nowrap;
        }
        .sidebar-signin:hover {
          border-color: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.8);
        }
        .sidebar-cta {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 10px; border-radius: 10px;
          background: linear-gradient(135deg, #22d3ee, #3b82f6);
          color: #fff; font-size: 13px; font-weight: 700;
          text-decoration: none;
          box-shadow: 0 2px 12px rgba(34,211,238,0.2);
          transition: box-shadow 0.2s;
          white-space: nowrap;
        }
        .sidebar-cta:hover { box-shadow: 0 4px 20px rgba(34,211,238,0.4); }

        /* Mobile hamburger button */
        .mobile-menu-btn {
          position: fixed; top: 16px; left: 16px; z-index: 50;
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #e2e8f0; cursor: pointer; transition: all 0.2s;
        }
        .mobile-menu-btn:hover { background: rgba(255,255,255,0.09); }
        @media (min-width: 768px) { .mobile-menu-btn { display: none; } }

        /* Mobile overlay + drawer */
        .mobile-overlay {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
        }
        .mobile-panel {
          position: fixed; top: 0; left: 0;
          height: 100vh; width: 256px; z-index: 50;
          background: #07090f;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column; justify-content: space-between;
          box-shadow: 8px 0 40px rgba(0,0,0,0.5);
        }
      `}</style>
    </>
  );
}