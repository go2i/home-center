const ArpService = require('./service');

module.exports = function (router) {
    router.get('/arp', function *() {
        this.body = ArpService.queryWithCache();
    })
};