window.addEventListener ('load', function() {
    //console.log(validator.isEmail('foo@bar.com')); //=> true

    const form = document.querySelector('.main_form form');
    
    const required = {
        first_name: true,
        last_name: true,
        email: true,
        password: true,
        image: true,
    };
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;
        for (const key in required) {
            const err = document.getElementById(`err-${key}`);
            if (required[key] && !form[key]?.value) { // si es requerido y esta vacio el input
                form[key].classList.add('error'); // le agrega la clase a cada input
                err.classList.add('error'); // le agrega la clase a cada p
                err.innerText = 'El campo es requerido'; // agrega el texto
                isValid = false;
            } else {
                form[key].classList.remove('error');
                err.classList.remove('error');
                err.innerText = '';
            }
        }
        if (isValid) {
            form.submit();
        }
    });

    form.addEventListener('submit', (event) => {
        
        let errores = [];

        const txfFirstName = document.getElementById('first_name');
        if (txfFirstName.value.length < 2) {
            errores.push('El nombre deberá tener al menos 2 caracteres');
        }
        const txfLastName = document.getElementById('last_name');
        if (txfLastName.value.length < 2) {
            errores.push('El apellido deberá tener al menos 2 caracteres');
        }
        const txfEmail = document.getElementById('email');
        if (!validator.isEmail(txfEmail.value)) {
            errores.push('Introduce un correo electronico válido');
        }
        const txfPassword = document.getElementById('password');
        if (txfPassword.value.length < 8) {
            errores.push('El password deberá tener al menos 8 caracteres');
        }

        if (errores.length > 0) {
            event.preventDefault();
            let ulErrores = document.querySelector('.errores');
            ulErrores.classList.add('error');
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            };
        }
    });

});