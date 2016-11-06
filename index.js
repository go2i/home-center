process.chdir(__dirname);

const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaLogger = require('koa-logger');
const KoaResponseTime = require('koa-response-time');

const app = Koa();

app.use(KoaLogger());
app.use(KoaResponseTime());
app.use(require('./src/router').routes());
app.use(KoaStatic('web'));


app.listen(8000);