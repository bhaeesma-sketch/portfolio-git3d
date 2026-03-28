import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Landing = ({ children }: PropsWithChildren) => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".landing-intro h2", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" })
      .from(".landing-intro h1", { opacity: 0, scale: 0.9, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(".landing-info h3", { opacity: 0, x: -30, duration: 0.6 }, "-=0.4")
      .from(".landing-info-headline", { opacity: 0, y: 30, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");
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
