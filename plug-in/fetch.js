const fetch = (module, accion, parameters) => {
    return new Promise( (resolve, reject) =>{
        
        const url = "https://serverall.000webhostapp.com/"
        const json = {
            'module': module,
            'accion': accion,
            'parameters': parameters,
        }
        const data = new FormData()
        data.append('json', JSON.stringify(json))
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

export default fetch
