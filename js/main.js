/**
 * ============================================================================
 * DS INDUSTRIES / Jasvi Engineering - UserView Dynamic Showcase Engine (v4)
 * Grounded in Official 22-Page Engineering Catalog (Ahmedabad Plant)
 * React Bits Spotlight Tilt + MotionSites Spring Easing + Dimensional Matrix
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  let showcaseData = null;
  let activeSelectedValve = null;
  let activeDimensionClass = 'class150';
  let activeDimensionUnit = 'mm'; // 'mm' or 'in'
  let swiperInstance = null;

  // ==========================================================================
  // 1. Ambient Fluid Flow Streamline Canvas (React Bits Inspired)
  // ==========================================================================
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const streamCount = Math.min(45, Math.floor(window.innerWidth / 30));

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140
    };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    class StreamParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseVx = 0.6 + Math.random() * 0.9;
        this.vx = this.baseVx;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = 1.8 + Math.random() * 1.6;
        this.alpha = 0.2 + Math.random() * 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 5;
          this.y -= (dy / dist) * force * 5;
          this.vx = this.baseVx * (1 + force * 2.2);
        } else {
          this.vx += (this.baseVx - this.vx) * 0.05;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(2, 132, 199, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < streamCount; i++) {
      particles.push(new StreamParticle());
    }

    function animateStreams() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.18 * (1 - dist / 95)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateStreams);
    }

    animateStreams();
  }

  // ==========================================================================
  // 2. Swiper Full-Width 3-Column Workstations
  // ==========================================================================
  function initSwiperCoverflow() {
    if (typeof Swiper === 'undefined') return;

    if (swiperInstance) {
      swiperInstance.destroy(true, true);
    }

    swiperInstance = new Swiper('.swiper-showcase-container', {
      effect: 'slide',
      grabCursor: true,
      centeredSlides: false,
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      speed: 650,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, spaceBetween: 28 }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }

  // ==========================================================================
  // 3. Render Valve Specification Inspector
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
    const stageImgEl = document.getElementById('inspect-3d-img');
    const ctaDetail = document.getElementById('inspect-btn-detail');

    if (tagEl) tagEl.textContent = valve.tag || 'Industrial Valve Spec';
    if (titleEl) titleEl.textContent = valve.title;
    if (stageImgEl && valve.image) {
      stageImgEl.src = valve.image;
      stageImgEl.alt = valve.title;
    }
    if (sizesEl) sizesEl.textContent = Array.isArray(valve.sizes) ? valve.sizes.slice(0, 6).join(', ') + (valve.sizes.length > 6 ? ` +${valve.sizes.length - 6} more` : '') : 'Standard ASME Sizes';
    if (endsEl) endsEl.textContent = Array.isArray(valve.endConnections) ? valve.endConnections.join(', ') : 'Flanged RF / RTJ / Butt Weld';
    if (cvEl) cvEl.textContent = valve.badges ? valve.badges.join(' • ') : 'API 598 Tested';
    if (tempEl) tempEl.textContent = valve.catalogPages ? `Catalog: ${valve.catalogPages}` : 'ASME B16.34';
    if (descEl) descEl.textContent = valve.meta || '';

    if (matsEl && Array.isArray(valve.materials)) {
      matsEl.innerHTML = valve.materials.map((m) => `
        <span class="mat-pill">${m}</span>
      `).join('');
    }

    if (ctaDetail) {
      ctaDetail.href = `product-detail.html?id=${valve.id}`;
    }

    document.querySelectorAll('.hydrevo-card').forEach(card => {
      if (card.getAttribute('data-id') === valve.id) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }

  // ==========================================================================
  // 4. Render Product Grid with React Bits Spotlight Tilt
  // ==========================================================================
  function renderHydrevoProductGrid(valves, filter = 'all') {
    const grid = document.getElementById('valve-cards-grid');
    if (!grid) return;

    const filtered = filter === 'all'
      ? valves
      : valves.filter(v => v.category === filter);

    grid.innerHTML = filtered.map((v) => `
      <a href="product-detail.html?id=${v.id}" class="hydrevo-card" data-id="${v.id}" data-category="${v.category}">
        <span class="card-watermark">DS</span>
        <div class="card-img-wrap">
          <img src="${v.image}" alt="${v.title}" />
        </div>
        <div class="card-bottom-ribbon">
          <span style="display:block; font-size: 0.95rem; font-weight: 800;">${v.ribbonTitle || v.title}</span>
          <span style="display:block; font-size: 0.76rem; opacity: 0.88; margin-top: 3px;">${v.badges ? v.badges[0] : 'ASME / API'}</span>
        </div>
      </a>
    `).join('');

    // Attach click events to inspector
    grid.querySelectorAll('.hydrevo-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // If clicking on main page without opening subpage directly
        const valveId = card.getAttribute('data-id');
        const match = valves.find(item => item.id === valveId);
        if (match) {
          renderValveInspector(match);
        }
      });
    });

    init3DMagneticTilt();

    if (!activeSelectedValve && filtered.length > 0) {
      renderValveInspector(filtered[0]);
    }
  }

  // ==========================================================================
  // 5. Workstations Renderer
  // ==========================================================================
  function renderWorkstations(workstations) {
    const wrapper = document.getElementById('machinery-swiper-wrapper');
    if (!wrapper || !Array.isArray(workstations)) return;

    wrapper.innerHTML = workstations.map((ws) => `
      <div class="swiper-slide">
        <div class="slide-img-wrap">
          <img src="${ws.image}" alt="${ws.name}" />
        </div>
        <div class="slide-info">
          <span class="slide-badge">${ws.badge}</span>
          <h3 class="slide-title">${ws.name}</h3>
          <p class="slide-desc">${ws.desc}</p>
        </div>
      </div>
    `).join('');

    initSwiperCoverflow();
  }

  // ==========================================================================
  // 6. Category Filter Button Event Handlers
  // ==========================================================================
  function setupCategoryFilters(valves) {
    const filterContainer = document.getElementById('valve-category-filters');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-btn');
      if (!btn) return;

      filterContainer.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterKey = btn.getAttribute('data-filter') || 'all';
      renderHydrevoProductGrid(valves, filterKey);
    });
  }

  // ==========================================================================
  // 7. RFQ Dropzone
  // ==========================================================================
  function setupRfqDropzone() {
    const dropzone = document.getElementById('rfq-dropzone');
    const fileInput = document.getElementById('rfq-file-input');
    const nameDisplay = document.getElementById('file-name-display');

    if (!dropzone || !fileInput) return;

    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        nameDisplay.textContent = `Attached: ${fileInput.files[0].name} (${(fileInput.files[0].size / 1024).toFixed(1)} KB)`;
      }
    });

    ['dragenter', 'dragover'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '#0284c7';
        dropzone.style.background = 'rgba(224, 242, 254, 0.85)';
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'rgba(2, 132, 199, 0.35)';
        dropzone.style.background = 'var(--brand-blue-subtle)';
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        nameDisplay.textContent = `Attached: ${e.dataTransfer.files[0].name} (${(e.dataTransfer.files[0].size / 1024).toFixed(1)} KB)`;
      }
    });
  }

  // ==========================================================================
  // 8. Client-Side PDF Engineering Datasheet Studio (window.jspdf)
  // ==========================================================================
  function setupPdfGenerator() {
    const pdfBtn = document.getElementById('btn-generate-pdf');
    if (!pdfBtn) return;

    pdfBtn.addEventListener('click', () => {
      if (!window.jspdf || !window.jspdf.jsPDF) {
        alert('PDF compilation library is loading. Please try again in a moment.');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      const valve = activeSelectedValve || (showcaseData && showcaseData.valveProducts ? showcaseData.valveProducts[0] : null);
      if (!valve) return;

      // Header Banner (DS Industries Corporate Blue)
      doc.setFillColor(2, 132, 199);
      doc.rect(0, 0, 210, 34, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text('DS INDUSTRIES', 15, 14);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Committed With Precision & Performance • Industrial Valves Division', 15, 21);
      doc.text('Office: H-52, Darshanvilla Park, Nikol-Naroda, Ahmedabad - 382345 | Ph: +91 95126 90771', 15, 26);
      doc.text('Email: dsindustries89@gmail.com • Web: www.dsindustries.com', 15, 31);

      // Document Title
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('TECHNICAL VALVE SPECIFICATION DATA SHEET', 15, 46);

      doc.setDrawColor(2, 132, 199);
      doc.setLineWidth(0.8);
      doc.line(15, 49, 195, 49);

      // Model Title
      doc.setFontSize(11);
      doc.setTextColor(2, 132, 199);
      doc.text(`Product Series: ${valve.title}`, 15, 57);

      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.setFont('helvetica', 'normal');

      const specs = [
        ['Classification Category', valve.tag || 'Industrial Valve'],
        ['Catalog Source Reference', valve.catalogPages || 'Official Catalog'],
        ['Available Nominal Sizes', Array.isArray(valve.sizes) ? valve.sizes.join(', ') : 'Standard'],
        ['Standard End Connections', Array.isArray(valve.endConnections) ? valve.endConnections.join(', ') : 'Flanged RF / RTJ / BW'],
        ['Body Metallurgy (MOC)', Array.isArray(valve.materials) ? valve.materials.join(' / ') : 'WCB / CF8 / CF8M'],
        ['Engineering Design Standards', valve.standards ? valve.standards.map(s => `${s.item}: ${s.std}`).slice(0, 3).join(' | ') : 'API 6D, ASME B16.34, API 598'],
        ['Testing & Inspection Standard', 'API 598 100% Hydrostatic Shell & Seat Leakage Tested']
      ];

      let currentY = 66;
      specs.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 41, 59);
        doc.text(label + ':', 15, currentY);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        doc.text(doc.splitTextToSize(value, 115), 78, currentY);

        doc.setDrawColor(226, 232, 240);
        doc.line(15, currentY + 3.5, 195, currentY + 3.5);
        currentY += 9;
      });

      // Bill of Materials Summary Box
      if (valve.bom && Array.isArray(valve.bom)) {
        currentY += 4;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(2, 132, 199);
        doc.text('STANDARD BILL OF MATERIALS (BOM)', 15, currentY);
        currentY += 5;

        doc.setFillColor(241, 245, 249);
        doc.rect(15, currentY, 180, 7, 'F');
        doc.setFontSize(8);
        doc.setTextColor(15, 23, 42);
        doc.text('Component Part', 18, currentY + 5);
        doc.text('Standard WCB', 75, currentY + 5);
        doc.text('Stainless CF8', 115, currentY + 5);
        doc.text('Stainless CF8M', 155, currentY + 5);
        currentY += 7;

        doc.setFont('helvetica', 'normal');
        valve.bom.slice(0, 6).forEach(b => {
          doc.text(b.part, 18, currentY + 4.5);
          doc.text(b.mat1, 75, currentY + 4.5);
          doc.text(b.mat2, 115, currentY + 4.5);
          doc.text(b.mat3, 155, currentY + 4.5);
          doc.setDrawColor(241, 245, 249);
          doc.line(15, currentY + 6, 195, currentY + 6);
          currentY += 6;
        });
      }

      // Quality Guarantee Box
      currentY += 6;
      doc.setFillColor(240, 249, 255);
      doc.setDrawColor(2, 132, 199);
      doc.rect(15, currentY, 180, 24, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(3, 105, 161);
      doc.text('DS Industries Quality & Zero-Leakage Guarantee', 20, currentY + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text('All valves are 100% shell tested to 1.5x working pressure and seat tested bubble-tight to API 598.', 20, currentY + 13);
      doc.text('Manufactured under strict ISO 9001:2015 quality assurance at our Nikol-Naroda, Ahmedabad facility.', 20, currentY + 19);

      // Footer
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Generated dynamically from DS Industries / Jasvi Ecosystem • Official Technical Engineering Document', 15, 285);

      doc.save(`DS_Industries_${(valve.tag || 'Valve').replace(/\s+/g, '_')}_Datasheet.pdf`);
    });
  }

  // ==========================================================================
  // 9. Forms Handlers (Integrated with Jasvi ERP)
  // ==========================================================================
  function setupRfqForm() {
    const form = document.getElementById('rfq-form');
    const feedback = document.getElementById('rfq-feedback-msg');
    if (!form || !feedback) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rfq-name').value;
      const email = document.getElementById('rfq-email').value;
      const valveType = document.getElementById('rfq-valve-type').value;

      feedback.style.display = 'block';
      feedback.style.color = '#0284c7';
      feedback.textContent = `Connecting to Jasvi ERP... Registering technical RFQ for ${name} (${valveType})...`;

      setTimeout(() => {
        feedback.style.color = '#0369a1';
        feedback.textContent = `✓ Technical RFQ successfully registered! Our Ahmedabad engineering sales team will send a formal quote to ${email} within 2 hours.`;
        form.reset();
        const nameDisplay = document.getElementById('file-name-display');
        if (nameDisplay) nameDisplay.textContent = '';
      }, 1100);
    });
  }

  function setupContactEnquiryForm() {
    const contactForm = document.getElementById('contact-enquiry-form');
    const contactFeedback = document.getElementById('contact-feedback');
    const productSelect = document.getElementById('contact-product');
    
    const params = new URLSearchParams(window.location.search);
    const prodParam = params.get('product');
    if (productSelect && prodParam) {
      for (let i = 0; i < productSelect.options.length; i++) {
        const optText = productSelect.options[i].text.toLowerCase();
        const search = prodParam.toLowerCase();
        if (optText.includes(search)) {
          productSelect.selectedIndex = i;
          break;
        }
      }
    }

    if (!contactForm || !contactFeedback) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const product = document.getElementById('contact-product').value;

      contactFeedback.style.display = 'block';
      contactFeedback.style.color = '#0284c7';
      contactFeedback.textContent = `Submitting quotation request for ${name} (${product})...`;

      setTimeout(() => {
        contactFeedback.style.color = '#0369a1';
        contactFeedback.textContent = `✓ Quotation request received! Our Ahmedabad plant will dispatch technical details to ${email} shortly.`;
        contactForm.reset();
      }, 950);
    });
  }

  // ==========================================================================
  // 10. Dedicated Product Detail Page Hydrator (BOM + Dimensional Matrix)
  // ==========================================================================
  function initProductDetailPage(valves) {
    const detailContainer = document.querySelector('.product-detail-container');
    if (!detailContainer || !valves || valves.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'prod-ball-valve';
    const valve = valves.find(v => v.id === id) || valves[0];

    const titleEl = document.getElementById('detail-page-title');
    const imgEl = document.getElementById('detail-product-img');
    const vigLeftEl = document.getElementById('banner-vignette-left');
    const para1El = document.getElementById('detail-para-1');
    const para2El = document.getElementById('detail-para-2');
    const specSurface = document.getElementById('spec-surface');
    const specMaterial = document.getElementById('spec-material');
    const specApplication = document.getElementById('spec-application');
    const specShape = document.getElementById('spec-shape');
    const specPressure = document.getElementById('spec-pressure');
    const enquiryBtn = document.getElementById('detail-enquiry-btn');

    if (titleEl) titleEl.textContent = valve.ribbonTitle || valve.title;
    if (imgEl) {
      imgEl.src = valve.image;
      imgEl.alt = valve.title;
    }
    if (vigLeftEl) {
      vigLeftEl.src = valve.image;
      vigLeftEl.alt = valve.title;
    }
    if (para1El) {
      para1El.innerHTML = `<strong>DS INDUSTRIES</strong> is a leading manufacturer, supplier and exporter of <strong>${valve.ribbonTitle || valve.title}</strong> based in Ahmedabad (Gujarat, India). Engineered strictly in accordance with <strong>${valve.standards ? valve.standards[0].std : 'API & ASME'}</strong> standards, this valve ensures 100% bubble-tight shut-off in severe industrial service conditions. Manufactured with high-integrity ${Array.isArray(valve.materials) ? valve.materials.join(', ') : 'WCB Cast Steel / SS316'} metallurgy to withstand severe pressures and corrosive operating media. Clients can procure these certified precision components from us with full material test certificates (EN 10204 Type 3.1).`;
    }
    if (para2El) {
      para2El.textContent = valve.meta || 'Precision-engineered industrial valve tested 100% to API 598 hydrostatic standards.';
    }
    if (specSurface) specSurface.textContent = '125 - 250 AARH Flange Finish / Burnished Double Acme';
    if (specMaterial) specMaterial.textContent = Array.isArray(valve.materials) ? valve.materials.join(' / ') : 'WCB / CF8 / CF8M';
    if (specApplication) specApplication.textContent = 'Petrochemical, Power, Refinery & Process Pipelines';
    if (specShape) specShape.textContent = valve.tag || 'Industrial Valve';
    if (specPressure) specPressure.textContent = (valve.badges && valve.badges[1]) ? valve.badges[1] : 'ASME Class 150# - 600#';
    if (enquiryBtn) {
      enquiryBtn.href = `contact.html?product=${encodeURIComponent(valve.ribbonTitle || valve.title)}`;
    }

    // Render Standards Chips
    const stdContainer = document.getElementById('detail-standards-grid');
    if (stdContainer && valve.standards) {
      stdContainer.innerHTML = valve.standards.map(s => `
        <div class="std-chip">
          <span class="std-chip-label">${s.item}</span>
          <span class="std-chip-val">${s.std}</span>
        </div>
      `).join('');
    }

    // Render Bill of Materials (BOM) Table
    const bomTbody = document.getElementById('bom-table-body');
    const bomWrap = document.getElementById('bom-section-container');
    if (bomTbody && valve.bom && Array.isArray(valve.bom)) {
      if (bomWrap) bomWrap.style.display = 'block';
      bomTbody.innerHTML = valve.bom.map(b => `
        <tr>
          <td><strong>${b.part}</strong></td>
          <td>${b.mat1 || '-'}</td>
          <td>${b.mat2 || '-'}</td>
          <td>${b.mat3 || '-'}</td>
        </tr>
      `).join('');
    } else if (bomWrap) {
      bomWrap.style.display = 'none';
    }

    // Render Dimensional Matrix Table
    renderDimensionalMatrix(valve);
  }

  // ==========================================================================
  // 10B. Dimensional Matrix Renderer with Interactive Unit Switcher & Class Tabs
  // ==========================================================================
  function renderDimensionalMatrix(valve) {
    const matrixContainer = document.getElementById('dimensional-matrix-container');
    if (!matrixContainer || !valve || !valve.dimensions) {
      if (matrixContainer) matrixContainer.style.display = 'none';
      return;
    }

    matrixContainer.style.display = 'block';

    const dims = valve.dimensions;
    const availableClasses = Object.keys(dims);
    if (!availableClasses.includes(activeDimensionClass)) {
      activeDimensionClass = availableClasses[0];
    }

    // Render Class Tabs
    const tabsContainer = document.getElementById('matrix-class-tabs');
    if (tabsContainer) {
      tabsContainer.innerHTML = availableClasses.map(clsKey => {
        let label = clsKey.toUpperCase();
        if (clsKey === 'class150') label = 'ASME 150#';
        if (clsKey === 'class300') label = 'ASME 300#';
        if (clsKey === 'class600') label = 'ASME 600#';
        if (clsKey === 'class800') label = 'Class 800#';
        if (clsKey === 'flanged150') label = 'Flanged 150#';
        if (clsKey === 'gearOperated') label = 'Gear PN10/16';
        if (clsKey === 'iso5211Flange') label = 'ISO 5211 Mount';
        return `
          <button type="button" class="matrix-class-btn ${clsKey === activeDimensionClass ? 'active' : ''}" data-class="${clsKey}">
            ${label}
          </button>
        `;
      }).join('');

      tabsContainer.querySelectorAll('.matrix-class-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeDimensionClass = btn.getAttribute('data-class');
          tabsContainer.querySelectorAll('.matrix-class-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderTableData(dims[activeDimensionClass]);
        });
      });
    }

    // Unit toggle buttons
    const unitBtns = document.querySelectorAll('.unit-btn');
    unitBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeDimensionUnit = btn.getAttribute('data-unit');
        unitBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTableData(dims[activeDimensionClass]);
      });
    });

    function formatVal(v) {
      if (typeof v !== 'number') return v;
      if (activeDimensionUnit === 'in') {
        return (v / 25.4).toFixed(2);
      }
      return v;
    }

    function renderTableData(rows) {
      const thead = document.getElementById('matrix-table-head');
      const tbody = document.getElementById('matrix-table-body');
      if (!thead || !tbody || !rows || rows.length === 0) return;

      const keys = Object.keys(rows[0]);
      
      // Dynamic header mapping
      thead.innerHTML = `
        <tr>
          ${keys.map(k => {
            let label = k.toUpperCase();
            if (k === 'size') label = 'Nominal Size';
            if (k === 'dn') label = 'DN (mm)';
            if (k === 'ftof') label = `F to F (${activeDimensionUnit})`;
            if (k === 'flangeDia' || k === 'od' || k === 'dia') label = `Flange Dia (${activeDimensionUnit})`;
            if (k === 'rfd') label = `RFD (${activeDimensionUnit})`;
            if (k === 'thk' || k === 'ft') label = `Thickness (${activeDimensionUnit})`;
            if (k === 'pcd') label = `PCD (${activeDimensionUnit})`;
            if (k === 'holeDia') label = `Hole Dia (${activeDimensionUnit})`;
            if (k === 'noh') label = 'No. of Holes';
            if (k === 'wt') label = 'Weight (Kg)';
            return `<th>${label}</th>`;
          }).join('')}
        </tr>
      `;

      tbody.innerHTML = rows.map(row => `
        <tr>
          ${keys.map(k => {
            let val = row[k];
            if (['ftof', 'flangeDia', 'od', 'dia', 'rfd', 'thk', 'ft', 'pcd', 'holeDia', 'l', 'c', 'd', 'a', 'b', 'e', 'f', 'g'].includes(k)) {
              val = formatVal(val);
            }
            return `<td>${val}</td>`;
          }).join('')}
        </tr>
      `).join('');
    }

    renderTableData(dims[activeDimensionClass]);
  }

  // ==========================================================================
  // 11. AI Industrial Valve Selection Co-Pilot
  // ==========================================================================
  function initAiValveCopilot(valves) {
    const copilot = document.getElementById('ai-valve-copilot');
    if (!copilot || !Array.isArray(valves) || valves.length === 0) return;

    const mediaEl = document.getElementById('ai-media-select');
    const pressEl = document.getElementById('ai-pressure-select');
    const funcEl = document.getElementById('ai-conn-select'); // Used as Function
    const recTitle = document.getElementById('ai-rec-title');
    const recMoc = document.getElementById('ai-rec-moc');
    const recSeal = document.getElementById('ai-rec-seal');
    const recStd = document.getElementById('ai-rec-std');
    const btnInspect = document.getElementById('btn-ai-inspect');

    let recommendedValve = valves[0];

    function computeAiMatch() {
      const media = mediaEl ? mediaEl.value : 'steam';
      const press = pressEl ? pressEl.value : '300';
      const func = funcEl ? funcEl.value : 'isolation';

      let targetId = 'prod-ball-valve';
      let moc = 'MOC: ASTM A216 WCB / SS316';
      let seal = 'Trims: API 607 Fire-Safe Spiral Wound & PTFE';
      let std = 'Standards: API 6D, ASME B16.34, API 598';

      if (media === 'slurry' || media === 'pulp') {
        targetId = media === 'pulp' ? 'prod-pulp-valve' : 'prod-knife-gate-valve';
        moc = 'MOC: Cast Steel / Stainless CF8M with Batten Knife Gate';
        seal = 'Seat: Renewable Metal-to-Metal / Abrasive Slurry PTFE';
        std = 'Standard: PN 10 Class & Slurry Directives';
      } else if (media === 'steam' || func === 'throttling') {
        targetId = 'prod-globe-valve';
        moc = 'MOC: ASTM A216 WCB with 13% Cr / Stellite Facing';
        seal = 'Packing: Die-Formed Flexible Graphite (up to 450°C)';
        std = 'Standard: API 600, BS 1873, ASME B16.34';
      } else if (func === 'check') {
        targetId = press === '600' ? 'prod-dual-plate-check' : 'prod-swing-check';
        moc = 'MOC: WCB / CF8M with Retainerless Design';
        seal = 'Sealing: Resilient PTFE / Metal-to-Metal API 594';
        std = 'Standard: API 594 / API 600 Non-Return Standards';
      } else if (media === 'water' || func === 'cooling') {
        targetId = 'prod-butterfly-valve';
        moc = 'MOC: Cast Carbon WCB / Stainless CF8M';
        seal = 'Seat: Molded EPDM / Viton (100% Tight Shutoff)';
        std = 'Standard: BS 5155, API 609, ISO 5211 Actuator Ready';
      } else if (media === 'filtration') {
        targetId = press === '600' ? 'prod-basket-strainer' : 'prod-y-strainer';
        moc = 'MOC: WCB / SS316 with Stainless Mesh Lining';
        seal = 'Gasket: Spiral Wound SS316 with Quick Davit Lift';
        std = 'Standard: ASME Class 150# - 1500# Pipeline Filtration';
      } else if (press === '800' || press === '1500' || press === '2500') {
        targetId = 'prod-forged-gate';
        moc = 'MOC: ASTM A105 / F316L / Inconel 625 Forged';
        seal = 'Packing: API 602 Bolted/Welded Bonnet High-Pressure Seal';
        std = 'Standard: API 602 & ASME B16.34 (up to 2500#)';
      }

      recommendedValve = valves.find(v => v.id === targetId) || valves[0];

      if (recTitle) recTitle.textContent = recommendedValve.title;
      if (recMoc) recMoc.textContent = moc;
      if (recSeal) recSeal.textContent = seal;
      if (recStd) recStd.textContent = std;
    }

    [mediaEl, pressEl, funcEl].forEach(sel => {
      if (sel) sel.addEventListener('change', computeAiMatch);
    });

    if (btnInspect) {
      btnInspect.addEventListener('click', () => {
        window.location.href = `product-detail.html?id=${recommendedValve.id}`;
      });
    }

    computeAiMatch();
  }

  // ==========================================================================
  // 12. React Bits Spotlight & 3D Tilt Cursor Listeners
  // ==========================================================================
  function init3DMagneticTilt() {
    const cards = document.querySelectorAll(
      '.hydrevo-card, .swiper-showcase-container .swiper-slide, .facility-photo-card, .trust-badge-card, .telemetry-card'
    );

    cards.forEach((card) => {
      if (card.dataset.tiltBound === 'true') return;
      card.dataset.tiltBound = 'true';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -4.5;
        const ry = ((x - cx) / cx) * 4.5;

        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
        card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  // ==========================================================================
  // 13. Telemetry Counter & Scroll Reveal
  // ==========================================================================
  function initTelemetryAndScrollReveal() {
    const counters = document.querySelectorAll('.telemetry-counter');
    if (counters.length > 0 && 'IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || '100', 10);
          const duration = 1400;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(target * eased);
            el.textContent = target >= 1000 ? val.toLocaleString() : String(val);
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          }
          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      }, { threshold: 0.35 });

      counters.forEach(c => counterObserver.observe(c));
    }
  }

  // ==========================================================================
  // 14. Main Hydration Controller
  // ==========================================================================
  async function loadShowcaseData() {
    try {
      const response = await fetch('data/showcase.json');
      if (!response.ok) throw new Error('Failed to load showcase data');
      showcaseData = await response.json();

      if (showcaseData.valveProducts) {
        renderHydrevoProductGrid(showcaseData.valveProducts, 'all');
        setupCategoryFilters(showcaseData.valveProducts);
        initProductDetailPage(showcaseData.valveProducts);
        initAiValveCopilot(showcaseData.valveProducts);
      }

      if (showcaseData.workstations) {
        renderWorkstations(showcaseData.workstations);
      }

      init3DMagneticTilt();
    } catch (err) {
      console.warn('Falling back to default valve catalog:', err);
    }
  }

  // Run initialization routines
  initHeroCanvas();
  setupRfqDropzone();
  setupPdfGenerator();
  setupRfqForm();
  setupContactEnquiryForm();
  initTelemetryAndScrollReveal();
  loadShowcaseData();
});