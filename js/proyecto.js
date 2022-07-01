let loop = true;
let riegoActual = 0;
let luzSolarActual = 0;
let abonoActual = 0;

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
alert('Bienvenido a cuida tu planta')
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
          <p> ${nombrePlantaElegido.name}</p>
        `;
}

if (sessionStorage.getItem('nombrePlantaElegido')) {
    fillResult();
}

//ELEGIR TIPO DE PLANTA
formularioTipoPlanta.addEventListener('click', (e) => {
    const tipoPlanta = document.querySelector('input[name="planta"]:checked').value;
    let plantaSeleccionada = plantas.find((x) => x.nombre === tipoPlanta);

    //aca intente que si ya existe esta el tipo en session storage me la ponga pero no me funciono
    //y nose como hacer que vuelva a marcar o quede seleccionado el radio button, lo mismo para cuando se selecciona otra necesito que vuelva a cambiarse todo porque se confunde
    if (sessionStorage.getItem('tipoPlantaElegido')) {
        resultTipoPlanta.innerHTML = `
        <img src="${plantaSeleccionada.imagen}" alt="" width="200px">
      `};

    //acá cambie el codigo para que fuera solo uno para las tres plantas y fotos
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

//CARACTERISTICAS
if (JSON.parse(sessionStorage.getItem('tipoPlantaElegida'))) {
    const tipoPlanta = JSON.parse(sessionStorage.getItem('tipoPlantaElegida'))
    let plantaSeleccionada = plantas.find((x) => x.nombre === tipoPlanta.name);

    if (plantaSeleccionada != '') {
        resultCaractPlanta.innerHTML = `
    <button class="btn-green" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Características
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
  el riego maximo de ${plantaSeleccionada.nombre} es de ${plantaSeleccionada.riego} y la cantidad maxima de luz solar que puede recibir es de ${plantaSeleccionada.luzSolar} 
  </div>
</div>
              `
    }

    //Acá me comentaste que hiciera solo un codigo para las dos cosas pero me exploto la cabeza y no se me ocurrio como hacerlo
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
    //ABONO
    botonAbono.onclick = () => {
        if (abonoActual == plantaSeleccionada.abono) {
            alert('Felicidades ' + plantaSeleccionada.nombre + ' Esta totalmente abonada')
        } else {
            abonoActual += 1
            resultAbono.innerHTML = `
    <p> ${abonoActual} /${plantaSeleccionada.abono} </p>
               `
        }
    }

    //Me gustaria que esto fuera como un temporizador en el futuro
    resultTipoPlanta.addEventListener("mouseleave", function (event) {
        if (event) {
            resultTipoPlanta.innerHTML = `
       
        <img src="${plantaSeleccionada.imagen}" alt="" width="200px" id="planta">
        <img src="img/plaga.png" alt="" width="50px" id="plaga">
   
      `}
    }, false);
    botonMataPlaga.onclick = () => {
        {
            resultTipoPlanta.innerHTML = `
        <img src="${plantaSeleccionada.imagen}" alt="" width="200px" id="planta">

      `}
    }

}

//fetch, no logre encontrar alguna API de plantas, así que use una de perritos
fetch('https://dog.ceo/api/breeds/image/random')
    .then((resp) => resp.json())
    .then((data) =>

        resultPerrito.innerHTML = `
        <p>Despues de cuidar una plantita, podrías intentarlo con un perrito:</p>
    <img src="${data.message}" alt="" width="200px" id="planta">
  `
    )

