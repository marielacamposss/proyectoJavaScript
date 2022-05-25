let loop = true
riegoActual = 0

alert('bienvenido a cuida tu planta')
cuidaTuplanta = prompt('¿Quieres cuidar una planta? (si/no)')

if (cuidaTuplanta == 'si') {

    let nombrePlanta = prompt('¿Como quieres que se llame tu planta?')
    if (nombrePlanta == '') {
        alert('El nombre de tu planta no puede quedar vacio')

    }
    else {
        alert('El nombre de tu planta ahora es ' + nombrePlanta)


        while (loop) {
            let regar = parseInt(prompt('cuanto quieres regar a ' + nombrePlanta + '? (Maximo 5)'))
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
    }

}

else if (cuidaTuplanta == 'no') {
    alert('no hay problema, que estes muy bien')
}

else {
    alert('tu respuesta no es valida, debe ser si o no')
}


