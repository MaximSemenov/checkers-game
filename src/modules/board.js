export default class Chessboard {

    constructor(boardId) {
        this.chessBoardTable = document.getElementById(boardId);
        this.counter = 0;
        this.myCell = {
            cell: null,
            class: null
        };



        // this.chessBoard.addEventListener('click', this.setByClick.bind(this), false);
        document.addEventListener('keydown', this.shiftCell.bind(this), false);
    }

    createChessBoard(number, condition) {

        let tr = document.createElement('tr');
        tr.id = 'row' + this.counter;
        this.chessBoardTable.appendChild(tr);

        let cellYNumber = 0;

        for (let i = number; i < condition; i++) {

            let cell = document.createElement('td');
            cell.setAttribute('data-cell-x', cellYNumber);
            cell.setAttribute('data-cell-y', this.counter);
            cell.textContent = `x ${cellYNumber} y ${this.counter}`;

            if (i % 2 === 0) {
                cell.className = 'white'
            }
            else {
                cell.className = 'brown'
            }

            tr.appendChild(cell);
            cellYNumber++;


        }


        if (this.counter !== 7) {

            this.counter++;
            this.counter % 2 === 1 ? this.createChessBoard(1, 9) : this.createChessBoard(0, 8);
        }

        return;

    };

    setByClick(e) {
        if (this.myCell.cell) {
            this.myCell.cell.className = this.myCell.class
        }

        this.myCell.cell = e.target;
        this.myCell.class = e.target.className;
        e.target.className = 'blue';

    }



    setByKeyBoard(element) {



        if (this.myCell.cell) { this.myCell.cell.className = this.myCell.class }

        this.myCell.cell = element;
        this.myCell.class = element.className;

        element.className = 'blue';


    }


    shiftCell(e) {

        // console.log(this)

        let x,
            y,
            keyCode;

        x = this.myCell.cell.dataset.cellX;
        y = this.myCell.cell.dataset.cellY;
        keyCode = e.keyCode;

        switch (keyCode) {

            case 37:
                this.goLeft(x, y);
                break;

            case 38:
                this.goUp(x, y);
                break;

            case 39:
                this.goRight(x, y);
                break;

            case 40:
                this.goDown(x, y);
                break;

        }

    }



    goUp(x, y) {

        if (y == 0) {
            return;
        }
        var newCell = document.querySelector(`[data-cell-x='${x}'][data-cell-y='${y - 1}']`);
        this.setByKeyBoard(newCell);
    }

    goLeft(x, y) {

        if (x == 0) {
            return;
        }
        var newCell = document.querySelector(`[data-cell-x='${x - 1}'][data-cell-y='${y}']`);
        this.setByKeyBoard(newCell);
    }

    goRight(x, y) {

        if (x == 7) {
            return;
        }
        var newCell = document.querySelector(`[data-cell-x='${+x + 1}'][data-cell-y='${y}']`);
        this.setByKeyBoard(newCell);
    }

    goDown(x, y) {
        if (y == 7) {
            return;
        }
        var newCell = document.querySelector(`[data-cell-x='${x}'][data-cell-y='${+y + 1}']`);
        this.setByKeyBoard(newCell);
    }





}
