/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Tréboles)
 * 2H = Two of Hearts (Tréboles)
 * 2S = Two of Spades (Tréboles)
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

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

  console.log(deck);
  console.log(carta); //La carta debe de ser de la baraja
  return carta;
};

pedirCarta();
