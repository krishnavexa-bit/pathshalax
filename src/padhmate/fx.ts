// @ts-nocheck -- ported as-is from the original PathshalaX JavaScript source.
// PathshalaX motion engine: cursor light, magnetic buttons, tilt cards, click ripples, confetti.
// Everything here is cosmetic and switches itself off for prefers-reduced-motion.

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- confetti (canvas) ---------- */
let canvas = null;
let ctx = null;
let particles = [];
let raf = 0;

const COLORS = ['#ffb703', '#ff6b4a', '#14a07a', '#8fd0ff', '#f6f8ee', '#12231e'];
const GLYPHS = ['x²', '√', 'π', '±', 'Δ', '=', '∑', 'a', 'b', 'c'];

function sizeCanvas() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function ensureCanvas() {
  if (canvas) return;
  canvas = document.createElement('canvas');
  canvas.className = 'fx-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas);
}

function frame() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles = particles.filter((p) => p.life > 0 && p.y < window.innerHeight + 60);
  for (const p of particles) {
    p.vy += p.gravity;
    p.vx *= p.drag;
    p.vy *= p.drag;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= p.decay;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 2.2));
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    if (p.glyph) {
      ctx.font = `700 ${p.size * 2.1}px Fraunces, Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.glyph, 0, 0);
    } else if (p.round) {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    }
    ctx.restore();
  }
  if (particles.length) {
    raf = requestAnimationFrame(frame);
  } else {
    raf = 0;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

function spawn(x, y, { count, power, spread, angle, glyphRatio, gravity = 0.26, decay = 0.011 }) {
  for (let i = 0; i < count; i += 1) {
    const dir = angle + (Math.random() - 0.5) * spread;
    const speed = power * (0.35 + Math.random() * 0.85);
    const isGlyph = Math.random() < glyphRatio;
    particles.push({
      x, y,
      vx: Math.cos(dir) * speed,
      vy: Math.sin(dir) * speed,
      gravity,
      drag: 0.985,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.35,
      size: isGlyph ? 9 + Math.random() * 7 : 6 + Math.random() * 7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      glyph: isGlyph ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
      round: Math.random() < 0.35,
      life: 1,
      decay: decay * (0.8 + Math.random() * 0.5)
    });
  }
  if (!raf) raf = requestAnimationFrame(frame);
}

export function burst(x, y, opts = {}) {
  if (prefersReduced()) return;
  ensureCanvas();
  spawn(x, y, {
    count: opts.count ?? 40,
    power: opts.power ?? 10,
    spread: opts.spread ?? Math.PI * 2,
    angle: opts.angle ?? -Math.PI / 2,
    glyphRatio: opts.glyphRatio ?? 0.3
  });
}

// Burst from the centre of the element an event came from (falls back to pointer position).
export function burstFrom(event, opts = {}) {
  const el = event?.currentTarget;
  if (el && el.getBoundingClientRect) {
    const r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, opts);
  } else if (event && typeof event.clientX === 'number') {
    burst(event.clientX, event.clientY, opts);
  }
}

// A shower of symbols from the top of the screen.
export function rain(total = 90) {
  if (prefersReduced()) return;
  ensureCanvas();
  for (let i = 0; i < 6; i += 1) {
    window.setTimeout(() => {
      spawn(Math.random() * window.innerWidth, -20, {
        count: Math.round(total / 6),
        power: 3.2,
        spread: 0.9,
        angle: Math.PI / 2,
        glyphRatio: 0.45,
        gravity: 0.12,
        decay: 0.006
      });
    }, i * 120);
  }
}

/* ---------- global pointer effects ---------- */
export function initFx() {
  const root = document.documentElement;
  const reduced = prefersReduced();
  const fine = window.matchMedia('(pointer: fine)').matches;

  let tx = window.innerWidth / 2;
  let ty = window.innerHeight / 3;
  let cx = tx;
  let cy = ty;
  let ringScale = 1;
  let ringTarget = 1;
  let hovering = false;
  let down = false;
  let moved = false;
  let loopId = 0;
  let magnet = null;
  let tilted = null;

  let ring = null;
  if (fine && !reduced) {
    ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);
  }

  function paint() {
    cx += (tx - cx) * 0.16;
    cy += (ty - cy) * 0.16;
    ringScale += (ringTarget - ringScale) * 0.22;
    root.style.setProperty('--mx', `${cx.toFixed(1)}px`);
    root.style.setProperty('--my', `${cy.toFixed(1)}px`);
    if (ring) ring.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0) scale(${ringScale.toFixed(3)})`;
    const settled = Math.abs(tx - cx) < 0.2 && Math.abs(ty - cy) < 0.2 && Math.abs(ringTarget - ringScale) < 0.01;
    loopId = settled ? 0 : requestAnimationFrame(paint);
  }
  function kick() {
    if (!loopId) loopId = requestAnimationFrame(paint);
  }

  function resetMagnet(el) {
    el.style.setProperty('--tx', '0px');
    el.style.setProperty('--ty', '0px');
  }
  function resetTilt(el) {
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.classList.remove('is-tilting');
  }

  function updateMagnet(e, target) {
    const el = target ? target.closest('.magnetic') : null;
    if (magnet && magnet !== el) { resetMagnet(magnet); magnet = null; }
    if (!el || el.disabled) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
    el.style.setProperty('--tx', `${dx.toFixed(1)}px`);
    el.style.setProperty('--ty', `${dy.toFixed(1)}px`);
    magnet = el;
  }

  function updateTilt(e, target) {
    const el = target ? target.closest('.tilt') : null;
    if (tilted && tilted !== el) { resetTilt(tilted); tilted = null; }
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${((0.5 - py) * 9).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((px - 0.5) * 11).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
    el.classList.add('is-tilting');
    tilted = el;
  }

  function onMove(e) {
    tx = e.clientX;
    ty = e.clientY;
    if (!moved) {
      moved = true;
      cx = tx;
      cy = ty;
      root.classList.add('has-pointer');
      if (ring) ring.classList.add('is-visible');
    }
    const target = e.target instanceof Element ? e.target : null;
    hovering = Boolean(target && target.closest('button, a, input, [role="button"], .tilt') && !target.closest('.dock'));
    ringTarget = down ? 0.65 : hovering ? 1.8 : 1;
    ring?.classList.toggle('is-hot', hovering);
    if (!reduced && e.pointerType !== 'touch') {
      updateMagnet(e, target);
      updateTilt(e, target);
    }
    kick();
  }

  function addRipple(e) {
    const target = e.target instanceof Element ? e.target.closest('.btn, .rip') : null;
    if (!target || target.disabled) return;
    const r = target.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2.2;
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    target.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove(), { once: true });
    if (target.matches('.btn-primary, .spark')) {
      burst(e.clientX, e.clientY, { count: 9, power: 5, glyphRatio: 0 });
    }
  }

  function onDown(e) {
    down = true;
    ringTarget = 0.65;
    ring?.classList.add('is-down');
    if (!reduced) addRipple(e);
    kick();
  }
  function onUp() {
    down = false;
    ringTarget = hovering ? 1.8 : 1;
    ring?.classList.remove('is-down');
    kick();
  }
  function onLeaveWindow() {
    if (magnet) { resetMagnet(magnet); magnet = null; }
    if (tilted) { resetTilt(tilted); tilted = null; }
    ring?.classList.remove('is-visible');
    moved = false;
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });
  root.addEventListener('pointerleave', onLeaveWindow);
  kick();

  return () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointerup', onUp);
    root.removeEventListener('pointerleave', onLeaveWindow);
    if (loopId) cancelAnimationFrame(loopId);
    ring?.remove();
    root.classList.remove('has-pointer');
  };
}
