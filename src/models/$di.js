/**
 * Created by leoliang on 2017/1/8.
 */


const _ = require('underscore');
const co = require('co');
const Q = require('q');

let registeredModules = {};
let closeHandlers = [];

const EventEmitter = require('events');
let $di = new EventEmitter();

$di.init = function () {
    let arr = [];

    _.forEach(registeredModules, (item, key) => {
        arr.push(co(item).then((module) => {
            this[key] = module;
        }));
    });

    process.on('SIGINT', (code) => {
        let arr = [];

        _.each(closeHandlers, (item) => arr.push(co(item)));

        Q.all(arr).then(() => {
            console.log('All is Closed')
        }).catch((e) => {
            console.log(e);
        }).then(() => {
            process.exit(code);
        }).done();
    });

    return Promise.all(arr).then(() => {
        console.log('setup success');
    });
};

$di.regModule = function (key, generator) {
    registeredModules[key] = generator;
};


$di.addCloseHandlers = function (handler) {
    closeHandlers.push(handler);
};

module.exports = $di;