import {
  getLocalStorage,
  setLocalStorage,
  startLocalStorage,
} from "./moduloLocalStorage.js";

window.addEventListener("load", () => {
  startLocalStorage();
  renderizarUsuarios();
});

function renderizarUsuarios() {
  const usuarios = getLocalStorage("users") || [];
  const tbody = document.getElementById("usuarios-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  usuarios.forEach((u, índice) => {
    const tr = document.createElement("tr");
    const nombre = u.name || "";
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
                <button class="btn btn-sm btn-danger btn-delete-user" data-idx="${índice}">Eliminar</button>
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

function eliminarUsuario(índice) {
  const usuarios = getLocalStorage("users") || [];
  if (índice < 0 || índice >= usuarios.length) return;
  const usuario = usuarios[índice];
  if (!confirm(`Eliminar usuario ${usuario.name}?`)) return;
  usuarios.splice(índice, 1);
  setLocalStorage("users", usuarios);
  renderizarUsuarios();
}