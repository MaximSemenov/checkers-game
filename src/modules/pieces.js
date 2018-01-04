export default class Pieces {

    constructor(createdChessBoard) {
        // this.chessBoardWithPieces = createdChessBoard.chessBoardTable;
        this.chessBoardWithPieces = createdChessBoard;
    }


    setAllPieces() {
        let setPositions = chessBoard.querySelectorAll(`
    #row0 td.brown,
    #row1 td.brown,
    #row2 td.brown,
    #row5 td.brown,
    #row6 td.brown,
    #row7 td.brown`)

        let className = 'player1'
        for (let cell of setPositions) {
            cell.setAttribute('data-occupied', 'true');
            if (cell === setPositions[12]) {
                className = 'player2'
            }
            cell.appendChild(document.createElement('div')).classList.add(className)
        }

    }

}
