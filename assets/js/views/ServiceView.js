import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

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
      // const response = await fetch('http://localhost:3000/medical_service');
      // const servicios = await response.json();

      // Get items from localstorage but if not exist, create

      const serviciosLocalStorage = JSON.parse(localStorage.getItem('medicalServices')) || [];
      console.log('serviciosLocalStorage', serviciosLocalStorage);
      let servicios = [];
      if (serviciosLocalStorage.length === 0) {
        const serviciosJson = {
          "medical_service": [
            {
              "id": "1",
              "name": "Cuidados de pacientes",
              "description": "Servicio dedicado al cuidado integral de pacientes.",
              "short_description": "Servicio dedicado al cuidado integral de pacientes.",
              "main_image_url": "main_image_url_1",
              "secondary_image_url": "secondary_image_url_1",
              "is_featured": false,
              "is_active": true,
              "created_at": 1726369520,
              "updated_at": 1726369520,
              "deleted_at": null
            },
            {
              "id": "2",
              "name": "Teleconsulta",
              "description": "Consultas médicas a distancia mediante tecnología.",
              "short_description": "Consultas médicas a distancia mediante tecnología.",
              "main_image_url": "main_image_url_2",
              "secondary_image_url": "secondary_image_url_2",
              "is_featured": false,
              "is_active": true,
              "created_at": 1726369520,
              "updated_at": 1726369520,
              "deleted_at": null
            },
            {
              "id": "3",
              "name": "Enfermería y control",
              "description": "Servicios de enfermería y monitoreo de salud.",
              "short_description": "Servicios de enfermería y monitoreo de salud.",
              "main_image_url": "main_image_url_3",
              "secondary_image_url": "secondary_image_url_3",
              "is_featured": false,
              "is_active": true,
              "created_at": 1726369520,
              "updated_at": 1726369520,
              "deleted_at": null
            },
            {
              "id": "4",
              "name": "Exámenes de laboratorio",
              "description": "Análisis clínicos y estudios de laboratorio.",
              "short_description": null,
              "main_image_url": "main_image_url_4",
              "secondary_image_url": "secondary_image_url_4",
              "is_featured": false,
              "is_active": true,
              "created_at": 1726369520,
              "updated_at": 1726372962,
              "deleted_at": null,
              "costo": null
            },
            {
              "id": "5",
              "name": "Atención materna e infantil",
              "description": "Cuidado especializado para madres y niños.",
              "short_description": "Cuidado especializado para madres y niños.",
              "main_image_url": "main_image_url_5",
              "secondary_image_url": "secondary_image_url_5",
              "is_featured": false,
              "is_active": true,
              "created_at": 1726369520,
              "updated_at": 1726369520,
              "deleted_at": null
            },
            {
              "id": "6",
              "name": "Servicios de emergencia",
              "description": "Atención inmediata en situaciones de emergencia.",
              "short_description": "Atención inmediata en situaciones de emergencia.",
              "main_image_url": "main_image_url_6",
              "secondary_image_url": "secondary_image_url_6",
              "is_featured": false,
              "is_active": true,
              "created_at": 1726369520,
              "updated_at": 1726369520,
              "deleted_at": null
            },
            {
              "id": "d91c",
              "name": "TEST QA 2",
              "description": "TEST QA 2TEST QA 2TEST QA 2TEST QA 2TEST QA 2",
              "short_description": "TEST QA 2TEST QA 2",
              "main_image_url": "/proyectoFrontend/img/image_services/service-20240915_080213-installment-merchants-credit-granted-32.png",
              "secondary_image_url": "/proyectoFrontend/img/image_services/service-20240915_080213-mailjet-image.png",
              "is_featured": true,
              "is_active": true,
              "created_at": 1726380133,
              "updated_at": 1726380133
            },
            {
              "id": "9af0",
              "name": "Primera plantilla",
              "description": "Primera plantillaPrimera plantillaPrimera plantillaPrimera plantillaPrimera plantillaPrimera plantilla",
              "short_description": "Primera plantillaPrimera plantilla",
              "main_image_url": "/proyectoFrontend/img/image_services/service-20240915_080428-guide_created.png",
              "secondary_image_url": "/proyectoFrontend/img/image_services/service-20240915_080428-test23 - copia.png",
              "is_featured": true,
              "is_active": true,
              "created_at": 1726380268,
              "updated_at": 1726380268
            },
            {
              "id": "9126",
              "name": "TEST PARA LUEGO EDITAR",
              "description": "TEST PARA LUEGO EDITARTEST PARA LUEGO EDITARTEST PARA LUEGO EDITAR",
              "short_description": "TEST PARA LUEGO EDITAR",
              "main_image_url": "/proyectoFrontend/img/image_services/service-20240915_080519-guide_created.png",
              "secondary_image_url": "/proyectoFrontend/img/image_services/service-20240915_080519-installment-merchants-credit-granted-32.png",
              "is_featured": false,
              "is_active": true,
              "created_at": 1726380319,
              "updated_at": 1726380319
            },
            {
              "id": "1253",
              "name": "SECCIÓN HALLOWEEN",
              "description": "SECCIÓN HALLOWEENSECCIÓN HALLOWEENSECCIÓN HALLOWEEN",
              "short_description": "SECCIÓN HALLOWEEN",
              "main_image_url": "/proyectoFrontend/img/image_services/service-20240915_080546-installment-merchants-credit-granted-32.png",
              "secondary_image_url": "/proyectoFrontend/img/image_services/service-20240915_080546-installment-merchants-credit-granted-32.png",
              "is_featured": false,
              "is_active": true,
              "created_at": 1726380346,
              "updated_at": 1726380346
            }
          ]
        };
        servicios = serviciosJson.medical_service;
        localStorage.setItem('medicalServices', servicios);
      } else {
        servicios = serviciosLocalStorage;
      }

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
        lengthMenu: [[5, 10, 20], [5, 10, 20]],
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
            first: "<i class='fa-solid fa-angle-double-left'></i>",
            previous: "<i class='fa-solid fa-angle-left'></i>",
            next: "<i class='fa-solid fa-angle-right'></i>",
            last: "<i class='fa-solid fa-angle-double-right'></i>"
          },
          aria: {
            sortAscending: ": activar para ordenar ascendente",
            sortDescending: ": activar para ordenar descendente"
          }
        }
      });

    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  }
  async uploadImage(file) {
    if (!file) {
      alert('Por favor, selecciona una imagen.');
      return null;
    }

    const firebaseConfig = {
      apiKey: "AIzaSyDS3Q7oWy8K5O4OXVak1BymC4Ly1XfEAeo",
      authDomain: "nelson-568ca.firebaseapp.com",
      databaseURL: "https://nelson-568ca.firebaseio.com",
      projectId: "nelson-568ca",
      storageBucket: "nelson-568ca.appspot.com",
      messagingSenderId: "181720440030",
      appId: "1:181720440030:web:291a91c0c29dae2fd2764f"
    };

    // Inicializa Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    // Crea una referencia al archivo en Storage
    const storageRef = ref(storage, `images/${file.name}`);

    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Progreso de la subida (opcional)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Progreso: ' + progress + '%');
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
          reject(error);
        },
        async () => {
          // Imagen subida exitosamente, obtener la URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('URL de la imagen:', downloadURL);
          resolve(downloadURL);
        }
      );
    });
  }


}

window.createService = async function (event) {
  event.preventDefault();
  try {
    const form = document.getElementById('createServiceForm');

    // Subir las imágenes
    const mainImageFile = $('#mainImage').prop('files')[0];
    const secondaryImageFile = $('#secondaryImage').prop('files')[0];

    const mainImageUrl = await serviceView.uploadImage(mainImageFile);
    const secondaryImageUrl = await serviceView.uploadImage(secondaryImageFile);

    // Asegúrate de que ambas imágenes hayan sido subidas
    if (!mainImageUrl || !secondaryImageUrl) {
      throw new Error('Error al subir las imágenes');
    }

    const idNew = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // Crear el objeto del nuevo servicio
    const newService = {
      id: idNew,
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

    // Guardar en localstorage
    let services = await JSON.parse(localStorage.getItem('medicalServices')) || [];

    console.log('services', services);
    await services.push(newService);
    await localStorage.setItem('medicalServices', JSON.stringify(services));

    // Cerrar el modal y mostrar mensaje de éxito
    const modalElement = await document.getElementById('createServiceModal');
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

// Definimos las funciones globales para editar y eliminar servicios
window.editarServicio = async function (id) {
  try {
    // Show editServiceModal and fill with the service data
    $('#editServiceModal').modal('show');
    const services = JSON.parse(localStorage.getItem('medicalServices'));
    const service = services.find(service => service.id === id);

    // $('#nameServiceEdit').val(service.name);
    // $('#descriptionServiceEdit').val(service.description);
    // $('#shortDescriptionServiceEdit').val(service.short_description);
    // $('#isFeaturedServiceEdit').prop('checked', service.is_featured);
    // $('#serviceId').val(service.id);

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