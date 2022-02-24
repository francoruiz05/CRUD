export class Producto {
  constructor(
    campoCodigo,
    campoProducto,
    campoDescripcion,
    campoCantidad,
    campoURL
  ) {
    this.codigo = campoCodigo;
    this.producto = campoProducto;
    this.descripcion = campoDescripcion;
    this.cantidad = campoCantidad;
    this.url = campoURL;
  }

  // agregar los get y set

  get mostrarCodigo() {
    return this.codigo;
  }
  get mostrarProducto() {
    return this.producto;
  }
  get mostrarCodigo() {
    return this.descripcion;
  }
  get mostrarCodigo() {
    return this.cantidad;
  }
  get mostrarCodigo() {
    return this.url;
  }

  // set

  set modificarCodigo(nuevoCodigo) {
    this.codigo = nuevoCodigo;
  }
  set modificarProducto(nuevoProducto) {
    this.producto = nuevoProducto;
  }
  set modificarDescripcion(nuevaDescripcion) {
    this.codigo = nuevaDescripcion;
  }
  set modificarCantidad(nuevaCantidad) {
    this.cantidad = nuevaCantidad;
  }
  set modificarURL(nuevoCodigo) {
    this.url = nuevoCodigo;
  }
}
