const serviciosDePrueba = [
  {
    id: 1,
    nombre: "Cuidados de pacientes",
    descripcion: "Servicio dedicado al cuidado integral de pacientes.",
    costo: 50000,
  },
  {
    id: 2,
    nombre: "Teleconsulta",
    descripcion: "Consultas médicas a distancia mediante tecnología.",
    costo: 30000,
  },
  {
    id: 3,
    nombre: "Enfermería y control",
    descripcion: "Servicios de enfermería y monitoreo de salud.",
    costo: 40000,
  },
  {
    id: 4,
    nombre: "Exámenes de laboratorio",
    descripcion: "Análisis clínicos y estudios de laboratorio.",
    costo: 25000,
  },
  {
    id: 5,
    nombre: "Atención materna e infantil",
    descripcion: "Cuidado especializado para madres y niños.",
    costo: 60000,
  },
  {
    id: 6,
    nombre: "Servicios de emergencia",
    descripcion: "Atención inmediata en situaciones de emergencia.",
    costo: 100000,
  },
];

localStorage.setItem("servicios", JSON.stringify(serviciosDePrueba));
function cargarServicios() {
  const servicios = JSON.parse(localStorage.getItem("servicios")) || [];

  const tbody = document.querySelector("#mis-reservas tbody");

  tbody.innerHTML = "";

  servicios.forEach((servicio) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
            <td>${servicio.id}</td>
            <td>${servicio.nombre}</td>
            <td>${servicio.descripcion}</td>
            <td>${servicio.costo}</td>
        `;

    tbody.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", cargarServicios);
