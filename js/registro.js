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
    if(validarNombre(nombre) && validarContrasena(contrasena) && validarDireccion(direccion) && validarCiudadProvincia(ciudad) && validarCodigoPostal(codigoPostal) && validarCiudadProvincia(provincia) && validarTelefono(telefono)){
        crearUsuario(nombre.value, contrasena.value, direccion.value, ciudad.value, codigoPostal.value, provincia.value, telefono.value)
    }
}

function validarNombre(nombre){
    if(estaNombre(nombre.value)){
        if(validator.isAlphanumeric(nombre.value) && nombre.value.length > 4){
            validField(nombre)
            return true
        } else{
            invalidField(nombre)
            document.getElementById("nombreError").textContent = "Usuario invalido"
        }
    } else{
        document.getElementById("nombreError").textContent = "El nombre de usuario ya existe"
        invalidField(nombre)
    }
}

function validarContrasena(contrasena){
    if(validator.isStrongPassword(contrasena.value)){
        validField(contrasena)
        return true
    } else{
        invalidField(contrasena)
    }
}

function validarDireccion(direccion){
    if(!validator.isEmpty(direccion.value)){
        validField(direccion)
        return true
    } else{
        invalidField(direccion)
    }
}

function validarCiudadProvincia(ciudadProvincia){
    if(ciudadProvincia.value.length > 7){
        validField(ciudadProvincia)
        return true
    } else{
        invalidField(ciudadProvincia)
    }
}

function validarCodigoPostal(codigoPostal){
    if((codigoPostal.value.length === 5 || codigoPostal.value.length === 4) && validator.isNumeric(codigoPostal.value)){
        validField(codigoPostal)
        return true
    } else{
        invalidField(codigoPostal)
    }
}

function validarTelefono(telefono){
    if(validator.isMobilePhone("549"+telefono.value,"es-AR")){
        validField(telefono)
        return true
    } else{
        invalidField(telefono)
    }
}

function estaNombre(nombre){
    for(n in usuarios){
        if(nombre === usuarios[n].name){
            return false
        }
    }
    return true
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

function validField(campo){
    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
}

function invalidField(campo){
    campo.classList.remove("is-valid")
    campo.classList.add("is-invalid")
}