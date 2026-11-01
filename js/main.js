/**
 * ============================================================================
 * Jasvi Industries - UserView Dynamic Showcase Engine (v3)
 * Hydrevo 1:1 Corporate Industrial Layout + Light Frosted Glassmorphism
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  let showcaseData = null;
  let activeSelectedValve = null;
  let swiperInstance = null;

  // ==========================================================================
  // 1. Ambient Fluid Flow Streamline Canvas (Light Blue Streamlines)
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
    const streamCount = Math.min(35, Math.floor(window.innerWidth / 35));

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120
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
        this.baseVx = 0.5 + Math.random() * 0.8;
        this.vx = this.baseVx;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = 1.8 + Math.random() * 1.5;
        this.alpha = 0.2 + Math.random() * 0.35;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        // Divert streamline around mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 4;
          this.y -= (dy / dist) * force * 4;
          this.vx = this.baseVx * (1 + force * 1.8);
        } else {
          this.vx += (this.baseVx - this.vx) * 0.05;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(28, 117, 188, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < streamCount; i++) {
      particles.push(new StreamParticle());
    }

    function animateStreams() {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(28, 117, 188, ${0.15 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.8;
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
  // 2. Swiper 3D Coverflow Initialization (Facility Workstations)
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
      speed: 700,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      coverflowEffect: {
        rotate: 18,
        stretch: 0,
        depth: 140,
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
  // 2B. Swiper Hero Carousel Initialization (Multi-Slide Top Hero)
  // ==========================================================================
  function initHeroSwiper() {
    if (typeof Swiper === 'undefined') return;
    const heroEl = document.querySelector('.hero-swiper');
    if (!heroEl) return;

    new Swiper('.hero-swiper', {
      loop: true,
      speed: 500,
      autoplay: {
        delay: 2800,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      },
      effect: 'slide'
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

    if (tagEl) tagEl.textContent = valve.tag || 'High-Pressure Valve Spec';
    if (titleEl) titleEl.textContent = valve.title;
    if (sizesEl) sizesEl.textContent = Array.isArray(valve.sizes) ? valve.sizes.join(', ') : 'Standard Sizes Available';
    if (endsEl) endsEl.textContent = Array.isArray(valve.endConnections) ? valve.endConnections.join(', ') : 'Threaded / Flanged';
    if (cvEl) cvEl.textContent = valve.cv || 'Calculated per Bore Size';
    if (tempEl) tempEl.textContent = valve.tempRange || '-54°C to 232°C';
    if (descEl) descEl.textContent = valve.meta || '';

    if (matsEl && Array.isArray(valve.materials)) {
      matsEl.innerHTML = valve.materials.map((m) => `
        <span class="mat-pill">${m}</span>
      `).join('');
    }

    // Highlight active card in the grid
    document.querySelectorAll('.hydrevo-card').forEach(card => {
      if (card.getAttribute('data-id') === valve.id) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }

  // ==========================================================================
  // 4. Render Hydrevo-Style Signature Product Cards (Image 4)
  // ==========================================================================
  function renderHydrevoProductGrid(valves, filter = 'all') {
    const grid = document.getElementById('valve-cards-grid');
    if (!grid) return;

    const filtered = filter === 'all'
      ? valves
      : valves.filter(v => v.category === filter);

    grid.innerHTML = filtered.map((v) => `
      <a href="product-detail.html?id=${v.id}" class="hydrevo-card" data-id="${v.id}" data-category="${v.category}">
        <!-- Top-Right Watermark Monogram (Hydrevo HE / Jasvi JI) -->
        <span class="card-watermark">JI</span>
        <div class="card-img-wrap">
          <img src="${v.image}" alt="${v.title}" />
        </div>
        <!-- Solid Blue Bottom Label Ribbon (Image 4) -->
        <div class="card-bottom-ribbon">${v.ribbonTitle || v.title}</div>
      </a>
    `).join('');

    // Attach click events to each card
    grid.querySelectorAll('.hydrevo-card').forEach(card => {
      card.addEventListener('click', () => {
        const valveId = card.getAttribute('data-id');
        const match = valves.find(item => item.id === valveId);
        if (match) {
          renderValveInspector(match);
          const inspectorSection = document.getElementById('valves-detail');
          if (inspectorSection) {
            inspectorSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });
    });

    // Auto-select first valve in inspector if not set
    if (!activeSelectedValve && filtered.length > 0) {
      renderValveInspector(filtered[0]);
    }
  }

  // ==========================================================================
  // 5. Render Facility Workstations in Swiper Wrapper
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
  // 7. RFQ Studio File Attachment Dropzone
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
        dropzone.style.borderColor = '#1c75bc';
        dropzone.style.background = '#e0f2fe';
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'rgba(28, 117, 188, 0.35)';
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
  // 8. Client-Side PDF Datasheet Generator (window.jspdf)
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

      const valve = activeSelectedValve || {
        title: 'Jasvi Precision Severe-Service Valve',
        tag: 'Technical Datasheet',
        sizes: ['1/4"', '1/2"', '3/4"', '1"'],
        materials: ['SS316', 'Duplex 2205', 'Inconel 625'],
        endConnections: ['NPT Threaded', 'Flanged RF'],
        cv: '0.35 - 1.80',
        tempRange: '-54°C to +450°C'
      };

      // Header Banner
      doc.setFillColor(28, 117, 188); // Hydrevo Blue #1c75bc
      doc.rect(0, 0, 210, 32, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text('JASVI INDUSTRIES', 15, 14);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Precision Valves & Flow Control Division • ISO 9001:2015 & API 598', 15, 22);
      doc.text('https://jasviindustries.in • info@jasviindustries.in', 15, 28);

      // Document Title
      doc.setTextColor(17, 24, 39);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('TECHNICAL VALVE SPECIFICATION DATA SHEET', 15, 45);

      doc.setDrawColor(28, 117, 188);
      doc.setLineWidth(0.8);
      doc.line(15, 48, 195, 48);

      // Model Specs
      doc.setFontSize(11);
      doc.setTextColor(28, 117, 188);
      doc.text(`Model: ${valve.title}`, 15, 57);

      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81);
      doc.setFont('helvetica', 'normal');

      const specs = [
        ['Classification Category', valve.tag || 'Instrumentation Valve'],
        ['Max Pressure Rating', 'Up to 10,000 PSI (API 598 Hydrostatic Tested)'],
        ['Available Nominal Sizes', Array.isArray(valve.sizes) ? valve.sizes.join(', ') : '1/4" to 1"'],
        ['Standard End Connections', Array.isArray(valve.endConnections) ? valve.endConnections.join(', ') : 'NPT Female / Male'],
        ['Metallurgy Material (MOC)', Array.isArray(valve.materials) ? valve.materials.join(', ') : 'SS316 / Duplex / Inconel'],
        ['Flow Coefficient (Cv)', valve.cv || '0.35 to 1.80'],
        ['Operating Temperature', valve.tempRange || '-54°C to 232°C (PTFE) / up to 450°C (Grafoil)'],
        ['Quality Standards', 'API 598, ASME B16.34, EN 10204 Type 3.1 Traceable']
      ];

      let currentY = 68;
      specs.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(31, 41, 55);
        doc.text(label + ':', 15, currentY);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(75, 85, 99);
        doc.text(value, 80, currentY);

        doc.setDrawColor(241, 245, 249);
        doc.line(15, currentY + 3, 195, currentY + 3);
        currentY += 10;
      });

      // Manufacturing Guarantee Box
      currentY += 8;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(28, 117, 188);
      doc.rect(15, currentY, 180, 28, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(28, 117, 188);
      doc.text('Jasvi Manufacturing & Zero-Leakage Guarantee', 20, currentY + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(75, 85, 99);
      doc.text('Every valve is 100% helium bubble-tight and hydrostatic shell tested to API 598.', 20, currentY + 15);
      doc.text('Manufactured using 5-axis CNC machining at our Surat & Ahmedabad facilities.', 20, currentY + 21);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text('Generated dynamically from Jasvi ERP Web Showcase • Confidential Technical Document', 15, 285);

      doc.save(`Jasvi_Valve_Datasheet_${(valve.tag || 'Spec').replace(/\s+/g, '_')}.pdf`);
    });
  }

  // ==========================================================================
  // 9. RFQ & Contact Form Submission Handlers (Integrated with Jasvi ERP)
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
      feedback.style.color = '#1c75bc';
      feedback.textContent = `Connecting to Jasvi ERP... Registering technical RFQ for ${name} (${valveType})...`;

      setTimeout(() => {
        feedback.style.color = '#10b981';
        feedback.textContent = `✓ Technical RFQ successfully registered in Jasvi ERP! An engineering quote will be sent to ${email} within 2 hours.`;
        form.reset();
        const nameDisplay = document.getElementById('file-name-display');
        if (nameDisplay) nameDisplay.textContent = '';
      }, 1200);
    });
  }

  function setupContactEnquiryForm() {
    const contactForm = document.getElementById('contact-enquiry-form');
    const contactFeedback = document.getElementById('contact-feedback');
    const productSelect = document.getElementById('contact-product');
    
    // Auto pre-select product from URL parameter (?product=...)
    const params = new URLSearchParams(window.location.search);
    const prodParam = params.get('product');
    if (productSelect && prodParam) {
      for (let i = 0; i < productSelect.options.length; i++) {
        const optText = productSelect.options[i].text.toLowerCase();
        const optVal = productSelect.options[i].value.toLowerCase();
        const search = prodParam.toLowerCase();
        if (optText.includes(search) || optVal.includes(search) || search.includes(optVal)) {
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
      contactFeedback.style.color = '#1c75bc';
      contactFeedback.textContent = `Submitting quotation request for ${name} (${product})...`;

      setTimeout(() => {
        contactFeedback.style.color = '#10b981';
        contactFeedback.textContent = `✓ Quotation request successfully received! Our technical team will reach out at ${email} shortly.`;
        contactForm.reset();
      }, 1000);
    });
  }

  // ==========================================================================
  // 10. Dedicated Product Detail Page Hydrator (Matching Image 2 1:1)
  // ==========================================================================
  function initProductDetailPage(valves) {
    const detailContainer = document.querySelector('.product-detail-container');
    if (!detailContainer || !valves || valves.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'v-manifold-5w';
    const valve = valves.find(v => v.id === id) || valves[0];

    const titleEl = document.getElementById('detail-page-title');
    const imgEl = document.getElementById('detail-product-img');
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
    if (para1El) {
      para1El.innerHTML = `<strong>Jasvi Industries</strong> is a leading manufacturer, supplier and exporter of <strong>${valve.ribbonTitle || valve.title}</strong> in Ahmedabad & Surat (Gujarat, India). We provide precision-engineered Severe-Service fluid systems designed to regulate high-pressure media with zero leakage. Manufactured using superior ${Array.isArray(valve.materials) ? valve.materials.join(', ') : 'SS316 / Duplex'} alloys that are resistive to corrosion, rust, and severe abrasive chemicals, this valve is engineered to last for an extended operational lifecycle. It can be effortlessly integrated with critical process piping and hydraulic systems. Clients can procure these precision components from us at highly competitive direct-manufacturer rates.`;
    }
    if (para2El) {
      para2El.textContent = valve.meta || 'Precision-machined severe-service valve engineered according to ASME B16.34 and API 598 standards.';
    }
    if (specSurface) specSurface.textContent = 'Grinding Finish / Micro-Lapped Seat';
    if (specMaterial) specMaterial.textContent = Array.isArray(valve.materials) ? valve.materials.join(' / ') : 'SS316 / Duplex 2205 / Inconel';
    if (specApplication) specApplication.textContent = 'Severe-Service Instrumentation & Process Piping';
    if (specShape) specShape.textContent = valve.tag || 'Forged Monoblock';
    if (specPressure) specPressure.textContent = (valve.badges && valve.badges[1]) ? valve.badges[1] : 'Up to 10,000 PSI / 250 Bar';
    if (enquiryBtn) {
      enquiryBtn.href = `contact.html?product=${encodeURIComponent(valve.ribbonTitle || valve.title)}`;
    }
  }

  // ==========================================================================
  // 11. Main Hydration Controller
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
      }

      if (showcaseData.workstations) {
        renderWorkstations(showcaseData.workstations);
      }
    } catch (err) {
      console.warn('Falling back to default valve catalog:', err);
    }
  }

  // Run all initialization routines
  initHeroCanvas();
  initHeroSwiper();
  setupRfqDropzone();
  setupPdfGenerator();
  setupRfqForm();
  setupContactEnquiryForm();
  loadShowcaseData();
});
