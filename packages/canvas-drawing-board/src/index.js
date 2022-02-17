// 判断是否是PC端
function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

window.onload = function () {
  const canvasEle = document.getElementById('content')
  const colorsEle = document.getElementsByClassName('colors')[0]
  const controllersEle = document.getElementsByClassName('controllers')[0]
  initCancas(canvasEle, colorsEle, controllersEle)
}

function initCancas(canvasEle, colorsEle, controllersEle, imageData = null) {
  const colorTable = {
    'black': {
      regularCode: '#222',
      opagueCode: '#222',
    },
    'green': {
      regularCode: '#5cb85c',
      opagueCode: 'rgb(206, 234, 206)',
    },
    'yellow': {
      regularCode: '#f0ad4e',
      opagueCode: 'rgb(251, 231, 202)',
    },
    'red': {
      name: 'red',
      regularCode: '#d9534f',
      opagueCode: 'rgb(244, 203, 202)',
    },
    'white': {
      regularCode: '#fff',
      opagueCode: '#fff',
    },
  }

  // 初始化
  const ownColorLabel = document.getElementById('ownColorLabel')
  const ownColor = document.getElementById('ownColor')
  const ownWidth = document.getElementById('ownWidth')
  const wrapEle = document.getElementsByClassName('wrap')[0]

  const ctx = canvasEle.getContext('2d')
  let isDrawing = false
  let canvansWidth = 500
  let canvansHeight = 500
  let selectedColor = 'black'
  let selectedWidth = 5
  let prevStack = []
  let futureStack = []
  let isEmpty = true
  const isMobile = !isPC()
  ownColor.addEventListener('change', onChangeColor)
  ownWidth.addEventListener('change', onChangeWidth)

  canvasEle.addEventListener('mousedown', onMouseDown)
  canvasEle.addEventListener('mousemove', onMouseMove)
  canvasEle.addEventListener('mouseup', onMouseUp)
  canvasEle.addEventListener('mouseout', onMouseUp)
  canvasEle.addEventListener('touchstart', onMouseDown)
  canvasEle.addEventListener('touchmove', onMouseMove)
  canvasEle.addEventListener('touchend', onMouseUp)

  colorsEle.addEventListener('click', onSelectColor)

  controllersEle.addEventListener('click', onControll)



  // 方法：将 imageData 写入一个 Image 对象，画在 canvas 上
  function loadImageData(data) {
    let { width, height } = canvasEle
    const { devicePixelRatio } = window
    width /= devicePixelRatio
    height /= devicePixelRatio
    const img = new Image()
    img.src = data
    img.onload = () => {
      clearCancas()
      ctx.drawImage(img, 0, 0, width, height)
    }
  }

  // 适配移动端
  if (isMobile) {
    const { clientHeight, clientWidth } = document.documentElement
    let width = clientWidth - 20
    let height = clientHeight - 20
    wrapEle.style.width = width + 'px'
    wrapEle.style.height = height + 'px'
    wrapEle.style.margin = '10px'
    wrapEle.style.padding = '0'
    canvasEle.width = width
    canvasEle.height = height
  }

  onShowBetter()

  // 消除锯齿
  function onShowBetter() {
    let width = canvasEle.width
    let height = canvasEle.height
    if (window.devicePixelRatio) {//检测是否有像素比
      canvasEle.style.width = width + "px";
      canvasEle.style.height = height + "px";
      canvasEle.height = height * window.devicePixelRatio;//将canvas画布转为真实像素大小
      canvasEle.width = width * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);//将画笔调为像素比大小
    }
  }

  // 方法：存储当前的 canvas 内容为 imageData，推入状态栈
  function saveImageData() {
    const currentStatus = canvasEle.toDataURL()
    // console.log(currentStatus)
    prevStack.unshift(currentStatus)
  }

  // 方法：清除画布
  function clearCancas() {
    ctx.clearRect(0, 0, canvansWidth, canvansHeight)
  }

  // 若提供了 imageData 参数就画出来
  if (imageData !== null) {
    loadImageData(imageData);
  }

  // 然后无论此时是否已有内容，推入状态栈一次
  saveImageData();

  // 常规选择颜色
  function onSelectColor(e) {
    e.stopPropagation()
    // e.preventDefault()
    const { dataset: { color } } = e.target
    if (!color) return
    selectedColor = colorTable[color].opagueCode
    onRomoveCSS()
    e.target.classList.add('current')
  }

  // 自定义颜色选择
  function onChangeColor(e) {
    e.stopPropagation()
    selectedColor = e.target.value
    onRomoveCSS()
    ownColorLabel.classList.add('current')
    ownColorLabel.style.background = selectedColor
  }

  // 选择画笔宽度
  function onChangeWidth(e) {
    // e.preventDefault()
    e.stopPropagation()
    selectedWidth = e.target.value
  }

  // 移除所有current属性
  function onRomoveCSS() {
    const colors = document.querySelectorAll('.color-item')
    for (let i = 0; i < colors.length; i++) {
      colors[i].classList.remove('current')
    }
    ownColorLabel.classList.remove('current')

  }

  function onMouseDown(e) {
    e.stopPropagation()
    e.preventDefault()
    let { x, y } = getLeftAndTop(e)

    isDrawing = true
    ctx.strokeStyle = selectedColor
    ctx.lineWidth = selectedWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.imageSmoothingEnabled = true
    ctx.beginPath()
    ctx.moveTo(x, y)
    futureStack = []
    isEmpty = false
  }

  function onMouseMove(e) {
    e.preventDefault()
    e.stopPropagation()
    if (isDrawing) {
      let { x, y } = getLeftAndTop(e)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  function onMouseUp(e) {
    e.stopPropagation()
    e.preventDefault()
    if (isDrawing) {
      let { x, y } = getLeftAndTop(e)

      ctx.lineTo(x, y)
      ctx.stroke()
      isDrawing = false
      saveImageData()
    }
  }

  function getLeftAndTop(e) {
    let x
    let y
    if (e.type.startsWith('touch')) {

      x = e.changedTouches[0].clientX - canvasEle.getBoundingClientRect().left
      y = e.changedTouches[0].clientY - canvasEle.getBoundingClientRect().top
    } else {
      x = e.offsetX
      y = e.offsetY
    }
    return { x, y }
  }

  function onControll(e) {
    e.stopPropagation()
    e.preventDefault()
    const { classList } = e.target
    if (classList.contains('undo')) {
      if (prevStack.length > 1) {
        loadImageData(prevStack[1])
        const currentStep = prevStack.splice(0, 1)
        futureStack.unshift(currentStep)
      }
    } else if (classList.contains('redo')) {
      if (futureStack.length) {
        loadImageData(futureStack[0])
        const currentStatus = futureStack.splice(0, 1)
        prevStack.unshift(currentStatus)
      }
    } else if (classList.contains('clear')) {
      isEmpty = true
      clearCancas()
      saveImageData();
    } else if (classList.contains('download')) {
      if (!prevStack.length || isEmpty) return
      download(prevStack[0])
    }
  }

  function download(imgData) {
    downloadFile('画图.png', imgData);
  }

  //下载
  function downloadFile(fileName, content) {
    let aLink = document.createElement('a');
    let blob = base64ToBlob(content); //new Blob([content]);

    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);

    // aLink.dispatchEvent(evt);
    // aLink.click()
    aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));//兼容火狐
  }

  //base64转blob
  function base64ToBlob(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

}