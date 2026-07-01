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
    if(productosOrdenados.length > 0)
        return productosOrdenados
}

export function ordenarPorPrecio(productos){
    const productosOrdenados = productos.sort((a,b)=> a.precio - b.precio)
    return productosOrdenados
}

export function buscarEtiqueta(productos,etiqueta){
    const productosBuscados = productos
    for(const i in productos){
        if(productos[i].etiqueta === etiqueta){
            productosBuscados.push(productos[i])
        }
    }
    return productosBuscados
}

export function filtrar(productos, nombreBuscado){
    let productosFiltrados = productos
    const filtroCategoria = document.getElementById("filtro-categoria")
    if(filtroCategoria.value != "default")
        productosFiltrados = filtrarPorCategoria(productosFiltrados,filtroCategoria.value)
    if(nombreBuscado.length > 0)
        productosFiltrados = filtroNombre(productosFiltrados,nombreBuscado)
    return productosFiltrados
}

export function filtrarPorCategoria(productos,categoria){
    const productosFiltrados = []
    for(const i in productos){
        if(categoria === productos[i].etiqueta){
            productosFiltrados.push(productos[i])
        }
    }
    return productosFiltrados
}