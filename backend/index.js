const express = require('express');
const fetchData = require('./db');

const app = express();
const port = 5000;

// Connect to MongoDB
fetchData();

app.get('/', (req, res) => {
  res.send('Hello World!---------------');
});
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
