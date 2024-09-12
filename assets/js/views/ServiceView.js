
import ServiceService from '../services/ServiceService.js';

class ServiceView {
    constructor() {
        this.tableBody = document.querySelector('#servicesTable tbody');
    }

    renderServicios() {
        const servicios = ServiceService.obtenerServicios();
        this.tableBody.innerHTML = '';
        servicios.forEach(servicio => {
            const row = `
                <tr>
                    <td>${servicio.id}</td>
                    <td>${servicio.nombre}</td>
                    <td>${servicio.descripcion}</td>
                    <td>${servicio.costo}</td>
                    <td>
                        <button onclick="editarServicio(${servicio.id})">Editar</button>
                        <button onclick="eliminarServicio(${servicio.id})">Eliminar</button>
                    </td>
                </tr>
            `;
            this.tableBody.innerHTML += row;
        });
    }

    inicializarFormulario() {
        const form = document.querySelector('#createServiceForm');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombre = form.querySelector('[name="nombre"]').value;
            const descripcion = form.querySelector('[name="descripcion"]').value;
            const costo = form.querySelector('[name="costo"]').value;
            ServiceService.crearServicio(nombre, descripcion, costo);
            this.renderServicios();
        });
    }
}

export default new ServiceView();
    