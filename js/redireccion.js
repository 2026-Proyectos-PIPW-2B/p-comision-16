window.addEventListener("load", redirigir)

function redirigir(){
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))
    if(usuarioActivo === null){
        location.href = "login.html"
    }
}