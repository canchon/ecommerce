import fetch from "../plug-in/fetch.js"

function makeItems(object){
    const shelf = document.querySelector(".shelf")
    shelf.innerHTML = ""
    for (const element of object) {
        shelf.innerHTML += `
            <div class='shelf--item' onclick="moreInformation(${element['id']})">

                <img  class="shelf__item--img" id='img' src='data:image/png;base64,${element['img_principal']}'>
                <div class="shelf__item--phrase" >
                    
                    <h3 class="shelf__item--title" id='title' >${element['title']}</h3>
                    <!-- <p class="shelf__item--description" id='description' >Descripción muy descriptiva</p> -->
                    <!-- <p  class="shelf__item--categorie" id='categorie' >categoria</p> -->
                    <p class="shelf__item--price" >$ ${element['price']}</p>
                    <!-- <input class='button_details' id="details" type="button" value="Detalles" > -->
                </div>
            </div>

        `
    }
}
(async () => {
    try{
        const response = await fetch('Ecommerce', 'getAllItems', '0')
        makeItems(JSON.parse(response))
    }
    catch (error){
        console.error(error)
    }
})()

//código que despliega la otra pestaña con la información del articulo seleccionado.
function moreInformation(idElement){ // es llamada con onclick
    window.location.replace("http://127.0.0.1:5500/moreDetails/moreInformationArticles.html?id=" + idElement)
}

//Extiendo el ambito de las funcniones para que puedan ser llamadas mediante onclick
window.moreInformation = moreInformation