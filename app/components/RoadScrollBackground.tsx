"use client";

import { useEffect, useRef, useState } from "react";

export default function RoadScrollBackground() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [dot, setDot] = useState({ x: 24, y: 30 });
  const [flow, setFlow] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const p = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setProgress(p);

      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        const pt = pathRef.current.getPointAtLength(len * p);
        setDot({ x: pt.x, y: pt.y });
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setFlow((v) => (v + 1.6) % 2000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="road-scroll-bg" aria-hidden="true">
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path
          d="M24 12 C 42 120, 38 200, 24 300 C 12 380, 14 470, 30 560 C 42 630, 40 740, 24 840 C 16 900, 20 952, 34 990"
          className="road-scroll-shadow"
        />
        <path
          ref={pathRef}
          d="M24 12 C 42 120, 38 200, 24 300 C 12 380, 14 470, 30 560 C 42 630, 40 740, 24 840 C 16 900, 20 952, 34 990"
          className="road-scroll-path"
          style={{ strokeDashoffset: `${-flow - progress * 1200}` }}
        />
        <circle cx={dot.x} cy={dot.y} r="3.1" className="road-scroll-dot" />
      </svg>
    </div>
  );
}
