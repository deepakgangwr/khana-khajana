const express = require('express');
const mongoose = require('mongoose');
const fetchData = require('./db');
require('dotenv').config();
const cors = require('cors');
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Middleware to parse JSON requests
app.use(express.json());

// Assuming 'createUser' is a router module
app.use('/api', require('./Routes/CreateUser'));

// node

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
