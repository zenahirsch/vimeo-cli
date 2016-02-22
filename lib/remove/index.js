const conf_utils = require(__dirname + '/../../conf_utils').setup();

function removeUser (nickname) {
    var nickname = nickname.toLowerCase();
    var nicknameExists = false;
    var users = conf_utils.get('users');

    if (users && users.length > 0) {
        users.forEach((user, i) => {
            if (user.nickname === nickname) {
                nicknameExists = true;
                users.splice(i, 1);

                conf_utils.set('users', users).save();
                console.log(`Removed user ${user.nickname}`);
            }
        });

        if (!nicknameExists) {
            console.log(`${nickname} does not exist.`);
        }
    } else {
        console.log('There are no authenticated users. Try running `vimeo auth`');
    }
}

module.exports = removeUser;