import Role from '../entities/Role.js';

class RoleService {
    constructor() {
        this.roles = JSON.parse(localStorage.getItem('roles')) || []; // Obtener roles del localStorage o un array vacío
    }

    // Crear un nuevo rol
    createRole(name, role_system_name) {
        const newRole = new Role(this.roles.length + 1, name, role_system_name);
        this.roles.push(newRole);
        this.saveRoles();
    }

    // Obtener todos los roles
    getRoles() {
        return this.roles;
    }

    // Guardar los roles en localStorage
    saveRoles() {
        localStorage.setItem('roles', JSON.stringify(this.roles));
    }
}

export default new RoleService();