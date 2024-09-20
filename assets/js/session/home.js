const user = JSON.parse(localStorage.getItem('login_success')) || false

/* AUTENTICACIONES */
if (!user) {
    window.location.href = '../login.html'
}

const logout = document.querySelector('#logout')

/* CERRAR SESIÓN */
logout.addEventListener('click', () => {
    Swal.fire({
        title: `Hasta Pronto, ${user.name}`,
        icon: 'info'
    }).then((result) => {
        window.location.href = '../index.html'
        localStorage.removeItem('login_success')
    })
    
})