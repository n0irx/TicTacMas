// board setting
let BLANK = new Image()
let BOARD_SIZE = 16;
let NOT_OCCUPIED = ' ';
let TIMUN_MAS = 'O';
let BUTO_IJO = 'X';

let board = new Array()
let choice;
let active_turn = "TIMUN_MAS";
let messages = ["Permainan belum selesai",
    "Permainan seri, Timun Mas belum bisa kabur dari Raksasa",
    "Selamat! Timun Mas berhasil kabur dari Raksasa",
    "HUAHAHAHA sayang sekali, Raksasa berhasil menangkap Timun Mas :("]

let timunMasImgPath = './images/O.png';
let butoIjoImgPath = './images/X.png';

let timunMasImg = new Image()
let butoIjoImg = new Image()

let blank_src = './images/blank.png'
let blank_on_hover_src = './images/blank2.png'

timunMasImg.src = timunMasImgPath;
butoIjoImg.src = butoIjoImgPath;


let params = (new URL(document.location)).searchParams;
let name = params.get('name');
let level = params.get('level');

var moveSound = new Audio('./music/soundeffects.wav')
var loseSound = new Audio('./music/lose.wav');
var tieSound = new Audio('./music/drawresult.wav')

function validTurn() {
    X_sum = 0
    O_sum = 0
    for(var i = 0; i < BOARD_SIZE; i++) {
        if(board[i] == 'X') {
            X_sum++;
        } else if (board[i] == "O"){
            O_sum++;
        }
    }
    isValid =  (X_sum + O_sum) % 2 == 0;
    return isValid
}

function newboard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = NOT_OCCUPIED;
        document.images[i].src = blank_src;

        tile = document.images[i];
        tile.onmouseover = function(){
            this.src = blank_on_hover_src;
            this.style.cursor="pointer";
        };
        tile.onmouseout = function(){
            this.src = blank_src;
            this.style.cursor="default";
        };
    }

    if (BOARD_SIZE == 16) {
        document.getElementById("size4").disabled = true;;
    }

    var turnInfo = document.getElementById("turnInfo");
    if (name === "butoIjo") {
        active_turn = "BUTO_IJO";
        turnInfo.innerHTML = "Raksasa sebagai pemain pertama yang jalan";
        setTimeout(moveButoIjo, 500);
    } else if (name === "timunMas") {
        active_turn = "TIMUN_MAS";
        turnInfo.innerHTML = 'Timun Mas sebagai pemain pertama yang jalan, monggo..';
    }
}

function makeMove(pieceMove) {

    if(!validTurn()) {
        return 
    }

    if (!isGameOver(board) && board[pieceMove] === NOT_OCCUPIED) {
        board[pieceMove] = TIMUN_MAS;
        document.images[pieceMove].src = timunMasImgPath;
        document.images[pieceMove].setAttribute("onmouseover", timunMasImgPath)
        document.images[pieceMove].setAttribute("onmouseout", timunMasImgPath)
        document.images[pieceMove].style.cursor="default";
        moveSound.play()

        if (!isGameOver(board)) {
            var alert = document.getElementById("turnInfo");
            active_turn = "BUTO_IJO";
            alert.innerHTML = "Giliran Raksasa mengejar"
            setTimeout(moveButoIjo, 500);
        }
    }
}

function moveButoIjo() {
    minimax(board, 0, -Infinity, +Infinity);
    var move = choice;
    board[move] = BUTO_IJO;
    document.images[move].src = butoIjoImgPath;
    document.images[move].setAttribute("onmouseover", butoIjoImgPath)
    document.images[move].setAttribute("onmouseout", butoIjoImgPath)
    document.images[move].style.cursor="default";
    choice = [];
    active_turn = "TIMUN_MAS"
    if (!isGameOver(board)) {
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "Giliran Timun Mas untuk kabur dari Raksasa, pikirkan strategi yang terbaik!";
    }
}

function gameScore(currentBoard, depth) {
    var score = checkWinningCondition(currentBoard);
    if (score === 1) {
        return 0;
    } else if (score === 2) {
        return depth - 10;
    } else if (score === 3) {
        return 10 - depth;
    } else {
        return 0;
    }
}

function minimax(node, depth, alpha, beta) {
    if (checkWinningCondition(node) === 1 ||
        checkWinningCondition(node) === 2 ||
        checkWinningCondition(node) === 3 ||
        depth === 6) {
        return gameScore(node, depth);
    }

    // the deeper the recursion, the higher the depths
    depth += 1;

    var availableMoves = getAvailableMoves(node);
    var move, result, possibleGameResult;
    if (active_turn === "BUTO_IJO") {
        for (var i = 0; i < availableMoves.length; i++) {
            move = availableMoves[i];
            possibleGameResult = getNewState(move, node);
            result = minimax(possibleGameResult, depth, alpha, beta);
            node = undoMove(node, move);
            if (result > alpha) {
                alpha = result
                if (depth === 1) {
                    choice = move
                }

                if(level === 'easy') choice = move

            } else if (alpha >= beta) {
                return alpha;
            }
        }
        return alpha;
    } else {
        for (var i = 0; i < availableMoves.length; i++) {
            move = availableMoves[i];
            possibleGameResult = getNewState(move, node);
            result = minimax(possibleGameResult, depth, alpha, beta);
            node = undoMove(node, move);
            if (result < beta) {
                beta = result
                if (depth === 1) {
                    choice = move
                }

                if(level === 'easy') choice = move

            } else if (beta <= alpha) {
                return beta;
            }
        }
        return beta;
    }
}

function undoMove(currentBoard, move) {
    currentBoard[move] = NOT_OCCUPIED;
    changeTurn();
    return currentBoard;
}

function getNewState(move, currentBoard) {
    var piece = changeTurn();
    currentBoard[move] = piece;
    return currentBoard;
}

function changeTurn() {
    var piece;
    if (active_turn === "BUTO_IJO") {
        piece = 'X';
        active_turn = "TIMUN_MAS";
    } else {
        piece = 'O';
        active_turn = 'BUTO_IJO';
    }
    return piece;
}

function getAvailableMoves(currentBoard) {
    var possibleMoves = new Array();
    for (var i = 0; i < BOARD_SIZE; i++) {
        if (currentBoard[i] === NOT_OCCUPIED) {
            possibleMoves.push(i);
        }
    }
    return possibleMoves;
}

// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if TIMUN MAS MENANG
//   3 if BUTO IJO MENANG
function checkWinningCondition(currentBoard) {

    // checking for horizontal wins
    for (i = 0; i <= 12; i += 4) {
        if (currentBoard[i] === TIMUN_MAS && currentBoard[i + 1] === TIMUN_MAS && currentBoard[i + 2] === TIMUN_MAS && currentBoard[i + 3] === TIMUN_MAS)
            return 2;
        if (currentBoard[i] === BUTO_IJO && currentBoard[i + 1] === BUTO_IJO && currentBoard[i + 2] === BUTO_IJO && currentBoard[i + 3] === BUTO_IJO)
            return 3;
    }

    // Check for vertical wins
    for (i = 0; i <= 3; i++) {
        if (currentBoard[i] === TIMUN_MAS && currentBoard[i + 4] === TIMUN_MAS && currentBoard[i + 8] === TIMUN_MAS && currentBoard[i + 12] === TIMUN_MAS)
            return 2;
        if (currentBoard[i] === BUTO_IJO && currentBoard[i + 4] === BUTO_IJO && currentBoard[i + 8] === BUTO_IJO && currentBoard[i + 12] === BUTO_IJO)
            return 3;
    }

    // Check for diagonal wins
    if ((currentBoard[0] === TIMUN_MAS && currentBoard[5] === TIMUN_MAS && currentBoard[10] === TIMUN_MAS && currentBoard[15] === TIMUN_MAS) ||
        (currentBoard[3] === TIMUN_MAS && currentBoard[6] === TIMUN_MAS && currentBoard[9] === TIMUN_MAS && currentBoard[12] === TIMUN_MAS))
        return 2;

    if ((currentBoard[0] === BUTO_IJO && currentBoard[5] === BUTO_IJO && currentBoard[10] === BUTO_IJO && currentBoard[15] === BUTO_IJO) ||
        (currentBoard[3] === BUTO_IJO && currentBoard[6] === BUTO_IJO && currentBoard[9] === BUTO_IJO && currentBoard[12] === BUTO_IJO))
        return 3;

    // Check for tie
    for (i = 0; i < BOARD_SIZE; i++) {
        if (currentBoard[i] !== TIMUN_MAS && currentBoard[i] !== BUTO_IJO)
            return 0;
    }
    return 1;
}

// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if TIMUN_MAS won
//   3 if BUTO_IJO won
function isGameOver(board) {
    if (checkWinningCondition(board) === 0) {
        return false
    } else if (checkWinningCondition(board) === 1) {
        var turnInfo = document.getElementById("turnInfo");
        tieSound.play();
        turnInfo.innerHTML = messages[1];
    } else if (checkWinningCondition(board) === 2) {
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[2];
    } else {
        var turnInfo = document.getElementById("turnInfo");
        loseSound.play();
        turnInfo.innerHTML = messages[3];
    }
    return true;
}