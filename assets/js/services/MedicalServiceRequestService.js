import MedicalServiceRequest from '../entities/MedicalServiceRequest.js';

class MedicalServiceRequestService {
    constructor() {
        this.requests = JSON.parse(localStorage.getItem('medicalServiceRequests')) || []; // Obtener solicitudes del localStorage o un array vacío
    }

    // Crear una nueva solicitud de servicio médico
    createMedicalServiceRequest(id_user, id_medical_service, date) {
        const newRequest = new MedicalServiceRequest(
            this.requests.length + 1,
            id_user,
            id_medical_service,
            date,
            true, // is_active
            false, // was_done
            null, // rate
            null, // rate_title
            null, // rate_description
            false // show_rate
        );
        this.requests.push(newRequest);
        this.saveRequests();
    }

    // Obtener todas las solicitudes de servicios médicos
    getMedicalServiceRequests() {
        return this.requests;
    }

    // Actualizar una solicitud de servicio médico
    updateMedicalServiceRequest(id, updatedRequestData) {
        const index = this.requests.findIndex(request => request.id === id);
        if (index !== -1) {
            this.requests[index] = {...this.requests[index], ...updatedRequestData };
            this.saveRequests();
        }
    }

    // Eliminar una solicitud de servicio médico
    deleteMedicalServiceRequest(id) {
        this.requests = this.requests.filter(request => request.id !== id);
        this.saveRequests();
    }

    // Guardar las solicitudes en localStorage
    saveRequests() {
        localStorage.setItem('medicalServiceRequests', JSON.stringify(this.requests));
    }
}

export default new MedicalServiceRequestService();