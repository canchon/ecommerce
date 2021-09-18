//obtener argumento de búsqueda
const inputSearch = () => document.querySelector("#search").value

//enviar una petición a la Api para retornar el elemento que coincida
const fetchData = () => {
    
    showResponse("Buscando...") 
    return new Promise( (resolve, reject) =>{

        url = "http://localhost/Aprendiendo%20A%20Crear%20API/propio/search.php"
        const data = new FormData()
        data.append("title", inputSearch())
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

//darle una respuesta al cliente    
const search = async() =>{

    try {

        const response = await fetchData()
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

function showResponse(response){
    
    const input = document.querySelector(".principal__modify--response")
    input.innerHTML = response
}

function writeHtml(array){
    
    let modificarHtml
    for (const object of array) {
        
        modificarHtml += `
        
            <div class="principal__modify__response--container" >
                <form action='http://localhost/Aprendiendo%20A%20Crear%20API/propio/index.php' method='PUT' enctype='multipart/form-data'>
                    <div class='principal__modify__change--item'>
                        <label for='title'>Título:</label>
                        <p>${object.title}</p>
                        <input name='title' type='text'>
                    </div>
                    <div class='principal__modify__change--item'>
                        <label for='description'>Descripción:</label>
                        <p>${object.description}</p>
                        <input name='description' type='text'>
                    </div>
                    <div class='principal__modify__change--item'>
                        <label for='categorie'>Categoria:</label>
                        <p>${object.categorie}</p>
                        <input name='categorie' type='text'>
                    </div>
                    <div class='principal__modify__change--item'>
                        <label for='price'>Precio:</label>
                        <p>${object.price}</p>
                        <input name='price' type='number'>
                    </div>
                                        
                    <div class='container--img' >
                        <div class='principal__modify__change--item'>
                            <label for='img_principal'>Imagen principal:</label>
                            <img src='data:image/png;base64,${object.img_principal}' alt=''>
                            <input name='img_principal' type='file' >
                        </div>
                        <div class='principal__modify__change--item'>
                            <label for='img_principal'>Imagen arriba:</label>
                            <img src='data:image/png;base64,${object.img_top}' alt=''>
                            <input name='img_top' type='file' >
                        </div>
                        <div class='principal__modify__change--item'>
                            <label for='img_principal'>Imagen derecha:</label>
                            <img src='data:image/png;base64,${object.img_right}' alt=''>
                            <input name='img_right' type='file' >
                        </div>
                        <div class='principal__modify__change--item'>
                            <label for='img_principal'>Imagen abajo:</label>
                            <img src='data:image/png;base64,${object.img_bottom}' alt=''>
                            <input name='img_bottom' type='file' >
                        </div>
                        <div class='principal__modify__change--item'>
                            <label for='img_principal'>imagen izquierda:</label>
                            <img src='data:image/png;base64,${object.img_left}' alt=''>
                            <input name='img_left' type='file' >
                        </div>
                    </div>
                    <input type='submit' formtarget='_blank' >
                </form>
            </div>
        `//aqui va texto plano html
        showResponse(modificarHtml)
    }
}