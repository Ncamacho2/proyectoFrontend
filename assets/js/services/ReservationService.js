export default class ReservationService {

    reservations = [];

    constructor() {
        this.reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    }

    // Crear una nueva reserva
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

    // Validaciones para el formulario de reservas
    validateData(reservation) {
        let err = new Error();
        err.status = 422;

        if (!reservation.patientName || reservation.patientName.length < 5) {
            err.message = 'El nombre del paciente es obligatorio';
            throw err;
        } else if (!reservation.serviceType || reservation.serviceType.length < 1) {
            err.message = 'El tipo de servicio es obligatorio';
        } else if (!reservation.date || reservation.date.length < 1) {
            err.message = 'la fecha de la reservación es obligatorio';
            throw err;
        } else if (!reservation.time || reservation.time.length < 0) {
            err.message = 'El tiempo de servicio es obligatorio';
            throw err;
        }

        return this;
    }

    // Obtener todas las reservas
    all() {
        return new Promise((resolve, reject) => {
            this.reservations = JSON.parse(localStorage.getItem('reservations')) || [];
            resolve(this.reservations);
        })
    }

    // Obtener las reservas por estado Gestionadas/No Gestionadas
    getByStatus(isManaged) {
        return new Promise(async (resolve) => {
            await this.all();
            let reservations = this.reservations;

            if (isManaged) {
                resolve(reservations.filter(item => item.professionalId));
                return;
            }

            resolve(this.reservations.filter(item => !item.professionalId));
        });
    }

    // Obtener las reservas no gestionadas
    getUnmanaged() {
        return this.getByStatus(false);
    }

    // Obtener las reservas gestionadas
    getManaged() {
        return this.getByStatus(true);
    }

    // Actualizar reserva (gestionar la reserva)
    update(reservation) {
        return new Promise(async (resolve, reject) => {
            await this.all();
            const index = this.reservations.findIndex(item => item.id === reservation.id);
            if (index === -1) {
                reject(new Error("El registro no existe"));
                return;
            }

            this.reservations[index] = reservation;
            this.saveReservations(this.reservations);
            resolve(true);
        });
    }

    // Eliminar una reserva
    delete(id) {
        return new Promise((resolve, reject) => {
            this.reservations = this.reservations.filter(reservation => reservation.id != id);
            this.saveReservations(this.reservations);

            resolve(true);
        });
    }

    // Guardar reserva en local storage
    saveReservations(reservation) {
        localStorage.setItem('reservations', JSON.stringify(reservation))
    }
}
