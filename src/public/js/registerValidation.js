window.onload = function(){
//------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
//-------------------DE REGISTRO DE PELÍCULAS------------------// 
    const form = document.querySelector('.forms form');
    console.log(form);
    const required = {
        password: true,
        email: true,
        last_name: true,
        first_name: true,
        
    };
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;
        for (const key in required) {
            const err = document.getElementById(`err-${key}`);
            if (required[key] && !form[key]?.value) {
                form[key].classList.add('error');
                err.classList.add('error');
                err.innerText = 'El campo es requerido';
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

}