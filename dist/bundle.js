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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['', '', '', '', '', '', '', '', ''];

        _classCallCheck(this, Board);

        this.state = state;
    }

    _createClass(Board, [{
        key: 'printBoard',
        value: function printBoard() {
            var formattedString = '';
            this.state.forEach(function (cell, index) {
                formattedString += cell ? ' ' + cell + ' |' : '   |';
                if ((index + 1) % 3 == 0) {
                    formattedString = formattedString.slice(0, -1);
                    if (index < 8) formattedString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n';
                }
            });
            console.log('%c' + formattedString, 'color: #6d4e42;font-size:16px');
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.state.every(function (cell) {
                return !cell;
            });
        }
    }, {
        key: 'isFull',
        value: function isFull() {
            return this.state.every(function (cell) {
                return cell;
            });
        }
    }, {
        key: 'isTerminal',
        value: function isTerminal() {
            if (this.isEmpty()) return false;

            // 0 1 2
            // 3 4 5
            // 6 7 8

            // horizontal
            if (this.state[0] == this.state[1] && this.state[1] == this.state[2] && this.state[0]) {
                return { 'winner': this.state[0], 'direction': 'H', 'row': 1 };
            }
            if (this.state[3] == this.state[4] && this.state[4] == this.state[5] && this.state[3]) {
                return { 'winner': this.state[3], 'direction': 'H', 'row': 2 };
            }
            if (this.state[6] == this.state[7] && this.state[7] == this.state[8] && this.state[6]) {
                return { 'winner': this.state[6], 'direction': 'H', 'row': 3 };
            }

            //veritcal
            if (this.state[0] == this.state[3] && this.state[3] == this.state[6] && this.state[0]) {
                return { 'winner': this.state[0], 'direction': 'V', 'row': 1 };
            }
            if (this.state[1] == this.state[4] && this.state[4] == this.state[7] && this.state[1]) {
                return { 'winner': this.state[1], 'direction': 'V', 'row': 2 };
            }
            if (this.state[2] == this.state[5] && this.state[5] == this.state[8] && this.state[2]) {
                return { 'winner': this.state[2], 'direction': 'V', 'row': 3 };
            }

            //diagonal
            if (this.state[0] == this.state[4] && this.state[4] == this.state[8] && this.state[0]) {
                return { 'winner': this.state[0], 'direction': 'D', 'row': 1 };
            }
            if (this.state[2] == this.state[4] && this.state[4] == this.state[6] && this.state[2]) {
                return { 'winner': this.state[2], 'direction': 'D', 'row': 2 };
            }

            //If no winner but the board is full, then it's a draw
            if (this.isFull()) {
                return { 'winner': 'draw' };
            }

            return false;
        }
    }]);

    return Board;
}();

exports.default = Board;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Board = __webpack_require__(0);

var _Board2 = _interopRequireDefault(_Board);

__webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _Board2.default(['x', 'o', '', '', 'o', '', '', '', 'o']);
board.printBoard();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map