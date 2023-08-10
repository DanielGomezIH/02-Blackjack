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
const puntosHTML = document.querySelectorAll("small");

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

//Eventos Pedir Carta y Remplazar puntaje en el HTML

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);

  puntosHTML[0].innerText = puntosJugador;
});
