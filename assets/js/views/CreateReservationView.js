import ReservationService from "../services/ReservationService.js";
import Reservation from "../entities/Reservation.js";

class CreateReservationView {
    constructor(service) {
        this.service = service;
    }

    render() {
        document.addEventListener('DOMContentLoaded', () => {
             $('#reservationForm').on('submit', event => {
                 event.preventDefault();
                 this.createReservation();
             });
        });
    }

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
}

const view = new CreateReservationView(new ReservationService());
view.render();

export default view;
