// script.js - Código mejorado para rendimiento
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', navLinks.classList.contains('active'));

            // Cambiar ícono
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function (event) {
        if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Smooth scrolling con offset para header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = 'var(--shadow)';
            header.style.backdropFilter = 'blur(0px)';
        }

        lastScroll = currentScroll;
    });

    // AOS (Animation on Scroll) simple
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Optimización de imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Añadir atributos de rendimiento
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }

        // Prevenir layout shift
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
            const width = img.naturalWidth || 300;
            const height = img.naturalHeight || 200;
            img.setAttribute('width', width);
            img.setAttribute('height', height);
        }
    });

    // Performance: Prevenir múltiples resize
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            // Acciones que necesiten recalcular después del resize
        }, 250);
    });
});