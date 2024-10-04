// script.js

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.open-gallery').forEach(item => {
        item.addEventListener('click', function() {
            const galleryKey = this.getAttribute('data-gallery');
            openGalleryModal(galleryKey);
        });
    });
});

// Función para abrir el modal y mostrar las imágenes relacionadas
function openGalleryModal(galleryKey) {
    // Limpiar el contenido anterior del modal
    const modalGalleryContent = document.getElementById('modalGalleryContent');
    modalGalleryContent.innerHTML = '';

    // Definir las imágenes según el grupo
    const galleryImages = {
        'exhibicion-2023': [
            'IMG/1.jpg',
            'IMG/2.jpg',
            'IMG/3.jpg',
            'IMG/4.jpg'
        ],
        'juventud-2023': [
            'IMG/5.jpg',
            'IMG/6.jpg',
            'IMG/7.jpg',
            'IMG/8.jpg'
        ],
        'campo-2022': [
            'IMG/9.jpg',
            'IMG/10.jpg',
            'IMG/11.jpg',
            'IMG/12.jpg',
            'IMG/13.jpg'
        ]
    };

    // Añadir las imágenes relacionadas al modal
    if (galleryImages[galleryKey]) {
        galleryImages[galleryKey].forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('img-fluid', 'm-2');
            img.style.maxWidth = '300px'; // Ajustar el tamaño de cada imagen en el modal
            modalGalleryContent.appendChild(img);
        });
    } else {
        console.error("No se encontraron imágenes para la clave:", galleryKey);
    }

    // Mostrar el modal
    $('#galleryModal').modal('show');
}

