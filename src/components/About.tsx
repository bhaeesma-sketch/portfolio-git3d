import "./styles/About.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const About = () => {
  useGSAP(() => {
    gsap.from(".about-me h3", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    gsap.from(".about-me p", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title premium-glow">The Story <span>So Far</span></h3>
        <p className="para">
          Based in Muscat, Oman, I am a creative powerhouse specializing in full-stack architecture 
          and immersive 3D web design. My mission is to push the boundaries of the traditional web, 
          transforming complex code into high-performance, visually stunning business solutions 
          that captivate audiences globaly.
        </p>
      </div>
    </div>
  );
};

export default About;
