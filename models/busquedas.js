const axios = require('axios');


class Busquedas {
  
    historial = ['Tegucigalpa','Madrid', 'San jose'];

    constructor () {
        // TODO:leer DB si existe
    }
    
    get paramsMapbox() {
        return {
            access_token: 'pk.eyJ1IjoiaXNtYXNhbGFtZWEiLCJhIjoiY2t6ZDFoOGJqMDI5dTJybzN6b3V1MzhiMyJ9.AG1WxgY_gS8wPpDeHjJqfg',
            limit: 5,
            language: 'es'
         }
    }

    async ciudad (lugar = '') {

    try {
    // peticion http
     const intance = axios.create(
        {
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`, 
            params: this.paramsMapbox
        }
    )
     //console.log(intance);
     //const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/cuenca.json?limit=6&language=es&access_token=pk.eyJ1IjoiaXNtYXNhbGFtZWEiLCJhIjoiY2t6ZDFoOGJqMDI5dTJybzN6b3V1MzhiMyJ9.AG1WxgY_gS8wPpDeHjJqfg');
     console.log(intance.baseURL);
     console.log(intance.params);
     const resp = await intance.get();
        console.log(resp);
        
        console.log('ciudad');
     return []; //retornar los lugares
    }
    catch (error)
    {
        console.log(error);
        return [];
    }
   }
}

module.exports = Busquedas;