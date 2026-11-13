/**
 * Jasvi Industries - UserView Showcase Main Controller
 * "Architectural Precision & Studio Flow Engineering" (Pure Light Mode)
 * Three.js WebGL 3D Studio x ReactBits Physics x Cv Hydraulic Calculator
 */

(function () {
  'use strict';

  // Global Application State
  let showcaseData = null;
  let activeCategory = 'all';
  let activeValveId = 'prod-ball-valve';
  let activeClass = '150';
  let activeUnit = 'mm'; // 'mm' or 'in'
  let rfqCart = JSON.parse(localStorage.getItem('jasvi_rfq_cart') || '[]');

  /* ==========================================================================
     1. Three.js Interactive 3D WebGL Valve CAD Stage (Studio Light Rendering)
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

      // Component Groups for Exploded View Kinematics
      this.groupBody = new THREE.Group();
      this.groupBonnet = new THREE.Group();
      this.groupStem = new THREE.Group();
      this.groupSeats = new THREE.Group();
      this.groupWedge = new THREE.Group();

      this.init();
    }

    init() {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;

      // 1. Scene
      this.scene = new THREE.Scene();

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      this.camera.position.set(3.5, 2.5, 4.5);

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
        this.controls.maxDistance = 8;
        this.controls.minDistance = 2;
        this.controls.target.set(0, 0.4, 0);
      }

      // 5. Studio Three-Point Lighting
      const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.4);
      this.scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.6);
      keyLight.position.set(5, 8, 5);
      keyLight.castShadow = true;
      this.scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x0284C7, 0.9);
      fillLight.position.set(-5, 3, -5);
      this.scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xFFFFFF, 1.1);
      rimLight.position.set(0, -4, 4);
      this.scene.add(rimLight);

      // 6. Build Procedural Industrial Valve Geometry
      this.buildValveMesh();

      // 7. Resize Listener
      window.addEventListener('resize', () => this.onResize());

      // 8. Animation Loop
      this.animate();
    }

    buildValveMesh() {
      // Materials
      const castBodyMat = new THREE.MeshStandardMaterial({
        color: 0x1E40AF, // Cobalt industrial powder coat
        metalness: 0.7,
        roughness: 0.35
      });

      const machinedFlangeMat = new THREE.MeshStandardMaterial({
        color: 0xE2E8F0, // Mirror machined steel
        metalness: 0.9,
        roughness: 0.15
      });

      const chromeStemMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF, // Chrome trim
        metalness: 0.95,
        roughness: 0.08
      });

      const stelliteSeatMat = new THREE.MeshStandardMaterial({
        color: 0xD97706, // Stellite gold hard-face
        metalness: 0.85,
        roughness: 0.2
      });

      const handwheelMat = new THREE.MeshStandardMaterial({
        color: 0x0284C7, // Azure
        metalness: 0.5,
        roughness: 0.4
      });

      // A. Valve Body Group
      // Central spherical/cylindrical body
      const bodySphere = new THREE.Mesh(new THREE.SphereGeometry(0.85, 32, 24), castBodyMat);
      bodySphere.scale.set(1.1, 0.9, 0.9);
      this.groupBody.add(bodySphere);

      // Horizontal flow tube
      const flowTube = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 2.2, 32), castBodyMat);
      flowTube.rotation.z = Math.PI / 2;
      this.groupBody.add(flowTube);

      // Left Flange
      const leftFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.18, 32), machinedFlangeMat);
      leftFlange.rotation.z = Math.PI / 2;
      leftFlange.position.x = -1.1;
      this.groupBody.add(leftFlange);

      // Right Flange
      const rightFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.18, 32), machinedFlangeMat);
      rightFlange.rotation.z = Math.PI / 2;
      rightFlange.position.x = 1.1;
      this.groupBody.add(rightFlange);

      // B. Bonnet Group (Moves +Y in exploded view)
      const bonnetNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.65, 0.7, 32), castBodyMat);
      bonnetNeck.position.y = 0.8;
      this.groupBonnet.add(bonnetNeck);

      const bonnetFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.14, 32), machinedFlangeMat);
      bonnetFlange.position.y = 1.15;
      this.groupBonnet.add(bonnetFlange);

      // C. Stem & Handwheel Group (Moves +Y in exploded view)
      const stemRod = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.4, 24), chromeStemMat);
      stemRod.position.y = 1.5;
      this.groupStem.add(stemRod);

      const yokeBracket = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.4, 0.25), machinedFlangeMat);
      yokeBracket.position.y = 1.6;
      this.groupStem.add(yokeBracket);

      const handwheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.08, 16, 48), handwheelMat);
      handwheelRim.rotation.x = Math.PI / 2;
      handwheelRim.position.y = 2.2;
      this.groupStem.add(handwheelRim);

      // D. Internal Wedge / Ball
      const wedgeDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.22, 32), machinedFlangeMat);
      wedgeDisc.position.y = 0;
      this.groupWedge.add(wedgeDisc);

      // E. Internal Stellite Seats
      const leftSeat = new THREE.Mesh(new THREE.RingGeometry(0.35, 0.52, 32), stelliteSeatMat);
      leftSeat.rotation.y = Math.PI / 2;
      leftSeat.position.x = -0.4;
      this.groupSeats.add(leftSeat);

      const rightSeat = new THREE.Mesh(new THREE.RingGeometry(0.35, 0.52, 32), stelliteSeatMat);
      rightSeat.rotation.y = Math.PI / 2;
      rightSeat.position.x = 0.4;
      this.groupSeats.add(rightSeat);

      // Add all sub-groups to scene
      this.scene.add(this.groupBody);
      this.scene.add(this.groupBonnet);
      this.scene.add(this.groupStem);
      this.scene.add(this.groupWedge);
      this.scene.add(this.groupSeats);
    }

    toggleExplode() {
      this.isExploded = !this.isExploded;
      const btn = document.getElementById('btn-explode-toggle');
      if (btn) {
        btn.classList.toggle('active', this.isExploded);
        btn.innerHTML = this.isExploded ? 
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 14h6m-6 0v6m16-6h-6m6 0v6M10 4H4m0 0v6m10-6h6m0 0v6"/></svg> Assembled View' : 
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h6m0 0v6m-6-6L3 21m0 0h6m-6 0v-6"/></svg> 3D Exploded View';
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

      // Exploded Kinematics Smooth Spring Interpolation
      const targetBonnetY = this.isExploded ? 0.7 : 0;
      const targetStemY = this.isExploded ? 1.4 : 0;
      const targetWedgeY = this.isExploded ? 0.4 : 0;
      const targetSeatsX = this.isExploded ? 0.6 : 0;

      this.groupBonnet.position.y += (targetBonnetY - this.groupBonnet.position.y) * 0.1;
      this.groupStem.position.y += (targetStemY - this.groupStem.position.y) * 0.1;
      this.groupWedge.position.y += (targetWedgeY - this.groupWedge.position.y) * 0.1;

      // Gentle ambient turntable drift when not dragging
      if (this.controls && !this.controls.state) {
        this.scene.rotation.y += 0.003;
      }

      if (this.controls) this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }

  /* ==========================================================================
     2. ReactBits DecryptedText Typography Engine
     ========================================================================== */
  function initDecryptedText() {
    const el = document.getElementById('decrypted-hero-title');
    if (!el) return;

    const originalText = el.getAttribute('data-text') || el.textContent;
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_//ΔΩ*#';
    let iteration = 0;

    const interval = setInterval(() => {
      el.textContent = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          if (letter === ' ') return ' ';
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
     3. ReactBits Floating Dock with Gaussian Proximity Magnification
     ========================================================================== */
  function initDockProximityMagnification() {
    const dock = document.querySelector('.floating-dock');
    const pills = document.querySelectorAll('.dock-pill, .dock-action-btn');
    if (!dock || pills.length === 0) return;

    dock.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;

      pills.forEach((pill) => {
        const rect = pill.getBoundingClientRect();
        const pillCenter = rect.left + rect.width / 2;
        const dist = Math.abs(mouseX - pillCenter);

        // Gaussian Proximity Curve: Scale = 1.0 + 0.28 * exp(-dist^2 / (2 * 45^2))
        const sigma = 45;
        const scale = 1.0 + 0.25 * Math.exp(-Math.pow(dist, 2) / (2 * Math.pow(sigma, 2)));
        pill.style.transform = `scale(${scale.toFixed(3)})`;
      });
    });

    dock.addEventListener('mouseleave', () => {
      pills.forEach((pill) => {
        pill.style.transform = 'scale(1.0)';
      });
    });
  }

  /* ==========================================================================
     4. Interactive Cv Flow Coefficient & Sizing Calculator
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

      // Recommend Valve Size based on standard industrial sizing limits
      let recommended = '2" (DN50) Class 150# Ball';
      if (cv > 850) {
        recommended = '8" (DN200) Class 300# Gate / Trunnion';
      } else if (cv > 420) {
        recommended = '6" (DN150) Class 150# Ball / Check';
      } else if (cv > 200) {
        recommended = '4" (DN100) Class 300# Ball / Globe';
      } else if (cv > 75) {
        recommended = '3" (DN80) Class 150# Process Ball';
      } else if (cv <= 30) {
        recommended = '1" (DN25) Class 800# Forged Globe';
      }

      if (readoutSize) readoutSize.textContent = `Recommended: ${recommended}`;
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

    slider.addEventListener('input', (e) => {
      const psi = parseInt(e.target.value, 10);
      if (readout) readout.textContent = `${psi.toLocaleString()} PSI`;
      
      const velocity = (12 + (psi / 2500) * 48).toFixed(1);
      if (velMetric) velMetric.textContent = `${velocity} m/s`;

      const temp = Math.round(180 + (psi / 2500) * 320);
      if (tempMetric) tempMetric.textContent = `${temp}°C`;
    });
  }

  /* ==========================================================================
     6. Data Ingestion & 15-Valve Catalog Hydration
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
              + RFQ
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
     7. CAD Dimensional Matrix Workbench 2.0
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
        <td style="font-weight:700; color:var(--accent-azure);">${row.size_inch} (${row.size_mm} mm)</td>
        <td>${formatVal(row.L)}</td>
        <td>${formatVal(row.H)}</td>
        <td>${formatVal(row.W)}</td>
        <td>${formatVal(row.D)}</td>
        <td>${row.holes || 4}</td>
        <td style="font-weight:700; color:var(--accent-emerald);">${row.weight_kg ? (activeUnit === 'in' ? (row.weight_kg * 2.20462).toFixed(1) + ' lbs' : row.weight_kg + ' kg') : '-'}</td>
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
     8. Product Detail URL Routing
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
     9. AI Industrial Valve Selection Copilot
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
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-emerald); font-weight:700; margin-bottom:4px;">
              MATCH VERIFIED (${confidence}% CONFIDENCE)
            </div>
            <h4 style="font-family:var(--font-heading); font-size:1.15rem; color:var(--text-primary); font-weight:700;">
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
          <span class="spec-tag" style="color:var(--accent-azure);">${mStd}</span>
          <span class="spec-tag">${mBody}</span>
          <span class="spec-tag">${matched.category}</span>
        </div>
      `;
    }
  }

  /* ==========================================================================
     10. Slide-Over RFQ Requisition Basket
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
          <div style="font-family:var(--font-heading); font-size:0.96rem; font-weight:700; color:var(--text-primary);">
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
     11. Public API Namespace (window.JasviApp)
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
     12. DOM Initialization Lifecycle
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    const valveStage = new ThreeJsValveStage('threejs-viewport');
    
    // Toggle Explode View
    const explodeBtn = document.getElementById('btn-explode-toggle');
    if (explodeBtn && valveStage) {
      explodeBtn.addEventListener('click', () => valveStage.toggleExplode());
    }

    initDecryptedText();
    initDockProximityMagnification();
    initCvCalculator();
    initHudSlider();
    loadShowcaseData();
    initCategoryFilters();
    initCopilot();
    initRfqDrawer();
  });

})();
