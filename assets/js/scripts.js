// LOADING
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.classList.add("loader--hidden");
        
        loader.addEventListener("transitionend", () => {
            if (loader.parentNode) {
                document.body.removeChild(loader);
            }
        });
    }
});

// MAIN PAGE SCRIPTS
document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS with smooth animations
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 800, 
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            disable: window.innerWidth < 768
        });
    }

    // Mobile menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileOverlay);

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('nav-links-active');
            hamburgerMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on links
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("nav-links-active");
                hamburgerMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking on overlay
        mobileOverlay.addEventListener('click', () => {
            navLinks.classList.remove("nav-links-active");
            hamburgerMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    // Set active nav link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('#nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#hero') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('nav-links-active')) {
                    navLinks.classList.remove("nav-links-active");
                    hamburgerMenu.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                // Smooth scroll with easing
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal logic READ MORE MODAL
    const modal = document.getElementById('aboutModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.modal .close');

    if (openBtn && modal && closeBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Section visibility observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Fixed Video Background - Not Movable, Not Zoomed
    const heroVideoDesktop = document.querySelector('.hero-video-desktop');
    const heroVideoMobile = document.querySelector('.hero-video-mobile');
    
    if (heroVideoDesktop && heroVideoMobile) {
        // Set video attributes for fixed background
        heroVideoDesktop.style.objectFit = 'cover';
        heroVideoDesktop.style.objectPosition = 'center';
        heroVideoMobile.style.objectFit = 'cover';
        heroVideoMobile.style.objectPosition = 'center';
        
        heroVideoDesktop.setAttribute('playsinline', '');
        heroVideoDesktop.setAttribute('muted', '');
        heroVideoDesktop.setAttribute('loop', '');
        
        heroVideoMobile.setAttribute('playsinline', '');
        heroVideoMobile.setAttribute('muted', '');
        heroVideoMobile.setAttribute('loop', '');
        
        // Handle video loading errors with fallback
        const handleVideoError = (videoElement) => {
            videoElement.addEventListener('error', () => {
                console.log('Video failed to load');
                // Fallback to gradient background
                document.querySelector('.hero-video-container').style.display = 'none';
                document.querySelector('.hero-section').style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)';
            });
        };
        
        // Add error handlers
        handleVideoError(heroVideoDesktop);
        handleVideoError(heroVideoMobile);
        
        // Mobile performance optimization
        if (window.innerWidth <= 768) {
            heroVideoMobile.setAttribute('preload', 'metadata');
            heroVideoMobile.setAttribute('poster', 'assets/video/hero-poster-mobile.jpg');
        } else {
            heroVideoDesktop.setAttribute('preload', 'metadata');
            heroVideoDesktop.setAttribute('poster', 'assets/video/hero-poster.jpg');
        }
    }

    // Keep navbar always visible - Remove hide/show functionality
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            // Always keep navbar visible
            navbar.style.transform = 'translateY(0)';
            
            // Add shadow when scrolled
            if (window.pageYOffset > 10) {
                navbar.style.boxShadow = '0 5px 40px rgba(0, 0, 0, 0.08)';
            } else {
                navbar.style.boxShadow = '0 1px 30px rgba(0, 0, 0, 0.04)';
            }
        }
    });

    // Add hover effects with smooth transitions
    document.querySelectorAll('.service-item, .contact-box, .btn-hero, .events-button').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'var(--transition)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transition = 'var(--transition)';
        });
    });

    // Mobile touch improvements
    if ('ontouchstart' in window) {
        document.querySelectorAll('.btn-hero, .service-btn, .events-button').forEach(button => {
            button.style.cursor = 'pointer';
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }

    // Handle device orientation changes
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            window.dispatchEvent(new Event('optimizedResize'));
        }, 250);
    });

    // Add smooth page transitions
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname && link.hash) {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#') {
                    setTimeout(() => {
                        window.scrollTo({
                            top: document.querySelector(href).offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            });
        }
    });

    // Initialize all animations
    function initAnimations() {
        // Add animation classes on load
        setTimeout(() => {
            document.querySelectorAll('.service-item, .contact-box').forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
            });
        }, 500);
    }

    initAnimations();
});