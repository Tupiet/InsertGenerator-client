let addButton = document.getElementById('addButton')
let buttonsDiv = document.getElementById('buttonsDiv')
let quantity = document.getElementById('quantity')


let generateButton = document.getElementById('generateButton')

let options = ['Name', 'Boy name', 'Girl name', 'Street', 'DNI', 'Phone (house)', 'Phone (mobile)', 'Date']

addButton.addEventListener('click', function() {
    let i = 0

    let divisorDiv = document.createElement('div')

    let input = document.createElement('input')
    let select = document.createElement('select')

    input.name = 'input'
    select.name = 'select'

    buttonsDiv.appendChild(divisorDiv)

    divisorDiv.appendChild(input)
    divisorDiv.appendChild(select)
    
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
        info: { },
        data: { }
    }
    
    // Afegim a l'apartat info la quantitat d'inserts que volem rebre
    request.info.quantity = quantity.value


    // Per cada element dins del div
    $("#buttonsDiv div").each(function(e) {

        let input = this.children[0]
        let option = this.children[1]

        if (request.data[input.value] != null) {
            console.log("Duplicated!")
        } else {
            request.data[input.value] = option.value
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