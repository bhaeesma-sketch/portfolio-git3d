import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const Navbar = () => {
  useEffect(() => {
    // Basic interaction for navbar links using standard browser scroll or Lenis
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        const targetId = element.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId || "");
        if (targetElement) {
           e.preventDefault();
           targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-logo-container" data-cursor="disable">
           <img src="/images/logo.png" alt="Abdul Bhaees Logo" className="navbar-brand-logo" />
           <span className="navbar-brand-name">ABDUL BHAEES</span>
        </a>
        <a
          href="tel:+96876324797"
          className="navbar-connect"
          data-cursor="disable"
        >
          +968 7632 4797
        </a>
        <ul>
          <li>
            <a href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
