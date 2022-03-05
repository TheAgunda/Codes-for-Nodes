const express = require("express");
const router = express.Router();

const verfiedToken = require('./verify_token');

router.post("/", verfiedToken, async (req, res) => {
    res.json(req.user)
});

module.exports = router;