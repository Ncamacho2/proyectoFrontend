const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []

    /* VALIDACIÓN */
    const validUser = Users.find(user => user.email === email && user.password === password)

    if (!validUser) {
        return Swal.fire({
            title: `Usuario y/o contraseña incorrectos`,
            icon: 'error'
        }).then((result) => {
            window.location.href = 'login.html'
        })

    }

    /* INICIO DE SESIÓN ADMINISTRADOR */
    if (validUser.rol === true) {
        Swal.fire({
            title: `Bienvenido a MedyPlus Admin ${validUser.names}`,
            icon: 'info'
        }).then((result) => {
            window.location.href = 'gestion-servicios.html'
            localStorage.setItem('login_success', JSON.stringify(validUser))
            localStorage.setItem('isAuthenticated', 'true');
        })
    }

    /* INICIO DE SESIÓN CLIENTE */
    Swal.fire({
        title: `Bienvenido a MedyPlus ${validUser.names}`,
        icon: 'info'
    }).then((result) => {
        window.location.href = 'gestion-perfil.html'
        localStorage.setItem('login_success', JSON.stringify(validUser))
        localStorage.setItem('isAuthenticated', 'true');
    })



})