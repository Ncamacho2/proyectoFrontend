import Service from "./entities/Service.js";
import Professional from "./entities/Professional.js";
import ProfessionalService from "./services/ProfessionalService.js";
import ServiceService from "./services/ServiceService.js";


export default class AppBoot {

    constructor() {
        if (!localStorage.getItem('firstBoot')) {
            this.runSeeders();
            localStorage.setItem('firstBoot', true);
        }
    }

    runSeeders() {
        const defaultServices = [
            new Service(1, 'Cuidados de pacientes', 'Servicio dedicado al cuidado integral de pacientes.', 50000),
            new Service(2, 'Teleconsulta', 'Consultas médicas a distancia mediante tecnología.1', 30000),
            new Service(3, 'Enfermería y control', 'Servicios de enfermería y monitoreo de salud.', 40000),
            new Service(4, 'Exámenes de laboratorio', 'Análisis clínicos y estudios de laboratorio.', 25000),
            new Service(5, 'Atención materna e infantil', 'Cuidado especializado para madres y niños.', 60000),
            new Service(5, 'Servicios de emergencia', 'Atención inmediata en situaciones de emergencia.', 100000),
        ];

        const defaultProfessionals = [
            new Professional(1727041505,'Arturo Balbuena', (new Date()).toJSON()),
            new Professional(1726971130, 'Alejandra Herrera', (new Date()).toJSON()),
            new Professional(1726971134, 'Miguel Castañeda', (new Date()).toJSON()),
            new Professional(1726971139, 'Sara Fernandez', (new Date()).toJSON()),
            new Professional(1726971135, 'Samantha Vasquez', (new Date()).toJSON()),
        ];

        (new ProfessionalService()).saveProfessionals(defaultProfessionals);

        ServiceService.servicios = defaultServices;
        ServiceService.guardarServicios();
        console.log('Cargue de información de la aplicación satisfactoria!');
    }
}
