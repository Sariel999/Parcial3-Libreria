import { libros, prestamos, usuarios, genId } from './data.js';
import { Libro, Sesion } from './clases.js';

const ses = Sesion.obtener();
if (!ses || ses.rol !== 'admin') {
  window.location.replace('login.html');
}

document.getElementById('lblAdm').textContent = ses.nom;

const tblLib = document.getElementById('tblLib');
const tblPre = document.getElementById('tblPre');
const q = document.getElementById('q');

const pintarLib = (arr) => {
  tblLib.innerHTML = '';
  arr.forEach(l => {
    tblLib.innerHTML += `
      <tr>
        <td>${l.id}</td>
        <td class="ed" data-f="tit">${l.tit}</td>
        <td class="ed" data-f="aut">${l.aut}</td>
        <td class="ed" data-f="gen">${l.gen}</td>
        <td>${l.disp ? 'Si' : 'No'}</td>
        <td>
          <button class="btn btn-danger btn-sm" data-id="${l.id}">
            Eliminar
          </button>
        </td>
      </tr>
    `;
  });
};

const pintarPre = () => {
  tblPre.innerHTML = '';

  if (!prestamos.length) {
    tblPre.innerHTML = `
      <tr>
        <td colspan="6" class="text-muted text-center">
          Sin reservas
        </td>
      </tr>
    `;
    return;
  }

  prestamos.forEach(p => {
    const u = usuarios.find(x => x.id === p.idUsu);
    const l = libros.find(x => x.id === p.idLib);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u ? u.nom : 'No encontrado'}</td>
      <td>${l ? l.tit : 'No encontrado'}</td>
      <td>${l ? l.aut : '-'}</td>
      <td>${l ? l.gen : '-'}</td>
      <td>${p.fec}</td>
      <td>
        <span class="badge ${l && !l.disp ? 'bg-warning text-dark' : 'bg-success'}">
          ${l && !l.disp ? 'Reservado' : 'Libre'}
        </span>
      </td>
    `;
    tblPre.appendChild(tr);
  });
};


document.getElementById('btnNuevo').addEventListener('click', async () => {
  const res = await Swal.fire({
    title: 'Nuevo libro',
    html: `
      <input id="tit" class="swal2-input" placeholder="Titulo">
      <input id="aut" class="swal2-input" placeholder="Autor">
      <input id="gen" class="swal2-input" placeholder="Genero">
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    preConfirm: () => {
      const tit = document.getElementById('tit').value.trim();
      const aut = document.getElementById('aut').value.trim();
      const gen = document.getElementById('gen').value.trim();

      if (!tit || !aut || !gen) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        return false;
      }
      if (tit.length < 2 || aut.length < 2 || gen.length < 2) {
        Swal.showValidationMessage('Los textos son muy cortos');
        return false;
      }

      return { tit, aut, gen };
    }
  });

  if (!res.isConfirmed) return;

  libros.push(new Libro(genId(libros), res.value.tit, res.value.aut, res.value.gen));
  pintarLib(libros);

  Swal.fire({
    icon: 'success',
    title: 'Exito',
    text: 'Libro creado correctamente'
  });
});


tblLib.addEventListener('dblclick', (e) => {
  const cel = e.target;

  if (!cel.classList.contains('ed')) return;

  const tr = cel.closest('tr');
  const id = Number(tr.children[0].textContent);
  const campo = cel.dataset.f;
  const oldVal = cel.textContent;

  const inp = document.createElement('input');
  inp.className = 'form-control form-control-sm';
  inp.value = oldVal;

  cel.textContent = '';
  cel.appendChild(inp);
  inp.focus();

  const guardar = () => {
    const nuevo = inp.value.trim();
    if (!nuevo || nuevo === oldVal) {
      cel.textContent = oldVal;
      return;
    }

    const l = libros.find(x => x.id === id);
    if (!l) {
      cel.textContent = oldVal;
      return;
    }

    l[campo] = nuevo;
    cel.textContent = nuevo;
  };

  inp.addEventListener('blur', guardar);
  inp.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') inp.blur();
    if (ev.key === 'Escape') cel.textContent = oldVal;
  });
});


tblLib.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;

  const id = Number(btn.dataset.id);

  Swal.fire({
    title: 'Estas seguro?',
    text: "No podras revertir esto",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (!result.isConfirmed) return;

    // validacion: no eliminar si esta reservado
    if (prestamos.some(p => p.idLib === id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'The book is currently reserved'
      });
      return;
    }

    const index = libros.findIndex(l => l.id === id);
    if (index === -1) return;

    libros.splice(index, 1);

    Swal.fire({
      title: 'Deleted!',
      text: 'The book has been deleted.',
      icon: 'success'
    });

    pintarLib(libros);
  });
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
pintarPre();
