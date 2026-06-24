if(getLocalStorage("carrito") === null){
    let carrito = []
    setLocalStorage("carrito", carrito)
}

export function crearImagen(producto, tamañoX, tamañoY, clases){
    const img = new Image(tamañoX,tamañoY)
    img.src = producto.imagen
    img.alt = producto.nombre
    for(const i in clases){
        img.classList.add(clases[i])
    }
    return img
}

export function setLocalStorage(item, elementos){
    localStorage.setItem(item,JSON.stringify(elementos))
}

export function getLocalStorage(item){
    return JSON.parse(localStorage.getItem(item))
}

export function startLocalStorage(){
    if(getLocalStorage("users") === null || getLocalStorage("users").value === undefined){
        setLocalStorage("users", usuariosPorDefecto())
    } else{
        return getLocalStorage("users")
    }
}

export function startLocalStorageProductos(){
    if(getLocalStorage("products") === null || getLocalStorage("products").value === undefined){
        setLocalStorage("products", productosPorDefecto())
    } else{
        return getLocalStorage("products")
    }
}

export function startCarrito(){
    if(getLocalStorage("carrito") === null){
        const carrito = []
        setLocalStorage("carrito", carrito)
    }
}

export function setHistorial(){
    const usuarios = getLocalStorage("users")
    const usuarioActivo = getLocalStorage("usuarioActivo")
    const historial = getLocalStorage("historial")
    usuarioActivo.historial = historial
    for(const i in usuarios){
        if(usuarios[i].username === usuarioActivo.username){
            usuarios[i] = usuarioActivo
        }
    }
    setLocalStorage("usuarioActivo", usuarioActivo)
    setLocalStorage("users", usuarios)
}

export function cerrarSesion(){
    localStorage.removeItem("usuarioActivo")
    localStorage.removeItem("carrito")
    localStorage.removeItem("historial")
    location.href = "login.html"
}

function productosPorDefecto(){
    const productos = []
    const nombreProductos = ["Peluche Kasane Teto", "BlackBerry Bold Touch 9900", "Impresora Portátil Epson WorkForce WF-100", "Globos con Helio", "Destornillador Plano 8x200 Mm Stanley", "Pala Punta Con Mango Anilla", 'Cubiertos "Comunes"', "Platos Blancos", "Fiat 600"]
    const precios = [20,200,1400,10,8,40,6,15,40000]
    const imagenes = ["img/7155-AFmP9L._SY500_.jpg", "img/blackberry-bold-touch-9900-4541-g-alt.jpg", "img/WF-100_C11CE05302_3.jpg", "img/Globos-Helio.png", "img/Destornillador.png", "img/Pala.jpg", "img/Cubiertos.jpg", "img/Platos.jpg", "img/Fiat600.jpg"]

    for(const i in nombreProductos){
        const producto ={
            nombre: nombreProductos[i],
            imagen: imagenes[i],
            precio: precios[i],
            cantidad: 1,
        }
        productos.push(producto)
    }
    return productos
}

function usuariosPorDefecto(){
    const usuarios = []
    const Admin = {
        username: "Admin1",
        nombre: "nombreAdmin",
        apellido: "apellidoAdmin",
        password: "1234gG**",
        address: "Calle123",
        city: "Buenos Aires",
        code: 8000,
        prov: "Bahía Blanca",
        phone: 2914412046,
        profile: "administrador"
    }
    usuarios.push(Admin)
    return usuarios
}