let loop = true
let riegoActual = 0

const nombres = ['filodendro', 'aralia', 'maranta', 'suculenta', 'singonio']

alert('bienvenido a cuida tu planta')
cuidaTuplanta = prompt('¿Quieres cuidar una planta? (si/no)').toLowerCase()

if (cuidaTuplanta == 'si') {
    let tipoPlanta = prompt('¿que planta quieres cuidar? ' + 'Elige una de la siguiente lista e ingresala: ' + nombres[0] + ' ' + nombres[1] + ' ' + nombres[2] + ' ' + nombres[3] + ' ' + nombres[4]).toLowerCase()
    alert('elegiste un ' + tipoPlanta)

    let nombrePlanta = prompt('¿Como quieres que se llame tu ' + tipoPlanta)
    if (nombrePlanta == '') {
        alert('El nombre de tu planta no puede quedar vacio')

    }
    else {
        alert('El nombre de tu ' + tipoPlanta + ' ahora es ' + nombrePlanta)


        while (loop) {
            let regar = parseInt(prompt('cuanto quieres regar a ' + nombrePlanta + '? (Maximo 5)'))
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

}

else if (cuidaTuplanta == 'no') {
    alert('no hay problema, que estes muy bien')
}

else {
    alert('tu respuesta no es valida, debe ser si o no')
}


