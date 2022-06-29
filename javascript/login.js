//  Obtengo los datos del usuario guardado en el local Sorage y los guardo en el session storage como usuario activo en la sesion

formularioLogin.addEventListener("submit",login);
let mailRegistrado =document.getElementById("mailRegistrado");

let contraseñaRegistrada =document.getElementById("contraseñaRegistrada");

function login(evento){
    evento.preventDefault();
    let usuarioRegistrado= JSON.parse(localStorage.getItem(mailRegistrado.value));

    if(usuarioRegistrado){
        usuarioRegistrado.contraseña==contraseñaRegistrada.value? iniciarSession():
        Swal.fire({
            icon: 'error',
            title: 'Algo salió mal...',
            text: 'CONTRASEÑA ERRONEA!',
          })
    } else{
        Swal.fire({
            icon: 'error',
            title: 'Algo salió mal...',
            text: 'REVISE MAIL Y CONTRASEÑA!',
          })
    }
}

function iniciarSession(){
    let usuarioRegistradoEnStorage= JSON.parse(localStorage.getItem(mailRegistrado.value));
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioRegistradoEnStorage));
   loginExitoso();
}

function loginExitoso(){
    let timerInterval
    Swal.fire({
    title: 'Login Exitoso',
    html: '',
    timer: 800,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
        window.location="../index.html";
    }
    })
}

