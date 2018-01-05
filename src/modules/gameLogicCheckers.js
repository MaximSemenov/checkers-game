export default class GameLogicCheckers {

    constructor(chessBoardWithPieces) {
        this.isPossibleCellsSelected = false;
        this.rightCell = null;
        this.leftCell = null;


    }


    selectPossibleCells(pieceElement, player) {

        let y = pieceElement.parentElement.dataset.cellY,
            x = pieceElement.parentElement.dataset.cellX;

        if (player === 'player1') {

            this.rightCell = document
                .querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${+y + 1}']`);
            this.leftCell = document
                .querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${+y + 1}']`);

            if (this.rightCell.dataset.occupied && this.leftCell.dataset.occupied) {
                this.rightCell = this.leftCell = null;
                return "both cells are occupied";
            }

            this.rightCell.className = this.leftCell.className = 'selectedCell';
            return;
        }
        this.rightCell = document
            .querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${y - 1}']`);

        this.leftCell = document
            .querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${y - 1}']`);

        if (this.rightCell.dataset.occupied && this.leftCell.dataset.occupied) {
            this.rightCell = this.leftCell = null;
            return "both cells are occupied";
        }

        this.rightCell.className = this.leftCell.className = 'selectedCell';

    }

}
