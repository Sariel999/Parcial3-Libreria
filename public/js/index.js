console.log('JS cargado correctamente');

/* ===============================
   DOM
================================ */
const tblBody = document.getElementById('tblBody');
let dt = null;

/* ===============================
   DATA
================================ */
let libros = [];

/* ===============================
   ALERTAS
================================ */
const okMsg = (msg) => {
  Swal.fire({ icon: 'success', title: 'EXITO', text: msg });
};

const errMsg = (msg) => {
  Swal.fire({ icon: 'error', title: 'Error', text: msg });
};

/* ===============================
   UTIL
================================ */
const genId = () =>
  libros.length ? Math.max(...libros.map(l => l.id)) + 1 : 1;

const mkLibro = (obj) => ({
  id: obj.id,
  titulo: obj.titulo,
  autor: obj.autor,
  genero: obj.genero,
  disp: Boolean(obj.disp)
});

/* ===============================
   LOAD
================================ */
const loadLibros = () => {
  libros = [
    mkLibro({ id: 1, titulo: '1984', autor: 'George Orwell', genero: 'Ficcion', disp: true }),
    mkLibro({ id: 2, titulo: 'Clean Code', autor: 'Robert Martin', genero: 'Programacion', disp: true }),
    mkLibro({ id: 3, titulo: 'El Principito', autor: 'Antoine de Saint-Exupery', genero: 'Literatura', disp: false })
  ];
};

/* ===============================
   READ
================================ */
const displayLibros = (data) => {
  if (dt) {
    dt.destroy();
    dt = null;
  }

  tblBody.innerHTML = '';

  data.forEach(l => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${l.id}</td>
      <td>${l.titulo}</td>
      <td>${l.autor}</td>
      <td>${l.genero}</td>
      <td>${l.disp ? 'Si' : 'No'}</td>
      <td>
        <button class="btn btn-danger btn-sm" data-id="${l.id}">
          Eliminar
        </button>
      </td>
    `;
    tblBody.appendChild(tr);
  });

  dt = new DataTable('#tblLibros', {
    pageLength: 5,
    responsive: true
  });
};

/* ===============================
   CREATE
================================ */
const addLibro = (data) => {
  if (!data.titulo || !data.autor || !data.genero) {
    errMsg('Campos incompletos');
    return;
  }

  libros.push(
    mkLibro({
      id: genId(),
      titulo: data.titulo,
      autor: data.autor,
      genero: data.genero,
      disp: true
    })
  );

  okMsg('Libro agregado');
  displayLibros(libros);
};

/* ===============================
   DELETE
================================ */
const delLibro = (id) => {
  libros = libros.filter(l => l.id !== Number(id));
  okMsg(`Libro eliminado ${id}`);
  displayLibros(libros);
};

/* ===============================
   EVENTS
================================ */
tblBody.addEventListener('click', async (e) => {
  const btn = e.target.closest('.btn-danger');
  if (!btn) return;

  const id = btn.dataset.id;

  const res = await Swal.fire({
    icon: 'warning',
    title: `Eliminar libro ${id}?`,
    showCancelButton: true,
    confirmButtonText: 'Eliminar'
  });

  if (res.isConfirmed) delLibro(id);
});

/* ===============================
   DOM READY
================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadLibros();
  displayLibros(libros);
});
