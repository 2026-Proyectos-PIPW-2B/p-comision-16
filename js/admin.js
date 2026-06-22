import { getLocalStorage, setLocalStorage } from "./moduloLocalStorage.js"

window.addEventListener("load", ()=>{
    const adminSelect = document.getElementById("adminSelect")
    const tablaUsuarios = document.getElementById("admin-usuarios")
    const tablaProductos = document.getElementById("admin-productos")
    const timer = document.getElementById("timer")
    timer.value = localStorage.getItem("timer")/60
    adminSelect.addEventListener("change",()=>{
        tablaUsuarios.classList.toggle("visually-hidden")
        tablaProductos.classList.toggle("visually-hidden")
    })

    timer.addEventListener("change", ()=>{
        setLocalStorage("timer", timer.value*60)
        setLocalStorage("time", 0)
    })

    if(getLocalStorage("usuarioActivo").profile != "administrador"){
        window.alert("Esta vista es exclusiva para administradores")
        location.href = "catalogo.html"
    }
})
