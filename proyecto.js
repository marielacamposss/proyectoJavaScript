let loop = true
let riegoActual = 0
let luzSolarActual = 0

let botonRegar = document.getElementById('botonRegar');
let botonLuzSolar = document.getElementById('botonLuzSolar');
let botonCaracteristicas = document.getElementById('botonCaracteristicas');
const formularioNombre = document.getElementById('formularioNombre');
const formularioTipoPlanta = document.getElementById('formularioTipoPlanta');
const resultDiv = document.getElementById('result');
const resultTipoPlanta = document.getElementById('resultTipoPlanta');
const resultCaractPlanta = document.getElementById('resultCaractPlanta');
const resultRiegoPlanta = document.getElementById('resultRiegoPlanta');
const resultLuzSolar = document.getElementById('resultLuzSolar')

const plantas = [
    {
        nombre: 'filodendro',
        riego: 7,
        luzSolar: 5,
        imagen: 'img/filodendro.png'
    },
    {
        nombre: 'suculenta',
        riego: 5,
        luzSolar: 8,
        imagen: 'img/suculenta.png'
    },
    {
        nombre: 'cactus',
        riego: 3,
        luzSolar: 10,
        imagen: 'img/cactus.png'
    }
];

const nombresPlantas = plantas.map((planta) => planta.nombre);
const nombresPlantasTexto = nombresPlantas.join(',');

//PONERLE EL NOMBRE A LA PLANTA
alert('Bienvenido a cuida tu planta')
formularioNombre.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombrePlanta = document.getElementById('nombre').value;

    if (verifyForm(nombrePlanta)) {
        const formObject = {
            name: nombrePlanta,
        };

        sessionStorage.setItem('formData', JSON.stringify(formObject));
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
    const formData = JSON.parse(sessionStorage.getItem('formData'));
    resultDiv.innerHTML = `
          <p>El nombre de tu planta es ${formData.name}</p>
        `;
}

if (sessionStorage.getItem('formData')) {
    fillResult();
}

//ELEGIR TIPO DE PLANTA
formularioTipoPlanta.addEventListener('click', (e) => {
    const tipoPlanta = document.querySelector('input[name="planta"]:checked').value;
    if (tipoPlanta == 'filodendro') {
        resultTipoPlanta.innerHTML = `
        <p>Elegiste un ${tipoPlanta}</p>
        <img src="img/filodendro.png" alt="" width="200px">
      `;
    } else if (tipoPlanta == 'cactus') {
        resultTipoPlanta.innerHTML = `
        <p>Elegiste un ${tipoPlanta}</p>
        <img src="img/cactus.png" alt="" width="200px">
      `;
    } else if (tipoPlanta == 'suculenta') {
        resultTipoPlanta.innerHTML = `
        <p>Elegiste un ${tipoPlanta}</p>
        <img src="img/suculenta.png" alt="" width="200px">
      `;
    }
    const formObject2 = {
        name: tipoPlanta,

    };
    //CARACTERISTICAS
    let plantaSeleccionada = plantas.find((x) => x.nombre === tipoPlanta);
    resultCaractPlanta.innerHTML = `
    <h3>CARACTERISTICAS</h3>
    <p>el riego de ${plantaSeleccionada.nombre} es de ${plantaSeleccionada.riego} y la cantidad maxima de luz solar que puede recibir es de ${plantaSeleccionada.luzSolar}</p>
               `

    sessionStorage.setItem('formData2', JSON.stringify(formObject2));
    fillResult();
});

const tipoPlanta = JSON.parse(sessionStorage.getItem('formData2'))
console.log(tipoPlanta)
let plantaSeleccionada = plantas.find((x) => x.nombre === tipoPlanta.name);


if (plantaSeleccionada != '') {
    resultCaractPlanta.innerHTML = `
    <h3>CARACTERISTICAS</h3>
    <p>el riego maximo de ${plantaSeleccionada.nombre} es de ${plantaSeleccionada.riego} y la cantidad maxima de luz solar que puede recibir es de ${plantaSeleccionada.luzSolar} </p>
               `
}

//RIEGO
botonRegar.onclick = () => {
    if (riegoActual == plantaSeleccionada.riego) {
        alert('Felicidades ' + plantaSeleccionada.nombre + ' Esta totalmente regada')
    } else {
        riegoActual += 1
        resultRiegoPlanta.innerHTML = `
    <p> ${riegoActual} /${plantaSeleccionada.riego} </p>
               `
    }
}

//LUZ SOLAR
botonLuzSolar.onclick = () => {
    if (luzSolarActual == plantaSeleccionada.luzSolar) {
        alert('Felicidades ' + plantaSeleccionada.nombre + ' Esta totalmente asoleada')
    } else {
        luzSolarActual += 1
        resultLuzSolar.innerHTML = `
    <p> ${luzSolarActual} /${plantaSeleccionada.luzSolar} </p>
               `
    }
}

