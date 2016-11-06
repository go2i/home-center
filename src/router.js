var router = require('koa-router')();

require('./modules/arp/router')(router);

module.exports = router;