// JavaScript Document
let score = 0;
const board = new Array();
const hasConflicted = new Array(); // 保证同一行或同一列只加一次，比如2 2 2 2 => 4 4

let startx = 0;
let starty = 0;
let endx = 0;
let endy = 0;

// window.addEventListener('touchStart', () => {
// }, { passive: false })
// document.addEventListener(
// "touchmove",
// function (e) {
//     e.preventDefault();
// },
// { passive: false }
// );

$(document).ready(() => {
  prepareForMobile();

  newGame();

  const container = document.getElementById('grid-container');
  container.addEventListener('touchstart', onTouchStart, { passive: false });
  container.addEventListener('touchend', onTouchEnd, { passive: false });
});

// 关系：celllSideLength * 4 + cellSpace * 5 = gridContainerWidth
function prepareForMobile() {
  if (documentWidth > 500) {
    gridContainerWidth = 500;
    cellSpace = 20;
    celllSideLength = 100;
  }

  // console.log(gridContainerWidth, cellSpace, celllSideLength);

  $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
  $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
  $('#grid-container').css('padding', cellSpace);
  $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

  $('.grid-cell').css('width', celllSideLength);
  $('.grid-cell').css('height', celllSideLength);
  // $(".grid-cell").css("border-radius", 0.02 * celllSideLength);
}

function newGame() { // 初始化棋盘
  init();
  // 在随机两个格子上生成数字
  generateOneNumber();
  generateOneNumber();
}

function init() {
  for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
    const gridCell = $(`#grid-cell-${i}-${j}`);

    gridCell.css('top', getPosTop(i, j));
    gridCell.css('left', getPosLeft(i, j));
  }


  for (var i = 0; i < 4; i++) {
    board[i] = new Array(); // 一维变二维
    hasConflicted[i] = new Array();
    for (var j = 0; j < 4; j++) board[i][j] = 0;


    hasConflicted[i][j] = false;
  }
  // console.log(board, hasConflicted);
  updateBoardView();

  score = 0;
}

function updateBoardView() {
  $('.number-cell').remove();
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    $('#grid-container').append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`);
    const theNumberCell = $(`#number-cell-${i}-${j}`);
    if (board[i][j] == 0) {
      theNumberCell.css('width', '0px');
      theNumberCell.css('height', '0px');
      theNumberCell.css('top', getPosTop(i, j) + celllSideLength / 2);
      theNumberCell.css('left', getPosLeft(i, j) + celllSideLength / 2);
    } else {
      theNumberCell.css('width', celllSideLength);
      theNumberCell.css('height', celllSideLength);
      theNumberCell.css('top', getPosTop(i, j));
      theNumberCell.css('left', getPosLeft(i, j));
      theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
      const fontSize = getNumberFontSize(board[i][j]);

      theNumberCell.css('font-size', `${fontSize}px`);

      theNumberCell.css('color', getNumberColor(board[i][j]));
      theNumberCell.text(board[i][j]);
    } hasConflicted[i][j] = false;
  }


  $('.number-cell').css('line-height', `${celllSideLength}px`);
  // $(".number-cell").css("font-size", 0.6 * celllSideLength + "px");
}
function generateOneNumber() {
  if (nospace(board)) {
    return false;
  }
  // 随机一个位置
  var randx = parseInt(Math.floor(Math.random() * 4));
  var randy = parseInt(Math.floor(Math.random() * 4));

  let times = 0;
  while (times < 50) {
    if (board[randx][randy] == 0) break;


    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    times += 1;
  }
  if (times == 50) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] == 0) {
          randx = i;
          randy = i;
        }
      }
    }
  }

  // 随机一个数字
  const randNumber = Math.random() < 0.5 ? 2 : 4;

  // 在随机位置显示随机数字
  board[randx][randy] = randNumber;
  showNumberWithAnimation(randx, randy, randNumber);
  // console.log(randx, randy, board, randNumber);
  return true;
}

// 发生移动，才会产生新的块，比如把数字移动到空位置，或者发生了加和
$(document).keydown((event) => {
  switch (event.keyCode) { // left top right down
    case 37:
      event.preventDefault(); // 阻挡滚动条

      if (moveLeft()) {
        setTimeout('generateOneNumber()', 210);
        setTimeout('isGameOver()', 300);
      }
      break;
    case 38:
      event.preventDefault(); // 阻挡滚动条

      if (moveUp()) {
        setTimeout('generateOneNumber()', 210);
        setTimeout('isGameOver()', 300);
      }
      break;
    case 39:
      event.preventDefault(); // 阻挡滚动条

      if (moveRight()) {
        setTimeout('generateOneNumber()', 210);
        setTimeout('isGameOver()', 300);
      }
      break;
    case 40:
      event.preventDefault(); // 阻挡滚动条

      if (moveDown()) {
        setTimeout('generateOneNumber()', 210);
        setTimeout('isGameOver()', 300);
      }
      break;
    default:
      break;
  }
});

function onTouchStart(event) {
  event.preventDefault();
  startx = event.touches[0].pageX;
  starty = event.touches[0].pageY;
}

function getAngle(angx, angy) {
  return (Math.atan2(angy, angx) * 180) / Math.PI;
}

function onTouchEnd(event) {
  event.preventDefault();
  endx = event.changedTouches[0].pageX;
  endy = event.changedTouches[0].pageY;

  const angx = endx - startx;
  const angy = endy - starty;
  let result = 0;

  // 如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    return;
  }

  const angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
    result = 1;
  } else if (angle > 45 && angle < 135) {
    result = 2;
  } else if ((angle >= 135 && angle <= 180)
    || (angle >= -180 && angle < -135)
  ) {
    result = 3;
  } else if (angle >= -45 && angle <= 45) {
    result = 4;
  }
  if (! result) return;


  if (result === 4) { // 右
    if (moveRight()) {
      setTimeout('generateOneNumber()', 210);
      setTimeout('isGameOver()', 300);
    }
  } else if (result === 3) { // 左
    if (moveLeft()) {
      setTimeout('generateOneNumber()', 210);
      setTimeout('isGameOver()', 300);
    }
  } else if (result === 2) { // 下
    if (moveDown()) {
      setTimeout('generateOneNumber()', 210);
      setTimeout('isGameOver()', 300);
    }
  } else { // 上
    if (moveUp()) {
      setTimeout('generateOneNumber()', 210);
      setTimeout('isGameOver()', 300);
    }
  }
}

function isGameOver() {
  if (nospace(board) && noMove(board)) {
    gameOver();
  }
}

function gameOver() {
  alert('Game Over!');
}

// 每个数字只会加一次，如2 2 2 2 => 4 4
function moveLeft() {
  if (!canMoveLeft(board)) {
    return false;
  }

  for (let i = 0; i < 4; i++) for (let j = 1; j < 4; j++) if (board[i][j] != 0) {
    for (let k = 0; k < j; k++) {
      if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
        showMoveAnimation(i, j, i, k);
        board[i][k] = board[i][j];
        board[i][j] = 0;
        continue;
        // move
      } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && ! hasConflicted[i][k]) {
        // move
        // add
        showMoveAnimation(i, j, i, k);
        board[i][k] += board[i][j];
        board[i][j] = 0;

        score += board[i][k];
        updateScore(score);

        hasConflicted[i][k] = true;

        continue;
      }
    }
  }


  setTimeout('updateBoardView()', 200);
  return true;
}

function moveRight() {
  if (!canMoveRight(board)) return false;


  // moveRight
  for (let i = 0; i < 4; i++) for (let j = 2; j >= 0; j--) {
    if (board[i][j] != 0) {
      for (let k = 3; k > j; k--) {
        if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
          showMoveAnimation(i, j, i, k);
          board[i][k] = board[i][j];
          board[i][j] = 0;
          continue;
        } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && ! hasConflicted[i][k]) {
          showMoveAnimation(i, j, i, k);
          board[i][k] *= 2;
          board[i][j] = 0;

          score += board[i][k];
          updateScore(score);

          hasConflicted[i][k] = true;
          continue;
        }
      }
    }
  }


  setTimeout('updateBoardView()', 200);
  return true;
}

function moveUp() {
  if (!canMoveUp(board)) return false;


  // moveUp
  for (let j = 0; j < 4; j++) for (let i = 1; i < 4; i++) {
    if (board[i][j] != 0) {
      for (let k = 0; k < i; k++) {
        if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
          showMoveAnimation(i, j, k, j);
          board[k][j] = board[i][j];
          board[i][j] = 0;
          continue;
        } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && ! hasConflicted[k][j]) {
          showMoveAnimation(i, j, k, j);
          board[k][j] *= 2;
          board[i][j] = 0;

          score += board[k][j];
          updateScore(score);

          hasConflicted[k][j] = true;

          continue;
        }
      }
    }
  }


  setTimeout('updateBoardView()', 200);
  return true;
}

function moveDown() {
  if (!canMoveDown(board)) return false;


  // moveDown
  for (let j = 0; j < 4; j++) for (let i = 2; i >= 0; i--) {
    if (board[i][j] != 0) {
      for (let k = 3; k > i; k--) {
        if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
          showMoveAnimation(i, j, k, j);
          board[k][j] = board[i][j];
          board[i][j] = 0;
          continue;
        } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && ! hasConflicted[k][j]) {
          showMoveAnimation(i, j, k, j);
          board[k][j] *= 2;
          board[i][j] = 0;

          score += board[k][j];
          updateScore(score);

          hasConflicted[k][j] = true;

          continue;
        }
      }
    }
  }


  setTimeout('updateBoardView()', 200);
  return true;
}
