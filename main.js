/**
 * BreatheTherm — main.js
 * 1. Navigation scroll effect (invisible on hero, fades in on scroll)
 * 2. Parallax hero background
 * 3. Scrollytelling reveal logic
 * 4. Path modal system (homeowner / architect / installer)
 */

(function () {
    'use strict';

    /* ─── UTIL ─────────────────────────────────────────────── */
    const qs  = (sel, ctx = document) => ctx.querySelector(sel);
    const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    /* ─── 1. NAVIGATION SCROLL EFFECT ──────────────────────── */
    const nav        = qs('#main-nav');
    const HERO_H     = () => qs('.hero')?.offsetHeight || window.innerHeight;
    const SCROLL_TH  = 60;   // px before nav snaps to scrolled style

    // Hero viewport: nav invisible (opacity:0 in CSS). On any scroll → show nav.
    function updateNav() {
        const y = window.scrollY;

        // Reveal the nav as soon as user starts scrolling
        if (y > 20) {
            nav.classList.add('nav-visible');
        } else {
            nav.classList.remove('nav-visible');
        }

        // Translucent dark bg once past the hero threshold
        if (y > SCROLL_TH) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav(); // run once on load

    /* ─── HAMBURGER ─────────────────────────────────────────── */
    const hamburger = qs('#hamburger');
    const mobileNav = qs('#mobile-nav');

    hamburger?.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav on link click
    qsa('#mobile-nav a').forEach(a => {
        a.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
        });
    });

    /* ─── 2. PARALLAX HERO EFFECT ───────────────────────────── */
    const heroBg = qs('#hero-bg');

    function updateParallax() {
        if (!heroBg) return;
        const y = window.scrollY;
        const maxParallax = HERO_H() * 0.35; // limit to 35% of hero height
        const offset = Math.min(y * 0.45, maxParallax);
        heroBg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.05)`;
    }

    // Only apply parallax on devices that can handle it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        window.addEventListener('scroll', updateParallax, { passive: true });
    }

    /* ─── 3. SCROLLYTELLING REVEAL LOGIC ───────────────────── */

    // Hero elements — fire immediately on load
    function revealHero() {
        qsa('.reveal-hero').forEach((el, i) => {
            // Stagger each hero child slightly beyond its own delay class
            const extraDelay = i * 30; // ms
            setTimeout(() => el.classList.add('visible'), 100 + extraDelay);
        });
    }

    // Scroll-triggered reveals
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Un-observe once revealed (one-shot animation)
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    qsa('.reveal').forEach(el => revealObserver.observe(el));

    // Run hero reveal after a very short paint delay
    requestAnimationFrame(() => setTimeout(revealHero, 80));

    /* ─── 4. PATH MODAL SYSTEM ──────────────────────────────── */

    /**
     * Each .path-trigger[data-modal="X"] opens #modal-X.
     * Modals close via:
     *   a) .modal-close[data-close="X"] button
     *   b) Clicking the overlay itself
     *   c) Escape key
     */

    const openModal  = id => {
        const overlay = qs(`#modal-${id}`);
        if (!overlay) return;
        overlay.classList.add('modal-open');
        document.body.style.overflow = 'hidden';

        // Trap focus inside modal
        const firstFocusable = overlay.querySelector('a, button');
        firstFocusable?.focus();
    };

    const closeModal = id => {
        const overlay = qs(`#modal-${id}`);
        if (!overlay) return;
        overlay.classList.remove('modal-open');
        document.body.style.overflow = '';
    };

    const closeAllModals = () => {
        qsa('.modal-overlay').forEach(o => {
            o.classList.remove('modal-open');
        });
        document.body.style.overflow = '';
    };

    // Open buttons
    qsa('.path-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.modal;
            openModal(id);
        });
    });

    // Close buttons inside modals
    qsa('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.close;
            closeModal(id);
        });
    });

    // Clicking the overlay background closes it
    qsa('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => {
            // Only close if the click is on the overlay itself, not the panel
            if (e.target === overlay) {
                const id = overlay.id.replace('modal-', '');
                closeModal(id);
            }
        });
    });

    // Escape key closes any open modal
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAllModals();
    });

    /* ─── SMOOTH ANCHOR SCROLLING + NAV OFFSET ─────────────── */
    qsa('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = qs(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });

    /* ─── PROGRESS BAR ANIMATION ON SCROLL ─────────────────── */
    // The element bars inside .system-element are triggered by the
    // existing IntersectionObserver via the .reveal class.
    // They use .visible to trigger the CSS ::after scaleX animation.
    // No extra JS needed — CSS handles it via:
    //   .system-element.visible .element-bar::after { transform: scaleX(1); }

    /* ─── STAT NUMBER COUNT-UP ──────────────────────────────── */
    function animateCount(el, target, suffix, duration = 1600) {
        const isFloat  = target % 1 !== 0;
        const start    = performance.now();
        const from     = 0;

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quint
            const eased = 1 - Math.pow(1 - progress, 5);
            const value = from + (target - from) * eased;
            el.textContent = isFloat ? value.toFixed(2) : Math.round(value) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el      = entry.target;
            const target  = parseFloat(el.dataset.count);
            const suffix  = el.dataset.suffix || '';
            animateCount(el, target, suffix);
            countObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    // Assign count targets to the stat numbers in the proof band
    const statBigs = qsa('.stat-big');
    const countData = [
        { target: 850, suffix: '+' },
        { target: 65,  suffix: '%' },
        { target: null },            // WTA — no count
        { target: 0,   suffix: '%' },
    ];

    statBigs.forEach((el, i) => {
        const data = countData[i];
        if (!data || data.target === null) return; // skip non-numeric

        // Store original suffix elements
        const suffixEl = el.querySelector('.stat-plus, .stat-pct');
        const suffixHTML = suffixEl ? suffixEl.outerHTML : '';

        el.dataset.count  = data.target;
        el.dataset.suffix = '';

        // Wrap just the number text
        const originalHTML = el.innerHTML;
        el.textContent = '0';
        if (suffixHTML) el.insertAdjacentHTML('beforeend', suffixHTML);

        countObserver.observe(el);
    });

    /* ─── PAGE LOAD COMPLETE ───────────────────────────────── */
    console.log('BreatheTherm — site initialised.');

})();