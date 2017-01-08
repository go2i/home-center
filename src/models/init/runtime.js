const mkdirp = require('mkdirp');

module.exports = function *() {
    mkdirp.sync('runtime/logs');
    mkdirp.sync('runtime/uploads');
};