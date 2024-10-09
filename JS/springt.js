// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Función para filtrar la galería
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-filter') === filterValue) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });

            // Eliminar la clase activa de los otros botones y agregarla al botón seleccionado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Función para el desplazamiento suave al hacer clic en los enlaces del menú de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajuste de desplazamiento para la barra de navegación fija
                    behavior: 'smooth'
                });
            }
        });
    });

    // Función para mostrar y ocultar el modal de la galería
    const openGalleryButtons = document.querySelectorAll('.open-gallery');
    const galleryModal = document.getElementById('galleryModal');
    const modalContent = document.getElementById('modalGalleryContent');

    openGalleryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const galleryType = this.getAttribute('data-gallery');
            modalContent.innerHTML = '';

            // Filtrar las imágenes del modal
            const selectedImages = Array.from(galleryItems).filter(item =>
                item.getAttribute('data-filter') === galleryType || galleryType === 'all'
            );

            selectedImages.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.querySelector('img').src;
                imgElement.classList.add('img-fluid', 'm-2');
                imgElement.style.maxWidth = '200px';
                modalContent.appendChild(imgElement);
            });

            $(galleryModal).modal('show');
        });
    });

    // Cerrar el modal al hacer clic fuera del contenido
    window.addEventListener('click', function (event) {
        if (event.target === galleryModal) {
            $(galleryModal).modal('hide');
        }
    });
});

