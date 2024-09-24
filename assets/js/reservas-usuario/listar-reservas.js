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
