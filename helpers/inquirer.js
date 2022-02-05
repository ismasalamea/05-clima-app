const inquirer = require('inquirer');
//const { validate } = require('uuid');
require('colors');

const preguntas = [
    {
        type:'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ]
    }
];
 

const inquirerMenu = async() => {
    console.clear();
    console.log('==========================='.green)
    console.log('===Seleccione una opción=='.white)
    console.log('=========================='.white)
    const {opcion} = await inquirer.prompt(preguntas);
 //   console.log({opcion});  muestro la opcion digitada
    return opcion;
};

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione la tecla ${ 'ENTER'.green } para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt (question);
}

const leerInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
        }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = [] ) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${ i + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${ tarea.desc }`
        }
    });
    //agregar previamente un valor de 0 al choices
    choices.unshift({
        value: '0',
        name: '0. Cancelar'
    });

    const preguntas = {
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }
    
    const { id } = await  inquirer.prompt(preguntas);
    return id;

}

const confirmar = async (message) => {
    const question = {
        type: 'confirm',
        name: 'ok',
        message
    
    }
    const { ok } = await inquirer.prompt(question);
    return ok;
}


const mostrarListadoChecklist = async(tareas = [] ) => {

    const choices = tareas.map((tarea, i) => {
       
        const idx = `${ i + 1 }.`.green;
       
        return {
       
            value: tarea.id,
            name: `${idx} ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
       
        }
    
    });

    const preguntas = {
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }
    
        const { ids } = await  inquirer.prompt(preguntas);
        return ids;

}
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}