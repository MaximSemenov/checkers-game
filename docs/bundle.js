/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

var _pieces = __webpack_require__(2);

var _pieces2 = _interopRequireDefault(_pieces);

var _gameLogicCheckers = __webpack_require__(3);

var _gameLogicCheckers2 = _interopRequireDefault(_gameLogicCheckers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createdChessBoard = new _board2.default('chessBoard');
createdChessBoard.createChessBoard(0, 8);

var chessBoardWithPieses = new _pieces2.default(createdChessBoard);
chessBoardWithPieses.setAllPieces();

var checkers = new _gameLogicCheckers2.default(chessBoardWithPieses);

document.getElementById('chessBoard').addEventListener('click', distributeLogic, false);

function distributeLogic(e) {

    var el = e.target;

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
        el.className = 'brown';
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

    var y = el.parentElement.dataset.cellY,
        x = el.parentElement.dataset.cellX,
        capturableCell = el.classList.contains('player1') ? checkers.selectPossibleCells('player1', x, y) : checkers.selectPossibleCells('player2', x, y);

    // console.log(`return from 'selectPossibleCells' function: ` + capturable);

    if (capturableCell) {
        capturableCell.className = 'selectedCell';
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chessboard = function () {
    function Chessboard(boardId) {
        _classCallCheck(this, Chessboard);

        this.chessBoardTable = document.getElementById(boardId);
        this.counter = 0;
        this.myCell = {
            cell: null,
            class: null
        };

        // this.chessBoard.addEventListener('click', this.setByClick.bind(this), false);
        document.addEventListener('keydown', this.shiftCell.bind(this), false);
    }

    _createClass(Chessboard, [{
        key: 'createChessBoard',
        value: function createChessBoard(number, condition) {

            var tr = document.createElement('tr');
            tr.id = 'row' + this.counter;
            this.chessBoardTable.appendChild(tr);

            var cellYNumber = 0;

            for (var i = number; i < condition; i++) {

                var cell = document.createElement('td');
                cell.setAttribute('data-cell-x', cellYNumber);
                cell.setAttribute('data-cell-y', this.counter);
                // cell.textContent = `x ${cellYNumber} y ${this.counter}`;

                if (i % 2 === 0) {
                    cell.className = 'white';
                } else {
                    cell.className = 'brown';
                }

                tr.appendChild(cell);
                cellYNumber++;
            }

            if (this.counter !== 7) {

                this.counter++;
                this.counter % 2 === 1 ? this.createChessBoard(1, 9) : this.createChessBoard(0, 8);
            }

            return;
        }
    }, {
        key: 'setByClick',
        value: function setByClick(e) {
            if (this.myCell.cell) {
                this.myCell.cell.className = this.myCell.class;
            }

            this.myCell.cell = e.target;
            this.myCell.class = e.target.className;
            e.target.className = 'blue';
        }
    }, {
        key: 'setByKeyBoard',
        value: function setByKeyBoard(element) {

            if (this.myCell.cell) {
                this.myCell.cell.className = this.myCell.class;
            }

            this.myCell.cell = element;
            this.myCell.class = element.className;

            element.className = 'blue';
        }
    }, {
        key: 'shiftCell',
        value: function shiftCell(e) {

            // console.log(this)

            var x = void 0,
                y = void 0,
                keyCode = void 0;

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
    }, {
        key: 'goUp',
        value: function goUp(x, y) {

            if (y == 0) {
                return;
            }
            var newCell = document.querySelector('[data-cell-x=\'' + x + '\'][data-cell-y=\'' + (y - 1) + '\']');
            this.setByKeyBoard(newCell);
        }
    }, {
        key: 'goLeft',
        value: function goLeft(x, y) {

            if (x == 0) {
                return;
            }
            var newCell = document.querySelector('[data-cell-x=\'' + (x - 1) + '\'][data-cell-y=\'' + y + '\']');
            this.setByKeyBoard(newCell);
        }
    }, {
        key: 'goRight',
        value: function goRight(x, y) {

            if (x == 7) {
                return;
            }
            var newCell = document.querySelector('[data-cell-x=\'' + (+x + 1) + '\'][data-cell-y=\'' + y + '\']');
            this.setByKeyBoard(newCell);
        }
    }, {
        key: 'goDown',
        value: function goDown(x, y) {
            if (y == 7) {
                return;
            }
            var newCell = document.querySelector('[data-cell-x=\'' + x + '\'][data-cell-y=\'' + (+y + 1) + '\']');
            this.setByKeyBoard(newCell);
        }
    }]);

    return Chessboard;
}();

exports.default = Chessboard;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pieces = function () {
    function Pieces(createdChessBoard) {
        _classCallCheck(this, Pieces);

        // this.chessBoardWithPieces = createdChessBoard.chessBoardTable;
        this.chessBoardWithPieces = createdChessBoard;
    }

    _createClass(Pieces, [{
        key: 'setAllPieces',
        value: function setAllPieces() {
            var setPositions = chessBoard.querySelectorAll('\n    #row0 td.brown,\n    #row1 td.brown,\n    #row2 td.brown,\n    #row5 td.brown,\n    #row6 td.brown,\n    #row7 td.brown');

            var className = 'player1';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = setPositions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cell = _step.value;

                    cell.setAttribute('data-occupied', 'true');
                    if (cell === setPositions[12]) {
                        className = 'player2';
                    }
                    cell.appendChild(document.createElement('div')).classList.add(className);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return Pieces;
}();

exports.default = Pieces;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameLogicCheckers = function () {
    function GameLogicCheckers(chessBoardWithPieces) {
        _classCallCheck(this, GameLogicCheckers);

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
            "-": function _(coordinate, number) {
                return coordinate - number;
            },
            "+": function _(coordinate, number) {
                return +coordinate + number;
            }
        };
    }

    _createClass(GameLogicCheckers, [{
        key: 'movePiece',
        value: function movePiece(cell, piece) {

            var parent = piece.parentElement;
            parent.removeChild(piece);
            parent.setAttribute('data-occupied', '');
            piece.classList.remove('selectedPiece');
            cell.appendChild(document.createElement('div')).classList.add(piece.className);
            cell.setAttribute('data-occupied', 'true');
        }
    }, {
        key: 'calcCoordinates',
        value: function calcCoordinates(x, y, coordinates, playerCoordinatesMap) {

            var results = {},
                i;
            for (i = 0; i < coordinates.length; i++) {
                results[coordinates[i]] = this.calcMethods[playerCoordinatesMap[i]](i % 2 === 0 ? x : y, 1);
            }
            return results;
        }
    }, {
        key: 'canBeCaptured',
        value: function canBeCaptured(x, y, mapToCapture) {

            var calcResults1 = this.calcCoordinates(x, y, this.coordinatesToCapture, mapToCapture);
            console.log(calcResults1);
            var cellToCapture = document.querySelector('[data-cell-x=\'' + calcResults1.cellX + '\'][data-cell-y=\'' + calcResults1.cellY + '\']');

            if (cellToCapture.dataset.occupied) {
                return false;
            }

            return cellToCapture;
        }
    }, {
        key: 'getCell',
        value: function getCell(x, y, player, cell) {}
    }, {
        key: 'selectPossibleCells',
        value: function selectPossibleCells(player, x, y) {

            this.y = y;
            this.x = x;
            var calcResults = this.calcCoordinates(x, y, this.coordinatesToMove, player === 'player1' ? this.player1CoordinatesMap : this.player2CoordinatesMap);

            this.rightCell = document.querySelector('[data-cell-x=\'' + calcResults.rightCellX + '\'][data-cell-y=\'' + calcResults.rightCellY + '\']');
            this.leftCell = document.querySelector('[data-cell-x=\'' + calcResults.leftCellX + '\'][data-cell-y=\'' + calcResults.leftCellY + '\']');

            if (this.x == 0) {

                player === 'player1' ? this.rightCell = this.leftCell : this.leftCell = this.rightCell;
            }

            if (this.x == 7) {

                player === 'player1' ? this.leftCell = this.rightCell : this.rightCell = this.leftCell;
            }

            if (this.rightCell.dataset.occupied && this.leftCell.dataset.occupied) {
                console.log(player + ': both cells are occupied.');
                return;
            }

            if (this.rightCell.dataset.occupied) {
                console.log(player + ': right cell is occupied.');
                this.leftCell.className = 'selectedCell';
                return this.canBeCaptured(calcResults.rightCellX, calcResults.rightCellY, player === 'player1' ? this.player1mapToCaptureRight : this.player2mapToCaptureRight);
            }

            if (this.leftCell.dataset.occupied) {
                console.log(player + ': left cell is occupied.');
                this.rightCell.className = 'selectedCell';
                return this.canBeCaptured(calcResults.leftCellX, calcResults.leftCellY, player === 'player1' ? this.player1mapToCaptureLeft : this.player2mapToCaptureLeft);
            }

            this.rightCell.className = this.leftCell.className = 'selectedCell';
            console.log(player + ': both cells are free.');
            // return this.canBeCaptured(calcResults.rightCellX, calcResults.rightCellY, player === 'player1' ? this.player1CoordinatesMap : this.player2CoordinatesMap);
            return false;
        }
    }]);

    return GameLogicCheckers;
}();

exports.default = GameLogicCheckers;

/***/ })
/******/ ]);