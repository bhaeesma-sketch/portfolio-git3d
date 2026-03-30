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
              <h2>Hello! I'm</h2>
            </Magnetic>
            <h1 className="cyber-name">
              {showContent && (
                <>
                  <DecodeText text="ABDUL" delay={0.1} /><br />
                  <span><DecodeText text="BHAEES" delay={0.8} /></span>
                </>
              )}
            </h1>
          </div>
          <div className="landing-info">
            <Magnetic>
              <h3>A Creative</h3>
            </Magnetic>
            <div className="landing-info-h2-container">
              <h2 className="landing-info-headline">
                Developer <br />
                <span className="accent-text">&  Designer</span>
              </h2>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
