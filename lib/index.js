const conf_utils = require(__dirname + '/../conf_utils').setup();
const Vimeo = require('vimeo').Vimeo;

module.exports = {
    getScript: function (cmd) {
        return require(`./${cmd}`);
    },
    constructVimeoLib: function (current_user) {
        const users = conf_utils.get('users');
        var access_token = null;
        
        if (current_user && users.length > 0) {
            users.forEach((user, i) => {
                if (user.nickname === current_user) {
                    access_token = user.access_token;
                }
            });
        }

        try {
            return new Vimeo(null, null, access_token);
        } catch (err) {
            return console.log(err);
        }
    }
};
