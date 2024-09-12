
// Función para cargar un archivo HTML en un contenedor
function loadComponent(containerSelector, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(containerSelector).innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Cargar el header, footer y menú en todas las páginas
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('#header', 'partials/header.html');  // Cargar el header
    loadComponent('#footer', 'partials/footer.html');  // Cargar el footer
    loadComponent('#menu', 'partials/menu.html');      // Cargar el menú lateral
});
    