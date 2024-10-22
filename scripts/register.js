// Obtener elementos del DOM
const nombreLogin = document.getElementById('nombre_login');
const telefono = document.getElementById('telefono');
const email = document.getElementById('email');
const confirmarContraseña = document.getElementById('confirmarContraeña');
const contraseña = document.getElementById('contraeña');
const codigo = document.getElementById('codigo');

// Elementos para mostrar errores
const mensajeError = document.getElementById('mensajeErrorLogin');
const nombErrortext = document.getElementById('mensErrornombre');
const teleErrortext = document.getElementById('mensteleerror');
const emailErrortext = document.getElementById('mensEmailerror');
const contrErrortext = document.getElementById('mensErrorcontra');
const codigErrortext = document.getElementById('menscodierror');
const conficontraErrortext = document.getElementById('confcontrError');
const errorEmailRegistrado = document.querySelector('.errorEmailRegistrado');

const formularioLogin = document.getElementById('formularioLogin');

const nombreRegex = /^[A-Za-z]([\-\._]{1})?[A-Za-z0-9\-\._]{3,19}$/;
const telRegex = /^\d{8,10}$/;
const docRegex = /^\d{8,10}$/;
const emailRegex = /^[a-zA-Z0-9]{1,20}([.-_]{1}[a-zA-Z0-9]{1,10})?@[a-zA-Z0-9]{1,10}([-.]{1}[a-zA-Z0-9]{1,20})?\.[a-zA-Z0-9]{2,6}$/;
const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\+\-\*\^\/@\{\}\[\]\)\(\.=,%()\?!"#$&\|°]).{8,10}$/;


// Función para alternar la visibilidad de la contraseña
function togglePasswordVisibility(passwordFieldId, iconId) {
    const passwordField = document.getElementById(passwordFieldId);
    const icon = document.getElementById(iconId);

    icon.addEventListener('click', function () {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type); // Cambiamos el tipo de input

        if (type === 'password') {
            icon.classList.remove('bx-hide'); // Remueve ícono de ocultar
            icon.classList.add('bx-show-alt'); // Muestra el ícono de mostrar contraseña
        } else {
            icon.classList.remove('bx-show-alt'); // Remueve ícono de mostrar
            icon.classList.add('bx-hide'); // Muestra el ícono de ocultar
        }
    });
}

// Aplicamos la función a ambos campos
togglePasswordVisibility('contraeña', 'togglePassword');
togglePasswordVisibility('confirmarContraeña', 'toggleConfirmPassword');

// Función para validar un campo
const validarCampo = (regex, input) => {
    if (regex.test(input.value) || input.value=="") {  
        return true;
    } else {
        return false;
    }
};


document.addEventListener("DOMContentLoaded", () => {
    nombreLogin.addEventListener("input",()=>{
        if(!validarCampo(nombreRegex,nombreLogin)){
            nombErrortext.innerText="El nombre debe contener al menos 3 letras."
        }else{
            nombErrortext.innerText=""
        }
    })
    telefono.addEventListener("input",()=>{
        if(!validarCampo(telRegex,telefono)){
            teleErrortext.innerText="El telefono debe contener mínimo 8 caracteres numericos."
        }else{
             teleErrortext.innerText=""
        }
    })
    email.addEventListener("input",()=>{
        if(!validarCampo(emailRegex,email)){
            emailErrortext.innerText="Ingrese una dirección de correo válida."
        }else{
            emailErrortext.innerText=""
        }
    })
    contraseña.addEventListener("input", ()=>{
        if(!validarCampo(contraseñaRegex, contraseña)){
            contrErrortext.innerText="La contraseña debe contener entre 8 y 15 caracteres con mayúsculas, minúsculas, números y caracteres especiales."
        }else{
            contrErrortext.innerText=""
        }
    })
    confirmarContraseña.addEventListener("input",()=>{
        if(confirmarContraseña.value!=contraseña.value){
            conficontraErrortext.innerText="La contraseña no coincide."
        }else{
            conficontraErrortext.innerText=""
        }
        if(confirmarContraseña.value==""){
            conficontraErrortext.innerText=""
        }
    })

})

// Función para hashear la contraseña usando SHA-256
async function hashPassword(password) {
    const key = "Qwerty123*"; 
    const contraseñaEncriptada = CryptoJS.AES.encrypt(password, key).toString();
    
    return contraseñaEncriptada
}

formularioLogin.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const bdUsers = await JSON.parse(localStorage.getItem('usuarios')) || []
    console.log(bdUsers)
    if(bdUsers){
        const existeCorreo = bdUsers.some(user => user.Email === email.value);
        if(existeCorreo){
            //ESTABLECER EL MODAL ALERT
            errorEmailRegistrado.innerHTML="Ups! El correo utilizado ya se encuentra registrado."
            console.log("El correo ya se encuentra registrado.")
            return
        }
        const existeDocumento = bdUsers.some(user => user.Codigo === codigo.value);
        if(existeDocumento){
            //ESTABLECER EL MODAL ALERT
            errorEmailRegistrado.innerHTML="Ups! El estudiante ya se encuentra registrado."
            console.log("El correo ya se encuentra registrado.")
            return
        }
    }

    const userId = bdUsers.length === 0 ? 1 : Math.max(...bdUsers.map(user => user.id)) + 1;
        const contraseñaEncriptada = await hashPassword(contraseña.value);

        const objetoUser = {
            id: userId,
            Rol: "Estudiante",
            Nombre: nombreLogin.value,
            Telefono: telefono.value,
            Codigo: codigo.value,
            Email: email.value,
            Contraseña: contraseñaEncriptada
        };

        bdUsers.push(objetoUser);
        localStorage.setItem('usuarios', JSON.stringify(bdUsers));
        window.location.href='login.html'


})


// // Clase para mostrar mensajes de error
// class Mensaje {
//     constructor(input, mensajeObj, confirmarContraseña) {
//         this.input = input;
//         this.mensaje = mensajeObj;
//         this.confirmacionCon = confirmarContraseña;
//         this.init();
//     }

//     init() {
//         this.input.addEventListener('input', () => this.validar());
//     }

//     validar() {
//         const inputActual = this.input.value;

//         if (this.input === nombreLogin) {
//             this.mensaje.innerText = /^[A-Za-z]([\-\._]{1})?[A-Za-z0-9\-\._]{3,19}$/.test(inputActual)
//                 ? ""
//                 : "Nombre inválido. Debe tener mínimo 4 caracteres, máximo 20, y comenzar con letras.";
//         }

//         if (this.input === telefono) {
//             this.mensaje.innerText = /^\d{8,10}$/.test(inputActual)
//                 ? ""
//                 : "Ingresa un número válido (8-10 dígitos).";
//         }

//         if (this.input === codigo) {
//             this.mensaje.innerText = /^\d{8,10}$/.test(inputActual)
//                 ? ""
//                 : "Ingresa un código válido (8-10 dígitos).";
//         }

//         if (this.input === email) {
//             this.mensaje.innerText = /^[a-zA-Z0-9]{1,20}([.-_]{1}[a-zA-Z0-9]{1,10})?@[a-zA-Z0-9]{1,10}([-.]{1}[a-zA-Z0-9]{1,20})?\.[a-zA-Z0-9]{2,6}$/.test(inputActual)
//                 ? ""
//                 : "Ingresa un correo válido.";
//         }

//         if (this.input === contraeña) {
//             this.mensaje.innerText = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\+\-\*\^\/@\{\}\[\]\)\(\.=,%()\?!"#$&\|°]).{8,10}$/.test(inputActual)
//                 ? ""
//                 : "La contraseña debe contener 8 dígitos, mayúsculas, minúsculas, caracteres especiales y números.";
//         }

//         if (this.input === confirmarContraeña) {
//             this.mensaje.innerText = this.input.value === this.confirmacionCon.value
//                 ? ""
//                 : "Las contraseñas no son iguales.";
//         }
//     }
// }

// Manejo del envío del formulario
// formularioLogin.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const bdlogin = JSON.parse(localStorage.getItem('usuarios')) || [];
//     const errorMessages = [
//         teleErrortext.innerText,
//         nombErrortext.innerText,
//         emailErrortext.innerText,
//         contrErrortext.innerText,
//         conficontraErrortext.innerText,
//         codigErrortext.innerText
//     ];

//     if (errorMessages.every(msg => msg === "")) {
//         const existeCorreo = bdlogin.some(ele => ele.Email === email.value);

//         if (existeCorreo) {
//             alert("El correo ya fue creado.");
//             return;
//         }

        // const IdLogin = bdlogin.length === 0 ? 1 : Math.max(...bdlogin.map(element => element.id)) + 1;
        // const contraseñaEncriptada = await hashPassword(contraeña.value);

        // const objetoLogin = {
        //     id: IdLogin,
        //     Rol: "Estudiante",
        //     Nombre: nombreLogin.value,
        //     Telefono: telefono.value,
        //     Codigo: codigo.value,
        //     Email: email.value,
        //     Contraseña: contraseñaEncriptada
        // };

        // bdlogin.push(objetoLogin);
        // localStorage.setItem('usuarios', JSON.stringify(bdlogin));
        // window.location.href='login.html'
//         alert("Usuario creado con éxito.");
//     }
// });

// // Inicialización de los mensajes de error
// const mensajes = [
//     new Mensaje(nombreLogin, nombErrortext),
//     new Mensaje(telefono, teleErrortext),
//     new Mensaje(email, emailErrortext),
//     new Mensaje(contraeña, contrErrortext),
//     new Mensaje(confirmarContraeña, conficontraErrortext, contraeña),
//     new Mensaje(codigo, codigErrortext)
// ];

// Manejo de inicio y registro
// const btnSignIn = document.getElementById("sign-in");
// const btnSignUp = document.getElementById("sign-up");
// const containerFormRegister = document.querySelector(".register");
// const containerFormLogin = document.querySelector(".login");

// btnSignIn.addEventListener("click", () => {
//     containerFormRegister.classList.add("hide");
//     containerFormLogin.classList.remove("hide");
// });

// btnSignUp.addEventListener("click", () => {
//     containerFormLogin.classList.add("hide");
//     containerFormRegister.classList.remove("hide");
// });
