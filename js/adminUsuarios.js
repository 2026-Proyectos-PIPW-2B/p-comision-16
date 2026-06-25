import {
  cerrarSesion,
  getLocalStorage,
  setLocalStorage,
  startLocalStorage,
  startLocalStorageProductos,
} from "./moduloLocalStorage.js";

window.addEventListener("load", () => {
  startLocalStorage();
  startLocalStorageProductos();
  renderizarUsuarios();
});

function renderizarUsuarios() {
  const usuarios = getLocalStorage("users") || [];
  const tbody = document.getElementById("usuarios-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const usuarioActivo = getLocalStorage("usuarioActivo") || {};

  usuarios.forEach((u, indice) => {
    if (u.username === usuarioActivo.username) return;
    const tr = document.createElement("tr");
    const nombre = u.username || "";
    const dirección = u.address || u.direccion || "";
    const ciudad = u.city || "";
    const provincia = u.prov || u.provincia || "";
    const teléfono = u.phone || "";

    tr.innerHTML = `
            <td>${nombre}</td>
            <td>${dirección}</td>
            <td>${ciudad}</td>
            <td>${provincia}</td>
            <td>${teléfono}</td>
            <td>
                <button class="btn btn-sm btn-danger btn-delete-user" data-idx="${indice}">Eliminar</button>
            </td>
        `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".btn-delete-user").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const índice = Number(e.currentTarget.dataset.idx);
      eliminarUsuario(índice);
    });
  });
}

function eliminarUsuario(indice) {
  const usuarios = getLocalStorage("users") || [];
  if (indice < 0 || indice >= usuarios.length) return;
  const usuario = usuarios[indice];
  if (!confirm(`Eliminar usuario ${usuario.name}?`)) return;
  usuarios.splice(indice, 1);
  setLocalStorage("users", usuarios);
  renderizarUsuarios();
  if (usuario.username === getLocalStorage("usuarioActivo").name) {
    cerrarSesion();
  }
}
