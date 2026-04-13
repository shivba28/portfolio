import { useEffect, useMemo, useRef, useState } from 'react';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const rectIntersects = (a, b) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

const expandRect = (r, m) => ({
  left: r.left - m,
  top: r.top - m,
  right: r.right + m,
  bottom: r.bottom + m,
});

/**
 * Returns { inView, isNear } for a canvas element.
 * - Primary: IntersectionObserver (root viewport)
 * - Fallback: manual rect overlap check
 * Re-evaluates on rAF when offset/zoom changes (max once per frame).
 */
export function useIsInView(elementRef, offsetRef, zoomRef) {
  const [state, setState] = useState({ inView: false, isNear: false });
  const last = useRef({ ox: 0, oy: 0, z: 1 });
  const rafRef = useRef(0);

  const supportsIO = useMemo(
    () => typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function',
    []
  );

  useEffect(() => {
    const el = elementRef?.current;
    if (!el) return undefined;

    let ioIn = null;
    let ioNear = null;
    let cancelled = false;

    if (supportsIO) {
      ioIn = new IntersectionObserver(
        (entries) => {
          if (cancelled) return;
          const e = entries[0];
          setState((prev) => ({ ...prev, inView: Boolean(e?.isIntersecting) }));
        },
        { root: null, rootMargin: '100px', threshold: 0 }
      );

      ioNear = new IntersectionObserver(
        (entries) => {
          if (cancelled) return;
          const e = entries[0];
          setState((prev) => ({ ...prev, isNear: Boolean(e?.isIntersecting) }));
        },
        { root: null, rootMargin: '600px', threshold: 0 }
      );

      ioIn.observe(el);
      ioNear.observe(el);
    }

    const manualCheck = () => {
      const node = elementRef?.current;
      if (!node) return;

      const r = node.getBoundingClientRect();
      const vp = { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };

      const inRect = expandRect(vp, 100);
      const nearRect = expandRect(vp, 600);
      const rr = { left: r.left, top: r.top, right: r.right, bottom: r.bottom };

      const inView = rectIntersects(rr, inRect);
      const isNear = rectIntersects(rr, nearRect);

      setState((prev) => {
        if (prev.inView === inView && prev.isNear === isNear) return prev;
        return { inView, isNear };
      });
    };

    const tick = () => {
      const o = offsetRef?.current || { x: 0, y: 0 };
      const zRaw = zoomRef?.current;
      const z = typeof zRaw === 'number' ? clamp(zRaw, 0.01, 10) : 1;

      const changed =
        o.x !== last.current.ox || o.y !== last.current.oy || z !== last.current.z;

      if (changed || !supportsIO) {
        last.current = { ox: o.x, oy: o.y, z };
        manualCheck();
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      ioIn?.disconnect();
      ioNear?.disconnect();
    };
  }, [elementRef, offsetRef, zoomRef, supportsIO]);

  return state;
}

