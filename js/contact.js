/**
 * NexRise - Contact Page Specific Script Logic
 * Form validations, loading overlays, and scroll reveals
 * Author: Antigravity Code Assistant
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ============================================================
  // 1. DYNAMIC INPUT FLOATING LABELS STATUS
  // ============================================================
  const formInputs = document.querySelectorAll('.glass-input');
  formInputs.forEach(input => {
    // Check initial value (if autofilled)
    if (input.value !== '') {
      input.classList.add('has-value');
    }
    
    input.addEventListener('blur', () => {
      if (input.value !== '') {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    });
  });

  // ============================================================
  // 2. CONTACT FORM VALIDATIONS & ACTIONS
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  const successOverlay = document.getElementById('form-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      
      // Fields validation list
      const fields = [
        { id: 'contact-name', type: 'text', req: true, label: 'Full name is required' },
        { id: 'contact-email', type: 'email', req: true, label: 'A valid email is required' },
        { id: 'contact-phone', type: 'phone', req: false },
        { id: 'contact-subject', type: 'text', req: true, label: 'Subject is required' },
        { id: 'contact-message', type: 'text', req: true, label: 'Message is required' }
      ];

      fields.forEach(field => {
        const inputEl = document.getElementById(field.id);
        const groupEl = inputEl.closest('.form-group-floating');
        const feedbackEl = groupEl.querySelector('.invalid-feedback-msg');
        
        // Reset state
        groupEl.classList.remove('is-invalid');
        
        if (field.req && inputEl.value.trim() === '') {
          isValid = false;
          groupEl.classList.add('is-invalid');
          if (feedbackEl) feedbackEl.textContent = field.label || 'This field is required';
        } else if (field.type === 'email' && inputEl.value.trim() !== '') {
          // Check email pattern
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(inputEl.value.trim())) {
            isValid = false;
            groupEl.classList.add('is-invalid');
            if (feedbackEl) feedbackEl.textContent = 'Please enter a valid email address';
          }
        }
      });

      if (isValid) {
        const submitBtn = contactForm.querySelector('.submit-btn-glow');
        const btnText = submitBtn.querySelector('.btn-text');
        
        // Enable loader status
        submitBtn.classList.add('is-loading');
        btnText.textContent = 'Sending Message...';
        
        // Simulate API server call
        setTimeout(() => {
          submitBtn.classList.remove('is-loading');
          btnText.textContent = 'Message Sent';
          
          // Display success state overlay
          if (successOverlay) {
            successOverlay.classList.add('is-active');
            
            // GSAP pop animation on success overlay icon
            gsap.fromTo('.success-check-icon', 
              { scale: 0.3, rotation: -45, opacity: 0 },
              { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
            );
          }
        }, 1800);
      }
    });
  }

  // ============================================================
  // 3. CONTACT HERO SPECIFIC TIMELINES
  // ============================================================
  const heroBadge = document.querySelector('.contact-hero-badge');
  if (heroBadge) {
    gsap.fromTo(heroBadge,
      { opacity: 0, scale: 0.9, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.2 }
    );
  }

  // ============================================================
  // 4. MAP PARALLAX SCROLL
  // ============================================================
  const mapViewport = document.querySelector('.map-viewport-container');
  if (mapViewport) {
    // Parallax scroll on map frame
    gsap.fromTo(mapViewport,
      { clipPath: 'inset(10% 5% 10% 5% round 24px)', opacity: 0.7 },
      {
        clipPath: 'inset(0% 0% 0% 0% round 24px)',
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapViewport,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Parallax vertical movement on iframe
    const mapIframe = mapViewport.querySelector('iframe');
    if (mapIframe) {
      gsap.to(mapIframe, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: mapViewport,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }

  // ============================================================
  // 5. STAGGER REVEAL WHY FEATURE CARDS
  // ============================================================
  const featureCards = document.querySelectorAll('.why-feature-card');
  if (featureCards.length > 0) {
    gsap.fromTo(featureCards,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.why-grid-section',
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
});
