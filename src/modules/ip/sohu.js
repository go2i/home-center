const rq = require('request-promise');
const vm = require('vm');

module.exports.query = function () {
    const url = 'http://pv.sohu.com/cityjson?ie=utf-8';

    return rq(url).then(function (body) {
        return vm.runInNewContext(`(function(){ ${body}; return returnCitySN; })`)();
    })
};

module.exports.myIp = function () {
    return module.exports.query().then(function (info) {
        return info.cip;
    });
};