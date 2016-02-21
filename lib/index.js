module.exports = {
    getScript: function (cmd) {
        return require('./' + cmd);
    }
};
