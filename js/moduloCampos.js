import { getLocalStorage } from "./moduloLocalStorage.js";
let usuarios = getLocalStorage("users");
export function validField(campo) {
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
}

export function invalidField(campo) {
  campo.classList.remove("is-valid");
  campo.classList.add("is-invalid");
}

export function validarUsername(username) {
  if (estaNombre(username.value)) {
    if (validator.isAlphanumeric(username.value) && username.value.length > 4) {
      validField(username);
      return true;
    } else {
      document.getElementById("nombreError").textContent = "Usuario invalido";
      invalidField(username);
      return false;
    }
  } else {
    document.getElementById("nombreError").textContent =
      "El nombre de usuario ya existe";
    invalidField(username);
    return false;
  }
}

export function validarContrasena(contrasena) {
  if (validator.isStrongPassword(contrasena.value)) {
    validField(contrasena);
    return true;
  } else {
    invalidField(contrasena);
    return false;
  }
}

export function validarDireccion(direccion) {
  if (!validator.isEmpty(direccion.value)) {
    validField(direccion);
    return true;
  } else {
    invalidField(direccion);
    return false;
  }
}

export function validarCiudadProvincia(ciudadProvincia) {
  if (ciudadProvincia.value.length > 7) {
    validField(ciudadProvincia);
    return true;
  } else {
    invalidField(ciudadProvincia);
    return false;
  }
}

export function validarCodigoPostal(codigoPostal) {
  if (
    (codigoPostal.value.length === 5 || codigoPostal.value.length === 4) &&
    validator.isNumeric(codigoPostal.value)
  ) {
    validField(codigoPostal);
    return true;
  } else {
    invalidField(codigoPostal);
    return false;
  }
}

export function validarTelefono(telefono) {
  if (validator.isMobilePhone("549" + telefono.value, "es-AR")) {
    validField(telefono);
    return true;
  } else {
    invalidField(telefono);
    return false;
  }
}

function estaNombre(username) {
  const usuarios = getLocalStorage("users");
  for (const n in usuarios) {
    if (
      username === usuarios[n].username &&
      (getLocalStorage("usuarioActivo") === null)
    ) {
      return false;
    }
  }
  return true;
}

export function datosValidos(
  username,
  contrasena,
  direccion,
  ciudad,
  codigoPostal,
  provincia,
  telefono,
) {
  let esValido = true;
  if (!validarUsername(username)) {
    esValido = false;
  }
  if (!validarContrasena(contrasena)) {
    esValido = false;
  }
  if (!validarDireccion(direccion)) {
    esValido = false;
  }
  if (!validarCiudadProvincia(ciudad)) {
    esValido = false;
  }
  if (!validarCodigoPostal(codigoPostal)) {
    esValido = false;
  }
  if (!validarCiudadProvincia(provincia)) {
    esValido = false;
  }
  if (!validarTelefono(telefono)) {
    esValido = false;
  }
  return esValido;
}
