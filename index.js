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
        <div class='shelf--item'>

            <img  class="shelf__item--img" id='img' src='data:image/png;base64,${element['img_principal']}'>
            <div class="shelf__item--phrase" >
                
                <h3 class="shelf__item--title" id='title' >${element['title']}</h3>
                <!-- <p class="shelf__item--description" id='description' >Descripción muy descriptiva</p> -->
                <!-- <p  class="shelf__item--categorie" id='categorie' >categoria</p> -->
                <p class="shelf__item--price" >$ ${element['price']}</p>
                <input id="details" type="button" value="Detalles" onclick="moreInformation()" >
            </div>
        </div>

        `
        // <div class='shelf--item'>
        //     <h3 class='shelf__item--title' id='title' >${element['title']} </h3>
        //     <p class='shelf__item--description' id='description' >${element['description']}</p>
        //     <p  class='shelf__item--categorie' id='categorie' >${element['categorie']}</p>
        //     <p><img  class='shelf__item--img' id='img' src='data:image/png;base64,${element['img_principal']}' alt='imagen descriptiva del producto.'> La imagen se sube desde pc mediante un botón. </p>   
        //     <p class='shelf__item--price' >${element['price']}</p>
        // </div>
    }
}

(async function getData(){
    try{
        const response = await fetchData()
        makeItems(JSON.parse(response))
        // makeItems(response)
        // console.log(response)
        // console.log(JSON.parse(response))
    }
    catch (error){
        console.log("trycath")
        console.error(error)
    }
})()