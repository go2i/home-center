const IpService = require('../ip/service');
const WeatherService = require('./service');


module.exports = (router) => {
    router.get('/weathers', function *() {
        let ip_info = yield IpService.myIpInfo();
        this.body = yield WeatherService.query(ip_info.ll);
    })
};