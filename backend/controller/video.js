var Video = require("../models/video");
var { createToken } = require('../middleware/authentication');

module.exports = {
    async createpost(req, res) {
        try {
            var result = await Video.create({...req.body});
            return res.json(result);
        } catch (error) {
            console.log(error)
            return res.status(400).json(error);
        }
    },
    async getallpost(req, res) {
        try {
            var results = await Video.find();
            res.json(results)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error);

        }
    },
    async getonepost(req, res) {
        try {
            var result = await Video.findOne({ _id: req.params.id })
            res.json(result)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)

        }
    }
}