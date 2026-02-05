import { Usuario, Libro } from './clases.js';

export const usuarios = [
  new Usuario(1, 'admin', 'admin'),
  new Usuario(2, 'sariel', 'usuario'),
  new Usuario(3, 'stalyn', 'usuario')
];

export const credenciales = {
  admin: 'admin123',
  sariel: '123',
  stalyn: '123'
};

export let libros = [
  new Libro(1, '1984', 'George Orwell', 'Ficcion'),
  new Libro(2, 'Clean Code', 'Robert Martin', 'Programacion'),
  new Libro(3, 'Luna de Pluton', 'Dross', 'Terror'),
  new Libro(4, 'El festival de la blasfemia', 'Dross', 'Terror'),
  new Libro(5, 'Virtual Hero', 'Willyrex', 'Aventura'),
  new Libro(6, 'Virtual Hero 2', 'Willyrex', 'Aventura'),
  new Libro(7, 'Dioses falsos', 'Jordi Wild', 'Misterio'),
  new Libro(8, 'Encuentros', 'Jordi Wild', 'Misterio')
];


export let prestamos = [];

export const genId = (arr) =>
  arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
