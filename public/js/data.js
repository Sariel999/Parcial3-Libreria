import { Usuario, Libro } from './clases.js';


export const GENEROS = [
  'Ficción',
  'Programación',
  'Terror',
  'Aventura',
  'Misterio',
  'Ciencia',
  'Historia',
  'Romance',
  'Fantasía',
  'Biografía'
];


export const opcionesGenero = GENEROS
  .map(g => `<option value="${g}">${g}</option>`)
  .join('');

export const usuarios = [
  new Usuario(1, 'admin', 'admin'),
  new Usuario(2, 'sariel', 'usuario'),
  new Usuario(3, 'stalyn', 'usuario'),
  new Usuario(4, 'juda', 'admin'),
  new Usuario(5, 'nz', 'usuario')
];

export const credenciales = {
  admin: 'admin123',
  sariel: '123',
  stalyn: '123',
  juda: '123',
  nz: '123'
};

export let libros = [
  new Libro(1, '1984', 'George Orwell', 'Ficción',true),
  new Libro(2, 'Clean Code', 'Robert Martin', 'Programación',true),
  new Libro(3, 'Luna de Pluton', 'Dross', 'Terror',true),
  new Libro(4, 'El festival de la blasfemia', 'Dross', 'Terror',true),
  new Libro(5, 'Virtual Hero', 'Willyrex', 'Aventura',true),
  new Libro(6, 'Virtual Hero 2', 'Willyrex', 'Aventura',true),
  new Libro(7, 'Dioses falsos', 'Jordi Wild', 'Misterio',false),
  new Libro(8, 'Encuentros', 'Jordi Wild', 'Misterio',true),
  new Libro(9, 'El Hobbit', 'J.R.R. Tolkien', 'Fantasía',false),
  new Libro(10, 'Meridiano de Sangre', 'Cormac McCarthy', 'Terror',true),
  new Libro(11, 'El hombre de la caverna', 'Jordi Wild', 'Misterio',true)
];


export let prestamos = [
  {
    id: 1,
    idUsu: 2,
    idLib: 7,
    fec: "2026-02-05"
  },
  {
    id: 2,
    idUsu: 3,
    idLib: 9,
    fec: "2026-02-05"
  }
];


export const genId = (arr) =>
  arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
