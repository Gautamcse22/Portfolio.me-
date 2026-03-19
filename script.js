/* =============================================
   PORTFOLIO - SCRIPT.JS
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // 1. NAVBAR — scroll + active
  // ===========================
  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Sticky style
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
  
  // ===========================
  // 2. HAMBURGER MENU
  // ===========================
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navLinks');
  const navCta    = document.querySelector('.nav-cta');

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    // Show "Hire Me" inside mobile menu
    if (isOpen && navCta) navMenu.appendChild(navCta.cloneNode(true));
  });

  // Close on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  // ===========================
  // 3. HERO ENTRANCE ANIMATION
  // ===========================
  const heroAnimEls = document.querySelectorAll('.animate-up, .animate-right');
  setTimeout(() => heroAnimEls.forEach(el => el.classList.add('in')), 200);

  // ===========================
  // 4. SCROLL REVEAL
  // ===========================
  const revealEls = document.querySelectorAll(
    '.about-grid, .skill-card, .project-card, .timeline-item, .contact-grid, .section-header'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ===========================
  // 5. SKILL BARS ANIMATION
  // ===========================
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(bar => skillObserver.observe(bar));

  // ===========================
  // 6. SKILLS TABS
  // ===========================
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(target).classList.add('active');

      // Re-animate skill bars in new tab
      document.querySelectorAll(`#${target} .skill-fill`).forEach(bar => {
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 100);
      });
    });
  });

  // ===========================
  // 7. PROJECTS FILTER
  // ===========================
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        }
      });
    });
  });

  // ===========================
  // 8. EXPERIENCE TABS
  // ===========================
  const expTabs      = document.querySelectorAll('.exp-tab');
  const timelines    = document.querySelectorAll('.timeline');

  expTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.exp;

      expTabs.forEach(b => b.classList.remove('active'));
      timelines.forEach(t => t.classList.add('hidden'));

      btn.classList.add('active');
      document.getElementById(target).classList.remove('hidden');
    });
  });

  // ===========================
  // 9. CONTACT FORM
  // ===========================
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate async send
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        formSuccess.classList.remove('hidden');
        setTimeout(() => formSuccess.classList.add('hidden'), 5000);
      }, 1500);
    });
  }

  // ===========================
  // 10. SMOOTH ANCHOR SCROLL
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 12;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  // ===========================
  // 11. STAT NUMBER COUNTER
  // ===========================
  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.textContent);
      const suffix = el.textContent.replace(/[0-9]/g, '');
      if (isNaN(end)) return;
      let start = 0;
      const step = Math.ceil(end / 40);
      const timer = setInterval(() => {
        start = Math.min(start + step, end);
        el.textContent = start + suffix;
        if (start >= end) clearInterval(timer);
      }, 35);
      counterObserver.unobserve(el);
    });
  }, { threshold: 1 });

  statNums.forEach(el => counterObserver.observe(el));

  // ===========================
  // 12. CURSOR GLOW (Desktop)
  // ===========================
  if (window.matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      pointer-events:none; position:fixed; z-index:9999; border-radius:50%;
      width:360px; height:360px; margin:-180px 0 0 -180px;
      background:radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
      transition:left 0.25s ease, top 0.25s ease;
    `;
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

});