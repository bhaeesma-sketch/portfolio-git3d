import { motion } from "framer-motion";

const WhatIDo = () => {
  return (
    <div className="whatIDO">
      <motion.div
        className="what-box"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </motion.div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <motion.div
            className="what-content what-noTouch"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEVELOP</h3>
              <h4>Expertise</h4>
              <p>
                Crafting scalable web applications with a focus on high performance, 
                clean architecture, and seamless user experiences.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">React</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">Three.js</div>
                <div className="what-tags">GSAP</div>
                <div className="what-tags">Tailwind</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">Docker</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </motion.div>
          <motion.div
            className="what-content what-noTouch"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DESIGN</h3>
              <h4>Creative Vision</h4>
              <p>
                Bridging the gap between design and code by creating interactive 
                visual identities and intuitive user interfaces.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Figma</div>
                <div className="what-tags">UI/UX</div>
                <div className="what-tags">Blender</div>
                <div className="what-tags">Motion Design</div>
                <div className="what-tags">Spline</div>
                <div className="what-tags">After Effects</div>
                <div className="what-tags">Prototypes</div>
                <div className="what-tags">Branding</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
