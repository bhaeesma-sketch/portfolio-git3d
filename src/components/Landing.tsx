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
              <h3 className="premium-glow">Pro Digital Architect</h3>
            </Magnetic>
            <div className="landing-info-h2-container">
              <h2 className="landing-info-headline">
                Fullstack Web <br />
                <span className="accent-text">& Mobile Engineer</span>
              </h2>
              <p style={{ opacity: 0.6, fontSize: '0.9rem', marginTop: '15px', maxWidth: '400px', lineHeight: '1.6' }}>
                Expert in crafting high-performance iOS, Android, and Scalable Web Applications with elite 3D experiences.
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
