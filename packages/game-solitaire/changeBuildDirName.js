var shell = require('shelljs')

console.log('----- 打包完成 -----')
shell.exec('mv build docs')
console.log('----- 修改文件夹名称完成 -----')
