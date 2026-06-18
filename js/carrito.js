import { setLocalStorage } from "./moduloLocalStorage.js"
import { getLocalStorage } from "./moduloLocalStorage.js"

window.addEventListener("load", iniciarCarrito)

function iniciarCarrito(){
    const listaCarrito = document.getElementById("lista-carrito")

    const productos = getLocalStorage("products")


}
















const li = document.createElement("li")
li.classList.add("list-group-item", "text-light", "d-flex", "align-items-center", "border-secondary", "lista-dark-purple")

const div = document.createElement("div")
div.classList.add("d-flex", "align-items-center")

const img = new Image(50,50)
img.src = "img/Pala.jpg"
img.alt = "Pala"
img.height = 50
img.classList.add("me-3")
const producto ={
    nombre: "Pala",
    imagen: img,
    cantidad: 1,
    precio: 20
}

const h6 = document.createElement("h6")
h6.classList.add("mb-0")
h6.textContent = producto.nombre

div.appendChild(img)
div.appendChild(h6)

const divBoton = document.createElement("div")
divBoton.classList.add("d-flex", "align-items-center", "gap-2", "ms-auto")

const spanCantidad = document.createElement("span")
spanCantidad.classList.add("badge", "rounded-pill", "bg-secondary", "text-light", "px-3", "py-2")
spanCantidad.textContent = producto.cantidad

const btnMenos = document.createElement("button")
const menos = document.createElement("i")
btnMenos.classList.add("btn", "btn-sm", "btn-outline-light")
menos.classList.add("bi", "bi-dash-lg")
btnMenos.append(menos)


const spanPrecio = document.createElement("span")
spanPrecio.classList.add("badge", "bg-secondary", "rounded-pill", "ms-4")
spanPrecio.textContent = `$${producto.precio}`

const btnMas = document.createElement("button")
const mas = document.createElement("i")
btnMas.classList.add("btn", "btn-sm", "btn-outline-light")
mas.classList.add("bi", "bi-plus-lg")
btnMas.append(mas)


divBoton.appendChild(btnMenos)
divBoton.appendChild(spanCantidad)
divBoton.appendChild(btnMas)
divBoton.appendChild(spanPrecio)

li.appendChild(div)
li.appendChild(divBoton)

function restar(cantidad){
    cantidad.textContent = Number(cantidad.textContent)-1
}

function sumar(cantidad){
    cantidad.textContent = Number(cantidad.textContent)+1
}

listaCarrito.appendChild(li)