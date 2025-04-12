const letras = [
    { letra: "a", top: "0%", left: "2%", width: "14.5%", height: "16%" },
    { letra: "b", top: "0%", left: "18%", width: "12.5%", height: "16%" },
    { letra: "c", top: "0%", left: "31.5%", width: "13.5%", height: "16%" },
    { letra: "d", top: "0%", left: "45.5%", width: "14.5%", height: "16%" },
    { letra: "e", top: "0%", left: "61.5%", width: "11.5%", height: "16%" },
    { letra: "f", top: "0%", left: "73.5%", width: "11%", height: "16%" },
    { letra: "g", top: "0%", left: "84.5%", width: "14.5%", height: "16%" },
    { letra: "h", top: "26%", left: "2%", width: "14.5%", height: "16%" },
    { letra: "i", top: "26%", left: "18%", width: "6%", height: "16%" },
    { letra: "j", top: "26%", left: "24%", width: "8.5%", height: "16%" },
    { letra: "k", top: "26%", left: "33%", width: "12.5%", height: "16%" },
    { letra: "l", top: "26%", left: "46.5%", width: "8.5%", height: "16%" },
    { letra: "m", top: "26%", left: "57.5%", width: "22.5%", height: "16%" },
    { letra: "n", top: "26%", left: "82%", width: "16.5%", height: "16%" },
    { letra: "ñ", top: "53%", left: "1%", width: "12%", height: "16%" },
    { letra: "o", top: "53%", left: "13.5%", width: "16%", height: "16%" },
    { letra: "p", top: "53%", left: "30%", width: "13%", height: "16%" },
    { letra: "q", top: "53%", left: "44%", width: "15.5%", height: "16%" },
    { letra: "r", top: "53%", left: "60.5%", width: "12.5%", height: "16%" },
    { letra: "s", top: "53%", left: "74%", width: "13%", height: "16%" },
    { letra: "t", top: "53%", left: "86.5%", width: "12.5%", height: "16%" },
    { letra: "u", top: "79%", left: "2%", width: "16%", height: "16%" },
    { letra: "v", top: "79%", left: "18%", width: "15.5%", height: "16%" },
    { letra: "w", top: "79%", left: "34.5%", width: "21%", height: "16%" },
    { letra: "x", top: "79%", left: "56%", width: "15%", height: "16%" },
    { letra: "y", top: "79%", left: "71%", width: "12.5%", height: "16%" },
    { letra: "z", top: "79%", left: "83.5%", width: "15%", height: "16%" },
];

const botonesLetras = document.getElementById("botonesLetras");
const pantallasLetras = document.getElementById("pantallasLetras");

// Generar botones dinámicamente
letras.forEach(({ letra, top, left, width, height }) => {
    const boton = document.createElement("button");
    boton.className = "zona-letras";
    boton.style = `top: ${top}; left: ${left}; width: ${width}; height: ${height};`;
    boton.setAttribute("onclick", `irALetra('letra-${letra}')`);
    boton.setAttribute("aria-label", `Letra ${letra.toUpperCase()}`);
    botonesLetras.appendChild(boton);

    // Generar pantallas dinámicamente
    const pantalla = document.createElement("div");
    pantalla.id = `pantallaLetra${letra.toUpperCase()}`;
    pantalla.className = "pantalla oculto";
    pantalla.innerHTML = `
        <object type="image/svg+xml" data="Letras/Letra ${letra.toUpperCase()}.svg" class="fondo"></object>
        <canvas id="canvasLetra${letra.toUpperCase()}" class="canvas-trazos"></canvas>
        <button class="boton-limpiar" onclick="limpiarCanvas('canvasLetra${letra.toUpperCase()}')">Limpiar</button>
        <button class="boton-audio" style="position: absolute; top: 10px; left: 10px;" onclick="reproducirAudio('audioLetra${letra.toUpperCase()}')">🔊</button>
    `;
    pantallasLetras.appendChild(pantalla);

    // Ajustar el tamaño del canvas después de agregarlo al DOM
    const canvas = pantalla.querySelector("canvas");
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
    }
});

const numeros = [
    { numero: 1, top: "3%", left: "4%", width: "20%", height: "29%" },
    { numero: 2, top: "3%", left: "31%", width: "17%", height: "30%" },
    { numero: 3, top: "3%", left: "53%", width: "18%", height: "29%" },
    { numero: 4, top: "3%", left: "75%", width: "22%", height: "30%" },
    { numero: 5, top: "37%", left: "7%", width: "22%", height: "30%" },
    { numero: 6, top: "37%", left: "36%", width: "22%", height: "31%" },
    { numero: 7, top: "37%", left: "67%", width: "27%", height: "33%" },
    { numero: 8, top: "70%", left: "7%", width: "22%", height: "30%" },
    { numero: 9, top: "70%", left: "38%", width: "23%", height: "28%" },
    { numero: 10, top: "70%", left: "67%", width: "30%", height: "30%" },
];

const botonesNumeros = document.getElementById("botonesNumeros");
const pantallasNumeros = document.getElementById("pantallasNumeros");

// Generar botones y pantallas dinámicamente para números
numeros.forEach(({ numero, top, left, width, height }) => {
    const boton = document.createElement("button");
    boton.className = "zona-numeros";
    boton.style = `top: ${top}; left: ${left}; width: ${width}; height: ${height};`;
    boton.setAttribute("onclick", `irANumero('Numero${numero}')`);
    boton.setAttribute("aria-label", `Número ${numero}`);
    botonesNumeros.appendChild(boton);

    const pantalla = document.createElement("div");
    pantalla.id = `pantallaNumero${numero}`;
    pantalla.className = "pantalla oculto";
    pantalla.innerHTML = `
        <object type="image/svg+xml" data="Numeros/Número ${numero}.svg" class="fondo"></object>
        <canvas id="canvasNumero${numero}" class="canvas-trazos"></canvas>
        <button class="boton-limpiar" onclick="limpiarCanvas('canvasNumero${numero}')">Limpiar</button>
        <button class="boton-audio" style="position: absolute; top: 10px; left: 10px;" onclick="reproducirAudio('audioNumero${numero}')">🔊</button>
    `;
    pantallasNumeros.appendChild(pantalla);

    const canvas = pantalla.querySelector("canvas");
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
    }
});

const figuras = [
    { figura: "1", top: "2%", left: "4.5%", width: "17%", height: "19%" },
    { figura: "2", top: "1%", left: "27%", width: "10%", height: "23%" },
    { figura: "3", top: "3%", left: "43%", width: "17%", height: "17%" },
    { figura: "4", top: "0%", left: "63%", width: "15%", height: "25%" },
    { figura: "5", top: "1%", left: "81%", width: "17%", height: "24%" },
    { figura: "6", top: "38%", left: "2%", width: "20%", height: "25%" },
    { figura: "7", top: "37%", left: "25%", width: "20%", height: "27%" },
    { figura: "8", top: "42%", left: "46%", width: "27%", height: "17%" },
    { figura: "9", top: "37%", left: "75%", width: "23%", height: "25%" },
    { figura: "10", top: "70%", left: "0%", width: "23%", height: "24%" },
    { figura: "11", top: "77%", left: "20%", width: "26%", height: "15%" },
    { figura: "12", top: "77%", left: "47%", width: "27%", height: "15%" },
    { figura: "13", top: "75%", left: "74%", width: "24%", height: "18%" },
];

const botonesFiguras = document.getElementById("botonesFiguras");
const pantallasFiguras = document.getElementById("pantallasFiguras");

// Generar botones y pantallas dinámicamente para figuras
figuras.forEach(({ figura, top, left, width, height }) => {
    const boton = document.createElement("button");
    boton.className = "zona-figuras";
    boton.style = `top: ${top}; left: ${left}; width: ${width}; height: ${height};`;
    boton.setAttribute("onclick", `irAFigura('Figura${figura}')`);
    boton.setAttribute("aria-label", `Figura ${figura}`);
    botonesFiguras.appendChild(boton);

    const pantalla = document.createElement("div");
    pantalla.id = `pantallaFigura${figura}`;
    pantalla.className = "pantalla oculto";
    pantalla.innerHTML = `
        <object type="image/svg+xml" data="Trazos/Trazo ${figura}.svg" class="fondo"></object>
        <canvas id="canvasFigura${figura}" class="canvas-trazos"></canvas>
        <button class="boton-limpiar" onclick="limpiarCanvas('canvasFigura${figura}')">Limpiar</button>
    `;
    pantallasFiguras.appendChild(pantalla);

    const canvas = pantalla.querySelector("canvas");
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
    }
});

const modos = [
    { id: "Cielo", fondo: "Fondos/Cielo.svg" },
    { id: "Tierra", fondo: "Fondos/Tierra.svg" },
    { id: "Mar", fondo: "Fondos/Mar.svg" },
];

const pantallasModos = document.getElementById("pantallasModos");

// Generar pantallas dinámicamente para los modos
modos.forEach(({ id, fondo }) => {
    const pantalla = document.createElement("div");
    pantalla.id = `pantalla${id}`;
    pantalla.className = "pantalla oculto";
    pantalla.innerHTML = `
        <img src="${fondo}" class="fondo" />
        <div id="contenido${id}" class="contenido-modo"></div>
    `;
    pantallasModos.appendChild(pantalla);
});

// Function to play audio
function reproducirAudio(audioId) {
    const audio = new Audio(`Audios/${audioId}.mp3`);
    audio.play();
}
