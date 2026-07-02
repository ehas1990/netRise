/**
 * NexRise - About Us Page Specific Interactions
 * Version: 1.0.0
 * Author: Antigravity Code Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS (Animate On Scroll) for About Us animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-quad',
      once: true,
      mirror: false
    });
  }

  // 2. Initialize Swiper for Testimonials Slider
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
});
