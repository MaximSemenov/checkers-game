import Chessboard from './modules/board';
import Pieces from './modules/pieces';

const createdChessBoard = new Chessboard('chessBoard');
createdChessBoard.createChessBoard(0, 8);

const pieces = new Pieces(createdChessBoard, '#63381B', 'firebrick');
pieces.setAllPieces();

console.log (createdChessBoard.chessBoard);

