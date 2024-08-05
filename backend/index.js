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

// Serve static files from the React frontend app
app.use(express.static(path.resolve(__dirname, "frontend", "build")));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
