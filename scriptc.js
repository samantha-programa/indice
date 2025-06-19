document.addEventListener('DOMContentLoaded', () => {
    // --- Navegación Móvil ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('header nav ul');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times'); // Cambiar a 'X' al abrir
        });

        // Cerrar el menú si se hace clic fuera o en un enlace
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // --- Carrusel de Productos ---
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    let currentIndex = 0;
    const itemWidth = carouselItems[0].clientWidth; // Ancho de un solo ítem (100%)

    // Crear indicadores
    carouselItems.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.classList.add('indicator');
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicator.dataset.slide = index;
        indicatorsContainer.appendChild(indicator);

        indicator.addEventListener('click', () => {
            goToSlide(parseInt(indicator.dataset.slide));
        });
    });

    const indicators = document.querySelectorAll('.indicator');

    function updateCarousel() {
        // Desplaza el track para mostrar el ítem actual
        carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

        // Actualiza los indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Animar el caption del item actual
        carouselItems.forEach((item, index) => {
            const caption = item.querySelector('.carousel-caption');
            if (caption) {
                caption.classList.remove('animate__fadeInUp', 'animate__fadeOutDown');
                if (index === currentIndex) {
                    // Reiniciar animación para que se active cada vez
                    void caption.offsetWidth; // Trigger reflow
                    caption.classList.add('animate__fadeInUp');
                } else {
                    // Puedes añadir una animación de salida si lo deseas, o simplemente quitar la de entrada
                    caption.classList.add('animate__fadeOutDown'); // Ejemplo de animación de salida
                }
            }
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        // Asegurarse de que el índice no se salga de los límites
        if (currentIndex < 0) {
            currentIndex = carouselItems.length - 1;
        } else if (currentIndex >= carouselItems.length) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Ajustar el carrusel al redimensionar la ventana
    window.addEventListener('resize', () => {
        // Recalcular el ancho del ítem al redimensionar para asegurar la correcta visualización
        const newItemWidth = carouselItems[0].clientWidth;
        carouselTrack.style.transform = `translateX(${-currentIndex * newItemWidth}px)`;
    });

    // Iniciar el carrusel en la primera diapositiva
    updateCarousel();

    // --- Botones de Navegación ---
    const backButton = document.getElementById('backButton');
    const exitButton = document.getElementById('exitButton');

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back(); // Vuelve a la página anterior en el historial
        });
    }

    if (exitButton) {
        exitButton.addEventListener('click', () => {
            // Intenta cerrar la ventana o redirigir
            if (window.confirm("¿Estás seguro de que quieres salir?")) {
                window.close(); // Para ventanas abiertas por script
                // Si la ventana no fue abierta por script, esto no funcionará.
                // Podrías redirigir a una página de agradecimiento o a la página principal.
                // window.location.href = 'index.html'; // Ejemplo: redirigir a la página de inicio
            }
        });
    }
});