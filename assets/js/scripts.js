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


// Support Portal Specific Functions
function initSupportPortalFeatures() {
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        initTestimonialSlider();
    }
    
    // Horizontal Scrolling
    const scrollContainers = document.querySelectorAll('.va-scroll-container');
    if (scrollContainers.length > 0) {
        window.scrollHorizontally = function(containerId, direction) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const item = container.querySelector('.va-service-item');
            if (!item) return;

            const scrollAmount = item.offsetWidth + 32; // 32px is the gap (2rem)
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            if (direction === 'left') {
                if (container.scrollLeft <= 0) {
                    container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            } else {
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        };
    }
    
    // Email Window Function
    window.openEmailWindow = function() {
        const email = 'partner@nexuswaveglobal.com';
        const subject = 'INQUIRY - User Verification & Support Operations';
        const body = 'Hello Nexus Wave Global Team,\n\nI am interested in learning more about your verification and support services. Please contact me with more information.\n\nBest regards,';
        
        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink, '_blank', 'width=600,height=600,top=250,left=650');
        return false;
    };
}

// Testimonial Slider Initialization
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!slides.length || !dotsContainer) return;
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'slider-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Update current index
        currentIndex = (index + slides.length) % slides.length;
        
        // Update slides
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        resetAutoSlide();
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Initialize
    createDots();
    startAutoSlide();
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }
    
    // Pause on hover
    const slider = document.querySelector('.testimonials-container');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
}

// Update DOMContentLoaded to include support portal features
document.addEventListener("DOMContentLoaded", function () {
    // ... (keep all existing code from lines 2-284) ...
    
    // Initialize support portal features if on support portal page
    initSupportPortalFeatures();
    
    // Set active nav link for current page
    setCurrentPageActiveNav();
});

// Function to set active nav link based on current page
function setCurrentPageActiveNav() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('#nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Check if current page matches link
        if (currentPage.includes('support-portal') && (linkHref === 'support-portal.html' || linkHref === 'support-portal.php')) {
            link.classList.add('active');
        } else if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('/')) {
            if (linkHref === '#hero' || linkHref === 'index.html') {
                link.classList.add('active');
            }
        } else if (currentPage.includes('training.html') && linkHref === 'training.html') {
            link.classList.add('active');
        }
    });
}
