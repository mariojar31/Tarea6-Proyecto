const formLogin = document.querySelector(".form-login");
const inputEmail = document.querySelector('.form-login input[type="email"]');
const inputPass = document.querySelector('.form-login input[type="password"]');
const alertaErrorLogin = document.querySelector(".alerta-error");
const alertaExitoLogin = document.querySelector(".alerta-exito");

const emailRegex = /^[a-zA-Z0-9]{1,20}([.-_]{1}[a-zA-Z0-9]{1,10})?@[a-zA-Z0-9]{1,10}([-.]{1}[a-zA-Z0-9]{1,20})?\.[a-zA-Z0-9]{2,6}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\+\-\*\^\/@\{\}\[\]\)\(\.=,%()\?!"#$&\|°])[A-Za-z0-9\+\-\*\^\/@\{\}\[\]\)\(\.=,%()\?!"#$&\|°]{8,10}$/;

// Función para validar un campo
const validarCampo = (regex, input, mensajeError) => {
    if (regex.test(input.value)) {
        input.classList.remove("input-error");
        alertaErrorLogin.innerText = "";
        return true;
    } else {
        input.classList.add("input-error");
        alertaErrorLogin.innerText = mensajeError;
        return false;
    }
};

// Función para encriptar la contraseña
async function unhashPassword(password) {
    const key = "Qwerty123*"; 
    const bytes = await CryptoJS.AES.decrypt(password, key);
    const contraseñaDesencriptada = await bytes.toString(CryptoJS.enc.Utf8);
    return contraseñaDesencriptada
}

// Función para enviar el formulario
const enviarFormulario = async (formulario) => {
    const emailValido = validarCampo(emailRegex, inputEmail, "El correo no es válido.");
    const passValida = validarCampo(passwordRegex, inputPass, "La contraseña debe contener entre 8 y 10 caracteres con mayúsculas, minúsculas, números y caracteres especiales.");
    
    if (emailValido && passValida) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioEncontrado = usuarios.find(usuario => usuario.Email === inputEmail.value);

        if (usuarioEncontrado) {
            const unhashedPassword = await unhashPassword(usuarioEncontrado.Contraseña)
            console.log(unhashedPassword)
            if (unhashedPassword === inputPass.value) {
                alertaExitoLogin.innerText = "Inicio de sesión exitoso.";
                alertaErrorLogin.innerText = "";
                window.location.href = 'Admin.html';
            } else {
                alertaErrorLogin.innerText = "Credenciales incorrectas. Por favor, verifica tu correo y contraseña.";
                alertaExitoLogin.innerText = "";
            }
        } else {
            alertaErrorLogin.innerText = "Credenciales incorrectas. Por favor, verifica tu correo y contraseña.";
            alertaExitoLogin.innerText = "";
        }
    } else {
        alertaErrorLogin.innerText = "Por favor, corrige los errores antes de continuar.";
        alertaExitoLogin.innerText = "";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        enviarFormulario(formLogin);
    });

    inputEmail.addEventListener("input", () => {
        validarCampo(emailRegex, inputEmail, "Ingrese un Email válido.");
    });

    inputPass.addEventListener("input", () => {
        validarCampo(passwordRegex, inputPass, "La contraseña debe contener entre 8 y 10 caracteres con mayúsculas, minúsculas, números y caracteres especiales.");
    });
});