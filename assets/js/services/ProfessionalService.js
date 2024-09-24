export default class ProfessionalService {

    professionals = [];

    constructor() {
        this.professionals = JSON.parse(localStorage.getItem("professionals")) || [];
    }

    // Obtener todas los profesionales
    all() {
        return new Promise((resolve) => {
            this.professionals = JSON.parse(localStorage.getItem('professionals')) || [];
            resolve(this.professionals);
        });
    }

    // Guardar profesionales en local storage
    saveProfessionals(professionals) {
        localStorage.setItem('professionals', JSON.stringify(professionals))
    }
}
