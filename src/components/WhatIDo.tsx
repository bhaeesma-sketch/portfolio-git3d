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
              <h3>MY SKILLS</h3>
              <h4>Technical Arsenal</h4>
              
              <div style={{ marginTop: '15px' }}>
                <h5 style={{ margin: '0 0 5px 0', color: '#6366f1' }}>Frontend:</h5>
                <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.8 }}>HTML, CSS, JavaScript, React</p>
                
                <h5 style={{ margin: '0 0 5px 0', color: '#6366f1' }}>Backend:</h5>
                <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.8 }}>Node.js, Express, Firebase</p>
                
                <h5 style={{ margin: '0 0 5px 0', color: '#6366f1' }}>Mobile:</h5>
                <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.8 }}>Flutter / React Native</p>
                
                <h5 style={{ margin: '0 0 5px 0', color: '#6366f1' }}>Database:</h5>
                <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.8 }}>MongoDB, Firebase</p>
                
                <h5 style={{ margin: '0 0 5px 0', color: '#6366f1' }}>Tools:</h5>
                <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: 0.8 }}>Git, Vercel, Figma</p>
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
              <h3>SERVICES</h3>
              <h4>What I Provide</h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '15px', lineHeight: '2', opacity: 0.8, marginTop: '20px' }}>
                <li>Website Development (Business, E-commerce, Custom)</li>
                <li>Mobile App Development (Android & iOS)</li>
                <li>Full-Stack Web Applications</li>
                <li>UI/UX Design Implementation</li>
                <li>API Integration & Backend Development</li>
                <li>Deployment & Hosting Setup</li>
              </ul>
              <div className="what-arrow"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
