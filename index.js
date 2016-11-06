var Koa = require('koa');
process.chdir(__dirname);


var app = Koa();

// x-response-time
app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

// logger
app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %ss', this.method, this.url, ms / 1000);
});

// response
app.use(require('./src/router').routes());

app.listen(3000);