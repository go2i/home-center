var Forecast = require('forecast');
const Q = require('q');

const config = require('../../../config/config');


let forecast = null;

module.exports = {
    _init: function *() {
        forecast = new Forecast(config.forecast);
    },

    query: function (ll) {
        return Q.ninvoke(forecast, 'get', ll);
    }
};