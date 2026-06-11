import { validField } from "./moduloCampos.js"
import { invalidField } from "./moduloCampos.js"
const Admin = {
    name: "A",
    password: "1",
    profile: "administrador"
}
let usuarios = [Admin]
window.addEventListener("load", iniciar)

function iniciar(){
    if(localStorage.getItem("usuarioActivo") != null){
        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))
        if (usuarioActivo.profile === "administrador"){
            location.href = "administracion.html"
        } else{
            location.href = "catalogo.href"
        }
    }
    if(localStorage.getItem("users") === null){
        localStorage.setItem("users", JSON.stringify(usuarios))
    } else{
        usuarios = JSON.parse(localStorage.getItem("users"))
    }
    const inputNombre = document.getElementById("usuario")
    const inputContrasena = document.getElementById("contrasena")
    const btn = document.getElementById("btn-login")
    btn.addEventListener("click", function(e){
        e.preventDefault()
        validarUsuario(inputNombre, inputContrasena)
    })
}

function validarUsuario(nombre,contrasena){
    const user = validarContrasena(validarNombre(nombre), contrasena)
    if(user != null){
        localStorage.setItem("usuarioActivo", JSON.stringify(user))
        setTimeout(() => {
            if(user.profile === "usuario_final")
                location.href = "catalogo.html"
            if(user.profile === "administrador")
                location.href = "administracion.html"
        }, 1000);
    }
}

function validarNombre(nombre){
    if(usuarios.length === 0){
        invalidField(nombre)
    }
    for(let i=0;i<usuarios.length;i++){
        const user = usuarios[i]
        if(nombre.value === user.name){
            validField(nombre)
            return user
        } else{
            invalidField(nombre)
        }
    }
}

function validarContrasena(usuarioVerificado, contrasena){
    if(usuarioVerificado != undefined && usuarioVerificado.password === contrasena.value){
        validField(contrasena)
        return usuarioVerificado
    } else{
        invalidField(contrasena)
    }
}