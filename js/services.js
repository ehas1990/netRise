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

  // 4. Initialize Swiper for Horizontal Roadmap Timeline
  if (typeof Swiper !== 'undefined') {
    new Swiper('.process-slider-container', {
      slidesPerView: 1.2,
      spaceBetween: 16,
      grabCursor: true,
      navigation: {
        nextEl: '.process-slider-next',
        prevEl: '.process-slider-prev',
      },
      pagination: {
        el: '.process-slider-pagination',
        clickable: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: 6,
          spaceBetween: 24,
          allowTouchMove: false,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 20,
          allowTouchMove: true,
        }
      }
    });
  }

  // 5. Progress Line Animation on Scroll
  const progressLine = document.querySelector('.process-progress-bar');
  const processSection = document.querySelector('.process-slider-container');
  if (progressLine && processSection) {
    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressLine.style.transform = 'scaleX(1)';
          processObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    processObserver.observe(processSection);
  }
});
