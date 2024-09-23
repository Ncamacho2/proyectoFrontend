import Reservation from "../entities/Reservation.js";
import ReservationService from "../services/ReservationService.js";
import ProfessionalService from "../services/ProfessionalService.js";

class ManageReservationView {

    modal = null;
    table = null;
    reservations = [];
    professionals = [];

    constructor(service) {
        this.service = service;
    }

    render() {
        document.addEventListener('DOMContentLoaded', async () => {
            $('#viewReservationsUnmanaged').on('click', () => this.loadReservations());
            $('#viewReservationsManaged').on('click', () => this.loadReservationsManaged());
            $('#loadDemoData').on('click', () => this.loadReservations(true));


            this.table = $('#reservationTable').DataTable({
                searching: false,
                responsive: true,
                // paging: false,
            });

            await this.loadSystemData();
            await this.loadReservations();
        });
    }

    async loadReservations(uploadDefault = false) {
        if (uploadDefault) {
            await this.service.create(new Reservation(
                "Armando Mora",
                "Cuidado de Pacientes",
                "25-09-2024",
                "Mensual",
                "diabetes"
            )).then(reservation => this.reservations.push(reservation));
        }

        await this.service.getUnmanaged().then(async (reservations) => this.reservations = reservations);
        $('#viewReservationsManaged').show();
        $('#viewReservationsUnmanaged').hide();
        this.drawTable();
    }

    async loadReservationsManaged() {
        await this.service.getManaged().then(async (reservations) => this.reservations = reservations);
        $('#viewReservationsManaged').hide();
        $('#viewReservationsUnmanaged').show();
        this.drawTable();
    }

    async loadSystemData() {
        (new ProfessionalService()).uploadDefault().then(professionals => {
            this.professionals = professionals;

            professionals.forEach(professional => {
                let optionHTML = `<option value="${professional.id}">${professional.name}</option>`;
                $("#professional").append(optionHTML);
            });
        });
    }

    drawTable() {
        this.table.clear();
        $('#manageColumn').html('Gestionar');

        this.reservations.forEach(reservation => {
            let actions = '';
            if (! reservation.professionalId) {
                actions = `<i class="fa-solid fa-trash-can delete-reservation cursor-pointer" data-id="${reservation.id}"></i>&nbsp;&nbsp;<i class="fa-solid fa-check open-modal cursor-pointer" data-id="${reservation.id}"></i>`;
            } else {
                $('#manageColumn').html('Asignado a');
                actions = `${this.getProfessionalName(reservation.professionalId)}`;
            }

            this.table.row.add([
                reservation.id,
                reservation.serviceType,
                reservation.date,
                reservation.time,
                reservation.patientName,
                reservation.createdAt,
                actions
            ]);
        });

        this.table.draw(); // Redibujar la tabla con los nuevos datos

        $('.delete-reservation').on('click', (event) => this.deleteReservation($(event.target).data('id')));
        $('.open-modal').on('click', (event) => this.openModal($(event.target).data('id')));
    }

    deleteReservation(reservationID) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.delete(reservationID).then(isDeleted => {
                    if (isDeleted) {
                        this.loadReservations();

                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado',
                            text: 'La reserva ha sido eliminada.'
                        });
                    }
                });
            }
        });
    }

    openModal(reservationID) {
        this.modal = new bootstrap.Modal(document.getElementById('reservationModal'));
        let reservation = this.reservations.find(item => item.id === reservationID);
        $("#formTitle").text(`Reserva N° ${reservation.id}`);
        $("#patientName").val(reservation.patientName);
        $("#serviceType").val(reservation.serviceType);
        $("#reservationDate").val(reservation.date);
        $("#reservationTime").val(reservation.time);
        $("#diagnostic").val(reservation.diagnostic);
        this.modal.show();

        $('.edit-reservation').on('click', () => this.editReservation(reservation));
    }

    editReservation(reservation) {
       reservation.professionalId = $("#professional").find(":selected").val();
       this.service.update(reservation).then(isUpdated => {
           if (isUpdated) {
               this.loadReservations();
               this.modal.hide();

               Swal.fire({
                   icon: 'success',
                   title: 'Actualizado',
                   text: 'La reserva ha sido gestionada.'
               });
           }
       });
    }

    getProfessionalName(professionalId) {
        return this.professionals.find(item => item.id === parseInt(professionalId)).name;
    }
}

const view = new ManageReservationView(new ReservationService());
view.render();

export default view;
