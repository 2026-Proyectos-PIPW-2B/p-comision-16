window.addEventListener("load", ()=>{
    const adminSelect = document.getElementById("adminSelect")
    const tablaUsuarios = document.getElementById("admin-usuarios")
    const tablaProductos = document.getElementById("admin-productos")
    const timer = document.getElementById("timer")
    timer.value = localStorage.getItem("timer")
    adminSelect.addEventListener("change",()=>{
        tablaUsuarios.classList.toggle("visually-hidden")
        tablaProductos.classList.toggle("visually-hidden")
    })

    timer.addEventListener("change", ()=>{
        localStorage.setItem("timer", timer.value*60)
        localStorage.setItem("time", 0)
    })
})