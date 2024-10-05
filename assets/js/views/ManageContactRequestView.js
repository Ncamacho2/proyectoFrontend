import ContactRequest from "../entities/ContactRequest.js";
import ContactRequestService from "../services/ContactRequestService.js";

class ManageContactRequestView {
    modal = null;
    table = null;
    contactRequest = [];


    constructor(service) {
        this.service = service;
    }

    // Relacionar eventos con elementos del body e inicialización de la data
    render() {
        document.addEventListener('DOMContentLoaded', async () => {
            this.table = $('#contactRequestTable').DataTable({
                searching:false,
                responsive: true,
            })
            await this.loadContactRequest();
        });
    }

    // Cargar solicitudes de Contacto
    async loadContactRequest(uploadDefault = false) {
        if (uploadDefault) {
            await this.service.create(new ContactRequest(
                "Liliana Pinilla",
                "liliana.p@gmail.com",
                "3002554554",
                "Información",
                "Deseo saber más sobre los servicios"
            )).then(contactRequest => this.contactRequest.push(contactRequest));
        }

        await this.service.all().then(async (contactRequest) => this.contactRequest = contactRequest);
        this.drawTable();
    }

    // Dibujar las tablas de reservas
    drawTable() {
        this.table.clear();

        this.contactRequest.forEach(contactRequest => {

            this.table.row.add([
                contactRequest.id,
                contactRequest.name,
                contactRequest.email,
                contactRequest.phone,
                contactRequest.subject,
                contactRequest.message,
            ]);
        });

        this.table.draw(); // Redibujar la tabla con los nuevos datos
    }


}

const view= new ManageContactRequestView(new ContactRequestService());
view.render();

export default view;