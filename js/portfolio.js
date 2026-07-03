/**
 * NexRise - Portfolio Showcase Page Script Logic
 * Interactive client-side category filtering & Load More animations
 * Author: Antigravity Code Assistant
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ============================================================
  // 1. CLIENT-SIDE PORTFOLIO FILTER CONTROLLER
  // ============================================================
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-grid .project-showcase-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all pills
      filterBtns.forEach(b => b.classList.remove('is-active'));
      // Add active class to clicked pill
      btn.classList.add('is-active');

      const filterVal = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterVal === 'all' || categories.includes(filterVal)) {
          // Reset styling state if hidden
          card.classList.remove('portfolio-item-hidden');
          
          gsap.killTweensOf(card);
          gsap.fromTo(card,
            { scale: 0.95, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
          );
        } else {
          // Fade and hide
          gsap.killTweensOf(card);
          gsap.to(card, {
            scale: 0.92,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: () => {
              card.classList.add('portfolio-item-hidden');
            }
          });
        }
      });
      
      // Refresh ScrollTrigger as items height layout shifts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
    });
  });

  // ============================================================
  // 2. LOAD MORE SIMULATOR & GRID ANIMATION
  // ============================================================
  const loadMoreBtn = document.getElementById('load-more-trigger');
  const hiddenProjectsWrap = document.getElementById('hidden-projects-wrapper');
  
  if (loadMoreBtn && hiddenProjectsWrap) {
    loadMoreBtn.addEventListener('click', () => {
      loadMoreBtn.classList.add('is-loading');
      const btnText = loadMoreBtn.querySelector('.load-btn-text');
      btnText.textContent = 'Loading Projects...';

      setTimeout(() => {
        // Reveal hidden wrapping container
        hiddenProjectsWrap.classList.remove('d-none');
        
        // Find newly revealed cards
        const newCards = hiddenProjectsWrap.querySelectorAll('.project-showcase-card');
        
        // Stagger fade-in them using GSAP
        gsap.fromTo(newCards,
          { opacity: 0, y: 50, scale: 0.96 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.85, 
            stagger: 0.15,
            ease: 'power3.out',
            clearProps: 'all'
          }
        );

        // Terminate loader button status
        loadMoreBtn.classList.remove('is-loading');
        btnText.textContent = 'Load More';
        
        // Hide Load More wrapper completely
        gsap.to(loadMoreBtn.parentElement, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          onComplete: () => {
            loadMoreBtn.parentElement.style.display = 'none';
          }
        });

        // Trigger ScrollTrigger refresh
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 300);
      }, 1400);
    });
  }

  // ============================================================
  // 3. GSAP ENTRANCE STAGGER REVEAL ON LOAD
  // ============================================================
  const firstSectionCards = document.querySelectorAll('.portfolio-grid:first-of-type .project-showcase-card');
  if (firstSectionCards.length > 0) {
    gsap.fromTo(firstSectionCards,
      { opacity: 0, y: 60, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: 'power3.out',
        delay: 0.2,
        clearProps: 'all' 
      }
    );
  }
});
