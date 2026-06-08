window.addEventListener("load", redirigir)

function redirigir(){
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))
    if(usuarioActivo === null){
        window.alert("Debe iniciar sesión")
        location.href = "login.html"
    }
}