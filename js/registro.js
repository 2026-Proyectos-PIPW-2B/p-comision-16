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
    if(validarNombre(nombre) && validarContrasena(contrasena)){
        crearUsuario(nombre.value, contrasena.value, direccion.value, ciudad.value, codigoPostal.value, provincia.value, telefono.value)
    }
}

function validarNombre(nombre){
    if(validator.isAlphanumeric(nombre.value) && nombre.value.length > 4){
        validField(nombre)
        return true
    } else{
        invalidField(nombre)
    }
}

function validarContrasena(contrasena){
    if(contrasena.value.length > 8){
        validField(contrasena)
        return true
    } else{
        invalidField(contrasena)
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