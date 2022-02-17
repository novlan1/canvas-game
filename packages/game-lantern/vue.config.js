const path = require('path');
const fs = require('fs');


// 入口文件
function getEntry() {
  return path.resolve(__dirname, 'src', process.env.VUE_APP_DIR || '', 'main.js'); // plugin的入口用自己的
}

// 获取APP名字
function getAppName() {
  const arr = process.env.VUE_APP_DIR.split('/');
  return arr[arr.length - 1];
}


// 获取别名
function getAllAppNameAlias() {
  console.log('process.env.VUE_APP_DIR', process.env.VUE_APP_DIR);
  const files = fs.readdirSync(path.resolve(__dirname, 'src'));
  const result = {
    folderName: [],
    fileName: [],
  };

  files.forEach((file) => {
    const pathName = path.join(__dirname, 'src', file);
    const stat = fs.lstatSync(pathName);
    if (stat.isDirectory()) {
      result.folderName.push(file);
    } else {
      result.fileName.push(file);
    }
  });
  const alias = {
    src: path.resolve(__dirname, 'src'),
    '@': path.resolve(__dirname, 'src', process.env.VUE_APP_DIR || ''),
  };
  result.folderName.forEach((dir) => {
    alias[dir] = path.resolve(__dirname, 'src', dir);
  });
  return alias;
}

module.exports = {
  configureWebpack: {
    entry: getEntry(),
    name: getAppName(),
    resolve: {
      alias: getAllAppNameAlias(),
      extensions: ['js', 'vue', 'json', 'ts'],
    },
  },
  lintOnSave: false,
  publicPath: './',
};
