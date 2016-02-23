const conf_utils = require(__dirname + '/../../conf_utils').setup();
const lib = require(__dirname + '/../');
const columnify = require('columnify');
const Vimeo = require('vimeo').Vimeo;
var vimeo_lib = null;

function displayItems (item_name, items) {
    var columns = columnify(items, {
        columns: ['name', 'link', 'created_time'],
        config: {
            name: { 
                maxWidth: 25,
                truncate: true
            }
        }
    });

    console.log(columns);
}

function onRequestItemPage (item_name, items, body) {
    items = [...items, ...body.data];

    if (body.paging.next) {
        return requestItemPage(item_name, items, body, onRequestItemPage);
    }

    console.log('======================');
    console.log(` ${item_name.toUpperCase()} (${items.length})`);
    console.log('======================');

    displayItems(item_name, items);
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

    requestItemPage(item_name, [], null, onRequestItemPage);
}

module.exports = list;