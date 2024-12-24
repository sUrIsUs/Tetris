import { Grid } from '/scripts/grid.js'

export class BoardTetris extends Grid{
    constructor(canvas, rows, column, cellSize, space){
        super(canvas, rows, column, cellSize, space);
        this.lineClearSound = new Audio('/109662__grunz__success.wav');
    }
    //Esta dentro de la matriz
    isInside(row,col){
        return row >= 0 && row < this.rows && col >= 0 && col < this.column;
    }
    isEmpty(row,col){
        return this.isInside(row,col) && this.matriz[row][col] === 0;
    }
    isRowFull(row){
        return this.matriz[row].every(element => element !== 0);
    }
    isRowEmpty(row){
        return this.matriz[row].every(element => element === 0);
    }
    //Limpia la fila (aux)
    clearRow(row){
        this.matriz[row].fill(0);
    }
    //Acomoda las filas cuando se limpian filas
    moveRowDown(row,numRows){
        this.matriz[row + numRows] = this.matriz[row].slice();
        this.clearRow(row);
    }
    //Limpia todas las filas correspondientes
    clearFullRows(){
        let cont = 0;
        for(let row = this.rows -1; row >= 0; row --){
            if(this.isRowFull(row)){
                this.clearRow(row);
                this.playLineClearSound();
                cont++
            }
            else if(cont > 0){
                this.moveRowDown(row,cont);
            }
        }
        return cont;
    }
    gameOver(){
        return !(this.isRowEmpty(0));
    }
    //sonidito :)
    playLineClearSound() {
        this.lineClearSound.play().catch((error) => {
            console.error('Error al reproducir el sonido:', error);
        });
    }
}

export class BoardNext extends Grid{
    constructor(canvas,rows,column,cellSize,space,listaTetrominos){
        super(canvas,rows,column,cellSize,space);
        this.listaTetrominos = listaTetrominos;
        this.updateMatriz();
    }
    updateMatriz(){
        this.restartMatriz();
        let shape;
        let cont = 0;
        //Muestra los 3 tetrominos siguientes
        for(let i = 0; i < this.listaTetrominos.length; i++){
            shape = this.listaTetrominos[i].currentShape();
            for(let j = 0; j < shape.length; j++){
                this.matriz[shape[j].row + cont][shape[j].column] = this.listaTetrominos[i].id;
            }
            cont += 3;
        }
    }
}

export class BoardHold extends Grid{
    constructor(canvas,rows,column,cellSize,space,tetromino){
        super(canvas,rows,column,cellSize,space);
        this.tetromino = null;
        this.updateMatriz();
    }
    updateMatriz(){
        if(this.tetromino == null) return;
        this.tetromino.reset();
        this.restartMatriz();
        const shape = this.tetromino.currentShape();
        //muestra el tetromino guardado
        for(let i = 0; i < shape.length; i++){
            this.matriz[shape[i].row][shape[i].column] = this.tetromino.id;
        }
    }
}