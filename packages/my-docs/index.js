const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')

const app = new Koa()
app.use(serve('./docs'))


app.listen('3016', () => {
  console.log('server is running at 3016')
})