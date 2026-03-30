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
    // Premium Smooth Scroll Initialization
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    // Synchronize ScrollTrigger with Lenis
    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing for smoother scroll sync

    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
      lenis.resize();
      ScrollTrigger.refresh();
    };

    // Delay a light refresh to catch lazy-loaded heights
    setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
    }, 1500);

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      gsap.ticker.remove(update);
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
