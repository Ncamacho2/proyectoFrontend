function cargarServicios() {
  const reservations = JSON.parse(localStorage.getItem("reservations"));
  const nombre = JSON.parse(localStorage.getItem("login_success"));

  const tbody = document.querySelector("#mis-reservas tbody");

  tbody.innerHTML = "";
  const filtrados = reservations.filter(reservations => reservations.patientName == nombre.names)
  console.log(filtrados)
  console.log(filtrados)

  filtrados.forEach((reservations) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
            <td>${reservations.id}</td>
            <td>${reservations.serviceType}</td>
            <td>${reservations.diagnostic}</td>
            <td>${reservations.date}</td>
            <td>${reservations.time}</td>
        `;

    tbody.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", cargarServicios);

