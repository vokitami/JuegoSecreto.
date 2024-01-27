/* funcion */
/*Declaracion de la funcion*/

let numeroSecreto = 0;
let contador = 0;
let numeroMaximoIntentos = 5;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    /*importacion de etiquetas de html */
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value); 

    if(numeroUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el numero secreto! en ${contador} ${(contador === 1) ? 'intento' : 'intentos'} `);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(numeroUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El numero secreto es menor')
        }else{
            asignarTextoElemento('p', 'El numero secreto es mayor')
        }

        contador ++;
        limpiarCaja();

        if(contador > numeroMaximoIntentos){
            asignarTextoElemento('p', `Has alcansado el numero maximo de intentos.`)
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
    }
    return;
}

/*Limpiar caja*/ 
function limpiarCaja(){
    document.querySelector('#valorUsuario').value = ''; 
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //si ya se sortearon todos los numeros 
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sorteron todos los numeros posibles');
    }else{
            //si el numero generado esta incluido en la lista
        if(listaNumerosSorteados.includes(numeroGenerado)){
            //recursividad = cuando la funcion se llama a si misma
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    
    //si el numero generado esta incluido en la lista
    if(listaNumerosSorteados.includes(numeroGenerado)){
        //recursividad = cuando la funcion se llama a si misma
        return generarNumeroSecreto();
    }else{
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    } 
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto!' );
    asignarTextoElemento('p', `Elige un numero del 1 al ${numeroMaximo}...\n tienes ${numeroMaximoIntentos} intentos` );
    //generar el numero aleatorio 
    numeroSecreto = generarNumeroSecreto();
    //inicializar el numero de intentos
    contador = 1;
}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja(); 
    //indicar mensaje de intervalo
    condicionesIniciales();
    //desabilitar el boton 'nuevo juego'
    document.querySelector('#reiniciar').setAttribute('disabled','true');    
}

condicionesIniciales();
