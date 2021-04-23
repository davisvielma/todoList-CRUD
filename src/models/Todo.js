const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = model('Todo', todoSchema);