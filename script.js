let pregutnas = []
let preguntaActual = 0
let puntaje = 0

const contenedorPregunta = document.getElementById('pregunta')
const contenedorOpciones = document.getElementById('opciones')
const botonSiguiente = document.getElementById('siguiente')
const resultado = document.getElementById('resultado')
const puntajeFinal = document.getElementById('puntaje')
const quizContainer = document.getElementById('quiz-container')

async function cargarPreguntas() {
    try {
        const respuesta = await fetch('preguntas.json')
        preguntas = await respuesta.json()
        mostrarPregunta()
    } catch (error) {
        contenedorPregunta.textContent = 'Error cargando las preguntas'
        console.log(error)
    }
}

function mostrarPregunta() {
    const actual = preguntas[preguntaActual]
    contenedorPregunta.textContent = actual.pregunta
    contenedorOpciones.innerHTML = ''

    for (const opcion of actual.opciones) {
        const li = document.createElement('li')
        li.textContent = opcion
        li.classList.add('opcion')
        li.onclick = () => seleccionarRespuesta(opcion)
        contenedorOpciones.appendChild(li)
    }

    botonSiguiente.style.display = 'none'
}

function seleccionarRespuesta(seleccionada) {
    const correcta = preguntas[preguntaActual].respuesta
    const opciones = document.querySelectorAll('.opcion')

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

botonSiguiente.onclick = () => {
    preguntaActual++
    if(preguntaActual < preguntas.length) {
        mostrarPregunta()
    } else {
        mostrarResultado()
    }
}

function mostrarResultado() {
    quizContainer.classList.add('oculto')
    resultado.classList.remove('oculto')
    puntajeFinal.textContent =  `Obtuviste ${puntaje} de ${preguntas.length} respuestas correctas.`
}

function reiniciarJuego() {
    preguntaActual = 0
    puntaje = 0
    quizContainer.classList.remove('oculto')
    resultado.classList.add('oculto')
    mostrarPregunta()
}

cargarPreguntas()