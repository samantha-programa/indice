// script4.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navegación responsiva (Menú hamburguesa)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('header nav');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Cambiar el icono de la hamburguesa a una 'x' y viceversa
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Ocultar el menú si se hace clic fuera de él (solo en móviles)
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('active') && window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    }

    // 2. Validación de Formulario (muy básica)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita el envío por defecto del formulario

            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');

            // Simple validación: verificar que los campos requeridos no estén vacíos
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                alert('Por favor, completa todos los campos obligatorios (Nombre, Correo Electrónico, Mensaje).');
                return; // Detiene la ejecución si hay campos vacíos
            }

            // Aquí podrías añadir validación de formato de email más robusta
            if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Si todo es válido, puedes simular el envío o enviar con AJAX
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            contactForm.reset(); // Limpia el formulario
            console.log('Datos del formulario:', {
                nombre: nameInput.value,
                email: emailInput.value,
                telefono: contactForm.querySelector('input[type="tel"]').value,
                mensaje: messageInput.value
            });

            // En un caso real, aquí usarías fetch() o XMLHttpRequest para enviar los datos a un servidor.
        });
    }

    // 3. Efecto Parallax en la sección Hero (opcional, requiere más CSS)
    // Para un efecto parallax real, necesitarías ajustar la imagen de fondo con
    // background-attachment: fixed; y luego ajustar el desplazamiento.
    // Esto es un ejemplo simple de cómo el JS podría interactuar con el scroll.
    const heroSection = document.querySelector('.hero-subpage');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            // Ajusta el '0.5' para controlar la velocidad del parallax
            heroSection.style.backgroundPositionY = -scrollPosition * 0.3 + 'px';
        });
    }

    // 4. Botón "Regresar"
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back(); // Vuelve a la página anterior en el historial del navegador
        });
    }

    // 5. Botón "Salir"
    const exitButton = document.getElementById('exitButton');
    if (exitButton) {
        exitButton.addEventListener('click', () => {
            // Intenta cerrar la ventana/pestaña. Esto solo funciona si la ventana fue abierta por JS.
            // La mayoría de los navegadores modernos bloquean window.close() si la ventana no fue abierta por un script.
            if (window.opener) {
                window.close();
            } else {
                alert('La función "Salir" solo funciona si esta ventana fue abierta por un script. Puedes cerrar la pestaña manualmente.');
                // Como alternativa, podrías redirigir a una página de "gracias por visitarnos" o la página principal.
                // window.location.href = 'index.html';
            }
        });
    }

    // 6. Animación de Scroll Reveal para elementos específicos
    // (Asegúrate de que Animate.css esté enlazado)
    const animateElements = document.querySelectorAll('.animate__animated');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es visible, añade la clase de animación
                entry.target.classList.add(entry.target.dataset.animation || 'animate__fadeInUp');
                // Una vez animado, puedes dejar de observarlo si solo quieres que se anime una vez
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Porcentaje del elemento que debe ser visible para disparar la animación
    });

    animateElements.forEach(element => {
        // Al cargar la página, elimina las clases de animación para que no se activen inmediatamente
        // a menos que ya las hayas puesto con animate__animated (como en el header y hero inicial)
        // Puedes controlar esto con la clase Animate.css `visibility: hidden;` o `opacity: 0;` inicial
        // y luego eliminarlas al observar.
        // Para este ejemplo, estamos asumiendo que ya tienen una animación inicial (ej. fadeInDown)
        // y que queremos añadir otras al hacer scroll.
        // Si quieres que solo se animen al aparecer en el scroll, quita las clases animate__animated
        // del HTML y añádelas con JS cuando el elemento sea visible.
        observer.observe(element);
    });
});