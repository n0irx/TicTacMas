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
                "Permainan seri, timun mas belum bisa kabur dari Buto Ijo",
                "Horeee!! Timun Mas berhasil kabur dari Buto Ijo",
                "HAHAHAHAHA!! sayang sekali, Buto Ijo berhasil menangkap Timun Mas"]

let timunMasImgPath = './images/O.png';
let butoIjoImgPath = './images/X.png';

let timunMasImg = new Image()
let butoIjoImg = new Image()

let blank_src = './images/blank.png'

timunMasImg.src = timunMasImgPath;
butoIjoImg.src = butoIjoImgPath;

function newboard() {
<<<<<<< HEAD
    for(let i = 0; i < BOARD_SIZE; i++) {
=======
    for (let i = 0; i < BOARD_SIZE; i++) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
        board[i] = NOT_OCCUPIED;
        document.images[i].src = blank_src;
    }

    var turnInfo = document.getElementById("turnInfo");
    active_turn = "TIMUN_MAS";
    turnInfo.innerHTML = 'Mongoooo.....';
}

function makeMove(pieceMove) {
<<<<<<< HEAD
    if(!isGameOver(board) && board[pieceMove] === NOT_OCCUPIED) {
        board[pieceMove] = TIMUN_MAS;
        document.images[pieceMove].src = timunMasImgPath;
        if(!isGameOver(board)) {
=======
    if (!isGameOver(board) && board[pieceMove] === NOT_OCCUPIED) {
        board[pieceMove] = TIMUN_MAS;
        document.images[pieceMove].src = timunMasImgPath;
        if (!isGameOver(board)) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
            var alert = document.getElementById("turnInfo");
            active_turn = "BUTO_IJO";
            alert.innerHTML = "Bagian Buto ijo Menyerang"
            moveButoIjo();
        }
    }
}

function moveButoIjo() {
    minimax(board, 0, -Infinity, +Infinity);
    var move = choice;
    board[move] = BUTO_IJO;
    document.images[move].src = butoIjoImgPath;
    choice = [];
    active_turn = "TIMUN_MAS"
<<<<<<< HEAD
    if(!isGameOver(board)) {
=======
    if (!isGameOver(board)) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "Timun mas, pikirkan strategi baik untuk kabur";
    }
}

function gameScore(currentBoard, depth) {
    var score = checkWinningCondition(currentBoard);
<<<<<<< HEAD
    if(score === 1) {
=======
    if (score === 1) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
        return 0;
    } else if (score === 2) {
        return depth - 10;
    } else if (score === 3) {
        return 10 - depth;
    }
}

function minimax(node, depth, alpha, beta) {
<<<<<<< HEAD
    if(checkWinningCondition(node) === 1 ||
        checkWinningCondition(node) === 2 ||
        checkWinningCondition(node) === 3)
    {
=======
    if (checkWinningCondition(node) === 1 ||
        checkWinningCondition(node) === 2 ||
        checkWinningCondition(node) === 3) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
        return gameScore(node, depth);
    }

    // the deeper the recursion, the higher the depths
    depth += 1;

    var availableMoves = getAvailableMoves(node);
    var move, result, possibleGameResult;
<<<<<<< HEAD
    if(active_turn === "BUTO_IJO") {
        for(var i = 0; i < availableMoves.length; i++) {
=======
    if (active_turn === "BUTO_IJO") {
        for (var i = 0; i < availableMoves.length; i++) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
            move = availableMoves[i];
            possibleGameResult = getNewState(move, node);
            result = minimax(possibleGameResult, depth, alpha, beta);
            node = undoMove(node, move);
<<<<<<< HEAD
            if(result > alpha) {
                alpha = result
                if(depth === 1) {
                    choice = move
                }
            } else if (alpha >= beta)  {
=======
            if (result > alpha) {
                alpha = result
                if (depth === 1) {
                    choice = move
                }
            } else if (alpha >= beta) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
                return alpha;
            }
        }
        return alpha;
    } else {
<<<<<<< HEAD
        for(var i = 0; i < availableMoves.length; i++) {
=======
        for (var i = 0; i < availableMoves.length; i++) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
            move = availableMoves[i];
            possibleGameResult = getNewState(move, node);
            result = minimax(possibleGameResult, depth, alpha, beta);
            node = undoMove(node, move);
<<<<<<< HEAD
            if(result < beta) {
                beta = result
                if(depth === 1) {
                    choice = move
                }
=======
            if (result < beta) {
                beta = result
                if (depth === 1) {
                    choice = move
                }
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
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
<<<<<<< HEAD
    if(active_turn === "BUTO_IJO") {
=======
    if (active_turn === "BUTO_IJO") {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
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
<<<<<<< HEAD
    for(var i=0; i < BOARD_SIZE; i++) {
        if(currentBoard[i] === NOT_OCCUPIED) {
=======
    for (var i = 0; i < BOARD_SIZE; i++) {
        if (currentBoard[i] === NOT_OCCUPIED) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
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
<<<<<<< HEAD
    for (i = 0; i <= 12; i += 4)
    {
=======
    for (i = 0; i <= 12; i += 4) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
        if (currentBoard[i] === TIMUN_MAS && currentBoard[i + 1] === TIMUN_MAS && currentBoard[i + 2] === TIMUN_MAS && currentBoard[i + 3] === TIMUN_MAS)
            return 2;
        if (currentBoard[i] === BUTO_IJO && currentBoard[i + 1] === BUTO_IJO && currentBoard[i + 2] === BUTO_IJO && currentBoard[i + 3] === BUTO_IJO)
            return 3;
    }

    // Check for vertical wins
<<<<<<< HEAD
    for (i = 0; i <= 3; i++)
    {
=======
    for (i = 0; i <= 3; i++) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
        if (currentBoard[i] === TIMUN_MAS && currentBoard[i + 4] === TIMUN_MAS && currentBoard[i + 8] === TIMUN_MAS && currentBoard[i + 12] === TIMUN_MAS)
            return 2;
        if (currentBoard[i] === BUTO_IJO && currentBoard[i + 4] === BUTO_IJO && currentBoard[i + 8] === BUTO_IJO && currentBoard[i + 12] === BUTO_IJO)
            return 3;
    }

    // Check for diagonal wins
    if ((currentBoard[0] === TIMUN_MAS && currentBoard[5] === TIMUN_MAS && currentBoard[10] === TIMUN_MAS && currentBoard[15] === TIMUN_MAS) ||
<<<<<<< HEAD
            (currentBoard[3] === TIMUN_MAS && currentBoard[6] === TIMUN_MAS && currentBoard[9] === TIMUN_MAS && currentBoard[12] === TIMUN_MAS))
        return 2;

    if ((currentBoard[0] === BUTO_IJO && currentBoard[5] === BUTO_IJO && currentBoard[10] === BUTO_IJO && currentBoard[15] === BUTO_IJO) ||
            (currentBoard[3] === BUTO_IJO && currentBoard[6] === BUTO_IJO && currentBoard[9] === BUTO_IJO && currentBoard[12] === BUTO_IJO))
        return 3;

    // Check for tie
    for (i = 0; i < BOARD_SIZE; i++)
    {
        if (currentBoard[i] !== TIMUN_MAS && currentBoard[i] !== BUTO_IJO)
            return 0;
    }
=======
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
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
    return 1;
}


// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if TIMUN_MAS won
//   3 if BUTO_IJO won
function isGameOver(board) {
<<<<<<< HEAD
    if(checkWinningCondition(board) === 0) {
        return false
    } else if(checkWinningCondition(board) === 1) {
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[1];
    } else if(checkWinningCondition(board) === 2) {
=======
    if (checkWinningCondition(board) === 0) {
        return false
    } else if (checkWinningCondition(board) === 1) {
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[1];
    } else if (checkWinningCondition(board) === 2) {
>>>>>>> c38c430abe0455f81321f5ae6665fcb670ce1925
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[2];
    } else {
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[3];
    }
    return true;
}