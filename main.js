// ============================================================
// BREATHETHERM - MAIN JAVASCRIPT
// Key Features:
// 1. Navigation Scroll Effect (fade in/out on scroll)
// 2. Parallax Hero Effect
// 3. Scrollytelling Reveal Logic (fade in/slide up animations)
// 4. Path Modal System (homeowner/architect/installer)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParallax();
    initScrollReveals();
    initPathModals();
});

// ============================================================
// 1. NAVIGATION SCROLL EFFECT
// ============================================================
function initNavigation() {
    const header = document.getElementById('main-nav');
    let lastScrollY = 0;
    let ticking = false;

    function updateNavState() {
        const scrollY = window.scrollY;
        
        // Add scrolled class if user has scrolled past hero
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(updateNavState);
            ticking = true;
        }
    }, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for valid section links
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================
// 2. PARALLAX HERO EFFECT
// ============================================================
function initParallax() {
    const parallaxBg = document.getElementById('hero-bg');
    
    if (!parallaxBg) return;

    function updateParallax() {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.hero');
        
        // Only apply parallax if in viewport
        if (scrollY < heroSection.offsetHeight) {
            const offset = scrollY * 0.5; // 0.5 = parallax speed (slower = higher number)
            parallaxBg.style.transform = `translateY(${offset}px)`;
        }
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
    
    // Initial call
    updateParallax();
}

// ============================================================
// 3. SCROLLYTELLING REVEAL LOGIC
// ============================================================
function initScrollReveals() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Don't unobserve - keep the animation active
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
}

// ============================================================
// 4. PATH MODAL SYSTEM
// ============================================================
function initPathModals() {
    const pathCards = document.querySelectorAll('.path-card');
    
    // Modal data for each path
    const pathData = {
        homeowner: {
            title: 'Homeowners',
            image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1b?auto=format&fit=crop&q=80&w=800',
            description: 'Future-proof your heritage home with our vapour-open mineral insulation. Get a free retrofit assessment tailored to your property.',
            benefits: [
                'Energy savings up to 40%',
                'Eliminates damp and mould',
                'Heritage grant guidance included',
                'No structural risk to your building'
            ],
            cta: 'Book Free Assessment',
            ctaLink: 'tel:01285407088'
        },
        architect: {
            title: 'Architects & Conservation Officers',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
            description: 'WTA-compliant systems with full technical support. Get CAD details, BIM objects, and hygrothermal modelling for your projects.',
            benefits: [
                'Specification-ready systems',
                'BIM & CAD detail library',
                'Hygrothermal modelling service',
                'RIBA-accredited CPD available'
            ],
            cta: 'Request Technical Pack',
            ctaLink: 'mailto:technical@breathethermco.uk'
        },
        installer: {
            title: 'Installers & Contractors',
            image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800',
            description: 'Join our approved installer network and access the UK\'s 5.9 million pre-1919 buildings. Full training and lead generation included.',
            benefits: [
                'Full system installation training',
                'Technical site support helpline',
                'Trade pricing & volume discounts',
                'Lead generation & project referrals'
            ],
            cta: 'Learn More About Our Network',
            ctaLink: 'mailto:trade@breathethermco.uk'
        }
    };

    pathCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger modal if clicking the button directly
            if (e.target.tagName === 'A' && e.target.classList.contains('btn')) {
                return;
            }
            
            // Determine which path was clicked
            let pathType;
            if (card.classList.contains('path-terra')) {
                pathType = 'homeowner';
            } else if (card.classList.contains('path-green')) {
                pathType = 'architect';
            } else if (card.classList.contains('path-navy')) {
                pathType = 'installer';
            }
            
            if (pathType && pathData[pathType]) {
                showPathModal(pathData[pathType]);
            }
        });

        // Make cards appear clickable
        card.style.cursor = 'pointer';
    });
}

function showPathModal(data) {
    // Remove existing modal if present
    const existingModal = document.getElementById('path-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal structure
    const modal = document.createElement('div');
    modal.id = 'path-modal';
    modal.className = 'path-modal';
    modal.innerHTML = `
        <div class="path-modal-overlay"></div>
        <div class="path-modal-content">
            <button class="path-modal-close">&times;</button>
            <div class="path-modal-image">
                <img src="${data.image}" alt="${data.title}">
            </div>
            <div class="path-modal-body">
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                
                <h4>Key Benefits</h4>
                <ul class="path-modal-benefits">
                    ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
                
                <a href="${data.ctaLink}" class="btn btn-terra btn-arrow">${data.cta}</a>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add CSS for modal (injected dynamically)
    if (!document.getElementById('path-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'path-modal-styles';
        style.textContent = `
            .path-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease-out;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .path-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
            }

            .path-modal-content {
                position: relative;
                background: white;
                border-radius: 8px;
                max-width: 700px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                display: grid;
                grid-template-columns: 1fr 1fr;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .path-modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
                z-index: 10;
                transition: all 0.3s ease;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .path-modal-close:hover {
                color: #000;
                transform: rotate(90deg);
            }

            .path-modal-image {
                width: 100%;
                height: 100%;
                min-height: 400px;
                overflow: hidden;
                border-radius: 8px 0 0 8px;
            }

            .path-modal-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .path-modal-body {
                padding: 40px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .path-modal-body h2 {
                font-family: 'Playfair Display', serif;
                font-size: 2rem;
                color: #1a2e2a;
                margin-bottom: 20px;
            }

            .path-modal-body p {
                font-size: 0.95rem;
                color: #666;
                line-height: 1.8;
                margin-bottom: 25px;
            }

            .path-modal-body h4 {
                font-family: 'Playfair Display', serif;
                font-size: 1.1rem;
                color: #1a2e2a;
                margin-bottom: 15px;
                margin-top: 10px;
            }

            .path-modal-benefits {
                list-style: none;
                margin-bottom: 30px;
            }

            .path-modal-benefits li {
                padding: 10px 0;
                font-size: 0.9rem;
                color: #666;
                position: relative;
                padding-left: 25px;
            }

            .path-modal-benefits li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: #c9884a;
                font-weight: bold;
            }

            .path-modal-body .btn {
                align-self: flex-start;
                margin-top: 10px;
            }

            /* Responsive Modal */
            @media (max-width: 768px) {
                .path-modal-content {
                    grid-template-columns: 1fr;
                    max-height: 90vh;
                }

                .path-modal-image {
                    min-height: 250px;
                    border-radius: 8px 8px 0 0;
                }

                .path-modal-body {
                    padding: 30px;
                }

                .path-modal-body h2 {
                    font-size: 1.5rem;
                }

                .path-modal-close {
                    top: 15px;
                    right: 15px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Close modal on overlay click
    const overlay = modal.querySelector('.path-modal-overlay');
    overlay.addEventListener('click', closePathModal);

    // Close modal on close button click
    const closeBtn = modal.querySelector('.path-modal-close');
    closeBtn.addEventListener('click', closePathModal);

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePathModal();
        }
    });

    // Prevent scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closePathModal() {
    const modal = document.getElementById('path-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Add fade-out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================================
// UTILITY: Intersection Observer for lazy loading images (optional)
// ============================================================
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// ============================================================
// UTILITY: Mobile menu toggle (if you add a hamburger menu later)
// ============================================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

initMobileMenu();
