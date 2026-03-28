import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projectData = [
  {
    title: "Treeta POS",
    category: "Enterprise POS Solution",
    tools: "React, Node.js, PostgreSQL, Docker",
    image: "/images/placeholder.webp",
    link: "https://treeta.shop"
  },
  {
    title: "Impero Digol",
    category: "Luxury E-commerce",
    tools: "Next.js, Three.js, GSAP, Shopify",
    image: "/images/placeholder.webp",
    link: "https://imperodigolduae.com"
  },
  {
    title: "Studiolisan",
    category: "LMS Learning Platform",
    tools: "TypeScript, React, AWS, MongoDB",
    image: "/images/placeholder.webp",
    link: "https://studiolisan.com"
  },
  {
    title: "GSAP Motion Lab",
    category: "Interactive Design",
    tools: "GSAP, ScrollTrigger, Canvas API",
    image: "/images/placeholder.webp",
    link: "#"
  }
];

const Work = () => {
  useGSAP(() => {
    const sections = gsap.utils.toArray(".work-box");
    const container = document.querySelector(".work-flex") as HTMLElement;
    
    // Calculate exact scroll width
    const scrollWidth = container.scrollWidth - window.innerWidth;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        pin: true,
        scrub: 0.4,
        start: "top top",
        end: () => `+=${container.scrollWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    tl.to(".work-flex", {
      x: () => -(container.scrollWidth - window.innerWidth / 1.5),
      ease: "power4.out"
    });

    // Parallax background text
    gsap.to(".work-parallax-text", {
      x: 1500,
      opacity: 0.1,
      scrollTrigger: {
        trigger: ".work-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <div className="work-section" id="work">
      {/* Background Parallax Text */}
      <h1 className="work-parallax-text" style={{ 
          position: 'absolute', 
          top: '20%', 
          left: '-20%', 
          fontSize: '25vw', 
          fontWeight: 900, 
          color: '#38bdf8', 
          opacity: 0.03,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 0
      }}>
        SELECTED SHOTS SELECTED SHOTS
      </h1>

      <div className="work-container section-container">
        <div className="work-header">
           <h2 className="premium-glow">My <span>Portfolio</span></h2>
           <p className="work-description">A collection of premium digital experiences crafted with precision.</p>
        </div>

        <div className="work-flex">
          {projectData.map((project, index) => (
            <motion.div 
              className="work-box glass-card" 
              key={index}
              whileHover={{ y: -20, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="work-info">
                <div className="work-index">0{index + 1}</div>
                <div className="work-title">
                  <h4>{project.title}</h4>
                  <p>{project.category}</p>
                </div>
                <div className="work-tools">
                   <h5>Tech Stack:</h5>
                   <p>{project.tools}</p>
                </div>
                <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="view-project-link"
                >
                   View Project <span>→</span>
                </a>
              </div>
              <div className="work-image-wrapper">
                 <WorkImage image={project.image} alt={project.title} />
                 <div className="work-image-overlay"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
