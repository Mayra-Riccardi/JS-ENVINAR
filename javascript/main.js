//API
vinosAPI()
let VINOS = [];//variable para almacenar los vinos de JSON

// Funcion para JSON Local
function vinosAPI(){
    const URLGET="javascript/vinos.json"
    fetch(URLGET)
        .then((resultado) => resultado.json())
        .then((info)=>{
            VINOS=info.VINOS;
            imprimirVinosEnHTML(VINOS)
        })    
}
//ASOCIAR LAS CARDS AL ARRAY - imprimir con js
function imprimirVinosEnHTML(array) {
    let cards = document.getElementById("cards2");
    // Recorro array
    cards.innerHTML = ""
    for (const vino of array) {
        let card = document.createElement("div");//contenedor para almacenar cada card}
    card.innerHTML = `  
                      <div class="card mb-3" style="max-width: 540px;">
                      <div class="row no-gutters">
                        <div class="col-md-4">
                        <a href="${vino.link}"><img src="${vino.img}" alt="" class="img-card">
                        </a>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <a class="nav-link link-nav" href="${vino.link}"><h5 class="card-title">${vino.nombre} - ${vino.cosecha}</h5></a>
                            <p class="card-text">${vino.bodega}\n ${vino.region}</p>
                            <p class="card-text"><small class="text-muted">${vino.tipo} - ${vino.uva}</p>
                            </div>
                        </div>
                      </div>
                    </div>   
                    `
    
    cards.appendChild(card);
      }
}


//FILTROS BUSQUEDAS DE VINOS
//Busqueda de vino por nombre
let formulario = document.querySelector("#formulario");
let boton = document.querySelector("#boton");
let resultado = document.querySelector("#resultado")

const filtrarNombre = () =>{
    //console.log(formulario.value);
    resultado.innerHTML = ""
    const texto = formulario.value.toUpperCase()
    for(const vino of VINOS){
        let nombre = vino.nombre.toUpperCase();
        if (nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <li class="list-group-item">
            <a class="nav-link" href="${vino.link}">${vino.nombre} - ${vino.uva}</a>
            </li>  
            `
        } 
    }
    if (!texto){
        resultado.innerHTML=''
    }
}
formulario.addEventListener("keyup",filtrarNombre)


//Bsuqueda de vinos por filtro tipo
function filtrarVino (tipoVino){
    let tipo = []    
    tipo = VINOS.filter(vino => vino.tipo === tipoVino)
        return tipo; 
    }
    
    
    let checkbox1 = document.getElementById("customRadio1")
    let checkbox2 = document.getElementById("customRadio2")
    let checkbox3 = document.getElementById("customRadio3")
    checkbox1.onclick = () => imprimirVinosEnHTML(VINOS);
    checkbox2.onclick = () => imprimirVinosEnHTML(filtrarVino("TINTO"));
    checkbox3.onclick = () => imprimirVinosEnHTML(filtrarVino("BLANCO"));
    

//Filtro de vino por uvas
function filtrarUvas(tipoUva){
    let resultado=[];
    for(const vino of VINOS){
        if(vino.uva==tipoUva){
            resultado.push(vino);
        }
    }
    return resultado;
}

//CHECKBOX UVAS
let check1 = document.getElementById("inlineCheckbox1")
let check2 = document.getElementById("inlineCheckbox2")
let check3 = document.getElementById("inlineCheckbox3")
let check4 = document.getElementById("inlineCheckbox4")
let check5 = document.getElementById("inlineCheckbox5")
let check6 = document.getElementById("inlineCheckbox6")
let check7 = document.getElementById("inlineCheckbox7")
let check8 = document.getElementById("inlineCheckbox8")


check1.onchange = () =>{
    check1.checked
    imprimirVinosEnHTML(filtrarUvas("MALBEC"));
    
}

check2.onchange = () =>{
    check2.checked
    imprimirVinosEnHTML(filtrarUvas("MERLOT"));
}

check3.onchange = () =>{
    check3.checked
    imprimirVinosEnHTML(filtrarUvas("CABERNET FRANC"));
}

check4.onchange = () =>{
    check4.checked
    imprimirVinosEnHTML(filtrarUvas("CABERNET SOUVIGNON"));
}

check5.onchange = () =>{
    check5.checked
    imprimirVinosEnHTML(filtrarUvas("PINOT NOIR"));
}

check6.onchange = () =>{
    check6.checked
    imprimirVinosEnHTML(filtrarUvas("SEMILLON"));
}

check7.onchange = () =>{
    check7.checked
    imprimirVinosEnHTML(filtrarUvas("TORRONTES"));
}

check8.onchange = () =>{
    check8.checked
    imprimirVinosEnHTML(filtrarUvas("CHARDONNAY"));
}