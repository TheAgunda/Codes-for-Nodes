const express = require("express");
const dotenv = require("dotenv");
const app = express();


dotenv.config();

const PORT = process.env.PORT;

const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION, {})
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

//Middleware
app.use(express.json());

//Route middelware
const authRoutes = require('./auth/auth');
const postRoutes = require('./auth/post')

app.use('/api/user', authRoutes);
app.use('/api/posts', postRoutes)

app.listen((PORT), () => {
    console.log(`The server is running on port ${PORT}`);
});