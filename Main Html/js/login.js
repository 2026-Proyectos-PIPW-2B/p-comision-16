let usuarios = []
window.addEventListener("load", iniciar)

function iniciar(){
    usuarios = JSON.parse(localStorage.getItem("Users"))
    const inputNombre = document.getElementById("usuario")
    const inputContrasena = document.getElementById("contrasena")
    const btn = document.getElementById("btn-login")
    btn.addEventListener("click", function(e){
        e.preventDefault()
        validarUsuario(inputNombre, inputContrasena)
    })

}

function validarUsuario(nombre,contrasena){
    validarContrasena(validarNombre(nombre), contrasena)
}

function validarNombre(nombre){
    for(i=0;i<usuarios.length;i++){
        if(nombre.value === usuarios[i].name){
            nombre.classList.remove("is-invalid")
            nombre.classList.add("is-valid")
            return usuarios[i].password
        } else{
            nombre.classList.remove("is-valid")
            nombre.classList.add("is-invalid")
        }
    }
}

function validarContrasena(contrasenaDeUsuario, contrasena){
    if(contrasenaDeUsuario === contrasena.value){
        contrasena.classList.remove("is-invalid")
        contrasena.classList.add("is-valid")
        setTimeout(() => {
            location.href = "Catalogo.html"
        }, 1000);
    } else{
        contrasena.classList.remove("is-valid")
        contrasena.classList.add("is-invalid")
    }
}

function crearUsuario(nombre,contrasena){
    const usuario ={
        name: nombre,
        password: contrasena
    }
    usuarios.push(usuario)
    localStorage.setItem("Users", JSON.stringify(usuarios))
}