/**
 * NexRise - Reusable Scroll & Interactive Animation Framework
 * Powered by GSAP, ScrollTrigger, and Lenis Smooth Scroll
 * Author: Antigravity Code Assistant
 * Version: 1.0.0
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
  // 2. REUSABLE TEXT SPLITTING (FOR REVEALS)
  // ============================================================
  const splitTextElements = document.querySelectorAll('.reveal-text');
  splitTextElements.forEach((el) => {
    const text = el.textContent.trim();
    el.innerHTML = '';
    
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

      if (wordIdx < words.length - 1) {
        const space = document.createTextNode(' ');
        el.appendChild(space);
      }
    });
  });

  // ============================================================
  // 3. DYNAMIC FLOATING BACKGROUND PARTICLES
  // ============================================================
  const particlesContainer = document.getElementById('particles-container');
  if (particlesContainer) {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 35;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('bg-particle');
      
      const size = gsap.utils.random(1.5, 4.5);
      gsap.set(particle, {
        width: size,
        height: size,
        x: gsap.utils.random(0, window.innerWidth),
        y: gsap.utils.random(0, window.innerHeight * 4.5),
        scale: gsap.utils.random(0.5, 2.0),
        opacity: gsap.utils.random(0.05, 0.22)
      });
      
      particlesContainer.appendChild(particle);

      gsap.to(particle, {
        y: `+=${gsap.utils.random(150, 350)}`,
        x: `+=${gsap.utils.random(-100, 100)}`,
        duration: gsap.utils.random(15, 30),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }

  // ============================================================
  // 4. SCROLL PROGRESS BAR
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
  // 5. AUTO HERO ENTRANCE (HOME & ABOUT)
  // ============================================================
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    
    // Animate badge/breadcrumbs
    if (heroSection.querySelector('.services-badge-wrap, .about-breadcrumb')) {
      heroTl.from('.services-badge-wrap, .about-breadcrumb', {
        opacity: 0,
        y: 25,
        delay: 0.4
      });
    }

    // Reveal split text header
    if (heroSection.querySelector('#hero-title .char, #hero .char')) {
      heroTl.to('#hero-title .char, #hero .char', {
        y: '0%',
        stagger: 0.015,
        duration: 1.4,
        ease: 'power4.out'
      }, '-=0.8');
    } else {
      // Fallback if not splitted yet
      heroTl.from('.hero-section h1', {
        opacity: 0,
        y: 40,
        duration: 1.2
      }, '-=0.8');
    }

    // Subtitle & Taglines
    if (heroSection.querySelector('.hero__tagline, .lead')) {
      heroTl.from('.hero__tagline, .lead', {
        opacity: 0,
        y: 25,
        duration: 1.0
      }, '-=1.0');
    }

    // CTAs & buttons
    if (heroSection.querySelector('.hero__bottom, .hero__ctas, .d-flex')) {
      heroTl.from('.hero__bottom, .hero__ctas, .services-hero-ctas, .hero-section .d-flex', {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, '-=0.8');
    }
  }

  // ============================================================
  // 6. REUSABLE IMAGE PARALLAX & CLIP-PATH REVEALS
  // ============================================================
  const parallaxImages = document.querySelectorAll('[data-parallax-image], .process-card__bg img, .works-item__img img, .why-main-img-box img, .testimonial-img-block img');
  parallaxImages.forEach((img) => {
    // Check if image is wrapped in parallax wrapper, otherwise wrap it
    let wrapper = img.parentElement;
    if (!wrapper.classList.contains('parallax-img-wrapper') && !wrapper.classList.contains('clip-reveal-box') && !wrapper.classList.contains('process-card__bg') && !wrapper.classList.contains('works-item__img') && !wrapper.classList.contains('why-main-img-box') && !wrapper.classList.contains('testimonial-img-block')) {
      wrapper = document.createElement('div');
      wrapper.classList.add('parallax-img-wrapper');
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    }

    // Clip-path reveal transition on scroll
    gsap.fromTo(wrapper,
      { clipPath: 'inset(10% 10% 10% 10% round 16px)', opacity: 0.8 },
      {
        clipPath: 'inset(0% 0% 0% 0% round 16px)',
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Parallax scroll movement
    gsap.to(img, {
      yPercent: 12,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Dynamic element parallax scroll based on [data-speed] attribute
  const dataSpeedElements = document.querySelectorAll('[data-speed]');
  dataSpeedElements.forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-speed')) || 0.15;
    gsap.to(el, {
      yPercent: speed * 80,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // ============================================================
  // 7. REUSABLE SCROLL REVEALS ON SECTIONS & CARDS
  // ============================================================
  // Card elements
  const revealCards = document.querySelectorAll('.process-card, .works-item, .service-item, .blog-item, .stat-item, .testimonial-card, .value-card, .team-card');
  revealCards.forEach((card, idx) => {
    const isEven = idx % 2 === 0;
    const directionX = isEven ? -40 : 40;

    gsap.fromTo(card,
      { 
        opacity: 0, 
        y: 50,
        x: card.classList.contains('process-card') || card.classList.contains('testimonial-card') ? 0 : directionX,
        scale: 0.96,
        filter: 'blur(4px)'
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Headings
  const headings = document.querySelectorAll('.section-title, .about__manifest p, .manifest-text');
  headings.forEach(heading => {
    gsap.fromTo(heading,
      { opacity: 0, y: 30, filter: 'blur(2px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ============================================================
  // 8. 3D CARD MOUSE TILT INTERACTION
  // ============================================================
  const tiltElements = document.querySelectorAll('.process-card, .works-item, .service-item, .blog-item, .testimonial-card, .why-floating-card, .stat-item, .team-card');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice) {
    tiltElements.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Max tilt rotation 6 degrees
        const tiltX = -(y / (rect.height / 2)) * 6;
        const tiltY = (x / (rect.width / 2)) * 6;
        
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
  // 9. STATISTICS COUNT-UP TWEENS (ABOUT & HOME)
  // ============================================================
  const counterElements = document.querySelectorAll('.counter, .stats-num, .stat-item__number span');
  counterElements.forEach((num) => {
    const target = parseInt(num.getAttribute('data-target')) || parseInt(num.textContent) || 0;
    if (target === 0) return;
    
    // Check if suffix or prefix exists
    const suffix = num.getAttribute('data-suffix') || '';
    const counterObj = { val: 0 };
    
    num.textContent = '0' + suffix;

    gsap.to(counterObj, {
      val: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: num,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        num.textContent = Math.floor(counterObj.val) + suffix;
      }
    });
  });

  // ============================================================
  // 10. REFRESH SCROLLTRIGGER ON RESIZE
  // ============================================================
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
});
