const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    
    /* VALIDACIÓN */
    const validUser = Users.find(user => user.email === email && user.password === password)

    if(!validUser){
        return alert("Usuario y/o contraseña incorrectos")
    }

    /* INICIO DE SESIÓN ADMINISTRADOR */
    if(validUser.rol === true){
        Swal.fire({
            title: `Bienvenido a MedyPlus Admin ${validUser.name}`,
            icon: 'info'
        }).then((result) => {
            window.location.href = 'Admin/homeAdmin.html'
            localStorage.setItem('login_success', JSON.stringify(validUser))
        })
    }

    /* INICIO DE SESIÓN CLIENTE */
    Swal.fire({
        title: `Bienvenido a MedyPlus ${validUser.name}`,
        icon: 'info'
    }).then((result) => {
        window.location.href = 'Users/homeUser.html'
        localStorage.setItem('login_success', JSON.stringify(validUser))
    })

    
    
})
