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
//caso contrario quiero modificar
let btnAgregar = document.querySelector ('#btnAgregar');

campoCodigo.addEventListener("blur", () => {campoRequerido(campoCodigo);});
campoProducto.addEventListener("blur", () => {campoRequerido(campoProducto);});
campoDescripcion.addEventListener("blur", () => {campoRequerido(campoDescripcion);});
campoDescripcion.addEventListener("blur", () => {validarNumeros(campoCantidad);});
campoURL.addEventListener("blur", () => {validarURL(campoURL);});
formularioProducto.addEventListener("submit", guardarProducto);
btnAgregar.addEventListener ('click', limpiarFormulario)

//lista de producto
let listaProductos = JSON.parse(localStorage.getItem("listaProductosKey")) || [];
let productoExistente = false; // si productoExiste = false quiero crear un nuevo producto sino quiero modificar


//llamar la funcion cargainicial

cargarInicial();

function guardarProducto(e) {
  e.preventDefault();
  // validar los campos del formulario
  if (
    validarGral(campoCodigo,campoProducto,campoDescripcion,campoCantidad,campoURL)
  ) {
    if(productoExistente == false ){
      //  caso 1 agregar o crear un producto
      crearProducto();
    }else {
      
      // caso 2 el usuario quiere editar un producto
      modificarProducto();
    }
    
  }
}
function crearProducto() {

  console.log("aqui creo el producto");
  //crear el objeto producto
  let productoNuevo = new Producto(
    campoCodigo.value,campoProducto.value,campoDescripcion.value,campoCantidad.value,campoURL.value
  );
  console.log(productoNuevo);
  //guardar el producto creado en el arreglo
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  // limpiar el formulario
  limpiarFormulario();
  //guardar en localstorage el arreglo de productos
  guardarLocalStorage();
  //mostrar un msj al usuario
  Swal.fire(
    "Producto Creado!",
    "Su producto fue creado exitosamente!",
    "success"
  );
  // creo una nueva fila en la tabla
  crearfila(productoNuevo);
}

function limpiarFormulario() {
  // limpiar los value de todos los formularios
  formularioProducto.reset();
  // limpiar las clases
  campoCodigo.className = "form-control";
  campoProducto.className = "form-control";
  campoDescripcion.className = "form-control";
  campoCantidad.className = "form-control";
  campoURL.className = "form-control";
}

function guardarLocalStorage() {
  localStorage.setItem("listaProductosKey", JSON.stringify(listaProductos));
}

function crearfila(producto) {
  let tabla = document.querySelector("#tablaProductos");
  tabla.innerHTML += `<tr>
  <td>${producto.codigo}</td>
  <td>${producto.producto}</td>
  <td>${producto.descripcion}</td>
  <td>${producto.cantidad}</td>
  <td>${producto.url}</td>
  <td>
    <button class="btn btn-warning" onclick="prepararEdicion('${producto.codigo}')">Editar</button>
    <button class="btn btn-danger" onclick="borrarProducto('${producto.codigo}')" >Borrar</button>
  </td>
</tr>`;
}

function cargarInicial() {
  // si hay datos en localstorage o en listasproductos, dibujo filas
  if (listaProductos.length > 0) {
    // dibujar fila
    listaProductos.forEach((itemProducto) => {
      crearfila(itemProducto);
    });
  }
}

function borrarTabla() {
  let tabla = document.querySelector("#tablaProductos");
  tabla.innerHTML = "";
}

window.prepararEdicion = function (codigo) {
  console.log(codigo);
  // obtener el objeto a modificar
  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo == codigo;
  });
  console.log(productoBuscado);
  // mostrar los datos en el form
  campoCodigo.value = productoBuscado.codigo;
  campoProducto.value = productoBuscado.producto;
  campoDescripcion.value = productoBuscado.descripcion;
  campoCantidad.value = productoBuscado.cantidad;
  campoURL.value = productoBuscado.url;
  //aqui modifico la variable boleana
  productoExistente = true;
};

function modificarProducto() {
  console.log("aqui quiero modif este producto");
  // buscar la posicion de mi producto dentro del arreglo
  let posicionProducto = listaProductos.findIndex((itemProducto)=> {return itemProducto.codigo == campoCodigo.value })
  console.log (posicionProducto);
  // modificar los datos de ese producto dentro del arreglo
  listaProductos[posicionProducto].producto = campoProducto.value
  listaProductos[posicionProducto].descripcion = campoDescripcion.value
  listaProductos[posicionProducto].cantidad = campoCantidad.value
  listaProductos[posicionProducto].url = campoURL.value
  // actualizar los datos del localstorage
  guardarLocalStorage ();
  // mostrar un cartel al usuario

  //limpiar los datos del formulario

  limpiarFormulario()
  Swal.fire(
    "Producto Modificado!",
    "Su producto fue modificado exitosamente!",
    "success");

  // actualizar la tabla

}

window.borrarProducto = function (codigo){

  //borro el producto del arreglo
  let arregloBorrado = listaProductos.filter ((itemProducto) => {return itemProducto.codigo != codigo})
  console.log(arregloBorrado);
  //actualizado los datos en localstorage
  listaProductos = arregloBorrado;
  guardarLocalStorage();
  //actualizar los datos de la tabla
  borrarTabla()
  //dibujar fila
  listaProductos.forEach((itemProducto) => {crearfila(itemProducto);});

  // mostrar mensaje
  Swal.fire(
    "Producto Eliminado!",
    "Su producto fue eliminado del sistema!",
    "success");
}
