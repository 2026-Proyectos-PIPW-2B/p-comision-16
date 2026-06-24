import { validField } from "./moduloCampos.js"
import { invalidField } from "./moduloCampos.js"
import { getLocalStorage, setLocalStorage, startLocalStorage} from "./moduloLocalStorage.js"
window.addEventListener("load", iniciar)

function iniciar(){
    startLocalStorage()
    if(getLocalStorage("usuarioActivo") != null){
        const usuarioActivo = getLocalStorage("usuarioActivo")
        if (usuarioActivo.profile === "administrador"){
            location.href = "administracion.html"
        } else{
            location.href = "catalogo.html"
        }
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
        setLocalStorage("usuarioActivo", user)
        if(getLocalStorage("usuarioActivo").historial !== undefined){
            setLocalStorage("historial", getLocalStorage("usuarioActivo").historial)
        }
        setTimeout(() => {
            if(user.profile === "usuario_final")
                location.href = "catalogo.html"
            if(user.profile === "administrador")
                location.href = "administracion.html"
        }, 1000);
    }
}

function validarNombre(nombre){
    const usuarios = getLocalStorage("users")
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