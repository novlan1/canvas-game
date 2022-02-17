const contentDom = $("#content"); // 内容
const sidebarDom = $("#sidebar-inner"); // 侧边导航
const backToTopDom = $("#back_to_top"); // 回到顶部
const backToHome = $('#backToHome'); // 回到首页

const defaultSidebarName = "default"; // 默认文件夹
const defaultContentName = "README"; // 默认页面
const sidebarPrefix = "sidebars/sidebar-"; // 侧边导航前缀
const contentPrefix = "content/"; // 页面前缀

window.addEventListener("hashchange", init);
backToHome.on('click', onBindBakToHome)

let currentHash = ""; // 当前页面的hash，不含包页面内的锚点
let loadingPage = false // 正在加载页面

function init() {
  initSideBar();
}

function getHash() {
  const [nav, ...anchorArr] = (location.hash.split("#")[1] || "").split("/");

  return {
    nav: nav || defaultSidebarName,
    /**
     * 页面锚点
     * 有可能为空字符串，所以后面要判断
     */
    anchor: decodeURIComponent(anchorArr.join("/")), 
  };
}

function onBindBakToHome(e) {
  e.stopPropagation()
  location.hash = '#'
}

// 获取文档所有页面
function getMenuList(_markedData) {
  const doc = document.createElement("div");
  doc.innerHTML = _markedData;

  // 添加到侧边导航DOM上
  sidebarDom.html(doc)

  const sidebarAList = [...doc.getElementsByTagName("a")];
  const menuList = sidebarAList.reduce((acc, item) => {
    acc.push(item.getAttribute("href"));
    return acc;
  }, []);
  return {sidebarAList, menuList};
}

// 改变侧标导航样式
function changeSidebarCurrentStyle(aList) {
  aList.map(item => {
    if (item.getAttribute('href') === currentHash ) {
      item.style.color = 'red'
    }
  })
}

// 生成侧边页面目录
function initSideBar() {
  const { nav, anchor } = getHash();
  const sidebarFile = `${sidebarPrefix}${nav}.md`;

  if (!nav) return;

  if (loadingPage) return
  loadingPage = true

  $.get(sidebarFile, function (data) {
    loadingPage = false

    const _markedData = marked(data);

    const {sidebarAList, menuList} = getMenuList(_markedData);

    // 如果是顶级页面，获取默认路由
    if (nav === defaultSidebarName) {
      currentHash = `#${defaultSidebarName}/${defaultContentName}`;
    } else {
      // 获取当前hash，不包含页内锚点
      currentHash = anchor ? `#${nav}/${anchor}` : menuList[0];

      // 为下一页，上一页添加事件
      const currentHashIndex = menuList.indexOf(currentHash);

      console.log("当前页面index：", currentHashIndex);

      if (currentHashIndex <= 0) {
        $("#pageup").css("display", "none");
      } else {
        $("#pageup").css("display", "inline-block");

        // 添加事件
        $("#pageup").on("click", function () {
          location.hash = menuList[currentHashIndex - 1];
        });
      }

      if (currentHashIndex === menuList.length - 1) {
        $("#pagedown").css("display", "none");
      } else {
        $("#pagedown").css("display", "inline-block");

        // 添加事件
        $("#pagedown").on("click", function () {
          location.hash = menuList[currentHashIndex + 1];
        });
      }
      // 初始化回到顶部
      initBackToTopButton()
    }

    router();
    changeSidebarCurrentStyle(sidebarAList)

    // sidebarDom.html(_markedData);
  });
}

// 加载页面
function router() {
  const _currentHash = currentHash.split("#")[1];
  const contentFile = `${contentPrefix}${_currentHash}.md`;
  console.log("当前文件路径：", contentFile);

  $.get(contentFile, function (data) {
    const _markedData = marked(data);
    contentDom.html(_markedData);

    const _catlog = createCatlog(_markedData);
    // 添加页面顶部目录
    $("#content h1").append(_catlog);

    // 跳转页面内部锚点
    judgeSection();

    // 完成代码高亮
    $("#content code").map(function () {
      Prism.highlightElement(this);
    });
  });
}

// 滚动到页面内锚点
function judgeSection() {
  const sectionId = location.hash.split("#")[2];

  if (sectionId) {
    $("html, body").animate(
      {
        scrollTop: $("#" + decodeURI(sectionId)).offset().top,
      },
      300
    );
  } else {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      300
    );
  }
}

// 创建页面顶部目录
function createCatlog(_markedData) {
  let res = [];
  const reg = /<h2.*?id\="(.*?)".*?>(.*?)<\/h2>/g;
  let result;

  while ((result = reg.exec(_markedData)) != null) {
    res.push({
      title: result[2],
      id: encodeURIComponent(result[1]),
    });
  }

  if (!res.length) return "";

  let _catlogHtml = `<ol class='content-toc' id='content-toc'>`;
  const _hash = location.hash.split("#")[1];
  res.map((item) => {
    _catlogHtml += `<li class='link' ><a href='#${_hash}#${item.id}'>${item.title}</a></li>`;
  });
  _catlogHtml += "</ol>";
  return _catlogHtml;
}

// 初始化回到顶部
function initBackToTopButton() {
  backToTopDom.show();
  backToTopDom.on("click", goTop);
}

// 回到顶部
function goTop(e) {
  if (e) e.preventDefault();
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
  history.pushState(null, null, "#" + location.hash.split("#")[1]);
}

init();
