document.getElementById('showRegisterForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('showLoginForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('showForgotPasswordForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('forgotPasswordForm').style.display = 'block';
});

document.getElementById('showLoginFormFromForgot').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('forgotPasswordForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

//mostrar/ocultar logo
document.querySelectorAll('.toggle-password').forEach(item => {
    item.addEventListener('click', function () {
        // Encuentra el input relacionado con este toggle
        var passwordInput = this.parentElement.querySelector('input');
        var toggleIcon = this.querySelector('i');

        // Alterna el tipo de input entre 'password' y 'text'
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye-slash');  
            toggleIcon.classList.add('fa-eye');           
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye');        
            toggleIcon.classList.add('fa-eye-slash');     
         }
    });
});

//Validaciones Formularios
document.addEventListener("DOMContentLoaded", function () {
    // Expresiones regulares mejoradas
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phoneRegex = /^\d{10}$/; // Para celular colombiano
    const nameRegex = /^[A-Za-z\s]+$/; // Solo letras y espacios
    const repetitiveLettersRegex = /(.)\1{2,}/; // No más de 2 letras repetidas
    const maxEmailLength = 40;
    const maxNameLength = 25;
    const maxAddressLength = 30;

    // Función para mostrar mensajes de error
    function showError(input, message) {
        let errorElement = input.parentNode.querySelector(".error-message");
        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.classList.add("error-message");
            errorElement.style.color = "red";
            input.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    // Función para limpiar errores
    function clearError(input) {
        const errorElement = input.parentNode.querySelector(".error-message");
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Validaciones en tiempo real
    function validateInput(input) {
        clearError(input);

        let isValid = true;
        const value = input.value.trim();
        const name = input.name;

        // Validar según el tipo de input
        if (name === 'correo' && (value.length > maxEmailLength || !emailRegex.test(value))) {
            showError(input, "Ingresa un correo electrónico válido.");
            isValid = false;
        }

        if (name === 'contrasena' && !passwordRegex.test(value)) {
            showError(input, "Contraseña inválida. Debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.");
            isValid = false;
        }

        if ((name === 'nombres' || name === 'apellidos') && (!nameRegex.test(value) || repetitiveLettersRegex.test(value) || value.length > maxNameLength)) {
            showError(input, "Nombres o apellidos inválidos.");
            isValid = false;
        }

        if (name === 'direccion' && value.length > maxAddressLength) {
            showError(input, `La dirección no debe exceder ${maxAddressLength} caracteres.`);
            isValid = false;
        }

        if (name === 'celular' && !phoneRegex.test(value)) {
            showError(input, "El número de celular debe tener 10 dígitos.");
            isValid = false;
        }

        if (name === 'repita_contrasena') {
            const passwordInput = document.querySelector("input[name='contrasena'], input[name='nueva_contrasena']");
            if (passwordInput && value !== passwordInput.value) {
                showError(input, "Las contraseñas no coinciden.");
                isValid = false;
            }
        }

        return isValid;
    }

    // Agregar validación en tiempo real a todos los inputs
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            validateInput(input);
        });
    });

    // Manejar envíos de formularios
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", function (event) {
            let formIsValid = true;
            const formInputs = form.querySelectorAll("input");
            
            // Validar todos los campos antes de enviar
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    formIsValid = false;
                }
            });

            if (!formIsValid) {
                event.preventDefault(); // Prevenir envío si hay errores
            }
        });
    });
});


//Autenticación
  document.addEventListener('DOMContentLoaded', function() {
            fetch('/session-info')
                .then(response => response.json())
                .then(data => {
                    if (data.nombres) {
                        // Ocultar el botón "Iniciar Sesión" y mostrar el nombre del usuario
                        document.getElementById('login-btn').style.display = 'none';
                        document.getElementById('user-names').textContent = `Hola, ${data.nombres}`;
                        // Mostrar el botón "Cerrar Sesión"
                        document.getElementById('cerrar-sesion-link').style.display = 'inline';
                    } else {
                        // Mostrar el botón "Iniciar Sesión" si no hay usuario autenticado
                        document.getElementById('login-btn').style.display = 'inline';
                        // Ocultar el botón "Cerrar Sesión"
                        document.getElementById('cerrar-sesion-link').style.display = 'none';
                    }
                })
                .catch(error => console.error('Error al obtener la información de la sesión:', error));
        });

        function cerrarSesion(event) {
            event.preventDefault(); // Evitar la acción predeterminada del enlace
            fetch('/logout') // Ruta para cerrar sesión
                .then(response => {
                    if (response.ok) {
                        // Redirigir a la página principal después de cerrar sesión
                        window.location.href = '/';
                    } else {
                        console.error('Error al cerrar sesión');
                    }
                })
                .catch(error => console.error('Error al cerrar sesión:', error));
        }
//Cerar sesión

document.addEventListener('DOMContentLoaded', function() {
    fetch('/session-info')
        .then(response => response.json())
        .then(data => {
            if (data.nombres) {
                // Ocultar el botón "Iniciar Sesión" y mostrar el nombre del usuario
                document.getElementById('login-btn').style.display = 'none';
                document.getElementById('user-names').textContent = `Hola, ${data.nombres}`;
                // Mostrar el botón "Cerrar Sesión"
                document.getElementById('cerrar-sesion-link').style.display = 'inline';
            } else {
                // Mostrar el botón "Iniciar Sesión" si no hay usuario autenticado
                document.getElementById('login-btn').style.display = 'inline';
                // Ocultar el botón "Cerrar Sesión"
                document.getElementById('cerrar-sesion-link').style.display = 'none';
            }
        })
        .catch(error => console.error('Error al obtener la información de la sesión:', error));
});

function cerrarSesion(event) {
    event.preventDefault(); // Evitar la acción predeterminada del enlace
    fetch('/logout') // Ruta para cerrar sesión
        .then(response => {
            if (response.ok) {
                // Redirigir a la página principal después de cerrar sesión
                window.location.href = '/';
            } else {
                console.error('Error al cerrar sesión');
            }
        })
        .catch(error => console.error('Error al cerrar sesión:', error));
}

//Validación del celular
document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.querySelector("input[name='celular']");

    phoneInput.addEventListener("input", function () {
        // Eliminar cualquier carácter no numérico
        this.value = this.value.replace(/\D/g, "");
    });
});