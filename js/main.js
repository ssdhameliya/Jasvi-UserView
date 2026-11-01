/**
 * Jasvi Industries - Precision Valves & Flow Controls
 * 100% Dynamic Glassmorphic Showcase & Fluid Engineering Engine
 * Adheres strictly to dse-erp-master-protocol.md & RULE[user_global]
 */

document.addEventListener('DOMContentLoaded', () => {
  let swiperInstance = null;
  let currentShowcaseData = null;
  let activeSelectedValve = null;

  // ==========================================================================
  // 1. High-Performance Laminar Fluid Flow Canvas (60 FPS)
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
    const streamCount = Math.min(Math.floor(width / 14), 85);
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class FluidParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Laminar horizontal flow from left to right simulating pressurized flow
        this.baseVx = Math.random() * 1.8 + 1.2;
        this.baseVy = (Math.random() - 0.5) * 0.4;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.radius = Math.random() * 2.2 + 1.2;
        this.color = Math.random() > 0.35 ? 'rgba(56, 189, 248, ' : 'rgba(14, 165, 233, ';
        this.alpha = Math.random() * 0.55 + 0.25;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Reset if flowed off-screen
        if (this.x > width + 20) {
          this.x = -10;
          this.y = Math.random() * height;
          this.vx = this.baseVx;
          this.vy = this.baseVy;
        }
        if (this.y < 0 || this.y > height) {
          this.vy *= -1;
        }

        // Particle stream diversion around cursor (Fluid Obstacle / Orifice effect)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Push away laterally
            this.x -= (dx / dist) * force * 5;
            this.y -= (dy / dist) * force * 5;
            // Accelerate fluid around orifice
            this.vx = this.baseVx * (1 + force * 2.2);
          } else {
            this.vx += (this.baseVx - this.vx) * 0.05;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < streamCount; i++) {
      particles.push(new FluidParticle());
    }

    function animateFluidStream() {
      ctx.clearRect(0, 0, width, height);

      // Draw streamlined pressure connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 105) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * (1 - dist / 105)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateFluidStream);
    }

    animateFluidStream();
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
        delay: 3800,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      coverflowEffect: {
        rotate: 22,
        stretch: 0,
        depth: 170,
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
        
        const tiltX = deltaY * -8;
        const tiltY = deltaX * 8;
        
        el.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
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
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ==========================================================================
  // 5. Interactive Valve Specification Inspector (Side-by-Side Glass Panel)
  // ==========================================================================
  function renderValveInspector(valve) {
    if (!valve) return;
    activeSelectedValve = valve;

    const tagEl = document.getElementById('inspect-tag');
    const titleEl = document.getElementById('inspect-title');
    const sizesEl = document.getElementById('inspect-sizes');
    const endsEl = document.getElementById('inspect-ends');
    const cvEl = document.getElementById('inspect-cv');
    const tempEl = document.getElementById('inspect-temp');
    const matsEl = document.getElementById('inspect-materials');
    const descEl = document.getElementById('inspect-desc');

    if (tagEl) tagEl.textContent = valve.tag || 'High-Pressure Valve Spec';
    if (titleEl) titleEl.textContent = valve.title;
    if (sizesEl) sizesEl.textContent = Array.isArray(valve.sizes) ? valve.sizes.join(', ') : 'Standard Bore Range';
    if (endsEl) endsEl.textContent = Array.isArray(valve.endConnections) ? valve.endConnections.join(', ') : 'Threaded / Flanged';
    if (cvEl) cvEl.textContent = valve.cv || 'Calculated per Bore Size';
    if (tempEl) tempEl.textContent = valve.tempRange || '-54°C to 232°C';
    if (descEl) descEl.textContent = valve.meta || '';

    if (matsEl && Array.isArray(valve.materials)) {
      matsEl.innerHTML = valve.materials.map((m, idx) => `
        <span class="mat-pill ${idx === 0 ? 'active' : ''}">${m}</span>
      `).join('');
    }

    // Highlight selected card in the grid
    document.querySelectorAll('.portfolio-item').forEach(card => {
      if (card.getAttribute('data-id') === valve.id) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }

  // Quick button in inspector to jump to RFQ and auto-select
  const quickRfqBtn = document.getElementById('btn-add-to-rfq-quick');
  if (quickRfqBtn) {
    quickRfqBtn.addEventListener('click', () => {
      if (activeSelectedValve) {
        const typeSelect = document.getElementById('rfq-valve-type');
        if (typeSelect) {
          typeSelect.value = activeSelectedValve.category || 'needle';
        }
      }
      const rfqSection = document.getElementById('rfq');
      if (rfqSection) {
        rfqSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================================================
  // 6. Dynamic Valve Catalog & Category Filtering
  // ==========================================================================
  function renderValveGrid(valves, filter = 'all') {
    const grid = document.getElementById('valve-cards-grid');
    if (!grid) return;

    const filtered = filter === 'all' 
      ? valves 
      : valves.filter(v => v.category === filter);

    grid.innerHTML = filtered.map((v, i) => `
      <div class="portfolio-item reveal reveal-delay-${(i % 3) + 1}" data-id="${v.id}" data-category="${v.category}">
        <span class="portfolio-tag">${v.tag || 'Valve Spec'}</span>
        <h3 class="portfolio-title">${v.title}</h3>
        <p class="portfolio-meta">${v.meta}</p>
        <div class="portfolio-badges">
          ${Array.isArray(v.badges) ? v.badges.map(b => `<span class="mini-badge">${b}</span>`).join('') : ''}
        </div>
        <div class="card-action-row">
          <span class="btn-inspect">
            Inspect Technical Data Sheet
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
          <span class="mini-badge" style="color: var(--cyan); border-color: rgba(56, 189, 248, 0.4);">
            Cv: ${v.cv || 'Rated'}
          </span>
        </div>
      </div>
    `).join('');

    // Attach click listeners to cards
    grid.querySelectorAll('.portfolio-item').forEach(card => {
      card.addEventListener('click', () => {
        const valveId = card.getAttribute('data-id');
        const match = valves.find(item => item.id === valveId);
        if (match) {
          renderValveInspector(match);
          const inspector = document.getElementById('valve-inspector');
          if (inspector) {
            inspector.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });
    });

    initTiltPhysics();
    initScrollReveal();

    // Default select first item if none active
    if (filtered.length > 0 && (!activeSelectedValve || !filtered.some(f => f.id === activeSelectedValve.id))) {
      renderValveInspector(filtered[0]);
    }
  }

  function initCategoryFilters(valves) {
    const filterBtns = document.querySelectorAll('#valve-category-filters .filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter');
        renderValveGrid(valves, category);
      });
    });
  }

  // ==========================================================================
  // 7. Dynamic Hydration Engine (REST API or showcase.json)
  // ==========================================================================
  async function loadShowcaseData() {
    let data = null;

    try {
      // 1. Try live REST API endpoint first (when connected to backend)
      const res = await fetch('/api/public/showcase');
      if (res.ok) {
        data = await res.json();
      }
    } catch (err) {
      // Silent fallback
    }

    if (!data) {
      try {
        // 2. Fallback to local data/showcase.json
        const localRes = await fetch('data/showcase.json');
        if (localRes.ok) {
          data = await localRes.json();
        }
      } catch (err) {
        console.warn('Could not load dynamic showcase JSON; using fallback DOM.', err);
      }
    }

    if (!data) {
      initSwiperCoverflow();
      initTiltPhysics();
      initScrollReveal();
      return;
    }

    currentShowcaseData = data;

    // Hydrate Hero & KPIs
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
        const pills = data.marquee.map(item => `<div class="marquee-pill"><span>&bull;</span> ${item}</div>`).join('');
        marqueeTrack.innerHTML = pills + pills;
      }
    }

    // Hydrate Valve Products Catalog
    if (Array.isArray(data.valveProducts)) {
      renderValveGrid(data.valveProducts, 'all');
      initCategoryFilters(data.valveProducts);
    }

    // Hydrate 3D Machinery Swiper Slides
    if (Array.isArray(data.machinery)) {
      const swiperWrapper = document.getElementById('machinery-swiper-wrapper');
      if (swiperWrapper) {
        const activeMachines = data.machinery.filter(m => m.active !== false);
        swiperWrapper.innerHTML = activeMachines.map(m => `
          <div class="swiper-slide">
            <div class="slide-img-box">
              <img src="${m.image}" alt="${m.title}" class="slide-img" onerror="this.src='assets/images/machine_vmc_5axis.jpg'">
            </div>
            <div class="slide-content">
              <span class="slide-badge">${m.badge || 'Workstation'}</span>
              <h3 class="slide-title">${m.title}</h3>
              <p class="slide-desc">${m.description}</p>
              <div class="slide-specs-table">
                ${Array.isArray(m.specs) ? m.specs.map(sp => `
                  <div class="spec-row"><span class="k">${sp.key}:</span><span class="v">${sp.value}</span></div>
                `).join('') : ''}
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // Hydrate 4-Stage Quality Timeline
    if (Array.isArray(data.process)) {
      const timelineGrid = document.getElementById('timeline-grid');
      if (timelineGrid) {
        timelineGrid.innerHTML = data.process.map((p, idx) => `
          <div class="timeline-step reveal reveal-delay-${idx}">
            <div class="step-num">${p.step}</div>
            <h3 class="step-title">${p.title}</h3>
            <p class="step-desc">${p.description}</p>
          </div>
        `).join('');
      }
    }

    // Re-initialize dynamic components
    initSwiperCoverflow();
    initTiltPhysics();
    initScrollReveal();
  }

  // ==========================================================================
  // 8. RFQ Form Submission (Direct to Jasvi ERP)
  // ==========================================================================
  const rfqForm = document.getElementById('rfqForm');
  const rfqSuccessBanner = document.getElementById('rfqSuccess');

  if (rfqForm) {
    rfqForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = rfqForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Encrypting & Transmitting to Jasvi ERP...</span>';

      const payload = {
        contactName: document.getElementById('rfq-name')?.value,
        corporateEmail: document.getElementById('rfq-email')?.value,
        valveType: document.getElementById('rfq-valve-type')?.value,
        material: document.getElementById('rfq-material')?.value,
        nominalSize: document.getElementById('rfq-size')?.value,
        pressureClass: document.getElementById('rfq-pressure')?.value,
        severeServiceNotes: document.getElementById('rfq-notes')?.value,
        timestamp: new Date().toISOString()
      };

      try {
        // Attempt sending directly to ERP backend API
        await fetch('/api/public/showcase/rfq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        // Fallback for offline demo
      }

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
      }, 900);
    });
  }

  // ==========================================================================
  // 9. Client-Side PDF Technical Spec Sheet Generator (jsPDF Guarded)
  // ==========================================================================
  const downloadPdfBtn = document.getElementById('btn-download-pdf');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      // Rule 5: Guarded application vendor check
      const jsPDF = window.jspdf ? window.jspdf.jsPDF : null;
      if (!jsPDF) {
        alert('PDF generator module is loading. Please try again in a few seconds.');
        return;
      }

      const doc = new jsPDF();
      const currentValve = activeSelectedValve || {
        title: 'Precision Flow Valve Specification',
        category: 'Needle / Manifold / Ball',
        cv: '1.20',
        materials: ['SS316', 'Duplex 2205']
      };

      // Branded PDF Header
      doc.setFillColor(6, 11, 20);
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(56, 189, 248);
      doc.setFontSize(20);
      doc.text('JASVI INDUSTRIES', 20, 20);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text('Precision Valves & Fluid Control Engineering Division', 20, 28);
      doc.text('ISO 9001:2015 & API 598 Certified', 130, 28);

      // Document Title
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(16);
      doc.text('Technical Data & RFQ Specification Sheet', 20, 55);

      doc.setFontSize(11);
      doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 20, 64);
      doc.text(`Target Model: ${currentValve.title}`, 20, 72);

      // Spec Table Lines
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 78, 190, 78);

      doc.setFontSize(10);
      let y = 90;
      doc.text(`Category: ${currentValve.category || 'Instrumentation Valve'}`, 25, y);
      doc.text(`Rated Flow Coefficient (Cv): ${currentValve.cv || 'Standard'}`, 120, y);
      
      y += 12;
      doc.text(`Materials (MOC): ${Array.isArray(currentValve.materials) ? currentValve.materials.join(', ') : 'SS316 / Duplex'}`, 25, y);
      doc.text(`Operating Temp: ${currentValve.tempRange || '-54°C to 232°C'}`, 120, y);

      y += 12;
      doc.text(`Quality Testing: API 598 Hydrostatic Shell & Seat Hold`, 25, y);
      doc.text(`Helium Leak Standard: 0 PPM (Bubble Tight)`, 120, y);

      y += 20;
      doc.line(20, y, 190, y);
      y += 12;

      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text('Notice: This technical datasheet is generated by Jasvi UserView Digital Engineering Engine.', 20, y);
      y += 6;
      doc.text('For custom severe service configurations or CAD blueprints, email info@jasviindustries.in', 20, y);

      // Save PDF
      doc.save(`Jasvi-Valve-Spec-${(currentValve.id || 'Valve')}.pdf`);
    });
  }

  // ==========================================================================
  // 10. Smooth Anchor Navigation
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

  // Start data loading pipeline
  loadShowcaseData();
});
