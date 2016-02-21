var fs = require('fs');
var nconf = require('nconf');
var client_conf = require(__dirname + '/../client_conf.json');

module.exports = {
    setup: function () {
        nconf.file({ 
            file: __dirname + '/../config.json',
            secure: {
                secret: 'super-secretzzz-keyzz',
                alg: 'aes-256-ctr'
            }
        });

        nconf.defaults({
            client_id: client_conf.client_id,
            client_secret: client_conf.client_secret,
            users: [],
            current_user: null
        });

        return this;
    },
    save: function () {
        nconf.save(function (err) {
            if (err) throw err;
        });
    },
    set: function (key, value) {
        nconf.set(key, value);

        return this;
    },
    get: function (key) {
        var value = null;

        if (nconf.get(key)) {
            value = nconf.get(key);
        }

        return value;
    }
};