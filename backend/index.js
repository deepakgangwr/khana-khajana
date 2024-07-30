global.foodData = require('./db')(function call(err, data, CatData) {
  // console.log(data)
  if(err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
})

const express = require('express');
const fetchData = require('./db');

const app = express();
const port = 5000;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Connect to MongoDB
fetchData();

app.get('/', (req, res) => {
  res.send('Hello World!---------------');
});
app.use(express.json());
app.use('/api', require("./Routes/createuser"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
