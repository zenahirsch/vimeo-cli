var conf_utils = require(__dirname + '/../../conf_utils').setup();

function useAccount (nickname) {
    var nickname = nickname.toLowerCase();
    var nicknameExists = false;
    var users = conf_utils.get('users');

    if (users && users.length > 0) {
        users.forEach(function (user) {
            if (user.nickname === nickname) {
                nicknameExists = true;
                conf_utils.set('current_user', nickname);
                conf_utils.save();
                console.log('Switched current user to ' + nickname);
            }
        }); 

        if (!nicknameExists) {
            console.log(nickname + ' has not been authenticated. Log into this account in your browser, then run `vimeo auth`');
        }
    } else {
        console.log('There aren\'t any users authenticated yet. Try `vimeo auth`');
    }
}

module.exports = useAccount;