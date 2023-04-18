import miModulo from './juego.js';

console.log(miModulo);

document.querySelector('#restart-game').addEventListener('click', () => {
    miModulo.newGame();
}
)
