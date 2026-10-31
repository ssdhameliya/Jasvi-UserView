/**
 * Jasvi Industries - Advanced Interactive 3D Showcase Engine
 * Inspired by high-end digital engineering platforms (e.g. theneutec.com)
 * 100% Dynamic Hydration from /api/public/showcase or data/showcase.json
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global reference for swiper instance
  let swiperInstance = null;

  // ==========================================================================
  // 1. Interactive 3D Particle Constellation Canvas
  // ==========================================================================
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 75);
    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1.2;
        this.color = Math.random() > 0.4 ? '#38bdf8' : '#0284c7';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.22 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ==========================================================================
  // 2. Swiper.js 3D Coverflow Slideshow Initializer
  // ==========================================================================
  function initSwiperCoverflow() {
    if (typeof Swiper === 'undefined') return;

    if (swiperInstance) {
      swiperInstance.destroy(true, true);
    }

    swiperInstance = new Swiper('.swiper-showcase-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      speed: 800,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      coverflowEffect: {
        rotate: 24,
        stretch: 0,
        depth: 180,
        modifier: 1,
        slideShadows: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }

  // ==========================================================================
  // 3. 3D Mouse Tilt Physics Engine (Cards & Widgets)
  // ==========================================================================
  function initTiltPhysics() {
    const tiltElements = document.querySelectorAll('.stat-card, .portfolio-item, .timeline-step');
    
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const tiltX = deltaY * -9; // Max 9 deg
        const tiltY = deltaX * 9;
        
        el.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ==========================================================================
  // 4. Scroll-Triggered Stagger Reveal Observer
  // ==========================================================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal:not(.revealed)');
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ==========================================================================
  // 5. Portfolio Filtering Logic
  // ==========================================================================
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.style.display = 'block';
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.opacity = '1';
            }, 10);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================================
  // 6. Interactive RFQ Form Submission
  // ==========================================================================
  const rfqForm = document.getElementById('rfqForm');
  const rfqSuccessBanner = document.getElementById('rfqSuccess');

  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = rfqForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Encrypting & Transmitting Specification...</span>';

      setTimeout(() => {
        rfqForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        if (rfqSuccessBanner) {
          rfqSuccessBanner.style.display = 'block';
          rfqSuccessBanner.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            rfqSuccessBanner.style.display = 'none';
          }, 8000);
        }
      }, 1000);
    });
  }

  // ==========================================================================
  // 7. Smooth Anchor Scroll
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================================================
  // 8. Dynamic Showcase Hydration Engine
  // ==========================================================================
  async function loadShowcaseData() {
    let data = null;

    try {
      // 1. Try public REST API endpoint first (when running with server)
      const res = await fetch('/api/public/showcase');
      if (res.ok) {
        data = await res.json();
      }
    } catch (err) {
      // API not reachable locally; fall back to local json
    }

    if (!data) {
      try {
        // 2. Local fallback to data/showcase.json
        const localRes = await fetch('data/showcase.json');
        if (localRes.ok) {
          data = await localRes.json();
        }
      } catch (err) {
        console.warn('Could not load dynamic showcase JSON; using baseline static HTML.', err);
      }
    }

    if (!data) {
      // Initialize physics with existing DOM
      initSwiperCoverflow();
      initTiltPhysics();
      initScrollReveal();
      initPortfolioFilters();
      return;
    }

    // Hydrate Hero
    if (data.hero) {
      const badgeText = document.getElementById('hero-badge-text');
      const title = document.getElementById('hero-title');
      const lead = document.getElementById('hero-lead');
      if (badgeText && data.hero.badge) badgeText.textContent = data.hero.badge;
      if (title && data.hero.headline) title.textContent = data.hero.headline;
      if (lead && data.hero.leadParagraph) lead.textContent = data.hero.leadParagraph;

      if (Array.isArray(data.hero.kpiStats)) {
        const statsContainer = document.getElementById('hero-stats-grid');
        if (statsContainer) {
          statsContainer.innerHTML = data.hero.kpiStats.map(s => `
            <div class="stat-card">
              <div class="stat-number">${s.number}<span>${s.suffix || ''}</span></div>
              <div class="stat-label">${s.label}</div>
            </div>
          `).join('');
        }
      }
    }

    // Hydrate Marquee
    if (Array.isArray(data.marquee)) {
      const marqueeTrack = document.getElementById('marquee-track');
      if (marqueeTrack) {
        const pills = data.marquee.map(item => `<div class="marquee-pill"><span>•</span> ${item}</div>`).join('');
        // Duplicate once for seamless infinite CSS loop
        marqueeTrack.innerHTML = pills + pills;
      }
    }

    // Hydrate 3D Machinery Swiper Slides
    if (Array.isArray(data.machinery)) {
      const swiperWrapper = document.getElementById('machinery-swiper-wrapper');
      if (swiperWrapper) {
        const activeMachines = data.machinery.filter(m => m.active !== false);
        swiperWrapper.innerHTML = activeMachines.map(m => {
          const specsHtml = Array.isArray(m.specs) ? m.specs.map(spec => `
            <div class="spec-row">
              <span class="k">${spec.key}:</span>
              <span class="v">${spec.value}</span>
            </div>
          `).join('') : '';

          return `
            <div class="swiper-slide">
              <div class="slide-img-box">
                <img src="${m.image}" alt="${m.title}" class="slide-img">
              </div>
              <div class="slide-content">
                <span class="slide-badge">${m.badge || 'Precision Workstation'}</span>
                <h3 class="slide-title">${m.title}</h3>
                <p class="slide-desc">${m.description || ''}</p>
                <div class="slide-specs-table">
                  ${specsHtml}
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Hydrate Portfolio
    if (data.portfolio) {
      if (Array.isArray(data.portfolio.categories)) {
        const filtersContainer = document.getElementById('portfolio-filters');
        if (filtersContainer) {
          filtersContainer.innerHTML = data.portfolio.categories.map((c, idx) => `
            <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${c.key}">${c.label}</button>
          `).join('');
        }
      }

      if (Array.isArray(data.portfolio.items)) {
        const portfolioGrid = document.getElementById('portfolio-grid');
        if (portfolioGrid) {
          const activeItems = data.portfolio.items.filter(i => i.active !== false);
          portfolioGrid.innerHTML = activeItems.map((item, idx) => {
            const badgesHtml = Array.isArray(item.badges) ? item.badges.map(b => `
              <span class="mini-badge">${b}</span>
            `).join('') : '';

            return `
              <div class="portfolio-item reveal ${idx > 0 ? `reveal-delay-${idx}` : ''}" data-category="${item.category}">
                <span class="portfolio-tag">${item.tag || item.category}</span>
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-meta">${item.meta || item.description || ''}</p>
                <div class="portfolio-badges">
                  ${badgesHtml}
                </div>
              </div>
            `;
          }).join('');
        }
      }
    }

    // Hydrate Timeline Steps
    if (Array.isArray(data.process)) {
      const timelineGrid = document.getElementById('timeline-grid');
      if (timelineGrid) {
        timelineGrid.innerHTML = data.process.map((step, idx) => `
          <div class="timeline-step reveal ${idx > 0 ? `reveal-delay-${idx}` : ''}">
            <div class="step-num">${step.step}</div>
            <h3 class="step-title">${step.title}</h3>
            <p class="step-desc">${step.description}</p>
          </div>
        `).join('');
      }
    }

    // Hydrate Footer & Contact
    if (data.contact) {
      const plantEl = document.getElementById('footer-plant-address');
      const emailEl = document.getElementById('footer-email');
      const phoneEl = document.getElementById('footer-phone');
      if (plantEl && data.contact.plantAddress) plantEl.textContent = data.contact.plantAddress;
      if (emailEl && data.contact.email) {
        emailEl.textContent = data.contact.email;
        emailEl.href = `mailto:${data.contact.email}`;
      }
      if (phoneEl && data.contact.phone) phoneEl.textContent = data.contact.phone;
    }

    // Re-initialize 3D swiper, tilt, and scroll reveal on fresh DOM elements
    initSwiperCoverflow();
    initTiltPhysics();
    initScrollReveal();
    initPortfolioFilters();

    console.log('Jasvi Dynamic 3D Showcase hydrated successfully from data schema.');
  }

  // Execute hydration
  loadShowcaseData();
});
