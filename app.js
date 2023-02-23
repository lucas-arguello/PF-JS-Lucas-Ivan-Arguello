//1
const contenedorPlantas = document.getElementById("contenedor-plantas");
//2
const contenedorCarrito = document.getElementById("carrito-contenedor");

//7 Actualizar el precio total y luego agrego el contador en el actualizador del carrito.

const precioTotal = document.getElementById("precioTotal")


//2
let carrito = [];

document.addEventListener(`DOMContentLoaded`, ( ) => {
    if (localStorage.getItem(`carrito`)){
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        actualizCarrito()
    }
})

//archivo JSON
fetch("datos.json")
    .then(respuesta => respuesta.json())
    .then(info => {
       // console.log(info)
       //grupoPlantas proviene de stock.js
       grupoPlantas = info
       pintarCard(grupoPlantas)
    })
    .catch(error => console.log(error))

//1 
const pintarCard = () => {

    grupoPlantas.forEach((plantas) => {
        const {id, categoria, nombre, descr, precio, img} = plantas
        const div = document.createElement('div')
        div.classList.add('plantas')
        div.innerHTML = `
            <img src=${img} alt= "">
            <h3>${categoria} ${nombre}</h3>
            <p></p>
            <p>${descr}</p>
            <p class="precioProducto">Precio:$ ${precio}</p>
            <button id="agregar${id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        contenedorPlantas.appendChild(div)
    
        //3
        const btnAgregar = document.getElementById(`agregar${id}`)
        btnAgregar.addEventListener("click", () => {

               alerta()        
            agregarAlCarrito(id)
        })
    })

}



//2
const agregarAlCarrito = (prodId) =>{
    //comprobamos si el tipo de planta ya existe 
    const existe = carrito.some(prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map ( prod => {
            
            prod.id === prodId ? prod.cantidad++ : false
        })

    } else {
        //el id del array coincida con el id que llega por parametro
    const item = grupoPlantas.find((prod) => prod.id === prodId)
    carrito.push(item)
    console.log(carrito)

    }

    
    
    actualizCarrito()
    
}


//3
const actualizCarrito = () =>{

    // actualizo el carrito
    contenedorCarrito.innerHTML = "";
    carrito.forEach((produc) => {

        const {id, nombre, cantidad, precio} = produc
        const div = document.createElement("div");
        div.classList.add("productoEnCarrito")
        div.innerHTML = `
        <p>${nombre}</p>
        <p>Precic: ${precio}</p>
        <p>Cantidad: <span id="cantidad">${cantidad}</span></p>
        <button id="eliminarDelCarrito${id}" class ="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem(`carrito`, JSON.stringify(carrito))

        //4 boton vaciar carrito 
        const btnElimDelCarrito = document.getElementById(`eliminarDelCarrito${id}`)
        btnElimDelCarrito.addEventListener("click", () => {
            eliminarDelCarrito(id)
             

    
        })
    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acum, prod) => acum + prod.precio * prod.cantidad, 0 )
    })

    
}

//6
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    // encuentra el indice y borra uno
    carrito.splice(indice, 1)
    
    //pinto el carrito 
    actualizCarrito()
}

//Boton vaciar carrito

const botonVaciar = document.getElementById("vaciar-carrito");

botonVaciar.addEventListener("click", () =>{
    carrito.length = 0
    actualizCarrito()
    precioTotal.innerText = carrito.reduce((acum, prod) => acum + prod.precio * 0, 0 )
})

const alerta = () => {
    Toastify({
        text: "El producto fue agregado",
        duration: 2000,
        gravity: "top",
        //position: "right",
        offset:{
            x:80,
            y:70,
        },
        style: {
            color: "rgb(223, 221, 183)",
            background: "linear-gradient(rgba(100, 150, 226, 0.7),rgba(7, 84, 12, 0.7))",
            borderRadius: "25%",
            border: "ipx solid black"
        }
    }).showToast()
}

//5 Contador del carrito- accedo y luego agrego el contador en el actualizador del carrito.
const contadorCarrito = document.getElementById("contadorCarrito");

//Modal del carrito

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    event.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})