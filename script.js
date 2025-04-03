// === HISTORIAL DE NAVEGACIÓN ===
// Guarda el recorrido del usuario para poder volver atrás
let historial = [];

// === CONTROL DE PANTALLA ACTUAL ===
// Esto nos permite saber en qué pantalla estamos en todo momento
window.pantallaActual = "pantallaInicial";

// === FUNCIÓN PARA MOSTRAR UNA PANTALLA Y OCULTAR LAS DEMÁS ===
function mostrar(id) {
    // Ocultar todas las pantallas
    document.querySelectorAll(".pantalla").forEach(p => p.classList.add("oculto"));

    // Mostrar la pantalla solicitada
    document.getElementById(id).classList.remove("oculto");

    // Actualiza el identificador global de la pantalla actual
    window.pantallaActual = id;

    // Controla visibilidad del botón "← Volver"
    const barra = document.getElementById("barraVolver");
    if (id === "pantallaInicial") {
        barra.style.display = "none"; // Ocultar en pantalla de inicio
    } else {
        barra.style.display = "flex"; // Mostrar en todas las demás
    }
}

// === FUNCIONES PARA NAVEGAR ENTRE PANTALLAS ===

// Desde la pantalla inicial al menú de modos
function irAMenu() {
    historial.push("pantallaInicial");
    mostrar("menuModos");
}

// Desde el menú de modos al menú de letras
function irAMenuLetras() {
    historial.push("menuModos");
    mostrar("menuLetras");
}

// Ir a una letra específica (por ahora solo la letra A funciona)
function irALetra(letraId) {
    if (letraId === "letra-a") {
        historial.push("menuLetras");
        mostrar("pantallaLetraA");
    } else {
        alert("Pantalla aún no disponible.");
    }
}

// === FUNCIÓN PARA VOLVER A LA PANTALLA ANTERIOR ===
function volver() {
    const anterior = historial.pop(); // Recupera la última pantalla
    if (anterior) {
        mostrar(anterior);
    }
}

function activarPantallaCompleta() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }

    // Forzar redibujo del layout tras breve retraso
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 500);
}

// Detectar entrada o salida de pantalla completa
document.addEventListener("fullscreenchange", () => {
    const boton = document.querySelector(".boton-fullscreen");
    if (document.fullscreenElement) {
        // Si estamos en pantalla completa → ocultar botón
        boton.style.display = "none";
    } else {
        // Si salimos de pantalla completa → volver a mostrar
        if (window.pantallaActual === "pantallaInicial") {
            boton.style.display = "block";
        }
    }
});

//! === FUNCIÓN PARA INICIAR LA ANIMACIÓN DE LA LETRA A ===
// function iniciarAnimacionLetraA() {
    // const letra = document.getElementById("letraA");
    // letra.classList.add("animarLetra");
// }

//! === FUNCIÓN PARA INICIAR LA ANIMACIÓN DE LA LETRA ===
// function iniciarAnimacionLetra() {
//     const letra = document.getElementById("letraA");
//     letra.classList.add("animarLetra");
// }

// === DETECCIÓN DE ORIENTACIÓN (vertical u horizontal) ===
function detectarOrientacion() {
    const esDispositivoMovil = /Android|iPhone|iPad|iPod|Tablet/i.test(navigator.userAgent);
    const enRetrato = window.innerHeight > window.innerWidth;

    const pantalla = document.getElementById("pantalla");
    const aviso = document.getElementById("avisoOrientacion");
    const barra = document.getElementById("barraVolver");

    if (esDispositivoMovil && enRetrato) {
        // Si es móvil y está en modo vertical, muestra aviso y oculta interfaz
        pantalla.style.display = "none";
        aviso.style.display = "flex";
        barra.style.display = "none";
    } else {
        // Si es horizontal o está en PC
        pantalla.style.display = "flex";
        aviso.style.display = "none";

        // Mostrar botón volver solo si no estamos en la pantalla inicial
        if (window.pantallaActual !== "pantallaInicial") {
            barra.style.display = "flex";
        } else {
            barra.style.display = "none";
        }
    }
}

// === EVENTOS PARA MONITOREAR CAMBIOS DE TAMAÑO U ORIENTACIÓN ===
window.addEventListener("load", detectarOrientacion);
window.addEventListener("resize", detectarOrientacion);
window.addEventListener("orientationchange", detectarOrientacion);
