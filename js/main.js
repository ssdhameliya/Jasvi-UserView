/**
 * Jasvi Industries - UserView Showcase Main Controller
 * "Architectural Precision & Studio Flow Engineering" (Pure Swiss Light Mode)
 * Three.js WebGL 3D Studio x ReactBits Spotlight Physics x Hydraulic Cv Sizing
 */

(function () {
  'use strict';

  // Global Application State
  let showcaseData = null;
  let activeCategory = 'all';
  let activeValveId = 'prod-ball-valve';
  let activeClass = '150';
  let activeUnit = 'mm'; // 'mm' or 'in'

  /* ==========================================================================
     1. Three.js Interactive 3D WebGL Valve CAD Stage (Studio Daylight Rendering)
     ========================================================================== */
  class ThreeJsValveStage {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container || typeof THREE === 'undefined') return;

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.controls = null;
      this.isExploded = false;
      this.showFlow = true;

      // Component Groups for Exploded View Kinematics
      this.groupBody = new THREE.Group();
      this.groupBonnet = new THREE.Group();
      this.groupStem = new THREE.Group();
      this.groupWedge = new THREE.Group();
      this.flowParticles = [];

      this.init();
    }

    init() {
      const width = this.container.clientWidth || 600;
      const height = this.container.clientHeight || 440;

      // 1. Scene
      this.scene = new THREE.Scene();

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      this.camera.position.set(3.8, 2.6, 4.6);

      // 3. Renderer with Physical Studio Lighting
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.container.appendChild(this.renderer.domElement);

      // 4. Orbit Controls (360° Drag & Scroll Zoom)
      if (typeof THREE.OrbitControls !== 'undefined') {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 8.5;
        this.controls.minDistance = 2.2;
        this.controls.target.set(0, 0.5, 0);
      }

      // 5. Studio Three-Point Daylight Lighting
      const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.35);
      this.scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.4);
      keyLight.position.set(6, 9, 6);
      keyLight.castShadow = true;
      this.scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x0284C7, 0.7);
      fillLight.position.set(-6, 3, -4);
      this.scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xE2E8F0, 1.1);
      rimLight.position.set(0, -4, 4);
      this.scene.add(rimLight);

      // 6. Build Procedural Industrial Valve Geometry
      this.buildValveMesh();

      // 7. Setup Flow Simulation Particles
      this.setupFlowParticles();

      // 8. Attach Stage HUD Controls
      this.attachControls();

      // 9. Resize Listener
      window.addEventListener('resize', () => this.onResize());

      // 10. Animation Loop
      this.animate();
    }

    buildValveMesh() {
      // Materials
      const castBodyMat = new THREE.MeshStandardMaterial({
        color: 0x334155, // ASTM A216 WCB Cast Slate
        metalness: 0.65,
        roughness: 0.38
      });

      const machinedFlangeMat = new THREE.MeshStandardMaterial({
        color: 0x94A3B8, // Machined Flange Face
        metalness: 0.75,
        roughness: 0.25
      });

      const chromeStemMat = new THREE.MeshStandardMaterial({
        color: 0xE2E8F0, // 410SS Polished Stem
        metalness: 0.90,
        roughness: 0.15
      });

      const handwheelMat = new THREE.MeshStandardMaterial({
        color: 0x0284C7, // Hydraulic Azure Handwheel
        metalness: 0.45,
        roughness: 0.35
      });

      // A. Valve Body Group
      const bodySphere = new THREE.Mesh(new THREE.SphereGeometry(0.85, 32, 24), castBodyMat);
      bodySphere.scale.set(1.15, 0.92, 0.92);
      this.groupBody.add(bodySphere);

      const flowTube = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 2.3, 32), castBodyMat);
      flowTube.rotation.z = Math.PI / 2;
      this.groupBody.add(flowTube);

      // Flanges (Left & Right)
      const leftFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.96, 0.96, 0.18, 32), machinedFlangeMat);
      leftFlange.rotation.z = Math.PI / 2;
      leftFlange.position.x = -1.15;
      this.groupBody.add(leftFlange);

      const rightFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.96, 0.96, 0.18, 32), machinedFlangeMat);
      rightFlange.rotation.z = Math.PI / 2;
      rightFlange.position.x = 1.15;
      this.groupBody.add(rightFlange);

      // B. Bonnet Group (Moves +Y in exploded view)
      const bonnetNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.68, 0.72, 32), castBodyMat);
      bonnetNeck.position.y = 0.82;
      this.groupBonnet.add(bonnetNeck);

      const bonnetFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.15, 32), machinedFlangeMat);
      bonnetFlange.position.y = 1.20;
      this.groupBonnet.add(bonnetFlange);

      // C. Stem & Handwheel Group (Moves higher +Y in exploded view)
      const stemRod = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.45, 24), chromeStemMat);
      stemRod.position.y = 1.55;
      this.groupStem.add(stemRod);

      const yokeBracket = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.42, 0.28), machinedFlangeMat);
      yokeBracket.position.y = 1.65;
      this.groupStem.add(yokeBracket);

      const handwheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.08, 16, 48), handwheelMat);
      handwheelRim.rotation.x = Math.PI / 2;
      handwheelRim.position.y = 2.25;
      this.groupStem.add(handwheelRim);

      // Handwheel Spokes
      for (let i = 0; i < 4; i++) {
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.86, 12), handwheelMat);
        spoke.rotation.z = (Math.PI / 4) * i;
        spoke.position.y = 2.25;
        this.groupStem.add(spoke);
      }

      // D. Internal Wedge / Ball
      const wedgeDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.50, 0.22, 32), machinedFlangeMat);
      wedgeDisc.position.y = 0;
      this.groupWedge.add(wedgeDisc);

      // Add all groups to scene
      this.scene.add(this.groupBody);
      this.scene.add(this.groupBonnet);
      this.scene.add(this.groupStem);
      this.scene.add(this.groupWedge);
    }

    setupFlowParticles() {
      const particleCount = 28;
      const geom = new THREE.SphereGeometry(0.04, 8, 8);
      const mat = new THREE.MeshBasicMaterial({ color: 0x0284C7, transparent: true, opacity: 0.85 });

      for (let i = 0; i < particleCount; i++) {
        const p = new THREE.Mesh(geom, mat);
        p.position.set(-1.1 + Math.random() * 2.2, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4);
        p.userData = { speed: 0.025 + Math.random() * 0.035 };
        this.flowParticles.push(p);
        this.scene.add(p);
      }
    }

    attachControls() {
      const btnExplode = document.getElementById('btn-3d-explode');
      const btnFlow = document.getElementById('btn-3d-flow');

      if (btnExplode) {
        btnExplode.addEventListener('click', () => {
          this.isExploded = !this.isExploded;
          btnExplode.classList.toggle('active', this.isExploded);
        });
      }

      if (btnFlow) {
        btnFlow.addEventListener('click', () => {
          this.showFlow = !this.showFlow;
          btnFlow.classList.toggle('active', this.showFlow);
          this.flowParticles.forEach(p => (p.visible = this.showFlow));
        });
      }
    }

    onResize() {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      // Exploded Kinematic Interpolation (Lerp)
      const targetBonnetY = this.isExploded ? 0.75 : 0;
      const targetStemY = this.isExploded ? 1.45 : 0;
      const targetWedgeY = this.isExploded ? -0.45 : 0;

      this.groupBonnet.position.y += (targetBonnetY - this.groupBonnet.position.y) * 0.08;
      this.groupStem.position.y += (targetStemY - this.groupStem.position.y) * 0.08;
      this.groupWedge.position.y += (targetWedgeY - this.groupWedge.position.y) * 0.08;

      // Animate Flow Particles
      if (this.showFlow) {
        this.flowParticles.forEach(p => {
          p.position.x += p.userData.speed;
          if (p.position.x > 1.15) {
            p.position.x = -1.15;
          }
        });
      }

      if (this.controls) this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }

  /* ==========================================================================
     2. DecryptedText Animation (ReactBits Pattern)
     ========================================================================== */
  function initDecryptedText() {
    const el = document.getElementById('decrypted-hero-title');
    if (!el) return;

    const originalText = el.getAttribute('data-text') || el.textContent;
    const chars = '0123456789ABCDEF!@#%&*';
    let iteration = 0;

    const interval = setInterval(() => {
      el.textContent = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          if (letter === ' ' || letter === '/' || letter === '-') return letter;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  }

  /* ==========================================================================
     3. ReactBits Spotlight Card Hover Physics
     ========================================================================== */
  function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  /* ==========================================================================
     4. Interactive Hydraulic Cv Flow Sizing Calculator
     ========================================================================== */
  function initCvCalculator() {
    const sliderQ = document.getElementById('calc-flow-rate');
    const sliderDP = document.getElementById('calc-press-drop');
    const sliderSG = document.getElementById('calc-sg');

    const readoutQ = document.getElementById('calc-val-q');
    const readoutDP = document.getElementById('calc-val-dp');
    const readoutSG = document.getElementById('calc-val-sg');
    const readoutCv = document.getElementById('calc-cv-result');
    const readoutSize = document.getElementById('calc-rec-size');
    const btnTransfer = document.getElementById('btn-transfer-rfq');

    if (!sliderQ || !sliderDP || !sliderSG) return;

    function recalculate() {
      const Q = parseFloat(sliderQ.value); // GPM
      const dP = parseFloat(sliderDP.value); // PSI
      const SG = parseFloat(sliderSG.value); // Specific Gravity

      if (readoutQ) readoutQ.textContent = `${Q} GPM`;
      if (readoutDP) readoutDP.textContent = `${dP} PSI`;
      if (readoutSG) readoutSG.textContent = `${SG.toFixed(2)}`;

      // Liquid Cv Formula: Cv = Q * sqrt(SG / dP)
      const cv = Q * Math.sqrt(SG / dP);
      if (readoutCv) readoutCv.textContent = Math.round(cv).toLocaleString();

      let recommended = '2" (DN50) Class 150# Process Ball';
      let targetSize = '2" (DN50)';
      if (cv > 850) {
        recommended = '8" (DN200) Class 300# Gate / Trunnion';
        targetSize = '8" (DN200)';
      } else if (cv > 420) {
        recommended = '6" (DN150) Class 150# Ball / Check';
        targetSize = '6" (DN150)';
      } else if (cv > 200) {
        recommended = '4" (DN100) Class 300# Ball / Globe';
        targetSize = '4" (DN100)';
      } else if (cv > 75) {
        recommended = '3" (DN80) Class 150# Process Ball';
        targetSize = '3" (DN80)';
      } else if (cv <= 30) {
        recommended = '1" (DN25) Class 800# Forged Globe';
        targetSize = '1" (DN25)';
      }

      if (readoutSize) readoutSize.textContent = `RECOMMENDED: ${recommended}`;

      if (btnTransfer) {
        btnTransfer.onclick = () => {
          const rfqSize = document.getElementById('rfq-size');
          if (rfqSize) rfqSize.value = targetSize;
          const rfqSection = document.getElementById('rfq-matrix');
          if (rfqSection) rfqSection.scrollIntoView({ behavior: 'smooth' });
        };
      }
    }

    sliderQ.addEventListener('input', recalculate);
    sliderDP.addEventListener('input', recalculate);
    sliderSG.addEventListener('input', recalculate);
    recalculate();
  }

  /* ==========================================================================
     5. Pipeline Pressure HUD Slider Controller
     ========================================================================== */
  function initHudSlider() {
    const slider = document.getElementById('hud-pressure-slider');
    const readout = document.getElementById('hud-pressure-readout');
    const velMetric = document.getElementById('hud-flow-velocity');
    const tempMetric = document.getElementById('hud-thermal-rating');

    if (!slider) return;

    slider.addEventListener('input', e => {
      const psi = parseInt(e.target.value, 10);
      if (readout) readout.textContent = `${psi.toLocaleString()} PSI`;

      const velocity = (12 + (psi / 2500) * 48).toFixed(1);
      if (velMetric) velMetric.textContent = `${velocity} m/s`;

      const temp = Math.round(180 + (psi / 2500) * 320);
      if (tempMetric) tempMetric.textContent = `${temp}°C`;
    });
  }

  /* ==========================================================================
     6. Catalog Data Ingestion & Spotlight Product Cards Rendering
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
      initCategoryFilters();
      initWorkbench();
      populateModelSelector();
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
      const name = valve.title || valve.name || 'Precision Industrial Valve';
      
      // Resilient description extraction (Fixing undefined bug)
      const desc = typeof valve.meta === 'string' 
        ? valve.meta 
        : (valve.description || 'High-pressure severe-service precision industrial valve.');

      const designStd = valve.standards ? (valve.standards.design || 'ASME B16.34') : 'ASME B16.34';
      
      // Resilient size extraction (Fixing undefined - undefined bug)
      let sizeStr = '1/2" - 12"';
      if (Array.isArray(valve.sizes) && valve.sizes.length > 0) {
        sizeStr = `${valve.sizes[0]} - ${valve.sizes[valve.sizes.length - 1]}`;
      } else if (valve.standards && valve.standards.size_range) {
        sizeStr = valve.standards.size_range;
      }

      const bodyMat = valve.bom ? (valve.bom.body || 'ASTM A216 WCB') : 'ASTM A216 WCB';
      const img = valve.image || 'assets/images/hero_valve_ball.jpg';
      const categoryLabel = (valve.category || 'process').replace('-', ' ');

      return `
        <div class="spotlight-card" data-id="${valve.id}">
          <div>
            <div class="card-top-header">
              <span class="category-badge">${categoryLabel}</span>
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
                <span class="spec-tag">${valve.tag || 'Class 150# - 600#'}</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 14px;">
            <a href="product-detail.html?id=${valve.id}" class="btn-card-matrix">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              View CAD Matrix &amp; Specifications &rarr;
            </a>
          </div>
        </div>
      `;
    }).join('');

    initSpotlightCards();
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
     7. CAD Dimensional Matrix Workbench (ASME B16.5 & B16.34)
     ========================================================================== */
  function populateModelSelector() {
    const select = document.getElementById('workbench-model-select');
    if (!select) return;

    const products = getProductList();
    select.innerHTML = products.map(p => `
      <option value="${p.id}" ${p.id === activeValveId ? 'selected' : ''}>
        ${p.title || p.name}
      </option>
    `).join('');

    select.addEventListener('change', e => {
      activeValveId = e.target.value;
      initWorkbench();
    });
  }

  function initWorkbench() {
    const products = getProductList();
    if (products.length === 0) return;
    const valve = products.find(p => p.id === activeValveId) || products[0];
    if (!valve) return;

    renderMatrixTable(valve);

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
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:24px; color:var(--text-muted);">Dimensional matrix data verified for standard ASME Class ${activeClass}#</td></tr>`;
      return;
    }

    const conv = activeUnit === 'in' ? (1 / 25.4) : 1;
    const formatVal = val => {
      if (typeof val !== 'number') return val;
      const converted = val * conv;
      return activeUnit === 'in' ? converted.toFixed(2) : converted.toFixed(1);
    };

    tbody.innerHTML = dims.map((row, idx) => `
      <tr class="${idx === 0 ? 'selected' : ''}">
        <td style="font-weight:700; color:var(--accent-azure);">${row.size_inch} (${row.size_mm} mm)</td>
        <td>${formatVal(row.L)}</td>
        <td>${formatVal(row.H)}</td>
        <td>${formatVal(row.W)}</td>
        <td>${formatVal(row.D)}</td>
        <td>${row.holes || 4}</td>
        <td style="font-weight:700; color:var(--accent-emerald);">${row.weight_kg ? (activeUnit === 'in' ? (row.weight_kg * 2.20462).toFixed(1) + ' lbs' : row.weight_kg + ' kg') : '-'}</td>
      </tr>
    `).join('');
  }

  /* ==========================================================================
     8. Direct B2B Engineering RFQ Specification Matrix Handler
     ========================================================================== */
  function initRfqForm() {
    const form = document.getElementById('rfq-engineering-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const media = document.getElementById('rfq-media')?.value || 'Process Fluid';
      const valveType = document.getElementById('rfq-valve-type')?.value || 'Industrial Valve';
      const rating = document.getElementById('rfq-rating')?.value || 'Class 150#';
      const size = document.getElementById('rfq-size')?.value || 'Standard';
      const moc = document.getElementById('rfq-moc')?.value || 'ASTM A216 WCB';
      const qty = document.getElementById('rfq-qty')?.value || '1';
      const clientName = document.getElementById('rfq-name')?.value || 'Valued Client';
      const company = document.getElementById('rfq-company')?.value || 'Enterprise';
      const phone = document.getElementById('rfq-phone')?.value || '';
      const notes = document.getElementById('rfq-notes')?.value || '';

      const textSummary = `*JASVI INDUSTRIES // DS INDUSTRIES ENGINEERING RFQ*%0A%0A` +
        `*Client:* ${encodeURIComponent(clientName)} (${encodeURIComponent(company)})%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Valve Type:* ${encodeURIComponent(valveType)}%0A` +
        `*Service Media:* ${encodeURIComponent(media)}%0A` +
        `*Pressure Class:* ${encodeURIComponent(rating)}%0A` +
        `*Nominal Size:* ${encodeURIComponent(size)}%0A` +
        `*Metallurgy (MOC):* ${encodeURIComponent(moc)}%0A` +
        `*Quantity:* ${encodeURIComponent(qty)} units%0A` +
        `*Notes:* ${encodeURIComponent(notes)}%0A%0A` +
        `_Generated via Jasvi-UserView Engineering Showcase_`;

      const whatsappUrl = `https://wa.me/919512690771?text=${textSummary}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  /* ==========================================================================
     9. Product Detail Page Routing
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
    if (descEl) descEl.textContent = typeof valve.meta === 'string' ? valve.meta : (valve.description || '');
    if (imgEl && valve.image) imgEl.src = valve.image;

    initWorkbench();
  }

  /* ==========================================================================
     10. Public API Namespace (window.JasviApp)
     ========================================================================== */
  window.JasviApp = {
    getShowcaseData: () => showcaseData,
    getActiveValveId: () => activeValveId
  };

  /* ==========================================================================
     11. Lifecycle Initialization
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    new ThreeJsValveStage('canvas-3d-container');
    initDecryptedText();
    initCvCalculator();
    initHudSlider();
    initRfqForm();
    loadShowcaseData();
  });

})();
