export default class GameLogicCheckers {

    constructor(chessBoardWithPieces) {
        this.isPossibleCellsSelected = false;
        this.rightCell = null;
        this.leftCell = null;
        this.coordinates = ['rightCellX', 'rightCellY', 'leftCellX', 'leftCellY']
        this.player1CoordinatesMap = ['-', '+', '+', '+'];
        this.player2CoordinatesMap = ['+', '-', '-', '-'];
        this.calcMethods = {
            "-": function (coordinate, number) {
                console.log(coordinate, number)
                return coordinate - number;
            },
            "+": function (coordinate, number) {
                return +(coordinate) + +(number);
            }
        };
    }


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
            results[this.coordinates[i]] = this.calcMethods[playerCoordinatesMap[i]](i % 2 === 0 ? x : y, 1)
        }
        return results;
    }

    selectPossibleCells(player, x, y) {

        this.y = y;
        this.x = x;
        let calcResults = this.calcCoordinates(x, y, this.coordinates, player === 'player1' ? this.player1CoordinatesMap : this.player2CoordinatesMap);

        this.rightCell = document
            .querySelector(`[data-cell-x='${calcResults.rightCellX}'][data-cell-y='${calcResults.rightCellY}']`);
        this.leftCell = document
            .querySelector(`[data-cell-x='${calcResults.leftCellX}'][data-cell-y='${calcResults.leftCellY}']`);

        if (this.x == 0) {

            player === 'player1' ? this.rightCell = this.leftCell : this.leftCell = this.rightCell;
        }

        if (this.x == 7) {

            player === 'player1' ? this.leftCell = this.rightCell : this.rightCell = this.leftCell;
        }


        if (this.rightCell.dataset.occupied && this.leftCell.dataset.occupied) {

            return `${player}: both cells are occupied.`;
        }

        if (this.rightCell.dataset.occupied) {

            this.leftCell.className = 'selectedCell'
            return `${player}: right cell is occupied.`;
        }

        if (this.leftCell.dataset.occupied) {

            this.rightCell.className = 'selectedCell';
            return `${player}: left cell is occupied.`;
        }

        this.rightCell.className = this.leftCell.className = 'selectedCell';
        return `${player}: both cells are free.`;

    }

}
