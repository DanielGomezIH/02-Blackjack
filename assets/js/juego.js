/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Tréboles)
 * 2H = Two of Hearts (Tréboles)
 * 2S = Two of Spades (Tréboles)
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputadora = 0;

//Referencias del HTML

let btnPedir = document.querySelector("#btnPedir");

let btnDetener = document.querySelector("#btnDetener");

const puntosHTML = document.querySelectorAll("small");

const divCartasJugador = document.querySelector("#jugador-cartas");

const divCartasComputadora = document.querySelector("#computadora-cartas");

//Esta función crea un nuebo Deck de cartas

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  // console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);

  return deck;
};

crearDeck();

//Esta función permite tomar una carta del deck

const pedirCarta = () => {
  if (deck.length === 0) {
    //Medida de seguridad
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  return carta;
};

pedirCarta();

//Función para conocer el valor de las cartas

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

//Turno de la computadora

const turnoComputadora = (puntosMinimos) => {
  do {
    if (puntosMinimos === 0) {
      break;
    }
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    // <img class="carta" src="assets/cartas/2C.png"/>;
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
};

//Eventos Pedir Carta y Remplazar puntaje en el HTML

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  // <img class="carta" src="assets/cartas/2C.png"/>;
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  //Evaluar los puntos

  if (puntosJugador > 21) {
    console.warn("Lo Siento mucho, perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, Genial, Ganaste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

//Evento Detener juego y disparar Turno Computadora

btnDetener.addEventListener("click", () => {
  if (puntosJugador === 0) {
    btnDetener.disabled = false;
  } else {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
  }

  turnoComputadora(puntosJugador);
});
