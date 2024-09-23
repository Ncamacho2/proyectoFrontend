export default class Reservation {

    id;
    createdAt;
    professionalId;

    constructor(patientName, serviceType, date, time, diagnostic) {
        this.patientName = patientName;
        this.serviceType = serviceType;
        this.date = date;
        this.time = time;
        this.diagnostic = diagnostic;
    }
}
