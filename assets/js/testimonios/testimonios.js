document.addEventListener('DOMContentLoaded', () => {
    let testimoniosGuardados = JSON.parse(localStorage.getItem('testimonios'));

    if (!testimoniosGuardados || testimoniosGuardados.length === 0) {
        fetch('assets/datos/testimonios.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('testimonios', JSON.stringify(data));
                const testimoniosAleatorios = obtenerTestimoniosAleatorios(data, 9);
                insertarTestimonios(testimoniosAleatorios);
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });
    } else {
        cargarTestimoniosDesdeLocalStorage();
    }
});

function cargarTestimoniosDesdeLocalStorage() {
    const testimoniosGuardados = JSON.parse(localStorage.getItem('testimonios'));
    if (testimoniosGuardados) {
        const testimoniosAleatorios = obtenerTestimoniosAleatorios(testimoniosGuardados, 9);

        insertarTestimonios(testimoniosAleatorios);
    } else {
        console.log("No hay testimonios en Local Storage.");
    }
}

function obtenerTestimoniosAleatorios(testimonios, num) {
    const testimoniosAleatorios = [];

    if (testimonios.length === 0) return testimoniosAleatorios;

    // Agregar el último testimonio como el primero
    testimoniosAleatorios.push(testimonios[testimonios.length - 1]);

    const indicesAleatorios = [];
    while (indicesAleatorios.length < num - 1) { // Restar 1 porque ya agregamos el último
        const indice = Math.floor(Math.random() * (testimonios.length - 1)); // Limitar hasta el penúltimo
        if (!indicesAleatorios.includes(indice)) {
            indicesAleatorios.push(indice);
        }
    }

    const testimoniosAleatoriosExtraidos = indicesAleatorios.map(indice => testimonios[indice]);
    return testimoniosAleatorios.concat(testimoniosAleatoriosExtraidos); // Combina el último con los aleatorios
}

function mostrarTestimoniosAleatorios(num) {
    const testimoniosGuardados = JSON.parse(localStorage.getItem('testimonios'));
    if (testimoniosGuardados) {
        const testimoniosAleatorios = obtenerTestimoniosAleatorios(testimoniosGuardados, num);
        console.log("Testimonios aleatorios:", testimoniosAleatorios);
    } else {
        console.log("No hay testimonios en Local Storage.");
    }
}

mostrarTestimoniosAleatorios(9);



function insertarTestimonios(testimonios) {
    const testimonialGroup = document.querySelector('.testimonial-group');

    testimonialGroup.innerHTML = '';

    testimonios.forEach(testimonio => {
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

        testimonialGroup.insertAdjacentHTML('beforeend', testimonialHTML);
    });
}

function cargarTestimoniosDesdeLocalStorage() {
    const testimoniosGuardados = JSON.parse(localStorage.getItem('testimonios'));
    if (testimoniosGuardados) {
        const testimoniosAleatorios = obtenerTestimoniosAleatorios(testimoniosGuardados, 9);

        insertarTestimonios(testimoniosAleatorios);
    } else {
        console.log("No hay testimonios en Local Storage.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarTestimoniosDesdeLocalStorage();
});

document.getElementById('testimonial-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('description').value;
    let estrellas = document.getElementById('opciones').value;

    let nuevoTestimonio = {
        name: `${nombre} ${apellido}`,
        title: titulo,
        stars: estrellas,
        description: descripcion
    };

    let testimoniosGuardados = JSON.parse(localStorage.getItem('testimonios')) || [];

    testimoniosGuardados.push(nuevoTestimonio);

    localStorage.setItem('testimonios', JSON.stringify(testimoniosGuardados));

    console.log("Nuevo testimonio agregado:", nuevoTestimonio);

    document.getElementById('testimonial-form').reset();

    cargarTestimoniosDesdeLocalStorage();
});