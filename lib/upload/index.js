const conf_utils = require(__dirname + '/../../conf_utils').setup();
const lib = require(__dirname + '/../');
const fs = require('fs');
const Vimeo = require('vimeo').Vimeo;
var vimeo_lib = null;

function getQuotaFreeInBytes (callback) {
    var options = {
        method: 'GET',
        path: '/me',
        query: null,
        headers: null
    };

    vimeo_lib.request(options, (err, body, status_code, headers) => {
        if (err) throw err;

        callback(body.upload_quota.space.free);
    }); 
}

function getFileSizeInBytes (path) {
    var stats = fs.statSync(path);
    var fileSizeInBytes = stats['size'];

    return fileSizeInBytes;
}

function upload (path) {
    const current_user = conf_utils.get('current_user');

    vimeo_lib = lib.constructVimeoLib(current_user);

    getQuotaFreeInBytes((quotaInBytes) => {
        if (quotaInBytes - getFileSizeInBytes(path) < 0) { // remaining quota minus size of file in bytes
            return console.log('Not enough quota space left.');
        }

        console.log('Beginning upload...');

        vimeo_lib.streamingUpload(path, (err, body, status_code, headers) => {
            if (err) throw err;

            vimeo_lib.request(headers.location, (err, body, status_code, headers) => {
                console.log(`Uploaded to ${body.link}`);
            });
        });
    });
}

module.exports = upload;