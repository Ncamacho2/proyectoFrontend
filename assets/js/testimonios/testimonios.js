// Función para obtener 9 elementos aleatorios de un array sin repetir
function obtenerTestimoniosAleatorios(testimonios, num) {
    // Crear un array con índices aleatorios sin repetir
    const indicesAleatorios = [];
    while (indicesAleatorios.length < num) {
        const indice = Math.floor(Math.random() * testimonios.length);
        if (!indicesAleatorios.includes(indice)) {
            indicesAleatorios.push(indice);
        }
    }

    // Extraer los testimonios usando los índices aleatorios
    return indicesAleatorios.map(indice => testimonios[indice]);
}

// Función para insertar los testimonios en la sección
function insertarTestimonios(testimonios) {
    // Seleccionar el elemento <section class="testimonial-group">
    const testimonialGroup = document.querySelector('.testimonial-group');

    // Limpiar la sección antes de agregar los testimonios
    testimonialGroup.innerHTML = '';

    // Recorrer los testimonios y crear el HTML para cada uno
    testimonios.forEach(testimonio => {
        // Crear el HTML para el testimonio
        const testimonialHTML = `
        <div class="testimonial-content">
          <header class="testimonial-header">
            <h2 class="testimonial-name">${testimonio.name}</h2>
            <img
              loading="lazy"
              src="assets/img/testimonio/${testimonio.stars}star.png"
              class="testimonial-image"
            />
          </header>
          <h3 class="testimonial-title">${testimonio.title}</h3>
          <p class="testimonial-description">${testimonio.description}</p>
        </div>
      `;

        // Insertar el HTML en el elemento <section>
        testimonialGroup.insertAdjacentHTML('beforeend', testimonialHTML);
    });
}

// Cargar el archivo JSON y extraer los testimonios
fetch('assets/datos/testimonios.json')
    .then(response => response.json())
    .then(data => {
        // Suponiendo que el JSON tiene un array de testimonios
        const testimoniosAleatorios = obtenerTestimoniosAleatorios(data, 9);

        // Insertar los testimonios aleatorios en el DOM
        insertarTestimonios(testimoniosAleatorios);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });