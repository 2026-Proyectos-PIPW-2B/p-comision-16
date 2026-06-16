const Admin = {
    name: "A",
    password: "1",
    profile: "administrador"
}
let usuarios = [Admin]

export function setLocalStorage(item, elementos){
    localStorage.setItem(item,JSON.stringify(elementos))
}

export function getLocalStorage(item){
    return JSON.parse(localStorage.getItem(item))
}

export function startLocalStorage(){
    if(getLocalStorage("users") === null){
        setLocalStorage("users", usuarios)
    } else{
        return getLocalStorage("users")
    }
}