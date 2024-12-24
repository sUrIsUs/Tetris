import { Tetromino } from "/scripts/tetromino.js";

export class Grid{
    constructor(canvas, rows, column, cellSize, space){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.rows = rows;
        this.column = column;
        this.cellSize = cellSize;
        this.space = space;
        this.matriz = [];
        this.restartMatriz();

        this.canvas.width = this.column * this.cellSize + (this.space*this.column);
        this.canvas.height = this.rows * this.cellSize + (this.space*this.rows);

        this.block = new Tetromino(this.canvas, this.cellSize);
    }

    restartMatriz(){
        for(let i = 0; i < this.rows; i++){
            this.matriz[i] = [];
            for(let j = 0; j < this.column; j++){
                this.matriz[i][j] = 0;
            } 
        }
    }

    drawSquare(x, y, side, color, borderColor, border){
        const bordeSize = side/10;

        this.ctx.fillStyle = color;     //Establece el estilo de relleno para las figuras dibujadas
        this.ctx.fillRect(x, y, side, side);    //Dibuja un rectángulo sólido en el lienzo

        this.ctx.strokeStyle = borderColor;     //Define el estilo del borde para figuras dibujadas.
        this.ctx.lineWidth = bordeSize;
        this.ctx.strokeRect(x + bordeSize/2, y+bordeSize/2 , side - bordeSize, side - bordeSize);   //Dibuja el contorno de un rectángulo.
    }

    getCoordinates(col, row){
        return{x: col * (this.cellSize + this.space), y: row * (this.cellSize + this.space)}
    }

    draw(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.column; j++){
                const position = this.getCoordinates(j,i);
                if(this.matriz[i][j] !== 0){
                    this.block.drawBlock(position.x,position.y,this.matriz[i][j]);
                }
                else{
                    this.drawSquare(position.x, position.y, this.cellSize, "#000", "#303030",10);
                }
            }
        }
        this.printMatriz();
    }
    //Metodo para mostrar la matriz en la consola
    printMatriz(){
        let text = "";
        this.matriz.forEach((row) =>{
            text += row.join(" ") + "\n";
        });
        console.log(text);
    }

    drawThreeNextTetrominos(){
        this.drawBackground();
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.column; j++){
                const position = this.getCoordinates(j,i);
                //ajusta los siguientes tetrominos en el canvas
                switch(this.matriz[i][j]){
                    case 0:
                        break;   

                    case 2:
                        this.block.drawBlock(position.x + this.cellSize, position.y,this.matriz[i][j]);
                        break; 

                    case 3:
                        this.block.drawBlock(position.x, position.y,this.matriz[i][j])    
                        break; 

                    default:
                        this.block.drawBlock(position.x + this.cellSize/2, position.y,this.matriz[i][j]);                                    
                }
            }
        }
    }

    drawBackground(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    }

    getMatriz(i,j){
        return this.matriz[i][j];
    }
}