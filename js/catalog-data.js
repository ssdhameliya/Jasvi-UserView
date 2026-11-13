/**
 * DS INDUSTRIES - Industrial Valves & Flow Control Solutions
 * Centralized Technical Catalog Data Store & Shared Component Logic
 */

const SITE_CONFIG = {
  companyName: 'DS INDUSTRIES',
  tagline: 'Committed With Precision & Performance',
  website: 'www.dsindustries.com',
  phoneDisplay: '+91 95126 90771',
  phoneRaw: '+919512690771',
  email: 'dsindustries89@gmail.com',
  address: 'H - 52, Darshanvilla Park, Nr. Gopal Chowk, Nikol - Naroda, Ahmedabad - 382345 (Gujarat, India)',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=H-52+Darshanvilla+Park+Nr+Gopal+Chowk+Nikol+Naroda+Ahmedabad+382345',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Nikol%20Naroda%20Ahmedabad%20382345&t=&z=14&ie=UTF8&iwloc=&output=embed',
  socials: {
    linkedin: 'https://www.linkedin.com/company/ds-industries-india',
    whatsapp: 'https://wa.me/919512690771?text=Hello%20DS%20Industries%2C%20I%20would%20like%20to%20inquire%20about%20industrial%20valves.'
  },
  heroSlides: [
    {
      id: 'slide-1',
      badge: 'API 6D • API 600 • ASME B16.34',
      title: "India's Leading Industrial Valves Solution Provider",
      subtitle: 'Precision-engineered Cast Carbon, Stainless & Alloy Steel Ball, Gate, Globe, and High-Performance Butterfly Valves built for zero-leakage reliability.',
      ctaPrimaryText: 'Explore Full Catalog (14)',
      ctaPrimaryLink: 'products.html',
      ctaSecondaryText: 'Contact Us Directly',
      ctaSecondaryLink: 'contact.html',
      schematicType: 'ball',
      stats: [
        { label: 'Size Range', value: '1/2" – 28"' },
        { label: 'Pressure Class', value: '150# – 2500#' },
        { label: 'Testing Std', value: 'API 598 / BS 6755' }
      ]
    },
    {
      id: 'slide-2',
      badge: 'API 602 • CLASS 800# TO 2500#',
      title: 'High-Pressure Forged Steel Valve Series',
      subtitle: 'Bolted & Welded Bonnet Forged Gate, Globe, Check, and 3-PC Ball Valves manufactured in A105, F316L, Duplex F51/F53, Monel K400, and Inconel 625.',
      ctaPrimaryText: 'View Forged Series',
      ctaPrimaryLink: 'products.html?category=forged',
      ctaSecondaryText: 'Open ASME CAD Matrix',
      ctaSecondaryLink: 'engineering-lab.html',
      schematicType: 'forged',
      stats: [
        { label: 'Max Rating', value: 'ASME 2500#' },
        { label: 'End Types', value: 'SW • NPT • BW • RF' },
        { label: 'Alloys', value: 'Inconel • Duplex' }
      ]
    },
    {
      id: 'slide-3',
      badge: 'MESCO SERIES • ABRASIVE & VISCOUS MEDIA',
      title: 'Severe Slurry & Pulp Isolation Solutions',
      subtitle: 'Unidirectional and Bidirectional Knife Edge Gate Valves & Pulp Plate Valves engineered for Mining, Power, Paper, Sugar, and Cement plants.',
      ctaPrimaryText: 'Explore Slurry & Pulp',
      ctaPrimaryLink: 'products.html?category=slurry',
      ctaSecondaryText: 'Consult Application Team',
      ctaSecondaryLink: 'contact.html',
      schematicType: 'knife',
      stats: [
        { label: 'Port Range', value: 'DN 50 – DN 600' },
        { label: 'Actuation', value: 'Manual • Pneumatic • Elec' },
        { label: 'Shutoff', value: '100% Tight Seal' }
      ]
    },
    {
      id: 'slide-4',
      badge: 'PROCESS FILTRATION • CLASS 125 – 1500',
      title: 'Industrial Pipeline Strainers & Bag Filters',
      subtitle: 'Streamlined low-pressure-drop Y-Type, T-Type, Simplex/Duplex Basket Strainers, Temporary Cone Strainers, and Multi-Bag Filter Housings.',
      ctaPrimaryText: 'View Filtration Range',
      ctaPrimaryLink: 'product-detail.html?slug=strainers-bag-filters',
      ctaSecondaryText: 'Size Your Flow (Cv)',
      ctaSecondaryLink: 'engineering-lab.html#sizing-lab',
      schematicType: 'strainer',
      stats: [
        { label: 'Open Area', value: '100% – 300%' },
        { label: 'Construction', value: 'CS • SS 304 • SS 316' },
        { label: 'Accessories', value: 'DP Gauges & Spares' }
      ]
    }
  ]
};

const CATALOG_DATA = {
  categories: [
    { id: 'all', name: 'All Products' },
    { id: 'cast', name: 'Cast Industrial Valves' },
    { id: 'check', name: 'Check (Non-Return) Valves' },
    { id: 'slurry', name: 'Slurry & Pulp Valves' },
    { id: 'forged', name: 'Forged Valves & Strainers' }
  ],
  products: [
    {
      id: 1,
      slug: 'ball-valves',
      name: 'Ball Valves',
      subtitle: 'Bolted Side Piece Cast Carbon, Stainless or Alloy Steel',
      category: 'cast',
      schematic: 'ball',
      sizeRange: '2" – 12" (DN 15 – DN 300)',
      pressureClasses: ['150#', '300#', '600#'],
      materials: ['WCB', 'CF8', 'CF8M'],
      endConnections: ['Flanged (RF/FF)', 'RTJ', 'Butt Weld'],
      standardsBadge: 'API 6D • API 607 Fire Safe',
      summary: '2 & 3-Piece Side Entry / Split Body Ball Valves featuring anti-static, blow-out proof stems, floating & trunnion ball designs, and fire-safe API 607 certification.',
      features: [
        '2 & 3-Piece, Side Entry / Split Body construction',
        'Fire Safe (API 607 / API 6FA), Anti-static & Blow-out Proof Stem',
        'Floating & Trunnion mounted ball design; Full bore or Reduced bore',
        'End Connections: Flat Flanged, RF Flanged, RTJ & Butt Welding ends',
        'Operation: Lever operated up to 6" size & Worm Gear box for above sizes',
        'Multiple V-Teflon stem packing combined with live loading'
      ],
      standards: [
        { item: 'Design Standard', std: 'API 6D / BS 5351' },
        { item: 'Fire Safe Standard', std: 'API 607 / API 6FA' },
        { item: 'Pressure-Temperature Rating', std: 'ASME B16.34' },
        { item: 'Face-to-Face Dimensions', std: 'ASME B16.10' },
        { item: 'Testing Standard', std: 'API 598 / BS 6755' },
        { item: 'Flange / Butt Weld Design', std: 'ASME B16.5 / ASME B16.25' }
      ],
      bom: [
        { part: 'Body & Side Piece', wcb: 'ASTM A216 WCB', cf8: 'ASTM A351 CF8', cf8m: 'ASTM A351 CF8M' },
        { part: 'Ball', wcb: 'WCB + ENP / CF8', cf8: 'CF8 / CF8M', cf8m: 'CF8M' },
        { part: 'Stem', wcb: 'SS 410 / 17-4 PH', cf8: 'SS 304', cf8m: 'SS 316' },
        { part: 'Seat Seal', wcb: 'PTFE / CFT / GFT / VITON', cf8: 'PTFE / CFT / GFT / VITON', cf8m: 'PTFE / CFT / GFT / VITON' },
        { part: 'Gasket & Packing', wcb: 'PTFE / Spiral Wound', cf8: 'PTFE / Spiral Wound', cf8m: 'PTFE / Spiral Wound' },
        { part: 'Trunnion MOC', wcb: 'AISI 410 / SS 304', cf8: 'SS 304 / SS 316', cf8m: 'SS 316' },
        { part: 'Body Studs / Nuts', wcb: 'Gr. B7 / Gr. 2H', cf8: 'Gr. B8 / Gr. 8', cf8m: 'Gr. B8M / Gr. 8M' }
      ],
      dimensions: {
        'ASME Class 150#': {
          headers: ['DN (mm)', 'F to F', 'Flange Dia', 'RFD', 'THK', 'PCD', 'Hole Dia', 'No. of Holes'],
          rows: [
            ['15', '108', '90', '35', '9.6', '60.3', '15.9', '4'],
            ['25', '127', '110', '51', '12.7', '79.4', '15.9', '4'],
            ['50', '178', '150', '92', '17.5', '120.7', '19.05', '4'],
            ['80', '203', '190', '127', '22.3', '152.4', '19.05', '4'],
            ['100', '229', '230', '157', '22.3', '190.5', '19.05', '8'],
            ['150', '267', '280', '216', '23.9', '241.3', '22.22', '8'],
            ['200', '292', '345', '270', '27.0', '298.5', '22.22', '8'],
            ['250', '330', '405', '324', '28.6', '362.0', '25.4', '12'],
            ['300', '356', '485', '381', '30.2', '431.8', '25.4', '12']
          ]
        },
        'ASME Class 300#': {
          headers: ['DN (mm)', 'F to F', 'Flange Dia', 'RFD', 'THK', 'PCD', 'Hole Dia', 'No. of Holes'],
          rows: [
            ['15', '140', '95', '35', '12.7', '66.7', '15.9', '4'],
            ['25', '165', '125', '51', '15.9', '88.9', '19.05', '4'],
            ['50', '216', '165', '92', '20.7', '127.0', '19.05', '8'],
            ['80', '282', '210', '127', '27.0', '168.3', '22.22', '8'],
            ['100', '305', '255', '157', '30.2', '200.0', '22.22', '8'],
            ['150', '403', '320', '216', '35.0', '269.9', '22.22', '12'],
            ['200', '502', '380', '270', '39.7', '330.2', '25.4', '12'],
            ['250', '568', '445', '324', '46.1', '387.4', '28.57', '12'],
            ['300', '648', '520', '381', '49.3', '450.8', '31.75', '12']
          ]
        },
        'ASME Class 600#': {
          headers: ['DN (mm)', 'F to F', 'Flange Dia', 'RFD', 'THK', 'PCD', 'Hole Dia', 'No. of Holes'],
          rows: [
            ['15', '165', '95', '35', '14.3', '66.7', '15.9', '4'],
            ['25', '216', '125', '51', '17.5', '88.9', '19.05', '4'],
            ['50', '292', '165', '92', '25.4', '127.0', '19.05', '8'],
            ['80', '356', '210', '127', '31.8', '168.3', '22.22', '8'],
            ['100', '432', '275', '157', '38.1', '215.9', '25.4', '8'],
            ['150', '559', '355', '216', '47.7', '292.1', '28.57', '12'],
            ['200', '660', '420', '270', '55.6', '349.2', '31.75', '12'],
            ['250', '787', '510', '324', '63.5', '431.8', '34.92', '16'],
            ['300', '838', '560', '381', '66.7', '489.0', '34.92', '20']
          ]
        }
      }
    },
    {
      id: 2,
      slug: 'gate-valves',
      name: 'Gate Valves',
      subtitle: 'Bolted Bonnet Cast Carbon, Stainless or Alloy Steel',
      category: 'cast',
      schematic: 'gate',
      sizeRange: '2" – 24" (DN 50 – DN 600)',
      pressureClasses: ['150#', '300#', '600#'],
      materials: ['WCB', 'CF8', 'CF8M'],
      endConnections: ['Flanged (RF)', 'RTJ', 'Butt Weld'],
      standardsBadge: 'API 600 • ISO 10434',
      summary: 'Heavy-duty Bolted Bonnet OS&Y Gate Valves with flexible mirror-lapped wedge, non-rotating precision acme stem, and CoCr alloy hard-faced seats up to 850°F (454°C).',
      features: [
        'Trims: 13% Cr stem-wedge in CA15 and CoCr alloy faced seat (API Trim 8) up to 850°F (454°C)',
        'Flexible wedge ground & lapped to mirror finish, tightly guided to prevent seat drag',
        'Non-rotating stem with precision double acme threads and burnished finish',
        'One-piece bonnet up to NPS 12 (DN 300) for superior alignment',
        'Flange finish 125–250 AARH (2mm raised face for Class 150–300, 7mm for 600+)',
        'Renewable inline austenitic ductile iron Gr. D-2C rotating stem nut'
      ],
      standards: [
        { item: 'General Design (<= NPS 24)', std: 'API 600 / ISO 10434' },
        { item: 'General Design (> NPS 24)', std: 'ASME B16.34' },
        { item: 'Pressure-Temperature Rating', std: 'ASME B16.34' },
        { item: 'Face-to-Face Dimensions', std: 'ASME B16.10' },
        { item: 'Testing Standard', std: 'API 598' },
        { item: 'Flange / Butt Weld Design', std: 'ASME B16.5 / ASME B16.25' }
      ],
      bom: [
        { part: 'Body & Bonnet', wcb: 'ASTM A216 WCB', cf8: 'ASTM A351 CF8', cf8m: 'ASTM A351 CF8M' },
        { part: 'Stem & Back Seat', wcb: 'SS 410', cf8: 'SS 304', cf8m: 'SS 316' },
        { part: 'Wedge', wcb: 'CA15 / 13Cr Faced', cf8: 'CF8', cf8m: 'CF8M' },
        { part: 'Seat Ring', wcb: '13% Cr / CoCr Faced', cf8: 'CoCr Alloy Faced', cf8m: 'CoCr Alloy Faced' },
        { part: 'Packing Ring', wcb: 'Die-Formed Graphite', cf8: 'Die-Formed Graphite', cf8m: 'Die-Formed Graphite' },
        { part: 'Gasket', wcb: 'Corrugated / Spiral Wound', cf8: 'Spiral Wound SS/Graphite', cf8m: 'Spiral Wound SS/Graphite' },
        { part: 'Body/Bonnet Studs', wcb: 'ASTM A193 Gr. B7', cf8: 'ASTM A193 Gr. B8', cf8m: 'ASTM A193 Gr. B8M' }
      ],
      dimensions: {
        'ANSI 150# Class': {
          headers: ['Size', 'F to F', 'OD', 'THK', 'RFD', 'PCD', 'Hole Dia (ød)', 'NOH'],
          rows: [
            ['2"', '178', '150', '17.5', '92', '121', '19.1', '4'],
            ['3"', '203', '190', '22.3', '127', '152', '19.1', '4'],
            ['4"', '229', '230', '22.3', '157', '191', '19.1', '8'],
            ['6"', '267', '280', '25.4', '216', '241', '22.2', '8'],
            ['8"', '292', '345', '28.6', '270', '299', '22.2', '8'],
            ['10"', '330', '405', '30.2', '324', '362', '25.4', '12'],
            ['12"', '356', '485', '31.8', '381', '432', '25.4', '12'],
            ['16"', '406', '595', '35.0', '470', '540', '28.6', '16'],
            ['24"', '508', '815', '46.1', '692', '749', '34.9', '20']
          ]
        },
        'ANSI 300# Class': {
          headers: ['Size', 'F to F', 'OD', 'THK', 'RFD', 'PCD', 'Hole Dia (ød)', 'NOH'],
          rows: [
            ['2"', '216', '165', '20.7', '92', '127', '19.1', '8'],
            ['3"', '282', '210', '27.0', '127', '168', '22.2', '8'],
            ['4"', '305', '255', '30.2', '157', '200', '22.2', '8'],
            ['6"', '403', '320', '35.0', '216', '270', '22.2', '12'],
            ['8"', '419', '380', '39.7', '270', '330', '25.4', '12'],
            ['10"', '457', '445', '46.1', '324', '387', '28.6', '16'],
            ['12"', '501', '520', '49.3', '381', '451', '31.8', '16'],
            ['16"', '838', '650', '55.6', '470', '572', '34.9', '20'],
            ['24"', '1143', '915', '68.3', '692', '813', '41.3', '24']
          ]
        }
      }
    },
    {
      id: 3,
      slug: 'globe-valves',
      name: 'Globe Valves',
      subtitle: 'Bolted Bonnet Cast Carbon, Stainless or Alloy Steel',
      category: 'cast',
      schematic: 'globe',
      sizeRange: '2" – 24" (DN 50 – DN 600)',
      pressureClasses: ['150#', '300#', '600#'],
      materials: ['WCB', 'CF8', 'CF8M'],
      endConnections: ['Flanged (RF)', 'RTJ', 'Butt Weld'],
      standardsBadge: 'BS 1873 • ASME B16.34',
      summary: 'Precision throttling and isolation Globe Valves with tapered hard-faced plug/disc, one-piece bolted bonnet, and burnished non-rotating acme stem.',
      features: [
        'Trims: 13% Cr stem, 13Cr faced plug and CoCr alloy faced seat (API Trim 8) up to 850°F',
        'Tapered disc accurately mates hard-faced surfaces, ground & lapped with seat',
        'One-piece precision machined bonnet for superior stem alignment',
        'Non-rotating stem with double acme threads for smooth, fast throttling',
        'Spiral wound body-bonnet gaskets for Class 300–1500 service'
      ],
      standards: [
        { item: 'General Design (< NPS 24)', std: 'API 600 / BS 1873' },
        { item: 'General Design (> NPS 24)', std: 'ASME B16.34' },
        { item: 'Pressure-Temperature Rating', std: 'ASME B16.34' },
        { item: 'Face-to-Face Dimensions', std: 'ASME B16.10' },
        { item: 'Testing Standard', std: 'API 598' },
        { item: 'Flange / Butt Weld Design', std: 'ASME B16.5 / ASME B16.25' }
      ],
      bom: [
        { part: 'Body & Bonnet', wcb: 'ASTM A216 WCB', cf8: 'ASTM A351 CF8', cf8m: 'ASTM A351 CF8M' },
        { part: 'Stem', wcb: 'SS 410', cf8: 'SS 304', cf8m: 'SS 316' },
        { part: 'Plug / Disc', wcb: 'CA15 / 13Cr Faced', cf8: 'CF8', cf8m: 'CF8M' },
        { part: 'Seat', wcb: '13% Cr / Stellite', cf8: 'CoCr Alloy Faced', cf8m: 'CoCr Alloy Faced' },
        { part: 'Packing Ring', wcb: 'Graphite', cf8: 'Graphite', cf8m: 'Graphite' },
        { part: 'Stem Nut', wcb: 'A439 Ductile Iron D-2C', cf8: 'A439 Ductile Iron D-2C', cf8m: 'A439 Ductile Iron D-2C' }
      ],
      dimensions: {
        'ANSI 150# Class': {
          headers: ['Size', 'F to F', 'OD', 'THK', 'RFD', 'PCD', 'Hole Dia', 'NOH'],
          rows: [
            ['2"', '203', '150', '17.5', '92', '120.7', '19.05', '4'],
            ['3"', '241', '190', '22.3', '127', '152.4', '19.05', '4'],
            ['4"', '292', '230', '22.3', '157', '190.5', '19.05', '8'],
            ['6"', '356', '280', '25.4', '216', '241.3', '22.23', '8'],
            ['8"', '495', '345', '28.6', '270', '298.5', '22.23', '8'],
            ['10"', '622', '405', '30.2', '324', '362.0', '25.40', '12'],
            ['12"', '699', '485', '31.8', '381', '431.8', '25.40', '12'],
            ['16"', '914', '595', '35.0', '470', '539.8', '28.58', '16'],
            ['24"', '1295', '815', '46.1', '692', '749.3', '34.93', '20']
          ]
        },
        'ANSI 300# Class': {
          headers: ['Size', 'F to F', 'OD', 'THK', 'RFD', 'PCD', 'Hole Dia', 'NOH'],
          rows: [
            ['2"', '266.7', '165', '20.7', '92', '127.0', '19.05', '8'],
            ['3"', '317.5', '210', '27.0', '127', '168.3', '22.22', '8'],
            ['4"', '355.6', '255', '30.2', '157', '200.0', '22.22', '8'],
            ['6"', '444.5', '320', '35.0', '216', '269.9', '22.22', '12'],
            ['8"', '558.8', '380', '39.7', '270', '330.2', '25.40', '12'],
            ['10"', '622.3', '445', '46.1', '324', '387.4', '28.57', '16'],
            ['12"', '711.2', '520', '49.3', '381', '450.8', '31.75', '16']
          ]
        }
      }
    },
    {
      id: 4,
      slug: 'swing-check-valves',
      name: 'Swing Check Valves',
      subtitle: 'Bolted Cover Non-Return Valves (Cast Carbon, SS or Alloy Steel)',
      category: 'check',
      schematic: 'swing-check',
      sizeRange: '2" – 24" (DN 50 – DN 600)',
      pressureClasses: ['150#', '300#', '600#'],
      materials: ['WCB', 'CF8', 'CF8M'],
      endConnections: ['Flanged (RF)', 'RTJ', 'Butt Weld'],
      standardsBadge: 'API 600 • BS 1868 • API 598',
      summary: 'Full-flow Swing Check Non-Return Valves with top-entry bolted cover, one-piece shock-resistant disc assembly, and ground/lapped CoCr alloy seats.',
      features: [
        'Non-rotating one-piece disc fastened securely to hanger with lock nut & cotter pin',
        'Sturdy disc carrier hinge pin with top-accessible cover for easy inline servicing',
        'Hard-faced with 13% Cr, CoCr alloy, SS 316, or Monel; ground & lapped with seat',
        'Suitable for high-temperature service up to 850°F (454°C)',
        'RTJ flange facings available on client requirement'
      ],
      standards: [
        { item: 'Design Standard', std: 'BS 1868 / API 600' },
        { item: 'Pressure-Temperature Rating', std: 'ASME B16.34' },
        { item: 'Face-to-Face Dimensions', std: 'ASME B16.10' },
        { item: 'Testing Standard', std: 'API 598' },
        { item: 'Flange / Butt Weld Design', std: 'ASME B16.5 / ASME B16.25' }
      ],
      bom: [
        { part: 'Body & Cover', wcb: 'ASTM A216 WCB', cf8: 'ASTM A351 CF8', cf8m: 'ASTM A351 CF8M' },
        { part: 'Hinge Pin', wcb: 'SS 410', cf8: 'SS 304', cf8m: 'SS 316' },
        { part: 'Disc', wcb: 'CA15 / 13Cr Faced WCB', cf8: 'CF8', cf8m: 'CF8M' },
        { part: 'Seat', wcb: '13% Cr / Stellite', cf8: 'CoCr Alloy Faced', cf8m: 'CoCr Alloy Faced' },
        { part: 'Body/Cover Studs', wcb: 'GR. B7 / GR. 2H', cf8: 'GR. B8 / GR. 8', cf8m: 'B8M / GR. 8M' }
      ],
      dimensions: {
        'ANSI 150# Class': {
          headers: ['Size', 'F to F', 'OD', 'THK', 'RFD', 'PCD', 'Hole Dia', 'NOH'],
          rows: [
            ['2"', '203', '150', '17.5', '92', '120.7', '19.05', '4'],
            ['3"', '241', '190', '22.3', '127', '152.4', '19.05', '4'],
            ['4"', '292', '230', '22.3', '157', '190.5', '19.05', '8'],
            ['6"', '356', '280', '25.4', '216', '241.3', '22.23', '8'],
            ['8"', '495', '345', '28.6', '270', '298.5', '22.23', '8'],
            ['12"', '699', '485', '31.8', '381', '431.8', '25.40', '12'],
            ['16"', '914', '595', '35.0', '470', '539.8', '28.58', '16'],
            ['24"', '1295', '815', '46.1', '692', '749.3', '34.93', '20']
          ]
        },
        'ANSI 300# Class': {
          headers: ['Size', 'F to F', 'OD', 'THK', 'RFD', 'PCD', 'Hole Dia', 'NOH'],
          rows: [
            ['2"', '266.7', '165', '20.7', '92', '127.0', '19.05', '8'],
            ['3"', '317.5', '210', '27.0', '127', '168.3', '22.22', '8'],
            ['4"', '355.6', '255', '30.2', '157', '200.0', '22.22', '8'],
            ['6"', '444.5', '320', '35.0', '216', '269.9', '22.22', '12'],
            ['8"', '533.4', '380', '39.7', '270', '330.2', '25.40', '12'],
            ['12"', '711.2', '520', '49.3', '381', '450.8', '31.75', '16'],
            ['24"', '1346.2', '915', '68.3', '692', '812.8', '41.28', '24']
          ]
        }
      }
    },
    {
      id: 5,
      slug: 'dual-plate-check-valves',
      name: 'Dual Plate Check Valves',
      subtitle: 'Retainerless Wafer Non-Return Valves (Cast Carbon, SS or Alloy)',
      category: 'check',
      schematic: 'dual-plate',
      sizeRange: '2" – 24" (DN 50 – DN 600)',
      pressureClasses: ['150#', '300#', '600#'],
      materials: ['WCB', 'CF8', 'CF8M'],
      endConnections: ['Wafer (ASME B16.5)'],
      standardsBadge: 'API 594 • API 609 Fire Safe',
      summary: 'Compact, spring-assisted Retainerless Dual Plate Check Valves offering fast non-slam closure, minimal pressure drop, and compliance with API 594 face-to-face dimensions.',
      features: [
        'Retainerless body design supplied as standard (no external body penetrations)',
        'Spring-loaded dual closure plates prevent water hammer and reverse flow slam',
        'API 594 short face-to-face dimensions to suit ANSI B16.5 flanges (NPS 2–24)',
        'Available with resilient PTFE/EPDM/Viton or Metal-to-Metal seating',
        'Fire Safe design compliant with API 609 & tested per API 598'
      ],
      standards: [
        { item: 'Design Standard', std: 'API 594' },
        { item: 'Wall Thickness & Rating', std: 'ASME B16.34' },
        { item: 'Testing Standard', std: 'API 598' },
        { item: 'Fire Safe Design', std: 'API 609' },
        { item: 'Flange Compatibility', std: 'ASME B16.5' }
      ],
      bom: [
        { part: 'Body', wcb: 'ASTM A216 WCB', cf8: 'ASTM A351 CF8', cf8m: 'ASTM A351 CF8M' },
        { part: 'Closure Plate', wcb: 'WCB / SS 304 / SS 316', cf8: 'CF8', cf8m: 'CF8M' },
        { part: 'Seat Ring', wcb: 'PTFE / Metal-to-Metal', cf8: 'PTFE / Metal-to-Metal', cf8m: 'PTFE / Metal-to-Metal' },
        { part: 'Torsion Spring', wcb: 'SS 304 / SS 316', cf8: 'SS 304 / SS 316', cf8m: 'SS 316' },
        { part: 'Hinge & Stop Pin', wcb: 'AISI 410 / SS 304', cf8: 'SS 304 / SS 316', cf8m: 'SS 316' }
      ],
      dimensions: {
        'ASME Class 150#': {
          headers: ['DN (mm)', 'Length (L)', 'Bore (C)', 'Wafer OD (D)'],
          rows: [
            ['50', '60', '60', '101'],
            ['80', '73', '89', '133'],
            ['100', '73', '114', '171'],
            ['150', '98', '168', '218'],
            ['200', '127', '219', '276'],
            ['250', '146', '273', '336'],
            ['300', '181', '324', '406'],
            ['400', '191', '406', '511'],
            ['500', '219', '508', '603'],
            ['600', '222', '610', '714']
          ]
        },
        'ASME Class 300#': {
          headers: ['DN (mm)', 'Length (L)', 'Bore (C)', 'Wafer OD (D)'],
          rows: [
            ['50', '60', '60', '107'],
            ['80', '73', '89', '145'],
            ['100', '73', '114', '177'],
            ['150', '98', '168', '247'],
            ['200', '127', '219', '304'],
            ['250', '146', '273', '358'],
            ['300', '181', '324', '419'],
            ['400', '232', '406', '536'],
            ['500', '292', '508', '650'],
            ['600', '318', '610', '771']
          ]
        },
        'ASME Class 600#': {
          headers: ['DN (mm)', 'Length (L)', 'Bore (C)', 'Wafer OD (D)'],
          rows: [
            ['50', '60', '60', '107'],
            ['80', '73', '89', '145'],
            ['100', '79', '114', '190'],
            ['150', '137', '168', '263'],
            ['200', '165', '219', '317'],
            ['250', '213', '273', '396'],
            ['300', '229', '324', '453'],
            ['400', '305', '406', '562'],
            ['500', '368', '508', '679']
          ]
        }
      }
    },
    {
      id: 6,
      slug: 'single-plate-check-valves',
      name: 'Single Plate Check Valves',
      subtitle: 'Ultra-Slim Wafer Swing Non-Return Valves (DN 32 – DN 600)',
      category: 'check',
      schematic: 'single-plate',
      sizeRange: 'DN 32 – DN 600',
      pressureClasses: ['PN 10', 'PN 16'],
      materials: ['SS 304', 'SS 316'],
      endConnections: ['Wafer (EN 1092-1)'],
      standardsBadge: 'EN 1074-3 • EN 558-1 • EN 12266-1',
      summary: 'Lightweight, space-saving Stainless Steel Single Plate Wafer Check Valves with lifting eye-bolt, large opening angle, and EPDM O-ring face seals.',
      features: [
        'Available with or without spring-assisted closing mechanism',
        'Large disc opening angle ensures low head loss and unobstructed flow',
        'Integrated lifting eye-bolt (SS304) for rapid installation between flanges',
        'Operating temperature range: -10°C to +80°C',
        'Ideal for potable water, sewage, HVAC, and neutral liquid pipelines'
      ],
      standards: [
        { item: 'Design Standard', std: 'EN 1074-3' },
        { item: 'Working Pressure', std: 'PN 10 / PN 16' },
        { item: 'Flange Standard', std: 'EN 1092-1' },
        { item: 'Face-to-Face Standard', std: 'EN 558-1' },
        { item: 'Testing Standard', std: 'EN 12266-1' }
      ],
      bom: [
        { part: 'Body', wcb: 'SS 304 (ASTM A276)', cf8: 'SS 304 (ASTM A276)', cf8m: 'SS 316 (ASTM A276)' },
        { part: 'Disc', wcb: 'SS 316 (ASTM A276)', cf8: 'SS 316 (ASTM A276)', cf8m: 'SS 316 (ASTM A276)' },
        { part: 'O-Rings (Body & Seat)', wcb: 'EPDM (EN 681)', cf8: 'EPDM (EN 681)', cf8m: 'EPDM / Viton' },
        { part: 'Eye Bolt & Fasteners', wcb: 'SS 304', cf8: 'SS 304', cf8m: 'SS 316' }
      ],
      dimensions: {
        'PN 10 / PN 16 Wafer': {
          headers: ['DN (mm)', 'Outer Dia (A)', 'Face-to-Face (B)', 'Bore (C)', 'Seal Dia (D)', 'Swing Radius (E)'],
          rows: [
            ['32', '85', '18', '15', '57', '20.5'],
            ['40', '95', '16', '22', '69.4', '26'],
            ['50', '109', '14', '32', '82.8', '38'],
            ['65', '129', '14', '40', '106', '46'],
            ['80', '144', '14', '54', '116', '56'],
            ['100', '164', '18', '70', '143', '75'],
            ['150', '220', '20', '112', '194', '113'],
            ['200', '275', '22', '154', '252', '151'],
            ['250', '330', '26', '192', '308', '195'],
            ['300', '380', '32', '227', '359', '229'],
            ['400', '491', '44', '310', '462', '291'],
            ['500', '596', '58', '400', '545', '385'],
            ['600', '698', '62', '486', '655', '446']
          ]
        }
      }
    },
    {
      id: 7,
      slug: 'butterfly-valves',
      name: 'Butterfly Valves',
      subtitle: 'High Performance Wafer, Lug, Double Flanged & Double/Triple Eccentric',
      category: 'cast',
      schematic: 'butterfly',
      sizeRange: '1 1/2" – 28" (DN 40 – DN 700)',
      pressureClasses: ['PN 10', 'PN 16', 'PN 25', '150#'],
      materials: ['CI', 'WCB', 'CF8', 'CF8M'],
      endConnections: ['Wafer', 'Lugged', 'Double Flanged'],
      standardsBadge: 'API 609 • BS 5155 • ISO 5211',
      summary: 'Bi-directional bubble-tight Butterfly Valves featuring universal multi-standard flange mounting, replaceable molded elastomer/PTFE seats, and ISO 5211 actuator top pads.',
      features: [
        'Configurations: Slim Seal Wafer, Lugged, Double Flanged, Double & Triple Eccentric',
        '100% bubble-tight shutoff in both flow directions',
        'Universal body design compatible with ANSI, BS, DIN, IS, and JIS flanges',
        'Notched disc & hand lever with 8 intermediate throttling positions',
        'ISO 5211 mounting pad for Lever, Worm Gear, Pneumatic, or Electric Actuators'
      ],
      standards: [
        { item: 'Design Standard', std: 'API 609 / BS 5155 / IS 13095' },
        { item: 'Fire Safe Standard', std: 'API 607 / API 6FA' },
        { item: 'Actuator Mounting Pad', std: 'ISO 5211 (F07 – F16)' },
        { item: 'Testing Standard', std: 'API 598 / BS 6755' },
        { item: 'Flange Standard', std: 'ASME B16.5 / EN 1092' }
      ],
      bom: [
        { part: 'Body', wcb: 'Cast Iron / WCB', cf8: 'ASTM A351 CF8', cf8m: 'ASTM A351 CF8M' },
        { part: 'Disc', wcb: 'CI / WCB / CF8', cf8: 'CF8 / CF8M', cf8m: 'CF8M' },
        { part: 'Stem', wcb: 'SS 410 / 17-4 PH', cf8: 'SS 304', cf8m: 'SS 316' },
        { part: 'Seat Lining', wcb: 'EPDM / Nitrile / Viton', cf8: 'EPDM / PTFE / Viton', cf8m: 'PTFE / PFA / Viton' },
        { part: 'Stem Packing', wcb: 'NBR / Viton / PTFE', cf8: 'PTFE / Viton', cf8m: 'PTFE' }
      ],
      dimensions: {
        'Gear Operated PN 10 / PN 16': {
          headers: ['DN (mm)', 'A (F-F)', 'B', 'C', 'D', 'E', 'F (Handwheel)', 'ISO 5211'],
          rows: [
            ['50', '43', '104', '61', '28', '65', '185', 'F05/F07'],
            ['80', '46', '124', '75', '67', '65', '230', 'F07'],
            ['100', '52', '157', '100', '88', '180', '200', 'F07'],
            ['150', '56', '181', '133', '142', '240', '250', 'F07'],
            ['200', '60', '230', '165', '194', '285', '350', 'F10'],
            ['250', '68', '266', '196', '243', '285', '350', 'F10'],
            ['300', '78', '300', '230', '292', '285', '350', 'F10'],
            ['400', '102', '385', '302', '375', '305', '350', 'F14'],
            ['500', '127', '465', '405', '470', '350', '500', 'F16'],
            ['600', '154', '540', '460', '570', '370', '600', 'F16']
          ]
        }
      }
    },
    {
      id: 8,
      slug: 'knife-edge-gate-valves',
      name: 'Knife Edge Gate Valves ("MESCO")',
      subtitle: 'Unidirectional & Bidirectional Slurry Isolation Valves',
      category: 'slurry',
      schematic: 'knife',
      sizeRange: '50mm – 600mm (2" – 24")',
      pressureClasses: ['PN 10'],
      materials: ['WCB', 'CF8', 'CF8M', 'CI'],
      endConnections: ['Wafer Flangeless', 'Uni-Lugged', 'Flanged'],
      standardsBadge: 'MSS SP-81 • Heavy Slurry Duty',
      summary: 'Precision-buffed stainless steel Knife Gate Valves engineered to shear through thick slurries, powders, and fibrous media in Mining, Power, Steel, Chemical, and Paper plants.',
      features: [
        'Beveled knife-edge gate cuts cleanly through settled solids for tight shutoff',
        'Non-sliding internal motion minimizes wear & tear and allows media flushing',
        'Precision-buffed SS 304/316 gate plate extends gland packing service life',
        'Renewable Metal-to-Metal or replaceable soft seats (EPDM / Viton / PTFE)',
        'Drilling compatible with ANSI, DIN, BS, JIS, and AS flange standards',
        'Actuation: Handwheel, Pneumatic Cylinder, Electric Actuator, or Chainwheel'
      ],
      standards: [
        { item: 'Design & Face-to-Face', std: 'MSS SP-81 / Mfg. Standard' },
        { item: 'Pressure Rating', std: 'Up to PN 10 Class' },
        { item: 'Flange Drilling Options', std: 'ANSI B16.5 / DIN / BS / JIS' },
        { item: 'Testing Standard', std: 'MSS SP-81 / API 598' }
      ],
      bom: [
        { part: 'Body & Yoke', wcb: 'Cast Iron / WCB', cf8: 'CF8 (SS 304)', cf8m: 'CF8M (SS 316)' },
        { part: 'Knife Gate Plate', wcb: 'SS 304 / SS 316', cf8: 'SS 304 / SS 316', cf8m: 'SS 316 / 316L' },
        { part: 'Seat Ring', wcb: 'Soft / Metal-to-Metal', cf8: 'CF8 / EPDM / PTFE', cf8m: 'CF8M / Viton / PTFE' },
        { part: 'Stem / Spindle', wcb: 'SS 304 / SS 316', cf8: 'SS 304', cf8m: 'SS 316' },
        { part: 'Gland Packing', wcb: 'Graphite / PTFE', cf8: 'Graphite / PTFE', cf8m: 'Graphite / PTFE' }
      ],
      dimensions: {
        'Standard PN 10 Series': {
          headers: ['Size (DN)', 'Port Type', 'Pressure Rating', 'Drilling Standard', 'Actuation Options'],
          rows: [
            ['50 mm', 'Full Round Port', 'PN 10', 'ANSI / DIN / BS / JIS', 'Handwheel / Pneumatic / Electric'],
            ['80 mm', 'Full Round Port', 'PN 10', 'ANSI / DIN / BS / JIS', 'Handwheel / Pneumatic / Electric'],
            ['100 mm', 'Full Round Port', 'PN 10', 'ANSI / DIN / BS / JIS', 'Handwheel / Pneumatic / Electric'],
            ['150 mm', 'Full Round Port', 'PN 10', 'ANSI / DIN / BS / JIS', 'Handwheel / Pneumatic / Electric'],
            ['200 mm', 'Full Round Port', 'PN 10', 'ANSI / DIN / BS / JIS', 'Handwheel / Pneumatic / Electric'],
            ['300 mm', 'Full Round Port', 'PN 10', 'ANSI / DIN / BS / JIS', 'Bevel Gear / Pneumatic / Electric'],
            ['450 mm', 'Full Round Port', 'PN 10', 'ANSI / DIN / BS / JIS', 'Bevel Gear / Cylinder / Electric'],
            ['600 mm', 'Full Round Port', 'PN 10', 'ANSI / DIN / BS / JIS', 'Bevel Gear / Cylinder / Electric']
          ]
        }
      }
    },
    {
      id: 9,
      slug: 'pulp-valves',
      name: 'Pulp Valves (Plate Valves)',
      subtitle: 'Unrestricted Straight-Passage Valves for Viscous & Fibrous Media',
      category: 'slurry',
      schematic: 'pulp',
      sizeRange: 'DN 50 – DN 400',
      pressureClasses: ['PN 10', 'Table D', 'Table E'],
      materials: ['CI', 'WCB', 'CF8', 'CF8M'],
      endConnections: ['Flanged (Table D / Table E)'],
      standardsBadge: 'Pulp, Sugar & Cement Service',
      summary: 'Recess-free straight-passage Pulp Plate Valves designed to eliminate fluid stagnation and maintain unaltered flow velocity for molasses, paper stock, cement hoppers, and coal ash.',
      features: [
        'Recess-free straight-through orifice prevents accumulation of viscous or fibrous media',
        'Widely deployed in Sugar mills (molasses), Paper mills (pulp stock), and Cement hoppers',
        'Metal-to-Metal precision seating with AISI 304 / 316 stainless steel gate',
        'Available with Handwheel, Pneumatic, Hydraulic, Chainwheel, Bevel Gear, or Electric actuators'
      ],
      standards: [
        { item: 'Flange Standard', std: 'BS 10 Table D & Table E' },
        { item: 'Size Range', std: 'DN 50 to DN 400' },
        { item: 'Seat Design', std: 'Metal-to-Metal Precision Lapped' },
        { item: 'Testing Standard', std: 'API 598 / Hydrostatic' }
      ],
      bom: [
        { part: 'Body', wcb: 'Cast Iron / WCB', cf8: 'ASTM A351 CF8', cf8m: 'ASTM A351 CF8M' },
        { part: 'Gate Plate', wcb: 'AISI 304 / AISI 316', cf8: 'AISI 304', cf8m: 'AISI 316' },
        { part: 'Seat Ring', wcb: 'AISI 304 / AISI 316', cf8: 'AISI 304', cf8m: 'AISI 316' },
        { part: 'Stem & Stem Nut', wcb: 'AISI 304 / Gun Metal', cf8: 'AISI 304 / Gun Metal', cf8m: 'AISI 316 / Gun Metal' },
        { part: 'Packing', wcb: 'PTFE Impreg. Synth. Fibre', cf8: 'PTFE Impreg. Synth. Fibre', cf8m: 'PTFE Impreg. Synth. Fibre' }
      ],
      dimensions: {
        'Table D / Table E Flanged': {
          headers: ['Size (DN)', 'Flange Standard', 'Seat Type', 'Recommended Operation'],
          rows: [
            ['DN 50', 'Table D / E', 'Metal-to-Metal', 'Handwheel / Lever / Pneumatic'],
            ['DN 80', 'Table D / E', 'Metal-to-Metal', 'Handwheel / Lever / Pneumatic'],
            ['DN 100', 'Table D / E', 'Metal-to-Metal', 'Handwheel / Pneumatic / Electric'],
            ['DN 150', 'Table D / E', 'Metal-to-Metal', 'Handwheel / Pneumatic / Electric'],
            ['DN 200', 'Table D / E', 'Metal-to-Metal', 'Handwheel / Bevel Gear / Pneumatic'],
            ['DN 250', 'Table D / E', 'Metal-to-Metal', 'Bevel Gear / Pneumatic / Hydraulic'],
            ['DN 300', 'Table D / E', 'Metal-to-Metal', 'Bevel Gear / Pneumatic / Electric'],
            ['DN 400', 'Table D / E', 'Metal-to-Metal', 'Bevel Gear / Electric Motor']
          ]
        }
      }
    },
    {
      id: 10,
      slug: 'forged-gate-valves',
      name: 'Forged Gate Valves',
      subtitle: 'High-Pressure Class 800#–2500# & Flanged Class 150#–600#',
      category: 'forged',
      schematic: 'forged',
      sizeRange: '15mm – 50mm (1/2" – 2")',
      pressureClasses: ['150#', '300#', '600#', '800#', '1500#', '2500#'],
      materials: ['Forged Steel', 'Exotic Alloys'],
      endConnections: ['Socket Weld', 'Screwed (NPT)', 'Butt Weld', 'Flanged'],
      standardsBadge: 'API 602 • ASME B16.34',
      summary: 'Compact high-integrity Forged Steel Gate Valves in Bolted or Welded Bonnet designs for extreme pressure and temperature utility lines up to Class 2500#.',
      features: [
        'Design & Manufacture strictly conform to API 602',
        'Available in Bolted Bonnet or Seal-Welded Bonnet construction',
        'Available in Carbon Steel (A105, LF2), Alloy Steel (F5, F9, F11, F22, F91), SS (F304L, F316L), Duplex (F51/F53/F55), Inconel 625, Monel K400 & Alloy 20',
        'End connections: Socket Weld (ASME B16.11), Screwed (ASME B1.20.1), Butt Weld, or Integral Flanged (ASME B16.5)'
      ],
      standards: [
        { item: 'Design Standard', std: 'API 602' },
        { item: 'Socket Weld / Screwed End', std: 'ASME B16.11 / ASME B1.20.1' },
        { item: 'Flange / Butt Weld End', std: 'ASME B16.5 / ASME B16.25' },
        { item: 'Pressure-Temperature Rating', std: 'ASME B16.34' },
        { item: 'Testing Standard', std: 'API 598' }
      ],
      bom: [
        { part: 'Body & Bonnet', wcb: 'ASTM A105 / LF2', cf8: 'ASTM A182 F304L', cf8m: 'ASTM A182 F316L / F51 / Inconel' },
        { part: 'Wedge & Stem', wcb: '13% Cr (AISI 410)', cf8: 'SS 304 / 304L', cf8m: 'SS 316 / 316L / Stellite Faced' },
        { part: 'Seat Ring', wcb: 'AISI 410 Hard Faced', cf8: 'SS 304 + Stellite', cf8m: 'SS 316 + Stellite' },
        { part: 'Gasket', wcb: 'Spiral Wound SS + Graphite', cf8: 'Spiral Wound SS 304 + Graphite', cf8m: 'Spiral Wound SS 316 + Graphite' }
      ],
      dimensions: {
        'Class 800# (SW / Screwed)': {
          headers: ['Size', 'F/F (mm)', 'Port (ØP)', 'Height Open H(O)', 'Height Closed H(C)', 'Handwheel ØWH', 'Weight (Kg)'],
          rows: [
            ['15 mm', '87', '9.5', '152', '130', '86', '1.6'],
            ['20 mm', '92', '13.0', '158', '133', '86', '1.9'],
            ['25 mm', '106', '18.0', '189', '155', '116', '3.1'],
            ['32 mm', '127', '24.0', '239', '200', '150', '6.3'],
            ['40 mm', '127', '29.0', '239', '200', '150', '6.4'],
            ['50 mm', '142', '37.0', '288', '235', '150', '9.8']
          ]
        },
        'Class 1500# (SW / Screwed)': {
          headers: ['Size', 'F/F (mm)', 'Port (ØP)', 'Height Open H(O)', 'Height Closed H(C)', 'Handwheel ØWH', 'Weight (Kg)'],
          rows: [
            ['15 mm', '92', '13', '158', '133', '86', '2.2'],
            ['20 mm', '106', '18', '189', '155', '116', '3.6'],
            ['25 mm', '127', '24', '239', '200', '150', '7.3'],
            ['32 mm', '127', '29', '239', '200', '150', '7.0'],
            ['40 mm', '142', '37', '288', '235', '150', '11.3']
          ]
        },
        'Class 2500# (SW / Screwed)': {
          headers: ['Size', 'F/F (mm)', 'Port (ØP)', 'Height Open H(O)', 'Height Closed H(C)', 'Handwheel ØWH', 'Weight (Kg)'],
          rows: [
            ['15 mm', '106', '18', '189', '155', '116', '4.1'],
            ['20 mm', '127', '24', '239', '200', '150', '8.4'],
            ['25 mm', '142', '37', '288', '235', '150', '13.0']
          ]
        },
        'Flanged End (Class 150# / 300# / 600#)': {
          headers: ['Size', '150# F/F', '150# Wt(Kg)', '300# F/F', '300# Wt(Kg)', '600# F/F', '600# Wt(Kg)'],
          rows: [
            ['15 mm', '108', '2.6', '140', '3.2', '165', '3.6'],
            ['20 mm', '117', '3.5', '152', '4.7', '190', '5.1'],
            ['25 mm', '127', '5.1', '165', '6.5', '216', '7.3'],
            ['32 mm', '140', '8.7', '178', '10.5', '229', '11.5'],
            ['40 mm', '165', '9.3', '190', '12.1', '241', '13.7'],
            ['50 mm', '178', '15.0', '216', '17.2', '292', '20.0']
          ]
        }
      }
    },
    {
      id: 11,
      slug: 'forged-globe-valves',
      name: 'Forged Globe Valves',
      subtitle: 'High-Pressure Throttling Valves (Class 150# – 2500#)',
      category: 'forged',
      schematic: 'forged',
      sizeRange: '15mm – 50mm (1/2" – 2")',
      pressureClasses: ['150#', '300#', '600#', '800#', '1500#', '2500#'],
      materials: ['Forged Steel', 'Exotic Alloys'],
      endConnections: ['Socket Weld', 'Screwed (NPT)', 'Butt Weld', 'Flanged'],
      standardsBadge: 'API 602 • ISO 15761',
      summary: 'Forged Steel Globe Valves engineered to API 602 / ISO 15761 for high-pressure steam blowdown, chemical dosing, and precision flow regulation.',
      features: [
        'Conforms to API 602 / ISO 15761 design & manufacturing standards',
        'Bolted Bonnet or Welded Bonnet construction with Stellite-faced seat & plug',
        'Available in Carbon Steel (A105/LF2), Alloy Steels (F11/F22/F91), SS 304L/316L, Duplex, Inconel 625 & Monel K400'
      ],
      standards: [
        { item: 'Design Standard', std: 'API 602 / ISO 15761' },
        { item: 'Socket Weld / Screwed End', std: 'ASME B16.11 / ASME B1.20.1' },
        { item: 'Flange / Butt Weld End', std: 'ASME B16.5 / ASME B16.25' },
        { item: 'Testing Standard', std: 'API 598' }
      ],
      bom: [
        { part: 'Body & Bonnet', wcb: 'ASTM A105 / LF2', cf8: 'ASTM A182 F304L', cf8m: 'ASTM A182 F316L / Alloy 20' },
        { part: 'Disc / Plug & Stem', wcb: 'AISI 410 + Stellite', cf8: 'SS 304 + Stellite', cf8m: 'SS 316 + Stellite' },
        { part: 'Bonnet Gasket', wcb: 'Spiral Wound SS + Graphite', cf8: 'Spiral Wound SS 304', cf8m: 'Spiral Wound SS 316' }
      ],
      dimensions: {
        'Class 800# (SW / Screwed)': {
          headers: ['Size', 'F/F (mm)', 'Port (ØP)', 'Height Open H(O)', 'Height Closed H(C)', 'Handwheel ØWH', 'Weight (Kg)'],
          rows: [
            ['15 mm', '87', '9.0', '153', '147', '86', '1.6'],
            ['20 mm', '92', '12.0', '158', '149', '86', '1.9'],
            ['25 mm', '106', '17.0', '194', '182', '116', '3.0'],
            ['32 mm', '127', '23.0', '222', '208', '150', '6.5'],
            ['40 mm', '127', '25.0', '222', '208', '150', '6.3'],
            ['50 mm', '142', '29.0', '263', '245', '150', '10.1']
          ]
        },
        'Class 1500# & 2500#': {
          headers: ['Class', 'Size', 'F/F (mm)', 'Port (ØP)', 'H(O)', 'H(C)', 'Weight (Kg)'],
          rows: [
            ['1500#', '15 mm', '92', '8', '158', '149', '2.2'],
            ['1500#', '20 mm', '106', '9', '194', '182', '3.5'],
            ['1500#', '25 mm', '127', '14', '222', '208', '7.5'],
            ['1500#', '40 mm', '142', '25', '263', '245', '11.6'],
            ['2500#', '15 mm', '106', '7', '194', '182', '4.0'],
            ['2500#', '20 mm', '127', '8', '222', '208', '8.6'],
            ['2500#', '25 mm', '142', '12', '263', '245', '13.3']
          ]
        },
        'Flanged End (Class 150# / 300# / 600#)': {
          headers: ['Size', '150# F/F', '150# Wt(Kg)', '300# F/F', '300# Wt(Kg)', '600# F/F', '600# Wt(Kg)'],
          rows: [
            ['15 mm', '108', '2.6', '140', '3.4', '165', '3.6'],
            ['20 mm', '117', '3.5', '152', '4.7', '190', '5.1'],
            ['25 mm', '127', '5.0', '165', '6.8', '216', '7.2'],
            ['32 mm', '140', '8.9', '178', '10.9', '229', '11.5'],
            ['40 mm', '165', '9.5', '190', '12.5', '241', '13.5'],
            ['50 mm', '178', '15.3', '216', '17.9', '292', '19.9']
          ]
        }
      }
    },
    {
      id: 12,
      slug: 'forged-check-valves',
      name: 'Forged Check Valves',
      subtitle: 'Spring-Loaded Piston & Lift Check Valves (Class 150# – 2500#)',
      category: 'forged',
      schematic: 'forged-check',
      sizeRange: '15mm – 50mm (1/2" – 2")',
      pressureClasses: ['150#', '300#', '600#', '800#', '1500#', '2500#'],
      materials: ['Forged Steel', 'Exotic Alloys'],
      endConnections: ['Socket Weld', 'Screwed (NPT)', 'Butt Weld', 'Flanged'],
      standardsBadge: 'API 602 • ISO 15761',
      summary: 'High-pressure Forged Piston Lift Check Valves with spring-assisted non-return disc for rapid backflow prevention in high-pressure steam and hydrocarbon lines.',
      features: [
        'Bolted Cover or Welded Cover construction conforming to API 602 / ISO 15761',
        'Precision-guided spring-loaded piston disc ensures positive seating',
        'Available in A105, LF2, F11, F22, F91, F304L, F316L, Duplex, Inconel 625 & Monel K400'
      ],
      standards: [
        { item: 'Design Standard', std: 'API 602 / ISO 15761' },
        { item: 'End Connections', std: 'ASME B16.11 / B1.20.1 / B16.5' },
        { item: 'Pressure-Temperature Rating', std: 'ASME B16.34' },
        { item: 'Testing Standard', std: 'API 598' }
      ],
      bom: [
        { part: 'Body & Cover', wcb: 'ASTM A105 / LF2', cf8: 'ASTM A182 F304L', cf8m: 'ASTM A182 F316L / Duplex' },
        { part: 'Piston Disc & Spring', wcb: 'AISI 410 / SS 304', cf8: 'SS 304 / Inconel X750', cf8m: 'SS 316 / Inconel X750' },
        { part: 'Seat Ring', wcb: 'AISI 410 + Stellite', cf8: 'SS 304 + Stellite', cf8m: 'SS 316 + Stellite' }
      ],
      dimensions: {
        'Class 800# (SW / Screwed)': {
          headers: ['Size', 'F/F (mm)', 'Port (ØP)', 'Height (H)', 'Weight (Kg)'],
          rows: [
            ['15 mm', '87', '9.5', '53', '1.0'],
            ['20 mm', '92', '12.7', '56', '1.3'],
            ['25 mm', '106', '17.5', '66', '2.2'],
            ['32 mm', '127', '23.8', '86', '4.9'],
            ['40 mm', '127', '28.6', '86', '4.7'],
            ['50 mm', '142', '36.5', '104', '8.2']
          ]
        },
        'Flanged End (Class 150# / 300# / 600#)': {
          headers: ['Size', '150# F/F', '150# Wt(Kg)', '300# F/F', '300# Wt(Kg)', '600# F/F', '600# Wt(Kg)'],
          rows: [
            ['15 mm', '108', '2.0', '140', '2.8', '165', '3.0'],
            ['20 mm', '117', '2.9', '152', '4.1', '190', '4.2'],
            ['25 mm', '127', '4.2', '165', '6.0', '216', '6.4'],
            ['32 mm', '140', '7.3', '178', '9.3', '229', '10.1'],
            ['40 mm', '165', '7.9', '190', '10.9', '241', '11.9'],
            ['50 mm', '178', '13.4', '216', '16.0', '292', '18.0']
          ]
        }
      }
    },
    {
      id: 13,
      slug: '3-pc-ball-valves',
      name: '3-PC Ball Valves',
      subtitle: 'Forged & Flanged End 3-Piece Design (Class 150# – 800#)',
      category: 'forged',
      schematic: 'ball-3pc',
      sizeRange: '15mm – 50mm (1/2" – 2")',
      pressureClasses: ['150#', '300#', '600#', '800#'],
      materials: ['Forged Steel', 'CF8', 'CF8M', 'Exotic Alloys'],
      endConnections: ['Socket Weld', 'Screwed (NPT)', 'Butt Weld', 'Flanged'],
      standardsBadge: 'ISO 17292 • API 598 • EN 12266-1',
      summary: 'Swing-out 3-Piece Forged Ball Valves allowing rapid inline seat maintenance without disturbing pipework, rated up to Class 800#.',
      features: [
        'Design & Manufacture strictly conform to ISO 17292',
        '3-Piece swing-out center body simplifies inline seal replacement',
        'Available in A105, LF2, F304L, F316L, Duplex F51/F53, Inconel 625 & Monel K400',
        'Tested to API 598 & EN 12266-1 bubble-tight shutoff standards'
      ],
      standards: [
        { item: 'Design Standard', std: 'ISO 17292' },
        { item: 'Socket Weld / Screwed End', std: 'ASME B16.11 / ASME B1.20.1' },
        { item: 'Flange / Butt Weld End', std: 'ASME B16.5 / ASME B16.25' },
        { item: 'Testing Standard', std: 'API 598 / EN 12266-1' }
      ],
      bom: [
        { part: 'Body & End Connectors', wcb: 'ASTM A105 / LF2', cf8: 'ASTM A182 F304L', cf8m: 'ASTM A182 F316L' },
        { part: 'Ball & Stem', wcb: 'SS 304 / SS 316', cf8: 'SS 304', cf8m: 'SS 316' },
        { part: 'Seats & Body Seals', wcb: 'PTFE / RPTFE / PEEK', cf8: 'PTFE / RPTFE', cf8m: 'RPTFE / PEEK' }
      ],
      dimensions: {
        'Class 800# (3-PC)': {
          headers: ['Size', 'F/F (mm)', 'Port (ØP)', 'Height (H)', 'Lever (L)', 'Weight (Kg)'],
          rows: [
            ['15 mm', '68', '10.0', '38', '128', '0.7'],
            ['20 mm', '73', '14.0', '40', '128', '1.0'],
            ['25 mm', '96', '20.0', '53', '155', '1.9'],
            ['32 mm', '103', '25.0', '56', '165', '2.5'],
            ['40 mm', '116', '30.5', '75', '200', '3.3'],
            ['50 mm', '128', '37.3', '80', '200', '4.7']
          ]
        },
        'Flanged End (Class 150# / 300# / 600#)': {
          headers: ['Size', '150# F/F', '150# Wt(Kg)', '300# F/F', '300# Wt(Kg)', '600# F/F', '600# Wt(Kg)'],
          rows: [
            ['15 mm', '108', '1.7', '140', '2.5', '165', '2.7'],
            ['20 mm', '117', '2.6', '152', '3.8', '190', '4.2'],
            ['25 mm', '127', '3.9', '165', '5.7', '216', '6.1'],
            ['32 mm', '140', '4.9', '178', '6.9', '229', '7.7'],
            ['40 mm', '165', '6.5', '190', '9.5', '241', '10.5'],
            ['50 mm', '178', '9.9', '216', '12.5', '292', '14.5']
          ]
        }
      }
    },
    {
      id: 14,
      slug: 'strainers-bag-filters',
      name: 'Industrial Strainers & Bag Filters',
      subtitle: 'Y-Type, T-Type, Simplex/Duplex Basket, Temporary Strainers & Bag Filters',
      category: 'forged',
      schematic: 'strainer',
      sizeRange: '3/4" – 24" (20mm – 600mm+)',
      pressureClasses: ['150#', '300#', '600#', '1500#'],
      materials: ['WCB', 'CF8', 'CF8M'],
      endConnections: ['Flanged (RF/FF/RTJ)', 'Butt Weld', 'Socket Weld', 'NPT'],
      standardsBadge: 'ASME Class 125 – 1500 • Custom Mesh',
      summary: 'Comprehensive pipeline filtration lineup including Y-Type, T-Type, Simplex & Duplex Basket Strainers, Cone/Plate Temporary Strainers, and Multi-Bag Filter Housings.',
      features: [
        'Y-Type Strainers: Low pressure drop streamlined body with large screen area (Class 150–1500)',
        'Simplex & Duplex Basket Strainers: Continuous uninterrupted flow with swing-bolt quick-open covers & davit arms',
        'T-Type Strainers: Horizontal installation with perforated SS screens & through-bolt covers',
        'Temporary Strainers: Cone, basket & plate designs with 100%–300% open area (3/4" to 24"+)',
        'Bag Filters: Single & multi-bag vessels in CS / SS 304 / SS 316',
        'Optional Accessories: Differential pressure indicators/gauges, spare screens & custom micron meshes'
      ],
      standards: [
        { item: 'Pressure Ratings', std: 'ASME Class 125 / 150 / 300 / 600 / 900 / 1500' },
        { item: 'End Connections', std: 'FF, RF, RTJ Flanged, BW, SW & NPT' },
        { item: 'Screen Filtration', std: 'Perforated SS / Wire Mesh / Wedge Wire' },
        { item: 'Testing Standard', std: 'API 598 Hydrostatic Shell Test' }
      ],
      bom: [
        { part: 'Housing / Vessel', wcb: 'Cast / Fabricated Carbon Steel', cf8: 'SS 304 (CF8)', cf8m: 'SS 316 (CF8M)' },
        { part: 'Filter Screen / Basket', wcb: 'SS 304 / SS 316 Perforated', cf8: 'SS 304 Mesh / Wedge Wire', cf8m: 'SS 316L Mesh / Wedge Wire' },
        { part: 'Cover Closure', wcb: 'Bolted / Swing-Bolt + Davit', cf8: 'Bolted / Swing-Bolt', cf8m: 'Bolted / Swing-Bolt' },
        { part: 'Optional Instrumentation', wcb: 'DP Gauge / Vent & Drain Plug', cf8: 'DP Indicator / Drain Valve', cf8m: 'DP Transmitter / Drain Valve' }
      ],
      dimensions: {
        'Filtration Product Matrix': {
          headers: ['Filtration Type', 'Standard Sizes', 'ASME Ratings', 'End Connections', 'Key Application'],
          rows: [
            ['Y-Type Strainers', '1/2" – 24"', 'Class 150 – 1500', 'RF, FF, RTJ, BW, SW, NPT', 'Steam, Gas & Liquid Pump Protection'],
            ['Simplex Basket Strainers', '1" – 24"', 'Class 125 – 600', 'FF, RF, RTJ, Butt Weld', 'Batch Process & High Dirt-Holding Lines'],
            ['Duplex Basket Strainers', '1" – 24"', 'Class 125 – 600', 'FF, RF, RTJ, Butt Weld', '24/7 Continuous Flow Without Shutdown'],
            ['T-Type Strainers', '2" – 24"', 'Class 150 – 1500', 'RF, RTJ, Butt Weld', 'High-Velocity Horizontal Pipelines'],
            ['Temporary Cone Strainers', '3/4" – 24"+', 'Class 150 – 1500', 'Between Flanges (RF/RTJ)', 'Plant Commissioning & Startup Debris'],
            ['Bag Filter Housings', 'Single & Multi-Bag', 'Class 125 – 150', 'Flat / Raised Face Flange', 'Fine Micron Chemical & Water Filtration']
          ]
        }
      }
    }
  ]
};

const ASME_FLANGE_MATRIX = {
  '1/2" (DN15)':  { '150#': { od: 90, pcd: 60.3, thk: 9.6, rfd: 35, holes: 4, holeDia: 15.9 }, '300#': { od: 95, pcd: 66.7, thk: 12.7, rfd: 35, holes: 4, holeDia: 15.9 }, '600#': { od: 95, pcd: 66.7, thk: 14.3, rfd: 35, holes: 4, holeDia: 15.9 } },
  '1" (DN25)':    { '150#': { od: 110, pcd: 79.4, thk: 12.7, rfd: 51, holes: 4, holeDia: 15.9 }, '300#': { od: 125, pcd: 88.9, thk: 15.9, rfd: 51, holes: 4, holeDia: 19.05 }, '600#': { od: 125, pcd: 88.9, thk: 17.5, rfd: 51, holes: 4, holeDia: 19.05 } },
  '2" (DN50)':    { '150#': { od: 150, pcd: 120.7, thk: 17.5, rfd: 92, holes: 4, holeDia: 19.05 }, '300#': { od: 165, pcd: 127.0, thk: 20.7, rfd: 92, holes: 8, holeDia: 19.05 }, '600#': { od: 165, pcd: 127.0, thk: 25.4, rfd: 92, holes: 8, holeDia: 19.05 } },
  '3" (DN80)':    { '150#': { od: 190, pcd: 152.4, thk: 22.3, rfd: 127, holes: 4, holeDia: 19.05 }, '300#': { od: 210, pcd: 168.3, thk: 27.0, rfd: 127, holes: 8, holeDia: 22.22 }, '600#': { od: 210, pcd: 168.3, thk: 31.8, rfd: 127, holes: 8, holeDia: 22.22 } },
  '4" (DN100)':   { '150#': { od: 230, pcd: 190.5, thk: 22.3, rfd: 157, holes: 8, holeDia: 19.05 }, '300#': { od: 255, pcd: 200.0, thk: 30.2, rfd: 157, holes: 8, holeDia: 22.22 }, '600#': { od: 275, pcd: 215.9, thk: 38.1, rfd: 157, holes: 8, holeDia: 25.4 } },
  '6" (DN150)':   { '150#': { od: 280, pcd: 241.3, thk: 23.9, rfd: 216, holes: 8, holeDia: 22.22 }, '300#': { od: 320, pcd: 269.9, thk: 35.0, rfd: 216, holes: 12, holeDia: 22.22 }, '600#': { od: 355, pcd: 292.1, thk: 47.7, rfd: 216, holes: 12, holeDia: 28.57 } },
  '8" (DN200)':   { '150#': { od: 345, pcd: 298.5, thk: 27.0, rfd: 270, holes: 8, holeDia: 22.22 }, '300#': { od: 380, pcd: 330.2, thk: 39.7, rfd: 270, holes: 12, holeDia: 25.4 }, '600#': { od: 420, pcd: 349.2, thk: 55.6, rfd: 270, holes: 12, holeDia: 31.75 } },
  '12" (DN300)':  { '150#': { od: 485, pcd: 431.8, thk: 30.2, rfd: 381, holes: 12, holeDia: 25.4 }, '300#': { od: 520, pcd: 450.8, thk: 49.3, rfd: 381, holes: 16, holeDia: 31.75 }, '600#': { od: 560, pcd: 489.0, thk: 66.7, rfd: 381, holes: 20, holeDia: 34.92 } },
  '24" (DN600)':  { '150#': { od: 815, pcd: 749.3, thk: 46.1, rfd: 692, holes: 20, holeDia: 34.9 }, '300#': { od: 915, pcd: 812.8, thk: 68.3, rfd: 692, holes: 24, holeDia: 41.3 }, '600#': { od: 940, pcd: 838.2, thk: 101.6, rfd: 692, holes: 24, holeDia: 47.6 } }
};

function getValveSchematicSVG(type, sizeClass = 'w-full h-36') {
  const stroke = '#007A8C';
  const fillDark = 'rgba(241, 245, 249, 0.95)';
  const accent = '#0284C7';

  const svgs = {
    ball: `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="28" y="34" width="12" height="72" rx="3" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <rect x="180" y="34" width="12" height="72" rx="3" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <path d="M40 48H68L82 36H138L152 48H180V92H152L138 104H82L68 92H40V48Z" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="110" cy="70" r="24" fill="rgba(0, 210, 230, 0.12)" stroke="${stroke}" stroke-width="2"/>
        <line x1="86" y1="70" x2="134" y2="70" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
        <rect x="103" y="18" width="14" height="18" rx="2" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <path d="M110 18H168" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>
        <circle cx="110" cy="18" r="4" fill="${stroke}"/>
      </svg>`,
    gate: `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="34" y="54" width="11" height="66" rx="2.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <rect x="175" y="54" width="11" height="66" rx="2.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <path d="M45 68H80V52H140V68H175V106H140V120H80V106H45V68Z" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <path d="M98 62H122L118 112H102L98 62Z" fill="rgba(0, 210, 230, 0.2)" stroke="${stroke}" stroke-width="1.8"/>
        <rect x="92" y="24" width="36" height="28" rx="3" stroke="${stroke}" stroke-width="1.8" stroke-dasharray="3 2"/>
        <line x1="110" y1="12" x2="110" y2="62" stroke="#94A3B8" stroke-width="3"/>
        <ellipse cx="110" cy="13" rx="28" ry="4.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2.2"/>
      </svg>`,
    globe: `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="34" y="56" width="11" height="62" rx="2.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <rect x="175" y="56" width="11" height="62" rx="2.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="110" cy="88" r="32" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <path d="M45 72H79M141 72H175M45 102H79M141 102H175" stroke="${stroke}" stroke-width="2"/>
        <path d="M84 92H102L110 82L118 92H136" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>
        <rect x="96" y="26" width="28" height="30" rx="3" fill="${fillDark}" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="110" y1="12" x2="110" y2="82" stroke="#94A3B8" stroke-width="3"/>
        <ellipse cx="110" cy="13" rx="26" ry="4.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2.2"/>
      </svg>`,
    'swing-check': `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="34" y="52" width="11" height="64" rx="2.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <rect x="175" y="52" width="11" height="64" rx="2.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <path d="M45 66H78V42H142V66H175V102H142C132 118 88 118 78 102H45V66Z" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <rect x="74" y="34" width="72" height="10" rx="2" fill="rgba(0, 139, 155, 0.3)" stroke="${stroke}" stroke-width="2"/>
        <circle cx="96" cy="56" r="4" fill="${stroke}"/>
        <path d="M96 56L124 88" stroke="${stroke}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M62 84H88M83 79L88 84L83 89" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    'dual-plate': `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="110" cy="70" rx="44" ry="48" fill="${fillDark}" stroke="${stroke}" stroke-width="2.2"/>
        <ellipse cx="110" cy="70" rx="33" ry="37" fill="rgba(0, 210, 230, 0.08)" stroke="${accent}" stroke-width="1.8"/>
        <line x1="110" y1="22" x2="110" y2="118" stroke="${stroke}" stroke-width="3"/>
        <path d="M106 38C90 44 86 96 106 102" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 2"/>
        <path d="M114 38C130 44 134 96 114 102" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="110" cy="18" r="5" stroke="${stroke}" stroke-width="2"/>
      </svg>`,
    'single-plate': `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="110" cy="74" r="44" fill="${fillDark}" stroke="${stroke}" stroke-width="2.2"/>
        <circle cx="110" cy="74" r="32" stroke="${accent}" stroke-width="1.8"/>
        <circle cx="110" cy="76" r="24" fill="rgba(0, 210, 230, 0.16)" stroke="${stroke}" stroke-width="2"/>
        <line x1="92" y1="54" x2="128" y2="54" stroke="#F8FAFC" stroke-width="3" stroke-linecap="round"/>
        <circle cx="110" cy="21" r="6" stroke="${stroke}" stroke-width="2"/>
        <line x1="110" y1="27" x2="110" y2="30" stroke="${stroke}" stroke-width="2"/>
      </svg>`,
    butterfly: `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="110" cy="84" rx="34" ry="38" fill="${fillDark}" stroke="${stroke}" stroke-width="2.2"/>
        <ellipse cx="110" cy="84" rx="25" ry="29" stroke="${accent}" stroke-width="3"/>
        <line x1="110" y1="30" x2="110" y2="124" stroke="#E2E8F0" stroke-width="2.5"/>
        <ellipse cx="110" cy="84" rx="10" ry="26" fill="rgba(0, 210, 230, 0.22)" stroke="${stroke}" stroke-width="1.8"/>
        <rect x="96" y="18" width="28" height="14" rx="2.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <path d="M110 22H165L160 28H110" fill="${accent}" stroke="${stroke}" stroke-width="1.5"/>
      </svg>`,
    knife: `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="82" y="54" width="56" height="66" rx="6" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="110" cy="88" r="21" fill="rgba(0, 210, 230, 0.14)" stroke="${stroke}" stroke-width="2"/>
        <path d="M96 42H124V86L110 96L96 86V42Z" fill="rgba(56, 189, 248, 0.25)" stroke="#38BDF8" stroke-width="1.8"/>
        <line x1="90" y1="20" x2="90" y2="54" stroke="#94A3B8" stroke-width="2.5"/>
        <line x1="130" y1="20" x2="130" y2="54" stroke="#94A3B8" stroke-width="2.5"/>
        <line x1="110" y1="14" x2="110" y2="42" stroke="${stroke}" stroke-width="3"/>
        <ellipse cx="110" cy="14" rx="28" ry="4" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
      </svg>`,
    pulp: `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M78 46H142V120H78V46Z" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="110" cy="86" r="23" fill="rgba(0, 139, 155, 0.22)" stroke="${stroke}" stroke-width="2"/>
        <rect x="98" y="24" width="24" height="22" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <line x1="110" y1="12" x2="110" y2="62" stroke="#E2E8F0" stroke-width="3"/>
        <ellipse cx="110" cy="13" rx="28" ry="4.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
      </svg>`,
    forged: `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M56 72H82V54H138V72H164V106H138V116H82V106H56V72Z" fill="${fillDark}" stroke="${stroke}" stroke-width="2.2"/>
        <rect x="86" y="42" width="48" height="12" rx="2" fill="rgba(0, 139, 155, 0.35)" stroke="${stroke}" stroke-width="2"/>
        <rect x="96" y="24" width="28" height="18" rx="2" fill="${fillDark}" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="110" y1="12" x2="110" y2="88" stroke="#E2E8F0" stroke-width="3"/>
        <ellipse cx="110" cy="13" rx="26" ry="4.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2.2"/>
      </svg>`,
    'forged-check': `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M54 66H80V44H140V66H166V104H140V114H80V104H54V66Z" fill="${fillDark}" stroke="${stroke}" stroke-width="2.2"/>
        <rect x="84" y="34" width="52" height="10" rx="2" fill="rgba(0, 210, 230, 0.25)" stroke="${stroke}" stroke-width="2"/>
        <path d="M104 48V74M116 48V74" stroke="${accent}" stroke-width="2" stroke-dasharray="3 2"/>
        <rect x="100" y="74" width="20" height="14" rx="2" fill="rgba(0, 210, 230, 0.3)" stroke="${stroke}" stroke-width="2"/>
      </svg>`,
    'ball-3pc': `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="54" width="24" height="52" rx="3" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <rect x="74" y="48" width="72" height="64" rx="4" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <rect x="146" y="54" width="24" height="52" rx="3" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <line x1="46" y1="54" x2="174" y2="54" stroke="#94A3B8" stroke-width="2"/>
        <line x1="46" y1="106" x2="174" y2="106" stroke="#94A3B8" stroke-width="2"/>
        <circle cx="110" cy="80" r="18" fill="rgba(0, 210, 230, 0.16)" stroke="${stroke}" stroke-width="2"/>
        <path d="M110 48V28H166" stroke="#38BDF8" stroke-width="3.5" stroke-linecap="round"/>
      </svg>`,
    strainer: `
      <svg viewBox="0 0 220 140" class="${sizeClass}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="34" y="34" width="11" height="54" rx="2.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <rect x="175" y="34" width="11" height="54" rx="2.5" fill="${fillDark}" stroke="${stroke}" stroke-width="2"/>
        <path d="M45 46H175V76H132L152 106L124 122L94 76H45V46Z" fill="${fillDark}" stroke="${stroke}" stroke-width="2.2"/>
        <line x1="104" y1="74" x2="132" y2="115" stroke="${accent}" stroke-width="3" stroke-dasharray="3 3"/>
        <line x1="120" y1="124" x2="156" y2="103" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
      </svg>`
  };
  return svgs[type] || svgs.ball;
}

function showToast(title, message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-24 right-5 z-50 flex flex-col gap-2 pointer-events-none no-print';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const borderClass = type === 'success' ? 'border-emerald-400/50' : 'border-cyan-400/50';
  const badgeColor = type === 'success' ? 'text-emerald-700' : 'text-teal-700';

  toast.className = 'pointer-events-auto glass-panel ' + borderClass + ' rounded-2xl p-4 max-w-xs shadow-2xl transform transition-all duration-300 translate-x-4 opacity-0';
  toast.innerHTML = `
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs font-bold uppercase tracking-wider ${badgeColor}">${title}</p>
        <p class="text-xs text-slate-700 mt-1 leading-relaxed">${message}</p>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="text-slate-400 hover:text-slate-800 text-xs">&#10005;</button>
    </div>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-4', 'opacity-0');
  });
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-4');
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

function renderSocialIconsHTML(sizeClass = 'w-9 h-9') {
  return `
    <a href="${SITE_CONFIG.socials.linkedin}" target="_blank" rel="noopener noreferrer" title="LinkedIn (${SITE_CONFIG.companyName})"
       class="${sizeClass} rounded-xl bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-400 flex items-center justify-center text-slate-600 hover:text-sky-700 shadow-sm transition">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    </a>
    <a href="${SITE_CONFIG.socials.whatsapp}" target="_blank" rel="noopener noreferrer" title="WhatsApp (${SITE_CONFIG.phoneDisplay})"
       class="${sizeClass} rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 flex items-center justify-center text-slate-600 hover:text-emerald-600 shadow-sm transition">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/></svg>
    </a>
  `;
}

function buildWhatsAppQuoteUrl(singleProduct = null) {
  let text = 'Hello DS Industries,%0A%0AI would like to inquire about your industrial valves:%0A';
  if (singleProduct) {
    text += '• ' + singleProduct.name + ' | Size: ' + singleProduct.sizeRange + ' | Class: ' + singleProduct.pressureClasses.join('/') + ' | Material: ' + singleProduct.materials.join('/') + '%0A';
  } else {
    text += '• Industrial Valves & Filtration Equipment%0A';
  }
  text += '%0APlease connect with me for technical specifications and details.';
  return 'https://wa.me/' + SITE_CONFIG.phoneRaw.replace('+', '') + '?text=' + text;
}

let currentModalRating = 5;

function openFeedbackModal() {
  const modal = document.getElementById('feedback-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeFeedbackModal() {
  const modal = document.getElementById('feedback-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function setModalRating(num) {
  currentModalRating = num;
  document.querySelectorAll('.modal-star').forEach((btn, idx) => {
    if (idx + 1 === num) {
      btn.className = 'modal-star p-2 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-400 text-sm font-bold';
    } else {
      btn.className = 'modal-star p-2 rounded-xl bg-slate-100 text-slate-500 border border-slate-300 text-sm font-bold';
    }
  });
}

function handleQuickFeedbackSubmit(e) {
  e.preventDefault();
  const nameInp = document.getElementById('modal-fb-name');
  const name = nameInp ? nameInp.value : 'Valued Client';
  closeFeedbackModal();
  showToast('Feedback Received', `Thank you, ${name}! Your ${currentModalRating}-star feedback has been logged.`, 'success');
  e.target.reset();
}

function initializeSharedPageElements() {
  const headerIcons = document.getElementById('header-social-icons');
  if (headerIcons) headerIcons.innerHTML = renderSocialIconsHTML('w-8 h-8');

  const mobileIcons = document.getElementById('mobile-social-icons');
  if (mobileIcons) mobileIcons.innerHTML = renderSocialIconsHTML('w-8 h-8');

  const footerIcons = document.getElementById('footer-social-icons');
  if (footerIcons) footerIcons.innerHTML = renderSocialIconsHTML('w-9 h-9');

  const floatingWa = document.getElementById('floating-whatsapp-btn');
  if (floatingWa) floatingWa.href = SITE_CONFIG.socials.whatsapp;

  const footerMap = document.getElementById('footer-map-link');
  if (footerMap) footerMap.href = SITE_CONFIG.googleMapsUrl;

  const footerAddr = document.getElementById('footer-address-text');
  if (footerAddr) footerAddr.textContent = SITE_CONFIG.address;

  const footerPhone = document.getElementById('footer-phone-link');
  if (footerPhone) {
    footerPhone.href = 'tel:' + SITE_CONFIG.phoneRaw;
    footerPhone.textContent = SITE_CONFIG.phoneDisplay;
  }

  const footerEmail = document.getElementById('footer-email-link');
  if (footerEmail) {
    footerEmail.href = 'mailto:' + SITE_CONFIG.email;
    footerEmail.textContent = SITE_CONFIG.email;
  }
}
