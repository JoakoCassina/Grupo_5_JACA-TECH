const file = document.getElementById('foto');

file.addEventListener('change', e => {
    if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e){
            img.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
    }
});

function confirmDelete() {
    const msj = confirm('¿Deseas eliminar este producto?');
    if (msj == true) {
        return true;
    } else {
        return false
    }
}