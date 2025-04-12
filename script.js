// === 1. VARIABLES GLOBALES ===
// Historial de navegación y control de pantalla actual
let historial = [];
window.pantallaActual = "pantallaInicial"; // Pantalla inicial

// === 2. FUNCIONES DE NAVEGACIÓN ENTRE PANTALLAS ===
/**
 * Muestra una pantalla específica y oculta las demás.
 * @param {string} id - ID de la pantalla a mostrar.
 */
function mostrar(id) {
    // Ocultar todas las pantallas
    document.querySelectorAll(".pantalla").forEach(p => p.classList.add("oculto"));
    // Mostrar la pantalla seleccionada
    const pantalla = document.getElementById(id);
    pantalla.classList.remove("oculto");
    // Actualizar la pantalla actual
    window.pantallaActual = id;

    // Mostrar u ocultar la barra de volver según la pantalla actual
    const barra = document.getElementById("barraVolver");
    barra.style.display = id === "pantallaInicial" ? "none" : "flex";

    // Ajustar el tamaño de los canvas visibles
    pantalla.querySelectorAll("canvas").forEach(canvas => {
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

function irAPantalla(idPantalla) {
    historial.push(window.pantallaActual); // Agregar la pantalla actual al historial
    document.querySelectorAll('.pantalla').forEach(pantalla => {
        pantalla.classList.add('oculto');
    });
    document.getElementById(idPantalla).classList.remove('oculto');
    window.pantallaActual = idPantalla; // Actualizar la pantalla actual
}

function volver() {
    const pantallaAnterior = historial.pop(); // Obtener la pantalla anterior del historial
    if (pantallaAnterior) {
        mostrar(pantallaAnterior); // Mostrar la pantalla anterior
    } else {
        mostrar('pantallaInicial'); // Si no hay historial, volver a la pantalla inicial
    }

    // Limpiar burbujas si se está saliendo de la pantalla "Mar"
    if (window.pantallaActual === "pantallaMar") {
        const contenedorBurbujas = document.getElementById("contenedorBurbujas");
        contenedorBurbujas.innerHTML = ""; // Eliminar todas las burbujas
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

// === 6. Genera burbujas aleatorias en la pantalla "Mar". ===
function generarBurbujas() {
    const contenedor = document.getElementById("contenedorBurbujas");
    let burbujasActivas = 0;
    const maxBurbujas = 10;

    function crearBurbuja() {
        if (burbujasActivas >= maxBurbujas) return;

        const burbuja = document.createElement("div");
        burbuja.className = "burbuja";
        burbuja.style.left = `${Math.random() * 100}%`; // Posición horizontal aleatoria
        burbuja.style.animationDuration = `${6 + Math.random() * 2}s`; // Duración aleatoria entre 6 y 8 segundos
        burbuja.style.width = burbuja.style.height = "100px"; // Tamaño fijo de 100px

        burbuja.addEventListener("animationend", () => {
            if (!burbuja.classList.contains("burbuja-reventada")) {
                burbuja.remove();
                burbujasActivas--;
                crearBurbuja(); // Crear una nueva burbuja al desaparecer
            }
        });

        burbuja.addEventListener("click", () => {
            burbuja.classList.add("burbuja-reventada");
            burbuja.style.animationDuration = "0.05s"; // Animación de reventado más rápida
            burbuja.addEventListener("animationend", () => {
                burbuja.remove();
                burbujasActivas--;
                crearBurbuja(); // Crear una nueva burbuja al reventar
            });
        });

        contenedor.appendChild(burbuja);
        burbujasActivas++;
    }

    // Crear burbujas iniciales
    const intervaloBurbujas = setInterval(() => {
        if (burbujasActivas < maxBurbujas) {
            crearBurbuja();
        }
    }, 1000);

    // Detener las burbujas después de 10 segundos (opcional)
    setTimeout(() => {
        clearInterval(intervaloBurbujas);
    }, 10000);
}

/**
 * Inicia la generación de burbujas al presionar el botón.
 */
function iniciarBurbujas() {
    const botonIniciar = document.getElementById("botonBurbujas");
    botonIniciar.style.display = "none"; // Ocultar el botón al iniciar
    generarBurbujas();
}

// Iniciar las burbujas al mostrar la pantalla "Mar"
document.addEventListener("DOMContentLoaded", () => {
    const pantallaMar = document.getElementById("pantallaMar");
    pantallaMar.addEventListener("transitionend", () => {
        if (!pantallaMar.classList.contains("oculto")) {
            const botonIniciar = document.getElementById("botonBurbujas");
            botonIniciar.style.display = "block"; // Mostrar el botón al mostrar la pantalla
        }
    });

    // Asegurarse de que las burbujas se generen al mostrar la pantalla
    pantallaMar.addEventListener("click", () => {
        if (!pantallaMar.classList.contains("oculto")) {
            const botonIniciar = document.getElementById("botonBurbujas");
            botonIniciar.style.display = "block"; // Mostrar el botón al mostrar la pantalla
        }
    });
});

// === 7. GUSANOS EN PANTALLA ===
// Este código maneja la aparición y desaparición de gusanos en la pantalla de Tierra

document.addEventListener("DOMContentLoaded", () => {
    const gusanosPorPantalla = {
        pantallaTierra: Array.from(document.querySelectorAll("#pantallaTierra .gusano")),
        // Si hay más pantallas con gusanos, se pueden agregar aquí.
    };

    let intervalos = {};

    /**
     * Muestra gusanos aleatoriamente en una pantalla específica.
     * @param {string} pantallaId - ID de la pantalla donde se mostrarán los gusanos.
     */
    function mostrarGusanos(pantallaId) {
        const gusanos = gusanosPorPantalla[pantallaId];
        if (!gusanos) return;

        // Ocultar gusanos que no están desapareciendo
        gusanos.forEach(gusano => {
            if (!gusano.classList.contains("desapareciendo")) {
                gusano.style.visibility = "hidden";
            }
        });

        const cantidad = Math.floor(Math.random() * 5) + 1; // Mostrar entre 1 y 5 gusanos
        const seleccionados = gusanos
            .filter(gusano => !gusano.classList.contains("desapareciendo")) // Excluir los que están desapareciendo
            .sort(() => 0.5 - Math.random())
            .slice(0, cantidad);

        seleccionados.forEach(gusano => {
            gusano.style.visibility = "visible"; // Hacer visible el gusano
            gusano.style.animation = "none"; // Reiniciar cualquier animación previa

            gusano.addEventListener("click", () => {
                if (!gusano.classList.contains("aplastado")) { // Evitar reiniciar la animación si ya está aplastado
                    gusano.classList.add("aplastado", "desapareciendo"); // Agregar clases para evitar múltiples clics y marcar como desapareciendo
                    gusano.style.animation = "aplastar 3s forwards"; // Nueva animación de aplastamiento
                    setTimeout(() => {
                        gusano.style.visibility = "hidden"; // Ocultar después de la animación
                        gusano.classList.remove("aplastado", "desapareciendo"); // Permitir que se pueda volver a usar
                    }, 3000); // Tiempo de la animación
                }
            });
        });
    }

    /**
     * Inicia el juego de gusanos en una pantalla específica.
     * @param {string} pantallaId - ID de la pantalla donde se iniciará el juego.
     */
    function iniciarGusanos(pantallaId) {
        detenerGusanos(pantallaId); // Asegurarse de que no haya intervalos previos
        intervalos[pantallaId] = setInterval(() => mostrarGusanos(pantallaId), Math.random() * 1 + 2000); // Intervalo entre 0.5 y 1.5 segundos
    }

    /**
     * Detiene el juego de gusanos en una pantalla específica y los oculta.
     * @param {string} pantallaId - ID de la pantalla donde se detendrá el juego.
     */
    function detenerGusanos(pantallaId) {
        if (intervalos[pantallaId]) {
            clearInterval(intervalos[pantallaId]);
            intervalos[pantallaId] = null;
        }
        const gusanos = gusanosPorPantalla[pantallaId];
        if (gusanos) {
            gusanos.forEach(gusano => {
                gusano.style.visibility = "hidden"; // Ocultar todos los gusanos
            });
        }
    }

    // Asociar el botón de inicio de la pantalla de Tierra
    const botonIniciarTierra = document.getElementById("botonIniciarTierra");
    if (botonIniciarTierra) {
        botonIniciarTierra.addEventListener("click", () => iniciarGusanos("pantallaTierra"));
    }

    // Detener gusanos al regresar de la pantalla
    const botonVolver = document.getElementById("barraVolver");
    if (botonVolver) {
        botonVolver.addEventListener("click", () => detenerGusanos("pantallaTierra"));
    }
});

// === 8. FUNCIONALIDAD DE FUEGOS ARTIFICIALES ===
/**
 * Muestra un fuego artificial en la posición tocada.
 * @param {Event} event - Evento de clic o toque.
 */
function mostrarFuegoArtificial(event) {
    if (window.pantallaActual !== "pantallaCielo") return;

    const pantalla = document.getElementById("pantallaCielo");
    const fuego = document.createElement("img");

    // Seleccionar aleatoriamente una imagen de fuego artificial
    const imagenesFuego = [
        "./Elementos/Fuego1.svg",
        "./Elementos/Fuego2.svg",
        "./Elementos/Fuego3.svg",
        "./Elementos/Fuego4.svg",
        "./Elementos/Fuego5.svg"
    ];
    fuego.src = imagenesFuego[Math.floor(Math.random() * imagenesFuego.length)];

    // Posicionar el fuego artificial en la posición del clic/toque
    const rect = pantalla.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    fuego.style.position = "absolute";
    fuego.style.left = `${x}px`;
    fuego.style.top = `${y}px`;
    fuego.style.transform = "translate(-50%, -50%) scale(0)";
    fuego.style.transition = "transform 0.5s ease-out";
    fuego.style.pointerEvents = "none"; // Evitar que el fuego interfiera con otros eventos
    fuego.style.zIndex = "30";
    fuego.style.width = "100%"; // Ajustar el tamaño del fuego
    fuego.style.height = "100%"; // Ajustar el tamaño del fuego

    // Agregar animación de aparición
    setTimeout(() => {
        fuego.style.transform = "translate(-50%, -50%) scale(1)";
    }, 0);

    // Remover el fuego artificial después de 2 segundos
    setTimeout(() => {
        fuego.remove();
    }, 1000);

    pantalla.appendChild(fuego);
}

// Asegurar que el evento de clic en pantallaCielo se registre correctamente
document.addEventListener("DOMContentLoaded", () => {
    const pantallaCielo = document.getElementById("pantallaCielo");

    // Registrar el evento de clic siempre, independientemente de la visibilidad
    pantallaCielo.addEventListener("click", (event) => {
        if (window.pantallaActual === "pantallaCielo") {
            mostrarFuegoArtificial(event);
        }
    });

    // Asegurar que los fuegos artificiales funcionen al mostrar la pantalla
    pantallaCielo.addEventListener("transitionend", () => {
        if (!pantallaCielo.classList.contains("oculto") && window.pantallaActual === "pantallaCielo") {
            pantallaCielo.addEventListener("click", mostrarFuegoArtificial);
        }
    });
});

// Asegurar que la pantalla inicial esté correctamente configurada
window.addEventListener("load", () => {
    mostrar(window.pantallaActual); // Muestra la pantalla inicial
});

// === 9. FUNCIONALIDAD DEL BOTÓN INVISIBLE ===
document.addEventListener("DOMContentLoaded", () => {
    const botonInvisible = document.getElementById('boton-invisible');
    const fondo = document.getElementById('fondo');

    botonInvisible.addEventListener('click', () => {
        fondo.style.background = "url('/workspaces/magia-interactiva/Fondos/Mar.svg') no-repeat center center";
        fondo.style.backgroundSize = "cover";
    });
});
