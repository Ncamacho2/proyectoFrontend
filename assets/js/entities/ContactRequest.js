export default class ContactRequest {
    id;
    createdAt;

    constructor(name, email, phone, subject, message) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.subject = subject;
        this.message = message;
    }
}