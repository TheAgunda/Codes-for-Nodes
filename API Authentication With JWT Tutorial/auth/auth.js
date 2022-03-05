const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { schema } = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");





router.post("/register", async (req, res) => {

    const emailExist = User.findOne({ email: req.body.email })
    // if (emailExist) {
    //     res.status(400).send("Email exits adreay");
    // }
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    })

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(req.body.password, salt);
    const savedUser = newUser.save();
    return res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
    });
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    // if (!emailExist) {
    //     res.status(400).send("Email not exits adreay");
    // }

    const validatePassword = await bcrypt.compare(req.body.password, user.password);

    if (!validatePassword) {
        res.status(400).send("Invalid Password.");
    }
    const auth_token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.header("AUTH_TOKEN", auth_token).send(auth_token)
});

module.exports = router;