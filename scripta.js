document.addEventListener('DOMContentLoaded', function() {
    // 1. Manejo del menú hamburguesa
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show-menu');
        });
    }

    // 2. Desplazamiento suave para enlaces de ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el comportamiento de salto predeterminado

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Obtiene la posición del elemento, ajusta para el header fijo
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Si el menú está abierto en móvil, ciérralo
                if (window.innerWidth <= 768 && navMenu.classList.contains('show-menu')) {
                    navMenu.classList.remove('show-menu');
                }
            }
        });
    });

    // 3. Función para el botón "Salir"
    const exitButton = document.getElementById('exitButton');
    if (exitButton) {
        exitButton.addEventListener('click', function() {
            let confirmacion = confirm("¿Estás seguro de abandonar la página?");
            if (confirmacion) {
                // Intenta cerrar la ventana. Esto solo funcionará si la ventana
                // fue abierta por el propio script (ej. window.open()).
                // En la mayoría de los navegadores modernos, las pestañas no
                // pueden cerrarse a sí mismas por razones de seguridad si no
                // fueron abiertas por el script.
                window.close();
                // Como alternativa, podrías redirigir a una página de "gracias por visitarnos"
                // window.location.href = "gracias.html";
            }
        });
    }

    // 4. Animación de elementos al hacer scroll (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate__animated');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando el elemento es visible
                // Animate.css añade la clase de animación al cargar, aquí sólo la dejamos.
                // Puedes añadir clases para activar animaciones que se disparen con scroll aquí.
                // Ejemplo: entry.target.classList.add('animate__fadeInUp');
                // Para elementos que ya tienen animate__animated en el HTML, no necesitas hacer nada más.
                // Si quieres que la animación se repita cada vez que entran en la vista,
                // remueve la clase y luego añádela de nuevo.
                // entry.target.classList.remove('animate__animated', 'animate__fadeInUp', etc.); // Quitar para reanimar
                // void entry.target.offsetWidth; // Truco para forzar reflow
                // entry.target.classList.add('animate__animated', 'animate__fadeInUp'); // Añadir de nuevo
            } else {
                // Opcional: Si quieres que la animación se revierta o se reinicie
                // cuando el elemento sale de la vista.
                // entry.target.classList.remove('animate__animated', 'animate__fadeInUp');
            }
        });
    }, {
        threshold: 0.2 // Porcentaje del elemento visible para activar el observador
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // 5. Animación de scroll al cargar (solo para efectos visuales si es necesario)
    // No es estrictamente necesario con Animate.css y Intersection Observer,
    // pero si quisieras algo como un efecto parallax o animaciones basadas en scroll,
    // iría aquí.
    // window.addEventListener('scroll', function() {
    //     // Lógica para animaciones basadas en scroll
    // });
});