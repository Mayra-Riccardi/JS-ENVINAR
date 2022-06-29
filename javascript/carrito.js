let carrito = []

class VinoCarrito {
    constructor(vino) {
        this.img = vino.img;
        this.link = vino.link
        this.id = vino.id;
        this.nombre = vino.nombre;
        this.cosecha = vino.cosecha;
        this.tipo = vino.tipo;
        this.uva = vino.uva;
        this.bodega = vino.bodega;
    }
}
//Funcion para agregar a carrito
function agregarAListaDeDeseos(vinoNuevo){
    let encontrado = carrito.find(vino => vino.id == vinoNuevo.id);
    console.log(encontrado);
    if (encontrado == undefined) {
        let vinoACarrito = new VinoCarrito(vinoNuevo);
        carrito.push(vinoACarrito);
        console.log(carrito);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Vino '+ vinoNuevo.nombre + " " + vinoNuevo.cosecha + ' ha sido agregado tu lista de deseos'
          }).then((result) => {
                window.location="../views/carrito.html";
            })
            sessionStorage.setItem('carrito',JSON.stringify(carrito))
    } else {
        Swal.fire(vinoNuevo.nombre + "-" + vinoNuevo.uva + " ya se encuentra en tu lista de deseos!")
    }
}


//Me fijo si hay usuario activo para que pueda agregar productos
let usuarioActivo=JSON.parse(sessionStorage.getItem("usuarioActivo"))
//Si no hay ususario logueado le pido login
function pedirLogin(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor debes loguearte para poder agregar productos al carrito!'
    })
      }


//Cargar el carrito como tabla en html. Chequeo primero que no devuelva null
if(sessionStorage.getItem("carrito")!=null){
        carrito=JSON.parse(sessionStorage.getItem("carrito"))
        productosAgregados()//cargar array de carrito
    }
    console.log(carrito)
let carritoVacio = document.getElementById("textoCarritoVacio")

//si el carrito esta vacio muestro leyenda de vacio
if(sessionStorage.getItem("carrito")==null || carrito==""){
   carritoVacio.innerHTML= `
        <h5 class="row">No hay Vinos guardados en la Lista de Deseos</h5>
   `
}
     
//funcion de productos agregados - para imprimir los vinos en el carrito
function productosAgregados(){
    for (const vino of carrito){
        document.getElementById("tabla").innerHTML+=(`
            <tr id='fila${vino.id}'>
            <td class="td"><a href="../${vino.link}"> <img src=".${vino.img}"></td>
            <td class="td"> ${vino.nombre} - ${vino.cosecha}</td>
            <td class="td"> ${vino.tipo}</td>
            <td class="td"> ${vino.uva}</td>
            <td class="td"> ${vino.bodega} </td>
            <td><button id="eliminar${vino.id}" type="button" class="btn btn-outline-danger">Eliminar</button></td>
            `)
    }
}



//Evento de boton para elminar del carrito
carrito.forEach(vino => {
    document.getElementById(`eliminar${vino.id}`).addEventListener('click', function(){
    eliminarDelCarrito(vino.id)
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1400,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'warning',
    title: 'Vino '+ vino.nombre + " " + vino.cosecha + ' ha sido eliminado de tu lista de deseos!'
  })
    console.log('funcionaaaa bora el vino con id ' + vino.id)

}) 
});  
   
    
//Funcion para eliminar del carrito
function eliminarDelCarrito(id) {
    console.log("entre en eliminarDelCarrito")
    let carrito = JSON.parse(sessionStorage.getItem("carrito"));
    console.log(`carrito en eliminar storage ${carrito}`);
    // Buscamos el item en el carrito
    let vino = carrito.find((vino) => vino.id === id);
    console.log(`vino devuelto en eliminar del carrito: ${vino.nombre}`)

    let index = carrito.findIndex((element) => {
    if (element.id === vino.id) {
    return true;
               }
    });   
        carrito.splice(index,1); 
        console.log("carrito luego de splice", carrito);
        let fila=document.getElementById(`fila${id}`);
        document.getElementById("tabla").removeChild(fila);

  if(carrito==""){
    carritoVacio.innerHTML= `
        <h5 class="row">No hay Vinos guardados en la Lista de Deseos</h5>
   `
  }

sessionStorage.setItem("carrito",JSON.stringify(carrito));  //actualizo carrito en session      
}