const fetchData = () => {

    return new Promise( (resolve, reject) =>{
        
        const url = "http://localhost/Aprendiendo%20A%20Crear%20API/propio/index.php"
        const connection = new XMLHttpRequest()
        connection.open('get',url, true)
        connection.onreadystatechange = function(){
            if(connection.readyState === 4){
                (connection.status === 200)
                    ? resolve(connection.responseText)
                    : reject(connection.error) 
            }
        }
        connection.send()
    } )
}
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

        const response = await fetchData()
        makeItems(JSON.parse(response))
    }
    catch (error){

        console.error(error)
    }
})()

//código que despliega la otra pestaña con la información del articulo seleccionado.
function moreInformation(idElement){

    let id = idElement
    window.location.replace("http://127.0.0.1:5500/moreDetails/moreInformationArticles.html?id=" + id)
}

//Extiendo el ambito de las funcniones para que puedan ser llamadas mediante onclick
window.moreInformation = moreInformation