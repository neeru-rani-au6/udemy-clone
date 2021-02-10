var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Payment = new Schema({
    user: 'string',
    payment: "number"

}, { timestamps: true });

var Payment = mongoose.model('payment', Payment);

module.exports = Payment;