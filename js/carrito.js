import { getLocalStorage } from "./moduloLocalStorage.js"

window.addEventListener("load", iniciarCarrito)

function iniciarCarrito(){
    const listaCarrito = document.getElementById("lista-carrito")
    const productos = getLocalStorage("products")

    crearLista(listaCarrito,productos)


}

function crearLista(listaCarrito, productos){
    for(const i in productos){
        const li = crearElementoLista(productos[i])
        listaCarrito.appendChild(li)
    }
}

function crearElementoLista(producto){
    const li = document.createElement("li")
    li.classList.add("list-group-item", "text-light", "d-flex", "align-items-center", "border-secondary", "lista-dark-purple")

    const div = document.createElement("div")
    div.classList.add("d-flex", "align-items-center")

    const h6 = document.createElement("h6")
    h6.classList.add("mb-0")
    h6.textContent = producto.nombre

    const img = crearImagen(50, producto.imagen, producto.nombre)

    div.appendChild(img)
    div.appendChild(h6)
    
    const divBoton = document.createElement("div")
    divBoton.classList.add("d-flex", "align-items-center", "gap-2", "ms-auto")

    const spanCantidad = document.createElement("span")
    spanCantidad.classList.add("badge", "rounded-pill", "bg-secondary", "text-light", "px-3", "py-2")
    spanCantidad.textContent = producto.cantidad

    const btnMenos = crearBoton("-",spanCantidad)
    const btnMas = crearBoton("+",spanCantidad)

    const spanPrecio = document.createElement("span")
    spanPrecio.classList.add("badge", "bg-secondary", "rounded-pill", "ms-4")
    calcularPrecio(spanPrecio, producto.cantidad, producto.precio)

    divBoton.appendChild(btnMenos)
    divBoton.appendChild(spanCantidad)
    divBoton.appendChild(btnMas)
    divBoton.appendChild(spanPrecio)

    li.appendChild(div)
    li.appendChild(divBoton)

    return li
}

function crearBoton(tipo, spanCantidad){
    const btn = document.createElement("button")
    btn.classList.add("btn", "btn-sm", "btn-outline-light")
    const icono = document.createElement("i")
    switch(tipo){
        case "-":
            icono.classList.add("bi", "bi-dash-lg")
            btn.addEventListener("click", ()=>{
                restar(spanCantidad)
            })
            break
        case "+":
            icono.classList.add("bi", "bi-plus-lg")
            btn.addEventListener("click", ()=>{
                sumar(spanCantidad)
            })
            break
    }
    btn.appendChild(icono)
    return btn
}

function calcularPrecio(precioTotal,cantidad,precio){
    precioTotal.textContent = `$${cantidad*precio}`
}

function restar(cantidad){
    cantidad.textContent = Number(cantidad.textContent)-1
}

function sumar(cantidad){
    cantidad.textContent = Number(cantidad.textContent)+1
}

function crearImagen(tamaño, source, alt){
    const img = new Image(tamaño,tamaño)
    img.src = source
    img.alt = alt
    img.classList.add("me-3")
    return img
}