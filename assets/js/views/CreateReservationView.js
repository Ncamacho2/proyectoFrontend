import ReservationService from "../services/ReservationService.js";
import Reservation from "../entities/Reservation.js";
import ServiceService from "../services/ServiceService.js";

class CreateReservationView {

    serviceTypes = [];
    constructor(service) {
        this.service = service;
    }

    // Relacionar evento con elemento del body
    render() {
        this.loadServiceTypes();
        document.addEventListener('DOMContentLoaded', () => {
             $('#reservationForm').on('submit', event => {
                 event.preventDefault();
                 this.createReservation();
             });
        });
    }

    // Crear una reserva
    createReservation() {
        let reservation = new Reservation(
            $('#patientName').val(),
            $('#serviceType').val(),
            $('#date').val(),
            $('#time').val(),
            $('#diagnostic').val(),
        );

        this.service.create(reservation).then( () => {
            Swal.fire({
                title: "Reserva creada con éxito",
                icon: "success"
            });

            setTimeout(() => location.reload(), 1000);
        }).catch(error => {
            let errText = 'Por favor vuelve a intentarlo';
            if (error.status === 422) {
                errText = error.message;
            }

            Swal.fire({
                title: "UPS! Error al crear la reservación",
                text: errText,
                icon: "error"
            });
        });
    }

    // Cargar tipos de servicio
    loadServiceTypes() {
        this.serviceTypes = ServiceService.obtenerServicios();
        this.serviceTypes.forEach(service => {
            let optionHTML = `<option value="${service.id}">${service.nombre}</option>`;
            $("#serviceType").append(optionHTML);
        })
    }
}

const view = new CreateReservationView(new ReservationService());
view.render();

export default view;
