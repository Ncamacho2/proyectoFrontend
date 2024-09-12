import User from '../entities/User.js';

class UserService {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || this.loadInitialData();
    }

    loadInitialData() {
        const initialUsers = [{
                id: 1,
                names: "Juan",
                lastnames: "Pérez",
                document: "12345678",
                phone: "3001234567",
                address: "123 Calle Falsa",
                birth_date: "1980-01-01",
                is_active: true,
                is_authenticated: false
            },
            {
                id: 2,
                names: "María",
                lastnames: " Gómez",
                document: "87654321",
                phone: "300890123",
                address: "456 Calle Real",
                birth_date: "1990-02-02",
                is_active: true,
                is_authenticated: false
            }
        ];
        localStorage.setItem('users', JSON.stringify(initialUsers)); // Guardar los usuarios iniciales en localStorage
        return initialUsers;
    }

    // Crear un nuevo usuario
    createUser(id_role, document_type, document, image_url, names, lastnames, address, phone, birth_date) {
        const newUser = new User(
            this.users.length + 1,
            id_role,
            document_type,
            document,
            image_url,
            names,
            lastnames,
            address,
            phone,
            birth_date,
            true, // is_active
            false // is_authenticated
        );
        this.users.push(newUser);
        this.saveUsers();
    }

    // Obtener todos los usuarios
    getUsers() {
        return this.users;
    }

    // Obtener usuario por ID
    getUserById(id) {
        return this.users.find(user => user.id == id);
    }

    // Editar un usuario
    updateUser(id, updatedUserData) {
        const index = this.users.findIndex(user => user.id == id);
        if (index !== -1) {
            this.users[index] = {...this.users[index], ...updatedUserData };
            this.saveUsers();
        }
    }

    // Eliminar un usuario
    deleteUser(id) {
        this.users = this.users.filter(user => user.id != id);
        this.saveUsers();
    }

    // Guardar los usuarios en localStorage
    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
}

export default new UserService();