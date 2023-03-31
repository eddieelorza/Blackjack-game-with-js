import {shuffle} from './underscore-min.js'

let deck = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let playerScore = 0,
    computerScore = 0

const userWrapper = document.getElementById('user-wrapper')
const computerWrapper = document.getElementById('computer-wrapper')
const playersCounter = document.querySelectorAll('span')
let btnGetCard = document.getElementById('get-card')
const btnStop = document.getElementById('stop-game')
const btnRestart = document.getElementById('restart-game')


const createDeck = ()=>{
    for(let i = 2; i <= 10 ; i++){
        for(let tipo of tipos){
            deck.push(i + tipo)
        }
    }

    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo) 
        }
    }
    deck = shuffle(deck);

    return deck;
}

createDeck()

const getCard = () =>{
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const card = deck.pop()

    return card
}

// getCard()

const cardValue = (card) =>{
    const value = card.substring(0, card.length - 1)

    return (isNaN(value)) ? 
                (value === 'A') ?  11 : 10 
              : value * 1

}


const computerShift = (minScore) =>{
    do{
        const card = getCard()
        computerScore += cardValue(card)
        playersCounter[1].textContent = computerScore
        const cardItem = document.createElement('img')
        cardItem.classList.add('cards')
        cardItem.setAttribute('src',`./assets/cartas/${card}.png`)
        computerWrapper.appendChild(cardItem)
    
        if(minScore > 21){
           break;
        }
    }while((computerScore < minScore) && (minScore <=21))

    setTimeout(() => {
        if( computerScore === minScore ) {
            alert('Nadie gana :(');
        } else if ( minScore > 21 ) {
            alert('Computadora gana')
        } else if( computerScore > 21 ) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana')
        }
    }, 100 );
}


console.log(deck)
btnGetCard.addEventListener('click',() => {
    const card = getCard()
    playerScore += cardValue(card)
    playersCounter[0].textContent = playerScore
    const cardItem = document.createElement('img')
    cardItem.classList.add('cards')
    cardItem.setAttribute('src',`./assets/cartas/${card}.png`)
    userWrapper.appendChild(cardItem)

    if(playerScore > 21){
        console.log('perdiste')
        btnGetCard.disabled = true;
        btnStop.disabled = true;
        computerShift(playerScore)
        
        
    }else if (playerScore === 21){
        console.log('ganaste')
        btnGetCard.disabled = true;
        btnStop.disabled = true;
        computerShift(playerScore)
        
    }
   
    
})

btnStop.addEventListener('click', ()=>{
    btnGetCard.disabled = true;
    btnStop.disabled = true;
    computerShift(playerScore)

})

btnRestart.addEventListener('click', ()=>{
    playerScore = 0
    computerScore = 0
    deck = []
    deck = createDeck()
    btnGetCard.disabled = false;
    btnStop.disabled = false;
    playersCounter[0].textContent = 0
    playersCounter[1].textContent = 0
    userWrapper.innerHTML = ""
    computerWrapper.innerHTML = ""

})