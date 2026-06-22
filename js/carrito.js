import { getLocalStorage, setLocalStorage, crearImagen, startCarrito } from "./moduloLocalStorage.js"
window.addEventListener("load", iniciarCarrito)

function iniciarCarrito(){
    const listaCarrito = document.getElementById("lista-carrito")
    listaCarrito.textContent = ""
    const productos = getLocalStorage("carrito")
    const carritoTotal = document.getElementById("carrito-total")

    const BtnConfirmarCompra = document.getElementById("carrito-confirmar")
    BtnConfirmarCompra.addEventListener("click", confirmarCompra)

    crearLista(listaCarrito,productos)
    carritoTotal.textContent = `Total: $${calcularTotal(productos)}`
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

    const img = crearImagen(producto,50,50,["me-3"])

    div.appendChild(img)
    div.appendChild(h6)
    
    const divBoton = document.createElement("div")
    divBoton.classList.add("d-flex", "align-items-center", "gap-2", "ms-auto")

    const spanCantidad = document.createElement("span")
    spanCantidad.classList.add("badge", "rounded-pill", "bg-secondary", "text-light", "px-3", "py-2")
    spanCantidad.textContent = producto.cantidad

    const btnMenos = crearBoton("-",producto)
    const btnMas = crearBoton("+",producto)

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

function crearBoton(tipo, producto){
    const btn = document.createElement("button")
    btn.classList.add("btn", "btn-sm", "btn-outline-light")
    const icono = document.createElement("i")
    switch(tipo){
        case "-":
            icono.classList.add("bi", "bi-dash-lg")
            btn.addEventListener("click", ()=>{
                restar(producto)
            })
            break
        case "+":
            icono.classList.add("bi", "bi-plus-lg")
            btn.addEventListener("click", ()=>{
                sumar(producto)
            })
            break
    }
    btn.appendChild(icono)
    return btn
}

function calcularPrecio(precioTotal,cantidad,precio){
    precioTotal.textContent = `$${cantidad*precio}`
}

function restar(producto){
    producto.cantidad -= 1
    actualizarProducto(producto)
}

function sumar(producto){
    producto.cantidad += 1
    actualizarProducto(producto)
}

function actualizarProducto(producto){
    let productos = getLocalStorage("carrito")
    for(const i in productos){
        if(productos[i].nombre === producto.nombre){
            if(producto.cantidad === 0){
                productos.splice(i,1)
            } else{
            productos[i] = producto
            }
        }
    }
    if(productos.length === 0){
        localStorage.removeItem("carrito")
    } else{
        setLocalStorage("carrito", productos)
    }
    iniciarCarrito()
}

function calcularTotal(productos){
    let precioFinal = 0
    for(const i in productos){
        precioFinal += productos[i].precio*productos[i].cantidad
    }
    return precioFinal
}

function confirmarCompra(){
    if(getLocalStorage("carrito").length > 0){
        addHistorial(getLocalStorage("carrito"))
        window.alert("Se ha realizado la compra con éxito")
        setLocalStorage("carrito",[])
        iniciarCarrito()
    }
}

function addHistorial(carrito){
    let historial
    if(getLocalStorage("historial") === null){
        historial = []
    } else{
        historial = getLocalStorage("historial")
    }
    const fecha = new Date()
        const productoHistorial = {
            fecha: `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`,
            precio: calcularTotal(carrito),
            productos: carrito
    }
    historial.push(productoHistorial)
    setLocalStorage("historial",historial)
    
}