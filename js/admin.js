function campoRequerido(input){
 if (input.value.trim().length > 0){
  //  console.log ('paso')
     input.className = 'form-control is-valid';
     return true;
 }else{
// console.log('no paso')
     input.className = 'form-control is-invalid';
     return false;
 }
}

function validarNumeros (input) {
    // crear un expresion regular

    let patron = /^[0-9]{1,3}$/;
    //probar el funcionamiento del patron
    if(patron.test(input.value)) {
    // cumple la expresion regular
    input.className = 'form-control is-valid'
    return true;
}else {
    //si no cumple
    input.className = 'form-control is-invalid'
    return false;
}
}

function validarURL (input) {
 // crear expresion regular

    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if (patron.test(input.value)){ 
        input.className = 'form-control is-valid';
        return true;
}else{
    //si no cumple
        input.className = 'form-control is-invalid';
        return false;

}
}

function validarGral(e){
    e.preventDefault();
    //if (preguntar si el codigo es correcto && pregunto si es producto es correcto)
    let alerta = document.querySelector ('#msjAlerta')
    if (campoRequerido(campoCodigo) && 
    campoRequerido (campoProducto) &&
    campoRequerido (campoDescripcion) &&
    validarNumeros(campoCantidad) &&
    validarURL (campoURL)){
       // console.log ('si paso la validacion')
        alerta.className = 'alert alert-danger my-5 d-none'
    }else{
        //console.log ('no paso la validacion')
        
        alerta.className = "alert alert-danger my-5" ;
    }

}

//agregar eventos a los elementos del formulario

let campoCodigo = document.querySelector('#codigo');
let campoProducto = document.querySelector('#producto');
let campoDescripcion = document.querySelector('#descripcion');
let campoCantidad = document.querySelector('#cantidad')
let campoURL = document.querySelector ('#url')
let formularioProducto = document.querySelector ('#formProducto')

campoCodigo.addEventListener('blur', () => {campoRequerido(campoCodigo)});
campoProducto.addEventListener ('blur', ()=> {campoRequerido(campoProducto)} ) 
campoDescripcion.addEventListener ('blur', () => {campoRequerido(campoDescripcion)})
campoDescripcion.addEventListener ('blur', () => {validarNumeros(campoCantidad)})
campoURL.addEventListener ('blur', () => {validarURL(campoURL)})
formularioProducto.addEventListener ('submit', validarGral)
