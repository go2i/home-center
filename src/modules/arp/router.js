var ArpService = require('./service');

module.exports = function (router) {
    router.get('/arp', function *() {
        var self = this;

        yield ArpService.query().then(function (data) {
            self.body = JSON.stringify(data);

            return data;
        });
    })
};