window.addEventListener("load", iniciar)

function iniciar(){
    usuarios = JSON.parse(localStorage.getItem("Users"))
    inputs = document.querySelectorAll(".form-control")
    const btn = document.getElementById("btn-login")
    btn.addEventListener("click", function(e){
        e.preventDefault()
        validar(inputs)
    })

}

function validar(inputs){
    for(i in inputs){
        const input = inputs[i]
        validarUsuario(input, input.name)
    }
}

function validarUsuario(input, name){
    switch(name){
        case("usuario"):
            validarNombre(input.value)
            break
    }
}

function validarNombre(nombre){
    for(i=0;i<usuarios.length;i++){
        if(nombre === "a"){
            console.log("4")
            validarContrasena()
        }
    }
}

function validarContrasena(){
    
}

function crearUsuario(nombre,contrasena){
    const usuario ={
        name: nombre,
        password: contrasena
    }
    usuarios.push(usuario)
    localStorage.setItem("Users", JSON.stringify(usuarios))
}