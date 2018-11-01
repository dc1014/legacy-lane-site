const redact = function (brick) {

    if (brick.claim) {
        delete brick.claim;
    }

    if (brick.constituentId) {
        delete brick.constituentId;
    }

    if (brick.email) {
        delete brick.email;
    }

    if (brick.optIn === true) {
        return brick;
    }

    delete brick.optIn;

    if (brick.firstName) {
        delete brick.firstName;
    }

    if (brick.lastName) {
        delete brick.lastName;
    }

    if (brick.classOf) {
        delete brick.classOf;
    }

    return brick;
};

const redactMap = function (data, term) {

    return data.map((x) => {

        const redacted = redact(x);

        if (redacted.optIn === true) {
            return redacted;
        }

        else if (
            redacted.comment.indexOf(term) > -1
            || redacted.line1.indexOf(term) > -1
            || redacted.line2.indexOf(term) > -1
            || redacted.line3.indexOf(term) > -1
            || redacted.tags.filter((y) => {

                if (y.indexOf(term) > -1) {
                    return true;
                }
            }).length > 0
        ) {
            return redacted;
        }
    });
};

module.exports = {
    redactMap,
    redact
};
