import{Game} from '/scripts/game.js'
const canvasTetris = document.getElementById("canvas-tetris");
const canvasNext = document.getElementById("canvas-next");
const canvasHold = document.getElementById("canvas-hold");
const score = document.getElementById("score");
const menu = document.getElementById("menu");
const botonMenu = document.getElementById("btn-start");
const music = document.getElementById("music");
const volumeControl = document.getElementById("volume");
const lineClearSound = new Audio("/audio/line-clear.mp3");
let endgame = new Audio('/434465__dersuperanton__game-over-deep-epic.wav');
const rows = 20, column = 10, cellSize = 26, space = 2;
const game = new Game(canvasTetris, rows, column, cellSize, space, canvasNext,canvasHold);

//actualiza el juego en ejecución
function update(){
    if(game.getGameOver()){
        menu.style.display = "flex";
    }
    else{
        music.play(); 
        game.update();
        score.innerHTML = game.getScore();
    }
    requestAnimationFrame(update);
}

botonMenu.addEventListener("click",() => {
    setTimeout(() =>{
        menu.style.display = "none";
        game.reset();
        // endGame();
    },200)
})

volumeControl.addEventListener("input", (event) => {
    music.volume = event.target.value; 
});

update();