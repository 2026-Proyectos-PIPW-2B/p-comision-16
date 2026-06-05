let usuarios = []
window.addEventListener("load", iniciar)

function iniciar(){
    if(JSON.parse(localStorage.getItem("users") != null))
        usuarios = JSON.parse(localStorage.getItem("users"))
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
    for(i=0;i<usuarios.length;i++){
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

function validField(campo){
    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
}

function invalidField(campo){
    campo.classList.remove("is-valid")
    campo.classList.add("is-invalid")
}

function crearUsuario(nombre,contrasena,perfil){
    const usuario ={
        name: nombre,
        password: contrasena,
        profile: perfil
    }
    usuarios.push(usuario)
    localStorage.setItem("users", JSON.stringify(usuarios))
}