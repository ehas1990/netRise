// ============================================================
// NEXRISE — Digital Agency Website JavaScript
// ============================================================

(function () {
  "use strict";

  // ============================================================
  // 1. PAGE LOADER
  // ============================================================
  const loader = document.getElementById("page-loader");

  // Use DOMContentLoaded instead of load so it doesn't wait for all images
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (loader) loader.classList.add("hidden");
      document.body.classList.add("loaded");
      // Trigger hero image reveal
      revealHeroImages();
    }, 1200); // slightly faster
  });

  // ============================================================
  // 2. CUSTOM CURSOR
  // ============================================================
  const cursor = document.getElementById("cursor");
  const cursorDot = cursor?.querySelector(".cursor__dot");
  const cursorText = cursor?.querySelector(".cursor__text");

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;
  let rafId = null;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) animateCursor();
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;
    if (cursor) {
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
    }
    rafId = requestAnimationFrame(animateCursor);
  }

  // Cursor interactions
  document.querySelectorAll("a, button, .service-item, .blog-item, .works-item, .nav-item__header").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor?.classList.add("cursor--expanded"));
    el.addEventListener("mouseleave", () => {
      cursor?.classList.remove("cursor--expanded");
      cursor?.classList.remove("cursor--text");
      if (cursorText) cursorText.textContent = "";
    });
  });

  document.querySelectorAll("[data-cursor-text]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const text = el.getAttribute("data-cursor-text");
      if (cursorText) cursorText.textContent = text;
      cursor?.classList.add("cursor--text");
    });
    el.addEventListener("mouseleave", () => {
      if (cursorText) cursorText.textContent = "";
      cursor?.classList.remove("cursor--text");
    });
  });

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => { if (cursor) cursor.style.opacity = "0"; });
  document.addEventListener("mouseenter", () => { if (cursor) cursor.style.opacity = "1"; });

  // ============================================================
  // 3. HEADER SCROLL BEHAVIOR
  // ============================================================
  const header = document.getElementById("header");
  let lastScrollY = 0;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
    lastScrollY = scrollY;
  }, { passive: true });

  // ============================================================
  // 4. THEME TOGGLE (DARK/LIGHT MODE)
  // ============================================================
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.getElementById("html-root");
  const themeLabel = themeToggle?.querySelector(".theme-toggle__label");
  const themeIcon = themeToggle?.querySelector(".theme-toggle__icon i");

  let isDark = false;

  // Check saved preference
  const savedTheme = localStorage.getItem("nexrise-theme");
  if (savedTheme === "dark") {
    applyDark();
  }

  themeToggle?.addEventListener("click", () => {
    isDark ? applyLight() : applyDark();
  });

  function applyDark() {
    isDark = true;
    document.body.setAttribute("data-theme", "dark");
    if (themeLabel) themeLabel.textContent = "Day";
    if (themeIcon) { themeIcon.classList.remove("ph-moon-stars"); themeIcon.classList.add("ph-sun"); }
    themeToggle?.setAttribute("aria-pressed", "true");
    localStorage.setItem("nexrise-theme", "dark");
  }

  function applyLight() {
    isDark = false;
    document.body.setAttribute("data-theme", "light");
    if (themeLabel) themeLabel.textContent = "Night";
    if (themeIcon) { themeIcon.classList.remove("ph-sun"); themeIcon.classList.add("ph-moon-stars"); }
    themeToggle?.setAttribute("aria-pressed", "false");
    localStorage.setItem("nexrise-theme", "light");
  }

  // ============================================================
  // 5. FULLSCREEN NAVIGATION
  // ============================================================
  const menuToggle = document.getElementById("menu-toggle");
  const fullscreenNav = document.getElementById("fullscreen-nav");
  let navOpen = false;

  menuToggle?.addEventListener("click", toggleNav);

  // Close when clicking backdrop or close button
  fullscreenNav?.querySelector(".nav-backdrop")?.addEventListener("click", closeNav);
  fullscreenNav?.querySelector(".nav-close-btn")?.addEventListener("click", closeNav);

  // Nav accordion
  document.querySelectorAll(".nav-item__header").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.closest(".nav-item");
      if (!item || item.classList.contains("nav-item--link")) return;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".nav-item.open").forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  function toggleNav() {
    navOpen ? closeNav() : openNav();
  }

  function openNav() {
    navOpen = true;
    fullscreenNav?.classList.add("active");
    fullscreenNav?.removeAttribute("aria-hidden");
    menuToggle?.classList.add("active");
    menuToggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    navOpen = false;
    fullscreenNav?.classList.remove("active");
    fullscreenNav?.setAttribute("aria-hidden", "true");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  // Close nav when clicking a nav link
  fullscreenNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // ESC key closes nav
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navOpen) closeNav();
  });

  // ============================================================
  // 6. HERO ANIMATION TRIGGERS
  // ============================================================
  function revealHeroImages() {
    // Left empty or can be used for other hero animations
    const title = document.getElementById("hero-title");
    if(title) title.classList.add("animate-in");
  }

  // ============================================================
  // 7. WORKS SHOWCASE — BG IMAGE SWITCHER
  // ============================================================
  const worksItems = document.querySelectorAll(".works-item");
  const worksBgImgs = document.querySelectorAll(".works-bg-img");

  worksItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const idx = parseInt(item.getAttribute("data-index")) || 0;
      worksBgImgs.forEach((bg) => bg.classList.remove("active"));
      if (worksBgImgs[idx]) worksBgImgs[idx].classList.add("active");
    });
  });

  // ============================================================
  // 8. INTERSECTION OBSERVER — PREMIUM SCROLL ANIMATIONS
  // ============================================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          // Optionally unobserve after animating
          // revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".premium-reveal, .text-mask").forEach((el) => {
    revealObserver.observe(el);
  });

  // Automatically add reveal classes to certain elements that don't have them yet
  const autoRevealSelectors = [
    ".service-item",
    ".testimonial-card",
    ".blog-item",
    ".stat-item"
  ];

  autoRevealSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if(!el.classList.contains("premium-reveal")) {
        el.classList.add("premium-reveal");
        if (i % 3 === 1) el.classList.add("delay-1");
        if (i % 3 === 2) el.classList.add("delay-2");
        revealObserver.observe(el);
      }
    });
  });

  // ============================================================
  // 8.1 MAGNETIC BUTTONS & GLOW CARDS
  // ============================================================
  const magneticBtns = document.querySelectorAll(".magnetic-btn");
  
  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });

  // Track mouse for glow cards
  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".glow-card").forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // ============================================================
  // 9. COUNTER ANIMATION
  // ============================================================
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target")) || 0;
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  }

  // ============================================================
  // 10. SMOOTH SCROLL
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href === "#0") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });

  // ============================================================
  // 11. MARQUEE PAUSE ON HOVER
  // ============================================================
  const marqueeContent = document.querySelector(".marquee-content");
  const marqueeSection = document.querySelector(".marquee-section");

  marqueeSection?.addEventListener("mouseenter", () => {
    if (marqueeContent) marqueeContent.style.animationPlayState = "paused";
  });

  marqueeSection?.addEventListener("mouseleave", () => {
    if (marqueeContent) marqueeContent.style.animationPlayState = "running";
  });

  // ============================================================
  // 12. SECTION TITLE TEXT REVEAL ON SCROLL
  // ============================================================
  // This is now handled by .text-mask and .premium-reveal in CSS/JS above.


  // ============================================================
  // 13. SERVICE ITEM — HOVER CURSOR IMAGE
  // ============================================================
  const serviceImages = [
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=400&fit=crop",
  ];

  document.querySelectorAll(".service-item").forEach((item, i) => {
    item.setAttribute("data-cursor-text", "View →");
  });

  console.log("%cNexRise — Rise to the Next Level", "font-size:1.2rem;font-weight:bold;color:#2563eb;");
  console.log("%cWeb Development | Digital Marketing | Growth Solutions", "font-size:0.8rem;color:#6b7280;");

})();
