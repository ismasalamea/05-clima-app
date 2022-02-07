const axios = require('axios');


class Busquedas {
  
    historial = ['Tegucigalpa','Madrid', 'San jose'];

    constructor () {
        // TODO:leer DB si existe
    }
    
    get paramsMapbox() {
       return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad (lugar = '') {

    try {
    // peticion http
    const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
        params: this.paramsMapbox

    });

 //       console.log(instance);
      //const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/cuenca.json?limit=6&language=es&access_token=pk.eyJ1IjoiaXNtYXNhbGFtZWEiLCJhIjoiY2t6ZDFoOGJqMDI5dTJybzN6b3V1MzhiMyJ9.AG1WxgY_gS8wPpDeHjJqfg');
        const resp = await instance.get();
        console.log(resp.data);        
        return []  //retornar los lugares
    }
    catch (error)
    {
        console.log(error);
        return [];
    }
   }
}

module.exports = Busquedas;