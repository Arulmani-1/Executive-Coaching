// JS: main.js - AOS initialization and general interactions

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      once: true,
      offset: 50
    });
  }

  // 2. Mouse Parallax (Subtle interaction)
  const setupMouseParallax = () => {
    const items = document.querySelectorAll('.mouse-parallax');
    if(items.length === 0) return;

    window.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 50; // max ~20px
      const y = (window.innerHeight / 2 - e.clientY) / 50;

      items.forEach(item => {
        const factor = item.getAttribute('data-mouse-factor') || 1;
        // Native CSS transform for better performance if GSAP is busy
        item.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  };

  // Wait for preloader to finish before enabling mouse interactions
  document.addEventListener('preloaderComplete', setupMouseParallax);
  
});
