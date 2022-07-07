let loop = true;
let riegoActual = 1;
let luzSolarActual = 1;
let abonoActual = 1;
let puntaje = 0;
let empezarDenuevo = document.getElementById('empezarDenuevo')
let botonEmpezar = document.getElementById('botonEmpezar');
let botonRegar = document.getElementById('botonRegar');
let botonLuzSolar = document.getElementById('botonLuzSolar');
let botonAbono = document.getElementById('botonAbono')
let botonCaracteristicas = document.getElementById('botonCaracteristicas');
let botonMataPlaga = document.getElementById('botonMataPlaga');
const formularioNombre = document.getElementById('formularioNombre');
const formularioTipoPlanta = document.getElementById('formularioTipoPlanta');
const resultDiv = document.getElementById('result');
const resultTipoPlanta = document.getElementById('resultTipoPlanta');
const resultCaractPlanta = document.getElementById('resultCaractPlanta');
const resultRiegoPlanta = document.getElementById('resultRiegoPlanta');
const resultLuzSolar = document.getElementById('resultLuzSolar');
const resultAbono = document.getElementById('resultAbono');
const resultPerrito = document.getElementById('fetchPerrito');
const resultPuntaje = document.getElementById('resultPuntaje');
const resultAlerta = document.getElementById('resultAlerta');

const plantas = [
    {
        nombre: 'filodendro',
        riego: 7,
        luzSolar: 5,
        abono: 3,
        imagen: 'img/filodendro.png'
    },
    {
        nombre: 'suculenta',
        riego: 5,
        luzSolar: 8,
        abono: 2,
        imagen: 'img/suculenta.png'
    },
    {
        nombre: 'cactus',
        riego: 3,
        luzSolar: 10,
        abono: 1,
        imagen: 'img/cactus.png'
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

        sessionStorage.setItem('nombrePlantaElegido', JSON.stringify(formObject));
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
    const nombrePlantaElegido = JSON.parse(sessionStorage.getItem('nombrePlantaElegido'));
    resultDiv.innerHTML = `
          <h3> ${nombrePlantaElegido.name}</h3>
        `;
}

if (sessionStorage.getItem('nombrePlantaElegido')) {
    fillResult();
}

//ELEGIR TIPO DE PLANTA
formularioTipoPlanta.addEventListener('click', (e) => {
    const tipoPlanta = document.querySelector('input[name="planta"]:checked').value;
    let plantaSeleccionada = plantas.find((x) => x.nombre === tipoPlanta);

    if (sessionStorage.getItem('tipoPlantaElegido')) {
        resultTipoPlanta.innerHTML = `
        <img src="${plantaSeleccionada.imagen}" alt="" width="200px">
      `};
    if (plantaSeleccionada) {
        resultTipoPlanta.innerHTML = `
        <img src="${plantaSeleccionada.imagen}" alt="" width="200px" id="planta">
      `;
    }
    const formObject2 = {
        name: tipoPlanta,
    };
    sessionStorage.setItem('tipoPlantaElegida', JSON.stringify(formObject2));
});

empezarDenuevo.addEventListener('click', (e) => {
    window.location.reload()
})

botonEmpezar.addEventListener('click', (e) => {
    //PLANTA
    if (JSON.parse(sessionStorage.getItem('tipoPlantaElegida'))) {
        const tipoPlanta = JSON.parse(sessionStorage.getItem('tipoPlantaElegida'))
        let plantaSeleccionada = plantas.find((x) => x.nombre === tipoPlanta.name);
        resultTipoPlanta.innerHTML = `
    <img src="${plantaSeleccionada.imagen}" alt="" width="200px" id="planta">`
        //BOTON CARACTERÍSTICAS   
        if (plantaSeleccionada != '') {
            resultCaractPlanta.innerHTML = `
                    <button class="btn-green m-2 p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Características
                </button>
                </p>
                <div class="collapse" id="collapseExample">
                <div class="card card-body m-2 p-2">
                el riego maximo de ${plantaSeleccionada.nombre} es de ${plantaSeleccionada.riego} y la cantidad maxima de luz solar que puede recibir es de ${plantaSeleccionada.luzSolar} 
                </div>
                </div>`
            resultLuzSolar.innerHTML = `
              <p> ${luzSolarActual} /${plantaSeleccionada.luzSolar} </p>`
            resultRiegoPlanta.innerHTML = `
                         <p> ${riegoActual} /${plantaSeleccionada.riego} </p>`
            resultAbono.innerHTML = `
                                    <p> ${abonoActual} /${plantaSeleccionada.abono} </p>`
        }
        //BOTON RIEGO
        botonRegar.onclick = () => {
            if (riegoActual == plantaSeleccionada.riego) {
                alert('planta totalmente regada')
            } else {
                riegoActual += 1
                resultRiegoPlanta.innerHTML = `
    <p> ${riegoActual} /${plantaSeleccionada.riego} </p>`
            }
        }
        //BOTON LUZ SOLAR
        botonLuzSolar.onclick = () => {
            if (luzSolarActual == plantaSeleccionada.luzSolar) {
                alert('planta totalmente asoleada')
            } else if (luzSolarActual <= -1) {
                alert('Tu planta se murio por falta de luz')
            } else {
                luzSolarActual += 1
                resultLuzSolar.innerHTML = `
    <p> ${luzSolarActual} /${plantaSeleccionada.luzSolar} </p>
               `
            }
        }
        //BOTON ABONO
        botonAbono.onclick = () => {
            if (abonoActual == plantaSeleccionada.abono) {
                alert('Planta totalmente regada')
            } else {
                abonoActual += 1
                resultAbono.innerHTML = `
    <p> ${abonoActual} /${plantaSeleccionada.abono} </p>
               `
            }
        }
        //PUNTAJE
        resultPuntaje.innerHTML = `
        <p>${puntaje}</p>`

        //PLAGA 
        function aparecePlaga() {
            resultTipoPlanta.innerHTML = `
            <img src="${plantaSeleccionada.imagen}" alt="" width="200px" id="planta">
     <img src="img/plaga.png" alt="" width="50px" id="plaga">`
            //DISMINUCION LUZ SOLAR
            luzSolarActual -= 1
            if (luzSolarActual <= 0) {
                resultLuzSolar.innerHTML = `
                <p> ${luzSolarActual} /${plantaSeleccionada.luzSolar} </p>`
                resultTipoPlanta.innerHTML = `
                           <img src="img/plantaMuerta.png" alt="" width="200px" id="planta">`
            } else {
                resultLuzSolar.innerHTML = `
                <p> ${luzSolarActual} /${plantaSeleccionada.luzSolar} </p>`
            }
            //DISMINUCION ABONO
            abonoActual -= 1
            if (abonoActual <= 0) {
                resultAbono.innerHTML = `
            <p> ${abonoActual} /${plantaSeleccionada.abono} </p> `
                resultTipoPlanta.innerHTML = `
            <img src="img/plantaMuerta.png" alt="" width="200px" id="planta"> `
            } else {
                resultAbono.innerHTML = `
            <p> ${abonoActual} /${plantaSeleccionada.abono} </p>`
            }
            //DISMINUCION RIEGO
            riegoActual -= 1
            if (riegoActual <= 0) {
                resultRiegoPlanta.innerHTML = `
                <p> ${riegoActual} /${plantaSeleccionada.riego} </p>`
                resultTipoPlanta.innerHTML = `
                <img src="img/plantaMuerta.png" alt="" width="200px" id="planta">`
            }
            resultRiegoPlanta.innerHTML = `
            <p> ${riegoActual} /${plantaSeleccionada.riego} </p>`
        }
        //FUNCIÓN LOOP Y TIEMPO RANDOM PARA BICHO Y DISMINUCIÓN DE VARIABLES DE AGUA, LUZ Y ABONO
        (function loop() {
            var rand = Math.round(Math.random() * (20000 - 1000)) + 1000;
            setTimeout(function () {
                aparecePlaga();
                loop();
            }, rand);
        }());

        //BOTON PARA ELIMINAR PLAGA
        botonMataPlaga.onclick = () => {
            {
                puntaje += 200
                resultPuntaje.innerHTML = `
                <p>${puntaje}</p>`
                resultTipoPlanta.innerHTML = `
        <img src="${plantaSeleccionada.imagen}" alt="" width="200px" id="planta">`
            }
        }
    }
})


//fetch, no logre encontrar alguna API de plantas, así que use una de perritos
fetch('https://dog.ceo/api/breeds/image/random')
    .then((resp) => resp.json())
    .then((data) =>

        resultPerrito.innerHTML = `
        <p>Despues de cuidar una plantita, podrías intentarlo con un perrito:</p>
    <img src="${data.message}" alt="" width="200px" id="planta">
  `
    )

