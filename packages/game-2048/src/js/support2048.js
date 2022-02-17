// JavaScript Document
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
celllSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i, j) {
  return cellSpace + i * (cellSpace + celllSideLength);
}

function getPosLeft(i, j) {
  return cellSpace + j * (cellSpace + celllSideLength);
}

function getNumberBackgroundColor(number) {
  switch (number) {
    case 2:
      return '#eee4da';
      break;
    case 4:
      return '#ede0c8';
      break;
    case 8:
      return '#f2b179';
      break;
    case 16:
      return '#f59563';
      break;
    case 32:
      return '#f67c5f';
      break;
    case 64:
      return '#f65e3b';
      break;
    case 128:
      return '#edcf72';
      break;
    case 256:
      return '#edcc61';
      break;
    case 512:
      return '#9c0';
      break;
    case 1024:
      return '#33b5e5';
      break;
    case 2048:
      return '#a6c';
      break;
    case 4096:
      return '#a6c';
      break;
    case 8192:
      return '#93c';
      break;
  }
  return 'black';
}
function getNumberFontSize(number) {
  const baseFontSize = 0.6 * celllSideLength;
  if (number < 1024) {
    return baseFontSize;
  }
  if ((`${number}`).length >= 5) {
    return baseFontSize / 2;
  }
  return baseFontSize / 1.4;
}

function getNumberColor(number) {
  if (number <= 4) {
    return '#776e65';
  }
  return 'white';
}
// 判断是否没有空间
function nospace(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        // console.log('has room')
        return false;
      }
    }
  }
  // console.log('no room')
  return true;
}
// 是否能向左移动，只用判断最右边的3列，下面函数同理
function canMoveLeft(board) {
  for (let i = 0; i < 4; i++) for (let j = 1; j < 4; j++) if (board[i][j] != 0) if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) return true;
  return false;
}

function canMoveRight(board) {
  for (let i = 0; i < 4; i++) for (let j = 2; j >= 0; j--) if (board[i][j] != 0) if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) return true;

  return false;
}

function canMoveUp(board) {
  for (let j = 0; j < 4; j++) for (let i = 1; i < 4; i++) if (board[i][j] != 0) if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) return true;

  return false;
}

function canMoveDown(board) {
  for (let j = 0; j < 4; j++) for (let i = 2; i >= 0; i--) if (board[i][j] != 0) if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) return true;

  return false;
}
// 判断水平方向上是否没有任何数字
function noBlockHorizontal(row, col1, col2, board) {
  for (let i = col1 + 1; i < col2; i++) if (board[row][i] != 0) {
    return false;
  }
  return true;
}

function noBlockVertical(col, row1, row2, board) {
  for (let i = row1 + 1; i < row2; i++) if (board[i][col] != 0) return false;
  return true;
}

// 是否任何方向都不能再移动了
function noMove(board) {
  if (
    canMoveLeft(board)
    || canMoveRight(board)
    || canMoveUp(board)
    || canMoveDown(board)
  ) {
    return false;
  }
  return true;
}
