let width = 700; // 默认比例
let height = 0; // 视频的高度，需要按照上面等比例放大

let streaming = false;

let video = null;
let canvas = null;
let photo = null;
let takePhotoButton = null;
let downloadButton = null;
let clearButton = null;
let toggleVideoButton = null;

const clearPhoto = () => {
  const context = canvas.getContext('2d')
  // 生成空白图片
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

function timeStampFormat(timestamp, fmt, defaultval) {
  if (!timestamp) {
    return defaultval || '';
  }

  var date = new Date();

  if ("".concat(timestamp).length === 10) {
    timestamp *= 1000;
  }

  date.setTime(timestamp);
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds() // 毫秒

  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, "".concat(date.getFullYear()).slice(4 - RegExp.$1.length)); // eslint-disable-next-line no-restricted-syntax

  for (var k in o) {
    if (new RegExp("(".concat(k, ")")).test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : "00".concat(o[k]).slice("".concat(o[k]).length));
  }

  return fmt;
}

const takePhoto = () => {
  const context = canvas.getContext('2d')
  if (width && height) {
    // 将 video 元素的 width 和 height 拿过来
    canvas.width = width;
    canvas.height = height;

    context.drawImage(video, 0, 0, width, height);

    // 生成图片
    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  } else {
    clearPhoto()
  }
}

const downloadPhoto = () => {
  const link = document.createElement('a');
  link.download = `WebRtc Photo ${timeStampFormat(Date.now(), 'yyyy-MM-dd hh_mm_ss')}.png`;
  link.href = canvas.toDataURL();
  link.click();
}

const toggleVideo = async () => {
  const closed = toggleVideoButton.className.includes('closed')
  if (closed) {
    video.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
    video.play()
    toggleVideoButton.innerText = '关闭'
    toggleVideoButton.classList.remove('closed')
  } else {
    video.srcObject && video.srcObject.getTracks()[0].stop();
    toggleVideoButton.innerText = '开启'
    toggleVideoButton.classList.add('closed')
  }
}

const start = async () => {
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  photo = document.getElementById('photo');
  takePhotoButton = document.getElementById('takePhotoButton');
  downloadButton = document.getElementById('downloadButton');
  clearButton = document.getElementById('clearButton');
  toggleVideoButton = document.querySelector('#toggleVideoButton')


  // 获取摄像头的视频流
  try {
    video.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
    video.play()
  } catch (e) {
    console.error(e)
  }

  video.addEventListener('canplay', (event) => {
    if (!streaming) {
      // 按比例放大 videoHeight
      height = video.videoHeight / (video.videoWidth / width);

      // 设置 video 的宽高
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      // 设置 canvas 的宽高
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false)

  takePhotoButton.addEventListener('click', (event) => {
    // 拍照
    takePhoto()
  }, false)

  downloadButton.addEventListener('click', (event) => {
    // 下载
    downloadPhoto()
  })

  clearButton.addEventListener('click', (event) => {
    clearPhoto();
  })

  toggleVideoButton.addEventListener('click', () => {
    toggleVideo();
  })

  // 生成默认空白图片
  clearPhoto();
}

start().then()
