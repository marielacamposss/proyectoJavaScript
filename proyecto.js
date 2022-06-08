let loop = true
let riegoActual = 0

//const nombres = ['filodendro', 'aralia', 'maranta', 'suculenta', 'singonio']
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
]

const nombresPlantas = plantas.map((planta) => planta.nombre);
const nombresPlantasTexto = nombresPlantas.join(',')

alert('bienvenido a cuida tu planta')
let cuidaTuplanta = prompt('¿Quieres cuidar una planta? (si/no)').toLowerCase()
if (cuidaTuplanta == 'si') {
    let informacionPlanta = prompt('te gustaria saber las caracteristicas de cada planta (Si/No)? (ingresa no para continuar al cuidado de tu planta)').toLowerCase()
    if (informacionPlanta == 'si') {
        let quieroInformacion = prompt('¿de que planta quieres saber?' + nombresPlantasTexto).toLowerCase()
        let encontrar = quieroInformacion
        let encontrado = plantas.find((x) => x.nombre === encontrar)
        alert('los cuidados de los ' + encontrado.nombre + ' son: riego de ' + encontrado.riego + ' y luz solar de ' + encontrado.luzSolar)
    }
    else {

        let tipoPlanta = prompt('¿que planta quieres cuidar?' + nombresPlantasTexto).toLowerCase();
        let plantaEncontrada = plantas.find((x) => x.nombre === tipoPlanta);

        while (!plantaEncontrada) {
            tipoPlanta = prompt('¿que planta quieres cuidar?').toLowerCase();
            plantaEncontrada = plantas.find((x) => x.nombre === tipoPlanta);
        }
        alert('elegiste un ' + tipoPlanta);

        let nombrePlanta = prompt('¿Como quieres que se llame tu ' + tipoPlanta)
        while (nombrePlanta.trim() === '') {
            alert('El nombre de tu planta no puede quedar vacio')
            nombrePlanta = prompt('¿Como quieres que se llame tu ' + tipoPlanta);
        }
        if (nombrePlanta.trim() != '') {
            alert('El nombre de tu ' + tipoPlanta + ' ahora es ' + nombrePlanta)

            while (loop) {
                let regar = prompt('cuanto quieres regar a ' + nombrePlanta + '?' + 'maximo ' + plantaEncontrada.riego + '(Si quiere dejar de regar su planta escriba SALIR)').toLowerCase()
                if (regar == 'salir') {
                    break
                }
                let regarNumero = parseInt(regar)
                if (!isNaN(regarNumero)) {
                    if (riegoActual > 0 && riegoActual < plantaEncontrada.riego && riegoActual + regarNumero < plantaEncontrada.riego) {
                        riegoActual += regarNumero
                        alert(`regaste ${regarNumero} veces a ${nombrePlanta} ahora su riego total es de ${riegoActual}`)
                        alert('¿Quieres volver a regar a ' + nombrePlanta + '?')
                    } else if (riegoActual > plantaEncontrada.riego) {
                        alert('no puedes regar mas de' + plantaEncontrada.riego + ' veces a ' + nombrePlanta)
                    }
                    else if (riegoActual == plantaEncontrada.riego) {
                        alert('Felicidades ' + nombrePlanta + ' Esta totalmente regada')
                        break
                    }
                }
                else {
                    alert('Debes ingresar un numero')
                }
            }

        }
    }
}

else if (cuidaTuplanta == 'no') {
    alert('no hay problema, que estes muy bien')
}

else {
    alert('tu respuesta no es valida, debe ser si o no')
}


