import "./styles/Career.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const careerData = [
  {
    role: "Senior Full Stack Dev",
    company: "TechNova Solutions",
    year: "2023",
    description: "Leading the development of scalable microservices and architectural redesign of core enterprise platforms using React and Node.js."
  },
  {
    role: "Frontend Engineer",
    company: "Creative Pulse Studio",
    year: "2021",
    description: "Developed high-performance interactive web experiences and built custom animation libraries for luxury brand portfolios."
  },
  {
    role: "Full Stack Developer",
    company: "Nexus Systems",
    year: "2020",
    description: "Engineered robust API systems and optimized database queries for a real-time POS analytics dashboard serving 10k+ daily users."
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
