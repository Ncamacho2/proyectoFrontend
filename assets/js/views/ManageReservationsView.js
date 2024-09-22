import ReservationService from "../services/ReservationService.js";
import Reservation from "../entities/Reservation.js";

class CreateReservationView {
    constructor(service) {
        this.service = service;
    }

    render() {
        document.addEventListener('DOMContentLoaded', () => {

        });
    }

    // TODO: Metodo para obtener listado de reservas
}

const view = new CreateReservationView(new ReservationService());
view.render();

export default view;
