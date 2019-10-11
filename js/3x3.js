// board setting
let playerImg = new Image()
let aiImg = new Image()
let BLANK = new Image()
let board = new Array()

let BOARD_SIZE = 9;
let NOT_OCCUPIED = ' ';
let TIMUN_MAS = 'O';
let BUTO_IJO = 'X';

let messages = ["Permainan belum selesai", 
                "Permainan seri, timun mas belum bisa kabur dari Buto Ijo",
                "Horeee!! Timun Mas berhasil kabur dari Buto Ijo",
                "HAHAHAHAHA!! sayang sekali, Buto Ijo berhasil menangkap Timun Mas"]

let active_turn = "TIMUN_MAS";
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
    active_turn = "TIMUN_MAS";
    alert.innerHTML = 'Mongoooo.....';
}

// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if TIMUN MAS MENANG
//   3 if BUTO IJO MENANG
function checkWinningCondition(game) {

    // checking for horizontal conditions
    for(i = 0; i <= 6; i += 3) {
        if(game[i] === TIMUN_MAS && game[i+1] === TIMUN_MAS && game[i+2] === TIMUN_MAS) 
            return 2;
        if(game[i] === BUTO_IJO && game[i+1] === BUTO_IJO && game[i+2] === BUTO_IJO) 
            return 3;
    }

    // checking for vertical conditions
    for(i=0; i <= 2; i++) {
        if(game[i] === TIMUN_MAS && game[i+3] === TIMUN_MAS && game[i+6] === TIMUN_MAS) 
            return 2;
        
        if(game[i] === BUTO_IJO && game[i+1] === BUTO_IJO && game[i+2] === BUTO_IJO) 
            return 3;
    }


    // checking for diagonal condition
    if((game[0] === TIMUN_MAS && game[4] === TIMUN_MAS && game[8] === TIMUN_MAS) ||
            (game[2] === TIMUN_MAS && game[4] === TIMUN_MAS && game[6] === TIMUN_MAS))
        return 2;

    if((game[0] === BUTO_IJO && game[4] === BUTO_IJO && game[8] === BUTO_IJO) ||
            (game[2] === BUTO_IJO && game[4] === BUTO_IJO && game[6] === BUTO_IJO))
        return 3;

    for(i = 0; i < BOARD_SIZE; i++) {
        if(game[i] !== TIMUN_MAS && game[i] !== BUTO_IJO) {
            return 0;
        }
    }

    // it's a tie
    return 1;
}


// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if HUMAN_PLAYER won
//   3 if COMPUTER_PLAYER won
function gameOver(game) {
    if(checkWinningCondition(game) == 0) {
        return false 
    } else if(checkWinningCondition(game) == 1) {
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[1];
    } else if(checkWinningCondition(game) == 2) {
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[2];
    } else {
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[3];
    }
    return true;
}







