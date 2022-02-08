require ('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas.js");


//console.log ('Hola Mundo');

//console.log(process.env)

const main = async() => 
{
    const busquedas = new Busquedas();
    let opt = 0;
    
    do
    {
        opt = await inquirerMenu();

        switch (opt){
            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad:');
        
                //buscar los luagres
                const lugares = await busquedas.ciudad (termino);
                
                //Seleccionar lugar
                const id = await listarLugares(lugares);
                if(id==='0')continue;
                const lugarSel = lugares.find(l => l.id === id);
            //    console.log (lugarSel);
                
                busquedas.agregarhistorial( lugarSel.nombre );
                //obtener datos del clima

                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                
                //Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green)
                console.log('Ciudad:',lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Long:',lugarSel.lng );
                console.log('Temp:', clima.temp );
                console.log('Minima:',clima.min );
                console.log('Maxima:', clima.max );
                console.log('Como esta el clima:', clima.desc.green );                

            break;
            case 2:
                
                busquedas.historial.forEach((lugar,i) => {
                    const idx = `${i + 1 }`.green;
                    console.log(`${idx} ${lugar}` );
                });
            break;
            case 0:
                console.log(opt);
            break;
        }
        if ( opt != 0 ) await pausa();
    } while ( opt != 0 )
}



main();