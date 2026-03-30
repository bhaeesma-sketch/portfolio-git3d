import "./styles/Career.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const careerData = [
  {
    role: "Senior Full Stack Dev",
    company: "Current Production Hub",
    year: "2023 - Present",
    description: "Leading the development of high-performance architectural solutions and premium 3D web ecosystems for global enterprise clients."
  },
  {
    role: "Full Stack Freelancer",
    company: "Self-Employed",
    year: "2021 - Present",
    description: "Crafting bespoke digital experiences, specializing in interactive 3D interfaces, high-end GSAP animations, and scalable full-stack applications."
  }
];

const Career = () => {
  useGSAP(() => {
    gsap.to(".career-timeline", {
      maxHeight: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".career-info",
        start: "top 60%",
        end: "bottom 80%",
        scrub: true,
      }
    });
  }, []);

  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Professional <span>&</span>
          <br /> Experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          {careerData.map((exp, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.role}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>{exp.year}</h3>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
