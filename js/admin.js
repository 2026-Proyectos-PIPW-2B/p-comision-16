import { crearImagen, getLocalStorage, setLocalStorage, startLocalStorageProductos } from "./moduloLocalStorage.js"

window.addEventListener("load", ()=>{
    crearTablaProductos()
    inicializarSelectorAdmin()

    const timer = document.getElementById("timer")
    timer.value = getLocalStorage("timer")/60
    timer.addEventListener("change", ()=>{
        setLocalStorage("timer", timer.value*60)
        setLocalStorage("time", 0)
    })

    if(getLocalStorage("usuarioActivo").profile != "administrador"){
        window.alert("Esta vista es exclusiva para administradores")
        location.href = "catalogo.html"
    }
})

function crearTablaProductos(){
    const tablaProductos = document.getElementById("tabla-productos-admin")
    const productos = getLocalStorage("products")
    const tbody = document.createElement("tbody")
    tbody.textContent = ""

    for(const i in productos){
        
        const fila = document.createElement("tr")

        const tdImagen = document.createElement("td")
        const imagen = crearImagen(productos[i],50,50,["me-2"])
        tdImagen.appendChild(imagen)

        const tdNombre = document.createElement("td")
        tdNombre.textContent = productos[i].nombre

        const tdEtiqueta = document.createElement("td")
        const inputEtiqueta = document.createElement("input")
        inputEtiqueta.type = "text"
        inputEtiqueta.value = productos[i].etiqueta

        inputEtiqueta.addEventListener("keyup", ()=>{
            productos[i].etiqueta = inputEtiqueta.value
            setLocalStorage("products", productos)
        })

        tdEtiqueta.appendChild(inputEtiqueta)

        const tdPrecio = document.createElement("td")
        tdPrecio.textContent = `$${productos[i].precio}`

        const tdBoton = document.createElement("td")
        const boton = document.createElement("button")
        boton.classList.add("btn", "btn-sm", "btn-outline-light")
        definirBoton(boton, productos[i].existe)
        
        boton.addEventListener("click", ()=>{
            productos[i].existe = !productos[i].existe
            if(productos[i].existe){
                boton.textContent = "Dar de baja"
            } else{
                boton.textContent = "Dar de alta"
            }
            boton.classList.toggle("bg-danger")
            boton.classList.toggle("bg-success")

            setLocalStorage("products", productos)
        })
        tdBoton.appendChild(boton)

        fila.appendChild(tdImagen)
        fila.appendChild(tdNombre)
        fila.appendChild(tdEtiqueta)
        fila.appendChild(tdPrecio)
        fila.appendChild(tdBoton)

        tbody.appendChild(fila)
    }
    
    tablaProductos.appendChild(tbody)

}

function definirBoton(boton, existencia){
    if(existencia){
        boton.textContent = "Dar de baja"
        boton.classList.add("bg-danger")
    } else{
        boton.textContent = "Dar de alta"
        boton.classList.add("bg-success")
    }
}

function inicializarSelectorAdmin(){
    const adminSelect = document.getElementById("adminSelect")
    const usuariosPanel = document.getElementById("admin-usuarios")
    const productosPanel = document.getElementById("admin-productos")

    function actualizarPaneles(){
        usuariosPanel.classList.toggle("visually-hidden", adminSelect.value !== "usuarios")
        productosPanel.classList.toggle("visually-hidden", adminSelect.value !== "productos")
    }

    adminSelect.addEventListener("change", actualizarPaneles)
    actualizarPaneles()
}