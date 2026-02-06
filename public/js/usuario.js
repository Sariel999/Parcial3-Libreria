import { libros, prestamos, genId } from './data.js';
import { Prestamo, Sesion } from './clases.js';

const ses = Sesion.obtener();
if (!ses || ses.rol !== 'usuario') {
  window.location.replace('login.html');
}

document.getElementById('lblUsu').textContent = ses.nom;

const lstLib = document.getElementById('lstLib');
const tblMis = document.getElementById('tblMis');
const q = document.getElementById('q');

const pintarLib = (arr) => {
  lstLib.innerHTML = '';

  arr.forEach(l => {
    const reservado = !l.disp;

    lstLib.innerHTML += `
      <div class="libro">
        <h5>${l.tit}</h5>
        <div class="mut">${l.aut} | ${l.gen}</div>

        <button class="btn btn-sm mt-2 
          ${reservado ? 'btn-secondary' : 'btn-primary'}"
          ${reservado ? 'disabled' : ''}
          data-id="${l.id}">
          
          ${reservado ? 'Reservado' : 'Reservar'}

        </button>
      </div>
    `;
  });
};


const pintarMis = () => {
  tblMis.innerHTML = '';
  prestamos.filter(p => p.idUsu === ses.id)
    .forEach(p => {
      const l = libros.find(x => x.id === p.idLib);
      tblMis.innerHTML += `
        <tr>
          <td>${l.tit}</td>
          <td>${p.fec}</td>
          <td>
            <button class="btn btn-danger btn-sm" data-id="${p.id}">
              Devolver
            </button>
          </td>
        </tr>
      `;
    });
};

lstLib.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const l = libros.find(x => x.id === id);

  if (!l || !l.disp) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Libro no disponible'
    });
  }

  const res = await Swal.fire({
    icon: 'question',
    title: 'Confirmar',
    text: `Reservar "${l.tit}"?`,
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  });

  if (!res.isConfirmed) return;

  l.disp = false;
  prestamos.push(new Prestamo(genId(prestamos), ses.id, l.id));

  Swal.fire({
    icon: 'success',
    title: 'Exito',
    text: 'Libro reservado'
  });

  pintarLib(libros);
  pintarMis();
});


tblMis.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const p = prestamos.find(x => x.id === id);
  if (!p) return;

  const l = libros.find(x => x.id === p.idLib);

  const res = await Swal.fire({
    icon: 'warning',
    title: 'Confirmar',
    text: `Devolver "${l.tit}"?`,
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  });

  if (!res.isConfirmed) return;

  l.disp = true;
  prestamos.splice(prestamos.indexOf(p), 1);

  Swal.fire({
    icon: 'success',
    title: 'Exito',
    text: 'Libro devuelto'
  });

  pintarLib(libros);
  pintarMis();
});


q.addEventListener('input', () => {
  const v = q.value.toLowerCase();
  pintarLib(libros.filter(l =>
    l.tit.toLowerCase().includes(v) ||
    l.aut.toLowerCase().includes(v) ||
    l.gen.toLowerCase().includes(v)
  ));
});

document.getElementById('btnSalir').addEventListener('click', () => {
  Sesion.cerrar();
  window.location.replace('login.html');
});

pintarLib(libros);
pintarMis();
