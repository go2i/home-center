var koa = require('koa');
var app = koa();
var Q = require('q');

var ArpService = require('./src/arp/index');

process.chdir(__dirname);

// x-response-time

app.use(function *(next) {
    next.arr = [1];

    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next) {
    console.log(next);

    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(next) {


    var self = this;

    yield ArpService.query().then(function (data) {
        self.body = JSON.stringify(data);
    });
});

app.listen(3000);