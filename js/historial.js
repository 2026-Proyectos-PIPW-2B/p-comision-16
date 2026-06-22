import { getLocalStorage } from "./moduloLocalStorage.js"
import { verProductos } from "./moduloVerProductos.js"

window.addEventListener("load", iniciarHistorial)

function iniciarHistorial(){
    const cuerpoHistorial = document.getElementById("tabla-historial")
    const historial = getLocalStorage("historial")

    cuerpoHistorial.appendChild(crearTabla(historial))
}

function crearTabla(historial){
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
        tr.appendChild(tdPrecio)
        tr.appendChild(tdBoton)
        tableBody.appendChild(tr)
    }
    return tableBody
}