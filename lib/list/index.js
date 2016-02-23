const conf_utils = require(__dirname + '/../../conf_utils').setup();
const lib = require(__dirname + '/../');
const Vimeo = require('vimeo').Vimeo;
var vimeo_lib = null;

function displayItems (item_name, items) {
    items.forEach((item) => {
        console.log(`${item.name}`);
        console.log(`${item.link}`);
        console.log(`Created: ${item.created_time}\n`);
    });
}

function onRequestItemPage (item_name, items, body) {
    items = [...items, ...body.data];
    displayItems(item_name, items);

    if (body.paging.next) {
        return requestItemPage(item_name, items, body, onRequestItemPage);
    }

    console.log(`Total ${item_name}: ${items.length}`);
}

function requestItemPage (item_name, items, body, callback) {
    const options = {
        method: 'GET',
        path: body ? body.paging.next : `/me/${item_name}`,
        query: null,
        headers: null
    };

    vimeo_lib.request(options, (err, body, status_code, headers) => {
        if (err) throw err;
        callback(item_name, items, body);
    });
}

function list (item_name) {
    const current_user = conf_utils.get('current_user');
    const item_names = ['videos', 'albums', 'appearances', 'channels', 'groups', 'followers', 'following', 'likes', 'portfolios', 'presets', 'watchlater'];

    if (!current_user) {
        return console.log('No current user specified.');
    }

    if (item_names.indexOf(item_name) === -1) {
        console.log(`Can\'t list that. Try one of these:`);
        console.log(item_names.join(' '));
        return;
    }

    vimeo_lib = lib.constructVimeoLib(current_user);

    console.log('======================');
    console.log('  ' + item_name.toUpperCase());
    console.log('======================');

    requestItemPage(item_name, [], null, onRequestItemPage);
}

module.exports = list;