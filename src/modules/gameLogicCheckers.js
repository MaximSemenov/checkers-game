export default class GameLogicCheckers {

    constructor(chessBoardWithPieces) {
        this.selectedPiece = undefined;

    }


    selectPossibleCells(pieceElement, player) {
        let y = pieceElement.parentElement.dataset.cellY,
            x = pieceElement.parentElement.dataset.cellX,
            rightCell,
            leftCell;

        if (player === 'player1') {

            rightCell = document
                .querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${+y + 1}']`);
            leftCell = document
                .querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${+y + 1}']`);

            if (rightCell.dataset.occupied && leftCell.dataset.occupied) {
                return "both cells are occupied";
            }

            rightCell.className = leftCell.className = 'selectedCell';


            return;
        }
        rightCell = document
            .querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${y - 1}']`);

        leftCell = document
            .querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${y - 1}']`);

        console.log(rightCell)
        if (rightCell.dataset.occupied && leftCell.dataset.occupied) {
            return "both cells are occupied";
        }

        rightCell.className = leftCell.className = 'selectedCell';

    }

}
