window.addEventListener("load", redirigir)
function redirigir(){
    if(localStorage.getItem("timer") === null){
        localStorage.setItem("timer", 600)
    }
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))
    if(usuarioActivo === null){
        window.alert("Debe iniciar sesión")
        location.href = "login.html"
    }
}

setInterval(() => {
    if(localStorage.getItem("time") === null){
        localStorage.setItem("time", 0)
    } else{
        localStorage.setItem("time", Number(localStorage.getItem("time"))+1)
    }

    if(localStorage.getItem("time") == localStorage.getItem("timer")){
        localStorage.setItem("time", 0)
        localStorage.removeItem("usuarioActivo")
        redirigir()
    }
}, 1000);
