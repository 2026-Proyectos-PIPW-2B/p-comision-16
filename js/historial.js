import { getLocalStorage } from "./moduloLocalStorage.js"
import { verProductos } from "./moduloVerProductos.js"

window.addEventListener("load", iniciarHistorial)

function iniciarHistorial(){
    const cuerpoHistorial = document.getElementById("tabla-historial")
    if(getLocalStorage("usuarioActivo").profile != "administrador"){
        cuerpoHistorial.appendChild(crearTabla())
    } else{
        cuerpoHistorial.appendChild(crearTablaAdmin())
    }
}

function crearTabla(){
    const historial = getLocalStorage("historial")
    const tableBody = document.createElement("tbody")
    for(const i in historial){

        const tr = document.createElement("tr")     
        const tdFecha = document.createElement("td")
        tdFecha.textContent = historial[i].fecha
        const tdPrecio = document.createElement("td")
        tdPrecio.textContent = `$${historial[i].precio}`

        const tdBoton = document.createElement("td")
        const boton = document.createElement("td")
        boton.classList.add("btn", "btn-sm", "btn-outline-light")
        boton.dataset.bsToggle ="modal"
        boton.dataset.bsTarget ="#modalProductos"
        boton.textContent = "Ver Productos"
        boton.addEventListener("click", ()=>{
            verProductos(historial[i])
        })
        tdBoton.appendChild(boton)

        tr.appendChild(tdFecha)
        tr.appendChild(tdBoton)
        tr.appendChild(tdPrecio)
        tableBody.appendChild(tr)
    }
    return tableBody
}

function crearTablaAdmin(){
    const ventas = getLocalStorage("ventas")
    const usuario = document.getElementById("usuarioDelHistorial")
    usuario.classList.remove("visually-hidden")
    const tableBody = document.createElement("tbody")
    for(const i in ventas){

        const tr = document.createElement("tr")
        const tdUsuario = document.createElement("td")
        tdUsuario.textContent = ventas[i].usuarioAsociado.username
        const tdFecha = document.createElement("td")
        tdFecha.textContent = ventas[i].venta.fecha
        const tdPrecio = document.createElement("td")
        tdPrecio.textContent = `$${ventas[i].venta.precio}`

        const tdBoton = document.createElement("td")
        const boton = document.createElement("td")
        boton.classList.add("btn", "btn-sm", "btn-outline-light")
        boton.dataset.bsToggle ="modal"
        boton.dataset.bsTarget ="#modalProductos"
        boton.textContent = "Ver Productos"
        boton.addEventListener("click", ()=>{
            verProductos(ventas[i].venta)
        })
        tdBoton.appendChild(boton)

        tr.appendChild(tdFecha)
        tr.appendChild(tdBoton)
        tr.appendChild(tdPrecio)
        tr.appendChild(tdUsuario)
        tableBody.appendChild(tr)
    }
    return tableBody


}