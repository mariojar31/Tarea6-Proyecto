const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');

function enviarFormulario(){

    const mensajesError = [];
    if(nombre.value === null || nombre.value === ''){
        mensajesError.push('Ingresa tu nombre');
    }

    if(correo.value === null || correo.value === ''){
        mensajesError.push('Ingresa tu correo');
    }

    if(telefono.value === null || telefono.value === ''){
        mensajesError.push('Ingresa tu telefono');
    }
    
    if(mensajesError.length >0){
    window.alert(mensajesError.join(', '));
    return false;
    }

    return true;
}