//obtener argumento de búsqueda
const inputSearchValue = () => document.querySelector("#search").value

//enviar una petición a la Api para retornar el elemento que coincida
const fetchData = (url, method, featureInput, featureOutput) => {
    
    return new Promise( (resolve, reject) =>{
        
        const data = new FormData()
        data.append(featureInput, featureOutput)
        const req = new XMLHttpRequest()
        
        req.open(method, url)
        req.onload = () => {
            
            (req.status === 200)
            ? resolve(req.responseText)
            : reject(req.error) 
        }
        req.send(data)
    })
}

//darle una respuesta al cliente    
const search = async() =>{
    
    try {
        
        const url = "http://localhost/Aprendiendo%20A%20Crear%20API/propio/search.php"
        showResponse("Buscando...") 
        const response = await fetchData(url, 'post', "title", inputSearchValue())
        if(response == 0){
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
                <input type="button" class="button_modify" value="Modificar" onclick="upDate('title')">
                <!-- <p id="response" ></p> -->
            </div>
            <div class='principal__modify__change--item'>

                <label class="feature" for='description'>Descripción:</label>
                <textarea readonly id="show--description" class="featureOriginal">${object.description}</textarea>
                <textarea id='modify_description' class="text_area" placeholder="Nueva Descripción" maxlength="370"></textarea>
                <input id="text_area" type="button" class="button_modify" value="Modificar" onclick="upDate('description')">
                <!-- <p id="response" ></p> -->
            </div>
            <div class='principal__modify__change--item'>

                <label class="feature" for='categorie'>Categoria:</label>
                <textarea id="show--categorie" class="featureOriginal" readonly>${object.categorie}</textarea>
                <!-- <p class="featureOriginal" id="show--categorie" >${object.categorie}</p> -->
                <input id='modify_categorie' class='input' type='text' placeholder="Nueva categoria" maxlength="30" required>
                <input type="button" class="button_modify" value="Modificar" onclick="upDate('categorie')">
                <!-- <p id="response" ></p> -->
            </div>
            <div class='principal__modify__change--item'>

                <label class="feature" for='price'>Precio:</label>
                <textarea id="show--price" class="featureOriginal" >${object.price}</textarea>
                <!-- <p class="featureOriginal" id="show--price" >${object.price}</p> -->
                <input id='modify_price' class='input' type='number' placeholder="Nuevo precio" maxlength="9" required step="10000" min="1000">
                <input type="button" class="button_modify" value="Modificar" onclick="upDate('price')">
                <!-- <p id="response" ></p> -->
            </div>

            <form class='container--img' action="http://localhost/Aprendiendo%20A%20Crear%20API/propio/modifyImg.php" method="post" enctype='multipart/form-data' >
                <div class='principal__modify__change--item'>
                    <label class="feature" for='img_principal'>Imagen principal:</label>
                    <img class="image" src='data:image/png;base64,${object.img_principal}' alt='${object.title}'>
                    <input name='img_principal' type='file' accept=".png, .jpg, .jpeg, .gif" class="input_file" required>
                    <!-- <p id="response" ></p></div> -->
                </div>
                <div class='principal__modify__change--item'>
                    <label class="feature" for='img_principal'>Imagen arriba:</label>
                    <img class="image" src='data:image/png;base64,${object.img_top}' alt='${object.title}'>
                    <input name='img_top' type='file' accept=".png, .jpg, .jpeg, .gif" class="input_file">
                    <!-- <p id="response" ></p> -->
                </div>
                <div class='principal__modify__change--item'>
                    <label class="feature" for='img_principal'>Imagen derecha:</label>
                    <img class="image" src='data:image/png;base64,${object.img_right}' alt='${object.title}'>
                    <input name='img_right' name='img_right' type='file' accept=".png, .jpg, .jpeg, .gif" class="input_file">
                    <!-- <p id="response" ></p> -->
                </div>
                <div class='principal__modify__change--item'>
                    <label class="feature" for='img_principal'>Imagen abajo:</label>
                    <img class="image" src='data:image/png;base64,${object.img_bottom}' alt='${object.title}'>
                    <input name='img_bottom' type='file' accept=".png, .jpg, .jpeg, .gif" class="input_file">
                    <!-- <p id="response" ></p> -->
                </div>
                <div class='principal__modify__change--item'>
                    <label class="feature" for='img_principal'>imagen izquierda:</label>
                    <img class="image" src='data:image/png;base64,${object.img_left}' alt='${object.title}'>
                    <input name='img_left' type='file' accept=".png, .jpg, .jpeg, .gif" class="input_file">
                    <!-- <p name="response" ></p> -->
                </div>
                <input name="id" id='id_element' type='text' value='${object.id}'> <!--  permite obtener el id del elemento a modificar cuando se envia la peticion al servidor.-->
                <input onclick='modifyImg()' class="button" type="submit" value="Modificar Imágenes" formtarget="_blank">
            </form>
        </div>
        `
        showResponse(modificarHtml)
    }
}

function upDate(feature){   
    
    //obtener la caracteristica y su valor a modificar
    const inputChangeValue = document.querySelector(`#modify_${feature}`).value
    // const pValue = document.querySelector(`#show--${feature}`).value
    const idValue = document.querySelector("#id_element").value
    // showResponse(`${inputChangeValue} -- ${feature}`)
    console.log(`id: ${idValue} feature to change: ${inputChangeValue} -- feature: ${feature}`)

    //enviar la peticion al servidor y obtener una respuesta
    function upDateApi(){
        
        return new Promise( (resolve, reject) =>{
            
            const url = "http://localhost/Aprendiendo%20A%20Crear%20API/propio/modify.php"
            let data = new FormData()
            data.append('feature', feature)
            // data.append('featureOriginal', `${pValue}`)
            data.append('id', `${idValue}`)
            data.append('featureChange', `${inputChangeValue}`)
            const req = new XMLHttpRequest()
            
            req.open("post", url)
                req.onload = () => {
                    
                    (req.status === 200)
                    ? resolve(req.responseText)
                    : reject(req.error)
                }
            req.send(data)
            })
    }
    upDateApi()
        .then(response => {
            
            setTimeout( () => {
                
                //notificarle al cliente el éxito de la operación.
                console.log(response)
                search() 
            },3000 )
        })
        .catch(error => console.error(error))
}
function showResponse(response){

    const input = document.querySelector(".principal__modify--response")
    input.innerHTML = response
}

function modifyImg(){

    setTimeout( () => {
                
        //notificarle al cliente el éxito de la operación.
        // console.log(response)
        search() 
    },3000 )
}