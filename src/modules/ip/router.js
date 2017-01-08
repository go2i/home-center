let IpService = require('./service');

module.exports = (router) => {
    router.get('/ip/queryByGeoIp', function*() {
        let ip = this.request.query['ip'];
        this.body = ip ? yield IpService.queryGeoIp(ip) : yield IpService.myIpInfo();
    });

    router.get('/ip/my', function *() {
        this.body = yield IpService.myIp();
    })
};