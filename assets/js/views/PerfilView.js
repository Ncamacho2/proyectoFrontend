import UserService from '../services/UserService.js';


class PerfilView {
    constructor() {

        this.renderUsers();
        // Botón para crear usuario
        document.getElementById('openEditProfileModal').addEventListener('click', () => {
            this.openEditUserModal();
        });
    }

    renderUsers() {
        const users = UserService.getUsers();
        // Agregar eventos a los botones de edición y eliminación
        this.addEventListeners();
    }

    addEventListeners() {

    }

    // Función para abrir modal de edición de usuarios
    openEditUserModal() {
        // Datos actuales del usuario
        const tipoDocumento = document.getElementById('user-tipo-documento').textContent;
        const documento = document.getElementById('user-documento').textContent;
        const nombre = document.getElementById('user-nombre').textContent;
        const email = document.getElementById('user-email').textContent;
        const telefono = document.getElementById('user-telefono').textContent;
        const direccion = document.getElementById('user-direccion').textContent;
        const plan = document.getElementById('user-plan').textContent;

        // Mostrar el modal de SweetAlert2 con los campos para editar
        Swal.fire({
            title: 'Editar Información de Perfil',
            html: `
                <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px;">
    
                    <div style="width: 80%; display: flex; flex-direction: column; align-items: flex-start;">
                        <label for="tipoDocumento" style="font-weight: bold;">Tipo de Documento</label>
                        <input id="tipoDocumento" class="swal2-input" type="text" value="${tipoDocumento}" style="width: 100%;">
                    </div>
    
                    <div style="width: 80%; display: flex; flex-direction: column; align-items: flex-start;">
                        <label for="documento" style="font-weight: bold;">Documento</label>
                        <input id="documento" class="swal2-input" type="text" value="${documento}" style="width: 100%;">
                    </div>
    
                    <div style="width: 80%; display: flex; flex-direction: column; align-items: flex-start;">
                        <label for="nombre" style="font-weight: bold;">Nombre</label>
                        <input id="nombre" class="swal2-input" type="text" value="${nombre}" style="width: 100%;">
                    </div>
    
                    <div style="width: 80%; display: flex; flex-direction: column; align-items: flex-start;">
                        <label for="email" style="font-weight: bold;">Correo Electrónico</label>
                        <input id="email" class="swal2-input" type="email" value="${email}" style="width: 100%;">
                    </div>
    
                    <div style="width: 80%; display: flex; flex-direction: column; align-items: flex-start;">
                        <label for="telefono" style="font-weight: bold;">Teléfono</label>
                        <input id="telefono" class="swal2-input" type="tel" value="${telefono}" style="width: 100%;">
                    </div>
    
                    <div style="width: 80%; display: flex; flex-direction: column; align-items: flex-start;">
                        <label for="direccion" style="font-weight: bold;">Dirección</label>
                        <input id="direccion" class="swal2-input" type="text" value="${direccion}" style="width: 100%;">
                    </div>
    
                    <div style="width: 80%; display: flex; flex-direction: column; align-items: flex-start;">
                        <label for="plan" style="font-weight: bold;">Plan Actual</label>
                        <input id="plan" class="swal2-input" type="text" value="${plan}" style="width: 100%;">
                    </div>
    
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar Cambios',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const tipoDocumentoNuevo = document.getElementById('tipoDocumento').value.trim();
                const documentoNuevo = document.getElementById('documento').value.trim();
                const nombreNuevo = document.getElementById('nombre').value.trim();
                const emailNuevo = document.getElementById('email').value.trim();
                const telefonoNuevo = document.getElementById('telefono').value.trim();
                const direccionNueva = document.getElementById('direccion').value.trim();
                const planNuevo = document.getElementById('plan').value.trim();

                // Validación de los campos (todos los campos son obligatorios)
                if (!tipoDocumentoNuevo || !documentoNuevo || !nombreNuevo || !emailNuevo || !telefonoNuevo || !direccionNueva || !planNuevo) {
                    Swal.showValidationMessage(`Todos los campos son obligatorios`);
                    return false;
                } else if (!validateEmail(emailNuevo)) {
                    Swal.showValidationMessage(`Por favor, introduce un correo electrónico válido`);
                    return false;
                } else {
                    // Actualizar la información en la página (simulación)
                    document.getElementById('user-tipo-documento').textContent = tipoDocumentoNuevo;
                    document.getElementById('user-documento').textContent = documentoNuevo;
                    document.getElementById('user-nombre').textContent = nombreNuevo;
                    document.getElementById('user-email').textContent = emailNuevo;
                    document.getElementById('user-telefono').textContent = telefonoNuevo;
                    document.getElementById('user-direccion').textContent = direccionNueva;
                    document.getElementById('user-plan').textContent = planNuevo;

                    Swal.fire('¡Actualizado!', 'Tu información ha sido actualizada correctamente.', 'success');
                }
            }
        });
    }

    // Función para validar el formato del correo electrónico
    validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }



}

export default new PerfilView();