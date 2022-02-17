/*
	动态加载模块，用户js或者css加载
*/
const exportObj = {};
exportObj.JSMAP = {};

exportObj.loadJS = function (url, options) {
  return new Promise(((resolve, reject) => {
    if (typeof (exportObj.JSMAP[url]) === 'undefined') {
      exportObj.JSMAP[url] = 0;

      const c = document.createElement('script');
      if (options && options.defer) c.setAttribute('defer', 'defer');
      if (options && options.async) c.setAttribute('async', 'async');
      if (options && options.crossorigin) c.setAttribute('crossorigin', 'crossorigin');

      const e = document.body || document.getElementsByTagName('head')[0];
      c.onerror = function () {
        reject();
      };
      if (c.readyState) {
        c.onreadystatechange = function () {
          if (c.readyState == 'loaded' || c.readyState == 'complete') {
            c.onreadystatechange = null;
            exportObj.JSMAP[url] += 1;
            resolve();
          }
        };
      } else {
        c.onload = function () {
          exportObj.JSMAP[url] += 1;
          resolve();
        };
      }
      c.src = url;
      e.appendChild(c);
    } else {
      const tc = setInterval(() => {
        if (exportObj.JSMAP[url]) {
          clearInterval(tc);
          resolve();
        }
      }, 20);
    }
  }));
};

exportObj.loadCSS = function (url) {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  document.getElementsByTagName('head')[0].appendChild(link);
};

export default exportObj;
