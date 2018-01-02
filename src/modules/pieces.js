export default class Pieces {

    constructor(createdChessBoard) {
        this.chessBoardWithPieces = createdChessBoard.chessBoardTable;
        this.selectedPiece = undefined;

        this.chessBoardWithPieces.addEventListener('click', (e) => {

            e.target.classList.add('selectedPiece')
            if (this.selectedPiece) {
                this.selectedPiece.classList.remove('selectedPiece');
                if (this.selectedPiece === e.target) {
                    this.selectedPiece = undefined
                    return;
                }
            }
            this.selectedPiece = e.target;

        }, false);
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
