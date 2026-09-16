/**
 * BreatheTherm — main.js
 *
 * 1. Navigation + hero parallax (single shared scroll listener)
 * 2. Scroll reveals + hero entrance
 * 3. Wall & floor layer explorer (SVG hotspots + legend)
 * 4. Audience path modals
 * 5. Smooth anchor scrolling
 * 6. WhatsApp click tracking (GA4)
 */

(function () {
  'use strict';

  const qs = (s, ctx = document) => ctx.querySelector(s);
  const qsa = (s, ctx = document) => [...ctx.querySelectorAll(s)];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────────────────────
     1. NAVIGATION + HERO PARALLAX

     Previously two separate scroll listeners, each writing styles on
     every scroll event. They now share one passive listener and all
     writes are batched into a single requestAnimationFrame per frame,
     which keeps scrolling off the main thread's critical path.
  ───────────────────────────────────────────────────────── */
  const nav = qs('#main-nav');
  const heroBg = qs('.hero-bg');
  let ticking = false;

  function onScrollFrame() {
    const y = window.scrollY;

    if (nav) {
      nav.classList.toggle('nav-visible', y > 20);
      nav.classList.toggle('nav-scrolled', y > 60);
    }

    if (heroBg && !reduceMotion) {
      const offset = Math.min(y * 0.3, window.innerHeight * 0.3);
      heroBg.style.transform = `translate3d(0, ${offset}px, 0)`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });

  onScrollFrame();

  /* Hamburger / mobile nav */
  const ham = qs('#hamburger');
  const mNav = qs('#mobile-nav');

  ham?.addEventListener('click', () => {
    const open = mNav.classList.toggle('open');
    ham.setAttribute('aria-expanded', open);
  });

  qsa('#mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      mNav.classList.remove('open');
      ham?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ─────────────────────────────────────────────────────────
     2. SCROLL REVEALS
  ───────────────────────────────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  qsa('.reveal').forEach(el => revealObs.observe(el));

  /* Hero entrance. Under reduced-motion the stagger is skipped and the
     content is shown immediately, so it is never left hidden. */
  const heroEls = qsa('.reveal-hero');

  if (reduceMotion) {
    heroEls.forEach(el => el.classList.add('visible'));
  } else {
    requestAnimationFrame(() =>
      setTimeout(() => {
        heroEls.forEach((el, i) =>
          setTimeout(() => el.classList.add('visible'), 120 + i * 45)
        );
      }, 80)
    );
  }

  /* ─────────────────────────────────────────────────────────
     3. WALL & FLOOR LAYER EXPLORER

     Keys match the data-layer (legend) and data-id (SVG hotspot)
     attributes in index.html. This is the single source of truth for
     layer specs and pricing — editing a value here updates the card
     for both interaction paths.
  ───────────────────────────────────────────────────────── */
  const LAYER_DATA = {
    W1: {
      title: 'PerliScratch',
      desc: 'Vapour-permeable lime-perlite scratch coat designed as a high-adhesion base or key layer. It provides a keyed surface to ensure maximum bond strength for subsequent insulating renders or finishing coats while remaining lightweight and breathable.',
      thick: '3mm, 4mm, 5mm',
      lambda: '0.080 W/m·K',
      sd: '0.02 – 0.04 m',
      price: '£4.60 /m²'
    },
    W2: {
      title: 'PerliTherm',
      desc: 'Mineral breathable wall base insulation providing excellent vapour management alongside thermal performance. The core of the BreatheTherm wall system — expanded perlite bound with hydraulic lime.',
      thick: '50mm',
      lambda: '0.064 W/m·K',
      sd: '0.2 – 0.4 m',
      price: '£45.00 /m²'
    },
    W3: {
      title: 'AeroBond',
      desc: 'All-in-one breathable adhesive and basecoat render for AeroBoard and mineral substrates. This fibre-reinforced lime-polymer formulation replaces separate primers, adhesives and basecoats with a single crack-resistant product.',
      thick: '3mm, 4mm, 5mm, 6mm',
      lambda: '0.12 W/m·K',
      sd: '0.02 – 0.04 m',
      price: '£20.00 /m²'
    },
    W4: {
      title: 'Aerogel Layer',
      desc: 'Ultra-thin silica aerogel blanket for thermally constrained retrofits where build depth is at a premium — window reveals, recessed frames, and tight junctions. Highest thermal resistance per mm available.',
      thick: '10mm',
      lambda: '0.017 W/m·K',
      sd: '0.04 – 0.08 m',
      price: '£23.70 /m²'
    },
    W5: {
      title: 'PerliFinish',
      desc: 'Traditional breathable lime finish coat. Fully compatible with historic masonry and allows the wall to manage vapour freely.',
      thick: '20mm',
      lambda: '—',
      sd: '0.10 – 0.20 m',
      price: '£6.60 /m²'
    },
    F1: {
      title: 'PerliMat',
      desc: 'Vapour-permeable geotextile separator for sub-base layers.',
      thick: '3.5mm',
      lambda: 'n/a',
      sd: 'Vapour open',
      price: '£3.00 /m²'
    },
    F2: {
      title: 'PerliBase',
      desc: 'Vapour-permeable mineral-based insulating floor system designed as a structural underbase layer for internal floor build-ups. Essential for maintaining vapour-open continuity in floor retrofits.',
      thick: '75mm – 200mm',
      lambda: '0.045 W/m·K',
      sd: '0.3 – 0.6 m',
      price: '£59.25 /m²'
    },
    F3: {
      title: 'PerliStruct',
      desc: 'Vapour-permeable lime-perlite structural screed and underbase layer for internal floor build-ups, solid wall base layers, or sub-screeds. It provides structural strength while maintaining high vapour permeability for heritage and retrofit projects.',
      thick: '30mm – 150mm',
      lambda: '0.080 – 0.090 W/m·K',
      sd: '0.20 – 0.40 m',
      price: 'from £46.00 /m²'
    },
    F4: {
      title: 'AeroBond',
      desc: 'All-in-one breathable adhesive and basecoat render for AeroBoard and mineral substrates. This fibre-reinforced lime-polymer formulation replaces separate primers, adhesives and basecoats with a single crack-resistant product.',
      thick: '5mm',
      lambda: '0.12 W/m·K',
      sd: '0.02 – 0.04 m',
      price: '£20.00 /m²'
    },
    F5: {
      title: 'Aerogel',
      desc: 'Ultra-thin silica aerogel blanket for thermally constrained retrofits where build depth is at a premium — window reveals, recessed frames, and tight junctions. Highest thermal resistance per mm available.',
      thick: '5mm',
      lambda: '0.017 W/m·K',
      sd: '0.04 – 0.08 m',
      price: '£23.25 /m²'
    },
    F6: {
      title: 'PerliScreed',
      desc: 'High-performance mineral-based floor insulation system for internal retrofits. Designed to provide a vapour-open, membrane-free floor base that aligns with the BreatheTherm modular breathable hierarchy.',
      thick: '75mm – 200mm',
      lambda: '0.045 W/m·K',
      sd: '0.3 – 0.6 m',
      price: '£59.25 /m² @75mm'
    }
  };

  const layerCard = qs('#layerCard');
  let activeHs = null;

  function showLayer(id) {
    const d = LAYER_DATA[id];
    if (!d || !layerCard) return;
    qs('#lcTitle').textContent = d.title;
    qs('#lcDesc').textContent = d.desc;
    qs('#lcThick').textContent = d.thick;
    qs('#lcLambda').textContent = d.lambda;
    qs('#lcSd').textContent = d.sd;
    qs('#lcPrice').textContent = d.price;
    layerCard.classList.add('lc-visible');
  }

  function setActiveHotspot(id) {
    if (activeHs) activeHs.classList.remove('hactive');
    activeHs = qs(`.hs-group[data-id="${id}"]`);
    if (activeHs) activeHs.classList.add('hactive');
  }

  function setActiveLegend(id) {
    qsa('.legend-item').forEach(i =>
      i.classList.toggle('lactive', i.dataset.layer === id)
    );
  }

  /* SVG hotspots — hover, click and keyboard all select a layer */
  qsa('.hs-group').forEach(g => {
    const activate = () => {
      const id = g.dataset.id;
      setActiveHotspot(id);
      setActiveLegend(id);
      showLayer(id);
    };
    g.addEventListener('mouseenter', activate);
    g.addEventListener('click', activate);
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  /* Legend items — mirror the selection back onto the SVG.
     Legend items carry tabindex="0", so they need a keyboard handler
     to be operable without a mouse. */
  qsa('.legend-item').forEach(item => {
    const activate = () => {
      const id = item.dataset.layer;
      setActiveLegend(id);
      setActiveHotspot(id);
      showLayer(id);
    };
    item.addEventListener('click', activate);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  /* ─────────────────────────────────────────────────────────
     4. AUDIENCE PATH MODALS
  ───────────────────────────────────────────────────────── */
  let lastFocused = null;

  const openModal = id => {
    const overlay = qs(`#modal-${id}`);
    if (!overlay) return;
    lastFocused = document.activeElement;
    overlay.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('a, button')?.focus();
  };

  /* Closing always clears every overlay, so one handler covers the
     close button, the backdrop click and the Escape key. */
  const closeAllModals = () => {
    qsa('.modal-overlay').forEach(o => o.classList.remove('modal-open'));
    document.body.style.overflow = '';
    /* Return focus to the trigger so keyboard users are not dropped
       back at the top of the document. */
    lastFocused?.focus();
    lastFocused = null;
  };

  qsa('.path-trigger').forEach(btn =>
    btn.addEventListener('click', () => openModal(btn.dataset.modal))
  );
  qsa('.modal-close').forEach(btn =>
    btn.addEventListener('click', closeAllModals)
  );
  qsa('.modal-overlay').forEach(overlay =>
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeAllModals();
    })
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllModals();
  });

  /* ─────────────────────────────────────────────────────────
     5. SMOOTH ANCHOR SCROLLING (offset for the fixed nav)

     Guards against href="#" — querySelector('#') throws a SyntaxError
     and would break the handler — and against anchors whose target
     does not exist on the page.
  ───────────────────────────────────────────────────────── */
  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = qs(href);
      if (!target) return;

      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offset,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    });
  });

  /* ─────────────────────────────────────────────────────────
     6. WHATSAPP CLICK TRACKING

     WhatsApp opens in a new tab or the native app, so GA4 records no
     pageview and these enquiries are otherwise invisible. This sends an
     explicit event so WhatsApp can be compared with phone and email.
  ───────────────────────────────────────────────────────── */
  qsa('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', {
          link_location: link.classList.contains('sticky-wa') ? 'sticky_button' : 'in_page'
        });
      }
    });
  });

})();
