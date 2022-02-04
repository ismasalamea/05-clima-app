const { leerInput } = require("./helpers/inquirer");

//console.log ('Hola Mundo');

const main = async() => {

    const texto = await leerInput('Hola: ');
    console.log(texto);
}

main();