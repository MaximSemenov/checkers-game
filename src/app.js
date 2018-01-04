import Chessboard from './modules/board';
import Pieces from './modules/pieces';
import GameLogicCheckers from './modules/gameLogicCheckers';

const createdChessBoard = new Chessboard('chessBoard');
createdChessBoard.createChessBoard(0, 8);

// console.log (createdChessBoard)

const chessBoardWithPieses = new Pieces(createdChessBoard);
chessBoardWithPieses.setAllPieces();


const checkers = new GameLogicCheckers(chessBoardWithPieses);
// console.log (chessBoardWithPieses)

document.getElementById('chessBoard')
    .addEventListener('click', distributeLogic, false);


function distributeLogic(e) {

    const el = e.target;
    if (el.tagName !== 'DIV') {
        return;
    }
    el.classList.add('selectedPiece');

    if (this.selectedPiece) {
        this.selectedPiece.classList.remove('selectedPiece');
        if (this.selectedPiece === el) {
            this.selectedPiece = undefined;
            return;
        }
    }
    this.selectedPiece = el;



    let x = el.classList.contains('player1') ? checkers.selectPossibleCells(el, 'player1') : checkers.selectPossibleCells(el, 'player2')

    console.log(x)
}
