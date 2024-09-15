// Eliminamos la importación de ServiceService, ya que usaremos fetch directamente
// import ServiceService from '../services/ServiceService.js';

class ServiceView {
  constructor() {
    try {
      console.log('Inicializando ServiceView');
      this.tableBody = document.querySelector('#servicesTable tbody');

      // Inicializamos el formulario y renderizamos los servicios
      this.renderServicios();
    } catch (error) {
      console.error('Error al inicializar ServiceView:', error);
    }
  }

  async renderServicios() {
    // Tu código para obtener y renderizar los servicios
    try {
      console.log('Obteniendo servicios...');
      const response = await fetch('http://localhost:3000/medical_service');
      const servicios = await response.json();

      this.tableBody.innerHTML = '';
      servicios.forEach(servicio => {
        const fechaCreado = new Date(servicio.created_at * 1000).toLocaleString();
        const fechaEditado = new Date(servicio.updated_at * 1000).toLocaleString();
        const row = `
        <tr>
            <td>${servicio.id}</td>
            <td>${servicio.name}</td>
            <td>${fechaCreado}</td>
            <td>${fechaEditado}</td>
            <td class="text-center">${servicio.is_active ? 'Activo' : 'Inactivo'}</td>
            <td class="text-center">
              <button onclick="editarServicio(${servicio.id})" class="btn btn-sm btn-primary me-2" title="Editar">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button onclick="eliminarServicio(${servicio.id})" class="btn btn-danger" title="Eliminar">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
        </tr>
    `;

        this.tableBody.innerHTML += row;
      });

      // VALIDATE IF servicesTable was initialized
      if ($.fn.DataTable.isDataTable('#servicesTable')) {
        $('#servicesTable').DataTable().destroy();
      }
      $('#servicesTable').DataTable({
        responsive: true,
        searching: false,
        pageLength: 5,
        lengthMenu: [ [5, 10, 20], [5, 10, 20] ],
        language: {
          decimal: ",",
          thousands: ".",
          processing: "Procesando...",
          lengthMenu: "Mostrar _MENU_ servicios por página",
          info: "Mostrando _START_ a _END_ de _TOTAL_ servicios",
          infoEmpty: "Mostrando 0 a 0 de 0 servicios",
          infoFiltered: "(filtrado de _MAX_ servicios en total)",
          loadingRecords: "Cargando servicios...",
          zeroRecords: "No se encontraron servicios",
          emptyTable: "No hay servicios disponibles",
          paginate: {
            first:    "<i class='fa-solid fa-angle-double-left'></i>",
            previous: "<i class='fa-solid fa-angle-left'></i>",
            next:     "<i class='fa-solid fa-angle-right'></i>",
            last:     "<i class='fa-solid fa-angle-double-right'></i>"
          },
          aria: {
            sortAscending:  ": activar para ordenar ascendente",
            sortDescending: ": activar para ordenar descendente"
          }
        }
      });
      
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  }

}

// Definimos las funciones globales para editar y eliminar servicios
window.editarServicio = async function (id) {
  try {
    // Obtener el servicio actual
    const response = await fetch(`http://localhost:3000/medical_service/${id}`);
    const servicio = await response.json();

    // Pedir nuevos valores al usuario
    const nuevoNombre = prompt('Nuevo nombre:', servicio.name);
    const nuevaDescripcion = prompt('Nueva descripción:', servicio.short_description);
    const nuevoCosto = prompt('Nuevo costo:', servicio.costo);

    // Actualizar el servicio
    await fetch(`http://localhost:3000/medical_service/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...servicio,
        name: nuevoNombre,
        short_description: nuevaDescripcion,
        costo: nuevoCosto,
        updated_at: Math.floor(Date.now() / 1000)
      })
    });
    serviceView.renderServicios();
  } catch (error) {
    console.error('Error al editar el servicio:', error);
  }
};

window.eliminarServicio = async function (id) {
  if (confirm('¿Estás seguro de eliminar este servicio?')) {
    try {
      await fetch(`http://localhost:3000/medical_service/${id}`, {
        method: 'DELETE'
      });
      serviceView.renderServicios();
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
    }
  }
};

window.createService = async function (event) {
  event.preventDefault();
  try {
    const form = document.getElementById('createServiceForm');

    const routeUpload = 'assets/php/createFile.php';

    // Subir la imagen principal
    const mainImageFile = $('#mainImage').prop('files')[0];
    const mainImageUploadFormData = new FormData();
    mainImageUploadFormData.append('image', mainImageFile);

    const mainImageResponse = await fetch(routeUpload, {
      method: 'POST',
      body: mainImageUploadFormData
    });

    const mainImageContentResponse = await mainImageResponse.json();
    const mainImageUrl = mainImageContentResponse.url;

    // Subir la imagen secundaria
    const secondaryImageFile = $('#secondaryImage').prop('files')[0];
    const secondaryImageUploadFormData = new FormData();
    secondaryImageUploadFormData.append('image', secondaryImageFile);

    const secondaryImageResponse = await fetch(routeUpload, {
      method: 'POST',
      body: secondaryImageUploadFormData
    });

    const secondaryImageContentResponse = await secondaryImageResponse.json();
    const secondaryImageUrl = secondaryImageContentResponse.url;

    // Crear el objeto del nuevo servicio
    const newService = {
      name: $('#nameServiceCreate').val(),
      description: $('#descriptionServiceCreate').val(),
      short_description: $('#shortDescriptionServiceCreate').val(),
      main_image_url: mainImageUrl,
      secondary_image_url: secondaryImageUrl,
      is_featured: $('#isFeaturedServiceCreate').prop('checked'),
      is_active: true,
      created_at: Math.floor(Date.now() / 1000),
      updated_at: Math.floor(Date.now() / 1000)
    };

    // Enviar el nuevo servicio al servidor JSON (json-server)
    await fetch('http://localhost:3000/medical_service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newService)
    });

    

    // Cerrar el modal y mostrar mensaje de éxito
    const modalElement = document.getElementById('createServiceModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    Swal.fire({
      icon: 'success',
      title: 'Servicio agregado',
      text: 'El nuevo servicio ha sido agregado exitosamente.'
    });

    // Resetear el formulario
    form.reset();
    form.classList.remove('was-validated');

    // Actualizar la tabla de servicios
    await serviceView.renderServicios();

  } catch (error) {
    console.error('Error al crear el servicio:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error al crear el servicio. Por favor, intenta nuevamente.'
    });
  }
};

// When clicking createServiceBtn, show the createServiceModal
$('#createServiceBtn').click(function () {
  console.log('Mostrando modal de creación de servicio');
  $('#createServiceModal').modal('show');
});

$('#saveServiceBtn').click(function () {
  // preventDefault and call createService
  createService(event);

});

// initialize: renderServicios
const serviceView = new ServiceView();