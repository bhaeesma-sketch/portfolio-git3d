import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:bhaesma@gmail.com" data-cursor="disable">
                bhaesma@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+96876324797" data-cursor="disable">
                +968 7632 4797
              </a>
            </p>
            <h4>Location</h4>
            <p>Oman</p>
            <p style={{ marginTop: '1.5rem', fontWeight: 600, color: '#6366f1' }}>
              Available for freelance and projects.
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/bhaeesma-sketch"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/bhaees"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>ABDUL BHAEES</span>
            </h2>
            <h3 style={{ marginTop: '2rem', fontSize: '1.2rem', textTransform: 'none', letterSpacing: 'normal', color: '#f0f9ff' }}>
              "I turn ideas into real applications."
            </h3>
            <h5 style={{ marginTop: '3rem' }}>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
