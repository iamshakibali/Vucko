'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./SplashScreen.module.css";

export default function SplashScreen() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logoWrap = logoWrapRef.current;
    const bar = barRef.current;
    if (!overlay || !logoWrap || !bar) return;

    // Pre-calculate hero logo position (element is already in SSR DOM)
    const heroLogo = document.querySelector(
      'main img[alt="Vucko logo"]'
    ) as HTMLImageElement | null;
    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;
    let hasTarget = false;

    if (heroLogo) {
      const hr = heroLogo.getBoundingClientRect();
      const sr = logoWrap.getBoundingClientRect();
      targetX = hr.left - sr.left + (hr.width - sr.width) / 2;
      targetY = hr.top - sr.top + (hr.height - sr.height) / 2;
      targetScale = hr.width / sr.width;
      hasTarget = true;
    }

    // Build timeline — NO opacity fades, everything snaps instantly
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        // Signal child components to start their reveal animations
        window.dispatchEvent(new CustomEvent('splashComplete'));
      },
    });

    // 1. Logo scales up (no fade — always fully visible)
    tl.fromTo(
      logoWrap,
      { scale: 0.4 },
      { scale: 1, duration: 1.2, ease: "power3.out" }
    )
      // 2. Draw the underline bar (no fade — appears instantly, draws from left)
      .fromTo(
        bar,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      // 3. Hold
      .to({}, { duration: 0.8 });

    // 4. Fly logo to hero position — no fades on anything
    if (hasTarget) {
      // Bar disappears instantly (no fade)
      tl.set(bar, { display: "none" })
        .to(logoWrap, {
          x: targetX,
          y: targetY,
          scale: targetScale,
          duration: 1.2,
          ease: "power3.inOut",
        });
      // onComplete fires when timeline finishes → setDone(true) → splash unmounts
    } else {
      // Fallback — onComplete handles unmount
    }
  }, []);

  if (done) return null;

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div ref={logoWrapRef} className={styles.logoWrap}>
        <Image
          src="/inline.svg"
          alt="Vucko"
          width={240}
          height={46}
          className={styles.logo}
          priority
        />
        <div ref={barRef} className={styles.underlineBar} />
      </div>
    </div>
  );
}
