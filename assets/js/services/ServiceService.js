
import Service from '../entities/Service.js';

class ServiceService {
    constructor() {
        this.servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    }

    crearServicio(nombre, descripcion, costo) {
        const nuevoServicio = new Service(this.servicios.length + 1, nombre, descripcion, costo);
        this.servicios.push(nuevoServicio);
        this.guardarServicios();
    }

    guardarServicios() {
        localStorage.setItem('servicios', JSON.stringify(this.servicios));
    }

    obtenerServicios() {
        return this.servicios;
    }

    editarServicio(id, nombre, descripcion, costo) {
        const servicio = this.servicios.find(s => s.id === id);
        if (servicio) {
            servicio.nombre = nombre;
            servicio.descripcion = descripcion;
            servicio.costo = costo;
            this.guardarServicios();
        }
    }

    eliminarServicio(id) {
        this.servicios = this.servicios.filter(s => s.id !== id);
        this.guardarServicios();
    }
}

export default new ServiceService();
    