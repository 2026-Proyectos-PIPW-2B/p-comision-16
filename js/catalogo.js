import { crearImagen, getLocalStorage, setLocalStorage, startCarrito } from "./moduloLocalStorage.js"
window.addEventListener("load", iniciarCatalogo)

function iniciarCatalogo(){
    startCarrito()
    const productos = getLocalStorage("products")
    const grid = document.getElementById("productos-grid")

    crearCatalogo(productos, grid)
}

function crearCatalogo(productos, grid){
    for(const i in productos){

        const article = document.createElement("article")
        article.classList.add("producto", "col-md-6", "col-lg-4")

        const divCard = document.createElement("div")
        divCard.classList.add("card", "text-light", "border-secondary", "h-100", "d-flex", "flex-column", "shadow-sm")

        const img = crearImagen(productos[i],400,400,["card-img-top"])

        const divCardBody = document.createElement("div")
        divCardBody.classList.add("card-body", "d-flex", "flex-column", "p-2")

        const cardName = document.createElement("h3")
        cardName.textContent = productos[i].nombre
        cardName.classList.add("card-title", "h6", "mb-1")

        const precioProducto = document.createElement("p")
        precioProducto.textContent = `$${productos[i].precio}`
        precioProducto.classList.add("card-text", "mb-2")

        const boton = botonAgregarCarrito(productos[i])

        divCardBody.appendChild(cardName)
        divCardBody.appendChild(precioProducto)
        divCardBody.appendChild(boton)
        divCard.appendChild(img)
        divCard.appendChild(divCardBody)
        article.appendChild(divCard)
        grid.appendChild(article)
    }
}

function botonAgregarCarrito(producto){
    const boton = document.createElement("button")
    boton.role = "button"
    boton.textContent = "Agregar al carrito"
    boton.classList.add("btn", "btn-sm", "btn-outline-light", "mt-auto")
    boton.addEventListener("click", ()=>{
        agregarCarrito(producto)
    })
    return boton
}

function agregarCarrito(producto){
    const carrito = getLocalStorage("carrito")
    let agregar = true
    for(const i in carrito){
        if(carrito[i].nombre === producto.nombre){
            carrito[i].cantidad += 1
            agregar = false
        }
    }
    if(agregar){
        carrito.push(producto)
    }
    window.alert("producto agregado al carrito")
    setLocalStorage("carrito", carrito)
}