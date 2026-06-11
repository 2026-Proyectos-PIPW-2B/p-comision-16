import { validField } from "./moduloCampos.js"
import { invalidField } from "./moduloCampos.js"
const Admin = {
    name: "A",
    password: "1",
    profile: "administrador"
}
let usuarios = [Admin]
window.addEventListener("load", iniciarRegistro)

function iniciarRegistro(){
    if(localStorage.getItem("users") === null){
        localStorage.setItem("users", JSON.stringify(usuarios))
    } else{
        usuarios = JSON.parse(localStorage.getItem("users"))
    }
    const btn = document.getElementById("btn-register")
    const usuarioARegistrar = document.querySelectorAll(".form-control")
    const nombre = usuarioARegistrar[0]
    const contrasena = usuarioARegistrar[1]
    const direccion = usuarioARegistrar[2]
    const ciudad = usuarioARegistrar[3]
    const codigoPostal = usuarioARegistrar[4]
    const provincia = usuarioARegistrar[5]
    const telefono = usuarioARegistrar[6]

    btn.addEventListener("click", function(e){
        e.preventDefault()
        validacionRegistro(nombre,contrasena,direccion,ciudad,codigoPostal,provincia,telefono)
    })
}

function validacionRegistro(nombre, contrasena, direccion, ciudad, codigoPostal, provincia, telefono){
    if(datosValidos(nombre, contrasena, direccion, ciudad, codigoPostal, provincia, telefono)){
        crearUsuario(nombre.value, contrasena.value, direccion.value, ciudad.value, codigoPostal.value, provincia.value, telefono.value)
    }
}

function validarNombre(nombre){
    if(estaNombre(nombre.value)){
        if(validator.isAlphanumeric(nombre.value) && nombre.value.length > 4){
            validField(nombre)
            return true
        } else{
            document.getElementById("nombreError").textContent = "Usuario invalido"
            invalidField(nombre)
            return false
        }
    } else{
        document.getElementById("nombreError").textContent = "El nombre de usuario ya existe"
        invalidField(nombre)
        return false
    }
}

function validarContrasena(contrasena){
    if(validator.isStrongPassword(contrasena.value)){
        validField(contrasena)
        return true
    } else{
        invalidField(contrasena)
        return false
    }
}

function validarDireccion(direccion){
    if(!validator.isEmpty(direccion.value)){
        validField(direccion)
        return true
    } else{
        invalidField(direccion)
        return false
    }
}

function validarCiudadProvincia(ciudadProvincia){
    if(ciudadProvincia.value.length > 7){
        validField(ciudadProvincia)
        return true
    } else{
        invalidField(ciudadProvincia)
        return false
    }
}

function validarCodigoPostal(codigoPostal){
    if((codigoPostal.value.length === 5 || codigoPostal.value.length === 4) && validator.isNumeric(codigoPostal.value)){
        validField(codigoPostal)
        return true
    } else{
        invalidField(codigoPostal)
        return false
    }
}

function validarTelefono(telefono){
    if(validator.isMobilePhone("549"+telefono.value,"es-AR")){
        validField(telefono)
        return true
    } else{
        invalidField(telefono)
        return false
    }
}

function estaNombre(nombre){
    for(const n in usuarios){
        if(nombre === usuarios[n].name){
            return false
        }
    }
    return true
}

function datosValidos(nombre, contrasena, direccion, ciudad, codigoPostal, provincia, telefono){
    let esValido = true
    if(!validarNombre(nombre)){
        esValido = false
    }
    if(!validarContrasena(contrasena)){
        esValido = false
    }
    if(!validarDireccion(direccion)){
        esValido = false
    }
    if(!validarCiudadProvincia(ciudad)){
        esValido = false
    }
    if(!validarCodigoPostal(codigoPostal)){
        esValido = false
    }
    if(!validarCiudadProvincia(provincia)){
        esValido = false
    }
    if(!validarTelefono(telefono)){
        esValido = false
    }
    return esValido
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
    localStorage.setItem("users", JSON.stringify(usuarios))
}