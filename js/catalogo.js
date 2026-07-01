import { crearImagen, getLocalStorage, setLocalStorage, startCarrito, startLocalStorageProductos } from "./moduloLocalStorage.js"
import { filtroNombre, ordernarPorNombre, ordenarPorPrecio, filtrar } from "./moduloFiltro.js"
window.addEventListener("load", iniciarCatalogo)

function iniciarCatalogo(){
    if(getLocalStorage("usuarioActivo").profile === "administrador"){
        window.alert("Esta vista es exclusiva para usuarios")
        location.href = "administracion.html"
    } else{
        startCarrito()
        const productos = getLocalStorage("products")
        let productosOrdenados = []
        const grid = document.getElementById("productos-grid")
        const filtroCategoria = crearFiltroCategoria()

        crearCatalogo(productos, grid)

        const filtroBuscar = document.getElementById("filtro-buscar")
        filtroBuscar.addEventListener("keyup", ()=>{
            crearCatalogo(filtrar(productos,filtroBuscar.value),grid)
        })

        let ordenadoNombre = false
        const btnOrdernarNombre = document.getElementById("btn-ordenar-nombre")
        btnOrdernarNombre.addEventListener("click", ()=>{
            if(!ordenadoNombre){
                productosOrdenados = ordernarPorNombre(productosOrdenados) || ordernarPorNombre(productos)
                crearCatalogo(filtrar(productosOrdenados,filtroBuscar.value),grid)
                ordenadoNombre = true
                ordenadoPrecio = false
            } else{
                crearCatalogo(filtrar(productos,filtroBuscar.value),grid)
                ordenadoNombre = false
            }
        })

        let ordenadoPrecio
        const btnOrdernarPrecio = document.getElementById("btn-ordenar-precio")
        btnOrdernarPrecio.addEventListener("click", ()=>{
            if(!ordenadoPrecio){
                crearCatalogo(ordenarPorPrecio(filtrar(getLocalStorage("products"),filtroBuscar.value)),grid)
                ordenadoPrecio = true
                ordenadoNombre = false
            } else{
                crearCatalogo(filtrar(productos,filtroBuscar.value),grid)
                ordenadoPrecio = false
            }
        })

        
        filtroCategoria.addEventListener("change", ()=>{
            crearCatalogo(filtrar(productos,filtroBuscar.value),grid)
        })
    }
}

function crearCatalogo(productos, grid){
    grid.textContent = ""
    for(const i in productos){
        if(productos[i].existe){
            const article = document.createElement("article")
            article.classList.add("producto", "col-md-6", "col-lg-4")

            const divCard = document.createElement("div")
            divCard.classList.add("card", "text-light", "border-secondary", "h-100", "d-flex", "flex-column", "shadow-sm")

            const img = crearImagen(productos[i],400,400,["card-img-top"])

            const divCardBody = document.createElement("div")
            divCardBody.classList.add("card-body", "d-flex", "flex-column", "p-2")

            const cardName = document.createElement("h3")
            cardName.textContent = productos[i].nombre
            cardName.classList.add("card-title", "h6", "mb-1")

            const precioProducto = document.createElement("p")
            precioProducto.textContent = `$${productos[i].precio}`
            precioProducto.classList.add("card-text", "mb-2")

            const Stock = document.createElement("p")
            Stock.textContent = `Stock: ${productos[i].stock}`
            Stock.classList.add("card-text", "mb-2")

            stockCantidad(Stock, productos[i].stock);

            const boton = botonAgregarCarrito(productos[i])

            divCardBody.appendChild(cardName)
            divCardBody.appendChild(precioProducto)
            divCardBody.appendChild(Stock)
            divCardBody.appendChild(boton)
            divCard.appendChild(img)
            divCard.appendChild(divCardBody)
            article.appendChild(divCard)
            grid.appendChild(article)
        }
    }
}

function botonAgregarCarrito(producto){
    const boton = document.createElement("button")
    boton.role = "button"
    boton.textContent = "Agregar al carrito"
    boton.classList.add("btn", "btn-sm", "btn-outline-light", "mt-auto")
    boton.dataset.bsToggle ="modal"
    boton.dataset.bsTarget ="#modalProductoAgregado"
    boton.addEventListener("click", ()=>{
        agregarCarrito(producto)
        crearListaCatalogo(producto)
    })
    return boton
}

function agregarCarrito(producto){
    const carrito = getLocalStorage("carrito")
    let agregar = true
    for(const i in carrito){
        if(carrito[i].nombre === producto.nombre){
            carrito[i].cantidad += 1
            agregar = false
        }
    }
    if(agregar){
        carrito.push(producto)
    }
    setLocalStorage("carrito", carrito)
}


function crearListaCatalogo(producto){
    const listaCatalogo = document.getElementById("listaCatalogo")

    const ul = document.createElement("ul")
    ul.classList.add("list-unstyled", "d-flex", "align-items-start", "gap-3")

    const liImg = document.createElement("li")
    const img = crearImagen(producto,50,50,["img-fluid"])
    liImg.appendChild(img)

    const li = document.createElement("li")
    const nombre = document.createElement("h6")
    nombre.classList.add("mb-2")
    nombre.textContent = producto.nombre
    const precio = document.createElement("p")
    precio.classList.add("mb-0")
    precio.textContent = `$${producto.precio}`
    li.appendChild(nombre)
    li.appendChild(precio)

    ul.appendChild(liImg)
    ul.appendChild(li)
    listaCatalogo.appendChild(ul)
}

function crearFiltroCategoria(){
    const filtroCategoria = document.getElementById("filtro-categoria")
    const categorias = []
    const productos = getLocalStorage("products")
    for(const i in productos){
        if(productos[i].etiqueta.length > 0 && !categorias.includes(productos[i].etiqueta)){
            categorias.push(productos[i].etiqueta)
        }
    }
    for(const i in categorias){
        const option = document.createElement("option")
        option.value = categorias[i]
        option.innerText = categorias[i]
        filtroCategoria.appendChild(option)
    }

    return filtroCategoria
}

function stockCantidad(Stock, stock){
  if (stock <= 5) {
    Stock.classList.add("text-danger");
  } else if (stock <= 20) {
    Stock.classList.add("text-warning");
  } else {
    Stock.classList.add("text-success");
  }
}