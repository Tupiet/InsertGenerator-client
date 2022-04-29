let addButton = document.getElementById('addButton')
let buttonsDiv = document.getElementById('buttonsDiv')
let quantity = document.getElementById('quantity')


let generateButton = document.getElementById('generateButton')

let options = ['Name', 'Number', 'Street', 'Email', 'DNI', 'Phone (house)', 'Phone (mobile)', 'Date']

addButton.addEventListener('click', function() {
    let i = 0

    let divisorDiv = document.createElement('div')

    let newDiv = document.createElement('div')

    let input = document.createElement('input')
    let select = document.createElement('select')

    let showExtra = document.createElement('input')
    showExtra.type = 'checkbox'

    let max = document.createElement('input')
    let min = document.createElement('input')
    let format = document.createElement('input')

    input.name = 'input'
    select.name = 'select'
    showExtra.name = 'showExtra'

    newDiv.style.width = "max-content"
    newDiv.style.border = "1px solid black"

    max.name = 'max'
    min.name = 'min'
    format.name = 'format'

    showExtra.addEventListener('change', function () {
        if (this.checked) {
            for (let i = 0; i < newDiv.children.length; i++) {
                let element = newDiv.children[i]
                newDiv.removeChild(element)
            }

            switch (select.value) {
                case 'Number':
                    divisorDiv.appendChild(newDiv)
                    newDiv.appendChild(min)
                    newDiv.appendChild(max)
                    break
                case 'Date':
                    divisorDiv.appendChild(newDiv)
                    newDiv.appendChild(min)
                    newDiv.appendChild(max)
                    newDiv.appendChild(format)
                    break
                default:
                    divisorDiv.removeChild(newDiv)
                    break
            }
            
        } else {
            divisorDiv.removeChild(newDiv)
        }
    })

    select.addEventListener('change', function () {
        try {
            console.log(newDiv.children.length)

            if (showExtra.checked) {
                for (let i = 0; i < newDiv.children.length; i++) {
                    let element = newDiv.children[i]
                    newDiv.removeChild(element)
                }

                switch (select.value) {
                    case 'Number':
                        divisorDiv.appendChild(newDiv)
                        newDiv.appendChild(min)
                        newDiv.appendChild(max)
                        break
                    case 'Date':
                        divisorDiv.appendChild(newDiv)
                        newDiv.appendChild(min)
                        newDiv.appendChild(max)
                        newDiv.appendChild(format)
                        break
                    default:
                        divisorDiv.removeChild(newDiv)
                        break
                }
            }

            
        } catch (error) {
            console.log('error...')
        }
    })

    buttonsDiv.appendChild(divisorDiv)

    divisorDiv.appendChild(input)
    divisorDiv.appendChild(select)
    divisorDiv.appendChild(showExtra)
    
    options.forEach(option => {
        let tag = document.createElement('option')
        tag.textContent = option
        tag.value = option
        select.appendChild(tag)
    });
})

generateButton.addEventListener('click', function() {
    // Aquest és l'element que s'enviarà al servidor
    let request = {
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
        let format

        if (newDiv) {
            max = newDiv.children[1]
            min = newDiv.children[0]
            format = newDiv.children[2]
        }

        if (request.data[input.value] != null) {
            console.log("Duplicated!")
        } else {
            let toSend = { 
                type: option.value
            }

            if (min) {
                toSend['min'] = Number(min.value)
                toSend['max'] = Number(max.value)
            }

            if (format) {
                toSend['format'] = format.value
            }
            
            request.data[input.value] = toSend
        }

    })

    console.log(request)

    fetch(`http://localhost:81`, {
        method: 'POST',              
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
})