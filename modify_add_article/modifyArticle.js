import fetch from "../plug-in/fetch.js" // Se encarga de hacer la petición a la API

const inputSearchValue = () => document.querySelector("#search").value//obtener argumento de búsqueda
const search = async() =>{  //función que busca un elemento por su título, es llamada con 'onclick'
    
    try {
        
        showResponse("Buscando...") 
        const response = await fetch('Search', 'searchByFeature', {

            'feature': 'title', //esta característica es la que se necesita, pero la API puede recibir cualquier otra caractrística
            'searchParameter': inputSearchValue(),
        })
        if(JSON.parse(response)[0] == '0'){

            showResponse("elemento no existe")
        }
        else{

            writeHtml(JSON.parse(response))
        }
    }
    catch (error) {

        console.error(error)
    }
} 
function writeHtml(array){
    
    let modificarHtml
    for (const object of array) {
        
        modificarHtml = `
        
        <div class="principal__modify__response--container" >
        
            <div class='principal__modify__change--item'>
            
                <label class="feature" for='modify_title'>Título:</label>
                <textarea readonly class="featureOriginal" id="show--title" >${object.title}</textarea>
                <input id='modify_title' class='input' type='text' placeholder="Nuevo título" maxlength="26" required>
                <input type="button" class="button_modify" onclick="upDate('title')" value="Modificar" >
            </div>
            <div class='principal__modify__change--item'>
            
                <label class="feature" for='description'>Descripción:</label>
                <textarea readonly id="show--description" class="featureOriginal">${object.description}</textarea>
                <textarea id='modify_description' class="text_area" placeholder="Nueva Descripción" maxlength="370"></textarea>
                <input id="text_area" type="button" class="button_modify" onclick="upDate('description')" value="Modificar" >
            </div>
            <div class='principal__modify__change--item'>
            
                <label class="feature" for='categorie'>Categoria:</label>
                <textarea id="show--categorie" class="featureOriginal" readonly>${object.categorie}</textarea>
                <input id='modify_categorie' class='input' type='text' placeholder="Nueva categoria" maxlength="30" required>
                <input type="button" class="button_modify" onclick="upDate('categorie')" value="Modificar" >
            </div>
            <div class='principal__modify__change--item'>
            
                <label class="feature" for='price'>Precio:</label>
                <textarea id="show--price" class="featureOriginal" readonly>${object.price}</textarea>
                <input id='modify_price' class='input' type='number' placeholder="Nuevo precio" step="10000" min="1000" required>
                <input type="button" class="button_modify" onclick="upDate('price')" value="Modificar" >
            </div>
            
            <form onsubmit="modifyImg()" class='container--img' action="http://localhost/Aprendiendo%20A%20Crear%20API/propio/modifyImg.php" method="post" enctype='multipart/form-data' >
                <div class='principal__modify__change--item'>
                    <label class="feature" for='img_principal'>Imagen principal:</label>
                    <img class="image" src='data:image/png;base64,${object.img_principal}' alt='${object.title}'>
                    <input name='img_principal' type='file' accept=".png, .jpg, .jpeg, .gif" class="input_file" required>
                </div>
                <div class='principal__modify__change--item'>
                    <label class="feature" for='img_principal'>Imagen arriba:</label>
                    <img class="image" src='data:image/png;base64,${object.img_top}' alt='${object.title}'>
                    <input name='img_top' type='file' accept=".png, .jpg, .jpeg, .gif" class="input_file" required>
                </div>
                <div class='principal__modify__change--item'>
                    <label class="feature" for='img_principal'>Imagen derecha:</label>
                    <img class="image" src='data:image/png;base64,${object.img_right}' alt='${object.title}'>
                    <input name='img_right' name='img_right' type='file' accept=".png, .jpg, .jpeg, .gif" class="input_file" required>
                </div>
                <div class='principal__modify__change--item'>
                    <label class="feature" for='img_principal'>Imagen abajo:</label>
                    <img class="image" src='data:image/png;base64,${object.img_bottom}' alt='${object.title}'>
                    <input name='img_bottom' type='file' accept=".png, .jpg, .jpeg, .gif" class="input_file" required>
                </div>
                    <div class='principal__modify__change--item'>
                    <label class="feature" for='img_principal'>imagen izquierda:</label>
                    <img class="image" src='data:image/png;base64,${object.img_left}' alt='${object.title}'>
                    <input name='img_left' type='file' accept=".png, .jpg, .jpeg, .gif" class="input_file" required>
                </div>  
                <input name="id" id='id_element' type='text' value='${object.id}'> <!--  permite obtener el id del elemento a modificar cuando se envia la peticion al servidor.-->
                <input class="button" type="submit" value="Modificar Imágenes" formtarget="_blank">
            </form>
        </div>
        `
        showResponse(modificarHtml)
    }
}
function upDate(feature){   
    
    const inputChangeValue = document.getElementById(`modify_${feature}`).value
    const idValue = document.querySelector("#id_element").value
    // console.log(`id: ${idValue} feature to change: ${inputChangeValue} -- feature: ${feature}`)
    
    fetch('Modify', 'upDateFeatureItem' , {

        'feature': feature,
        'id': idValue,
        'featureChange': inputChangeValue
    })
        .then( response => setTimeout( () => {
        
            //notificarle al cliente el éxito de la operación.
            search() 
        },3000 ) )
        .catch( error => console.error(error) )
}

function showResponse(response){
    
    const input = document.querySelector(".principal__modify--response")
    input.innerHTML = response
}

function modifyImg(){

    fetch('')
    
    setTimeout( () => {
        
        //notificarle al cliente el éxito de la operación.
        // console.log(response)
        search() 
    },2000 )
}

// Defino el scope de la funciones hasta window para que puedan ser llamadas mediante onclick
window.modifyImg = modifyImg
window.upDate = upDate 
window.search = search 