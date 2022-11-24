const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usageSchemaful = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    usage1: {
        type: Number,
        required: true
    },
    usage2: {
        type: Number,
        required: true
    },
    usage3: {
        type: Number,
        required: true
    },
    usage4: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});
var usages = mongoose.model('Usage', usageSchemaful);

module.exports = usages;