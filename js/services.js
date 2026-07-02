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
  // 6. Scroll Storytelling for Featured Services (Desktop only)
  const track = document.querySelector('.showcase-scroll-track');
  const cards = document.querySelectorAll('.featured-showcase-card');
  const progressNumbers = document.querySelectorAll('.storytelling-progress-num');
  const progressFill = document.querySelector('.storytelling-progress-fill');

  if (track && cards.length > 0) {
    // Mobile scroll entrance observer (triggers animation only once)
    const mobileObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mobile-visible');
          mobileObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      mobileObserver.observe(card);
    });

    const handleScrollStorytelling = () => {
      if (window.innerWidth >= 1024) {
        const rect = track.getBoundingClientRect();
        const trackHeight = rect.height;
        const scrolled = -rect.top;
        const windowHeight = window.innerHeight;

        // Calculate progress ratio (0 to 1)
        const progress = Math.max(0, Math.min(1, scrolled / (trackHeight - windowHeight)));

        // Update progress line fill height
        if (progressFill) {
          progressFill.style.transform = `scaleY(${progress})`;
        }

        // Calculate card index to active
        const totalCards = cards.length;
        const cardIndex = Math.max(0, Math.min(totalCards - 1, Math.floor(progress * totalCards)));

        cards.forEach((card, idx) => {
          if (idx === cardIndex) {
            card.classList.add('is-active');
            card.classList.remove('is-passed');
          } else if (idx < cardIndex) {
            card.classList.add('is-passed');
            card.classList.remove('is-active');
          } else {
            card.classList.remove('is-active');
            card.classList.remove('is-passed');
          }
        });

        // Highlight active number in indicator
        progressNumbers.forEach((num, idx) => {
          if (idx === cardIndex) {
            num.classList.add('active');
          } else {
            num.classList.remove('active');
          }
        });
      } else {
        // Fallback for smaller screens: clear storytelling classes
        cards.forEach(card => {
          card.classList.remove('is-active', 'is-passed');
        });
      }
    };

    window.addEventListener('scroll', handleScrollStorytelling);
    window.addEventListener('resize', handleScrollStorytelling);
    // Initial call to set active card on load
    handleScrollStorytelling();
  }
});
