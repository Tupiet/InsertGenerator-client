let addButton = document.getElementById('addButton')
let buttonsDiv = document.getElementById('buttonsDiv')
let quantity = document.getElementById('quantity')
let tableName = document.getElementById('tableName')


let generateSQLButton = document.getElementById('generateSQLButton')

let options = ['Name', 'Number', 'Street', 'Email', 'DNI', 'Phone (house)', 'Phone (mobile)', 'Date']

// Aquest és l'element que s'enviarà al servidor
let request = {
    info:  { },
    data:  { }
}

// Quan es faci clic al botó d'afegir un nou element
addButton.addEventListener('click', function() {
    // Creem un div, que després posarem justament dins de buttonsDiv i contindrà una dada
    let divisorDiv = document.createElement('div')

    // Creem un altre div, que contindrà la informació extra
    let extraDiv = document.createElement('div')

    // Creem un input i un select, que serviran per posar el nom de l'element i el tipus (nom, número, etc)
    let input = document.createElement('input')
    let select = document.createElement('select')

    // Crearem un checkbox que, quan se li doni clic, mostrarà més informació
    let showExtra = document.createElement('input')
    showExtra.type = 'checkbox'

    // Creem els elements max i min, que en alguns casos serviran per delimitar els rangs de dades
    let max = document.createElement('input')
    let min = document.createElement('input')
    //let format = document.createElement('input')

    // Donarem un nom a aquests atributs
    input.name = 'input'
    select.name = 'select'
    showExtra.name = 'showExtra'
    
    max.name = 'max'
    min.name = 'min'
    //format.name = 'format'
    
    // Donarem unes classes i altres detalls als divs i elements
    divisorDiv.className = "divisorDiv"
    extraDiv.className = "extraDiv"

    input.placeholder = "Column"
    min.placeholder = "Minimum"
    max.placeholder = "Maximum"

    // Afegim un EventListener al botó showExtra per enviar informació extra
    showExtra.addEventListener('change', function () {
        // Si s'ha activat...
        if (this.checked) {
            // Primerament elimina tot el que hi pugui haver
            for (let i = 0; i < extraDiv.children.length; i++) {
                let element = extraDiv.children[i]
                extraDiv.removeChild(element)
            }

            // Després, afegeix els elements extra que toquin
            switch (select.value) {
                case 'Number':
                    divisorDiv.appendChild(extraDiv)
                    extraDiv.appendChild(min)
                    extraDiv.appendChild(max)
                    break
                case 'Date':
                    divisorDiv.appendChild(extraDiv)
                    extraDiv.appendChild(min)
                    extraDiv.appendChild(max)
                    //newDiv.appendChild(format)
                    break
                default:
                    //divisorDiv.removeChild(newDiv)
                    break
            }
            
        } 
        // Si s'ha desactivat la informació extra
        else {
            // Elimina el div de la informació extra
            try {
                divisorDiv.removeChild(extraDiv)
            } catch (error) {  /* No facis res... */ }
        }
    })

    // Afegim un EventListener al select, per poder-nos canviar la informació extra d'acord al que ens demanen
    select.addEventListener('change', function () {
        try {
            // Si la informació extra està activada
            if (showExtra.checked) {
                // Elimina tot el que hi havia abans
                for (let i = 0; i < extraDiv.children.length; i++) {
                    let element = extraDiv.children[i]
                    extraDiv.removeChild(element)
                }

                // Afegim la informació necessària depenent del tipus de dada
                switch (select.value) {
                    case 'Number':
                        divisorDiv.appendChild(extraDiv)
                        extraDiv.appendChild(min)
                        extraDiv.appendChild(max)
                        break
                    case 'Date':
                        divisorDiv.appendChild(extraDiv)
                        extraDiv.appendChild(min)
                        extraDiv.appendChild(max)
                        //newDiv.appendChild(format)
                        break
                    default:
                        divisorDiv.removeChild(extraDiv)
                        break
                }
            }

        } catch (error) { /*console.log('error ' + error)*/ }
    })

    // Afegim els diferents elements al document
    buttonsDiv.appendChild(divisorDiv)

    divisorDiv.appendChild(input)
    divisorDiv.appendChild(select)
    divisorDiv.appendChild(showExtra)
    
    // Afegim cada opció al select
    options.forEach(option => {
        let tag = document.createElement('option')
        tag.textContent = option
        tag.value = option
        select.appendChild(tag)
    });
})

// Afegim un EventListener al botó generateButton, que s'activarà quan es doni clic al botó de generar la informació
generateSQLButton.addEventListener('click', function() {
    
    // Fem un reset al request
    request = {
        info:  { },
        data:  { }
    }
    // Afegim a l'apartat info la quantitat d'inserts que volem rebre
    request.info.quantity = quantity.value


    // Per cada element dins del div
    $("#buttonsDiv > div").each(function(e) {

        let input = this.children[0]
        let option = this.children[1]
        let showExtra = this.children[2]
        let newDiv = this.children[3]

        let max
        let min
        //let format

        // Si existeix newDiv (el div que conté la informació extra), afegirem la informació
        if (newDiv) {
            max = newDiv.children[1]
            min = newDiv.children[0]
            //format = newDiv.children[2]
        }

        // Si el nom de l'element aleatori a rebre està buit, avisa
        if (!input.value) {
            console.log("Empty value! Not sent")
        } 
        // Del contrari, comença amb el procés per enviar la informació
        else {
            /*
             * toSend guardarà el necessari per enviar al servidor.
             * Sempre ha d'enviar el tipus de dada a rebre, que serà el que hagi elegit al select (nom, número, etc)
             * En cas que els camps min o max tinguin valors, toSend també contindrà aquesta informació
             */
            let toSend = { 
                type: option.value
            }

            if (min || max) {
                toSend['min'] = min.value
                toSend['max'] = max.value
            }

            /*if (format) {
                toSend['format'] = format.value
            }*/
            
            /*
             * request és l'element que s'enviarà al server
             * request.data conté els diferents elements a rebre
             * request.data[input.value] és la informació específica de l'element, i tindrà el valor de toSend.
             * Per exemple, si un camp a rebre és myName, seria request.data['myName']
             */
            request.data[input.value] = toSend
        }

    })

    console.log(request)

    // Seguidament, fem la petició al servidor, on li enviem l'objecte request com a string. 
    // Espeficiquem que enviarem un JSON.
    fetch(`http://localhost:81`, {
        method: 'POST',              
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // Agafarem la resposta com a JSON
    .then(response => response.json())
    // Agafarem la informació rebuda i farem la conversió a SQL
    .then(data => {
        console.log(convertToSQL(data))
    })
})

function convertToSQL(data) {
    // Creem la variable textToSend, que contindrà la conversió a SQL
    let textToSend = `INSERT INTO ${tableName.value} (`
    
    // Creem la variable keys, que contindrà una array amb les diferents claus de request.data (els noms dels elements)
    let keys = Object.keys(request.data)

    // Afegeix a textToSend cada clau separades per comes (nom de les columnes)
    keys.forEach((key) => {
        textToSend += `${key}, `
    })

    // Elimina la coma i espai final de l'últim element
    textToSend = textToSend.slice(0, -2) 
    textToSend += ") VALUES "

    // Per cada línia de valors retornada pel servidor 
    data.data.forEach((result) => {
        textToSend += "("
        // Per cada element retornat
        keys.forEach((key) => {
            // Afegeix-lo (si és numèric, sense cometes, del contrari, en cometes)
            let type = request.data[key].type
            if (type == "Number" || type == "Phone (house)" || type == "Phone (mobile)") {
                textToSend += `${result[key]}, `
            } else {
                textToSend += `'${result[key]}', `
            }
        })

        // Elimina la coma i espai final de l'últim element
        textToSend = textToSend.slice(0, -2)
        textToSend += "), "
    })

    // Elimina la coma i espai final de l'últim element
    textToSend = textToSend.slice(0, -2)
    textToSend += ";"

    // Retorna textToSend
    return textToSend
}