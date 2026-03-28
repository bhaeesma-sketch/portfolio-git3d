import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  
  // Transition background
  gsap.to("body", {
    backgroundColor: "#000000",
    duration: 0.5,
    delay: 1,
  });

  // Simple Entrance Animations (no SplitText required for basic visibility)
  const landingSelectors = [".landing-info h3", ".landing-intro h2", ".landing-intro h1"];
  gsap.fromTo(
    landingSelectors,
    { opacity: 0, y: 40, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.out",
      y: 0,
      stagger: 0.1,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, scale: 0.95 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      scale: 1,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
