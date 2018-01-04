export default class GameLogicCheckers {

    constructor(chessBoardWithPieces) {
        this.selectedPiece = undefined;

    }


    selectPossibleCells(pieceElement, player) {
        let y = pieceElement.parentElement.dataset.cellY,
            x = pieceElement.parentElement.dataset.cellX;

        if (player === 'player1') {

            document.querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${+y + 1}']`)
                .className = 'selectedCell';
            document.querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${+y + 1}']`)
                .className = 'selectedCell'

            return;
        }

        document.querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${y - 1}']`)
            .className = 'selectedCell';

        document.querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${y - 1}']`)
            .className = 'selectedCell'

    }

}
