class MedicalServiceRequest {
    constructor(id, id_user, id_medical_service, date, is_active, was_done, rate, rate_title, rate_description, show_rate) {
        this.id = id;
        this.id_user = id_user;
        this.id_medical_service = id_medical_service;
        this.date = new Date(date);
        this.is_active = is_active;
        this.was_done = was_done;
        this.rate = rate; // Entero de 1 a 5
        this.rate_title = rate_title;
        this.rate_description = rate_description;
        this.show_rate = show_rate;
    }

    // Método para marcar como completada una solicitud
    completeService() {
        this.was_done = true;
        this.is_active = false;
    }

    // Método para calificar el servicio
    rateService(rate, title, description) {
        this.rate = rate;
        this.rate_title = title;
        this.rate_description = description;
        this.show_rate = true;
    }
}