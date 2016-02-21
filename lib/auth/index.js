var https = require('https');
var qs = require('querystring');
var open = require('open');
var conf_utils = require(__dirname + '/../../conf_utils').setup();
var client_conf = require(__dirname + '/../../client_conf.json');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

function checkAccessToken (user_code, device_code, int) {
    console.log('Checking for access token...');
    
    var data = {
        user_code: user_code,
        device_code: device_code
    };

    var strData = qs.stringify(data);

    var options = {
        hostname: 'api.vimeo.com',
        path: '/oauth/device/authorize',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + new Buffer(client_conf.client_id + ':' + client_conf.client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': strData.length
        }
    };

    var req = https.request(options, function (res) {
        var buffer = '';

        res.setEncoding('utf8');

        res.on('error', function (err) {
            console.log('HTTPS Error: ' + err.message);
        });

        res.on('data', function (chunk) {
            buffer = buffer + chunk;
        });

        res.on('end', function () {
            var resData = JSON.parse(buffer.toString());

            if (!resData.error) {
                clearInterval(int);
                console.log('Successfully received access token.');

                rl.question('Please enter a nickname for this account: ', function (nickname) {
                    var nickname = nickname.toLowerCase();
                    var users = conf_utils.get('users');

                    if (!users) {
                        conf_utils.setup();
                        users = conf_utils.get('users');
                    }

                    console.log('Saving account: ' + nickname);

                    var user = {
                        nickname: nickname,
                        name: resData.user.name,
                        id: resData.user.uri.match(/(\d+)/g)[0],
                        user_code: user_code,
                        access_token: resData.access_token
                    };

                    users.push(user);
                    conf_utils.set('users', users);
                    conf_utils.save();

                    rl.close();
                });
            }   
        });
    });

    req.write(strData);
    req.end();
}

function makeAuthRequest () {
    console.log('Making authorization request...');

    var data = {
        grant_type: 'device_grant',
        scope: 'public private create edit delete interact upload'
    };

    var strData = qs.stringify(data);

    var options = {
        hostname: 'api.vimeo.com',
        path: '/oauth/device',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + new Buffer('d77bdd27f05e5cff3a29ef8fcf5f77efc7dccd77:SY8Ef+4nXzI5/JDPgCHMrtD8L6ye3zd6luT3Vw9x57rBdCuyJkIsXSm449DyaHUDZ9F80kp66MdczB8Yx27kaGbjUex32sMEfhsuj1iKpNH1OmOWR2QzXg+FbbwS9aMk').toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': strData.length
        }
    };

    var req = https.request(options, function (res) {
        var buffer = '';

        res.setEncoding('utf8');

        res.on('error', function (err) {
            console.log('HTTPS Error: ' + err.message);
            rl.close();
        });

        res.on('data', function (chunk) {
            buffer = buffer + chunk;
        });

        res.on('end', function () {
            var resData = JSON.parse(buffer.toString());

            if (res.statusCode < 299) {
                console.log('Success! You\'re almost done!');
                console.log('On the next page, enter your unique user code, then click \'Connect Device\'');
                console.log('User Code: ' + resData.user_code);

                rl.resume();

                rl.question('Press enter to continue.', function () {
                    rl.pause();

                    var int = setInterval(function () {
                        checkAccessToken(resData.user_code, resData.device_code, int);
                    }, 5000);

                    open(resData.activate_link);
                });
            } else {
                console.log('There was an error. See information below:');
                console.log('Status: ' + res.statusCode);
                console.log('Error: ' + resData.error);
                rl.close();
            }
        });
    });

    req.write(strData);
    req.end();
}

function authenticate () { 
    console.log('Let\'s get you authenticated to use this utility.');
    console.log('First, open your browser make sure you are logged into the Vimeo account you\'d like to use.');

    rl.question('Do that now, then hit enter when you\'re ready.', function () {
        rl.pause();
        makeAuthRequest();
    });
}

function setupAccount () {
    rl.question('Connect to a new account? [y/n]: ', function (answer) {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            authenticate();
        } else {
            console.log('Try `vimeo use [nickname]` to use an existing authenticated account.');
            rl.close();
        }
    });
}

module.exports = setupAccount;