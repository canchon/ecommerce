const fetchElementByFeature = (feature, searchParameter) => {
    
    return new Promise( (resolve, reject) =>{
        
        const url = "http://localhost/Aprendiendo%20A%20Crear%20API/propio/search.php"
        const data = new FormData()
        data.append('feature', `${feature}`)
        data.append('searchParameter', `${searchParameter}`)
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

export default fetchElementByFeature