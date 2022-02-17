var WINDOW_WIDTH = document.documentElement.clientWidth
var WINDOW_HEIGHT = document.documentElement.clientHeight
var chooseEle = document.getElementById('choose')
var pauseEle = document.getElementById('pause')
var resetEle = document.getElementById('reset')
chooseEle.addEventListener('click', onSelectLevel)
pauseEle.addEventListener('click', onStart)
resetEle.addEventListener('click', resetGame)

var totalNum = 9  // 3 * 3 or 4 * 4 or 5 * 5
var getBoundary = function () {
  return Math.sqrt(totalNum)
}
// 每个小div的边长
var getEachWidth = function () {
  return Math.min(450 / getBoundary(), ~~(WINDOW_WIDTH - 20) / getBoundary())
}

var time = 0; //保存定时时间
var pause = true; //设置是否暂停标志，true表示暂停
var set_timer; //设置定时函数
var d = new Array(10); //保存大DIV当前装的小DIV的编号
var successOnce = false // 成功过

/**
 * 获得可以去的位置
 * 为了逻辑更简单，第一个元素我们不用，我们从下标1开始使用, 大DIV编号为1的DIV可以去的位置，比如第一块可以去2,4号位置
 */
function getDirect() {
  var boundary = getBoundary()
  let aa = []
  let count = 1
  for (let i = 0; i < boundary; i++) {
    let temp = []
    for (let j = 0; j < boundary; j++) {
      temp.push(count++)
    }
    aa.push(temp)
  }

  let res = [[0]]
  for (let i = 0; i < boundary; i++) {
    for (let j = 0; j < boundary; j++) {
      let temp = []
      if (i - 1 >= 0) temp.push(aa[i - 1][j])
      if (i + 1 < boundary) temp.push(aa[i + 1][j])
      if (j - 1 >= 0) temp.push(aa[i][j - 1])
      if (j + 1 < boundary) temp.push(aa[i][j + 1])
      res.push(temp)
    }
  }
  // console.log(res, aa)
  return res
}

/**
 * 获取大DIV的left、top值
 * 保存大DIV编号的可移动位置编号, 同样，我们不使用第一个元素, 第一个表示left,第二个表示top，比如第一块的位置为left:0px,top:0px
 */
function getPosXY() {

  let temp = [[0]]
  var boundary = getBoundary()
  var eachWidth = getEachWidth()
  for (var i = 0; i < boundary; i++) {
    for (var j = 0; j < boundary; j++) {
      temp.push([eachWidth * j, eachWidth * i])
    }
  }
  // console.log(temp)
  return temp
}

//大DIV编号的位置, 默认按照顺序排好，大DIV第九块没有，所以为0，我们用0表示空白块
function resetDiv() {
  d = []
  for (var i = 1; i < totalNum + 1; i++) {
    d[i] = i
  }
  // console.log(d)
  initCss()
}

function initCss() {
  var oGame = document.getElementById('game')
  var eachWidth = getEachWidth()

  var eleStr = ''
  for (var i = 1; i < totalNum; i++) {
    eleStr += `<div id="d${i}" onclick="move(${i})"><span class="font">${i}</span></div>`
  }
  oGame.innerHTML = `<div>${eleStr}</div>`

  oGame.style.height = eachWidth * getBoundary() + 'px'
  oGame.style.width = eachWidth * getBoundary() + 'px'

  for (var i = 1; i < totalNum; i++) {
    var oBox = document.getElementById('d' + i)
    oBox.style.height = eachWidth - 1 + 'px'
    oBox.style.width = eachWidth - 1 + 'px'
    oBox.style.fontSize = eachWidth - 30 + 'px'
    oBox.style.lineHeight = eachWidth + 'px'
  }
}

// 移动
function move(id) {
  var posXYArr = getPosXY()
  if (pause && !successOnce) return

  var i = 1;
  // 这个for循环是找出小DIV在大DIV中的位置，就是索引值
  for (i = 1; i < totalNum + 1; ++i) {
    if (d[i] == id)
      break;
  }
  //保存小DIV可以去的编号，0表示不能移动
  var target_d = 0;

  //用来找出小DIV可以去的位置，如果返回0，表示不能移动，如果可以移动，则返回可以去的位置编号
  target_d = whereCanTo(i);


  if (target_d != 0) {
    // 把当前的大DIV编号设置为0，因为当前小DIV已经移走了，所以当前大DIV就没有装小DIV了
    // 即把当前置空
    d[i] = totalNum;

    //把目标大DIV设置为被点击的小DIV的编号
    d[target_d] = id;

    //最后设置被点击的小DIV的位置，把它移到目标大DIV的位置
    document.getElementById("d" + id).style.left = posXYArr[target_d][0] + "px";
    document.getElementById("d" + id).style.top = posXYArr[target_d][1] + "px";

  }

  //如果target_d不为0，则表示可以移动，且target_d就是小DIV要去的大DIV的位置编号

  //设置游戏是否完成标志，true表示完成
  var finish_flag = true;

  //从1开始，把每个大DIV保存的编号遍历一下，判断是否完成
  for (var k = 1; k < totalNum; ++k) {
    if (d[k] != k) {
      finish_flag = false;
      break; // 如果大DIV保存的编号和它本身的编号不同，则表示还不是全部按照顺序排的，那么设置为false，跳出循环，后面不用再判断了，因为只要一个不符，就没完成游戏

    }
  }

  if (finish_flag == true && !successOnce) {
    successOnce = true
    if (!pause)
      onStart();
    setTimeout(function () {
      alert("congratulation");
    }, 300)

  }
  //如果为true，则表示游戏完成，如果当前没有暂停，则调用暂停韩式，并且弹出提示框，完成游戏。
  //onStart()这个函数是开始，暂停一起的函数，如果暂停，调用后会开始，如果开始，则调用后会暂停
}

//判断是否可移动函数，参数是大DIV的编号，不是小DIV的编号，因为小DIV编号跟可以去哪没关系，小DIV是会动的
function whereCanTo(cur_div) {
  var j = 0;
  var move_flag = false;
  var directArr = getDirect()
  for (j = 0; j < directArr[cur_div].length; ++j) {
    // 把所有可能去的位置循环遍历一下，比如1位置可以去2和4，如果2或4有一个是9，那就是可以移动，返回2或4
    if (d[directArr[cur_div][j]] == totalNum) {
      move_flag = true;
      break;
    }
    //如果目标的值为0，说明目标位置没有装小DIV，则可以移动，跳出循环
  }

  if (move_flag == true) {
    return directArr[cur_div][j];
  } else {
    return 0;
  }
  //可以移动，则返回目标位置的编号，否则返回0，表示不可移动
}

//定时函数，每一秒执行一次
function timer() {
  time += 1;//一秒钟加一，单位是秒
  var min = parseInt(time / 60);//把秒转换为分钟，一分钟60秒，取商就是分钟
  var sec = time % 60;//取余就是秒
  let hour = parseInt(time / 3600)
  min = addZero(min)
  sec = addZero(sec)
  hour = addZero(hour)
  let res = hour === '00' ? `${min}:${sec}` : `${hour}:${min}:${sec}`
  document.getElementById("timer").innerHTML = res;//然后把时间更新显示出来
}

function addZero(val) {
  if (('' + val).length < 2) return '0' + val
  return val
}

//开始暂停函数
function onStart() {
  if (pause) {
    document.getElementById("pause").innerHTML = "暂停";//把按钮文字设置为暂停
    pause = false;//暂停表示设置为false
    set_timer = setInterval(timer, 1000);//启动定时
    //如果当前是暂停，则开始
  } else {
    document.getElementById("pause").innerHTML = "开始";
    pause = true;
    clearInterval(set_timer);
  }
}

//重置函数
function resetGame() {
  time = 0; //把时间设置为0
  successOnce = false
  random_d(); //把方块随机打乱函数
  //如果暂停，则开始计时
  if (pause) {
    onStart();
  }
}

function random_d() {
  var posXYArr = getPosXY()
  var boundary = getBoundary()
  // 第一个数除去后打乱
  d = randArr(d.slice(1))
  // 第一个数变成-9999
  d.splice(0, 0, -99999)

  // 最后一个数的位置，即空格位置
  var idx = d.indexOf(totalNum)

  var x = (~~((idx - 1) / boundary)) + (idx - 1) % boundary
  // 逆序数+空格所在行+空格所在列==偶数，才有解
  var revNum = getRev(d) + x

  // 无解时，调换倒数第二和第三个数
  if (revNum % 2) changeNums(d)

  // console.log(idx, x, d)

  for (var i = 1; i < d.length; i++) {
    if (d[i] !== totalNum) {
      document.getElementById("d" + d[i]).style.left = posXYArr[i][0] + "px";
      document.getElementById("d" + d[i]).style.top = posXYArr[i][1] + "px";
    }
  }
  return d
}

//初始化函数，页面加载的时候调用重置函数，重新开始
window.onload = function () {
  resetDiv()
  resetGame();
}

// 获取逆序对
function getRev(d) {
  var res = 0
  var len = d.length
  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (d[i] > d[j]) {
        res += 1
      }
    }
  }
  return res;
}

// 调换倒数第二个数和倒数第三个数
function changeNums(d) {
  var len = d.length
  if (d[len - 2] !== totalNum && d[len - 3] !== totalNum) {
    var a = d[len - 2]
    d[len - 2] = d[len - 3]
    d[len - 3] = a
  } else {
    var a = d[len - 4]
    d[len - 4] = d[len - 5]
    d[len - 5] = a
  }

  return d
}

// 打乱数组
function randArr(arr) {
  for (var i = 0; i < arr.length; i++) {
    var iRand = parseInt(arr.length * Math.random());
    var temp = arr[i];
    arr[i] = arr[iRand];
    arr[iRand] = temp;
  }
  return arr;
}

// 选择规格
function onSelectLevel(e) {
  let { classList, dataset: { type } } = e.target
  if (!classList.contains('choose-item') || !type) return
  type = +type

  if (type === getBoundary()) return

  var items = document.getElementsByClassName('choose-item')

  for (var i = 0; i < items.length; i++) {
    var chooseDom = items[i]
    chooseDom.classList.remove('active')
  }
  classList.add('active')
  totalNum = type * type

  resetDiv()
  resetGame();
}

