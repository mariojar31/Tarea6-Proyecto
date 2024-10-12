// Obtener elementos del DOM
const nombreLogin = document.getElementById('nombre_login');
const telefono = document.getElementById('telefono');
const email = document.getElementById('email');
const confirmarContraeña = document.getElementById('confirmarContraeña');
const contraeña = document.getElementById('contraeña');
const codigo = document.getElementById('codigo');

// Elementos para mostrar errores
const mensajeError = document.getElementById('mensajeErrorLogin');
const nombErrortext = document.getElementById('mensErrornombre');
const teleErrortext = document.getElementById('mensteleerror');
const emailErrortext = document.getElementById('mensEmailerror');
const contrErrortext = document.getElementById('mensErrorcontra');
const codigErrortext = document.getElementById('menscodierror');
const conficontraErrortext = document.getElementById('confcontrError');

const formularioLogin = document.getElementById('formularioLogin');

// Función para hashear la contraseña usando SHA-256
async function hashPassword(password) {
    const key = "Qwerty123*"; // Debes definir una llave secreta para cifrar/desencriptar
    const contraseñaEncriptada = CryptoJS.AES.encrypt(password, key).toString();
    console.log
    return contraseñaEncriptada
}

// Clase para mostrar mensajes de error
class Mensaje {
    constructor(input, mensajeObj, confirmarContraseña) {
        this.input = input;
        this.mensaje = mensajeObj;
        this.confirmacionCon = confirmarContraseña;
        this.init();
    }

    init() {
        this.input.addEventListener('input', () => this.validar());
    }

    validar() {
        const inputActual = this.input.value;

        if (this.input === nombreLogin) {
            this.mensaje.innerText = /^[A-Za-z]([\-\._]{1})?[A-Za-z0-9\-\._]{3,19}$/.test(inputActual)
                ? ""
                : "Nombre inválido. Debe tener mínimo 4 caracteres, máximo 20, y comenzar con letras.";
        }

        if (this.input === telefono) {
            this.mensaje.innerText = /^\d{8,10}$/.test(inputActual)
                ? ""
                : "Ingresa un número válido (8-10 dígitos).";
        }

        if (this.input === codigo) {
            this.mensaje.innerText = /^\d{8,10}$/.test(inputActual)
                ? ""
                : "Ingresa un código válido (8-10 dígitos).";
        }

        if (this.input === email) {
            this.mensaje.innerText = /^[a-zA-Z0-9]{1,20}([.-_]{1}[a-zA-Z0-9]{1,10})?@[a-zA-Z0-9]{1,10}([-.]{1}[a-zA-Z0-9]{1,20})?\.[a-zA-Z0-9]{2,6}$/.test(inputActual)
                ? ""
                : "Ingresa un correo válido.";
        }

        if (this.input === contraeña) {
            this.mensaje.innerText = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\+\-\*\^\/@\{\}\[\]\)\(\.=,%()\?!"#$&\|°]).{8,10}$/.test(inputActual)
                ? ""
                : "La contraseña debe contener 8 dígitos, mayúsculas, minúsculas, caracteres especiales y números.";
        }

        if (this.input === confirmarContraeña) {
            this.mensaje.innerText = this.input.value === this.confirmacionCon.value
                ? ""
                : "Las contraseñas no son iguales.";
        }
    }
}

// Manejo del envío del formulario
formularioLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const bdlogin = JSON.parse(localStorage.getItem('usuarios')) || [];
    const errorMessages = [
        teleErrortext.innerText,
        nombErrortext.innerText,
        emailErrortext.innerText,
        contrErrortext.innerText,
        conficontraErrortext.innerText,
        codigErrortext.innerText
    ];

    if (errorMessages.every(msg => msg === "")) {
        const existeCorreo = bdlogin.some(ele => ele.Email === email.value);

        if (existeCorreo) {
            alert("El correo ya fue creado.");
            return;
        }

        const IdLogin = bdlogin.length === 0 ? 1 : Math.max(...bdlogin.map(element => element.id)) + 1;
        const contraseñaEncriptada = await hashPassword(contraeña.value);

        const objetoLogin = {
            id: IdLogin,
            Rol: "Estudiante",
            Nombre: nombreLogin.value,
            Telefono: telefono.value,
            Codigo: codigo.value,
            Email: email.value,
            Contraseña: contraseñaEncriptada
        };

        bdlogin.push(objetoLogin);
        localStorage.setItem('usuarios', JSON.stringify(bdlogin));
        alert("Usuario creado con éxito.");
    }
});

// Inicialización de los mensajes de error
const mensajes = [
    new Mensaje(nombreLogin, nombErrortext),
    new Mensaje(telefono, teleErrortext),
    new Mensaje(email, emailErrortext),
    new Mensaje(contraeña, contrErrortext),
    new Mensaje(confirmarContraeña, conficontraErrortext, contraeña),
    new Mensaje(codigo, codigErrortext)
];

// Manejo de inicio y registro
const btnSignIn = document.getElementById("sign-in");
const btnSignUp = document.getElementById("sign-up");
const containerFormRegister = document.querySelector(".register");
const containerFormLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", () => {
    containerFormRegister.classList.add("hide");
    containerFormLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", () => {
    containerFormLogin.classList.add("hide");
    containerFormRegister.classList.remove("hide");
});
