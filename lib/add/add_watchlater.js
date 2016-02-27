const conf_utils = require(__dirname + '/../../conf_utils').setup();
const lib = require(__dirname + '/../');
const Vimeo = require('vimeo').Vimeo;
var vimeo_lib = null;

function buildReqOptions (options) {
    var req_options = {
        method: 'PUT',
        path: `/me/watchlater/${options.video}`,
        query: null,
        headers: null
    };

    return req_options;
}

function addWatchlater (options) {
    const current_user = conf_utils.get('current_user');

    if (!current_user) {
        return console.log('No current user specified.');
    }

    if (typeof options.video !== 'string') {
        return console.log('Must include the ID of the video to add to your watch later queue (use -v)');
    }

    var req_options = buildReqOptions(options);

    if (req_options) {
        vimeo_lib = lib.constructVimeoLib(current_user);

        vimeo_lib.request(req_options, (err, body, status_code, headers) => {
            if (status_code === 404) {
                console.log('');
                console.log('    Could not find that video.');
                console.log('');
            } else if (status_code === 204) {
                console.log('');
                console.log(`    Added video to watch later queue: ${options.video}`);
                console.log(`    Watch later queue can be found at https://vimeo.com/watchlater`);
                console.log('');
            } else if (status_code === 403) {
                console.log('');
                console.log('    Can\'t add your own video to watch later.');
                console.log('');
            } else {
                console.log('');
                console.log('    Not sure what happened, file a bug report.');
                console.log('');
            }
        });
    }
}

module.exports = addWatchlater;