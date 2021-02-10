var User = require("../models/user");
var bcrypt = require('bcrypt');
var { createToken } = require('../middleware/authentication');
module.exports = {
    async userRegister(req, res) {
        //console.log(req.body)
        // this is for register the user.
        try {
            // there we check user user provide photo or not.
            if (req.file && req.file.path) {
                req.body.photoURL = req.file.path;
            }
            console.log(req.body);
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await User.create({ ...req.body });
            return res.json({ success: true, message: 'user register successfully' })
        } catch (error) {
            console.log(error);
            if (error.code === 11000) {
                return res.status(400).json({ error: "Email Id is already exists" });
            }
            res.status(400).send(error);
        }
    },
    async userLogin(req, res) {
        // this is for login user.
        try {
            // there we check email and password is write or not.
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "User does not exists" })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(404).json({ error: "Invalid Password" });
            }
            var token = await createToken(user);
            // there we save all data in cookie.
            res.cookie('token', token);
            return res.json({
                Name: user.Name,
                email: user.email,
                id: user._id,
                photoURL: user.photoURL,
                token: token,
                myVideos: user.myVideos,
                role: user.role
            });
        } catch (error) {
            console.log(error)
            if (error.name === "MongoError") {
                return res.status(400).send(`Validation Error: ${error.message}`)
            }
            res.status(400).send(error);

        }
    },
    async userLogout(req, res) {
        // this is for logout the user.
        try {
            // there we clear all data in cookie.
            res.cookie('token', { expires: Date.now() });
            return res.json({ message: "logged out" })
        } catch (error) {
            console.log(error)
            res.status(400).send(error)

        }
    },
    async updateUser(req, res) {
        try {
            console.log(req.user.id, req.body.videoId);
            await User.updateOne({ _id: req.user.id }, { $addToSet: { myVideos: req.body.videoId } });
            res.status(200).json({ message: 'video added successfully' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: "failed to add video" })
        }
    }
}