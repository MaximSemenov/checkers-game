import Chessboard from './modules/board';
import Pieces from './modules/pieces';
import GameLogicCheckers from './modules/gameLogicCheckers';

const createdChessBoard = new Chessboard('chessBoard')
createdChessBoard.createChessBoard(0, 8);

// console.log (createdChessBoard)

const chessBoardWithPieses = new Pieces(createdChessBoard);
chessBoardWithPieses.setAllPieces();


const checkers = new GameLogicCheckers (chessBoardWithPieses);
// console.log (chessBoardWithPieses)




// console.log (createdChessBoard.chessBoard);

// this.createdChessBoard.addEventListener('click', () => alert ('helow'), false);
