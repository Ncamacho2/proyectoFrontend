import DocumentType from '../entities/DocumentType.js';

class DocumentTypeService {
    constructor() {
        this.documentTypes = JSON.parse(localStorage.getItem('documentTypes')) || []; // Obtener tipos de documento del localStorage o un array vacío
    }

    // Crear un nuevo tipo de documento
    createDocumentType(name, abbreviation) {
        const newDocumentType = new DocumentType(this.documentTypes.length + 1, name, abbreviation);
        this.documentTypes.push(newDocumentType);
        this.saveDocumentTypes();
    }

    // Obtener todos los tipos de documento
    getDocumentTypes() {
        return this.documentTypes;
    }

    // Guardar los tipos de documento en localStorage
    saveDocumentTypes() {
        localStorage.setItem('documentTypes', JSON.stringify(this.documentTypes));
    }
}

export default new DocumentTypeService();