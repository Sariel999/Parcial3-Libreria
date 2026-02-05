import { usuarios, credenciales } from './data.js';
import { Sesion } from './clases.js';

const frm = document.getElementById('frmLogin');
const nom = document.getElementById('nom');
const pass = document.getElementById('pass');

const error = (t) =>
  Swal.fire({ icon: 'error', title: 'Error', text: t });

frm.addEventListener('submit', (e) => {
  e.preventDefault();

  const u = nom.value.trim();
  const p = pass.value.trim();

  if (!u || !p) return error('Complete los campos');
  if (!credenciales[u] || credenciales[u] !== p)
    return error('Credenciales incorrectas');

  const user = usuarios.find(x => x.nom === u);
  Sesion.iniciar(user);

  window.location.replace(
    user.rol === 'admin' ? 'admin.html' : 'usuario.html'
  );
});
