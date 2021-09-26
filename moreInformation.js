let element = {
    title: 'l',
    description: 'a',
    categoia: 'b',
    price: 3,
}
let total = 0, description = 'nada'
function makePage(id){
    
    const html = `
    
    <div class="cabecera">
    
    <div class="cabecera--img">
    
    <img class="img" onclick="zoom()" src="./src/playa.jpg" alt="${element.title}">
    </div>
    <div class="cabecera--img">
    
    <img class="img" onclick="zoom()" src="./src/playa.jpg" alt="${element.title}">
    </div>
    <div class="cabecera--img">
    
    <img class="img" onclick="zoom()" src="./src/playa.jpg" alt="${element.title}">
    </div>
    <div class="cabecera--img">
    
    <img class="img" onclick="zoom()" src="./src/playa.jpg" alt="${element.title}">
    </div>
    <div class="cabecera--img">
    
    <img class="img" onclick="zoom()" src="./src/playa.jpg" alt="${element.title}">
    </div>
    </div>
    <div class="principal_center">
    
    <img id="img_principal" src="./src/camara.jpg" alt="La misma imagen seleccionada de arriba pero más grande">
    <section class="principal_center_information">
    
    <div class="principal_center_information_details">
    
    <p id="exhibit_categorie">${element.categoia}</p> <hr>
    <h3 id="exhibit_title">${element.price}</h3>
    </div>
    <div class="toPay">
    
    <label >Precio:</label>
    <input class="inputToPay" id="price" type="text" value="${element.price}" readonly>
    <label for="descount_coupon">Porcentaje de descuento:</label>
    <input class="inputToPay" id="descount_coupon" type="number" min="0" max="100">
    <label for="shipping_cost">Costos de envio:</label>
    <input class="inputToPay" id="shipping_cost" type="number" min="0" maxlength="6">
    <label >Total:</label>
    <input class="inputToPay" id="total" type="text" value="${total}" readonly>
    <button class="button" >Comprar</button>
    </div>
    </section>
    </div>  
    <div class="information">
    <p id="exhibit_categorie" style="font-size: 16px;" >${element.description}:</p> <hr>
    <p id="show_description" >${description}dddddddddddddddddddddddddddddddddddddddddddddddddddddddssssssssssss
    sssssssdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssddddddddddsdddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
    </div>
    `
    
    const contenedor = document.getElementById('principal_')
    contenedor.innerHTML = html
}

window.opener.sendId()