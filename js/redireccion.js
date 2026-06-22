import { getLocalStorage, setLocalStorage } from "./moduloLocalStorage.js"

window.addEventListener("load", redirigir)
function redirigir(){
    if(getLocalStorage("timer") === null){
        setLocalStorage("timer", 600)
    }
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))
    if(usuarioActivo === null){
        window.alert("Debe iniciar sesión")
        location.href = "login.html"
    }
}

setInterval(() => {
    if(getLocalStorage("time") === null){
        setLocalStorage("time", 0)
    } else{
        setLocalStorage("time", Number(localStorage.getItem("time"))+1)
    }

    if(getLocalStorage("time") == getLocalStorage("timer")){
        setLocalStorage("time", 0)
        localStorage.removeItem("usuarioActivo")
        redirigir()
    }
}, 1000);
