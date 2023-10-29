//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        
        crearHTML();
    })
}

//Funciones
function agregarTweet (e) {
    e.preventDefault();

    //textarea donde el usuario escribe el tweet
    const tweet = document.querySelector('#tweet').value;

    //validacion...
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio.');
        return;
    }
    //AÑADIR AL ARREGLO DE TWEETS, creamos una variable como objeto para poder añadirle un id a cada tweet
    const tweetObj = {
        id: Date.now(),
        texto: tweet  //tweet: tweet
    };
    tweets = [...tweets, tweetObj];

    //luego de agregado el tweet al array de tweets , creamos el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
};

//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertamos en el html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta en 3 segundos
    setTimeout( ()=> {
        mensajeError.remove();
    }, 3000) ;
}

//Muestra un listado de los tweets
function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0 ) {
        tweets.forEach( tweet => {

            //crear boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir las funciones del boton eliminar

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            //Crear el HTML

            const li = document.createElement('li');

            //Añadir el texto y boton de Eliminar
            li.innerText = tweet.texto;
            li.appendChild(btnEliminar);

            //Agregando en el HTML
            listaTweets.appendChild(li);

        } )
    }

    sincronizarStorage();
};
//Agrega los tweet actuales al localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
};

//Eliminar Tweet 
function borrarTweet (id) {
    tweets = tweets.filter( tweet => tweet.id != id);

    crearHTML();
}


//Limpiar HTML
function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
        }
};