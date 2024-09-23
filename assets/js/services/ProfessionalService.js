import Professional from "../entities/Professional.js";

export default class ProfessionalService {

    professionals = [];

    constructor() {
        this.professionals = JSON.parse(localStorage.getItem("professionals")) || [];
    }

    // Obtener todas los profesionales
    all() {
        return new Promise((resolve, reject) => {
            this.professionals = JSON.parse(localStorage.getItem('professionals')) || [];
            resolve(this.professionals);
        });
    }

    // Cargue masivo de profesionales por defecto
    uploadDefault() {
        return new Promise(async (resolve) => {
            await this.all().then((professionals) => {
                this.professionals = professionals;
                if (this.professionals.length < 1) {
                    this.professionals = [
                        new Professional(1727041505,'Arturo Balbuena', (new Date()).toJSON()),
                        new Professional(1726971130, 'Alejandra Herrera', (new Date()).toJSON()),
                        new Professional(1726971134, 'Miguel Castañeda', (new Date()).toJSON()),
                        new Professional(1726971139, 'Sara Fernandez', (new Date()).toJSON()),
                        new Professional(1726971135, 'Samantha Vasquez', (new Date()).toJSON()),
                    ];

                    this.saveProfessionals(this.professionals);
                }
            });

            resolve(this.professionals);
        });
    }



    // Guardar profesionales en local storage
    saveProfessionals(professionals) {
        localStorage.setItem('professionals', JSON.stringify(professionals))
    }
}