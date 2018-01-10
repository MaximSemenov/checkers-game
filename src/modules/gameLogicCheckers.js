export default class GameLogicCheckers {

    constructor(chessBoardWithPieces) {
        this.isPossibleCellsSelected = false;
        this.rightCell = null;
        this.leftCell = null;
        this.coordinates = ['rightCellX', 'rightCellY', 'leftCellX', 'leftCellY']
        this.player1CoordinatesMap = ['-', '+', '+', '+'];
        this.player2CoordinatesMap = ['+', '-', '-', '-'];
        this.calcMethods = {
            "-": function (x, y) {
                return x - y;
            },
            "+": function (x, y) {
                return +(x) + +(y);
            }
        };
    }

    //// ADD 1 NUMBER IN FUNCTIONS

    movePiece(cell, piece) {

        const parent = piece.parentElement;

        parent.removeChild(piece);
        parent.setAttribute('data-occupied', '');
        piece.classList.remove('selectedPiece');
        cell.appendChild(document.createElement('div')).classList.add(piece.className);
        cell.setAttribute('data-occupied', 'true');


    }

    calcCoordinates(x, y, coordinates, playerCoordinatesMap) {

        var results = {},
            i;

        for (i = 0; i < coordinates.length; i++) {
            // console.log ('-----> ' + this.calcMethods[playerCoordinatesMap[i]](x,y))
            results[this.coordinates[i]] = this.calcMethods[playerCoordinatesMap[i]](x,y)
            // results[this.coordinates[i]] = playerCoordinatesMap[i];

        }
        console.log(results)
        return results;
    }



    selectPossibleCells(player, x, y) {


        this.y = y;
        this.x = x;
        let bbb = this.calcCoordinates(x, y, this.coordinates, player === 'player1' ? this.player1CoordinatesMap : this.player2CoordinatesMap);
        console.log(player)
        if (player === 'player1') {

            this.rightCell = document
                // .querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${+y + 1}']`);
                .querySelector(`[data-cell-x='${bbb.rightCellX}'][data-cell-y='${bbb.rightCellY}']`);
            this.leftCell = document
                // .querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${+y + 1}']`);
                .querySelector(`[data-cell-x='${bbb.leftCellX}'][data-cell-y='${bbb.leftCellY}']`);

            console.log('rightCell -> ' + this.rightCell);
            console.log('leftCell -> ' + this.leftCell);

            if (this.x == 0) {

                this.rightCell = this.leftCell
            }

            if (this.x == 7) {

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


        // this.rightCell = document
        //     .querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${y - 1}']`);

        // this.leftCell = document
        //     .querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${y - 1}']`);





        // if (x == 0) {

        //     this.leftCell = this.rightCell
        // }

        // if (x == 7) {

        //     this.rightCell = this.leftCell
        // }

        // if (this.rightCell.dataset.occupied && this.leftCell.dataset.occupied) {

        //     return "player 2 -> both cells are occupied";

        // }

        // if (this.rightCell.dataset.occupied) {
        //     // this.rightCell = null;
        //     this.leftCell.className = 'selectedCell'

        //     return "player 2 -> right cell is occupied";
        // }

        // // return  (this.leftCell.dataset.occupied) ? this.selectPossibleCells (this.leftCell, 'player2') : 1;

        // if (this.leftCell.dataset.occupied) {

        //     this.rightCell.className = 'selectedCell';
        //     return "player 2 -> left cell is occupied";
        // }

        // this.rightCell.className = this.leftCell.className = 'selectedCell';
        // return "player 2 -> both cells are free"





    }

}
