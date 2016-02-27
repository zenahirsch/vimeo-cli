const conf_utils = require(__dirname + '/../../conf_utils').setup();
const lib = require(__dirname + '/../');
const Vimeo = require('vimeo').Vimeo;
var vimeo_lib = null;

function buildReqOptions (options) {
    var req_options = {
        method: 'PUT',
        path: `/me/likes/${options.video}`,
        query: null,
        headers: null
    };

    return req_options;
}

function addLike (options) {
    const current_user = conf_utils.get('current_user');

    if (!current_user) {
        return console.log('No current user specified.');
    }

    if (typeof options.video !== 'string') {
        return console.log('Must include the ID of the video to like (use -v)');
    }

    var req_options = buildReqOptions(options);

    if (req_options) {
        vimeo_lib = lib.constructVimeoLib(current_user);

        vimeo_lib.request(req_options, (err, body, status_code, headers) => {
            if (status_code === 403) {
                console.log('');
                console.log('    The current user is not allowed to like videos.');
                console.log('    Try `vimeo switch <nickname>` to switch to a different authenticated user.');
                console.log('');
            } else if (status_code === 400) {
                console.log('');
                console.log('    You can\'t like your own video.');
                console.log('');
            } else if (status_code === 204) {
                console.log('');
                console.log(`    You now like the following video: ${options.video}`);
                console.log(`    Video can be found at https://vimeo.com/${options.video}`);
                console.log('');
            } else {
                console.log('');
                console.log('    Not sure what happened, file a bug report.');
                console.log('');
            }
        });
    }
}

module.exports = addLike;