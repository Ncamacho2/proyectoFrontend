const signupForm = document.querySelector('#signupForm')

signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value
    const date = document.querySelector('#date').value
    const numberDoc = document.querySelector('#numberDoc').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const rol = false

    const Users = JSON.parse(localStorage.getItem('users')) || []
    
    /* VALIDACIÓN */
    const isUserRegistered = Users.find(user => user.email === email)

    if(isUserRegistered){
        return alert('El usuario ya está registrado!')
    }

    /* AGREGAR USUARIO */
    Users.push({name: name, date: date, numberDoc: numberDoc, email: email, password:password, rol: rol})
    localStorage.setItem('users', JSON.stringify(Users))
    
    /* ALERTA */
    Swal.fire({
        title: `Registro Exitoso!`,
        icon: 'success'
    }).then((result) => {
        window.location.href = 'login.html'
    })

    signupForm.innerHTML = ""

})