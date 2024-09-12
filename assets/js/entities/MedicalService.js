class MedicalService {
    constructor(id, name, short_description, main_image_url, secondary_image_url, is_featured) {
        this.id = id;
        this.name = name;
        this.short_description = short_description;
        this.main_image_url = main_image_url;
        this.secondary_image_url = secondary_image_url;
        this.is_featured = is_featured;
    }

    // Método para destacar un servicio
    featureService() {
        this.is_featured = true;
    }
}