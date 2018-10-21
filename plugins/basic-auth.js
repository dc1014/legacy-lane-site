const Bcrypt = require('bcrypt');

const validate = async (request, username, password) => {

    const db = request.mongo.db;

    const user = await db.collection('users').findOne({ user: username });

    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, user.password);

    const credentials = {};

    return { isValid, credentials };
};

module.exports = {
    validate
};
