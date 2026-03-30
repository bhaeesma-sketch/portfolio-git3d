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
        <h3 className="title premium-glow">About <span>Me</span></h3>
        <p className="para" style={{ marginBottom: "1rem" }}>
          I am a passionate software developer specializing in full-stack web and mobile app development.
        </p>
        <p className="para" style={{ marginBottom: "1rem" }}>
          I design and build complete applications, including frontend interfaces, backend systems, and mobile apps for Android and iOS. My goal is to create clean, efficient, and high-performing products that provide a great user experience.
        </p>
        <p className="para">
          I enjoy turning ideas into real-world applications and continuously improving my skills with modern technologies.
        </p>

        <h3 className="title premium-glow" style={{ marginTop: '3rem' }}>Why <span>Choose Me</span></h3>
        <ul style={{ 
            listStyleType: 'disc', 
            paddingLeft: '20px', 
            fontSize: '1.2rem', 
            lineHeight: '2', 
            opacity: 0.8, 
            marginTop: '1rem',
            color: '#f0f9ff'
        }}>
          <li>Clean and modern design</li>
          <li>Fast and responsive performance</li>
          <li>Complete solution (frontend + backend + mobile)</li>
          <li>Reliable communication</li>
          <li>Focus on quality and user experience</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
