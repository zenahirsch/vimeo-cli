const fs = require('fs');

function setupUtility (client_id, client_secret) {
    var client_conf = {
        client_id: client_id,
        client_secret: client_secret
    };

    fs.writeFile(__dirname + '/../../client_conf.json', JSON.stringify(client_conf, null, 2), (err) => {
        if (err) throw err;
        
        console.log('client_conf.json written');
    });
}

module.exports = setupUtility;