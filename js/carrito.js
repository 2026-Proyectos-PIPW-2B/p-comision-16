const listaCarrito = document.getElementById("lista-carrito")

const img = new Image(50,50)
img.src = "img/Pala.jpg"
img.alt = "Pala"
img.height = 50
img.classList.add("me-3")
const producto ={
    nombre: "Pala",
    imagen: img,
    cantidad: 1,
    precio: "200$"
}

const btnMas = document.createElement("button")
const mas = document.createElement("i")
btnMas.classList.add("btn", "btn-sm", "btn-outline-light")
mas.classList.add("bi", "bi-plus-lg")
btnMas.append(mas)
const btnMenos = document.createElement("button")
const menos = document.createElement("i")
btnMenos.classList.add("btn", "btn-sm", "btn-outline-light")
menos.classList.add("bi", "bi-dash-lg")
btnMenos.append(menos)