// chequeo de usuario logueado
let nombreUsuarioActivo=document.getElementById("nombreUsuarioActivo");
let usuarioRegistrado=sessionStorage.getItem("usuarioActivo");
let logoUsuario = document.getElementById("logoUsuario")
if(usuarioRegistrado){
    nombreUsuarioActivo.style.fontSize="14px";
    nombreUsuarioActivo.style.fontFamily='Rubik';
    nombreUsuarioActivo.style.fontStyle='nomal'
    nombreUsuarioActivo.style.fontWeight='200'
    nombreUsuarioActivo.style.color="white";
    nombreUsuarioActivo.style.paddingBottom="2px";
    let nombreUsuario=JSON.parse(usuarioRegistrado).nombre
    let apellidoUsuario=JSON.parse(usuarioRegistrado).apellido
    nombreUsuarioActivo.innerHTML=`
    <div class="dropdown"> 
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">${nombreUsuario.toUpperCase()}${" "}${apellidoUsuario.toUpperCase()}</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" id="sesion-item" href="#">Cerrar Sesión</a>
    </div>
    </div>

    `
    logoUsuario.remove()
}

//DESLOGUEO DE USUARIO

botonCerrarSesion = document.getElementById("sesion-item")

botonCerrarSesion.onclick = () => {
    Swal.fire({
        title: 'Estas seguro que deseas cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, salir!'
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.clear()
          Swal.fire({
            title:'Hasta pronto',
            icon:'success',
        })
          window.location="../index.html"
        }
      })
    
}