var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Video = new Schema({
    title: 'string',
    price: "number",
    Author: "string",
    description: "string",
    videoUrl: "string"

}, { timestamps: true });

var Video = mongoose.model('video', Video);

module.exports = Video;