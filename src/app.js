import Chessboard from './modules/board';
import Pieces from './modules/pieces';

const generatedChessBoard = new Chessboard('chessBoard');
generatedChessBoard.setChessBoard(0, 8);

const chessBoardWithPieces = new Pieces(generatedChessBoard.chessBoard);



let piece = document.createElement('div');
// generatedChessBoard.chessBoard.rows[0].cells[0].appendChild(piece);

console.log(generatedChessBoard.chessBoard.rows[0].cells);
console.dir(generatedChessBoard.chessBoard.rows[0].cells);
console.log(generatedChessBoard.chessBoard.rows);
console.dir(generatedChessBoard.chessBoard.rows);
console.log(generatedChessBoard.chessBoard);
console.dir(generatedChessBoard.chessBoard);

console.log(document.getElementById('1'))

// let tr = document.getElementById('1');
// let tr2 = tr.getElementsByClassName('brown')

// for (let value of tr2){
//     console.log (value);
// }

console.log(document.querySelectorAll('#row0 td.brown, #row1 td.brown'))

let startPosition = document.querySelectorAll(`
#row0 td.brown,
#row1 td.brown,
#row2 td.brown,
#row5 td.brown,
#row6 td.brown,
#row7 td.brown`)

for (let brownCell of startPosition) {
    // let piece = document.createElement('div');
    brownCell.appendChild(document.createElement('div'));
}

