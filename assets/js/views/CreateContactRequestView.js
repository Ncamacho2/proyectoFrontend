import ContactRequestService from "../services/ContactRequestService.js";
import ContactRequest from "../entities/ContactRequest.js";

class CreateContactRequestView {

    constructor(service) {
        this.service = service;
    }

    // Relacionar evento con elemento del body
    render() {
        document.addEventListener('DOMContentLoaded', () => {
            $('#contactForm').on('submit', event => {
                event.preventDefault();
                this.createContactRequest();
            })
        });
    }

    // Crear una solicitud de contácto
    createContactRequest() {
        let contactRequest = new ContactRequest(
            $('#name').val(),
            $('#email').val(),
            $('#phone').val(),
            $('#subject').val(),
            $('#message').val(),
        );

        this.service.create(contactRequest).then(() => {
            Swal.fire({
                title: "Solicitud Creada con éxito",
                icon: "success"
            });

            $('#contactForm').trigger('reset');
        }).catch(error => {
            let errText = 'Por favor vuelve a intentarlo';
            if (error.status === 422) {
                errText = error.message;
            }

            Swal.fire({
                title: "UPS! Error al crear la solicitud de contácto",
                text: errText,
                icon: "error"
            });
        });
    }
}

const view = new CreateContactRequestView(new ContactRequestService());
view.render();

export default view;