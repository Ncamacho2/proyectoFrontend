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
            // Agregar el evento al botón de logout
            document.querySelector('#logoutButton').addEventListener('click', logoutUser);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Simulación de verificación de estado de autenticación
function isUserLoggedIn() {
    // Aquí puedes agregar tu lógica real, por ejemplo, comprobar el localStorage
    if (localStorage.getItem('isAuthenticated') === 'true') {

        return localStorage.getItem('isAuthenticated') === 'true';

    }
    logoutUser();


}

const components = {
    '#header': isUserLoggedIn() ? 'partials/header-logged-in.html' : 'partials/header.html', // Diferente según el estado de login
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

// Función para hacer logout
function logoutUser() {
    // Eliminar los datos de login del localStorage
    localStorage.removeItem('login_success');
    localStorage.removeItem('isAuthenticated');

    // Redirigir a la página de login
    window.location.href = 'login.html';
}