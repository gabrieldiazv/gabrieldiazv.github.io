// *******************************FORMULARIO**********************************
const nombre = document.getElementById('nombre');
const mail = document.getElementById('mail');
const textarea = document.getElementById('textarea');

const formulario = document.getElementById('enviarFormulario');

const btnEnviar = document.getElementById('enviar');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const error = document.querySelector('p.error');

eventListeners();
function eventListeners(){

    document.addEventListener('DOMContentLoaded', iniciarApp);

    //validar formulario
    mail.addEventListener('blur',validarFormulario);
    textarea.addEventListener('blur',validarFormulario);
    nombre.addEventListener('blur',validarFormulario);

    btnEnviar.addEventListener('click', enviarEmail);

}

function iniciarApp (){
    btnEnviar.disabled = true;
    btnEnviar.style.opacity = '.7';
    
}

function validarFormulario(e){
    if(e.target.value.length > 0){
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        e.target.classList.remove('marco-rojo');
        e.target.classList.add('marco-verde');
        
    }else{
        e.target.classList.remove('marco-verde');
        e.target.classList.add('marco-rojo');
        mostrarError('Debe llenar los campos');
    }

    if(e.target.type === 'email'){
        
        if( er.test( e.target.value ) ) {
            // Elimina los errores...
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }
            e.target.classList.remove('marco-rojo');
            e.target.classList.add('marco-verde');
        } else {
            e.target.classList.remove('marco-verde');
            e.target.classList.add('marco-rojo');
            mostrarError('Email no válido');
        }
    }

    if( er.test( mail.value ) && nombre.value !== '' && textarea.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.style.opacity = '1';
    } 
    
}

function mostrarError(mensaje){
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add('error');
    
    const errores = formulario.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.insertBefore(error, btnEnviar);
    }
    
}

// Envia el email
function enviarEmail(e) {
    e.preventDefault();
    console.log('enviando..')
    // Mostrar el spinner
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';


    // Después de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = 'none';

        // Mensaje que dice que se envió correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('enviado');

        // Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); // Eliminar el mensaje de éxito

            resetearFormulario();
        }, 5000);
    }, 3000 );
}

// Función que resetea el formulario
function resetearFormulario() {
    nombre.classList.remove('marco-rojo');
    nombre.classList.remove('marco-verde');
    nombre.classList.add('marco-normal');
    nombre.classList.remove('marco-normal');

    textarea.classList.remove('marco-rojo');
    textarea.classList.remove('marco-verde');
    textarea.classList.add('marco-normal');
    textarea.classList.remove('marco-normal');

    mail.classList.remove('marco-rojo');
    mail.classList.remove('marco-verde');
    mail.classList.add('marco-normal');
    mail.classList.remove('marco-normal');

    formulario.reset();
    iniciarApp();
}