// JS: navbar.js - Navbar interactions

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  // Handle scroll events for navbar styling
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // init

  // Navbar Entrance Animation (Triggered after preloader)
  document.addEventListener('preloaderComplete', () => {
    if (typeof gsap === 'undefined') return;
    
    gsap.fromTo('.navbar-brand', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    gsap.fromTo('.nav-link', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );
    
    gsap.fromTo('.navbar .btn', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.6"
    );
  });

  // Offcanvas Interactions
  const offcanvasEl = document.getElementById('offcanvasNavbar');
  if (offcanvasEl) {
    // 1. Strictly lock background scroll on mobile and fix stacking context bug
    offcanvasEl.addEventListener('show.bs.offcanvas', () => {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Remove backdrop-filter because it creates a containing block that clips the fixed offcanvas
      navbar.style.backdropFilter = 'none';
      navbar.style.webkitBackdropFilter = 'none';
    });
    offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      navbar.style.backdropFilter = '';
      navbar.style.webkitBackdropFilter = '';
    });

    // 2. Auto-close offcanvas when clicking links
    const offcanvasLinks = offcanvasEl.querySelectorAll('a');
    offcanvasLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (typeof bootstrap !== 'undefined') {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (bsOffcanvas) {
            bsOffcanvas.hide();
          }
        }
      });
    });
  }
});
