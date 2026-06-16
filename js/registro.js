import { datosValidos } from "./moduloCampos.js"
import { startLocalStorage } from "./moduloLocalStorage.js"
import { setLocalStorage } from "./moduloLocalStorage.js"
window.addEventListener("load", iniciarRegistro)
let usuarios = startLocalStorage()

function iniciarRegistro(){
    const btn = document.getElementById("btn-register")
    const usuarioARegistrar = document.querySelectorAll(".form-control")
    const inputNombre = usuarioARegistrar[0]
    const inputContrasena = usuarioARegistrar[1]
    const inputDireccion = usuarioARegistrar[2]
    const inputCiudad = usuarioARegistrar[3]
    const inputCodigoPostal = usuarioARegistrar[4]
    const inputProvincia = usuarioARegistrar[5]
    const inputTelefono = usuarioARegistrar[6]

    btn.addEventListener("click", function(e){
        e.preventDefault()
        validacionRegistro(inputNombre, inputContrasena, inputDireccion, inputCiudad, inputCodigoPostal, inputProvincia, inputTelefono)
    })
}

function validacionRegistro(nombre, contrasena, direccion, ciudad, codigoPostal, provincia, telefono){
    if(datosValidos(nombre, contrasena, direccion, ciudad, codigoPostal, provincia, telefono)){
        crearUsuario(nombre.value, contrasena.value, direccion.value, ciudad.value, codigoPostal.value, provincia.value, telefono.value)
        window.alert("Usuario registrado exitosamente")
    }
}

function crearUsuario(nombre,contrasena, direccion, ciudad, codigoPostal, provincia, telefono, perfil = "usuario_final"){
    const usuario ={
        name: nombre,
        password: contrasena,
        address: direccion,
        city: ciudad,
        code: codigoPostal,
        prov: provincia,
        phone: telefono,
        profile: perfil
    }
    usuarios.push(usuario)
    setLocalStorage("users", usuarios)
}