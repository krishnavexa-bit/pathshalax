// @ts-nocheck -- ported as-is from the original PADHMATE JavaScript source.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { burst } from './fx';

// A live y = ax² + bx + c. The cursor steers b (left/right) and c (up/down);
// clicking flips the sign of a. With no input it drifts on its own.
const W = 640;
const H = 440;
const XR = 7;
const YR = 12;
const sx = (x) => W / 2 + (x / XR) * (W / 2);
const sy = (y) => H / 2 - (y / YR) * (H / 2);

function buildPath(a, b, c) {
  let d = '';
  for (let i = 0; i <= 140; i += 1) {
    const x = -XR + (i / 140) * 2 * XR;
    const y = a * x * x + b * x + c;
    d += `${i ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`;
  }
  return d;
}

function term(value, suffix) {
  return ` ${value < 0 ? '−' : '+'} ${Math.abs(value).toFixed(1)}${suffix}`;
}

function equation(a, b, c) {
  const ra = Math.round(a * 10) / 10;
  const rb = Math.round(b * 10) / 10;
  const rc = Math.round(c * 10) / 10;
  const lead = Math.abs(ra) === 1 ? '' : Math.abs(ra).toFixed(1);
  let text = `y = ${ra < 0 ? '−' : ''}${lead}x²`;
  if (Math.abs(rb) >= 0.05) text += term(rb, 'x');
  if (Math.abs(rc) >= 0.05) text += term(rc, '');
  return text;
}

function describe(a, b, c) {
  const ra = Math.round(a * 10) / 10;
  const rb = Math.round(b * 10) / 10;
  const rc = Math.round(c * 10) / 10;
  if (Math.abs(ra) < 0.2) return { kind: 'line', label: 'a is almost 0, so this is a line' };
  const disc = rb * rb - 4 * ra * rc;
  if (Math.abs(disc) < 0.35) return { kind: 'one', label: `Δ = ${disc.toFixed(1)}, one repeated root` };
  if (disc > 0) return { kind: 'two', label: `Δ = ${disc.toFixed(1)}, two real roots` };
  return { kind: 'none', label: `Δ = ${disc.toFixed(1)}, no real roots` };
}

export default function Parabola({ tone = 'dark' }) {
  const curveRef = useRef(null);
  const axisRef = useRef(null);
  const vertexRef = useRef(null);
  const rootARef = useRef(null);
  const rootBRef = useRef(null);
  const eqRef = useRef(null);
  const chipRef = useRef(null);
  const state = useRef({ a: 1, b: -2, c: -3, ta: 1, tb: -2, tc: -3, lastMove: 0 });
  const [drawn, setDrawn] = useState(false);
  const [coarse] = useState(() => window.matchMedia('(pointer: coarse)').matches);

  const grid = useMemo(() => {
    const lines = [];
    for (let x = -XR + 1; x < XR; x += 1) lines.push(<line key={`v${x}`} x1={sx(x)} x2={sx(x)} y1="0" y2={H} />);
    for (let y = -YR + 2; y < YR; y += 2) lines.push(<line key={`h${y}`} x1="0" x2={W} y1={sy(y)} y2={sy(y)} />);
    return lines;
  }, []);

  useEffect(() => {
    const s = state.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let frame = 0;
    let lastEq = '';
    let lastChip = '';

    const onMove = (e) => {
      s.lastMove = performance.now();
      s.tb = (e.clientX / window.innerWidth - 0.5) * 10.4;
      s.tc = 5 - (e.clientY / window.innerHeight) * 13;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const place = (el, x, y, show) => {
      if (!el) return;
      el.setAttribute('transform', `translate(${sx(x).toFixed(1)} ${sy(y).toFixed(1)})`);
      el.style.opacity = show ? '1' : '0';
    };

    const tick = (now) => {
      const idle = now - s.lastMove > 2800;
      if (idle && !reduced) {
        const t = (now - start) / 1000;
        s.tb = 4.2 * Math.sin(t * 0.55);
        s.tc = -2.5 + 3.6 * Math.sin(t * 0.38 + 1.2);
      }
      const k = reduced ? 1 : 0.09;
      s.b += (s.tb - s.b) * k;
      s.c += (s.tc - s.c) * k;
      s.a += (s.ta - s.a) * (reduced ? 1 : 0.1);
      const { a, b, c } = s;

      curveRef.current?.setAttribute('d', buildPath(a, b, c));

      const safeA = Math.abs(a) < 0.08 ? 0.08 * (a < 0 ? -1 : 1) : a;
      const hx = -b / (2 * safeA);
      const hy = a * hx * hx + b * hx + c;
      if (axisRef.current) {
        axisRef.current.setAttribute('x1', sx(hx).toFixed(1));
        axisRef.current.setAttribute('x2', sx(hx).toFixed(1));
        axisRef.current.style.opacity = Math.abs(a) < 0.15 ? '0' : '1';
      }
      place(vertexRef.current, hx, hy, Math.abs(a) >= 0.15 && Math.abs(hy) < YR);

      const disc = b * b - 4 * a * c;
      const hasRoots = Math.abs(a) >= 0.15 && disc >= 0;
      const root = hasRoots ? Math.sqrt(disc) : 0;
      place(rootARef.current, (-b - root) / (2 * safeA), 0, hasRoots);
      place(rootBRef.current, (-b + root) / (2 * safeA), 0, hasRoots);

      const eq = equation(a, b, c);
      if (eq !== lastEq && eqRef.current) { eqRef.current.textContent = eq; lastEq = eq; }
      const info = describe(a, b, c);
      if (info.label !== lastChip && chipRef.current) {
        chipRef.current.textContent = info.label;
        chipRef.current.dataset.kind = info.kind;
        lastChip = info.label;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  function flip(e) {
    state.current.ta = state.current.ta > 0 ? -1 : 1;
    burst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, { count: 16, power: 7, glyphRatio: 0.7 });
  }

  function onKey(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      state.current.ta = state.current.ta > 0 ? -1 : 1;
    }
  }

  return (
    <figure className={`plot rip ${tone}`} role="button" tabIndex={0} aria-label="Live parabola. Press to flip it." onClick={flip} onKeyDown={onKey}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <g className="plot-grid">{grid}</g>
        <line className="plot-axis" x1="0" x2={W} y1={H / 2} y2={H / 2} />
        <line className="plot-axis" x1={W / 2} x2={W / 2} y1="0" y2={H} />
        <line ref={axisRef} className="plot-sym" x1={W / 2} x2={W / 2} y1="0" y2={H} />
        <path
          ref={curveRef}
          className={`plot-curve ${drawn ? '' : 'draw'}`}
          pathLength="1"
          d={buildPath(1, -2, -3)}
          onAnimationEnd={() => setDrawn(true)}
        />
        <g ref={vertexRef} className="plot-vertex"><rect x="-6" y="-6" width="12" height="12" rx="2" transform="rotate(45)" /></g>
        <g ref={rootARef} className="plot-root"><circle className="halo" r="15" /><circle r="7" /></g>
        <g ref={rootBRef} className="plot-root"><circle className="halo" r="15" /><circle r="7" /></g>
      </svg>
      <figcaption className="plot-read">
        <span ref={eqRef} className="plot-eq">y = x² − 2.0x − 3.0</span>
        <span ref={chipRef} className="plot-chip" data-kind="two">Δ = 16.0, two real roots</span>
      </figcaption>
      <p className="plot-hint">{coarse ? 'Drag a finger to reshape the curve. Tap to flip it.' : 'Move your cursor to reshape the curve. Click to flip it.'}</p>
    </figure>
  );
}
