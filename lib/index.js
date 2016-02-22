module.exports = {
    getScript: (cmd) => {
        return require(`./${cmd}`);
    }
};
