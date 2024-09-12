import ContactRequest from '../entities/ContactRequest.js';

class ContactRequestService {
    constructor() {
        this.contactRequests = JSON.parse(localStorage.getItem('contactRequests')) || []; // Obtener solicitudes de contacto del localStorage o un array vacío
    }

    // Crear una nueva solicitud de contacto
    createContactRequest(id_user, names, lastnames, address, phone) {
        const newContactRequest = new ContactRequest(
            this.contactRequests.length + 1,
            id_user,
            names,
            lastnames,
            address,
            phone
        );
        this.contactRequests.push(newContactRequest);
        this.saveContactRequests();
    }

    // Obtener todas las solicitudes de contacto
    getContactRequests() {
        return this.contactRequests;
    }

    // Guardar las solicitudes de contacto en localStorage
    saveContactRequests() {
        localStorage.setItem('contactRequests', JSON.stringify(this.contactRequests));
    }
}

export default new ContactRequestService();