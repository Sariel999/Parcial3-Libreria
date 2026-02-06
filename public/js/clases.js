class Usuario {
  constructor(id, nom, rol) {
    this.id = id;
    this.nom = nom;
    this.rol = rol;
  }
}

class Libro {
  constructor(id, tit, aut, gen,disp) {
    this.id = id;
    this.tit = tit;
    this.aut = aut;
    this.gen = gen;
    this.disp = disp;
  }
}

class Prestamo {
  constructor(id, idUsu, idLib) {
    this.id = id;
    this.idUsu = idUsu;
    this.idLib = idLib;
    this.fec = new Date().toISOString().slice(0, 10);
  }
}

class Sesion {
  static iniciar(usuario) {
    sessionStorage.setItem('sesion', JSON.stringify(usuario));
  }

  static obtener() {
    return JSON.parse(sessionStorage.getItem('sesion'));
  }

  static cerrar() {
    sessionStorage.removeItem('sesion');
  }
}

export { Usuario, Libro, Prestamo, Sesion };
