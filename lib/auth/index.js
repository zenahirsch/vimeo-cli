const https = require('https');
const qs = require('querystring');
const open = require('open');
const conf_utils = require(__dirname + '/../../conf_utils').setup();
const client_conf = require(__dirname + '/../../client_conf.json');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function checkAccessToken (user_code, device_code, int) {
    console.log();
    console.log('    Checking for access token...');
    console.log();
    
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

    var req = https.request(options, (res) => {
        var buffer = '';

        res.setEncoding('utf8');

        res.on('error', (err) => {
            console.log(`HTTPS Error: ${err.message}`);
            rl.close();
        });

        res.on('data', (chunk) => buffer = buffer + chunk);

        res.on('end', () => {
            var resData = JSON.parse(buffer.toString());

            if (!resData.error) {
                clearInterval(int);
                rl.question('    Cool, you did it! Please enter a nickname for this account: ', (nickname) => {
                    if (!nickname) {
                        console.log();
                        console.log('    No nickname supplied. Try again.');
                        console.log();
                        return;
                    }

                    var nickname = nickname.toLowerCase();
                    var users = conf_utils.get('users');

                    var user = {
                        nickname: nickname,
                        name: resData.user.name,
                        id: resData.user.uri.match(/(\d+)/g)[0],
                        user_code: user_code,
                        access_token: resData.access_token,
                        account: resData.user.account
                    };

                    users.push(user);
                    conf_utils.set('users', users);
                    conf_utils.set('current_user', user.nickname);
                    conf_utils.save();

                    console.log();
                    console.log(`    ${user.nickname} added as authenticated user, and set to current user.`);
                    console.log();
                    console.log('    You\'re done. Use `vimeo --help` to see available commands.');
                    rl.close();
                });
            }   
        });
    });

    req.write(strData);
    req.end();
}

function makeAuthRequest () {
    console.log();
    console.log('    Making authorization request...');

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
            'Authorization': 'Basic ' + new Buffer(client_conf.client_id + ':' + client_conf.client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': strData.length
        }
    };

    var req = https.request(options, (res) => {
        var buffer = '';

        res.setEncoding('utf8');

        res.on('error', (err) => {
            console.log();
            console.log(`    HTTPS Error: ${err.message}`);
            console.log();
            rl.close();
        });

        res.on('data', (chunk) => buffer = buffer + chunk);

        res.on('end', () => {
            var resData = JSON.parse(buffer.toString());

            if (res.statusCode < 299) {
                console.log();
                console.log('    Success! On the next page, enter your unique user code, then click \'Connect Device\'');
                console.log();
                console.log(`    User Code: ${resData.user_code}`);
                console.log();

                rl.question('    Copy the code above, then press enter to continue.', () => {
                    var int = setInterval(() => {
                        checkAccessToken(resData.user_code, resData.device_code, int);
                    }, 5000);

                    open(resData.activate_link);
                });
            } else {
                console.log();
                console.log('    There was an error. See information below:');
                console.log(`    Status: ${res.statusCode}`);
                console.log(`    Error: ${resData.error}`);
                console.log();
                rl.close();
            }
        });
    });

    req.write(strData);
    req.end();
}

function setupAccount () {
    console.log();
    rl.question('    Connect to a new account? [y/n]: ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            makeAuthRequest();
        } else {
            console.log();
            console.log('    Try `vimeo use [nickname]` to use an existing authenticated account.');
            console.log();
            rl.close();
        }
    });
}

module.exports = setupAccount;