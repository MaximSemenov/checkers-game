export default class Pieces {

    constructor(chessBoard, player1Color, player2Color) {

        this.color1 = player1Color;
        this.color2 = player2Color;
        this.chessBoard = chessBoard;

    }

    setAllPieces() {
        let setPositions = chessBoard.querySelectorAll(`
    #row0 td.brown,
    #row1 td.brown,
    #row2 td.brown,
    #row5 td.brown,
    #row6 td.brown,
    #row7 td.brown`)


        let pieceColor = this.color1;
        for (let cell of setPositions) {
 
            if (cell === setPositions[12]) {
                pieceColor = this.color2;
            }
            cell.appendChild(document.createElement('div')).style.backgroundColor = pieceColor;
        }

    }

assignPlayers () {
    
}


}
