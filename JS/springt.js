// script.js

// Función para leer el archivo Excel y mostrarlo
document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Mostrar todas las hojas disponibles en el archivo Excel
                let html = '';
                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    html += `<h3>${sheetName}</h3>`;
                    html += XLSX.utils.sheet_to_html(worksheet);
                });

                document.getElementById('excelOutput').innerHTML = html;
            } catch (error) {
                console.error("Error al leer el archivo Excel:", error);
                alert("Hubo un problema al procesar el archivo Excel. Asegúrate de que el archivo esté en un formato correcto.");
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Por favor selecciona un archivo.");
    }
}

// Variables para almacenar el estado actual de los filtros
let currentActivityFilter = 'all';
let currentYearFilter = 'all';

// Manejar los filtros de actividad
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', function() {
        currentActivityFilter = this.getAttribute('data-filter');
        applyFilters();
    });
});

// Manejar los filtros de año
document.querySelectorAll('.filter-button-year').forEach(button => {
    button.addEventListener('click', function() {
        currentYearFilter = this.getAttribute('data-year');
        applyFilters();
    });
});

// Función para aplicar los filtros combinados de actividad y año
function applyFilters() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        const itemActivity = item.getAttribute('data-filter');
        const itemYear = item.getAttribute('data-year');

        // Verificar si el elemento cumple con los filtros actuales
        const matchesActivity = (currentActivityFilter === 'all' || itemActivity === currentActivityFilter);
        const matchesYear = (currentYearFilter === 'all' || itemYear === currentYearFilter);

        // Mostrar o esconder el elemento con animación
        if (matchesActivity && matchesYear) {
            fadeIn(item);
        } else {
            fadeOut(item);
        }
    });
}

// Función para animar la aparición de un elemento usando requestAnimationFrame
function fadeIn(element) {
    element.style.display = 'block';
    element.style.opacity = 0;
    let opacity = 0;

    function increase() {
        opacity += 0.05;
        if (opacity <= 1) {
            element.style.opacity = opacity;
            requestAnimationFrame(increase);
        }
    }
    requestAnimationFrame(increase);
}

// Función para animar la desaparición de un elemento usando requestAnimationFrame
function fadeOut(element) {
    let opacity = 1;

    function decrease() {
        opacity -= 0.05;
        if (opacity > 0) {
            element.style.opacity = opacity;
            requestAnimationFrame(decrease);
        } else {
            element.style.display = 'none';
        }
    }
    requestAnimationFrame(decrease);
}

// script.js

// Manejar los clics en las imágenes de la galería para abrir el modal con imágenes adicionales
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
            img.style.maxWidth = '200px'; // Tamaño máximo para cada imagen en el modal
            modalGalleryContent.appendChild(img);
        });
    } else {
        console.error("No se encontraron imágenes para la clave:", galleryKey);
    }

    // Mostrar el modal
    $('#galleryModal').modal('show');
}
// script.js

// Manejar los clics en las imágenes de la galería para abrir el modal con imágenes adicionales
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.open-gallery').forEach(item => {
        item.addEventListener

