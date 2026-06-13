window.addEventListener("load", inicializar)

function inicializar(){
    iniciarBotonCerrarSesion()
    const inputDatosUsuario = document.querySelectorAll(".form-control")
    const inputNombre = inputDatosUsuario[0]
    const inputDireccion = inputDatosUsuario[1]
    const inputCiudad = inputDatosUsuario[2]
    const inputProvincia = inputDatosUsuario[3]
    const inputTelefono = inputDatosUsuario[4]
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))
    agregarDatos(inputNombre,inputDireccion,inputCiudad,inputProvincia,inputTelefono,usuarioActivo)

    const update = document.getElementById("actualizar")
    update.addEventListener("click", ()=>{
        actualizarDatos(inputNombre, inputNombre.id, usuarioActivo)
        actualizarDatos(inputDireccion, inputDireccion.id, usuarioActivo)
        actualizarDatos(inputCiudad, inputCiudad.id, usuarioActivo)
        actualizarDatos(inputProvincia, inputProvincia.id, usuarioActivo)
        actualizarDatos(inputTelefono, inputTelefono.id, usuarioActivo)
    })



}

function agregarDatos(nombre, direccion, ciudad, provincia, telefono, usuario){
    nombre.value = usuario.name
    direccion.value = usuario.address
    ciudad.value = usuario.city
    provincia.value = usuario.prov
    telefono.value = usuario.phone
}

function actualizarDatos(campo, campoID, usuarioActivo){
    const usuarios = JSON.parse(localStorage.getItem("users"))
    const nuevoValor = campo.value
    for(const i in usuarios){
        if(usuarios[i].name === usuarioActivo.name){
            switch (campoID) {
                case "nombre":
                    usuarios[i].name = nuevoValor
                    usuarioActivo.name = nuevoValor
                    break;
                case "direccion":
                    usuarios[i].address = nuevoValor
                    usuarioActivo.address = nuevoValor
                    break;
                case "ciudad":
                    usuarios[i].city = nuevoValor
                    usuarioActivo.city = nuevoValor
                    break;
                case "provincia":
                    usuarios[i].prov = nuevoValor
                    usuarioActivo.prov = nuevoValor
                    break;
                case "telefono":
                    usuarios[i].phone = nuevoValor
                    usuarioActivo.phone = nuevoValor
                    break;
            }
        }
    }
    localStorage.setItem("users",JSON.stringify(usuarios))
    localStorage.setItem("usuarioActivo",JSON.stringify(usuarioActivo))
}

function iniciarBotonCerrarSesion(){
    const btn = document.getElementById("cerrarSesion")
    btn.addEventListener("click", function(e){
        e.preventDefault()
        localStorage.removeItem("usuarioActivo")
        location.href = "login.html"
    })
}