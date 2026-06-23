export function verProductos(compra){
    const modalTabla = document.getElementById("listaProductos")
    modalTabla.textContent = ""
    for(const i in compra.productos){
        const producto = compra.productos[i]
        const tr = document.createElement("tr")

        const tdProducto = document.createElement("td")
        tdProducto.textContent = producto.nombre
        const tdCantidad = document.createElement("td")
        tdCantidad.textContent = producto.cantidad
        const tdPrecio = document.createElement("td")
        tdPrecio.textContent = `$${producto.cantidad*producto.precio}`

        tr.appendChild(tdProducto)
        tr.appendChild(tdCantidad)
        tr.appendChild(tdPrecio)
        modalTabla.appendChild(tr)
    }
}