//Preguntas y respuestas
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
        opciones: ["Oceano Atlántico", "Oceano Pacífico", "Océano Índico", "Oceano Antártico"],
        respuesta: "Oceano Pacífico"
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
        opciones: ["Euro", "Libra", "Dolar", "Sol"],
        respuesta: "Libra"
    },
    {
        Number: 8,
        pregunta: "¿Cuál es la ciudad de los rascacielos?",
        opciones: ["Sao Paulo", "Dubai", "New York", "Shangai"],
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
        opciones: ["Etiopia", "Brasil", "Vietnam", "Colombia"],
        respuesta: "Etiopia"
    }
];

let preguntaActual = 0;
let puntaje = 0;
let tiempoRestante = 30;
let temporizador = null; 

// inicia el juego cuando da jugar
function jugar() {
    var nombre = document.getElementById('nombre').value;
    if (!nombre) {
        alert('Por favor ingresa tu nombre.');
        return false; // No iniciar el juego si no hay nombre
    }
    document.getElementById('inicio').style.display = 'none'; // Ocultar la página de inicio
    document.getElementById('instrucciones').style.display = 'block'; // Mostrar la página de instrucciones
    return false; // Prevenir el envío del formulario
}

// comenzar el cuestionario cuando se da en continuar
function continuarJuego() {
    document.getElementById('instrucciones').style.display = 'none'; 
    document.querySelector('.quiz_box').style.display = 'block'; 
    comenzarQuiz();
}

// inicio de cuestionario
function comenzarQuiz() {
    mostrarPregunta();
    iniciarTemporizador();
}

// Muestra la pregunta y las opciones
function mostrarPregunta() {
    if (preguntaActual < preguntas.length) {
        const pregunta = preguntas[preguntaActual];

        // Pregunta
        document.getElementById('pregunta').textContent = pregunta.pregunta;

        // Opciones
        const contenedorOpciones = document.getElementById('opciones');
        contenedorOpciones.innerHTML = '';  // Limpiar las opciones anteriores

        pregunta.opciones.forEach(opcion => {
            const boton = document.createElement('button');
            boton.textContent = opcion;
            boton.classList.add('option-btn');
            boton.onclick = () => verificarRespuesta(opcion); 
        });

        // Numero de pregunta
        document.getElementById('total-question').textContent = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
        
        // Habilitar el botón "Siguiente" pero desactivado inicialmente
        document.getElementById('next-button').disabled = true; 
    } else {
        mostrarResultados();  // Si ya no hay preguntas, mostrar los resultados
    }
}

// Inicia el temporizador de 30 segundos para cada pregunta
function iniciarTemporizador() {
    // Si ya existe un temporizador, detenerlo para evitar múltiples temporizadores corriendo al mismo tiempo
    if (temporizador) {
        clearInterval(temporizador);
    }

    tiempoRestante = 30; // Reiniciar el tiempo a 30 segundos
    document.getElementById('timeleft').textContent = tiempoRestante;

    temporizador = setInterval(() => {
        tiempoRestante--;
        document.getElementById('timeleft').textContent = tiempoRestante;

        if (tiempoRestante === 0) {
            clearInterval(temporizador); // Detener el temporizador cuando llegue a 0
            mostrarResultados();
        }
    }, 1000); 
}

// Verifica la respuesta seleccionada y habilita el botón "Siguiente"
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

// Muestra los resultados finales después de completar el quiz
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
    tiempoRestante = 30; 
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
    tiempoRestante = 30; // Reiniciar el tiempo
    document.getElementById('timeleft').textContent = tiempoRestante; // Resetear el tiempo visible
});
// Asignar la acción de "Siguiente"
document.getElementById('next-button').addEventListener('click', siguientePregunta);

// Asignar la acción de "Continuar" en la página de instrucciones
document.querySelector('.continue').addEventListener('click', continuarJuego);
