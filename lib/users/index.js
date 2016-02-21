var conf_utils = require(__dirname + '/../../conf_utils').setup();

function listUsers () {
    var users = conf_utils.get('users');

    if (users && users.length > 0) {
        users.forEach(function (user) {
            console.log(user.nickname + '   ' + user.name + '   ' + user.id);
        });
    } else {
        console.log('There are no authenticated users. Try running `vimeo auth`');
    }
}

module.exports = listUsers;