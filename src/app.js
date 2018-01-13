import Chessboard from './modules/board';
import Pieces from './modules/pieces';
import GameLogicCheckers from './modules/gameLogicCheckers';

const createdChessBoard = new Chessboard('chessBoard');
createdChessBoard.createChessBoard(0, 8);


const chessBoardWithPieses = new Pieces(createdChessBoard);
chessBoardWithPieses.setAllPieces();

const checkers = new GameLogicCheckers(chessBoardWithPieses);

document.getElementById('chessBoard')
    .addEventListener('click', distributeLogic, false);


function distributeLogic(e) {


    const el = e.target;

    // if (el.tagName !== 'DIV') {
    if (el.tagName !== 'DIV' && el.className !== 'selectedCell') {
        return;
    }

    if (el.className === 'selectedCell') {

        checkers.movePiece(el, this.selectedPiece);
        if (checkers.rightCell) {
            checkers.rightCell.className = 'brown';
        }
        if (checkers.leftCell) {
            checkers.leftCell.className = 'brown';
        }
        return;

    }

    if (this.selectedPiece === el) {
        el.classList.remove('selectedPiece');
        this.selectedPiece = undefined;
        checkers.rightCell.className = 'brown';
        checkers.leftCell.className = 'brown';
        return;
    }

    el.classList.add('selectedPiece');



    if (this.selectedPiece) {
        this.selectedPiece.classList.remove('selectedPiece');
        checkers.rightCell.className = 'brown';
        checkers.leftCell.className = 'brown';
    }

    this.selectedPiece = el;

    let y = el.parentElement.dataset.cellY,
        x = el.parentElement.dataset.cellX,
        capturable = el.classList.contains('player1') ? checkers.selectPossibleCells('player1', x, y) : checkers.selectPossibleCells('player2', x, y);

    console.log(`return from 'selectPossibleCells' function: ` + capturable);

    if (capturable) {
        checkers.selectPossibleCells('player2', eatable.dataset.cellX, eatable.dataset.cellY);
    }
}

