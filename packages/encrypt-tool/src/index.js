const encodingBtn = document.getElementById("encodingBtn");
const decodingBtn = document.getElementById("decodingBtn");
const cipherTextDom = document.getElementById("cipeherText");
const plainTextDom = document.getElementById("plainText");
const navTabsDom = document.getElementById("myTabs");
const rsaTypesDom = document.getElementById("rsaTypes");
const pwdInputDom = document.getElementById("pwdInput");
const pwdInputWrap = document.getElementById("pwdWrap");
const decodingBtnWrapDom = document.getElementById("decodingBtnWrap");
const algorithmWrapDom = document.getElementById("algorithmWrap");
const algorithmDorpDownMenu = document.getElementById("algorithmDorpDownMenu");
const algorithmDropdownMenuBtn = document.getElementById(
  "algorithmDropdownMenuBtn"
);
const fileUploader = document.getElementById("fileUploader");
const fileUploaderWrap = document.getElementById("fileUploaderWrap");
const plainTextWrap = document.getElementById("plainTextWrap");
const fileRemoveBtn = document.getElementById("fileRemoveBtn");
const imgPreview = document.getElementById("preview");
const imgName = document.getElementById("imgName");
const notRSAContainer = document.getElementById("notRSAContainer");
const RSAContainer = document.getElementById("RSAContainer");
const rsaScriptInput = document.getElementById("rsaScriptInput");
const rsaTextInput = document.getElementById("rsaTextInput");
const rsaResultInput = document.getElementById("rsaResultInput");
const rsaExecuteBtn = document.getElementById("rsaExecuteBtn");

let thisCipherType = "cipher";
let thisAlgorithm = "AES";
let thisRSAType = "rsa-encript";

const cipherTypeMap = {
  cipher: {
    encodeBtnText: "加密",
    decodeBtnText: "解密",
    hasPwd: true, // input 框
    hasAlgorithm: true, // select 选择器
    hasFileUploader: false,
    hasPlainText: true,
    algorithmList: [
      "AES",
      "DES",
      "TripleDES",
      "__divider",
      "RC4",
      "RC4Drop",
      "__divider",
      "Rabbit",
    ],
    encodeFn(value, pwd) {
      return CryptoJS[thisAlgorithm].encrypt(value, pwd).toString();
    },
    decodeFn(value, pwd) {
      var bytes = CryptoJS[thisAlgorithm].decrypt(value, pwd);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);

      return originalText;
    },
  },

  hash: {
    encodeBtnText: "加密",
    hasPwd: false,
    hasAlgorithm: true,
    hasFileUploader: false,
    hasPlainText: true,
    algorithmList: [
      "MD5",
      "SHA1",
      "SHA224",
      "SHA256",
      "SHA384",
      "SHA512",
      "__divider",
      "HmacSHA1",
      "HmacMD5",
      "HmacSHA1",
      "HmacSHA224",
      "HmacSHA256",
      "HmacSHA384",
      "HmacSHA512",
    ],
    encodeFn(value, pwd) {
      if (thisAlgorithm.startsWith("Hmac")) {
        return CryptoJS.HmacSHA512(value, pwd);
      }
      return CryptoJS[thisAlgorithm](value);
    },
  },
  base64: {
    encodeBtnText: "BASE64编码",
    decodeBtnText: "BASE64解码",
    hasPwd: false,
    hasAlgorithm: false,
    hasFileUploader: false,
    hasPlainText: true,
    encodeFn(value) {
      return window.btoa(window.encodeURIComponent(value.trim()));
    },
    decodeFn(value) {
      return window.decodeURIComponent(window.atob(value.trim()));
    },
  },
  "img-base64": {
    encodeBtnText: "BASE64编码",
    decodeBtnText: "BASE64解码",
    hasPwd: false,
    hasAlgorithm: false,
    hasFileUploader: true,
    hasPlainText: false,
  },
};

const RSATypeMap = {
  "rsa-encript": {
    title: "RSA加密",
  },
  "rsa-decript": {
    title: "RSA解密",
  },
};
window.onload = function () {
  initTextarea();
  encodingBtn.addEventListener("click", this.bindEncoding);
  decodingBtn.addEventListener("click", this.bindDecoding);
  navTabsDom.addEventListener("click", this.changeTab);
  rsaTypesDom.addEventListener("click", this.changeRSAType);
  fileUploader.addEventListener("change", this.onChangeFileUpload);
  algorithmWrapDom.addEventListener("click", this.changeAlgorithm);
  fileRemoveBtn.addEventListener("click", this.onRemoveFile);
  rsaExecuteBtn.addEventListener("click", this.onExecuteRSA);
  onResetAlgorithm(thisCipherType);
};

function initTextarea() {
  cipherTextDom.value = "";
  plainTextDom.value = "";
}

function onExecuteRSA() {
  const { value: rsaScriptValue } = rsaScriptInput;
  const { value: rsaResultValue } = rsaResultInput;
  const { value: rsaTextValue } = rsaTextInput;

  const crypt = new JSEncrypt();
  crypt.setKey(rsaScriptValue);

  let enc;
  if (thisRSAType === "rsa-encript") {
    enc = crypt.encrypt(rsaTextValue);
  } else {
    enc = crypt.decrypt(rsaTextValue);
  }

  if (enc === false) {
    alert(`${RSATypeMap[thisRSAType]["title"]}错误`);
  } else {
    rsaResultInput.value = enc;
  }
}

function changeRSAType(e) {
  const { parentNode } = e.target;
  if (parentNode.classList && parentNode.classList.contains("nav-li")) {
    $("#rsaTypes li").removeClass("active");
    parentNode.classList.add("active");

    const {
      dataset: { type },
    } = parentNode;
    thisRSAType = type;
    onChangeRSAPlaceholder(type);
  }
}

function onChangeRSAPlaceholder(type) {
  console.log(type);
  if (type === "rsa-encript") {
    rsaScriptInput.placeholder = "请输入公钥";
    rsaTextInput.placeholder = "请输入要加密的字符串";
  } else {
    rsaScriptInput.placeholder = "请输入私钥";
    rsaTextInput.placeholder = "请输入要解密的签名";
  }
}

function changeAlgorithm(e) {
  const { classList } = e.target;
  if (classList.contains("algorithm")) {
    thisAlgorithm = e.target.innerText;
    algorithmDropdownMenuBtn.innerText = thisAlgorithm;

    if (thisCipherType === "hash") {
      if (thisAlgorithm.startsWith("Hmac")) {
        pwdInputWrap.style.display = "inline-block";
      } else {
        pwdInputWrap.style.display = "none";
      }
    }
  }
}

function bindEncoding(e) {
  const { value } = plainTextDom;
  const { value: pwdValue } = pwdInputDom;
  if (
    !value ||
    !cipherTypeMap[thisCipherType] ||
    !cipherTypeMap[thisCipherType]["encodeFn"]
  )
    return;

  const _value = cipherTypeMap[thisCipherType]["encodeFn"](value, pwdValue);

  cipherTextDom.value = _value;
}

function bindDecoding(e) {
  const { value } = cipherTextDom;
  if (!value) return;

  const { value: pwdValue } = pwdInputDom;

  try {
    if (thisCipherType === "img-base64") {
      imgPreview.src = value;
      return;
    }
    const _value = cipherTypeMap[thisCipherType]["decodeFn"](value, pwdValue);
    plainTextDom.value = _value;
  } catch (e) {
    alert(`${cipherTypeMap[thisCipherType]["decodeBtnText"]}错误`);
  }
}

function changeTab(e) {
  const { parentNode } = e.target;
  if (parentNode.classList && parentNode.classList.contains("nav-li")) {
    $("#myTabs li").removeClass("active");
    parentNode.classList.add("active");

    const {
      dataset: { type },
    } = parentNode;
    thisCipherType = type;

    onChangeDecodeEncodeText(thisCipherType);
    onChangePwdDisplay(thisCipherType);
    onChangeAlgorithmDisplay(thisCipherType);
    onChangeFileUploaderDisplay(thisCipherType);
    onChangePlainTextDisplay(thisCipherType);
    onChangeContainer(thisCipherType);
  }
}

function onChangePwdDisplay(type) {
  if (!cipherTypeMap[type]) return;
  const hasPwd = cipherTypeMap[type]["hasPwd"];
  if (hasPwd) {
    pwdInputWrap.style.display = "inline-block";
  } else {
    pwdInputWrap.style.display = "none";
  }
}

function onChangeFileUpload(e) {
  const { files } = e.target;
  const file = files[0];

  let fileReader = new FileReader();
  fileReader.onload = () => {
    imgPreview.src = cipherTextDom.value = fileReader.result;
    // 其它跟上面是一样的，这里只需要指定 img 的 src 到 FileReader.result 就好了
  };

  const base64Img = fileReader.readAsDataURL(file);
  imgName.innerText = file.name;
  imgName.title = file.name;
  imgName.style.display = "inline-block";
  fileRemoveBtn.style.display = "inline-block";
}

function onChangeAlgorithmDisplay(type) {
  if (!cipherTypeMap[type]) return;
  const hasAlgorithm = cipherTypeMap[type]["hasAlgorithm"];

  if (hasAlgorithm) {
    algorithmWrapDom.style.display = "inline-block";
    onResetAlgorithm(type);
  } else {
    algorithmWrapDom.style.display = "none";
  }
}

function onChangeDecodeEncodeText(type) {
  if (!cipherTypeMap[type]) return;
  const decodeBtnText = cipherTypeMap[type]["decodeBtnText"];
  const encodeBtnText = cipherTypeMap[type]["encodeBtnText"];

  $("#encodingBtn .btn-text").text(encodeBtnText);

  if (decodeBtnText) {
    $("#decodingBtn .btn-text").text(decodeBtnText);
    decodingBtnWrapDom.style.display = "inline-block";
  } else {
    decodingBtnWrapDom.style.display = "none";
  }
}

function onResetAlgorithm(type) {
  const algorithmList = cipherTypeMap[type]["algorithmList"];
  if (Array.isArray(algorithmList)) {
    let algorithmHtml = ``;
    algorithmList.map((item) => {
      algorithmHtml +=
        item === "__divider"
          ? `<li role="separator" class="divider"></li>`
          : `<li><a href="#" class='algorithm'>${item}</a></li>`;
    });
    algorithmDorpDownMenu.innerHTML = algorithmHtml;
    algorithmDropdownMenuBtn.innerText = thisAlgorithm = algorithmList[0];
  } else {
    algorithmDorpDownMenu.innerHTML = "";
  }
}

function onChangeFileUploaderDisplay(type) {
  if (!cipherTypeMap[type]) return;
  const hasFileUploader = cipherTypeMap[type]["hasFileUploader"];
  if (hasFileUploader) {
    fileUploaderWrap.style.display = "inline-block";
  } else {
    fileUploaderWrap.style.display = "none";
  }
}

function onChangePlainTextDisplay(type) {
  if (!cipherTypeMap[type]) return;
  const hasPlainText = cipherTypeMap[type]["hasPlainText"];
  if (hasPlainText) {
    plainTextWrap.style.display = "inline-block";
  } else {
    plainTextWrap.style.display = "none";
  }
}

function onRemoveFile(e) {
  imgPreview.src = " ";
  fileUploader.value = "";
  imgName.innerText = "";
  imgName.style.display = "none";
  fileRemoveBtn.style.display = "none";
}

function onChangeContainer(type) {
  console.log(type);
  if (type === "rsa") {
    RSAContainer.style.display = "block";
    notRSAContainer.style.display = "none";
  } else {
    RSAContainer.style.display = "none";
    notRSAContainer.style.display = "flex";
  }
}
