// Preguntas y respuestas
const preguntas = [
    {
        Number: 1,
        pregunta: "¿Dónde originaron los juegos olímpicos?",
        opciones: ["Grecia", "Francia", "China", "Estados Unidos"],
        respuesta: "Grecia"
    },
    {
        Number: 2,
        pregunta: "¿Cuál es el deporte más popular en el mundo?",
        opciones: ["Fútbol", "Baloncesto", "Beisbol", "Tenis"],
        respuesta: "Fútbol"
    },
    {
        Number: 3,
        pregunta: "¿Cuál es el océano más grande?",
        opciones: ["Océano Atlántico", "Océano Pacífico", "Océano Índico", "Océano Antártico"],
        respuesta: "Océano Pacífico"
    },
    {
        Number: 4,
        pregunta: "¿En qué se especializa la cartografía?",
        opciones: ["Estudia los planetas", "Estudia las rocas", "Estudia las cartas", "Estudia los mapas"],
        respuesta: "Estudia los mapas"
    },
    {
        Number: 5,
        pregunta: "¿En qué año comenzó la II Guerra Mundial?",
        opciones: ["1089", "1939", "1036", "1942"],
        respuesta: "1939"
    },
    {
        Number: 6,
        pregunta: "¿Qué país tiene forma de bota?",
        opciones: ["Noruega", "Roma", "España", "Italia"],
        respuesta: "Italia"
    },
    {
        Number: 7,
        pregunta: "¿Cuál es la moneda del Reino Unido?",
        opciones: ["Euro", "Libra", "Dólar", "Sol"],
        respuesta: "Libra"
    },
    {
        Number: 8,
        pregunta: "¿Cuál es la ciudad de los rascacielos?",
        opciones: ["Sao Paulo", "Dubai", "New York", "Shanghai"],
        respuesta: "New York"
    },
    {
        Number: 9,
        pregunta: "¿En qué país se encuentra el famoso monumento Taj Mahal?",
        opciones: ["Tailandia", "Singapur", "India", "China"],
        respuesta: "India"
    },
    {
        Number: 10,
        pregunta: "¿De qué país es originario el café?",
        opciones: ["Etiopía", "Brasil", "Vietnam", "Colombia"],
        respuesta: "Etiopía"
    }
];

let preguntaActual = 0;
let puntaje = 0;
let tiempoRestante = 15;
let temporizador = null;

// Función para iniciar el juego cuando el usuario presiona "Jugar"
function jugar() {
    const nombre = document.getElementById('nombre').value;
    if (!nombre) {
        alert('Por favor ingresa tu nombre.');
        return false; // No iniciar el juego si no hay nombre
    }
    document.getElementById('inicio').style.display = 'none'; // Ocultar la página de inicio
    document.getElementById('instrucciones').style.display = 'block'; // Mostrar la página de instrucciones
    return false; // Prevenir el envío del formulario
}

// Función para continuar el juego después de las instrucciones
function continuarJuego() {
    document.getElementById('instrucciones').style.display = 'none';
    document.querySelector('.quiz_box').style.display = 'block';
    comenzarQuiz();
}

// Función para comenzar el cuestionario
function comenzarQuiz() {
    mostrarPregunta();
    iniciarTemporizador();
}

// Función para mostrar la pregunta y las opciones
function mostrarPregunta() {
    if (preguntaActual < preguntas.length) {
        const pregunta = preguntas[preguntaActual];

        // Mostrar la pregunta
        document.getElementById('pregunta').textContent = pregunta.pregunta;

        // Obtener el contenedor de opciones
        const contenedorOpciones = document.getElementById('opciones');
        contenedorOpciones.innerHTML = '';  // Limpiar las opciones anteriores

        // Crear los botones para las opciones
        pregunta.opciones.forEach(opcion => {
            const boton = document.createElement('button');
            boton.textContent = opcion;
            boton.classList.add('option-btn');
            boton.onclick = () => verificarRespuesta(opcion);
            contenedorOpciones.appendChild(boton);  // Añadir el botón al contenedor
        });

        // Mostrar el número de la pregunta
        document.getElementById('total-question').textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

        // Deshabilitar el botón "Siguiente" hasta que se elija una respuesta
        document.getElementById('next-button').disabled = true;
    } else {
        mostrarResultados();  // Si ya no hay preguntas, mostrar los resultados
    }
}

// Función para iniciar el temporizador
function iniciarTemporizador() {
    // Si ya existe un temporizador, detenerlo para evitar múltiples temporizadores corriendo al mismo tiempo
    if (temporizador) {
        clearInterval(temporizador);
    }

    tiempoRestante = 15; // Reiniciar el tiempo a 15 segundos
    document.getElementById('timeleft').textContent = tiempoRestante;

    temporizador = setInterval(() => {
        tiempoRestante--;
        document.getElementById('timeleft').textContent = tiempoRestante;

        if (tiempoRestante === 0) {
            clearInterval(temporizador); // Detener el temporizador cuando llegue a 0
            mostrarResultados(); // Mostrar resultados cuando se acabe el tiempo
        }
    }, 1000);
}

// Función para verificar la respuesta seleccionada
function verificarRespuesta(respuestaSeleccionada) {
    const respuestaCorrecta = preguntas[preguntaActual].respuesta;
    const botones = document.getElementsByClassName('option-btn');
    Array.from(botones).forEach(boton => boton.disabled = true); // Deshabilitar opciones

    if (respuestaSeleccionada === respuestaCorrecta) {
        puntaje += 100; 
        botones[Array.from(botones).indexOf(event.target)].classList.add('correcto');
    } else {
        botones[Array.from(botones).indexOf(event.target)].classList.add('incorrecto');
    }

    // Habilitar el botón de "Siguiente" solo después de seleccionar una respuesta
    document.getElementById('next-button').disabled = false;
}

// Función para ir a la siguiente pregunta
function siguientePregunta() {
    // Detener el temporizador anterior
    clearInterval(temporizador);

    preguntaActual++;  // Avanzar a la siguiente pregunta

    if (preguntaActual < preguntas.length) {
        // Mostrar la siguiente pregunta
        mostrarPregunta();  

        // Reiniciar el temporizador
        iniciarTemporizador();  

        // Deshabilitar el botón "Siguiente" nuevamente
        document.getElementById('next-button').disabled = true;  
    } else {
        // Si ya no hay más preguntas, mostrar los resultados
        mostrarResultados();
    }
}

// Función para mostrar los resultados finales después de completar el quiz
function mostrarResultados() {
    clearInterval(temporizador);
    document.querySelector('.quiz_box').style.display = 'none'; // Ocultar la pantalla de preguntas
    document.querySelector('.results_box').style.display = 'block'; // Mostrar la caja de resultados
    document.querySelector('.score').textContent = puntaje;
    document.querySelector('.total_score').textContent = preguntas.length * 100;
}

// Función para reiniciar el juego
document.querySelector('.restart').addEventListener('click', () => {
    puntaje = 0;
    preguntaActual = 0;
    tiempoRestante = 15; 
    document.querySelector('.results_box').style.display = 'none'; // Ocultar resultados
    document.querySelector('.quiz_box').style.display = 'block'; // Mostrar la caja de preguntas
    comenzarQuiz();
});

// Función para mostrar la pantalla de inicio cuando el usuario presiona "Salir"
document.querySelector('.quit2').addEventListener('click', () => {
    document.getElementById('inicio').style.display = 'block'; // Mostrar la página de inicio
    document.querySelector('.results_box').style.display = 'none'; // Ocultar la caja de resultados
    document.querySelector('.quiz_box').style.display = 'none'; // Ocultar la caja del cuestionario
    clearInterval(temporizador); // Detener el temporizador si se ha iniciado
    preguntaActual = 0; // Reiniciar la pregunta actual
    puntaje = 0; // Reiniciar el puntaje
    tiempoRestante = 15; // Reiniciar el tiempo
    document.getElementById('timeleft').textContent = tiempoRestante; // Resetear el tiempo visible
});

// Asignar la acción de "Siguiente"
document.getElementById('next-button').addEventListener('click', siguientePregunta);

// Asignar la acción de "Continuar" en la página de instrucciones
document.querySelector('.continue').addEventListener('click', continuarJuego);
