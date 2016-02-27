const conf_utils = require(__dirname + '/../../conf_utils').setup();
const lib = require(__dirname + '/../');
const Vimeo = require('vimeo').Vimeo;
var vimeo_lib = null;

function buildReqOptions (options) {
    var req_options = {
        method: 'POST',
        path: '/me/albums',
        query: {
            name: options.name,
            description: options.description,
        },
        headers: null
    };

    if (typeof options.privacy === 'string') {
        req_options.query.privacy = options.privacy;

        if (options.privacy === 'password') {
            if (typeof options.password !== 'string') {
                console.log('Must include password for password-protected album (use -P to set password)');
                return;
            }

            req_options.query.password = options.password;
        }
    }

    if (typeof options.sort === 'string') {
        req_options.query.sort = options.sort;
    }

    return req_options;
}

function addAlbum (options) {
    const current_user = conf_utils.get('current_user');

    if (!current_user) {
        return console.log('No current user specified.');
    }

    if (typeof options.name !== 'string') {
        return console.log('Must include an album name (use -n)');
    }

    if (typeof options.description !== 'string') {
        return console.log('Must include an album description (use -d)');
    }

    var req_options = buildReqOptions(options);

    if (req_options) {
        vimeo_lib = lib.constructVimeoLib(current_user);

        vimeo_lib.request(req_options, (err, body, status_code, headers) => {
            if (status_code === 400) {
                console.log();
                console.log(`    One or more of your params didn't make sense. Try again.`);
                console.log();
            } else if (status_code === 401) {
                console.log();
                console.log(`    Authorization problem: missing token.`);
                console.log();
            } else if (status_code === 403) {
                console.log();
                console.log(`    This user does not have permission to create albums.`);
                console.log('    Try `vimeo switch <nickname>` to switch to a different authenticated user.');
                console.log();
            } else if (status_code === 201) {
                console.log();
                console.log(`    Successfully created album: ${body.name}`);
                console.log(`    Album can be found at ${body.link}`);
                console.log();
            } else {
                console.log();
                console.log('    Not sure what happened, file a bug report.');
                console.log();
            }
        });
    }
}

module.exports = addAlbum;