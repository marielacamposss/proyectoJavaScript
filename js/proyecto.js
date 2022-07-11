let loop = true;
let riegoActual = 1;
let luzSolarActual = 1;
let abonoActual = 1;
let puntaje = 0;
let empezarDenuevo = document.getElementById('empezarDenuevo');
let botonEmpezar = document.getElementById('botonEmpezar');
let botonRegar = document.getElementById('botonRegar');
let botonLuzSolar = document.getElementById('botonLuzSolar');
let botonAbono = document.getElementById('botonAbono');
let botonCaracteristicas = document.getElementById('botonCaracteristicas');
let botonMataPlaga = document.getElementById('botonMataPlaga');
const resultDiv = document.getElementById('result');
const resultTipoPlanta = document.getElementById('resultTipoPlanta');
const resultCaractPlanta = document.getElementById('resultCaractPlanta');
const resultRiegoPlanta = document.getElementById('resultRiegoPlanta');
const resultLuzSolar = document.getElementById('resultLuzSolar');
const resultAbono = document.getElementById('resultAbono');
const resultPerrito = document.getElementById('fetchPerrito');
const resultPuntaje = document.getElementById('resultPuntaje');
const resultAlerta = document.getElementById('resultAlerta');
const modal = new bootstrap.Modal(document.getElementById('myModal'));
modal.show();

const plantas = [
  {
    nombre: 'filodendro',
    riego: 7,
    luzSolar: 5,
    abono: 4,
    imagen: 'img/filodendro.png',
    descripcion:
      'FILODENDRO: Son arbustos o árboles pequeños, la mayoría de los cuales son capaces de trepar sobre otras plantas. Estas plantas no toleran el sol directo y requieren de bastante riego y humedad ambiental.',
  },
  {
    nombre: 'suculenta',
    riego: 5,
    luzSolar: 8,
    abono: 3,
    imagen: 'img/suculenta.png',
    descripcion:
      'SUCULENTAS: La suculentas son un grupo de plantas que almacenan el agua en su hojas, tallos y raíces. Prosperan en climas secos y poco húmedos',
  },
  {
    nombre: 'cactus',
    riego: 3,
    luzSolar: 10,
    abono: 2,
    imagen: 'img/cactus.png',
    descripcion:
      'CACTUS: Los cactus forman parte de la familia de las suculentas, esto se debe a que almacenan agua. Su característica principal es que poseen una yema axilar donde crecen las espinas',
  },
];

const nombresPlantas = plantas.map((planta) => planta.nombre);
const nombresPlantasTexto = nombresPlantas.join(',');
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const fillResult = () => {
  const nombrePlantaElegido = JSON.parse(
    sessionStorage.getItem('nombrePlantaElegido')
  );
  resultDiv.innerHTML = `
          <h3> ${nombrePlantaElegido.name}</h3>
        `;
};

empezarDenuevo.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.clear();
  location.reload();
});

botonEmpezar.addEventListener('click', (e) => {
  const nombrePlanta = document.getElementById('nombre').value;
  const tipoPlanta = document.querySelector(
    'input[name="planta"]:checked'
  )?.value;

  if (nombrePlanta.trim() === '' || tipoPlanta === undefined) {
    Toast.fire({
      icon: 'error',
      title: 'Por favor, ingrese un nombre y seleccione un tipo de planta',
    });
  } else {
    const tipoPlantaObj = {
      name: tipoPlanta,
    };
    const nombreOjb = {
      name: nombrePlanta,
    };
    sessionStorage.setItem('tipoPlantaElegida', JSON.stringify(tipoPlantaObj));
    sessionStorage.setItem('nombrePlantaElegido', JSON.stringify(nombreOjb));

    playGame();
  }
});

const hideModal = () => {
  modal.hide();
};

const playGame = () => {
  hideModal();
  fillResult();
  const tipoPlanta = JSON.parse(sessionStorage.getItem('tipoPlantaElegida')).name;
  let plantaSeleccionada = plantas.find((x) => x.nombre === tipoPlanta);

  if (tipoPlanta) {
    resultTipoPlanta.innerHTML = `<img src="${plantaSeleccionada.imagen}" alt="" width="200px">`;
  }

  //PLANTA
  if (JSON.parse(sessionStorage.getItem('tipoPlantaElegida'))) {
    const tipoPlanta = JSON.parse(sessionStorage.getItem('tipoPlantaElegida'));
    let plantaSeleccionada = plantas.find((x) => x.nombre === tipoPlanta.name);
    resultTipoPlanta.innerHTML = `
    <img src="${plantaSeleccionada.imagen}" alt="" width="200px" id="planta">`;
    //BOTON CARACTERÍSTICAS
    if (plantaSeleccionada != '') {
      resultCaractPlanta.innerHTML = `
                    <button class="btn-green m-2 p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Características
                </button>
                </p>
                <div class="collapse" id="collapseExample">
                <div class="card card-body m-2 p-2">
              ${plantaSeleccionada.descripcion} 
                </div>
                </div>`;
      resultLuzSolar.innerHTML = `
              <p> ${luzSolarActual} /${plantaSeleccionada.luzSolar} </p>`;
      resultRiegoPlanta.innerHTML = `
                         <p> ${riegoActual} /${plantaSeleccionada.riego} </p>`;
      resultAbono.innerHTML = `
                                    <p> ${abonoActual} /${plantaSeleccionada.abono} </p>`;
    }
    //BOTON RIEGO
    botonRegar.onclick = () => {
      if (riegoActual == plantaSeleccionada.riego) {
        Toast.fire({
          icon: 'success',
          title: 'Planta totalmente regada',
        });
      } else if (abonoActual <= 0 || luzSolarActual <= 0 || riegoActual <= 0) {
        Toast.fire({
          icon: 'error',
          title: 'Tu planta esta muerta',
        });
      } else {
        riegoActual += 1;
        resultRiegoPlanta.innerHTML = `
    <p> ${riegoActual} /${plantaSeleccionada.riego} </p>`;
      }
    };
    //BOTON LUZ SOLAR
    botonLuzSolar.onclick = () => {
      if (luzSolarActual == plantaSeleccionada.luzSolar) {
        Toast.fire({
          icon: 'success',
          title: 'Planta totalmente asoleada',
        });
      } else if (abonoActual <= 0 || luzSolarActual <= 0 || riegoActual <= 0) {
        Toast.fire({
          icon: 'error',
          title: 'Tu planta esta muerta',
        });
      } else {
        luzSolarActual += 1;
        resultLuzSolar.innerHTML = `
    <p> ${luzSolarActual} /${plantaSeleccionada.luzSolar} </p>
               `;
      }
    };
    //BOTON ABONO
    botonAbono.onclick = () => {
      if (abonoActual == plantaSeleccionada.abono) {
        Toast.fire({
          icon: 'success',
          title: 'Planta totalmente abonada',
        });
      } else if (abonoActual <= 0 || luzSolarActual <= 0 || riegoActual <= 0) {
        Toast.fire({
          icon: 'error',
          title: 'Tu planta esta muerta',
        });
      } else {
        abonoActual += 1;
        resultAbono.innerHTML = `
    <p> ${abonoActual} /${plantaSeleccionada.abono} </p>
               `;
      }
    };
    //PUNTAJE
    resultPuntaje.innerHTML = `
        <p>${puntaje}</p>`;

    //PLAGA
    function aparecePlaga() {
      resultTipoPlanta.innerHTML = `
            <img src="${plantaSeleccionada.imagen}" alt="" width="200px" id="planta">
     <img src="img/plaga.png" alt="" width="50px" id="plaga">`;

      //DISMINUCION LUZ SOLAR, ABONO, RIEGO
      luzSolarActual -= 1;
      abonoActual -= 1;
      riegoActual -= 1;

      if (luzSolarActual <= 0 || abonoActual <= 0 || riegoActual <= 0) {
        Toast.fire({
          icon: 'error',
          title: 'Tu planta se murio',
        });
        resultAbono.innerHTML = `
                <p> - / - </p> `;
        resultLuzSolar.innerHTML = `
                <p> - / - </p>`;
        resultRiegoPlanta.innerHTML = `
                <p> - / - </p>`;
        resultTipoPlanta.innerHTML = `
                           <img src="img/plantaMuerta.png" alt="" width="200px" id="plantaMuerta">`;
      } else {
        resultLuzSolar.innerHTML = `
                <p> ${luzSolarActual} /${plantaSeleccionada.luzSolar} </p>`;
        resultAbono.innerHTML = `
                <p> ${abonoActual} /${plantaSeleccionada.abono} </p>`;
        resultRiegoPlanta.innerHTML = `
                 <p> ${riegoActual} /${plantaSeleccionada.riego} </p>`;
      }
      //DISMINUCION ABONO
    }
    //FUNCIÓN LOOP Y TIEMPO RANDOM PARA BICHO Y DISMINUCIÓN DE VARIABLES DE AGUA, LUZ Y ABONO

    if (!!document.getElementById('plantaMuerta')) {
      clearTimeout(rand);
    } else {
      (function loop() {
        var rand = Math.round(Math.random() * (20000 - 1000)) + 1000;
        setTimeout(function () {
          aparecePlaga();
          loop();
        }, rand);
      })();
    }

    //BOTON PARA ELIMINAR PLAGA

    botonMataPlaga.onclick = () => {
      if (!!document.getElementById('plaga')) {
        puntaje += 200;
        resultPuntaje.innerHTML = `
                <p>${puntaje}</p>`;
        resultTipoPlanta.innerHTML = `
        <img src="${plantaSeleccionada.imagen}" alt="" width="200px" id="planta">`;
      }
    };
  }
};



//fetch, no logre encontrar alguna API de plantas, así que use una de perritos
fetch('https://dog.ceo/api/breeds/image/random')
  .then((resp) => resp.json())
  .then(
    (data) =>
    (resultPerrito.innerHTML = `
        <p>Despues de cuidar una plantita, podrías intentarlo con un perrito:</p>
    <img src="${data.message}" alt="" width="200px" id="planta">
  `)
  );

if (sessionStorage.getItem('nombrePlantaElegido')) {
  playGame();
}
