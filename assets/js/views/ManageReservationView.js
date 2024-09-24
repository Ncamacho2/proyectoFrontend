import Reservation from "../entities/Reservation.js";
import ReservationService from "../services/ReservationService.js";
import ProfessionalService from "../services/ProfessionalService.js";
import serviceService from "../services/ServiceService.js";

class ManageReservationView {

    modal = null;
    table = null;
    reservations = [];
    professionals = [];
    serviceType = [];

    constructor(service) {
        this.service = service;
    }

    // Relacionar eventos con elementos del body e inicialización de data
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

    // Cargar las reservas, si no existe ninguna crear una por defecto
    async loadReservations(uploadDefault = false) {
        if (uploadDefault) {
            await this.service.create(new Reservation(
                "Armando Mora",
                1,
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

    // Cargar reservas
    async loadReservationsManaged() {
        await this.service.getManaged().then(async (reservations) => this.reservations = reservations);
        $('#viewReservationsManaged').hide();
        $('#viewReservationsUnmanaged').show();
        this.drawTable();
    }

    // Cargar listado de profesionales y servicios
    async loadSystemData() {
        (new ProfessionalService()).uploadDefault().then(professionals => {
            this.professionals = professionals;

            professionals.forEach(professional => {
                let optionHTML = `<option value="${professional.id}">${professional.name}</option>`;
                $("#professional").append(optionHTML);
            });
        });
    }

    // Dibujar las tablas de reservas
    drawTable() {
        this.table.clear();
        $('#manageColumn').html('Gestionar');

        this.reservations.forEach(reservation => {
            let service = `${this.getServicesTypesName(reservation.serviceType)}`;
            let actions = '';
            if (! reservation.professionalId) {
                actions = `<i class="fa-solid fa-trash-can delete-reservation cursor-pointer" data-id="${reservation.id}"></i>&nbsp;&nbsp;<i class="fa-solid fa-check open-modal cursor-pointer" data-id="${reservation.id}"></i>`;
            } else {
                $('#manageColumn').html('Asignado a');
                actions = `${this.getProfessionalName(reservation.professionalId)}`;
            }

            this.table.row.add([
                reservation.id,
                service,
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

    // Eliminar una reserva
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

    // Modal para editar la reserva
    openModal(reservationID) {
        this.modal = new bootstrap.Modal(document.getElementById('reservationModal'));
        let reservation = this.reservations.find(item => item.id === reservationID);
        let serviceType = `${this.getServicesTypesName(reservation.serviceType)}`;
        $("#formTitle").text(`Reserva N° ${reservation.id}`);
        $("#patientName").val(reservation.patientName);
        $("#serviceType").val(serviceType);
        $("#reservationDate").val(reservation.date);
        $("#reservationTime").val(reservation.time);
        $("#diagnostic").val(reservation.diagnostic);
        this.modal.show();

        $('.edit-reservation').on('click', () => this.editReservation(reservation));
    }

    // Editar una reserva (gestionar la reserva)
    editReservation(reservation) {
       reservation.professionalId = $("#professional").find(":selected").val();
        this.service.update(reservation).then(isUpdated => {
           if (isUpdated) {

               $('#professional option[value=""]').attr("selected", "selected");
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

    // Obtener los nombres de los profesionales
    getProfessionalName(professionalId) {
        return this.professionals.find(item => item.id === parseInt(professionalId)).name;
    }

    // Obtener los nombres del tipo de servicio
    getServicesTypesName(serviceId) {
        this.serviceType = serviceService.obtenerServicios();
        return this.serviceType.find(item => item.id === parseInt(serviceId)).nombre;
    }
}

const view = new ManageReservationView(new ReservationService());
view.render();

export default view;
