export default class GameLogicCheckers {

    constructor(chessBoardWithPieces) {
        console.log(document.getElementById('chessBoard'))
        this.selectedPiece = undefined;
        document.getElementById('chessBoard').addEventListener('click', this.selectPiece, false);
        // this.chessBoardWithPieces.addEventListener('click', this.selectPossibleCells, false);
    }

    selectPiece(e) {

        if (e.target.tagName !== 'DIV') {
            return;
        }

        e.target.classList.add('selectedPiece')
        if (this.selectedPiece) {
            this.selectedPiece.classList.remove('selectedPiece');
            if (this.selectedPiece === e.target) {
                this.selectedPiece = undefined
                return;
            }
        }
        this.selectedPiece = e.target;
    }

    selectPossibleCells(e) {

        const el = e.target;
        let y = el.parentElement.dataset.cellY;
        let x = el.parentElement.dataset.cellX;


        if (el.classList.contains('player1')) {
            document.querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${+y + 1}']`)
                .className = 'selectedCell';


            document.querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${+y + 1}']`)
                .className = 'selectedCell'
        }
    }

}
