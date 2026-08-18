// JS: loader.js - Premium preloader animation

document.addEventListener("DOMContentLoaded", () => {
  // We only run this if GSAP is available and preloader exists
  if (typeof gsap === 'undefined') return;
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    preloader.style.display = 'none';
    document.dispatchEvent(new CustomEvent('preloaderComplete'));
    return;
  }

  // Create GSAP Timeline
  const tl = gsap.timeline({
    onComplete: () => {
      preloader.style.display = 'none';
      document.dispatchEvent(new CustomEvent('preloaderComplete'));
    }
  });

  // 1. Logo appears and scales
  tl.fromTo(".loader-logo", 
    { opacity: 0, scale: 0.7, rotation: -2 }, 
    { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "power3.out" }
  )
  
  // 2. Loading line expands
  .to(".loader-line", { width: "100%", duration: 1.5, ease: "power2.inOut" }, "-=0.5")
  
  // 3. Percentage animation (simulate loading)
  .to({val: 0}, {
    val: 100,
    duration: 1.5,
    ease: "power1.inOut",
    onUpdate: function() {
      const el = document.querySelector(".loader-percentage");
      if(el) el.innerText = Math.round(this.targets()[0].val) + "%";
    }
  }, "-=1.5")
  
  // 4. Slide preloader up to reveal site
  .to("#preloader", { y: "-100%", duration: 1, ease: "power4.inOut" }, "+=0.3");
});
