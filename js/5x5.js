let BLANK = new Image()
let BOARD_SIZE = 25;
let NOT_OCCUPIED = '0';
let BUTO_IJO = 'X';

let board = new Array();
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
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = NOT_OCCUPIED;
        document.images[i].src = blank_src;
    }
    var turnInfo = document.getElementById("turnInfo");
    active_turn = "TIMUN_MAS";
    turnInfo.innerHTML = 'Mongoooo.....';
}