window.addEventListener("load", ()=>{
    const adminSelect = document.getElementById("adminSelect")
    const tablaUsuarios = document.getElementById("admin-usuarios")
    const tablaProductos = document.getElementById("admin-productos")
    adminSelect.addEventListener("change",()=>{
        tablaUsuarios.classList.toggle("visually-hidden")
        tablaProductos.classList.toggle("visually-hidden")
    })
})