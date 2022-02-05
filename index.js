const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas.js");

//console.log ('Hola Mundo');



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
                const lugar = await leerInput('Ciudad:');
              //  console.log(lugar);
                //buscar la ciudad
                await busquedas.ciudad(lugar);


                //Seleccionar el lugar
                console.log('\nInformacion de la ciudad\n'.green)
                console.log('Ciudad:',lugar);
                console.log('Lat:',);
                console.log('Long:', );
                console.log('Temp:', );
                console.log('Minima:', );
                console.log('Maxima:', );

            break;
            case 2:
                console.log(opt);
            break;
            case 0:
                console.log(opt);
            break;
        }
        if ( opt != 0 ) await pausa();
    } while ( opt != 0 )
}

main();