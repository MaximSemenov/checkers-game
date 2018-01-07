export default class GameLogicCheckers {

    constructor(chessBoardWithPieces) {
        this.isPossibleCellsSelected = false;
        this.rightCell = null;
        this.leftCell = null;

    }
    movePiece(cell, piece) {

        const parent = piece.parentElement;

        parent.removeChild(piece);
        parent.setAttribute('data-occupied', '');
        console.log(parent)
        piece.classList.remove('selectedPiece');
        cell.appendChild(document.createElement('div')).classList.add(piece.className);
        cell.setAttribute('data-occupied', 'true');


    }


    selectPossibleCells(pieceElement, player) {

        let y = pieceElement.parentElement.dataset.cellY,
            x = pieceElement.parentElement.dataset.cellX;


        if (player === 'player1') {

            this.rightCell = document
                .querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${+y + 1}']`);
            this.leftCell = document
                .querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${+y + 1}']`);

            if (x == 0 ) {
             
                this.rightCell = this.leftCell 
            }

            if (x == 7 ) {
             
                this.leftCell = this.rightCell 
            }
        
 

            if (this.rightCell.dataset.occupied && this.leftCell.dataset.occupied) {
    
                return "player 1 -> both cells are occupied";
            }

            if (this.rightCell.dataset.occupied) {
                // this.rightCell = null;
                this.leftCell.className = 'selectedCell'
                return "player 1 -> right cell is occupied";
            }

            if (this.leftCell.dataset.occupied) {
                // this.leftCell = null;
                this.rightCell.className = 'selectedCell';
                return "player 1 -> left cell is occupied";
            }



            this.rightCell.className = this.leftCell.className = 'selectedCell';
            return "player 1 -> both cells are free";

        }
     

        this.rightCell = document
            .querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${y - 1}']`);

        this.leftCell = document
            .querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${y - 1}']`);

            if (x == 0 ) {
             
                this.leftCell = this.rightCell 
            }

            if (x == 7 ) {
             
                this.rightCell = this.leftCell 
            }

        if (this.rightCell.dataset.occupied && this.leftCell.dataset.occupied) {
            // this.rightCell = this.leftCell = null;
            return "player 2 -> both cells are occupied";
        }

        if (this.rightCell.dataset.occupied) {
            // this.rightCell = null;
            this.leftCell.className = 'selectedCell'
            return "player 2 -> right cell is occupied";
        }

        if (this.leftCell.dataset.occupied) {
            // this.rightCell = null;
            this.rightCell.className = 'selectedCell';
            return "player 2 -> left cell is occupied";
        }

        this.rightCell.className = this.leftCell.className = 'selectedCell';
        return "player 2 -> both cells are free"

    }

}
