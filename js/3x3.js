// board setting
let playerImg = new Image()
let aiImg = new Image()
let BLANK = new Image()
let board = new Array()

let BOARD_SIZE = 9;
let NOT_OCCUPIED = ' ';
let TIMUN_MAS = 'O';
let BUTO_IJO = 'X';

let active_turn = "TIMUNMAS";
let choice;
let searchTimes = new Array();

playerImg.src = './assets/images/O.png'
aiImg.src = './assets/images/X.png'
blank.src = './assets/images/blank.png'

function newGame() {
    for(let i = 0; i < BOARD_SIZE; i++) {
        board[i] = NOT_OCCUPIED;
        document.images[i].src = blank.src;
    }

    var turnInfo = document.getElementById("turnInfo");
    active_turn = "TIMUNMAS";
    alert.innerHTML = 'Mongoooo.....';
}