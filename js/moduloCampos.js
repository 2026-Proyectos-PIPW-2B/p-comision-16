export function validField(campo){
    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
}

export function invalidField(campo){
    campo.classList.remove("is-valid")
    campo.classList.add("is-invalid")
}