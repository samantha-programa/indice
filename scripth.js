document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for internal links (if any, though not explicit in this HTML)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back and Exit Buttons Functionality
    const backButton = document.getElementById('backButton');
    const exitButton = document.getElementById('exitButton');

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back(); // Goes back to the previous page in history
        });
    }

    if (exitButton) {
        exitButton.addEventListener('click', () => {
            // This is a simple attempt to close the window/tab.
            // Modern browsers often prevent this for security reasons,
            // unless the window was opened by script.
            window.close();
            // Fallback for browsers that prevent window.close()
            alert('Gracias por visitar Tarimas Tovar. Puedes cerrar esta ventana.');
        });
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('header nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Animate hamburger icon
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Close nav when a link is clicked (for better UX on mobile)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                navToggle.querySelector('i').classList.add('fa-bars');
                navToggle.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // --- Nuevas Funcionalidades JS para Animaciones ---

    // 1. Animación al hacer scroll (Intersection Observer API)
    const animateElements = document.querySelectorAll('.content-section h2, .story-item, .mision-card, .vision-card, .value-item');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine which Animate.css class to add based on the element
                let animationClass = 'animate__fadeInUp'; // Default
                if (entry.target.classList.contains('story-item')) {
                    // Specific animations for story items based on their order or existing classes
                    if (entry.target.classList.contains('animate__fadeInLeft')) {
                        animationClass = 'animate__fadeInLeft';
                    } else if (entry.target.classList.contains('animate__fadeInRight')) {
                        animationClass = 'animate__fadeInRight';
                    } else {
                        animationClass = 'animate__fadeInUp';
                    }
                } else if (entry.target.classList.contains('mision-card') || entry.target.classList.contains('vision-card')) {
                    animationClass = 'animate__zoomIn';
                }

                entry.target.classList.add('animate__animated', animationClass);
                entry.target.style.opacity = '1'; // Ensure visibility if initially hidden by CSS
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Ocultar elementos inicialmente para la animación de scroll si no están ya con Animate.css
    // Esto es para que el Intersection Observer pueda controlarlos desde cero
    document.querySelectorAll('.story-item, .mision-card, .vision-card, .value-item').forEach(el => {
        // Remove existing Animate.css classes to let JS control the entry
        el.classList.remove('animate__animated', 'animate__fadeInLeft', 'animate__fadeInUp', 'animate__fadeInRight', 'animate__zoomIn', 'animate__delay-0-2s', 'animate__delay-0-4s', 'animate__delay-0-6s', 'animate__delay-0-8s', 'animate__delay-1s', 'animate__delay-1-2s');
        el.style.opacity = '0'; // Hide them initially
        el.style.transform = 'translateY(20px)'; // Prepare for slide up effect
    });

    // Re-apply Animate.css classes and custom JS visibility for the hero section
    // because these are meant to animate immediately on page load
    document.querySelector('.hero-subpage').classList.add('animate__animated', 'animate__fadeIn');
    document.querySelector('.hero-content-subpage h1').classList.add('animate__animated', 'animate__fadeInDown');
    document.querySelector('.hero-content-subpage p').classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-0-5s');
    document.querySelector('header').classList.add('animate__animated', 'animate__fadeInDown');
    document.querySelector('footer').classList.add('animate__animated', 'animate__fadeInUp');
    document.querySelector('.buttons').classList.add('animate__animated', 'animate__bounceIn', 'animate__delay-2s');


    // 2. Efecto de seguimiento del ratón en las tarjetas (card-hover-effect)
    document.querySelectorAll('.card-hover-effect').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
