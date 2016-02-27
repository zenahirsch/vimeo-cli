function add (item_name, options) {
    const item_names = ['album', 'channel', 'group', 'following', 'like', 'watchlater'];

    if (item_names.indexOf(item_name) === -1) {
        console.log(`Can\'t add that. Try one of these:`);
        console.log(item_names.join(' '));
        return;
    }

    require(`${__dirname}/add_${item_name}.js`)(options);
}

module.exports = add;