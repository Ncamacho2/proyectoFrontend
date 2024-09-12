import MedicalService from '../entities/MedicalService.js';

class MedicalServiceService {
    constructor() {
        this.medicalServices = JSON.parse(localStorage.getItem('medicalServices')) || []; // Obtener servicios médicos del localStorage o un array vacío
    }

    // Crear un nuevo servicio médico
    createMedicalService(name, short_description, main_image_url, secondary_image_url, is_featured) {
        const newMedicalService = new MedicalService(
            this.medicalServices.length + 1,
            name,
            short_description,
            main_image_url,
            secondary_image_url,
            is_featured
        );
        this.medicalServices.push(newMedicalService);
        this.saveMedicalServices();
    }

    // Obtener todos los servicios médicos
    getMedicalServices() {
        return this.medicalServices;
    }

    // Obtener un servicio médico por ID
    getMedicalServiceById(id) {
        return this.medicalServices.find(service => service.id === id);
    }

    // Editar un servicio médico
    updateMedicalService(id, updatedServiceData) {
        const index = this.medicalServices.findIndex(service => service.id === id);
        if (index !== -1) {
            this.medicalServices[index] = {...this.medicalServices[index], ...updatedServiceData };
            this.saveMedicalServices();
        }
    }

    // Eliminar un servicio médico
    deleteMedicalService(id) {
        this.medicalServices = this.medicalServices.filter(service => service.id !== id);
        this.saveMedicalServices();
    }

    // Guardar los servicios médicos en localStorage
    saveMedicalServices() {
        localStorage.setItem('medicalServices', JSON.stringify(this.medicalServices));
    }
}

export default new MedicalServiceService();