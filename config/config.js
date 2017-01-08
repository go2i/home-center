module.exports = {
    'ssh2_route': {
        'host': '192.168.1.1',
        'username': '',
        'privateKey': process.env.HOME + '/.ssh/id_rsa',
        'port': 22
    },
    'forecast': {
        service: 'darksky',
        key: '',
        units: 'celcius',
        lang: 'zh'
    },
    'flickr': {
        'apiKey': ''
    }
};