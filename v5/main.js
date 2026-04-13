/**
 * BreatheTherm — main.js
 * 1. Navigation (scroll reveal + hamburger)
 * 2. Scroll-triggered reveals + hero entrance
 * 3. Stat counter animation
 * 4. Parallax hero background
 * 5. Wall Layer Explorer (SVG hotspots + legend)
 * 6. Audience path modal system
 * 7. Lead capture form
 * 8. Smooth anchor scrolling
 */

(function () {
  'use strict';

  const qs  = (s, ctx = document) => ctx.querySelector(s);
  const qsa = (s, ctx = document) => [...ctx.querySelectorAll(s)];

  /* ─────────────────────────────────────────────────────────
     1. NAVIGATION
  ───────────────────────────────────────────────────────── */
  const nav = qs('#main-nav');

  function updateNav() {
    const y = window.scrollY;
    nav.classList.toggle('nav-visible',  y > 20);
    nav.classList.toggle('nav-scrolled', y > 60);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* Hamburger */
  const ham  = qs('#hamburger');
  const mNav = qs('#mobile-nav');

  ham?.addEventListener('click', () => {
    const open = mNav.classList.toggle('open');
    ham.setAttribute('aria-expanded', open);
  });
  qsa('#mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      mNav.classList.remove('open');
      ham.setAttribute('aria-expanded', false);
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

  /* Hero entrance — stagger each child slightly */
  requestAnimationFrame(() =>
    setTimeout(() => {
      qsa('.reveal-hero').forEach((el, i) =>
        setTimeout(() => el.classList.add('visible'), 120 + i * 45)
      );
    }, 80)
  );

  /* ─────────────────────────────────────────────────────────
     3. STAT COUNTER
  ───────────────────────────────────────────────────────── */
  function countUp(el, target, suffix, dur = 1600) {
    const start = performance.now();
    (function tick(now) {
      const p     = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 5);        // ease-out quint
      const val   = target % 1 !== 0
        ? (target * eased).toFixed(2)
        : Math.round(target * eased) + suffix;
      el.textContent = val;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      if (!isNaN(target)) countUp(el, target, suffix);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  qsa('[data-count]').forEach(el => countObs.observe(el));

  /* ─────────────────────────────────────────────────────────
     4. PARALLAX HERO
  ───────────────────────────────────────────────────────── */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const heroBg = qs('.hero-bg');
    window.addEventListener('scroll', () => {
      if (heroBg) {
        const offset = Math.min(window.scrollY * 0.3, window.innerHeight * 0.3);
        heroBg.style.transform = `translateY(${offset}px)`;
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────────────────
     5. WALL LAYER EXPLORER
  ───────────────────────────────────────────────────────── */
  const LAYER_DATA = {
    W1: {
      id: 'W1',
      title: 'PerliTherm 50mm',
      desc: 'Mineral breathable wall base insulation providing excellent vapour management alongside thermal performance. The core of the BreatheTherm wall system — expanded perlite bound with hydraulic lime.',
      thick: '50mm',
      lambda: '0.064 W/m·K',
      sd: '0.2 – 0.4 m',
      price: '£45.00 /m²'
    },
    W2: {
      id: 'W2',
      title: 'Aerogel Boost 10mm',
      desc: 'Ultra-thin silica aerogel blanket for thermally constrained retrofits where build depth is at a premium — window reveals, recessed frames, and tight junctions. Highest thermal resistance per mm available.',
      thick: '10mm',
      lambda: '0.017 W/m·K',
      sd: '0.04 – 0.08 m',
      price: '£23.25 /m²'
    },
    W3: {
      id: 'W3',
      title: 'Lime Render 20mm',
      desc: 'Traditional breathable lime finish coat. Fully compatible with historic masonry and allows the wall to manage vapour freely. A hydrophobic additive resists driving rain without impeding vapour transfer.',
      thick: '20mm',
      lambda: '—',
      sd: '0.10 – 0.20 m',
      price: 'Project specific'
    },
    W4: {
      id: 'W4',
      title: 'Existing Masonry',
      desc: 'Original structural wall substrate — solid brick, stone, cob, or flint. Thermal properties and vapour resistance are assessed by a site survey prior to specification. BreatheTherm works with all traditional masonry types.',
      thick: 'Varies',
      lambda: '—',
      sd: 'Varies',
      price: '—'
    },
    W5: {
      id: 'W5',
      title: 'Internal Finish',
      desc: 'Breathable internal surface treatment. All paints and plasters are specified as vapour-open throughout to maintain the complete breathing principle. Lime plaster or breathable mineral finish recommended.',
      thick: 'Varies',
      lambda: '—',
      sd: 'Vapour open',
      price: 'Project specific'
    },
  };

  const layerCard = qs('#layerCard');
  let activeHs    = null;

  function showLayer(id) {
    const d = LAYER_DATA[id];
    if (!d || !layerCard) return;
    qs('#lcId').textContent    = d.id;
    qs('#lcTitle').textContent = d.title;
    qs('#lcDesc').textContent  = d.desc;
    qs('#lcThick').textContent = d.thick;
    qs('#lcLambda').textContent= d.lambda;
    qs('#lcSd').textContent    = d.sd;
    qs('#lcPrice').textContent = d.price;
    layerCard.classList.add('lc-visible');
  }

  /* SVG hotspot interactions */
  qsa('.hs-group').forEach(g => {
    const activate = () => {
      if (activeHs) activeHs.classList.remove('hactive');
      activeHs = g;
      g.classList.add('hactive');
      showLayer(g.dataset.id);
    };
    g.addEventListener('mouseenter', activate);
    g.addEventListener('click',      activate);
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });

  /* Legend item clicks */
  qsa('.legend-item').forEach(item => {
    item.addEventListener('click', () => {
      qsa('.legend-item').forEach(i => i.classList.remove('lactive'));
      item.classList.add('lactive');
      const id = item.dataset.layer;
      showLayer(id);
      /* Mirror highlight on SVG */
      if (activeHs) activeHs.classList.remove('hactive');
      activeHs = qs(`.hs-group[data-id="${id}"]`);
      if (activeHs) activeHs.classList.add('hactive');
    });
  });

  /* Brighten the corresponding SVG layer rect on hover */
  const LAYER_RECTS = { W1: 'lrect-W1', W2: 'lrect-W2', W3: 'lrect-W3', W4: 'lrect-W4', W5: 'lrect-W5' };
  function dimAllRects()  {
    Object.values(LAYER_RECTS).forEach(id => {
      const el = qs(`#${id}`);
      if (el) { el.style.filter = ''; el.style.transition = 'filter 0.25s'; }
    });
  }
  qsa('.hs-group').forEach(g => {
    g.addEventListener('mouseenter', () => {
      dimAllRects();
      const el = qs(`#${LAYER_RECTS[g.dataset.id]}`);
      if (el) el.style.filter = 'brightness(1.18) saturate(1.1)';
    });
    g.addEventListener('mouseleave', dimAllRects);
  });

  /* ─────────────────────────────────────────────────────────
     6. AUDIENCE PATH MODALS
  ───────────────────────────────────────────────────────── */
  const openModal = id => {
    const overlay = qs(`#modal-${id}`);
    if (!overlay) return;
    overlay.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('a, button')?.focus();
  };

  const closeModal = id => {
    const overlay = qs(`#modal-${id}`);
    if (!overlay) return;
    overlay.classList.remove('modal-open');
    document.body.style.overflow = '';
  };

  const closeAllModals = () => {
    qsa('.modal-overlay').forEach(o => o.classList.remove('modal-open'));
    document.body.style.overflow = '';
  };

  qsa('.path-trigger').forEach(btn =>
    btn.addEventListener('click', () => openModal(btn.dataset.modal))
  );
  qsa('.modal-close').forEach(btn =>
    btn.addEventListener('click', () => closeModal(btn.dataset.close))
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
     7. LEAD CAPTURE FORM
  ───────────────────────────────────────────────────────── */
  const form    = qs('#leadForm');
  const success = qs('#formSuccess');

  form?.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Basic required field validation */
    let valid = true;
    qsa('[required]', this).forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#e05252';
        field.addEventListener('input', () => field.style.borderColor = '', { once: true });
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    if (!valid) return;

    /*
     * TODO: Wire up to your form endpoint.
     * Options: Formspree, Netlify Forms, custom PHP mailer, HubSpot, etc.
     *
     * Example with Formspree:
     *   fetch('https://formspree.io/f/YOUR_FORM_ID', {
     *     method: 'POST',
     *     body: new FormData(this),
     *     headers: { 'Accept': 'application/json' }
     *   }).then(r => r.ok ? showSuccess() : alert('Something went wrong.'));
     *
     * For now we show the success state immediately:
     */
    showFormSuccess();
  });

  function showFormSuccess() {
    if (form && success) {
      form.style.display    = 'none';
      success.style.display = 'block';
    }
  }

  /* ─────────────────────────────────────────────────────────
     8. SMOOTH ANCHOR SCROLLING (with nav offset)
  ───────────────────────────────────────────────────────── */
  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = qs(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ─────────────────────────────────────────────────────────
     INIT COMPLETE
  ───────────────────────────────────────────────────────── */
  console.log('BreatheTherm — initialised ✓');

})();
