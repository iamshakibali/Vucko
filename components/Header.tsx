'use client';

import Image from "next/image";
import styles from "./Header.module.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navItems = ["Projects", "Approach", "About", "Contact"];

export default function Header() {
  const [dark, setDark] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  // Reveal animation after splash
  useEffect(() => {
    const onSplash = () => {
      const header = headerRef.current;
      if (!header) return;

      const tl = gsap.timeline();
      tl.fromTo(
        header.querySelectorAll('[data-reveal="header"]'),
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        header.querySelectorAll('[data-reveal="nav-item"]'),
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" },
        "-=0.4"
      );
      window.removeEventListener("splashComplete", onSplash);
    };
    window.addEventListener("splashComplete", onSplash);
    return () => window.removeEventListener("splashComplete", onSplash);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header ref={headerRef} className={styles.topBar} data-reveal="header">
      <div className={styles.topBarLeft}>
        <a href="#" className={styles.logo}>
          <Image
            src="/inline.svg"
            alt="Vucko logo"
            width={100}
            height={24}
            className={styles.logoImage}
            priority
          />
        </a>
        <span className={styles.location} data-reveal="nav-item">Toronto, Canada 6 51 am</span>
      </div>
      <div className={styles.topBarRight}>
        <nav className={styles.navLinks}>
          {navItems.map((item, i) => (
            <span key={item}>
              <a href="#" data-reveal="nav-item">{item}</a>
              {i < navItems.length - 1 && <span>,</span>}
            </span>
          ))}
        </nav>
        <button className={styles.darkToggle} onClick={toggle} aria-label="Toggle dark mode" data-reveal="nav-item">
          <span className={styles.darkDot} />
        </button>
      </div>
    </header>
  );
}
