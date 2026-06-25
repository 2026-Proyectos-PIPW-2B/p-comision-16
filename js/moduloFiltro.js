export function filtroNombre(productos, nombreBuscado){
    const productosFiltrados = []
    for(const i in productos){
        if(productos[i].nombre.toLowerCase().includes(nombreBuscado.toLowerCase()) ){
            productosFiltrados.push(productos[i])
        }
    }
    return productosFiltrados
}

export function ordernarPorNombre(productos){
    const productosOrdenados = []
    const nombresProductos = []
    for(const i in productos){
        nombresProductos.push(productos[i].nombre)
    }
    nombresProductos.sort()
    for(const i in nombresProductos){
        for(const j in productos){
            if(nombresProductos[i] === productos[j].nombre){
                productosOrdenados.push(productos[j])
            }
        }
    }
    return productosOrdenados
}