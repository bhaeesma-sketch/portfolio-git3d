import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Landing = ({ children }: PropsWithChildren) => {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    
    tl.from(".landing-intro h2", { 
      opacity: 0, 
      y: 50, 
      filter: "blur(10px)",
      duration: 1.2 
    })
    .from(".landing-intro h1", { 
      opacity: 0, 
      y: 100,
      rotateX: 45,
      filter: "blur(20px)",
      stagger: 0.2,
      duration: 1.5 
    }, "-=0.8")
    .from(".landing-info h3", { 
      opacity: 0, 
      scale: 0.8,
      duration: 1 
    }, "-=1")
    .from(".landing-info-headline", { 
      opacity: 0, 
      y: 20, 
      duration: 1.2, 
      ease: "power4.out" 
    }, "-=0.8");
    
    // Smooth hover effect for the main name
    gsap.to(".landing-intro h1 span", {
      color: "#38bdf8",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ABDUL
              <br />
              <span>BHAEES</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <div className="landing-info-h2-container">
              <h2 className="landing-info-headline">
                Developer <span className="accent-text">& Designer</span>
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
