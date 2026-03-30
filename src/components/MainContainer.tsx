import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import Lenis from "lenis";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "../context/LoadingContext";
import { initialFX } from "./utils/initialFX";

gsap.registerPlugin(ScrollTrigger);

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(window.innerWidth > 1024);

  const { isLoading } = useLoading();

  useEffect(() => {
    if (!isLoading) {
      initialFX();
    }
  }, [isLoading]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    // Critical: tell ScrollTrigger about EVERY Lenis scroll tick
    // This prevents pinned sections from looping or resetting
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      ScrollTrigger.update();
      // Override GSAP's internal scroll reference so pin math is correct
      document.documentElement.style.setProperty("--lenis-scroll", `${scroll}px`);
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
      lenis.resize();
      ScrollTrigger.refresh();
    };

    // Give images/3D assets time to load before locking scroll positions
    const refreshTimeout = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 2000);

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("resize", resizeHandler);
      gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
      lenis.destroy();
    };
  }, []);

  return (
    <div className="main-wrapper">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      
      <main id="smooth-content">
        <Landing>{!isDesktopView && children}</Landing>
        <About />
        <WhatIDo />
        <Career />
        <Work />
        {isDesktopView && (
          <Suspense fallback={<div className="loading-fallback">Loading Technical Arsenal...</div>}>
            <TechStack />
          </Suspense>
        )}
        <Contact />
      </main>
    </div>
  );
};

export default MainContainer;
