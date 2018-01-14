export default class GameLogicCheckers {

    constructor(chessBoardWithPieces) {
        this.isPossibleCellsSelected = false;
        this.rightCell = null;
        this.leftCell = null;
        this.coordinatesToMove = ['rightCellX', 'rightCellY', 'leftCellX', 'leftCellY'];
        this.coordinatesToCapture = ['cellX', 'cellY'];
        this.player1CoordinatesMap = ['-', '+', '+', '+'];
        this.player2CoordinatesMap = ['+', '-', '-', '-'];
        this.player2mapToCaptureRight = ['+', '-'];
        this.player2mapToCaptureLeft = ['-', '-'];
        this.player1mapToCaptureRight = ['-', '+'];
        this.player1mapToCaptureLeft = ['+', '+'];
        this.calcMethods = {
            "-": function (coordinate, number) {
                return coordinate - number;
            },
            "+": function (coordinate, number) {
                return +(coordinate) + number;
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
            results[coordinates[i]] = this.calcMethods[playerCoordinatesMap[i]](i % 2 === 0 ? x : y, 1)
        }
        return results;
    }

    canBeCaptured(x, y, mapToCapture) {

        let calcResults1 = this.calcCoordinates(x, y, this.coordinatesToCapture, mapToCapture);
        console.log(calcResults1)
        let cellToCapture = document.querySelector(`[data-cell-x='${calcResults1.cellX}'][data-cell-y='${calcResults1.cellY}']`);

        if (cellToCapture.dataset.occupied) {
            return false;
        }

        return cellToCapture;
    }

    selectPossibleCells(player, x, y) {

        this.y = y;
        this.x = x;
        let calcResults = this.calcCoordinates(x, y, this.coordinatesToMove, player === 'player1' ? this.player1CoordinatesMap : this.player2CoordinatesMap);

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
            console.log(`${player}: both cells are occupied.`);
            return;
        }

        if (this.rightCell.dataset.occupied) {
            console.log(`${player}: right cell is occupied.`)
            this.leftCell.className = 'selectedCell';
            return this.canBeCaptured(calcResults.rightCellX, calcResults.rightCellY, player === 'player1' ? this.player1mapToCaptureRight : this.player2mapToCaptureRight);
        }

        if (this.leftCell.dataset.occupied) {
            console.log(`${player}: left cell is occupied.`)
            this.rightCell.className = 'selectedCell';
            return this.canBeCaptured(calcResults.leftCellX, calcResults.leftCellY, player === 'player1' ? this.player1mapToCaptureLeft : this.player2mapToCaptureLeft);
        }

        this.rightCell.className = this.leftCell.className = 'selectedCell';
        console.log(`${player}: both cells are free.`);
        // return this.canBeCaptured(calcResults.rightCellX, calcResults.rightCellY, player === 'player1' ? this.player1CoordinatesMap : this.player2CoordinatesMap);
         return false;

    }

}
