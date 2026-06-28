import { getLocalStorage } from "./moduloLocalStorage.js"
import { verProductos } from "./moduloVerProductos.js"

window.addEventListener("load", iniciarHistorialAdmin)

function iniciarHistorialAdmin(){
    const tablaHistorial = document.getElementById("tabla-historial-admin")
    const ventas = getLocalStorage("ventas") ?? []

    tablaHistorial.appendChild(crearTablaVentas(ventas))
    inicializarSelectorAdmin()
}

function inicializarSelectorAdmin(){
    const adminSelect = document.getElementById("adminSelect")
    const usuariosPanel = document.getElementById("admin-usuarios")
    const productosPanel = document.getElementById("admin-productos")
    const historialPanel = document.getElementById("historial")

    function actualizarPaneles(){
        usuariosPanel.classList.toggle("visually-hidden", adminSelect.value !== "usuarios")
        productosPanel.classList.toggle("visually-hidden", adminSelect.value !== "productos")
        historialPanel.classList.toggle("visually-hidden", adminSelect.value !== "historial")
    }

    adminSelect.addEventListener("change", actualizarPaneles)
    actualizarPaneles()
}

function crearTablaVentas(ventas){
    const tableBody = document.createElement("tbody")

    for(const i in ventas){
        const ventaRegistro = ventas[i]
        const compra = ventaRegistro.venta
        const fecha = compra.fecha
        const usuario = ventaRegistro.usuarioAsociado.username
        const precioTotal = compra.precio

        const tr = document.createElement("tr")

        const tdFecha = document.createElement("td")
        tdFecha.textContent = fecha

        const tdUsuario = document.createElement("td")
        tdUsuario.textContent = usuario

        const tdPrecio = document.createElement("td")
        tdPrecio.textContent = `$${precioTotal}`

        tr.appendChild(tdFecha)
        tr.appendChild(tdUsuario)
        tr.appendChild(tdPrecio)
        tableBody.appendChild(tr)
    }

    return tableBody
}
