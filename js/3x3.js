// board setting
let BLANK = new Image()
let BOARD_SIZE = 9;
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
    for(let i = 0; i < BOARD_SIZE; i++) {
        board[i] = NOT_OCCUPIED;
        document.images[i].src = blank_src;
    }

    var turnInfo = document.getElementById("turnInfo");
    active_turn = "TIMUN_MAS";
    turnInfo.innerHTML = 'Mongoooo.....';
}

function makeMove(pieceMove) {
    if(!isGameOver(board) && board[pieceMove] === NOT_OCCUPIED) {
        board[pieceMove] = TIMUN_MAS;
        document.images[pieceMove].src = timunMasImgPath;
        if(!isGameOver(board)) {
            var alert = document.getElementById("turnInfo");
            active_turn = "BUTO_IJO";
            alert.innerHTML = "Bagian Buto ijo Menyerang"
            moveButoIjo();
        }
    }
}

function moveButoIjo() {
    minimax(board, 0);
    var move = choice;
    board[move] = BUTO_IJO;
    document.images[move].src = butoIjoImgPath;
    choice = [];
    active_turn = "TIMUN_MAS"
    if(!isGameOver(board)) {
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "Timun mas, pikirkan strategi baik untuk kabur";
    }
}

function gameScore(currentBoard, depth) {
    var score = checkWinningCondition(currentBoard);
    if(score === 1) {
        return 0;
    } else if (score === 2) {
        return depth - 10;
    } else if (score === 3) {
        return 10 - depth;
    }
}

function minimax(node, depth) {
    if(checkWinningCondition(node) === 1 ||
        checkWinningCondition(node) === 2 ||
        checkWinningCondition(node) === 3)
    {
        return gameScore(node, depth);
    }

    // the deeper the recursion, the higher the depths
    depth += 1;

    moves = []
    scores = []

    var availableMoves = getAvailableMoves(node);
    var move, result, possibleGameResult;
    if(active_turn === "BUTO_IJO") {
        for(var i = 0; i < availableMoves.length; i++) {
            move = availableMoves[i];
            possibleGameResult = getNewState(move, node);
            result = minimax(possibleGameResult, depth);

            scores.push(result)
            moves.push(move)

            node = undoMove(node, move);

            choice = moves[scores.indexOf(Math.min(...scores))]
        }
        return result;
    } else {
        for(var i = 0; i < availableMoves.length; i++) {
            move = availableMoves[i];
            possibleGameResult = getNewState(move, node);
            result = minimax(possibleGameResult, depth);

            scores.push(result)
            moves.push(move)

            node = undoMove(node, move);

            choice = moves[scores.indexOf(Math.min(...scores))]
        }
        return result;
    }
}

function undoMove(currentBoard, move) {
    currentBoard[move] = NOT_OCCUPIED;
    changeTurn();
    return currentBoard;
}

function getNewState(move, board) {
    var piece = changeTurn();
    board[move] = piece;
    return board;
}

function changeTurn() {
    var piece;
    if(active_turn == "COMPUTER") {
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
    for(var i=0; i < BOARD_SIZE; i++) {
        if(currentBoard[i] == NOT_OCCUPIED) {
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

    // checking for horizontal conditions
    for(i = 0; i <= 6; i += 3) {
        if(currentBoard[i] === TIMUN_MAS && currentBoard[i+1] === TIMUN_MAS && currentBoard[i+2] === TIMUN_MAS)
            return 2;
        if(currentBoard[i] === BUTO_IJO && currentBoard[i+1] === BUTO_IJO && currentBoard[i+2] === BUTO_IJO)
            return 3;
    }

    // checking for vertical conditions
    for(i=0; i <= 2; i++) {
        if(currentBoard[i] === TIMUN_MAS && currentBoard[i+3] === TIMUN_MAS && currentBoard[i+6] === TIMUN_MAS)
            return 2;

        if(currentBoard[i] === BUTO_IJO && currentBoard[i+3] === BUTO_IJO && currentBoard[i+6] === BUTO_IJO)
            return 3;
    }


    // checking for diagonal condition
    if((currentBoard[0] === TIMUN_MAS && currentBoard[4] === TIMUN_MAS && currentBoard[8] === TIMUN_MAS) ||
            (currentBoard[2] === TIMUN_MAS && currentBoard[4] === TIMUN_MAS && currentBoard[6] === TIMUN_MAS))
        return 2;

    if((currentBoard[0] === BUTO_IJO && currentBoard[4] === BUTO_IJO && currentBoard[8] === BUTO_IJO) ||
            (currentBoard[2] === BUTO_IJO && currentBoard[4] === BUTO_IJO && currentBoard[6] === BUTO_IJO))
        return 3;

    for(i = 0; i < BOARD_SIZE; i++) {
        if(currentBoard[i] !== TIMUN_MAS && currentBoard[i] !== BUTO_IJO) {
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
function isGameOver(board) {
    if(checkWinningCondition(board) == 0) {
        return false
    } else if(checkWinningCondition(board) == 1) {
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[1];
    } else if(checkWinningCondition(board) == 2) {
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[2];
    } else {
        var turnInfo = document.getElementById("turnInfo");
        turnInfo.innerHTML = messages[3];
    }
    return true;
}







