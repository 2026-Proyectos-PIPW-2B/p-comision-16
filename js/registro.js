import { datosValidos } from "./moduloCampos.js"
import { getLocalStorage, startLocalStorage } from "./moduloLocalStorage.js"
import { setLocalStorage } from "./moduloLocalStorage.js"
window.addEventListener("load", iniciarRegistro)

function iniciarRegistro(){
    startLocalStorage()
    const btn = document.getElementById("btn-register")
    const usuarioARegistrar = document.querySelectorAll(".form-control")
    const inputUsername = usuarioARegistrar[0]
    const inputNombre = usuarioARegistrar [1]
    const inputApellido = usuarioARegistrar[2]
    const inputContrasena = usuarioARegistrar[3]
    const inputDireccion = usuarioARegistrar[4]
    const inputCiudad = usuarioARegistrar[5]
    const inputCodigoPostal = usuarioARegistrar[6]
    const inputProvincia = usuarioARegistrar[7]
    const inputTelefono = usuarioARegistrar[8]

    btn.addEventListener("click", function(e){
        e.preventDefault()
        validacionRegistro(inputUsername, inputNombre, inputApellido, inputContrasena, inputDireccion, inputCiudad, inputCodigoPostal, inputProvincia, inputTelefono)
    })
}

function validacionRegistro(usuario, nombre, apellido, contrasena, direccion, ciudad, codigoPostal, provincia, telefono){
    if(datosValidos(usuario, contrasena, direccion, ciudad, codigoPostal, provincia, telefono)){
        crearUsuario(usuario.value, nombre.value, apellido.value, contrasena.value, direccion.value, ciudad.value, codigoPostal.value, provincia.value, telefono.value)
        window.alert("Usuario registrado exitosamente")
    }
}

function crearUsuario(usuario, nombre, apellido, contrasena, direccion, ciudad, codigoPostal, provincia, telefono, perfil = "usuario_final"){
    const usuarios = getLocalStorage("users")
    const usuario ={
        username: usuario,
        nombre: nombre,
        apellido: apellido,
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