document.addEventListener('DOMContentLoaded', () => {
  // Verificar si hay testimonios en Local Storage
  let testimoniosGuardados = JSON.parse(localStorage.getItem('testimonios'));

  if (!testimoniosGuardados || testimoniosGuardados.length === 0) {
      // Si no hay testimonios, cargar desde el archivo JSON
      fetch('/assets/datos/testimonios.json')
          .then(response => response.json())
          .then(data => {
              // Guardar los testimonios en Local Storage
              localStorage.setItem('testimonios', JSON.stringify(data));
              // Obtener 9 testimonios aleatorios y mostrarlos
              const testimoniosAleatorios = obtenerTestimoniosAleatorios(data, 9);
              insertarTestimonios(testimoniosAleatorios);
          })
          .catch(error => {
              console.error('Error al cargar el archivo JSON:', error);
          });
  } else {
      // Si hay testimonios, cargarlos desde Local Storage
      cargarTestimoniosDesdeLocalStorage();
  }
});

// Función para cargar los testimonios desde Local Storage
function cargarTestimoniosDesdeLocalStorage() {
  const testimoniosGuardados = JSON.parse(localStorage.getItem('testimonios'));
  if (testimoniosGuardados) {
      // Obtener 9 testimonios aleatorios
      const testimoniosAleatorios = obtenerTestimoniosAleatorios(testimoniosGuardados, 9);
      
      // Insertar los testimonios aleatorios en el DOM
      insertarTestimonios(testimoniosAleatorios);
  } else {
      console.log("No hay testimonios en Local Storage.");
  }
}

function obtenerTestimoniosAleatorios(testimonios, num) {
  const testimoniosAleatorios = [];
  
  // Asegurarte de que haya testimonios disponibles
  if (testimonios.length === 0) return testimoniosAleatorios;

  // Agregar el último testimonio como el primero
  testimoniosAleatorios.push(testimonios[testimonios.length - 1]);

  // Crear un array de índices aleatorios sin repetir para los restantes
  const indicesAleatorios = [];
  while (indicesAleatorios.length < num - 1) { // Restar 1 porque ya agregamos el último
      const indice = Math.floor(Math.random() * (testimonios.length - 1)); // Limitar hasta el penúltimo
      if (!indicesAleatorios.includes(indice)) {
          indicesAleatorios.push(indice);
      }
  }
  
  // Extraer los testimonios usando los índices aleatorios
  const testimoniosAleatoriosExtraidos = indicesAleatorios.map(indice => testimonios[indice]);
  return testimoniosAleatorios.concat(testimoniosAleatoriosExtraidos); // Combina el último con los aleatorios
}

// Ejemplo de uso
function mostrarTestimoniosAleatorios(num) {
  const testimoniosGuardados = JSON.parse(localStorage.getItem('testimonios'));
  if (testimoniosGuardados) {
      const testimoniosAleatorios = obtenerTestimoniosAleatorios(testimoniosGuardados, num);
      console.log("Testimonios aleatorios:", testimoniosAleatorios);
  } else {
      console.log("No hay testimonios en Local Storage.");
  }
}

// Llamar a la función para mostrar 9 testimonios aleatorios
mostrarTestimoniosAleatorios(9);


  
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
                      src="/assets/img/testimonio/${testimonio.stars}star.png"
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

// Cargar los testimonios desde Local Storage y extraer aleatorios
function cargarTestimoniosDesdeLocalStorage() {
  const testimoniosGuardados = JSON.parse(localStorage.getItem('testimonios'));
  if (testimoniosGuardados) {
      // Obtener 9 testimonios aleatorios
      const testimoniosAleatorios = obtenerTestimoniosAleatorios(testimoniosGuardados, 9);
      
      // Insertar los testimonios aleatorios en el DOM
      insertarTestimonios(testimoniosAleatorios);
  } else {
      console.log("No hay testimonios en Local Storage.");
  }
}

// Llamar a la función para cargar los testimonios al cargar la página
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
  
  // Crear el objeto del testimonio
  let nuevoTestimonio = {
      name: `${nombre} ${apellido}`,
      title: titulo,
      stars: estrellas,
      description: descripcion
  };

  // Obtener los testimonios existentes desde Local Storage
  let testimoniosGuardados = JSON.parse(localStorage.getItem('testimonios')) || [];
  
  // Agregar el nuevo testimonio al array
  testimoniosGuardados.push(nuevoTestimonio);
  
  // Guardar el array actualizado en Local Storage
  localStorage.setItem('testimonios', JSON.stringify(testimoniosGuardados));
  
  console.log("Nuevo testimonio agregado:", nuevoTestimonio);

  // Opcional: Aquí puedes limpiar el formulario si lo deseas
  document.getElementById('testimonial-form').reset();
  
  // Si quieres recargar los testimonios en la página, llama a la función correspondiente
  cargarTestimoniosDesdeLocalStorage();
});

