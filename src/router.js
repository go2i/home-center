var router = require('koa-router')();

require('./modules/arp/router')(router);
require('./modules/ip/router')(router);
require('./modules/weather/router')(router);

module.exports = router;