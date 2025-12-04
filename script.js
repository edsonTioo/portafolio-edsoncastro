// script.js - Código optimizado con traducción
document.addEventListener('DOMContentLoaded', function () {
    // ========== Variables globales ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');
    const currentYear = document.getElementById('current-year');
    const langToggle = document.getElementById('lang-toggle');
    const langSpan = langToggle ? langToggle.querySelector('span') : null;

    let currentLang = 'es'; // Idioma actual: 'es' para español, 'en' para inglés

    // ========== Funciones de utilidad ==========
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        mobileMenuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    }

    function closeMobileMenu() {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    // ========== Función de Traducción ==========
    function toggleLanguage() {
        if (currentLang === 'es') {
            // Cambiar a inglés
            currentLang = 'en';
            if (langSpan) langSpan.textContent = 'EN';

            // Traducir todos los elementos con atributos data-en
            document.querySelectorAll('[data-en]').forEach(element => {
                const originalText = element.textContent;
                const translatedText = element.getAttribute('data-en');

                // Guardar texto original si es la primera vez
                if (!element.hasAttribute('data-original')) {
                    element.setAttribute('data-original', originalText);
                }

                element.textContent = translatedText;
            });

            // Actualizar título de la página
            document.title = 'Edson Castro - Freelance Web Developer';

            // Actualizar meta descripción
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', 'Freelance Web Developer specialized in process automation and custom systems for businesses.');
            }

            console.log('Idioma cambiado a: Inglés');
        } else {
            // Cambiar a español
            currentLang = 'es';
            if (langSpan) langSpan.textContent = 'ES';

            // Restaurar texto original
            document.querySelectorAll('[data-en]').forEach(element => {
                const originalText = element.getAttribute('data-original');
                if (originalText) {
                    element.textContent = originalText;
                }
            });

            // Restaurar título de la página
            document.title = 'Edson Castro - Desarrollador Web Freelancer';

            // Restaurar meta descripción
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', 'Desarrollador Web Freelancer especializado en automatización de procesos y sistemas a medida para empresas.');
            }

            console.log('Idioma cambiado a: Español');
        }

        // Guardar preferencia en localStorage
        localStorage.setItem('preferredLang', currentLang);
    }

    // ========== Inicialización ==========
    // Año actual en el footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Cargar idioma preferido de localStorage
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && savedLang === 'en') {
        // Esperar un momento y luego cambiar a inglés
        setTimeout(() => {
            toggleLanguage();
        }, 100);
    }

    // ========== Event Listeners ==========
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Toggle de idioma
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    // Cerrar menú al hacer clic en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function (event) {
        if (mobileMenuBtn && navLinks &&
            !navLinks.contains(event.target) &&
            !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
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
                const headerHeight = header.offsetHeight;
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
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.15)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.15)';
            header.style.backdropFilter = 'blur(0px)';
        }

        lastScroll = currentScroll;
    });

    // Efecto hover mejorado para móviles en iconos de skills
    document.querySelectorAll('.skill-icon-compact').forEach(icon => {
        icon.addEventListener('touchstart', function () {
            this.classList.add('active');
        });

        icon.addEventListener('touchend', function () {
            setTimeout(() => {
                this.classList.remove('active');
            }, 300);
        });
    });

    // Demo buttons functionality
    document.querySelectorAll('.btn-demo').forEach(btn => {
        btn.addEventListener('click', function () {
            const message = currentLang === 'es'
                ? 'Demo del proyecto disponible próximamente. Contáctame para más información.'
                : 'Project demo coming soon. Contact me for more information.';
            alert(message);
        });
    });

    // Descarga de CV con confirmación
    const cvDownloadBtn = document.querySelector('a[download="Edson-Castro-CV.pdf"]');
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', function (e) {
            const message = currentLang === 'es'
                ? 'Iniciando descarga de CV...'
                : 'Starting CV download...';
            console.log(message);
        });
    }

    // Optimización de imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Añadir atributos de rendimiento si no existen
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }

        // Prevenir layout shift
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
            img.setAttribute('width', '300');
            img.setAttribute('height', '200');
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

    // Detectar preferencia de reducción de movimiento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Desactivar transiciones
        document.querySelectorAll('.skill-icon-compact, .project-card, .btn, .contact-link, .category, .award-card, .education-card').forEach(el => {
            el.style.transition = 'none';
        });
    }

    // ========== Inicializaciones finales ==========
    console.log('Portafolio de Edson Castro cargado correctamente');
    console.log('Idioma actual:', currentLang);

});

