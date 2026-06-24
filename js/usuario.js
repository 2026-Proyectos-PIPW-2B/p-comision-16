import { cerrarSesion, getLocalStorage, setLocalStorage } from "./moduloLocalStorage.js"
import { datosValidos } from "./moduloCampos.js"
window.addEventListener("load", inicializar)

function inicializar(){
    iniciarBotonCerrarSesion()
    const inputDatosUsuario = document.querySelectorAll(".form-control")
    const inputNombre = inputDatosUsuario[0]
    const inputContrasena = inputDatosUsuario[1]
    const inputDireccion = inputDatosUsuario[2]
    const inputCiudad = inputDatosUsuario[3]
    const inputCodigoPostal = inputDatosUsuario[4]
    const inputProvincia = inputDatosUsuario[5]
    const inputTelefono = inputDatosUsuario[6]
    const usuarioActivo = getLocalStorage("usuarioActivo")
    agregarDatos(inputNombre,inputContrasena,inputDireccion,inputCiudad,inputCodigoPostal,inputProvincia,inputTelefono,usuarioActivo)

    const update = document.getElementById("actualizar")
    update.addEventListener("click", ()=>{
        if(datosValidos(inputNombre, inputContrasena, inputDireccion, inputCiudad, inputCodigoPostal, inputProvincia, inputTelefono)){
            actualizarDatos(inputNombre, inputNombre.id, usuarioActivo)
            actualizarDatos(inputContrasena, inputContrasena.id, usuarioActivo)
            actualizarDatos(inputDireccion, inputDireccion.id, usuarioActivo)
            actualizarDatos(inputCiudad, inputCiudad.id, usuarioActivo)
            actualizarDatos(inputCodigoPostal, inputCodigoPostal.id, usuarioActivo)
            actualizarDatos(inputProvincia, inputProvincia.id, usuarioActivo)
            actualizarDatos(inputTelefono, inputTelefono.id, usuarioActivo)
        }
    })



}

function agregarDatos(nombre, contrasena, direccion, ciudad, codigoPostal, provincia, telefono, usuario){
    nombre.value = usuario.name
    contrasena.value = usuario.password
    direccion.value = usuario.address
    ciudad.value = usuario.city
    codigoPostal.value = usuario.code
    provincia.value = usuario.prov
    telefono.value = usuario.phone
}

function actualizarDatos(campo, campoID, usuarioActivo){
    const usuarios = getLocalStorage("users")
    const nuevoValor = campo.value
    for(const i in usuarios){
        if(usuarios[i].name === usuarioActivo.name){
            switch (campoID) {
                case "nombre":
                    usuarios[i].name = nuevoValor
                    usuarioActivo.name = nuevoValor
                    break;
                case "contrasena":
                    usuarios[i].password = nuevoValor
                    usuarioActivo.password = nuevoValor
                    break
                case "direccion":
                    usuarios[i].address = nuevoValor
                    usuarioActivo.address = nuevoValor
                    break;
                case "ciudad":
                    usuarios[i].city = nuevoValor
                    usuarioActivo.city = nuevoValor
                    break;
                case "codigoPostal":
                    usuarios[i].code = nuevoValor
                    usuarioActivo.code = nuevoValor
                    break;
                case "provincia":
                    usuarios[i].prov = nuevoValor
                    usuarioActivo.prov = nuevoValor
                    break;
                case "telefono":
                    usuarios[i].phone = nuevoValor
                    usuarioActivo.phone = nuevoValor
                    break;
            }
        }
    }
    setLocalStorage("users", usuarios)
    setLocalStorage("usuarioActivo", usuarioActivo)
}

function iniciarBotonCerrarSesion(){
    const btn = document.getElementById("cerrarSesion")
    btn.addEventListener("click", cerrarSesion)
}