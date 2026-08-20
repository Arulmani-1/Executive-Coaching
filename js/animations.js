// JS: animations.js - Core reusable GSAP animation systems

document.addEventListener("preloaderComplete", () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
  gsap.registerPlugin(ScrollTrigger);

  // 1. Text Reveal System (Line by line)
  const setupTextReveal = () => {
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    textRevealElements.forEach(el => {
      // Split text into lines (simplified approach without external library)
      const text = el.innerText;
      const lines = text.split('\n').filter(l => l.trim() !== '');
      el.innerHTML = '';
      
      lines.forEach(line => {
        const lineWrap = document.createElement('span');
        lineWrap.className = 'split-line d-block';
        
        const lineInner = document.createElement('span');
        lineInner.className = 'split-line-inner d-block';
        lineInner.innerHTML = line;
        
        lineWrap.appendChild(lineInner);
        el.appendChild(lineWrap);
      });

      gsap.to(el.querySelectorAll('.split-line-inner'), {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        y: 0,
        opacity: 1, // ensure it's visible if we hid it
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    });
  };

  // 2. Image Reveal System
  const setupImageReveal = () => {
    const imageReveals = document.querySelectorAll('.image-reveal');
    
    imageReveals.forEach(img => {
      // Setup initial clip path if not in CSS
      gsap.set(img, { clipPath: 'inset(100% 0 0 0)' });
      
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: "top 85%",
        },
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.5,
        ease: "power4.inOut"
      });

      // Subtle scale inner image if present
      const innerImg = img.querySelector('img');
      if (innerImg) {
        gsap.fromTo(innerImg, 
          { scale: 1.15 },
          { 
            scrollTrigger: { trigger: img, start: "top 85%" },
            scale: 1, 
            duration: 1.5, 
            ease: "power4.inOut" 
          }
        );
      }
    });
  };

  // 3. Parallax System
  const setupParallax = () => {
    const parallaxItems = document.querySelectorAll('.parallax');
    
    parallaxItems.forEach(item => {
      const speed = item.getAttribute('data-speed') || 0.1;
      
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: () => (ScrollTrigger.maxScroll(window) - ScrollTrigger.maxScroll(window)) * speed // Adjust to relative movement
      });
      // Corrected Parallax using yPercent
      gsap.fromTo(item, 
        { yPercent: -15 * speed },
        {
          yPercent: 15 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
  };

  // 4. Counter Animation System
  const setupCounters = () => {
    const counters = document.querySelectorAll('.counter-anim');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      gsap.fromTo(counter, 
        { innerText: 0 },
        {
          scrollTrigger: { trigger: counter, start: "top 90%" },
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: function() {
            counter.innerHTML = Math.ceil(this.targets()[0].innerText) + (counter.getAttribute('data-suffix') || '');
          }
        }
      );
    });
  };

  // 5. Timeline Scroll Animation
  const setupTimeline = () => {
    const timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 65%",
        onEnter: () => step.classList.add('active'),
        onLeaveBack: () => step.classList.remove('active')
      });
    });
  };

  // Initialize all
  setupTextReveal();
  setupImageReveal();
  setupParallax();
  setupCounters();
  setupTimeline();
});
