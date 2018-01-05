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

var _gameLogicCheckers = __webpack_require__(4);

var _gameLogicCheckers2 = _interopRequireDefault(_gameLogicCheckers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createdChessBoard = new _board2.default('chessBoard');
createdChessBoard.createChessBoard(0, 8);

// console.log (createdChessBoard)

var chessBoardWithPieses = new _pieces2.default(createdChessBoard);
chessBoardWithPieses.setAllPieces();

var checkers = new _gameLogicCheckers2.default(chessBoardWithPieses);
// console.log (chessBoardWithPieses)

document.getElementById('chessBoard').addEventListener('click', distributeLogic, false);

function distributeLogic(e) {

    var el = e.target;
    if (el.tagName !== 'DIV') {
        return;
    }
    el.classList.add('selectedPiece');

    if (this.selectedPiece) {
        this.selectedPiece.classList.remove('selectedPiece');
        checkers.rightCell.className = 'brown';
        checkers.leftCell.className = 'brown';
        if (this.selectedPiece === el) {
            this.selectedPiece = undefined;
            return;
        }
    }
    this.selectedPiece = el;

    var x = el.classList.contains('player1') ? checkers.selectPossibleCells(el, 'player1') : checkers.selectPossibleCells(el, 'player2');

    // console.log(x)
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
/* 3 */,
/* 4 */
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
    }

    _createClass(GameLogicCheckers, [{
        key: 'selectPossibleCells',
        value: function selectPossibleCells(pieceElement, player) {

            var y = pieceElement.parentElement.dataset.cellY,
                x = pieceElement.parentElement.dataset.cellX;

            if (player === 'player1') {

                this.rightCell = document.querySelector('[data-cell-x=\'' + (x - 1) + '\'][data-cell-y=\'' + (+y + 1) + '\']');
                this.leftCell = document.querySelector('[data-cell-x=\'' + (+x + 1) + '\'][data-cell-y=\'' + (+y + 1) + '\']');

                if (this.rightCell.dataset.occupied && this.leftCell.dataset.occupied) {
                    this.rightCell = this.leftCell = null;
                    return "both cells are occupied";
                }

                this.rightCell.className = this.leftCell.className = 'selectedCell';
                return;
            }
            this.rightCell = document.querySelector('[data-cell-x=\'' + (x - 1) + '\'][data-cell-y=\'' + (y - 1) + '\']');

            this.leftCell = document.querySelector('[data-cell-x=\'' + (+x + 1) + '\'][data-cell-y=\'' + (y - 1) + '\']');

            if (this.rightCell.dataset.occupied && this.leftCell.dataset.occupied) {
                this.rightCell = this.leftCell = null;
                return "both cells are occupied";
            }

            this.rightCell.className = this.leftCell.className = 'selectedCell';
        }
    }]);

    return GameLogicCheckers;
}();

exports.default = GameLogicCheckers;

/***/ })
/******/ ]);