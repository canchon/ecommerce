import fetch from "../plug-in/fetch.js"
window.opener

const getParameterFromUrl = parameterName => {

    let array = location.search.substr(1).split('&');
    let newArray = []
    for(let i = 0; i<= array.length; i++){

        newArray = array[i].split('=')
        if(newArray[0] == parameterName) return decodeURIComponent(newArray[1])
    }
}
( () => {
    fetch('Ecommerce', 'searchByFeature', {
        'feature': 'id',
        'searchParameter': getParameterFromUrl('id'),
    } )

        .then(response => {
            console.log(response)
            writeHtml(JSON.parse(response))
        })
        .catch( error => console.error('Ha ocurrido un error con el servidor', error))
})()
function writeHtml(object){

    const element = object[0]
        const html = `
        
        <div class="cabecera">
        
            <div class="cabecera--img">
            
                <img class="img" onclick="zoom('img_top')" src="data:image/png;base64,${element.img_top}" alt="${element.title}">
            </div>
            <div class="cabecera--img">
            
                <img class="img" onclick="zoom('img_right')" src="data:image/png;base64,${element.img_right}" alt="${element.title}">
            </div>
            <div class="cabecera--img">
            
                <img class="img" onclick="zoom('img_bottom')" src="data:image/png;base64,${element.img_bottom}" alt="${element.title}">
            </div>
            <div class="cabecera--img">
            
                <img class="img" onclick="zoom('img_left')" src="data:image/png;base64,${element.img_left}" alt="${element.title}">
            </div>
            <div class="cabecera--img">
            
                <img class="img" onclick="zoom('img_principal')" src="data:image/png;base64,${element.img_principal}" alt="${element.title}">
            </div>
        </div>
        <div class="principal_center">
            
            <div class="principal_center_img">

                <img id="img_principal" src="data:image/png;base64,${element.img_principal}" alt="${element.title}">
            </div>
            <section class="principal_center_information">
            
                <div class="principal_center_information_details">
                
                    <p id="exhibit_categorie">${element.categorie}</p> <hr>
                    <h3 id="exhibit_title">${element.title}</h3>
                </div>
                <div class="toPay">
                
                    <label >Precio:</label>
                    <p id="price" readonly>$ ${element.price}</p>
                    <label for="descount_coupon">Porcentaje de descuento:</label>
                    <input class="inputToPay" id="descount_coupon" type="number" min="0" max="100" placeholder="0 - 100" value="10">
                    <label for="shipping_cost">Costos de envio:</label>
                    <input class="inputToPay" id="shipping_cost" type="number" step="5000" min="0" maxlength="6" placeholder="Agregalos aqui" value="14000">
                    <input type="button" value="Calcular precio" class="button" id="buttonCalcPriceTotal">
                    <label >Total:</label>
                    <input class="inputToPay" id="total" type="text" value="0" readonly>
                    <button class="button" id="buttonBuy" >Comprar</button>
                    <textarea id="message" class="inputToPay" readonly></textarea>
                </div>
            </section>
        </div>  
        <div class="information">
            <p id="exhibit_categorie" style="font-size: 16px;" >Descripción:</p> <hr>
            <p id="show_description" >${element.description}</p>
        </div>
        ` //Escribe en la página toda la estructura e información del articulo
        
        document.getElementById('principal_').innerHTML = html
}
function zoom(nameImage){ //Amplia la imagen que el cliente seleccione

    const img = document.querySelector('#img_principal')
    fetch('Ecommerce', 'searchByFeature', {

        'feature': 'id',
        'searchParameter': getParameterFromUrl('id'),
    } )
        .then( resolve => {

            const element = JSON.parse(resolve)[0]
            img.src = `data:image/png;base64,${element[nameImage]}`
        })
        .catch( error => console.error(error))
}

function showPriceTotal(){

    const inputShowTotal = document.getElementById('total')
    inputShowTotal.value = calcTotal()
}
setTimeout( () => {

    const buttonBuy = document.getElementById('buttonBuy')
    buttonBuy.addEventListener('click', showMesage)
    const buttonCalcPriceTotal = document.getElementById('buttonCalcPriceTotal')
    buttonCalcPriceTotal.addEventListener('click', showPriceTotal)
} ,1000)
    
const calcTotal = () => {

    const price = parseInt(document.getElementById('price').value)
    const percentageDescount = parseInt(document.getElementById('descount_coupon').value)
    const shippingCosts = parseInt( document.getElementById('shipping_cost').value)
    const priceTotal = price*(1 - (percentageDescount/100)) + shippingCosts

    return priceTotal
}
const showMesage = () => {

    const inputShowMessage = document.getElementById('message')
    inputShowMessage.innerText = 'No puedes realizar la compra porque esta tienda es fictica.'
    inputShowMessage.style.display = 'block'
}

window.zoom = zoom