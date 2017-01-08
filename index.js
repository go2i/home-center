process.chdir(__dirname);

const co = require('co');
const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaLogger = require('koa-logger');
const KoaResponseTime = require('koa-response-time');
const KoaBody = require('koa-body');
const KoaJson = require('koa-json');
const KoaCors = require('kcors');
const $di = require('./src/models/$di');

$di.regModule('ArpService', require('./src/modules/arp/service').init());
$di.regModule('FlickrService', require('./src/modules/flickr/service').init());

$di.init().then(function () {
    co(function*() {
        yield require('./src/models/init');

        const app = Koa();
        app.use(KoaLogger());
        app.use(KoaResponseTime());
        app.use(KoaBody({'uploadDir': 'runtime/upload'}));
        app.use(KoaJson({'pretty': false, 'param': 'pretty'}));
        app.use(KoaCors({
            'allowHeaders': ['origin', 'x-requested-with', 'Authorization', 'content-type']
        }));

        app.use(require('./src/router').routes());
        app.use(KoaStatic('web'));

        app.listen(8000);
    }());
});
