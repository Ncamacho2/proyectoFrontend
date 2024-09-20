<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['image'])) {
        $uploadDir = '../img/image_services/';
        // Asegúrate de que el directorio existe
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Obtener la extensión del archivo
        $fileExtension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

        // Crear un nuevo nombre para el archivo con fecha y hora (timestamp)
        $timestamp = date('Ymd_His'); // Formato: AñoMesDia_HoraMinutoSegundo
        $originalFileName = pathinfo($_FILES['image']['name'], PATHINFO_FILENAME); // Nombre original sin extensión
        $newFileName = 'service-' . $timestamp . '-' . $originalFileName . '.' . $fileExtension;

        // Ruta completa del archivo a subir
        $uploadFile = $uploadDir . $newFileName;

        // Mover el archivo a la carpeta de destino
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
            // URL pública del archivo subido
            $fileUrl = '/proyectoFrontend/img/image_services/' . $newFileName;
            echo json_encode(['url' => $fileUrl]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al subir el archivo']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'No se ha proporcionado ningún archivo']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método de solicitud no permitido']);
}
?>