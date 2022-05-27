let addButton = document.getElementById('addButton')
let buttonsDiv = document.getElementById('buttonsDiv')
let quantity = document.getElementById('quantity')
let tableName = document.getElementById('tableName')

let generateSQLButton = document.getElementById('generateSQLButton')
let generateCSVButton = document.getElementById('generateCSVButton')

let copyButton = document.getElementById('copyClipboard')
let closeOverlay = document.getElementById('closeOverlay')

let codeSection = document.getElementById('codeSection')
let codeResult = document.getElementById('codeResult')

let overlay = document.getElementById('overlay')
let loading = document.getElementById('loading')

let options = ['Name', 'Number', 'Street', 'Email', 'DNI', 'Phone (house)', 'Phone (mobile)', 'Date', 'Custom']

// Aquest és l'element que s'enviarà al servidor
let request = {
    info:   { },
    data:   { },
    custom: { }
}

// Quan es faci clic al botó d'afegir un nou element
addButton.addEventListener('click', function() {
    // Creem un div, que després posarem justament dins de buttonsDiv i contindrà una dada
    let divisorDiv = document.createElement('div')

    // Creem un altre div, que contindrà la informació extra
    let extraSection = document.createElement('section')
    let extraHeader = document.createElement('header')
    let extraMain = document.createElement('main')
    let extraMainDiv = document.createElement('div')
    let closeExtraSection = document.createElement('button')
    let closeExtraSectionIcon = document.createElement('i')

    // Creem un input i un select, que serviran per posar el nom de l'element i el tipus (nom, número, etc)
    let input = document.createElement('input')
    let select = document.createElement('select')

    // Crearem un botó que, quan se li doni clic, mostrarà més informació
    let showExtra = document.createElement('button')
    let showExtraIcon = document.createElement('i')

    // Creem un botó, que s'encarregarà d'eliminar aquest objecte
    let deleteButton = document.createElement('button')

    //let format = document.createElement('input')

    // Donarem un nom a aquests atributs
    input.name = 'input'
    select.name = 'select'
    showExtra.id = 'showExtra'
    extraMainDiv.id = 'extraOptions'
    
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    
    //format.name = 'format'
    
    // Donarem unes classes i altres detalls als divs i elements
    divisorDiv.className = "divisorDiv"
    extraSection.className = "extraDiv"
    deleteButton.className = "deleteButton"
    showExtraIcon.classList.add('fa-solid')
    showExtraIcon.classList.add('fa-info')

    closeExtraSection.classList.add('fa-solid')
    closeExtraSection.classList.add('fa-close')

    input.placeholder = "Column"

    // Afegim els diferents elements al document
    buttonsDiv.appendChild(divisorDiv)
    divisorDiv.appendChild(input)
    divisorDiv.appendChild(select)
    divisorDiv.appendChild(showExtra)
    divisorDiv.appendChild(deleteButton)
    showExtra.appendChild(showExtraIcon)

    extraSection.classList.add("hidden")
    divisorDiv.appendChild(extraSection)
    extraSection.appendChild(extraHeader)
    extraSection.appendChild(extraMain)
    extraMain.appendChild(extraMainDiv)
    extraHeader.appendChild(closeExtraSection)
    closeExtraSection.appendChild(closeExtraSectionIcon)

    // Afegim un EventListener al select, per poder-nos canviar la informació extra d'acord al que ens demanen
    select.addEventListener('change', function () {
        // Elimina tot el que hi hagi i actualitza les dades a les actuals
        try { removeAndAdd() } catch (error) { /*console.log('error ' + error)*/ }
    })
    
    showExtra.addEventListener('click', function() {
        overlay.classList.remove('hidden')
        extraSection.classList.remove('hidden')
    })

    closeExtraSection.addEventListener('click', function() {
        overlay.classList.add('hidden')
        extraSection.classList.add('hidden')
    })

    deleteButton.addEventListener('click', function() {
        divisorDiv.remove()
    })

    // Afegim cada opció al select
    options.forEach(option => {
        let tag = document.createElement('option')
        tag.textContent = option
        tag.value = option
        select.appendChild(tag)
    })

    function removeAndAdd() {
        // Elimina tot el que hi havia abans
        for (let i = 0; i < extraMainDiv.children.length; ) {
            let element = extraMainDiv.children[i]
            console.log(element)
            extraMainDiv.removeChild(element)
        }

        // Afegim la informació necessària depenent del tipus de dada
        switch (select.value) {
            case 'Name': {
                let name = document.createElement('input')
                let firstSurname = document.createElement('input')
                let lastSurname = document.createElement('input')

                let nameDiv = document.createElement('div')
                let firstSurnameDiv = document.createElement('div')
                let lastSurnameDiv = document.createElement('div')

                let nameLabel = document.createElement('label')
                let firstSurnameLabel = document.createElement('label')
                let lastSurnameLabel = document.createElement('label')

                name.name = 'name'
                firstSurname.name = 'firstSurname'
                lastSurname.name = 'lastSurname'

                name.type = 'checkbox'
                firstSurname.type = 'checkbox'
                lastSurname.type = 'checkbox'

                name.checked = true;

                nameLabel.innerHTML = "Name: "
                firstSurnameLabel.innerHTML = "First surname: "
                lastSurnameLabel.innerHTML = "Last surname: "

                extraMainDiv.appendChild(nameDiv)
                nameDiv.appendChild(nameLabel)
                nameDiv.appendChild(name)
                extraMainDiv.appendChild(firstSurnameDiv)
                firstSurnameDiv.appendChild(firstSurnameLabel)
                firstSurnameDiv.appendChild(firstSurname)
                extraMainDiv.appendChild(lastSurnameDiv)
                lastSurnameDiv.appendChild(lastSurnameLabel)
                lastSurnameDiv.appendChild(lastSurname)
                break
            }
            case 'Number': {
                // Creem els elements max i min, que serviran per delimitar els rangs de dades
                let max = document.createElement('input')
                let min = document.createElement('input')

                let minDiv = document.createElement('div')
                let maxDiv = document.createElement('div')

                let minLabel = document.createElement('label')
                let maxLabel = document.createElement('label')

                max.name = 'max'
                min.name = 'min'

                min.placeholder = "Minimum"
                max.placeholder = "Maximum"

                minLabel.innerHTML = "Minimum: "
                maxLabel.innerHTML = "Maximum: "

                extraMainDiv.appendChild(minDiv)
                minDiv.appendChild(minLabel)
                minDiv.appendChild(min)
                extraMainDiv.appendChild(maxDiv)
                maxDiv.appendChild(maxLabel)
                maxDiv.appendChild(max)
                break
            }
            case 'Date': {
                // Creem els elements max i min, que serviran per delimitar els rangs de dades
                let max = document.createElement('input')
                let min = document.createElement('input')

                let minDiv = document.createElement('div')
                let maxDiv = document.createElement('div')

                let minLabel = document.createElement('label')
                let maxLabel = document.createElement('label')

                max.name = 'max'
                min.name = 'min'

                min.placeholder = "Minimum"
                max.placeholder = "Maximum"
                
                minLabel.innerHTML = "Minimum: "
                maxLabel.innerHTML = "Maximum: "

                extraMainDiv.appendChild(minDiv)
                minDiv.appendChild(minLabel)
                minDiv.appendChild(min)
                extraMainDiv.appendChild(maxDiv)
                maxDiv.appendChild(maxLabel)
                maxDiv.appendChild(max)
                //newDiv.appendChild(format)
                break
            }
            case 'Custom': {
                let customP = document.createElement('p')
                let customAdd = document.createElement('button')
                let customDiv = document.createElement('div')

                customP.innerHTML = "Add the values you want to be selected randomly!"

                customAdd.innerHTML = `<i class="fa-solid fa-add"></i>`
                customAdd.id = "customAdd"

                customDiv.id = "customDiv"

                customAdd.addEventListener('click', function() {
                    let customInput = document.createElement('input')
                    customDiv.appendChild(customInput)
                })
                
                extraMainDiv.appendChild(customP)
                extraMainDiv.appendChild(customAdd)
                extraMainDiv.appendChild(customDiv)
                break
            }
            default:
                let pElement = document.createElement('p')
                pElement.innerHTML = "There's no customization for this data"
                extraMainDiv.appendChild(pElement)
                break
        }
    }

    // Afegeix la informació 
    removeAndAdd()
})

// Afegim un EventListener al botó generateButton, que s'activarà quan es doni clic al botó de generar l'SQL
generateSQLButton.addEventListener('click', async function() {
    // En primer lloc, recollim les dades del client (ho posarà tot a l'objecte request)
    collectData()

    console.log(request)

    overlay.classList.remove('hidden')
    loading.classList.remove('hidden')

    // Seguidament, fem la petició al servidor, on li enviem l'objecte request com a string. 
    // Espeficiquem que enviarem un JSON.
    let response = await fetch(`http://localhost:81`, {
        method: 'POST',              
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // Si la resposta és correcta, converteix-ho a JSON, retorna-ho com a SQL i fes canvis a les classes
    if (response.ok) {
        let data = await response.json()
        codeResult.innerHTML = convertToSQL(data)
        codeResult.classList.add('language-sql')
        Prism.highlightAll()
        loading.classList.add('hidden')
        codeSection.classList.remove('hidden')
        //console.log(convertToSQL(data))
    }
})

// Afegim un EventListener al botó generateButton, que s'activarà quan es doni clic al botó de generar el CSV
generateCSVButton.addEventListener('click', async function() {
    // En primer lloc, recollim les dades del client (ho posarà tot a l'objecte request)
    collectData()
    
    console.log(request)
    
    overlay.classList.remove('hidden')
    loading.classList.remove('hidden')
    
    // Seguidament, fem la petició al servidor, on li enviem l'objecte request com a string. 
    // Espeficiquem que enviarem un JSON.
    let url = "http://localhost:81"
    let response = await fetch(url, {
        method: 'POST',              
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    // Si la resposta és correcta, converteix-ho a JSON, retorna-ho com a SQL i fes canvis a les classes
    if (response.ok) {
        let data = await response.json()
        codeResult.innerHTML = convertToCSV(data)
        codeResult.classList.add('language-csv')
        Prism.highlightAll()
        loading.classList.add('hidden')
        codeSection.classList.remove('hidden')
        //console.log(convertToSQL(data))
    }
})

// Quan es doni clic al botó de tancar l'overlay
closeOverlay.addEventListener('click', function() {
    overlay.classList.add('hidden')
    codeSection.classList.add('hidden')
    try {
        codeResult.classList.remove('language-sql')
        codeResult.classList.remove('language-csv')
    } catch (error) { }
})

// Quan es doni clic al botó de copiar
copyButton.addEventListener('click', function() {
    navigator.clipboard.writeText(codeResult.innerText)
})

function collectData() {
    // Fem un reset al request
    request = {
        info:   { },
        data:   { },
        custom: { }
    }
    // Afegim a l'apartat info la quantitat d'inserts que volem rebre
    request.info.quantity = quantity.value


    // Per cada element dins del div
    $("#buttonsDiv > div").each(function(e) {

        let input = this.children[0]
        let option = this.children[1]
        let newDiv = this.children[4]
        let extraMain = newDiv.children[1]
        let extraMainDiv = extraMain.children[0]

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

            switch (option.value) {
                case 'Name': {
                    let extraNameDiv = extraMainDiv.children[0]
                    let extraFirstSurnameDiv = extraMainDiv.children[1]
                    let extraLastSurnameDiv = extraMainDiv.children[2]

                    let name = extraNameDiv.children[1]
                    let firstSurname = extraFirstSurnameDiv.children[1]
                    let lastSurname = extraLastSurnameDiv.children[1]

                    toSend['name'] = name.checked
                    toSend['firstSurname'] = firstSurname.checked
                    toSend['lastSurname'] = lastSurname.checked
                    break
                }
                case 'Number':
                case 'Date': {
                    let extraMinDiv = extraMainDiv.children[0]
                    let extraMaxDiv = extraMainDiv.children[1]
    
                    let max = extraMinDiv.children[1]
                    let min = extraMaxDiv.children[1]

                    toSend['min'] = min.value
                    toSend['max'] = max.value
                    break
                }
                case 'Custom': {
                    //request.custom['first']
                    let customArray = []
                    let customDiv = extraMainDiv.children[2]
                    let childrens = Array.from(customDiv.children)

                    childrens.forEach(item => {
                        console.log(item)
                        customArray.push(item.value)
                    })

                    request.custom[`${input.value}`] = customArray
                } 
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
}

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

function convertToCSV(data) {
    // Creem la variable textToSend, que contindrà la conversió a SQL
    let textToSend = ""
    
    // Creem la variable keys, que contindrà una array amb les diferents claus de request.data (els noms dels elements)
    let keys = Object.keys(request.data)

    // Afegeix a textToSend cada clau separades per comes (nom de les columnes)
    /*keys.forEach((key) => {
        textToSend += `${key}, `
    })*/

    // Per cada línia de valors retornada pel servidor 
    data.data.forEach((result) => {
        keys.forEach((key) => { 
            // Per cada element retornat
            textToSend += `${result[key]},`
        })
        textToSend = textToSend.slice(0, -1)
        textToSend += "\n"
    })

    // Retorna textToSend
    return textToSend
}