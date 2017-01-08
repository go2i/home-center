module.exports = function *() {
    yield require('./init/runtime')();
    yield require('./init/services')();
};