class User {
    constructor(id, id_role, document_type, document, image_url, names, lastnames, address, phone, birth_date, is_active, is_authenticated) {
        this.id = id;
        this.id_role = id_role;
        this.document_type = document_type;
        this.document = document;
        this.image_url = image_url;
        this.names = names;
        this.lastnames = lastnames;
        this.address = address;
        this.phone = phone;
        this.birth_date = new Date(birth_date);
        this.is_active = is_active;
        this.is_authenticated = is_authenticated;
    }

    // Método para activar un usuario
    activateUser() {
        this.is_active = true;
    }

    // Método para autenticar un usuario
    authenticateUser() {
        this.is_authenticated = true;
    }
}


export default User;