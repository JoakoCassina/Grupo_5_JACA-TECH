window.addEventListener ('load', function() {
    //console.log(validator.isEmail('foo@bar.com')); //=> true

    const form = document.querySelector('.main_form form');
    
    const required = {
        name: true,
        description: true,
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

        const txfName = document.getElementById('name');
        if (txfName.value.length < 5) {
            errores.push('El nombre deberá tener al menos 5 caracteres');
        }
        const txfDescription = document.getElementById('description');
        if (txfDescription.value.length < 20) {
            errores.push('La descripcion deberá tener al menos 20 caracteres');
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