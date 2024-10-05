export default class ContactRequestService {

    contactRequest = [];
    constructor() {
        this.contactRequests = JSON.parse(localStorage.getItem('contactRequests')) || []; // Obtener solicitudes de contacto del localStorage o un array vacío
    }

    // Crear una nueva solicitud de contacto
    create(contactRequest) {
        return new Promise(async(resolve, reject) => {
            try {
                this.validateData(contactRequest);
                await this.all();

                contactRequest.id = Date.now();
                contactRequest.createdAt = (new Date()).toJSON();
                this.contactRequests.push(contactRequest);
                localStorage.setItem('contactRequest', JSON.stringify(this.contactRequests));

                resolve(contactRequest);
            } catch (e) {
                reject(e);
            }
        });
    }

    // Validaciones para el formulario de contáctenos
    validateData(contactRequest) {

        const patternEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const patternPhone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
        let err = new Error();
        err.status = 422;

        if (!contactRequest.name || contactRequest.name.length < 4) {
            err.message = 'El Nombre es obligatorio';
            throw err;
        } else if (!contactRequest.email || !patternEmail.test(contactRequest.email)) {
            err.message = 'El Email es obligatorio';
            throw err;
        } else if (!contactRequest.phone || !patternPhone.test(contactRequest.phone)) {
            err.message = 'El Teléfono es obligatorio';
            throw err;
        } else if (!contactRequest.subject || contactRequest.subject.length < 3) {
            err.message = 'El Asunto es obligatorio';
        } else if (!contactRequest.message || contactRequest.message.length < 3) {
            err.message = 'El mensaje es obligatorio';
            throw err;
        }
    }


    // Obtener todas las solicitudes de contacto
    all() {
        return new Promise((resolve)=> {
            this.contactRequest = JSON.parse(localStorage.getItem('contactRequest') || []);
            resolve(this.contactRequest);
        });
    }

    // Guardar las solicitudes de contacto en localStorage
    saveContactRequests() {
        localStorage.setItem('contactRequests', JSON.stringify(this.contactRequests));
    }
}

