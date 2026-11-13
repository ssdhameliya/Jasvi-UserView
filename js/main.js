/**
 * Jasvi Industries - UserView Showcase Main Controller
 * "Obsidian CAD & Precision Flow Dynamics"
 * MotionSites.ai x ReactBits.dev High-Precision Physics & Telemetry Engine
 */

(function () {
  'use strict';

  // Global State
  let showcaseData = null;
  let activeCategory = 'all';
  let activeValveId = 'prod-ball-valve';
  let activeClass = '150';
  let activeUnit = 'mm'; // 'mm' or 'in'
  let rfqCart = JSON.parse(localStorage.getItem('jasvi_rfq_cart') || '[]');

  /* ==========================================================================
     1. Canvas Flow Dynamics Simulator (60fps GPU Fluid Particle Stream)
     ========================================================================== */
  class CanvasFlowSimulator {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.particleCount = 110;
      this.speedMultiplier = 1.0;
      this.flowHue = 185; // Laser cyan base
      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push(this.createParticle());
      }
      this.animate();
    }

    resize() {
      this.width = this.canvas.width = this.canvas.offsetWidth;
      this.height = this.canvas.height = this.canvas.offsetHeight;
    }

    createParticle() {
      return {
        x: Math.random() * (this.width || 800),
        y: Math.random() * (this.height || 600),
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() * 2.5 + 1.2),
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.6 + 0.2,
        length: Math.random() * 24 + 8
      };
    }

    setPressure(psi) {
      this.speedMultiplier = 0.5 + (psi / 2500) * 2.5;
      if (psi > 1800) {
        this.flowHue = 35; // Molten amber
      } else if (psi > 900) {
        this.flowHue = 160; // Teal
      } else {
        this.flowHue = 185; // Cyan
      }
    }

    animate() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.ctx.lineWidth = 1.2;
      for (let p of this.particles) {
        p.x += p.speedX * this.speedMultiplier;
        p.y += p.speedY * this.speedMultiplier;

        if (p.x > this.width + 50) p.x = -50;
        if (p.y > this.height + 20) p.y = -20;
        if (p.y < -20) p.y = this.height + 20;

        this.ctx.strokeStyle = `hsla(${this.flowHue}, 100%, 55%, ${p.opacity})`;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x - p.length * this.speedMultiplier, p.y);
        this.ctx.stroke();
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  /* ==========================================================================
     2. ReactBits Magnetic Spotlight & 3D Perspective Tilt Physics
     ========================================================================== */
  function initSpotlightPhysics() {
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.product-card, .bento-card, .valve-3d-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
      });
    });

    const heroCard = document.querySelector('.valve-3d-card');
    if (heroCard) {
      heroCard.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        const rotateX = -deltaY * 10;
        const rotateY = deltaX * 10;

        heroCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      heroCard.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    }
  }

  /* ==========================================================================
     3. Telemetry HUD Slider Controller
     ========================================================================== */
  function initHudSlider(flowSimulator) {
    const slider = document.getElementById('hud-pressure-slider');
    const readout = document.getElementById('hud-pressure-readout');
    const velMetric = document.getElementById('hud-flow-velocity');
    const tempMetric = document.getElementById('hud-thermal-rating');

    if (!slider) return;

    slider.addEventListener('input', (e) => {
      const psi = parseInt(e.target.value, 10);
      if (readout) readout.textContent = `${psi.toLocaleString()} PSI`;
      
      const velocity = (12 + (psi / 2500) * 48).toFixed(1);
      if (velMetric) velMetric.textContent = `${velocity} m/s`;

      const temp = Math.round(180 + (psi / 2500) * 320);
      if (tempMetric) tempMetric.textContent = `${temp}°C`;

      if (flowSimulator) {
        flowSimulator.setPressure(psi);
      }
    });
  }

  /* ==========================================================================
     4. Data Ingestion & Showcase Hydration (15 Industrial Valve Lines)
     ========================================================================== */
  function getProductList() {
    if (!showcaseData) return [];
    return showcaseData.valveProducts || showcaseData.products || [];
  }

  async function loadShowcaseData() {
    try {
      const response = await fetch('data/showcase.json');
      showcaseData = await response.json();
      renderShowcaseCards();
      initWorkbench();
      updateRfqCounter();
      checkDetailPageRouting();
    } catch (err) {
      console.error('Failed to load showcase data:', err);
    }
  }

  function renderShowcaseCards() {
    const grid = document.getElementById('showcase-grid');
    const products = getProductList();
    if (!grid || products.length === 0) return;

    const filtered = products.filter(p => {
      if (activeCategory === 'all') return true;
      return p.category === activeCategory;
    });

    grid.innerHTML = filtered.map(valve => {
      const name = valve.title || valve.name || 'Industrial Valve';
      const desc = valve.meta ? valve.meta.description : (valve.description || 'High-pressure severe-service precision industrial valve.');
      const designStd = valve.standards ? (valve.standards.design || 'ASME B16.34') : 'ASME B16.34';
      const sizeStr = valve.sizes ? `${valve.sizes.min} - ${valve.sizes.max}` : (valve.standards ? valve.standards.size_range : '1/2" - 12"');
      const bodyMat = valve.bom ? (valve.bom.body || 'ASTM A216 WCB') : 'ASTM A216 WCB';
      const img = valve.image || 'assets/images/hero_valve_ball.jpg';

      return `
        <div class="product-card" data-id="${valve.id}">
          <div>
            <div class="card-top-header">
              <span class="category-badge">${valve.category.replace('-', ' ')}</span>
              <span class="cert-badge">${designStd}</span>
            </div>

            <div class="card-img-wrap">
              <img src="${img}" alt="${name}" class="card-valve-img" />
            </div>

            <div class="card-info">
              <h3 class="card-valve-title">${name}</h3>
              <p class="card-valve-desc">${desc}</p>
              
              <div class="card-spec-tags">
                <span class="spec-tag">${sizeStr}</span>
                <span class="spec-tag">${bodyMat}</span>
                <span class="spec-tag">${valve.tag || 'Precision Valve'}</span>
              </div>
            </div>
          </div>

          <div class="card-actions-row">
            <a href="product-detail.html?id=${valve.id}" class="btn-card-matrix">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              CAD Matrix
            </a>
            <button class="btn-card-rfq" onclick="window.JasviApp.addToCart('${valve.id}', '${name.replace(/'/g, "\'")}')" title="Add to RFQ Requisition Basket">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>
              RFQ
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function initCategoryFilters() {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCategory = chip.getAttribute('data-category');
        renderShowcaseCards();
      });
    });
  }

  /* ==========================================================================
     5. CAD Dimensional Matrix Workbench 2.0
     ========================================================================== */
  function initWorkbench() {
    const products = getProductList();
    if (products.length === 0) return;
    const valve = products.find(p => p.id === activeValveId) || products[0];
    if (!valve) return;

    renderMatrixTable(valve);
    updateCadSchematic(valve);

    const classBtns = document.querySelectorAll('.class-tab-btn');
    classBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        classBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeClass = btn.getAttribute('data-class');
        renderMatrixTable(valve);
      });
    });

    const unitBtns = document.querySelectorAll('.unit-btn');
    unitBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        unitBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeUnit = btn.getAttribute('data-unit');
        renderMatrixTable(valve);
      });
    });
  }

  function renderMatrixTable(valve) {
    const tbody = document.getElementById('matrix-table-body');
    if (!tbody || !valve.dimensions) return;

    const classKey = `class_${activeClass}`;
    const dims = valve.dimensions[classKey] || [];

    if (dims.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:24px; color:var(--text-muted);">No dimensional matrix for Class ${activeClass}#</td></tr>`;
      return;
    }

    const conversionFactor = activeUnit === 'in' ? (1 / 25.4) : 1;
    const formatVal = (val) => {
      if (typeof val !== 'number') return val;
      const converted = val * conversionFactor;
      return activeUnit === 'in' ? converted.toFixed(2) : converted.toFixed(1);
    };

    tbody.innerHTML = dims.map((row, idx) => `
      <tr class="${idx === 0 ? 'selected' : ''}" onclick="window.JasviApp.selectMatrixRow(this, ${JSON.stringify(row).replace(/"/g, '&quot;')})">
        <td style="font-weight:700; color:var(--laser-cyan);">${row.size_inch} (${row.size_mm} mm)</td>
        <td>${formatVal(row.L)}</td>
        <td>${formatVal(row.H)}</td>
        <td>${formatVal(row.W)}</td>
        <td>${formatVal(row.D)}</td>
        <td>${row.holes || 4}</td>
        <td style="font-weight:700; color:var(--laser-teal);">${row.weight_kg ? (activeUnit === 'in' ? (row.weight_kg * 2.20462).toFixed(1) + ' lbs' : row.weight_kg + ' kg') : '-'}</td>
      </tr>
    `).join('');

    if (dims.length > 0) {
      updateCadStats(dims[0]);
    }
  }

  function updateCadStats(row) {
    const elSize = document.getElementById('cad-stat-size');
    const elL = document.getElementById('cad-stat-l');
    const elH = document.getElementById('cad-stat-h');
    const elWt = document.getElementById('cad-stat-wt');

    const conv = activeUnit === 'in' ? (1 / 25.4) : 1;
    const unitLabel = activeUnit === 'in' ? 'in' : 'mm';

    if (elSize) elSize.textContent = `${row.size_inch}`;
    if (elL) elL.textContent = `${(row.L * conv).toFixed(1)} ${unitLabel}`;
    if (elH) elH.textContent = `${(row.H * conv).toFixed(1)} ${unitLabel}`;
    if (elWt) elWt.textContent = `${row.weight_kg || 15} kg`;
  }

  function updateCadSchematic(valve) {
    const titleEl = document.getElementById('cad-valve-name');
    const name = valve.title || valve.name || 'Valve';
    if (titleEl) titleEl.textContent = `${name.toUpperCase()} // ASME B16.34 CAD SCHEMATIC`;
  }

  /* ==========================================================================
     6. Product Detail URL Routing
     ========================================================================== */
  function checkDetailPageRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return;

    const products = getProductList();
    const valve = products.find(p => p.id === id);
    if (!valve) return;

    activeValveId = valve.id;
    const titleEl = document.getElementById('detail-title');
    const descEl = document.getElementById('detail-desc');
    const imgEl = document.getElementById('detail-valve-img');

    if (titleEl) titleEl.textContent = valve.title || valve.name;
    if (descEl) descEl.textContent = valve.meta ? valve.meta.description : (valve.description || '');
    if (imgEl && valve.image) imgEl.src = valve.image;

    initWorkbench();
  }

  /* ==========================================================================
     7. AI Industrial Valve Selection Copilot 2.0
     ========================================================================== */
  function initCopilot() {
    const input = document.getElementById('copilot-query-input');
    const sendBtn = document.getElementById('copilot-send-btn');
    const resultBox = document.getElementById('copilot-result-box');
    const chips = document.querySelectorAll('.copilot-chip');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        if (input) {
          input.value = chip.textContent.trim();
          executeCopilotSearch(input.value);
        }
      });
    });

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => {
        executeCopilotSearch(input.value);
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') executeCopilotSearch(input.value);
      });
    }

    function executeCopilotSearch(query) {
      const products = getProductList();
      if (!query || products.length === 0 || !resultBox) return;
      const q = query.toLowerCase();

      let matched = products[0];
      let confidence = 94;
      let reason = 'Matched standard high-pressure isolation service.';

      if (q.includes('steam') || q.includes('450') || q.includes('thermal')) {
        matched = products.find(p => p.id === 'prod-globe-valve' || p.id === 'prod-forged-globe') || matched;
        confidence = 98;
        reason = 'BS 1873 Cast Steel Globe Valve with Stellite trim for continuous throttling and high-temperature steam lines.';
      } else if (q.includes('slurry') || q.includes('pulp') || q.includes('fiber')) {
        matched = products.find(p => p.id === 'prod-knife-gate-valve' || p.id === 'prod-pulp-valve') || matched;
        confidence = 99;
        reason = 'MSS SP-81 Bi-directional Knife Edge Gate Valve with sharpened beveled gate for cutting pulp fibers.';
      } else if (q.includes('crude') || q.includes('sour') || q.includes('nace')) {
        matched = products.find(p => p.id === 'prod-ball-valve' || p.id === 'prod-3pc-ball') || matched;
        confidence = 97;
        reason = 'API 6D Trunnion Mounted Ball Valve with NACE MR0175 compliance and dual seal barrier.';
      } else if (q.includes('non-return') || q.includes('check') || q.includes('pump')) {
        matched = products.find(p => p.id === 'prod-dual-plate-check' || p.id === 'prod-swing-check') || matched;
        confidence = 96;
        reason = 'Dual Plate Wafer Check Valve with rapid spring-assisted closure preventing water hammer in pump discharge.';
      }

      const mName = matched.title || matched.name;
      const mStd = matched.standards ? (matched.standards.design || 'API 6D') : 'API 6D';
      const mBody = matched.bom ? (matched.bom.body || 'ASTM A216 WCB') : 'ASTM A216 WCB';

      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
          <div>
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--laser-teal); font-weight:700; margin-bottom:4px;">
              MATCH VERIFIED (${confidence}% CONFIDENCE)
            </div>
            <h4 style="font-family:var(--font-heading); font-size:1.15rem; color:var(--text-titanium); font-weight:700;">
              ${mName}
            </h4>
          </div>
          <a href="product-detail.html?id=${matched.id}" class="btn-card-matrix" style="padding:6px 14px;">
            Open CAD Lab &rarr;
          </a>
        </div>
        <p style="font-size:0.86rem; color:var(--text-secondary); line-height:1.6; margin-bottom:10px;">
          ${reason}
        </p>
        <div style="display:flex; gap:8px; font-family:var(--font-mono); font-size:0.74rem;">
          <span class="spec-tag" style="color:var(--laser-cyan);">${mStd}</span>
          <span class="spec-tag">${mBody}</span>
          <span class="spec-tag">${matched.category}</span>
        </div>
      `;
    }
  }

  /* ==========================================================================
     8. Slide-Over RFQ Requisition Basket
     ========================================================================== */
  function initRfqDrawer() {
    const trigger = document.getElementById('dock-rfq-btn');
    const overlay = document.getElementById('rfq-drawer-overlay');
    const drawer = document.getElementById('rfq-drawer');
    const closeBtn = document.getElementById('drawer-close-btn');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    function openDrawer() {
      if (overlay) overlay.classList.add('open');
      if (drawer) drawer.classList.add('open');
      renderRfqItems();
    }

    function closeDrawer() {
      if (overlay) overlay.classList.remove('open');
      if (drawer) drawer.classList.remove('open');
    }

    window.JasviApp.openRfqDrawer = openDrawer;
  }

  function updateRfqCounter() {
    const countEls = document.querySelectorAll('.rfq-badge');
    const count = rfqCart.length;
    countEls.forEach(el => {
      el.textContent = count;
    });
  }

  function renderRfqItems() {
    const container = document.getElementById('drawer-items-list');
    if (!container) return;

    if (rfqCart.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:48px 20px; color:var(--text-muted); font-family:var(--font-mono); font-size:0.88rem;">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 12px; opacity:0.6;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Requisition basket is empty.<br>Add valves from the catalog to build an engineering RFQ.
        </div>
      `;
      return;
    }

    container.innerHTML = rfqCart.map((item, idx) => `
      <div class="drawer-item">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div style="font-family:var(--font-heading); font-size:0.96rem; font-weight:700; color:var(--text-titanium);">
            ${item.name}
          </div>
          <button onclick="window.JasviApp.removeFromCart(${idx})" style="color:var(--text-muted); font-size:1.1rem; line-height:1; cursor:pointer;" title="Remove">
            &times;
          </button>
        </div>
        <div style="display:flex; gap:8px; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-secondary);">
          <span>Class: ${item.class || '150#'}</span>
          <span>&bull;</span>
          <span>Qty: ${item.qty || 1} units</span>
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     9. Public API Namespace (window.JasviApp)
     ========================================================================== */
  window.JasviApp = {
    addToCart(id, name) {
      rfqCart.push({ id, name, class: activeClass, qty: 1 });
      localStorage.setItem('jasvi_rfq_cart', JSON.stringify(rfqCart));
      updateRfqCounter();
      if (window.JasviApp.openRfqDrawer) window.JasviApp.openRfqDrawer();
    },

    removeFromCart(index) {
      rfqCart.splice(index, 1);
      localStorage.setItem('jasvi_rfq_cart', JSON.stringify(rfqCart));
      updateRfqCounter();
      renderRfqItems();
    },

    selectMatrixRow(trElement, rowData) {
      const rows = document.querySelectorAll('#matrix-table-body tr');
      rows.forEach(r => r.classList.remove('selected'));
      trElement.classList.add('selected');
      updateCadStats(rowData);
    },

    dispatchWhatsAppRfq() {
      if (rfqCart.length === 0) {
        alert('Please add at least one valve to your RFQ basket.');
        return;
      }
      let msg = "Hello Jasvi Industries Engineering Team,\n\nI would like to request an official technical quote for the following valves:\n";
      rfqCart.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.name} (Class ${item.class}#) - Qty: ${item.qty}\n`;
      });
      msg += "\nPlease provide pricing, delivery lead time, and EN 10204 3.1 MTC availability.\n\nThank you.";
      const url = `https://wa.me/919512690771?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    }
  };

  /* ==========================================================================
     10. DOM Initialization Lifecycle
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    const flowSim = new CanvasFlowSimulator('hero-canvas');
    initSpotlightPhysics();
    initHudSlider(flowSim);
    loadShowcaseData();
    initCategoryFilters();
    initCopilot();
    initRfqDrawer();
  });

})();
