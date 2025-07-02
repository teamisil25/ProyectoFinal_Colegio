document.addEventListener('DOMContentLoaded', function() {
    // --- Funcionalidad del Menú de Hamburguesa para Móviles ---
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav'); // Selecciona correctamente la etiqueta <nav>

    if (menuIcon && nav) {
        menuIcon.addEventListener('click', function() {
            nav.classList.toggle('active'); // Alterna la clase 'active' en <nav>
            menuIcon.classList.toggle('open'); // Opcional: para animar el icono a una 'X'
        });
    }

    // --- Smooth scroll para enlaces de anclaje ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Admisión Page - Slider de Imágenes (Carrusel) ---
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const sliderTrack = sliderContainer.querySelector('.slider-track');
        // MODIFICACIÓN CLAVE: Seleccionar solo elementos con la clase 'slide'
        const slides = Array.from(sliderTrack.querySelectorAll('.slide')); 
        const prevButton = sliderContainer.querySelector('.prev-slide');
        const nextButton = sliderContainer.querySelector('.next-slide');
        const dotsContainer = sliderContainer.querySelector('.slider-dots');

        let currentIndex = 0;
        let slideWidth; // Declaramos aquí, se calculará al inicio y en resize

        // Función para calcular slideWidth y actualizar la posición
        const calculateSlideWidth = () => {
            if (slides.length > 0) {
                // Aseguramos que slideWidth se base en el ancho real del contenedor visible
                // dividimos el ancho del sliderTrack por el número de slides si es un flex-basis 100%
                slideWidth = sliderContainer.clientWidth; 
            }
        };

        // Create dots (Se crearán solo 3 bullets si solo hay 3 slides)
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        const updateDots = () => {
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const moveToSlide = (index) => {
            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            // Asegurarse de que slideWidth esté actualizado antes de mover
            calculateSlideWidth(); 
            sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            updateDots();
        };

        // Event Listeners para las flechas
        if (prevButton) {
            prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
        }
        
        // Inicializar el ancho y la posición al cargar la página
        calculateSlideWidth();
        moveToSlide(currentIndex); // Mover a la primera diapositiva al cargar

        // Update slideWidth on resize and re-adjust position
        window.addEventListener('resize', () => {
            calculateSlideWidth();
            moveToSlide(currentIndex); // Re-adjust position
        });

        // Auto-play slider
        let autoSlideInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds

        // Pause on hover
        sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        sliderContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                moveToSlide(currentIndex + 1);
            }, 5000);
        });
    }

    // --- Admisión Page - Slider de Opiniones de la Comunidad ---
    const opinionsSection = document.querySelector('.opiniones-comunidad'); // Seleccionamos la sección completa
    if (opinionsSection) {
        const opinionsSlider = opinionsSection.querySelector('.slider-opiniones');
        const opinionCards = Array.from(opinionsSlider.children);
        // MODIFICACIÓN: Seleccionar las flechas dentro del contenedor de flechas
        const prevOpinionButton = opinionsSection.querySelector('.slider-arrows .arrow.prev'); 
        const nextOpinionButton = opinionsSection.querySelector('.slider-arrows .arrow.next'); 
        const opinionDotsContainer = opinionsSection.querySelector('.slider-nav-dots');

        let currentOpinionIndex = 0;
        let cardFullWidth; // Ancho de la tarjeta + gap

        const calculateCardFullWidth = () => {
            if (opinionCards.length > 0) {
                 // Obtener el ancho real de la primera tarjeta y añadir el gap (30px)
                cardFullWidth = opinionCards[0].offsetWidth + 30; 
            }
        };

        // Create dots (por cada tarjeta de opinión)
        opinionCards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveOpinionToSlide(index));
            opinionDotsContainer.appendChild(dot);
        });

        const opinionDots = Array.from(opinionDotsContainer.children);

        const updateOpinionDots = () => {
            opinionDots.forEach((dot, index) => {
                if (index === currentOpinionIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const moveOpinionToSlide = (index) => {
            if (index < 0) {
                currentOpinionIndex = opinionCards.length - 1;
            } else if (index >= opinionCards.length) {
                currentOpinionIndex = 0;
            } else {
                currentOpinionIndex = index;
            }
            calculateCardFullWidth(); // Recalcular antes de mover
            opinionsSlider.style.transform = `translateX(-${currentOpinionIndex * cardFullWidth}px)`;
            updateOpinionDots();
        };

        // Event Listeners para las flechas de opinión
        if (prevOpinionButton) {
            prevOpinionButton.addEventListener('click', () => moveOpinionToSlide(currentOpinionIndex - 1));
        }
        if (nextOpinionButton) {
            nextOpinionButton.addEventListener('click', () => moveOpinionToSlide(currentOpinionIndex + 1));
        }

        // Inicializar el ancho y la posición al cargar la página
        calculateCardFullWidth();
        moveOpinionToSlide(currentOpinionIndex);

        // Update cardWidth on resize
        window.addEventListener('resize', () => {
            calculateCardFullWidth();
            moveOpinionToSlide(currentOpinionIndex); // Re-adjust position
        });

        // Auto-play slider (opcional para opiniones, si lo quieres)
        let autoOpinionSlideInterval = setInterval(() => {
            moveOpinionToSlide(currentOpinionIndex + 1);
        }, 6000); // Cambiar cada 6 segundos

        // Pause on hover
        opinionsSlider.addEventListener('mouseenter', () => clearInterval(autoOpinionSlideInterval));
        opinionsSlider.addEventListener('mouseleave', () => {
            autoOpinionSlideInterval = setInterval(() => {
                moveOpinionToSlide(currentOpinionIndex + 1);
            }, 6000);
        });
    }
});