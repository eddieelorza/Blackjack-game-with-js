import {shuffle} from './underscore-min.js'


const miModulo = (()=>{
    'use strict'
    let deck = [];
    const tipos      = ['C','D','H','S'],
            especiales = ['A','J','Q','K'];

    let playersScores = []

    const playersWrapper = document.querySelectorAll('.players-wrapper'),
            playersCounter = document.querySelectorAll('span'),
            btnGetCard = document.getElementById('get-card'),
            btnStop = document.getElementById('stop-game'),
            btnRestart = document.getElementById('restart-game')

    const startGame = (playersAmount = 2) =>{
        deck = createDeck()

        playersScores = []
        for(let i = 0; i < playersAmount; i++){
            playersScores.push(0)
        }

        playersCounter.forEach(elem => elem.innerText = 0)
        playersWrapper.forEach(elem => elem.innerHTML = '')

        btnGetCard.disabled = false;
        btnStop.disabled = false;

    }     

    const createDeck = ()=>{
        deck = []
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
        return shuffle(deck);
    }



  

    const getCard = () =>{
        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop()
    }

    // getCard()

    const cardValue = (card) =>{
        const value = card.substring(0, card.length - 1)

        return (isNaN(value)) ? 
                    (value === 'A') ?  11 : 10 
                : value * 1

    }

    const acummScores = (card, turn) =>{
        playersScores[turn] += cardValue(card)
        playersCounter[turn].textContent = playersScores[turn]
        return playersScores[turn]

    }

    const createCard = (card, turn) =>{
        const cardItem = document.createElement('img')
        cardItem.classList.add('cards')
        cardItem.setAttribute('src',`./assets/cartas/${card}.png`)
        playersWrapper[turn].appendChild(cardItem)
    }

    const winner = () =>{
        const [playerScore, computerScore] = playersScores
        setTimeout(() => {
            if(playerScore === computerScore){
                alert('Nadie gana :(')
            }else if(playerScore > 21){
                alert('Computadora gana')
            }else if(computerScore > 21){
                alert('Jugador Gana')
            }else{
                alert('Computadora Gana')
            }
        }, 100);
    }



    const computerShift = (minScore) =>{
        let computerScore = 0
        do{
            const card = getCard()
            computerScore = acummScores(card, playersScores.length - 1)
            createCard(card, playersScores.length - 1)
        }while((computerScore < minScore) && (minScore <= 21))
        winner()
    }


    btnGetCard.addEventListener('click',() => {
        const card = getCard()
        const playerScore = acummScores(card, 0)
        createCard(card, 0)

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
        computerShift(playersScores[0])

    })

    // btnRestart.addEventListener('click', ()=>{
    //     startGame()
    //     // playerScore = 0
    //     // computerScore = 0
    //     // deck = []
    //     // deck = createDeck()
    //     // btnGetCard.disabled = false;
    //     // btnStop.disabled = false;
    //     // playersCounter[0].textContent = 0
    //     // playersCounter[1].textContent = 0
    //     // userWrapper.innerHTML = ""
    //     // computerWrapper.innerHTML = ""

    // })

    return {
        newGame: startGame
    }



})();

export default miModulo




