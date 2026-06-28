import { crearImagen, getLocalStorage, setLocalStorage } from "./moduloLocalStorage.js"

window.addEventListener("load", ()=>{
    
    crearTablaProductos()

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
    tablaProductos.textContent = ""
    const tbody = document.createElement("tbody")

    for(const i in productos){
        
        const fila = document.createElement("tr")

        const tdImagen = document.createElement("td")
        const imagen = crearImagen(productos[i],50,50,["img-fluid","me-2"])
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
        tdPrecio.textContent = productos[i].precio
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