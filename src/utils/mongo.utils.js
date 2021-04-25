const mongoose = require('mongoose');

const verifyID = (id) => {
    if (!id) {
        return false
    }

    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
    verifyID
}