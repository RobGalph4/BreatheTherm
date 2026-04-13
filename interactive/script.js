/* ============================================
   BreatheTherm Interactive Build-up Guide
   script.js — zone selection + layer hover
   ============================================ */

'use strict';

// ─────────────────────────────────────────────
// DATA — zones, layers, product data sheets
// ─────────────────────────────────────────────

const ZONES = {

  brickWall: {
    label:       'Left Wall',
    subtitle:    'Brick · Internal Wall Insulation (IWI)',
    description: 'Solid brick wall retrofitted with PerliTherm applied to the internal face. No vapour membrane required. Suitable for listed and heritage buildings.',
    uValue:      '~0.55',
    uNote:       'With 50mm PerliTherm on 215mm solid brick. Confirm by project calculation.',
    sectionType: 'wall',
    dirLeft:     'OUTSIDE',
    dirRight:    'INSIDE',
    layers: [
      {
        id:          'brick_existing',
        name:        'Solid Brick',
        thickness:   '215mm',
        visualSize:  120,
        colorHex:    '#b06040',
        isProduct:   false,
        info: {
          name:        'Existing Solid Brick',
          description: 'Traditional 215mm solid English bond brickwork. High thermal mass; typical pre-insulation U-value approx. 2.0–2.2 W/m²K.',
          specs: [
            { key: 'λ (W/m·K)', val: '~0.77' },
            { key: 'Thickness',  val: '215mm' },
          ],
          note: 'Existing substrate — no additional cost. Clean, dry and free of loose material before application.',
        },
      },
      {
        id:          'perliTherm50_iwi',
        name:        'PerliTherm',
        thickness:   '50mm',
        visualSize:  90,
        colorHex:    '#ddd0b0',
        isProduct:   true,
        productTag:  'BASE INSULATION',
        info: {
          name:        'PerliTherm — 50mm IWI',
          description: 'Mineral perlite-based insulation plaster. Breathable and fully vapour-open. Applied wet, bonds directly to the substrate. No adhesive membranes required. Ideal for solid masonry and all heritage wall types.',
          specs: [
            { key: 'λ (W/m·K)',  val: '0.064' },
            { key: 'Sd (m)',      val: '0.20–0.40' },
            { key: 'Bags / m²',  val: '1.00' },
            { key: '£ / m² ex VAT', val: '£45.00', isPrice: true },
          ],
          note: 'Sd ranges aligned to Retrofit Paradox logic (μ ≈ 4–8). Final U-value requires project-specific calculation.',
        },
      },
      {
        id:          'lime_plaster_iwi',
        name:        'Lime Finish',
        thickness:   '12mm',
        visualSize:  28,
        colorHex:    '#ede9e0',
        isProduct:   false,
        info: {
          name:        'Lime Skim / Finish Plaster',
          description: 'Traditional lime-based skim coat over PerliTherm. Maintains vapour openness through the system. Accepts paint and heritage finishes.',
          specs: [
            { key: 'λ (W/m·K)',  val: '~0.80' },
            { key: 'Sd (m)',      val: '0.10–0.20' },
            { key: 'Thickness',   val: '10–15mm' },
          ],
          note: 'Specified separately. Always use a compatible vapour-open finish over PerliTherm systems.',
        },
      },
    ],
  },

  stoneWall: {
    label:       'Right Wall',
    subtitle:    'Stone · External Wall Insulation (EWI)',
    description: 'Rubble or ashlar stone wall with PerliTherm + Aerogel Boost applied externally. Retains all internal floor area and high thermal mass. Finished with breathable lime render.',
    uValue:      '~0.35',
    uNote:       'With 50mm PerliTherm + 10mm Aerogel on 400mm stone. Confirm by project calculation.',
    sectionType: 'wall',
    dirLeft:     'OUTSIDE',
    dirRight:    'INSIDE',
    layers: [
      {
        id:          'lime_render_ewi',
        name:        'Lime Render',
        thickness:   '15mm',
        visualSize:  28,
        colorHex:    '#ede9e0',
        isProduct:   false,
        info: {
          name:        'External Lime Render Finish',
          description: 'Weather-resistant lime render applied over the EWI build-up. Fully vapour-open, compatible with the breathable system. Can be coloured or textured to match existing fabric.',
          specs: [
            { key: 'λ (W/m·K)',  val: '~0.80' },
            { key: 'Sd (m)',      val: '0.10–0.20' },
            { key: 'Thickness',   val: '12–20mm' },
          ],
          note: 'Always specify a breathable lime-based render over PerliTherm/Aerogel EWI systems.',
        },
      },
      {
        id:          'aerogel10_ewi',
        name:        'Aerogel Boost',
        thickness:   '10mm',
        visualSize:  44,
        colorHex:    '#b8d4e8',
        isProduct:   true,
        productTag:  'PERFORMANCE BOOST',
        info: {
          name:        'Aerogel Boost Module — 10mm',
          description: 'Ultra-slim aerogel blanket bonded with AeroBond adhesive. Dramatically improves thermal performance where build-up thickness is constrained. Very high vapour permeability.',
          specs: [
            { key: 'λ (W/m·K)',  val: '0.017' },
            { key: 'Sd (m)',      val: '0.04–0.08' },
            { key: 'AeroBond',    val: '1.43 bags/m²' },
            { key: 'Aerogel £/m²', val: '£23.25', isPrice: true },
            { key: 'Total £/m²',   val: '£66.82', isPrice: true },
          ],
          note: 'Total price includes PerliTherm base + AeroBond adhesive. Ideal for constrained sites or where planning limits projection.',
        },
      },
      {
        id:          'perliTherm50_ewi',
        name:        'PerliTherm',
        thickness:   '50mm',
        visualSize:  90,
        colorHex:    '#ddd0b0',
        isProduct:   true,
        productTag:  'BASE INSULATION',
        info: {
          name:        'PerliTherm — 50mm EWI',
          description: 'Mineral perlite insulation plaster applied to the external face of the wall. Breathable and vapour-open. Can be applied without mechanical fixings on suitable substrates.',
          specs: [
            { key: 'λ (W/m·K)',  val: '0.064' },
            { key: 'Sd (m)',      val: '0.20–0.40' },
            { key: 'Bags / m²',  val: '1.00' },
            { key: '£ / m² ex VAT', val: '£45.00', isPrice: true },
          ],
          note: 'μ ≈ 4–8, Sd aligned to Retrofit Paradox logic. No membranes required.',
        },
      },
      {
        id:          'stone_existing',
        name:        'Solid Stone',
        thickness:   '400mm',
        visualSize:  120,
        colorHex:    '#c4a86a',
        isProduct:   false,
        info: {
          name:        'Existing Solid Stone Wall',
          description: 'Rubble or ashlar stonework, typically 350–500mm. Very high thermal mass; typical pre-insulation U-value approx. 1.5–1.8 W/m²K. EWI preserves all internal floor area.',
          specs: [
            { key: 'λ (W/m·K)',  val: '~1.4' },
            { key: 'Thickness',   val: '350–500mm' },
          ],
          note: 'Existing substrate — no additional cost. Survey condition and pointing before overclad.',
        },
      },
    ],
  },

  floor: {
    label:       'Floor',
    subtitle:    'PerliBase · Internal Floor System',
    description: 'Loose-fill expanded perlite floor insulation. Laid as a continuous bed under screed or between joists. High compressive strength, fully vapour-open, no membrane required.',
    uValue:      '~0.25',
    uNote:       'With 100mm PerliBase on ground floor. Confirm by project calculation.',
    sectionType: 'floor',
    dirTop:      'SURFACE',
    dirBottom:   'GROUND',
    layers: [
      {
        id:          'floor_finish',
        name:        'Floor Finish',
        thickness:   '20mm',
        visualSize:  28,
        colorHex:    '#8b7355',
        isProduct:   false,
        info: {
          name:        'Floor Finish',
          description: 'Timber boards, stone flags, tiles or other finish to client specification. Laid over structural screed.',
          specs: [
            { key: 'Thickness', val: 'Varies' },
          ],
          note: 'Specify finish separately. Allow for movement and differential settlement in detailing.',
        },
      },
      {
        id:          'screed',
        name:        'Sand/Cement Screed',
        thickness:   '75mm',
        visualSize:  64,
        colorHex:    '#ccc4ae',
        isProduct:   false,
        info: {
          name:        'Sand/Cement Screed',
          description: 'Structural screed laid over PerliBase insulation bed. Provides a level, load-bearing surface for finishes. Minimum 65mm recommended over PerliBase systems.',
          specs: [
            { key: 'λ (W/m·K)',  val: '~1.20' },
            { key: 'Thickness',   val: 'Min. 65mm' },
          ],
          note: 'Ensure adequate curing time before applying finish. A separating layer is not required over PerliBase.',
        },
      },
      {
        id:          'perliBase100',
        name:        'PerliBase',
        thickness:   '100mm',
        visualSize:  96,
        colorHex:    '#ddd0b0',
        isProduct:   true,
        productTag:  'FLOOR INSULATION',
        info: {
          name:        'PerliBase — 100mm',
          description: 'Expanded perlite loose-fill floor insulation. Poured and screeded in situ to achieve a consistent level bed. No membranes or DPC required in most applications. Fully vapour-open.',
          specs: [
            { key: 'λ (W/m·K)',  val: '0.045' },
            { key: 'Sd (m)',      val: '0.40–0.80' },
            { key: 'Bags / m²',  val: '2.00' },
            { key: '£ / m² ex VAT', val: '£79.00', isPrice: true },
          ],
          note: 'High compressive strength — suitable under structural screed. Other thicknesses available: 75mm (£59.25) to 200mm (£158.00) ex VAT.',
        },
      },
      {
        id:          'subbase',
        name:        'Sub-base / Ground',
        thickness:   '150mm+',
        visualSize:  52,
        colorHex:    '#7a6248',
        isProduct:   false,
        info: {
          name:        'Sub-base / Ground',
          description: 'Compacted hardcore or existing ground. Damp-proof membrane may be required for solid ground floors depending on ground conditions.',
          specs: [
            { key: 'Thickness', val: '150mm min.' },
          ],
          note: 'Existing substrate. Assess need for DPM, radon barrier, or other ground remediation before laying PerliBase.',
        },
      },
    ],
  },

  ceiling: {
    label:       'Ceiling / Roof',
    subtitle:    'PerliTherm · Breathable Roof Insulation',
    description: 'PerliTherm applied between and/or over rafters. Fully breathable, vapour-open build-up. No cold bridge at eaves. Compatible with heritage and modern roof coverings.',
    uValue:      '~0.25',
    uNote:       'With 70mm PerliTherm between rafters. Confirm by project calculation.',
    sectionType: 'floor',
    dirTop:      'OUTSIDE',
    dirBottom:   'INSIDE',
    layers: [
      {
        id:          'roof_covering',
        name:        'Roof Covering',
        thickness:   '—',
        visualSize:  30,
        colorHex:    '#3c3c3c',
        isProduct:   false,
        info: {
          name:        'Roof Covering',
          description: 'Existing slate, plain tile or other roof covering retained in breathable build-up. No change to the external appearance of the building.',
          specs: [
            { key: 'Type', val: 'Existing' },
          ],
          note: 'Survey condition before proceeding. Any defective covering should be repaired or replaced.',
        },
      },
      {
        id:          'breathable_membrane',
        name:        'Breathable Membrane',
        thickness:   '—',
        visualSize:  18,
        colorHex:    '#5a9e6a',
        isProduct:   false,
        info: {
          name:        'Breathable Roofing Underlay',
          description: 'High-vapour-permeability membrane laid between the roof covering and the insulation. Allows moisture to migrate outward while providing weather protection during construction.',
          specs: [
            { key: 'Sd (m)',  val: '< 0.10' },
          ],
          note: 'A high-permeability (Class 1) underlay is required in breathable warm-roof build-ups. Do not use vapour control layers.',
        },
      },
      {
        id:          'perliTherm70_roof',
        name:        'PerliTherm',
        thickness:   '70mm',
        visualSize:  96,
        colorHex:    '#ddd0b0',
        isProduct:   true,
        productTag:  'RAFTER INSULATION',
        info: {
          name:        'PerliTherm — 70mm Roof',
          description: 'Mineral perlite insulation plaster between and over rafters. Vapour-open — compatible with breathable warm and cold roof build-ups. No synthetic membranes required.',
          specs: [
            { key: 'λ (W/m·K)',  val: '0.064' },
            { key: 'Sd (m)',      val: '0.28–0.56' },
            { key: 'Bags / m²',  val: '1.40' },
            { key: '£ / m² ex VAT', val: '£63.00', isPrice: true },
          ],
          note: 'μ ≈ 4–8. Can be combined with Aerogel Boost for constrained rafter depth. Other thicknesses available from 10mm to 100mm.',
        },
      },
      {
        id:          'ceiling_plaster',
        name:        'Lime Skim',
        thickness:   '12mm',
        visualSize:  24,
        colorHex:    '#ede9e0',
        isProduct:   false,
        info: {
          name:        'Internal Ceiling Plaster / Lime Skim',
          description: 'Lime-based internal finish over PerliTherm. Maintains full vapour openness through the build-up. Can be applied directly to the set PerliTherm face.',
          specs: [
            { key: 'Sd (m)',      val: '0.10–0.20' },
            { key: 'Thickness',   val: '10–15mm' },
          ],
          note: 'Internal finish coat. Always specify a vapour-open lime or clay plaster over PerliTherm roof insulation.',
        },
      },
    ],
  },

};


// ─────────────────────────────────────────────
// DOM HELPERS
// ─────────────────────────────────────────────

const $ = id => document.getElementById(id);
const el = (tag, cls, attrs = {}) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
};


// ─────────────────────────────────────────────
// RENDER FUNCTIONS
// ─────────────────────────────────────────────

function renderCrossSection(zone) {
  const wrap = $('crosssectionDiagram');
  const dirLabels = $('directionLabels');
  wrap.innerHTML = '';
  dirLabels.innerHTML = '';

  const isWall  = zone.sectionType === 'wall';
  const isFloor = zone.sectionType === 'floor';

  wrap.className = 'crosssection-diagram ' + (isWall ? 'wall-section' : 'floor-section');

  // Direction labels
  if (isWall) {
    dirLabels.textContent = '';
    const left = el('span');  left.textContent  = '← ' + zone.dirLeft;
    const right = el('span'); right.textContent = zone.dirRight + ' →';
    dirLabels.appendChild(left);
    dirLabels.appendChild(right);
  } else {
    // floor/ceiling: top = dirTop, bottom = dirBottom
    // We use column-reverse so bottom layer is rendered first in HTML
    const top = el('span');  top.textContent  = '↑ ' + zone.dirTop;
    const bot = el('span'); bot.textContent = '↓ ' + zone.dirBottom;
    dirLabels.appendChild(top);
    dirLabels.appendChild(bot);
  }

  // For wall: layers in array order (left → right)
  // For floor: layers are displayed bottom-to-top; array order is top→bottom, flex-direction: column-reverse flips them
  zone.layers.forEach(layer => {
    const block = el('div', 'layer-block' + (layer.isProduct ? ' is-product' : ''));
    block.dataset.layerId = layer.id;

    // Size
    if (isWall) {
      block.style.width    = layer.visualSize + 'px';
      block.style.flexShrink = '0';
    } else {
      block.style.height   = layer.visualSize + 'px';
      block.style.minHeight = layer.visualSize + 'px';
    }

    // Background
    block.style.background = layer.colorHex;

    // Narrow detection for walls
    const isNarrow = isWall && layer.visualSize < 40;
    if (isNarrow) block.classList.add('narrow');

    // Inner content
    const nameWrap = el('div', 'layer-name-wrap');
    if (layer.isProduct) {
      const tag = el('div', 'layer-product-tag');
      tag.textContent = layer.productTag;
      nameWrap.appendChild(tag);
    }
    const namEl = el('div', 'layer-name');
    namEl.textContent = layer.name;
    const thickEl = el('div', 'layer-thick');
    thickEl.textContent = layer.thickness;

    nameWrap.appendChild(namEl);
    nameWrap.appendChild(thickEl);
    block.appendChild(nameWrap);

    // Hover events
    block.addEventListener('mouseenter', () => showProductData(layer));
    block.addEventListener('mouseleave', clearProductData);
    // Touch / click for mobile
    block.addEventListener('click', () => showProductData(layer));

    wrap.appendChild(block);
  });
}

function showProductData(layer) {
  $('productPlaceholder').hidden = true;
  const pd = $('productData');
  pd.hidden = false;

  const info = layer.info;

  $('productTag').textContent = layer.isProduct ? layer.productTag : 'EXISTING / FINISH';
  $('productName').textContent = info.name;
  $('productDescription').textContent = info.description;

  // Specs
  const specs = $('productSpecs');
  specs.innerHTML = '';
  if (info.specs) {
    info.specs.forEach(s => {
      const pill = el('div', 'spec-pill' + (s.isPrice ? ' price' : ''));
      const key = el('div', 'spec-key'); key.textContent = s.key;
      const val = el('div', 'spec-val'); val.textContent = s.val;
      pill.appendChild(key);
      pill.appendChild(val);
      specs.appendChild(pill);
    });
  }

  const noteEl = $('productNote');
  noteEl.textContent = info.note || '';
  noteEl.style.display = info.note ? '' : 'none';

  // Animate in
  pd.style.animation = 'none';
  pd.offsetHeight; // reflow
  pd.style.animation = 'fadeSlideIn 0.2s ease both';
}

function clearProductData() {
  // Don't immediately clear — let the user read it briefly
  // Only clear when another zone is selected or cursor fully leaves the diagram
}

function renderZone(zoneId) {
  const zone = ZONES[zoneId];
  if (!zone) return;

  // Show content
  $('emptyState').hidden   = true;
  const content = $('buildupContent');
  content.hidden = false;
  content.style.animation = 'none';
  content.offsetHeight;
  content.style.animation = 'fadeSlideIn 0.3s ease both';

  // Header
  $('zoneTitle').textContent    = zone.label;
  $('zoneSubtitle').textContent = zone.subtitle;
  $('zoneDescription').textContent = zone.description;
  $('uValueNum').textContent    = zone.uValue;
  // U-value note in title attr for accessibility
  $('uValueBadge').title = zone.uNote;

  // Cross section
  renderCrossSection(zone);

  // Reset product panel
  $('productPlaceholder').hidden = false;
  $('productData').hidden = true;

  // Highlight active zone chip
  document.querySelectorAll('.zone-chip').forEach(c => c.classList.toggle('active', c.dataset.zone === zoneId));
  document.querySelectorAll('.zone-group').forEach(g => g.classList.toggle('active', g.dataset.zone === zoneId));
}


// ─────────────────────────────────────────────
// EVENT BINDING
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // SVG zone clicks
  document.querySelectorAll('.zone-group').forEach(g => {
    g.addEventListener('click', () => renderZone(g.dataset.zone));
  });

  // Zone chips
  document.querySelectorAll('.zone-chip').forEach(chip => {
    chip.addEventListener('click', () => renderZone(chip.dataset.zone));
  });

  // Clear product panel when mouse leaves the diagram area
  document.addEventListener('mouseover', e => {
    const inDiagram = e.target.closest('#crosssectionDiagram');
    if (!inDiagram) {
      const pd = $('productData');
      if (!pd.hidden) {
        // Small delay so user can glance at the panel
        pd.dataset.leaveTimeout = setTimeout(() => {
          $('productPlaceholder').hidden = false;
          pd.hidden = true;
        }, 600);
      }
    } else {
      clearTimeout($('productData').dataset.leaveTimeout);
    }
  });

});
