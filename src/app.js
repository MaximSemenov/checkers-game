import Chessboard from './modules/board';
import Pieces from './modules/pieces';
import gameLogic from './modules/gameLogic';

const createdChessBoard = new Chessboard('chessBoard')
createdChessBoard.createChessBoard(0, 8);



const pieces = new Pieces(createdChessBoard);
pieces.setAllPieces();

console.dir(pieces)


// console.log (createdChessBoard.chessBoard);

// this.createdChessBoard.addEventListener('click', () => alert ('helow'), false);
