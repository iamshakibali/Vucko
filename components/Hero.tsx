'use client';

import Image from "next/image";
import styles from "./Hero.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  // Reveal animation for text elements after splash
  useEffect(() => {
    const onSplash = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const tl = gsap.timeline();
      tl.fromTo(
        hero.querySelectorAll('[data-reveal="tagline"]'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        hero.querySelectorAll('[data-reveal="bottom-item"]'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );
      window.removeEventListener("splashComplete", onSplash);
    };
    window.addEventListener("splashComplete", onSplash);
    return () => window.removeEventListener("splashComplete", onSplash);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const laptopInner = laptopRef.current;
    const laptopWrapper = laptopInner?.parentElement;
    const videoEl = laptopInner?.querySelector('video');
    const labelEl = laptopInner?.querySelector('p');
    if (!hero || !laptopInner || !laptopWrapper || !videoEl || !labelEl) return;

    // Normalised mouse position across the content area (0 = left padding, 1 = right padding)
    let targetT = 0.5;
    let currentT: number | null = null;  // lazily set to natural position on first frame
    let scrollProgress = 0;

    const PADDING = 70;

    const handleMouseMove = (e: MouseEvent) => {
      const heroRect = hero.getBoundingClientRect();
      const contentLeft = heroRect.left + PADDING;
      const contentRight = heroRect.right - PADDING;
      targetT = Math.max(0, Math.min(1, (e.clientX - contentLeft) / (contentRight - contentLeft)));
    };

    hero.addEventListener("mousemove", handleMouseMove);

    // Smooth trailing animation: scroll-driven + mouse trail
    const animate = () => {
      const heroRect = hero.getBoundingClientRect();
      const scrollY = window.scrollY;

      // --- Scroll-driven animation ---
      // Phase 1: Expand video (0 to 1.5 viewport heights)
      // Phase 2: Pin video at full width (stops at 2nd section)
      const expandRange = window.innerHeight * 1.5;

      // Phase 1: Expansion
      scrollProgress = Math.max(0, Math.min(1, scrollY / expandRange));

      // Phase 2: Pin at full width (video stops here)
      const isPinPhase = scrollY > expandRange;

      const viewportWidth = window.innerWidth;
      const startLeft = 60;
      const endLeft = 0;
      const startWidth = 512;
      const endWidth = viewportWidth;
      const startHeight = 292;
      const endHeight = viewportWidth * 0.5625; // 16:9 aspect ratio

      const currentLeft = startLeft + (endLeft - startLeft) * scrollProgress;
      const currentWidth = startWidth + (endWidth - startWidth) * scrollProgress;
      const currentHeight = startHeight + (endHeight - startHeight) * scrollProgress;

      // Y position: 
      // - During expansion: counteract scroll to keep video in viewport
      // - During pin phase: keep video pinned at full width
      // - During scroll away: let video scroll naturally
      const baseY = -currentHeight * 0.28 + 1;
      let currentY;

      if (scrollProgress < 1) {
        // Phase 1: Expansion - counteract scroll
        currentY = baseY + scrollY + scrollProgress * 120;
      } else if (isPinPhase) {
        // Phase 2: Pin at full width - video stops here at the 2nd section
        const pinnedY = -endHeight * 0.28 + 1 + expandRange + 120;
        currentY = pinnedY;
      } else {
        currentY = baseY;
      }

      // Border radius: 12px at start, 0 when full width
      const borderRadius = 12 * (1 - scrollProgress);

      gsap.set(laptopWrapper, {
        left: currentLeft,
        width: currentWidth,
        height: currentHeight,
        y: currentY,
        borderRadius: borderRadius,
      });

      // --- Mouse trail (diminishes as video expands) ---
      const wrapperRect = laptopWrapper.getBoundingClientRect();
      const contentWidth = heroRect.width - PADDING * 2;
      const laptopWidth = wrapperRect.width;
      const laptopLeftInContent = wrapperRect.left - (heroRect.left + PADDING);

      // Full travel range: left edge touches left padding → right edge touches right padding
      const fullTravel = Math.max(0, contentWidth - laptopWidth);

      // Initialise currentT to match the laptop's natural CSS position (no visual jump)
      if (currentT === null) {
        currentT = fullTravel > 0 ? laptopLeftInContent / fullTravel : 0.5;
      }

      // Reduce trail responsiveness as video expands (smoothly fades to nearly static)
      const trailFactor = 1 - scrollProgress * 0.95;
      currentT += (targetT - currentT) * 0.06 * Math.max(0.01, trailFactor);

      // Hide label when video is expanding
      gsap.set(labelEl, {
        opacity: 1 - scrollProgress,
        y: -scrollProgress * 20,
      });

      const translateX = -laptopLeftInContent + currentT * fullTravel;

      gsap.set(laptopInner, {
        x: translateX,
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <main ref={heroRef} className={styles.hero}>
      {/* Giant VUCKO text with laptop image overlay */}
      <div className={styles.brand}>
        <div className={styles.brandText}>
          <Image
            src="/inline.svg"
            alt="Vucko logo"
            className={styles.brandLogo}
            width={1829}
            height={354}
            priority
          />
        </div>
        <div className={styles.laptopWrapper}>
          <div ref={laptopRef} className={styles.laptopInner}>
            <video
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className={styles.laptop}
            />
            <p className={styles.showcaseLabel} data-reveal="bottom-item">
              Vucko<sup>™</sup> Showcase
              <br />
              (Clients — 2018/2026)
            </p>
          </div>
        </div>
      </div>

      {/* Tagline and bottom row */}
      <div className={styles.taglineArea}>
        <div className={styles.taglineRow}>
          <h1 className={styles.tagline} data-reveal="tagline">
            Partnering with brands to define,
            <br />
            structure, and scale motion.
          </h1>
          <div className={styles.bottomRow}>
            <a href="#" className={styles.approachLink} data-reveal="bottom-item">
              Learn more about our approach
            </a>
            <span className={styles.scrollHint} data-reveal="bottom-item">
              (Scroll)
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
