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

alert('bienvenido a cuida tu planta')
cuidaTuplanta = prompt('¿Quieres cuidar una planta? (si/no)').toLowerCase()
if (cuidaTuplanta == 'si') {
    let informacionPlanta = prompt('te gustaria saber las caracteristicas de cada planta (Si/No)? (ingresa no para continuar al cuidado de tu planta)').toLowerCase()
    if (informacionPlanta == 'si') {
        let quieroInformacion = prompt('¿de que planta quieres saber? (filodendro,suculenta)').toLowerCase()
        let encontrar = quieroInformacion
        let encontrado = plantas.find((x) => x.nombre === encontrar)
        alert('los cuidados de los ' + encontrado.nombre + ' son: riego de ' + encontrado.riego + ' y luz solar de ' + encontrado.luzSolar)
    }
    else {
        let tipoPlanta = prompt('¿que planta quieres cuidar? ' + 'Elige una de la siguiente lista e ingresala: ' + plantas[0].nombre + ' ' + plantas[1].nombre).toLowerCase()
        alert('elegiste un ' + tipoPlanta)

        let nombrePlanta = prompt('¿Como quieres que se llame tu ' + tipoPlanta)
        if (nombrePlanta == '') {
            alert('El nombre de tu planta no puede quedar vacio')
        }
        else {
            alert('El nombre de tu ' + tipoPlanta + ' ahora es ' + nombrePlanta)

            if (tipoPlanta == 'filodendro') {

                while (loop) {
                    let regar = parseInt(prompt('cuanto quieres regar a ' + nombrePlanta + '?' + 'maximo ' + plantas[0].riego))
                    if (!isNaN(regar)) {
                        riegoActual += regar

                        if (riegoActual == 5) {
                            alert('Felicidades ' + nombrePlanta + ' Esta totalmente regada')
                            break
                        }
                        else if (regar > 0 && regar <= 5) {
                            alert(`regaste ${regar} veces a ${nombrePlanta} ahora su riego total es de ${riegoActual}`)
                            alert('¿Quieres volver a regar a ' + nombrePlanta + '?')
                        } else if (regar > 5) {
                            alert('no puedes regar mas de 5 veces a ' + nombrePlanta)
                        }
                    }
                    else {
                        alert('Debes ingresar un numero')
                    }
                }
            }
            else if (tipoPlanta == 'suculenta') {
                while (loop) {
                    let regar = parseInt(prompt('cuanto quieres regar a ' + nombrePlanta + '?' + 'maximo ' + plantas[1].riego))
                    if (!isNaN(regar)) {
                        riegoActual += regar

                        if (riegoActual == 3) {
                            alert('Felicidades ' + nombrePlanta + ' Esta totalmente regada')
                            break
                        }
                        else if (regar > 0 && regar <= 3) {
                            alert(`regaste ${regar} veces a ${nombrePlanta} ahora su riego total es de ${riegoActual}`)
                            alert('¿Quieres volver a regar a ' + nombrePlanta + '?')
                        } else if (regar > 3) {
                            alert('no puedes regar mas de 3 veces a ' + nombrePlanta)
                        }
                    }
                    else {
                        alert('Debes ingresar un numero')
                    }
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


