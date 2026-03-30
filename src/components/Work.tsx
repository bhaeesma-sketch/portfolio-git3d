import { useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    title: "B-HUB POS",
    category: "Enterprise Store Ecosystem",
    tools: "React, Tailwind, Node.js, PostgreSQL",
    image: "/images/treetap_hero.png",
    logo: "/logos/treetap_logo.png",
    link: "https://treetap.shop"
  },
  {
    title: "Impero Gold",
    category: "Luxury FinTech Solution",
    tools: "Next.js, Framer Motion, Live Rates API",
    image: "/images/imperogold_hero.png",
    logo: "/logos/imperogold_logo.png",
    link: "https://imperodigolduae.com"
  },
  {
    title: "Studiolisan",
    category: "LMS Learning Platform",
    tools: "TypeScript, React, AWS, MongoDB Cloud",
    image: "/images/studiolisan_hero.jpg",
    logo: "/logos/studiolisan_logo.png",
    link: "https://studiolisan.com"
  }
];

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !flexRef.current) return;
    const container = flexRef.current;
    
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      // Desktop: Restored Original Horizontal Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${container.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });

      tl.to(flexRef.current, {
        x: () => -(container.scrollWidth - window.innerWidth / 1.8),
        ease: "power2.out"
      });

      // Original Parallax background text
      gsap.to(".work-parallax-text", {
        x: 1000,
        opacity: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      });
    });

    mm.add("(max-width: 1024px)", () => {
      // Mobile: Robust Vertical Entrance
      gsap.fromTo(".work-box", 
        { 
          opacity: 0, 
          y: 40 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: flexRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      {/* Background Parallax Text - Hidden on Mobile */}
      <h1 className="work-parallax-text" style={{ 
          position: 'absolute', 
          top: '25%', 
          left: '-50%', 
          fontSize: '30vw', 
          fontWeight: 900, 
          color: '#6366f1', 
          opacity: 0.05,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 0,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase'
      }}>
        LIVE PRODUCTION LIVE PRODUCTION LIVE PRODUCTION LIVE PRODUCTION
      </h1>

      <div className="work-container section-container">
        <div className="work-header">
           <h2 className="premium-glow">Industry <span>Case Studies</span></h2>
           <p className="work-description">Explore some of my high-impact, live production digital ecosystems developed for global clients.</p>
        </div>

        <div className="work-flex" ref={flexRef}>
          {projectData.map((project, index) => (
            <motion.div 
              className="work-box glass-card" 
              key={index}
              whileHover={{ y: -15, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              onClick={() => project.link !== "#" && window.open(project.link, "_blank")}
            >
              <div className="work-info">
                <div className="work-card-top">
                   <div className="work-index">0{index + 1}</div>
                   {project.logo && (
                      <div className="work-project-logo">
                         <img src={project.logo} alt="Project Logo" />
                      </div>
                   )}
                </div>

                <div className="work-title">
                  <h4>{project.title}</h4>
                  <p>{project.category}</p>
                </div>

                <div className="work-tools">
                   <h5>Tech Arsenal:</h5>
                   <p>{project.tools}</p>
                </div>

                {project.link !== "#" && (
                   <div className="view-project-link">
                      Live Environment <span>↗</span>
                   </div>
                )}
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
