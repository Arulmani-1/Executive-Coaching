// JS: pages.js - Page specific scroll interactions

document.addEventListener("preloaderComplete", () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // -----------------------------------------
  // HOME PAGE
  // -----------------------------------------
  
  // 1. Home Page - Data Vis SVG Animation
  const svgLine = document.querySelector('.data-vis-line');
  if (svgLine) {
    // Get actual length of the path
    const length = svgLine.getTotalLength();
    
    // Set up the starting positions
    gsap.set(svgLine, { strokeDasharray: length, strokeDashoffset: length });
    
    gsap.to(svgLine, {
      scrollTrigger: {
        trigger: ".home-data-vis",
        start: "top 75%",
      },
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.out"
    });
  }

  // 2. Home Page - Process Timeline Scrub
  const processContainer = document.querySelector('.process-timeline-container');
  if (processContainer) {
    const progressLine = document.querySelector('.process-line-progress');
    const steps = gsap.utils.toArray('.process-step');
    
    // Animate the progress line horizontally
    gsap.to(progressLine, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: processContainer,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 0.5,
        onUpdate: (self) => {
          // Highlight steps based on progress
          const progress = self.progress;
          steps.forEach((step, index) => {
            const stepThreshold = index / (steps.length - 1);
            if (progress >= stepThreshold - 0.1) {
              step.classList.add('active');
            } else {
              step.classList.remove('active');
            }
          });
        }
      }
    });
  }
});

// Filter functionality for Recent Pieces
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.btn-filter');
  const filterItems = document.querySelectorAll('.filter-item');

  if (filterBtns.length > 0 && filterItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset all buttons
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.style.backgroundColor = '#F9F6F0';
          b.style.color = 'var(--color-text-primary)';
        });

        // Set active button
        btn.classList.add('active');
        btn.style.backgroundColor = '#b05c6d';
        btn.style.color = '#F9F6F0';

        const filterValue = btn.getAttribute('data-filter');

        // Filter items
        filterItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            // simple fade in
            item.animate([
              { opacity: 0, transform: 'translateY(10px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ], {
              duration: 400,
              easing: 'ease-out',
              fill: 'forwards'
            });
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});
