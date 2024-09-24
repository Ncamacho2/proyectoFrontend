
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

const components = {
    '#header': 'partials/header.html',
    '#footer': 'partials/footer.html',
    '#menu': 'partials/menu.html',
};

// Cargar el header, footer y menú en todas las páginas
document.addEventListener('DOMContentLoaded', () => {
    Object.entries(components).forEach(entry => {
        const [selector, path] = entry;

        if (document.querySelector(selector)) {
            loadComponent(selector, path);
        }
    });
});
