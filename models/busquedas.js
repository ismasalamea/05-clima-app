const fs = require('fs');

const axios = require('axios');


class Busquedas {
  
    historial = ['Tegucigalpa','Madrid', 'San jose'];
    dbPath = './db/database.json';

    constructor () {
        // TODO:leer DB si existe
    }

    get historialCapitalizado(){
        return this.historial;
    }
    
    get paramsMapbox() {
       return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {

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
        return resp.data.features.map ( lugar => ({  //retornar los lugares
            id:lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1],
        }));        
        
    }
    catch (error)
    {
        console.log(error);
        return [];
    }
   }

   async climaLugar (lat, long){
        try{
            //instance de axios
            //console.log(lat); pasa el lat
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { 
                    'lat': lat,
                    'lon': long,
                    'appid': process.env.OPENWEATHER_KEY,
                    'units': 'metric',
                    'lang': 'es'                
                }
            });
        
            
            const resp = await instance.get();
         //   console.log(resp.data);

            const { weather, main } = resp.data;
            return { 
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        }catch (error){
            console.log(error);
        }
            

   }

agregarhistorial( lugar = '') {
    //tod:PREVENIR DUPLICADOS
    //gRABAR
    this.historial.unshift(lugar);

    if (this.historial.includes(lugar.toLocaleLowerCase())){
        return
    }
    this.grabarDB();
}
    //grabar en DB

grabarDB()
{

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
}

leerDB(){

    //verificar que existe

    //const info ... readFyleSync  path [encondig: utf-8]

  //  const data = JSON.parse(info);
  //  this.historial = .. historial

}

}

module.exports = Busquedas;