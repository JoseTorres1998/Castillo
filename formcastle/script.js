document.getElementById('visitaForm').addEventListener('submit', validarFormulario);

function validarFormulario(event) {
    event.preventDefault();
    let isValid = true;

    // Resetear mensajes de error
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
    });

    // Validar Nombre
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre === '') {
        document.getElementById('nombreError').style.display = 'block';
        isValid = false;
    }

    // Validar Teléfono (9 dígitos)
    const telefono = document.getElementById('telefono').value;
    const telefonoRegex = /^\d{9}$/;
    if (!telefonoRegex.test(telefono)) {
        document.getElementById('telefonoError').style.display = 'block';
        isValid = false;
    }

    // Validar Email
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Si todo es válido, enviar formulario
    if (isValid) {
        alert('¡Solicitud enviada con éxito!\n' +
              'Nombre: ' + nombre + '\n' +
              'Teléfono: ' + telefono + '\n' +
              'Email: ' + email + '\n' +
              'Fecha: ' + document.getElementById('fecha').value);
        document.getElementById('visitaForm').reset();
    }

    return isValid;
}