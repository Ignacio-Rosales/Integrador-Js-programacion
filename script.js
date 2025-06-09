// Variables globales
let preguntas = []
let preguntaActual = 0
let puntaje = 0

// referencias a los elementos del DOM
const contenedorPregunta = document.getElementById('pregunta')
const contenedorOpciones = document.getElementById('opciones')
const botonSiguiente = document.getElementById('siguiente')
const resultado = document.getElementById('resultado')
const puntajeFinal = document.getElementById('puntaje')
const quizContainer = document.getElementById('quiz-container')

// Funcion asincrónica que carga las preguntas desde el archivo JSON y muestra la primera pregunta
async function cargarPreguntas() {
    try {
        // Realiza una petición para obtener el archivo preguntas.json
        const respuesta = await fetch('preguntas.json')
        // Convierte la respuesta a formato JSON y la guarda en el array preguntas
        preguntas = await respuesta.json()
        // Muestra la primera pregunta en pantalla
        mostrarPregunta()
    } catch (error) {
        // Si ocurre un error, muestra un mensaje en pantalla y lo registra en consola
        contenedorPregunta.textContent = 'Error cargando las preguntas'
        console.log(error)
    }
}

// Muestra la pregunta actual y sus opciones en el DOM
function mostrarPregunta() {
    // Obtiene la pregunta actual del array
    const actual = preguntas[preguntaActual]
    // Muestra el texto de la pregunta
    contenedorPregunta.textContent = actual.pregunta
    // Limpia las opciones anteriores
    contenedorOpciones.innerHTML = ''

    // Crea y muestra cada opción como un elemento de lista
    for (const opcion of actual.opciones) {
        const li = document.createElement('li')
        li.textContent = opcion
        li.classList.add('opcion')
        // Asigna el evento de selección a cada opción
        li.onclick = () => seleccionarRespuesta(opcion)
        contenedorOpciones.appendChild(li)
    }

    botonSiguiente.style.display = 'none'
}

// Maneja la selección de una respuesta, marca la opción correcta e incorrecta y actualiza el puntaje
function seleccionarRespuesta(seleccionada) {
    const correcta = preguntas[preguntaActual].respuesta
    const opciones = document.querySelectorAll('.opcion')

    // Desactiva los clics y marca las opciones correctas/incorrectas
    opciones.forEach((opcion) => {
        opcion.onclick = null
        if (opcion.textContent === correcta) {
            opcion.style.backgroundColor = '#c8e6c9'
        } else if (opcion.textContent === seleccionada) {
            opcion.style.backgroundColor = '#ffcdd2'
        }
    })

    if (seleccionada === correcta ){
        puntaje++
    }

    botonSiguiente.style.display = 'block'
}

// Avanza a la siguiente pregunta o muestra el resultado final si se terminaron las preguntas
botonSiguiente.onclick = () => {
    // Incrementa el índice de la pregunta actual
    preguntaActual++
    if(preguntaActual < preguntas.length) {
        mostrarPregunta()
    } else {
        mostrarResultado()
    }
}

// Muestra el resultado final del quiz y el puntaje obtenido
function mostrarResultado() {
    quizContainer.classList.add('oculto')
    resultado.classList.remove('oculto')
    puntajeFinal.textContent =  `Obtuviste ${puntaje} de ${preguntas.length} respuestas correctas.`
}

// Reinicia el juego para volver a empezar el quiz desde la primera pregunta
function reiniciarJuego() {
    preguntaActual = 0
    puntaje = 0
    quizContainer.classList.remove('oculto')
    resultado.classList.add('oculto')
    // Muestra la primera pregunta nuevamente
    mostrarPregunta()
}

// Inicia la carga de preguntas al cargar la página
cargarPreguntas()