var Payment = require("../models/payment");
//var { createToken } = require('../middleware/authentication');
const stripe = require("stripe")("sk_test_51HSksKILMLU11Db4GnyhnMRY1oO1OMP3gdFcU7phPz3CdIF7mT9JAfd9PzBin3ZBNIeDYHarF95QWYBlbSTOWCNh00KKNMWk8v");

module.exports = {
    async createPaymentToken(req, res) {
        try {
            if (!req.body.amount) {
                return res.status(400).json({ message: "Amount is required" })
            }
            const paymentIntent = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: "inr"
            });
            res.status(200).json({
                clientSecret: paymentIntent.client_secret
            });

        } catch (error) {
            res.status(400).json({ error: 'failed to create token' });
        }
    }
}