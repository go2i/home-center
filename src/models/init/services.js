module.exports = function*() {
    yield require('../../modules/weather/service')._init();
};