var conf_utils = require(__dirname + '/../../conf_utils').setup();
var fs = require('fs');
var Vimeo = require('vimeo').Vimeo;
var vimeo_lib = null;

function constructVimeoLib () {
    var current_user = conf_utils.get('current_user');
    var users = conf_utils.get('users');
    var access_token = null;

    if (current_user && users.length > 0) {
        users.forEach(function (user, i) {
            if (user.nickname === current_user) {
                access_token = user.access_token;
            }
        });
    } else {
        return console.log('Use `vimeo use <nickname>` to select an authenticated user.');
    }

    vimeo_lib = new Vimeo(null, null, access_token);
}

function getQuotaFreeInBytes (callback) {
    var options = {
        method: 'GET',
        path: '/me',
        query: null,
        headers: null
    };

    vimeo_lib.request(options, function (err, body, status_code, headers) {
        if (err) throw err;

        callback(body.upload_quota.space.free);
    }); 
}

function getFileSizeInBytes (path) {
    var stats = fs.statSync(path);
    var fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
}

function upload (path) {
    constructVimeoLib();
    getQuotaFreeInBytes(function (quotaInBytes) {
        if (quotaInBytes - getFileSizeInBytes(path) < 0) { // remaining quota minus size of file in bytes
            return console.log('Not enough quota space left.');
        }

        console.log('Beginning upload...');
        vimeo_lib.streamingUpload(path,  function (err, body, status_code, headers) {
            if (err) throw err;

            vimeo_lib.request(headers.location, function (err, body, status_code, headers) {
                console.log('Uploaded to ' + body.link);
            });
        });
    });
}

module.exports = upload;