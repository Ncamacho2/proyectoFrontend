import Reservation from "../entities/Reservation.js";

export default class ReservationService {

    reservations = [];

    constructor() {
        this.reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    }

    create(reservation) {
        return new Promise((resolve, reject) => {
            try {
                this.validateData(reservation);

                reservation.id = Date.now();
                reservation.createdAt = (new Date()).toJSON();
                this.reservations.push(reservation);
                localStorage.setItem('reservations', JSON.stringify(this.reservations));

                resolve(reservation);
            } catch (e) {
                reject(e);
            }
        });
    }

    validateData(reservation) {
        let err = new Error();
        err.status = 422;

        if (!reservation.patientName || reservation.patientName.length < 5) {
            err.message = 'El nombre del paciente es obligatorio';
            throw err;
        } else if (!reservation.serviceType || reservation.serviceType.length < 1) {
            err.message = 'El ow err;
        } else if (!reservation.date || reservation.date.length < 1) {
            err.message = 'la fecha de la reservación es obligatorio';
            throw err;
        } else if (!reservation.time || reservation.time.length < 0) {
            err.message = 'El tiempo de servicio es obligatorio';
            throw err;
        }

        return this;
    }

    all() {
        return new Promise((resolve, reject) => {
            this.reservations = JSON.parse(localStorage.getItem('reservations')) || [];
            resolve(this.reservations);
        })
    }
}
