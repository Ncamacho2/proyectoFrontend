import AppBoot from "./AppBoot.js";

document.addEventListener('DOMContentLoaded', () => {
    new AppBoot();

    console.log('Aplicación iniciada correctamente');

    // Aquí puedes incluir lógica global
    // Por ejemplo, manejo de eventos globales o configuraciones iniciales

    // Mostrar un mensaje en la consola si hay errores en formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            // Puedes agregar validaciones globales aquí si es necesario
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                console.log('Formulario no válido');
            }
        });
    });
});
