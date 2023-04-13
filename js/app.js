/*/*Realizar una web con un temporizador donde el usuario pueda ingresar un tiempo desde donde comenzará a decrementar el contador. Debe contener los botones, iniciar, pausar y reset.
 */

let intervalo;
let tiempoRestante = 0;
const audio = new Audio("../sound/beep.mp3");

document
  .getElementById("btnIniciar")
  .addEventListener("click", iniciarCronometro);
document
  .getElementById("btnDetener")
  .addEventListener("click", detenerCronometro);
document
  .getElementById("btnReset")
  .addEventListener("click", reiniciarCronometro);

function actualizarCronometro() {

  const cronometro = document.getElementById("temporizador");

  const horas = Math.floor(tiempoRestante / 3600);
  const minutos = Math.floor((tiempoRestante % 3600) / 60);
  const segundos = tiempoRestante % 60;

  cronometro.textContent = `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;

  tiempoRestante--;

  if (tiempoRestante < 0) {
    detenerCronometro();
    cronometro.textContent = "00:00:00";
    audio.play();
  }
}


function iniciarCronometro() {

  const horas = parseInt(document.getElementById("horas").value) || 0;
  const minutos = parseInt(document.getElementById("minutos").value) || 0;
  const segundos = parseInt(document.getElementById("segundos").value) || 0;
  tiempoRestante = horas * 3600 + minutos * 60 + segundos;

  document.getElementById("btnIniciar").disabled = true;
  document.getElementById("btnDetener").disabled = false;
  document.getElementById("btnReset").disabled = false;


  intervalo = setInterval(actualizarCronometro, 1000);
}

function detenerCronometro() {

  clearInterval(intervalo);

  document.getElementById("btnIniciar").disabled = false;
  document.getElementById("btnDetener").disabled = true;
}

function reiniciarCronometro() {

  detenerCronometro();

  tiempoRestante = 0;

  const cronometro = document.getElementById("temporizador");
  cronometro.textContent = "00:00:00";

  document.getElementById("btnDetener").disabled = true;
  document.getElementById("btnReset").disabled = true;

  document.getElementById("btnIniciar").disabled = false;
  document.getElementById("btnDetener").disabled = true;
  document.getElementById("btnReset").disabled = true;
}
