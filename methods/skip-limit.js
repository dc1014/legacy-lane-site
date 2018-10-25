const skipLimit = function (s, l) {

    const skip = parseInt(s) || 0;
    const limit = parseInt(l) <= 10 ? parseInt(l) : 10;
    return {
        skip,
        limit
    };
};

module.exports = {
    skipLimit
};

