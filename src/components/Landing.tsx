import { PropsWithChildren, useEffect, useState } from "react";
import "./styles/Landing.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DecodeText } from "./DecodeText";
import { Magnetic } from "./Magnetic";
import { useLoading } from "../context/LoadingContext";

const Landing = ({ children }: PropsWithChildren) => {
  const { isLoading } = useLoading();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setShowContent(true), 200); // Wait for preloader panels to split
    }
  }, [isLoading]);

  useGSAP(() => {
    if (!showContent) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
    
    tl.from(".landing-intro h2", { 
      opacity: 0, 
      y: 50, 
      filter: "blur(10px)",
      duration: 1.5 
    })
    .from(".landing-info h3", { 
      opacity: 0, 
      scale: 0.8,
      duration: 1 
    }, "-=1")
    .from(".landing-info-headline", { 
      opacity: 0, 
      y: 40, 
      duration: 1.5,
      ease: "power4.out" 
    }, "-=0.8");
    
    // Smooth hover effect for the main name
    gsap.to(".landing-intro h1 span", {
      color: "#6366f1",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 3
    });
  }, [showContent]);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container" style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.5s linear' }}>
          <div className="landing-intro">
            <Magnetic>
              <h2 className="premium-glow">Hello! I'm</h2>
            </Magnetic>
            <h1 className="cyber-name" style={{ color: '#fff', textShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}>
              {showContent && (
                <>
                  <DecodeText text="ABDUL" delay={0.1} /><br />
                  <span className="accent-text"><DecodeText text="BHAEES" delay={0.8} /></span>
                </>
              )}
            </h1>
          </div>
          <div className="landing-info">
            <Magnetic>
              <h3 className="premium-glow">Full-Stack & Mobile App Developer</h3>
            </Magnetic>
            <div className="landing-info-h2-container">
              <h2 className="landing-info-headline">
                I Build Modern <br />
                <span className="accent-text">& Powerful Apps</span>
              </h2>
              <p style={{ opacity: 0.8, fontSize: '0.95rem', marginTop: '15px', maxWidth: '420px', lineHeight: '1.6' }}>
                I build modern websites and powerful mobile applications that are fast, scalable, and user-friendly. From idea to deployment, I create complete digital solutions for businesses and startups.
              </p>
              <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
                 <a href="#work" className="hero-btn primary-btn">View My Work</a>
                 <a href="#contact" className="hero-btn secondary-btn">Contact Me</a>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
