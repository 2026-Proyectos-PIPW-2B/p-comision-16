export function filtroNombre(productos, nombreBuscado){
    const productosFiltrados = []
    for(const i in productos){
        if(productos[i].nombre.toLowerCase().includes(nombreBuscado.toLowerCase()) ){
            productosFiltrados.push(productos[i])
        }
    }
    return productosFiltrados
}