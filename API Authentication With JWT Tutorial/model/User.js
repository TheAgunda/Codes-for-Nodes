const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            lowercase: true,
            required: [true, "Email can't be blank"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, " is invalid."],
            index: true,
            max: 255,
        },
        password: {
            type: String,
            max: 1024,
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);