import UserService from '../services/UserService.js';


class UserView {
    constructor() {
        this.table = $('#usersTable').DataTable({
            columns: [
                { title: "ID" },
                { title: "Nombre Completo" },
                { title: "Documento" },
                { title: "Teléfono" },
                { title: "Acciones" }
            ]
        });

        this.renderUsers();
        // Botón para crear usuario
        document.getElementById('createUserBtn').addEventListener('click', () => {
            this.createUser();
        });
    }

    renderUsers() {
        const users = UserService.getUsers();
        this.table.clear(); // Limpiar la tabla antes de agregar nuevos datos
        users.forEach(user => {
            this.table.row.add([
                user.id,
                `${user.names} ${user.lastnames}`,
                user.document,
                user.phone,
                `<button class="edit-button" data-id="${user.id}">Editar</button>
                 <button class="delete-button" data-id="${user.id}">Eliminar</button>`
            ]);
        });
        this.table.draw(); // Redibujar la tabla con los nuevos datos

        // Agregar eventos a los botones de edición y eliminación
        this.addEventListeners();
    }

    addEventListeners() {
        // Manejar la edición de usuarios
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.target.getAttribute('data-id');
                this.editUser(userId);
            });
        });

        // Manejar la eliminación de usuarios
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.target.getAttribute('data-id');
                this.deleteUser(userId);
            });
        });
    }

    // Función para crear un nuevo usuario usando SweetAlert2
    createUser() {
        Swal.fire({
            title: 'Crear Nuevo Usuario',
            html: `<input id="swal-names" class="swal2-input" placeholder="Nombres">
                 <input id="swal-lastnames" class="swal2-input" placeholder="Apellidos">
                 <input id="swal-document" class="swal2-input" placeholder="Documento">
                 <input id="swal-phone" class="swal2-input" placeholder="Teléfono">
                 <input id="swal-address" class="swal2-input" placeholder="Dirección">
                 <input id="swal-birth_date" class="swal2-input" type="date" placeholder="Fecha de Nacimiento">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const names = document.getElementById('swal-names');
                const lastnames = document.getElementById('swal-lastnames');
                const documentId = document.getElementById('swal-document');
                const phone = document.getElementById('swal-phone');
                const address = document.getElementById('swal-address');
                const birth_date = document.getElementById('swal-birth_date');

                if (!names || !lastnames || !documentId || !phone || !address || !birth_date) {
                    Swal.showValidationMessage(`Por favor, rellena todos los campos`);
                    return false;
                }

                return {
                    names: names.value,
                    lastnames: lastnames.value,
                    documentId: documentId.value,
                    phone: phone.value,
                    address: address.value,
                    birth_date: birth_date.value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.createUser(
                    1, // ID del role
                    1, // Tipo de documento
                    result.value.documentId,
                    null, // Image URL
                    result.value.names,
                    result.value.lastnames,
                    result.value.address,
                    result.value.phone,
                    result.value.birth_date
                );
                this.renderUsers(); // Redibujar la tabla con el nuevo usuario
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario creado',
                    text: `El usuario ${result.value.names} ${result.value.lastnames} ha sido creado exitosamente.`
                });
            }
        });
    }

    // Función para editar un usuario
    editUser(userId) {
        const user = UserService.getUserById(userId);
        Swal.fire({
            title: 'Editar Usuario',
            html: `<input id="swal-names" class="swal2-input" value="${user.names}" placeholder="Nombres">
                 <input id="swal-lastnames" class="swal2-input" value="${user.lastnames}" placeholder="Apellidos">
                 <input id="swal-document" class="swal2-input" value="${user.document}" placeholder="Documento">
                 <input id="swal-phone" class="swal2-input" value="${user.phone}" placeholder="Teléfono">
                 <input id="swal-address" class="swal2-input" value="${user.address}" placeholder="Dirección">
                 <input id="swal-birth_date" class="swal2-input" type="date" value="${user.birth_date}" placeholder="Fecha de Nacimiento">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const names = document.getElementById('swal-names');
                const lastnames = document.getElementById('swal-lastnames');
                const documentId = document.getElementById('swal-document');
                const phone = document.getElementById('swal-phone');
                const address = document.getElementById('swal-address');
                const birth_date = document.getElementById('swal-birth_date');

                if (!names || !lastnames || !document || !phone || !address || !birth_date) {
                    Swal.showValidationMessage(`Por favor, rellena todos los campos`);
                    return false;
                }

                return {
                    names: names.value,
                    lastnames: lastnames.value,
                    documentId: documentId.value,
                    phone: phone.value,
                    address: address.value,
                    birth_date: birth_date.value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.updateUser(userId, result.value); // Actualizar el usuario
                this.renderUsers(); // Redibujar la tabla con los cambios
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario actualizado',
                    text: `El usuario ${result.value.names} ${result.value.lastnames} ha sido actualizado exitosamente.`
                });
            }
        });
    }

    // Función para eliminar un usuario
    deleteUser(userId) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.deleteUser(userId); // Eliminar el usuario
                this.renderUsers(); // Redibujar la tabla sin el usuario
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'El usuario ha sido eliminado.'
                });
            }
        });
    }
}

export default new UserView();