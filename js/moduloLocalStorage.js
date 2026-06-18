const Admin = {
    name: "A",
    password: "1",
    profile: "administrador"
}
let usuarios = [Admin]

let productos = []
const nombreProductos = ["Peluche Kasane Teto", "BlackBerry Bold Touch 9900", "Impresora Portátil Epson WorkForce WF-100", "Globos con Helio", "Destornillador Plano 8x200 Mm Stanley", "Pala Punta Con Mango Anilla", 'Cubiertos "Comunes"', "Platos Blancos", "Fiat 600"]
const precios = [20,200,1400,10,8,40,6,15,40000]
const imagenes = ["img/7155-AFmP9L._SY500_.jpg", "img/blackberry-bold-touch-9900-4541-g-alt.jpg", "img/WF-100_C11CE05302_3.jpg", "img/Globos-Helio.png", "img/Destornillador.png", "img/Pala.jpg", "img/Cubiertos.jpg", "img/Platos.jpg", "img/Fiat600.jpg"]

for(const i in nombreProductos){
    const img = new Image(50,50)
    img.src = imagenes[i]
    img.alt = nombreProductos[i]
    img.height = 50
    img.classList.add("me-3")
    const producto ={
        nombre: nombreProductos[i],
        imagen: img,
        precio: precios[i]
    }
    productos.push(producto)
}


export function setLocalStorage(item, elementos){
    localStorage.setItem(item,JSON.stringify(elementos))
}

export function getLocalStorage(item){
    return JSON.parse(localStorage.getItem(item))
}

export function startLocalStorage(){
    if(getLocalStorage("users") === null){
        setLocalStorage("users", usuarios)
    } else{
        return getLocalStorage("users")
    }
}


setLocalStorage("productos", productos)