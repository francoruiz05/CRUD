import {
  campoRequerido,
  validarGral,
  validarNumeros,
  validarURL,
} from "./validacion.js";
import { Producto } from "./productoClass.js";
//agregar eventos a los elementos del formulario

let campoCodigo = document.querySelector("#codigo");
let campoProducto = document.querySelector("#producto");
let campoDescripcion = document.querySelector("#descripcion");
let campoCantidad = document.querySelector("#cantidad");
let campoURL = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");

campoCodigo.addEventListener("blur", () => {
  campoRequerido(campoCodigo);
});
campoProducto.addEventListener("blur", () => {
  campoRequerido(campoProducto);
});
campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});
campoDescripcion.addEventListener("blur", () => {
  validarNumeros(campoCantidad);
});
campoURL.addEventListener("blur", () => {
  validarURL(campoURL);
});
formularioProducto.addEventListener("submit", guardarProducto);
//lista de producto
let listaProductos = JSON.parse(localStorage.getItem('listaProductosKey')) || []; 

function guardarProducto(e) {
  e.preventDefault();
  // validar los campos del formulario
  if (
    validarGral(
      campoCodigo,
      campoProducto,
      campoDescripcion,
      campoCantidad,
      campoURL
    )
  ) {
    // agregar o crear un producto
    crearProducto();
  }
}

function crearProducto() {
  console.log("aqui creo el producto");
  //crear el objeto producto
  let productoNuevo = new Producto(
    campoCodigo.value,
    campoProducto.value,
    campoDescripcion.value,
    campoCantidad.value,
    campoURL.value
  );
  console.log(productoNuevo);
  //guardar el producto creado en el arreglo
  listaProductos.push(productoNuevo)
  console.log (listaProductos)
  // limpiar el formulario
  limpiarFormulario();
  //guardar en localstorage el arreglo de productos
  guardarLocalStorage();
  //mostrar un msj al usuario
  Swal.fire(
    'Producto Creado!',
    'Su producto fue creado exitosamente!',
    'success'
  )

}

function limpiarFormulario (){
  // limpiar los value de todos los formularios
  formularioProducto.reset();
  // limpiar las clases
  campoCodigo.className = 'form-control'
  campoProducto.className = 'form-control'
  campoDescripcion.className = 'form-control'
  campoCantidad.className = 'form-control'
  campoURL.className = 'form-control'
}

function guardarLocalStorage(){
  localStorage.setItem('listaProductosKey', JSON.stringify(listaProductos));
}