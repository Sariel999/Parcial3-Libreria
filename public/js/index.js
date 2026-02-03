console.log('JS cargado correctamente');

/* ===============================
   REFERENCIAS DOM
================================ */

const listaLibros = document.getElementById('listaLibros');
const inputBusqueda = document.getElementById('busqueda');

/* ===============================
   DATA (MODELO)
================================ */

let libros = [];

/* ===============================
   MENSAJES DE ERROR / EXITO
================================ */

const getMessage = (type, code) => {
  const messages = {
    RESERVA: {
      success: 'Libro reservado correctamente',
      error: 'El libro no esta disponible'
    },
    DEVOLUCION: {
      success: 'Libro devuelto correctamente'
    },
    GENERAL: {
      error: 'Ocurrio un error inesperado'
    }
  };

  return messages[type]?.[code] || 'Mensaje no definido';
};

const showError = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message
  });
};

const showSuccess = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'EXITO',
    text: message
  });
};

/* ===============================
   CREAR LIBRO (FUNCION DINAMICA)
================================ */

const crearLibro = ({ id, titulo, autor, genero, disponible = true }) => ({
  id,
  titulo,
  autor,
  genero,
  disponible
});

/* ===============================
   CARGAR LIBROS
================================ */

const loadLibros = () => {
  libros = [
    crearLibro({ id: 1, titulo: '1984', autor: 'George Orwell', genero: 'Ficcion' }),
    crearLibro({ id: 2, titulo: 'Clean Code', autor: 'Robert Martin', genero: 'Programacion' }),
    crearLibro({ id: 3, titulo: 'El Principito', autor: 'Antoine de Saint-Exupery', genero: 'Literatura', disponible: false })
  ];
};

/* ===============================
   MOSTRAR LIBROS (VISTA)
================================ */

const displayLibros = (data) => {
  listaLibros.innerHTML = '';

  if (!data.length) {
    listaLibros.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">No hay libros disponibles</p>
      </div>
    `;
    return;
  }

  data.forEach(libro => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-3';

    col.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${libro.titulo}</h5>
          <p class="card-text">
            <strong>Autor:</strong> ${libro.autor}<br>
            <strong>Genero:</strong> ${libro.genero}
          </p>

          <button class="btn btn-success btn-sm me-2"
            ${!libro.disponible ? 'disabled' : ''}
            onclick="reservarLibro(${libro.id})">
            Reservar
          </button>

          <button class="btn btn-warning btn-sm"
            onclick="devolverLibro(${libro.id})">
            Devolver
          </button>
        </div>
      </div>
    `;

    listaLibros.appendChild(col);
  });
};

/* ===============================
   RESERVAR LIBRO
================================ */

const reservarLibro = async (id) => {
  const libro = libros.find(l => l.id === id);

  if (!libro || !libro.disponible) {
    showError(getMessage('RESERVA', 'error'));
    return;
  }

  // simulacion asincronica
  await new Promise(resolve => setTimeout(resolve, 800));

  libro.disponible = false;
  showSuccess(getMessage('RESERVA', 'success'));
  displayLibros(libros);

  setTimeout(() => {
    Swal.fire({
      icon: 'info',
      title: 'Recordatorio',
      text: `Recuerda devolver el libro "${libro.titulo}"`
    });
  }, 2000);
};

/* ===============================
   DEVOLVER LIBRO
================================ */

const devolverLibro = async (id) => {
  const libro = libros.find(l => l.id === id);

  if (!libro) {
    showError(getMessage('GENERAL', 'error'));
    return;
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  libro.disponible = true;
  showSuccess(getMessage('DEVOLUCION', 'success'));
  displayLibros(libros);
};

/* ===============================
   FILTRO / BUSQUEDA
================================ */

const filterLibros = (text) => {
  const value = text.toLowerCase();

  const filtered = libros.filter(l =>
    l.titulo.toLowerCase().includes(value) ||
    l.autor.toLowerCase().includes(value) ||
    l.genero.toLowerCase().includes(value)
  );

  displayLibros(filtered);
};

/* ===============================
   DOM READY
================================ */

document.addEventListener('DOMContentLoaded', () => {
  loadLibros();
  displayLibros(libros);

  inputBusqueda.addEventListener('input', (e) => {
    filterLibros(e.target.value);
  });
});
