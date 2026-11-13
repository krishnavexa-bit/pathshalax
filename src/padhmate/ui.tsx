// @ts-nocheck -- ported as-is from the original PADHMATE JavaScript source.
import React, { useEffect, useRef, useState } from 'react';
import Icon from './icons';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Counts up (or down) to a number. Keeps its previous value so changes animate smoothly.
export function Count({ value, suffix = '', duration = 900 }) {
  const target = Number(value) || 0;
  const [shown, setShown] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    if (reducedMotion()) {
      setShown(target);
      from.current = target;
      return undefined;
    }
    const start = performance.now();
    const origin = from.current;
    let frame = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(origin + (target - origin) * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
      else from.current = target;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return <>{shown}{suffix}</>;
}

export function LogoMark({ size = 38 }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#0c3a2f" />
      <path className="logo-curve" d="M8.5 10.5Q20 36 31.5 10.5" fill="none" stroke="#f6f8ee" strokeWidth="3.2" strokeLinecap="round" />
      <circle className="logo-dot" cx="20" cy="23.2" r="3" fill="#ffb703" />
    </svg>
  );
}

export function GoogleG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.4z" />
      <path fill="#34A853" d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.8H1.8v3A11.5 11.5 0 0 0 12 23.5z" />
      <path fill="#FBBC05" d="M5.6 14.1a6.9 6.9 0 0 1 0-4.3v-3H1.8a11.5 11.5 0 0 0 0 10.3z" />
      <path fill="#EA4335" d="M12 5.4c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 6.8l3.8 3c.9-2.8 3.4-4.4 6.4-4.4z" />
    </svg>
  );
}

// Graph-paper floor, a grid that lights up around the cursor, and a soft glow.
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="paper-grid" />
      <div className="paper-lit" />
      <div className="paper-glow" />
    </div>
  );
}

// Learning points chip that bumps whenever the number changes.
export function XpChip({ xp }) {
  const [bump, setBump] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 650);
    return () => window.clearTimeout(t);
  }, [xp]);

  return (
    <div className={`xp-chip ${bump ? 'bump' : ''}`} title="Learning points">
      <Icon name="bolt" size={16} />
      <b><Count value={xp} duration={700} /></b>
      <span>XP</span>
    </div>
  );
}

// Floating bottom dock. Icons swell as the cursor approaches, and a gold pill slides to the active page.
export function Dock({ items, page, onNavigate, dueCount }) {
  const refs = useRef([]);
  const dockRef = useRef(null);
  const activeIndex = Math.max(0, items.findIndex((item) => item.name === page));

  function onMove(e) {
    if (e.pointerType === 'touch') return;
    refs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const scale = 1 + 0.52 * Math.exp(-(d * d) / (2 * 54 * 54));
      el.style.setProperty('--s', scale.toFixed(3));
      if (el.classList.contains('active')) dockRef.current?.style.setProperty('--as', scale.toFixed(3));
    });
  }
  function onLeave() {
    refs.current.forEach((el) => el && el.style.setProperty('--s', '1'));
    dockRef.current?.style.setProperty('--as', '1');
  }

  return (
    <nav ref={dockRef} className="dock" aria-label="Main navigation" onPointerMove={onMove} onPointerLeave={onLeave}>
      <span className="dock-pill" style={{ '--i': activeIndex }} aria-hidden="true" />
      {items.map((item, index) => {
        const active = item.name === page;
        return (
          <button
            key={item.name}
            ref={(el) => { refs.current[index] = el; }}
            className={`dock-item ${active ? 'active' : ''}`}
            onClick={() => onNavigate(item.name)}
            aria-current={active ? 'page' : undefined}
            aria-label={item.name}
          >
            <span className="dock-icon"><Icon name={item.icon} size={24} /></span>
            <span className="dock-tip">{item.name}</span>
            {item.name === 'Revision' && dueCount > 0 && <span className="dock-badge">{dueCount}</span>}
          </button>
        );
      })}
    </nav>
  );
}
