/**
 * NexRise - Redesigned Services Page Premium Interactions
 * Powered by GSAP, ScrollTrigger, and Lenis Smooth Scroll
 * Author: Antigravity Code Assistant
 * Version: 2.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ============================================================
  // 1. INITIALIZE LENIS SMOOTH SCROLL
  // ============================================================
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExponential
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // ============================================================
  // 2. TEXT SPLITTING UTILITY FOR REVEAL ANIMATIONS
  // ============================================================
  const splitTextElements = document.querySelectorAll('.reveal-text');
  splitTextElements.forEach((el) => {
    const text = el.textContent.trim();
    el.innerHTML = '';
    
    // Split by words to keep spacing intact
    const words = text.split(/\s+/);
    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      wordSpan.style.overflow = 'hidden';
      wordSpan.classList.add('word-wrap');

      const chars = word.split('');
      chars.forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.classList.add('char');
        charSpan.style.display = 'inline-block';
        charSpan.style.transform = 'translateY(100%)';
        wordSpan.appendChild(charSpan);
      });

      el.appendChild(wordSpan);

      // Append trailing space
      if (wordIdx < words.length - 1) {
        const space = document.createTextNode(' ');
        el.appendChild(space);
      }
    });
  });

  // ============================================================
  // 3. HERO TIMELINE ENTRANCE
  // ============================================================
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
  
  // Animate Hero Badge and Dot
  heroTl.from('.services-badge-wrap', {
    opacity: 0,
    y: 30,
    delay: 0.4
  });

  // Animate split title characters
  heroTl.to('#services-hero-title .char', {
    y: '0%',
    stagger: 0.015,
    duration: 1.4,
    ease: 'power4.out'
  }, '-=0.8');

  // Animate subtitle
  heroTl.from('.services-hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 1.2
  }, '-=1.0');

  // Animate CTA buttons
  heroTl.from('.services-hero-ctas', {
    opacity: 0,
    y: 20,
    duration: 1.0
  }, '-=0.8');

  // Animate bottom scroll indicator
  heroTl.from('.hero-scroll-indicator', {
    opacity: 0,
    y: 15,
    duration: 0.8
  }, '-=0.6');

  // ============================================================
  // 4. DYNAMIC FLOATING BACKGROUND PARTICLES
  // ============================================================
  const particlesContainer = document.getElementById('particles-container');
  if (particlesContainer) {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 12 : 28;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('bg-particle');
      
      const size = gsap.utils.random(1.5, 4);
      gsap.set(particle, {
        width: size,
        height: size,
        x: gsap.utils.random(0, window.innerWidth),
        y: gsap.utils.random(0, window.innerHeight * 2.8),
        scale: gsap.utils.random(0.6, 2.0),
        opacity: gsap.utils.random(0.08, 0.25)
      });
      
      particlesContainer.appendChild(particle);

      // Unique floating timeline for each particle
      gsap.to(particle, {
        y: `+=${gsap.utils.random(120, 320)}`,
        x: `+=${gsap.utils.random(-80, 80)}`,
        duration: gsap.utils.random(12, 28),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }

  // ============================================================
  // 5. SCROLL PROGRESS BAR (GLOBAL)
  // ============================================================
  gsap.to('#scroll-progress-bar', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1
    }
  });

  // ============================================================
  // 6. ALTERNATING SHOWCASE SECTIONS ANIMATION
  // ============================================================
  const showcaseSections = document.querySelectorAll('.showcase-section');
  showcaseSections.forEach((section) => {
    const imageCol = section.querySelector('.showcase-image-col');
    const contentCol = section.querySelector('.showcase-content-col');
    const image = section.querySelector('.showcase-image');
    const badge = section.querySelector('.image-float-badge');
    const glow = section.querySelector('.image-glow-ring');

    // Entrance animation for columns
    gsap.fromTo(imageCol, 
      { opacity: 0, y: 70 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(contentCol,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Parallax scroll effects inside the sections
    if (image) {
      gsap.to(image, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    if (badge) {
      gsap.to(badge, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    if (glow) {
      gsap.to(glow, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  });

  // ============================================================
  // 7. 3D CARD MOUSE TILT EFFECT
  // ============================================================
  const tiltElements = document.querySelectorAll('.premium-image-wrapper, .service-details-card, .why-premium-card, .timeline-card');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice) {
    tiltElements.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Calculate coordinates relative to center of the card
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Transform tilt range (max 5 degrees for smooth effect)
        const tiltX = -(y / (rect.height / 2)) * 5;
        const tiltY = (x / (rect.width / 2)) * 5;
        
        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 800,
          ease: 'power1.out',
          duration: 0.35
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          ease: 'power3.out',
          duration: 0.6
        });
      });
    });
  }

  // ============================================================
  // 8. WHY CHOOSE US COUNTER TWEENS
  // ============================================================
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach((num) => {
    const target = parseInt(num.getAttribute('data-target')) || 0;
    const suffix = num.getAttribute('data-suffix') || '';
    const counterObj = { val: 0 };

    gsap.to(counterObj, {
      val: target,
      duration: 2.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.stats-counters-box',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        num.textContent = Math.floor(counterObj.val) + suffix;
      }
    });
  });

  // ============================================================
  // 9. PROCESS SECTION TIMELINE PROGRESS SCROLL
  // ============================================================
  const timelineProgressFill = document.getElementById('timeline-progress-fill');
  const timelineSteps = document.querySelectorAll('.timeline-step');

  if (timelineProgressFill && timelineSteps.length > 0) {
    gsap.fromTo(timelineProgressFill,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 55%',
          end: 'bottom 45%',
          scrub: true,
          onUpdate: (self) => {
            const currentHeightPct = self.progress;
            
            // Loop steps to active-toggle classes as the scroll progresses
            timelineSteps.forEach((step) => {
              const rect = step.getBoundingClientRect();
              const container = document.querySelector('.timeline-container');
              const containerRect = container.getBoundingClientRect();
              
              // Find ratio location of current step inside the container
              const stepCenter = (rect.top + rect.height / 2) - containerRect.top;
              const stepPct = stepCenter / containerRect.height;
              
              if (currentHeightPct >= stepPct - 0.06) {
                step.classList.add('active');
              } else {
                step.classList.remove('active');
              }
            });
          }
        }
      }
    );
  }

  // ============================================================
  // 10. REFRESH SCROLLTRIGGER ON WINDOW RESIZE
  // ============================================================
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
});
