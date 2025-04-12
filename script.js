// === 1. VARIABLES GLOBALES ===
// Historial de navegación y control de pantalla actual
let historial = [];
window.pantallaActual = "pantallaInicial";

// Variables globales para el modo actual
let modoActual = "";
let intervaloGusanos = null;
let intervaloBurbujas = null;

// === 2. FUNCIONES DE NAVEGACIÓN ENTRE PANTALLAS ===
/**
 * Muestra una pantalla específica y oculta las demás.
 * @param {string} id - ID de la pantalla a mostrar.
 */
function mostrar(id) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.add("oculto"));
    document.getElementById(id).classList.remove("oculto");
    window.pantallaActual = id;

    const barra = document.getElementById("barraVolver");
    barra.style.display = id === "pantallaInicial" ? "none" : "flex";

    // Ajustar tamaño de los canvas visibles
    document.querySelectorAll(`#${id} canvas`).forEach(canvas => {
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            ctx.strokeStyle = "black";
            ctx.lineWidth = 5;
        }
    });
}

// Funciones para navegar entre pantallas
function irAMenu() {
    historial.push("pantallaInicial");
    mostrar("menuModos");
}

function irAMenuLetras() {
    historial.push("menuModos");
    mostrar("menuLetras");
}

function irAMenuNumeros() {
    historial.push("menuModos");
    mostrar("menuNumeros");
}

function irAMenuFiguras() {
    historial.push("menuModos");
    mostrar("menuFiguras");
}

function irALetra(letraId) {
    const pantallasDisponibles = {
        "letra-a": "pantallaLetraA",
        "letra-b": "pantallaLetraB",
        "letra-c": "pantallaLetraC",
        "letra-d": "pantallaLetraD",
        "letra-e": "pantallaLetraE",
        "letra-f": "pantallaLetraF",
        "letra-g": "pantallaLetraG",
        "letra-h": "pantallaLetraH",
        "letra-i": "pantallaLetraI",
        "letra-j": "pantallaLetraJ",
        "letra-k": "pantallaLetraK",
        "letra-l": "pantallaLetraL",
        "letra-m": "pantallaLetraM",
        "letra-n": "pantallaLetraN",
        "letra-ñ": "pantallaLetraÑ",
        "letra-o": "pantallaLetraO",
        "letra-p": "pantallaLetraP",
        "letra-q": "pantallaLetraQ",
        "letra-r": "pantallaLetraR",
        "letra-s": "pantallaLetraS",
        "letra-t": "pantallaLetraT",
        "letra-u": "pantallaLetraU",
        "letra-v": "pantallaLetraV",
        "letra-w": "pantallaLetraW",
        "letra-x": "pantallaLetraX",
        "letra-y": "pantallaLetraY",
        "letra-z": "pantallaLetraZ",
    };

    if (pantallasDisponibles[letraId]) {
        historial.push("menuLetras");
        mostrar(pantallasDisponibles[letraId]);
    } else {
        alert("Pantalla aún no disponible.");
    }
}

function irANumero(numeroId) {
    const pantallaNumero = document.getElementById(`pantalla${numeroId.charAt(0).toUpperCase() + numeroId.slice(1)}`);
    if (pantallaNumero) {
        historial.push("menuNumeros");
        mostrar(pantallaNumero.id);
    } else {
        alert("Pantalla del número aún no disponible.");
    }
}

function irAFigura(figuraId) {
    const pantallaFigura = document.getElementById(`pantalla${figuraId}`);
    if (pantallaFigura) {
        historial.push("menuFiguras");
        mostrar(pantallaFigura.id);
    } else {
        alert("Pantalla de la figura aún no disponible.");
    }
}

function volver() {
    if (historial.length > 0) {
        const anterior = historial.pop();
        mostrar(anterior);
    } else {
        mostrar("pantallaInicial"); // Si no hay historial, vuelve a la pantalla inicial
    }
}

// === 3. FUNCIONES DE PANTALLA COMPLETA ===
function activarPantallaCompleta() {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// === 4. DETECCIÓN DE ORIENTACIÓN ===
function detectarOrientacion() {
    const esDispositivoMovil = /Android|iPhone|iPad|iPod|Tablet/i.test(navigator.userAgent);
    const enRetrato = window.innerHeight > window.innerWidth;

    const pantalla = document.getElementById("pantalla");
    const aviso = document.getElementById("avisoOrientacion");
    const barra = document.getElementById("barraVolver");

    if (esDispositivoMovil && enRetrato) {
        pantalla.style.display = "none";
        aviso.style.display = "flex";
        barra.style.display = "none";
    } else {
        pantalla.style.display = "flex";
        aviso.style.display = "none";
        barra.style.display = window.pantallaActual !== "pantallaInicial" ? "flex" : "none";
    }
}

window.addEventListener("load", detectarOrientacion);
window.addEventListener("resize", detectarOrientacion);
window.addEventListener("orientationchange", detectarOrientacion);

// === 5. FUNCIONES PARA CANVAS ===
document.addEventListener("DOMContentLoaded", () => {
    const canvases = document.querySelectorAll(".canvas-trazos");

    canvases.forEach(canvas => {
        const ctx = canvas.getContext("2d");

        function ajustarCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            ctx.strokeStyle = "black";
            ctx.lineWidth = 5;
        }

        ajustarCanvas();
        window.addEventListener("resize", ajustarCanvas);

        let dibujando = false;

        canvas.addEventListener("mousedown", (e) => {
            dibujando = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        });

        canvas.addEventListener("mousemove", (e) => {
            if (dibujando) {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
        });

        canvas.addEventListener("mouseup", () => {
            dibujando = false;
            ctx.closePath();
        });

        canvas.addEventListener("mouseleave", () => {
            dibujando = false;
            ctx.closePath();
        });

        canvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
            dibujando = true;
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
        });

        canvas.addEventListener("touchmove", (e) => {
            e.preventDefault();
            if (dibujando) {
                const touch = e.touches[0];
                const rect = canvas.getBoundingClientRect();
                ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
                ctx.stroke();
            }
        });

        canvas.addEventListener("touchend", () => {
            dibujando = false;
            ctx.closePath();
        });

        canvas.addEventListener("touchcancel", () => {
            dibujando = false;
            ctx.closePath();
        });

        canvas.limpiarCanvas = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    });

    window.limpiarCanvas = function (canvasId) {
        const canvas = document.getElementById(canvasId);
        if (canvas && canvas.getContext) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    window.cambiarGrosorTrazo = function (grosor) {
        canvases.forEach(canvas => {
            const ctx = canvas.getContext("2d");
            ctx.lineWidth = grosor;
        });
    };
});

// Cambiar al modo seleccionado
function cambiarModo(modo) {
    // if (modoActual !== modo) {
    //     historial.push(window.pantallaActual); // Agregar la pantalla actual al historial
    // }
    modoActual = modo;
    // limpiarPantalla();

    // Limpieza de intervalos y eventos previos
    if (intervaloGusanos) clearInterval(intervaloGusanos);
    if (intervaloBurbujas) clearInterval(intervaloBurbujas);

    const menuModos = document.getElementById("menuModos");
    // menuModos.replaceWith(menuModos.cloneNode(true)); // Eliminar eventos previos

    // Cambiar el fondo según el modo seleccionado
    cambiarFondo(modo);

    // Asignar lógica específica para cada modo
    if (modo === "Cielo") {
        menuModos.addEventListener("click", generarFuegoArtificial);
    } else if (modo === "Tierra") {
        intervaloGusanos = setInterval(() => {
            if (modoActual !== "Tierra") {
                clearInterval(intervaloGusanos);
            } else {
                generarGusano();
            }
        }, 2000);
    } else if (modo === "Mar") {
        intervaloBurbujas = setInterval(() => {
            if (modoActual !== "Mar") {
                clearInterval(intervaloBurbujas);
            } else {
                generarBurbuja();
            }
        }, 1000);
    }

    mostrar(`pantalla${modo}`); // Mostrar la pantalla del modo seleccionado
}

// Función para cambiar el fondo según el modo
function cambiarFondo(modo) {
    const pantalla = document.getElementById("menuModos");
    if (modo === "Cielo") {
        pantalla.style.backgroundImage = "url('Fondos/Cielo.svg')";
    } else if (modo === "Tierra") {
        pantalla.style.backgroundImage = "url('Fondos/Tierra.svg')";
    } else if (modo === "Mar") {
        pantalla.style.backgroundImage = "url('Fondos/Mar.svg')";
    }
}

// Función para limpiar la pantalla
function limpiarPantalla() {
    const menuModos = document.getElementById("menuModos");
    menuModos.innerHTML = "";
}

// Función para generar fuegos artificiales
function generarFuegoArtificial(event) {
    if (modoActual !== "Cielo") return;

    const fuego = document.createElement("div");
    fuego.className = "fuego-artificial";
    fuego.style.left = `${event.clientX}px`;
    fuego.style.top = `${event.clientY}px`;
    document.getElementById("menuModos").appendChild(fuego);

    setTimeout(() => fuego.remove(), 1000);
}

// Función para generar gusanos
function generarGusano() {
    if (modoActual !== "Tierra") return;

    const gusano = document.createElement("div");
    gusano.className = "gusano";
    gusano.style.left = `${Math.random() * 80 + 10}%`;
    gusano.style.top = `${Math.random() * 80 + 10}%`;
    document.getElementById("menuModos").appendChild(gusano);

    gusano.addEventListener("click", () => {
        gusano.classList.add("mareado");
        setTimeout(() => gusano.remove(), 1000);
    });

    setTimeout(() => gusano.remove(), 5000);
}

// Función para generar burbujas
function generarBurbuja() {
    if (modoActual !== "Mar") return;

    const burbuja = document.createElement("div");
    burbuja.className = "burbuja";
    burbuja.style.left = `${Math.random() * 90 + 5}%`;
    burbuja.style.bottom = `0%`;
    document.getElementById("menuModos").appendChild(burbuja);

    burbuja.addEventListener("click", () => {
        burbuja.classList.add("reventada");
        setTimeout(() => burbuja.remove(), 500);
    });

    setTimeout(() => burbuja.remove(), 5000);
}

// Asignar eventos a los botones de los modos
document.querySelector("[aria-label='Cielo']").addEventListener("click", () => cambiarModo("Cielo"));
document.querySelector("[aria-label='Tierra']").addEventListener("click", () => cambiarModo("Tierra"));
document.querySelector("[aria-label='Mar']").addEventListener("click", () => cambiarModo("Mar"));
