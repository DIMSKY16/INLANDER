// Main JavaScript for Inlander Konstruksi Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initScrollAnimations();
    initStatsCounter();
    initServiceCards();
    initNavigation();
    initParticleBackground();
});

// Typewriter effect for hero section (conditional: only if element exists)
function initTypewriter() {
    const element = document.getElementById('typed-text');
    if (!element) return; // Skip if not on this page (e.g., contact.html)

    // Check if Typed is loaded
    if (typeof Typed === 'undefined') {
        console.warn('Typed.js not loaded. Skipping typewriter effect.');
        return;
    }

    const typed = new Typed(element, {
        strings: [
            '15+ Tahun Pengalaman dalam Industri Konstruksi',
            '200+ Proyek Berhasil Kami Selesaikan',
            'Tim Profesional dengan Sertifikasi Tinggi',
            'Membangun dan Renovasi dengan Tepat Waktu, Berkualitas, dan Bergaransi'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Scroll animations with Anime.js
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuart',
                    delay: anime.stagger(100)
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Animated statistics counter (conditional: only if elements exist)
function initStatsCounter() {
    const counters = document.querySelectorAll('.stats-counter');
    if (counters.length === 0) return; // Skip if not on this page

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                
                anime({
                    targets: entry.target,
                    innerHTML: [0, target],
                    duration: 2000,
                    easing: 'easeOutQuart',
                    round: 1
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Service cards hover effects (conditional: only if elements exist)
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length === 0) return; // Skip if not on this page

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                rotateX: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Navigation effects
function initNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Tambahkan nav-blur langsung dari awal
    nav.classList.add('nav-blur');

    // Kalau kamu tetap mau efek berubah saat scroll, ubah warna aja — bukan hapus blur-nya
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        } else {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        }
    });

    // Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Particle background effect (using p5.js concept)
function initParticleBackground() {
    // Optional: Skip on contact.html if performance issue, but keep for consistency
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    // Construction-themed particles
    const particleSymbols = ['⚡', '🔨', '📐', '🏗️', '🔧', '📏', '⛏️', '🚧'];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            symbol: particleSymbols[Math.floor(Math.random() * particleSymbols.length)],
            size: Math.random() * 20 + 10,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            
            // Draw particle
            ctx.globalAlpha = particle.opacity;
            ctx.font = `${particle.size}px Arial`;
            ctx.fillText(particle.symbol, particle.x, particle.y);
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events efficiently
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'resources/hero-bg.jpg',
        'resources/team-professional.jpg',
        'resources/architectural-blueprint.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Non-critical error:', e.message);
});

// Smooth page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                
                // Fade out effect
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });
}

// Initialize page transitions
initPageTransitions();

// Fade in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu toggle (if needed)
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('[data-mobile-menu]');
    const mobileMenu = document.querySelector('[data-mobile-menu-content]');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

initMobileMenu();
