const axios = require('axios');


class Busquedas {
  
    historial = ['Tegucigalpa','Madrid', 'San jose'];

    constructor () {
        // TODO:leer DB si existe
    }
    
    async ciudad (lugar = '') {
    // peticion http
        console.log('ciudad',lugar);
        return []; //retornar los lugares
   }
}

module.exports = Busquedas;