// script.js

// Función para leer el archivo Excel y mostrarlo
document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Asumimos que queremos mostrar la primera hoja
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const html = XLSX.utils.sheet_to_html(worksheet);

            document.getElementById('excelOutput').innerHTML = html;
        };
        reader.readAsArrayBuffer(file);
    }
}
