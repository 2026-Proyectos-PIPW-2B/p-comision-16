let usuarios = []
window.addEventListener("load", iniciar)

function iniciar(){
    usuarios = JSON.parse(localStorage.getItem("Users"))
    const inputNombre = document.getElementById("usuario")
    const inputContrasena = document.getElementById("contrasena")
    const btn = document.getElementById("btn-login")
    btn.addEventListener("click", function(e){
        e.preventDefault()
        validar(inputNombre.value, inputContrasena.value)
    })

}

function validar(nombre,contrasena){
    validarContrasena(validarNombre(nombre), contrasena)
}

function validarNombre(nombre){
    for(i=0;i<usuarios.length;i++){
        if(nombre === usuarios[i].name){
            console.log("usuario encontrado")
            return usuarios[i].password
        }
    }
}

function validarContrasena(contrasenaDeUsuario, contrasena){
    if(contrasenaDeUsuario === contrasena){
        console.log("contraseña correcta")
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
