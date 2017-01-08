let geoip = require('geoip-lite');

module.exports = {
    myIp() {
        return require('./sohu').myIp();
    },

    myIpInfo() {
        return this.myIp().then(ip => this.queryGeoIp(ip));
    },

    queryGeoIp(ip) {
        let rs = geoip.lookup(ip);
        rs.ip = ip;

        return Promise.resolve(rs);
    }
};