// Obteniendo elementos del DOM
const formLogin = document.querySelector(".form-login");
const inputEmail = document.querySelector('.form-login input[type="email"]');
const inputPass = document.querySelector('.form-login input[type="password"]');
const alertaErrorLogin = document.querySelector(".alerta-error");
const alertaExitoLogin = document.querySelector(".alerta-exito");

// Regex para validaciones
const emailRegex = /^[a-zA-Z0-9]{1,20}([.-_]{1}[a-zA-Z0-9]{1,10})?@[a-zA-Z0-9]{1,10}([-.]{1}[a-zA-Z0-9]{1,20})?\.[a-zA-Z0-9]{2,6}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\+\-\*\^\/@\{\}\[\]\)\(\.=,%()\?!"#$&\|°])[A-Za-z0-9\+\-\*\^\/@\{\}\[\]\)\(\.=,%()\?!"#$&\|°]{8,10}$/;

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

const enviarFormulario = (formulario) => {
    const emailValido = validarCampo(emailRegex, inputEmail, "El correo no es válido.");
    const passValida = validarCampo(passwordRegex, inputPass, "La contraseña debe contener entre 8 y 10 caracteres con mayúsculas, minúsculas, números y caracteres especiales.");
    
    if (emailValido && passValida) {
        // Comprobamos si el usuario existe en el localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioEncontrado = usuarios.find(usuario => usuario.Email === inputEmail.value && usuario.Contraseña === inputPass.value);

        if (usuarioEncontrado) {
            alertaExitoLogin.innerText = "Inicio de sesión exitoso.";
            alertaErrorLogin.innerText = "";
            // Aquí puedes redirigir al usuario a otra página o realizar cualquier acción adicional
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
        validarCampo(emailRegex, inputEmail, "El correo solo puede contener letras, números, puntos, guiones y guion bajo.");
    });

    inputPass.addEventListener("input", () => {
        validarCampo(passwordRegex, inputPass, "La contraseña debe contener entre 8 y 10 caracteres con mayúsculas, minúsculas, números y caracteres especiales.");
    });
});
