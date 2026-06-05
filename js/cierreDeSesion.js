window.addEventListener("load", iniciarBoton)

function iniciarBoton(){
    const btn = document.getElementById("cerrarSesion")
    btn.addEventListener("click", function(e){
        e.preventDefault()
        localStorage.removeItem("usuarioActivo")
        location.href = "login.html"
    })
}