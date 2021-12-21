function campoRequerido(input){
 if (input.value.trin().length > 0) {
     console.log ('paso')
 }else{
     console.log('no paso')
 }
}

//agregar eventos a los elementos del formulario

let campoCodigo = document.querySelector('#codigo');


campoCodigo.addEventListener('blur',() => {campoRequerido(campoCodigo)});
