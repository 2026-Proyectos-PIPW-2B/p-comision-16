import { invalidField, validField } from "./moduloCampos.js"
import { crearImagen, crearProducto, getLocalStorage, setLocalStorage,} from "./moduloLocalStorage.js"

window.addEventListener("load", ()=>{
    crearTablaProductos()
    inicializarSelectorAdmin()

    const timer = document.getElementById("timer")
    timer.value = getLocalStorage("timer")/60
    timer.addEventListener("change", ()=>{
        setLocalStorage("timer", timer.value*60)
        setLocalStorage("time", 0)
    })

    const botonAgregar = document.getElementById("agregarProducto")

    const datosDelProducto = document.querySelectorAll(".form-control")
    botonAgregar.addEventListener("click", function(e){
        e.preventDefault()
        if(validarProducto(datosDelProducto[0],datosDelProducto[1],datosDelProducto[2],datosDelProducto[3],datosDelProducto[4])){
            const modal = document.getElementById("modalAgregarProducto")
            const modalInstance = bootstrap.Modal.getInstance(modal)
            const productos = getLocalStorage("products")
            productos.push(crearProducto(datosDelProducto[0].value,datosDelProducto[1].value,datosDelProducto[2].value,datosDelProducto[3].value,datosDelProducto[4].value))
            setLocalStorage("products", productos)
            crearTablaProductos()
            for(let i = 0; i<=4;i++){
                datosDelProducto[i].value = ""
                datosDelProducto[i].classList.remove("is-valid")
            }
            modalInstance.hide()
        }
    })

    if(getLocalStorage("usuarioActivo").profile != "administrador"){
        window.alert("Esta vista es exclusiva para administradores")
        location.href = "catalogo.html"
    }
})

function crearTablaProductos(){
    const tablaProductos = document.getElementById("tabla-productos-admin")
    const productos = getLocalStorage("products")
    const tbody = document.getElementById("tbody") || document.createElement("tbody")
    tbody.id = "tbody"
    tbody.textContent = ""

    for(const i in productos){
        
        const fila = document.createElement("tr")

        const tdImagen = document.createElement("td")
        const imagen = crearImagen(productos[i],50,50,["me-2"])
        tdImagen.appendChild(imagen)

        const tdNombre = document.createElement("td")
        tdNombre.textContent = productos[i].nombre

        const tdEtiqueta = document.createElement("td")
        const inputEtiqueta = document.createElement("input")
        inputEtiqueta.type = "text"
        inputEtiqueta.value = productos[i].etiqueta

        inputEtiqueta.addEventListener("keyup", ()=>{
            productos[i].etiqueta = inputEtiqueta.value
            setLocalStorage("products", productos)
        })

        tdEtiqueta.appendChild(inputEtiqueta)

        const tdPrecio = document.createElement("td")
        tdPrecio.textContent = `$${productos[i].precio}`

        const tdStock = document.createElement("td")
        const inputStock = document.createElement("input")
        inputStock.type = "number"
        inputStock.value = productos[i].stock

        inputStock.addEventListener("keyup", ()=>{
            productos[i].stock = parseInt(inputStock.value)
            setLocalStorage("products", productos)
        })

        tdStock.appendChild(inputStock)

        const tdBoton = document.createElement("td")
        const boton = document.createElement("button")
        boton.classList.add("btn", "btn-sm", "btn-outline-light")
        definirBoton(boton, productos[i].existe)
        
        boton.addEventListener("click", ()=>{
            productos[i].existe = !productos[i].existe
            if(productos[i].existe){
                boton.textContent = "Dar de baja"
            } else{
                boton.textContent = "Dar de alta"
            }
            boton.classList.toggle("bg-danger")
            boton.classList.toggle("bg-success")

            setLocalStorage("products", productos)
        })
        tdBoton.appendChild(boton)

        fila.appendChild(tdImagen)
        fila.appendChild(tdNombre)
        fila.appendChild(tdEtiqueta)
        fila.appendChild(tdPrecio)
        fila.appendChild(tdStock)
        fila.appendChild(tdBoton)

        tbody.appendChild(fila)
    }
    
    tablaProductos.appendChild(tbody)

}

function definirBoton(boton, existencia){
    if(existencia){
        boton.textContent = "Dar de baja"
        boton.classList.add("bg-danger")
    } else{
        boton.textContent = "Dar de alta"
        boton.classList.add("bg-success")
    }
}

function inicializarSelectorAdmin(){
    const adminSelect = document.getElementById("adminSelect")
    const usuariosPanel = document.getElementById("admin-usuarios")
    const productosPanel = document.getElementById("admin-productos")

    function actualizarPaneles(){
        usuariosPanel.classList.toggle("visually-hidden", adminSelect.value !== "usuarios")
        productosPanel.classList.toggle("visually-hidden", adminSelect.value !== "productos")
    }

    adminSelect.addEventListener("change", actualizarPaneles)
    actualizarPaneles()
}

function validarProducto(nombre,imagen,precio,stock,etiqueta){
    let valido = true
    if(nombre.value === ""){
        valido = false
        invalidField(nombre)
    } else{
        validField(nombre)
    }
    if(imagen.value === ""){
        valido = false
        invalidField(imagen)
    } else{
        validField(imagen)
    }
    if(precio.value === ""){
        valido = false
        invalidField(precio)
    } else{
        validField(precio)
    }
    if(stock.value === ""){
        valido = false
        invalidField(stock)
    } else{
        validField(stock)
    }
    if(etiqueta.value === ""){
        valido = false
        invalidField(etiqueta)
    } else{
        validField(etiqueta)
    }
    return valido
}