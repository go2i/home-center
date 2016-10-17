"use strict";

var SSH2Client = require('ssh2').Client;
var Q = require('q');
var util = require('util');
var through2 = require('through2');
var byline = require('byline');
var mac_lookup = require('mac-lookup');
var ping = require('ping');

process.chdir(__dirname);

var conn = new SSH2Client();

Q().then(function () {
    var deferred = Q.defer();

    conn.on('ready', function () {
        deferred.resolve(conn);
    }).connect({
        host: '192.168.1.1',
        port: 22,
        username: 'sel0537504',
        privateKey: require('fs').readFileSync(process.env.HOME + '/.ssh/id_rsa')
    });

    return deferred.promise;
}).then(function (conn) {
    return Q.ninvoke(conn, 'exec', 'arp -a').then(function (stream) {
        stream.on('close', function (code, signal) {
            conn.end();
        });

        return stream;
    })
}).then(function (stream) {
    byline(stream.stdout).pipe(through2.obj(function (chunk, enc, callback) {
        var arr = chunk.toString().split(' ');

        var server_name = arr[0] === '?' ? null : arr[0];
        var ip = arr[1].substr(1, arr[1].length - 2);
        var mac_addr = arr[3] === '<incomplete>' ? null : arr[3];

        var out_obj = {
            'server_name': server_name,
            'ip': ip,
            'mac': mac_addr
        };

        this.push(out_obj);
        callback();
    })).pipe(through2.obj(function (arp_detail, enc, callback) {
        var self = this;

        if (arp_detail.mac === null) {
            self.push(arp_detail);
            callback();
            return;
        }

        Q.ninvoke(mac_lookup, 'lookup', arp_detail.mac).then(function (name) {
            arp_detail.mac_company = name;
        }).done(function () {
            self.push(arp_detail);
            callback();
        });
    })).pipe(through2.obj(function (arp_detail, enc, callback) {
        var self = this;

        Q(ping.promise.probe(arp_detail.ip)).then(function (isAlive) {
            arp_detail.is_alive = isAlive.alive;
        }).done(function () {
            self.push(arp_detail);
            callback();
        });

    })).pipe(through2.obj(function (arp_detail, enc, callback) {
        console.log(arp_detail);

        callback();
    }));

    stream.stderr.pipe(process.stderr);
}).done();