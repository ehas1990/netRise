/**
 * NexRise - Services Page Specific Interactions
 * Version: 1.0.0
 * Author: Antigravity Code Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-quad',
      once: true,
      mirror: false
    });
  }

  // 2. Initialize Swiper for Testimonials
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  }

  // 3. Stats Counter Animation on Scroll
  const statsSection = document.querySelector('.stats-grid');
  const statsNums = document.querySelectorAll('.stats-num');
  let animated = false;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    const suffix = element.getAttribute('data-suffix') || '';
    let count = 0;
    const duration = 2000; // 2 seconds
    const speed = target / (duration / 16); // ~60fps

    const updateCount = () => {
      count += speed;
      if (count >= target) {
        element.textContent = target + suffix;
      } else {
        element.textContent = Math.floor(count) + suffix;
        requestAnimationFrame(updateCount);
      }
    };
    updateCount();
  };

  if (statsSection && statsNums.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          statsNums.forEach(num => countUp(num));
          animated = true;
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    statsObserver.observe(statsSection);
  }

  // 4. Hero Section Mouse Parallax Effect
  const heroSection = document.querySelector('.services-hero');
  const parallaxShapes = document.querySelectorAll('.floating-shape-blur');

  if (heroSection && parallaxShapes.length > 0) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const xPercent = (clientX / width - 0.5) * 2; // -1 to 1
      const yPercent = (clientY / height - 0.5) * 2; // -1 to 1

      parallaxShapes.forEach((shape, index) => {
        const factor = (index + 1) * 15; // amount of shift
        const xShift = xPercent * factor;
        const yShift = yPercent * factor;
        shape.style.transform = `translate(${xShift}px, ${yShift}px)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      parallaxShapes.forEach(shape => {
        shape.style.transform = 'translate(0px, 0px)';
        shape.style.transition = 'transform 0.5s ease-out';
      });
    });

    heroSection.addEventListener('mouseenter', () => {
      parallaxShapes.forEach(shape => {
        shape.style.transition = 'none';
      });
    });
  }
});
