let loop = true
let riegoActual = 0
let botonEmpezar = document.getElementById('botonEmpezar');
let botonCaracteristicas = document.getElementById('botonCaracteristicas');
const formularioNombre = document.getElementById('formularioNombre');
const resultDiv = document.getElementById('result');
const plantas = [
    {
        nombre: 'filodendro',
        riego: 5,
        luzSolar: 7
    },
    {
        nombre: 'suculenta',
        riego: 3,
        luzSolar: 9
    }
];
const nombresPlantas = plantas.map((planta) => planta.nombre);
const nombresPlantasTexto = nombresPlantas.join(',');

//PONERLE EL NOMBRE A LA PLANTA

formularioNombre.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombrePlanta = document.getElementById('nombre').value;

    if (verifyForm(nombrePlanta)) {
        const formObject = {
            name: nombrePlanta,
        };

        localStorage.setItem('formData', JSON.stringify(formObject));
        fillResult();
    }
});

const verifyForm = (nombrePlanta) => {
    if (nombrePlanta.trim() === '') {
        return false;
    }
    return true;
};

const fillResult = () => {
    const formData = JSON.parse(localStorage.getItem('formData'));
    resultDiv.innerHTML = `
          <p>El nombre de tu planta es ${formData.name}</p>
        `;
}

if (localStorage.getItem('formData')) {
    fillResult();
}

//COMIENZA EL JUEGO
botonEmpezar.onclick = () => {
    const nombrePlanta = JSON.parse(localStorage.getItem('formData'))
    alert('bienvenido a cuida tu planta')
    let cuidaTuplanta = prompt('¿Quieres empezar a cuidar a ' + nombrePlanta.name + ' (si/no)').toLowerCase()
    if (cuidaTuplanta == 'si') {

        let tipoPlanta = prompt('Elige el tipo de planta que sera ' + nombrePlanta.name + ' Las opciones son: ' + nombresPlantasTexto).toLowerCase();
        let plantaEncontrada = plantas.find((x) => x.nombre === tipoPlanta);

        while (!plantaEncontrada) {
            tipoPlanta = prompt('Elige el tipo de planta que sera ' + nombrePlanta.name + ' Las opciones son: ' + nombresPlantasTexto).toLowerCase();
            plantaEncontrada = plantas.find((x) => x.nombre === tipoPlanta);
        }
        alert('elegiste un ' + tipoPlanta);

        while (loop) {
            let regar = prompt('cuanto quieres regar a ' + nombrePlanta.name + '?' + 'maximo ' + plantaEncontrada.riego + '(Si quiere dejar de regar su planta escriba SALIR)').toLowerCase()
            if (regar == 'salir') {
                break
            }
            let regarNumero = parseInt(regar)
            if (!isNaN(regarNumero)) {
                if (riegoActual >= 0 && riegoActual < plantaEncontrada.riego && riegoActual + regarNumero <= plantaEncontrada.riego) {
                    riegoActual += regarNumero
                    alert(`regaste ${regarNumero} veces a ${nombrePlanta.name} ahora su riego total es de ${riegoActual}`)
                    alert('¿Quieres volver a regar a ' + nombrePlanta.name + '?')
                } else if (riegoActual > plantaEncontrada.riego) {
                    alert('no puedes regar mas de' + plantaEncontrada.riego + ' veces a ' + nombrePlanta.name)
                }
                else if (riegoActual == plantaEncontrada.riego) {
                    alert('Felicidades ' + nombrePlanta.name + ' Esta totalmente regada')
                    break
                }
            }
            else {
                alert('Debes ingresar un numero')
            }
        }

    }
    else if (cuidaTuplanta == 'no') {
        alert('no hay problema, que estes muy bien')
    }
    else {
        alert('tu respuesta no es valida, debe ser si o no')
    }

}

//CARACTERISTICAS

botonCaracteristicas.onclick = () => {
    let informacionPlanta = prompt('te gustaria saber las caracteristicas de cada planta (Si/No)? (ingresa no para continuar al cuidado de tu planta)').toLowerCase()
    if (informacionPlanta == 'si') {
        let quieroInformacion = prompt('¿de que planta quieres saber?' + nombresPlantasTexto).toLowerCase()
        let encontrar = quieroInformacion
        let encontrado = plantas.find((x) => x.nombre === encontrar)
        alert('los cuidados de los ' + encontrado.nombre + ' son: riego de ' + encontrado.riego + ' y luz solar de ' + encontrado.luzSolar)
    }
}
