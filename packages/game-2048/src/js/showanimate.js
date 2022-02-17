// JavaScript Document
function showNumberWithAnimation(i, j, randNumber) {
  const numberCell = $(`#number-cell-${i}-${j}`);
  // console.log(numberCell)
  numberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
  numberCell.css('font-size', `${getNumberFontSize(board[i][j])}px`);
  numberCell.css('color', getNumberColor(board[i][j]));
  numberCell.text(randNumber);

  numberCell.animate(
    {
      width: celllSideLength,
      height: celllSideLength,
      top: getPosTop(i, j),
      left: getPosLeft(i, j),
    },
    50,
  );
}

function showMoveAnimation(fromx, fromy, tox, toy) {
  const numberCell = $(`#number-cell-${fromx}-${fromy}`);
  numberCell.animate(
    {
      top: getPosTop(tox, toy),
      left: getPosLeft(tox, toy),
    },
    200,
  );
}

function updateScore() {
  $('#score').text(score);
}
