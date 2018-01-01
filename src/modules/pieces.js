export default class Pieces {

    constructor(createdChessBoard) {
        this.chessBoardWithPieces = createdChessBoard.chessBoardTable;

console.log (this.chessBoardWithPieces)
        this.chessBoardWithPieces.addEventListener('click', () => alert ('helow'), false);
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
            cell.setAttribute('data-occupied', '');
            if (cell === setPositions[12]) {
                className = 'player2'
            }
            cell.appendChild(document.createElement('div')).classList.add(className)
        }

    }




}
